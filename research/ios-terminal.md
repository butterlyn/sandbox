# iOS terminal apps (T1 Termius, T2 Blink Shell)

- Slug: ios-terminal
- Canonical:
  - **T1 Termius** (Termius Corporation): https://termius.com · App Store https://apps.apple.com/us/app/termius-terminal-ssh-client/id549039908 · docs https://docs.termius.com
  - **T2 Blink Shell** (Blink Shell, Inc): https://github.com/blinksh/blink · https://blink.sh · App Store https://apps.apple.com/us/app/blink-shell-build-code/id1594898306
- Layer(s): client/UI (iPhone/iPad SSH/mosh terminal). This is glue the orchestrator added (7.12, 7.19) so that tmux-style stacks can be judged for A1 under 7.4.
- Open source:
  - **T1:** no. The app source is closed, and github.com/termius holds no app source.
  - **T2:** yes (GPL-3.0). However, the builds shipping now (18.7.x) have no public source (see T2 N3).
- Latest release checked:
  - **T1:** iOS/iPadOS **8.0.3**, App Store 2026-10-14 (vendor changelog dates it 2026-10-15), https://docs.termius.com/changelog/ios. Desktop 10.2.0/10.2.1, 2026-10-12, https://docs.termius.com/changelog/desktop.
  - **T2:** **18.7.1**, App Store 2026-09-17, https://apps.apple.com/us/app/blink-shell-build-code/id1594898306. GitHub has no releases ("There aren't any releases here"). The default branch `raw` is at `a90b442`, committed 2026-04-14.
- Checked: 2026-10-19 by screen-ios-terminal

## Summary
- Screen (T1 Termius): **SCREEN PASS**
- Screen (T2 Blink Shell): **SCREEN FAIL at N2**
- Deep-dive (T1 Termius only, 2026-10-19):
  - **Gates:**
    - A1 PASS (7.4, with tmux and a WSL2 keep-alive).
    - A5 PASS, configuration-scoped: SFTP browse, preview and open, live. `C:\` goes via Windows OpenSSH; WSL2 ext4 via the distro's sshd over Tailscale (mirrored networking or portproxy).
    - A2, A3, A4, A6, A7, A8: N/A (layer).
  - **FAVOUR:** F1–F10 = 11/20 (F3 2, F4 2, F5 2, F6 1, F7 2, F8 2). F11a–e = 4/10 (c 1, d 2, e 1).
  - **Setup must turn off:** Pro session logging (on by default; it records all terminal text) and the AI widget, whose data flow is undocumented.
  - **No push notification** when an agent waits.
- **Termius passes every applicable check:**
  - **N3:** seven iOS releases since 2026-08-09; the latest is 8.0.3 on 2026-10-14.
  - **N2:** Termius Corporation is an organisation. YC lists "Team Size: 35" and two founders, and the vendor is hiring a "Mobile Tech Lead/ Architect (iOS & Android)".
  - **C1:** one universal iPhone/iPad app (iOS 17+) plus a Windows desktop app. It reaches the PC through Windows' built-in OpenSSH Server over Tailscale.
  - **A1, under 7.4 (generic terminal) with tmux in WSL2:**
    - `tmux ls` lists sessions, and `tmux attach` shows the live `claude` or `codex` TUI.
    - The user can type and answer prompts with Esc, Ctrl, arrow keys and Shift+Tab (which Termius added "for Claude Code and other AI tools").
    - The user can start `claude` or `codex` in a chosen repo.
  - N1 does not apply (closed source). A3 and A4 are N/A (layer).
- **Blink passes N3 only on its App Store releases:**
  - The public repo has no commit to `raw` since 2026-04-14, and no commit on any branch since 2026-06-29.
  - It has never published a GitHub release.
  - 18.7.0 (2026-08-30) and 18.7.1 (2026-09-17) shipped with no public source.
  - Under a strict reading that counts only releases traceable to the repo, Blink would fail at N3 instead. Either way it is screened out.
- **Blink fails N2:**
  - `raw` has 0 commits in the 2026-04-22 → 2026-10-19 window.
  - Carlos Cabanero is the only author on any branch (7 commits). No PR has been merged since 2024-03-11, and the org shows one public member.
  - The top all-time author, Yury Korolev, last committed on 2023-09-25.
  - N1 passes (7.0k stars), but C1, A1 and A3/A4 were not assessed (7.11).
- **Termius's A1 value depends on other components:**
  - tmux must pass its own screen.
  - WSL2 must not idle-stop the distro: `.wslconfig` `instanceIdleTimeout=-1`, which Microsoft documents as "disable auto shutdown".
  - iOS suspends Termius in the background "usually within 20 to 30 seconds", so the user reconnects and re-attaches.
  - No notification is documented for an agent waiting on a prompt.
  - Termius's documentation names Claude Code, never Codex. Codex is an ordinary terminal UI.
- **Credentials:**
  - Termius never touches Claude or ChatGPT credentials. Those stay with the CLIs on the PC.
  - It does keep and sync SSH credentials (E2E-encrypted; sync can be turned off).
  - By default on Pro, it records "Anything that appears in your terminal as plain text" into E2E-encrypted session logs.
  - Do vendor logins on the PC, or disable logging for the vault.
- **Mosh:**
  - Mosh needs `mosh-server` inside WSL2, since there is none behind Windows OpenSSH.
  - mosh is unscreened and has not released since 1.4.0 (2022-10-31).
  - Plan on SSH + tmux. Moshi is a lead for an agent-focused iOS terminal (unscreened).

## Screen

### T1: Termius (closed source)

| ID | Verdict | Evidence (short quote or exact paraphrase) | Source URL | Source date |
|----|---------|---------------------------------------------|------------|-------------|
| N3 | PASS | **(a) Archived:** not applicable (closed source). github.com/termius holds no app source. Its `termius-cli` ("CLI for the ssh client Termius") is archived, but it is a separate, retired CLI, not the app screened here.<br>**(b) Notices:** none for the iOS/iPadOS app in the App Store listing, the docs or the changelog. Only features are deprecated, e.g. 7.3.1: "SOCKS4 proxy support has been deprecated".<br>**(c) Release in 90 days:** the App Store version history shows, all inside 2026-07-21 → 2026-10-19:<ul><li>8.0.3 and 8.0.2: 2026-10-14 ("new terminal rendering engine, powered by libghostty")</li><li>7.9.0: 2026-09-30</li><li>7.8.0: 2026-09-15</li><li>7.7.0: 2026-09-06</li><li>7.6.1: 2026-09-02</li><li>7.6.0: 2026-08-09</li></ul>The vendor iOS changelog dates 8.0.3 at 2026-10-15. The desktop changelog has 10.2.0/10.2.1 on 2026-10-12. | https://apps.apple.com/us/app/termius-terminal-ssh-client/id549039908 · https://docs.termius.com/changelog/ios · https://docs.termius.com/changelog/desktop · https://github.com/termius | 2026-10-14 · 2026-10-15 · 2026-10-12 · retrieved 2026-10-19 |
| N1 | N/A (closed source) | The iOS/iPadOS and desktop apps are closed. github.com/termius holds hosts-farm (Docker SSH test servers), a Flatpak packaging fork (`com.termius.Termius`), the archived `termius-cli` and various forks. It states "This organization has no public members". Per 7.3, N1 and F2 do not apply. | https://github.com/termius | retrieved 2026-10-19 |
| N2 | PASS | Closed-source test (7.3): the vendor is an organisation with ≥2 people on the product.<ul><li>**App Store:** the seller and author is the Organization "Termius Corporation".</li><li>**About page:** Roman Kudiyarov, "Founder/CEO of Termius". Offices in San Francisco and Auckland. Timeline: "Company Founded" Nov 2019, "YC Accelerator" Dec 2019, "Profitable" Nov 2022.</li><li>**YC directory:** "Team Size:35"; founders Roman Kudiyarov and Dmitry Lyfar; status "Active".</li><li>**Vendor job board:** "Mobile Tech Lead/ Architect (iOS & Android)" (team Termius), "Senior Product Engineer (Desktop)" (team Termius), "Senior Software Engineer (Rust)" (team Gloria).</li></ul> | https://apps.apple.com/us/app/termius-terminal-ssh-client/id549039908 · https://termius.com/about · https://www.ycombinator.com/companies/termius · https://jobs.lever.co/Termius | 2026-10-14 · undated, retrieved 2026-10-19 · undated, retrieved 2026-10-19 · undated, retrieved 2026-10-19 |
| C1 | PASS | **iPhone/iPad:** one App Store app. "Requires iOS 17.0 or later. Compatible with iPhone, iPad, and iPod touch"; iPad "Requires iPadOS 17.0 or later".<br>**Windows PC:** Termius also has a Windows desktop app ("Download Termius.exe … Run the installer"), so the same hosts and snippets work on the PC.<br>**PC-side server (a given, 7.12):** Windows' built-in OpenSSH Server. It "Applies to: … ✅ Windows 11, ✅ Windows 10" and needs "Windows 10 (build 1809)". `Set-Service -Name sshd -StartupType 'Automatic'` keeps it running unattended, and installing it creates the firewall rule `OpenSSH-Server-In-TCP` for port 22.<br>**Into WSL2:** set the shell with the `DefaultShell` registry value ("the full path to the shell executable"), or run `wsl --distribution <Name>` after connecting. Running `wsl` inside an SSH session used to fail (microsoft/WSL#7900). That issue was closed as fixed on 2025-02-18: "Please install and use the latest version of WSL". Alternatively, run `sshd` inside WSL2: mirrored networking (Windows 11 22H2+) plus a Hyper-V firewall inbound rule makes WSL reachable "directly from your local area network".<br>**Network:** Tailscale (screened PASS in `tailwind.md`) carries SSH over the tailnet.<br>**Unattended:** the PC side (the sshd service, tmux in WSL2) runs unattended. The iOS app is foreground-only (see A1). | https://apps.apple.com/us/app/termius-terminal-ssh-client/id549039908 · https://docs.termius.com/getting-started/download-termius · https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse · https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh-server-configuration · https://learn.microsoft.com/en-us/windows/wsl/basic-commands · https://github.com/microsoft/WSL/issues/7900 · https://learn.microsoft.com/en-us/windows/wsl/networking | 2026-10-14 · undated, retrieved 2026-10-19 · updated 2026-09-08 · updated 2025-08-05 · updated 2026-06-02 · closed 2025-02-18 · updated 2026-06-02 |
| A1 | PASS (7.4 generic terminal, with tmux) | All three 7.4 conditions hold.<br>**(1) N1–N3:** N3 and N2 PASS; N1 does not apply.<br>**(2) Persistence:** tmux "may be detached from a screen and continue running in the background, then later reattached" (tmux is a separate component). WSL2 shuts down an idle distro after `instanceIdleTimeout`: "15000 … Set to -1 to disable auto shutdown". The stack must set this (setup step).<br>**(i) List and read:**<ul><li>`tmux ls`: "List all sessions managed by the server".</li><li>`tmux attach -t <name>` shows the live TUI, with tool calls as the TUI renders them.</li><li>Recent sessions: `claude --resume` ("show an interactive picker to choose a session") and `codex resume` ("Continue a previous interactive session by ID or resume the most recent chat").</li></ul>**(ii) Message and approve:** type into the attached TUI.<ul><li>Extended keyboard: "Ctrl, Esc, Tab, and other modifier keys · Arrow keys · Function keys".</li><li>Hardware keyboard: "Ctrl, Alt, Esc, Tab, arrow keys, and function keys (F1–F10) behave as expected".</li><li>6.3.0 "Added Shift+Tab to the additional keyboard in Terminal, enabling actions for Claude Code and other AI tools".</li><li>6.3.3 added an input field that "supports speech-to-text, lets you speak to CLI coding agents".</li></ul>**(iii) Start in a chosen repo:**<ul><li>`tmux new -A -s <name> -c <repo> claude` (or `codex`), using `new-session [-c start-directory] … [shell-command]`.</li><li>On Pro, a startup snippet "runs automatically every time you connect": "open a directory … or attach to an existing tmux session".</li><li>6.3.3: "Configure Gemini, Claude Code, OpenCode, etc. on your hosts, and an AI agent will start automatically when you connect".</li></ul>**Both harnesses:** Termius names Claude Code, not Codex. `codex` is a plain terminal UI ("Launch the terminal UI"), so the same path applies, but no source shows Codex specifically working in Termius (Open questions).<br>**Mosh:** supported on every plan, including the free Starter plan ("Mosh 1.3.0 and newer versions are supported"). It "must be installed and configured separately on your host system", which here means `mosh-server` in WSL2: there is none on Windows OpenSSH. Mosh sessions are not session-logged.<br>**Background:** "Recent versions stop background activity almost immediately, usually within 20 to 30 seconds". With location tracking, "background connections are less likely to be interrupted". "screen or tmux can preserve your terminal session if the connection drops".<br>**iPad:** universal app with a "multi-tab interface and split-view support" (see F4).<br>**Notifications:** none documented for an agent awaiting approval. | https://github.com/tmux/tmux/blob/c8427d6be82364823326b49d90d73952e4f63881/README#L4-L5 · https://github.com/tmux/tmux/blob/c8427d6be82364823326b49d90d73952e4f63881/tmux.1#L1289-L1296 · https://github.com/tmux/tmux/blob/c8427d6be82364823326b49d90d73952e4f63881/tmux.1#L1091-L1097 · https://github.com/tmux/tmux/blob/c8427d6be82364823326b49d90d73952e4f63881/tmux.1#L1329-L1352 · https://learn.microsoft.com/en-us/windows/wsl/wsl-config · https://code.claude.com/docs/en/cli-reference · https://developers.openai.com/codex/cli/reference · https://docs.termius.com/terminal/mobile-terminal · https://docs.termius.com/changelog/ios · https://docs.termius.com/terminal/snippets · https://docs.termius.com/organize-and-connect-to-hosts/connecting-to-a-server · https://docs.termius.com/organize-and-connect-to-hosts/session-logs · https://docs.termius.com/help-center/faq/how-can-i-keep-termius-sessions-alive-in-the-background-on-ios-ipados · https://apps.apple.com/us/app/termius-terminal-ssh-client/id549039908 | 2026-10-19 (tmux HEAD) · updated 2026-10-16 · undated, retrieved 2026-10-19 (Claude, Codex, Termius docs) · 6.3.0 2025-08-25, 6.3.3 2025-10-09 · 2026-10-14 |
| A3 | N/A (layer) | Termius runs no harness and never handles Claude or ChatGPT credentials. The `claude` and `codex` CLIs run on the PC under their own stored logins, and Termius only carries keystrokes and screen output over SSH.<br>**What it stores:** its vault holds SSH credentials ("Usernames, passwords, SSH keys, and identities"), end-to-end encrypted ("Your encryption password … never sent over the network"). Credential sync can be switched off with the "Sync keys and identities" toggle.<br>**Caveats (not A3 issues):**<ul><li>Session logs capture "Anything that appears in your terminal as plain text". They are "protected by the same end-to-end encryption", on by default ("Session logging is enabled by default for all vaults"), Pro only, and skip Mosh sessions.</li><li>In AI mode, selected terminal text "will be passed to the AI widget along with the prompt".</li></ul>So do `claude /login` and `codex login` on the PC, or disable logging for that vault. | https://docs.termius.com/keychain/sync-of-keys-and-passwords · https://docs.termius.com/security/encryption-overview · https://docs.termius.com/organize-and-connect-to-hosts/session-logs · https://docs.termius.com/terminal/mobile-terminal | undated, retrieved 2026-10-19 |
| A4 | N/A (layer) | Runs no harness. The agents are the unmodified TUIs on the PC.<ul><li>Termius's own AI widget generates shell commands ("for generating commands from natural-language prompts"). It is not a coding-agent harness and is optional ("Hide the AI widget").</li><li>The 6.3.3 option makes "an AI agent … start automatically when you connect", with the agent "on your hosts". The vendor blog (a lead, not evidence) shows it as a host Startup Command, `cd ~/my-project/src && claude`.</li></ul> | https://docs.termius.com/terminal/mobile-terminal · https://docs.termius.com/changelog/ios · https://termius.com/blog/8-tips-for-using-ai-agents-on-mobile-in-termius (lead) | undated, retrieved 2026-10-19 · 2025-10-09 · 2026-05-11 (lead) |

### T2: Blink Shell (open source, GPL-3.0)

| ID | Verdict | Evidence (short quote or exact paraphrase) | Source URL | Source date |
|----|---------|---------------------------------------------|------------|-------------|
| N3 | PASS (on App Store releases; strict alternative FAIL) | **(a) Archived:** no archived banner; GPL-3.0, 3,278 commits.<br>**(b) Notices:** none in the README, on blink.sh ("© 2016-2025 Blink Shell is developed by The Blink Shell Project") or in the App Store notes. 18.7.1 says "A new version is coming".<br>**(c) Applied exactly** ("no non-bot commit to the default branch **and** no release in the last 90 days"; window 2026-07-21 → 2026-10-19):<ul><li>No commit to `raw` in the window. HEAD is `a90b442` "Created Default style", authored 2026-04-13 and committed 2026-04-14.</li><li>**But** the App Store shipped 18.7.0 (2026-08-30) and 18.7.1 (2026-09-17). There is a release, so (c) does not trigger.</li></ul>**Caveat: no public source matches those releases.**<ul><li>The newest commit on any branch is `c1b07ea` "v18.6.3 build 2009" (branch `v18.6.0`, 2026-06-29).</li><li>No 18.7 branch, tag or commit exists.</li><li>The releases page says "There aren't any releases here", and the newest tag is v13.5.2 (2020-06-30).</li><li>The 18.7.0 notes say "the session engine, the layout manager and the appearance system — were rebuilt from the ground up". None of that is in the repo.</li></ul>**Strict alternative:** if only releases traceable to the public repo count, N3 is FAIL under (c). | https://github.com/blinksh/blink · https://github.com/blinksh/blink/commit/a90b4423c8b7a86770c24a7eaa6c13b0a5904b18 · https://github.com/blinksh/blink/commit/c1b07ea97ac94f2ada190f7d6554f81502774a77 · https://github.com/blinksh/blink/releases · https://apps.apple.com/us/app/blink-shell-build-code/id1594898306 · https://blink.sh | retrieved 2026-10-19 · 2026-04-14 · 2026-06-29 · retrieved 2026-10-19 · 2026-09-17 · undated, retrieved 2026-10-19 |
| N1 | PASS | blinksh/blink, the repo that holds the app source: 7.0k stars, 758 forks, GPL-3.0. | https://github.com/blinksh/blink | retrieved 2026-10-19 |
| N2 | FAIL | Window 2026-04-22 → 2026-10-19 on default branch `raw` (blobless clone; `git ls-remote --symref` gives HEAD → `raw`): **0 commits**.<ul><li>**All branches:** 7 commits, all by Carlos Cabanero (carlos@blink.sh) as author and committer, on release branch `v18.6.0` (2026-04-23 → 2026-06-29).</li><li>**Merges:** no PR has been merged on GitHub since #1985 (2024-03-11). The last outside contributions (Jiefeng Xu, Chris Lloyd; Jan–Feb 2026) were committed or merged by Carlos, before the window.</li><li>**Releases:** none on GitHub. App Store releases are published by "Blink Shell, Inc" and name no human.</li><li>**Second human:** Yury Korolev (2,342 commits on `raw` all-time, the top author) last committed on 2023-09-25 (`35516a7`). The blinksh org shows 1 public member (carloscabanero). In #2253 and #2232, maintainer replies come only from carloscabanero, e.g. "I'm gonna bring this back until I release the new Intents" (2026-09-14).</li></ul>The project does not call itself one person's (blink.sh: "The Blink Shell Project", "we"). However, under 7.3 "no second human meets any PASS condition" → FAIL. Reading it as closed source, since 18.7.x has no public source, would give at best UNKNOWN: there is no team page and only one maintainer is visible. | https://github.com/blinksh/blink/commits/raw · https://github.com/blinksh/blink/pulls?q=is%3Apr+is%3Amerged · https://github.com/orgs/blinksh/people · https://github.com/blinksh/blink/issues/2253 · https://github.com/blinksh/blink/issues/2232 · https://blink.sh | retrieved 2026-10-19 · retrieved 2026-10-19 · retrieved 2026-10-19 · last maintainer comment 2026-09-17 · last comment 2026-08-21 · undated, retrieved 2026-10-19 |

Screening of T2 stopped at N2, its first hard fail (7.11). C1, A1, A3 and A4 were not assessed. Blink is screened out and cannot be used even as glue (7.12).

## Facts for stack composition
These are not gates. The verdicts are this screen's indicative reading, to be re-checked at Stage 4. Under 7.4, the terminal app earns F3/F4 only on its own merits. Only Termius is usable.

| ID | Fact | Indicative | Source URL | Source date |
|----|------|------------|------------|-------------|
| F3 | Termius is an App Store app (Termius Corporation) that reaches the stack's agent sessions through SSH into tmux. Blink would also qualify, but it is screened out (N2). | PASS (Termius) | https://apps.apple.com/us/app/termius-terminal-ssh-client/id549039908 | 2026-10-14 |
| F4 | Termius iPad layout:<ul><li>6.0.0: "**iPad:** A new Desktop-like layout with tabs at the top".</li><li>The side panel "on iPad … appears on the right side of the screen".</li><li>"multi-tab interface and split-view support".</li><li>Hardware keyboards ("Apple's Magic Keyboard and Smart Keyboard for iPad"), with Ctrl, Alt, Esc, Tab and arrow keys working.</li></ul> | PASS (Termius) | https://docs.termius.com/changelog/ios · https://docs.termius.com/terminal/mobile-terminal · https://apps.apple.com/us/app/termius-terminal-ssh-client/id549039908 | 2025-02-21 (6.0.0) · undated, retrieved 2026-10-19 · 2026-10-14 |
| F5 | Termius is the iPhone/iPad route to "attaching to the TUI's tmux pane" (7.10) and to `claude --resume` / `codex resume` with the same history. F5 itself is scored on whichever component launches the sessions (tmux, or an orchestrator that uses tmux, such as CAO or Gas City). | Enables F5 from iPhone/iPad; no score of its own | https://github.com/tmux/tmux/blob/c8427d6be82364823326b49d90d73952e4f63881/tmux.1#L1091-L1097 · https://code.claude.com/docs/en/cli-reference · https://developers.openai.com/codex/cli/reference | 2026-10-19 · undated, retrieved 2026-10-19 |
| Other (A5/F6/F7/F8), not asked | **Files (M1 → M2):**<ul><li>SFTP on iOS/iPadOS: multiple SFTP tabs, drag and drop from the Files app, and an Upload button.</li><li>Pasted images and files upload "in the background over SFTP to `/tmp`", and the "path is inserted into your terminal automatically" (7.5.0; Mosh sessions from 7.8.0). That lands phone files in an agent prompt (F8).</li></ul>**Dev servers (F6):** local port forwarding can open a PC dev server on the phone. However, tmux does "not help if the app goes to the background while port forwarding is active". Tailscale Serve is the sturdier F6 path. | Partial contributions; verify at Stage 4 | https://docs.termius.com/organize-and-connect-to-hosts/managing-files-with-sftp · https://docs.termius.com/terminal/mobile-terminal · https://docs.termius.com/organize-and-connect-to-hosts/port-forwarding-and-tunneling · https://docs.termius.com/help-center/faq/how-can-i-keep-termius-sessions-alive-in-the-background-on-ios-ipados | undated, retrieved 2026-10-19 |
| Setup | Numbered steps for any Termius + tmux stack:<ol><li>Windows OpenSSH Server set to Automatic, or `sshd` in WSL2 with mirrored networking.</li><li>`.wslconfig` `[general] instanceIdleTimeout=-1`.</li><li>One tmux session per agent, e.g. `tmux new -A -s <name> -c <repo> claude` (or `codex`), optionally as a Termius startup snippet (Pro).</li><li>Vendor logins on the PC, or Termius session logging off for that vault.</li><li>Mosh only if `mosh-server` in WSL2 passes screening.</li></ol>**Cost:** SSH, SFTP and Mosh are on the free Starter plan; startup snippets, session logs and sync need Pro ($10/month, billed annually). | — | https://learn.microsoft.com/en-us/windows/wsl/wsl-config · https://termius.com/pricing | updated 2026-10-16 · undated, retrieved 2026-10-19 |

## Deep-dive (T1 Termius only)

Checked 2026-10-19 by deepdive-ios-terminal, against Termius iOS/iPadOS 8.0.3. Blink is screened out (N2), so only Termius is assessed. Termius is a client-layer component: it creates no sessions and runs no harness. It reaches sessions that tmux, or an orchestrator using tmux, keeps alive on the PC.

### ALWAYS gates (component level)

| ID | Verdict | Evidence (short quote or exact paraphrase) | Source URL | Source date |
|----|---------|---------------------------------------------|------------|-------------|
| A1 | PASS (7.4 generic terminal, with tmux; configuration-scoped) | **Provides:** the screen's evidence still holds. `tmux ls` lists sessions (i); attaching to a session and typing into it covers (ii), with Esc, Ctrl, arrow keys and Shift+Tab "for Claude Code and other AI tools"; `tmux new -A -s <n> -c <repo> claude\|codex` starts one (iii).<br>**Limits found in the deep-dive:**<ul><li>iOS "stop[s] background activity almost immediately, usually within 20 to 30 seconds", so the user re-attaches on return.</li><li>With location tracking on, "background connections are less likely to be interrupted".</li><li>No documented push notification: the only related change is the terminal-bell sound following system volume, in iOS 4.6.1.</li><li>The vendor names Claude Code, Gemini and OpenCode, never Codex. Codex-specific rendering under the 8.0.3 libghostty engine is unconfirmed (open question).</li></ul>**Needs from partners:**<ul><li>tmux, with a WSL2 keep-alive (`instanceIdleTimeout=-1`; see tmux.md);</li><li>an SSH server: Windows OpenSSH set to Automatic, or the WSL2 distro's sshd (7.20);</li><li>Tailscale.</li></ul> | https://docs.termius.com/help-center/faq/how-can-i-keep-termius-sessions-alive-in-the-background-on-ios-ipados · https://docs.termius.com/changelog/ios · https://docs.termius.com/terminal/mobile-terminal | undated, retrieved 2026-10-19 · 8.0.3 2026-10-15 |
| A2 | N/A (layer) | Attached, Termius shows the native TUI, including tool calls as the TUI renders them. It is not a transcript store:<ul><li>session logs "can only be viewed on macOS, Windows, or Linux";</li><li>by default it keeps "one recent log per host, and each new session replaces it".</li></ul>A2 rests on the harnesses' JSONL plus `claude --resume`, `codex resume` or a viewer. Termius only adds visibility on the iPhone. | https://docs.termius.com/organize-and-connect-to-hosts/session-logs | undated, retrieved 2026-10-19 |
| A3 / A4 | N/A (layer) | As in the screen: no harness, no Claude or ChatGPT credentials. (Privacy notes below.) | — | — |
| A5 | PASS (configuration-scoped) | **Phone → PC files, live:**<ul><li>Termius SFTP browses remote folders on mobile ("Mobile lets you open multiple SFTP tabs"; refresh from the path bar).</li><li>Files open in a full-screen preview (iOS 7.3.0: "Changed the files preview style in SFTP to full screen").</li><li>"Press and hold the file, then choose an app to edit it".</li></ul>SFTP reads the host filesystem directly, with no sync step, so new and uncommitted files appear. Hidden files are off by default ("Termius doesn't show hidden files and folders by default"), and a "Show Hidden Files" action exists.<br>**`C:\` workspaces:** Windows OpenSSH serves SFTP: `ChrootDirectory` "is only supported with SFTP sessions". Termius fixed "an issue in SFTP that didn't allow selecting other drives on Windows" (7.3.1).<br>**WSL2 ext4 workspaces:** SFTP to the distro's own sshd (a given, 7.20), reached over Tailscale through mirrored networking (Windows 11 22H2+) or a portproxy (see tailwind.md, F6 rows). Browsing `\\wsl.localhost` through Windows OpenSSH's SFTP is undocumented (UNKNOWN), so don't rely on it.<br>**PC → phone direction:** all agent work runs on the PC, and files uploaded from the phone land in the PC workspace (F8). | https://docs.termius.com/organize-and-connect-to-hosts/managing-files-with-sftp · https://docs.termius.com/changelog/ios · https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh-server-configuration · tailwind.md | undated, retrieved 2026-10-19 · 7.3.0 2025-12-08; 7.3.1 2025-12-22 · ms.date 2025-08-05 |
| A6 / A7 / A8 | N/A (layer) | Creates no sessions and stores no transcripts. It lets the user reach sessions that agents or orchestrators create in tmux. | — | — |

### FAVOUR scores (component)

| ID | Verdict | Points | Evidence | Source URL | Source date |
|----|---------|--------|----------|------------|-------------|
| F3 | PASS | 2 | App Store app from Termius Corporation. | https://apps.apple.com/us/app/termius-terminal-ssh-client/id549039908 | 2026-10-14 |
| F4 | PASS | 2 | 6.0.0: "iPad: A new Desktop-like layout with tabs at the top". "multi-tab interface and split-view support". Hardware-keyboard keys work. The side panel "appears on the right side" on iPad. | https://docs.termius.com/changelog/ios · https://docs.termius.com/terminal/mobile-terminal | 2025-02-21 · undated |
| F5 | PASS (with tmux) | 2 | Attaching to the TUI's tmux pane is the 7.10 F5 route. `claude --resume` and `codex resume` also run from the phone with the same history. | tmux.md (tmux.1 L1089–L1345) · https://code.claude.com/docs/en/cli-reference · https://developers.openai.com/codex/cli/reference | 2026-10-08 · undated |
| F6 | PARTIAL | 1 | Termius local port forwarding can open a PC dev server, but only in the foreground: tmux and screen "do not help if the app goes to the background while port forwarding is active". Tailscale Serve is the sturdier F6 path. | https://docs.termius.com/help-center/faq/how-can-i-keep-termius-sessions-alive-in-the-background-on-ios-ipados | undated |
| F7 | PASS | 2 | **PC file on phone:** SFTP full-screen preview, or press-and-hold to open it in another app (e.g. a code editor).<br>**Phone file on PC:** upload it, then it opens on the PC. | https://docs.termius.com/organize-and-connect-to-hosts/managing-files-with-sftp · https://docs.termius.com/changelog/ios | undated · 2025-12-08 |
| F8 | PASS | 2 | **Phone → PC:** "Tap the Upload button"; "Drag a file from the Files app and drop it onto the Termius window with the active SFTP session"; 7.8.0 "Paste, drag and drop, use the paperclip button, or use the system share dialog to quickly upload a file to the host". Pasted files go "over SFTP to /tmp" with the path inserted into the terminal (screen).<br>**PC → phone:** "Download … to the Termius > Download folder on the device"; "the Transfers section is synced with the Termius > Downloads folder on the device"; tap a transfer "to open it in one of the apps". | https://docs.termius.com/organize-and-connect-to-hosts/managing-files-with-sftp · https://docs.termius.com/changelog/ios | undated · 7.8.0 2026-09-14 |
| F1, F2, F9, F10 | N/A (layer) | 0 | No harness (F1). Closed source, so F2 does not apply. No session environments (F9). No vendor-desktop-app sessions (F10). | — | — |
| **F1–F10** | | **11/20** | | | |
| F11a | FAIL | 0 | Cannot spawn sessions; agents or orchestrators do that through tmux. | — | — |
| F11b | FAIL | 0 | No parent linkage. `tmux ls` lists sessions flat. | — | — |
| F11c | PARTIAL | 1 | A delegated session running as a TUI in tmux shows its tool calls exactly as a top-level session does when attached. Headless children (`codex exec`, `claude -p`) show nothing live. tmux scrollback defaults to 2,000 lines (tmux.md). | tmux.md | 2026-10-08 |
| F11d | PASS (TUI-mode delegations) | 2 | Attach, type, Esc or Ctrl-C to interrupt, or take over in the native TUI. | https://docs.termius.com/terminal/mobile-terminal | undated |
| F11e | PARTIAL | 1 | c and d work from iPhone and iPad; a and b do not exist in this component. | — | — |
| **F11** | | **4/10** | | | |

### Privacy and security (Termius primary docs, retrieved 2026-10-19, undated)

**Session logs**
- "Session logging is enabled by default for all vaults", and covers SSH, Telnet, serial and local terminals.
- "Anything that appears in your terminal as plain text" is captured, except hidden password prompts.
- "Session logs are protected by the same end-to-end encryption as the rest of your data".
- iOS records and syncs them in the background; they "can only be viewed on macOS, Windows, or Linux".
- Logging can be disabled per vault only (Settings → Logs), and "Disabling logging deletes all logs in the vault, including bookmarked ones".
- New sessions aren't recorded on the Starter plan, and "Mosh sessions are not recorded".
- Source: https://docs.termius.com/organize-and-connect-to-hosts/session-logs

**Vault encryption**
- Uses Libsodium 1.0.20: "X25519 key exchange, XSalsa20 stream cipher, and Poly1305 MAC", Argon2id password hashing, and modified SRP6a authentication.
- "The encryption key and key pair are stored on devices" (iOS Keychain).
- The encryption password is "never sent over the network"; "No one can read data in the Personal vault without the encryption password".
- Source: https://docs.termius.com/security/encryption-overview

**Sync and accounts**
- Syncing needs an account and a subscription: "You can log out and use Termius locally without one".
- The "Sync keys and identities" toggle keeps credentials "only kept locally". Biometric SSH keys "never leave your device".
- Sources: https://docs.termius.com/help-center/faq/why-am-i-required-to-create-an-account.md · https://docs.termius.com/keychain/sync-of-keys-and-passwords.md

**AI widget**
- Selected terminal text "will be passed to the AI widget along with the prompt".
- The provider, data flow and retention are undocumented (UNKNOWN). It can be hidden ("Hide the AI widget").
- Source: https://docs.termius.com/help-center/faq/how-can-i-hide-the-ai-widget

**Turn off as setup steps**
1. Session logging for the vault that holds the PC host. Without it, terminal output, including agent output and any secrets printed, is recorded.
2. The AI widget, and any Termius AI agent feature.
3. Optionally key sync ("Sync keys and identities" off) or a device-bound biometric key.
4. Do vendor logins (`claude /login`, `codex login`) on the PC rather than through Termius while logging is on.
5. Location tracking: optional, trading location data for background resilience.

### Usability limits
- **Backgrounding.** iOS suspends Termius in about 20–30 s, so sessions drop and tmux keeps the agents running. On return the user reconnects and re-attaches. A Pro startup snippet can run `tmux new -A -s main` automatically on connect (screen).
- **Reconnect.** The current docs have no iOS auto-reconnect statement. A 2023 vendor blog post describes auto-reconnect (lead only).
- **Notifications.** None documented for an agent waiting on input, only the terminal-bell sound (iOS 4.6.1), so the user must check in. The unscreened lead Moshi advertises webhook push notifications for Claude Code and Codex.
- **iPad.** Split View keeps Termius open beside another app, e.g. a browser on a Tailscale Serve URL.

### Stack fit
- **Minimal terminal stack:**
  - Termius on the iPhone/iPad, over Tailscale, into one of:
    - Windows OpenSSH set to Automatic, with `DefaultShell` = `wsl.exe` or running `wsl -d <distro>`;
    - the WSL2 distro's sshd with mirrored networking.
  - Then tmux (with a WSL2 keep-alive), running the unmodified `claude` and `codex` TUIs on their own logins.
  - Files (A5, F7, F8) go through Termius SFTP to the same host; dev servers (F6) through Tailscale Serve.
  - No component reads Claude or ChatGPT credentials. Termius session logging must be off.
- **With CAO:** CAO runs each agent in its own tmux session, so Termius can list and attach to them, giving F11c/d/e for CAO's workers from the phone. Whether CAO uses the default tmux socket is an open question.
- **With cmux-tui:** usable through Termius if it supports detach and re-attach from another terminal; otherwise run it inside tmux (see cmux.md).
- **Conflicts:**
  - Termius is not a VPN, so iOS's one-VPN limit doesn't clash with Tailscale.
  - Prefer Tailscale Serve over Termius port forwarding, which dies in the background.
  - Pro (about $10/month, billed annually) is needed for startup snippets, sync and session logs. Starter has SSH, SFTP and Mosh.

## Open questions
- **Deep-dive: does Windows OpenSSH's SFTP expose `\\wsl.localhost\<distro>` paths?**
  - Why it matters: if it does, WSL2 ext4 workspaces could be browsed without running sshd inside WSL2. Until settled, use the distro's sshd (7.20) plus mirrored networking or a portproxy.
- **Deep-dive: which tmux socket and server do CAO and Gas City use** (default, or `-L`/`-S`)?
  - Why it matters: it decides whether a plain `tmux ls` from Termius sees their sessions (F11c/d/e for workers).
- **Deep-dive: the AI widget's provider, data flow and retention are undocumented.** Keep it hidden until Termius documents them.
- **Deep-dive: where session logs are stored** (device and cloud). Docs say only that they are E2E-encrypted and synced. Logging should be off regardless.
- **Blink N3: does an App Store release with no public source count as a "release" under 7.3(c)?**
  - This screen counts it, so N3 is PASS.
  - If not, N3 is FAIL and the outcome becomes `SCREEN FAIL at N3`. Blink is screened out either way.
- **Blink N2: would a second developer at Blink Shell, Inc. change the verdict?**
  - It would become PASS only if a primary source shows a second human merging others' PRs or publishing releases in the window, e.g. once the 18.7/18.8 source reaches `raw`.
  - C1 and A1 would then need checking. Lead: Claude Code's ⏺ glyph misalignment (#2232) was reported fixed in the 18.7.0 TestFlight build 2045. The maintainer says the "endgame" is a different terminal engine.
- **Codex in Termius.**
  - No vendor source names Codex. A hands-on check of the `codex` TUI (key handling and rendering under the libghostty engine in 8.0.x) would confirm A1 (ii) for Codex.
  - If it fails, Termius's A1 drops to PARTIAL for Codex.
- **WSL2 lifetime.**
  - Does tmux in WSL2 stay alive with no SSH client attached? This depends on the user's WSL version and the `instanceIdleTimeout` (default 15 s) and `vmIdleTimeout` (60 s) settings.
  - It decides 7.4's persistence condition for every tmux stack. It belongs to the tmux screen and the Stage 4 setup.
- **mosh-server is a PC-side component, not a given (7.12).**
  - Lead: mosh's master was last committed 2026-03-22, and the last release was `mosh-1.4.0` (2022-10-31). It would likely fail N3 under 7.3(c).
  - mosh-server also cannot run behind Windows OpenSSH, and its UDP needs mirrored networking into WSL2.
  - Stacks should rely on SSH reconnect plus tmux re-attach, not mosh.
- **No agent notifications.**
  - Neither app documents a push notification when an agent awaits approval. The user must open the app and attach.
  - This does not affect A1, but it hurts phone-first use.
- **Lead, unscreened: Moshi** ("Moshi: herdr/tmux on SSH/MOSH", seller Moshi Tech Limited, App Store id6757859949).
  - Latest version 4.0.3 (~2026-10-17); iPhone, iPad and Apple Watch, iOS 18+.
  - "A mobile terminal designed for Claude Code, Codex, and more", with webhook push notifications, "Tmux shortcuts" and on-device Whisper voice input.
  - It is better suited to agent work if it clears N2 (closed source, so it needs an organisation of ≥2 people) and N3. It carries the same mosh-server caveat.
  - Moshpit (id6799896801, "Terminal for Agents") is a weaker lead.
