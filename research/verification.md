# Verification of the shortlist (Stage 5)

- Verifier: verify-shortlist. Checked: 2026-10-19.
- Inputs read under `research/`: `brief.md` and `shortlist.md` only. Every verdict below comes from primary sources I fetched or cloned myself.
- Method:
  - Docs were fetched as Markdown where the site offers it (`code.claude.com/docs/en/*.md`, `tailscale.com/docs/*.md`) and as HTML otherwise (support.claude.com, learn.chatgpt.com, developers.openai.com, support.apple.com, docs.warp.dev, conductor.build, hub.docker.com). I read them as text.
  - App versions and iPad support come from the App Store lookup API (`itunes.apple.com/lookup?id=…`).
  - github.com pages were read with WebFetch. Plain curl to github.com is refused for these repos.
  - Source was read in anonymous shallow clones under the scratchpad, using grep and read only. Nothing was installed or executed:
    - Orca main `5f2bb93` (2026-10-19)
    - T3 Code tag v0.1.0 `81493ef`
    - Maestro tag v1.0.0 `aa23ffd`, plus main `738deed`
    - agentsview tag v0.45.0 `b9d0a20`
    - slopus/happy `36b11c5`, slopus/slopus.github.io `5ace459`, coder/code-server `f07405c`
    - openai/codex files at `89461ea` (via raw.githubusercontent.com)
  - N2 counts used blob-less clones with `--shallow-since=2026-04-22`, then a read-only `git log`, all in the scratchpad (brief 7.0). Bots, `*[bot]` identities and AI-only authors were excluded. I ran no git command in the project repo.
- Permalink prefixes used below:
  - `O` = https://github.com/stablyai/orca/blob/5f2bb930d1653aa0fc84f34b49ec5a7b1157167b (2026-10-19; one release after the shortlist's v1.4.229)
  - `T` = https://github.com/pingdotgg/t3code/blob/81493efb71e8e8244f95d3e9f71d8369654ab151 (v0.1.0, 2026-10-15)
  - `M` = https://github.com/RunMaestro/Maestro/blob/aa23ffd516bd4a6403b79563834b0432f5cced70 (v1.0.0, 2026-10-09)
  - `V` = https://github.com/kenn-io/agentsview/blob/b9d0a207f51ff27b84adbaae2a91b344247079b3 (v0.45.0, 2026-10-09)
  - `C` = https://github.com/openai/codex/blob/89461ea6833832b0551ce24ee32205824d5c108d (the SHA the shortlist cites)
  - `CC` = https://code.claude.com/docs/en/ (undated pages, retrieved 2026-10-19)
  - `LC` = https://learn.chatgpt.com/docs/ (undated pages unless an entry date is given, retrieved 2026-10-19)

---

## 1. Summary

**No ALWAYS or NEVER gate claim was refuted.** All four stacks still clear every ALWAYS gate under the brief's binding interpretations, and the ranking does not change. Each verdict below is on the configuration the shortlist states, and caveats are listed.

| # | Stack | Post-verification verdict | What changed |
|---|---|---|---|
| 1 | First-party pair (S3): Claude Desktop/Remote Control + ChatGPT desktop (Codex) + Tailscale | **CLEARS ALL ALWAYS GATES** | Nothing refuted. Caveats: Codex→Claude delegation (`claude -p` from Codex) needs a Codex approval per call, or a rule, because it needs network access. Anthropic says `--bare` "will become the default for `-p`", and bare mode "never reads OAuth credentials", a forward risk for that path. The A5 SMB route is untested off-LAN (open Tailscale bug #18967). The claim that it "still clears under every strict reading" is overstated (see R1), but no other stack does better, so its rank is unchanged. |
| 2 | Orca + Tailscale | **CLEARS ALL ALWAYS GATES** (binding 7.16a/b) | Nothing refuted. New: Orca ships **permission bypass by default for both harnesses** (`--dangerously-skip-permissions`, `--dangerously-bypass-approvals-and-sandbox`). The stack's setup and risks omit this (R2). The token side-reads are confirmed exactly as described. The Codex call also sets `originator: 'Codex Desktop'`. |
| 3 | T3 Code + Tailscale | **CLEARS ALL ALWAYS GATES** (needs text generation → Claude) | Nothing refuted. The A5 permalink points at the wrong function, but the claim holds (R8). OpenAI lists T3 as an open-source "Sign in with ChatGPT" integration, so "Connect with ChatGPT" is an OpenAI-documented consent path. Avoiding it is optional, not required (R7). |
| 4 | Maestro + agentsview + Tailscale | **CLEARS only with Full Access + `--disallowedTools AskUserQuestion`** | Source confirms the catch: permission prompts are sent only to the Electron window, never to phone web clients. Maestro's default Claude path is `claude --print`, which Maestro's docs say "bills per-token API credit". Anthropic's 2026-10-07 note says `-p` draws from subscription limits, and the vendor wins, so A3 holds. The paused-change and `--bare` risks therefore apply to S4 too, but the shortlist doesn't list them for S4 (R3). |

- **Counts:** 90 claim rows checked (table in section 2). Some rows bundle N1–N3, or two FAVOUR items.
  - 1 REFUTED: a ranking-criterion wording claim, not a gate.
  - 0 UNVERIFIABLE.
  - 63 CONFIRMED.
  - 26 CONFIRMED WITH CAVEAT.
- **Ranking:** unchanged.
  - By robustness, 1 First-party pair, 2 Orca, 3 T3 Code, 4 Maestro.
  - By FAVOUR alone, the order stays Orca 26, T3 25, first-party 22, Maestro 20. No FAVOUR score scored 2 was refuted.
- **Policy facts deciding A3:** all confirmed against current primary pages (rows P1–P4).
  - Anthropic's 2026-10-07 / 2026-06-15 Help Center notes.
  - Anthropic's undated legal page ("may not collect, store, or intermediate Claude.ai credentials or session tokens").
  - OpenAI's "Sign in with ChatGPT for subscription access" and its documented plan-usage flow for "open-source and locally hosted apps".
  - OpenAI's "We plan to deprecate this experience" for Codex Cloud (Legacy), found on the Cloud environments page.

---

## 2. Claim table

Verdict key: CONFIRMED · CONFIRMED WITH CAVEAT · REFUTED · UNVERIFIABLE. "Shortlist" is the shortlist's own verdict or score.

### Stack 1 (S3): Claude desktop app + ChatGPT desktop (Codex) + Tailscale

| Stack | Claim (gate or item) | Shortlist | Verdict | Primary source URL | Source date | Note |
|---|---|---|---|---|---|---|
| S1 | A1 Claude half (i)–(iii) via Remote Control (one `claude remote-control --spawn …` server per repo) | PASS | CONFIRMED WITH CAVEAT | CC remote-control · CC mobile · https://github.com/anthropics/claude-code/issues/102650 | undated; issue 2026-10-16 | **Quotes:**<br>• "A connected device shows the conversation in your terminal as it happens."<br>• "send messages from your terminal, browser, and phone interchangeably".<br>• "Claude Code keeps permission prompts and `AskUserQuestion` questions open until you answer them."<br>• `--chrome` row: "any session you start yourself from claude.ai/code or the Claude app".<br>• `--capacity`: "Default is 32".<br>**Caveats:**<br>• The repo is chosen among folders that already have a running server.<br>• Server mode "gives up after roughly 10 minutes" offline and exits.<br>• Trust must be answered once interactively; a non-TTY run "exits with a `Workspace not trusted` error".<br>• #102650 is a stale-entry bug. It shows a Windows device's directory listed under iOS → Code → Devices, not a working start.<br>• RC under a Task Scheduler restart loop is untested. |
| S1 | A1 Codex half (i)–(iii) | PASS | CONFIRMED WITH CAVEAT | LC remote-connections · LC changelog · LC mobile | undated; entries 2026-06-15, 2026-06-25 | **Quotes:**<br>• "Start new chats in projects on the host, or continue existing ones"; "Send follow-up instructions, answer questions"; "Approve commands and other actions"; "Review outputs, diffs, test results, terminal output".<br>• "Remote access supports hosts running the ChatGPT desktop app on macOS and Windows."<br>• 2026-06-25: "Codex Remote has reached general availability".<br>• iOS 1.2026.160: "Added a directory picker for choosing a workspace folder when starting a new thread".<br>**Caveat:** "Availability can vary by rollout" (mobile page: "depends on rollout and your workspace settings"). This is a GA build, so it counts only as a 7.16a caveat. |
| S1 | A2 Claude | PASS | CONFIRMED | CC desktop · CC claude-directory | undated | • Verbose view: "Every tool call, file read, and intermediate step Claude takes, plus Claude's thinking".<br>• Desktop `/resume` picks up CLI sessions.<br>• `claude --resume` (vendor TUI) counts under 7.5. |
| S1 | A2 Codex | PASS | CONFIRMED WITH CAVEAT | LC windows/windows-app · C/codex-rs/app-server-protocol/src/protocol/v2/item.rs#L293-L329 · C/codex-rs/rollout/src/lib.rs#L88-L95 | undated; SHA as cited | **Evidence for the app UI is indirect:**<br>• The Windows-app page shows "Ran `<command>` for 13s" thread rows and a setting "Thread detail: Choose how much command output to show in threads".<br>• The protocol item carries `command`, `cwd`, `aggregated_output` and `exit_code`.<br>• The cleaner A2 surface is `codex resume`: `INTERACTIVE_SESSION_SOURCES` includes `Custom("chatgpt")`, so app chats in the shared `%USERPROFILE%\.codex` are resumable in the TUI. |
| S1 | A2 iPhone caveat: approvals and diffs cut at about 100 characters (#37235) | caveat | CONFIRMED WITH CAVEAT | https://github.com/anthropics/claude-code/issues/37235 | opened 2026-03-21; closed by bot 2026-05-20 | Closed "not planned" by github-actions for inactivity. Whether it still holds in October 2026 is unknown. |
| S1 | A3 Claude (Desktop, Remote Control, `claude -p`) | PASS | CONFIRMED | https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan · CC authentication · CC remote-control · P1 | 2026-10-14 (dateModified); undated | • "With Pro and Max plans, you now have access to both Claude on the web, desktop, and mobile apps and Claude Code in your terminal with one unified subscription."<br>• "Claude Desktop and cloud sessions do not call `apiKeyHelper` or read these environment variables: they use OAuth".<br>• RC: "API keys are not supported."<br>• **Load-bearing:** "In non-interactive mode (`-p`), the key is always used when present." This makes the stack's environment-hygiene step 2 essential. |
| S1 | A3 Codex | PASS | CONFIRMED | LC auth · LC pricing | undated | • "Sign in with ChatGPT for subscription access".<br>• "The ChatGPT desktop app, Codex CLI, and IDE extension support both sign-in methods for local work."<br>• Pricing table: "Mobile remote control —" in the API Key column; "Codex SDK, `codex exec`, and scriptable workflows" are included on ChatGPT plans. |
| S1 | A4 Claude | PASS | CONFIRMED | CC desktop | undated | "In a local session, the **Code** tab runs its own copy of Claude Code"; "Desktop runs the same underlying engine". |
| S1 | A4 Codex | PASS | CONFIRMED | LC windows/windows-app | undated | "By default, the ChatGPT desktop app uses the Windows-native Codex agent." |
| S1 | A5 (Tailscale SMB to iOS Files; ChatGPT iOS workspace file browser) | PASS | CONFIRMED WITH CAVEAT | https://tailscale.com/docs/use-cases/personal-or-at-home-use/access-nas-media-file-servers.md · https://support.apple.com/guide/iphone/transfer-files-iphone-a-storage-device-iphe9aff429a/ios · https://tailscale.com/docs/reference/messages/client/set-network-category-failed.md · https://github.com/tailscale/tailscale/issues/18967 · LC changelog | Last validated 2026-05-18; Apple undated; Jan 30, 2026; issue open; 2026-06-15 | **Support:**<br>• Windows: "Share the folders you want to access: right-click the folder, open **Properties > Sharing**".<br>• iOS: "open the **Files** app, tap **…**, and select **Connect to Server**. Enter `smb://hostname`".<br>• Apple: Files → "Connect to a computer or file server".<br>• Tailscale's message "Failed to set the network category to private on the Tailscale adapter" shows Private is the expected profile.<br>**Caveats:**<br>• Untested hands-on.<br>• #18967 is open: iOS Files over SMB fails on 5G for some users. Fixes were reported variously as hostname, DNS override, or another SMB app.<br>• Files may not preview every source-code extension.<br>• The ChatGPT file browser covers ChatGPT projects only.<br>• Apple 118392, which the shortlist cites, is "About iOS 13 Updates" (2024-02-26); the Apple guide above is the better source. |
| S1 | A6a Claude→Codex (`codex exec`) | PASS (workaround) | CONFIRMED | LC non-interactive-mode · LC windows/windows-app | undated | • "`codex exec` reuses saved CLI authentication by default."<br>• "The Windows app uses the same Codex home directory as native Codex on Windows: `%USERPROFILE%\.codex`." |
| S1 | A6a Codex→Claude (`claude -p`) | PASS (workaround) | CONFIRMED WITH CAVEAT | P1 · CC headless · LC agent-approvals-security | 2026-10-07; undated | **Allowed today:** "You can still use the Claude Agent SDK, `claude -p`, and third-party apps with your subscription limits."<br>**Caveats:**<br>(1) Headless docs: "`--bare` is the recommended mode for scripted and SDK calls, and will become the default for `-p` in a future release", and "In bare mode, Claude Code never reads OAuth credentials". `claude --bg` is the fallback.<br>(2) "Codex asks for approval to … run commands that require network access", so each delegation needs an approval or a rule. No setup step covers this. |
| S1 | A6b Codex | PASS | CONFIRMED | C/codex-rs/rollout/src/compression.rs#L364 · C/codex-rs/rollout/src/lib.rs#L86-L87 · LC non-interactive-mode | SHA as cited; undated | • `MIN_ROLLOUT_AGE = 7 days`: older rollouts are compressed to `.jsonl.zst`, not deleted. No deletion path was found.<br>• `--ephemeral` is opt-out; resume with `codex exec resume <SESSION_ID>`.<br>• The shortlist's lib.rs#L86-L95 shows the sessions directory, not the 7-day rule. |
| S1 | A6b Claude | PASS | CONFIRMED | CC claude-directory · CC settings-reference | undated | • "`projects/<project>/<session>.jsonl`: Full conversation transcript: every message, tool call, and tool result".<br>• `cleanupPeriodDays` default 30; "pick a large value such as `3650`".<br>• Desktop-started transcripts are kept "at any age". |
| S1 | A7 (shared `C:\` paths, `--add-dir`, `-o`) | PASS (workaround) | CONFIRMED WITH CAVEAT | LC developer-commands · LC agent-approvals-security | undated | • `--add-dir`: "Grant additional directories write access alongside the main workspace"; `--cd, -C`; `--output-last-message, -o`.<br>• Codex→Claude hand-over needs the same approval as A6a.<br>• Sandbox clause not exercised. |
| S1 | A8 Claude→Codex | PASS (workaround) | CONFIRMED | LC non-interactive-mode | undated | `--json` gives a "JSON Lines (JSONL) stream"; "codex exec resume <SESSION_ID>". |
| S1 | A8 Codex→Claude | PASS (workaround) | CONFIRMED WITH CAVEAT | CC headless · CC agent-view | undated | • `claude -p "…" --resume "$session_id"` and stream-json.<br>• Alternative: `claude --bg`, `claude agents --json`, `claude --resume <id> --bg "<prompt>"`. Agent view is "in research preview" (enabled in stable, so a 7.16a caveat).<br>• Same approval and `--bare` caveats as A6a. |
| S1 | C1 | PASS | CONFIRMED WITH CAVEAT | CC desktop · LC windows/windows-app · https://tailscale.com/docs/how-to/run-unattended.md | undated; Last validated Sep 25, 2026 | • Windows download; Local/Cloud/SSH/"on Windows a WSL distribution"; `winget install --id 9PLM9XGG6VKS -s msstore`; Tailscale "Windows 10 or later".<br>• The shortlist's "Windows 10 19041+" was not found on current OpenAI pages.<br>• The apps and RC servers need a logged-in Windows session. |
| S1 | N2/N3 claude-desktop | PASS | CONFIRMED | CC changelog · https://downloads.claude.ai/releases/win32/x64/RELEASES · App Store lookup id6473753684 · https://support.claude.com/en/articles/13947068-assign-tasks-from-anywhere-in-claude-cowork | 2026-10-18; Last-Modified 2026-10-19; 2026-10-17; 2026-10-15 | • Claude Code 2.1.303 "October 18, 2026"; `AnthropicClaude-2.42304.2-full.nupkg`; iOS 1.261016.20 (Anthropic PBC).<br>• Dispatch notice confirmed: "Dispatch isn't available to new users." The surface is correctly excluded. |
| S1 | N2/N3 chatgpt-desktop-codex | PASS | CONFIRMED | LC changelog · App Store lookup id6448311069 | 2026-10-08; 2026-10-16 | "Codex app 26.1007" (2026-10-08), with many `@…-oai` authors; ChatGPT iOS 1.2026.279 (OpenAI OpCo, LLC). |
| S1 | Tailscale N1/N2/N3 | PASS | CONFIRMED | https://github.com/tailscale/tailscale · https://github.com/tailscale/tailscale/releases/tag/v1.104.1 · history clone | retrieved 2026-10-19; released 07 Oct | • 37.7k★.<br>• Brad Fitzpatrick wrote 31.1% of 998 human commits since 2026-04-22 and lands others' commits.<br>• v1.104.1 (Latest) was published by nickoneill. |
| S1 | F1 = 2 | 2 | CONFIRMED | CC authentication · LC auth | undated | First-party only. No third-party token handling. |
| S1 | F2 = 2 | 2 | CONFIRMED | https://github.com/tailscale/tailscale | retrieved 2026-10-19 | 37.7k★ (client repo, per 7.3). |
| S1 | F3 = 2 | 2 | CONFIRMED | App Store lookup id6473753684, id6448311069 | 2026-10-17; 2026-10-16 | Both are App Store apps. |
| S1 | F4 = 2 | 2 | CONFIRMED | LC changelog · App Store lookup | 2026-09-23; retrieved | • ChatGPT iOS 1.2026.258: "New iPad split view keeps your task list beside the open task".<br>• Claude app has 9 iPad screenshots.<br>• CC mobile, which the shortlist cites, only says "On an iPad, install the same iOS app". |
| S1 | F5 = 2 | 2 | CONFIRMED | CC desktop · LC remote-connections | undated | • `claude --desktop --resume <session-id>`; "Desktop continues the same session rather than a copy".<br>• Codex: "continue that same chat there". |
| S1 | F6 = 2 | 2 | CONFIRMED WITH CAVEAT | https://tailscale.com/docs/features/tailscale-serve.md | Last validated Jan 20, 2026 | Proxies `http://127.0.0.1:3000` to the tailnet. It "requires you to enable HTTPS certificates". The page makes no Windows-specific statement. |
| S1 | F7 = 2 | 2 | CONFIRMED WITH CAVEAT | Tailscale NAS page · Apple guide | as above | Files opens PDFs and images; some code files may not preview. |
| S1 | F8 = 2 | 2 | CONFIRMED | Apple guide · CC mobile | undated | • Copy to and from a file server in Files.<br>• RC photos are saved "under `~/.claude/uploads/`". |
| S1 | "Only stack that passes under every strict reading" (sections 1–2) | claim | **REFUTED (as worded)** | shortlist section 6 decisions 11–12 · CC claude-directory | — | • Decision 11's strict alternative fails A6b for every stack, S1 included: `claude -p` delegated transcripts follow the 30-day sweep.<br>• Decision 12's strict alternative removes S1's SMB route.<br>• S1 does still clear under the four 7.16 strict alternatives and the defaults-only reading. Ranking unaffected (R1). |

### Stack 2 (S1): Orca + Tailscale

| Stack | Claim | Shortlist | Verdict | Primary source URL | Source date | Note |
|---|---|---|---|---|---|---|
| S2 | A1 (i)–(iii), both harnesses | PASS (beta caveat) | CONFIRMED WITH CAVEAT | O/docs/site/content/docs/mobile.mdx#L10-L35 · O/mobile/src/tasks/workspace-agent-selection.ts#L11 · App Store lookup id6766130217 | 2026-10-19; App 0.0.57, 2026-10-18 | **Quotes:**<br>• "See every worktree, its agent, and its current status".<br>• "Hydrate recent terminal scrollback".<br>• "Send a short reply … when an agent is waiting on input".<br>• "switch to **Live** when each typed character should go straight to the active terminal".<br>**Agent choice:** mobile create takes `WorkspaceAgentChoice = TuiAgent \| 'blank'` plus a repo id. Current docs no longer say so; the code does.<br>**Beta callout:** "The mobile companion is in beta. Install iOS from the App Store…". This is a 7.16a caveat.<br>**App identity:** the App Store seller is "Lovecast LLC", but the bundle `com.stably.orca.mobile` and the id are linked from the Orca repo. |
| S2 | A2 | PASS | CONFIRMED | O/docs/site/content/docs/agents/session-history.mdx#L39 | 2026-10-19 | • "**Resume** … runs the agent's resume command (e.g. `claude --resume <id>`, `codex resume <id>` …)".<br>• Live TUI mirrored to the phone. |
| S2 | A3 + 7.16b policy risk | PASS + note | CONFIRMED (binding 7.16b) | O/src/main/rate-limits/claude-oauth-usage-request.ts#L18 and #L82-L86 · O/src/main/rate-limits/codex-backend-auth.ts#L66-L89 · CC legal-and-compliance · O/docs/site/content/docs/agents/usage-tracking.mdx#L15 | 2026-10-19; legal undated | **What Orca sends:**<br>• Claude: `Authorization: Bearer ${token}` with `'User-Agent': 'claude-code/2.1.0'` to `https://api.anthropic.com/api/oauth/usage`.<br>• Codex: Bearer with `'User-Agent': 'codex-cli'` and `originator: 'Codex Desktop'` to `chatgpt.com/backend-api/wham/usage`.<br>**What I checked:**<br>• Of Orca's own endpoints (relay, push, share, login, feedback), none was found receiving tokens.<br>• No user setting turns the OAuth poll off. It is skipped only when the statusline feed covers the account.<br>• The docs still say "No API calls, no extra auth".<br>**Add to the risk note:** OpenAI's app-server guide asks clients to send their own name as "the request originator for attribution" (developers.openai.com/siwc/token-sharing-open-source/codex-app-server). |
| S2 | A4 | PASS | CONFIRMED | O/src/shared/tui-agent-config.ts · O/src/main/claude/claude-structured-launch-resolution.ts#L64 · O/src/shared/default-global-settings.ts#L135 | 2026-10-19 | • Bare `claude` and `codex` TUIs.<br>• The experimental SDK path keeps `systemPrompt: { type: 'preset', preset: 'claude_code' }`.<br>• `experimentalNativeChat: false` by default. |
| S2 | A5 | PASS | CONFIRMED | O/docs/site/content/docs/mobile.mdx#L20 · O/mobile/src/files/file-tree.ts#L41 | 2026-10-19 | The listing excludes only `.git` and `node_modules`. Markdown and media previews are available on mobile. |
| S2 | A6 (a, b) | PASS | CONFIRMED | O/docs/site/content/docs/cli/reference.mdx#L100-L118 · O/src/main/codex-accounts/runtime-home-service-launch.ts#L64-L71 | 2026-10-19 | • "the system default runs Codex on the user's own ~/.codex".<br>• No transcript deletion on worktree removal was found.<br>• **Note:** default launch arguments are the yolo flags (R2). |
| S2 | A7 | PASS (workaround) | CONFIRMED | O/docs/site/content/docs/editing/file-explorer.mdx#L9-L11 | 2026-10-19 | "Drop files onto an agent terminal to paste their paths". Shared worktree. Sandbox clause not exercised. |
| S2 | A8 first-class, both directions | PASS | CONFIRMED | O/docs/site/content/docs/cli/reference.mdx#L100-L118 and #L167-L174 | 2026-10-19 | `orca worktree create … --agent codex\|claude --prompt … --json`, then `orca terminal read/wait/send`. The experimental "Runs" are not needed. |
| S2 | C1 | PASS | CONFIRMED | https://github.com/stablyai/orca/releases/expanded_assets/v1.4.229 | 2026-10-17 | `orca-windows-setup.exe` (217 MB). The latest release is now v1.4.230 (2026-10-19). |
| S2 | N1/N2/N3 Orca | PASS | CONFIRMED | https://github.com/stablyai/orca · history clone | retrieved 2026-10-19 | • 97.2k★, 151 watching.<br>• Of 13,170 human commits since 2026-04-22: Neil 40.1%, Brennan Benson 17.6%, Jinwoo Hong 14.4%, Jinjing 11.8%.<br>• 7,981 human commits since 2026-07-21. |
| S2 | F2 = 2 | 2 | CONFIRMED | as above | retrieved | min(97.2k, 37.7k). |
| S2 | F3 = 2 | 2 | CONFIRMED | App Store lookup id6766130217 | 2026-10-18 | App Store release, `iosUniversal`. |
| S2 | F4 = 2 | 2 | CONFIRMED | O/mobile/src/navigation/host-stack-screens.ts#L18 · O/mobile/app.json | 2026-10-19 | "Tablet split view swaps the detail pane instantly"; `supportsTablet: true`. |
| S2 | F5 = 2 | 2 | CONFIRMED | session-history.mdx#L39 | 2026-10-19 | Resume runs in the vendor TUI. |
| S2 | F6 = 2 / F8 = 2 | 2 | CONFIRMED WITH CAVEAT | Tailscale Serve and NAS pages | as in S1 | Same caveats as S1. |
| S2 | F7 = 2 | 2 | CONFIRMED | O/mobile/src/files/ (MobileFileMarkdownPreview, MobileFileMediaPreview) | 2026-10-19 | Phone previews of PC files. |
| S2 | F11 = 10/10 | 10 | CONFIRMED WITH CAVEAT | O/mobile/src/components/WorktreeListRow.tsx#L152 · O/docs/site/content/docs/cli/reference.mdx#L106 | 2026-10-19 | • "Child" badge and lineage on mobile; "records the new worktree as a child".<br>• Interrupt and send: terminal keys and `orca terminal send`.<br>• Spot-checked, not exhaustive. |
| S2 | Risk: token reads with spoofed UAs, "no off switch" | risk | CONFIRMED WITH CAVEAT | see A3 | 2026-10-19 | No setting found; a code path can skip the poll. |

### Stack 3 (S2): T3 Code + Tailscale

| Stack | Claim | Shortlist | Verdict | Primary source URL | Source date | Note |
|---|---|---|---|---|---|---|
| S3 | A1 (i)–(iii) | PASS | CONFIRMED | T/apps/mobile/src/features/threads/PendingApprovalCard.tsx#L22-L26 · T/apps/mobile/src/lib/modelOptions.ts#L53-L54 · T/apps/mobile/src/features/threads/NewTaskContextPickerScreens.tsx#L198 and #L260 · App Store lookup id6787819824 | 2026-10-15 | • "Allow once" / "Allow session" / "Decline".<br>• Provider drivers `codex` and `claudeAgent`.<br>• Environment and branch pickers.<br>• App 2.0.0 (T3 Tools, Inc.). |
| S3 | A2 (configuration: text generation → Claude) | PASS (config) | CONFIRMED | T/docs/user/thread-sidebar.md#L225 · T/apps/server/src/textGeneration/CodexTextGeneration.ts#L307 · T/packages/contracts/src/settings.ts#L1279-L1290 · T/apps/server/src/textGeneration/ClaudeTextGeneration.ts#L215-L246 | 2026-10-15 | • "Expand a tool call … to see its full command and output".<br>• Default helper is `codex exec … --ephemeral`. The Claude helper is `claude -p` without a no-persistence flag.<br>• The periodic SDK probe never sends a prompt (ClaudeProvider.ts L393-397), so it is not a session. |
| S3 | A3 + 7.16b policy risk | PASS + note | CONFIRMED (binding 7.16b) | T/apps/server/src/provider/claudeResetCredits.ts#L150-L177 · T/pnpm-workspace.yaml#L203 · P1 · https://learn.chatgpt.com/docs/sign-in-with-chatgpt | 2026-10-15; 2026-10-07; undated | • Reads `.credentials.json` (not on macOS) and sends a Bearer to `https://api.anthropic.com/api/oauth/usage` with `claude-cli/${version} (external, cli)`.<br>• "The SDK always receives the user's Claude executable".<br>• OpenAI lists **T3** under "Open-source integrations" for Sign in with ChatGPT (R7). |
| S3 | A4 | PASS | CONFIRMED | T/apps/server/src/orchestration-v2/Adapters/ClaudeAdapterV2.ts#L1125 and #L1188-L1194 · CodexAdapterV2.ts | 2026-10-15 | • `systemPrompt: { type: "preset", preset: "claude_code", append: … }`; tools default to `CLAUDE_CODE_PRESET_TOOLS`.<br>• Codex runs `codex app-server`, with `developer_instructions` appended. |
| S3 | A5 | PASS | CONFIRMED WITH CAVEAT | T/apps/server/src/workspace/WorkspaceEntries.ts#L273-L310 | 2026-10-15 | `list` does a live `readdir` that skips only `.git`. The shortlist's #L215-L222 points at `browse` (directories only; hides dot-directories), which is the wrong function. |
| S3 | A6 | PASS | CONFIRMED | ClaudeAdapterV2.ts#L1122-L1124 · CodexAdapterV2.ts (no `ephemeral`) | 2026-10-15 | `sessionId`/`resume` is set. |
| S3 | A7 | PASS | CONFIRMED | T/apps/server/src/mcp/toolkits/orchestrator/tools.ts#L66-L72 | 2026-10-15 | "omitted isolation shares the parent checkout". |
| S3 | A8 first-class, both directions | PASS | CONFIRMED | T/docs/orchestration-v2/orchestrator-mcp-server.md#L182-L191 and #L401-L414 | 2026-10-15 | • `t3_thread_send` "Sends a message to any ordinary or delegated thread".<br>• Note: "There is no task-level follow-up API for preserving the same reviewer session". Thread messaging resumes the child. |
| S3 | C1 (via WSL2) | PASS | CONFIRMED | T/docs/user/background-service.md · T/docs/user/install.md | 2026-10-15 | "Linux needs systemd user services. Setup enables lingering"; `winget install T3Tools.T3Code`; WSL section. |
| S3 | N1/N2/N3 | PASS | CONFIRMED | https://github.com/pingdotgg/t3code · https://github.com/pingdotgg/t3code/releases/latest · history clone | retrieved; v0.1.0 15 Oct | • 28.4k★.<br>• Of 4,977 human commits: Julius Marminge 41.1%, Theo Browne 13.4%.<br>• "T3 Code Orchestrator V2 is now stable". |
| S3 | "Beta" label | caveat | CONFIRMED | T/apps/desktop/package.json#L45 | 2026-10-15 | `"productName": "T3 Code (Beta)"`. |
| S3 | F3 = 2, F4 = 2 | 2 / 2 | CONFIRMED | App Store lookup id6787819824 | 2026-10-15 | Release notes: "Redesigned navigation, with real iPad columns". |
| S3 | F5 = 2 | 2 | CONFIRMED WITH CAVEAT | ClaudeAdapterV2 sessionId · CC headless | 2026-10-15 | No T3 doc covers opening a thread in the vendor TUI. This is inferred from the persisted native IDs plus vendor resume docs. Sessions live in the WSL2 home. |
| S3 | F6/F7/F8 = 2 | 2 | CONFIRMED WITH CAVEAT | T docs/user/composer.md (previews) · Tailscale | 2026-10-15 | Serve → WSL2 relies on the T3 Tailscale flag; the shortlist already lists #9228. |
| S3 | F11 = 10/10 | 10 | CONFIRMED WITH CAVEAT | T/apps/web/src/components/ChatView.tsx#L4351-L4355 · T/packages/contracts/src/orchestrationV2.ts#L449-L453 | 2026-10-15 | thread-sidebar.md L221 says "Subagent threads started by the agent can't take messages". The code limits that to provider-native subagents, so delegated children stay messageable. |

### Stack 4 (S4): Maestro + agentsview + Tailscale

| Stack | Claim | Shortlist | Verdict | Primary source URL | Source date | Note |
|---|---|---|---|---|---|---|
| S4 | A1 (configuration-scoped: Full Access + `--disallowedTools AskUserQuestion`) | PASS (config, untested) | CONFIRMED WITH CAVEAT | M/docs/remote-control.md#L16 · M/docs/provider-notes.md#L56 · M/src/main/permission-relay/integration.ts#L44-L56 · M/src/main/web-server/handlers/bridgeHandlers.ts#L53-L62 · M/src/main/utils/safe-send.ts#L59 · M/src/renderer/components/NewInstanceModal/NewInstanceModal.tsx#L1101-L1117 · CC cli-reference | 2026-10-09; main 738deed 2026-10-19 | **Source confirms the catch:**<br>• Relay requests use `win.webContents.send(PERMISSION_REQUEST_CHANNEL, …)`, not the `safeSend` fan-out that feeds web clients. Standard-mode prompts never reach the phone. Main is unchanged.<br>• `--disallowedTools` = "Deny rules. A bare tool name removes the matching tools from Claude's context".<br>**Untested:** "questions arrive as text" is model behaviour.<br>**(iii):** the directory is a typed field; Browse opens a desktop dialog. |
| S4 | A2 (with agentsview) | PASS | CONFIRMED | V/docs/usage.md#L630-L640 · V/internal/config/config.go#L1252 | 2026-10-09 | • "Tool invocations display … the tool name, arguments, and output".<br>• Default `ResultContentBlockedCategories: {"Read", "Glob"}`.<br>• No `--no-session-persistence` or `--ephemeral` anywhere in Maestro src. |
| S4 | A3 + 7.16b (Codex `auth.json` read; no Claude token read) | PASS + note | CONFIRMED WITH CAVEAT | M/docs/provider-notes.md#L58-L72 · M/src/shared/claudeTokenMode.ts#L100-L110 · M/src/main/agents/codex-auth.ts#L95-L101 · P1 | 2026-10-09; 2026-10-07 | **Default mode:** the local default is `api` = `claude --print`. Maestro's docs say this "bills per-token API credit". Anthropic says `-p` draws subscription limits, so A3 holds with no API key set.<br>**Forward risks** (paused change, `--bare`) hit this default path.<br>**Avoid Dynamic,** which "auto-switches to API".<br>**Credential reads:** Codex token goes to `chatgpt.com/backend-api/wham/…`. No Claude credential read was found. |
| S4 | A4 | PASS | CONFIRMED | M/src/main/ipc/handlers/process/handle-spawn.ts#L440-L501 | 2026-10-09 | `--append-system-prompt` (`-file` on Windows). |
| S4 | A5 | PASS | CONFIRMED | M/docs/remote-control.md#L16-L27 · M/docs/general-usage.md#L55-L72 | 2026-10-09 | "the Files / History / Auto Run panel open full screen" on phones. |
| S4 | A6 | PASS | CONFIRMED | M/docs/cli.md#L94-L98 | 2026-10-09 | `maestro-cli send <agent-id> … -s <session-id>`; transcripts persist. |
| S4 | A7 | PASS (workaround) | CONFIRMED | M/docs/cli.md (create-worktree) | 2026-10-09 | Shared filesystem. Sandbox clause not exercised. |
| S4 | A8 first-class, both directions | PASS | CONFIRMED | M/docs/cli.md#L89-L246 · M/src/main/agents/definitions.ts#L262-L270 | 2026-10-09 | `send`, `dispatch --new-tab`, `-t <tab>`, `--notify-on-complete`. Codex runs `exec --dangerously-bypass-approvals-and-sandbox` ("required by Maestro"). |
| S4 | C1 | PASS | CONFIRMED | https://github.com/RunMaestro/Maestro/releases/expanded_assets/v1.0.0 · https://github.com/kenn-io/agentsview/releases | 2026-10-09 | `Maestro-Setup-1.0.0-x64.exe`, `Maestro-Portable-1.0.0-x64.exe`, `AgentsView-0.45.0-windows-amd64.msi`. The web UI is "the default interface" (WebServer.ts L1622-L1627), not an opt-in Encore feature. |
| S4 | N1/N2/N3 Maestro | PASS | CONFIRMED WITH CAVEAT | https://github.com/RunMaestro/Maestro · history clone · releases | retrieved; v1.0.0 2026-10-09 | • 3.5k★. Pedram Amini 68.5%.<br>• Raza is 11.9% only when "Raza Rauf" (9.5%) and "Raza Mair" (2.4%) are merged. They are plausibly one person: Raza Mair merges Raza Rauf's branches.<br>• Independently, jSydorowicz21 landed 27 commits authored by others.<br>• v1.0.0 published by pedramamini. |
| S4 | N1/N2/N3 agentsview | PASS | CONFIRMED | https://github.com/kenn-io/agentsview · history clone | retrieved; v0.45.0 2026-10-09 | • 6.2k★.<br>• Wes McKinney 25.7%, Rod Boev 23.9%, Marius van Niekerk 13.8%.<br>• Release by wesm. |
| S4 | F5 = 2 | 2 | CONFIRMED WITH CAVEAT | M/docs/history.md#L138-L146 | 2026-10-09 | Maestro's RESUME reopens in Maestro's own AI Terminal. Vendor-TUI continuation is inferred from native session IDs. |
| S4 | F6/F7/F8 = 2 | 2 | CONFIRMED WITH CAVEAT | Tailscale pages · Maestro File Explorer | as above | As in S1. |

### Policy facts that decide A3 (all stacks)

| Stack | Claim | Shortlist | Verdict | Primary source URL | Source date | Quote / note |
|---|---|---|---|---|---|---|
| all | P1 Anthropic: subscription use of `claude -p` and the Agent SDK | allowed; change paused | CONFIRMED | https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan · https://support.claude.com/en/articles/17154008-monthly-api-credits-for-max-and-team-plans | 2026-10-07 (both dateModified) | • "Update October 7, 2026: Claude Max and Team plans now include monthly API credits, which cover the Claude Agent SDK, claude -p, the Claude API, and Claude Managed Agents. You can still use the Claude Agent SDK, claude -p, and third-party apps with your subscription limits."<br>• "Update June 15, 2026: We've paused the previously-announced changes to Claude Agent SDK usage. For now, nothing has changed: Claude Agent SDK, claude -p, and third-party app usage still draw from your subscription limits."<br>• The credits are "Separate from your plan limits". |
| all | P2 Anthropic: third-party reading of OAuth tokens | policy risk | CONFIRMED | CC legal-and-compliance | undated, retrieved 2026-10-19 | • "Anthropic does not permit third-party developers to offer Claude.ai login into their own applications, or to route requests through Free, Pro, or Max plan credentials on behalf of their users. Moreover, developers may not collect, store, or intermediate Claude.ai credentials or session tokens — sign-in to a Claude account must complete through Anthropic's own flow."<br>• "Anthropic reserves the right to take measures to enforce these restrictions and may do so without prior notice." |
| all | P3 OpenAI: Codex sign-in for local apps | ChatGPT sign-in is subscription | CONFIRMED (+ addition) | LC auth · https://developers.openai.com/siwc/token-sharing-open-source · https://learn.chatgpt.com/docs/sign-in-with-chatgpt | undated, retrieved 2026-10-19 | • "Sign in with ChatGPT for subscription access … The ChatGPT desktop app, Codex CLI, and IDE extension support both sign-in methods for local work. Codex cloud requires signing in with ChatGPT."<br>• SIWC: "These docs explain ChatGPT plan usage for open-source and locally hosted apps", including via Codex app-server.<br>• The partner page lists "Open-source integrations: OpenClaw, OpenCode, Pi, T3" and plan-usage apps including Conductor and Warp. |
| all | P4 "Codex Cloud (Legacy)" deprecation | deprecation notice | CONFIRMED | https://learn.chatgpt.com/docs/environments/cloud-environments | undated, retrieved 2026-10-19 | • "Codex Cloud (Legacy) continues to support Code Review and the Linear and GitHub integrations. We plan to deprecate this experience."<br>• The Legacy guide itself (…/environments/cloud-environment) does not repeat the sentence.<br>• The new Codex Cloud is the successor. `@codex` comments other than `review` still start "a legacy cloud chat" (LC third-party/github). |

### Negative claims (nearest misses and screen-outs), checked where cheap

| Stack | Claim | Shortlist | Verdict | Primary source URL | Source date | Note |
|---|---|---|---|---|---|---|
| G2 | `@codex` connector fails N3 | FAIL | CONFIRMED | P4 · LC third-party/github | undated | It relies on the Legacy cloud, which has a deprecation notice and no successor for this integration. |
| Happy | Happy CLI fails N3 (maintenance mode) | FAIL | CONFIRMED (source differs) | https://github.com/slopus/slopus.github.io/blob/5ace459bc60021198d75e61c86b74ba96ac1c773/content/desktop/guides/terminal.mdx | 2026-10-14 | • "It is in maintenance mode: it gets critical fixes, and new features ship in Happy Desktop."<br>• The repo README (slopus/happy@36b11c5) has no such notice.<br>• The date "2026-10-06" was not verified. |
| code-server | fails N3 | FAIL | CONFIRMED | https://github.com/coder/code-server/blob/f07405cba33179e6d2058af07ca2be290f19b262/docs/MAINTAINING.md#L19-L21 | retrieved 2026-10-19 | "we are not generally actively developing code-server aside from fixing regressions". N2 was not rechecked. |
| Vibe Kanban | fails N3 | FAIL | CONFIRMED | https://github.com/BloopAI/vibe-kanban | retrieved 2026-10-19 | README: "**Vibe Kanban is sunsetting.**" |
| Paseo | fails N2 | FAIL | CONFIRMED WITH CAVEAT | https://github.com/getpaseo/paseo | retrieved 2026-10-19 | • README: "built by one person and funded by the people who use it". The shortlist's wording "Maintained by one person, full time" was not found.<br>• The second-human merge and release check was not repeated. |
| Agent Swarm | fails N1 | FAIL | CONFIRMED | https://github.com/desplega-ai/agent-swarm | retrieved 2026-10-19 | 904★. |
| Superset | nearest miss at C1 | FAIL | CONFIRMED | https://github.com/superset-sh/superset | retrieved 2026-10-19 | • README: "**Windows**: not yet available"; Linux AppImage "(experimental; macOS is the primary target)".<br>• Strictly, C1 is PARTIAL (experimental Linux build) rather than a hard FAIL. It is still a miss. |
| Conductor | fails C1 | FAIL | CONFIRMED WITH CAVEAT | https://www.conductor.build/docs/ | retrieved 2026-10-19 | "Get Conductor running on your Mac." The shortlist's quote was not found on the docs index. |
| Warp Oz | fails A3 | FAIL ("API keys only") | CONFIRMED (reason refined) | https://docs.warp.dev/platform/faqs/ | Last updated Oct 12, 2026 | • "No. A connected ChatGPT subscription applies to Warp Agent conversations in the Warp app, not cloud agent runs." "Warp also doesn't support connecting a Claude consumer subscription."<br>• Cloud runs use Warp-provided inference or team-managed keys. |
| Docker Sandboxes | nearest miss, A3 for Codex | FAIL | CONFIRMED | https://hub.docker.com/r/sbx/codex-kit | "Updated 11 days ago" (about 2026-10-08) | • "points Codex at a ChatGPT-backed model provider and the proxy spends the OAuth token on your behalf".<br>• Docker is absent from OpenAI's partner list (P3). |

Not checked (cost): Intent N1, Scion N2, Parallel Code N2, Archon A5, Gas City A1/A5, and the agent-view, Claude GitHub App and Warp-client nearest misses.

---

## 3. Rule-application issues

- **R1. The strict-readings ranking claim is overstated (sections 1–2 of the shortlist).**
  - The shortlist says Stack 1 is "the only stack that passes under every strict reading".
  - Its own decision 11 says default retention "fails A6b" for every stack. S1 is included: Codex→Claude `claude -p` transcripts are CLI transcripts under the 30-day sweep. Only Desktop-started ones are kept "at any age".
  - Its decision 12 strict alternative removes S1's SMB route. A5 then rests on ChatGPT's iOS workspace file browser, which covers ChatGPT projects only.
  - Fix: scope the criterion to "the four 7.16 strict alternatives and the defaults-only reading". Under that scope S1 is still the only survivor, so the ranking is unchanged.
- **R2. Uneven risk disclosure on permission bypass.**
  - Orca's shipped defaults launch Claude with `--dangerously-skip-permissions` and Codex with `--dangerously-bypass-approvals-and-sandbox`. Sources: O/src/shared/tui-agent-permissions.ts#L6-L11; O/src/shared/tui-agent-launch-defaults.ts#L18-L19; docs: "The defaults below pass each agent's permission-bypass flag for new launches" (O/docs/site/content/docs/agents/supported.mdx#L10-L21).
  - Stack 2's "Why" promises phone "approvals", but its setup and risks never mention this. For Maestro, the same property is the headline "catch".
  - Gates are unaffected: in Manual mode, TUI prompts are answerable with Live keystrokes.
  - Per 7.17's configuration rule, Stack 2 needs a numbered step: Settings → Agents → Agent Permissions → **Manual**. In Manual, Codex-side `orca …` calls may then need approvals.
- **R3. Uneven forward-risk disclosure on headless Claude.**
  - The paused-policy risk is listed for S1 and S3 only. It applies at least as strongly to S4, whose default Claude path is `claude --print`. Maestro's own docs even claim that path "bills per-token API credit"; that contradicts Anthropic's 2026-10-07 note, and Anthropic is authoritative.
  - No stack mentions the documented plan to make `--bare` the default for `-p`. Bare mode "never reads OAuth credentials".
  - This hits S1's Codex→Claude path and S4's default. For S3 it depends on what the Agent SDK passes.
  - No verdict changes today.
- **R4. 7.17 "every condition is a numbered setup step".**
  - S1 relies on Codex approving `claude` calls that need network access. Its setup should name either "approve per call (from the phone)" or a Codex rule. Currently this appears only in A7's evidence cell.
  - S4 should state its Claude Token Source (API with no key, or TUI Wrapper; not Dynamic). With no API key set, Dynamic's fallback is still subscription `-p`, so this is clarity, not a gate.
- **R5. 7.16d borderline, not decided by the shortlist.**
  - S4's A1 recipe removes a standard tool through a deny rule (`--disallowedTools AskUserQuestion`).
  - T3's Claude helper runs use `--tools ""` or a read-only subset.
  - Under the binding text ("substitutes its own tool set") neither is a substitution, so A4 stays PASS.
  - Under a stricter "any tool-set change" reading, S4 would trade an A1 PASS for an A4 PARTIAL and become a nearest miss. T3's helper path, but not its agent sessions, would be PARTIAL.
  - The final report should record this alongside the 7.16 strict alternatives.
- **R6. Orca's 7.16c strict alternative is mis-attributed.**
  - The shortlist says Orca fails A3 because "an experimental Agent SDK path is offered".
  - Under 7.6, the Agent SDK self-hosted on the user's own login with the `claude_code` preset is a PASS row, and P1 allows SDK subscription use. That path is not non-compliant in itself; Orca's SDK path keeps the preset.
  - Orca is a nearest miss under 7.16b strict anyway (Claude token side-read), so the outcome is the same.
- **R7. T3's "Connect with ChatGPT" is an OpenAI-documented consent path (P3).**
  - It is a PASS row of 7.6 ("codex app-server with externally managed ChatGPT tokens: PASS only with OpenAI-documented consent for local or open-source apps"), with F1 PARTIAL if used.
  - The shortlist's "never use" step is conservative but not required. No score changes, because S3's F1 is already 1 from the Claude side-read.
- **R8. Citation accuracy.** None of these changes a verdict, but each needs fixing before the final report:
  - T3 A5 cites `browse`, not `list`.
  - The S1 A6b Codex permalink range doesn't show the 7-day compression (that is in compression.rs L364).
  - The S1 F4 source (CC mobile) doesn't show an iPad layout; App Store iPad screenshots do.
  - Apple 118392 is "About iOS 13 Updates".
  - Orca's current docs no longer mention agent choice on mobile create (the code does).
  - The quoted wording for Paseo, Superset, Conductor and Happy differs from current primary text, though the substance holds.
  - The "Codex Cloud (Legacy) … We plan to deprecate" sentence is on the Cloud environments page, not the Legacy page.
- **R9. S1 A2 (Codex half) rests on indirect UI evidence.** No OpenAI page says verbatim that each tool call's input and result is shown. The vendor TUI route (`codex resume` on the shared home, sources include `Custom("chatgpt")`) is the cleaner one-surface proof. The shortlist should cite it.
- **R10. Scoping consistency on deprecation notices (no change).**
  - claude-desktop's Dispatch ("isn't available to new users") was scoped out instead of failing N3. That matches the 7.3 successor rule and the 7.16c scoping, because Dispatch is not core to S1.
  - The same kind of notice failed `@codex` and the Happy CLI, where it hit the core surface.
  - Record this in the final report so the treatment is visibly uniform.

---

## 4. Open questions

1. **Does `claude remote-control` server mode run unattended on Windows?** The test is a Task Scheduler logon task with no interactive console, after one-time trust and enable. If it doesn't, S1's A1 Claude half (iii) falls back to Desktop sessions toggled to Remote Control, and C1's supervision note changes. A hands-on test settles it.
2. **iOS Files over Tailscale SMB on cellular (#18967), and source-file previews.** If SMB fails off-LAN, S1's A5 depends on the ChatGPT workspace file browser, which covers ChatGPT projects only. A5 would become PARTIAL unless every repo is a ChatGPT project and the Claude worktrees under `.claude/worktrees` are visible there.
3. **When `--bare` becomes the `-p` default**, does plain `claude -p` lose subscription auth, and does the Agent SDK pass explicit flags? This decides the future of A3/A6a for S1's Codex→Claude path, S4's default mode and S3's SDK path. Fallbacks: `claude --bg` (S1), the TUI Wrapper (S4).
4. **Codex approvals for delegation.** On Windows, does each `claude -p` (S1) or `orca …` call (S2 in Manual mode) from a sandboxed Codex need an approval, and can a documented rule pre-approve it? This affects A8 friction, not the verdict.
5. **Maestro: with `AskUserQuestion` denied, does Claude reliably ask in plain text?** A hands-on test settles S4's A1 recipe.
6. **Codex desktop app tool-call fidelity.** A primary statement that each tool call's input and output is viewable in the app (and on the phone) would firm up S1's A2 Codex half beyond the TUI route.
7. **Claude Desktop side chats** are "not saved to disk". If they run tools they would fail A2 "after the run" for that session kind. S1 could add "don't use side chats for work that needs an audit trail".
8. **Not rechecked:** Intent N1, Scion N2, Parallel Code N2, Archon A5, Gas City A1/A5. Any of these could change the nearest-miss list, but not the shortlist.
