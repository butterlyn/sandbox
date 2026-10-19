# Shortlist: agent orchestration setup for iPhone/iPad + an always-on Windows PC (WSL2)

Prepared 2026-10-19. Inputs: 27 candidates screened, 16 deep-dived, then combined into stacks. The rules (gate IDs N1–N3, A1–A8, C1, F1–F11, verdict meanings) are in `research/brief.md`. Working detail is in `research/stacks.md`, and per-candidate evidence in `research/<slug>.md`.

---

## 1. Recommendations (read this first)

Four stacks clear every ALWAYS gate under the brief's binding interpretations. They are ranked by two things, in this order:
1. Does the stack still clear the gates under the stricter alternative readings (section 6)?
2. FAVOUR points.

| # | Stack | Verdict | FAVOUR F1–F10 | FAVOUR F11 | Strict readings |
|---|---|---|---|---|---|
| 1 | **First-party pair:** Claude desktop app + ChatGPT desktop (Codex) + Tailscale, all Windows-native | CLEARS ALL ALWAYS GATES | 17/20 | 5/10 | Still clears under every one |
| 2 | **Orca** + Tailscale, Windows-native | CLEARS ALL ALWAYS GATES | 16/20 | 10/10 | Nearest miss (A3 or A1) |
| 3 | **T3 Code** + Tailscale, server in WSL2 | CLEARS ALL ALWAYS GATES (one setting needed) | 15/20 | 10/10 | Nearest miss (A3, A1, A2) |
| 4 | **Maestro** + agentsview + Tailscale, Windows-native | CLEARS only with permission prompts switched off | 11/20 | 9/10 | Nearest miss (A1) |

Ranked by FAVOUR total alone, the order would be Orca (26), T3 Code (25), first-party pair (22), Maestro (20).

### 1. First-party pair (safest)

**Why**
- Every agent runs in the vendors' own apps on the vendors' own logins. No third-party tool touches your Claude or ChatGPT credentials.
- The Claude iOS app controls Claude Code sessions on the PC. The ChatGPT iOS app controls Codex on the PC.
- Tailscale gives the iPhone the PC's live workspace folders in the Files app, plus localhost dev servers in Safari.
- It is the only stack that passes under every strict reading.

**Weak spots**
- Cross-agent delegation uses command-line calls (`codex exec`, `claude -p` or `claude --bg`), not first-class platform sessions. So F11 is only 5/10.
- The Claude iOS app cuts approval commands and diffs at about 100 characters.
- Each app must stay running (no Windows service mode).

**Setup outline**
1. Install Claude Desktop, the Claude Code CLI, the ChatGPT desktop app and the Codex CLI natively on Windows. Keep repos under `C:\`.
2. Turn on Remote Control and ChatGPT remote connections.
3. Run one `claude remote-control --spawn worktree` server per repo from a Task Scheduler restart loop.
4. Raise `cleanupPeriodDays`. Never set API-key environment variables.
5. Install Tailscale and share the workspace root over SMB to iOS Files.

### 2. Orca (most capable single tool)

**Why**
- One app does everything for both Claude Code and Codex:
  - a native iPhone/iPad app with a live terminal mirror, approvals, a file browser and session start;
  - first-class delegation in both directions through its CLI, with child sessions linked to their parent on the phone;
  - the unmodified `claude` and `codex` TUIs under their own logins.

**Main risk:** Orca reads your Claude and ChatGPT OAuth tokens to show usage. It calls the vendors' private usage endpoints while presenting itself as `claude-code/2.1.0` and as `codex-cli` / "Codex Desktop", and there is no off switch. Anthropic says developers "may not collect, store, or intermediate Claude.ai credentials or session tokens". This could lead to vendor blocking or account action.

**Setup outline**
1. Install Orca and both CLIs natively on Windows, with repos on `C:\`.
2. Keep Chat UI (experimental) off and the API-key variables unset.
3. Raise `cleanupPeriodDays`.
4. Pair the phone over Tailscale rather than Orca's relay.

### 3. T3 Code (strong alternative, runs unattended in WSL2)

**Why**
- Similar strengths to Orca: an iPhone/iPad app covering both harnesses, a file browser, and first-class delegation through its MCP (`delegate_task`, `t3_thread_send`).
- It runs as a systemd service in WSL2.

**Risks**
- Same kind of token read as Orca, but for Claude only, with a `claude-cli` user-agent.
- Its own helper runs leave no transcript unless you switch text generation to Claude.
- WSL2 needs a keep-alive.
- Sessions don't show up in the Windows desktop apps.
- The product is labelled "Beta".

### 4. Maestro (only if you accept no permission prompts)

**Why**
- Strong first-class delegation through `maestro-cli`, a phone webapp and a file browser.

**Catch**
- To answer everything from the phone, Claude must run with permission checks off, and Codex already runs with approvals and the sandbox bypassed.
- It also needs agentsview for a full audit trail.
- There is no App Store app.

### Optional add-ons (don't change the verdicts)
- **agentsview:** a full transcript viewer for every Claude and Codex session, including delegated runs. Recommended with stack 1, where it lifts F11 to 6/10. Run it with `require_auth`.
- **Claude Code agent view** (`claude --bg`, `claude agents --json`): better Codex→Claude hand-offs in stack 1.
- **GitHub:** branch hand-over and a transcript archive via hooks.
- **Obsidian Sync:** Markdown, PDF and image viewing plus photo upload. It never syncs `.git`/`.claude`, and it can't show code on iOS.
- **Docker Sandboxes:** isolation for Claude sessions only. Variant S3+D scores 18/20 but adds a credential-handling policy risk and needs Windows 11.
- **Claude GitHub App:** `@claude` runs on a self-hosted runner.
- **Warp:** a PC terminal.

---

## 2. Stack 1 (S3): Claude desktop app + ChatGPT desktop (Codex) + Tailscale, Windows-native

**Components**

| Component | Role |
|---|---|
| claude-desktop | Claude half: Claude Desktop, the Claude iOS/iPadOS app, Remote Control |
| chatgpt-desktop-codex | Codex half: ChatGPT desktop app with the Windows-native Codex agent, ChatGPT iOS remote connections |
| Tailscale ("Tailwind") | Networking, phone file access over SMB, localhost via Serve |

**Topology**
- **Repos.** Under `C:\`. Each repo is saved as a ChatGPT project and served by a `claude remote-control` server.
- **Phone traffic.** The phone reaches Claude and Codex through the vendors' own relays. SMB and dev-server traffic go over Tailscale.
- **Transcripts.** They live in `%USERPROFILE%\.claude\projects` and `%USERPROFILE%\.codex\sessions`. Codex's app and CLI share that home by design.
- **Not in the core.** Claude cloud sessions and Codex cloud tasks. Codex cloud's tool-call fidelity is UNKNOWN, and OpenAI plans to deprecate "Codex Cloud (Legacy)". Cloud output reaches the PC only as a branch, which is A5 PARTIAL.

### Gate table

Dates are source dates; "undated" pages were retrieved 2026-10-19.

| Gate | Verdict | Clearing component | Evidence | Source URL | Date |
|---|---|---|---|---|---|
| A1, Claude half | PASS | claude-desktop | **(i) List and read:** find the session in the Claude app's Code tab; the device "shows the conversation … as it happens".<br>**(ii) Message and approve:** "send messages from your terminal, browser, and phone interchangeably"; permission prompts and `AskUserQuestion` stay open until you answer.<br>**(iii) Start:** sessions start in folders served by `claude remote-control --spawn same-dir\|worktree` (capacity 32), or in the cloud.<br>A native-Windows Remote Control folder is listed in the iOS app (#102650). | https://code.claude.com/docs/en/remote-control · https://code.claude.com/docs/en/cloud-environments · https://github.com/anthropics/claude-code/issues/102650 | undated · undated · 2026-10-16 |
| A1, Codex half | PASS | chatgpt-desktop-codex | **(i)** "Switch between connected hosts and chats", "Review outputs, diffs, test results, terminal output".<br>**(ii)** "Send follow-up instructions, answer questions", "Approve commands".<br>**(iii)** "Start new chats in projects on the host", with a directory picker (1.2026.160).<br>Windows hosts supported; "Codex Remote has reached general availability". | https://learn.chatgpt.com/docs/remote-connections · https://learn.chatgpt.com/docs/mobile · https://learn.chatgpt.com/docs/changelog | undated · undated · 2026-06-15 / 2026-06-25 |
| A2 | PASS | both | **Claude:** Desktop's Verbose view shows "Every tool call, file read, and intermediate step"; the terminal TUI and `claude --resume` show the full transcript.<br>**Codex:** commands and tool calls with output on desktop and phone (collapsed, expandable). The protocol items carry command, cwd, output and exit code.<br>**iPhone caveat (Claude):** approval commands and diffs are truncated at about 100 characters (#37235). One surface is enough for A2 (brief 7.5). | https://code.claude.com/docs/en/desktop · https://learn.chatgpt.com/docs/remote-connections · https://github.com/openai/codex/blob/89461ea6833832b0551ce24ee32205824d5c108d/codex-rs/app-server-protocol/src/protocol/v2/item.rs#L293-L329 · https://github.com/anthropics/claude-code/issues/37235 | undated · undated · 2026-10-19 · 2026-03-21 / 2026-05-20 |
| A3 | PASS | both | **Claude:** Pro/Max plans cover "Claude Code in your terminal with one unified subscription". Desktop and cloud "use OAuth". Remote Control: "API keys are not supported".<br>**Codex:** "Sign in with ChatGPT for subscription access"; mobile remote control is unavailable with API keys.<br>No third party reads the tokens. | https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan · https://code.claude.com/docs/en/authentication · https://learn.chatgpt.com/docs/auth · https://learn.chatgpt.com/docs/pricing | 2026-10-14 · undated · undated · undated |
| A4 | PASS | both | **Claude:** Desktop "runs its own copy of Claude Code"; Remote Control is the unmodified CLI.<br>**Codex:** "By default, the ChatGPT desktop app uses the Windows-native Codex agent". | https://code.claude.com/docs/en/desktop · https://learn.chatgpt.com/docs/windows/windows-app | undated |
| A5 | PASS | Tailscale (SMB, T-W), plus chatgpt-desktop-codex | **iPhone → PC files (Tailscale route):** share the folder in Windows (Properties > Sharing), then on iPhone use Files → Connect to Server `smb://<host>`. Apple Files supports SMB. This reads live files, including uncommitted ones.<br>**ChatGPT route:** the iOS "workspace file browser" (1.2026.160) shows project folders.<br>**PC side:** all work runs on the PC.<br>**Caveat:** not tested hands-on; a cellular SMB hang (#18967) is avoided by using the hostname. | https://tailscale.com/docs/use-cases/personal-or-at-home-use/access-nas-media-file-servers · https://support.microsoft.com/en-us/windows/experience/connectivity-networking/file-sharing-over-a-network-in-windows · https://support.apple.com/en-us/118392 · https://learn.chatgpt.com/docs/changelog · https://github.com/tailscale/tailscale/issues/18967 | 2026-05-18 · undated · undated · 2026-06-15 · open |
| A6 | PASS (workaround), both directions | claude and codex CLIs | **A6a, Claude→Codex:** `codex exec` "reuses saved CLI authentication by default"; the Windows app "uses the same Codex home directory as native Codex on Windows".<br>**A6a, Codex→Claude:** `claude -p` on the user's `/login`. "You can still use … `claude -p` … with your subscription limits."<br>**A6b, Codex:** rollouts under `$CODEX_HOME/sessions`, compressed after 7 days, never deleted; `codex exec resume <id>`.<br>**A6b, Claude:** "Full conversation transcript: every message, tool call, and tool result". Default retention is 30 days, so raise `cleanupPeriodDays`. | https://learn.chatgpt.com/docs/non-interactive-mode · https://learn.chatgpt.com/docs/windows/windows-app · https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan · https://github.com/openai/codex/blob/89461ea6833832b0551ce24ee32205824d5c108d/codex-rs/rollout/src/lib.rs#L86-L95 · https://code.claude.com/docs/en/claude-directory | undated · undated · 2026-10-07 · 2026-10-19 · undated |
| A7 | PASS (workaround) | both | **Shared `C:\` paths.** `codex exec -C <dir> --add-dir <path>` grants a handover folder across Codex's per-command sandbox. Results come back as files (`-o`), branches or paths.<br>**Codex→Claude:** runs after approval ("asks for approval to … run commands that require network access"). | https://learn.chatgpt.com/docs/developer-commands?surface=cli · https://learn.chatgpt.com/docs/agent-approvals-security | undated |
| A8 | PASS (workaround), both directions | both | **Claude→Codex:**<br>- create `codex exec --json`;<br>- monitor via the JSONL stream or rollout;<br>- resume `codex exec resume <SESSION_ID>`.<br>**Codex→Claude:**<br>- create `claude -p … --output-format stream-json`;<br>- monitor via stream or transcript;<br>- resume `claude -p --resume <id>`.<br>Alternatively `claude --bg` + `claude agents --json` + `claude --resume <id> --bg`. | https://learn.chatgpt.com/docs/non-interactive-mode · https://code.claude.com/docs/en/headless · https://code.claude.com/docs/en/agent-view | undated |
| C1 | PASS | all | **Native Windows:** Desktop's Code tab (Local/WSL/SSH/Cloud); ChatGPT app via Store or winget (Windows 10 19041+); Tailscale Windows client with "Run unattended".<br>**iOS:** universal apps.<br>**Uptime:** apps must stay running; Remote Control server mode exits after about 10 minutes offline, so supervise it. | https://code.claude.com/docs/en/desktop · https://learn.chatgpt.com/docs/windows/windows-app · https://tailscale.com/docs/how-to/run-unattended | undated |

### NEVER gates

| Component | N1 (stars) | N2 (maintainers) | N3 (active) | Sources |
|---|---|---|---|---|
| claude-desktop | N/A, closed source | PASS: Anthropic, 12 or more staff authors on the product repo since 2026-04-22 | PASS: Claude Code 2.1.303 (2026-10-18), Desktop 2.42304.2 (2026-10-19), iOS app (2026-10-17). Dispatch is excluded: "isn't available to new users" (2026-10-15). | https://github.com/anthropics/claude-code/commits/ef7bfdca55d906929fe6b782025b93758c325074 · https://code.claude.com/docs/en/changelog · https://downloads.claude.ai/releases/win32/x64/RELEASES · https://support.claude.com/en/articles/13947068-assign-tasks-from-anywhere-in-claude-cowork |
| chatgpt-desktop-codex | N/A, closed source | PASS: OpenAI, at least 2 staff fixing Windows-app issues | PASS: Codex app 26.1007 (2026-10-08), Store update 2026-10-17, ChatGPT iOS 1.2026.279 (2026-10-16) | https://github.com/openai/codex/issues/41290 · https://github.com/openai/codex/issues/49731 · https://learn.chatgpt.com/docs/changelog · https://apps.apple.com/us/app/chatgpt/id6448311069 |
| Tailscale | PASS: 37.7k★ | PASS: three humans author, merge and publish | PASS: v1.104.1 (2026-10-07) | https://github.com/tailscale/tailscale · https://github.com/tailscale/tailscale/releases/tag/v1.104.1 |

### FAVOUR (stack rules, brief 7.17)

| Item | Points | Component | Source |
|---|---|---|---|
| F1 official binary, own login | 2 | Both first-party; no token side reads | https://code.claude.com/docs/en/authentication · https://learn.chatgpt.com/docs/windows/windows-app |
| F2 stars | 2 | Tailscale is the only core open-source component (37.7k★) | https://github.com/tailscale/tailscale |
| F3 native iOS app | 2 | Claude app; ChatGPT app | https://apps.apple.com/us/app/claude-by-anthropic/id6473753684 · https://apps.apple.com/us/app/chatgpt/id6448311069 |
| F4 iPad | 2 | Universal Claude app with iPad screenshots; ChatGPT iPad split view (2026-09-23) | https://code.claude.com/docs/en/mobile · https://learn.chatgpt.com/docs/changelog |
| F5 native session interaction | 2 | `claude --desktop --resume`; "continue that same chat" across devices | https://code.claude.com/docs/en/desktop · https://learn.chatgpt.com/docs/remote-connections |
| F6 localhost | 2 | Tailscale Serve on a Windows dev server | https://tailscale.com/docs/features/tailscale-serve |
| F7 file opening | 2 | Tailscale SMB + iOS Files | https://tailscale.com/docs/use-cases/personal-or-at-home-use/access-nas-media-file-servers |
| F8 file transfer | 2 | Copy or move both ways through iOS Files and the SMB share | https://support.apple.com/guide/iphone/transfer-files-iphone-a-storage-device-iphe9aff429a/ios |
| F9 Docker | 0 | None in core (see the S3+D variant) | — |
| F10 sessions in desktop apps | 1 | Best single component (7.17). Together the apps cover both vendors' app-launched sessions. `codex exec` listing is UNKNOWN. | https://code.claude.com/docs/en/desktop · https://github.com/openai/codex/issues/21079 |
| **F1–F10** | **17/20** | | |
| F11a–e | 1+1+1+1+1 = **5/10** | **Claude side:** `claude --cloud`/`--bg` children are first-class, but not linked to the parent.<br>**Codex side:** subagent threads are first-class; cross-harness children are CLI subprocesses. | claude-desktop and chatgpt-desktop-codex F11 rows |

### Setup steps
1. **Installs (Windows-native):**
   - Claude Desktop and the Claude Code CLI; log in with `/login`.
   - The ChatGPT desktop app (Windows-native agent, ChatGPT sign-in) and the Codex CLI natively, sharing `%USERPROFILE%\.codex`.
   - Repos under `C:\…`, each added as a ChatGPT project.
2. **Environment hygiene.** Never set `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, `apiKeyHelper`, `CODEX_API_KEY`, `OPENAI_API_KEY` or `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`. Never use ChatGPT's "Sign in another way".
3. **Claude Desktop.** Settings → Claude Code → "Connect new sessions to Remote Control".
4. **Remote Control servers.**
   - One server per repo: `claude remote-control --spawn worktree --name <repo>`.
   - Run each from a Task Scheduler logon task in a restart loop.
   - Trust each folder interactively once first.
5. **ChatGPT app.** Settings → Connections → Control this PC → pair the iPhone by QR. Turn keep-awake on and keep the app tray-resident. Set Windows to never sleep.
6. **Claude retention.** Raise `cleanupPeriodDays` in `%USERPROFILE%\.claude\settings.json`.
7. **Delegation conventions.** Write these into `CLAUDE.md` / `AGENTS.md`:
   - Claude delegates with `codex exec --json -C <repo> --sandbox workspace-write [--add-dir <handover>] "<task>"`, never `--ephemeral`.
   - Codex delegates with `claude -p "<task>" --output-format stream-json --verbose` (or `claude --bg --name <n> "<task>"`).
   - Resume with `codex exec resume <id>` / `claude -p --resume <id>`.
8. **Tailscale.**
   - Windows client with Run unattended, plus the iOS app.
   - Share the workspace root over SMB on the Private-profile Tailscale adapter.
   - On iPhone: Files → Connect to Server → `smb://<magicdns-name>`.
   - `tailscale serve --bg <port>` for dev servers.
   - Restrict ACLs to your own devices.
9. **Optional.** agentsview (`require_auth = true`, `result_content_blocked_categories = []`) for full transcripts of delegated runs.

### Risks
- Claude iOS truncates approval commands (#37235). Approve risky commands on the PC, or use permission rules.
- **Phone access depends on running processes.** Remote Control servers and both desktop apps must be running, and the PC must stay awake.
- **Cross-harness children are invisible as sessions.** Agents launch them through the CLI, so they don't appear as linked sessions in either app. Their transcripts survive on disk (A6b).
- **Headless Claude depends on a paused policy change.** Anthropic paused a previously announced change to subscription use of `claude -p` and the SDK (Help Center notes 2026-06-15 and 2026-10-07). If it resumes, Codex→Claude delegation through `claude -p` may change; `claude --bg` is the fallback.

### Strict readings (section 6)
No verdict changes:
- no beta-only capability is used in the core;
- no third-party credential handling;
- no third-party login path.

---

## 3. Stack 2 (S1): Orca + Tailscale, Windows-native

**Components**

| Component | Role |
|---|---|
| Orca (stablyai/orca, MIT) | Orchestrator, desktop app and iOS/iPad app |
| Tailscale | Phone pairing without Orca's relay; F6/F8 |

**Topology**
- **Orca on Windows.** The app runs agents natively on `C:\` repos inside its PTY daemon. It must stay running for the phone.
- **Phone.** Pairs over Tailscale (port 6768), or Orca Relay as a fallback (end-to-end encrypted, needs an Orca account).
- **Transcripts.** In the real `%USERPROFILE%\.claude` and `\.codex`.

Permalink prefix `P` = `https://github.com/stablyai/orca/blob/a0cd1644f320f1327f7495650a816111b495f3cd` (release v1.4.229, 2026-10-17).

### Gate table

All P links date 2026-10-17.

| Gate | Verdict | Clearing | Evidence | Source URL | Date |
|---|---|---|---|---|---|
| A1 | PASS (beta label is a caveat under 7.16a) | Orca | **App.** App Store "Orca IDE" 0.0.57 matches `mobile/app.json` at the release.<br>**(i)** "See every worktree, its agent, and its current status"; "Hydrate recent terminal scrollback".<br>**(ii)** "Send a short reply … when an agent is waiting on input"; Live keystrokes answer TUI menus.<br>**(iii)** "Create a workspace from mobile" with the chosen agent; the "+" menu launches Claude Code or Codex.<br>**Off-LAN** via Relay or Tailscale. | https://apps.apple.com/us/app/orca-ide/id6766130217 · P/mobile/app.json#L5 · P/docs/site/content/docs/mobile.mdx#L19-L25 · P/docs/site/content/docs/mobile.mdx#L31 · P/docs/site/content/docs/mobile.mdx#L42-L45 | App Store retrieved 2026-10-19 |
| A2 | PASS | Orca | Vendor TUI live, mirrored to the phone. Session History "reads each agent's own on-disk session store" with Resume (`claude --resume` / `codex resume`) and Open log. | P/docs/site/content/docs/agents/session-history.mdx#L39 · P/docs/site/content/docs/agents/session-history.mdx#L56 | |
| A3 | PASS + 7.16b policy risk | Orca | **Login:** "Log in once from any terminal. Orca picks up `~/.claude`".<br>**Side reads:** a Claude token Bearer goes to `api.anthropic.com/api/oauth/usage` (UA `claude-code/2.1.0`); the Codex token goes to `chatgpt.com/backend-api/wham/usage` (UA `codex-cli`). They are never used for inference. | P/docs/site/content/docs/agents/claude-code.mdx#L9-L11 · P/src/main/rate-limits/claude-oauth-usage-request.ts#L82-L87 · P/src/main/rate-limits/codex-backend-auth.ts#L66-L89 · https://code.claude.com/docs/en/legal-and-compliance | legal page undated |
| A4 | PASS | Orca | `claude: { detectCmd: 'claude' }`, `codex: { detectCmd: 'codex' }`, written into an interactive node-pty shell. Chat UI (Agent SDK) is off by default (`experimentalNativeChat: false`). | P/src/shared/tui-agent-config.ts#L19-L35 · P/src/main/providers/local-pty-shell-ready-startup-command.ts#L1-L3 · P/src/shared/default-global-settings.ts#L135 | |
| A5 | PASS | Orca (+ Tailscale SMB) | "Browse the workspace's full file tree … jump into any file"; the listing hides only `.git` and `node_modules`. | P/docs/site/content/docs/mobile.mdx#L20 · P/mobile/src/files/file-tree.ts#L40 | |
| A6 | PASS | Orca | **A6a:** `orca worktree create --agent codex\|claude --prompt` runs the bare CLI on its own login. The system-default Codex runs on the real `~/.codex`.<br>**A6b:** Orca keeps transcripts when it retires a worktree. Raise `cleanupPeriodDays`. | P/docs/site/content/docs/cli/reference.mdx#L98 · P/src/main/codex-accounts/runtime-home-service-launch.ts#L64-L70 · P/src/main/worktree-retirement-discovery.ts#L14-L15 · https://code.claude.com/docs/en/claude-directory | claude-directory undated |
| A7 | PASS (workaround); sandbox clause not exercised | Orca | Same or child worktree on a shared filesystem; "Drop files onto an agent terminal to paste their paths". | P/docs/site/content/docs/cli/reference.mdx#L172 · P/docs/site/content/docs/editing/file-explorer.mdx#L9-L12 | |
| A8 | PASS, first-class, both directions | Orca | **Create:** `orca worktree create … --agent codex\|claude --prompt --json`.<br>**Monitor:** `orca terminal read/wait`.<br>**Resume:** `orca terminal send`, or `codex resume` / `claude --resume`. | P/docs/site/content/docs/cli/reference.mdx#L98-L116 · P/docs/site/content/docs/cli/reference.mdx#L165-L171 | |
| C1 | PASS | Orca, Tailscale | `orca-windows-setup.exe` in the release assets; iOS/iPadOS 15.1+. Agent PTYs survive app quit (documented for Cmd-Q; Windows unconfirmed). | https://github.com/stablyai/orca/releases/tag/v1.4.229 · P/docs/site/content/docs/model/session-restore.mdx#L14-L22 | |

### NEVER gates
- **Orca: all PASS.**
  - N1: 96.8k★.
  - N2: four humans each wrote ≥10% of non-bot commits (2026-04-22 → 10-18).
  - N3: v1.4.229 (2026-10-17), about 7,900 non-bot commits in 90 days.
  - Sources: https://github.com/stablyai/orca · https://github.com/stablyai/orca/commits/main
- **Tailscale:** as in Stack 1.

### FAVOUR (7.17)

| Item | Points | Component |
|---|---|---|
| F1 | 1 | Orca (token side reads) |
| F2 | 2 | min(Orca, Tailscale) |
| F3 | 2 | Orca |
| F4 | 2 | Orca: tablet layout, `supportsTablet` |
| F5 | 2 | Orca: native TUI + resume |
| F6 | 2 | Tailscale Serve |
| F7 | 2 | Orca / Tailscale |
| F8 | 2 | Tailscale SMB |
| F9 | 0 | Orca's recipes are experimental; 7.7 bars the points |
| F10 | 1 | Claude half only |
| **F1–F10** | **16/20** | |
| F11a–e | **10/10** | Orca: CLI-spawned children shown as "N children" with a "Child" badge on the phone; Esc/Ctrl-C interrupt; native TUI |

### Setup steps
1. **Installs.** Orca plus both CLIs natively on Windows, with repos on `C:\`. Log in with `/login` and `codex login`.
2. **Environment hygiene.** Keep `ANTHROPIC_API_KEY`, `CLAUDE_CODE_OAUTH_TOKEN`, `CODEX_API_KEY` and `OPENAI_API_KEY` unset.
3. **Experimental features off.** Settings → Experimental: Chat UI off; leave Cloud VM, Runs and the Agent Dashboard off.
4. **Claude retention.** Raise `cleanupPeriodDays`.
5. **Keep Orca running.** Tray on close; PC never sleeps.
6. **Tailscale.** Pair the phone to `<pc-magicdns>:6768`. Optionally add the SMB share and Serve, as in Stack 1.

### Risks
- **Unavoidable token reads (7.16b).**
  - Orca reads both vendors' tokens with spoofed user-agents.
  - The phone can spend Codex reset credits.
  - The docs claim "No API calls, no extra auth".
- **Windows-host bug.** Mobile flicker (#30191).
- **Low watcher count.** 152 watchers against 96.8k stars is unusual, though forks and author counts back the star figure.

### Strict readings
Becomes a NEAREST MISS under any of these:
- 7.16a: "beta" label → A1.
- 7.16b: Claude token read → A3.
- 7.16c: an experimental Agent SDK path is offered → A3.

---

## 4. Stack 3 (S2): T3 Code + Tailscale, server in WSL2

**Components**

| Component | Role |
|---|---|
| T3 Code v0.1.0 (pingdotgg/t3code, MIT) | Orchestrator, iOS/iPad app, web app |
| Tailscale | Direct pairing (avoid T3 Connect's Cloudflare tunnel) |

**Topology**
- **Server in WSL2.** `t3` runs as a systemd user service in WSL2, with the Claude and Codex CLIs logged in there.
- **Keep-alive.** The distro needs a Windows-side keep-alive, because systemd won't keep WSL alive.
- **Transcripts.** In WSL2 `~/.claude` and `~/.codex`.

Permalink prefix `P` = `https://github.com/pingdotgg/t3code/blob/81493efb71e8e8244f95d3e9f71d8369654ab151` (v0.1.0, 2026-10-15).

### Gate table

All P links date 2026-10-15.

| Gate | Verdict | Clearing | Evidence | Source URL | Date |
|---|---|---|---|---|---|
| A1 | PASS | T3 | **App:** v2.0.0 for iPhone and iPad.<br>**(i)** Thread list and live feed.<br>**(ii)** Approval card ("Allow once" / "Allow session" / "Decline") and question card.<br>**(iii)** New task with environment, project, branch and provider (Claude or Codex). | https://apps.apple.com/us/app/t3-code-remote-claude-more/id6787819824 · P/apps/mobile/src/features/threads/PendingApprovalCard.tsx#L23-L25 · P/apps/mobile/src/features/threads/NewTaskContextPickerScreens.tsx#L198-L260 · P/docs/user/remote-access.md#L33-L47 | App 2026-10-16 |
| A2 | PASS (configuration: text generation → Claude) | T3 | "Expand a tool call … to see its full command and output", on web and mobile, including children.<br>T3's own helper runs default to `codex exec --ephemeral`, which leaves no transcript. Switch to Claude so they persist. | P/docs/user/thread-sidebar.md#L225 · P/apps/mobile/src/features/threads/thread-work-log.tsx#L993-L1030 · P/packages/contracts/src/settings.ts#L1279-L1290 · P/apps/server/src/textGeneration/CodexTextGeneration.ts#L300-L310 | |
| A3 | PASS + 7.16b policy risk | T3 | **Claude:** the Agent SDK runs the user's installed `claude` ("The SDK always receives the user's Claude executable"). The Help Center allows the SDK on subscription limits.<br>**Codex:** app-server on `codex login`.<br>**Side read:** T3 reads the Claude token from `.credentials.json` and sends it only to `api.anthropic.com` (usage/reset), with UA `claude-cli/<v> (external, cli)`. | P/pnpm-workspace.yaml#L203-L211 · https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan · P/docs/user/providers-codex.md#L22-L25 · P/apps/server/src/provider/claudeResetCredits.ts#L150-L177 | Help Center 2026-10-07 |
| A4 | PASS | T3 | **Claude:** `systemPrompt: {type:"preset", preset:"claude_code", append: …}`, tools preset.<br>**Codex:** unmodified `codex app-server`. | P/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L1184-L1195 · P/apps/server/src/orchestration-v2/Adapters/CodexAdapterV2.ts#L1547-L1553 | |
| A5 | PASS | T3 | The iOS Files screen lists the worktree from the host filesystem live (skipping only `.git`), with code, Markdown, PDF and image previews. | P/apps/server/src/workspace/WorkspaceEntries.ts#L215-L222 · P/docs/user/composer.md#L298-L340 | |
| A6 | PASS | T3 | Children run through the same adapters. Claude transcripts persist (`sessionId` set; SDK `persistSession` defaults to true). Codex threads are not ephemeral. Raise `cleanupPeriodDays`. | P/docs/orchestration-v2/orchestrator-mcp-server.md#L182-L191 · P/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L1122-L1124 · P/apps/server/src/orchestration-v2/Adapters/CodexAdapterV2.ts#L1536-L1553 | |
| A7 | PASS; sandbox clause not exercised | T3 | `delegate_task`: "omitted isolation shares the parent checkout"; a worktree is the alternative. | P/apps/server/src/mcp/toolkits/orchestrator/tools.ts#L66-L72 | |
| A8 | PASS, first-class, both directions | T3 | The MCP gives both harnesses `delegate_task`, `task_status`, `t3_thread_read`, `t3_thread_wait` and `t3_thread_send`. | P/docs/orchestration-v2/orchestrator-mcp-server.md#L193-L428 | |
| C1 | PASS (via WSL2) | T3, Tailscale | Official Linux CLI; `t3 service install` gives a systemd user service with lingering; native Windows app also available. | P/docs/user/background-service.md#L1-L45 · https://github.com/pingdotgg/t3code/releases/tag/v0.1.0 | |

### NEVER gates
- **T3 Code: all PASS.**
  - N1: 28.4k★.
  - N2: Julius Marminge 41.4%, Theo Browne 13.5%.
  - N3: v0.1.0 (2026-10-15).
  - Sources: https://github.com/pingdotgg/t3code · https://github.com/pingdotgg/t3code/commits/main
- **Tailscale:** PASS.

### FAVOUR (7.17)
- F1 1, F2 2, F3 2, F4 2, F5 2, F6 2, F7 2, F8 2, F9 0, F10 0 (WSL2 sessions are invisible to the Windows desktop apps). **F1–F10 = 15/20.**
- **F11a–e = 10/10:** MCP children, lineage view, mobile child threads, message and stop.
- Correction: t3-code.md prints 17/20, but its rows sum to 15.

### Setup steps
1. **In WSL2.** Install `t3`, `claude` and `codex`; log in to both CLIs. Keep the API-key variables unset.
2. **Service.** Run `t3 service install`, and add a Windows-side keep-alive for the distro.
3. **T3 settings.**
   - Text generation → a Claude instance.
   - Never use "Connect with ChatGPT" or profile transfer.
   - Never use T3 Connect.
4. **Claude retention.** Raise `cleanupPeriodDays` in WSL2.
5. **Phone pairing.** Tailscale on Windows, then `t3 serve --tailscale-serve` (or the tailnet IP with mirrored networking). Install App Store T3 2.0.0.

### Risks
- **Claude token read.** It is unavoidable (7.16b), with a spoofed `claude-cli` user-agent. An untested mitigation is to authenticate Claude only via `CLAUDE_CODE_OAUTH_TOKEN`.
- **"Beta" label.**
- **Version lock.** The V2 server needs the V2 app.
- **Serve → WSL2 502** (#9228).
- **Headless Claude policy.** The SDK path depends on Anthropic's paused change.

### Strict readings
Becomes a NEAREST MISS under any of these:
- 7.16a ("Beta").
- 7.16b (Claude token read → A3).
- A defaults-only reading (A2 PARTIAL at defaults).

---

## 5. Stack 4 (S4): Maestro + agentsview + Tailscale, Windows-native

**Components**

| Component | Role |
|---|---|
| Maestro v1.0.0 (RunMaestro/Maestro, AGPL-3.0) | Orchestrator, phone webapp |
| agentsview v0.45.0 (kenn-io/agentsview, MIT) | Full audit trail |
| Tailscale | Phone reach, F6, SMB |

Permalink prefixes:
- `M` = `https://github.com/RunMaestro/Maestro/blob/aa23ffd516bd4a6403b79563834b0432f5cced70` (v1.0.0, 2026-10-09).
- `V` = `https://github.com/kenn-io/agentsview/blob/b9d0a207f51ff27b84adbaae2a91b344247079b3` (v0.45.0, 2026-10-09).

### Gate table

All M and V links date 2026-10-09.

| Gate | Verdict | Clearing | Evidence | Source URL | Date |
|---|---|---|---|---|---|
| A1 | PASS (configuration-scoped, untested recipe) | Maestro | **Phone:** gets "the full Maestro app": list and read, start sessions (agent picker plus directory), message.<br>**Claude prompts:** these can't be answered on the phone. Full Access (default) has "no prompts at all". `--disallowedTools AskUserQuestion` (Claude CLI) removes the stalling question tool, so questions arrive as text.<br>**Cost:** no permission gating. | M/docs/remote-control.md#L16-L24 · M/docs/general-usage.md#L508 · M/src/main/utils/agent-args.ts#L370-L379 · https://code.claude.com/docs/en/cli-reference | CLI ref undated |
| A2 | PASS (with agentsview) | agentsview (+ Maestro cards) | **agentsview:** shows "Tool invocations … showing the tool name, arguments, and output" for every Claude and Codex session. Set `result_content_blocked_categories = []` (default blocks Read/Glob results).<br>**Maestro:** "Show tool calls" is off by default and capped at 4,000 characters.<br>**Persistence:** all sessions persist, because Maestro never passes `--ephemeral` / `--no-session-persistence`. | V/docs/usage.md#L632-L640 · V/internal/config/config.go#L1252 · M/src/renderer/stores/settingsStore.ts#L743 | |
| A3 | PASS + 7.16b note (Codex `auth.json` read for usage; Claude tokens never read) | Maestro | Unmodified CLIs on their own logins. | M/docs/provider-notes.md#L58-L72 | |
| A4 | PASS | Maestro | **Claude:** `--append-system-prompt`.<br>**Codex:** the prompt is prepended to the user turn; base instructions untouched. | M/src/main/ipc/handlers/process/handle-spawn.ts#L440-L500 · M/src/shared/embeddedSystemPrompt.ts#L1-L12 | |
| A5 | PASS | Maestro (+ Tailscale SMB) | "The File Explorer … lets you browse project files", full screen on phones, read live. | M/docs/general-usage.md#L55-L72 | |
| A6 | PASS, first-class | Maestro | "An agent on one provider can consult an agent on another." Native transcripts persist (raise `cleanupPeriodDays`). | M/docs/agent-collaboration.md#L27-L33 · M/docs/general-usage.md#L1087-L1096 | |
| A7 | PASS (workaround); sandbox clause not exercised | Maestro | Shared filesystem; `maestro-cli create-worktree`. | M/docs/cli.md#L673-L700 | |
| A8 | PASS, first-class, both directions | Maestro | **Create:** `create-agent -t codex\|claude-code`, `dispatch --new-tab`.<br>**Monitor:** `session list --json`, `session show`.<br>**Resume:** `dispatch -t <tab>`, `send -s <session>`. | M/docs/cli.md#L89-L145 · M/docs/cli.md#L159-L246 · M/docs/cli.md#L307-L412 | |
| C1 | PASS | all | Native Windows installer and portable exe; agentsview Windows MSI; Safari on the phone. The app must stay running. | https://github.com/RunMaestro/Maestro/releases/tag/v1.0.0 | 2026-10-09 |

### NEVER gates (all PASS)
- **Maestro:** 3.5k★. Pedram Amini wrote 68.5% and Raza Rauf 11.9%, and two other humans merged PRs. v1.0.0 (2026-10-09).
- **agentsview:** 6.2k★. Three humans each wrote over 10%. v0.45.0 (2026-10-09).
- **Tailscale:** PASS.

### FAVOUR (7.17)
- F1 1, F2 0 (Maestro has under 5,000 stars), F3 0 (no App Store app), F4 1, F5 2, F6 2, F7 2, F8 2, F9 0, F10 1. **F1–F10 = 11/20.**
- **F11 = 9/10:** consult and dispatch tabs labelled with the asking agent, and the same tool cards. Phone approvals are the gap.

### Setup steps
1. **Installs.** Maestro, plus Windows-native `claude` and `codex` with their own logins. Keep `ANTHROPIC_API_KEY` unset.
2. **Claude agents.** Add the custom arg `--disallowedTools AskUserQuestion`, and keep Full Access.
3. **Maestro settings.**
   - "Show tool calls in responses" on.
   - Web-UI auto-start with a fixed port.
   - The `maestro-cli.cmd` shim.
   - Raise `cleanupPeriodDays`.
4. **agentsview.** Set `result_content_blocked_categories = []` and `require_auth = true`, behind `tailscale serve`. Keep Codex Cloud import and claude.ai sync off.
5. **Tailscale.** Open Maestro on the phone at `http://<magicdns>:<port>/<token>`. Optionally add SMB and Serve.

### Risks
- **No permission gating.** Every agent runs with all permission checks disabled: Claude `--dangerously-skip-permissions`, Codex `--dangerously-bypass-approvals-and-sandbox`. Agents can also drive Maestro itself.
- **Insecure phone link.** It is plain HTTP plus a token, so keep it tailnet-only.
- **Untested recipe.** The A1 configuration has not been tried live.
- **agentsview Resume API.** It can add `--dangerously-skip-permissions`, so always run agentsview with `require_auth`.

### Strict readings
A defaults-only reading leaves Claude prompts unanswerable on the phone, so the stack becomes a NEAREST MISS (A1).

---

## 6. Decisions made on your behalf

You asked for no questions during the run, so the orchestrator decided these. Full wording is in `brief.md` section 7.

| # | Decision | Strict alternative | Effect of the strict alternative on the shortlist |
|---|---|---|---|
| 1 | "Tailwind" read as **Tailscale**; no agent product by that name exists (7.1). | — | Without Tailscale, every stack loses F6–F8. Stack 1 still clears A5 via ChatGPT's project file browser, if every repo is a ChatGPT project. |
| 2 | "AgentView" screened as both Claude Code agent view and agentsview (7.1). | — | None |
| 3 | "Cross-mode" = between iPhone/iPad and the Windows PC (including WSL2) (7.2). | Local vs cloud, or Windows vs WSL | Would re-centre A5 on cloud visibility. Not applied. |
| 4 | NEVER "single maintainer" also applies to closed-source products, judged by vendor evidence; source-available licences count as open source (7.3). | Closed source exempt; OSI licences only | None of the shortlisted stacks change. |
| 5 | NEVER "deprecated" includes announced sunsets and maintenance-only notices (7.3). | Counts only after shutdown | Vibe Kanban, the Happy CLI and the `@codex` connector would need screening past N3, which was not done. code-server would still fail N2. |
| 6 | **7.16a:** a "beta/preview" label on a generally available build is a caveat, not PARTIAL. | Any beta label → PARTIAL | Orca (#2) and T3 Code (#3) become nearest misses. Stacks 1 and 4 stay. |
| 7 | **7.16b:** reading your OAuth tokens for usage display doesn't change A3 (inference stays native), but caps F1 and carries a policy-risk flag. | Any third-party read of Claude tokens fails A3 | Orca and T3 Code become nearest misses (A3). Stacks 1 and 4 stay. |
| 8 | **7.16c:** gates are judged on the configuration you actually use; avoidable non-compliant paths don't fail a tool. | Offering such a path at all fails; or "defaults only" (a tool must meet the gate without changing a default that affects the gate; switching on a feature you use, such as Remote Control, is fine) | Orca (experimental Agent SDK mode) fails A3. T3 Code's default helper runs leave no transcript (A2), and Maestro's default Claude questions stall on the phone (A1), so a defaults-only reading drops both. Only Stack 1 remains. |
| 9 | **7.16d:** replacing a harness's built-in system prompt = A4 PARTIAL, for Claude and Codex alike. | — | Agor's Codex path is PARTIAL, so Agor can't be the Codex platform (S5 not shortlisted). |
| 10 | A1 requires list/read, message/approve and start for **both** harnesses; generic SSH/web terminals count only if screened (7.4). | — | No iOS or web terminal component passed screening. code-server failed N3/N2; discovery did not propose Blink Shell (last commit 2026-04-14), so it was never screened. |
| 11 | Raising Claude's `cleanupPeriodDays` (default 30 days) is a setup step, not a fail (7.7). | Default retention fails A6b | Every stack would fail A6b. |
| 12 | Your OS built-ins (Windows SMB sharing, iOS Files, WSL2), git and the two CLIs are givens, not components (7.12). | Treat them as components | Stack 1's A5 route would need a separately screened SMB tool. |
| 13 | Stack FAVOUR scoring: F1 = lowest session-launching component; F2 = lowest core open-source component; F3–F11 = best single component (7.17). | Sum or average across components | Stack 1's F10 would rise to 2 under a stack-level reading. |

---

## 7. Also clears, but not shortlisted

**S5: Agor (Claude side, WSL2) + ChatGPT desktop (Codex side, Windows) + Tailscale**
- **Verdict:** CLEARS ALL ALWAYS GATES under the binding reading, but it is configuration-heavy:
  - cross-boundary delegation in both directions: `codex exec` in WSL2 with `CODEX_HOME=/mnt/c/Users/<u>/.codex`, and `wsl.exe … claude -p`;
  - Agor's keep-alive is undocumented;
  - Tailscale Serve → WSL2 has an open 502 issue.
- **Credentials:** Agor stores your Claude setup-token, and its own "Sign in with Claude" must stay off.
- **Scores:** F1–F10 = 13/20. F11 = 5/10 once Agor's Codex launches are excluded: Agor replaces Codex's system prompt, so it can't launch Codex natively.
- **Strict readings:** a nearest miss under 7.16b and 7.16c (A3).
- **Why not shortlisted:** it offers nothing Stack 1 lacks.

## 8. Nearest misses

| Stack / tool | Fails | Detail |
|---|---|---|
| S6 Archon (+ any A5 partner) | A5 | No workspace file browser. In its recommended WSL2 setup, SMB can't publish ext4, Obsidian can't open `\\wsl$` vaults, and GitHub shows committed files only. Windows-native Archon is "basic usage" and unverified. Also: approvals always bypassed; the console has no auth; it offers its own Claude and ChatGPT logins. |
| S7 Gas City (+ partners) | A1, A5 | The dashboard is read-only for running sessions and binds to loopback only. The route into T3's app (`t3bridge`) is undocumented. No screened iOS terminal exists. There is no file browser, and it is WSL2-only. |
| Superset | C1 | No Windows build ("planned with no date"). The Linux desktop app is "experimental and untested". The headless host CLI ships only as Beta/Pre-release. Otherwise strong: iOS app, both harnesses. |
| Docker Sandboxes as the runtime | A3 (Codex) | `sbx`'s own ChatGPT sign-in has no documented OpenAI consent, so Codex can't run inside it. It is usable only to isolate Claude sessions (variant S3+D). |
| Claude Code agent view as the hub | A1, A5 (Codex side) | Claude-only. The app can't dispatch new sessions. |
| Claude GitHub App as the hub | A1 (ii) | Runs are headless: you can't message or approve mid-run. |
| Warp (client + Remote Control) | A1 | Phone share links can't list or start sessions, and expire about weekly. |

## 9. Screened out

| Candidate | Failing gate | Reason |
|---|---|---|
| Vibe Kanban | N3 | Company shut down 2026-04-10; README "Vibe Kanban is sunsetting." |
| Paseo | N2 | "Maintained by one person, full time". |
| Happy (CLI) | N3 | Maintenance mode since 2026-10-06. |
| Happy Desktop / Agent | N1 | 94 and 32 stars. It also reimplements Codex and replaces Claude's prompt and tools. |
| code-server | N3, N2 | "not generally actively developing … aside from fixing regressions"; one maintainer merges everything. |
| Warp Oz (cloud) | A3 | API keys only. |
| Agent Swarm | N1 | 904 stars. |
| Scion | N2 | One person wrote 98% of commits and made all pushes. |
| Intent | N1 | Open source (Apache-2.0) since 2026-07-22; at most 342 stars. Its Windows/Linux builds are "Alpha". |
| Conductor | C1 | "Conductor always runs on your Mac". |
| Parallel Code | N2 | One person merged every PR and is behind every release. |
| Codex GitHub connector (`@codex`) | N3 | "Codex Cloud (Legacy) … We plan to deprecate this experience." |

## 10. Open questions for you (answers would change the pick)

1. **Token reads.** Are you comfortable with a tool reading your Claude/ChatGPT login tokens to show usage, presenting itself as the official apps? If yes, Orca or T3 Code are the stronger orchestrators. If no, pick Stack 1.
2. **Repo location.** Can your repos live on `C:\`, or must they stay in WSL2 ext4? Stacks 1, 2 and 4 assume `C:\` (phone file access via SMB, reliable phone remotes). WSL2-only work points to T3 Code.
3. **Permission prompts.** Do you want to approve risky commands (permission prompts), or is "agents never ask" acceptable? Maestro (and Archon) need the latter.
4. **Plans.** Which plans do you have? Remote Control needs Claude Pro/Max (or admin-enabled Team/Enterprise). ChatGPT mobile remote control needs Plus, Pro, Business or Enterprise.
5. **Windows version.** Windows 10 or 11? Docker Sandboxes and WSL mirrored networking need Windows 11.
6. **Cloud sessions.** Do you want cloud sessions (Claude cloud, Codex cloud) in the daily flow? They are excluded from the core stacks: Codex cloud's tool-call fidelity is unverified, it has a "Legacy" deprecation notice, and cloud work reaches the PC only as branches.
7. **Relays.** Is a vendor relay acceptable (Orca Relay, T3 Connect via Cloudflare), or Tailscale-only? Stacks 2 and 3 assume Tailscale-only.
8. **Beta labels.** Are "beta"-labelled tools acceptable for daily work (Orca's mobile companion, T3 Code)? If not, see decision 6.
