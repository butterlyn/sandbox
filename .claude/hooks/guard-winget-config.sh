#!/usr/bin/env bash
# PreToolUse guard for the PRD -> WinGet configuration workflow.
#
# Keeps the work inside the winget-config-maintainer agent, which sets its
# own model and effort:
#   1. The prd-to-winget-config skill can't run through the Skill tool.
#      The agent has it preloaded, so it never needs the tool.
#   2. Calls to any project agent can't override a model or effort that
#      its definition sets.
#   3. Only the agent edits .config/configuration.winget.
#   4. The agent leaves PRD.md alone, since that file is the user's.
#
# Exit code 2 blocks the tool call and shows Claude the message on stderr.
# It covers Claude's file tools, not shell commands that write files.

agent="winget-config-maintainer"
skill="prd-to-winget-config"

if ! command -v jq >/dev/null 2>&1; then
  echo "guard-winget-config: jq isn't installed, so the guard is off." >&2
  exit 1
fi

input=$(cat)
get() { jq -r "$1 // empty" <<<"$input" 2>/dev/null; }
block() {
  echo "$1" >&2
  exit 2
}
# True when the project agent named $1 sets model or effort in its frontmatter.
pins() {
  local file
  [[ -n $1 ]] || return 1
  file=$(grep -lxF "name: $1" "${CLAUDE_PROJECT_DIR:-$(get '.cwd')}"/.claude/agents/*.md 2>/dev/null | head -n 1)
  [[ -n $file ]] && sed -n '2,/^---$/p' "$file" | grep -qE '^(model|effort):'
}

shopt -s nocasematch # Windows and macOS paths ignore case
tool=$(get '.tool_name')
caller=$(get '.agent_type')

case "$tool" in
  Skill)
    name=$(get '.tool_input.skill')
    if [[ "$name" == "$skill" || "$name" == *":$skill" ]]; then
      block "The $skill skill runs only inside the $agent agent, which loads it at startup. Delegate the task to that agent."
    fi
    ;;
  Agent | Task)
    target=$(get '.tool_input.subagent_type')
    if [[ -n "$(get '.tool_input.model')$(get '.tool_input.effort')" ]] && pins "$target"; then
      block "The $target agent sets its own model and effort. Call it again without the model and effort parameters."
    fi
    ;;
  Write | Edit | MultiEdit | NotebookEdit)
    path=$(get '.tool_input.file_path // .tool_input.notebook_path')
    path=${path//\\//} # Windows separators
    case "$path" in
      */.config/configuration.winget | .config/configuration.winget)
        if [[ "$caller" != "$agent" ]]; then
          block "Only the $agent agent edits .config/configuration.winget. Delegate the change to that agent, after updating PRD.md if the requirements changed."
        fi
        ;;
      */PRD.md | PRD.md)
        if [[ "$caller" == "$agent" ]]; then
          block "PRD.md is the user's file. Leave it unchanged and put the change you'd suggest in your report."
        fi
        ;;
    esac
    ;;
esac

exit 0
