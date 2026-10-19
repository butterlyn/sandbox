# AgentView (reading B): agentsview

- Slug: agentview-b
- Canonical: https://github.com/kenn-io/agentsview (moved from github.com/wesm/agentsview, which now serves the kenn-io repo) · https://agentsview.io
- Layer(s): client/UI (transcript viewer, with a read-only MCP server and a session API)
- Open source: yes (MIT, "Copyright (c) 2026 Kenn Software LLC")
- Latest release checked: v0.45.0, 2026-10-09, https://github.com/kenn-io/agentsview/releases/tag/v0.45.0 (source read at `main` `4b15b06`, 2026-10-18)
- Checked: 2026-10-19 by screen-agentview-b

## Summary
- Screen: PASS. N3, N1, N2 and C1 PASS; A1, A3 and A4 are N/A (layer).
- Deep-dive (2026-10-19, against v0.45.0):
  - **A2:** PASS as a stack UI, after setting `result_content_blocked_categories = []`.
  - **A6b:** retrieval PASS, persistence PARTIAL (it keeps a parsed copy, not native JSONL).
  - **A5:** PARTIAL (an edit feed only). Other gates are N/A (layer).
  - **FAVOUR:** F1–F10 4/20; F11a–e 5/10.
  - **Key fact:** cross-harness delegated runs (`codex exec` from Claude, `claude -p` from Codex) are listed, but not linked to their parent in v0.45.0. Linking is unreleased, on `main` only.
- Correction (2026-10-19, deep-dive): the default archive does not store result content for `Read` and `Glob` tool calls (`result_content_blocked_categories = ["Read", "Glob"]`, v0.45.0 `internal/config/config.go#L1252`). The "full" row in the Facts table needs that caveat.
- Correction (2026-10-19, deep-dive): in v0.45.0 the MCP tools are `search_sessions`, `list_sessions`, `get_session_overview`, `get_messages`, `get_memory_status`, `search_content`, `get_usage_summary` and `query_recall`. `get_tool_calls` and `get_child_sessions` exist only on `main`.
- **Active, with a team behind it.** v0.45.0 shipped 2026-10-09, and `main` has 724 non-bot commits from 89 authors in the last 90 days. 6.2k stars. In the N2 window, three humans each wrote over 10% of non-bot commits: Wes McKinney 25.7%, Rod Boev 23.9% and Marius van Niekerk 13.8%. Marius also merges other people's PRs.
- **The rename.** v0.30.0 (2026-05-24) moved the repo from Wes McKinney's personal account to the `kenn-io` org. That org belongs to Kenn Software LLC, "a small team of veteran builders led by Wes McKinney". The project moved from one person's account to a company with a named team, which supports N2. Wes still tags every release (42 in the window).
- **C1.** It installs natively on Windows: the desktop app (MSI or setup.exe), a CLI zip or a PowerShell installer. It also installs inside WSL2: Linux tarball, AppImage or Docker. Transcripts on the other side of the WSL2/Windows boundary need documented config:
  - agentsview in WSL2: add `dirs` entries such as `/mnt/c/Users/you/.claude/projects`;
  - Windows desktop app: `wsl:<distro>:/path` markers, which become `\\wsl.localhost\…` paths.
- **Strong viewer for A2/A6b.**
  - Each tool call renders with its arguments and output, and Claude subagent transcripts nest under their parent.
  - It reads `~/.claude/projects` and `~/.codex/sessions` + `archived_sessions`.
  - Its SQLite archive keeps sessions after their source files are deleted.
  - Exports: HTML, Markdown (`?depth=all` inlines subagents), raw source and Gist.
- **Caveat: it does read credentials, contrary to the premise.** Two opt-in features read vendor credentials (both off by default): Codex Cloud import reads the ChatGPT token from `auth.json` and sends it to undocumented chatgpt.com endpoints; claude.ai chat sync works inside a claude.ai web session. It never reads Claude Code's own credentials. Optional Resume, fork and Insights features also start the unmodified `claude`/`codex` binaries on the PC.

## Screen
| ID | Verdict | Evidence (short quote or exact paraphrase) | Source URL | Source date |
|----|---------|---------------------------------------------|------------|-------------|
| N3 | PASS | **(a)** No archived banner. **(b)** No deprecation notice for the project. The only "deprecated" text concerns one parsed agent: "Amp support is deprecated because current Amp releases may store threads server-side". **(c)** v0.45.0 was published 2026-10-09 by `wesm` and is marked Latest. `main` has 724 non-bot commits since 2026-07-21, from 89 distinct authors. The newest is `4b15b06` (2026-10-18). | https://github.com/kenn-io/agentsview/releases/tag/v0.45.0 · https://github.com/kenn-io/agentsview · https://github.com/kenn-io/agentsview/commit/4b15b064a8f619267abd28fab3192af8a1eaa88a · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/README.md#L370-L375 | 2026-10-09 · retrieved 2026-10-19 · 2026-10-18 · 2026-10-18 (file at HEAD) |
| N1 | PASS | 6.2k stars and 699 forks on `kenn-io/agentsview` (MIT), the repo that holds the source. `github.com/wesm/agentsview` serves the same repo (page title "GitHub - kenn-io/agentsview"). | https://github.com/kenn-io/agentsview · https://github.com/wesm/agentsview | retrieved 2026-10-19 |
| N2 | PASS | **Window** 2026-04-22 → 2026-10-19 on `main`, from a `--shallow-since` clone and `git shortlog`. **Commits:** 1,277. Excluding renovate[bot] (41), dependabot[bot] (6) and kenn-hound[bot] (2) leaves 1,228 non-bot. No commit has an AI-agent author identity. 63 carry AI co-author trailers (Claude, Codex), all with human authors. **Authorship:** Wes McKinney 316 (25.7%), Rod Boev 294 (23.9%), Marius van Niekerk 169 (13.8%), Phillip Cloud 87 (7.1%), Matthew Jacobs 66 (5.4%). **Merges:** "mariusvniekerk merged commit 4b15b06 into kenn-io:main Oct 18, 2026" (#2309, authored by salmonumbrella). **Releases:** 42 tags in the window, all tagged by Wes McKinney. GitHub shows v0.43.0–v0.45.0 published by `wesm` and v0.41.1/v0.42.0 by `github-actions`. **Organisation:** `kenn-io` is "Kenn Software", "a small team of veteran builders led by Wes McKinney". Its team section lists Wes McKinney, Phillip Cloud and Marius van Niekerk. **Move:** the v0.30.0 changelog says "Rename the upstream repository to github.com/kenn-io/agentsview, publish the container image at ghcr.io/kenn-io/agentsview, and adopt the go.kenn.io/agentsview vanity Go module path". | https://github.com/kenn-io/agentsview/pull/2309 · https://github.com/kenn-io/agentsview/releases · https://kenn.io · https://github.com/kenn-io · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/docs/changelog.md#L3158-L3165 | 2026-10-18 · retrieved 2026-10-19 · undated, retrieved 2026-10-19 · retrieved 2026-10-19 · 2026-05-24 (v0.30.0 entry) |
| C1 | PASS | **Windows, native.** v0.45.0 ships `AgentsView_0.45.0_x64-setup.exe` and `AgentsView-0.45.0-windows-amd64.msi`/`-arm64.msi` (desktop app), plus `agentsview_0.45.0_windows_amd64.zip`/`_arm64.zip` (CLI). README: "Windows (PowerShell): … `irm https://agentsview.io/install.ps1 \| iex`" and "desktop app (macOS / Windows)". **WSL2:** `agentsview_0.45.0_linux_amd64.tar.gz`/`_arm64`, AppImages, and the "macOS and Linux" `install.sh` give `PASS (via WSL2)` for the CLI/daemon. The Docker image is `ghcr.io/kenn-io/agentsview`. **Transcripts across the boundary:** "To scan more than one directory per agent — for example, when running Windows and WSL side by side — add array fields" (example: `/mnt/c/Users/you/.claude/projects`). "All listed directories are discovered, watched, and synced independently." For the Windows desktop app, "`CODEX_SESSIONS_DIR=wsl:Ubuntu:/home/me/.codex/sessions` (becomes `\\wsl.localhost\Ubuntu\home\me\.codex\sessions` …)" (`translate_desktop_env_value`). Inside WSL, when bound to `0.0.0.0`, it advertises the WSL `eth0` address. **Unattended:** `daemon start` runs the server "as `serve --background` … without opening a browser". There is no OS-service installer for the main daemon; installers exist only for `pg`/`clickhouse` push. On Windows the desktop app closes to the tray and "keeps the backend running". **Caveat:** desktop/README says "experimental Tauri desktop wrapper". It ships in the stable release, so per 7.16a it counts; the label is recorded here. **iPhone side:** usable in Safari (see A1). | https://github.com/kenn-io/agentsview/releases/expanded_assets/v0.45.0 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/README.md#L22-L57 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/docs/configuration.md#L1429-L1460 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/desktop/README.md#L1-L12 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/desktop/README.md#L63-L66 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/desktop/README.md#L100-L105 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/desktop/src-tauri/src/lib.rs#L1172-L1193 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/cmd/agentsview/managed_caddy.go#L50-L84 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/docs/commands.md#L295-L315 | 2026-10-09 (assets) · 2026-10-18 (files at HEAD) |
| A1 | N/A (layer) | A read-only transcript viewer. It does not start agent work sessions or send them messages. **Recorded for the stack (7.4 items):** (i) yes: it lists Claude and Codex sessions and renders live or recent transcripts in a phone browser ("Live updates via SSE as active sessions receive new messages"). The mobile layout dates from 0.16.0 ("responsive sidebar"); the frontend has `isMobileViewport` and a `mobile-nav` bar. (ii) no: it cannot send input to a running session or answer approvals. (iii) no: Resume and fork open a terminal on the PC, not on the phone, and sessions from other hosts offer only "Copy command". There is no iOS app and no PWA manifest. **Remote reach:** "binds to `127.0.0.1` by default". A persistent non-loopback `host` "requires `require_auth`; the server refuses to start" without it. A bearer token guards every `/api/` route, and SSE accepts `?token=`. Managed Caddy adds TLS and `--allowed-subnet`. Behind a proxy, or from WSL2, `--public-url` must match the browser origin (Host check against DNS rebinding). For HTTP remote sync the docs recommend "private networking such as Tailscale". **Caveats:** `--host` "permits a one-off unauthenticated non-loopback bind". "Auth is enforced on API routes, not on static assets". The desktop app's sidecar listens on `127.0.0.1` on a random port (`--port 0`), so phone access means running the CLI daemon. | https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/README.md#L365 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/docs/changelog.md#L4022-L4048 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/frontend/src/lib/components/layout/ThreeColumnLayout.svelte#L211-L245 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/docs/usage.md#L1125-L1151 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/docs/remote-access.md#L6-L88 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/docs/remote-access.md#L459-L470 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/docs/remote-access.md#L641-L716 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/desktop/src-tauri/src/lib.rs#L902-L911 | 2026-10-18 (files at HEAD) · 2026-03-24 (0.16.0 entry) |
| A3 | N/A (layer) | It runs no inference of its own and launches no agent work sessions. **Harness processes it does start (optional features).** Each uses the unmodified binary from PATH (or `[agent.<name>] binary`) with the inherited environment, so the user's own CLI login applies (a 7.6 PASS row):<ul><li>Insights runs `claude -p --output-format json --no-session-persistence --tools ""` and `codex exec --json --sandbox read-only --skip-git-repo-check --ephemeral -`.</li><li>Resume runs `claude --resume <id>` or `codex resume <id>` in a terminal on the PC. For Claude it appends `--dangerously-skip-permissions` when `skip_permissions` is set, and `--fork-session` for forks.</li></ul>**Credentials:** it never reads Claude Code's `.credentials.json` or keychain. Opt-in Codex Cloud import reads the ChatGPT token in `auth.json` (off by default), and opt-in claude.ai chat sync uses a claude.ai web session; see "Credential-handling policy risk". Both are non-inference reads from the vendors' own endpoints, so under 7.16b they do not affect A3. | https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/internal/insight/generate.go#L153-L155 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/internal/insight/generate.go#L216-L226 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/internal/insight/generate.go#L347-L360 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/internal/server/resume.go#L44-L59 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/internal/server/huma_routes_sessions.go#L1633-L1640 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/docs/recall.md#L102-L135 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/internal/config/codex_cloud.go#L19-L36 | 2026-10-18 (files at HEAD) |
| A4 | N/A (layer) | Not a harness and runs no agents. Every process it starts is the vendor's own unmodified `claude` or `codex` binary; it has no other harness path. | https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/internal/insight/generate.go#L216-L226 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/internal/server/resume.go#L44-L59 | 2026-10-18 (files at HEAD) |

## Facts for stack composition
All source links are pinned to `4b15b06` (2026-10-18) unless noted. Prefix: `https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/`.

| Fact | Finding | Source |
|------|---------|--------|
| Transcript sources | Claude Code: `~/.claude/projects/`, including "optional subagents/ trees". Codex: `~/.codex/sessions/` and `~/.codex/archived_sessions/` (or `$CODEX_HOME`). 20+ other agents are supported. Env vars or `[agents.<id>] dirs` override the paths. Codex Cloud is opt-in. | `README.md#L387-L391`, `docs/configuration.md#L520-L528`, `docs/configuration.md#L1495-L1496`, `internal/parser/claude_provider.go#L510` |
| A2 "full record" | "Tool invocations display as collapsible amber-bordered sections showing the tool name, arguments, and output … Tool result content is stored alongside the tool call when available, giving a complete view of input and output." Output has a Raw/Formatted toggle, and input and output each have a copy button. Codex bash, `write_stdin` and `apply_patch` calls get structured previews. A Task/Agent tool block linked to a subagent opens "the subagent's full transcript inline", and the sidebar shows a sub-agent tree under each parent. | `docs/usage.md#L690-L743`, `docs/usage.md#L472-L493` |
| Own copy (A6b, 30-day cleanup) | A SQLite archive in the data dir (`~/.agentsview` or `AGENTSVIEW_DATA_DIR`). The default `archive_content = "full"` stores "Parsed messages, reasoning, titles, tools, and results". A full rebuild "copies archived sessions whose sources are gone". Sessions therefore survive Claude's cleanup as a **parsed** copy, not the native JSONL, so `claude --resume` cannot use them. The narrower `transcripts` and `usage` policies drop tool payloads. | `docs/configuration.md#L52-L74` |
| Search | Command palette: full text (FTS5), semantic and hybrid. A deeper search covers tool inputs and results and accepts regex. The MCP tool `search_content` does substring, regex, semantic or hybrid search. | `docs/usage.md#L1013-L1030`, `docs/mcp.md#L74-L89` (last_edited 2026-10-09) |
| Export | <ul><li>Standalone HTML that works offline, with a Normal/Focused toggle.</li><li>Markdown at `GET /api/v1/sessions/{id}/md?depth=all`, which embeds subagents next to the tool call that spawned them, "well-suited for handing session context to another agent".</li><li>`agentsview session export <id>` streams the raw source file.</li><li>Public or secret Gist; local publishing uses `gh auth token`.</li></ul> | `docs/usage.md#L1176-L1230`, `docs/commands.md#L1756` |
| Agent access (A8 "monitor" lead) | `agentsview mcp` is a read-only MCP server (`list_sessions`, `get_messages`, `get_tool_calls`, `get_child_sessions`, …), and the README lists "native Claude Code and Codex plugins". Either harness can therefore read the other's transcripts. Neither can create or resume sessions through it. | `docs/mcp.md#L7-L13`, `docs/mcp.md#L74-L89`, `README.md#L360-L362` |
| Native-app hand-off (F5/F10 leads) | The Resume menu offers four actions:<ul><li>Launch a terminal: macOS, Linux or a custom terminal. On Windows the error is "unsupported OS … for terminal launch", so only copy-command works.</li><li>"Copy command".</li><li>"Open in Codex Desktop" (`codex://threads/<id>`).</li><li>"Open in Claude Code" / Claude Desktop (`claude://resume?session=…`, launched with macOS `open`).</li></ul>Launch actions apply to local sessions only, and read-only (`pg`/`duckdb serve`) mode refuses them. | `docs/usage.md#L1125-L1151`, `internal/server/resume.go#L396-L408`, `internal/server/resume.go#L878-L888`, `frontend/src/lib/utils/codex.ts#L13`, `internal/server/huma_routes_sessions.go#L1610-L1616` |
| Rename side effect | The desktop updater still points at `https://github.com/wesm/agentsview/releases/download/updater/latest.json`, so it relies on GitHub's redirect for transferred repos. | `desktop/src-tauri/tauri.conf.json#L59` |

## Credential-handling policy risk
Required by brief 7.16b. Both features below are opt-in and off by default. With them off, agentsview reads no vendor credentials.

- **Codex: what it does.**
  - Turned on only by `[agents.codex-cloud] enabled = true` (default `false`). It can be set only in config.toml, not on the Settings page. The docs say: "AgentsView reads the ChatGPT access token from the `auth.json` of each Codex home … It sends the token only to the endpoints above, never writes to a Codex home, and never stores the token."
  - Endpoints:
    - `wss://codex-cloud-backend.chatgpt.com/`, the hosted Codex app-server over JSON-RPC, including `thread/resume` when `live_tokens = true`;
    - `https://chatgpt.com/backend-api/wham/usage/thread_usage/query_v2`.
  - Overrides must point at a chatgpt.com or openai.com host, or at loopback. "Neither client follows redirects."
  - No client impersonation. It sends `originator: agentsview` and `User-Agent: agentsview/<version>`.
  - It never refreshes tokens; on a refresh request it stops and asks the user to run `codex login`. It does not read the keyring.
  - Its own docs say: "OpenAI does not document these endpoints … OpenAI may also treat third-party clients differently from its own apps."
  - With `live_tokens = true`, connecting to a chat "can start a turn you did not ask for" in one edge case: queued messages after a turn has stopped.
  - Sources: `docs/configuration.md#L1178-L1240`, `docs/configuration.md#L1275-L1305`, `internal/config/codex_cloud.go#L122-L164`, `internal/codexcloud/client.go#L60-L66`, `internal/codexcloud/usage_client.go#L81-L86`, `internal/codexcloud/auth.go#L103-L135`.
- **Claude: what it does.**
  - It never reads Claude Code's `.credentials.json` or keychain. Raw-archive capture even skips `auth.json` and `.credentials.json` by name (`internal/rawarchive/capture_files.go#L89-L93`).
  - The opt-in claude.ai chat sync imports consumer claude.ai chats, not Claude Code sessions. Its requests run inside a claude.ai session in one of two ways:
    - a Chrome extension with a native-messaging host, in the user's own Chrome;
    - in the desktop app, a webview window that loads `https://claude.ai/login?return_url=%2Fnew` ("supports email codes only"), then injects fetches to allowlisted claude.ai private endpoints (organizations, conversation list, one conversation).
  - The docs say "Credentials stay in Chrome or the desktop sign-in window."
  - Sources: `docs/chat-import.md#L71-L158`, `desktop/src-tauri/src/lib.rs#L42`, `desktop/src-tauri/src/lib.rs#L4079-L4088`, `desktop/src-tauri/src/lib.rs#L4138`.
- **Vendor policy.**
  - Anthropic, https://code.claude.com/docs/en/legal-and-compliance (undated, retrieved 2026-10-19): "Anthropic does not permit third-party developers to offer Claude.ai login into their own applications, or to route requests through Free, Pro, or Max plan credentials on behalf of their users. Moreover, developers may not collect, store, or intermediate Claude.ai credentials or session tokens — sign-in to a Claude account must complete through Anthropic's own flow." The desktop sign-in window arguably offers "Claude.ai login into their own application", and the web session persists in agentsview's webview store.
  - OpenAI, https://learn.chatgpt.com/docs/app-server (undated, retrieved 2026-10-19): "If you've built a local or open-source application using Codex app-server authentication, you can continue using it … App-server authentication has never been permitted for commercial or hosted services." agentsview is local and MIT-licensed, but it calls undocumented hosted endpoints, not the documented local app-server.
- **Grading.**
  - 7.16b treats these as side reads for non-inference calls to the vendors' own endpoints. The token never leaves the machine except to the vendor.
  - So A3 is unaffected (N/A (layer) here), and F1 for Codex would be PARTIAL at most if it were scored.
  - Strict alternative: any third-party read of plan credentials fails A3 for that path.
  - Stack setup: leave `codex-cloud` disabled and do not use claude.ai Sync.

## Deep-dive

- **Checked:** 2026-10-19 by deepdive-agentview-b.
- **Versions:**
  - Latest release v0.45.0: commit `b9d0a20`, published 2026-10-09.
  - `main` `4b15b06` (2026-10-18), still HEAD on 2026-10-19 per `git ls-remote`.
  - Release permalinks back anything a user gets today. `main` permalinks are used where the code is unchanged, or where the point is that a feature is not released yet. Where they differ, the release wins.
- **Role:** a read-only transcript viewer and archive.
  - It starts no agent work.
  - In the recommended configuration it touches no vendor credentials.
  - So most gates are N/A (layer). It contributes to A2, A6b (retrieval), A8 "monitor", and a read-only iPhone view.

### ALWAYS gates (what this component contributes)

| ID | Verdict | Evidence | Source URL | Source date |
|----|---------|----------|------------|-------------|
| A1 | N/A (layer) | It is a viewer. It covers only A1 (i) on iPhone: it lists Claude and Codex sessions and "uses Server-Sent Events to stream new messages in real time" in Safari. It cannot message, approve or start sessions, so (ii) and (iii) must come from another component. | https://github.com/kenn-io/agentsview/blob/b9d0a207f51ff27b84adbaae2a91b344247079b3/docs/usage.md#L909-L914 | 2026-10-09 (v0.45.0) |
| A2 | PASS as a stack UI, after one setting change (7.16c) | **What it shows.** For every Claude and Codex session on disk it shows the user prompt, the assistant messages, and "Tool invocations … showing the tool name, arguments, and output". This covers live sessions (SSE) and finished ones (archive). Claude Task/Agent children open "the subagent's full transcript inline". Headless `claude -p` and `codex exec` runs count as "Subagents" (non-interactive) and are listed too. **The setting.** The default `result_content_blocked_categories = ["Read", "Glob"]` means the result content of those two tool categories "is not stored". Set it to `[]` so every tool result is kept. That is a documented setting, so 7.16c applies. **Limits:** it cannot show runs the harness never wrote: `codex exec --ephemeral` and `claude -p --no-session-persistence`. Stacks must not use those flags for delegated work. | https://github.com/kenn-io/agentsview/blob/b9d0a207f51ff27b84adbaae2a91b344247079b3/docs/usage.md#L632-L640 · https://github.com/kenn-io/agentsview/blob/b9d0a207f51ff27b84adbaae2a91b344247079b3/docs/usage.md#L676-L681 · https://github.com/kenn-io/agentsview/blob/b9d0a207f51ff27b84adbaae2a91b344247079b3/docs/activity.md#L57-L73 · https://github.com/kenn-io/agentsview/blob/b9d0a207f51ff27b84adbaae2a91b344247079b3/internal/config/config.go#L1243-L1252 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/docs/configuration.md#L243 | 2026-10-09 (v0.45.0) · 2026-10-18 (main docs) |
| A3 | N/A (layer) | It runs no inference. In the recommended configuration it reads no vendor credentials (see "Harness integration" below). | (screen table) | — |
| A4 | N/A (layer) | Not a harness. | (screen table) | — |
| A5 | PARTIAL (contribution; cannot clear A5) | "Recent Edits collects every `Edit` and `Write` tool call that recorded a file path", and each entry links to the message that made the change. 7.2 grades that "diffs only" view PARTIAL: there is no folder tree, no current file contents, and no files the agents did not edit. | https://github.com/kenn-io/agentsview/blob/b9d0a207f51ff27b84adbaae2a91b344247079b3/docs/recent-edits.md#L6-L22 | 2026-10-09 (v0.45.0) |
| A6a | N/A (layer) | It does not delegate. | — | — |
| A6b | PARTIAL (contribution) | Graded against 7.7's three conditions. **(1) Where transcripts are written:** it reads the harnesses' own stores (defaults `.claude/projects`, `.codex/sessions` and `.codex/archived_sessions`, following `CLAUDE_CONFIG_DIR` and `CODEX_HOME`). **(3) Retrieval path: PASS.** Options:<ul><li>the web UI;</li><li>`agentsview session export <id>`, which streams the raw source file while it exists;</li><li>HTML or Markdown export;</li><li>the read-only MCP (`list_sessions`, `get_messages`, `search_content`).</li></ul>**(2) Persistence: PARTIAL.** The archive keeps a *parsed* copy after source files are deleted, minus Read/Glob results unless reconfigured. That is not the native JSONL, so `claude --resume` cannot use it. The raw-source `agentsview archive capture` is on `main` only: "These commands are under development and are not in the latest release." Native-JSONL persistence still depends on the stack raising Claude's `cleanupPeriodDays`. | https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/internal/parser/types.go#L170-L215 · https://github.com/kenn-io/agentsview/blob/b9d0a207f51ff27b84adbaae2a91b344247079b3/docs/commands.md#L1472 · https://github.com/kenn-io/agentsview/blob/b9d0a207f51ff27b84adbaae2a91b344247079b3/docs/mcp.md#L60-L69 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/docs/configuration.md#L52-L74 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/docs/commands.md#L9-L13 | 2026-10-09 (v0.45.0) · 2026-10-18 (main) |
| A7 | N/A (layer) | It moves no files between sessions. | — | — |
| A8 | N/A (layer); supports "monitor" | Either harness can read the other's transcripts through the read-only MCP (`list_sessions`, `get_messages`, `search_content`). "The tools are read-only": no create or resume. `get_tool_calls` and `get_child_sessions` exist only on `main`. | https://github.com/kenn-io/agentsview/blob/b9d0a207f51ff27b84adbaae2a91b344247079b3/docs/mcp.md#L7-L22 · https://github.com/kenn-io/agentsview/blob/b9d0a207f51ff27b84adbaae2a91b344247079b3/docs/mcp.md#L60-L69 | 2026-10-09 (v0.45.0) |

### FAVOUR scores

| ID | Verdict | Points | Evidence | Source URL | Source date |
|----|---------|--------|----------|------------|-------------|
| F1 | N/A (layer) | 0 | It runs no agent work. Its optional Resume and Insights launches use the unmodified binaries on the user's own login (screen A3 row). | (screen table) | — |
| F2 | PASS | 2 | 6.2k stars on kenn-io/agentsview. | https://github.com/kenn-io/agentsview | retrieved 2026-10-19 |
| F3 | FAIL | 0 | No iOS app and no PWA manifest; it is a webapp only (screen A1 row). | (screen table) | — |
| F4 | PARTIAL | 1 | The mobile layout switches on at `max-width: 760px` (kit-ui `MEDIA.medium`). Wider viewports, which includes most iPads, get the desktop three-column layout. There is no documented tablet or touch layout, and it was not tested on iPad. | https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/frontend/src/lib/stores/ui.svelte.ts#L455-L463 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/frontend/src/lib/components/layout/ThreeColumnLayout.svelte#L391 | 2026-10-18 (main) |
| F5 | PARTIAL | 1 | It hands sessions off to the native harness: `claude --resume <id>`, `codex resume <id>` (with `--fork-session` for forks), an "Open in Codex Desktop" link `codex://threads/<id>`, and Claude Desktop `claude://resume?session=…`. On Windows it cannot launch a terminal ("unsupported OS … for terminal launch"), so the user copies the command instead. The Claude Desktop link is opened with macOS `open`, so it is macOS-only. A Windows handler for `codex://` is unverified. | https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/internal/server/resume.go#L48-L60 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/internal/server/resume.go#L396-L406 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/internal/server/resume.go#L882-L888 | 2026-10-18 (main; same flow in v0.45.0 docs/usage) |
| F6 | N/A (layer) | 0 | — | — | — |
| F7 | FAIL | 0 | There is no file viewer. Recent Edits shows only Edit/Write tool calls, and file content appears only inside tool inputs and results. | https://github.com/kenn-io/agentsview/blob/b9d0a207f51ff27b84adbaae2a91b344247079b3/docs/recent-edits.md#L6-L22 | 2026-10-09 |
| F8 | N/A (layer) | 0 | — | — | — |
| F9 | N/A (layer) | 0 | It has its own Docker image, but it hosts no agent sessions. | — | — |
| F10 | N/A (layer) | 0 | It is not a vendor app. See F5 for its deep links into vendor apps. | — | — |
| **F1–F10** | | **4/20** | | | |
| F11a | FAIL | 0 | It cannot create sessions; the MCP is read-only. | https://github.com/kenn-io/agentsview/blob/b9d0a207f51ff27b84adbaae2a91b344247079b3/docs/mcp.md#L7-L22 | 2026-10-09 |
| F11b | PARTIAL | 1 | **Linked in v0.45.0:** native subagents. Claude Task/Agent children nest in the "Sub-Agent Tree" through spawn edges; Codex's own subagents link through the `session_meta` subagent source.<br>**Not linked:** cross-harness CLI delegation. A `codex exec` started from Claude's Bash tool, or a `claude -p` started by Codex, is listed as a "Subagent" run, but "Parentless workers appear as sidebar roots".<br>**Main only:** launcher links (`agentsview session parent <worker-id> <manager-id>`, `PUT /api/v1/sessions/{id}/parent`) are in the "Unreleased" changelog. Under 7.16a that counts as PARTIAL. | https://github.com/kenn-io/agentsview/blob/b9d0a207f51ff27b84adbaae2a91b344247079b3/docs/usage.md#L419-L424 · https://github.com/kenn-io/agentsview/blob/b9d0a207f51ff27b84adbaae2a91b344247079b3/internal/parser/codex.go#L417-L423 · https://github.com/kenn-io/agentsview/blob/b9d0a207f51ff27b84adbaae2a91b344247079b3/docs/activity.md#L57-L73 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/docs/changelog.md#L84-L89 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/docs/session-api.md#L711-L735 | 2026-10-09 (v0.45.0) · 2026-10-16 (main changelog) |
| F11c | PASS | 2 | Delegated runs are ordinary archived sessions and render with the same tool blocks as top-level sessions. The Read/Glob storage default applies to both equally. | https://github.com/kenn-io/agentsview/blob/b9d0a207f51ff27b84adbaae2a91b344247079b3/docs/usage.md#L632-L640 | 2026-10-09 |
| F11d | PARTIAL | 1 | It can hand a delegated session to its native TUI or desktop app (F5). It cannot message, interrupt or take over a running session. | (F5 sources) | 2026-10-18 |
| F11e | PARTIAL | 1 | From iPhone it can list and live-follow sessions read-only. Resume, fork and handoff happen on the PC. | (A1 row) | 2026-10-09 |
| **F11a–e** | | **5/10** | | | |

### Harness integration (from source)

- **Claude:** it never runs Claude for agent work. Optional features:
  - Insights runs `claude -p --output-format json --no-session-persistence --tools ""`, which is tool-less and keeps no transcript.
  - Resume and fork run `claude --resume <id>` (adding `--fork-session` for forks) in a terminal on macOS or Linux; Windows gets copy-command only.
  - See the screen's A3 row for permalinks. **Stack advice:** do not use Insights for agent work, because its runs leave no transcript.
- **Codex:** Insights runs `codex exec --json --sandbox read-only --skip-git-repo-check --ephemeral -`; Resume runs `codex resume <id>`. Same caveats as Claude.
- **`--dangerously-skip-permissions` through the API.**
  - The resume request body has `skip_permissions`. When it is true, the Claude command gets `--dangerously-skip-permissions`, on both the resume path and the message-point resume path.
  - Any caller of the API can ask for it. On a loopback bind without `require_auth`, that means any local process. The Host and Origin checks block DNS rebinding.
  - On Windows the server only returns the command text, because terminal launch is unsupported. A WSL2 headless daemon has no Linux GUI terminal unless one is configured.
  - Source: https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/internal/server/resume.go#L28 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/internal/server/huma_routes_sessions.go#L1526-L1531 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/internal/server/huma_routes_sessions.go#L1633-L1641
- **`require_auth`.**
  - Off by default, with the default bind on 127.0.0.1.
  - A persistent non-loopback `host` from config or the environment is refused without it: "set require_auth = true … or use the --host flag for a one-off unauthenticated bind".
  - Auto-start also refuses "an unauthenticated daemon on non-loopback host".
  - The explicit `--host` flag is exempt. **Never use it for phone access.**
  - Source: https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/cmd/agentsview/managed_caddy.go#L166-L181 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/cmd/agentsview/transport.go#L508-L523 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/docs/remote-access.md#L6-L62
- **Codex Cloud import is off by default.** "Fetching from OpenAI is off unless Enabled is true" (`FetchEnabled`). Source: https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/internal/config/codex_cloud.go#L19-L36
- **claude.ai chat sync** runs only when the user starts it, from the Import dialog or `agentsview chrome setup`. It imports consumer chats, not Claude Code sessions. See the screen's policy-risk section.
- **Claude Code credentials:** it never reads Claude Code's own credentials, and raw capture skips `auth.json` and `.credentials.json` by name (screen).
- **7.16b note.** The "Credential-handling policy risk" section above still applies to the two opt-in features. With both off, which is the recommended configuration, agentsview reads no vendor credential and makes no vendor call.
- **Transcripts it relies on:** the harnesses' own JSONL (paths above), plus its own SQLite archive in `~/.agentsview` (or `AGENTSVIEW_DATA_DIR`).

### Stack fit

- **Windows-native topology.** This matches the setup recommended in claude-desktop.md and chatgpt-desktop-codex.md: both CLIs and apps on Windows, repos on `C:\`.
  - Install the agentsview CLI natively on Windows, via the PowerShell installer or the zip.
  - Its defaults resolve to `%USERPROFILE%\.claude\projects`, `%USERPROFILE%\.codex\sessions` and `archived_sessions` (registry `DefaultDirs` are home-relative and honour `CLAUDE_CONFIG_DIR` and `CODEX_HOME`).
  - Put these in `config.toml`:
    - `require_auth = true`
    - a fixed `port`
    - `host` = the PC's Tailscale IP, or `0.0.0.0`
    - `result_content_blocked_categories = []`
    - leave `[agents.codex-cloud]` absent or disabled.
  - Start it with `agentsview daemon start`. There is no Windows service installer, so keep it alive with a logon task.
  - The desktop app's own sidecar binds `127.0.0.1` on a random port (`--port 0`), so phone access needs the CLI daemon. Untested: whether launching the desktop app on the same data directory reuses, replaces or narrows that daemon (`serve` "reuses or replaces an existing local writable daemon"). Avoid running both on one data directory.
- **iPhone access over Tailscale.** Two options, and both need the token entered in the UI ("enter the configured token in the frontend"):
  - Open `http://<pc>.<tailnet>.ts.net:<port>`, with `--public-url` set to exactly that origin (Host check).
  - Or front a loopback daemon with Tailscale Serve and set `--public-url https://<pc>.<tailnet>.ts.net`. Keep `require_auth` on, because Serve exposes it to every tailnet device.
  - Source: https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/docs/remote-access.md#L6-L62 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/docs/commands.md#L357-L398
- **WSL2 topology.** Run agentsview inside WSL2, on the same side as the agents, so file events are local. Two caveats:
  - The phone then needs WSL mirrored networking or a Windows-side proxy (see tailwind.md).
  - The Windows app can instead read WSL paths through `wsl:<distro>:` markers, but live freshness across the boundary is unverified; the documented fallback is polling plus a 15-minute full sync (screen Open questions).
- **Split Windows + WSL2 agents.** Two options:
  - one daemon with extra `dirs` entries;
  - or HTTP remote sync from a WSL2 daemon to a Windows collector (`[[remote_hosts]]`, bearer token).
- **Sandboxed sessions (A6b help, not a guarantee).**
  - Since 0.37.4, HTTP remote sync keeps "a persistent mirror of each remote machine's syncable source files" on the collector. The parsed archive keeps sessions after the remote is gone.
  - But the mirror "removes mirror files that disappeared from the manifest" on each successful sync. Native JSONL therefore survives only if the remote is never seen again, or by luck of timing.
  - A bind-mounted transcript directory remains the reliable A6b path for sandboxes.
  - Source: https://github.com/kenn-io/agentsview/blob/b9d0a207f51ff27b84adbaae2a91b344247079b3/docs/remote-access.md#L157-L183
- **Conflicts.**
  - Default port 8080; it auto-picks another unless one is set explicitly.
  - Claude's 30-day `cleanupPeriodDays` must still be raised to keep native JSONL.
  - Harness flags that suppress transcripts make runs invisible.
  - Never run with a one-off `--host` bind.

### Specific questions

- **Does it link a delegated session to its parent?**
  - **Native subagents: yes.** Claude Task/Agent through spawn edges; Codex's own subagents through `session_meta`.
  - **Cross-harness CLI delegation: not in v0.45.0.**
    - A `codex exec` started from Claude's Bash tool, or a `claude -p` started by Codex, is classified as a non-interactive "Subagent" run and shown as a parentless root.
    - `main` adds an orchestrator-recorded link (`agentsview session parent <worker-id> <manager-id>` or `PUT /api/v1/sessions/{id}/parent`), which nests the worker under the launcher and rolls up its cost. It is unreleased.
  - **How to find one today:**
    - the project or cwd filter, time order, or full-text and semantic search over prompts and tool output;
    - or search the worker's thread ID, which `codex exec --json` prints into the parent's Bash tool result.
- **Does it render Codex `exec` and `app-server` sessions, with tool calls?** Yes.
  - The Codex parser reads every rollout under `sessions/` and `archived_sessions/`.
  - It marks originator `codex_exec` as non-interactive.
  - It parses `function_call` / `custom_tool_call` and their outputs, which covers shell, `apply_patch` and MCP calls, and it links Codex's native subagents.
  - App-server threads are ordinary rollouts in the same store.
  - `--ephemeral` runs leave no rollout, so they cannot be shown.
  - Source: https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/internal/parser/codex.go#L455-L463 · https://github.com/kenn-io/agentsview/blob/4b15b064a8f619267abd28fab3192af8a1eaa88a/internal/parser/codex.go#L490-L500
- **Does the archive keep full tool inputs and outputs?**
  - **Inputs: yes.**
  - **Outputs: yes, except Read and Glob** under the default `result_content_blocked_categories = ["Read", "Glob"]`. Set `[]` to keep them.
  - **Images:** kept by default (`tool_result_images = "keep"`).
  - It is a parsed copy, not the native JSONL.

## Open questions
- **Do Resume, fork and Insights make agentsview a platform that launches sessions?**
  - This file follows the orchestrator's framing ("does not launch sessions"), which gives N/A (layer) for A1, A3 and A4.
  - If these launches count:
    - A3 and A4 become PASS: unmodified binaries under the user's own login.
    - A1 becomes PARTIAL: from the iPhone it is view-only, and its terminals open on the PC. The outcome becomes `SCREEN HOLD (A1)`.
    - Insights runs persist no transcript (`--no-session-persistence`, `--ephemeral`), so they would also matter for A2.
  - This needs an orchestrator ruling, not more evidence.
- **Live freshness across the WSL boundary.**
  - The docs promise watching for each `dirs` root. They do not say whether native file events fire for `/mnt/c/...` read from WSL, or for `\\wsl.localhost\...` read from Windows.
  - The documented floor is polling fallback plus the 15-minute periodic full sync (`docs/configuration.md#L2108-L2145`).
  - This affects live viewing from the iPhone (A1 (i) notes, F11e), and A5 staleness if agentsview is used for it.
  - Run agentsview on the same side as the agents to avoid it. Settle it in deep-dive or by test.
- **Reaching agentsview in WSL2 from the phone.** With agentsview in WSL2 bound to `0.0.0.0`, a phone on Tailscale can reach it only through WSL mirrored networking or a Windows-side proxy. That is a Microsoft/Tailscale question, not an agentsview one, but it decides which component carries iPhone viewing.
- **iPhone use is not hands-on tested.**
  - The evidence is the responsive-layout code and changelog. There is no iOS-specific doc.
  - Untested: entering the token in Safari, and SSE behind a TLS proxy.
  - This could change the A1 notes, and F4 if it is scored.
- **Release bus factor.**
  - Wes McKinney created every tag in the window. The release workflow sometimes publishes as `github-actions`.
  - N2 still passes on authorship and merges. This matters only under a stricter "two release publishers" reading.
- **Native fidelity of the retained copy (A6b).**
  - After a source is deleted, the default archive holds only a parsed copy.
  - Not verified: whether `session export` or the "raw archive" and hosted raw-sync features keep the raw native JSONL.
  - This decides whether agentsview alone meets A6b(1)–(3) with the native transcript, or only with a rendered, parsed copy.
- **Deep-dive: can an agent learn its own session ID, so it can record a launcher link once `agentsview session parent` ships?**
  - This needs to work for both Claude and Codex (e.g. an environment variable or hook payload).
  - Not verified. It decides whether F11b can reach PASS with agentsview.
- **Deep-dive: can the Windows desktop app and a config-driven CLI daemon (non-loopback, `require_auth`) share one data directory?**
  - The risk is the desktop sidecar's `--host 127.0.0.1 --port 0` start narrowing or replacing the daemon's bind.
  - Untested. It decides the phone-access recipe on Windows.
- **Deep-dive: is a `codex://` URL handler registered on Windows by the Codex or ChatGPT desktop app?**
  - Unverified. It affects the F5/F11d hand-off from the agentsview UI on Windows.
