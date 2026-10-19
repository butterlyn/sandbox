# Research brief: agent orchestration workflow shortlist

Prepared 2026-10-18 by the orchestrator (main session) on branch `agent-orchestration-shortlist-2026`.
Every subagent reads this whole file before starting. Research started on 2026-10-18; **use the actual current date (2026-10-19 or later) in every "checked" and "accessed" field.**

Sections 1–3 are the user's words, copied verbatim (§2–3 with bullet and tab whitespace normalised; the words are unchanged). Sections 4–7 are the orchestrator's bookkeeping; where they and §1–3 seem to differ, §1–3 govern.

---

## 1. The user's requirements (verbatim)

```text
Help me research and choose my agent orchestration workflow setup. Shortlist some options for me.
- CONSIDER Software with no native windows installation but with linux installation may be installable via WSL2
- CONSIDER using Obsidian Sync, which syncs markdown and files across iOS and PC Obsidian installations
- CONSIDER some possible candidates (combine candidates if necessary):
	- T3 Code V2
	- Superset
	- Orca
	- Paseo
	- Maestro
	- Scion
	- Archon
	- Docker sandboxes
	- Claude desktop app
	- Intent
	- Agor
	- Parallel Code
	- Gas City
	- Agent Swarm
	- Conductor
	- Warp
	- Github Apps of Claude and codex
	- Github repos/issues
	- Vibe Kanban
	- AgentView
	- Tailwind
- Requirements
	- FAVOUR runs the official claude/codex binary under its own login
	- FAVOUR high GitHub stars >5000 (if applicable)
	- NEVER low GitHub stars <1000 (if applicable)
	- ALWAYS iPhone interaction (webapp or iOS app)
	- FAVOUR native iOS app (instead of webapp)
	- FAVOUR iPad optimised interface
	- NEVER single maintainer
	- NEVER abandoned, deprecated, or archived projects
	- ALWAYS visible agent audit trail (e.g., tool calls) for every session the platform launches
	- FAVOUR direct native agent session interaction (e.g., open an agent session within native TUI, open codex/Claude session in native codex/Claude desktop app GUI)
	- ALWAYS agents use native subscription usage, at minimum:
		- Claude code with Claude subscription
		- Codex with OpenAI subscription
	- ALWAYS agents run within their native harnesses, at minimum:
		- Claude code as the native harness for anthropic models
		- Codex at the native harness for openai models
	- FAVOUR cross-mode localhost opening
	- ALWAYS cross-mode file/folder visibility
	- FAVOUR cross-mode file opening
	- FAVOUR cross-mode file transfer
	- FAVOUR agent session environments configurable via docker
	- FAVOUR agent sessions appear in native model desktop app (e.g., Claude Desktop, Codex Desktop)
	- ALWAYS cross-harness agent delegation possible (CLI workaround acceptable, e.g., a Claude Code session running codex exec), where:
		- the delegated agent runs in its native harness on its native subscription (no API-key fallback)
		- the delegated session's full native transcript (including tool calls) persists and is retrievable afterwards, even if the platform doesn't display it (e.g., it survives sandbox teardown)
	- ALWAYS cross-harness artefact handover beyond prompt text (workaround acceptable, e.g., passing temp file/folder paths), including when the delegated session runs in a separate sandbox
	- ALWAYS agent orchestrator support: an agent can create, monitor, resume cross-harness agent sessions (first-class support preferred but claude/codex CLI workaround acceptable)
	- FAVOUR first-class delegated sessions (platform sessions, not hidden subprocesses), scoring partial support per component:
		- FAVOUR agents spawning sessions through the platform itself (CLI, API or MCP), so delegated sessions are first-class by default
		- FAVOUR delegated sessions listed in the platform UI, linked to their parent session
		- FAVOUR delegated sessions' tool calls shown in the platform audit trail at the same fidelity as top-level sessions
		- FAVOUR opening, messaging, interrupting or taking over a delegated session directly (ideally in its native TUI/desktop app)
		- FAVOUR all of the above from iPhone/iPad
- Constraints:
	- Modes of working:
		- On iPhone/iPad (as first-class way of doing work)
		- Personal Windows PC (WSL2 installed) (always on)
```

## 2. Evidence rules (verbatim)

- Every criterion gets PASS, PARTIAL, FAIL or UNKNOWN, plus a source URL and that source's date. UNKNOWN is not a PASS.
- Only primary sources count as evidence: repos, docs, changelogs, releases, issues. Blogs and listicles are leads, not evidence. Prefer the latest release, since these tools change weekly.

Also from the user, verbatim:

- "NEVER gates apply per component, with GitHub-based gates applying to open-source components only. ALWAYS gates apply to the whole stack."
- "If nothing clears every ALWAYS gate, report the nearest misses and the gate each one fails. Don't relax anything."

## 3. Stages (verbatim)

```text
0. Brief (you): write research/brief.md with my requirements verbatim, the evidence rules below and the per-criterion output format.
1. Resolve (one fork, plus one fresh discovery subagent in parallel):
	• The fork maps every candidate to a canonical repo/URL, tags its layer (orchestrator, client/UI, runtime/sandbox, networking, sync), and proposes a reading of any ambiguous requirement.
	• The discovery subagent proposes up to 3 credible candidates not on my list.
	• Ask me only where an interpretation would change which candidates pass.
2. Screen (one fresh subagent per candidate, model: sonnet): check the NEVER gates, iPhone interaction, native harness and subscription, and support for my Windows PC (native or via WSL2). Stop at the first hard fail.
3. Deep-dive survivors (one fork each): check every remaining ALWAYS gate, score each FAVOUR, and confirm harness integration from the source code: how it invokes claude/codex, and whether it reads, copies or proxies OAuth credentials.
4. Compose stacks (you): combine layers where no single tool clears the gates. NEVER gates apply per component, with GitHub-based gates applying to open-source components only. ALWAYS gates apply to the whole stack.
5. Verify (one fresh subagent on the main model, never a fork): give it only the brief and the shortlist. It re-checks every PASS against primary sources and tries to falsify it.
```

The user's rules for subagents, verbatim: "Subagents don't spawn their own." · "Subagents write full findings to research/<candidate>.md and return at most 10 lines to you." · "Subagents can't ask me questions, so they log open questions in their file."

---

## 4. Criterion IDs

Short labels for the requirements in §1, so files can be compared. The verbatim text in §1 is what gets checked.

| ID | Kind | Requirement (abridged; see §1) | Checked at |
|---|---|---|---|
| N1 | NEVER | GitHub stars < 1000 (if applicable). GitHub-based: open-source components only | Screen |
| N2 | NEVER | Single maintainer | Screen |
| N3 | NEVER | Abandoned, deprecated, or archived | Screen |
| A1 | ALWAYS | iPhone interaction (webapp or iOS app) | Screen |
| A3 | ALWAYS | Native subscription usage: Claude Code on a Claude subscription; Codex on an OpenAI subscription | Screen, confirmed in deep-dive |
| A4 | ALWAYS | Native harnesses: Claude Code for Anthropic models; Codex for OpenAI models | Screen, confirmed in deep-dive |
| W | Constraint | Runs for the user's Windows PC, natively or via WSL2 (from "Constraints" and the first CONSIDER line) | Screen |
| A2 | ALWAYS | Visible agent audit trail (e.g., tool calls) for every session the platform launches | Deep-dive |
| A5 | ALWAYS | Cross-mode file/folder visibility | Deep-dive |
| A6 | ALWAYS | Cross-harness delegation possible (CLI workaround OK). A6a: delegated agent in native harness on native subscription, no API-key fallback. A6b: delegated session's full native transcript (incl. tool calls) persists and is retrievable afterwards, even after sandbox teardown | Deep-dive |
| A7 | ALWAYS | Cross-harness artefact handover beyond prompt text (workaround OK), including when the delegated session runs in a separate sandbox | Deep-dive |
| A8 | ALWAYS | Agent orchestrator support: an agent can create, monitor, resume cross-harness sessions (first-class preferred; CLI workaround OK) | Deep-dive |
| F1 | FAVOUR | Runs the official claude/codex binary under its own login | Deep-dive |
| F2 | FAVOUR | GitHub stars > 5000 (if applicable; open-source only) | Deep-dive |
| F3 | FAVOUR | Native iOS app (instead of webapp) | Deep-dive |
| F4 | FAVOUR | iPad-optimised interface | Deep-dive |
| F5 | FAVOUR | Direct native agent session interaction (native TUI, or native Claude/Codex desktop GUI) | Deep-dive |
| F6 | FAVOUR | Cross-mode localhost opening | Deep-dive |
| F7 | FAVOUR | Cross-mode file opening | Deep-dive |
| F8 | FAVOUR | Cross-mode file transfer | Deep-dive |
| F9 | FAVOUR | Agent session environments configurable via Docker | Deep-dive |
| F10 | FAVOUR | Agent sessions appear in the native model desktop app (Claude Desktop, Codex Desktop) | Deep-dive |
| F11a | FAVOUR | Agents spawn sessions through the platform itself (CLI, API or MCP), so delegated sessions are first-class | Deep-dive |
| F11b | FAVOUR | Delegated sessions listed in the platform UI, linked to their parent | Deep-dive |
| F11c | FAVOUR | Delegated sessions' tool calls in the audit trail at the same fidelity as top-level sessions | Deep-dive |
| F11d | FAVOUR | Open, message, interrupt or take over a delegated session directly (ideally in its native TUI/desktop app) | Deep-dive |
| F11e | FAVOUR | All of F11a–F11d from iPhone/iPad | Deep-dive |

## 5. Per-criterion output format

One file per candidate: `research/<slug>.md` (slugs are assigned in `research/resolve.md`). Each stage appends its own section. Never delete or rewrite an earlier stage's section; if you disagree with it, add a line starting `Correction (<stage>):` in your own section.

### 5.1 File header (written by the first stage to touch the file; later stages update the Stage status row only)

```markdown
# <Display name> (`<slug>`)

| Field | Value |
|---|---|
| Canonical URL | <product or repo URL> |
| Repo | <owner/name>, or "closed source" |
| Layer(s) | orchestrator / client-UI / runtime-sandbox / networking / sync |
| Licence | <SPDX id or "proprietary"> |
| Latest release checked | <version or tag> · <YYYY-MM-DD> · <URL> |
| Stage status | Screen: SURVIVES / HARD FAIL at <ID> · Deep-dive: pending / done |
```

### 5.2 Verdict table (one per stage section)

```markdown
| ID | Verdict | Evidence (≤ 50 words; quote where you can) | Source URL | Source date |
|---|---|---|---|---|
| N3 | PASS | "v1.4.2 — 2026-10-12" on the releases page; 40 commits in the last 30 days | https://github.com/o/r/releases/tag/v1.4.2 | 2026-10-12 |
```

- **Verdict** is exactly one of PASS, PARTIAL, FAIL, UNKNOWN. UNKNOWN is not a PASS.
- **N/A** is allowed only in component files, and only (a) for the GitHub-based gates N1 and F2 on a closed-source component, or (b) when the component's layer cannot own the criterion at all (say what the component contributes instead). Stack-level verdicts never use N/A.
- **Source URL** must be a primary source (repo file or commit, docs page, changelog, release, issue/PR, App Store listing). A blog post, listicle, video or search snippet is a lead only: open the primary source it points to, or mark the criterion UNKNOWN.
- **Source date** is the date of that source: release date, commit date, doc "last updated" date, or issue/PR date. If the page shows no date, write `undated (accessed <the date you accessed it>)`.
- Cite the latest release where possible. If the evidence comes from an older release or from unreleased `main`, say so.

### 5.3 Screen section (Stage 2)

```markdown
## Stage 2 — Screen (<agent name>, checked 2026-10-18)

<verdict table: N3, N1, N2, A1, A3, A4, W, in that order; stop at the first hard fail and leave later rows out>

**Screen result:** SURVIVES · or · HARD FAIL at <ID>: <one line why>
```

### 5.4 Deep-dive section (Stage 3)

```markdown
## Stage 3 — Deep-dive (<agent name>, checked 2026-10-18)

<verdict table with an extra Score column for FAVOUR rows: A2, A3, A4, A5, A6a, A6b, A7, A8, then F1 … F11e>

### Harness integration (from source at commit <sha>, <date>)

| Harness | How invoked (official binary / SDK / direct API) | Call site (permalink to file#Lnn) | Auth path (whose login, where the credential lives) | Reads / copies / proxies OAuth credentials? |
|---|---|---|---|---|
| Claude Code | | | | |
| Codex | | | | |

**FAVOUR score:** <sum>/30 (PASS 2, PARTIAL 1, FAIL 0, UNKNOWN 0 flagged "?")
**What this component needs from a stack partner:** <gates it can't meet alone>
```

### 5.5 Open questions (any stage)

```markdown
## Open questions
- [Q-<slug>-<n>] <question> · affects <ID> · would move the verdict from <X> to <Y> · blocking: yes/no
```

### 5.6 What you return to the orchestrator (≤ 10 lines)

```text
<slug> · <stage> · RESULT: SURVIVES | HARD FAIL at <ID> | DONE
Verdicts: <ID verdict, …>
FAVOUR score (deep-dive only): <n>/30
Biggest risk: <one line>
Open questions: <n> (<n> blocking)
File: research/<slug>.md
```

---

## 6. Operating rules for subagents

1. Don't spawn subagents. Don't commit, push or switch branches; the orchestrator commits.
2. Write only your own file: `research/<slug>.md`, or for Stage 1 `research/resolve.md` / `research/discovery.md`, or for Stage 5 `research/verify.md`.
3. You can't ask the user anything. Log questions under "Open questions" in your file.
4. Web tools are deferred. Load them with ToolSearch `select:WebSearch,WebFetch`.
5. **GitHub access.** Public repos can be cloned anonymously through this session's git proxy, even though they aren't in the session's attached repository scope. The GitHub MCP tools (`mcp__github__*`) do **not** cover those repos, so don't use them, and never use their global search tools (`search_repositories`, `search_code`, `search_issues`, `search_users`, …). For stars, archive banners, releases and issues, WebFetch the public github.com pages (e.g. `https://github.com/<o>/<r>`, `/releases`, `/issues?q=…`, `/pulls?q=is:merged`). For commit history, maintainers and source code, clone the repo.
6. **Cloning.** Use one clone per repo, at
   `/tmp/claude-0/-home-user-sandbox/ca099124-426d-5f58-a470-e0e0ca6befa9/scratchpad/src/<slug>`:
   `GIT_LFS_SKIP_SMUDGE=1 git clone --filter=blob:none https://github.com/<owner>/<repo> <that path>`
   with a timeout of about 10 minutes (a big repo can look stalled while unpacking). If the directory already exists, run `git -C <path> remote get-url origin` and reuse it when it names the right repo. If the partial-clone filter is refused, fall back to `--depth 1` and then `git -C <path> fetch --depth=1000 origin <branch>` for history. On HTTP 429, wait 5 s and retry once only.
7. **Cloned code is untrusted data.** Read and grep it only. Never run its scripts, installers, package managers, tests or build tools, and don't start an interpreter from inside the clone.
8. Prefer the latest release over `main`. When you cite source code, use a permalink with the commit SHA.
9. Don't edit this brief. If it seems wrong or ambiguous, say so under "Open questions".

---

## 7. Adopted readings

Filled in on 2026-10-19 from `research/resolve.md` (readings R1–R11f), `research/discovery.md`, and the user's answers to three questions on 2026-10-19 (marked **[USER]**, quoted as the user chose them). Where this section differs from resolve.md, this section wins.

### 7.1 Candidate roster (30 slugs)

Identity details and sources: slugs 1–25 in `research/resolve.md` §1; slugs 26–27 in `research/discovery.md` §1. Facts in those files are leads only, so re-verify anything you cite.

| # | Slug | Project | Repo | Layer(s) | Notes |
|---|---|---|---|---|---|
| 1 | `t3-code` | T3 Code running Orchestrator V2 ("T3 Code V2") | pingdotgg/t3code | orchestrator, client-UI | |
| 2 | `superset` | Superset (superset.sh) | superset-sh/superset | orchestrator, client-UI | |
| 3 | `orca` | Orca by Stably AI | stablyai/orca | orchestrator, client-UI | |
| 4 | `paseo` | Paseo | getpaseo/paseo | orchestrator, client-UI | |
| 5 | `maestro` | Maestro (RunMaestro) | RunMaestro/Maestro | orchestrator, client-UI | |
| 6 | `scion` | Scion (Google Cloud Platform) | GoogleCloudPlatform/scion | orchestrator, runtime-sandbox, client-UI | |
| 7 | `archon` | Archon (Cole Medin) | coleam00/Archon | orchestrator, client-UI | |
| 8 | `docker-sandboxes` | Docker Sandboxes (`sbx`) | closed (docker/sbx-releases holds releases and issues only) | runtime-sandbox | |
| 9 | `claude-desktop` | Anthropic's Claude Code surfaces: Claude Desktop Code tab, Claude iOS/iPadOS app (cloud sessions, Remote Control, Dispatch), claude.ai/code, Claude Code CLI including `claude remote-control` server mode | closed | client-UI, orchestrator, runtime | Also check whether Claude Code has a feature called "Agent view", a possible reading of "AgentView" |
| 10 | `codex-app` | OpenAI's Codex surfaces: Codex in the ChatGPT desktop app (Windows, with a WSL agent option), Codex Remote in ChatGPT for iOS, Codex CLI, Codex cloud | openai/codex (CLI); apps closed | client-UI, orchestrator, runtime | Added by Resolve because the user's FAVOUR rows name "Codex Desktop". Discovery's `codex-remote` is merged into this slug |
| 11 | `intent` | Intent (intentapp.dev, formerly Augment Code's Intent) | intent-hq/intent (public mirror) | orchestrator, client-UI | |
| 12 | `agor` | Agor (Preset) | preset-io/agor | orchestrator, client-UI | |
| 13 | `parallel-code` | Parallel Code | johannesjo/parallel-code | orchestrator, client-UI | |
| 14 | `gas-city` | Gas City | gastownhall/gascity | orchestrator | |
| 15 | `agent-swarm` | Agent Swarm (Desplega Labs) | desplega-ai/agent-swarm | orchestrator, runtime-sandbox, client-UI | Identity is medium confidence |
| 16 | `conductor` | Conductor (Melty Labs) | closed | orchestrator, client-UI | |
| 17 | `warp` | Warp terminal plus Oz cloud agents | warpdotdev/warp (client) | client-UI, orchestrator, runtime | |
| 18 | `claude-github-app` | Claude GitHub App plus Claude Code GitHub Actions | anthropics/claude-code-action | orchestrator, runtime | |
| 19 | `codex-github-app` | ChatGPT Codex Connector GitHub App | closed | orchestrator, runtime | |
| 20 | `github-repos-issues` | GitHub repos, issues and PRs, plus GitHub Mobile | closed platform | sync | |
| 21 | `vibe-kanban` | Vibe Kanban | BloopAI/vibe-kanban | orchestrator, client-UI | Sunset notice; see N3 below |
| 22 | `agentsview` | agentsview, the main reading of "AgentView" | kenn-io/agentsview | client-UI (session viewer) | |
| 23 | `agent-view` | agent-view, the alternate reading of "AgentView" | Frayo44/agent-view | orchestrator (tmux) | Screened because the identity is medium confidence |
| 24 | `tailscale` | Tailscale, the reading of "Tailwind" | tailscale/tailscale | networking | |
| 25 | `obsidian-sync` | Obsidian Sync | closed | sync | |
| 26 | `happy` | Happy: the original `happy` CLI plus the iOS/iPadOS/web app (not Happy Desktop) | slopus/happy | client-UI, orchestrator, networking | From discovery |
| 27 | `cloudcli` | CloudCLI (formerly Claude Code UI) | siteboon/claudecodeui | client-UI, orchestrator | From discovery |
| 28 | `ios-ssh-client` | Generic iOS/iPadOS SSH terminal: Termius first; alternates Prompt 3 (Panic) and Blink Shell | various | client-UI (generic) | Added because the user ruled that generic iOS apps count for A1 |
| 29 | `ios-remote-desktop` | Generic iOS/iPadOS remote desktop: Microsoft Windows App (RDP) first; alternate Chrome Remote Desktop | various | client-UI (generic) | Added for the same reason |
| 30 | `tmux` | tmux, which keeps terminal sessions alive between SSH connections; alternate Zellij | tmux/tmux | client-UI support | Added for the same reason |

### 7.2 Readings

| ID | Adopted reading |
|---|---|
| A1 **[USER]** | The user chose: "Generic iOS apps count too — Any iOS app with interactive control passes: SSH + tmux (Blink/Termius), remote desktop, chat bots. CLI/TUI-only tools (Gas City, Agent View, plain claude/codex in tmux) pass on their own." So A1 is PASS when the user can start, monitor and message the platform's sessions from an iPhone, through any of: the component's own webapp or iOS app; an SSH terminal into its CLI/TUI; remote desktop into its GUI on the PC; or a chat-app bot adapter it ships (Slack, Telegram, Discord…). Reaching any of these over Tailscale or a VPN counts. Record which path applies. PARTIAL = read-only monitoring only. FAIL = no interactive path from an iPhone at all. A generic iOS app or tmux used this way is itself a stack component and must pass the NEVER gates (slugs 28–30). F3, F4 and F5 still score native iOS apps, iPad layouts and native-TUI access separately. |
| A3 **[USER]** | The user chose: "Fails the gate — Only the official claude binary under its own login passes (interactive, or headless `claude -p`). SDK-driven Claude on your subscription is a terms risk: PARTIAL, which can't clear an ALWAYS gate." **Claude half:** PASS = the platform launches the official `claude` binary (TUI, or headless `claude -p` including stream-json), and the binary signs in through Anthropic's own flow on the user's own plan: its stored login, or a `claude setup-token` token the user makes for their own use. The platform never offers its own Claude login and never collects, stores, copies or proxies the credential. PARTIAL = Claude driven through the Claude Agent SDK on the subscription (`@anthropic-ai/claude-agent-sdk`, Python `claude-agent-sdk`, including with `pathToClaudeCodeExecutable`), or the platform itself copies or injects the user's Claude credential into sandboxes. FAIL = API key only, the platform's own Claude login, or tokens relayed through vendor servers. **Codex half** (the user's answer didn't change it): PASS = ChatGPT-plan sign-in through Codex's own flow or OpenAI's "Sign in with ChatGPT" flow, including via `codex exec`, `codex app-server`, `codex mcp-server` or the official Codex SDK. Copying `~/.codex/auth.json` to a headless host the user controls follows OpenAI's documented path. FAIL = API key only. **Component verdict:** PASS if both halves pass; PARTIAL if one half passes and the other is PARTIAL, FAIL or absent; FAIL if neither half passes. |
| A4 | Resolve R5. PASS = Anthropic's own Claude Code agent loop (the official binary; the Agent SDK also counts for A4, though A3 treats it as above) and OpenAI's own Codex loop (binary, app-server, Codex SDK, or OpenAI-hosted). A different agent loop calling the same models (OpenCode, Pi, Warp Agent, Auggie, Happy Agent…) = FAIL for that harness. Combine the two halves into a component verdict as for A3. |
| N3 **[USER]** | The user chose: "Deprecated unless proven — Fails unless the official repo names active community maintainers and has shipped releases since the notice. Also: no release and no human commit in 90 days = abandoned." FAIL = archived or end-of-life; or an official deprecated, sunsetting or superseded notice, unless the official repo names active community maintainers and has shipped releases since that notice; or no release and no human default-branch commit in the 90 days before the check. PARTIAL = active, but part of the product is retired or the vendor steers users to a successor. A rewrite by the same maintainers (e.g., T3 Code Orchestrator V2) isn't deprecation, so evaluate the current version. |
| N2 | Resolve R3. **Public repos:** use the last 180 days of default-branch history, counting human authors only (exclude bots; AI co-author trailers aren't maintainers). PASS = ≥2 humans each authoring ≥10% of non-bot commits, or ≥2 humans merging PRs in the window. PARTIAL = one human writes ≥75% but another active human has merge rights, or a funded company team stands behind it. FAIL = one human writes ≥90% of non-bot commits and essentially all merges, with no other documented maintainer. **Closed-source products:** judge the vendor. PASS = a company with a visible team; FAIL = a solo developer. |
| N1, F2 | Resolve R10. These are the only GitHub-based gates. They apply to components whose source is public on GitHub under an OSI or source-available licence; a releases-only or issues-only repo counts as closed source (N/A). Use the canonical repo's star count. |
| W | Resolve R8. PASS = a native Windows build; or a vendor Linux build that runs in WSL2 (CLI or daemon headless, or a GUI under WSLg, per the user's CONSIDER line; note "experimental" builds); or a cloud-hosted component usable from the PC. PARTIAL = Linux support only from source, or a known WSL problem. FAIL = macOS- or iOS-only and not cloud-hosted. A generic iOS client (slugs 28–29) passes W if it can reach the PC, Windows or WSL2; note edition limits (e.g., hosting RDP needs Windows Pro). |
| Stage 2 hard fails | Resolve R9, adjusted for the A1 answer. N1, N2 and N3 hard-fail any component. W hard-fails a component that must run on the PC and has neither a Windows build nor a WSL2-usable one. A3/A4 hard-fail a component that launches agents only if neither half passes. A1 hard-fails only a component with no interactive iPhone path at all (own app, SSH, remote desktop or chat adapter). For networking, sync and generic-client components, A3/A4 are N/A; say what they contribute instead. For runtime/sandbox components, A3/A4 apply to the agents inside the sandbox, and A1 is N/A if it has no UI of its own. |
| A5, F6, F7, F8 | Resolve R1. "Cross-mode" means between M1, the iPhone/iPad, and M2, the Windows PC including WSL2. A5 PASS = from M1 the user can browse folders and read files of the agent workspaces (not just what the agent pastes into chat), and files made on M1 reach somewhere M2 sees. PARTIAL = one direction only, diffs or snippets only, or only through GitHub pushes. F6 = M1 opens a dev server an agent started on M2. F7 = open a specific file from the other mode. F8 = move files both ways. |
| A6b, A8 | Resolve R6. Native transcripts: Claude writes `~/.claude/projects/<project>/<session>.jsonl`, with subagents under `<session>/subagents/` and a default retention (`cleanupPeriodDays`) of 30 days. Codex writes under `CODEX_HOME`; confirm the path from source. A6b PASS = the delegated session's native transcript, with tool calls, ends up somewhere that outlives the sandbox or worktree and can be found later by path or ID. PARTIAL = only after a manual mount, volume or retention change the platform doesn't document. FAIL = it lives only inside an ephemeral sandbox, or only the platform's own summary survives. A8 PASS = an agent can create, monitor and resume a session in the other harness in both directions (Claude→Codex and Codex→Claude); one direction = PARTIAL. |
| A7 | Resolve R7. "Separate sandbox" means across an isolation boundary: a container or microVM, another host, the Windows↔WSL2 boundary, or (weakest) another git worktree. PASS = a documented way to pass files or folders both ways across that boundary. PARTIAL = only with manual push/pull steps. FAIL = prompt text only. |
| A2 | Resolve R11a–b. A2 covers sessions the platform launches (through its UI, API, CLI or MCP). The trail must be visible on at least one surface the user works from, showing each tool call's name, input and result or status, per session. Record separately whether it's visible on the iPhone. Sessions an agent starts as a plain subprocess are covered by A6b and F11c. |
| F1 | Resolve R11c. "Its own login" means the binary's own login; the platform never reads, copies or proxies tokens. |
| Other | Cloud execution is allowed (R11d). Paid tiers are allowed; record the cost (R11e). "Github Apps of Claude and codex" means the vendors' own GitHub apps (R11f). |
| Modes within a stack | A component with a non-compliant mode (e.g., SDK-driven Claude) can sit in a passing stack only if the stack never uses that mode, and Stage 3 confirms the compliant mode works for that component's role, including when it's driven from the iPhone. The stack must name the mode it uses. |
