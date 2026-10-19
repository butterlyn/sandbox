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

The user asked for no questions during the run, so the orchestrator decided each ambiguity below. Where a choice existed, it took the reading that does not relax a gate. Proposals and evidence: `research/resolve.md` section B (orientation only; this section is what binds).

### 7.0 Access (overrides rule 5 in section 8 where they differ)
- `api.github.com` is blocked for candidate repos ("GitHub access to this repository is not enabled for this session"). Do not use it, and do not call `add_repo`.
- Use WebFetch on `github.com` pages for stars, archived flag, releases, issues and PRs.
- Anonymous `git clone`/`fetch` of public repos works through the proxy. Use `GIT_LFS_SKIP_SMUDGE=1` and a generous timeout (up to 10 minutes).
  - Source: `git clone --depth 1 <url> <dir>`.
  - History for N2/N3: `git clone --filter=blob:none --no-checkout --shallow-since=2026-04-22 <url> <dir>`, then `git log` / `git shortlog -sne`.
  - On HTTP 429, wait 5 s and retry once.

### 7.1 Candidate identities
Screen the product in the "canonical" column. Display names follow the user's list.

| slug | canonical product | where to start |
|---|---|---|
| t3-code | T3 Code, v0.1.0+ ("T3 Code Orchestrator V2"): server, desktop, web and iOS app | github.com/pingdotgg/t3code |
| superset | Superset (superset.sh): agent IDE, CLI, SDK, MCP, iOS app | github.com/superset-sh/superset |
| orca | Orca by Stably AI: desktop agent fleet manager, iOS companion | github.com/stablyai/orca |
| paseo | Paseo: daemon, desktop, iOS and web clients, relay | github.com/getpaseo/paseo (+ getpaseo/paseo-relay) |
| maestro | Maestro: agent orchestration command center, mobile web remote | github.com/RunMaestro/Maestro |
| scion | Scion (GoogleCloudPlatform): containerised multi-agent orchestration | github.com/GoogleCloudPlatform/scion |
| archon | Archon (coleam00): workflow engine around Claude Code and Codex | github.com/coleam00/Archon |
| docker-sandboxes | Docker Sandboxes, the `sbx` CLI (the older `docker sandbox` integration in Docker Desktop is history only) | docs.docker.com/ai/sandboxes, github.com/docker/sbx-releases |
| claude-desktop | Anthropic first-party Claude Code surfaces around Claude Desktop: the Code tab (Local, SSH, WSL 2 and cloud sessions; Dispatch), the Claude iOS/iPadOS app and claude.ai/code, Remote Control, and cloud sessions. Agent view is screened separately as agentview-a. | code.claude.com/docs/en/desktop |
| intent | Intent by Augment Code | intentapp.dev |
| agor | Agor (Preset): multiplayer web canvas and daemon | github.com/preset-io/agor |
| parallel-code | Parallel Code: desktop app, phone web UI | github.com/johannesjo/parallel-code |
| gas-city | Gas City (Gas Town Hall): orchestration SDK and controller | github.com/gastownhall/gascity |
| agent-swarm | Agent Swarm (desplega.ai): lead and worker agents in containers | github.com/desplega-ai/agent-swarm |
| conductor | Conductor (conductor.build) | conductor.build |
| warp | Warp, two paths screened separately: (W1) the Warp client running the Claude Code and Codex CLIs, plus Warp Remote Control; (W2) Oz cloud harnesses | github.com/warpdotdev/warp, docs.warp.dev |
| github-apps | Two components, screened separately: (G1) the Claude GitHub App with anthropics/claude-code-action; (G2) the ChatGPT Codex connector GitHub App (`@codex`) | github.com/anthropics/claude-code-action, Codex docs |
| github-repos-issues | GitHub.com as glue: repos, issues, PRs, comments, Projects, GitHub Mobile and web. Excludes Actions-based agents and Copilot. | github.com |
| vibe-kanban | Vibe Kanban (Bloop AI) | github.com/BloopAI/vibe-kanban |
| agentview-a | Claude Code agent view (`claude agents`) | code.claude.com/docs/en/agent-view |
| agentview-b | agentsview: session and transcript viewer for 20+ agents | github.com/kenn-io/agentsview |
| tailwind | Read as **Tailscale**. No agent product called Tailwind exists, and Tailwind CSS cannot be a stack component. | tailscale.com, github.com/tailscale/tailscale |
| obsidian-sync | Obsidian Sync, with Obsidian on Windows and iOS | obsidian.md/sync |

Candidates from discovery are appended in 7.15.

### 7.2 "Cross-mode" (A5, F6, F7, F8)
- The modes are the user's two "Modes of working":
  - **M1** = iPhone/iPad.
  - **M2** = the always-on Windows PC, including its WSL2 distro.
- **A5 test.**
  - From M1, the user can browse the folder tree and read file contents of the agents' working directories on M2, including new and uncommitted files, no more than minutes stale.
  - From M2, the user can see files produced by work started from M1, including work run in vendor clouds.
  - PASS: both directions, covering the agents' workspaces.
  - PARTIAL: committed or pushed state only (e.g. GitHub), diffs only, one direction only, or a synced folder that excludes the code workspaces.
  - FAIL: none of these.
  - An Obsidian vault counts as PASS only with evidence that agent workspaces can live in the synced vault and that their file types sync.
- **F6:** from M1, load in a phone browser a dev server bound to localhost on M2 (Windows or WSL2).
- **F7:** open a specific file from one mode in a viewer or editor on the other (rendered markdown, image, PDF, code).
- **F8:** move files M1 → M2 into the agent workspace (e.g. a phone photo lands as a file) and M2 → M1 (e.g. save an artefact to iOS Files).

### 7.3 NEVER gates
- **N1 (stars)** is the GitHub-based gate. It applies only to open-source components, using the stars of the repo that holds the source.
  - "Open source" includes source-available licences developed in a public GitHub repo (ELv2, BUSL, AGPL).
  - Issue-only or release-only repos (e.g. anthropics/claude-code, docker/sbx-releases) do not make a product open source. N1 and F2 are then not applicable.
  - Open-source client + closed service (Tailscale, Warp): use the client repo.
- **N2 (single maintainer)** applies to every component. This is the conservative reading.
  - **Open source.** Window: 2026-04-22 → 2026-10-19 on the default branch.
    - Exclude bots: `*[bot]`, dependabot, renovate, github-actions, web-flow.
    - Exclude AI-agent author identities, e.g. `noreply@anthropic.com` or Codex/Copilot authors; a `Co-authored-by` human counts as the author.
    - **PASS:** at least 2 humans each either authored ≥10% of non-bot commits, merged at least one PR authored by someone else, or published a release in the window.
    - **FAIL:** the project describes itself as one person's (e.g. "built by one person") and no primary source shows a second human merging others' PRs or publishing releases in the window. Or: no second human meets any PASS condition.
    - **UNKNOWN:** the data cannot be obtained.
  - **Closed source.**
    - PASS: the vendor is an organisation with ≥2 people working on the product (team or about page, multiple staff in changelog or issues).
    - FAIL: a sole-developer product.
    - UNKNOWN: otherwise.
- **N3 (abandoned, deprecated or archived)** applies to every component. **FAIL** if any of:
  - (a) the repo is archived;
  - (b) a primary vendor or maintainer notice of deprecation, sunsetting, end-of-life, shutdown, "no longer maintained" or maintenance-only exists, even if the software still works today;
  - (c) open source: no non-bot commit to the default branch **and** no release in the last 90 days; closed source: no release or changelog entry in the last 90 days.
  - **PARTIAL:** the last 90 days contain only bot or dependency commits. If the named surface is deprecated but the vendor ships a successor, screen the successor and record the named surface's status.

### 7.4 A1 iPhone interaction
- **Minimum.** From an iPhone, through a webapp or iOS app that is part of the stack, the user can:
  - (i) list agent sessions and read their live or recent transcript;
  - (ii) message a running session and answer its permission prompts or questions;
  - (iii) start a new session, choosing the harness and the repo or working directory.
- PASS needs (i)–(iii) **for both Claude Code and Codex sessions**. Different components may cover each harness. View-only or notifications-only = PARTIAL. None = FAIL.
- **Generic terminals.** An iOS SSH/mosh terminal app, or a self-hosted web terminal, attached to the native TUI counts as "iOS app / webapp" only if all of these hold:
  - the terminal app is a named stack component that passes N1–N3;
  - sessions persist while the phone is disconnected (tmux or a supervisor);
  - (i)–(iii) are achievable.
  - It earns F3/F4 points only on the terminal app's own merits.
- **Remote desktop** (pixel-streaming the Windows desktop) = PARTIAL.

### 7.5 A2 audit trail
- **"The platform"** = any stack component that starts sessions on the user's behalf: orchestrator and client layers, schedulers, GitHub triggers. A session it starts because an agent asked through its own MCP, API or tool counts as platform-launched.
- **Test.** For every platform-launched session, a stack UI shows, during and after the run:
  - the user prompt;
  - the assistant messages;
  - each tool call with its input and its result. Truncation is acceptable if it can be expanded or the full record is one click away.
- Vendor TUIs (`claude --resume`, `codex resume`) and transcript viewers (e.g. agentsview) count as stack UIs. Raw JSONL with no renderer = PARTIAL.
- One surface suffices for A2. Record separately whether the trail is visible on iPhone; that feeds F11e and the A1 notes.
- **Not platform-launched:** sessions an agent starts through a shell command (e.g. `codex exec` inside Claude's Bash tool), and in-harness subagents. Judge these under A6b and F11c.

### 7.6 A3 native subscription, A4 native harness, F1 official binary under its own login
Grade every harness path a component uses.

| Integration path | A4 | A3 | F1 |
|---|---|---|---|
| Unmodified `claude` CLI (TUI, `-p`, stream-json, `--bg`/agent view, `remote-control`) launched by the platform, using the login the user made with `/login` | PASS | PASS | PASS |
| Unmodified `claude` with a user-minted `CLAUDE_CODE_OAUTH_TOKEN` (`claude setup-token`) injected into a container or CI | PASS | PASS | PARTIAL |
| Claude Agent SDK, which runs the Claude Code binary, self-hosted, authenticated by the user's own Claude Code login | PASS if it keeps Claude Code's default system prompt (the `claude_code` preset or CLI default) and its standard tools; PARTIAL if it substitutes its own system prompt or tool set | PASS, provided the current Anthropic primary docs allow subscription use of the Agent SDK. FAIL if the tool offers claude.ai login itself, or collects, stores or relays tokens | PARTIAL (PASS only if pointed at the user's installed `claude` and its own login) |
| ACP adapter on the Claude Agent SDK | as Agent SDK | as Agent SDK | PARTIAL |
| Tool reads or copies Claude credential files or keychain tokens into its own agent loop or proxy | FAIL | FAIL | FAIL |
| Unmodified `codex` CLI (TUI, `exec`, `resume`, `app-server` in managed ChatGPT login), the Codex SDK wrapping the binary, the IDE extension, the Codex/ChatGPT desktop app | PASS | PASS for local or self-hosted use | PASS |
| `codex app-server` with externally managed ChatGPT tokens | PASS | PASS only with OpenAI-documented consent for local or open-source apps; else FAIL | PARTIAL |
| ACP adapter on Codex | PASS if built on the official app-server or binary; PARTIAL if it embeds Codex crates | as app-server | PARTIAL |
| Non-native harness on the user's ChatGPT or Claude plan (e.g. OpenCode or Pi with ChatGPT login) | FAIL | — | FAIL |
| First-party vendor cloud (Claude Code cloud sessions, Codex cloud, `@codex` tasks), or a vendor-documented CI flow (e.g. claude-code-action with the user's `CLAUDE_CODE_OAUTH_TOKEN`, if Anthropic's docs allow it for subscriptions) | PASS | PASS | N/A (vendor-run) or PARTIAL (injected token) |
| Third-party-hosted service running the user's plan credentials on its servers | PASS if the unmodified binary is used | PARTIAL unless the vendor documents an approved arrangement with Anthropic or OpenAI; FAIL if the docs forbid it | PARTIAL or FAIL |
| API key only, with no subscription path | per harness | FAIL | per harness |

- A relay that only forwards encrypted traffic between phone and PC, with credentials staying on the PC, does not affect A3.
- **Both harnesses must be first-class.** The stack must let the user launch both Claude Code and Codex sessions; neither may be reachable only by asking the other agent to delegate. A component that runs only one harness natively gets PARTIAL for A3/A4 and needs a partner component for the other.

### 7.7 A6 delegation, A7 artefact handover
- **A6a:** the delegated session runs per a PASS row of 7.6, with no API-key fallback configured.
- **A6b** needs primary evidence of three things:
  - (1) where the delegated harness writes its full native transcript (Claude: `~/.claude/projects/...jsonl`; Codex: `$CODEX_HOME/sessions/...`);
  - (2) that this storage outlives the delegated session and any sandbox: host path, bind mount or volume, export, or vendor-side history that keeps tool calls;
  - (3) a retrieval path: `claude --resume`, `codex resume`, an app-server thread read, a file path, or a viewer.
  - Claude Code deletes transcripts after `cleanupPeriodDays` (default 30). Raising that setting is a documented user configuration, so it is part of every stack's setup rather than a fail. Record it.
  - Ephemeral sandboxes (Docker Sandboxes, cloud sessions, Actions runners) need documented persistence of the transcript; otherwise FAIL or UNKNOWN.
- **A7:** a documented way to hand files or folders, not just prompt text, to the delegated session and back. Examples: shared path or worktree, shared mount, git branch push/pull, platform attachments or artifact API, object store.
  - It must hold for every delegation topology the stack offers.
  - If the stack runs sessions in separate sandboxes, the evidence must show handover crossing that boundary.
  - If everything runs on one host, record the sandbox clause as "not exercised". The stack then cannot claim F9 points for sandbox topologies where A7 is not shown.

### 7.8 A8 orchestrator support
- **Create:** an agent in the stack programmatically starts a session of the *other* harness, with a prompt and working directory, non-interactively.
- **Monitor:** it can query status and read progress or output during or after the run.
- **Resume:** it can send a follow-up turn into the same session with context preserved.
- All three are required in both directions (Claude→Codex and Codex→Claude), with A6a holding. One direction only = PARTIAL. A CLI workaround is acceptable: `PASS (workaround)`.

### 7.9 C1 Windows PC and iPhone/iPad
- **PC-side components** pass if they install on Windows 10/11 natively or inside WSL2.
  - CLI, daemon or server with an official Linux install = `PASS (via WSL2)`.
  - Linux GUI app under WSLg = `PASS (via WSL2/WSLg)` if the Linux build is official and not labelled experimental or beta, and no WSL incompatibility is documented. PARTIAL otherwise.
  - macOS-only = FAIL.
- **Cloud, SaaS and iOS components** pass if usable from both the iPhone/iPad and the Windows PC (app or browser).
- Note whether the component runs unattended (service or daemon) or needs an open GUI window. The PC is always on, and the phone is first-class.

### 7.10 FAVOUR tests
- **F1:** see 7.6. The platform executes the unmodified official binary (or the vendor SDK or app-server that runs it), which authenticates with its own stored login; the platform never reads, copies or proxies tokens.
- **F3:**
  - PASS: an App Store app that works with the stack's agent sessions.
  - PARTIAL: TestFlight only.
  - FAIL: PWA or "Add to Home Screen" (that is a webapp).
- **F4:**
  - PASS: an iPad-specific layout (split or multi-column view, keyboard and pointer support, or App Store iPad screenshots), or a webapp with a documented tablet layout.
  - PARTIAL: an iPhone app running scaled on iPad.
- **F5:**
  - PASS: a platform-launched session can be opened and continued, with the same history, in the vendor TUI (`claude --resume`, `codex resume`, or attaching to the TUI's tmux pane) or in the vendor desktop app.
  - PARTIAL: read-only or fork-only.
- **F9:**
  - PASS: per-session environments defined by Dockerfile, image, compose or devcontainer, and the platform launches sessions inside them. microVMs built from images count.
  - PARTIAL: only the platform's own server runs in Docker.
- **F10:**
  - PASS: stack-launched sessions appear with history in Claude Desktop **and** in the Codex desktop app or the ChatGPT desktop app's Codex surface, and can be continued there.
  - PARTIAL: one vendor only, or only through a remote listing.
- **F11a–F11e:** score per orchestrator or client component. The stack's score per sub-item is the best single component's score. Report the breakdown.

### 7.11 Screen procedure (Stage 2)
- **Order:** N3 → N1 → N2 → C1 → A1 → A3/A4. Stop at the first hard fail.
- **Hard fails:**
  - FAIL on N1, N2 or N3.
  - FAIL on C1: a PC-side component with no Windows or Linux build, or a component unusable from either mode.
  - FAIL on A1: a component that launches or hosts agent sessions whose sessions cannot be reached from an iPhone by any path in 7.4. For example, a desktop-only GUI whose sessions live only in its window.
  - FAIL on A3/A4: a component that launches agents but can run **neither** harness per a PASS row of 7.6.
- **Not hard fails:**
  - A component that does not launch sessions gets `N/A (layer)` for A1, A3 and A4.
  - Runs only one harness natively → PARTIAL; continue.
- **Outcomes:**
  - `SCREEN PASS`: every applicable check is PASS.
  - `SCREEN FAIL at <ID>`.
  - `SCREEN HOLD (<IDs>)`: no hard fail, but a PARTIAL or UNKNOWN on a check the component itself must satisfy. Finish the remaining checks and say what evidence would settle it.

### 7.12 Stacks (Stage 4)
- Every component passes N1–N3.
- The whole stack passes A1–A8 and C1, with each gate cleared by a named component's PASS.
- Glue components (e.g. an iOS terminal app or a sync tool) may be used only if a subagent has screened them against N1–N3 and C1 with primary evidence.
- **Givens, not components:** the user's platforms and their built-in features, plus the two harness CLIs. That covers Windows 10/11 (including Windows file sharing over SMB, and the built-in OpenSSH Server optional feature), WSL2, iOS/iPadOS (including the Files app and Safari), and the `claude` and `codex` CLIs, plus git (the repo tool every candidate orchestrator builds on for worktrees and hand-over; Anthropic lists Git for Windows as optional for Claude Code itself). They need no NEVER screening, but any claim that relies on them still needs a primary source (e.g. Microsoft, Apple, Anthropic or OpenAI docs).
- **Screened out, so not usable even as glue:** any component with `SCREEN FAIL` (see each candidate's file).

### 7.13 Hosted execution
- Self-hosted on the user's PC is fine.
- First-party vendor clouds (Anthropic, OpenAI) are fine.
- Third-party-hosted execution with the user's plan credentials follows the 7.6 row ("Third-party-hosted service").

### 7.14 Dates
Policy pages change. For A3 evidence, cite the most recent dated primary page and quote it.

### 7.16 Clarifications after wave 1 (applied uniformly to every candidate)
Two screens graded the same facts differently, so these rules replace the ambiguous wording. Neither changes the user's gate text. The final report must show which verdicts each clarification moved, and what the stricter alternative would do.

- **a. "Preview/beta only" (section 5).**
  - PARTIAL applies when a capability is missing from the generally available build: it needs an opt-in experimental flag or setting, a beta, pre-release or TestFlight build, a waitlist, or an admin-gated preview.
  - A capability that ships enabled in the stable public release (including a public App Store release) counts as available even if the vendor labels it "beta" or "research preview". Record the label as a caveat.
  - Strict alternative: any beta label makes the gate PARTIAL.
- **b. Credential handling (7.6).**
  - **A3 judges the inference path:** do the agents' model calls run in the native harness on the user's subscription?
  - **Side reads.** A platform may read the user's OAuth credentials (Claude `.credentials.json` or keychain, Codex `auth.json`) for non-inference calls to the vendor's own endpoints, such as a usage or quota display. It may also copy them locally so the unmodified binary can run, e.g. into another `CODEX_HOME`. If the credentials never leave the user's machine except to the vendor itself:
    - A3: unaffected.
    - F1: PARTIAL at most for that harness.
    - The file must carry a **"Credential-handling policy risk"** note quoting the vendor policy (e.g. Anthropic: "developers may not collect, store, or intermediate Claude.ai credentials or session tokens") and saying exactly what the platform does, including any client impersonation such as a spoofed user-agent.
  - **A3 FAIL** if the platform does any of these:
    - uses the plan credentials for inference outside the native harness;
    - sends them to any non-vendor server;
    - offers its own claude.ai login;
    - routes other users' requests through the plan.
  - Strict alternative: any third-party read of Claude OAuth tokens fails A3 for the Claude path.
- **c. Configuration-scoped evaluation** (makes explicit what screens already did for Orca's Chat UI mode, Superset cloud workspaces, Happy's `happy connect` and Warp's Oz):
  - Gates are judged on the configuration the stack actually uses.
  - A non-compliant path does not fail the component if all of these hold:
    - it is optional and off by default, or not the documented default;
    - a compliant alternative is supported;
    - the stack documents avoiding it.
  - Example of such a path: an offered third-party claude.ai login, when the user can log in with `claude /login` instead.
  - The component then gets the 7.16b policy-risk note, and F1 is at most PARTIAL.
  - Strict alternative: offering a non-compliant login or credential path at all fails A3 for that harness.
- **d. Native-harness test is the same for both harnesses (7.6, A4).**
  - A platform that replaces the harness's built-in system prompt or base instructions, or substitutes its own tool set, gets A4 PARTIAL for that harness. Examples:
    - Claude: a custom `systemPrompt` instead of the `claude_code` preset.
    - Codex: `model_instructions_file` or `base_instructions` overriding Codex's built-in prompt.
  - Appending instructions (Claude's preset plus an append, or Codex developer instructions or AGENTS.md) keeps PASS.
  - If the replacement can be switched off in a supported configuration, 7.16c applies.

### 7.17 Stack-level scoring (Stage 4)
- **ALWAYS gates.** A named component must clear each gate with PASS, or PASS (workaround) where the gate allows it, under the stack's stated configuration.
  - A1, A3 and A4 must hold for both harnesses; different components may cover each.
  - A2 must hold for every kind of platform-launched session in the stack.
  - A6 and A8 must hold in both directions (7.8).
- **NEVER gates.** Every core component and every optional add-on passes N1–N3 (7.3).
- **FAVOUR stack scores:**
  - **F1:** the lowest score among the stack's session-launching components for the paths the stack uses. One credential-touching component lowers the whole stack.
  - **F2:** the lowest score among the stack's core open-source components. If the stack has none, F2 is 0 and marked N/A.
  - **F3–F10 and F11a–F11e:** the best single component's score; capabilities do not add.
  - Report F1–F10 (out of 20) and F11 (out of 10) separately, naming the component behind each item.
- **Optional add-ons** are listed separately with what they add. They do not change the stack's gates or scores unless they are part of the core configuration.
- **Configuration.** Every condition the stack relies on (7.16c settings, environment variables that must stay unset, `cleanupPeriodDays`, file placement, auth settings) is a numbered setup step.
- **Strict alternatives.** For each stack, state which verdicts change under each 7.16 strict alternative.

### 7.18 User directives after the first shortlist (2026-10-19)
- **Superset C1.** The user directs: "Assume superset can run on windows via WSL2 installation."
  - Superset's C1 is therefore `PASS (user assumption)`.
  - The assumption covers installing and running Superset's desktop app and/or host service inside WSL2, including WSLg.
  - Do not re-fail any other gate because the Linux/WSL2 build is labelled experimental or pre-release.
  - Record the vendor's own statements as risks, not failures: the Linux desktop app is "experimental and untested", the host CLI is Beta/pre-release, and WSL support is "not at least for a few months" (#1993).
  - Every other gate is judged as usual.
- **New candidates:** "Bernstein", "cmux", AWS's "CLI Agent Orchestrator" (the user confirmed "awe's" meant AWS), and "wmux" and "tmux", which the user describes as "cmux for windows/WSL2", i.e. the PC-side terminal/multiplexer layer. The user notes cmux may be a candidate in its own right or a component of a combined stack. Identities are resolved in `research/resolve.md` section D and listed in 7.19.

### 7.20 Rulings in the update round (2026-10-19)
- **tmux N2: PASS (narrow).**
  - 7.3 counts non-bot commits a human authored. Thomas Adam authored 19.5% of non-bot commits in the window, mostly merges of the OpenBSD tree into the portable repo. 27 of those had hand-resolved conflicts, which is maintainer work.
  - Strict alternative: count only non-merge commits and PR merges into `master`. tmux then FAILS N2, and stacks that depend on tmux (Gas City, CAO, terminal stacks) lose their runtime. The final report must show this.
- **Given (7.12 extension):** the WSL2 distro's own OpenSSH server (`openssh-server` from the distro's official repository) counts as OS plumbing, like Windows' built-in OpenSSH Server. Mosh is not a given; it is unscreened, so avoid it.

### 7.19 Candidates added by the user (identities from resolve.md section D)

| slug | canonical product and scope | where to start |
|---|---|---|
| bernstein | Bernstein: a CLI-agent orchestrator with a terminal dashboard and a browser dashboard. It runs `claude -p` (stream-json) and the `codex` CLI. Lead: the README says "Status: beta." and "Solo-maintained". | github.com/sipyourdrink-ltd/bernstein |
| cmux | cmux by Manaflow: a Ghostty-based terminal with scriptable panes, a socket API and CLI, and an iOS companion (TestFlight). Screen it as a whole product and say which layer it could fill in a combined stack (PC terminal, light orchestrator, iPhone client). Lead: macOS-only; the iOS app pairs through the Mac. | github.com/manaflow-ai/cmux, cmux.com |
| cli-agent-orchestrator | AWS Labs CLI Agent Orchestrator (CAO): a local server that runs each agent CLI in its own tmux session, with supervisor→worker hand-off via MCP and a web UI on localhost:9889. Leads: the install docs say Claude Code and Codex need API keys, which conflicts with source showing the unmodified interactive CLIs; Linux/macOS install only. | github.com/awslabs/cli-agent-orchestrator |
| wmux-a | wmux (openwong2kim): a native Windows terminal/multiplexer for agents, with a background service, MCP pane control and an iOS App Store app. Lead: about 431 stars. | github.com/openwong2kim/wmux |
| wmux-b | wmux (amirlehmam): a native Windows terminal/multiplexer that can be scripted like cmux, with a WSL2 bridge and an optional phone web console (Tailscale or SSH tunnel). Lead: about 421 stars. | github.com/amirlehmam/wmux |
| tmux | tmux: a terminal multiplexer, installed in WSL2 via `apt install tmux`. It is the session layer that Gas City and CAO already use. It has no iOS client, so iPhone access needs a screened iOS terminal app (7.4). | github.com/tmux/tmux |
| ios-terminal | Glue the orchestrator added (7.12) so tmux-style stacks can be judged for A1. Screen two iOS SSH/mosh terminal apps separately: (T1) Termius and (T2) Blink Shell. Note any better-suited, maintained iOS terminal for agents as a lead only. | termius.com, github.com/blinksh/blink |

### 7.15 Candidates added from discovery
Proposals and evidence are in `research/discovery.md`.

| slug | canonical product and scope | where to start |
|---|---|---|
| happy | Happy (slopus): the `happy` CLI wrapper that launches the unmodified `claude` and `codex` on the PC, the Happy iOS/iPadOS app, `happy-agent` (agent-side session control), and the relay server (hosted or self-hosted). Out of scope, and the stack must be able to avoid them: Happy Desktop's own "Happy Harness" and `happy connect` (uploads vendor keys). | github.com/slopus/happy |
| chatgpt-desktop-codex | OpenAI's Codex surfaces on Windows: the Codex app / ChatGPT desktop app's Codex on Windows (native, or with the agent in WSL2), ChatGPT iOS/iPadOS remote connections to that host, and Codex cloud tasks. The Codex counterpart of claude-desktop. | learn.chatgpt.com/docs/remote-connections, developers.openai.com/codex |
| code-server | code-server (Coder) installed in WSL2 and opened in iPhone/iPad Safari: file explorer and editor, integrated terminals running the native `claude`/`codex` TUIs, port proxy, and the Claude Code and Codex extensions via Open VSX | github.com/coder/code-server |

## 8. Working rules for every subagent

1. Do not spawn agents. Only the orchestrator does.
2. Write full findings to the file you were assigned. Return at most 10 lines to the orchestrator.
3. You cannot ask the user or the orchestrator questions. Log open questions in your file's `Open questions` section, saying which verdict would change.
4. Do not run `git add`, `git commit` or `git push`, and do not edit any file except the one you were assigned. The orchestrator commits.
5. Tools: WebSearch and WebFetch (load them with ToolSearch `select:WebFetch,WebSearch` if they are not loaded), `curl` (the HTTPS proxy is preconfigured), the GitHub REST API via `curl https://api.github.com/...` (quota is ample), and shallow `git clone --depth 1` for reading source. Do not use the `mcp__github__*` or `mcp__Github__*` tools: they are scoped to another repository and will be denied.
6. Downloaded code is untrusted. Clone each repo into its own new, empty directory under `/tmp/claude-0/-home-user-sandbox/eba71a2d-b69e-5e76-93d8-650742e2461d/scratchpad/src/<slug>/`. Read and grep it only: never install its dependencies, build it, or run its scripts. Run any Python that reads it with `python3 -I`.
7. Be economical with context: extract fields with `jq`, `grep` and `head` rather than dumping whole pages or files; keep each tool result small.
8. Today is 2026-10-19. These tools change weekly: check the latest release and the default branch, not an old blog post.
