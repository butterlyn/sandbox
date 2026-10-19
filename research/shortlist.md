# Shortlist: agent orchestration setup for iPhone/iPad + an always-on Windows PC (WSL2)

Prepared 2026-10-19 and updated the same day after your new directions.

- **Inputs:** 34 candidates were screened (35 products, counting the two iPhone terminal apps separately). 22 of them were deep-dived, then combined into stacks.
- **Verification:** an independent verifier re-checked the first version's 90 claims against primary sources. It overturned no gate verdict and found one overclaim, now corrected (section 18 and `research/verification.md`).
- **Not yet verified:** the stacks added in this update (4a, 4b, 5, 6, 7 and 8) have not been through that verification.
- **Where things are:**
  - the rules (gate IDs N1–N3, A1–A8, C1, F1–F11, and what each verdict means): `research/brief.md`;
  - working detail: `research/stacks.md`;
  - per-candidate evidence: `research/<slug>.md`.

---

## 1. Recommendations (read this first)

### In one minute
- **Safest pick, unchanged: #1, the vendors' own apps.**
  - The Claude app runs Claude Code on your PC, the ChatGPT app runs Codex, and Tailscale shows your PC's folders in iOS Files.
  - No third-party tool touches your logins. It is still the only setup that passes under every strict reading we tested.
  - Weak spot: Claude and Codex hand work to each other through command-line calls, so hand-offs are the least visible of any stack.
- **Most capable: #2 Orca or #3 T3 Code.** One phone app for both agents, a file browser, and proper hand-offs between agents. The catch: both read your login tokens to show usage.
- **New and simplest: #4a, Termius + tmux.**
  - Termius is an SSH app on your iPhone, made by a company of about 35 people. It opens the real Claude Code and Codex terminals running in WSL2, which tmux keeps alive, and it browses your project files.
  - Nothing reads your tokens, and permission prompts work exactly as at the PC.
  - The catches:
    - no phone notifications;
    - WSL must be kept awake, which is documented but untested;
    - tmux passes the "not one maintainer" rule only on a generous count.
- **Superset (#6) works on your WSL2 assumption.** It needs Superset Pro ($20/month), iOS 26, and its own relay, which has no end-to-end encryption that we could find. Its phone app shows only changed files, so Termius covers file browsing.
- **The rest also pass, but rank lower:**
  - #4b, an agent-aware twin of #4a (cmux-tui);
  - #5 Archon;
  - #7 AWS's CAO;
  - #8 Gas City;
  - #9 Maestro.

### What changed in this update
1. **Your directions applied.** Superset is assumed to run in WSL2 (brief 7.18). New candidates were screened: Bernstein, cmux, AWS's CLI Agent Orchestrator (CAO), two projects both called wmux, tmux, and two iPhone terminal apps (Termius, Blink Shell).
2. **Termius passed screening.** That made phone-terminal stacks possible, and it filled the file-access gap that had blocked Archon and Gas City.
3. **Six more stacks now pass every must-have:** Termius + tmux (#4a), Termius + cmux-tui (#4b), Archon (#5), Superset (#6), CAO (#7) and Gas City (#8). Maestro drops from #4 to #9.
4. **The top three are unchanged.** The first-party pair is still #1, and still the only stack that survives every strict reading tested.
5. **Failed screening:**
   - Blink Shell: one maintainer;
   - both wmux projects: under 1,000 GitHub stars;
   - cmux's Mac app: macOS only.

   cmux's Linux terminal part, cmux-tui, was admitted on its own (decision 17).
6. **Bernstein can't be the hub:** its Claude sessions keep no transcript. As a Codex-only helper next to stack #1 it passes, but adds little, so it is not shortlisted (section 14).
7. **New risks flagged:**
   - tmux's second maintainer counts only through merge commits. A strict count removes stacks 4a, 7 and 8.
   - Keeping WSL awake is untested.
   - Termius logs terminal text by default on its Pro plan.
   - CAO changes a Claude setting that affects all your Claude sessions.
   - Most orchestrators switch approvals off by default.
8. **Verification follow-ups folded in.** Items R4, R5, R6, R8 and R9 from `verification.md` are now applied.
9. **One fact checked at the source:** Termius previews remote files over SFTP (its changelog, versions 5.8.0 and 7.3.0).

### Ranking
Stacks are ranked by two things, in this order:
1. Does the stack still clear the gates under every strict alternative tested?
   - The alternatives are the strict versions of decisions 6–9 (brief 7.16), a defaults-only reading, decision 15 (tmux) and decision 17 (cmux-tui). See section 13.
   - Some readings are left out of the test because they separate nothing (see the note under the table).
2. FAVOUR points (F1–F10 plus F11). Ties go to the higher F1–F10.

| # | Stack | Verdict | FAVOUR F1–F10 | FAVOUR F11 | Becomes a nearest miss under (decision #) |
|---|---|---|---|---|---|
| 1 | **First-party pair:** Claude app + ChatGPT app (Codex) + Tailscale, Windows-native | CLEARS ALL ALWAYS GATES | 17/20 | 5/10 | none of them* |
| 2 | **Orca** + Tailscale, Windows-native | CLEARS ALL ALWAYS GATES | 16/20 | 10/10 | beta label (6); token read (7) |
| 3 | **T3 Code** + Tailscale, server in WSL2 | CLEARS ALL ALWAYS GATES (one setting needed) | 15/20 | 10/10 | beta label (6); token read (7); defaults only (8) |
| 4a | **Termius + tmux** + Tailscale, WSL2 (new) | CLEARS ALL ALWAYS GATES | 15/20 | 8/10 | tmux maintainer count (15) |
| 4b | **Termius + cmux-tui** + Tailscale, WSL2 (new; variant of 4a) | CLEARS ALL ALWAYS GATES | 15/20 | 8/10 | cmux-tui admission (17) |
| 5 | **Archon + Termius** + Tailscale, WSL2 (new verdict) | CLEARS (configuration) | 14/20 | 9/10 | offered logins (8) |
| 6 | **Superset + Termius** + Tailscale, WSL2 (new) | CLEARS, on your WSL2 assumption | 14/20 | 8/10 | offered credential path (8); your assumption (14) |
| 7 | **CAO + tmux + Termius** + Tailscale, WSL2 (new) | CLEARS ALL ALWAYS GATES | 13/20 | 8/10 | tmux maintainer count (15) |
| 8 | **Gas City + tmux + Termius** + Tailscale, WSL2 (new verdict) | CLEARS (configuration) | 12/20 | 8/10 | tmux maintainer count (15); offered credential path (8) |
| 9 | **Maestro** + agentsview + Tailscale, Windows-native | CLEARS only with permission prompts switched off | 11/20 | 9/10 | defaults only (8); tool-set change (9) |

**Ranked by FAVOUR total alone:** Orca 26, T3 Code 25, Termius + tmux 23, Termius + cmux-tui 23, Archon 23, first-party pair 22, Superset 22, CAO 21, Gas City 20, Maestro 20.

\*Readings left out of the test, because they separate nothing:
- **Decision 11:** keeping Claude's default 30-day transcript retention fails A6b in every stack, Stack 1 included.
- **Decisions 12 and 16:** treating OS built-ins as components means screening them first. That affects Stack 1's SMB file route, whose A5 would then rest on ChatGPT's project file browser alone, and every SSH route that stacks 4a–8 use. It adds screening work rather than failing one stack.
- **Decision 20:** counting OS settings (WSL idle shutdown, Windows sleep) as defaults breaks every stack's uptime.

The verifier flagged the first version's "every strict reading" wording as an overclaim. This note keeps that correction.

**Two scoring rulings (decisions 18 and 19) move the middle of the table, but not the top three:**
- If tmux scored no F11, stack 4a would drop to 15 + 4 and rank last.
- Under tmux's own, more generous phone reading, applied to every tool, 4a, 4b and 6 would score 9/10.

### How to choose
- **Least risk, simplest to trust:** #1.
- **Best single app on the phone, if you accept token reads:** #2 (repos on `C:\`) or #3 (repos in WSL2; runs as a service).
- **You're comfortable in a terminal, want no third-party orchestrator, and want nothing reading your tokens:** #4a. Choose #4b instead if you want a multiplexer that tracks agents and you accept a young sub-project.
- **You want Superset specifically:** #6, knowing the vendor says WSL isn't supported yet.

### 1. First-party pair (safest)

**Why**
- Every agent runs in the vendors' own apps on the vendors' own logins. No third-party tool touches your Claude or ChatGPT credentials.
- The Claude iOS app controls Claude Code sessions on the PC. The ChatGPT iOS app controls Codex on the PC.
- Tailscale gives the iPhone the PC's live workspace folders in the Files app, plus localhost dev servers in Safari.
- It is the only stack that still passes under every strict reading tested (see the note under the ranking table).

**Weak spots**
- Cross-agent delegation uses command-line calls (`codex exec`, `claude -p` or `claude --bg`), not first-class platform sessions. So F11 is only 5/10.
- The Claude iOS app cuts approval commands and diffs at about 100 characters.
- Each app must stay running (no Windows service mode).
- **Codex→Claude via `claude -p`:**
  - It needs network access, so Codex asks for approval on each call unless you add a rule.
  - Anthropic's docs say `--bare` "will become the default for `-p`", and bare mode "never reads OAuth credentials". When that lands, use `claude --bg` hand-offs instead.
- The SMB-over-Tailscale file route is documented but untested away from home (Tailscale #18967 is open). Termius is an optional second route (add-ons below).

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
2. Set Agent Permissions to **Manual**. By default Orca launches Claude with `--dangerously-skip-permissions` and Codex with `--dangerously-bypass-approvals-and-sandbox` (found in verification).
3. Keep Chat UI (experimental) off and the API-key variables unset.
4. Raise `cleanupPeriodDays`.
5. Pair the phone over Tailscale rather than Orca's relay.

### 3. T3 Code (strong alternative, runs unattended in WSL2)

**Why**
- Similar strengths to Orca: an iPhone/iPad app covering both harnesses, a file browser, and first-class delegation through its MCP (`delegate_task`, `t3_thread_send`).
- It runs as a systemd service in WSL2.

**Risks**
- Same kind of token read as Orca, but for Claude only, with a `claude-cli` user-agent.
- Its own helper runs leave no transcript unless you switch text generation to Claude.
- WSL2 needs a keep-alive (section 5, step W4).
- Sessions don't show up in the Windows desktop apps.
- The product is labelled "Beta".

### 4a. Termius + tmux (new: minimal, no third-party orchestrator)

**Why**
- Termius, an App Store app, connects over Tailscale to WSL2. There it attaches to tmux sessions running the unmodified `claude` and `codex` terminal apps.
- Anything you can do in the terminal at the PC, you can do on the phone: list sessions, read them, type, answer permission prompts, and start a new session in any repo.
- Termius's file browser (SFTP) shows the live project folders, previews files full screen, and moves files both ways.
- No component reads your Claude or ChatGPT login. Termius's free plan includes SSH and SFTP.

**Weak spots**
- No push notification when an agent waits. iOS drops the connection after 20–30 seconds in the background, so you re-attach when you come back.
- WSL must be kept running. There is a documented setting plus a logon task, but it is untested with tmux alone.
- Agents hand work to each other with tmux or `codex exec` / `claude -p` commands. A child is linked to its parent only by a naming convention.
- Codex inside Termius is untested; Termius's docs mention only Claude Code.
- tmux passes the "not one maintainer" rule only because merge commits count (decision 15).

**Setup outline**
1. Claude Code and Codex in WSL2, logged in, with no API-key variables.
2. Keep WSL alive (`instanceIdleTimeout=-1` plus a logon task), and start tmux there.
3. Enable the distro's SSH server and reach it through Tailscale (mirrored networking on Windows 11).
4. Termius with session logging off; one tmux session per agent.

### 4b. Termius + cmux-tui (agent-aware variant of 4a)

**Why**
- The same as 4a, but the session layer knows about agents:
  - it lists them with their state;
  - it keeps Claude's session id for resuming;
  - it gives agents a typed command line to start, watch and message other agents.

**Weak spots**
- cmux-tui is a young part of the cmux project. One author wrote about 94% of it, there has been no release since 2026-09-17, and the cmux website doesn't mention it. It is admitted on a generous reading (decision 17).
- Otherwise the same as 4a: no notifications, and WSL must be kept awake.

### 5. Archon + Termius

**Why**
- A web console for both agents with first-class hand-offs, shown as parent → "↳ child" runs. A popular project (23.7k GitHub stars).
- Termius adds the file browser that Archon lacked.

**Weak spots**
- Agents always run with approvals off, and there is no switch.
- The console has no login unless you add one. Never expose it beyond your tailnet.
- Archon offers its own Claude and ChatGPT logins. Never use them (decision 8).
- Its second maintainer rests on a single release in the window.

### 6. Superset + Termius (on your WSL2 assumption)

**Why**
- A native iPhone/iPad app for both agents: list, stream, type and start.
- First-class hand-offs (`superset agents create/wait/read`).
- A healthy project: 15.3k stars and two main maintainers.

**Weak spots**
- Superset says it doesn't support WSL yet ("not at least for a few months"). This stack rests on your assumption.
- Superset Pro ($20 per user per month) and iOS/iPadOS 26 are required.
- The phone reaches the PC only through Superset's relay, and no end-to-end encryption was found.
- Its default agent commands switch approvals off.
- Don't run its desktop app day to day: it reads your Claude and ChatGPT tokens to show usage.

### 7. CAO + tmux + Termius

**Why**
- AWS Labs' orchestrator. A supervisor agent assigns work to Claude Code or Codex workers and messages them, first-class in both directions.
- Every agent lives in tmux, so Termius can attach to any of them.

**Weak spots**
- Approvals are off by default.
- It writes `skipDangerousModePermissionPrompt: true` into your user-wide Claude settings.
- Its web API has no authentication by default.
- Its memory feature runs background `claude -p` / `codex exec` jobs that use your quota.
- It scores below 4a (fewer stars) and shares tmux's maintainer caveat.

### 8. Gas City + tmux + Termius

**Why**
- The clearest audit view: its dashboard renders every tool call for both agents.
- First-class hand-offs (`gc sling`).

**Weak spots**
- Approvals are off by default.
- It accepts API keys automatically if any are set, so keep them unset.
- The dashboard is read-only for running sessions and stays local; the phone uses Termius.
- A small project (1.4k stars) that depends on tmux.

### 9. Maestro (only if you accept no permission prompts)

**Why**
- Strong first-class delegation through `maestro-cli`, a phone webapp and a file browser.

**Catch**
- To answer everything from the phone, Claude must run with permission checks off, and Codex already runs with approvals and the sandbox bypassed.
- It also needs agentsview for a full audit trail.
- There is no App Store app.

### Optional add-ons (don't change the verdicts)
- **agentsview:** a full transcript viewer for every Claude and Codex session, including delegated runs.
  - Recommended with stack 1, where it lifts F11 to 6/10.
  - Also useful as a structured viewer for the terminal stacks.
  - Run it with `require_auth`.
- **Termius with stacks 1–3:** a second way to see files and a phone terminal for `claude --resume` / `codex resume`.
  - Files: SFTP through Windows OpenSSH to `C:\`, or into WSL2 for T3.
  - It hedges stack 1's SMB route, which is untested away from home.
  - Turn session logging off.
- **Claude Code agent view** (`claude --bg`, `claude agents --json`): better Codex→Claude hand-offs in stack 1.
- **GitHub:** branch hand-over and a transcript archive via hooks.
- **Obsidian Sync:** Markdown, PDF and image viewing plus photo upload. It never syncs `.git`/`.claude`, and it can't show code on iOS.
- **Docker Sandboxes:** isolation for Claude sessions only. Variant S3+D scores 18/20 but adds a credential-handling policy risk and needs Windows 11.
- **Claude GitHub App:** `@claude` runs on a self-hosted runner.
- **Warp:** a PC terminal.
- **Bernstein, routed to Codex only:** see section 14 (not shortlisted).
- **cmux's iPhone app (watch item):** direct SSH to any computer was merged in its source on 2026-09-28 but isn't released. If it reaches the App Store, it could replace Termius for 4b.

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
- **Not in the core.** Claude cloud sessions and Codex cloud tasks.
  - Codex cloud's tool-call fidelity is UNKNOWN.
  - OpenAI plans to deprecate "Codex Cloud (Legacy)" (stated on its Cloud environments page).
  - Cloud output reaches the PC only as a branch, which is A5 PARTIAL.

### Gate table

Dates are source dates; "undated" pages were retrieved 2026-10-19.

| Gate | Verdict | Clearing component | Evidence | Source URL | Date |
|---|---|---|---|---|---|
| A1, Claude half | PASS | claude-desktop | **(i) List and read:** find the session in the Claude app's Code tab; the device "shows the conversation … as it happens".<br>**(ii) Message and approve:** "send messages from your terminal, browser, and phone interchangeably"; permission prompts and `AskUserQuestion` stay open until you answer.<br>**(iii) Start:** sessions start in folders served by `claude remote-control --spawn same-dir\|worktree` (capacity 32), or in the cloud.<br>A native-Windows Remote Control folder is listed in the iOS app (#102650). | https://code.claude.com/docs/en/remote-control · https://code.claude.com/docs/en/cloud-environments · https://github.com/anthropics/claude-code/issues/102650 | undated · undated · 2026-10-16 |
| A1, Codex half | PASS | chatgpt-desktop-codex | **(i)** "Switch between connected hosts and chats", "Review outputs, diffs, test results, terminal output".<br>**(ii)** "Send follow-up instructions, answer questions", "Approve commands".<br>**(iii)** "Start new chats in projects on the host", with a directory picker (1.2026.160).<br>Windows hosts supported; "Codex Remote has reached general availability". | https://learn.chatgpt.com/docs/remote-connections · https://learn.chatgpt.com/docs/mobile · https://learn.chatgpt.com/docs/changelog | undated · undated · 2026-06-15 / 2026-06-25 |
| A2 | PASS | both | **Claude:** Desktop's Verbose view shows "Every tool call, file read, and intermediate step"; the terminal TUI and `claude --resume` show the full transcript.<br>**Codex:** commands and tool calls with output on desktop and phone (collapsed, expandable). The protocol items carry command, cwd, output and exit code.<br>**Codex, cleanest route (verification R9):** `codex resume` opens app chats from the shared `%USERPROFILE%\.codex` in the vendor TUI (`INTERACTIVE_SESSION_SOURCES` includes `Custom("chatgpt")`).<br>**iPhone caveat (Claude):** approval commands and diffs are truncated at about 100 characters (#37235). One surface is enough for A2 (brief 7.5). | https://code.claude.com/docs/en/desktop · https://learn.chatgpt.com/docs/remote-connections · https://github.com/openai/codex/blob/89461ea6833832b0551ce24ee32205824d5c108d/codex-rs/app-server-protocol/src/protocol/v2/item.rs#L293-L329 · https://github.com/openai/codex/blob/89461ea6833832b0551ce24ee32205824d5c108d/codex-rs/rollout/src/lib.rs#L88-L95 · https://github.com/anthropics/claude-code/issues/37235 | undated · undated · 2026-10-19 · 2026-10-19 · 2026-03-21 / 2026-05-20 |
| A3 | PASS | both | **Claude:** Pro/Max plans cover "Claude Code in your terminal with one unified subscription". Desktop and cloud "use OAuth". Remote Control: "API keys are not supported".<br>**Codex:** "Sign in with ChatGPT for subscription access"; mobile remote control is unavailable with API keys.<br>No third party reads the tokens. | https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan · https://code.claude.com/docs/en/authentication · https://learn.chatgpt.com/docs/auth · https://learn.chatgpt.com/docs/pricing | 2026-10-14 · undated · undated · undated |
| A4 | PASS | both | **Claude:** Desktop "runs its own copy of Claude Code"; Remote Control is the unmodified CLI.<br>**Codex:** "By default, the ChatGPT desktop app uses the Windows-native Codex agent". | https://code.claude.com/docs/en/desktop · https://learn.chatgpt.com/docs/windows/windows-app | undated |
| A5 | PASS | Tailscale (SMB, T-W), plus chatgpt-desktop-codex | **iPhone → PC files (Tailscale route):** share the folder in Windows (Properties > Sharing), then on iPhone use Files → Connect to Server `smb://<host>`. Apple Files connects to file servers. This reads live files, including uncommitted ones.<br>**ChatGPT route:** the iOS "workspace file browser" (1.2026.160) shows project folders.<br>**PC side:** all work runs on the PC.<br>**Caveats:** not tested hands-on. #18967 (open) reports iOS Files over SMB failing on cellular for some users; the reported fixes vary (hostname, DNS override, another SMB app). Termius SFTP is an optional second route. | https://tailscale.com/docs/use-cases/personal-or-at-home-use/access-nas-media-file-servers · https://support.microsoft.com/en-us/windows/experience/connectivity-networking/file-sharing-over-a-network-in-windows · https://support.apple.com/guide/iphone/transfer-files-iphone-a-storage-device-iphe9aff429a/ios · https://learn.chatgpt.com/docs/changelog · https://github.com/tailscale/tailscale/issues/18967 | 2026-05-18 · undated · undated · 2026-06-15 · open |
| A6 | PASS (workaround), both directions | claude and codex CLIs | **A6a, Claude→Codex:** `codex exec` "reuses saved CLI authentication by default"; the Windows app "uses the same Codex home directory as native Codex on Windows".<br>**A6a, Codex→Claude:** `claude -p` on the user's `/login`. "You can still use … `claude -p` … with your subscription limits."<br>**A6b, Codex:** rollouts under `$CODEX_HOME/sessions` are compressed after 7 days (`MIN_ROLLOUT_AGE`) and never deleted; `codex exec resume <id>`.<br>**A6b, Claude:** "Full conversation transcript: every message, tool call, and tool result". Default retention is 30 days, so raise `cleanupPeriodDays`. | https://learn.chatgpt.com/docs/non-interactive-mode · https://learn.chatgpt.com/docs/windows/windows-app · https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan · https://github.com/openai/codex/blob/89461ea6833832b0551ce24ee32205824d5c108d/codex-rs/rollout/src/lib.rs#L86-L95 · https://github.com/openai/codex/blob/89461ea6833832b0551ce24ee32205824d5c108d/codex-rs/rollout/src/compression.rs#L364 · https://code.claude.com/docs/en/claude-directory | undated · undated · 2026-10-07 · 2026-10-19 · 2026-10-19 · undated |
| A7 | PASS (workaround) | both | **Shared `C:\` paths.** `codex exec -C <dir> --add-dir <path>` grants a handover folder across Codex's per-command sandbox. Results come back as files (`-o`), branches or paths.<br>**Codex→Claude:** runs after approval ("asks for approval to … run commands that require network access"). | https://learn.chatgpt.com/docs/developer-commands?surface=cli · https://learn.chatgpt.com/docs/agent-approvals-security | undated |
| A8 | PASS (workaround), both directions | both | **Claude→Codex:**<br>- create `codex exec --json`;<br>- monitor via the JSONL stream or rollout;<br>- resume `codex exec resume <SESSION_ID>`.<br>**Codex→Claude:**<br>- create `claude -p … --output-format stream-json`;<br>- monitor via stream or transcript;<br>- resume `claude -p --resume <id>`.<br>Alternatively `claude --bg` + `claude agents --json` + `claude --resume <id> --bg`. | https://learn.chatgpt.com/docs/non-interactive-mode · https://code.claude.com/docs/en/headless · https://code.claude.com/docs/en/agent-view | undated |
| C1 | PASS | all | **Native Windows:** Desktop's Code tab (Local/WSL/SSH/Cloud); the ChatGPT app via Store or winget; Tailscale's Windows client with "Run unattended".<br>**iOS:** universal apps.<br>**Uptime:** the apps and Remote Control servers need a signed-in Windows session. Remote Control server mode exits after about 10 minutes offline, so supervise it. | https://code.claude.com/docs/en/desktop · https://learn.chatgpt.com/docs/windows/windows-app · https://tailscale.com/docs/how-to/run-unattended | undated · undated · last validated Sep 25, 2026 |

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
| F4 iPad | 2 | The Claude app's App Store listing has iPad screenshots. ChatGPT iOS 1.2026.258: "New iPad split view keeps your task list beside the open task" (2026-09-23). Source corrected per verification R8. | https://apps.apple.com/us/app/claude-by-anthropic/id6473753684 · https://learn.chatgpt.com/docs/changelog |
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
   - Codex asks for approval before each `claude` call, because it needs network access. Approve from the phone or the PC, or add a Codex rule (rules are experimental). Verification R4.
   - Resume with `codex exec resume <id>` / `claude -p --resume <id>`.
8. **Tailscale.**
   - Windows client with Run unattended, plus the iOS app.
   - Share the workspace root over SMB on the Private-profile Tailscale adapter.
   - On iPhone: Files → Connect to Server → `smb://<magicdns-name>`.
   - `tailscale serve --bg <port>` for dev servers.
   - Restrict ACLs to your own devices.
9. **Optional.** agentsview (`require_auth = true`, `result_content_blocked_categories = []`) for full transcripts of delegated runs.
10. **Optional.** Termius with Windows OpenSSH Server (set to Automatic) as a second file route (SFTP to `C:\`). Turn session logging off in Termius.

### Risks
- Claude iOS truncates approval commands (#37235). Approve risky commands on the PC, or use permission rules.
- **Phone access depends on running processes.** Remote Control servers and both desktop apps must be running, and the PC must stay awake.
- **Cross-harness children are invisible as sessions.** Agents launch them through the CLI, so they don't appear as linked sessions in either app. Their transcripts survive on disk (A6b).
- **Headless Claude depends on a paused policy change.** Anthropic paused a previously announced change to subscription use of `claude -p` and the SDK (Help Center notes 2026-06-15 and 2026-10-07). If it resumes, Codex→Claude delegation through `claude -p` may change; `claude --bg` is the fallback.
- **`--bare` becoming the default for `-p`** (Anthropic docs, found in verification). Bare mode "never reads OAuth credentials", so headless `claude -p` would stop using your subscription unless bare is switched off. `claude --bg` hand-offs are the fallback.
- **Codex network approvals** (verification). Each Codex→Claude call needs network access from Codex's sandbox: approve each call, or add a rule.
- **SMB route untested away from home** (verification). Tailscale #18967 is open; use the MagicDNS hostname, or add Termius as a second route.

### Strict readings (section 13)
No verdict changes under the strict alternatives to decisions 6–9 or a defaults-only reading:
- no beta-only capability is used in the core;
- no third-party credential handling;
- no third-party login path;
- no prompt or tool-set change.

This update adds two more checks. Decisions 15 and 17 don't apply either, because the stack uses neither tmux nor cmux-tui.

**Corrected after verification:**
- Under decision 11's strict alternative (default 30-day retention fails A6b), this stack fails A6b, like every other stack.
- Under decision 12's (OS file sharing counted as a component), A5 rests on ChatGPT's project file browser alone, which needs every repo saved as a ChatGPT project.

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
4. **Agent permissions.** Settings → Agent Permissions → **Manual**. The default launches Claude with `--dangerously-skip-permissions` and Codex with `--dangerously-bypass-approvals-and-sandbox` (verification).
5. **Claude retention.** Raise `cleanupPeriodDays`.
6. **Keep Orca running.** Tray on close; PC never sleeps.
7. **Tailscale.** Pair the phone to `<pc-magicdns>:6768`. Optionally add the SMB share and Serve, as in Stack 1.

### Risks
- **Unavoidable token reads (7.16b).**
  - Orca reads both vendors' tokens with spoofed user-agents.
  - The phone can spend Codex reset credits.
  - The docs claim "No API calls, no extra auth".
- **Permissions bypassed by default** (verification). Orca starts Claude with `--dangerously-skip-permissions` and Codex with `--dangerously-bypass-approvals-and-sandbox` unless Agent Permissions is set to Manual.
- **Windows-host bug.** Mobile flicker (#30191).
- **Low watcher count.** 152 watchers against 96.8k stars is unusual, though forks and author counts back the star figure.

### Strict readings
Becomes a NEAREST MISS under either of these:
- 7.16a: "beta" label → A1.
- 7.16b: Claude token read → A3.

**Corrected in this update (verification R6).** The first version also listed 7.16c, saying an experimental Agent SDK path is offered. But Orca's optional Agent SDK mode keeps Claude Code's own `claude_code` prompt preset, which brief 7.6 grades PASS, so it is not a non-compliant path. Decisions 15 and 17 don't apply (no tmux, no cmux-tui).

---

## 4. Stack 3 (S2): T3 Code + Tailscale, server in WSL2

**Components**

| Component | Role |
|---|---|
| T3 Code v0.1.0 (pingdotgg/t3code, MIT) | Orchestrator, iOS/iPad app, web app |
| Tailscale | Direct pairing (avoid T3 Connect's Cloudflare tunnel) |

**Topology**
- **Server in WSL2.** `t3` runs as a systemd user service in WSL2, with the Claude and Codex CLIs logged in there.
- **Keep-alive.** The distro needs a Windows-side keep-alive, because systemd won't keep WSL alive (section 5, step W4).
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
| A5 | PASS | T3 | The iOS Files screen lists the worktree from the host filesystem live (a `readdir` that skips only `.git`), with code, Markdown, PDF and image previews. Permalink corrected to the `list` function per verification R8. | P/apps/server/src/workspace/WorkspaceEntries.ts#L273-L310 · P/docs/user/composer.md#L298-L340 | |
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
- F1 1, F2 2, F3 2, F4 2, F5 2, F6 2, F7 2, F8 2, F9 0.
- F10 0: WSL2 sessions are invisible to the Windows desktop apps.
- **F1–F10 = 15/20.**
- **F11a–e = 10/10:** MCP children, lineage view, mobile child threads, message and stop.
- Correction: t3-code.md prints 17/20, but its rows sum to 15.

### Setup steps
1. **In WSL2.** Install `t3`, `claude` and `codex`; log in to both CLIs. Keep the API-key variables unset.
2. **Service.** Run `t3 service install`, and add a Windows-side keep-alive for the distro (section 5, step W4).
3. **T3 settings.**
   - Text generation → a Claude instance.
   - "Connect with ChatGPT" is optional: OpenAI lists T3 Code as an open-source "Sign in with ChatGPT" integration (verification).
   - Avoid profile transfer.
   - Never use T3 Connect.
4. **Claude retention.** Raise `cleanupPeriodDays` in WSL2.
5. **Phone pairing.** Tailscale on Windows, then `t3 serve --tailscale-serve` (or the tailnet IP with mirrored networking). Install App Store T3 2.0.0.

### Risks
- **Claude token read.** It is unavoidable (7.16b), with a spoofed `claude-cli` user-agent. An untested mitigation is to authenticate Claude only via `CLAUDE_CODE_OAUTH_TOKEN`.
- **"Beta" label.**
- **Version lock.** The V2 server needs the V2 app.
- **Serve → WSL2 502** (#9228).
- **Headless Claude policy.** The SDK path depends on Anthropic's paused change.
- **Evidence note** (verification). The first version's A5 permalink (`WorkspaceEntries.ts#L215-L222`) pointed at the wrong function. It is corrected above; the verifier had confirmed the claim from other source.

### Strict readings
Becomes a NEAREST MISS under any of these:
- 7.16a ("Beta").
- 7.16b (Claude token read → A3).
- A defaults-only reading (A2 PARTIAL at defaults).

Other strict readings:
- 7.16d strict (verification R5): T3's helper runs use `--tools ""` or a read-only subset, which would turn that helper path PARTIAL. Its agent sessions are unaffected.
- Decisions 15 and 17: no change.

---

## 5. Common setup for the WSL2 stacks (4a, 4b, 5, 6, 7, 8)

These numbered steps are referenced by stacks 4a–8. Stack 3 (T3 Code) uses W1–W4 and W6.

| Step | What to do | Source URL | Date |
|---|---|---|---|
| W1 | Inside a WSL2 distro, install `claude` and `codex` and log in with `/login` and `codex login` (ChatGPT). Keep repos on the ext4 filesystem. | https://code.claude.com/docs/en/authentication · https://learn.chatgpt.com/docs/auth | undated, retrieved 2026-10-19 |
| W2 | **Environment hygiene.**<ul><li>Never set `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, `apiKeyHelper`, `CODEX_API_KEY`, `OPENAI_API_KEY` or `OPENAI_BASE_URL` in shell files, systemd units or scheduled tasks.</li><li>tmux "copies the environment into the global environment" when its server starts. Clean up with `tmux set-environment -g -u <VAR>`.</li></ul> | https://github.com/tmux/tmux/blob/7f2a35ad3321f9ba57a1062ca73b1f3ff26aca53/tmux.1#L7861-L7870 · https://code.claude.com/docs/en/authentication | 2026-10-08 · undated |
| W3 | Raise `cleanupPeriodDays` in WSL2 `~/.claude/settings.json` (default 30 days). | https://code.claude.com/docs/en/claude-directory | undated |
| W4 | **Keep WSL alive.**<ul><li>In `%UserProfile%\.wslconfig`, set `[general] instanceIdleTimeout=-1` ("Set to -1 to disable auto shutdown"). Optionally set `[wsl2] vmIdleTimeout` (Windows 11 only).</li><li>Add a Task Scheduler "At log on" task running `wsl.exe -d <distro> --exec <start command>`.</li><li>Windows never sleeps.</li><li>Sign in after each reboot: starting WSL without a sign-in is undocumented.</li><li>Check with `wsl --list --running`.</li></ul>Untested with only a detached tmux server (WSL#9968). Microsoft: "systemd services will NOT keep your WSL instance alive". | https://learn.microsoft.com/en-us/windows/wsl/wsl-config · https://learn.microsoft.com/en-us/windows/wsl/basic-commands · https://github.com/microsoft/WSL/issues/9968 · https://github.com/microsoft/WSL/discussions/14261 · https://learn.microsoft.com/en-us/windows/wsl/systemd | ms.date 2026-10-16 · updated 2026-06-02 · open, last comment 2026-07-04 · 2026-02-24 · updated 2026-06-02 |
| W5 | **SSH into WSL2.** Use the distro's own `openssh-server` (a given, brief 7.20), with key-only auth. Reach it in one of two ways:<ul><li>mirrored networking (`[wsl2] networkingMode=mirrored`, Windows 11 22H2+), plus a Hyper-V firewall inbound rule ("Connect to WSL directly from your local area network");</li><li>a `netsh interface portproxy` rule (Windows 10).</li></ul>Use a port other than 22 if Windows OpenSSH Server also runs. | https://learn.microsoft.com/en-us/windows/wsl/networking | updated 2026-06-02 |
| W6 | **Tailscale.**<ul><li>Install it on the Windows host only, with Run unattended, and on the phone.</li><li>Restrict ACLs to your own devices, and never use Funnel.</li><li>Mirrored mode lets tailnet devices reach a WSL2 service at the Windows tailnet IP (#14790).</li><li>Serve to WSL2 has an open 502 issue (#9228).</li></ul> | https://tailscale.com/docs/how-to/run-unattended · https://github.com/tailscale/tailscale/issues/14790 · https://github.com/tailscale/tailscale/issues/9228 | last validated Sep 25, 2026 · opened 2025-01-26 · opened 2023-09-04, last comment 2025-08-29 |
| W7 | **Termius.**<ul><li>Host: the PC's MagicDNS name and the sshd port, with key auth.</li><li>Settings → Logs: turn session logging off for that vault. Logging is a Pro feature, "enabled by default for all vaults", and captures "Anything that appears in your terminal as plain text".</li><li>Hide the AI widget; its data flow is undocumented.</li><li>Optionally turn "Sync keys and identities" off.</li><li>Never type vendor logins through Termius while logging is on.</li></ul> | https://docs.termius.com/organize-and-connect-to-hosts/session-logs · https://docs.termius.com/help-center/faq/how-can-i-hide-the-ai-widget · https://docs.termius.com/keychain/sync-of-keys-and-passwords | undated, retrieved 2026-10-19 |
| W8 | **Files and dev servers.**<ul><li>Files: a Termius SFTP tab on the same host. Turn on "Show Hidden Files" when you need dot-folders.</li><li>Dev servers: `tailscale serve --bg <port>`, or the tailnet IP with mirrored networking.</li></ul> | https://docs.termius.com/organize-and-connect-to-hosts/managing-files-with-sftp · https://tailscale.com/docs/features/tailscale-serve | undated · last validated Jan 20, 2026 |

---

## 6. Stack 4a (S8): Termius + tmux + Tailscale, WSL2 (new)

**Components**

| Component | Role |
|---|---|
| Termius 8.0.3 (Termius Corporation, closed source) | iPhone/iPad client: SSH into WSL2 and attach to tmux (A1 under brief 7.4); SFTP for files (A5, F7, F8) |
| tmux (tmux/tmux, ISC; 3.8 upstream, 3.4+ in Ubuntu) | Session layer in WSL2. It keeps the native `claude` and `codex` terminal apps running and attachable, and agents start, watch and continue other agents through it. |
| Tailscale | Network path from the phone to WSL2; dev servers (F6) |

Givens (no screening needed, brief 7.12 and 7.20): WSL2, the distro's `openssh-server`, the `claude` and `codex` CLIs, git.

**Topology**
- Section 5, steps W1–W8.
- One tmux session per agent, started with `tmux new -A -s <name> -c <repo> claude` (or `codex`).
- Transcripts stay in WSL2 `~/.claude/projects` and `~/.codex/sessions`.

Permalink prefix `X` = `https://github.com/tmux/tmux/blob/7f2a35ad3321f9ba57a1062ca73b1f3ff26aca53` (tag 3.8, 2026-10-08).

### Gate table

| Gate | Verdict | Clearing | Evidence | Source URL | Date |
|---|---|---|---|---|---|
| A1 | PASS (brief 7.4 generic terminal; configuration: W4 keep-alive) | Termius + tmux | **7.4 conditions:**<ul><li>Termius is a screened component: N1 N/A, N2 and N3 PASS (below).</li><li>tmux sessions "continue running in the background, then later reattached", and `destroy-unattached` is off by default.</li><li>W4 keeps the distro running.</li></ul>**(i)** `tmux ls` ("List all sessions managed by the server") and `tmux attach` show the live TUI; `claude --resume` / `codex resume` reopen recent sessions.<br>**(ii)** Type into the TUI. Termius's extra keys include "Ctrl, Esc, Tab, and other modifier keys · Arrow keys". Version 6.3.0 "Added Shift+Tab … enabling actions for Claude Code and other AI tools".<br>**(iii)** `tmux new -A -s <name> -c <repo> claude` or `codex`.<br>**Caveats:** Codex in Termius is untested; no notification when an agent waits. | X/tmux.1#L40-L80 · X/options-table.c#L813-L817 · X/tmux.1#L1282-L1291 · X/tmux.1#L1322-L1345 · https://docs.termius.com/terminal/mobile-terminal · https://docs.termius.com/changelog/ios · https://learn.microsoft.com/en-us/windows/wsl/wsl-config | 2026-10-08 · 2026-10-08 · 2026-10-08 · 2026-10-08 · undated · 6.3.0 2025-08-25 · ms.date 2026-10-16 |
| A2 | PASS | tmux (vendor terminal apps) | Every session tmux starts is the unmodified TUI.<br>**Claude:** `Ctrl+O` "Toggle transcript viewer": "Shows detailed tool usage and execution".<br>**Codex:** "inspect commands and diffs as they appear".<br>**After the run:** `claude --resume` and `codex resume` reopen the full native transcript.<br>tmux's own scrollback (2,000 lines, in memory) is not relied on. | https://code.claude.com/docs/en/interactive-mode · https://learn.chatgpt.com/docs/codex/cli · X/options-table.c#L848-L853 | undated · undated · 2026-10-08 |
| A3 | PASS | the CLIs (tmux and Termius touch no credentials) | **Claude:** "Subscription OAuth credentials from `/login`. This is the default for Claude Pro, Max, Team, and Enterprise users."<br>**Codex:** "Sign in with ChatGPT for subscription access".<br>**tmux** reads no credentials but copies its starting environment (W2).<br>**Termius** carries only keystrokes and screen output; its vault holds SSH credentials. | https://code.claude.com/docs/en/authentication · https://learn.chatgpt.com/docs/auth · X/tmux.1#L7861-L7870 · https://docs.termius.com/keychain/sync-of-keys-and-passwords | undated · undated · 2026-10-08 · undated |
| A4 | PASS | tmux | Runs the given command unmodified: `new-session … [shell-command]`, "the name of and shell command to execute in the initial window". | X/tmux.1#L1322-L1345 | 2026-10-08 |
| A5 | PASS (configuration-scoped: SFTP to the distro's sshd) | Termius | **Phone → PC:**<ul><li>"Mobile lets you open multiple SFTP tabs".</li><li>Remote preview. 5.8.0: "We have added the ability to preview files in SFTP on remote servers". 7.3.0: "Changed the files preview style in SFTP to full screen".</li><li>"Press and hold the file, then choose an app to edit it".</li></ul>SFTP reads the live filesystem, so new and uncommitted files show. Hidden files are off by default; "Show Hidden Files" turns them on.<br>**WSL2 ext4:** SFTP to the distro's own sshd (W5).<br>**PC side:** all work runs on the PC. | https://docs.termius.com/organize-and-connect-to-hosts/managing-files-with-sftp · https://docs.termius.com/changelog/ios · https://learn.microsoft.com/en-us/windows/wsl/networking | undated · 5.8.0 2024-05-20; 7.3.0 2025-12-08 (retrieved 2026-10-19) · updated 2026-06-02 |
| A6 | PASS (workaround), both directions | tmux + the CLIs | **A6a:** a child started with `tmux new-session -d -s <child> -c <dir> codex` (or `claude`), or with `codex exec` / `claude -p` from the agent's shell, is the unmodified CLI on its own login.<br>**A6b:** Claude writes a "Full conversation transcript: every message, tool call, and tool result" (raise `cleanupPeriodDays`). Codex rollouts sit under `$CODEX_HOME/sessions` and are never age-deleted. Retrieve with `claude --resume` / `codex resume`.<br>**Caveat:** Codex's Linux sandbox denies `connect` in its restricted mode, so a Codex→Claude call needs an approval or a Codex rule ("Rules are experimental"). | X/tmux.1#L1322-L1345 · https://code.claude.com/docs/en/claude-directory · https://github.com/openai/codex/blob/89461ea6833832b0551ce24ee32205824d5c108d/codex-rs/rollout/src/lib.rs#L86-L95 · https://github.com/openai/codex/blob/1b89beea82ae60e0dbeacb38f1ad2eae9dfed377/codex-rs/linux-sandbox/src/seccomp.rs#L117-L128 · https://learn.chatgpt.com/docs/agent-configuration/rules | 2026-10-08 · undated · 2026-10-19 · 2026-10-19 · undated |
| A7 | PASS (workaround); sandbox clause not exercised | tmux | Every session shares the WSL2 filesystem. `-c <start-directory>` puts the child in the same repo or worktree, and `codex exec -C <dir> --add-dir <path>` crosses Codex's per-command sandbox. Results come back as files, branches or paths. | X/tmux.1#L1322-L1345 · https://learn.chatgpt.com/docs/developer-commands?surface=cli | 2026-10-08 · undated |
| A8 | PASS (workaround), both directions | tmux + the CLIs | **Create:** `tmux new-session -d -s <child> -c <dir> codex\|claude`.<br>**Monitor:** `capture-pane -p` ("If -p is given, the output goes to stdout"), `list-panes`.<br>**Resume:** `send-keys -t <child> '<text>' Enter`; after exit, `codex resume <id>` / `claude --resume <id>`.<br>**Headless alternative:** `codex exec --json` + `codex exec resume`; `claude -p --output-format stream-json` + `claude -p --resume`.<br>Same Codex approval caveat as A6. | X/tmux.1#L2798-L2818 · X/tmux.1#L4457-L4475 · https://learn.chatgpt.com/docs/non-interactive-mode · https://code.claude.com/docs/en/headless | 2026-10-08 · 2026-10-08 · undated · undated |
| C1 | PASS | all | **Termius:** "Requires iOS 17.0 or later. Compatible with iPhone, iPad, and iPod touch"; a Windows app also exists.<br>**tmux:** official Linux install (`apt install tmux`), via WSL2 (`wsl --install`; Windows 10 2004+ or 11).<br>**Tailscale:** Windows client with Run unattended; iOS app.<br>The PC side runs unattended under W4; the iOS app works in the foreground. | https://apps.apple.com/us/app/termius-terminal-ssh-client/id549039908 · https://github.com/tmux/tmux/wiki/Installing · https://learn.microsoft.com/en-us/windows/wsl/install · https://tailscale.com/docs/how-to/run-unattended | 2026-10-14 · edited 2025-12-22 · updated 2026-06-02 · last validated Sep 25, 2026 |

### NEVER gates

| Component | N1 (stars) | N2 (maintainers) | N3 (active) | Sources |
|---|---|---|---|---|
| Termius | N/A: closed source (github.com/termius holds no app source) | PASS: Termius Corporation; YC lists "Team Size: 35" and two founders | PASS: iOS 8.0.3 on 2026-10-14; seven iOS releases since 2026-08-09 | https://apps.apple.com/us/app/termius-terminal-ssh-client/id549039908 · https://www.ycombinator.com/companies/termius · https://docs.termius.com/changelog/ios · https://github.com/termius |
| tmux | PASS: 49.9k★ | PASS, narrow (decision 15). Nicholas Marriott: 77.8% of 1,357 non-bot commits (2026-04-22 → 10-19), every release, and every PR merge into `master`. Thomas Adam: 19.5%, but 249 of his 265 commits merge the OpenBSD tree (27 with hand-resolved conflicts). | PASS: tag 3.8 on 2026-10-08; 524 non-bot commits since 2026-07-21 | https://github.com/tmux/tmux · https://github.com/tmux/tmux/commits/master · https://github.com/tmux/tmux/releases/tag/3.8 |
| Tailscale | as Stack 1 | | | |

### FAVOUR (stack rules, brief 7.17)

| Item | Points | Component | Source |
|---|---|---|---|
| F1 official binary, own login | 2 | tmux, the only session-launching component, runs the unmodified CLIs; nothing reads tokens | X/tmux.1#L1322-L1345 |
| F2 stars | 2 | min(tmux 49.9k, Tailscale 37.7k). Termius is closed source, so N/A. | https://github.com/tmux/tmux · https://github.com/tailscale/tailscale |
| F3 native iOS app | 2 | Termius (App Store) | https://apps.apple.com/us/app/termius-terminal-ssh-client/id549039908 |
| F4 iPad | 2 | Termius 6.0.0: "iPad: A new Desktop-like layout with tabs at the top"; split view; hardware-keyboard keys | https://docs.termius.com/changelog/ios (2025-02-21) |
| F5 native session interaction | 2 | Attaching to the TUI's tmux pane (brief 7.10's own example), from the PC or the phone | X/tmux.1#L1089-L1100 |
| F6 localhost | 1 | **Tailscale into WSL2:** Serve has an open 502 issue (#9228); mirrored networking plus the tailnet IP was reported working (#14790).<br>**Termius** port forwarding works only in the foreground. | https://github.com/tailscale/tailscale/issues/9228 · https://github.com/tailscale/tailscale/issues/14790 · https://docs.termius.com/help-center/faq/how-can-i-keep-termius-sessions-alive-in-the-background-on-ios-ipados |
| F7 file opening | 2 | Termius SFTP preview, or open in another app | https://docs.termius.com/changelog/ios |
| F8 file transfer | 2 | **Phone → PC:** "Tap the Upload button"; drag from Files; 7.8.0 paste or share-sheet upload.<br>**PC → phone:** downloads land in Termius > Downloads. | https://docs.termius.com/organize-and-connect-to-hosts/managing-files-with-sftp · https://docs.termius.com/changelog/ios (7.8.0, 2026-09-14) |
| F9 Docker | 0 | none | — |
| F10 sessions in desktop apps | 0 | WSL2 sessions: Claude Desktop's `/resume` works in "local sessions, not in SSH, WSL, or cloud sessions" | https://code.claude.com/docs/en/desktop |
| **F1–F10** | **15/20** | | |
| F11a–e | 2+1+2+2+1 = **8/10** | tmux:<ul><li>(a) agents start children with `new-session -d`;</li><li>(b) children are listed by `tmux ls`, but linked to a parent only by a naming or `@parent` convention;</li><li>(c) children are the same TUI;</li><li>(d) attach, type, `send-keys C-c`;</li><li>(e) all of it works from the phone through Termius, but (b) is partial everywhere (decision 19).</li></ul> | X/tmux.1#L4629-L4640 · X/tmux.1#L4457-L4475 |

### Setup steps
1. Section 5, steps W1–W8.
2. **Approvals.** Keep the CLIs' default approval modes: no `--dangerously-skip-permissions` and no `--dangerously-bypass-approvals-and-sandbox`. Permission prompts then appear in the TUI, and you answer them from Termius.
3. **Codex→Claude delegation.** Each call needs Codex's approval (from the phone or the PC), or a Codex rule that allows `tmux` / `claude` (rules are experimental).
4. **Delegation conventions** (in CLAUDE.md / AGENTS.md). Either:
   - start children with `tmux new-session -d -s <parent>-<child> -c <dir> codex|claude`, and tag them with `tmux set-option -t <child> @parent <parent>`;
   - or run them headless with `codex exec --json` (never `--ephemeral`) or `claude -p`.
5. **Daily use on the phone:**
   - `tmux ls`, then `tmux attach -t <name>`;
   - start new agents with `tmux new -A -s <name> -c <repo> claude|codex`;
   - files in the SFTP tab.

### Risks
- **tmux's second maintainer counts only through merge commits** (decision 15). Under the strict count, tmux is screened out and this stack loses its session layer. Stack 4b is the drop-in replacement.
- **The keep-alive is untested.** `instanceIdleTimeout=-1` is documented, but nobody has documented it holding a distro whose only activity is a detached tmux server (WSL#9968). Starting WSL after a reboot without signing in is undocumented.
- **No notifications.** Nothing tells your phone that an agent is waiting. iOS suspends Termius after 20–30 seconds, so you reconnect and re-attach.
- **Codex in Termius is untested.** Termius's docs name Claude Code, never Codex.
- **Termius privacy defaults:** session logging (Pro) records terminal text unless you turn it off (W7).
- **Windows 10:** no mirrored networking, so W5 needs a portproxy rule.
- **No structured audit view.** The trail is the vendors' own terminal apps and `--resume`; agentsview is an optional viewer.
- **Upside:** hand-offs through interactive TUI children don't use `claude -p`. So they are exposed neither to Anthropic's paused subscription change nor to the future `--bare` default for `-p`.

### Strict readings
- **7.16a–d strict alternatives and defaults-only:** no change. No beta labels, no credential reads, no non-compliant paths, and no prompt or tool changes.
- **Decision 15 strict (tmux N2 FAIL): NEAREST MISS (A1).** No persistent session layer remains; use stack 4b instead.
- **Decision 18 strict:** F11 falls to 4/10 (Termius only).
- **Decisions 11, 12, 16 and 20:** as for every stack. Decisions 12 and 16 would require screening the SSH server first.

---

## 7. Stack 4b (S10): Termius + cmux-tui + Tailscale, WSL2 (new; variant of 4a)

**Components**

| Component | Role |
|---|---|
| Termius | as Stack 4a |
| cmux-tui 0.13.4 (npm `cmux`, MIT; source in manaflow-ai/cmux `cmux-tui/`) | Session layer in WSL2 that knows about agents. It lists them with their state, keeps Claude's session id, and gives agents a command line to start, watch and message other agents. |
| Tailscale | as Stack 4a |

**Topology**
- Section 5, steps W1–W8, with cmux-tui instead of tmux: `npm i -g cmux` in WSL2 (needs Node).
- The W4 logon task runs `cmux server ensure --session agents --socket /home/<user>/.cmux/agents.sock`. Pass the same `--socket` everywhere, because an SSH login may resolve a different default socket directory.
- Agents run with `cmux workspace <name> run --on-exit keep -- claude` (or `codex`).

Permalink prefix `Q` = `https://github.com/manaflow-ai/cmux/blob/42048bddfc8dc622ee13f43886084270ce836524/cmux-tui` (main, 2026-10-19; file dates in the table).

### Gate table

| Gate | Verdict | Clearing | Evidence | Source URL | Date |
|---|---|---|---|---|---|
| A1 | PASS (7.4; configuration: W4 keep-alive, one explicit socket) | Termius + cmux-tui | **Persistence:** a plain `cmux` or `cmux server ensure` "starts (or reuses) a detached headless owner … detaching never ends it". The owner is spawned with `setsid` and null stdio, and `server.detached_owner` defaults to true.<br>**(i)** A sidebar lists workspaces, agents and tabs; `cmux session list` / `cmux agent list`. Attach replays the exact screen, then streams live, and `attach --terminal <id>` shows one TUI full-screen.<br>**(ii)** Typing, Esc/Ctrl keys and approvals in the native TUI.<br>**(iii)** `cmux workspace create --name x`, then `cmux workspace x run -- claude` (or `codex`).<br>Termius side as Stack 4a. | Q/docs/getting-started.md#L54-L66 · Q/crates/cmux-tui/src/local_owner.rs#L319-L357 · Q/docs/configuration.md#L381 · Q/README.md#L48-L53 · Q/spec/cli.md#L278-L380 | 2026-09-16 · 2026-09-28 · 2026-10-10 · 2026-09-27 · 2026-10-01 |
| A2 | PASS | cmux-tui (vendor terminal apps) | Each session is the native TUI in a PTY, and native transcripts stay where the CLIs write them. `agent list` carries Claude's `agent_session_id`, "opaque metadata that a client can pass to the agent's own resume path (for Claude, `claude --resume <id>`)", which "survives a restart".<br>**Caveat:** `run` defaults to `--on-exit close`, which "leaves only the durable exit receipt". Use `--on-exit keep`. The native transcript remains either way. | Q/spec/resource-api-v2.md#L213-L235 · Q/spec/cli.md#L255-L276 | 2026-09-27 · 2026-10-01 |
| A3 | PASS | the CLIs | The `claude` and `codex` shims `exec` the next real binary with hooks only. Non-test code has no reference to `.credentials.json`, `auth.json` or vendor endpoints. Panes inherit the owner's environment (W2). | Q/crates/cmux-tui/src/claude_wrapper.rs#L52-L76 · Q/crates/cmux-tui/src/codex_wrapper.rs#L37-L60 | 2026-09-28 · 2026-10-10 |
| A4 | PASS (hooks appended; brief 7.16d) | cmux-tui | **Claude:** a merged `--settings` with session hook groups and `preferredNotifChannel: notifications_disabled`.<br>**Codex:** `--enable hooks` plus `-c hooks.<event>=[…]` and trust entries.<br>Neither the prompt nor the tool set is replaced. | Q/crates/cmux-tui/src/claude_wrapper.rs#L146-L151 · Q/crates/cmux-tui/src/agent_hook_install.rs#L1997-L2012 | 2026-09-28 · 2026-10-15 |
| A5 | PASS (configuration-scoped) | Termius | As Stack 4a: SFTP to the distro's sshd. cmux-tui itself has no file view. | https://docs.termius.com/organize-and-connect-to-hosts/managing-files-with-sftp · https://docs.termius.com/changelog/ios · Q/README.md#L104-L106 | undated · 2024-05-20, 2025-12-08 · 2026-09-27 |
| A6 | PASS | cmux-tui + the CLIs | **A6a:** the shims run the real CLIs on the user's own logins.<br>**A6b:** transcripts stay in WSL2 `~/.claude/projects` and `~/.codex/sessions` (not redirected), and cmux keeps `agent_session_id`. Raise `cleanupPeriodDays`. | Q/crates/cmux-tui/src/claude_wrapper.rs#L52-L76 · Q/spec/resource-api-v2.md#L213-L235 · https://code.claude.com/docs/en/claude-directory | 2026-09-28 · 2026-09-27 · undated |
| A7 | PASS (workaround); sandbox clause not exercised | cmux-tui | Panes share the WSL2 filesystem. `workspace run` / `pane run` "preserve exact argument arrays after `--`", e.g. `codex exec -C <dir> …`. | Q/spec/cli.md#L255-L276 | 2026-10-01 |
| A8 | PASS, first-class, both directions | cmux-tui | Every pane exports `CMUX_TUI_SOCKET`, so an agent drives the session through cmux's CLI.<br>**Create:** `cmux workspace current run -- codex exec --json …` (or `-- claude …`).<br>**Monitor:** `cmux agent list` (working/waiting/done), `cmux terminal <id> screen read\|wait`, `output read`, `process wait`.<br>**Resume:** `cmux terminal <id> write --text …` then `keys enter`, or `codex resume <id>` / `claude --resume <agent_session_id>`.<br>**Caveat:** whether Codex's sandbox can reach the socket without an approval is UNKNOWN. Expect an approval, as in Stack 4a. | Q/spec/cli.md#L141-L176 · Q/spec/cli.md#L278-L380 · Q/docs/getting-started.md#L119-L139 · Q/spec/resource-api-v2.md#L199-L235 | 2026-10-01 · 2026-10-01 · 2026-09-16 · 2026-09-27 |
| C1 | PASS (via WSL2) | cmux-tui, Termius, Tailscale | npm `cmux` 0.13.4 ships static-musl Linux x64/arm64 binaries ("run on both glibc and musl distributions"), and the docs send Windows users to WSL 2. There is no service unit, so W4 starts the owner. | https://registry.npmjs.org/cmux · Q/dist/RELEASING-TUI.md#L15-L47 · Q/docs/getting-started.md#L56-L62 | 2026-09-17 · 2026-10-05 · 2026-09-16 |

### NEVER gates

| Component | N1 (stars) | N2 (maintainers) | N3 (active) | Sources |
|---|---|---|---|---|
| cmux (the repo holding cmux-tui) | PASS: 28.3k★ | **PASS at repo level:** Austin Wang 39.3%, Lawrence Chen 34.9%, Leo Li 12.4% and Abdulaziz Albahar 10.4% of 17,656 non-bot commits; releases tagged by two humans.<br>**cmux-tui itself:** 93.9% of its 2,824 non-bot commits are by Lawrence Chen (decision 17). | **PASS:** repo release v0.65.2 on 2026-10-16; cmux-tui-v0.13.4 on 2026-09-17. The TUI nightly workflow was removed as "dormant" on 2026-10-05. | https://github.com/manaflow-ai/cmux · https://github.com/manaflow-ai/cmux/commits/main · https://github.com/manaflow-ai/cmux/releases/tag/cmux-tui-v0.13.4 · https://github.com/manaflow-ai/cmux/commit/5fe7ca26481bfa3f2352b1ba21e6313407a28060 |
| Termius, Tailscale | as Stack 4a | | | |

### FAVOUR (7.17)

| Item | Points | Component | Source |
|---|---|---|---|
| F1 | 2 | cmux-tui runs the real CLIs with hooks only | Q/crates/cmux-tui/src/claude_wrapper.rs#L52-L76 |
| F2 | 2 | min(cmux 28.3k, Tailscale 37.7k) | https://github.com/manaflow-ai/cmux |
| F3 | 2 | Termius | https://apps.apple.com/us/app/termius-terminal-ssh-client/id549039908 |
| F4 | 2 | Termius | https://docs.termius.com/changelog/ios |
| F5 | 2 | cmux-tui: native TUIs; `attach --terminal <id>` shows the bare TUI | Q/README.md#L53 |
| F6 | 1 | as Stack 4a | — |
| F7 | 2 | Termius | — |
| F8 | 2 | Termius | — |
| F9 | 0 | cmux-tui's Docker and microVM "create sources" are prototype UX: the picker "never invokes Docker or a cloud API" | Q/docs/machines.md#L19 |
| F10 | 0 | WSL2 sessions | https://code.claude.com/docs/en/desktop |
| **F1–F10** | **15/20** | | |
| F11a–e | 2+1+2+2+1 = **8/10** | cmux-tui:<ul><li>(a) agents start sessions through cmux's CLI;</li><li>(b) agents appear in the sidebar with their state, but no field links a child to its parent;</li><li>(c) the same TUI;</li><li>(d) attach, `write`, `keys ctrl+c`;</li><li>(e) from the phone only through Termius.</li></ul> | Q/spec/cli.md#L255-L380 · Q/docs/configuration.md#L87 · Q/spec/cli.md#L141-L176 |

### Setup steps
1. Section 5, steps W1–W8, with cmux-tui instead of tmux: `npm i -g cmux`, and the owner started by W4 with one explicit `--socket`.
2. Approvals and Codex→Claude: as Stack 4a, steps 2–3.
3. Start agents with `--on-exit keep`.
4. Don't put `~/.local/bin` first on PATH in shell files. That bypasses cmux's shim and loses its hooks (the gates are unaffected).
5. Stop sessions you no longer need: cmux-tui has no idle clean-up.

### Risks
- **A young sub-project.** About 94% of cmux-tui's commits come from one author. There has been no release since 2026-09-17, the nightly build was removed as "dormant", and cmux.com doesn't mention it.
- **Admitted on a generous reading** (decision 17).
- **No boot service and no idle clean-up**; W4 starts it.
- **Claude's own notifications are turned off** by cmux's shim. cmux's replacements appear only inside its TUI.
- **Codex needs an approval** to reach the cmux socket (expected, untested).
- **As Stack 4a:** keep-alive untested, no phone notifications, Codex in Termius untested, Termius's logging default.
- **Watch item:** cmux's own iPhone app gained direct SSH in source on 2026-09-28. It is unreleased, and the app is TestFlight-only so far. If it ships on the App Store, it could replace Termius.

### Strict readings
- **7.16a–d strict alternatives and defaults-only:** no change.
- **Decision 15 (tmux):** unaffected, because this stack doesn't use tmux.
- **Decision 17 strict: NEAREST MISS (A1).** Either reading removes cmux-tui:
  - (a) cmux's C1 failure is taken to cover the whole repo;
  - (b) N2 is judged on cmux-tui's own commits.

---

## 8. Stack 5 (S6): Archon + Termius + Tailscale, WSL2 (new verdict)

In the first version this was a nearest miss (A5): no screened partner could show WSL2 files on the phone. Termius now does.

**Components**

| Component | Role |
|---|---|
| Archon v0.12.1 (coleam00/Archon, MIT) | Orchestrator and web console for both harnesses, with first-class delegation and parent → child lineage |
| Termius | Files (A5, F7, F8) through SFTP; optional phone terminal |
| Tailscale | Phone reach to the console and to SSH/SFTP; F6 |

**Topology**
- Section 5, steps W1–W8.
- Archon's Linux binary and provider plugins run in WSL2. `archon serve` (port 3090) runs as a systemd user unit, kept up by W4.
- The phone opens the console in Safari over the tailnet, with web auth on. Files go through Termius.
- Transcripts are in WSL2 `~/.claude/projects` and `~/.codex/sessions`, plus Archon's own run logs under `~/.archon/workspaces/…/logs`.

Permalink prefixes:
- `R` = `https://github.com/coleam00/Archon/blob/5f2b4841aaca38180c0abbd32bc6345593292019` (tag v0.12.1, 2026-10-17).
- `D` = `R/packages/docs-web/src/content/docs`.

### Gate table

All R and D links date 2026-10-17.

| Gate | Verdict | Clearing | Evidence | Source URL | Date |
|---|---|---|---|---|---|
| A1 | PASS | Archon (web console) | **(i)** "Runs at `/console` shows runs across projects", and run details follow "live events". Tool-call rows expand to the input JSON and the result; results over 2,000 characters are cut.<br>**(ii)** The chat composer messages the project's running chat session. Runs offer "approval, rejection, resume, cancel, and abandon", and paused runs show an answer panel.<br>**(iii)** Register a project, then launch a workflow with per-run model bindings `claude/…` or `codex/…`.<br>**Caveats:** a narrow-screen layout exists, but it hasn't been tested on a device. The console is reached over the tailnet (W5–W6). | D/adapters/web.md#L40-L101 · R/packages/web/src/experiments/console/ConsoleApp.tsx#L68-L100 · R/packages/web/src/experiments/console/components/ToolCallItem.tsx#L117-L139 · R/packages/web/src/experiments/console/components/PendingInputBanner.tsx#L109 · R/packages/web/src/experiments/console/components/DraftRunCard.tsx#L446-L499 · D/reference/cli.md#L343 | |
| A2 | PASS | Archon | Every tool call is a row whose expanded detail shows the full input and the result (cut at 2,000 characters on the page).<br>**Full record:** `archon workflow logs <run-id>` and `GET /api/workflows/runs/{runId}/provider-events`.<br>Each node's native session reopens with the vendor resume command. | R/packages/web/src/experiments/console/components/ToolCallItem.tsx#L117-L139 · D/reference/cli.md#L783-L790 · D/reference/api.md#L304 · D/guides/authoring-workflows.md#L1238 | |
| A3 | PASS (configuration-scoped, 7.16c) + 7.16b policy-risk note | Archon | **Claude:** "Option 1: Global Auth (Recommended) … Uses credentials from `claude /login`". Anthropic: "You can still use the Claude Agent SDK, `claude -p`, and third-party apps with your subscription limits". Archon's own claude.ai login (`archon ai login anthropic`) is opt-in and never used.<br>**Codex:** "By default Codex uses the login in your Codex home … exactly as `codex login` left it". Archon's own ChatGPT login is never used. | D/getting-started/ai-assistants.md#L115-L129 · R/packages/providers/src/codex/provider.ts#L155-L180 · https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan · https://learn.chatgpt.com/docs/app-server | Help Center 2026-10-07; OpenAI undated |
| A4 | PASS (configuration-scoped, 7.16d) | Archon | **Claude:** the Agent SDK with `systemPrompt` set to the `claude_code` preset plus an optional append, and the standard tools. A workflow node could override it with `systemPrompt:`; the stack never does, and no bundled workflow uses it.<br>**Codex:** one unmodified `codex app-server` per turn; instructions are folded into the user prompt. | R/packages/providers/src/claude/provider.ts#L969-L980 · R/packages/providers/src/codex/app-server.ts#L211-L227 · R/packages/providers/src/codex/provider.ts#L302-L320 | |
| A5 | PASS (configuration-scoped) | Termius | As Stack 4a: SFTP to the distro's sshd. Archon's console shows only run artifacts. | https://docs.termius.com/organize-and-connect-to-hosts/managing-files-with-sftp · https://docs.termius.com/changelog/ios · R/packages/web/src/experiments/console/components/ArtifactPanel.tsx#L91 | undated · 2024-05-20, 2025-12-08 · 2026-10-17 |
| A6 | PASS | Archon | **A6a:** delegated nodes run per A3/A4.<br>**A6b:** Claude sessions land in `~/.claude/projects/<cwd>/`, and Codex threads in `CODEX_HOME` (not ephemeral), outside the worktrees. "read its session id from `archon workflow get <run-id> --verbose` and pass it to the provider's own resume command".<br>Container isolation is not used: its teardown removes the container and the Claude transcript. Raise `cleanupPeriodDays`. | D/guides/authoring-workflows.md#L1238 · R/packages/providers/src/codex/provider.ts#L721-L731 · D/guides/container-isolation.md#L30 | |
| A7 | PASS; sandbox clause not exercised | Archon | Nodes share the run's checkout. A `workflow:` sub-run "shares its parent's checkout unless the node declares `isolation: worktree`". `$ARTIFACTS_DIR`, `$STATE_DIR` and `$node.output` carry files. | D/reference/database.md#L200 · D/reference/cli.md#L445 | |
| A8 | PASS (create and monitor first-class; resume partly by workaround), both directions | Archon | **Create:** chat agents on both harnesses get `invoke_workflow`, and any agent can run `archon workflow run … --model <tier>=codex/<model>\|claude/<model> --detach`.<br>**Monitor:** `manage_run` list/get; `archon workflow get`, `logs --follow`, `wait`.<br>**Resume:** `manage_run` approve/respond, and `archon workflow resume`. A follow-up turn in the same native session uses `claude -p --resume <id>` or `codex exec resume <id>`. | R/packages/core/src/orchestrator/chat-tools.ts#L80-L125 · R/packages/core/src/orchestrator/manage-run-tool.ts#L176-L235 · D/reference/cli.md#L343 · D/reference/cli.md#L843-L849 | |
| C1 | PASS (via WSL2) | Archon, Termius, Tailscale | v0.12.1 ships Linux x64/arm64 builds of the CLI, server and provider plugins. Archon's Windows doc: "WSL2 (recommended): Required for full compatibility". `archon serve` runs "in the foreground", so it needs a systemd user unit plus W4. | https://github.com/coleam00/Archon/releases/download/v0.12.1/checksums.txt · D/deployment/windows.md#L12-L17 · D/reference/cli.md#L1601-L1603 | |

### NEVER gates

| Component | N1 (stars) | N2 (maintainers) | N3 (active) | Sources |
|---|---|---|---|---|
| Archon | PASS: 23.7k★ | PASS, thin. Rasmus Widing wrote 87.1% of human commits and published the releases. Cole Medin published release v0.3.12 on 2026-05-14, the only second-human condition found. | PASS: v0.12.1 on 2026-10-17; 1,133 human commits since 2026-07-21 | https://github.com/coleam00/Archon · https://github.com/coleam00/Archon/releases |
| Termius, Tailscale | as Stack 4a | | | |

### FAVOUR (7.17)

| Item | Points | Component | Source |
|---|---|---|---|
| F1 | 1 | Archon. It offers its own logins, so F1 is capped under 7.16c. | D/getting-started/ai-assistants.md#L115-L129 |
| F2 | 2 | min(Archon 23.7k, Tailscale 37.7k) | https://github.com/coleam00/Archon |
| F3 | 2 | Termius (Archon has no App Store app) | https://apps.apple.com/us/app/termius-terminal-ssh-client/id549039908 |
| F4 | 2 | Termius. Archon's console alone would score 1: it gives an iPad the desktop layout. | https://docs.termius.com/changelog/ios |
| F5 | 2 | Archon: documented resume of a node's session in the vendor TUI | D/guides/authoring-workflows.md#L1238 |
| F6 | 1 | as Stack 4a | — |
| F7 | 2 | Termius | — |
| F8 | 2 | Termius | — |
| F9 | 0 | Archon's container isolation is Claude-only, and its teardown removes transcripts, so there is no cross-sandbox hand-over (brief 7.7) | D/guides/container-isolation.md#L12-L46 |
| F10 | 0 | WSL2 sessions | — |
| **F1–F10** | **14/20** | | |
| F11a–e | 2+2+2+2+1 = **9/10** | Archon:<ul><li>(a) `invoke_workflow` children;</li><li>(b) "↳ child" lineage;</li><li>(c) the same tool rows;</li><li>(d) open, cancel, answer, and take over in the TUI;</li><li>(e) everything works from the phone except TUI take-over.</li></ul> | R/packages/web/src/experiments/console/components/RecentRunRow.tsx#L119-L126 · D/reference/database.md#L203 |

### Setup steps
1. Section 5, steps W1–W8.
2. Install Archon's Linux binary and provider plugins in WSL2. **Never:**
   - run `archon ai login anthropic` or `archon ai login openai`;
   - connect a subscription in Settings → Agents;
   - let `archon setup` copy `auth.json` into `.env`;
   - use Pi with a ChatGPT login.
3. Run `archon serve` as a systemd user unit (W4 keeps the distro up).
4. **Web auth.** Turn it on (form auth or Caddy basic auth). "Authentication is optional" on solo installs, and `/api/*` is otherwise open. Reach the console only over the tailnet: mirrored networking with a firewall rule limited to the tailnet, or `tailscale serve` → `localhost:3090` (mind the WSL2 502 issue).
5. **Chat bots.** Leave Telegram, Slack and Discord off, or set their allow-lists; an empty list answers everyone.
6. **Workflows.** Never declare `systemPrompt:` on Claude nodes, and never use container isolation.
7. **Approvals.** Nothing to set. Archon always runs Claude with `bypassPermissions` and Codex with `approvalPolicy: 'never'`; use workflow approval gates for oversight.

### Risks
- **No permission prompts, ever** (no switch).
- **Credential-handling policy risk (7.16b/c).** Archon offers its own claude.ai login using Claude Code's OAuth client ID, and stores those tokens in its own vault. It also offers a ChatGPT login using the Codex CLI client ID. Anthropic: developers "may not collect, store, or intermediate Claude.ai credentials or session tokens". The stack never uses these paths.
- **Open console** without web auth.
- **Thin second maintainer.** One release by a second person; a later window would likely fail N2.
- **Phone view.** Tool results are cut at 2,000 characters, and the console is untested on a real iPhone.
- **Headless Claude policy.** The Agent SDK path depends on Anthropic's paused change.

### Strict readings
- **7.16c strict: NEAREST MISS (A3).** Offering its own Claude and ChatGPT logins fails A3 for both harnesses.
- **7.16a:** no beta label recorded. The console code lives under an `experiments` folder; whether users see it labelled as experimental is UNKNOWN.
- **7.16b, defaults-only, 7.16d strict, decisions 15 and 17:** no change.

---

## 9. Stack 6 (S11): Superset + Termius + Tailscale, WSL2 (new; on your assumption)

**Components**

| Component | Role |
|---|---|
| Superset (superset-sh/superset, Elastic License 2.0) | The standalone CLI host in WSL2 (orchestrator, terminals), plus the iPhone/iPad app through Superset's relay |
| Termius | Files (A5, F7, F8) through SFTP |
| Tailscale | SSH/SFTP reach into WSL2; dev servers (F6) |

**Topology**
- Section 5, steps W1–W8. Termius is used only for files.
- In WSL2 (systemd on), log in with `superset auth login` and run `superset start --daemon` as a systemd user unit, plus W4.
- The phone app connects through Superset's relay (Pro, iOS 26+). The desktop app is not used.
- Transcripts are in WSL2.

Permalink prefix `S` = `https://github.com/superset-sh/superset/blob/8bc96462cc6b08c5fff5f812305c2cf29ea826cf` (main, 2026-10-18).

### Gate table

S links date 2026-10-18 unless noted.

| Gate | Verdict | Clearing | Evidence | Source URL | Date |
|---|---|---|---|---|---|
| A1 | PASS | Superset | **Reach:** the standalone CLI host "runs a small HTTP server in the background and registers the machine with the relay so other clients in your organization can find it".<br>**(i)** The app reads the org's host roster and shows workspaces and sessions: "Read their output, watch the commands they run".<br>**(ii)** "answer its questions"; the terminal composer has esc/enter/tab/⇧tab/arrow keys.<br>**(iii)** "Pick a project and branch, choose an agent and model, and send the task". The picker lists the host's agents (Claude Code, Codex).<br>Requires Superset Pro and iOS/iPadOS 26. | https://apps.apple.com/us/app/id6788926383 · S/apps/docs/content/docs/remote-access.mdx#L40 · S/apps/mobile/hooks/useOrgHosts/useOrgHosts.ts#L26-L29 · S/apps/mobile/screens/%28authenticated%29/%28home%29/new-session/agent/AgentPickerScreen.tsx#L49-L53 · S/apps/mobile/screens/%28authenticated%29/workspace/%5Bid%5D/components/TerminalComposer/constants.ts#L34-L41 | App 1.1.3, 2026-10-08 |
| A2 | PASS | Superset (vendor terminal apps) | Sessions are the native TUIs in Superset terminals, which "belong to a background terminal daemon". Superset "resumes the session automatically". `agents create --resume-session <id>`, or `claude --resume` / `codex resume`, reopens the full transcript.<br>`superset agents read` returns text turns only. | S/apps/docs/content/docs/keep-agents-running.mdx#L8 · S/apps/docs/content/docs/agent-sessions.mdx#L10 · S/packages/host-service/src/terminal-agents/harness-sessions/transcript.ts#L14-L18 | |
| A3 | PASS + 7.16b policy-risk note (configuration-scoped, 7.16c) | Superset | **Inference** runs only in the unmodified CLIs on WSL2's own logins ("Superset never proxies model calls").<br>**Side reads:** the desktop app's usage meter reads the Claude OAuth token and calls `api.anthropic.com/api/oauth/usage`; it reads the Codex token for `chatgpt.com/backend-api/wham/usage`. The iOS app makes no usage calls, and this stack doesn't run the desktop app.<br>**Avoided (7.16c):**<ul><li>cloud workspaces;</li><li>storing a `claude setup-token` token or an API key in Superset cloud (Agent Accounts);</li><li>CLI calls without `--local`/`--host`.</li></ul> | S/packages/host-service/src/trpc/router/usage/claude.ts#L220-L227 · S/packages/host-service/src/trpc/router/usage/codex.ts#L143-L156 · S/packages/cli/src/commands/connections/agents/set/command.ts#L13-L25 · S/plugins/superset/skills/orchestrate/SKILL.md#L81-L83 · https://code.claude.com/docs/en/legal-and-compliance | legal page undated |
| A4 | PASS (terminal path) | Superset | Terminal presets run the unmodified binaries with hook entries: `claude --dangerously-skip-permissions`; `codex --dangerously-bypass-approvals-and-sandbox --dangerously-bypass-hook-trust`.<br>Superset Chat's Claude path (Agent SDK with no `systemPrompt`) would be A4 PARTIAL. It is not used. | S/packages/shared/src/builtin-terminal-agents.ts#L59-L98 · S/packages/chat-runtime/src/harness/claude/claudeAdapter/claudeAdapter.ts#L234-L250 · https://code.claude.com/docs/en/agent-sdk/modifying-system-prompts | SDK doc undated |
| A5 | PASS (configuration-scoped) | Termius | As Stack 4a. Superset's iPhone app opens files only through the git changeset (`git.getDiff`), which on its own is PARTIAL. | https://docs.termius.com/organize-and-connect-to-hosts/managing-files-with-sftp · S/apps/mobile/screens/%28authenticated%29/workspace/%5Bid%5D/file/FileViewerScreen.tsx#L37-L51 | Termius undated |
| A6 | PASS | Superset | **A6a:** `superset agents create --agent codex\|claude` launches the preset, i.e. the unmodified CLI on WSL2's login.<br>**A6b:** no preset passes `--ephemeral` or `--no-session-persistence`, so transcripts stay in WSL2. Retrieve them with `--resume-session` or the vendor resume commands. Raise `cleanupPeriodDays`. | S/apps/docs/content/docs/cli/cli-reference.mdx#L1060-L1104 · S/apps/docs/content/docs/agent-sessions.mdx#L76 | |
| A7 | PASS (workaround); sandbox clause not exercised | Superset | Workers share the host filesystem. "Hand a branch from one agent to another with its full terminal context". Files can also be passed with `agents create --attachment <path>`. | S/apps/docs/content/docs/orchestration.mdx#L23 · S/apps/docs/content/docs/cli/cli-reference.mdx#L1069-L1074 | |
| A8 | PASS, first-class, both directions | Superset | "The coordinator can be Claude Code or Codex; the workers can be any mix of agents Superset runs."<br>**Create:** `superset agents create --prompt`.<br>**Monitor:** `agents wait`, `terminals read`, `agents read`.<br>**Resume:** `terminals send`, or `agents create --resume-session`.<br>With `--host` resolving to the local machine, calls go over loopback. | S/apps/docs/content/docs/orchestration.mdx#L14 · S/apps/docs/content/docs/orchestration.mdx#L31-L32 · S/apps/docs/content/docs/cli/cli-reference.mdx#L757-L759 · S/apps/docs/content/docs/cli/cli-reference.mdx#L1128-L1160 | |
| C1 | PASS (your assumption, brief 7.18) | Superset; Termius; Tailscale | **Your directive:** "Assume superset can run on windows via WSL2 installation."<br>It runs as a systemd user unit in WSL2, but "systemd services will NOT keep your WSL instance alive", hence W4.<br>**Vendor statements, kept as risks:**<ul><li>"Windows is planned with no date";</li><li>the Linux desktop app is "experimental and untested";</li><li>WSL support is "not at least for a few months" (#1993);</li><li>its comparison page: "Choose RunPane if … You work on Windows or in WSL."</li></ul> | S/apps/docs/content/docs/cli/host-server.mdx · https://learn.microsoft.com/en-us/windows/wsl/systemd · https://docs.superset.sh/faq · https://github.com/superset-sh/superset/issues/1993 · https://superset.sh/compare/superset-vs-runpane | 2026-10-18 · updated 2026-06-02 · 2026-10-15 · 2026-03-07 · 2026-10-08 |

### NEVER gates

| Component | N1 (stars) | N2 (maintainers) | N3 (active) | Sources |
|---|---|---|---|---|
| Superset | PASS: 15.3k★ (Elastic License 2.0; source-available counts as open source, brief 7.3) | PASS: Satya Patel 41.4% and Kiet 41.1% of 2,647 non-bot commits. Kitenite merged #7692 (2026-09-26) and AviPeltz merged #5924 (2026-08-05), both written by outside authors. | PASS: desktop-v1.38.0 on 2026-10-14; 1,765 non-bot commits since 2026-07-21 | https://github.com/superset-sh/superset · https://github.com/superset-sh/superset/pull/7692 · https://github.com/superset-sh/superset/pull/5924 · https://github.com/superset-sh/superset/releases/tag/desktop-v1.38.0 |
| Termius, Tailscale | as Stack 4a | | | |

### FAVOUR (7.17)

| Item | Points | Component | Source |
|---|---|---|---|
| F1 | 1 | Superset (7.16b/c cap: its code reads tokens from the desktop UI, and it offers a cloud credential path) | S/packages/host-service/src/trpc/router/usage/claude.ts#L220-L227 |
| F2 | 2 | min(Superset 15.3k, Tailscale 37.7k) | https://github.com/superset-sh/superset |
| F3 | 2 | Superset's App Store app (Termius too) | https://apps.apple.com/us/app/id6788926383 |
| F4 | 2 | 1.1.3: "Superset now runs natively on iPad, with layouts that use the full screen" | https://apps.apple.com/us/app/id6788926383 (2026-10-08) |
| F5 | 2 | Sessions are the native TUIs; resume and fork use the vendor commands | S/apps/docs/content/docs/agent-sessions.mdx#L10 |
| F6 | 1 | Tailscale into WSL2. Superset's own port forwarding is desktop-to-desktop only. | S/apps/docs/content/docs/ports.mdx#L55 |
| F7 | 2 | Termius. Superset alone would score 1: changed files only. | — |
| F8 | 2 | Termius. Superset alone would score 1. | — |
| F9 | 0 | Docker appears only in setup scripts | — |
| F10 | 0 | WSL2 sessions | — |
| **F1–F10** | **14/20** | | |
| F11a–e | 2+1+2+2+1 = **8/10** | Superset:<ul><li>(a) `agents create`;</li><li>(b) children are listed, but with no parent link;</li><li>(c) the same terminal sessions;</li><li>(d) open, `terminals send`, interrupt, take over;</li><li>(e) the phone lists, streams, messages, stops and starts sessions, but has no parent link.</li></ul> | S/apps/docs/content/docs/orchestration.mdx#L31-L32 · S/packages/host-service/src/terminal-agents/subagent-harnesses/types.ts#L22-L28 |

### Setup steps
1. Superset Pro, and an iPhone/iPad on iOS/iPadOS 26 or later.
2. Section 5, steps W1–W4: Claude and Codex in WSL2, hygiene, retention and keep-alive. Enable systemd in the distro.
3. Install the standalone Superset CLI in WSL2, run `superset auth login`, then run `superset start --daemon` as a systemd user unit.
4. **Avoid the cloud.**
   - Never create cloud workspaces.
   - Never add Agent Accounts (`superset connections agents set`).
   - Pass `--local` or `--host` on every CLI call. The bundled orchestrate skill already passes `--host`.
5. **Don't run the desktop app day to day:** its usage display reads your Claude and ChatGPT tokens. Don't use Superset Chat either: its Claude path drops Claude Code's own system prompt.
6. **Approvals.** The built-in agent commands add `--dangerously-skip-permissions` (Claude) and `--dangerously-bypass-approvals-and-sandbox --dangerously-bypass-hook-trust` (Codex).
   - To get permission prompts, remove those flags from the agent commands.
   - superset.md documents this only in the desktop app's Settings → Agents. A way to do it without the desktop app was not found (UNKNOWN).
   - If you open the desktop app for this, avoid agent terminals and Settings → Usage, which trigger the token reads.
7. Section 5, steps W5–W8, for files: Termius over Tailscale, with logging off.

### Risks
- **C1 rests on your assumption.** The vendor says WSL isn't supported "for a few months" and has no Windows build, and its own comparison page sends Windows/WSL users elsewhere. Test before relying on it.
- **The vendor relay is required for the phone.** It runs as a Cloudflare Worker at relay.superset.sh.
  - No end-to-end encryption was found, and it can't be self-hosted.
  - Relayed terminal output is visible to the relay.
  - Anyone in your Superset org whom you grant access can reach the host's files, terminals and agent runs.
- **Approvals are bypassed by default** (step 6).
- **Token reads** happen whenever the desktop app shows an agent terminal or Settings → Usage. This is the 7.16b policy risk; Anthropic says developers "may not collect, store, or intermediate Claude.ai credentials or session tokens".
- **Cloud fall-through.** CLI calls default to the cloud "if your account has cloud workspaces".
- **Phone attachments go through Superset's cloud storage**, and `--from-terminal` hand-offs send terminal output unredacted.
- **Audit:** `superset agents read` drops tool calls. Use the TUIs and `--resume` for the full trail.
- **Cost:** Superset Pro, $20 per user per month (or $15 billed yearly).

### Strict readings
- **Without your assumption: NEAREST MISS (C1).**
- **7.16c strict: NEAREST MISS (A3, A4).** Superset offers a cloud credential path (Agent Accounts) and a Chat path that replaces Claude's prompt.
- **7.16b strict:** no read happens in this configuration. One desktop session with an agent terminal open would fail A3.
- **7.16a:** the "experimental" and Beta labels on the Linux/WSL2 build are exempt by your directive (7.18). No other label applies to the core.
- **Defaults-only, 7.16d strict, decisions 15 and 17:** no change.

---

## 10. Stack 7 (S9): CAO + tmux + Termius + Tailscale, WSL2 (new)

**Components**

| Component | Role |
|---|---|
| CLI Agent Orchestrator (CAO) v2.5.4 (awslabs/cli-agent-orchestrator, Apache-2.0) | Orchestrator. A supervisor agent hands work to Claude Code or Codex workers through MCP tools and the `cao agent` CLI. It also has a desktop-first web UI. |
| tmux | CAO's runtime: one tmux session per agent |
| Termius | Phone client (attach to `cao-…` sessions) and files |
| Tailscale | Network path; F6 |

**Topology**
- Section 5, steps W1–W8.
- `cao-server` runs in its own tmux window, started by W4. It stays on loopback (`127.0.0.1:9889`).
- Profiles: one supervisor, plus workers pinned with `provider: claude_code` or `provider: codex`.

Permalink prefix `B` = `https://github.com/awslabs/cli-agent-orchestrator/blob/5eb58faba2a890a00450ac0fc1946ad147e22cb3` (tag v2.5.4; tag commit 2026-10-14).

### Gate table

B links date 2026-10-14 unless noted.

| Gate | Verdict | Clearing | Evidence | Source URL | Date |
|---|---|---|---|---|---|
| A1 | PASS (7.4) | Termius + tmux, with CAO for starting sessions | CAO's docs: "All CAO agent sessions run in tmux. You can attach directly to a session to watch or interact with agents in real time" (`tmux attach -t cao-…`).<br>**(i)** `tmux ls` and attach.<br>**(ii)** Type into the native TUI.<br>**(iii)** `cao launch --agents <profile> --provider claude_code\|codex` in a chosen directory.<br>CAO's own web UI covers (i)–(iii) too, but its layout isn't built for phones (its tab bar doesn't wrap), so on its own it is PARTIAL. Termius side as Stack 4a. | B/docs/tmux.md#L3-L12 · B/docusaurus/docs/features/multi-provider.md#L22-L31 · B/web/src/App.tsx#L159-L188 | |
| A2 | PASS | CAO (vendor terminal apps) | CAO runs the native TUIs, so tool calls show live in tmux and in the web UI's terminal view. It passes no `--no-session-persistence` or `--ephemeral` and no `CODEX_HOME` override, so transcripts persist, and `claude --resume` / `codex resume` reopen them. Handoff workers are closed after completion; their trail survives in the native transcript. | B/src/cli_agent_orchestrator/providers/claude_code.py#L397-L409 · B/src/cli_agent_orchestrator/mcp_server/server.py#L323-L335 · https://code.claude.com/docs/en/claude-directory | claude-directory undated |
| A3 | PASS | CAO | CAO types the unmodified `claude` / `codex` into tmux panes, and never reads, copies or proxies credentials. Before launch it unsets every `CLAUDE*` variable, so the `/login` subscription is the only Claude path. Anthropic: "Subscription OAuth credentials from `/login`. This is the default for Claude Pro, Max, Team, and Enterprise users". Codex signs in with ChatGPT.<br>CAO's install page says Claude Code "requires Anthropic API key"; the source and provider guides show subscriptions work. | B/src/cli_agent_orchestrator/providers/claude_code.py#L530-L543 · B/src/cli_agent_orchestrator/providers/codex.py#L152-L172 · https://code.claude.com/docs/en/authentication · https://learn.chatgpt.com/docs/auth · B/docusaurus/docs/getting-started/installation.md#L12-L14 | install page 2026-07-31; vendor docs undated |
| A4 | PASS | CAO | Profile prompts are appended: `--append-system-prompt-file` for Claude and `-c developer_instructions=…` for Codex. There is no `--system-prompt`, `model_instructions_file` or `base_instructions`, and the built-in tools stay. | B/src/cli_agent_orchestrator/providers/claude_code.py#L462-L474 · B/src/cli_agent_orchestrator/providers/codex.py#L1186-L1200 | |
| A5 | PASS (configuration-scoped) | Termius | As Stack 4a. CAO's web UI has no file view. | https://docs.termius.com/organize-and-connect-to-hosts/managing-files-with-sftp | undated |
| A6 | PASS | CAO | **A6a:** each worker is the same unmodified CLI, with its harness set by the worker profile's `provider`.<br>**A6b:** transcripts persist in WSL2; teardown removes panes and checkouts, not transcripts. Raise `cleanupPeriodDays`. | B/src/cli_agent_orchestrator/utils/agent_profiles.py#L464-L500 · B/docusaurus/docs/features/multi-provider.md#L50-L58 | |
| A7 | PASS (workaround); sandbox clause not exercised | CAO | "By default, agents start in the supervisor's current working directory", or in a given `working_directory`. `use_worktree` gives a worker its own branch. | B/src/cli_agent_orchestrator/mcp_server/server.py#L286-L330 | |
| A8 | PASS, first-class, both directions | CAO | "A supervisor on one provider can delegate to workers running on entirely different providers".<br>**Create:** the `assign` and `handoff` MCP tools, or `cao agent assign\|handoff`.<br>**Monitor:** `cao agent status`, `cao agent result`.<br>**Resume:** `send_message` to the worker's terminal; `cao agent cancel` interrupts.<br>Use `assign` for workers you will continue, because handoff workers are torn down. | B/docusaurus/docs/features/multi-provider.md#L7 · B/src/cli_agent_orchestrator/mcp_server/server.py#L490-L560 · B/src/cli_agent_orchestrator/cli/commands/agent.py#L76-L93 · B/docs/codex-cli.md#L106-L123 | |
| C1 | PASS (via WSL2) | CAO, tmux, Termius, Tailscale | "On Windows, run CAO under WSL2 or a Linux container". PyPI ships a Linux x86_64 wheel. `cao-server` runs in the foreground ("Leave `cao-server` running in its own terminal tab or tmux window"), so W4 starts it in a tmux window. | B/src/cli_agent_orchestrator/\_\_init\_\_.py#L17-L28 · https://pypi.org/pypi/cli-agent-orchestrator/2.5.3/json · B/docusaurus/docs/getting-started/installation.md#L82 | PyPI 2026-10-08 |

### NEVER gates

| Component | N1 (stars) | N2 (maintainers) | N3 (active) | Sources |
|---|---|---|---|---|
| CAO | PASS: 1.5k★ | PASS: Stan Fan 20.3% and Ted Swinyar 11.5% of 374 non-bot commits (2026-04-22 → 10-19); releases published by haofeif and fanhongy | PASS: v2.5.4 on 2026-10-15 (PyPI has 2.5.3); 225 non-bot commits since 2026-07-21 | https://github.com/awslabs/cli-agent-orchestrator · https://github.com/awslabs/cli-agent-orchestrator/commits/main · https://github.com/awslabs/cli-agent-orchestrator/releases |
| tmux, Termius, Tailscale | as Stack 4a | | | |

### FAVOUR (7.17)

| Item | Points | Component | Source |
|---|---|---|---|
| F1 | 2 | CAO and tmux run the unmodified CLIs; no credential reads | B/src/cli_agent_orchestrator/providers/claude_code.py#L530-L543 |
| F2 | 0 | CAO has 1.5k stars (under 5,000) | https://github.com/awslabs/cli-agent-orchestrator |
| F3 | 2 | Termius | — |
| F4 | 2 | Termius (CAO's web UI: UNKNOWN) | — |
| F5 | 2 | CAO/tmux: native TUIs, attach | B/docs/tmux.md#L3-L12 |
| F6 | 1 | as Stack 4a | — |
| F7 | 2 | Termius | — |
| F8 | 2 | Termius | — |
| F9 | 0 | CAO's one-agent-per-pod topologies don't show hand-over across nodes (brief 7.7) | B/docs/control-planes.md#L57 |
| F10 | 0 | WSL2 sessions | — |
| **F1–F10** | **13/20** | | |
| F11a–e | 2+1+2+2+1 = **8/10** | CAO:<ul><li>(a) MCP tools and `cao agent`;</li><li>(b) workers are listed "in the same session", but the parent id (`caller_id`) isn't shown in the UI;</li><li>(c) the same TUI and output views;</li><li>(d) attach, Quick Send, cancel, take over;</li><li>(e) its own phone path isn't phone-designed.</li></ul> | B/src/cli_agent_orchestrator/models/terminal.py#L92-L94 · B/web/src/components/AgentPanel.tsx#L270-L292 |

### Setup steps
1. Section 5, steps W1–W8, with tmux 3.3 or later.
2. `uv tool install cli-agent-orchestrator` (installs PyPI 2.5.3).
3. **Start the server.** Run `cao-server` in its own tmux window from the W4 logon task. Keep it on loopback (the default `127.0.0.1:9889`), and use Termius on the phone.
   - If you open the web UI to the phone, set `CAO_AUTH_LOCAL_TOKEN`, `CAO_ALLOWED_HOSTS=<tailnet name>` and `CAO_WS_ALLOWED_CLIENTS=<iPhone tailnet IP>`.
   - CAO's docs: "Default posture … the API performs no authentication".
4. **Approvals.** CAO launches `claude --dangerously-skip-permissions` and `codex --yolo` by default.
   - For permission prompts, set `permissionMode` (Claude) and `codexProfile` (Codex) in each profile.
   - Never set `allowedTools: ["*"]`, which forces `--yolo`.
   - Prompts then pause assign/handoff until you answer them (from Termius).
5. **User-wide Claude setting.** On every Claude launch, CAO writes `skipDangerousModePermissionPrompt: true` into `~/.claude/settings.json` in WSL2. That removes the bypass-mode warning for every Claude session in that home. Check the file after the first launch, and keep this in mind if you also use Claude there without CAO.
6. **Memory feature.** It is on by default, and runs `claude -p --tools ""` or `codex exec` in the background on your subscription. Turn memory off if you don't want that.
7. Don't use `claude setup-token`: CAO unsets `CLAUDE_CODE_OAUTH_TOKEN`, so only the stored `/login` works.
8. **Profiles:** one supervisor, plus workers pinned with `provider: claude_code` or `provider: codex`.

### Risks
- **Approvals bypassed by default** (step 4).
- **`skipDangerousModePermissionPrompt`** written into your user-wide Claude settings (step 5).
- **Unauthenticated API by default.** The local token is inherited by every agent pane, so a compromised agent can read it.
- **Background quota use** by the memory feature. It also depends on headless `claude -p`, so on Anthropic's paused change and the future `--bare` default.
- **"Beta" PyPI classifier** (a 7.16a caveat), and a docs conflict on API keys.
- **Roadmap:** CAO 3.0 aims at a multi-tenant SaaS (#777). Re-check credential handling if it ships.
- **As Stack 4a:** tmux's maintainer caveat, keep-alive untested, no notifications, Codex in Termius untested.

### Strict readings
- **Decision 15 strict (tmux N2 FAIL): NEAREST MISS (A1).** CAO "orchestrates agents through tmux".
- **7.16a strict:** CAO's "Development Status :: 4 - Beta" makes CAO's own contributions PARTIAL. Every gate still clears through tmux, Termius and the CLIs (Stack 4a's base), so the stack still clears.
- **7.16d strict (any tool-set change):** CAO's built-in supervisor role narrows tools with `--disallowedTools`, and the memory feature uses `--tools ""`. Avoid both with unrestricted profiles and memory turned off.
- **7.16b, 7.16c, defaults-only, decision 17:** no change.

**Ranking note.** Stack 4a beats this stack on every measure: the same strict-reading weakness, 2 more F1–F10 points, and the same F11. It stays on the list because CAO adds first-class supervisor/worker delegation, which FAVOUR only partly measures.

---

## 11. Stack 8 (S7): Gas City + tmux + Termius + Tailscale, WSL2 (new verdict)

In the first version this was a nearest miss (A1, A5), because no screened iPhone terminal existed. Termius now covers both.

**Components**

| Component | Role |
|---|---|
| Gas City v1.5.0 (gastownhall/gascity, MIT) | Orchestrator (`gc sling`, `gc session …`) and a dashboard with structured transcripts (loopback) |
| tmux | Gas City's default runtime |
| Termius | Phone client (A1 under 7.4) and files |
| Tailscale | Network path; F6 |

**Topology**
- Section 5, steps W1–W8, with `[boot] systemd=true` in the distro.
- `gc supervisor install` sets up a systemd user service, kept up by W4.
- The phone uses Termius: `gc session list` and `gc session attach <name>`. Gas City may not use tmux's default socket, so prefer `gc session …` to plain `tmux ls`.

Permalink prefix `G` = `https://github.com/gastownhall/gascity/blob/f66474617d2bb7fbe51a3d746da5f3ceab2b8517` (tag v1.5.0, 2026-10-05).

### Gate table

G links date 2026-10-05.

| Gate | Verdict | Clearing | Evidence | Source URL | Date |
|---|---|---|---|---|---|
| A1 | PASS (7.4) | Termius + tmux, with Gas City's CLI | **(i)** `gc session list`; `gc session attach <name>` opens the native TUI with the same history.<br>**(ii)** Type into the TUI, for both harnesses.<br>**(iii)** `gc session new <template> --no-attach` (the template picks the harness), or `gc sling <rig>/<agent> "<task>"` in a chosen rig (repo).<br>Gas City's own dashboard is read-only for running sessions and binds to loopback, so on its own it is PARTIAL. Termius side as Stack 4a. | G/docs/reference/cli.md#L4111-L4124 · G/docs/reference/cli.md#L4216-L4283 · G/docs/getting-started/dashboard.md#L50-L60 | |
| A2 | PASS | Gas City | The dashboard's structured transcript renders every `tool_use` (name and input) and `tool_result` (command, stdout, stderr, exit code, diffs) for both harnesses, without truncation. `gc session logs <s> --tail 0` gives the full record, and the TUI is one `gc session attach` away. | G/internal/api/dashboardspa/web/frontend/src/components/structured/StructuredTranscript.tsx#L104-L131 · G/internal/sessionlog/codex_reader.go#L232-L295 · G/docs/reference/cli.md#L4176-L4215 | |
| A3 | PASS (configuration-scoped) + 7.16b policy-risk note | Gas City | The tmux runtime runs the unmodified CLIs on their own logins. The readiness probe runs `claude auth status --json` and accepts only first-party auth ("API-key or alternate providers are intentionally treated as unsupported").<br>**Side read:** it reads `~/.codex/auth.json` locally to check `auth_mode`.<br>**Avoided (7.16c):**<ul><li>the k8s path, which copies `.credentials.json` into a Kubernetes Secret;</li><li>API keys in the supervisor environment: Gas City answers Claude's API-key question "Yes" automatically.</li></ul> | G/internal/api/handler_provider_readiness.go#L382-L451 · G/internal/runtime/dialog.go#L1329-L1354 · G/Makefile#L1109-L1130 | |
| A4 | PASS | Gas City | No `--system-prompt`, `model_instructions_file` or `base_instructions`. Role context arrives through each harness's own hooks (appended). | G/internal/bootstrap/packs/core/overlay/per-provider/codex/.codex/hooks.json#L1-L41 · G/internal/hooks/config/claude.json | |
| A5 | PASS (configuration-scoped) | Termius | As Stack 4a. Gas City has no file view. | https://docs.termius.com/organize-and-connect-to-hosts/managing-files-with-sftp | undated |
| A6 | PASS | Gas City | **A6a:** slung sessions are the unmodified CLIs in tmux. Keep API keys unset, or set `GC_SUPERVISOR_OMIT_PROVIDER_CREDS=1`.<br>**A6b:** transcripts are pinned (`--session-id <uuid>`) in `~/.claude/projects` and `~/.codex/sessions`, and no Gas City code deletes them. Retrieve them with `gc session logs`, the dashboard or the vendor resume commands. | G/docs/reference/cli.md#L4300-L4363 · G/internal/sessionlog/reader.go#L1464-L1470 | |
| A7 | PASS; sandbox clause not exercised | Gas City | Agents work in shared rig directories. The tutorial's slung Codex reviewer "write[s] review.md" for the others to read. | G/docs/tutorials/02-agents.md#L145-L170 | |
| A8 | PASS, first-class, both directions | Gas City | **Create:** `gc sling <rig>/<agent> "<task>"`, or `gc session new <template> --no-attach`.<br>**Monitor:** `gc session list`, `peek`, `logs -f`, `wait`.<br>**Resume:** `gc session submit <id> <msg> --intent follow_up\|interrupt_now`, `gc session nudge`.<br>The tutorial shows a Claude "mayor" running `gc sling`, after which "Gas City started a Codex session". | G/docs/reference/cli.md#L4216-L4283 · G/docs/reference/cli.md#L4364-L4387 · G/docs/tutorials/04-communication.md#L96-L119 | |
| C1 | PASS (via WSL2) | Gas City, tmux, Termius, Tailscale | Official Linux tarballs. "Gas City works under WSL 2 with a standard Ubuntu or Debian distribution". The supervisor runs as a systemd user service (`gc supervisor install`), plus W4. | G/docs/getting-started/installation.md#L119-L129 · G/docs/getting-started/troubleshooting.md#L724-L728 · https://docs.gascity.com/getting-started/troubleshooting | docs site undated |

### NEVER gates

| Component | N1 (stars) | N2 (maintainers) | N3 (active) | Sources |
|---|---|---|---|---|
| Gas City | PASS: 1.4k★ | PASS: Julian Knutsen 51.7% and Jim Wordelman 15.6% of 4,527 non-bot commits (Wordelman's two emails combined). Chris Sells and Stephanie Jarmak merged other people's PRs. | PASS: v1.5.0 on 2026-10-05; 2,095 commits since 2026-07-21 | https://github.com/gastownhall/gascity · https://github.com/gastownhall/gascity/releases/tag/v1.5.0 · https://github.com/gastownhall/gascity/commits/main |
| tmux, Termius, Tailscale | as Stack 4a | | | |

### FAVOUR (7.17)

| Item | Points | Component | Source |
|---|---|---|---|
| F1 | 1 | Gas City reads Codex `auth.json` (7.16b) | G/internal/api/handler_provider_readiness.go#L382-L451 |
| F2 | 0 | Gas City 1.4k★ | https://github.com/gastownhall/gascity |
| F3 | 2 | Termius | — |
| F4 | 2 | Termius | — |
| F5 | 2 | `gc session attach` opens the native TUI with the same history | G/docs/reference/cli.md#L4111-L4124 |
| F6 | 1 | as Stack 4a | — |
| F7 | 2 | Termius | — |
| F8 | 2 | Termius | — |
| F9 | 0 | The k8s runtime doesn't show hand-over or transcripts across pods (brief 7.7) | G/internal/runtime/k8s/pod.go#L300-L332 |
| F10 | 0 | WSL2 sessions | — |
| **F1–F10** | **12/20** | | |
| F11a–e | 2+1+2+2+1 = **8/10** | Gas City:<ul><li>(a) `gc sling`;</li><li>(b) children are listed, but the parent link is only indirect;</li><li>(c) the same structured transcript;</li><li>(d) attach, submit, nudge, kill;</li><li>(e) its phone view is read-only.</li></ul> | G/internal/api/handler_session_agents.go#L10-L13 · G/docs/getting-started/dashboard.md#L50-L60 |

### Setup steps
1. Section 5, steps W1–W8, with `[boot] systemd=true`.
2. Install Gas City from the Linux tarball, plus its prerequisites (tmux, git, jq, dolt, bd, flock), then run `gc supervisor install`.
3. Keep `ANTHROPIC_*` and `OPENAI_*` keys out of the shell and out of `~/.gc/secrets.env`, or set `GC_SUPERVISOR_OMIT_PROVIDER_CREDS=1`.
4. Never use `make k8s-secret` or the k8s session provider.
5. Leave the dashboard on loopback, and use Termius from the phone (`gc session list`, `gc session attach <name>`).
6. **Approvals.** Gas City's default mode flags are unrestricted for both harnesses: Claude `--dangerously-skip-permissions`, Codex `--dangerously-bypass-approvals-and-sandbox`. Claude's mode is a configurable flag, but no prompt-keeping mode for Codex is documented (UNKNOWN). Treat approvals as off.

### Risks
- **tmux's maintainer caveat** (decision 15).
- **Approvals off by default.**
- **API-key trap.** If a key is present, Gas City answers Claude's "use this API key?" question "Yes" automatically, and the session bills the API.
- **Codex `auth.json` read** for a readiness check (7.16b note). OpenAI: "treat `~/.codex/auth.json` like a password".
- **The k8s path copies Claude credentials** (avoided).
- **Small project** (1.4k stars) with many prerequisites.
- **Phone view is Termius only.** The dashboard is read-only for running sessions, and local.

### Strict readings
- **Decision 15 strict: NEAREST MISS (A1).** tmux is Gas City's default runtime, and the alternative `subprocess` runtime is unverified.
- **7.16c strict: NEAREST MISS (A3).** The k8s credential-copy path is offered.
- **7.16a, 7.16b, defaults-only, 7.16d strict, decision 17:** no change. On 7.16b: Gas City reads no Claude tokens.

---

## 12. Stack 9 (S4): Maestro + agentsview + Tailscale, Windows-native

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
3. **Claude Token Source** (verification R4). Keep the default API mode with no API key set, or use the TUI Wrapper. Don't use Dynamic, which "auto-switches to API".
4. **Maestro settings.**
   - "Show tool calls in responses" on.
   - Web-UI auto-start with a fixed port.
   - The `maestro-cli.cmd` shim.
   - Raise `cleanupPeriodDays`.
5. **agentsview.** Set `result_content_blocked_categories = []` and `require_auth = true`, behind `tailscale serve`. Keep Codex Cloud import and claude.ai sync off.
6. **Tailscale.** Open Maestro on the phone at `http://<magicdns>:<port>/<token>`. Optionally add SMB and Serve.

### Risks
- **No permission gating.** Every agent runs with all permission checks disabled: Claude `--dangerously-skip-permissions`, Codex `--dangerously-bypass-approvals-and-sandbox`. Agents can also drive Maestro itself.
- **Insecure phone link.** It is plain HTTP plus a token, so keep it tailnet-only.
- **Untested recipe.** The A1 configuration has not been tried live.
- **agentsview Resume API.** It can add `--dangerously-skip-permissions`, so always run agentsview with `require_auth`.
- **Headless Claude policy** (verification). Maestro's default Claude path is `claude --print`, so it depends on Anthropic's paused policy change and on `--bare` not becoming the default for `-p`. Maestro's docs say `-p` bills API credit; Anthropic's Help Center (2026-10-07) says it uses subscription limits.

### Strict readings
- A defaults-only reading leaves Claude prompts unanswerable on the phone, so the stack becomes a NEAREST MISS (A1).
- Under the strict 7.16d alternative (any tool-set change; verification R5), the recipe's `--disallowedTools AskUserQuestion` makes A4 PARTIAL. That is also a NEAREST MISS.

---

## 13. Decisions made on your behalf

You asked for no questions during the run, so the orchestrator decided these. Rows 14–20 are new in this update. Full wording is in `brief.md` section 7.

| # | Decision | Strict alternative | Effect of the strict alternative on the shortlist |
|---|---|---|---|
| 1 | "Tailwind" read as **Tailscale**; no agent product by that name exists (7.1). | — | **Without Tailscale:**<ul><li>every stack loses F6;</li><li>Stack 1 still clears A5 via ChatGPT's project file browser, if every repo is a ChatGPT project;</li><li>the WSL2 stacks (3–8) would need another screened network path for the phone.</li></ul> |
| 2 | "AgentView" screened as both Claude Code agent view and agentsview (7.1). | — | None |
| 3 | "Cross-mode" = between iPhone/iPad and the Windows PC (including WSL2) (7.2). | Local vs cloud, or Windows vs WSL | Would re-centre A5 on cloud visibility. Not applied. |
| 4 | NEVER "single maintainer" also applies to closed-source products, judged by vendor evidence; source-available licences count as open source (7.3). | Closed source exempt; OSI licences only | None of the shortlisted stacks change. Under "OSI licences only", Superset (Elastic License) would be judged as a vendor (still PASS), and stack 6's F2 would rest on Tailscale (still 2). |
| 5 | NEVER "deprecated" includes announced sunsets and maintenance-only notices (7.3). | Counts only after shutdown | Vibe Kanban, the Happy CLI and the `@codex` connector would need screening past N3, which was not done. code-server would still fail N2. |
| 6 | **7.16a:** a "beta/preview" label on a generally available build is a caveat, not PARTIAL. | Any beta label → PARTIAL | Orca (#2) and T3 Code (#3) become nearest misses. CAO's own parts turn PARTIAL ("Beta" classifier), but stack 7 still clears through tmux and Termius. Superset's Linux/WSL2 labels are exempt by your directive (decision 14). Others stay. |
| 7 | **7.16b:** reading your OAuth tokens for usage display doesn't change A3 (inference stays native), but caps F1 and carries a policy-risk flag. | Any third-party read of Claude tokens fails A3 | Orca and T3 Code become nearest misses (A3). Superset (#6) too, but only if its desktop app runs. Others stay. |
| 8 | **7.16c:** gates are judged on the configuration you actually use; avoidable non-compliant paths don't fail a tool. | (a) Offering such a path at all fails; or (b) "defaults only": a tool must meet the gate without changing a default that affects the gate. Switching on a feature you use, such as Remote Control, is fine. | **(a)** These become nearest misses (A3):<ul><li>Archon: its own Claude and ChatGPT logins;</li><li>Superset: cloud Agent Accounts, and Chat's replaced Claude prompt;</li><li>Gas City: the k8s credential copy.</li></ul>Two paths are not counted (corrected per verification R6 and R7): Orca's Agent SDK mode keeps Claude Code's own prompt, and T3's "Connect with ChatGPT" is OpenAI-documented.<br>**(b)** T3 Code's default helper runs leave no transcript (A2), and Maestro's default Claude questions stall on the phone (A1). Both drop. |
| 9 | **7.16d:** replacing a harness's built-in system prompt or tool set = A4 PARTIAL, for Claude and Codex alike. | Any tool-set change, including deny rules or `--tools ""`, = A4 PARTIAL (verification R5) | Under the binding rule, Agor's Codex path is PARTIAL, so S5 is not shortlisted.<br>Under the strict alternative:<ul><li>Maestro (#9) becomes a nearest miss, because its phone recipe denies `AskUserQuestion`;</li><li>T3's helper runs turn PARTIAL for that path only;</li><li>so do CAO's built-in supervisor role and memory feature, which can be avoided.</li></ul> |
| 10 | A1 requires list/read, message/approve and start for **both** harnesses; generic SSH/web terminals count only if screened (7.4). | — | Termius passed screening; Blink Shell failed N2, and code-server failed N3/N2. Without the generic-terminal rule, stacks 4a, 4b, 7 and 8 would lose A1. |
| 11 | Raising Claude's `cleanupPeriodDays` (default 30 days) is a setup step, not a fail (7.7). | Default retention fails A6b | Every stack would fail A6b. |
| 12 | Your OS built-ins (Windows SMB sharing, Windows OpenSSH Server, iOS Files, WSL2), git and the two CLIs are givens, not components (7.12). | Treat them as components | Each would need screening before it counts. That affects Stack 1's SMB route and every SSH route stacks 4a–8 use for Termius (the A1 terminal path and A5 files). |
| 13 | Stack FAVOUR scoring: F1 = lowest session-launching component; F2 = lowest core open-source component; F3–F11 = best single component (7.17). | Sum or average across components | Stack 1's F10 would rise to 2 under a stack-level reading. In stacks 5–8, F3, F4, F7 and F8 come from Termius. |
| 14 | **Your directive (7.18):** Superset runs in WSL2, so its C1 is PASS, and beta or experimental labels on its Linux/WSL2 build don't fail other gates. | Judge C1 on the vendor's own statements | Superset (#6) becomes a nearest miss (C1). The vendor statements: no Windows build; Linux desktop "experimental and untested"; WSL support "not at least for a few months". |
| 15 | **tmux N2 = PASS (narrow)** (7.20). The second human, Thomas Adam, has 19.5% of non-bot commits, almost all merges of the OpenBSD tree (27 with hand-resolved conflicts). | Count only non-merge commits and PR merges into `master` | tmux fails N2 and is screened out. Stacks 4a (Termius + tmux), 7 (CAO) and 8 (Gas City) lose their session layer and become nearest misses (A1). Stack 4b (cmux-tui) is unaffected. |
| 16 | **The WSL2 distro's own OpenSSH server is a given** (7.20), like Windows OpenSSH. Mosh is not a given and is unscreened, so no stack uses it. | Treat SSH servers as components | As decision 12: the SSH server would need screening before stacks 4a–8's routes count. |
| 17 | **cmux-tui admitted as its own component** (orchestrator, update round). cmux's Mac app and iOS companion failed C1. cmux-tui is a separate Linux package (npm `cmux`, MIT) in the same repo, and its N2 is judged on the whole repo. | (a) cmux's C1 failure covers the whole repo; or (b) judge N2 on cmux-tui's own commits (93.9% by one author) | Either way, cmux-tui is screened out and stack 4b becomes a nearest miss (A1). |
| 18 | **A multiplexer counts as "the platform" for F11** when agents launch sessions through it (tmux, cmux-tui). Decided by compose-stacks in this update. | Only orchestrator or client components score F11 (7.10's wording) | tmux scores no F11, so stack 4a's F11 falls to Termius's 4/10 (total 19, ranked last). cmux-tui is a client/UI component, so 4b is unaffected. Stacks 7 and 8 score through CAO and Gas City. |
| 19 | **F11e scored the same way for every tool** (compose-stacks): PASS only when F11a–d are all PASS and all reachable from iPhone/iPad. tmux's own file gave 2; normalized to 1. | tmux's own reading: PASS when the phone reaches everything the PC does | Stack 4a would score 9/10. Applied to every tool, 4b and 6 would also reach 9/10. The top three don't move. |
| 20 | **OS settings are setup steps, not "defaults"** in the defaults-only reading: WSL idle shutdown, Windows sleep, OpenSSH service start, mirrored networking. This matches how "Windows never sleeps" was already treated for stack 1. | Count OS settings as defaults | Every stack fails at defaults (WSL shuts an idle distro after 15 seconds, and Windows sleeps), so this reading separates nothing. |

Decision 11 hits every stack. Decisions 12 and 16 add screening work for any stack that relies on OS-provided servers. Decision 20 breaks every stack. That is why they are left out of the ranking test (section 1).

---

## 14. Also clears, but not shortlisted

**S5: Agor (Claude side, WSL2) + ChatGPT desktop (Codex side, Windows) + Tailscale**
- **Verdict:** CLEARS ALL ALWAYS GATES under the binding reading, but it is configuration-heavy:
  - cross-boundary delegation in both directions: `codex exec` in WSL2 with `CODEX_HOME=/mnt/c/Users/<u>/.codex`, and `wsl.exe … claude -p`;
  - Agor's keep-alive is undocumented;
  - Tailscale Serve → WSL2 has an open 502 issue.
- **Credentials:** Agor stores your Claude setup-token, and its own "Sign in with Claude" must stay off.
- **Scores:** F1–F10 = 13/20. F11 = 5/10 once Agor's Codex launches are excluded: Agor replaces Codex's system prompt, so it can't launch Codex natively.
- **Strict readings:** a nearest miss under 7.16b and 7.16c (A3).
- **Why not shortlisted:** it offers nothing Stack 1 lacks.

**S12: Stack 1 + Bernstein, routed to Codex only.** This answers the question "Bernstein as a Codex-only orchestrator, with Claude elsewhere".
- **Why Bernstein can't be the hub:**
  - Every Claude session it launches runs with a fixed `--no-session-persistence`, so no native transcript exists. Its dashboard shows tool inputs but not results. A2 fails for its Claude sessions, and there is no switch.
  - Its phone dashboard can't start a run (the "Run new task" buttons have no handler) or message a running session.
  - Sources (tag v3.22.0, 2026-10-15):
    - https://github.com/sipyourdrink-ltd/bernstein/blob/b21be2e5bee8bda56a525eb6259b089f431e8658/src/bernstein/adapters/claude.py#L478-L493
    - https://github.com/sipyourdrink-ltd/bernstein/blob/b21be2e5bee8bda56a525eb6259b089f431e8658/web/src/routes/Tasks.tsx#L589-L596
- **Verdict:** CLEARS ALL ALWAYS GATES under the binding reading.
  - Stack 1's gate table holds unchanged.
  - Bernstein adds first-class Claude→Codex create and monitor (a Claude session calls `bernstein mcp` → `bernstein_run`). Resume is a workaround (`codex exec resume`).
  - Its Codex sessions persist, so `codex resume` shows their full record.
- **Configuration:**
  - Bernstein runs natively on Windows (supported), with `cli: codex` and every `role_config.<role>.cli: codex`.
  - Codex→Claude stays Stack 1's `claude -p` / `--bg`.
  - Turn the cross-model verifier off (it calls OpenRouter by default), and pin tunnels to Tailscale.
- **Scores:**
  - F1–F10 = 15/20: Bernstein's 1.3k stars make F2 0.
  - F11 = 6/10: Bernstein's child sessions render like top-level ones, adding one point.
- **Strict readings:**
  - Bernstein's README says "Status: beta. Solo-maintained", and its GOVERNANCE.md says "single-maintainer". It passes N2 only because a second person merged five PRs from 2026-10-14. If the self-description decides, it is screened out.
  - At defaults it routes work to Claude, whose sessions keep no transcript (A2).
  - Sources: https://github.com/sipyourdrink-ltd/bernstein/blob/b21be2e5bee8bda56a525eb6259b089f431e8658/README.md#L38 · https://github.com/sipyourdrink-ltd/bernstein/pull/6475
- **Why not shortlisted:**
  - Against Stack 1, it loses 2 FAVOUR points, gains 1, and adds a beta label, a narrow N2 and a default that breaks A2.
  - On stack 4a's WSL2 base it scores 13/20 and 8/10, below 4a itself.

---

## 15. Nearest misses

| Stack / tool | Fails | Detail |
|---|---|---|
| Bernstein as the hub | A2, A1 | Its Claude workers keep no transcript. Its phone surfaces can't start a run with a chosen agent, or message a running one. Usable only routed to Codex (section 14). |
| Superset without your WSL2 assumption | C1 | No Windows build; Linux desktop "experimental and untested"; host CLI Beta/Pre-release; WSL support "not at least for a few months" (#1993). Otherwise it is stack 6. |
| cmux iPhone app + cmux-tui | Not released | Direct SSH from the cmux iPhone app to any computer (tmux or cmux-tui) is merged in source (2026-09-28) but unreleased. The released app needs a Mac and is on TestFlight only. Re-check if it ships on the App Store. |
| Docker Sandboxes as the runtime | A3 (Codex) | `sbx`'s own ChatGPT sign-in has no documented OpenAI consent, so Codex can't run inside it. It is usable only to isolate Claude sessions (variant S3+D). |
| Claude Code agent view as the hub | A1, A5 (Codex side) | Claude-only. The app can't dispatch new sessions. |
| Claude GitHub App as the hub | A1 (ii) | Runs are headless: you can't message or approve mid-run. |
| Warp (client + Remote Control) | A1 | Phone share links can't list or start sessions, and expire about weekly. |

Archon, Gas City and Superset, which were nearest misses in the first version, now clear (stacks 5, 8 and 6).

## 16. Screened out

| Candidate | Failing gate | Reason |
|---|---|---|
| Vibe Kanban | N3 | Company shut down 2026-04-10; README "Vibe Kanban is sunsetting." |
| Paseo | N2 | README: "built by one person and funded by the people who use it" (wording corrected per verification R8). |
| Happy (CLI) | N3 | Maintenance mode since 2026-10-06 (notice on the happy.engineering docs, not the README). |
| Happy Desktop / Agent | N1 | 94 and 32 stars. It also reimplements Codex and replaces Claude's prompt and tools. |
| code-server | N3, N2 | "not generally actively developing … aside from fixing regressions"; one maintainer merges everything. |
| Warp Oz (cloud) | A3 | API keys only. |
| Agent Swarm | N1 | 904 stars. |
| Scion | N2 | One person wrote 98% of commits and made all pushes. |
| Intent | N1 | Open source (Apache-2.0) since 2026-07-22; at most 342 stars. Its Windows/Linux builds are "Alpha". |
| Conductor | C1 | "Conductor always runs on your Mac". |
| Parallel Code | N2 | One person merged every PR and is behind every release. |
| Codex GitHub connector (`@codex`) | N3 | "Codex Cloud (Legacy) … We plan to deprecate this experience." |
| Blink Shell (iPhone terminal), new | N2 | No commit to its main branch in the window; one author on any branch; no PR merged since 2024-03-11. |
| wmux (openwong2kim), new | N1 | 431 stars. No successor repo. |
| wmux (amirlehmam), new | N1 | 421 stars. No successor repo. |
| cmux Mac app and iOS companion, new | C1 | "macOS only, for now". The iOS app "is a companion for your Mac". Its Linux part, cmux-tui, is admitted separately (decision 17). |

## 17. Open questions for you (answers would change the pick)

1. **Token reads.** Are you comfortable with a tool reading your Claude/ChatGPT login tokens to show usage, presenting itself as the official apps?
   - If yes, Orca or T3 Code are the strongest.
   - If no, choose Stack 1, the terminal stacks 4a/4b, or CAO (#7); none of them reads tokens. Superset reads them only from its desktop app.
2. **Repo location.** Can your repos live on `C:\`, or must they stay in WSL2's ext4 filesystem? Stacks 1, 2 and 9 assume `C:\`. Stacks 3–8 keep them in WSL2, and Termius SFTP shows them on the phone.
3. **Permission prompts.** Do you want to approve risky commands?
   - Stacks 1, 3, 4a and 4b ask by default.
   - Orca (#2), Superset (#6) and CAO (#7) can be set to ask.
   - Archon (#5), Gas City (#8) and Maestro (#9) effectively never ask.
4. **Plans.** Which plans do you have?
   - Remote Control needs Claude Pro/Max (or admin-enabled Team/Enterprise).
   - ChatGPT mobile remote control needs Plus, Pro, Business or Enterprise.
   - Superset's phone access needs Superset Pro ($20/user/month).
   - Termius's free plan covers SSH and SFTP. Pro, about $10/month, adds snippets, sync and logs.
5. **Windows version.** Windows 10 or 11? Docker Sandboxes and WSL mirrored networking need Windows 11. Mirrored networking is the simple way to reach WSL2 over SSH; on Windows 10 the WSL2 stacks need a port-forwarding rule.
6. **Cloud sessions.** Do you want cloud sessions (Claude cloud, Codex cloud) in the daily flow? They are excluded from the core stacks: Codex cloud's tool-call fidelity is unverified, it has a "Legacy" deprecation notice, and cloud work reaches the PC only as branches.
7. **Relays.** Is a vendor relay acceptable, or Tailscale only?
   - The relays: Orca Relay; T3 Connect via Cloudflare; Superset's relay, which is mandatory and has no end-to-end encryption that we found.
   - Stacks 2 and 3 assume Tailscale only. Stack 6 can't avoid Superset's relay.
8. **Beta labels.** Are "beta"-labelled tools acceptable for daily work: Orca's mobile companion, T3 Code, CAO, and Superset's Linux build? If not, see decision 6.
9. **Notifications.** None of the terminal stacks (4a, 4b, 7, 8) can push a notification when an agent waits for you. Is checking in yourself acceptable?
10. **Superset on WSL2.** You asked us to assume it works; the vendor says it doesn't yet. Would you test the CLI host in WSL2 before choosing stack 6?

**Hands-on tests that would settle open risks** (about an evening each):
- WSL keep-alive with only a detached tmux (or cmux-tui) server: stacks 3–8.
- Codex's terminal app inside Termius: stacks 4a, 4b, 7 and 8.
- Termius SFTP into the WSL2 distro over Tailscale with mirrored networking: stacks 4a–8.
- Superset's CLI host in WSL2 with the iPhone app: stack 6.
- Archon's console on an iPhone: stack 5.
- Stack 1's existing tests, from verification open questions 1–2:
  - Remote Control under Task Scheduler;
  - SMB from iOS on cellular.

## 18. Independent verification (Stage 5)

A fresh agent got only `brief.md` and this shortlist. It re-checked the claims against primary sources and tried to falsify them. The full table is in `research/verification.md`.

**Result**
- 90 claims checked: 63 CONFIRMED, 26 CONFIRMED WITH CAVEAT, 1 REFUTED, 0 UNVERIFIABLE.
- No ALWAYS or NEVER gate verdict was refuted, and the ranking is unchanged.

**The refutation.** "Stack 1 is the only stack that passes under every strict reading" was too broad. It holds for the 7.16 strict alternatives and a defaults-only reading, but not for decisions 11 and 12, which affect every stack. Corrected in sections 1 and 2.

**Caveats now folded in**
- **Orca:** add Agent Permissions → Manual, because the defaults bypass approvals for both harnesses.
- **Stack 1 and Maestro:** Codex network approvals for `claude -p`, and the future `--bare` default for `-p`.
- **Stack 1:** the SMB route is untested away from home.
- **T3 Code:** "Connect with ChatGPT" is permitted; one A5 permalink was wrong, but the claim holds.
- **Added in this update:**
  - R4: Maestro's Claude token source, and Stack 1's approval step;
  - R5: the 7.16d strict alternative;
  - R6: Orca's 7.16c reading;
  - R8: citations (Apple guide, T3 A5 permalink, Codex compression, Stack 1's F4 source, Paseo wording);
  - R9: Codex's A2 TUI route.

**Policy facts re-confirmed, with dates in `verification.md`:**
- Anthropic: `claude -p` and the Agent SDK still use subscription limits (2026-10-07); developers "may not collect, store, or intermediate" claude.ai tokens.
- OpenAI: ChatGPT sign-in is subscription access, with a documented route for open-source and local apps; "Codex Cloud (Legacy)": "We plan to deprecate this experience".

**Not yet verified.** This update added:
- stacks 4a, 4b and 5–8;
- the S12 note;
- decisions 14–20;
- the new nearest misses and screen-outs.

All of it comes from the new candidate files (`superset`, `bernstein`, `cmux`, `cli-agent-orchestrator`, `wmux-a`, `wmux-b`, `tmux`, `ios-terminal`) plus one primary-source check (Termius's iOS changelog, retrieved 2026-10-19).
