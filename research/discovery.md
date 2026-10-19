# Discovery: candidates not on the user's list

- Checked: 2026-10-19 by discover-candidates
- Excluded as givens or already listed: everything in brief section 1, Obsidian Sync, the Claude Code CLI and the Codex CLI. Brief §7.1 reads "Tailwind" as Tailscale, so Tailscale is not proposed. §7.1 also places Claude Remote Control and the Claude iOS/iPadOS app under `claude-desktop`. Verdicts follow the binding rules in brief §7.2 (A5–F8) and §7.6 (A3/A4/F1).
- Method: I surveyed about 25 options (web search, official sites, READMEs), then checked the top picks against primary sources only.
- Access limits in this session, handled as brief §7.0 says: no `api.github.com` and no `add_repo`. Star counts come from the github.com repo page via WebFetch (retrieved 2026-10-19). Maintainer and activity data come from git history fetched over the proxy (treeless shallow or sparse clones, read only, nothing run). Contributor counts did not render on the GitHub pages.

---

## 1. Proposed candidates

### 1.1 Happy, using the original CLI with the iOS app (slug `happy`)

- Canonical: https://github.com/slopus/happy · https://happy.engineering
- owner/repo: `slopus/happy`. This monorepo holds `happy-app` (Expo app for iOS, Android and web), `happy-cli` (the `happy` npm CLI), `happy-agent` (a session-control CLI), `happy-server` (the relay, with a self-host package) and `happy-ios` (a native Swift client, in progress).
- Layer(s): `client/UI` (iPhone/iPad/web app), `orchestrator` (CLI wrapper, daemon, and `happy-agent` spawn/send/history/stop), `networking` (end-to-end encrypted relay, self-hostable)
- Open source: yes (MIT)
- Stars: 24.2k (retrieved 2026-10-19)
- Maintainer evidence: 1,332 commits to `main` between 2026-07-19 and 2026-10-19. By author: Steve Korshakov 1,022, Kirill Dubovitskiy 255, Charlie Zong 17 (two identities), Scoteezy 16, Hyunwoo Jung 13, Federico Liva 3, and several others. The CLI path (`packages/happy-cli`) had 56 commits in the same window (Kirill 36, Charlie Zong 7, Steve 2, others); its last commit was 2026-10-09. The last commit to `main` was 2026-10-19 (`24d340d`). The repo is not archived.
- Latest release: there are no GitHub Releases. Latest npm `happy` is 1.2.5 (2026-09-22), with beta 1.2.6-beta.1 (2026-10-09). The iOS app is at 1.8.0 (App Store shows "Oct 7" without a year).

| ID | Verdict | Evidence | Source URL | Source date |
|----|---------|----------|------------|-------------|
| N1 | PASS | 24.2k stars | https://github.com/slopus/happy | retrieved 2026-10-19 |
| N2 | PASS | Two core maintainers with hundreds of commits each in the last 3 months, plus 8 or more other authors | https://github.com/slopus/happy/commits/main (git log at `24d340d`) | retrieved 2026-10-19 |
| N3 | PASS | Commit on 2026-10-19; npm 1.2.5 on 2026-09-22; beta on 2026-10-09 | https://www.npmjs.com/package/happy | 2026-10-09 |
| A1 | PASS | App Store app "Happy: Codex & Claude Code App" for iPhone and iPad, plus a web app | https://apps.apple.com/us/app/happy-codex-claude-code-app/id6748571505 | 1.8.0, Oct 7 (year not shown) |
| A2 | PARTIAL | The app renders tool calls ("Bash commands render correctly for all agents"), but the 1.8.0 notes say internal tool calls such as thinking and ToolSearch are hidden. Full native transcripts still exist on disk because the native harnesses run. | https://apps.apple.com/us/app/happy-codex-claude-code-app/id6748571505 | Oct 7 (year not shown) |
| A3 | PASS (CLI path) | Graded against the §7.6 table. Local mode: the CLI finds the user's installed `claude` with `which`/`where` and spawns the unmodified TUI under the user's `/login`. Remote mode: the Claude Agent SDK, authenticated by the machine's Claude login, keeps `preset: 'claude_code'` and only appends Happy's prompt ([query.ts#L19-L26](https://github.com/slopus/happy/blob/24d340d54ce8eba59167aa0d988d83cc07f069b3/packages/happy-cli/src/claude/sdk/query.ts#L19-L26), [claudeRemote.ts#L137-L140](https://github.com/slopus/happy/blob/24d340d54ce8eba59167aa0d988d83cc07f069b3/packages/happy-cli/src/claude/claudeRemote.ts#L137-L140)). Codex: the user's `codex app-server --listen stdio://` under Codex's own managed ChatGPT login; neither Codex file injects tokens. The welcome page's line "Credentials come from the Claude Code, Codex, and Grok CLI sign-ins already on the machine" describes Happy Desktop, which reuses those sign-ins in its own harness (see A4). It is not evidence for the CLI path. | https://github.com/slopus/happy/blob/24d340d54ce8eba59167aa0d988d83cc07f069b3/packages/happy-cli/scripts/claude_version_utils.cjs#L123-L130 · https://github.com/slopus/happy/blob/24d340d54ce8eba59167aa0d988d83cc07f069b3/packages/happy-cli/src/claude/sdk/query.ts#L6 · https://github.com/slopus/happy/blob/24d340d54ce8eba59167aa0d988d83cc07f069b3/packages/happy-cli/src/codex/codexAppServerClient.ts#L608-L609 | 2026-10-19 (commit) |
| A4 | PASS (CLI path); FAIL for Happy Desktop | README: "The original CLI wraps the Claude Code and Codex harnesses directly … For multi-model sessions and teams, move to the desktop app and Happy Harness." Happy Harness is Happy's own harness, which runs "each with its vendor's own prompts and tools". Under §7.6 that is a "non-native harness on the user's plan", so FAIL. The screen must scope Happy to the CLI path. | https://github.com/slopus/happy/blob/24d340d54ce8eba59167aa0d988d83cc07f069b3/README.md#L52-L55 | 2026-10-19 |
| A5 | PARTIAL | Under the §7.2 test, the app can show git-changed files (including untracked), search files and read their contents in the session's directory. It has no folder-tree browser: `sessionListDirectory` exists in the app's `sync/ops.ts`, but no UI component calls it. The CLI does register `listDirectory`, `getDirectoryTree`, `readFile` and `writeFile` handlers. | https://github.com/slopus/happy/blob/24d340d54ce8eba59167aa0d988d83cc07f069b3/packages/happy-cli/src/modules/common/registerCommonHandlers.ts#L262-L407 | 2026-10-19 |
| A8 | PARTIAL | `happy-agent` lets an agent `spawn --machine … --agent codex`, `create`, `send … --wait`, `status`, `history`, `wait` and `stop` sessions. There is no explicit resume command. The npm package `happy-agent` is still 0.1.5 (2026-03-19), so it may not work with the current daemon. | https://github.com/slopus/happy/blob/24d340d54ce8eba59167aa0d988d83cc07f069b3/packages/happy-agent/README.md#L76 | 2026-10-19 (README); npm 2026-03-19 |
| C1 | PASS (via WSL2) | The CLI is an npm package with Unix and Windows code paths. The daemon "lets you spawn and manage coding sessions remotely — from your phone". On Linux it survives reboots if started from the shell profile. Happy Desktop also ships for Windows and Linux. | https://github.com/slopus/happy/blob/24d340d54ce8eba59167aa0d988d83cc07f069b3/packages/happy-cli/README.md#L55-L86 | 2026-10-19 |
| F1 | PARTIAL | Local mode spawns the user's `claude` binary. Remote mode runs the Agent SDK's bundled Claude Code (official, but not the installed binary; the CLI README says "the bundled `claude-agent-sdk`"). Codex uses the installed `codex`. | https://github.com/slopus/happy/blob/24d340d54ce8eba59167aa0d988d83cc07f069b3/packages/happy-cli/README.md#L86 | 2026-10-19 |
| F2 | PASS | 24.2k stars, above 5,000 | https://github.com/slopus/happy | retrieved 2026-10-19 |
| F3 | PASS | Native App Store app. A native Swift/UIKit client ("requires iOS 26") is also being built in `packages/happy-ios`. | https://github.com/slopus/happy/blob/24d340d54ce8eba59167aa0d988d83cc07f069b3/packages/happy-ios/README.md#L1-L3 | 2026-10-19 |
| F4 | PARTIAL | `supportsTablet: true`, and there are tablet sidebar components in both the Expo and Swift clients. I did not verify an iPad-optimised layout in the shipping 1.8.0 build. | https://github.com/slopus/happy/blob/24d340d54ce8eba59167aa0d988d83cc07f069b3/packages/happy-app/app.config.js#L69 | 2026-10-19 |
| F11a | PARTIAL | An agent can spawn Claude or Codex sessions through Happy's own CLI (`happy-agent spawn`). How well this works with the current daemon is unverified (see A8). | https://github.com/slopus/happy/blob/24d340d54ce8eba59167aa0d988d83cc07f069b3/packages/happy-agent/README.md#L5 | 2026-10-19 |

**Why it is credible.** It is the largest open-source phone client that drives both native harnesses (`happy claude` and `happy codex`) on the user's own machine, under the CLIs' own logins. It has a native iPhone/iPad app, two heavy-commit maintainers and daily activity. It also offers something rare: a CLI (`happy-agent`) that an agent can use to spawn and steer Claude or Codex sessions, and those sessions also appear on the phone. That bears on A8 and F11.

**Main risks.**
1. The project's direction is Happy Desktop and "Happy Harness", which runs Happy's own harness on top of CLI sign-ins. That path fails A4 and may conflict with Anthropic's consumer terms. Only the "original CLI" path qualifies, and it now gets a small share of commits (56 of about 1,330 since July).
2. `happy connect` stores "AI vendor API keys" in Happy cloud ([connect.ts#L51-L58](https://github.com/slopus/happy/blob/24d340d54ce8eba59167aa0d988d83cc07f069b3/packages/happy-cli/src/commands/connect.ts#L51-L58)). It must not be used, to keep A3 and A6a clean.
3. By default the relay is the hosted one run by Bulka LLC. It is end-to-end encrypted, and self-hosting is possible.
4. `happy-agent` has not been released to npm since March 2026.
5. Remote mode uses the SDK-bundled Claude Code, so its version can drift from the installed `claude`.

### 1.2 ChatGPT desktop app (Codex) for Windows, with ChatGPT iOS remote control (slug `chatgpt-desktop-codex`)

- Canonical: https://learn.chatgpt.com/docs/windows/windows-app · https://learn.chatgpt.com/docs/remote-connections · https://learn.chatgpt.com/docs/mobile
- owner/repo: closed (OpenAI). The Codex engine is open source in `openai/codex`, but the desktop app is not.
- Layer(s): `client/UI` (native desktop GUI for Codex on the Windows PC, with the ChatGPT iOS app as the remote client), `networking` (QR-paired remote control relayed through OpenAI)
- Open source: no
- Stars: N/A (closed)
- Maintainer evidence: OpenAI. The changelog lists Codex app 26.1007 (2026-10-08), Codex app 26.1002 (2026-10-07, "Fixed worktree creation and chat forking for WSL repositories…") and ChatGPT for iOS 1.2026.272 (2026-10-07, "New tasks keep your selected computer while it reconnects or is offline").
- Latest release: Codex app 26.1007 (2026-10-08) and ChatGPT for iOS 1.2026.272 (2026-10-07), both from https://learn.chatgpt.com/docs/changelog
- Why it is not already covered: it is the Codex counterpart of the listed "Claude desktop app". "Codex Desktop" appears only as an example inside F10, not as a candidate.

| ID | Verdict | Evidence | Source URL | Source date |
|----|---------|----------|------------|-------------|
| N1 | N/A (closed) | GitHub gates apply to open-source components only | — | — |
| N2 | PASS | Product of an organisation (OpenAI) with an active release train | https://learn.chatgpt.com/docs/changelog | 2026-10-08 |
| N3 | PASS | App and iOS releases on 2026-10-07 and 2026-10-08, and remote-task features still shipping | https://learn.chatgpt.com/docs/changelog | 2026-10-08 |
| A1 | PASS (Codex sessions) | "Remote access supports hosts running the ChatGPT desktop app on macOS and Windows"; you can "control a host from ChatGPT on iOS or Android" | https://learn.chatgpt.com/docs/remote-connections | undated, retrieved 2026-10-19 |
| A3 | PASS (Codex only) | Phone and host sign in to "the same ChatGPT account and workspace". Remote access uses "the connected host's … credentials". | https://learn.chatgpt.com/docs/remote-connections | undated, retrieved 2026-10-19 |
| A4 | PASS (Codex only) | Codex is the agent running inside the ChatGPT desktop app; it is OpenAI's own harness | https://learn.chatgpt.com/docs/windows/windows-app | undated, retrieved 2026-10-19 |
| A5 | PARTIAL | Work uses "the connected host's projects, chats, files …". From mobile you can "Review changed files, diffs, responses, and test results". There is no general folder browsing. | https://learn.chatgpt.com/docs/mobile | undated, retrieved 2026-10-19 |
| A2 | UNKNOWN | The docs pages I read do not describe how commands or tool calls are displayed | https://learn.chatgpt.com/docs/features | undated, retrieved 2026-10-19 |
| C1 | PASS | Installs from the Microsoft Store or with `winget install --id 9PLM9XGG6VKS -s msstore`. The agent can be set to "run in Windows Subsystem for Linux 2 (WSL2)". | https://learn.chatgpt.com/docs/windows/windows-app | undated, retrieved 2026-10-19 |
| F3 | PASS | The remote client is the native ChatGPT iOS app (Codex tab) | https://learn.chatgpt.com/docs/mobile | undated, retrieved 2026-10-19 |
| F4 | UNKNOWN | The docs name iOS and Android but not iPad | https://learn.chatgpt.com/docs/remote-connections | undated, retrieved 2026-10-19 |
| F5 | PASS (Codex) | Native Codex desktop GUI on the PC. Remote control continues the same host threads. | https://learn.chatgpt.com/docs/remote-connections | undated, retrieved 2026-10-19 |
| F10 | PARTIAL | This is the native Codex desktop app. It uses `%USERPROFILE%\.codex`. A Codex CLI inside WSL "doesn't automatically share config, auth, or session history" unless `CODEX_HOME` is set to the Windows directory, so delegated `codex exec` runs from WSL appear only with that setting. | https://learn.chatgpt.com/docs/windows/windows-app | undated, retrieved 2026-10-19 |

**Why it is credible.** It is vendor-built and actively shipped. It gives the user's always-on Windows PC a native Codex GUI, with Codex optionally running in WSL2, and an iPhone path into those local sessions through the native ChatGPT app. Everything runs on the subscription sign-in and the native harness, with no wrapper. It fills the Codex half of F10 and the native-iOS path for Codex, which the listed "Claude desktop app" only covers for Claude.

**Main risks.**
1. It covers Codex only, so it does nothing for Claude Code or for cross-harness orchestration (A6–A8).
2. The host must stay "awake, online, and signed in". Remote setup can only start "from the app; you can't set it up from the Codex CLI or IDE extension". A workspace admin may need to enable it, and availability "depends on rollout".
3. The docs do not say whether remote control works when the agent runs in WSL2 mode.
4. Naming is in flux. The docs call the host "ChatGPT desktop app", while the changelog still says "Codex app".
5. Sharing sessions with a WSL CLI means pointing `CODEX_HOME` at a Windows path, which raises performance and permission questions on `/mnt/c`.

### 1.3 code-server (slug `code-server`)

- Canonical: https://github.com/coder/code-server · https://coder.com/docs/code-server
- owner/repo: `coder/code-server`
- Layer(s): `client/UI` (VS Code and its terminal in Safari or as a PWA on iPhone/iPad), `sync` (direct view of the WSL2 filesystem: open, edit and download files), `networking` (built-in `/proxy/<port>/` for localhost apps)
- Open source: yes (MIT)
- Stars: 79.6k (retrieved 2026-10-19)
- Maintainer evidence: `.github/CODEOWNERS` assigns `* @coder/code-server`, a Coder team. Human commit authors since 2026-04-19: Asher 57 (last 2026-09-08), denusklo 7 (last 2026-09-08, "Add a windows package job to the release workflow"), Olivier Benz 6 (21 VS Code update or release commits in 2026, last 2026-05-19), and others. Weekly VS Code bumps are now automated (the `cdrci` bot). The last commit was 2026-10-14 (`f07405c`).
- Latest release: v4.141.0 (Code 1.141.0), published 2026-10-08 by GitHub Actions. https://github.com/coder/code-server/releases/tag/v4.141.0

| ID | Verdict | Evidence | Source URL | Source date |
|----|---------|----------|------------|-------------|
| N1 | PASS | 79.6k stars | https://github.com/coder/code-server | retrieved 2026-10-19 |
| N2 | PASS | Ownership by a Coder team, plus at least 3 humans doing release or maintenance work in 2026 | https://github.com/coder/code-server/blob/f07405cba33179e6d2058af07ca2be290f19b262/.github/CODEOWNERS#L1 | 2026-10-14 |
| N3 | PASS | v4.141.0 on 2026-10-08, v4.140.0 on 2026-10-01, roughly weekly releases | https://github.com/coder/code-server/releases/tag/v4.141.0 | 2026-10-08 |
| A1 | PASS (webapp) | "Run VS Code on any machine anywhere and access it in the browser". The iPad guide covers a PWA ("Add to Home Screen"). There is no guide specific to the iPhone. | https://github.com/coder/code-server/blob/f07405cba33179e6d2058af07ca2be290f19b262/docs/README.md#L5-L13 · https://github.com/coder/code-server/blob/f07405cba33179e6d2058af07ca2be290f19b262/docs/ipad.md#L21-L32 | 2026-10-14 |
| A5 | PASS | The VS Code Explorer over the WSL2 filesystem where code-server runs ("Code on any device with a consistent development environment") | https://github.com/coder/code-server/blob/f07405cba33179e6d2058af07ca2be290f19b262/docs/README.md#L13 | 2026-10-14 |
| C1 | PASS (via WSL2) | "We currently do not publish Windows releases", so it installs on Linux, which K1 allows via WSL2. | https://github.com/coder/code-server/blob/f07405cba33179e6d2058af07ca2be290f19b262/docs/install.md#L295-L298 | 2026-10-14 |
| F1 | PASS | The integrated terminal runs the user's own `claude` and `codex` under their own logins. The official extensions are on Open VSX, code-server's gallery: Anthropic.claude-code v2.1.303 (2026-10-18) and openai.chatgpt v26.5908.31748 (2026-09-11), both from verified publishers. | https://open-vsx.org/api/anthropic/claude-code · https://open-vsx.org/api/openai/chatgpt · https://github.com/coder/code-server/blob/f07405cba33179e6d2058af07ca2be290f19b262/docs/FAQ.md#L106-L122 | 2026-10-18 / 2026-09-11 |
| F2 | PASS | 79.6k stars, above 5,000 | https://github.com/coder/code-server | retrieved 2026-10-19 |
| F4 | PARTIAL | There is an iPad guide with a PWA, but it lists known issues: the keyboard sometimes disappears (#979), there is no Esc key on the Magic Keyboard, and focus is lost in Split View (#4182) | https://github.com/coder/code-server/blob/f07405cba33179e6d2058af07ca2be290f19b262/docs/ipad.md#L103-L120 | 2026-10-14 |
| F5 | PASS | The native `claude` and `codex` TUIs run directly in the browser terminal on iPhone/iPad, attached to the PC | https://github.com/coder/code-server/blob/f07405cba33179e6d2058af07ca2be290f19b262/docs/README.md#L5-L6 | 2026-10-14 |
| F6 | PASS | "code-server can proxy to any port … Simply browse to `/proxy/<port>/`", or use `--proxy-domain` | https://github.com/coder/code-server/blob/f07405cba33179e6d2058af07ca2be290f19b262/docs/guide.md#L323-L358 | 2026-10-14 |
| F7 | PASS | Any file in the WSL2 tree opens in the editor from the phone or tablet | https://github.com/coder/code-server/blob/f07405cba33179e6d2058af07ca2be290f19b262/docs/README.md#L13 | 2026-10-14 |
| F8 | PARTIAL | Download is on by default (the FAQ documents a `--disable-file-downloads` flag). The code-server docs do not mention upload. | https://github.com/coder/code-server/blob/f07405cba33179e6d2058af07ca2be290f19b262/docs/FAQ.md#L542-L544 | 2026-10-14 |
| A6–A8 | N/A (layer) | It is an IDE and terminal surface, not an orchestrator. Delegation has to come from the harnesses or another component. | — | — |

**Why it is credible.** It is the most widely used self-hosted, browser-based IDE (79.6k stars), backed by Coder, with roughly weekly releases. It is the most direct way to clear A5 for this user: the iPhone/iPad sees and opens the actual WSL2 folders where agents work, not a synced copy. It also delivers F5–F8 in one component: native TUIs in a terminal, a localhost proxy, opening files, and downloads. None of the listed candidates is an IDE or file-access layer for the iPad.

**Main risks.**
1. It exposes a full shell, so it must sit behind Tailscale and its own authentication. Getting a trusted certificate for the iPad PWA is "an involved process".
2. It is cramped on an iPhone screen. The iPad keyboard has quirks.
3. Webview extensions need service workers and HTTPS (FAQ "Why do web views not work?"). The Claude Code and Codex extension panels may therefore misbehave over plain HTTP, though the terminal TUIs are unaffected.
4. The Open VSX build of the Codex extension (2026-09-11) lags the latest.
5. Human maintenance is concentrated in a few Coder staff, with the VS Code bumps automated.

---

## 2. Considered but not proposed

- **CloudCLI / Claude Code UI** (`siteboon/claudecodeui`): 14.2k stars, AGPL-3.0, 106 commits since 2026-07-19 (blackmammoth 42, viper151 4, Simos Mikelatos 4, and others). It is a mobile-responsive web UI with a file tree for Claude Code, Codex and Cursor CLI. Not proposed because it overlaps Happy (client) and code-server (files), is web-only, and has one dominant committer, and I did not verify how it invokes Codex. It is the best alternate if a single mobile web UI with a file tree is preferred.
- **Claude app Remote Control** (Claude iOS controlling a local Claude Code session): brief §7.1 already places it under `claude-desktop`.
- **Coder Tasks with AgentAPI** (`coder/coder`, `coder/agentapi`): Docker/Terraform workspaces (F9), a web UI, and task creation from CLI or MCP. Not proposed: it is a heavy platform for one PC, the orchestrator layer is already crowded on the list, and I did not verify Codex with a ChatGPT login. AgentAPI's last commit was 2026-09-13.
- **VS Code Remote Tunnels / vscode.dev** (Microsoft, closed server): similar coverage to code-server, using Marketplace extensions. Not proposed: it relays through a Microsoft or GitHub account and is not self-hosted. Not verified.
- **Blink Shell** (`blinksh/blink`): 7.0k stars, GPL-3.0, an SSH/Mosh terminal built for the iPad (native TUIs). Not proposed: its last commit was 2026-04-14, so it is not active in recent months, and it has no GitHub releases.
- **Termius** (closed, Termius Corp.): iOS/iPad SSH and SFTP client, a credible way to reach native TUIs over SSH with tmux. Not proposed: it adds FAVOUR points but clears no ALWAYS gate beyond A1. Not verified.
- **Moshi** (closed iOS terminal aimed at agents): the only evidence is vendor-written comparisons. The organisation and its maintainers are unverified.
- **Zellij** (`zellij-org/zellij`): a multiplexer with a built-in web client, active (last commit 2026-10-17). Not proposed: it overlaps code-server's terminal, and I did not check maintainer concentration or stars.
- **tmux / Mosh / ttyd**: generic infrastructure for keeping TUIs alive or reaching them. Mosh's last commit was 2026-03-22 (N3 risk). ttyd appears to have a single maintainer (N2 risk), which I did not verify.
- **Omnara** (`omnara-ai/omnara`): 2.9k stars. It is now "an open-source managed agent platform" with its own agent loop, and Claude Code and Codex only appear as MCP clients, so it fails A4.
- **VibeTunnel** (`amantus-ai/vibetunnel`): a browser terminal for agents, centred on the Mac. Its last commit was 2026-08-05 and activity is slowing. Not verified further.
- **CC Pocket, Remodex, Cloudex**: small mobile clients found through search. Star counts are unverified and likely below N1's 1,000. Remodex and Cloudex support only Codex hosted on a Mac.
- **Claude Squad** (`smtg-ai/claude-squad`): a tmux-based session manager with no mobile surface. Last commit 2026-08-20.
- **Tailscale**: brief §7.1 reads the user's "Tailwind" as Tailscale, so it is already listed. NetBird (`netbirdio/netbird`, active 2026-10-16) and Cloudflare Tunnel are redundant unless Tailscale fails its screen.
- **Syncthing** (`syncthing/syncthing`): active, but it has no official iOS app (only the third-party Möbius Sync), which makes it weak for A5 on iPhone. Obsidian Sync is already a given.
- **Bernstein** (a CLI-agent orchestrator found through search): its README says beta. Unverified.

## 3. Open questions

- **Scope of candidate 1.2.** If the orchestrator treats the ChatGPT desktop app as part of the given Codex harness, drop it. That loses F10 for Codex and the native-iOS path for Codex.
- **Happy, `happy-agent`.** Does `happy-agent` (npm 0.1.5, 2026-03-19) still work against CLI 1.2.5's daemon? Does `spawn --agent codex` create sessions that appear on the phone and are linked to their parent? This decides A8 (PARTIAL or PASS) and F11a–F11e.
- **Happy, Claude binary.** Can remote mode be pointed at the installed `claude` binary rather than the SDK-bundled one? This decides F1 (PARTIAL or PASS).
- **Happy, hidden tool calls.** Which tool calls does 1.8.0 hide, and does the hiding apply to every launched session? This decides A2 (PARTIAL, PASS or FAIL) for the stack.
- **Happy, iPad layout.** Does the shipping 1.8.0 build (Expo or Swift) use the tablet sidebar layout on iPad? This decides F4.
- **ChatGPT/Codex in WSL2 mode.** Does remote control from ChatGPT iOS work when the Windows app's agent runs in WSL2? This decides C1 and A1 for the Codex path.
- **ChatGPT/Codex audit trail and iPad.** Does the desktop app or the mobile client show the full command and tool-call trail (A2)? Is remote control supported on iPad (F4)?
- **code-server extension webviews.** Do the Claude Code and Codex extension webviews work in code-server over Tailscale HTTPS? This affects F5 and F10 at the IDE level, not the terminal TUIs.
