#!/usr/bin/env bash
# Stop hook: after each turn, saves this session's transcripts to the orphan
# branch agent-transcripts and pushes it, for the meta-reviewer agent:
#   transcripts/<session-id>.jsonl            the session transcript
#   transcripts/<session-id>/subagents/...    its subagents' transcripts
#
# The work happens in a sparse git worktree inside .git, so the working
# branch, its index and its files stay untouched. Runs are idempotent: an
# unchanged transcript makes no commit, and an up-to-date branch no push.
# The hook returns at once and works in the background. It never reports
# failure; the last run's log is .git/agent-transcripts.log.

branch=agent-transcripts

# Hand the hook input to a detached copy of this script, then return.
if [[ $1 != --worker ]]; then
  input=$(cat)
  launcher="nohup"
  command -v setsid >/dev/null 2>&1 && launcher=setsid
  "$launcher" bash "$0" --worker <<<"$input" >/dev/null 2>&1 &
  exit 0
fi

input=$(cat)
command -v jq >/dev/null 2>&1 || exit 0
field() { jq -r ".$1 // empty" <<<"$input" 2>/dev/null; }
session=$(field session_id)
session=${session//[^A-Za-z0-9._-]/_} # safe as a file name
transcript=$(field transcript_path)
repo=${CLAUDE_PROJECT_DIR:-$(field cwd)}
[[ -n $session && -f $transcript ]] || exit 0
gitdir=$(git -C "$repo" rev-parse --path-format=absolute --git-common-dir 2>/dev/null) || exit 0
exec >"$gitdir/agent-transcripts.log" 2>&1
set -x

# One run at a time; a lock older than 10 minutes is from a run that died.
lock="$gitdir/agent-transcripts.lock"
locked=false
for _ in {1..60}; do
  if mkdir "$lock" 2>/dev/null; then
    locked=true
    break
  fi
  find "$lock" -maxdepth 0 -mmin +10 -exec rmdir {} + 2>/dev/null
  sleep 2
done
$locked || exit 0
trap 'rmdir "$lock"' EXIT

export GIT_TERMINAL_PROMPT=0 GIT_SSH_COMMAND=${GIT_SSH_COMMAND:-"ssh -o BatchMode=yes"}
worktree="$gitdir/agent-transcripts-worktree"
remote_ref="refs/remotes/origin/$branch"
# Sparse checkout is switched on per command, so the repo's config never changes.
wt() { git -C "$worktree" -c commit.gpgsign=false -c core.sparseCheckout=true -c core.sparseCheckoutCone=false "$@"; }
fetch() { git -C "$repo" fetch -q --no-tags origin "+refs/heads/$branch:$remote_ref"; }
has_remote() { git -C "$repo" show-ref -q --verify "$remote_ref"; }

fetch
if [[ ! -e $worktree/.git ]]; then
  rm -rf "$worktree"
  git -C "$repo" worktree prune # drop the registration of a deleted worktree
  if git -C "$repo" show-ref -q --verify "refs/heads/$branch"; then
    git -C "$repo" worktree add -q --no-checkout "$worktree" "$branch"
  elif has_remote; then
    git -C "$repo" worktree add -q --no-checkout -b "$branch" "$worktree" "origin/$branch"
  else
    git -C "$repo" worktree add -q --orphan -b "$branch" "$worktree"
  fi || exit 0
fi

# Check out only this session's files; the branch holds every session's.
patterns=$(wt rev-parse --path-format=absolute --git-path info/sparse-checkout) || exit 0
mkdir -p "${patterns%/*}" && printf '%s\n' "/transcripts/$session.jsonl" "/transcripts/$session/" >"$patterns"

# Clear what a crashed run left behind, then build on the remote tip.
wt rebase --abort 2>/dev/null
if wt rev-parse -q --verify HEAD >/dev/null; then
  wt reset -q --hard
  if has_remote; then
    wt rebase -q -X theirs "origin/$branch" || {
      wt rebase --abort
      wt reset -q --hard "origin/$branch"
    }
  fi
elif has_remote; then
  wt checkout -q -B "$branch" "origin/$branch"
fi

copy() { mkdir -p "${2%/*}" && { cmp -s "$1" "$2" || cp "$1" "$2"; }; }
copy "$transcript" "$worktree/transcripts/$session.jsonl"
for file in "${transcript%.jsonl}"/subagents/*.jsonl "${transcript%.jsonl}"/subagents/*.meta.json; do
  [[ -f $file ]] && copy "$file" "$worktree/transcripts/$session/subagents/${file##*/}"
done

wt add -- "transcripts/$session.jsonl"
[[ -d $worktree/transcripts/$session ]] && wt add -A -- "transcripts/$session"
if ! wt diff --cached --quiet; then
  identity=()
  [[ -n $(wt config user.email) ]] ||
    identity=(-c user.name="agent-transcripts hook" -c user.email="agent-transcripts@localhost")
  wt "${identity[@]}" commit -q --no-verify -m "Save transcripts for session $session"
fi

# Push; if another session pushed first, replay on top and try again.
for _ in 1 2 3; do
  [[ $(wt rev-parse -q --verify HEAD) == "$(wt rev-parse -q --verify "origin/$branch")" ]] && break
  wt push -q --no-verify origin "HEAD:refs/heads/$branch" && break
  if ! { fetch && wt rebase -q -X theirs "origin/$branch"; }; then
    wt rebase --abort
    break
  fi
done
exit 0
