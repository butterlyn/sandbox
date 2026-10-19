# Stage 1 — Discovery (discover-candidates, checked 2026-10-18)

Scope: up to 3 credible candidates **not** on the user's §1 list, alone or as one layer of a stack. Method: web search for leads only, then primary sources (repos cloned read-only under the scratchpad, GitHub pages, vendor docs and changelogs, App Store listings). Commit and maintainer counts come from `git log` on the cloned default branch; "last 90 days" means since 2026-07-20.

Duplicate check against §1: none of the three is on the list under another name. "AgentView" looks like Claude Code's Agent view or wesm/agentsview, and "Orca" is stablyai/orca. Two possible overlaps are logged as open questions: `codex-remote` vs "Github Apps of Claude and codex", and Claude Code Remote Control vs "Claude desktop app".

| Slug | Name | Layer(s) | Main gap it fills |
|---|---|---|---|
| `happy` | Happy (Happy Coder), original CLI path | client-UI · orchestrator · networking | Native iPhone/iPad app for **both** official `claude` and `codex` sessions on the PC; sessions spawned through the platform from the CLI |
| `codex-remote` | Codex in the ChatGPT desktop app + Codex Remote in ChatGPT for iOS | client-UI · orchestrator · networking (Codex half only) | First-party native iOS/iPad control of Codex sessions on a Windows host; sessions live in the native Codex desktop app (F10) |
| `cloudcli` | CloudCLI (formerly Claude Code UI) | client-UI · light orchestrator · optional runtime-sandbox | Self-hosted web UI with file explorer, git, shell and an index of **native** Claude/Codex transcripts, including subagent and externally started sessions |

---

## 1. Proposed candidates

### 1.1 Happy (`happy`)

| Field | Value |
|---|---|
| Canonical URL | https://happy.engineering |
| Repo | slopus/happy (mobile/web app, original CLI `happy`, relay server). The Happy Desktop app and its "Happy Agent" runtime live in slopus/happy-desktop and slopus/happy-agent and are **out of scope** (see A4) |
| Layer(s) | client-UI / orchestrator (machine daemon + `happy-agent` control CLI) / networking (E2E-encrypted relay, self-hostable with `happy server`) |
| Licence | MIT |
| Latest release checked | CLI `happy` 1.2.5 · 2026-09-22 · https://github.com/slopus/happy/commit/4beb3543cfdeb507be838016996f7a0f65cf7b49 (1.2.6-beta.1 on npm). iOS app 1.8.0 · 2026-10-07 · https://apps.apple.com/us/app/happy-codex-claude-code-app/id6748571505 |
| Stage status | Screen: pending (proposed by discovery) · Deep-dive: pending |

| ID | Verdict | Evidence (≤ 50 words; quote where you can) | Source URL | Source date |
|---|---|---|---|---|
| N3 | PASS | Not archived. 1,327 commits in the last 90 days; latest commit 2026-10-18. "Release Happy CLI v1.2.5" on 2026-09-22, and npm `happy` beta 1.2.6-beta.1 since. App Store 1.8.0 dated Oct 7. | https://github.com/slopus/happy/commit/4beb3543cfdeb507be838016996f7a0f65cf7b49 | 2026-09-22 |
| N1 | PASS | "24.2k" stars, 2.1k forks. | https://github.com/slopus/happy | undated (accessed 2026-10-18) |
| N2 | PASS | Last 90 days: Steve Korshakov 1,017 commits and Kirill Dubovitskiy 255. Kirill is the `happy` package author and made 36 of the happy-cli commits. 9 other human contributors. | https://github.com/slopus/happy/commits/ee8408f8e0008d64aee0778bcbbf2aef1ef1cbc3 | 2026-10-18 |
| A1 | PASS | Native iOS app: "Start, steer and approve Claude and Codex sessions from your phone". Compatible with iPhone and iPad ("Designed for iPad"); repo sets `supportsTablet: true`. A web client is also included. | https://apps.apple.com/us/app/happy-codex-claude-code-app/id6748571505 | 2026-10-07 |
| A3 | PARTIAL | Uses the host's own logins ("Run claude auth login on the host machine…"); Codex runs via `codex app-server` on the host's Codex login. But remote mode drives Claude through `@anthropic-ai/claude-agent-sdk` `query()`, and Anthropic says Agent SDK products "should use API key authentication". | https://github.com/slopus/happy/blob/ee8408f8e0008d64aee0778bcbbf2aef1ef1cbc3/packages/happy-cli/src/claude/sdk/query.ts#L6 · https://code.claude.com/docs/en/legal-and-compliance | 2026-10-18 · undated (accessed 2026-10-18) |
| A4 | PASS | Original CLI path only: "The original CLI wraps the Claude Code and Codex harnesses". Local mode spawns the user's installed `claude` (npm, native installer, `claude.exe`); Codex runs as `codex app-server --listen stdio://`. Happy Desktop uses its own runtime ("each with its vendor's own prompts and tools") and would fail A4. | https://github.com/slopus/happy/blob/ee8408f8e0008d64aee0778bcbbf2aef1ef1cbc3/packages/happy-cli/src/codex/codexAppServerClient.ts#L609 | 2026-10-18 |
| W | PASS | The CLI has Windows code paths (`where claude`, `claude.exe` native-installer detection, cross-spawn) and recent Windows work, e.g. "fix(cli): hide Windows daemon subprocesses". It runs as a Node CLI on Linux, which covers WSL2. | https://github.com/slopus/happy/blob/ee8408f8e0008d64aee0778bcbbf2aef1ef1cbc3/packages/happy-cli/scripts/claude_version_utils.cjs#L127 · https://github.com/slopus/happy/commit/44c8f9ad7740ddeb697b61adc33d473ff33b3c08 | 2026-10-18 · 2026-08-27 |

**Why it may beat the listed candidates**
- It's a native App Store app with an iPad sidebar layout ([`useIsTablet` → `SidebarView`](https://github.com/slopus/happy/blob/ee8408f8e0008d64aee0778bcbbf2aef1ef1cbc3/packages/happy-app/sources/components/SidebarNavigator.tsx#L26)) that drives the official `claude` and `codex` processes on the user's own PC. Most listed orchestrators are desktop-first, or reach the phone only through a webapp (F3, F4).
- Platform-spawned sessions from a CLI: [`happy-agent`](https://github.com/slopus/happy/blob/ee8408f8e0008d64aee0778bcbbf2aef1ef1cbc3/packages/happy-agent/README.md#L69) can `spawn --machine … --agent codex`, then `send … --wait`, `history`, `status` and `stop`. A Claude Code session can therefore delegate to Codex as a first-class Happy session that shows up on the iPhone (F11a, F11e).
- The session view shows tool calls ("Tool calls show as one-line rows you can open for details", app CHANGELOG, 2026-08-03), diffs, and session file screens. File RPCs include `listDirectory`, `readFile` and `ripgrep`, which covers A2, A5 and F7. The terminal session can be taken back locally (F5).
- The relay can be self-hosted (`npm install -g happy happy-server-self-host && happy server`), so the PC can be the server.

**Biggest risk**
The project's focus has moved to Happy Desktop and its own "Happy Agent" runtime ("For multi-model sessions and teams, move to the desktop app and Happy Harness", [README#L55](https://github.com/slopus/happy/blob/ee8408f8e0008d64aee0778bcbbf2aef1ef1cbc3/README.md#L55)). That leaves the A4-compliant original CLI open to becoming legacy. Separately, the CLI's remote mode runs Claude through the Agent SDK on subscription credentials, which falls under Anthropic's API-key rule for Agent SDK products (Q-happy-1).
Secondary risks:
- The daemon can inject a spawn `token` as `CLAUDE_CODE_OAUTH_TOKEN` or into `CODEX_HOME/auth.json` ([run.ts#L334-L346](https://github.com/slopus/happy/blob/ee8408f8e0008d64aee0778bcbbf2aef1ef1cbc3/packages/happy-cli/src/daemon/run.ts#L334-L346)).
- `happy-agent` needs a source build: the npm name `happy-agent` belongs to an unrelated maintainer (v0.1.5, "yanbingbing", no repo link).

### 1.2 Codex in the ChatGPT desktop app + Codex Remote (`codex-remote`)

| Field | Value |
|---|---|
| Canonical URL | https://learn.chatgpt.com/docs/remote-connections |
| Repo | closed source (ChatGPT desktop app, which now contains the Codex app; ChatGPT for iOS). The harness is open source: openai/codex |
| Layer(s) | client-UI (native iOS app + native desktop app) / orchestrator / networking (OpenAI relay). **Codex half only** |
| Licence | proprietary (apps); Apache-2.0 (openai/codex) |
| Latest release checked | Codex app 26.1007 · 2026-10-08 · https://learn.chatgpt.com/docs/changelog. ChatGPT for iOS 1.2026.272 · 2026-10-07 (same page; the App Store shows 1.2026.279 "2d ago") |
| Stage status | Screen: pending (proposed by discovery) · Deep-dive: pending |

| ID | Verdict | Evidence (≤ 50 words; quote where you can) | Source URL | Source date |
|---|---|---|---|---|
| N3 | PASS | Changelog: Codex app 26.1007 (2026-10-08). ChatGPT for iOS 1.2026.272 (2026-10-07): "Added support for opening Codex task links directly on iOS". "Codex Remote has reached general availability" (26.623, 2026-06-25). | https://learn.chatgpt.com/docs/changelog | 2026-10-14 (newest entry) |
| N1 | N/A | Closed-source apps, so the GitHub-based gate doesn't apply. The harness they run, openai/codex, has "129.8k" stars and is not archived. | https://github.com/openai/codex | undated (accessed 2026-10-18) |
| N2 | PASS | First-party OpenAI product. Desktop (26.x) and iOS (1.2026.x) releases ship every 1–2 weeks through 2026-10, so it isn't a single-maintainer project. | https://learn.chatgpt.com/docs/changelog | 2026-10-14 |
| A1 | PASS | "In the ChatGPT mobile app for iOS, open Codex". From the phone: start new chats in host projects, follow up, approve commands, review "diffs, test results, terminal output". iPad: "Improved Remote onboarding, composer guidance, and iPad navigation" (iOS 1.2026.195, 2026-07-20). | https://learn.chatgpt.com/docs/remote-connections · https://learn.chatgpt.com/docs/changelog | undated (accessed 2026-10-18) · 2026-07-20 |
| A3 | PARTIAL | Codex half PASS: the host must be "signed in to the same account and workspace", and the Codex README recommends "Sign in with ChatGPT" (Plus, Pro, Business, Edu, Enterprise). It has no Claude Code support, so the Claude half needs a stack partner. | https://learn.chatgpt.com/docs/remote-connections · https://github.com/openai/codex | undated (accessed 2026-10-18) |
| A4 | PARTIAL | Codex half PASS: it is OpenAI's own Codex harness ("Codex is now part of the ChatGPT desktop app on macOS and Windows", 26.707). It doesn't run Claude Code. | https://learn.chatgpt.com/docs/changelog | 2026-07-09 |
| W | PASS | "Remote access supports hosts running the ChatGPT desktop app on macOS and Windows". 26.527: "Remote control now supports Windows devices". Settings can "switch the agent from Windows native to WSL"; 26.915 fixed "adding WSL project folders". | https://learn.chatgpt.com/docs/windows/windows-app · https://learn.chatgpt.com/docs/changelog | undated (accessed 2026-10-18) · 2026-05-29 / 2026-09-17 |

**Why it may beat the listed candidates**
- It's the official Codex counterpart to the listed "Claude desktop app". Sessions live in the native Codex desktop GUI (F10, F5), and you steer them from the native ChatGPT iOS app on iPhone and iPad (F3, F4).
- No third-party code touches OpenAI credentials, which is the cleanest A3/A4 posture available for Codex.
- Adds SSH remote hosts and "thread handoff between local and remote hosts" (26.616, 2026-06-18). Pairing is "authenticated one-to-one QR pairing" over OpenAI's relay, so no inbound ports are needed.
- Combined with Claude Code Remote Control from the listed Claude apps, it makes an all-first-party pair of native iOS clients for the two harnesses on one always-on Windows PC.

**Biggest risk**
It covers Codex only and is closed source. Setup happens only in the desktop app ("you can't set it up from the Codex CLI or IDE extension"). So it's UNKNOWN whether Codex runs started outside the app appear on the phone, e.g. a `codex exec` launched by Claude Code inside WSL2 (Q-codex-remote-1). The host must also stay "awake, online, and signed in".

### 1.3 CloudCLI (`cloudcli`)

| Field | Value |
|---|---|
| Canonical URL | https://cloudcli.ai |
| Repo | siteboon/claudecodeui |
| Layer(s) | client-UI (responsive web) / light orchestrator / optional runtime-sandbox (`sandbox` mode on Docker's `sbx`) |
| Licence | AGPL-3.0-or-later |
| Latest release checked | v1.37.5 · 2026-10-17 · https://github.com/siteboon/claudecodeui/blob/0ce5630f46c283653359820870df1afd67cb1cf5/CHANGELOG.md |
| Stage status | Screen: pending (proposed by discovery) · Deep-dive: pending |

| ID | Verdict | Evidence (≤ 50 words; quote where you can) | Source URL | Source date |
|---|---|---|---|---|
| N3 | PASS | Not archived. CHANGELOG lists "1.37.5 (2026-10-17)" and "1.37.4 (2026-10-09)". 106 commits in the last 90 days; 10 PRs merged on 2026-10-15/16. | https://github.com/siteboon/claudecodeui/blob/0ce5630f46c283653359820870df1afd67cb1cf5/CHANGELOG.md | 2026-10-17 |
| N1 | PASS | "14.2k" stars, 2.0k forks. | https://github.com/siteboon/claudecodeui | undated (accessed 2026-10-18) |
| N2 | PASS | Two humans cut releases in the last 90 days: viper151/Simos Mikelatos (v1.37.0–v1.37.3, 2026-07-29 to 2026-09-08) and blackmammoth (v1.37.4, v1.37.5). blackmammoth also merges PRs, e.g. #1583 on 2026-10-16. ~40 other authors in the window. | https://github.com/siteboon/claudecodeui/commit/70e57859b6224ff0eb0539fcde7d13a3186c9c93 · https://github.com/siteboon/claudecodeui/pull/1583 | 2026-09-08 · 2026-10-16 |
| A1 | PASS | Webapp: "Responsive Design - Works seamlessly across desktop, tablet, and mobile". Self-hosted: "open `[yourip]:port` in any browser on your network". "A native app is also in the works." | https://github.com/siteboon/claudecodeui/blob/0ce5630f46c283653359820870df1afd67cb1cf5/README.md#L57 | 2026-10-17 |
| A3 | PARTIAL | "You bring your own Claude, Cursor, or Codex subscription." Codex uses `~/.codex/auth.json` (ChatGPT OAuth tokens). Claude runs through Agent SDK `query()` on the user's `claude` login, and the app reads `~/.claude/.credentials.json`. Anthropic says Agent SDK products "should use API key authentication". | https://github.com/siteboon/claudecodeui/blob/0ce5630f46c283653359820870df1afd67cb1cf5/server/modules/providers/list/claude/claude-runtime.provider.js#L242 · https://github.com/siteboon/claudecodeui/blob/0ce5630f46c283653359820870df1afd67cb1cf5/server/modules/providers/list/claude/claude-auth.provider.ts#L164 | 2026-10-17 |
| A4 | PASS | Vendor harnesses, not its own loop. Claude: `query()` with `pathToClaudeCodeExecutable` set to the user's installed `claude`. Codex: `new Codex()` from `@openai/codex-sdk`, which spawns the codex binary, plus `codex app-server` for forks. | https://github.com/siteboon/claudecodeui/blob/0ce5630f46c283653359820870df1afd67cb1cf5/server/modules/providers/list/codex/codex-runtime.provider.ts#L311 | 2026-10-17 |
| W | PASS | README lists a Windows desktop download, and the code resolves the CLI path on Windows (`where.exe`). npm self-host (`npx @cloudcli-ai/cloudcli`, Node 22+) runs on Linux, so it works in WSL2. | https://github.com/siteboon/claudecodeui/blob/0ce5630f46c283653359820870df1afd67cb1cf5/server/shared/claude-cli-path.ts#L104 | 2026-10-17 |

**Why it may beat the listed candidates**
- It indexes **native** transcripts from disk: it "Scans ~/.codex/sessions" ([L29](https://github.com/siteboon/claudecodeui/blob/0ce5630f46c283653359820870df1afd67cb1cf5/server/modules/providers/list/codex/codex-session-synchronizer.provider.ts#L29)) and `~/.claude/projects`, including `…/subagents/agent-<id>.jsonl` ([L34](https://github.com/siteboon/claudecodeui/blob/0ce5630f46c283653359820870df1afd67cb1cf5/server/modules/providers/list/claude/claude-session-synchronizer.provider.ts#L34)). A Codex run delegated by Claude Code via `codex exec` should therefore be retrievable and reviewable from the iPhone even though CloudCLI didn't launch it. That helps A2, A6b and F11c.
- An "Integrated Shell Terminal", "File Explorer … with live editing" and "Git Explorer" in the browser give A5, F7 and a native-TUI fallback for F5 from iPhone/iPad.
- An optional Docker sandbox mode ("Supports Claude Code and Codex", `sbx` microVMs) touches F9.

**Biggest risk**
The same Anthropic Agent SDK policy issue as `happy` (Q-cloudcli-1), plus local reads of `~/.claude/.credentials.json` and `~/.codex/auth.json` for status, which the deep-dive must classify. Also:
- It's a webapp only (no native iOS app yet).
- Exposing the self-hosted server to the iPhone needs a private network layer such as the listed Tailscale-like option.
- AGPL licence.

---

## 2. Runners-up considered and rejected

- **codex-plugin-cc** (openai/codex-plugin-cc; 34.4k stars, Apache-2.0). **Nearest miss.** Fails N3 under the ~90-day test: the last commit and release is v1.0.6 on 2026-07-07 (103 days ago), with 252 open PRs and 284 open issues and no maintainer merges since. Otherwise it's the best Claude→Codex delegation layer: official, works on a ChatGPT login, `codex resume <session-id>`, and `/codex:transfer` to the App/TUI. Source: https://github.com/openai/codex-plugin-cc/commit/db52e28f4d9ded852ab3942cea316258ae4ef346 (2026-07-07).
- **Claude Code Remote Control** (official). Not proposed because it's probably covered by the listed "Claude desktop app" (its Code tab starts it with `/remote-control`), and it's Claude-only. Its server mode (`claude remote-control --spawn worktree`) on WSL2 is the natural Claude-side partner for `codex-remote`. Source: https://code.claude.com/docs/en/remote-control (undated, accessed 2026-10-18).
- **Nimbalyst** (Nimbalyst/nimbalyst; 1.9k stars, MIT, iOS companion). Fails N2: Greg Hinkle wrote 1,250 of 1,359 commits in the last 90 days, and the other long-time maintainer last committed on 2026-04-02. Source: https://github.com/Nimbalyst/nimbalyst/commit/04dd31f0329a00a22bd3119c9818c98112f5157f (2026-10-17).
- **Happier** (happier-dev/happier; ~2.0k stars, MIT, iOS/iPad app). Fails N2: Leeroy Brun wrote 3,449 of 3,648 commits in the last 90 days. Source: https://github.com/happier-dev/happier/commit/947dae94dfd17727240965481993a0bc9f225c43 (2026-10-18).
- **Omnara** (omnara-ai/omnara; 2.9k stars). Fails A4: it is now "an open-source managed agent platform" whose agent loop is "Omnara's, works with any model". Source: https://github.com/omnara-ai/omnara (undated, accessed 2026-10-18).
- **Vicoa** (vicoa-ai/vicoa). Fails N1: 518 stars. Source: https://github.com/vicoa-ai/vicoa (undated, accessed 2026-10-18).
- **Blink Shell** (blinksh/blink; 7.0k stars, iOS/iPad SSH and mosh client for native TUI access). Fails N3/N2: the last commit was 2026-04-14, and only Carlos Cabanero has committed since 2026-04-01. Source: https://github.com/blinksh/blink/commit/a90b4423c8b7a86770c24a7eaa6c13b0a5904b18 (2026-04-14).
- **Coder** (coder/coder and the coder/registry agent modules). Fails A3: the Codex module authenticates only with `openai_api_key` or AI Gateway (no ChatGPT login), and v5 "drops support for Coder Tasks". Source: https://github.com/coder/registry/blob/51681fad809110722ed2fe91fe6120a69726899d/registry/coder-labs/modules/codex/README.md (2026-10-16).
- **Grass** (codeongrass.com). Fails A3/A4 for Codex: it supports Claude Code and OpenCode, with Codex still on the roadmap, and the mobile app isn't open source. Source: the vendor's own page https://codeongrass.com/blog/grass-vs-happy-coder/ (lead-grade only; undated, accessed 2026-10-18).

---

## Open questions

- [Q-happy-1] Anthropic says developers "including those using the Agent SDK, should use API key authentication" and may not "route requests through Free, Pro, or Max plan credentials on behalf of their users". It also allows "an end user … signing in to the unmodified Claude Code binary with their own Claude subscription". Does Happy's remote mode count as permitted subscription use? That mode is Agent SDK `query()` → SDK-bundled Claude Code, on the user's own `claude auth login`. · affects A3 · would move the verdict from PARTIAL to PASS (permitted) or FAIL (not permitted) · blocking: yes (an interpretation that changes which candidates pass; also decides Q-cloudcli-1)
- [Q-happy-2] Is the original `happy` CLI (`happy claude` / `happy codex`) still a supported product line, or legacy now that the README steers users to "the desktop app and Happy Harness"? · affects N3, A4 · would move the verdict from PASS to FAIL if it's deprecated · blocking: no
- [Q-happy-3] What fills the daemon spawn `token` that Happy writes to `CLAUDE_CODE_OAUTH_TOKEN` or `CODEX_HOME/auth.json` (run.ts L334–346)? If the app or server stores and forwards provider tokens, that is credential intermediation. · affects A3 · would move the verdict from PARTIAL to FAIL · blocking: no (deep-dive)
- [Q-happy-4] Does `happy-agent spawn --agent codex` link the new session to its parent in the app? The daemon passes `parentSessionId` for forks (run.ts L354). And is there an official npm release of slopus's `happy-agent`, given the npm name belongs to another maintainer? · affects F11a, F11b · would move the verdict from UNKNOWN to PASS or PARTIAL · blocking: no
- [Q-codex-remote-1] Remote is set up only from the desktop app. Do Codex threads started outside it appear in the desktop app's thread list and on the phone, e.g. Codex CLI in WSL2 or a `codex exec` delegated by Claude Code? · affects A2, F11b, F11e · would move the verdict from UNKNOWN to PASS or FAIL · blocking: no
- [Q-codex-remote-2] Could "Github Apps of Claude and codex" in §1 mean the vendors' own apps (Claude/ChatGPT desktop and mobile) rather than GitHub integrations? If so, `codex-remote` duplicates a listed candidate. · affects candidate list · would move the verdict from new candidate to duplicate · blocking: no (Resolve fork)
- [Q-codex-remote-3] With the desktop agent switched to WSL, where do native transcripts land: WSL `~/.codex/sessions` (shared with the CLI) or Windows `%USERPROFILE%\.codex`? · affects A6b · would move the verdict from UNKNOWN to PASS or PARTIAL · blocking: no
- [Q-cloudcli-1] Same policy question as Q-happy-1. CloudCLI drives Claude via Agent SDK `query()` with the user's `claude` binary, and reads `~/.claude/.credentials.json` for auth status. · affects A3 · would move the verdict from PARTIAL to PASS or FAIL · blocking: yes (same interpretation as Q-happy-1)
- [Q-cloudcli-2] Does the self-hosted server have authentication strong enough to expose over a private network to the iPhone? And does the phone layout show tool calls at full fidelity? · affects A1, A2 · would move the verdict from PASS to PARTIAL · blocking: no
- [Q-discovery-1] Does N3 "abandoned" cover a repo with no maintainer commit or release for 103 days but heavy community PR traffic (codex-plugin-cc)? If not, it becomes the strongest Claude→Codex delegation component found (A6, A7, A8, F11d). · affects N3 (codex-plugin-cc) · would move the verdict from FAIL to PASS · blocking: no
- [Q-discovery-2] Does the listed "Claude desktop app" include Claude Code Remote Control run from the CLI on WSL2 (`claude remote-control` server mode)? If not, it should be screened as the Claude-side partner for `codex-remote`. · affects candidate list · would move it from not screened to screened · blocking: no
