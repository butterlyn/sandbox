# wmux (reading A: openwong2kim/wmux)

- Slug: wmux-a
- Canonical: https://github.com/openwong2kim/wmux; product site https://wmux.app; iOS app "wmux - Workspace for AI agents", https://apps.apple.com/app/wmux-workspace-for-ai-agents/id6797904556
- Layer(s): client/UI (PC terminal/multiplexer and iPhone app); orchestrator (light: MCP pane control and fan-out)
- Open source: yes (MIT) for the desktop app, session daemon, `wmux` CLI, MCP server and push relay in openwong2kim/wmux. The iOS app's source is not in that repo.
- Latest release checked: v4.7.0 (marked Latest), 2026-10-19, https://github.com/openwong2kim/wmux/releases/tag/v4.7.0. The tag points at a9184f4172c3a8332600da76504f53ebc0874be8 ("chore(release): 4.7.0 (#2433)"), which is on `main`; package.json at HEAD also says 4.7.0. iOS app: 1.10.0, listed as "5d ago" on the App Store page.
- Checked: 2026-10-19 by screen-wmux-a (default branch `main` at 2fbe8afa77dfa530c93ecdaeb84e2ef6348fd5ff, 2026-10-19)

## Summary
- Screen: FAIL at N1
- **N1 fails: 431 stars today, 569 short of 1,000.** The repo page shows "431 stars", 73 forks and 3 watching. N1 applies because this MIT repo holds the source of every PC-side part of the product: the Electron app, the session daemon, the `wmux` CLI, the MCP server and the push relay. Under 7.3 and 7.11 this is a hard fail.
- **No other repo carries the project.** The repo page has no fork, moved or archived notice. The owner is a personal account with no organisations, and its next most-starred repo has 9 stars. wmux.app, package.json and the App Store listing all point back to github.com/openwong2kim/wmux or wmux.app. A GitHub-wide search for "wmux" ranks this repo first. The runner-up, amirlehmam/wmux (421 stars), is a different product (wmux-b).
- **N3 passes easily.** The repo is not archived and has no deprecation wording. v4.7.0 is marked Latest and was released 2026-10-19, after v4.4.0–v4.6.1 between 14 and 16 Oct. `main` has 1,659 non-bot commits since 2026-07-21, the latest today.
- **N2, C1, A1 and A3/A4 were not screened**, because 7.11 stops at the first hard fail. Stage 1's ~431-star and MIT leads are confirmed. The one-dominant-author lead (N2) and facts about the iOS app are recorded under Open questions, ungraded.
- **What this means for stacks.** A `SCREEN FAIL` component cannot be used even as glue (7.12). The App Store iOS app cannot stand in for it: the listing calls it a remote for the desktop app, which is the component that fails N1.

## Screen
| ID | Verdict | Evidence (short quote or exact paraphrase) | Source URL | Source date |
|----|---------|---------------------------------------------|------------|-------------|
| N3 (a), (b) | PASS | (a) The repo page shows no archived banner and no "forked from" or moved notice. (b) The README at HEAD has no deprecation, sunset, maintenance-only, end-of-life or "no longer maintained" wording. Its only status label is about a platform, L49: "**Linux** — experimental AppImage / .deb / .rpm builds". L32 says: "Native on Windows and macOS. MIT." | https://github.com/openwong2kim/wmux ; https://github.com/openwong2kim/wmux/blob/2fbe8afa77dfa530c93ecdaeb84e2ef6348fd5ff/README.md#L32-L49 | retrieved 2026-10-19 ; 2026-10-19 (HEAD) |
| N3 (c): releases | PASS | v4.7.0 is marked "Latest" and is not a pre-release. The page says "github-actions released this" on 19 Oct at 03:33, for commit a9184f4 ("chore(release): 4.7.0 (#2433)", committed 2026-10-19T12:05+09:00 and an ancestor of `main`). Its assets include `wmux-4.7.0.Setup.exe`, `wmux-4.7.0-arm64.dmg`, `wmux-4.7.0-x64.AppImage` and `wmux-4.7.0-1.x86_64.rpm`. Earlier releases: v4.6.1 (16 Oct), v4.6.0 (16 Oct), v4.5.0 (15 Oct), v4.4.0 (14 Oct). | https://github.com/openwong2kim/wmux/releases/tag/v4.7.0 ; https://github.com/openwong2kim/wmux/releases | 2026-10-19 |
| N3 (c): commits | PASS | From a blob-less clone, `git log` since 2026-07-21 (90 days) shows 1,684 commits on `main`. Excluding bots and AI-agent identities (dependabot[bot], Grok Bot) leaves 1,659, from 19 distinct author emails. The latest is 2fbe8afa (wong2kim, 2026-10-19T18:14+09:00, "fix(daemon): log why the daemon exits, and its exit code from main (#2426)"). It follows 55d7daa8 (wong2kim, #2435) and 62935ba6 (bluemas, #2319), both from the same day. | https://github.com/openwong2kim/wmux/commit/2fbe8afa77dfa530c93ecdaeb84e2ef6348fd5ff ; https://github.com/openwong2kim/wmux/commits/main | 2026-10-19 ; retrieved 2026-10-19 |
| N1 | FAIL | The repo page shows "**431** stars", 73 forks, 3 watching, "MIT license" and 2,572 commits. 431 is below 1,000. N1 applies to this repo because it holds the product's source (7.3). That covers the desktop app (`src/main`, `src/renderer`), the session daemon (`src/daemon`), `src/cli`, `src/mcp`, and `relay/`, the project-operated "wmux push relay" that forwards encrypted pushes to APNs. package.json at HEAD has `"name": "wmux"`, `"version": "4.7.0"`, `"license": "MIT"` and repository `https://github.com/openwong2kim/wmux.git`. Three other pages show the same 431: wmux.app ("Star 431"), the owner's repository list and GitHub repository search. | https://github.com/openwong2kim/wmux ; https://github.com/openwong2kim/wmux/tree/2fbe8afa77dfa530c93ecdaeb84e2ef6348fd5ff/src ; https://github.com/openwong2kim/wmux/blob/2fbe8afa77dfa530c93ecdaeb84e2ef6348fd5ff/package.json#L2-L71 ; https://github.com/openwong2kim/wmux/blob/2fbe8afa77dfa530c93ecdaeb84e2ef6348fd5ff/relay/README.md | retrieved 2026-10-19 ; 2026-10-19 (HEAD) ; 2026-10-19 (HEAD) ; 2026-10-19 (HEAD) |
| N1: moved-repo check | FAIL confirmed | No successor repo, and no repo for this project with more stars, exists. (1) The repo page has no fork, moved or archived notice. (2) The owner, openwong2kim (display name "wong2kim"), is a personal account with no organisations. Its 28 repos sorted by stars start wmux 431, wsnap 9, wlog 3; the rest show no count. The only other wmux-named repos are `wmux-site` ("wmux landing page") and `chocolatey-wmux` (packaging). There is no wmux-app, wmux-ios or wmux-core. (3) wmux.app links only to github.com/openwong2kim/wmux and its releases (`…/releases/download/v4.7.0/wmux-4.7.0.Setup.exe`); its footer says "© 2026 wong2kim". (4) package.json `repository`, `homepage` and `bugs` all point to openwong2kim/wmux. (5) GitHub repository search for "wmux", sorted by stars, gives openwong2kim/wmux 431, then amirlehmam/wmux 421 (a different product, screened as wmux-b), then repos with 17 or fewer. None calls itself this project's successor or mirror. (6) The App Store listing's developer website is www.wmux.app. | https://github.com/openwong2kim?tab=repositories&sort=stargazers ; https://wmux.app ; https://github.com/search?q=wmux&type=repositories&s=stars&o=desc ; https://apps.apple.com/app/wmux-workspace-for-ai-agents/id6797904556 | retrieved 2026-10-19 ; undated (© 2026; demos recorded 2026-10-17), retrieved 2026-10-19 ; retrieved 2026-10-19 ; retrieved 2026-10-19 |

N2, C1, A1 and A3/A4 were not run: the screen stops at the first hard fail (7.11).

Access note: per 7.0, I did not use api.github.com or `add_repo`. Star counts and releases come from WebFetch of github.com pages. History comes from an anonymous blob-less clone (`--shallow-since=2026-04-22`), read only with `git log`, `git shortlog` and `git show`.

## Open questions
- **Will openwong2kim/wmux reach 1,000 stars?** It has 431 today, 569 short.
  - If it does, N1 becomes PASS.
  - The candidate would then need a fresh screen from N2 onward (N2, C1, A1, A3/A4). Nothing below is graded.
- **Unverified N2 lead, seen in passing and not graded.** In the N2 window (2026-04-22 → 2026-10-19), `main` has 2,361 commits.
  - **One identity cluster authored 2,081 of them (88%):**
    - `wong2kim <open.wong2kim@gmail.com>`: 1,794
    - `openwong2kim` (GitHub noreply; also the package.json `author`): 124
    - `wong2kim` (a MacBook-local address): 12
    - `iamwongeeeee` and `woyoungkim` (both `wykim777@naver.com`): 136 + 15
  - The naver.com address is likely the same person: the App Store seller is "Wooyoung Kim". That is not established. Even counted separately, it is 151 commits (6%), under the 10% bar.
  - The next humans are snowyukitty (two names, one address) with 68, bluemas 58, Przemek Poppe 29 and JLPJ 18. Releases are published by github-actions.
  - PRs are squash-merged with committer "GitHub", so git cannot show who merged other people's PRs. No one else reaches 10% of commits, so N2 PASS would need a second human who merged someone else's PR or published a release in the window. The PR pages would settle it.
  - 446 commits carry a `Co-authored-by: openwong2kim` trailer, and 720 carry a Claude co-author trailer (`noreply@anthropic.com`), which 7.3 excludes as an author identity.
- **Is the iOS app a separate, closed-source component?** The App Store app "wmux - Workspace for AI agents" is free, sold by "Wooyoung Kim", version 1.10.0 ("5d ago"), and needs iOS/iPadOS 18+.
  - The repo at HEAD has no iOS or Xcode project; its only Swift code is `native/computer-use-macos`. So the iOS app looks closed-source.
  - N1 would then not apply to it, but the closed-source N2 rule (7.3: "FAIL: a sole-developer product") probably would, since the seller is an individual.
  - Either way it cannot stand alone. The listing says: "First install the free wmux desktop app on your Windows or Mac (wmux.app). Pair with a QR code and your phone becomes its remote."
- **A1, A3 and C1 leads seen in passing (ungraded; they matter only if N1 later passes).**
  - The App Store listing says the phone app can show Claude Code, Codex and OpenCode sessions as a native chat. It reaches the computer over a Tailscale tailnet, "the relay in between cannot read" notification contents, and wmux never calls a model; it only mirrors the terminal. That bears on A1 (i)–(iii) for both harnesses and on A3 (a relay that only forwards).
  - The listing says "Designed for iPad" (F4 lead).
  - C1: the README says "ConPTY-native on Windows 10 and 11 with no WSL" (L32). Whether panes can run `claude` and `codex` inside WSL2 is unverified.
- **Lead for wmux-b, not graded here.** Today's GitHub search shows amirlehmam/wmux at 421 stars, also below 1,000.
