# Stage 1 — Resolve: candidate map and requirement readings

- Author: resolve-candidates (fork), 2026-10-19
- Scope: identity, scope boundaries and proposed readings only. No gate verdicts. Facts noticed in passing that screeners need are listed as leads in section C, not as verdicts.

## 0. Access note for the orchestrator

- From this container, `curl` to `api.github.com/repos/<o>/<r>` for unattached repos returns: "GitHub access to this repository is not enabled for this session. Use add_repo to request access." `curl` to `github.com/<o>/<r>` HTML returns HTTP 403 (tested 2026-10-19 on 27 repos, including pingdotgg/t3code, getpaseo/paseo, openai/codex and tailscale/tailscale).
- `WebFetch` of github.com pages works. So either attach the repos listed in section A.3 before Stage 2, or tell screeners to use WebFetch for GitHub data.

---

## A. Candidate map

### A.1 Table

Sources were retrieved on 2026-10-19 unless a date is given. Stars are as displayed on the repo page via WebFetch on 2026-10-19, for orientation only; screeners must re-check them.

| slug | user's name | canonical name | canonical URL(s) | GitHub repo (OSS) | layer(s) | one-line description | conf. | alternatives considered → why rejected |
|---|---|---|---|---|---|---|---|---|
| t3-code | T3 Code V2 | T3 Code (v0.1.0+, "T3 Code Orchestrator V2") | https://github.com/pingdotgg/t3code · https://github.com/pingdotgg/t3code/releases/tag/v0.1.0 (released 2026-10-15) · https://app.t3.codes | pingdotgg/t3code (MIT, ~28.4k★) | orchestrator, client/UI | "Agent harness control surface": local server with desktop (Electron), web (app.t3.codes) and iOS/Android apps driving Claude Code, Codex, Cursor, OpenCode and others on your own machine. The v0.1.0 release, titled "T3 Code Orchestrator V2 is now stable", adds `delegate_task` (cross-provider child agents), a T3 Code MCP (agents create, launch, message, wait on, read and interrupt threads), and a subagent lineage view. | high | Earlier T3 Code "V1" (pre-0.1.0) → the user wrote V2, which is the v0.1.0 line; forks (darox/t3code, radroid/t3code) → copies. |
| superset | Superset | Superset (superset.sh) | https://github.com/superset-sh/superset · https://superset.sh | superset-sh/superset (Elastic License 2.0, source-available, ~15.3k★) | orchestrator, client/UI | "Agentic IDE to orchestrate 100+ coding agents in parallel": an Electron desktop app with CLI, TypeScript SDK and MCP server, plus an iPhone/iPad App Store app (requires Superset Pro and iOS/iPadOS 26+). macOS is the primary target; the Linux AppImage is experimental; Windows "not yet available". | high | Apache Superset → a BI/dashboard tool, unrelated to agents. |
| orca | Orca | Orca (Stably AI) | https://github.com/stablyai/orca | stablyai/orca (MIT, ~96.7k★ as displayed; re-check) | orchestrator, client/UI | Desktop app (macOS/Windows/Linux) running a "fleet" of CLI agents (Claude Code, Codex and others), each in its own git worktree, with SSH remote runtimes and an iOS/Android companion app to monitor and steer agents. | high | orca-cli/orca → a Go MCP-driven run queue with no UI or mobile, a weaker fit; zaridan/orca, 0bkevin/orca → mirrors or forks of stablyai/orca. |
| paseo | Paseo | Paseo | https://github.com/getpaseo/paseo · https://paseo.sh | getpaseo/paseo (Apache-2.0, ~21.3k★); relay at getpaseo/paseo-relay | orchestrator, client/UI | "Orchestrate multiple coding agents from desktop and mobile": a local daemon manages agent processes, with desktop (Electron), native iOS/Android, a self-hostable web UI (Docker, :6767) and a CLI. Pairing uses an E2E-encrypted relay, or a direct TCP/Tailscale connection. | high | None plausible. |
| maestro | Maestro | Maestro ("Agent Orchestration Command Center") | https://github.com/RunMaestro/Maestro (github.com/pedramamini/Maestro now renders RunMaestro/Maestro) | RunMaestro/Maestro (AGPL-3.0, ~3.5k★) | orchestrator, client/UI | Cross-platform desktop app (Windows build docs, Chocolatey) running Claude Code, Codex, OpenCode and others in parallel worktrees. "Mobile Remote Control" is a built-in web server reached by QR code, optionally through a Cloudflare tunnel. Also ships `maestro-cli` for headless use. | high | maestro-fleet (Maestrodevs, PyPI) → Claude-only, with a Slack bridge as its mobile path; mobile-dev-inc/maestro → a mobile UI-testing framework, not agent orchestration. |
| scion | Scion | Scion (Google Cloud Platform) | https://github.com/GoogleCloudPlatform/scion | GoogleCloudPlatform/scion (Apache-2.0, ~2.0k★) | orchestrator, runtime/sandbox, client/UI | Multi-agent orchestration running Claude Code, Codex, Antigravity and OpenCode agents in containers (Docker, Podman, Apple Container, Kubernetes, Cloud Run), with a "Workstation" web UI. The README calls it pre-1.0, "evolving rapidly", and "not an officially supported Google product". | high | None plausible. |
| archon | Archon | Archon ("harness builder for AI coding") | https://github.com/coleam00/Archon | coleam00/Archon (MIT, ~23.7k★) | orchestrator, client/UI | YAML workflow engine that wraps Claude Code, Codex and Pi in deterministic plan → implement → validate → PR pipelines. Interfaces: CLI, a web UI (`archon serve`), and Telegram, Slack, Discord and GitHub-webhook adapters. Binaries for macOS, Linux and Windows, plus Docker. | high | The original Archon (Python RAG and task manager) → preserved only on an archive branch of the same repo; not the current product. |
| docker-sandboxes | Docker sandboxes | Docker Sandboxes (`sbx` CLI) | https://docs.docker.com/ai/sandboxes/ · https://www.docker.com/products/docker-sandboxes/ · issues: https://github.com/docker/sbx-releases/issues | closed (docker/sbx-releases is an issue and release repo; no public source found) | runtime/sandbox | Runs coding agents (Claude Code, Codex, Copilot, Cursor, Gemini, OpenCode and others) in per-workspace microVM sandboxes, locally or on Docker-managed cloud. Local use is free. Installs via winget on Windows, Homebrew on macOS, and Ubuntu packages. | high (product), med (closed source) | Docker Desktop's integrated `docker sandbox run` → labelled "(deprecated)" in Docker docs (seen in a search-index snapshot; the page now 404s), so screen the `sbx` successor. Plain `docker run` or devcontainers → generic Docker, which belongs under F9, not this candidate. |
| claude-desktop | Claude desktop app | Anthropic first-party Claude Code surfaces centred on Claude Desktop (scope in A.2) | https://code.claude.com/docs/en/desktop · https://code.claude.com/docs/en/desktop-wsl · https://code.claude.com/docs/en/remote-control | closed (anthropics/claude-code is an issue tracker and changelog repo) | client/UI, orchestrator, runtime/sandbox (cloud sessions), networking (Remote Control relay) | Claude Desktop (Windows, macOS, Linux via apt) Code tab: parallel local, SSH, WSL 2 or cloud sessions; Dispatch from phone. Paired with the Claude iOS/iPadOS app and claude.ai/code through Remote Control and cloud sessions. | high | Claude Desktop "Chat" only → can't run coding agents, so it couldn't be what the user means. |
| intent | Intent | Intent (by Augment Code; augmentcode.com/product/intent redirects to intentapp.dev) | https://www.intentapp.dev/ · releases: https://github.com/intent-hq/cloudlands-releases/releases/stable | closed (releases-only repo; licence not stated) | orchestrator, client/UI | Desktop workspace where a Coordinator agent plans and delegates to CLI agents in isolated worktrees, across machines (laptops, VMs, AWS). Has an "Intent mobile app" on the App Store. The site offers a macOS download only. | med | Other products called "Intent" → none in the agent-orchestration context. |
| agor | Agor | Agor (Preset) | https://github.com/preset-io/agor | preset-io/agor (BUSL-1.1, source-available, converts to Apache-2.0 at its Change Date; ~1.5k★) | orchestrator, client/UI | "Multiplayer" web canvas: a FeathersJS daemon with REST, WebSocket and MCP, and a React web UI. It drives Claude Code, Codex, Gemini, OpenCode, Copilot and Cursor (beta) "via their SDKs", locally, in a filesystem sandbox or a delegated substrate. Docker Compose install available. | high | None plausible. |
| parallel-code | Parallel Code | Parallel Code | https://github.com/johannesjo/parallel-code · https://parallelcode.app | johannesjo/parallel-code (MIT, ~1.1k★) | orchestrator, client/UI | Electron desktop app (macOS and Linux) running Claude Code, Codex, Gemini, Copilot CLI and Antigravity CLI side by side in worktrees. Phone UI in a mobile browser via QR code over Wi-Fi or Tailscale; native app on Android only; iOS via Add to Home Screen. Optional per-project Docker sandbox. | high | None plausible. |
| gas-city | Gas City | Gas City (Gas Town Hall) | https://github.com/gastownhall/gascity · https://gascity.com | gastownhall/gascity (MIT, ~1.4k★) | orchestrator | Go "orchestration-builder SDK": a declarative `city.toml`, a controller loop, Beads work tracking, packs and formulas. Runtime providers: tmux (default), subprocess, exec, ACP, Kubernetes. Uses the claude, codex and gemini CLIs. Installs on macOS and Linux. No dashboard is mentioned. | high | Gas Town (steveyegge/gastown) → the predecessor that Gas City was carved out of (April–May 2026); the user named Gas City. Gas Town by Kilo (cloud) → a different product. justSteve/gascity, jknair/gascity → personal forks. |
| agent-swarm | Agent Swarm | Agent Swarm (desplega.ai) | https://github.com/desplega-ai/agent-swarm · dashboard https://app.agent-swarm.dev | desplega-ai/agent-swarm (MIT, ~904★) | orchestrator, runtime/sandbox | "Company agentic operating system": a lead agent hands tasks to worker agents in Docker containers (Compose or Helm). Harness providers include Claude Code and Codex. Web dashboard and Slack input. | med | Claude Code's "agent teams" → a built-in Claude feature, not a product called Agent Swarm; parruda/claude-swarm, jayminwest/overstory, win4r/clawteam-openclaw, am-will/swarms → different names. Chosen because it is the exact name match in this context. |
| conductor | Conductor | Conductor (conductor.build) | https://www.conductor.build/ · https://www.conductor.build/docs/ (docs.conductor.build redirects here) | closed (no source repo; vendor not named on the site) | orchestrator, client/UI | Mac app running Claude Code, Codex, Cursor and OpenCode in parallel isolated workspaces with diff review and PR flow. The site and docs mention macOS only. | high | Netflix/Orkes Conductor (workflow engine) → not a coding-agent tool. |
| warp | Warp | Warp (agentic development environment and terminal) + Oz agent platform (scope in A.2) | https://github.com/warpdotdev/warp · https://docs.warp.dev/agents/cli-agents/overview (updated 2026-10-12) · https://docs.warp.dev/agents/cli-agents/remote-control (updated 2026-10-12) · https://docs.warp.dev/platform/harnesses/claude-code/ | warpdotdev/warp (client source open: AGPL-3.0, with MIT UI crates; ~65.5k★) | client/UI, orchestrator (Oz), runtime/sandbox (Oz cloud) | Terminal/ADE that runs third-party CLI agents (Claude Code, Codex) with notifications. "Remote Control" publishes a running session to a web link that "mirrors the desktop view" (tool use included) for monitoring and steering from a phone browser. Oz runs Claude Code and Codex as cloud harnesses. | high | None plausible. |
| github-apps | Github Apps of Claude and codex | Claude GitHub App + `anthropics/claude-code-action`, and Codex's GitHub integration (scope in A.2) | https://github.com/anthropics/claude-code-action · https://code.claude.com/docs/en/github-actions · https://developers.openai.com/codex/integrations/github (now redirects to a ChatGPT Learn page, "Review GitHub pull requests with Codex") | anthropics/claude-code-action (MIT, ~9.6k★); the Codex GitHub integration is closed (runs in Codex cloud) | orchestrator, runtime/sandbox | `@claude` mentions or issue assignment run Claude Code on your GitHub Actions runner. `@codex review` / `@codex <task>` start Codex cloud tasks that post reviews or update PRs. | high | — |
| github-repos-issues | Github repos/issues | GitHub.com as the coordination and sync layer (scope in A.2) | https://github.com · GitHub Mobile (iOS/iPadOS) | closed (platform) | sync, client/UI | Git remotes for artefact and branch handover; issues, PRs and comments as task queue and human-readable log; GitHub Mobile and web for iPhone/iPad. | high | — |
| vibe-kanban | Vibe Kanban | Vibe Kanban (Bloop AI) | https://github.com/BloopAI/vibe-kanban | BloopAI/vibe-kanban (Apache-2.0, ~28.4k★) | orchestrator, client/UI | Kanban web UI (`npx vibe-kanban`) orchestrating Claude Code, Codex and about ten other agents per task or worktree. Remote use via tunnels or self-hosting. Its README says "Vibe Kanban is sunsetting." (see C). | high | None plausible. |
| agentview-a | AgentView | Claude Code **agent view** (`claude agents`) | https://code.claude.com/docs/en/agent-view · announcement https://claude.com/blog/agent-view-in-claude-code (2026-05-11; lead) | closed (part of the Claude Code CLI) | orchestrator, client/UI (TUI) | One TUI screen to dispatch and manage many background Claude Code sessions, run by a supervisor process. `claude agents --json` exposes state to scripts. Research preview. Claude-only. | med | See agentview-b. Both are equally plausible, so both rows go to screening. |
| agentview-b | AgentView | **agentsview** (formerly wesm/agentsview) | https://github.com/kenn-io/agentsview | kenn-io/agentsview (MIT, ~6.2k★; latest v0.45.0 per README) | client/UI (session/audit viewer) | Local-first browser, search and analytics for coding-agent session transcripts from Claude Code, Codex and 20+ other agents. Local web UI on 127.0.0.1:8080, desktop app (macOS, Windows) and a Docker image. | med | See agentview-a. The name differs by one letter ("agents-view"), but it is the best-known third-party "agent view" tool and maps directly onto A2/A6b. |
| tailwind | Tailwind | **Tailscale** (proposed reading) | https://tailscale.com · https://tailscale.com/kb/1017/install (last validated 2026-01-05) | tailscale/tailscale (client, BSD-3-Clause); the coordination service is closed | networking | WireGuard mesh VPN with iOS, Windows and Linux clients. Serve exposes local services inside the tailnet; Funnel exposes them publicly; Taildrop transfers files between devices; Tailscale SSH. Fits F6, F8 and phone-to-PC access. | med | No agent-orchestration product named "Tailwind" was found (search, 2026-10-19). Tailwind CSS → a CSS framework; Taskade's "AI Tailwind CSS Agent" → a CSS help bot. Neither fits a stack component. Tailscale is the near-homophone that fills the missing networking layer, and Parallel Code and Paseo both name it as their remote path. |
| obsidian-sync | Obsidian Sync (CONSIDER) | Obsidian Sync | https://obsidian.md/sync | closed (SaaS; Obsidian apps are closed source) | sync | E2E-encrypted vault sync across Mac, Windows, Linux, iOS and Android, with a headless option for servers. Syncs attachments and, with an option enabled, other file types. 5 MB/file and 1 GB on Standard; 200 MB/file and 10 GB (up to 100 GB) on Plus. Vault-scoped; folders outside a vault are not addressed. | high | — |

### A.2 Scope boundaries for umbrella candidates

- **claude-desktop.** Proposed scope: Anthropic's first-party Claude Code surfaces that the desktop app ties together. Rationale: the user named the desktop app, but its iPhone story *is* these surfaces, and F10 names Claude Desktop explicitly.
  - Inside:
    - Claude Desktop Code tab: Local, Cloud, SSH and **WSL 2** environments, Dispatch, `/resume` of CLI sessions, scheduled tasks.
    - The Claude iOS/iPadOS app and claude.ai/code as clients.
    - **Remote Control** (`claude remote-control` server mode, `--remote-control`, `/rc`).
    - Cloud sessions, which run in Anthropic's cloud.
  - Outside, screened as agentview-a: Claude Code's agent view and `--bg`.
  - Outside: GitHub Actions (github-apps). Not on the list at all: the Codex counterpart (see B.13-d).
  - Source: Remote Control "connects claude.ai/code or the Claude app for iOS and Android to a Claude Code session running on your machine" (https://code.claude.com/docs/en/remote-control, undated, retrieved 2026-10-19).
- **github-apps.** Proposed scope: both "GitHub Apps" the user names. The words are plural ("Apps of Claude and codex"), so both are inside.
  - (a) The Claude GitHub App plus `anthropics/claude-code-action`. Claude Code runs on the user's GitHub Actions runner, GitHub-hosted or self-hosted, so possibly on the user's PC.
  - (b) The ChatGPT Codex connector GitHub App: `@codex review`, and `@codex …` tasks executed in Codex cloud.
  - Screen each part as a separate component.
  - Excluded: GitHub Copilot coding agent, which runs neither native harness.
- **github-repos-issues.** Proposed scope: GitHub.com features used as glue. That means repositories (git remote for artefact handover and sync), issues, PRs and comments (task queue and human-readable log), Projects, and the GitHub Mobile and web clients.
  - Excluded: Actions-based agent runners (github-apps) and Copilot.
  - Rationale: the user lists it separately from the Apps, so it is the platform-as-glue role.
- **docker-sandboxes.** Proposed scope: Docker Sandboxes, meaning the `sbx` CLI with local microVM sandboxes and optional Docker cloud sandboxes, including agent templates and credential configuration.
  - The deprecated Docker Desktop `docker sandbox` integration counts only as history.
  - Generic Docker (images, compose, devcontainers) is not this candidate. Credit it under F9 wherever another component supports it.
- **warp.** Proposed scope:
  - (a) The Warp client (open source) running Claude Code and Codex as third-party CLI agents in its terminal.
  - (b) Warp **Remote Control**, which publishes a running session to a web link with view or edit access; per the 2026-10-12 docs, "mobile" means the phone or tablet browser.
  - (c) **Oz**, Warp's agent platform, with Claude Code and Codex cloud harnesses and the build.warp.dev dashboard.
  - Screen (a)+(b) and (c) as two paths. They differ on A3: Oz "calls Anthropic directly using credentials your team provides", stored as Warp-managed secrets (docs.warp.dev/platform/harnesses/claude-code, seen via search 2026-10-19; to verify).

### A.3 Repos to attach before screening

Open-source and source-available candidate repos:

```
pingdotgg/t3code
superset-sh/superset
stablyai/orca
getpaseo/paseo
getpaseo/paseo-relay
RunMaestro/Maestro
GoogleCloudPlatform/scion
coleam00/Archon
preset-io/agor
johannesjo/parallel-code
gastownhall/gascity
desplega-ai/agent-swarm
warpdotdev/warp
anthropics/claude-code-action
BloopAI/vibe-kanban
kenn-io/agentsview
tailscale/tailscale
```

Reference repos: harnesses and adapters for checking how candidates integrate. Optional, but deep-dives will want them.

```
openai/codex
anthropics/claude-code
anthropics/claude-agent-sdk-typescript
agentclientprotocol/claude-agent-acp
agentclientprotocol/codex-acp
docker/sbx-releases
intent-hq/cloudlands-releases
```

---

## B. Ambiguous requirements — proposed readings

Each item gives: criterion · ambiguity · proposed reading (an operational test) · main alternative · whether the choice changes who passes.

### B.1 "cross-mode" (A5, F6, F7, F8)

- **Ambiguity.** What the two "modes" are.
- **Proposed reading.** Modes are the user's own two "Modes of working": **M1** = iPhone/iPad, **M2** = the always-on Windows PC including its WSL2 distro. Windows and WSL2 are one mode, but the stack must bridge them, e.g. files in WSL2 ext4 vs NTFS. Tests:
  - **A5 visibility.** From M1, browse the folder tree and read the contents of the agents' working directories on M2, including new and uncommitted files, at most minutes stale. From M2, see files produced by work started from M1, which matters when M1 starts cloud sessions.
    - PASS: both directions, covering the agents' workspaces.
    - PARTIAL: only committed or pushed state (e.g. GitHub), only diffs, only one direction, or only a synced subfolder that excludes the code workspace (e.g. an Obsidian vault).
    - FAIL: none.
  - **F6.** From M1, load a dev server bound to localhost on M2 (Windows or WSL2) in a phone browser. Either a platform preview or port-forward, or a networking component (tailnet + WSL2 port forwarding, Tailscale Serve).
  - **F7.** Open a specific M2 file on M1 in a viewer or editor (rendered md, image, PDF, code), and the reverse.
  - **F8.** Move files M1 → M2 into the agent workspace (e.g. a photo attachment lands as a file) and M2 → M1 (e.g. save an artefact to iOS Files).
- **Main alternative.** "Mode" = execution location (local PC vs cloud or sandbox), harness (Claude vs Codex), or Windows vs WSL2.
- **Changes who passes?** Yes, for cloud-centric candidates: github-apps, claude-desktop cloud sessions, Warp Oz, Docker cloud sandboxes. Under the alternative, A5 would be about local↔cloud rather than phone↔PC. The proposed reading is anchored on the user's "Modes of working" heading, so I recommend it.

### B.2 N2 "single maintainer"

- **Ambiguity.** Thresholds, and whether the gate applies to closed source.
- **Proposed test, open source.** Window: 180 days to 2026-10-19 on the default branch.
  - Exclude bots: `*[bot]`, dependabot, renovate, github-actions, web-flow.
  - Exclude AI-agent identities, e.g. "Claude <noreply@anthropic.com>" or codex/copilot authors. Co-authored-by trailers count for the human.
  - Evidence:
    - (i) Non-bot commit-author share: `git clone --shallow-since=2026-04-22` then `git shortlog -sne`.
    - (ii) `merged_by` on the 30 most recent merged PRs.
    - (iii) Who published the last 5 releases.
    - (iv) Self-description: README, FUNDING, "built by one person".
  - **PASS:** at least 2 humans each either authored ≥10% of non-bot commits, merged at least one PR authored by someone else, or published a release in the window.
  - **FAIL:** the project self-describes as one person's (decisive unless a newer primary source, e.g. MAINTAINERS or a governance doc, lists ≥2 active maintainers), or no second human meets any of the conditions above.
  - **UNKNOWN:** data unobtainable, e.g. squash merges by bots and no release data.
- **Proposed test, closed source.** The bus-factor intent still applies, using vendor evidence.
  - PASS: the vendor is an organisation with ≥2 people working on the product (team or about page, company registry, multiple staff in changelog or issues).
  - FAIL: a sole-developer product.
  - UNKNOWN: otherwise.
- **Main alternative.** N2 is "GitHub-based", so closed source is exempt. Or a looser threshold: any 2 contributors.
- **Changes who passes?**
  - Possibly paseo: its README says "built by one person", which is decisive under the proposed test.
  - conductor: the vendor is not named on its site, so UNKNOWN under the proposed test vs exempt under the alternative.
  - agor, parallel-code, gas-city and agent-swarm need the data.

### B.3 N3 "abandoned, deprecated, or archived"

- **Proposed reading.**
  - **FAIL** if any of:
    - (a) the GitHub repo is archived;
    - (b) a primary vendor or maintainer notice of deprecation, sunsetting, end-of-life, shutdown, "no longer maintained" or "maintenance mode / no new features" exists, even if the service still runs today;
    - (c) open source: no non-bot commit to the default branch **and** no release in the last 90 days; closed source: no release or changelog entry in the last 90 days.
  - **PARTIAL** if the last 90 days contain only bot or dependency commits, or if the named surface is deprecated but the same vendor ships a successor. In that case screen the successor and record the named surface as PARTIAL.
  - **PASS** otherwise.
- **Main alternative.** A 180-day or 12-month inactivity window, and "sunsetting" counts only once the shutdown has happened.
- **Changes who passes?**
  - Yes: vibe-kanban, whose README says "Vibe Kanban is sunsetting.", fails under the proposed reading and might pass under the alternative.
  - docker-sandboxes maps to the `sbx` successor either way.

### B.4 Which NEVER gates are "GitHub-based"

- **Proposed reading.**
  - **N1** (stars) is GitHub-based, so it applies to open-source components only.
  - **N2** applies to all components: GitHub evidence for open source, vendor evidence for closed source (B.2). This is the conservative choice, per "don't relax anything".
  - **N3** applies to all components: the archived flag for open source; vendor notices and changelogs for everything.
  - "Open source" for gate purposes = source publicly developed in a GitHub repo, **including source-available licences** (ELv2, BUSL, AGPL). An issues-only or releases-only repo does not make a product open source.
- **Main alternative.** N2 is also GitHub-based (closed source exempt), and/or "open source" means OSI-approved only, which would exempt ELv2/BUSL products from N1 and N2.
- **Changes who passes?**
  - The OSI-only variant would exempt superset (ELv2) and agor (BUSL-1.1) from N1 and N2. It matters if either fails N2.
  - N2-on-closed-source: likely only conductor (UNKNOWN vs exempt).

### B.5 N1 / F2 "(if applicable)"

- **Proposed reading.** Apply N1 and F2 to each open-source component (per B.4), using the stars of the repo that holds its source.
  - Not applicable to closed products, even when they have a public issue, release or plugin repo: anthropics/claude-code, docker/sbx-releases, intent-hq/cloudlands-releases.
  - Not applicable to SaaS services: GitHub.com, Obsidian Sync, the Tailscale coordination server.
  - Open-source client + closed service (Tailscale, Warp): apply to the client repo.
  - Umbrellas: per component, e.g. claude-code-action's stars count; Codex cloud is N/A.
  - Monorepos: the repo's total.
- **Main alternative.** Count stars on issue-tracker or release repos as well.
- **Changes who passes?** No pass/fail change, since closed products are exempt from N1 either way. It changes F2 points for claude-desktop, docker-sandboxes and intent.

### B.6 A1 "iPhone interaction (webapp or iOS app)"

- **Proposed minimum.** From an iPhone, through a webapp or iOS app that is part of the stack, the user can:
  - (i) list the stack's agent sessions and read their live or recent transcript;
  - (ii) send a message to a running session and answer its permission prompts or questions;
  - (iii) start a new session, choosing harness and repo or working directory.
  - (i)+(ii)+(iii) = PASS. View-only or notification-only = PARTIAL. None = FAIL.
- **Generic terminals.** An iOS SSH/mosh terminal app (e.g. Blink, Termius) or a self-hosted web terminal attached to the **native TUI** running under tmux or a supervisor on the PC **counts** as "iOS app / webapp" only if:
  - the terminal component is itself a listed stack component that passes N1–N3;
  - sessions persist with the phone disconnected;
  - (i)–(iii) are achievable, e.g. via `claude agents` or tmux's session list.
  - It earns F3/F4 points only on the terminal app's own merits.
- **Remote desktop.** Pixel-streaming the Windows desktop (RDP, Chrome Remote Desktop, VNC, Parsec) = **PARTIAL**. It interfaces to the PC's screen, not to the agent platform.
- **Main alternatives.**
  - Strict: only purpose-built agent UIs count (a vendor or platform iOS app or web UI).
  - Loose: any remote access, including remote desktop.
- **Changes who passes?** Yes.
  - CLI-only components (gas-city, agentview-a, the CLI paths of scion and archon, bare claude/codex CLIs) can meet A1 only through generic terminals. Under the strict reading they need another component's UI.
  - Under the strict reading, Claude sessions can still use Claude Remote Control, but Codex sessions need their own mobile path.

### B.7 A2 "visible agent audit trail … for every session the platform launches"

- **Proposed reading.**
  - **"The platform"** = the stack component(s) that start sessions on the user's behalf: orchestrator and client layers, schedulers, GitHub triggers.
  - **Test.** For every session such a component starts (from UI, CLI, API/MCP, schedule or @mention), a stack UI shows the user prompt, the assistant messages, and **each tool call with its input and its result**, during and after the run. Truncation is acceptable if expandable, or if the full record is one click away.
  - **"Visible"** means rendered by a stack UI: web, app, or TUI, including `claude --resume`, `codex resume` and agentsview. Raw JSONL on disk with no renderer = PARTIAL.
  - **Where.** One surface suffices for A2. Record separately whether it is visible on iPhone, which feeds A1 and F11e.
  - **Agent-started shell subprocesses.** Sessions an agent starts through a shell command (e.g. `codex exec` inside Claude's Bash tool) are **not** "launched by the platform". They are judged under A6b and F11c.
  - **Platform-started sessions.** Sessions the platform starts at an agent's request, through the platform's own MCP, API or tool (e.g. T3 Code `delegate_task`, a Superset MCP), **are** platform-launched, so A2 applies.
- **Main alternative.** A2 requires visibility on iPhone, and/or also covers agent-spawned subprocesses and in-harness subagents.
- **Changes who passes?** Yes.
  - "Must be on iPhone" fails any stack whose mobile client hides or collapses tool calls; check per candidate.
  - "Covers subprocesses" fails nearly every CLI-workaround delegation unless a viewer such as agentsview renders the child transcripts.

### B.8 A3/A4 native subscription and native harness (and F1)

**Primary policy sources (verbatim excerpts):**

- Anthropic, *Legal and compliance* (https://code.claude.com/docs/en/legal-and-compliance; undated, retrieved 2026-10-19):
  - "**OAuth authentication** is intended exclusively for purchasers of Claude Free, Pro, Max, Team, and Enterprise subscription plans and is designed to support ordinary use of Claude Code and other native Anthropic applications."
  - "Developers building products or services … including those using the Agent SDK, should use API key authentication … Anthropic does not permit third-party developers to offer Claude.ai login into their own applications, or to route requests through Free, Pro, or Max plan credentials on behalf of their users. Moreover, developers may not collect, store, or intermediate Claude.ai credentials or session tokens."
  - "Nor does it prevent an end user from signing in to the unmodified Claude Code binary with their own Claude subscription, including where a platform hosts Claude Code."
  - "The Claude Code binary must not be modified."
- Anthropic Help Center, *Use the Claude Agent SDK with your Claude plan* (https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan; **update 2026-10-07**): "You can still use the Claude Agent SDK, `claude -p`, and third-party apps with your subscription limits." The **update of 2026-06-15** paused the previously announced change. This is the latest primary source. The April 2026 "third-party harnesses move to extra usage" coverage (InfoWorld and others) is secondary and older, so treat it as context only.
- Anthropic, *Agent SDK overview* (https://code.claude.com/docs/en/agent-sdk/overview; undated, retrieved 2026-10-19):
  - The SDK is "A library that runs the Claude Code binary".
  - "Unless previously approved, Anthropic does not allow third party developers to offer claude.ai login or rate limits for their products, including agents built on the Claude Agent SDK."
- Anthropic, *Authentication* (https://code.claude.com/docs/en/authentication; retrieved 2026-10-19):
  - `claude setup-token` mints "a one-year OAuth token" through "the same browser authorization flow as `/login`", to be set as `CLAUDE_CODE_OAUTH_TOKEN` "for CI pipelines and scripts".
  - Credentials live in `~/.claude/.credentials.json` on Linux and `%USERPROFILE%\.claude\.credentials.json` on Windows.
- Anthropic, *Remote Control*: "available on Pro, Max, Team, and Enterprise plans. API keys are not supported."
- OpenAI, *Codex app-server* (https://developers.openai.com/codex/app-server; undated, retrieved 2026-10-19):
  - app-server is "the interface Codex uses to power rich clients (for example, the Codex VS Code extension)".
  - Managed mode: "Codex owns the ChatGPT OAuth flow, persists tokens, and refreshes them automatically".
  - "If you've built a local or open-source application using Codex app-server authentication, you can continue using it, though we recommend migrating to Sign in with ChatGPT … App-server authentication has never been permitted for commercial or hosted services."
  - An experimental external-token mode exists for "host apps that already own the user's ChatGPT auth lifecycle".
- OpenAI, *Sign in with ChatGPT — ChatGPT plan usage* (https://developers.openai.com/siwc/token-sharing-open-source; undated, retrieved 2026-10-19): "your open-source app can request permission to use the user's ChatGPT plan for eligible Responses API requests … These docs explain ChatGPT plan usage for open-source and locally hosted apps." Paid or remotely hosted apps need the partner form. Plan-usage tokens can also be used to "Configure Codex app-server".
- OpenAI, *Codex authentication* (https://developers.openai.com/codex/auth; retrieved 2026-10-19):
  - The ChatGPT desktop app, Codex CLI and IDE extension support ChatGPT sign-in, which gives subscription access, and API-key sign-in.
  - "Codex cloud requires signing in with ChatGPT."
  - "Use Codex locally on the ChatGPT desktop app."

**Proposed classification** (apply per harness path in each candidate):

| Integration path | A4 native harness | A3 native subscription | F1 official binary, own login |
|---|---|---|---|
| Unmodified `claude` CLI: TUI, `-p`, `--output-format stream-json`, `--bg`/agent view, `remote-control`. Launched by the platform; the binary uses the login the user made with `/login`. | PASS | PASS (self-hosted, personal use) | PASS |
| Unmodified `claude` with `CLAUDE_CODE_OAUTH_TOKEN` from `claude setup-token`, set by the user (CI, containers, sandboxes) | PASS | PASS (Anthropic's own flow) | PARTIAL (credential injected, not the binary's own stored login) |
| Claude Agent SDK, which "runs the Claude Code binary", in a self-hosted or open-source tool, authenticated by the user's existing Claude Code login | PASS | PASS for the user's own self-hosted use per the 2026-10-07 article. FAIL if the tool itself offers claude.ai login or collects, stores or relays tokens. | PARTIAL (SDK-bundled binary; PASS only if pointed at the user's installed `claude` and its own login) |
| ACP adapter on the Claude Agent SDK (`claude-agent-acp`) | as Agent SDK | as Agent SDK | PARTIAL |
| Tool reads or copies `.credentials.json` / keychain tokens and calls Anthropic from its own agent loop or proxy | FAIL | FAIL ("may not collect, store, or intermediate") | FAIL |
| Unmodified `codex` CLI: TUI, `exec`, `resume`, `app-server` in managed ChatGPT login; Codex SDK (wraps the binary); IDE extension; ChatGPT desktop app (Codex) | PASS | PASS for local or open-source use. Vendor-hosted services need OpenAI permission: "never permitted for commercial or hosted services". | PASS |
| `codex app-server` with externally managed ChatGPT tokens (host app owns auth) | PASS | PASS only if the tokens come from Sign in with ChatGPT plan-usage consent in an open-source or local app; otherwise FAIL | PARTIAL |
| ACP adapter on Codex: agentclientprotocol/codex-acp, "built on the new Codex App Server". The archived zed-industries/codex-acp predecessor "wraps the Codex CLI". | PASS for the app-server version; PARTIAL if it embeds Codex crates rather than the official binary | as app-server | PARTIAL |
| Non-Codex harness using the ChatGPT plan (SIWC plan usage via the Responses API, or OAuth reuse; e.g. OpenCode or Pi with ChatGPT login) | FAIL (not Codex) | PASS only via SIWC consent; otherwise FAIL | FAIL |
| Vendor cloud runs: Claude Code cloud sessions, Codex cloud, `@codex` tasks | PASS | PASS (plan sign-in) | N/A (vendor-run) |
| Third-party-hosted orchestrators (vendor cloud dashboards, Oz) running Claude Code or Codex with the user's plan credentials stored as that vendor's secrets | PASS if the unmodified binary is used | PARTIAL/FAIL unless the vendor documents an approved arrangement (Anthropic: no routing through plan credentials on users' behalf; OpenAI: app-server auth never permitted for hosted services) | PARTIAL/FAIL |
| API key only | per harness | FAIL | per harness |

- **Main alternative.** Only the user-installed official CLI counts as "native harness". That would make the Agent SDK, Codex SDK and ACP adapters PARTIAL for A4.
- **Changes who passes?** Yes.
  - agor drives agents "via their SDKs".
  - Any candidate using the Claude Agent SDK, codex-acp or vendor-hosted execution (agent-swarm's hosted dashboard, warp Oz, possibly superset or paseo relays) flips between PASS and PARTIAL.
  - Screeners must record which path each candidate uses.

### B.9 A6b transcript persistence and A7 artefact handover

- **A6b PASS needs primary evidence of three things.**
  - (1) **Where** the delegated harness writes its full native transcript.
    - Claude: `~/.claude/projects/<project>/<session>.jsonl`, the "Full conversation transcript: every message, tool call, and tool result", with subagent transcripts under `<session>/subagents/` (https://code.claude.com/docs/en/claude-directory, retrieved 2026-10-19).
    - Codex: a persisted JSONL thread log under `$CODEX_HOME` sessions, with an archived directory (https://developers.openai.com/codex/app-server, retrieved 2026-10-19).
  - (2) That this location is on storage that **outlives the delegated session and its sandbox** in the proposed stack: host path, bind mount or volume, sync or export, or vendor-side history that retains tool calls.
  - (3) A **retrieval path**: `claude --resume <id>`, `codex resume <id>`, an app-server thread read, or a file path.
- **Retention caveat.** Claude Code deletes transcripts older than `cleanupPeriodDays`; "The default is 30 days" (claude-directory doc). A stack passes A6b only if it documents raising that setting. Otherwise it is PARTIAL.
- **Ephemeral sandboxes** (Docker Sandboxes, cloud sessions, Actions runners) need a documented mount, export or vendor history that includes tool calls. Otherwise FAIL or UNKNOWN.
- **Platform re-renderings** count only if they keep full message and tool-call content. Summaries do not.
- **A7 PASS needs** a documented way to hand over files or folders, not just prompt text, both to the delegated session and back. Examples: a shared filesystem path or worktree, a shared mount between sandboxes, a git branch push/pull, a platform attachment or artifact API, an object store.
- **"Including when the delegated session runs in a separate sandbox".** This must hold for every delegation topology the stack actually offers. If the stack can put sessions in per-session sandboxes (Docker, microVM, cloud), evidence must show handover crossing that boundary. If everything runs on one host, record the clause as not exercised.
- **Main alternative.** Require demonstrated cross-sandbox handover even for single-host stacks.
- **Changes who passes?** Possibly: stacks with all agents on one WSL2 host would need an extra sandboxed path under the alternative.

### B.10 A8 "create, monitor, resume" cross-harness sessions

- **Proposed reading.**
  - **Create:** an agent running in the stack, Claude Code or Codex, programmatically starts a session of the *other* harness with a prompt and working directory, non-interactively. Examples: `codex exec`, `claude -p`, `claude --bg`, or the platform's CLI, API or MCP.
  - **Monitor:** the agent can query status and read progress or output during or after the run. Examples: `codex exec --json` to a file, `claude -p --output-format stream-json`, `claude agents --json`, a platform get-thread call, reading the transcript file.
  - **Resume:** the agent sends a follow-up turn into the *same* session with context preserved. Examples: `claude -p --resume <id>`, `codex exec resume <id>`, a platform message API.
  - All three are required **in both directions** (Claude→Codex and Codex→Claude), with A6a holding. One direction only = PARTIAL. A CLI workaround is acceptable, labelled `PASS (workaround)`.
- **Main alternative.** One direction is enough.
- **Changes who passes?** Possibly, for stacks where one harness only runs somewhere the other can't reach, e.g. Codex only in Codex cloud while Claude runs locally.

### B.11 F10 "agent sessions appear in native model desktop app"

- **Proposed reading.**
  - **PASS:** sessions launched by the stack appear, with history, in Claude Desktop's session list **and** in the Codex desktop app or ChatGPT desktop app's Codex surface, and can be continued there.
  - **PARTIAL:** one vendor only, or only via a remote listing.
  - **FAIL:** neither.
- **Evidence so far** (https://code.claude.com/docs/en/desktop, retrieved 2026-10-19):
  - Claude Desktop's `/resume` "lists the sessions you started from the CLI on this computer", but it "is available in local sessions, not in SSH, WSL, or cloud sessions".
  - Desktop can run Code-tab sessions inside a WSL 2 distribution (https://code.claude.com/docs/en/desktop-wsl).
  - Remote-Control-connected sessions appear "in the session list at claude.ai/code and in the Claude apps".
  - So CLI sessions started inside WSL2 likely reach Desktop only through Remote Control listings (PARTIAL), unless started from Desktop's WSL environment.
  - Codex: needs evidence that the Windows desktop app lists CLI or app-server threads stored in WSL2's `CODEX_HOME`.
- **Main alternative.** One vendor suffices for PASS.
- **Changes who passes?** F10 is a FAVOUR, so it affects ranking only.

### B.12 C1 and K1: WSL2 and WSLg

- **Proposed reading.**
  - A PC-side component passes C1 if it installs on Windows 10/11 natively or inside WSL2 Linux.
  - CLI, daemon or server software with an official Linux install = **PASS (via WSL2)**.
  - A Linux **GUI** app under WSLg = **PASS (via WSL2/WSLg)** if the vendor ships an official, non-experimental Linux build and documents no WSL incompatibility. **PARTIAL** if the Linux build is labelled experimental or beta, or if WSL is documented as unsupported.
  - macOS-only = **FAIL**.
  - Because the PC is "always on" and the phone is first-class, also note whether the component runs unattended as a daemon or service, or needs an open GUI window.
- **Main alternative.** A GUI under WSLg is always PARTIAL, as a non-native install.
- **Changes who passes?** Yes.
  - superset (macOS primary, experimental Linux AppImage, no Windows) is PARTIAL under the proposed reading, so it fails C1.
  - parallel-code (macOS and Linux) depends on whether its Linux build is official.
  - conductor fails either way (macOS only). intent fails unless a Windows or Linux build exists.

### B.13 Other ambiguities

- **a. F11 "scoring partial support per component".**
  - Proposed: score F11a–F11e for each orchestrator or client component. The stack's score per sub-item is the **best** component's score, since capabilities don't add. Report the breakdown.
  - Alternative: sum across components.
  - Affects ranking only.
- **b. F1 "under its own login".**
  - Proposed: the platform executes the unmodified official binary (or the vendor SDK or `codex app-server` that runs it), and that binary authenticates with **its own stored login** (`claude` `/login`, `codex login`). The platform never reads, copies or proxies tokens. Grades follow the B.8 table.
  - Alternative: any official harness under the user's plan counts.
  - Affects ranking only.
- **c. Hosted vs self-hosted execution.** Per the B.8 sources, a vendor-hosted service that runs the user's Claude or ChatGPT plan credentials on the vendor's servers is outside both vendors' stated permissions unless the vendor documents approval. That makes it PARTIAL/FAIL for A3. Self-hosted on the user's PC is fine.
  - May change: agent-swarm (hosted dashboard), warp Oz, and any "Pro" remote tier.
- **d. Codex surfaces not on the user's list.** OpenAI's auth doc now says "Use Codex locally on the ChatGPT desktop app". Secondary sources (2026-05 to 2026-09) report **Codex Remote**: the ChatGPT iOS/Android app pairs by QR with a Mac or **Windows** host (Codex app or ChatGPT desktop app), GA around 2026-06-25.
  - It is the Codex analogue of the claude-desktop candidate and directly affects A1 for Codex sessions.
  - It is not on the user's list. Flagged for the orchestrator or discovery; not added here.
  - For F10, treat "Codex Desktop" as the Codex app or the ChatGPT desktop app's Codex surface.
- **e. F3 and F4 tests.**
  - F3: PASS = an App Store app that works with the stack's agent sessions. TestFlight-only = PARTIAL. PWA or "Add to Home Screen" = FAIL (that is a webapp).
  - F4: PASS = an iPad-specific layout (multi-column or split view, keyboard and pointer support, App Store listing with iPad screenshots), or a webapp with a documented tablet layout. An iPhone app running scaled on iPad = PARTIAL.
- **f. F9 "configurable via docker".**
  - PASS: the user can define per-session environments with a Dockerfile, image, compose file or devcontainer, and the platform launches sessions inside them. microVM sandboxes built from Docker images count.
  - PARTIAL: only the platform's own server runs in Docker.
- **g. F5 "direct native agent session interaction".**
  - PASS: a platform-launched session can be opened and continued, with the same history, in the vendor TUI (`claude --resume <id>`, `codex resume <id>`, or attaching to the tmux pane running the TUI) or in the vendor desktop app.
  - PARTIAL: read-only or fork-only.
- **h. "at minimum Claude Code … Codex …" (A3/A4).**
  - Proposed: the stack must launch **both** Claude Code and Codex as first-class sessions, not one of them only via delegation.
  - Alternative: one first-class, the other via delegation.
  - May change: Claude-only components (agentview-a, claude-desktop, claude-code-action alone) need a Codex counterpart in the stack under the proposed reading.

---

## C. Leads for screeners (seen in passing; not verdicts)

- **vibe-kanban:** README states "Vibe Kanban is sunsetting." and links a shutdown announcement (github.com/BloopAI/vibe-kanban, retrieved 2026-10-19). Bears on N3.
- **paseo:** README says Paseo is "built by one person", funded via GitHub Sponsors. Bears on N2.
- **superset:** ELv2; macOS primary; "Linux x64 AppImage is experimental"; Windows "not yet available". The iOS app requires Superset Pro and iOS/iPadOS 26+. Bears on C1, A1 and A3 (Pro remote path).
- **conductor:** site and docs mention macOS only. Bears on C1.
- **intent:** intentapp.dev offers a macOS download only; it has an iOS app. Bears on C1.
- **parallel-code:** macOS and Linux; iPhone only via mobile browser or Add to Home Screen. Bears on C1 and F3.
- **agent-swarm:** about 904★ displayed; hosted dashboard at app.agent-swarm.dev; harness credentials in `.env`. Bears on N1 and A3.
- **gas-city:** about 1.4k★; macOS and Linux installs; no dashboard. Bears on A1.
- **agor:** about 1.5k★; BUSL-1.1; drives agents "via their SDKs". Bears on A4 and F1.
- **scion:** "not an officially supported Google product"; pre-1.0.
- **warp:** Oz Claude Code and Codex harnesses use team-provided credentials stored as Warp secrets (A3). Remote Control's web view "mirrors the desktop view", including tool use, with view or edit access (A1, A2).
- **t3-code:** under v0.1.0 Orchestrator V2, "a V2 server and a V1 app can't connect", so the mobile app must be updated. `delegate_task` and the T3 Code MCP bear on F11a–d.
- **claude-desktop:** Remote Control server mode supports `--spawn worktree` and `--capacity` (default 32). The local process must keep running.
- **agentview-a:** research preview; Claude-only; `claude agents --json` is useful for A8 monitoring.
- **codex-acp:** zed-industries/codex-acp is archived; development moved to agentclientprotocol/codex-acp, "built on the new Codex App Server".

---

## Open questions (only those whose answer changes which candidates pass)

1. **A1 (B.6):** do generic iOS terminal apps or web terminals attached to the native TUI count as "iOS app / webapp"? Decides gas-city, agentview-a and every CLI-first stack.
2. **N3 (B.3):** does an announced sunset count as "deprecated" while the software still works? Decides vibe-kanban.
3. **N2 (B.2, B.4):** is a README self-description of one person decisive, and does N2 apply to closed-source components? Decides paseo, and conductor's UNKNOWN.
4. **"Open source" for GitHub-based gates (B.4):** are source-available licences (ELv2, BUSL) included? Affects superset and agor on N1/N2.
5. **C1 (B.12):** does a Linux GUI build under WSLg count, and does an "experimental" label make it PARTIAL? Decides superset and possibly parallel-code.
6. **A2 (B.7):** must the tool-call audit trail be visible on the iPhone itself? Could fail mobile-first candidates whose clients hide tool calls.
7. **A3/A4 (B.8):** is the Claude Agent SDK (which runs the Claude Code binary) under the user's own login a native harness on the native subscription? And are vendor-hosted executions with the user's plan credentials acceptable? Decides agor, and possibly agent-swarm, warp Oz and other SDK-based or hosted paths.
8. **A8 (B.10) and A3/A4 (B.13-h):** must cross-harness orchestration work in both directions, and must both harnesses be first-class? Decides Claude-only stacks.

---

## D. Additions (2026-10-19)

The user added two candidates after the first shortlist. Same rules as section A: identity and scope only; facts that bear on gates are leads, not verdicts. Sources retrieved 2026-10-19 via WebFetch, plus a read-only anonymous clone for Bernstein.

| slug | user's name | canonical name | canonical URL(s) | GitHub repo (licence) | layer(s) | one-line description | conf. | alternatives considered → why rejected |
|---|---|---|---|---|---|---|---|---|
| bernstein | Bernstein | Bernstein ("the open-source governance layer for AI agents") | https://github.com/sipyourdrink-ltd/bernstein (github.com/chernistry/bernstein renders as this repo) · docs https://bernstein.readthedocs.io · PyPI `bernstein` (3.x) | sipyourdrink-ltd/bernstein (Apache-2.0; ~1.3k★, 184 forks displayed) | orchestrator, client/UI | Deterministic Python scheduler (no LLM in the coordination loop) that runs CLI coding agents in parallel, each in its own git worktree, behind lint/type/test gates. Records lineage and a replay journal, with an opt-in HMAC-chained audit log. Supports 50+ agents including Claude Code and Codex. Dashboards: `bernstein live` (TUI) and `bernstein gui serve` (browser). | high | No other agent product called Bernstein found (search, 2026-10-19). The chernistry and sipyourdrink-ltd owners are the same repo, not two products. |
| cmux | cmux | cmux by Manaflow: "Open source Ghostty-based macOS terminal with vertical tabs and notifications for AI coding agents" | https://cmux.com (www.cmux.dev 301-redirects here) · https://github.com/manaflow-ai/cmux · https://cmux.com/agents/claude-code · https://cmux.com/agents/codex | manaflow-ai/cmux (GPL-3.0-or-later for the app; server parts `web/`, Cloudflare workers and relay services under BUSL-1.1; ~28.3k★, 2.5k forks displayed) | PC terminal/multiplexer (client/UI on the PC); orchestrator-lite (scriptable panes); client/UI (iOS companion, beta); runtime (cloud VMs, early access) | Native Swift/AppKit terminal built on libghostty. Workspaces and splits per task; notification rings driven by OSC 9/99/777 or agent hooks. A CLI and Unix-socket API let agents create workspaces, split panes, send keystrokes, read screen contents and drive a built-in browser. Claude Code teammates and subagents appear as native splits. `cmux ssh` and remote-tmux attach (beta). iOS companion "cmux BETA" on TestFlight pairs through the Mac's Mobile Connect window to attach to terminals. | high | **cmux.dev**: Manaflow's earlier "universal AI coding agent manager" (VS Code workspaces in cloud or local Docker); the domain now 301-redirects to cmux.com, so it is the same vendor's superseded product. **coder/cmux**: Coder's "Coding Agent Multiplexer" was renamed Mux, then Xum (the page now shows coder/xum, AGPL-3.0, ~2.1k★), and it runs "a custom agent loop", not Claude Code or Codex. No longer called cmux. **craigsc/cmux**: "tmux for Claude Code", a bash worktree manager, ~605★, Claude-only. Far less known. None is as plausible as manaflow-ai/cmux, so there is one row only. |

### D.1 cmux: where it could fit in a combined stack

- **PC terminal / multiplexer (primary role).** Hosts the unmodified `claude` and `codex` TUIs in per-task workspaces and splits, with attention notifications. cmux's Codex page says "the OpenAI Codex CLI runs in it out of the box" and does not mention handling credentials. That makes it a plausible F5 surface (native TUI) and keeps A3/A4 on the official binaries. Verify in screening.
- **Orchestrator-lite.** Through the CLI and Unix-socket API, an agent in one pane can open a sibling pane, start the other harness's TUI there, send it input, and read its screen. That is a native-TUI route for A8 (create, monitor, resume) and F11a/b/d. There is no task queue or scheduler, so it would pair with a real orchestrator, or with the agents' own delegation.
- **Client/UI (iPhone).** The iOS companion (TestFlight beta) attaches to cmux terminals from the phone. That would cover A1 and F3, but TestFlight-only scores F3 PARTIAL under 7.x/B.13-e. It pairs via the Mac's Mobile Connect window. The relay is BUSL-1.1 source.
- **Runtime.** Cloud VMs are in early access for Founder's Edition supporters. `cmux ssh` and remote-tmux attach let a Mac running cmux front a remote host, such as WSL2 on the PC over Tailscale SSH.
- **Natural pairings.**
  - claude and codex CLIs (native harnesses);
  - tmux on the host;
  - Tailscale, for SSH reachability of the PC;
  - agentsview, for transcript audit (A2, A6b);
  - Claude Code agent teams.
- **Platform lead (not a verdict).**
  - The app is macOS-only. The repo FAQ says it is a native Swift/AppKit app, macOS-only "for now".
  - Every artefact on the releases page is a macOS DMG or xcframework (e.g. pre-release `nightly-next` 04 Oct, `cmux-app-ffi-…` 18 Oct).
  - cmux.com mentions other builds "coming" with a waitlist and no timeline; the Codex page offers only a Mac download.
  - The user's devices are an iPhone/iPad and a Windows PC. No device of theirs can host the cmux app or the iOS companion's pairing, unless a Mac is added. As a candidate in its own right or as a stack component, it therefore runs straight into C1. Screening should confirm.

### D.2 Bernstein: discovery note confirmed and corrected

- **Confirmed.** It is a CLI-agent orchestrator, and its README says beta: "**Status: beta.** Solo-maintained, under active development. The version number counts releases, not maturity - minor versions may change interfaces." That is README.md line 38 at commit `920d400fec4aac122f554b1cf8845880ee37438f`, HEAD on 2026-10-19.
- **Correction 1: canonical repo.** It is `sipyourdrink-ltd/bernstein`. The `chernistry/bernstein` URL renders as that repo.
- **Correction 2: it is more than "beta, unverified".** The README self-describes as **solo-maintained** twice: line 38, and line 257 "Apache 2.0, solo maintained." That is a direct lead for N2 under 7.3/B.2, where self-description is decisive.
- **Harness lead (for screening, not a verdict).**
  - It spawns the official `claude` CLI headless with `--output-format stream-json` and `-p <prompt>`: https://github.com/sipyourdrink-ltd/bernstein/blob/920d400fec4aac122f554b1cf8845880ee37438f/src/bernstein/adapters/claude.py#L479-L544.
  - It filters `ANTHROPIC_API_KEY` into the environment when set (L989).
  - It spawns the `codex` CLI. It accepts either `OPENAI_API_KEY` or the ChatGPT session that "`codex login` stores in ~/.codex/auth.json", checking only that the file exists: https://github.com/sipyourdrink-ltd/bernstein/blob/920d400fec4aac122f554b1cf8845880ee37438f/src/bernstein/adapters/codex.py#L84-L88 and L219.
- **Platform lead.**
  - Python 3.12+; installs via uv, pipx, pip, brew, dnf, npm, Docker or devcontainer.
  - Windows and WSL support are not stated (WSL2 via Linux install is the likely path; K1).
  - Mobile: none mentioned; only the browser dashboard, reachable over a network.

### D.3 Repos for these additions

```
sipyourdrink-ltd/bernstein
manaflow-ai/cmux
```
