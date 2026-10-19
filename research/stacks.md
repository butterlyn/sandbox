# Stage 4: Stack composition (working detail)

- Author: compose-stacks (fork), 2026-10-19.
- Inputs: `research/brief.md` (sections 7.2–7.17 bind this file) and every candidate file in `research/`. No new web research was done. Every verdict below comes from a candidate file, which is named in each row.
- User-facing summary with full evidence tables: `research/shortlist.md`.

**Conventions**
- **T-W** = Windows-native topology: repos on `C:\`, with Claude Code and Codex running natively on Windows.
- **T-L** = WSL2 topology: repos on the WSL2 ext4 filesystem, agents running inside the distro.
- "File" means `research/<slug>.md`.

---

## 1. Component roster

### 1.1 Usable components (passed the screen, or held only on a structural gap)

| slug | Final status | Layer(s) |
|---|---|---|
| orca | Core component. Clears A1–A8 alone for both harnesses. | orchestrator, client/UI (iOS/iPad app) |
| t3-code | Core component. Clears A1, A3–A8 alone. A2 clears with one setting. | orchestrator, client/UI (iOS/iPad app, web) |
| claude-desktop | Core component, Claude half only (structural HOLD). | client/UI, orchestrator, cloud runtime, Remote Control relay |
| chatgpt-desktop-codex | Core component, Codex half only (structural HOLD). | client/UI, relay, cloud runtime |
| maestro | Core component only with the 7.16c A1 configuration. Needs an A2 partner. | orchestrator, client/UI (phone webapp) |
| agor | Usable for the Claude half only. Codex A4 is PARTIAL with no switch (7.16d). | orchestrator, client/UI (web, `/m` mobile shell) |
| tailwind (Tailscale) | Core networking layer. A5 PASS only on T-W, through Windows SMB and iOS Files. | networking |
| agentview-b (agentsview) | Optional add-on, or a core A2 partner (S4). | client/UI (transcript viewer) |
| agentview-a (Claude agent view) | Optional add-on on the Claude side. | orchestrator/client (TUI) |
| github-repos-issues | Optional add-on: A7 hand-over and A6b transcript archive. A5 only PARTIAL. | sync, client/UI |
| obsidian-sync | Optional add-on. A5 only PARTIAL. | sync |
| github-apps G1 (claude-code-action) | Optional add-on (GitHub-triggered Claude runs). | orchestrator, runtime |
| docker-sandboxes | Optional add-on: isolation for Claude sessions only. | runtime/sandbox |
| warp W1 | Optional add-on (PC terminal). | client/UI |

**Configuration conditions, by component**
- **orca**
  - Chat UI / structured mode off (`experimentalNativeChat: false`).
  - Use the system-default accounts.
  - Keep `ANTHROPIC_API_KEY`, `CLAUDE_CODE_OAUTH_TOKEN`, `CODEX_API_KEY` and `OPENAI_API_KEY` unset.
  - Raise `cleanupPeriodDays`.
  - Keep the desktop app running (`minimizeToTrayOnClose`, which is undocumented).
  - Prefer Tailscale direct to Orca Relay.
  - Experimental features (Runs, Cloud VM) off.
- **t3-code**
  - Text generation set to a Claude instance (A2).
  - Use `codex login`, not "Connect with ChatGPT".
  - Avoid T3 Connect; pair over Tailscale instead.
  - Raise `cleanupPeriodDays`.
  - Run as a WSL2 systemd service (`t3 service install`), with a Windows-side WSL keep-alive.
- **claude-desktop**
  - Exclude Dispatch (N3 FAIL sub-surface).
  - Run a per-repo `claude remote-control --spawn worktree` server in a Task Scheduler restart loop.
  - Turn on "Connect new sessions to Remote Control".
  - Raise `cleanupPeriodDays`.
  - Never set `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` or any API-key variable.
  - Keep cloud sessions out of the core.
- **chatgpt-desktop-codex**
  - Windows-native agent (default), with repos on `C:\` saved as projects.
  - ChatGPT sign-in only; never "Sign in another way".
  - Codex CLI installed natively, sharing `%USERPROFILE%\.codex`.
  - Codex cloud kept out of the core.
  - App tray-resident and keep-awake on.
- **maestro**
  - Full Access mode (the default) plus custom arg `--disallowedTools AskUserQuestion` on Claude agents.
  - "Show tool calls in responses" on.
  - `ANTHROPIC_API_KEY` unset.
  - Add the `maestro-cli.cmd` shim.
  - Turn on web-UI auto-start with a fixed port.
  - App running.
- **agor**
  - `simple` mode, with Sign in with Claude off.
  - Paste a `claude setup-token`.
  - `codex login` in WSL2.
  - Never launch Codex through Agor.
  - Password login on; tailnet-only bind.
- **tailwind**
  - Run unattended.
  - Windows host only, not inside WSL2.
  - Tailnet only, never Funnel.
  - SMB share on the Private-profile Tailscale adapter.
  - Use the MagicDNS hostname from iOS.
  - Tighten ACLs.
- **agentview-b**
  - `result_content_blocked_categories = []`.
  - `require_auth = true` for any non-loopback bind.
  - Keep Codex Cloud import and claude.ai sync off.
- **agentview-a**
  - Background sessions join Remote Control (`remoteControlAtStartup`).
  - Trust target directories in advance.
- **github-repos-issues**
  - Optional Stop/SessionEnd hooks to push transcripts.
- **obsidian-sync**
  - T-W only: vault on NTFS, "Sync all other types" on, Obsidian window left open.
- **github-apps G1**
  - Self-hosted runner in WSL2.
  - `show_full_output` on private repos.
  - `ANTHROPIC_API_KEY` unset everywhere.
- **docker-sandboxes**
  - Windows 11 with Hypervisor Platform.
  - Repos on `C:\`, mounted.
  - Copy transcripts out before `sbx rm`.
  - Codex never runs inside a sandbox.

**Policy-risk and security flags, by component**
- **orca**
  - 7.16b: reads both vendors' OAuth tokens for usage and credit endpoints, impersonating `claude-code/2.1.0` and `codex-cli` (originator "Codex Desktop").
  - The phone can spend Codex reset credits.
  - No opt-out.
  - The docs say "No API calls, no extra auth"; the source contradicts this.
- **t3-code**
  - 7.16b: reads the Claude OAuth token and sends it to `api.anthropic.com` usage/reset with UA `claude-cli/<v> (external, cli)`.
  - No opt-out short of disabling Claude.
  - "T3 Code (Beta)" label.
- **claude-desktop**
  - No credential handling by third parties.
  - The iOS app truncates approval commands and diffs at about 100 characters (#37235).
- **chatgpt-desktop-codex**
  - No credential handling by third parties.
  - The WSL2 agent mode's phone remote is unreliable (#49436, #40519).
- **maestro**
  - All permission checks off: Claude `--dangerously-skip-permissions`, Codex `--dangerously-bypass-approvals-and-sandbox`.
  - 7.16b: reads Codex `auth.json` for usage.
  - Phone link is plain HTTP plus a token, so keep it tailnet-only.
- **agor**
  - 7.16b: stores the Claude setup-token.
  - Offers its own "Sign in with Claude" (Claude Code client ID).
  - Codex runs `allow-all`.
- **tailwind**
  - No credential handling.
  - iOS allows only one VPN at a time.
- **agentview-b**
  - The Resume API can add `--dangerously-skip-permissions`.
  - The opt-in features read credentials.
- **agentview-a**
  - The Remote Control link drops on every supervisor restart (#103264).
- **github-repos-issues**
  - Agents cannot download private-repo attachments (no documented route).
- **obsidian-sync**
  - Dot-folders never sync.
  - iOS cannot open code files.
  - Last-modified wins for non-Markdown conflicts.
- **github-apps G1**
  - The runner on a personal PC executes triggered workflows, so restrict who can trigger.
- **docker-sandboxes**
  - 7.16b: the TLS proxy captures, stores and refreshes Claude OAuth.
  - Codex A3 FAIL inside `sbx`.
- **warp W1**
  - Shared scrollback sits on Warp servers for about a week with no redaction.
  - Free plan allows about 3 shares.

### 1.2 Nearest misses (components)

| slug | Status | Gate it misses | File |
|---|---|---|---|
| superset | SCREEN HOLD | C1 PARTIAL. No Windows build ("planned with no date"); the Linux desktop app is "experimental and untested"; the headless host CLI is Beta, with Pre-release-flagged releases. | superset |
| archon | Deep-dived | A5 FAIL. No workspace file browser, and no clean partner for its recommended WSL2 placement (see S6). | archon |
| gas-city | Deep-dived | A1 PARTIAL (read-only dashboard; `t3bridge` undocumented) and A5 FAIL (see S7). | gas-city |

### 1.3 Screened out (cannot be used, even as glue; 7.12)

| slug | Fail | Reason (from file) |
|---|---|---|
| vibe-kanban | N3 | Company shut down on 2026-04-10. README: "Vibe Kanban is sunsetting." |
| paseo | N2 | "Maintained by one person, full time". One person wrote 85.9% of commits and published all releases. |
| happy (CLI) | N3 | Maintenance mode since 2026-10-06 ("new features ship in Happy Desktop"). |
| happy-desktop | N1 | 94 and 32 stars. It would also fail A3/A4: it reimplements Codex and replaces Claude's prompt and tools. |
| code-server | N3 (and N2) | "not generally actively developing code-server aside from fixing regressions". One maintainer merges everything. |
| warp W2 (Oz) | A3 | API keys only. |
| agent-swarm | N1 | 904 stars. |
| scion | N2 | One person wrote 98% of commits and made every push to `main`. |
| intent | N1 | Open source since 2026-07-22, with 342 stars at most. |
| conductor | C1 | macOS only ("Conductor always runs on your Mac"). |
| parallel-code | N2 | One person merged all PRs and is behind all releases. |
| github-apps G2 (`@codex`) | N3 | "Codex Cloud (Legacy) … We plan to deprecate this experience." |

---

## 2. Topologies

- **T-W (Windows-native).**
  - Repos on `C:\`. Claude Code and the Codex CLI installed natively on Windows, sharing `%USERPROFILE%\.claude` and `%USERPROFILE%\.codex` with the vendor desktop apps.
  - Phone file access works through a Windows SMB share over Tailscale into the iOS Files app.
  - Phone remotes are reliable here (claude-desktop, chatgpt-desktop-codex).
  - Weakness: no Windows service mode for most apps, so the desktop apps must stay running.
- **T-L (WSL2).**
  - Repos on ext4, with services under systemd in the distro.
  - Unattended operation, but Microsoft says "systemd services will NOT keep your WSL instance alive" (learn.microsoft.com/en-us/windows/wsl/systemd, cited in gas-city), so it needs a Windows-side keep-alive.
  - SMB cannot publish ext4 workspaces ("by design", WSL#11355, in tailwind), so A5 must come from the platform's own phone file browser.
  - Vendor desktop apps cannot see WSL2 sessions (F10 drops).
  - Tailscale Serve → WSL2 has an open 502 issue (#9228). Mirrored networking plus the direct tailnet IP is the fallback (#14790).

---

## 3. Candidate stacks

### S1: Orca-centred (T-W)

**Components**

| Component | Role |
|---|---|
| orca | Core: orchestrator and client/UI, including the iOS/iPad app. |
| tailwind (Tailscale) | Core: networking for phone reach without Orca Relay, F6 via Serve, and an extra A5/F8 path through SMB. |

Optional add-ons: agentsview, the vendor desktop apps (F10), GitHub.

**Topology**
- Orca's Windows app runs agents Windows-native on `C:\` repos. Agent PTYs live in Orca's daemon. The app must stay running for the phone.
- The phone pairs over Tailscale (direct WebSocket on port 6768) or, as a fallback, Orca Relay (E2EE, needs an Orca account).
- Transcripts land in the real `%USERPROFILE%\.claude\projects` and `%USERPROFILE%\.codex\sessions`.

**Gate table**

| Gate | Verdict | Clearing component | Evidence (from file) | File |
|---|---|---|---|---|
| A1 | PASS | orca | iOS app 0.0.57 (public App Store build, beta label = caveat under 7.16a): (i) list and read through the terminal mirror and scrollback; (ii) reply, answer prompts, Live keystrokes; (iii) create a workspace or tab with Claude Code or Codex. Off-LAN through Relay or Tailscale. | orca A1 rows |
| A2 | PASS | orca | Native TUIs live, mirrored to the phone. Session History resumes (`claude --resume` / `codex resume`) and opens raw logs. | orca A2 |
| A3 | PASS, with 7.16b policy-risk note | orca | Unmodified CLIs on their own logins. Token side reads go only to vendor usage endpoints. | orca A3 |
| A4 | PASS | orca | Bare `claude` / `codex` in an interactive PTY shell. | orca A4 |
| A5 | PASS | orca, with tailwind as a second path | The phone browses the full workspace tree with previews. Tailscale SMB (T-W) gives a second path. | orca A5; tailwind A5 T-W |
| A6 | PASS | orca | `orca worktree create --agent codex\|claude`. Transcripts are kept when worktrees retire. Raise `cleanupPeriodDays`. | orca A6a/A6b |
| A7 | PASS (workaround); sandbox clause not exercised | orca | Shared filesystem; same or child worktree. | orca A7 |
| A8 | PASS, first-class, both directions | orca | `orca worktree create`, `orca terminal read/wait/send`. | orca A8 |
| C1 | PASS | orca, tailwind | Native Windows installer; iOS 15.1+; Tailscale Windows and iOS clients. | orca C1; tailwind C1 |

**N1–N3**

| Component | N1 | N2 | N3 |
|---|---|---|---|
| orca | 96.8k★ | 4 humans ≥10% | v1.4.229, 2026-10-17 |
| tailwind | 37.7k★ | Fitzpatrick 31.7% plus other mergers and publishers | v1.104.1, 2026-10-07 |

All PASS.

**FAVOUR (7.17)**

| Item | Points | Component | Source |
|---|---|---|---|
| F1 | 1 | orca (side reads) | orca F1 |
| F2 | 2 | min(orca 2, Tailscale 2) | orca F2; tailwind N1 |
| F3 | 2 | orca | orca F3 |
| F4 | 2 | orca | orca F4 |
| F5 | 2 | orca | orca F5 |
| F6 | 2 | tailwind (Serve, T-W) | tailwind F6 |
| F7 | 2 | orca and tailwind | orca F7; tailwind F7 |
| F8 | 2 | tailwind (SMB both ways) | tailwind F8 |
| F9 | 0 | orca's Cloud VM / Docker recipes are experimental (PARTIAL in file). 7.7 also bars F9 points because the sandbox clause is not exercised. | orca F9, A7 |
| F10 | 1 | orca (Claude half for Windows-native; Codex app listing UNKNOWN in file) | orca F10 |
| **F1–F10** | **16/20** | | |
| F11a–e | 2/2/2/2/2 = **10/10** | orca | orca F11 |

**Setup steps**
1. Install Orca (`orca-windows-setup.exe`), the Claude Code CLI and the Codex CLI natively on Windows, with repos under `C:\`.
2. Log in with `claude` → `/login` and with `codex login`. Keep `ANTHROPIC_API_KEY`, `CLAUDE_CODE_OAUTH_TOKEN`, `CODEX_API_KEY` and `OPENAI_API_KEY` unset.
3. Orca Settings → Experimental: Chat UI **off**. Leave Cloud VM, Runs and the Agent Dashboard off.
4. Set `cleanupPeriodDays` high in `%USERPROFILE%\.claude\settings.json`.
5. Keep Orca running: tray-on-close (`minimizeToTrayOnClose`), and set Windows to never sleep.
6. Tailscale: Windows client with Run unattended, plus the iOS app. Pair the Orca phone app to the PC's tailnet name on port 6768, or use Orca Relay with an Orca account.
7. Optional:
   - Share `C:\<workspaces>` over SMB on the Tailscale (Private) adapter, then on iOS use Files → Connect to Server → `smb://<magicdns-name>`.
   - `tailscale serve --bg <port>` for dev servers.

**Risks**
- **7.16b policy risk.** Orca reads both vendors' OAuth tokens and calls private usage and credit endpoints with spoofed user-agents. There is no opt-out. Anthropic's legal page says "developers may not collect, store, or intermediate Claude.ai credentials or session tokens". Possible outcomes are vendor blocking or account action.
- **Docs contradict source.** Orca's docs say "No API calls, no extra auth".
- **App must run.** Daemon survival on Windows is unconfirmed.
- **Windows host bug.** Mobile flicker while a Windows host's agent runs (#30191).
- **Stale App Store text** ("same Wi-Fi").
- **Star anomaly.** 152 watchers against 96.8k stars is unusual, but 6.2k forks and 465 author identities corroborate the count (orca N1).

**Strict alternatives**
- 7.16a: the mobile companion's "beta" label makes A1 PARTIAL → NEAREST MISS (A1).
- 7.16b: Claude token reads → A3 FAIL for the Claude path → NEAREST MISS (A3).
- 7.16c: Orca offers an experimental Agent SDK Chat UI path, which its own file says is not a PASS → A3 FAIL → NEAREST MISS.

**Verdict:** CLEARS ALL ALWAYS GATES under the binding reading. It is a nearest miss under any strict alternative.

---

### S2: T3 Code-centred (T-L service; a T-W variant exists)

**Components**

| Component | Role |
|---|---|
| t3-code | Core: orchestrator, iOS/iPad app and web app. |
| tailwind (Tailscale) | Core: direct pairing (`t3 serve --tailscale-serve` or the tailnet IP), instead of T3 Connect. |

Optional add-on: agentsview.

**Topology**
- The `t3` server runs in WSL2 as a systemd user service (`t3 service install`), with the Claude and Codex CLIs installed and logged in inside the distro. A Windows-side keep-alive is needed.
- The phone uses the T3 App Store app 2.0.0 over Tailscale.
- Transcripts land in WSL2 `~/.claude/projects` and `~/.codex/sessions`.
- **T-W variant:** the T3 Windows desktop app runs agents natively but must stay open. Its F10 is UNKNOWN.

**Gate table**

| Gate | Verdict | Clearing component | Evidence | File |
|---|---|---|---|---|
| A1 | PASS | t3-code | App Store 2.0.0 lists and reads threads, replies, approves ("Allow once" / "Allow session" / "Decline"), answers question cards, and starts New task with an environment, project and provider (Claude or Codex). | t3-code Screen A1 |
| A2 | PASS (configuration-scoped, 7.16c) | t3-code | Tool calls with full output on web and mobile, including delegated children. Helper runs default to `codex exec --ephemeral`, which leaves no transcript, so set text generation to a Claude instance (its transcripts persist). | t3-code A2 |
| A3 | PASS, with 7.16b policy-risk note | t3-code | Claude through the Agent SDK on the installed `claude` and its own login. Help Center (2026-10-07) allows the SDK on subscription limits. Codex app-server runs on `codex login`. The Claude token side read goes only to `api.anthropic.com`. | t3-code A3 |
| A4 | PASS | t3-code | `claude_code` preset (append only) plus the preset tools; unmodified `codex app-server`. | t3-code A4 |
| A5 | PASS | t3-code | iOS Files screen browses worktrees live (skipping `.git`), with code, Markdown, PDF and image previews. | t3-code A5 |
| A6 | PASS | t3-code | Delegated children use the same V2 adapters. Native transcripts persist; raise `cleanupPeriodDays`. | t3-code A6a/A6b |
| A7 | PASS; sandbox clause not exercised | t3-code | `delegate_task` shares the parent checkout or a worktree. | t3-code A7 |
| A8 | PASS, first-class, both directions | t3-code | MCP `delegate_task`, `task_status`, `t3_thread_read`, `t3_thread_send`, available to Claude and Codex threads. | t3-code A8 |
| C1 | PASS | t3-code, tailwind | Official Linux server in WSL2 with a systemd user service; native Windows desktop app; iOS 18+. | t3-code C1 |

**N1–N3**

| Component | N1 | N2 | N3 |
|---|---|---|---|
| t3-code | 28.4k★ | Marminge 41.4%, Browne 13.5% | v0.1.0, 2026-10-15 |
| tailwind | (as S1) | (as S1) | (as S1) |

All PASS.

**FAVOUR (7.17)**

| Item | Points | Component | Source |
|---|---|---|---|
| F1 | 1 | t3-code (Claude token side read) | t3-code F1 |
| F2 | 2 | min(t3 2, Tailscale 2) | |
| F3 | 2 | t3-code | |
| F4 | 2 | t3-code | |
| F5 | 2 | t3-code | |
| F6 | 2 | t3-code (streamed host browser) | |
| F7 | 2 | t3-code | |
| F8 | 2 | t3-code | |
| F9 | 0 | none | |
| F10 | 0 | WSL2 sessions are invisible to the Windows vendor apps | t3-code F10 |
| **F1–F10** | **15/20** | | |
| F11a–e | **10/10** | t3-code | |

**Correction.** t3-code.md's FAVOUR table says "17/20", but its rows sum to 1+2+2+2+2+2+2+2+0+0 = 15. This file uses 15/20.

**Setup steps**
1. In WSL2: install `t3` (official Linux CLI), plus `claude` and `codex`. Log in with `claude auth login` / `/login` and `codex login`. Keep the API-key variables unset.
2. `t3 service install` (systemd user service with lingering). Add a Windows-side keep-alive for the distro, e.g. a logon-triggered scheduled task, because systemd alone won't keep WSL running (gas-city citation of Microsoft).
3. T3 settings: text generation → a Claude instance (A2). Never use "Connect with ChatGPT" or profile transfer.
4. Raise `cleanupPeriodDays` in the WSL2 `~/.claude/settings.json`.
5. Tailscale on the Windows host (Run unattended). Pair the phone with `t3 serve --tailscale-serve`, or the tailnet IP with WSL mirrored networking. Do not use T3 Connect (Cloudflare tunnel).
6. Install T3 App Store 2.0.0, which is V2-compatible.

**Risks**
- **7.16b policy risk.** T3 reads the Claude OAuth token and calls `/api/oauth/usage`, plus `/reset_rate_limits` on user action, with UA `claude-cli/<version> (external, cli)`. There is no opt-out. Untested mitigation: authenticate only through `CLAUDE_CODE_OAUTH_TOKEN`, so no `.credentials.json` exists.
- **"Beta" label** on the product.
- **Version lock.** The V2 server and app must match.
- **Serve → WSL2 502** (#9228).
- **Paused subscription change.** The Agent SDK path depends on Anthropic's paused subscription change not resuming (Help Center 2026-06-15/2026-10-07).

**Strict alternatives**
- 7.16a: "Beta" makes T3's capabilities PARTIAL → NEAREST MISS (A1 and others).
- 7.16b: Claude path A3 FAIL → NEAREST MISS (A3).
- Defaults-only reading of 7.16c: A2 PARTIAL at defaults → NEAREST MISS (A2).

**Verdict:** CLEARS ALL ALWAYS GATES under the binding reading, with the A2 setting. It is a nearest miss under any strict alternative.

---

### S3: First-party pair, claude-desktop + chatgpt-desktop-codex + Tailscale (T-W)

**Components**

| Component | Role |
|---|---|
| claude-desktop | Core, Claude half: Claude Desktop, the Claude iOS/iPadOS app and Remote Control. |
| chatgpt-desktop-codex | Core, Codex half: the ChatGPT desktop app's Windows-native agent and ChatGPT iOS remote connections. |
| tailwind | Core: A5, F6, F7 and F8 through SMB and Serve. |

Optional add-ons:
- agentsview: full transcript UI for delegated runs. As a core component it adds F11c, giving 6/10.
- agent view: first-class Codex→Claude background children.
- GitHub (A7/A6b archive), Obsidian (Markdown/PDF and photo upload), G1, Warp W1, Docker Sandboxes (variant below).

**Topology**
- Everything Windows-native, with repos under `C:\` saved as ChatGPT projects and served by `claude remote-control` servers.
- The two vendor relays carry phone traffic. Tailscale carries SMB and dev-server traffic.
- Transcripts live in `%USERPROFILE%\.claude\projects` and `%USERPROFILE%\.codex\sessions`. The app and the CLI share them by vendor design.
- Cloud sessions (Claude cloud, Codex cloud) are **not** part of the core (reasons below).

**Gate table**

| Gate | Verdict | Clearing component | Evidence | File |
|---|---|---|---|---|
| A1 | PASS | Claude: claude-desktop. Codex: chatgpt-desktop-codex. | Claude: the iOS app lists and reads sessions, messages them, answers permission prompts and `AskUserQuestion`, and starts sessions in Remote Control-served folders (`--spawn worktree`) or the cloud. Codex: ChatGPT iOS lists host chats, follows up, answers, approves, and starts new chats in projects or a picked folder (GA since 2026-06-25). | claude-desktop A1 rows; chatgpt-desktop-codex A1 rows |
| A2 | PASS | both | Claude: Desktop Verbose view ("Every tool call…"), the TUI and `claude --resume`. Codex: commands and tool calls with output in the app and on the phone (collapsed, expandable). iPhone fidelity on the Claude side is PARTIAL (truncation, #37235), which one surface tolerates under 7.5. | claude-desktop A2; chatgpt-desktop-codex A2 |
| A3 | PASS | both | First-party OAuth: Remote Control rejects API keys; "Sign in with ChatGPT for subscription access". No third party touches tokens. | claude-desktop A3; chatgpt-desktop-codex A3 |
| A4 | PASS | both | Desktop's bundled Claude Code and the unmodified CLI; the Windows-native Codex agent. | claude-desktop A4; chatgpt-desktop-codex A4 |
| A5 | PASS | tailwind (SMB, T-W), plus chatgpt-desktop-codex (iOS workspace file browser for project folders) | The iPhone browses live `C:\` workspaces through Files → Connect to Server (Tailscale doc, last validated 2026-05-18; Apple SMB support). ChatGPT iOS also browses project folders. | tailwind A5 T-W; chatgpt-desktop-codex A5 |
| A6 | PASS (workaround), both directions | the CLIs, via both components | Claude→Codex: `codex exec` reuses the ChatGPT login from the shared `%USERPROFILE%\.codex`; rollouts persist with no age deletion. Codex→Claude: `claude -p` (or `claude --bg`) on `/login`; raise `cleanupPeriodDays`. | claude-desktop A6a/A6b; chatgpt-desktop-codex A6 |
| A7 | PASS (workaround) | both | Shared `C:\` paths. `codex exec -C <dir> --add-dir <handover>` crosses Codex's per-command sandbox (the "separate sandbox" case in T-W). | chatgpt-desktop-codex A7; claude-desktop A7 |
| A8 | PASS (workaround), both directions | both | Claude→Codex: `codex exec --json` / `codex exec resume <id>` / `codex queue`. Codex→Claude: `claude -p --output-format stream-json` / `claude -p --resume <id>` (or `claude --bg` + `claude agents --json`). | claude-desktop A8; chatgpt-desktop-codex A8; agentview-a A8 |
| C1 | PASS | all | Native Windows installers; the iOS apps are universal; Tailscale clients. The apps must stay running (no service mode). | claude-desktop C1; chatgpt-desktop-codex C1 |

**N1–N3**

| Component | N1 | N2 | N3 |
|---|---|---|---|
| claude-desktop | N/A (closed) | Anthropic (≥12 staff authors) | Claude Code 2.1.303 (2026-10-18), Desktop 2.42304.2 (2026-10-19), iOS (2026-10-17) |
| chatgpt-desktop-codex | N/A (closed) | OpenAI (staff on issues) | Codex app 26.1007 (2026-10-08), Store 2026-10-17, iOS 2026-10-16 |
| tailwind | PASS | PASS | PASS |

Dispatch is excluded (N3 FAIL sub-surface). Codex Cloud (Legacy) is excluded (see section 4).

**FAVOUR (7.17)**

| Item | Points | Component | Source |
|---|---|---|---|
| F1 | 2 | both first-party, no side reads | claude-desktop F1; chatgpt-desktop-codex F1 |
| F2 | 2 | Tailscale is the only core open-source component | 7.17 |
| F3 | 2 | both | |
| F4 | 2 | both | |
| F5 | 2 | both | |
| F6 | 2 | tailwind (Serve, T-W) | tailwind F6 |
| F7 | 2 | tailwind (SMB) | tailwind F7 |
| F8 | 2 | tailwind (SMB) | tailwind F8 |
| F9 | 0 | Claude's cloud environments are excluded from the core. SSH-to-container is a sandbox topology with no A7 evidence. | claude-desktop F9; 7.7 |
| F10 | 1 | best single component | claude-desktop F10; chatgpt-desktop-codex F10 |
| **F1–F10** | **17/20** | | |
| F11a–e | 1/1/1/1/1 = **5/10** | best single component per sub-item | claude-desktop F11; chatgpt-desktop-codex F11 |

**Note on F10.** 7.17 scores F3–F10 by the best *single* component. Each vendor app covers one vendor, so F10 = 1, even though together the two apps show app-launched sessions of both vendors. A stack-level reading would give 2; that is not used.

**Setup steps**
1. Windows-native installs:
   - Claude Desktop and the Claude Code CLI (`/login`);
   - the ChatGPT desktop app (Windows-native agent is the default; sign in with ChatGPT) and the Codex CLI natively, sharing `%USERPROFILE%\.codex`;
   - repos under `C:\…`, each added as a ChatGPT project.
2. Never set `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, `apiKeyHelper`, `CODEX_API_KEY`, `OPENAI_API_KEY` or `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`. Never use ChatGPT's "Sign in another way".
3. Claude Desktop: Settings → Claude Code → "Connect new sessions to Remote Control" on.
4. Remote Control servers:
   - Per repo, a `claude remote-control --spawn worktree --name <repo>` server, run by a Task Scheduler logon task in a restart loop. Server mode exits after about 10 minutes offline.
   - Trust each folder interactively once before automating.
5. ChatGPT app: Settings → Connections → Control this PC; pair the ChatGPT iOS app by QR; keep-awake on; tray-resident. Windows power settings: never sleep.
6. Raise `cleanupPeriodDays` in `%USERPROFILE%\.claude\settings.json`.
7. Delegation conventions (put them in CLAUDE.md / AGENTS.md):
   - Claude runs `codex exec --json -C <repo> --sandbox workspace-write [--add-dir <handover>] "<task>"`, never `--ephemeral`.
   - Codex runs `claude -p "<task>" --output-format stream-json --verbose` (or `claude --bg --name <n> "<task>"`) after approval.
   - Resume with `codex exec resume <id>` / `claude -p --resume <id>`.
8. Tailscale: Windows client with Run unattended, plus the iOS app.
   - Share the workspace root over SMB on the Private-profile Tailscale adapter.
   - On iOS: Files → Connect to Server → `smb://<magicdns-name>`.
   - `tailscale serve --bg <port>` for dev servers.
   - ACLs limited to your devices.
9. Keep Codex cloud and Claude cloud out of day-to-day stack work (see section 4).

**Risks**
- The iOS Claude app truncates approval commands and diffs at about 100 characters (#37235, closed as stale). Approve risky commands from the PC, or rely on permission rules.
- Remote Control servers have no service mode, and the link must be supervised.
- **Delegation is CLI-only.** Delegated children are not linked to their parent, so F11 is 5/10. agentsview can render them, but it shows them parentless in v0.45.0.
- `codex exec` threads listing in the ChatGPT app is UNKNOWN.
- The `claude -p` subscription allowance depends on Anthropic's paused change (2026-06-15/2026-10-07 note).

**Strict alternatives:** no verdict changes.
- 7.16a: no beta-only capability is used in the core.
- 7.16b: no third-party credential reads.
- 7.16c: no third-party login paths. API-key sign-in is a first-party alternative, not a non-compliant path.
- 7.16d: native harnesses.

**Verdict:** CLEARS ALL ALWAYS GATES, under the binding reading and every strict alternative.

**Variant S3+D (Docker Sandboxes as a core component).**
- **Changes:** Claude sessions may run in `sbx` microVMs mounted on `C:\` repos; Codex stays unsandboxed.
- **Scores:** F9 goes 0→2 (docker-sandboxes F9; cross-sandbox A7 is shown through the shared host mount). F1 drops 2→1 (`sbx` handles Claude OAuth). That gives 18/20.
- **Costs:**
  - 7.16b policy risk: the TLS proxy captures and stores Claude tokens.
  - Under strict 7.16b, A3 FAILs.
  - Windows 11 with Hypervisor Platform is required.
  - Transcripts must be copied out before `sbx rm` (A6b), and the phone can't start sandboxed sessions (#695).
- Not shortlisted as the main option.

---

### S4: Maestro + agentsview + Tailscale (T-W)

**Components**

| Component | Role |
|---|---|
| maestro | Core: orchestrator and phone webapp. |
| agentview-b (agentsview) | Core: the A2 full record. |
| tailwind | Core: phone reach, F6, and SMB for A5 and F8. |

**Topology**
- Maestro's Windows app with Windows-native CLIs and `C:\` repos.
- The phone opens `http://<pc-tailnet-name>:<port>/<token>`.
- agentsview runs on Windows reading `%USERPROFILE%` stores, behind Serve with `require_auth`.

**Gate table**

| Gate | Verdict | Clearing component | Evidence | File |
|---|---|---|---|---|
| A1 | PASS (configuration-scoped, 7.16c; untested recipe) | maestro | The phone gets the full app: list and read, start sessions (agent picker plus directory), message. Claude permission prompts and `AskUserQuestion` cannot be answered on the phone, so use Full Access (the default, "no prompts at all") plus `--disallowedTools AskUserQuestion`. Questions then arrive as text. The cost: no permission gating. | maestro A1 re-check |
| A2 | PASS (with partner) | agentsview, plus maestro cards | Maestro's tool cards are off by default and capped at 4,000 characters. agentsview renders every Claude and Codex session's tool calls with arguments and output once `result_content_blocked_categories = []`. | maestro A2; agentview-b A2 |
| A3 | PASS, with 7.16b note (Codex `auth.json` side read) | maestro | Unmodified CLIs on their own logins. | maestro A3 |
| A4 | PASS | maestro | Claude prompt appended; Codex base instructions untouched (7.16d). | maestro A4 |
| A5 | PASS | maestro Files panel; tailwind SMB | Phone Files panel over the agent working directory, plus SMB on T-W. | maestro A5; tailwind A5 |
| A6 | PASS, first-class | maestro | `maestro-cli` delegation in either direction; native transcripts persist (no `--ephemeral` or `--no-session-persistence`). | maestro A6/A6a/A6b |
| A7 | PASS (workaround); sandbox clause not exercised | maestro | Shared filesystem and worktree agents. | maestro A7 |
| A8 | PASS, first-class, both directions | maestro | `create-agent -t codex\|claude-code`, `dispatch`, `session list/show`, `send -s`. | maestro A8 |
| C1 | PASS | maestro, agentsview, tailwind | Native Windows installer; agentsview Windows MSI; Safari on the phone. | maestro C1; agentview-b C1 |

**N1–N3**

| Component | N1 | N2 | N3 |
|---|---|---|---|
| maestro | 3.5k★ | Amini 68.5%, Rauf 11.9%, plus two other humans merging PRs | v1.0.0, 2026-10-09 |
| agentsview | 6.2k★ | 3 humans >10% | v0.45.0, 2026-10-09 |
| tailwind | PASS | PASS | PASS |

**FAVOUR (7.17)**

| Item | Points | Component |
|---|---|---|
| F1 | 1 | maestro (Codex side read) |
| F2 | 0 | maestro 3.5k★ < 5,000 |
| F3 | 0 | no App Store app |
| F4 | 1 | maestro / agentsview (no tablet layout) |
| F5 | 2 | maestro |
| F6 | 2 | tailwind |
| F7 | 2 | maestro / tailwind |
| F8 | 2 | tailwind |
| F9 | 0 | none |
| F10 | 1 | maestro |
| **F1–F10** | **11/20** | |
| F11 | a2 b2 c2 d2 e1 = **9/10** | maestro (with agentsview F11c 2) |

**Setup steps**
1. Maestro v1.0.0 Windows installer, plus Windows-native `claude` and `codex` with their own logins. Keep `ANTHROPIC_API_KEY` unset (Maestro's docs warn that `claude -p` "bills per-token API credit" if a key is present).
2. On every Claude agent, add the custom arg `--disallowedTools AskUserQuestion`. Keep Full Access, which is the default.
3. Settings:
   - "Show tool calls in responses" on;
   - LIVE web-UI auto-start, a persistent link and a custom port;
   - the `maestro-cli.cmd` shim;
   - raise `cleanupPeriodDays`.
4. agentsview on Windows:
   - `result_content_blocked_categories = []`;
   - `require_auth = true` and `--public-url` behind `tailscale serve`;
   - Codex Cloud import and claude.ai sync left off.
5. Tailscale with Run unattended. The phone uses the MagicDNS name, since the QR code shows the LAN IP. Optionally add the SMB share and Serve for dev servers.
6. Leave Maestro's Codex usage panel and auto-reset unused (the `auth.json` side read).

**Risks**
- **No permission gating.** Agents run with every check disabled: Claude `--dangerously-skip-permissions` and Codex `--dangerously-bypass-approvals-and-sandbox`. Agents can also drive Maestro itself through `maestro-cli`.
- The phone link is plain HTTP plus a URL token, so keep it tailnet-only.
- The A1 recipe is untested.
- The `claude -p` subscription allowance depends on Anthropic's paused change.

**Strict alternatives**
- A defaults-only reading of 7.16c makes A1 PARTIAL (Standard-mode prompts can't be answered on the phone) → NEAREST MISS (A1).
- 7.16b does not apply: Maestro never reads Claude tokens.
- 7.16a: none.

**Verdict:** CLEARS ALL ALWAYS GATES only under the 7.16c configuration. Otherwise NEAREST MISS (A1).

---

### S5: Agor (Claude half, WSL2) + chatgpt-desktop-codex (Codex half, Windows-native) + Tailscale

**Components and topology**
- Agor daemon in WSL2 (`simple` mode, a pasted `claude setup-token`, password login, bound to the tailnet with mirrored networking).
- The ChatGPT desktop app's Windows-native agent on `C:\` projects.
- Tailscale.

**Gates**
- A1: Agor `/m` for Claude, ChatGPT iOS for Codex. PASS.
- A2: Agor for Claude, ChatGPT for Codex. PASS.
- A3: PASS, config-scoped, with 7.16b notes. Agor stores the setup-token, and its own "Sign in with Claude" must stay off.
- A4: PASS, provided Codex is never launched through Agor (7.16d replacement prompt).
- A5: Agor's phone file browser for the WSL2 worktrees, and ChatGPT iOS for the `C:\` projects. PASS.
- A6 and A8: PASS (workaround).
  - Claude in WSL2 → `codex exec` inside WSL2, with `CODEX_HOME=/mnt/c/Users/<u>/.codex` so it shares the Windows store (chatgpt-desktop-codex alternatives).
  - Codex on Windows → `wsl.exe … claude -p` on the WSL2 Claude login.
- A7: paths across `\\wsl.localhost` and `/mnt/c`. PASS (workaround).
- C1: Agor is "Not independently validated" on WSL2 (not a documented incompatibility).

**N-gates.** Agor 1.5k★, Maxime Beauchemin 56.7% / Kamil Gabryjelski 13.8%, 0.27.0 on 2026-10-13. PASS.

**FAVOUR.** F1 1, F2 0, F3 2, F4 2, F5 2, F6 1 (conservative: the Claude half's dev servers live in WSL2, T-L), F7 2, F8 2, F9 0 (7.7), F10 1 = **13/20**.

**F11, re-scored for this configuration.** Agor's file gives 10/10, but that assumes Agor launches Codex children, which S5 must avoid (A4). Here, cross-harness children are CLI subprocesses that Agor does not link, so every sub-item is PARTIAL: **5/10**.

**Strict alternatives:** 7.16b and 7.16c both make A3 (Claude) FAIL → NEAREST MISS.

**Verdict:** CLEARS ALL ALWAYS GATES under the binding reading, but configuration-heavy and lower-confidence:
- it crosses the WSL boundary in both directions;
- Agor's keep-alive is undocumented;
- it carries the Serve → WSL2 502 risk.

It offers nothing S3 lacks, so it is **not shortlisted**.

### S6: Archon + an A5 partner

- **T-L (recommended by Archon):** A5 FAIL. The console has no workspace file browser. Tailscale SMB cannot publish ext4 ("by design"). Obsidian can't open `\\wsl$` vaults. GitHub shows committed state only (PARTIAL).
- **T-W variant:** Windows-native Archon is "basic usage", and worktree isolation needs WSL2. Archon's file does not verify Windows-native A7 or unattended operation, so those are UNKNOWN.
- Adding Orca or T3 Code for A5 would make Archon redundant.
- **Verdict:** NEAREST MISS (A5).
- Other notes: approvals are always bypassed; the console has no built-in auth; Archon offers its own claude.ai and ChatGPT logins (7.16c). FAVOUR as a component: 9/20 and 9/10.

### S7: Gas City + partners

- A1 PARTIAL:
  - the dashboard is read-only for running sessions;
  - Codex prompts are not detected;
  - it binds to loopback;
  - the `t3bridge` route into T3's app is undocumented;
  - the generic-terminal path needs a screened iOS terminal app, and none passed (Blink Shell failed N3 per discovery).
- A5 FAIL: no file browser, and WSL2-only, so no SMB.
- **Verdict:** NEAREST MISS (A1, A5). FAVOUR as a component: 3/20 and 8/10.

### Dropped combinations (one line each)

- **Two full orchestrators together** (Orca + T3, Orca + Maestro, T3 + Archon, …): redundant. One clears the gates alone, and running both doubles credential side reads and confusion.
- **Anything on Warp Oz (W2):** A3 FAIL (API keys only).
- **Anything delegating from a Claude cloud session to Codex:** A6a FAIL. There is no documented ChatGPT-login Codex in Claude cloud.
- **Codex cloud as part of the core:** A2 UNKNOWN for cloud tasks, and the `@codex` legacy experience is slated for deprecation (github-apps G2).
- **Docker Sandboxes as the main runtime:** Codex A3 FAILs inside `sbx`, so it is only a Claude isolation add-on (S3+D).
- **Obsidian Sync or GitHub as the only A5 provider:** PARTIAL (dot-folders and code not viewable on iOS; committed state only).
- **Superset-based stacks:** C1 PARTIAL (no Windows build; experimental Linux; pre-release host CLI).
- **Claude agent view as the hub:** Claude-only; can't dispatch from the phone; A5 FAIL.

---

## 4. Cross-cutting facts

1. **Codex Cloud (Legacy).**
   - OpenAI: "Codex Cloud (Legacy) continues to support Code Review and the Linear and GitHub integrations. We plan to deprecate this experience." `@codex <task>` "starts a legacy cloud chat" (github-apps G2 → N3 FAIL).
   - The chatgpt-desktop-codex file shows the current Codex cloud as active (DevDay 2026-09-29) with no "Legacy" label, and the github-repos-issues deep-dive notes the same mismatch.
   - Codex cloud task fidelity is UNKNOWN (chatgpt-desktop-codex A2), and cloud output reaches the PC only as diffs or branches (A5 PARTIAL).
   - **Decision:** Codex cloud is excluded from every core stack. If the user wants it, the `@codex` GitHub trigger is out (N3), and the in-app cloud is an unverified extra.
2. **Windows-native vs WSL2.**
   - SMB-based A5 works only for NTFS (tailwind).
   - The Codex phone remote is reliable only with the Windows-native agent (chatgpt-desktop-codex #49436, #40519).
   - Claude Desktop lists only local, non-WSL CLI sessions (F10), and the file pane and `/resume` are missing in WSL sessions (claude-desktop).
   - WSL2 needs a keep-alive, because systemd won't hold the VM (Microsoft, via gas-city).
   - Serve → WSL2 has an open 502 issue (#9228).
   - **Net:** T-W suits S1, S3 and S4. T-L suits S2 (T3's service) and the WSL-only tools (Agor, Archon, Gas City).
3. **`cleanupPeriodDays`.** Claude Code deletes transcripts after 30 days by default ("The default is 30 days and the minimum is 1", claude-directory). Every stack must raise it for A6b; this is a 7.7 setup step. Codex rollouts are compressed after 7 days, never deleted (chatgpt-desktop-codex A6).
4. **API-key variables.**
   - `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, `apiKeyHelper`, `CLAUDE_CODE_OAUTH_TOKEN` (unless deliberately used), `CODEX_API_KEY` and `OPENAI_API_KEY` must stay unset in every shell, scheduled task, service unit and CI environment.
   - Several tools silently prefer an API key: Gas City auto-accepts it, claude-code-action ranks the key above the token, and Maestro's docs warn about `claude -p` billing.
5. **Subscription allowance for headless and SDK use.** Anthropic's Help Center (update 2026-10-07): "You can still use the Claude Agent SDK, `claude -p`, and third-party apps with your subscription limits". The previously announced change is paused (2026-06-15). S2 (Agent SDK), S4 (`claude -p`) and every stack's Codex→Claude delegation through `claude -p` depend on it staying paused. In S3, `claude --bg` (agent view) is an alternative Codex→Claude path that uses interactive background sessions.
6. **Credential side reads with spoofed user-agents** (7.16b): Orca (both vendors) and T3 Code (Claude). Maestro reads Codex `auth.json` without spoofing. claude-desktop, chatgpt-desktop-codex and Tailscale touch none.

---

## 5. Corrections and conflicts found while composing

| Item | Finding | Resolution |
|---|---|---|
| t3-code F1–F10 subtotal | The file says 17/20; its rows sum to 15/20. | 15/20 is used. |
| orca F9 | The file awards 1 (PARTIAL, experimental Cloud VM recipes). 7.7 bars F9 points where A7's sandbox clause is not exercised, as orca's own A7 row records. | 0 at stack level. |
| archon F9 | The file awards 1, but notes that a cross-harness stack loses it under 7.7. | 0 at stack level. |
| orca F10 (Codex half UNKNOWN) vs chatgpt-desktop-codex F10 (#21079: CLI sessions appear once the project is added) | Orca's interactive `codex` TUI sessions are `cli`-source, so #21079 suggests they would list. Neither file verifies Orca-launched threads specifically. | Conservative: Orca F10 stays 1. |
| claude-desktop A6 vs agentview-a A8 | Both document Codex→Claude delegation; agent view's `claude --bg` route is stronger (monitorable). | Both cited; no verdict change. |
| Codex cloud: "Legacy, plan to deprecate" (github-apps) vs "active, DevDay 2026" (chatgpt-desktop-codex) | They plausibly describe different experiences, but the files can't settle which surface the deprecation covers. | Conservative: Codex cloud is excluded from the core stacks. |
| F10 aggregation (7.17 best single component) | Two one-vendor apps together cover both vendors, but the rule gives 1. | The rule is applied (S3 F10 = 1), with a note. |
