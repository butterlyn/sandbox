# Stage 4: Stack composition (working detail)

- Author: compose-stacks (fork), 2026-10-19.
- **Update round (same day).** This file was updated for the user's new directives (brief 7.18–7.20) and the new candidate files:
  - superset (now deep-dived);
  - bernstein;
  - cmux (with the cmux-tui deep-dive);
  - cli-agent-orchestrator;
  - wmux-a and wmux-b;
  - tmux;
  - ios-terminal.
- Inputs: `research/brief.md` (sections 7.2–7.20 bind this file), every candidate file in `research/`, and `research/verification.md` (Stage 5). Every verdict below comes from a candidate file, which is named in each row.
- Web research:
  - None in round 1.
  - In the update round, one primary-source check settled a direct contradiction between tmux.md and ios-terminal.md: does Termius preview remote files over SFTP? See section 5.
- User-facing summary with full evidence tables: `research/shortlist.md`.
- New in the update round:
  - stacks S6–S12 (section 3);
  - the WSL2 base setup W1–W8 (section 2);
  - the ranking and strict-reading matrix (section 6).

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
| ios-terminal T1 (Termius) | **New.** Core client in the WSL2 terminal stacks (S6–S11). Covers A1 together with tmux or cmux-tui under 7.4, and A5, F7 and F8 through SFTP. Elsewhere an optional add-on (a second file route). | client/UI (iPhone/iPad SSH and SFTP app) |
| tmux | **New.** Core session layer in S7, S8 and S9. N2 PASS is narrow (7.20). | runtime (WSL2 multiplexer) |
| cmux-tui (sub-component of cmux) | **New.** Core session layer in S10, as the alternative to tmux. Admitted although the scoped cmux product failed C1 (shortlist decision 17). | runtime and client (WSL2 multiplexer with an agent CLI) |
| cli-agent-orchestrator (CAO) | **New.** Core orchestrator in S9. Needs tmux, plus Termius for the phone and for A5. | orchestrator, client/UI (desktop web UI) |
| superset | **Moved up from 1.2.** Core in S11. C1 PASS by the user's assumption (7.18). A5 needs Termius. | orchestrator, client/UI (iOS/iPad app) |
| archon | **Moved up from 1.2.** Core in S6, where Termius now supplies A5. | orchestrator, client/UI (web console) |
| gas-city | **Moved up from 1.2.** Core in S7, where Termius plus tmux supply A1 and A5. | orchestrator, client/UI (dashboard) |
| bernstein | **New.** Optional add-on only, routed to Codex (S12). It cannot launch Claude sessions in a passing stack (A2). | orchestrator, client/UI (PWA) |

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
- **ios-terminal T1 (Termius)**
  - Turn session logging off for the vault that holds the PC host. On Pro it is on by default and records all terminal text.
  - Hide the AI widget. Optionally turn "Sync keys and identities" off.
  - Do vendor logins on the PC, not through Termius while logging is on.
  - SFTP: use the WSL2 distro's own sshd (a given, 7.20) for ext4 workspaces, and Windows OpenSSH for `C:\`.
  - Reconnect with SSH and re-attach with tmux or cmux-tui. Do not use mosh: mosh-server is unscreened.
- **tmux**
  - Start the server with no API-key variables in its environment, because it copies the environment at start. Otherwise remove them with `set-environment -g -u <VAR>`.
  - WSL keep-alive (W4).
- **cmux-tui**
  - `npm i -g cmux` in WSL2.
  - Pass one explicit `--socket` everywhere, and start the owner from the W4 logon task.
  - Use `--on-exit keep` for agent panes.
  - Unset API-key variables before the owner starts.
- **cli-agent-orchestrator**
  - Log in with `/login` and `codex login` inside WSL2. Keep API-key variables unset. Don't use `claude setup-token`: CAO unsets every `CLAUDE*` variable.
  - For prompts, give profiles `permissionMode` / `codexProfile`. Never use `allowedTools: ["*"]`, which forces `--yolo`.
  - Keep `cao-server` on loopback. If it is exposed, set `CAO_AUTH_LOCAL_TOKEN` plus the host and client allowlists.
  - Turn the memory compiler off if background quota use is unwanted.
- **superset**
  - Run the standalone CLI host in WSL2 (`superset start --daemon` as a systemd user unit), plus W4.
  - No cloud workspaces and no Agent Accounts upload. Pass `--local`/`--host` on every CLI call.
  - Don't run the desktop app day to day: it triggers the usage-token reads. Don't use Superset Chat: it replaces the Claude prompt.
  - To get prompts, remove the bypass flags from the agent commands.
- **archon**
  - Use Global Auth (`claude /login`, `codex login`). Never use:
    - `archon ai login anthropic|openai`;
    - the subscription login in Settings → Agents;
    - the copy of `auth.json` into `.env`;
    - Pi on a ChatGPT login.
  - No `systemPrompt:` on Claude workflow nodes, and no container isolation.
  - Web auth on. The console is reachable only over the tailnet.
  - Chat bots off, or with allow-lists set.
- **gas-city**
  - tmux runtime only. Never the k8s provider or `make k8s-secret`.
  - Keep the supervisor environment free of API keys, or set `GC_SUPERVISOR_OMIT_PROVIDER_CREDS=1`.
  - systemd on in the distro (`gc supervisor install`), plus W4.
- **bernstein** (add-on)
  - Set `cli: codex` and every `role_config.<role>.cli: codex`, so it never runs a Claude worker.
  - Turn the cross-model verifier off. Keep `OPENROUTER_*` and other third-party model keys unset.
  - Pin `--tunnel-provider tailscale`.

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
- **ios-terminal T1 (Termius)**
  - Closed source.
  - Session logs (Pro, on by default) capture terminal text. They are end-to-end encrypted and synced.
  - The AI widget's data flow is undocumented.
  - No push notification when an agent waits, and iOS suspends the app after 20–30 seconds in the background.
- **tmux**
  - N2 is narrow (7.20): the second human qualifies only through merge commits of the OpenBSD tree.
  - The keep-alive is untested with a detached server alone (WSL#9968).
- **cmux-tui**
  - About 94% of its commits come from one author. No release since 2026-09-17, the TUI nightly was removed as "dormant", and cmux.com never mentions it.
  - Its Claude shim turns off Claude's own notifications.
- **cli-agent-orchestrator**
  - Defaults bypass approvals: `claude --dangerously-skip-permissions`, `codex --yolo`.
  - It writes `skipDangerousModePermissionPrompt: true` into the user-wide `~/.claude/settings.json`.
  - The API is unauthenticated by default, and the local token is inherited by agent panes.
  - The memory compiler runs headless `claude -p` / `codex exec` by default.
  - PyPI "Beta" classifier. Its docs say API keys are "required"; the source shows subscription logins work.
- **superset**
  - 7.16b: the desktop usage meter reads Claude and ChatGPT tokens. This is not triggered without the desktop app.
  - Its relay is mandatory, has no end-to-end encryption that was found, and is not self-hostable.
  - Presets bypass approvals by default.
  - It offers a cloud credential path (Agent Accounts) and a prompt-replacing Chat path. Both are avoided.
  - Vendor statements: the Linux desktop app is "experimental and untested", the CLI is Beta, and WSL support is "not at least for a few months".
- **archon**
  - 7.16b/c: it offers its own claude.ai and ChatGPT logins with the vendors' CLI client IDs. These are avoided.
  - Approvals are always bypassed, with no switch.
  - The console binds 0.0.0.0, and auth is optional.
  - N2 is thin: one release by a second human in the window.
- **gas-city**
  - 7.16b: it reads Codex `auth.json` locally for a readiness probe.
  - It answers "Yes" automatically when Claude asks whether to use a detected API key.
  - Its k8s path copies `.credentials.json` into a Secret. This is avoided.
  - Permission defaults are unrestricted.
- **bernstein**
  - Its Claude workers always run with `bypassPermissions` and `--no-session-persistence`. S12 never uses them.
  - N2 passes only against its own "single-maintainer" self-description.
  - Labelled "Status: beta". The cross-model verifier is on by default (OpenRouter), and tunnels default to cloudflared.

### 1.2 Nearest misses (components)

| slug | Status | Gate it misses | File |
|---|---|---|---|
| superset | Deep-dived | **Now usable (1.1)** under the user's C1 assumption (7.18). Without it, C1 is PARTIAL: no Windows build; the Linux desktop app is "experimental and untested"; the host CLI is Beta, with Pre-release-flagged releases; WSL support is "not at least for a few months" (#1993). | superset |
| bernstein | Deep-dived | As a Claude platform:<ul><li>A2 PARTIAL: a fixed `--no-session-persistence`, and the dashboard shows tool inputs only.</li><li>A6b FAIL for its Claude children.</li><li>A1 PARTIAL on its own phone surfaces.</li></ul>Usable only Codex-routed (S12). | bernstein |
| archon | Deep-dived | Round-1 miss (A5) now covered by Termius SFTP (S6). | archon |
| gas-city | Deep-dived | Round-1 misses (A1, A5) now covered by Termius with tmux (S7). | gas-city |

### 1.3 Screened out (cannot be used, even as glue; 7.12)

| slug | Fail | Reason (from file) |
|---|---|---|
| vibe-kanban | N3 | Company shut down on 2026-04-10. README: "Vibe Kanban is sunsetting." |
| paseo | N2 | README: "built by one person and funded by the people who use it" (wording per verification R8). One person wrote 85.9% of commits and published all releases. |
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
| ios-terminal T2 (Blink Shell) | N2 | No commit to `raw` in the window; Carlos Cabanero is the only author on any branch; no PR merged since 2024-03-11. |
| wmux-a (openwong2kim/wmux) | N1 | 431 stars. No successor repo. |
| wmux-b (amirlehmam/wmux) | N1 | 421 stars. No successor repo. |
| cmux (as scoped in 7.19: the macOS app, its socket API and CLI, and the iOS companion) | C1 | "macOS only, for now". The iOS app "is a companion for your Mac". cmux-tui is admitted separately (1.1). |

**Not usable:** mosh-server. It is not a given under 7.20 and is unscreened; its last release was 1.4.0 (2022-10-31) (ios-terminal open questions). The terminal stacks rely on SSH reconnect plus re-attach instead.

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
  - SMB cannot publish ext4 workspaces ("by design", WSL#11355, in tailwind). So A5 must come from one of two places:
    - the platform's own phone file browser;
    - since the update round, Termius SFTP to the distro's own sshd (a given, 7.20). It is reached through mirrored networking (Windows 11 22H2+) or a portproxy (ios-terminal A5).
  - Vendor desktop apps cannot see WSL2 sessions (F10 drops).
  - Tailscale Serve → WSL2 has an open 502 issue (#9228). Mirrored networking plus the direct tailnet IP is the fallback (#14790).
  - **Phone terminal path (update round):** Termius → Tailscale → the distro's sshd (or Windows OpenSSH with `DefaultShell` = `wsl.exe`) → tmux or cmux-tui.

### 2.1 WSL2 base setup W1–W8 (shared by S6–S11)

Sources: tmux.md (keep-alive recipe, A3), ios-terminal.md (C1, A5, privacy), tailwind.md (WSL2 networking).

- **W1.** Inside a WSL2 distro, install `claude` and `codex` and log in with `/login` and `codex login` (ChatGPT). Keep repos on ext4.
- **W2. Environment hygiene.** Never set these in shell rc files, systemd units or scheduled tasks:
  - `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, `apiKeyHelper`;
  - `CODEX_API_KEY`, `OPENAI_API_KEY`, `OPENAI_BASE_URL`.

  Session layers (tmux, the cmux-tui owner) and services copy the environment they start in.
- **W3.** Raise `cleanupPeriodDays` in WSL2 `~/.claude/settings.json` (7.7).
- **W4. Keep-alive.**
  - In `.wslconfig`, set `[general] instanceIdleTimeout=-1`. Microsoft documents it: "Set to -1 to disable auto shutdown". Optionally set `[wsl2] vmIdleTimeout`, which is Windows 11 only.
  - Add a Task Scheduler "At log on" task that starts the session layer or service: `wsl.exe -d <distro> --exec …`.
  - Windows never sleeps.
  - Sign in after every reboot. Starting WSL without a sign-in is undocumented (WSL discussion #14261).
  - Verify with `wsl --list --running`.
  - This is untested with only a detached tmux server (WSL#9968). Microsoft: "systemd services will NOT keep your WSL instance alive".
- **W5. SSH into WSL2.**
  - Use the distro's `openssh-server` with key-only auth.
  - Reach it through mirrored networking (`[wsl2] networkingMode=mirrored`, Windows 11 22H2+, plus a Hyper-V firewall inbound rule) or a `netsh interface portproxy` rule (Windows 10).
  - Use a port other than 22 if Windows OpenSSH Server also runs.
- **W6. Tailscale.** Install it on the Windows host only, with Run unattended, and on the phone. Restrict ACLs to your own devices, and never use Funnel.
- **W7. Termius.**
  - The host is the PC's MagicDNS name and the sshd port, with key auth.
  - Settings → Logs: turn session logging off for that vault (Pro).
  - Hide the AI widget. Optionally turn "Sync keys and identities" off.
  - Never type vendor logins through Termius while logging is on.
- **W8. Files and dev servers.**
  - Files: a Termius SFTP tab on the same host. Turn on "Show Hidden Files" when you need dot-folders.
  - Dev servers: `tailscale serve --bg <port>`, or the tailnet IP with mirrored networking.

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
- 7.16c: **corrected in the update round (verification R6).** Orca's optional Agent SDK Chat UI keeps the `claude_code` preset, which is a 7.6 PASS row, so it is not a non-compliant path. No change under 7.16c.

**Verdict:** CLEARS ALL ALWAYS GATES under the binding reading. It is a nearest miss under the 7.16a or 7.16b strict alternative.

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
- **Termius (update round).** SFTP to `C:\` through Windows OpenSSH Server, plus a phone terminal for `claude --resume` / `codex resume`.
  - It is a second A5/F7/F8 route, hedging the SMB route that is untested away from home (#18967).
  - No score change, because F7 and F8 are already 2.
  - Under decision 12's strict alternative it does not help, because Windows OpenSSH is also an OS built-in.
- Bernstein as a Codex-routed add-on is judged separately as S12.

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

**Verdict:** CLEARS ALL ALWAYS GATES under the binding reading.
- It also clears under every 7.16 strict alternative and the defaults-only reading.
- Update round: it also clears under 7.16d strict (R5), 7.20 (tmux) and decision 17 (cmux-tui), because it uses neither tool.
- Not under decisions 11 and 12, which hit every stack (verification R1).

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

### S6: Archon + Termius + Tailscale (T-L), re-judged in the update round

**Round-1 verdict (superseded):** NEAREST MISS (A5). No screened partner could show WSL2 workspaces on the phone: SMB can't publish ext4, Obsidian can't open `\\wsl$` vaults, and GitHub shows committed state only. Termius SFTP now can (ios-terminal A5). The T-W variant (Windows-native Archon, "basic usage") stays unverified and is not used.

**Components**

| Component | Role |
|---|---|
| archon | Core: orchestrator and web console for both harnesses, with first-class delegation and parent→child lineage. |
| ios-terminal T1 (Termius) | Core: A5, F7 and F8 through SFTP into the distro. Also an optional phone terminal for vendor-TUI take-over. |
| tailwind (Tailscale) | Core: phone reach to the console and to SSH/SFTP; F6. |

**Topology**
- Archon's Linux binary and provider plugins run in WSL2, with `claude` and `codex` logged in there.
- `archon serve` runs in the foreground, so it runs as a systemd user unit (port 3090), plus W4.
- Phone:
  - Safari opens the console over the tailnet, with web auth on. Either mirrored networking plus the tailnet IP, or `tailscale serve` → `localhost:3090` (mind #9228).
  - Termius opens SFTP to the distro's sshd (W5–W8).
- Transcripts: WSL2 `~/.claude/projects` and `~/.codex/sessions`, plus Archon's run JSONL under `~/.archon/workspaces/…/logs`.

**Gate table**

| Gate | Verdict | Clearing component | Evidence | File |
|---|---|---|---|---|
| A1 | PASS | archon | **(i)** The console lists runs and follows live events. Tool rows expand, but results are cut at 2,000 characters.<br>**(ii)** The chat composer messages the project's chat session. Runs can be approved, rejected or answered.<br>**(iii)** Register a project, then launch a workflow with per-run model bindings `claude/…` or `codex/…`.<br>**Caveats:** narrow-screen drawer; no device test. | archon A1 rows |
| A2 | PASS | archon | Every tool call appears with input and result in the console (2,000-character cut, no expand). The full record is available through `archon workflow logs` and the provider-events API, and each node can be reopened with the vendor resume command. | archon A2 |
| A3 | PASS (configuration-scoped, 7.16c) + 7.16b policy-risk note | archon | Global Auth: `claude /login` and `codex login`. Archon's own claude.ai and ChatGPT logins are opt-in, and the stack never connects them. | archon A3; A3/A4 optional paths |
| A4 | PASS (configuration-scoped, 7.16d) | archon | **Claude:** the Agent SDK with the `claude_code` preset (plus append) and standard tools, unless a node declares `systemPrompt:` (the stack doesn't).<br>**Codex:** unmodified `codex app-server`; node instructions are folded into the user prompt. | archon A4 |
| A5 | PASS (configuration-scoped) | ios-terminal (Termius SFTP) | Live browse and preview of the WSL2 workspaces through the distro's sshd. Archon alone is FAIL (run artifacts only). | ios-terminal A5; archon A5 |
| A6 | PASS | archon | **A6a:** per the A3/A4 configuration.<br>**A6b:** Claude sessions and Codex threads persist in the WSL2 homes, outside the worktrees. Get the ids from `archon workflow get --verbose`, then use the vendor resume command.<br>Container isolation is not used, because its teardown removes the Claude transcript. | archon A6a, A6b |
| A7 | PASS; sandbox clause not exercised | archon | Nodes share the run's checkout. `workflow:` sub-runs share it unless they declare `isolation: worktree`. Files also pass through `$ARTIFACTS_DIR`/`$STATE_DIR` and `$node.output`. | archon A7 |
| A8 | PASS (create and monitor first-class; resume partly by workaround), both directions | archon | **Create:** chat agents on both harnesses get `invoke_workflow` and `manage_run`; any agent can run `archon workflow run … --model <tier>=codex/…\|claude/… --detach`.<br>**Monitor:** `get`, `logs --follow`, `wait`.<br>**Resume:** follow-up turns via `claude -p --resume <id>` / `codex exec resume <id>`. | archon A8 |
| C1 | PASS (via WSL2) | archon, Termius, tailwind | Linux builds. Archon's docs: "WSL2 (recommended): Required for full compatibility". The foreground server runs under systemd plus W4. Termius is a universal iOS app. | archon C1; ios-terminal C1 |

**N1–N3**

| Component | N1 | N2 | N3 |
|---|---|---|---|
| archon | 23.7k★ | Thin PASS: Widing wrote 87.1% and published every release since v0.4.0; Medin published v0.3.12 (2026-05-14) | v0.12.1, 2026-10-17 |
| Termius | N/A (closed source) | Termius Corporation; YC "Team Size: 35" | iOS 8.0.3, 2026-10-14 |
| tailwind | 37.7k★ | PASS | v1.104.1, 2026-10-07 |

**FAVOUR (7.17)**

| Item | Points | Component |
|---|---|---|
| F1 | 1 | archon (7.16c cap: it offers its own logins) |
| F2 | 2 | min(archon 23.7k, Tailscale 37.7k). Termius is closed source (N/A). |
| F3 | 2 | Termius (archon has no App Store app) |
| F4 | 2 | Termius iPad layout (archon 1: the desktop layout at `md`) |
| F5 | 2 | archon: documented resume of a node's session in the vendor TUI |
| F6 | 1 | tailwind T-L (Serve → WSL2 502 risk; mirrored tailnet IP). Termius forwarding is foreground-only (1). |
| F7 | 2 | Termius SFTP preview |
| F8 | 2 | Termius upload and download |
| F9 | 0 | archon's container isolation is Claude-only, and its teardown removes transcripts (7.7) |
| F10 | 0 | WSL2 sessions |
| **F1–F10** | **14/20** | |
| F11 | a2 b2 c2 d2 e1 = **9/10** | archon. F11e is 1 because the console can't take over in the vendor TUI. Termius can, but 7.17 doesn't add capabilities across components. |

**Setup steps**
1. W1–W8 (section 2.1).
2. Install Archon's Linux binary and provider plugins. Never use:
   - `archon ai login anthropic|openai`;
   - a subscription login in Settings → Agents;
   - `archon setup`'s copy of `auth.json` into `.env`;
   - Pi on a ChatGPT login.
3. Run `archon serve` as a systemd user unit. Turn web auth on (form auth or Caddy basic auth), and reach the console over the tailnet only.
4. Turn the chat bots off, or set their allow-lists (empty lists answer everyone).
5. Workflows: no `systemPrompt:` on Claude nodes, and no container isolation.
6. Approvals: none to set. Archon always bypasses them; govern through workflow gates.

**Risks**
- **Approvals always bypassed:** Claude runs with `bypassPermissions`, and Codex with `approvalPolicy: 'never'` and `danger-full-access`. There is no switch.
- **Policy risk (7.16b/c):** the offered Archon logins use the vendors' CLI client IDs and keep the tokens in Archon's vault.
- **Open API:** without web auth, the console's `/api/*` is open on the network.
- **Thin N2:** it rests on one release by a second human, and a later window would likely fail.
- **Phone view:** results are cut at 2,000 characters, and the console is untested on a real device. Its source sits under `packages/web/src/experiments/`; no user-facing label was recorded.
- **Headless policy:** the Agent SDK path depends on Anthropic's paused change.

**Strict alternatives**
- 7.16c: offering its own logins at all → A3 FAIL for both harnesses → NEAREST MISS (A3).
- 7.16a: no beta label recorded. Whether the console is presented as experimental is UNKNOWN.
- 7.16b: no Claude token read on the stack's path → no change.
- Defaults-only: no change. Global Auth is the documented default, and approvals are bypassed in every configuration, so no prompt goes unanswered.
- 7.20 (tmux): not used → no change.
- Decision 12 strict: the SFTP route depends on the distro's sshd, which would need screening.

**Verdict:** CLEARS ALL ALWAYS GATES under the binding reading (configuration-scoped).

### S7: Gas City + tmux + Termius + Tailscale (T-L), re-judged in the update round

**Round-1 verdict (superseded):** NEAREST MISS (A1, A5), because no screened iOS terminal existed. Termius now covers A1 (through `gc session attach`, under 7.4) and A5 (through SFTP).

**Components**

| Component | Role |
|---|---|
| gas-city | Core: orchestrator (`gc sling`, `gc session …`) and a dashboard (loopback) with structured transcripts. |
| tmux | Core: Gas City's default runtime. |
| ios-terminal T1 (Termius) | Core: phone client (A1 under 7.4; A5, F7, F8). |
| tailwind | Core: network path; F6. |

**Topology**
- W1–W8, with `[boot] systemd=true` and `gc supervisor install` (a systemd user service). W4 keeps the distro up.
- The dashboard stays on loopback.
- The phone uses Termius → `gc session list` / `gc session attach <name>`. Gas City may not use the default tmux socket, so use `gc session …` rather than raw `tmux ls`.

**Gate table**

| Gate | Verdict | Clearing component | Evidence | File |
|---|---|---|---|---|
| A1 | PASS (7.4) | Termius + tmux, with the gas-city CLI | **(i)** `gc session list`; `gc session attach <name>` opens the native TUI with the same history.<br>**(ii)** Type into the TUI, for both harnesses.<br>**(iii)** `gc session new <template> --no-attach`, or `gc sling <rig>/<agent> "<task>"` in a chosen rig.<br>The dashboard alone is PARTIAL. | gas-city A1, F5, A8; ios-terminal A1 |
| A2 | PASS | gas-city | The structured transcript renders every tool_use and tool_result for both harnesses, with no truncation. Also `gc session logs --tail 0`, and the TUI via attach. | gas-city A2 |
| A3 | PASS (configuration-scoped) + 7.16b note | gas-city | **Login:** the unmodified CLIs; the probe uses `claude auth status`.<br>**Side read:** it reads Codex `auth.json` locally.<br>**Avoid:** the k8s credential copy.<br>**Hygiene:** keep API keys unset (they are auto-accepted), or set `GC_SUPERVISOR_OMIT_PROVIDER_CREDS=1`. | gas-city A3; policy-risk note |
| A4 | PASS | gas-city | No base-prompt replacement; role context arrives through hooks (append). | gas-city A4 |
| A5 | PASS (configuration-scoped) | Termius | As S8. Gas City alone is FAIL. | ios-terminal A5; gas-city A5 |
| A6 | PASS | gas-city | Slung sessions are the unmodified CLIs in tmux. Transcripts are pinned with `--session-id <uuid>` (Claude) and kept as rollouts (Codex), and no code path deletes them. | gas-city A6 |
| A7 | PASS; sandbox clause not exercised | gas-city | Rig directories are shared; k8s pods are avoided. | gas-city A7 |
| A8 | PASS, first-class, both directions | gas-city | `gc sling`, plus `gc session new/list/peek/logs/wait/submit/nudge`. The tutorial shows a Claude "mayor" slinging work to a Codex reviewer. | gas-city A8 |
| C1 | PASS (via WSL2) | gas-city, tmux, Termius, tailwind | Linux tarballs; "Gas City works under WSL 2"; a systemd supervisor plus W4. | gas-city C1 |

**N1–N3**

| Component | N1 | N2 | N3 |
|---|---|---|---|
| gas-city | 1.4k★ | Knutsen 51.7%, Wordelman 15.6%; Sells and Jarmak merged others' PRs | v1.5.0, 2026-10-05 |
| tmux | 49.9k★ | PASS, narrow (7.20) | 3.8 (tag 2026-10-08) |
| Termius, tailwind | as S6 | as S6 | as S6 |

**FAVOUR (7.17)**

| Item | Points | Component |
|---|---|---|
| F1 | 1 | gas-city (reads Codex `auth.json`) |
| F2 | 0 | gas-city 1.4k★ < 5,000 |
| F3 | 2 | Termius |
| F4 | 2 | Termius |
| F5 | 2 | gas-city (`gc session attach`) |
| F6 | 1 | tailwind T-L |
| F7 | 2 | Termius |
| F8 | 2 | Termius |
| F9 | 0 | k8s pods: A7 and A6b are not shown across the pod boundary (7.7) |
| F10 | 0 | WSL2 sessions |
| **F1–F10** | **12/20** | |
| F11 | a2 b1 c2 d2 e1 = **8/10** | gas-city |

**Setup steps**
1. W1–W8.
2. Install Gas City from the Linux tarball, with its prerequisites (tmux, git, jq, dolt, bd, flock). Then run `gc supervisor install`.
3. Keep API keys out of the supervisor environment, or set `GC_SUPERVISOR_OMIT_PROVIDER_CREDS=1`. Never use `make k8s-secret` or the k8s provider.
4. Leave the dashboard on loopback.
5. Approvals: the default mode flags are unrestricted for both harnesses. Claude's mode is a flag (default `--dangerously-skip-permissions`); no mode that keeps Codex's prompts is documented (UNKNOWN).

**Risks**
- tmux N2 is narrow.
- Approvals are unrestricted by default.
- It answers "Yes" automatically when Claude asks whether to use a detected API key.
- It reads Codex `auth.json`.
- The k8s path copies the Claude credentials.
- Few stars, and many prerequisites.
- The dashboard is read-only for running sessions and loopback-only.

**Strict alternatives**
- 7.20 strict: no runtime (tmux is the default; the `subprocess` runtime is unverified) → NEAREST MISS (A1).
- 7.16c strict: the k8s credential-copy path is offered → A3 FAIL (Claude) → NEAREST MISS (A3).
- 7.16a/b: no change. 7.16b strict concerns Claude tokens, which Gas City doesn't read.
- Defaults-only: no change.

**Verdict:** CLEARS ALL ALWAYS GATES under the binding reading (configuration-scoped).

### S8: Termius + tmux + Tailscale (T-L), new in the update round

The minimal terminal stack (tmux.md "TS-min"): no third-party orchestrator, and no component touches Claude or ChatGPT credentials.

**Components**

| Component | Role |
|---|---|
| ios-terminal T1 (Termius) | Core: iPhone/iPad client. SSH plus tmux attach (A1 under 7.4); SFTP (A5, F7, F8). |
| tmux | Core: session layer in WSL2. Agents start, watch and continue children through its CLI. |
| tailwind | Core: phone → PC network path; F6. |

Givens: WSL2, the distro's openssh-server (7.20), the two CLIs and git.

**Topology**
- W1–W8.
- One tmux session per agent: `tmux new -A -s <name> -c <repo> claude|codex`.
- Transcripts are in WSL2.

**Gate table**

| Gate | Verdict | Clearing component | Evidence | File |
|---|---|---|---|---|
| A1 | PASS (7.4; configuration: W4 keep-alive) | Termius + tmux | **7.4 conditions:** Termius is screened (N1 N/A; N2, N3 PASS). tmux sessions persist while detached (`destroy-unattached` is off) as long as the distro runs (W4).<br>**(i)** `tmux ls` plus attach; `claude --resume` / `codex resume`.<br>**(ii)** Type, and answer prompts with Esc, Ctrl, the arrows and Shift+Tab.<br>**(iii)** `tmux new -A -s <n> -c <repo> claude\|codex`.<br>**Caveats:** Codex in Termius is untested; no notifications. | ios-terminal A1; tmux A1 |
| A2 | PASS | tmux (vendor TUIs) | **Claude:** `Ctrl+O` opens the transcript viewer ("Shows detailed tool usage and execution").<br>**Codex:** the TUI shows commands and diffs.<br>**After the run:** `claude --resume` / `codex resume`.<br>tmux's scrollback is not the trail. | tmux A2 |
| A3 | PASS | the CLIs | Their own logins; nothing reads tokens. W2 hygiene matters, because tmux copies the environment when its server starts. | tmux A3; ios-terminal A3 |
| A4 | PASS | tmux | Runs the given command unmodified. | tmux A4 |
| A5 | PASS (configuration-scoped) | Termius | SFTP gives live browsing, in-app preview (5.8.0; full screen from 7.3.0), open-in and upload. WSL2 ext4 is reached via the distro's sshd (W5). | ios-terminal A5; section 5 |
| A6 | PASS (workaround), both directions | tmux + CLIs | **A6a:** children run as tmux TUIs, or as `codex exec` / `claude -p`, on their own logins.<br>**A6b:** transcripts stay in WSL2 (raise `cleanupPeriodDays`).<br>**Caveat:** Codex→Claude needs an approval or a rule, because seccomp denies `connect`. | tmux A6 |
| A7 | PASS (workaround); sandbox clause not exercised | tmux | Shared WSL2 filesystem; `-c <dir>`; `codex exec -C <dir> --add-dir`. | tmux A7 |
| A8 | PASS (workaround), both directions | tmux + CLIs | `new-session -d`, `capture-pane -p`, `send-keys`. Or headless: `codex exec --json` / `codex exec resume`, `claude -p` / `--resume`. | tmux A8 |
| C1 | PASS | all | Termius universal iOS app plus a Windows app; tmux via WSL2 (`apt install tmux`); Tailscale. | ios-terminal C1; tmux C1 |

**N1–N3**

| Component | N1 | N2 | N3 |
|---|---|---|---|
| Termius | N/A (closed source) | PASS (organisation) | iOS 8.0.3, 2026-10-14 |
| tmux | 49.9k★ | PASS, narrow (7.20). Marriott 77.8%. Adam 19.5%, but 249 of his 265 commits are OpenBSD-tree merges. Strict → FAIL. | 3.8 (tag 2026-10-08) |
| tailwind | PASS | PASS | PASS |

**FAVOUR (7.17)**

| Item | Points | Component |
|---|---|---|
| F1 | 2 | tmux, the only session-launching component: unmodified CLIs, no token reads |
| F2 | 2 | min(tmux 49.9k, Tailscale 37.7k). Termius is closed source (N/A). |
| F3 | 2 | Termius |
| F4 | 2 | Termius iPad layout |
| F5 | 2 | tmux/Termius: attach to the TUI's tmux pane (7.10) |
| F6 | 1 | tailwind T-L (#9228; the mirrored tailnet IP). Termius forwarding is foreground-only. |
| F7 | 2 | Termius SFTP preview (section 5 settles this) |
| F8 | 2 | Termius upload and download |
| F9 | 0 | none |
| F10 | 0 | WSL2 sessions |
| **F1–F10** | **15/20** | |
| F11 | a2 b1 c2 d2 e1 = **8/10** | tmux. F11e is normalized (section 5); tmux.md's own reading gives 9/10. Under decision 18's strict alternative, tmux scores no F11, and the stack falls to Termius's 4/10. |

**Setup steps**
1. W1–W8.
2. **Approvals.** Keep the CLIs' default approval modes, with no bypass flags. Prompts then appear in the TUI and can be answered from Termius.
3. **Codex→Claude.** Approve each call, or add a Codex rule allowing `tmux`/`claude`. Rules are experimental.
4. **Delegation conventions** (in CLAUDE.md / AGENTS.md):
   - start children with `tmux new-session -d -s <parent>-<child> -c <dir> codex|claude`;
   - tag them with `tmux set-option -t <child> @parent <parent>`;
   - or run them headless with `codex exec --json` (never `--ephemeral`) / `claude -p`.

**Risks**
- tmux N2 is narrow (7.20).
- The keep-alive is untested with a detached server alone, and starting after a reboot without a sign-in is undocumented.
- No push notifications. iOS suspends Termius after 20–30 seconds in the background, so you re-attach.
- Codex in Termius is untested.
- Termius session logging is on by default (Pro).
- Mirrored networking needs Windows 11; Windows 10 needs a portproxy.
- There is no structured audit UI (agentsview is an optional add-on).
- Upside: the TUI-child route avoids `claude -p`, so it is exposed to neither the paused policy change nor the future `--bare` default.

**Strict alternatives**
- 7.16a–d and defaults-only: no change.
- 7.20 strict: tmux is screened out, so no persistent session layer remains → NEAREST MISS (A1). S10 is the drop-in replacement.
- Decision 18 strict: F11 = 4/10.

**Verdict:** CLEARS ALL ALWAYS GATES.

### S9: CAO + tmux + Termius + Tailscale (T-L), new in the update round

**Components**

| Component | Role |
|---|---|
| cli-agent-orchestrator (CAO) v2.5.4 | Core: orchestrator with supervisor/worker delegation through MCP and the `cao agent` CLI; a desktop-first web UI. |
| tmux | Core: CAO's runtime (one tmux session per agent). |
| ios-terminal T1 (Termius) | Core: phone client (attach to `cao-…` sessions) and A5. |
| tailwind | Core: network path; F6. |

**Topology**
- W1–W8.
- `cao-server` runs in its own tmux window, started by the W4 task. It stays on loopback (`127.0.0.1:9889`).
- Profiles: a supervisor plus workers pinned to `provider: claude_code` / `provider: codex`.
- The phone attaches to the `cao-…` tmux sessions.

**Gate table**

| Gate | Verdict | Clearing component | Evidence | File |
|---|---|---|---|---|
| A1 | PASS (7.4) | Termius + tmux, with CAO for starting | CAO sessions are tmux sessions: "You can attach directly to a session to watch or interact with agents in real time".<br>**(iii)** `cao launch --agents <profile> --provider claude_code\|codex` in a chosen directory, or the web UI's Spawn form.<br>CAO's web UI alone is PARTIAL (not phone-designed). | cli-agent-orchestrator A1 rows |
| A2 | PASS | CAO (native TUIs) | Native TUIs, live in tmux and the web UI. CAO sets no `--no-session-persistence`, no `--ephemeral` and no `CODEX_HOME` override. Vendor resume works afterwards, and memory-compiler runs persist too. | CAO A2 |
| A3 | PASS | CAO | Unmodified CLIs on their own logins, with no credential reads. It unsets `CLAUDE*` variables, so `claude setup-token` can't be used. The docs' "requires … API key" is contradicted by the source. | CAO A3 rows |
| A4 | PASS | CAO | Prompts are appended: `--append-system-prompt-file` for Claude, `-c developer_instructions` for Codex. | CAO A4 rows |
| A5 | PASS (configuration-scoped) | Termius | As S8. CAO alone is FAIL. | ios-terminal A5; CAO A5 |
| A6 | PASS | CAO | Workers are the same unmodified CLIs. Transcripts persist; teardown removes panes, not transcripts. | CAO A6 |
| A7 | PASS (workaround); sandbox clause not exercised | CAO | Workers start in the supervisor's working directory or an explicit `working_directory`; `use_worktree` gives each its own branch. | CAO A7 |
| A8 | PASS, first-class, both directions | CAO | The `assign`, `handoff` and `send_message` MCP tools and the `cao agent …` CLI. CAO: "A supervisor on one provider can delegate to workers running on entirely different providers". | CAO A8 |
| C1 | PASS (via WSL2) | CAO, tmux, Termius, tailwind | "On Windows, run CAO under WSL2". Linux wheel. The foreground server runs in a tmux window. | CAO C1 |

**N1–N3**

| Component | N1 | N2 | N3 |
|---|---|---|---|
| CAO | 1.5k★ | Stan Fan 20.3%, Ted Swinyar 11.5%; releases by haofeif and fanhongy | v2.5.4, 2026-10-15 (PyPI 2.5.3) |
| tmux, Termius, tailwind | as S8 | as S8 | as S8 |

**FAVOUR (7.17)**

| Item | Points | Component |
|---|---|---|
| F1 | 2 | CAO and tmux |
| F2 | 0 | CAO 1.5k★ < 5,000 |
| F3 | 2 | Termius |
| F4 | 2 | Termius (CAO UNKNOWN) |
| F5 | 2 | CAO/tmux |
| F6 | 1 | tailwind T-L |
| F7 | 2 | Termius |
| F8 | 2 | Termius |
| F9 | 0 | pod topologies don't show cross-node handover (7.7) |
| F10 | 0 | WSL2 sessions |
| **F1–F10** | **13/20** | |
| F11 | a2 b1 c2 d2 e1 = **8/10** | CAO (tmux scores the same) |

**Setup steps**
1. W1–W8.
2. Install with `uv tool install cli-agent-orchestrator` (this gives PyPI 2.5.3) and tmux 3.3+.
3. Start `cao-server` in a tmux window from the W4 task.
4. **Web UI exposure.** Keep it on loopback and use Termius. If you expose it, set `CAO_AUTH_LOCAL_TOKEN`, `CAO_ALLOWED_HOSTS` and `CAO_WS_ALLOWED_CLIENTS` (the iPhone's tailnet IP).
5. **Approvals.** CAO defaults to `claude --dangerously-skip-permissions` and `codex --yolo`. For prompts, set `permissionMode` and `codexProfile` in the profiles, and never `allowedTools: ["*"]`. Prompts then block assign/handoff until you answer them from Termius.
6. **`skipDangerousModePermissionPrompt`.** CAO writes `skipDangerousModePermissionPrompt: true` into the user-wide WSL2 `~/.claude/settings.json` on every Claude launch, so every Claude session in that home skips the bypass-mode warning. Check the file after the first launch.
7. **Memory compiler.** It is on by default and runs `claude -p --tools ""` / `codex exec` in the background. Turn memory off if you don't want that.
8. Don't use `claude setup-token` (CAO unsets `CLAUDE_CODE_OAUTH_TOKEN`).
9. Use `assign` (not `handoff`) for workers you want to continue.

**Risks**
- Approvals are bypassed by default.
- The user-wide settings write (step 6).
- The API is unauthenticated by default, and the local token is inherited by agent panes.
- The memory compiler spends quota and depends on the paused policy change and the future `--bare` default.
- PyPI "Beta" classifier.
- Docs conflict on API keys.
- The CAO 3.0 SaaS roadmap (#777) would need a re-check against 7.16b/7.13.
- Everything in S8's risks.

**Strict alternatives**
- **7.16a:** CAO's "Development Status :: 4 - Beta" makes CAO's own contributions PARTIAL. Every gate still clears through tmux, Termius and the CLIs (S8's substrate), so S9 still clears, but CAO then adds nothing gate-relevant.
- **7.16b/c:** no change.
- **Defaults-only:** no gate change. With approvals bypassed there are no prompts to answer, and questions are still answered in the TUI.
- **7.16d strict (verification R5):** the built-in supervisor role narrows tools with `--disallowedTools`, and the memory compiler uses `--tools ""`. Both become A4 PARTIAL for those paths. Unrestricted profiles and memory off avoid them.
- **7.20 strict:** NEAREST MISS, because CAO needs tmux.

**Verdict:** CLEARS ALL ALWAYS GATES. S8 dominates it on FAVOUR (same strict breakers, 2 more F1–F10 points, same F11). It stays shortlisted because CAO adds first-class supervisor/worker delegation, which FAVOUR only partly measures.

### S10: Termius + cmux-tui + Tailscale (T-L), S8's variant, new in the update round

**Components**

| Component | Role |
|---|---|
| ios-terminal T1 (Termius) | Core: phone client and A5. |
| cmux-tui (npm `cmux` 0.13.4, MIT; manaflow-ai/cmux `cmux-tui/`) | Core: session layer with an agent-aware CLI and socket. |
| tailwind | Core: network path; F6. |

**Topology**
- W1–W8 with cmux-tui instead of tmux: `npm i -g cmux` (needs Node).
- The W4 task runs `cmux server ensure --session agents --socket /home/<user>/.cmux/agents.sock`. Pass the same explicit `--socket` everywhere.
- Agents run with `cmux workspace <name> run --on-exit keep -- claude|codex`.

**Gate table**

| Gate | Verdict | Clearing component | Evidence | File |
|---|---|---|---|---|
| A1 | PASS (7.4; configuration: W4, explicit socket) | Termius + cmux-tui | **7.4 persistence:** the detached headless owner is the default (`setsid`, null stdio; `server.detached_owner` is true).<br>**(i)** A sidebar of workspaces, agents and tabs; `cmux session list` / `agent list`. Attach replays the exact screen, and `attach --terminal <id>` shows one TUI full-screen.<br>**(ii)** Native TUI input.<br>**(iii)** `cmux workspace create`, then `workspace <x> run -- claude\|codex`. | cmux A1 |
| A2 | PASS | cmux-tui (vendor TUIs) | Native TUIs. `agent list` keeps Claude's `agent_session_id` for `claude --resume`. The default `--on-exit close` leaves only an exit receipt, so use `--on-exit keep`; the native transcript remains either way. | cmux A2 |
| A3 | PASS | the CLIs | The shims `exec` the real binaries with hooks only, and there is no credential code. Unset API-key variables before the owner starts. | cmux A6; harness notes |
| A4 | PASS (hooks appended, 7.16d) | cmux-tui | **Claude:** a merged `--settings` with hook groups and `preferredNotifChannel: notifications_disabled`.<br>**Codex:** `--enable hooks` plus `-c hooks.*`. | cmux A3/A4 |
| A5 | PASS (configuration-scoped) | Termius | As S8. cmux-tui has no file view. | ios-terminal A5; cmux A5 |
| A6 | PASS | cmux-tui | The shims run the real CLIs on their own logins. Transcripts in WSL2 are not redirected, and `agent_session_id` is persisted. | cmux A6 |
| A7 | PASS (workaround); sandbox clause not exercised | cmux-tui | Shared filesystem; `run` preserves the exact argv after `--`. | cmux A7 |
| A8 | PASS, first-class, both directions | cmux-tui | Every pane exports `CMUX_TUI_SOCKET`.<br>**Create:** `workspace current run -- codex exec --json …` (or `-- claude …`).<br>**Monitor:** `agent list`, `terminal <id> screen read\|wait`, `output read`, `process wait`.<br>**Resume:** `terminal <id> write` plus `keys enter`, or vendor resume.<br>**Caveat:** whether Codex can reach the socket without an approval is UNKNOWN; expect an approval. | cmux A8 |
| C1 | PASS (via WSL2) | cmux-tui, Termius, tailwind | Static-musl Linux binaries on npm; the docs send Windows users to WSL 2. No service unit, so start it from the W4 task. | cmux C1 (cmux-tui row) |

**N1–N3**

| Component | N1 | N2 | N3 |
|---|---|---|---|
| cmux (repo, for cmux-tui) | 28.3k★ | PASS at repo level: four humans ≥10%. cmux-tui itself: 93.9% of 2,824 non-bot commits by one author (bus-factor risk). | Repo active (v0.65.2, 2026-10-16). cmux-tui-v0.13.4 was 2026-09-17; the TUI nightly was removed as "dormant" on 2026-10-05. |
| Termius, tailwind | as S8 | as S8 | as S8 |

Decision 17 (shortlist.md) admits cmux-tui as a component.

**FAVOUR (7.17)**
- F1 2 (cmux-tui), F2 2 (min(cmux 28.3k, Tailscale)), F3 2, F4 2, F5 2, F6 1, F7 2, F8 2.
- F9 0: the Docker and microVM "create sources" are prototype UX that never invoke Docker.
- F10 0.
- **F1–F10 = 15/20.** F11 = a2 b1 c2 d2 e1 = **8/10** (cmux-tui).

**Setup steps**
1. W1–W8, with cmux-tui instead of tmux.
2. Use `--on-exit keep`.
3. Don't prepend `~/.local/bin` to PATH in shell rc files: that bypasses the shim, so hooks are lost (gates are unaffected).
4. Stop forgotten sessions: there is no idle reaping.
5. Approvals and Codex→Claude as in S8.

**Risks**
- **Sub-product maturity:** one author wrote about 94%; no release since 2026-09-17; the nightly was removed; cmux.com never mentions it.
- No boot unit and no idle reaping.
- The shim turns off Claude's own notifications.
- Codex needs an approval to reach the socket.
- Everything in S8's Termius and WSL risks.
- **Watch item:** cmux iOS direct SSH was merged on 2026-09-28 but is unreleased. It could later replace Termius; while it is TestFlight-only, F3 is PARTIAL.

**Strict alternatives**
- 7.16a–d and defaults-only: no change.
- 7.20: unaffected (no tmux).
- Decision 17 strict, either way → NEAREST MISS (A1):
  - (a) cmux's C1 fail covers the whole repo → screened out;
  - (b) N2 is judged on cmux-tui's own commits → likely FAIL → screened out.

**Verdict:** CLEARS ALL ALWAYS GATES, on decision 17.

### S11: Superset (WSL2 CLI host) + Termius + Tailscale, new in the update round (C1 by the user's assumption)

**Components**

| Component | Role |
|---|---|
| superset | Core: the standalone CLI host in WSL2, plus the iOS/iPadOS app through Superset's relay. Orchestrator. |
| ios-terminal T1 (Termius) | Core: A5, F7 and F8 through SFTP; an optional shell. |
| tailwind | Core: SSH/SFTP reach; F6. |

**Topology**
- W1–W8. Termius is used for files; no session layer is needed.
- The Superset CLI host runs in WSL2: `superset auth login`, then `superset start --daemon` under a systemd user unit (systemd on), plus W4.
- The phone app connects through the relay (Pro, iOS 26+).
- The desktop app is not used.

**Gate table**

| Gate | Verdict | Clearing component | Evidence | File |
|---|---|---|---|---|
| A1 | PASS | superset | The CLI host "registers the machine with the relay".<br>**(i)** The iOS app shows the host roster, workspaces and sessions, and streams terminals.<br>**(ii)** Input including esc/enter/tab/⇧tab/arrows; "answer its questions".<br>**(iii)** Pick project, branch and agent (Claude Code or Codex) → a new terminal workspace.<br>Needs Pro and iOS 26. | superset A1 rows |
| A2 | PASS | superset (vendor TUIs) | Native TUIs in Superset terminals, owned by a background daemon. Sessions resume automatically; `agents create --resume-session`, `claude --resume` / `codex resume` also work. `agents read` drops tool calls. | superset A2 |
| A3 | PASS + 7.16b note (configuration-scoped, 7.16c) | superset | Inference runs only in the CLIs: "Superset never proxies model calls". The usage reads happen only from the desktop UI, which is not run.<br>**Avoid:** cloud workspaces, Agent Accounts, and CLI calls without `--local`/`--host`. | superset A3 |
| A4 | PASS (terminal path) | superset | The presets run the unmodified binaries, plus hooks. Chat's Claude path (no `systemPrompt`, `settingSources: []`) is A4 PARTIAL, so it is not used. | superset A4 |
| A5 | PASS (configuration-scoped) | Termius | As S8. Superset's iOS app alone is diffs-only (PARTIAL). | ios-terminal A5; superset A5 |
| A6 | PASS | superset | `agents create --agent codex\|claude`; no ephemeral flags; transcripts in WSL2. | superset A6 |
| A7 | PASS (workaround); sandbox clause not exercised | superset | Shared filesystem, branch hand-over, `--attachment` and `--from-terminal`. | superset A7 |
| A8 | PASS, first-class, both directions | superset | `agents create/wait/read`, `terminals read/send`, `--resume-session`. With `--host`, calls go over local loopback. | superset A8 |
| C1 | PASS (user assumption, 7.18) | superset; Termius; tailwind | The user's directive. A systemd unit plus W4. Vendor caveats are recorded as risks. | superset C1 |

**N1–N3**

| Component | N1 | N2 | N3 |
|---|---|---|---|
| superset | 15.3k★ (ELv2) | Patel 41.4%, Kiet 41.1%; two maintainers merged outside PRs | desktop-v1.38.0, 2026-10-14 |
| Termius, tailwind | as S8 | as S8 | as S8 |

**FAVOUR (7.17)**
- F1 1 (superset: 7.16b/c cap).
- F2 2 (superset 15.3k, Tailscale).
- F3 2 and F4 2 (superset's App Store app; native iPad in 1.1.3).
- F5 2 (superset).
- F6 1 (tailwind T-L; superset 0).
- F7 2 and F8 2 (Termius; superset 1 each).
- F9 0, F10 0.
- **F1–F10 = 14/20.** F11 = a2 b1 c2 d2 e1 = **8/10** (superset).

**Setup steps**
1. Superset Pro; iPhone/iPad on iOS/iPadOS 26+.
2. The CLI host in WSL2 under systemd, plus W4.
3. No cloud workspaces, no Agent Accounts, and `--local`/`--host` on every call.
4. No desktop app day to day, and no Superset Chat.
5. **Approvals.** The presets add bypass flags. Edit the agent commands to remove them. superset.md documents this only in Settings → Agents in the desktop app; a route without the desktop app is UNKNOWN.
6. W1–W8 for files.

**Risks**
- **C1 rests on your assumption.** The vendor says WSL support is "not at least for a few months" (#1993), and its comparison page tells Windows/WSL users to choose a competitor.
- **The relay** is mandatory, has no end-to-end encryption, and exposes the host to org members you grant access.
- Approvals are bypassed by default.
- Token reads happen if the desktop app runs.
- Cloud fall-through if cloud workspaces exist.
- Attachments go through Superset cloud storage, and `--from-terminal` hand-offs are unredacted.
- `agents read` drops tool calls.
- Cost.

**Strict alternatives**
- **Without your assumption:** NEAREST MISS (C1).
- **7.16a:** labels on the Linux/WSL2 build are exempt by 7.18; no other label in the core.
- **7.16b:** applies only if the desktop app runs (then A3 FAIL).
- **7.16c:** the Agent Accounts cloud credential path is offered → A3 FAIL (Claude); Chat's replaced Claude prompt (7.16d via 7.16c) → A4 PARTIAL → NEAREST MISS.
- **Defaults-only:** no change.
- **7.20:** unaffected.

**Verdict:** CLEARS ALL ALWAYS GATES on the user's C1 assumption. It supersedes round 1's "Superset nearest miss (C1)".

### S12: S3 + Bernstein (Codex-routed): "Bernstein as a Codex-only orchestrator, Claude elsewhere"

**Why Bernstein can't be the hub** (bernstein deep-dive):
- **A2/A6b:** every Bernstein-spawned Claude session runs with a fixed `--no-session-persistence`. No native transcript is written, and the dashboard shows tool inputs but no results. So A2 is PARTIAL and A6b FAILs for Claude children, with no switch.
- **A1:** its phone surfaces (the PWA and the chat bridge) can't start a run with a chosen harness (the button has no handler). They can't message a running session either: steer messages apply at the next spawn. So A1 is PARTIAL.

**Composition**
- S3 unchanged, plus Bernstein v3.22.0 on Windows, where it is supported natively. Configuration: `cli: codex` and every `role_config.<role>.cli: codex`.
- A Claude session (Desktop or CLI) drives it through `bernstein mcp` → `bernstein_run`.
- Codex→Claude stays S3's CLI workaround (`claude -p` / `--bg`), never Bernstein's Claude spawner.

**Gates**
- S3's gate table holds.
- Bernstein adds first-class Claude→Codex create and monitor (`bernstein_run`, `bernstein_run_status`). Resume is a workaround (`codex exec resume`).
- **A2:** Bernstein's Codex sessions PASS through `codex resume` on the persisted rollout (the dashboard's raw JSONL alone would be PARTIAL). The janitor's `claude -p` runs persist.
- **A3/A4:** unmodified `codex exec --sandbox workspace-write`. Its auth check only tests that `auth.json` exists.

**N-gates (Bernstein)**
- N1: 1.3k★.
- N2: PASS (7.3) only because a second human (Phoenix1504e) merged five PRs written by others, all from 2026-10-14 on. Its README and GOVERNANCE.md call it "single-maintainer".
- N3: v3.22.0, 2026-10-15.

**FAVOUR**
- F1 2. F2 0 (Bernstein 1.3k is core). F3–F8 2 (S3). F9 0. F10 1. **F1–F10 = 15/20.**
- F11 = a1 b1 c2 d1 e1 = **6/10**: Bernstein's F11c (2) adds one point over S3's 5/10.

**Setup if used**
- Codex routing (above).
- Verifier off; `OPENROUTER_*` and other third-party model keys unset.
- `--tunnel-provider tailscale`.
- API-key variables unset.
- `claude -p` / `--bg` for Codex→Claude.

**Strict alternatives**
- **N2 (self-description decisive):** Bernstein is screened out, and the stack falls back to S3.
- **7.16a ("Status: beta"):** Bernstein's contributions become PARTIAL; S3 still clears.
- **Defaults-only:** Bernstein's default adapter is Claude (`BERNSTEIN_DEFAULT_CLI` defaults to "claude"), whose sessions fail A2 → NEAREST MISS as a core component.

**Verdict:** CLEARS ALL ALWAYS GATES under the binding reading, but **not shortlisted**.
- Against S3 it loses 2 F1–F10 points (F2) and gains 1 F11 point.
- It adds a narrow N2, a beta label and a default that breaks A2.
- **S8-based variant** (Bernstein in WSL2, Codex-routed, with S8): 13/20 and 8/10, so S8 dominates it. It would be 14/20 if Bernstein's Tailscale preview tunnel worked from WSL2, but that needs `tailscaled` inside WSL2, which Tailscale advises against.

### Dropped combinations (one line each)

- **Two full orchestrators together** (Orca + T3, Orca + Maestro, T3 + Archon, …): redundant. One clears the gates alone, and running both doubles credential side reads and confusion.
- **Anything on Warp Oz (W2):** A3 FAIL (API keys only).
- **Anything delegating from a Claude cloud session to Codex:** A6a FAIL. There is no documented ChatGPT-login Codex in Claude cloud.
- **Codex cloud as part of the core:** A2 UNKNOWN for cloud tasks, and the `@codex` legacy experience is slated for deprecation (github-apps G2).
- **Docker Sandboxes as the main runtime:** Codex A3 FAILs inside `sbx`, so it is only a Claude isolation add-on (S3+D).
- **Obsidian Sync or GitHub as the only A5 provider:** PARTIAL (dot-folders and code not viewable on iOS; committed state only).
- **Superset without the user's C1 assumption:** C1 PARTIAL (no Windows build; experimental Linux; pre-release host CLI). With the assumption, see S11.
- **Claude agent view as the hub:** Claude-only; can't dispatch from the phone; A5 FAIL.
- **CAO or Gas City on cmux-tui:** both drive tmux (CAO "orchestrates agents through tmux"; tmux is Gas City's default runtime), so cmux-tui can't replace tmux under them. S10 is a variant of S8 only.
- **Superset's desktop app under WSLg as the PC UI:** the vendor calls it "experimental and untested", and #1993 reports "nothing works". It also triggers the token reads. S11 uses the CLI host.
- **Bernstein as the Claude platform or hub:** A2 and A6b fail (no Claude transcripts), and A1 is PARTIAL (no start, no live messaging). Codex-routed add-on only (S12).
- **Screened-out components:**
  - wmux (both): N1;
  - Blink Shell: N2;
  - the cmux Mac app and iOS companion: C1 (needs a Mac; TestFlight);
  - mosh: unscreened, not a given.
- **No change from adding Termius:**
  - T3 Code and Orca already have phone file browsers and full phone apps.
  - Maestro's sessions are not tmux TUIs, so Termius can't answer its Claude prompts.
  - Agor (S5) gains nothing it needs.

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
   - **Net:** T-W suits S1, S3 and S4. T-L suits S2 (T3's service) and the WSL-only tools: Agor, Archon (S6), Gas City (S7), tmux and cmux-tui (S8, S10), CAO (S9) and Superset's CLI host (S11).
3. **`cleanupPeriodDays`.** Claude Code deletes transcripts after 30 days by default ("The default is 30 days and the minimum is 1", claude-directory). Every stack must raise it for A6b; this is a 7.7 setup step. Codex rollouts are compressed after 7 days, never deleted (chatgpt-desktop-codex A6).
4. **API-key variables.**
   - `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, `apiKeyHelper`, `CLAUDE_CODE_OAUTH_TOKEN` (unless deliberately used), `CODEX_API_KEY` and `OPENAI_API_KEY` must stay unset in every shell, scheduled task, service unit and CI environment.
   - Several tools silently prefer an API key: Gas City auto-accepts it, claude-code-action ranks the key above the token, and Maestro's docs warn about `claude -p` billing.
5. **Subscription allowance for headless and SDK use.** Anthropic's Help Center (update 2026-10-07): "You can still use the Claude Agent SDK, `claude -p`, and third-party apps with your subscription limits". The previously announced change is paused (2026-06-15). S2 (Agent SDK), S4 (`claude -p`) and every stack's Codex→Claude delegation through `claude -p` depend on it staying paused. In S3, `claude --bg` (agent view) is an alternative Codex→Claude path that uses interactive background sessions.
6. **Credential side reads with spoofed user-agents** (7.16b): Orca (both vendors) and T3 Code (Claude). Maestro reads Codex `auth.json` without spoofing. claude-desktop, chatgpt-desktop-codex and Tailscale touch none.
   - **Update round:**
     - Superset reads both vendors' tokens, without spoofing, but only from its desktop UI.
     - Gas City reads Codex `auth.json` locally.
     - Bernstein only checks that `auth.json` exists.
     - Termius, tmux, cmux-tui and CAO touch none.
7. **Approvals bypassed by default** (each file's harness notes).

   | Tool | Default | Switch |
   |---|---|---|
   | Orca | Claude `--dangerously-skip-permissions`; Codex `--dangerously-bypass-approvals-and-sandbox` | Agent Permissions → Manual |
   | Superset | the same two flags, plus `--dangerously-bypass-hook-trust` | edit the presets |
   | CAO | `claude --dangerously-skip-permissions`; `codex --yolo` | profile `permissionMode` / `codexProfile` (`allowedTools ["*"]` forces `--yolo`) |
   | Gas City | unrestricted mode flags for both | no prompt-keeping Codex mode documented |
   | Archon | Claude `bypassPermissions`; Codex `approvalPolicy: never` + `danger-full-access` | none |
   | Maestro | Full Access | needed for its phone recipe |
   | Bernstein | Claude workers `bypassPermissions` | unused in S12 |

   **Prompts kept by default:** S3 (the vendor apps), S8 and S10 (bare CLIs in tmux/cmux-tui), and T3 (approvals on the phone).
8. **`skipDangerousModePermissionPrompt`.**
   - CAO writes it into the user-wide `~/.claude/settings.json` on every Claude launch (claude_code.py#L577), which affects every Claude session in that home.
   - Gas City sets it only in its own per-city `--settings` file (gas-city A1 row), so it is session-scoped.
9. **Codex sandbox and agent-issued commands.**
   - In Codex's default Linux sandbox, seccomp "Restricted" mode denies `connect` (tmux A6).
   - So a Codex agent's `tmux`, `cmux`, `claude -p` or orchestrator-API call needs an approval, or a Codex rule (rules are experimental).
   - For cmux the need is UNKNOWN (cmux A8), but expected. For Bernstein's REST API it is an open question.
10. **Environment inheritance.** tmux and the cmux-tui owner copy the environment of the shell that starts them. So API-key variables must be unset before the first start after each distro boot (W2).
11. **Termius privacy defaults.** Session logging is on by default for all vaults on Pro and records terminal text, and the AI widget's data flow is undocumented. Both are W7 setup steps.
12. **No phone notifications in the terminal stacks.** Neither Termius nor tmux/cmux-tui pushes a notification when an agent waits for input (ios-terminal, tmux, cmux).
13. **Headless `claude -p` exposure** (the paused subscription change; the future `--bare` default for `-p`).
    - Exposed: S3's Codex→Claude path, S4's default path, CAO's memory compiler, and Bernstein's janitor.
    - Also exposed through the Agent SDK: T3 Code and Archon.
    - Not exposed: S8/S10 delegation through interactive TUI children.

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
| **Update round.** tmux.md's stack fit gives F7 an indicative 1 ("download-to-open, no in-app preview"). The ios-terminal deep-dive gives F7 2 (iOS 7.3.0 "full screen" SFTP preview). | A direct contradiction. It was settled with the primary source, Termius's iOS changelog (https://docs.termius.com/changelog/ios, retrieved 2026-10-19):<ul><li>5.8.0 (2024-05-20): "We have added the ability to preview files in SFTP on remote servers, including playing audio and video content";</li><li>7.3.0 (2025-12-08): "Changed the files preview style in SFTP to full screen".</li></ul> | F7 = 2 in every Termius stack. tmux.md's "about 14/20" for TS-min becomes 15/20 (S8). |
| tmux's F11e is 2 ("PASS (caveat)"). Every other file gives PARTIAL when one of F11a–d falls short of PASS: superset (no parent link), cmux-tui, cli-agent-orchestrator, gas-city, bernstein, archon (no take-over from the phone). | The same sub-item is graded unevenly. | **Uniform rule:** F11e = 2 only when F11a–d are all PASS and all reachable from iPhone/iPad. tmux's F11b is PARTIAL, so its F11e = 1, and S8's F11 = 8/10. tmux.md's own reading would give 9/10; applied uniformly, it would also lift S10 and S11 to 9/10. Shortlist decision 19. |
| gas-city "No screened iOS terminal exists" (A1 partner path c); archon "No partner fits cleanly" (A5); round-1 S7 note "Blink Shell failed N3 per discovery" | All written before ios-terminal was screened. Blink was then screened and failed N2, not N3. | Superseded: Termius passes, so S6 and S7 now clear, with conditions. |
| superset's deep-dive A5 partner is Tailscale SMB with the projects on `/mnt/c` | Still valid, but Termius SFTP to the distro's sshd keeps projects on ext4 (no `/mnt/c` speed cost). | S11 uses Termius SFTP; SMB on `/mnt/c` is the fallback. |
| Round-1 S1 strict alternatives (above) and shortlist decision 8: Orca strict 7.16c ("experimental Agent SDK path offered → A3") | Verification R6: Orca's SDK path keeps the `claude_code` preset and is a 7.6 PASS row, so it is not a non-compliant path. | Orca's strict 7.16c impact is removed. Orca is still a nearest miss under strict 7.16b. |
| bernstein F1 PASS vs gas-city F1 PARTIAL for similar Codex `auth.json` checks | Bernstein only tests that the file exists (`_CODEX_AUTH_FILE.exists()`). Gas City reads it to check `auth_mode`. | Both kept as filed: an existence check is not a read. |
| cmux.md: cmux-tui is "not the scoped product. The orchestrator decides whether to admit it" | The orchestrator asked for S10, so cmux-tui is admitted. Its N2 is judged at repo level, while its C1 is judged as a separate component. | Recorded as shortlist decision 17, with both strict alternatives. |

---

## 6. Ranking (update round)

### 6.1 Method (same as round 1, extended to the new rulings)
1. **Binary robustness.** Does the stack still clear every ALWAYS gate under each of these strict alternatives?
   - 7.16a (any beta label → PARTIAL);
   - 7.16b (any third-party read of Claude tokens fails A3);
   - 7.16c (offering a non-compliant login or credential path at all fails A3);
   - a defaults-only reading;
   - 7.16d strict ("any tool-set change", verification R5);
   - 7.20 (tmux N2 counted without merge commits);
   - decision 17 (cmux-tui not admitted, or its N2 judged on its own commits).

   Left out, because they separate nothing:
   - decision 11 (default 30-day retention) fails A6b in every stack;
   - decisions 12 and 16 (OS built-ins, including SSH servers, as components) add screening work for S3's SMB route and the SSH routes of S6–S11 rather than failing one stack;
   - decision 20 (OS settings counted as defaults) breaks every stack's uptime. The user's Superset C1 assumption (7.18) is a binding directive, not an interpretation. Its impact is shown in the matrix but not counted against robustness.
2. **FAVOUR total** (F1–F10 + F11). Ties go to the higher F1–F10, then the higher F11. S8 and S10 tie exactly and share rank 4 (S10 is S8's variant).

### 6.2 Ranked shortlist

| Rank | Stack | F1–F10 | F11 | Total | Becomes a nearest miss under |
|---|---|---|---|---|---|
| 1 | S3 first-party pair + Tailscale (T-W) | 17 | 5 | 22 | none (robust) |
| 2 | S1 Orca + Tailscale (T-W) | 16 | 10 | 26 | 7.16a; 7.16b |
| 3 | S2 T3 Code + Tailscale (T-L) | 15 | 10 | 25 | 7.16a; 7.16b; defaults-only |
| 4a | S8 Termius + tmux + Tailscale (T-L) | 15 | 8 | 23 | 7.20 |
| 4b | S10 Termius + cmux-tui + Tailscale (T-L) | 15 | 8 | 23 | decision 17 |
| 5 | S6 Archon + Termius + Tailscale (T-L) | 14 | 9 | 23 | 7.16c |
| 6 | S11 Superset + Termius + Tailscale (T-L) | 14 | 8 | 22 | 7.16c (also 7.16b if the desktop app runs; also without the user's assumption) |
| 7 | S9 CAO + tmux + Termius + Tailscale (T-L) | 13 | 8 | 21 | 7.20 |
| 8 | S7 Gas City + tmux + Termius + Tailscale (T-L) | 12 | 8 | 20 | 7.20; 7.16c |
| 9 | S4 Maestro + agentsview + Tailscale (T-W) | 11 | 9 | 20 | defaults-only; 7.16d strict |
| — | S12 S3 + Bernstein (not shortlisted) | 15 | 6 | 21 | defaults-only (as core); Bernstein's strict N2 → reverts to S3 |
| — | S5 Agor + ChatGPT desktop (not shortlisted) | 13 | 5 | 18 | 7.16b; 7.16c |

**FAVOUR-only order** (total; ties by F1–F10): S1 26, S2 25, S8 23, S10 23, S6 23, S3 22, S11 22, S12 21, S9 21, S7 20, S4 20, S5 18.

### 6.3 Strict-reading matrix

✗ = becomes a nearest miss (gate named). c = the component's own contributions degrade, but the stack still clears. — = no change.

| Stack | 7.16a | 7.16b | 7.16c | Defaults-only | 7.16d strict (R5) | 7.20 tmux N2 | Decision 17 | User's Superset assumption dropped |
|---|---|---|---|---|---|---|---|---|
| S3 | — | — | — | — | — | — | — | — |
| S1 | ✗ A1 | ✗ A3 | — (R6) | — | — | — | — | — |
| S2 | ✗ A1 and others | ✗ A3 | — | ✗ A2 | — (helper path only) | — | — | — |
| S8 | — | — | — | — | — | ✗ A1 | — | — |
| S10 | — | — | — | — | — | — | ✗ (screened out) | — |
| S6 | — (no label recorded) | — | ✗ A3 | — | — | — | — | — |
| S11 | — (exempt by 7.18) | ✗ A3, only if the desktop app runs | ✗ A3, A4 | — | — | — | — | ✗ C1 |
| S9 | c (CAO "Beta") | — | — | — | c (avoidable) | ✗ A1 | — | — |
| S7 | — | — | ✗ A3 | — | — | ✗ A1 | — | — |
| S4 | — | — | — | ✗ A1 | ✗ A4 | — | — | — |

**Sensitivity to the two F11 rulings**
- **Decision 18 strict** (tmux scores no F11): S8 falls to 15 + 4 = 19 and drops below S7 and S4. Ranks 1–3 and S10 are unchanged.
- **Generous F11e reading** (tmux.md's own): S8 and S10 rise to 24, and S11 to 23, tying S6. The top three are unchanged.
