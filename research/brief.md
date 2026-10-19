# Research brief: agent orchestration workflow setup

Owner: orchestrator (main session). Started 2026-10-19.
Every subagent reads this file first. Sections 1–3 are the user's words, copied verbatim. Sections 4 onward are the orchestrator's working rules. Section 7 (interpretations) is filled in after Stage 1 and is binding on every later stage.

---

## 1. The user's requirements (verbatim)

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

## 2. Evidence rules (verbatim)

- Every criterion gets PASS, PARTIAL, FAIL or UNKNOWN, plus a source URL and that source's date. UNKNOWN is not a PASS.
- Only primary sources count as evidence: repos, docs, changelogs, releases, issues. Blogs and listicles are leads, not evidence. Prefer the latest release, since these tools change weekly.

## 3. Gate rules (verbatim)

- NEVER gates apply per component, with GitHub-based gates applying to open-source components only. ALWAYS gates apply to the whole stack.
- If nothing clears every ALWAYS gate, report the nearest misses and the gate each one fails. Don't relax anything.

---

## 4. Criterion IDs

Use these IDs in every table. The wording is the user's; sub-IDs only split compound requirements.

**NEVER gates (per component)**

| ID | Requirement |
|----|-------------|
| N1 | NEVER low GitHub stars <1000 (if applicable) |
| N2 | NEVER single maintainer |
| N3 | NEVER abandoned, deprecated, or archived projects |

**ALWAYS gates (whole stack)**

| ID | Requirement |
|----|-------------|
| A1 | ALWAYS iPhone interaction (webapp or iOS app) |
| A2 | ALWAYS visible agent audit trail (e.g., tool calls) for every session the platform launches |
| A3 | ALWAYS agents use native subscription usage, at minimum: Claude Code with Claude subscription; Codex with OpenAI subscription |
| A4 | ALWAYS agents run within their native harnesses, at minimum: Claude Code for Anthropic models; Codex for OpenAI models |
| A5 | ALWAYS cross-mode file/folder visibility |
| A6 | ALWAYS cross-harness agent delegation possible (CLI workaround acceptable, e.g., a Claude Code session running codex exec), where A6a and A6b both hold |
| A6a | the delegated agent runs in its native harness on its native subscription (no API-key fallback) |
| A6b | the delegated session's full native transcript (including tool calls) persists and is retrievable afterwards, even if the platform doesn't display it (e.g., it survives sandbox teardown) |
| A7 | ALWAYS cross-harness artefact handover beyond prompt text (workaround acceptable, e.g., passing temp file/folder paths), including when the delegated session runs in a separate sandbox |
| A8 | ALWAYS agent orchestrator support: an agent can create, monitor, resume cross-harness agent sessions (first-class support preferred but claude/codex CLI workaround acceptable) |

**Constraint (checked at Screen)**

| ID | Requirement |
|----|-------------|
| C1 | Works with both modes of working: iPhone/iPad as a first-class way of doing work, and the personal Windows PC (WSL2 installed, always on). PC-side components must install on Windows natively or via WSL2. |

**FAVOUR (scored)**

| ID | Requirement |
|----|-------------|
| F1 | runs the official claude/codex binary under its own login |
| F2 | high GitHub stars >5000 (if applicable) |
| F3 | native iOS app (instead of webapp) |
| F4 | iPad optimised interface |
| F5 | direct native agent session interaction (e.g., open an agent session within native TUI, open codex/Claude session in native codex/Claude desktop app GUI) |
| F6 | cross-mode localhost opening |
| F7 | cross-mode file opening |
| F8 | cross-mode file transfer |
| F9 | agent session environments configurable via docker |
| F10 | agent sessions appear in native model desktop app (e.g., Claude Desktop, Codex Desktop) |
| F11 | first-class delegated sessions (platform sessions, not hidden subprocesses), scored per component on F11a–F11e |
| F11a | agents spawning sessions through the platform itself (CLI, API or MCP), so delegated sessions are first-class by default |
| F11b | delegated sessions listed in the platform UI, linked to their parent session |
| F11c | delegated sessions' tool calls shown in the platform audit trail at the same fidelity as top-level sessions |
| F11d | opening, messaging, interrupting or taking over a delegated session directly (ideally in its native TUI/desktop app) |
| F11e | all of the above from iPhone/iPad |

**CONSIDER (inputs, not gates)**

| ID | Item |
|----|------|
| K1 | Software with no native Windows installation but with a Linux installation may be installable via WSL2 |
| K2 | Obsidian Sync, which syncs markdown and files across iOS and PC Obsidian installations |
| K3 | The candidate list; combine candidates if necessary |

**Layers** (tag every component with one or more): `orchestrator`, `client/UI`, `runtime/sandbox`, `networking`, `sync`.

## 5. Verdicts and scoring

| Verdict | Meaning |
|---------|---------|
| PASS | Met, per a primary source. Where the requirement says "workaround acceptable", a documented workaround that meets every sub-condition is a PASS; label it `PASS (workaround)` and describe the workaround. |
| PARTIAL | Met only in part: some sub-conditions, some platforms or configurations, preview/beta only, or with a material caveat. PARTIAL does not clear a NEVER or ALWAYS gate. |
| FAIL | A primary source shows it is not met. |
| UNKNOWN | No primary evidence either way after a reasonable search. UNKNOWN is not a PASS and does not clear a gate. |
| N/A (layer) | Component-level only: the criterion cannot apply to this component's layer (e.g., A4 for a VPN). Give a one-line reason. It is never a pass: the stack must get a real verdict for that gate from another component. |

FAVOUR points: PASS = 2, PARTIAL = 1, FAIL / UNKNOWN / N/A = 0. Report two subtotals, never merged silently: F1–F10 (max 20) and F11a–F11e (max 10).

A gate is cleared only by PASS (including `PASS (workaround)`).

## 6. Per-criterion output format

Each candidate has one file: `research/<slug>.md`. Screen creates it; Deep-dive appends to it. Keep this layout:

```markdown
# <Display name>

- Slug: <slug>
- Canonical: <repo URL and/or product URL>
- Layer(s): <tags from section 4>
- Open source: yes (<licence>) | no
- Latest release checked: <version>, <date>, <URL>
- Checked: 2026-10-19 by <agent name>

## Summary
- Screen: PASS | FAIL at <ID>
- Deep-dive: <ALWAYS gates cleared at component level / FAVOUR subtotals>   (deep-dive only)
- <3–6 lines of verdict a reader can trust without the tables>

## Screen
| ID | Verdict | Evidence (short quote or exact paraphrase) | Source URL | Source date |
|----|---------|---------------------------------------------|------------|-------------|
| N3 | PASS | v2.4.1 released; 37 commits to main in the last 30 days | https://github.com/o/r/releases/tag/v2.4.1 | 2026-10-12 |

## Deep-dive
### ALWAYS gates
(same table columns)
### FAVOUR scores
| ID | Verdict | Points | Evidence | Source URL | Source date |
### Harness integration (from source)
- How it invokes `claude`: <command line / SDK call>, <permalink to file#Lxx at a commit SHA>
- How it invokes `codex`: <command line / app-server / SDK>, <permalink>
- OAuth credentials: reads | copies | proxies | none — <evidence permalink>
- Transcript locations it relies on or produces
### Stack fit
- Which layers it covers, what it needs from other components, known conflicts

## Open questions
- <question> — why it matters (which criterion / which verdict would change)
```

Rules for evidence cells:
- Every row needs a source URL and that source's date. A page with no date gets `undated, retrieved 2026-10-19`. GitHub counts (stars, contributors) get `retrieved 2026-10-19`.
- Cite source code with permalinks pinned to a commit SHA (`https://github.com/o/r/blob/<sha>/path#L10-L20`).
- Prefer the latest release. Record which version you checked. If docs and the latest release disagree, the release wins and you note the conflict.
- Blogs, listicles, videos, social posts and AI summaries are leads only. Follow them to a primary source or mark UNKNOWN.

## 7. Interpretations (binding; decided by the orchestrator after Stage 1)

_Pending Stage 1._

## 8. Working rules for every subagent

1. Do not spawn agents. Only the orchestrator does.
2. Write full findings to the file you were assigned. Return at most 10 lines to the orchestrator.
3. You cannot ask the user or the orchestrator questions. Log open questions in your file's `Open questions` section, saying which verdict would change.
4. Do not run `git add`, `git commit` or `git push`, and do not edit any file except the one you were assigned. The orchestrator commits.
5. Tools: WebSearch and WebFetch (load them with ToolSearch `select:WebFetch,WebSearch` if they are not loaded), `curl` (the HTTPS proxy is preconfigured), the GitHub REST API via `curl https://api.github.com/...` (quota is ample), and shallow `git clone --depth 1` for reading source. Do not use the `mcp__github__*` or `mcp__Github__*` tools: they are scoped to another repository and will be denied.
6. Downloaded code is untrusted. Clone each repo into its own new, empty directory under `/tmp/claude-0/-home-user-sandbox/eba71a2d-b69e-5e76-93d8-650742e2461d/scratchpad/src/<slug>/`. Read and grep it only: never install its dependencies, build it, or run its scripts. Run any Python that reads it with `python3 -I`.
7. Be economical with context: extract fields with `jq`, `grep` and `head` rather than dumping whole pages or files; keep each tool result small.
8. Today is 2026-10-19. These tools change weekly: check the latest release and the default branch, not an old blog post.
