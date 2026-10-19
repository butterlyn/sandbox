# Happy

- Slug: happy
- Canonical: https://github.com/slopus/happy · https://happy.engineering
- Layer(s): client/UI, orchestrator, networking
- Open source: yes (MIT)
- Latest release checked:
  - `happy` CLI 1.2.5, 2026-09-22, https://www.npmjs.com/package/happy (beta 1.2.6-beta.1, 2026-10-09).
  - Happy iOS/iPadOS 1.8.0, 2026-10-07, https://apps.apple.com/us/app/happy-codex-claude-code-app/id6748571505.
  - No GitHub Releases. Default branch `main` at `24d340d` (2026-10-19).
- Checked: 2026-10-19 by screen-happy

## Summary
- Screen: FAIL at N3
- The vendor has put the in-scope PC component, the original `happy` CLI, in maintenance mode: "it gets critical fixes, and new features ship in Happy Desktop." Brief 7.3 N3(b) fails any component with a maintenance-only notice "even if the software still works today".
- The notice is recent. It was added on 2026-10-06 and last edited on 2026-10-13, after Stage 1's sources were checked. Every legacy CLI docs page now opens with it, and the maintainers' site instructions say "The CLI is legacy; we push people to Happy Desktop and the phone app."
- The successor cannot take the CLI's place. It is Happy Desktop with Happy Agent, "where Happy runs the harness itself", and the vendor says the CLI "is still the way to keep the exact original CLIs". 7.15 puts that harness out of scope, and 7.6 grades a non-native harness A4 FAIL.
- The rest of the candidate is healthy:
  - Repo: 24.2k stars, MIT, not archived (N1 PASS).
  - N3: the iOS app (1.8.0, 2026-10-07) and the relay (last commit 2026-10-17) pass.
  - N2 PASS: Steve Korshakov wrote 65.0% of human commits and Kirill Dubovitskiy 21.6%. Kirill published 23 npm releases in the window.
- Stage 1 leads corrected:
  - npm `happy-agent` 0.1.5 (2026-03-19) is an unrelated third-party package. The monorepo's `happy-agent` is not on npm.
  - The App Store notes that mention hidden tool calls belong to 1.7.0 (2026-03-27). The 1.8.0 notes read "Major UI refresh, Happy harness support".
- Not screened: C1, A1 and A3/A4. Brief 7.11 stops at the first hard fail.

## Screen
| ID | Verdict | Evidence (short quote or exact paraphrase) | Source URL | Source date |
|----|---------|---------------------------------------------|------------|-------------|
| N3 (`happy` CLI: `packages/happy-cli`, npm `happy`) | FAIL | Vendor docs: "The original Happy CLI (`happy` on npm, formerly `happy-coder`) still works, and the same Happy phone app reaches both it and Happy Desktop. It is in maintenance mode: it gets critical fixes, and new features ship in Happy Desktop." This is a maintenance-only notice under 7.3(b), which applies "even if the software still works today". The page source is in slopus/slopus.github.io, which the monorepo README lists as "The website and docs at happy.engineering" ([README#L48](https://github.com/slopus/happy/blob/24d340d54ce8eba59167aa0d988d83cc07f069b3/README.md#L48)). | https://happy.engineering/guides/terminal/ · https://github.com/slopus/slopus.github.io/blob/5ace459bc60021198d75e61c86b74ba96ac1c773/content/desktop/guides/terminal.mdx#L3 | 2026-10-13 (page `dateModified`) |
| N3 (`happy` CLI, corroboration) | FAIL | Every legacy CLI docs page opens with: "Happy is now a desktop app. The original Happy CLI (happy on npm, formerly happy-coder) is in maintenance mode: it keeps working and still gets critical fixes, but new features ship in the Happy desktop app. The Happy mobile app works with both." The page title is "Original Happy CLI Docs (Happy Coder) — Maintenance Mode". The maintainers' site instructions add: "The CLI is legacy; we push people to Happy Desktop and the phone app." The notice first appears in `e7e2b8e` (Kirill Dubovitskiy, 2026-10-06); the parent commit and the July history boundary do not contain it. | https://happy.engineering/docs/ · https://github.com/slopus/slopus.github.io/blob/5ace459bc60021198d75e61c86b74ba96ac1c773/src/DocumentPages.tsx#L99-L110 · https://github.com/slopus/slopus.github.io/blob/5ace459bc60021198d75e61c86b74ba96ac1c773/AGENTS.md#L27-L29 · https://github.com/slopus/slopus.github.io/commit/e7e2b8e69417ab949885d2665b38e118bca716d0 | 2026-10-14 (Last-Modified; site HEAD `5ace459`); notice added 2026-10-06 |
| N3 (Happy iOS/iPadOS app: `packages/happy-app`) | PASS | Version 1.8.0 shipped on 2026-10-07 (Apple `currentVersionReleaseDate` 2026-10-07T00:36:38Z). `packages/happy-app` had 250 commits in the last 90 days; the last was on 2026-10-17. No notice applies: the docs say "The Happy mobile app works with both". | https://itunes.apple.com/lookup?id=6748571505 · https://github.com/slopus/happy/commits/main/packages/happy-app | 2026-10-07 |
| N3 (relay server: `packages/happy-server`) | PASS | 18 commits in the last 90 days. The last, on 2026-10-17, was `f881f82` ("fix(server): allow free voice without RevenueCat config"). No notice. The self-host package `happy-server-self-host` last shipped to npm as 1.1.11 on 2026-06-10, and its last commit was on 2026-08-03 (`16ea2ac`). | https://github.com/slopus/happy/commit/f881f82f524b068b67282d85167d4ef0bb9c7534 · https://www.npmjs.com/package/happy-server-self-host | 2026-10-17 |
| N3 (`happy-agent`: `packages/happy-agent`) | PARTIAL | Not archived, and no notice names it. Material caveat: the README calls it "remote session control for the original Happy CLI", so it serves only the maintenance-mode CLI. It had 4 commits in 6 months. The last functional change was on 2026-07-10 (`c428922`); the last touch was "chore: trim the repo root" on 2026-10-06. It is not on npm: its README installs it "From the monorepo" (`yarn workspace happy-agent build` or `npm link`). npm's `happy-agent` 0.1.5 is a different package: "Happy Agent Server - Claude Agent SDK wrapper with JWT auth and HTTP callback", with no repository field, published by `yanbingbing`. | https://github.com/slopus/happy/blob/24d340d54ce8eba59167aa0d988d83cc07f069b3/packages/happy-agent/README.md#L1-L19 · https://github.com/slopus/happy/blob/24d340d54ce8eba59167aa0d988d83cc07f069b3/README.md#L69 · https://registry.npmjs.org/happy-agent | 2026-10-19 (commit `24d340d`); npm 2026-03-19 |
| N1 | PASS | 24.2k stars, MIT, not archived. This repo holds the source of every in-scope component. | https://github.com/slopus/happy | retrieved 2026-10-19 |
| N2 | PASS | Window 2026-04-22 → 2026-10-19 on `main` (git log at `24d340d`). There were 1,617 human commits after excluding 1 `github-actions[bot]` commit and 3 `Claude <noreply@anthropic.com>` commits with no human co-author. Steve Korshakov wrote 1,051 (65.0%) and Kirill Dubovitskiy 349 (21.6%, two identities). Next were Scoteezy 157 (9.7%, three identities), Hyunwoo Jung 24 and Charlie Zong 20. Releases: npm user `bra1ndump` (kirill2003de@gmail.com) published 23 of the 31 `happy` versions in the window, and GitHub Actions published the other 8. The npm maintainers are `steve.kite` (steve@korshakov.com) and `bra1ndump`. | https://github.com/slopus/happy/commits/main · https://registry.npmjs.org/happy | retrieved 2026-10-19 |
| N2 (in-scope packages) | PASS | Commits per package in the same window: `happy-cli` 141 (Kirill 43.3%, Scoteezy 39.0%), `happy-app` 424 (Kirill 59.0%, Scoteezy 27.8%), `happy-server` 56 (Kirill 39.3%, Scoteezy 37.5%, Steve 16.1%), `happy-agent` 4 (Steve 2, Kirill 1, Charlie Zong 1). The "two heavy maintainers" claim (Steve and Kirill) holds repo-wide. Most of Steve's commits are in the native clients, though (`happy-ios` 634, `happy-android` 322, against `happy-cli` 3 and `happy-app` 15). On the in-scope packages, the two heavy humans are Kirill and Scoteezy. | https://github.com/slopus/happy/commits/main/packages/happy-cli · https://github.com/slopus/happy/commits/main/packages/happy-app | retrieved 2026-10-19 |

C1, A1 and A3/A4 were not screened. Brief 7.11 stops at the first hard fail.

Notes on scope (not gate verdicts):
- **The excluded paths are optional today, but avoiding them leaves the stack on the maintenance-mode CLI.**
  - App Store listing: "Install Happy Desktop from happy.engineering, or if you prefer the terminal, run: npm install -g happy". It also requires "A computer running Happy Desktop or the Happy CLI".
  - CLI README requirements: "For Claude: `claude` CLI installed & logged in" and "For Codex: `codex` CLI installed & logged in" ([happy-cli/README.md#L153-L157](https://github.com/slopus/happy/blob/24d340d54ce8eba59167aa0d988d83cc07f069b3/packages/happy-cli/README.md#L153-L157)).
  - `happy connect` appears only under "To connect third-party agent APIs" ([#L97-L103](https://github.com/slopus/happy/blob/24d340d54ce8eba59167aa0d988d83cc07f069b3/packages/happy-cli/README.md#L97-L103)) and as a requirement only for Gemini.
  - The app's own text says: "Open Happy Desktop, or run happy in a terminal." ([en.ts#L938](https://github.com/slopus/happy/blob/24d340d54ce8eba59167aa0d988d83cc07f069b3/packages/happy-app/sources/text/translations/en.ts#L938)).
- **The release and the docs do not conflict.**
  - npm 1.2.5 (2026-09-22) predates the notice, and 1.2.6-beta.1 (2026-10-09) came three days after it. The package is not marked deprecated on npm.
  - The monorepo README at HEAD also says "For multi-model sessions and teams, move to the desktop app and Happy Harness" ([README#L50-L55](https://github.com/slopus/happy/blob/24d340d54ce8eba59167aa0d988d83cc07f069b3/README.md#L50-L55)).
  - Every `packages/happy-cli` commit since 2026-10-06 is a fix or an Agent SDK/model bump. The last was on 2026-10-09: `7ae2baa`, "fix(codex): align default model and minimum version (#1885)". That matches "critical fixes".
- **The successor's status is recorded here, as 7.3 asks.**
  - The vendor says: "Happy Agent and Happy Desktop are the current iteration, where Happy runs the harness itself, on your computer or a server." It adds that the CLI "is still the way to keep the exact original CLIs and the terminal on your own machine" ([remote-server.mdx#L27](https://github.com/slopus/slopus.github.io/blob/5ace459bc60021198d75e61c86b74ba96ac1c773/content/desktop/guides/remote-server.mdx#L27), site HEAD 2026-10-14).
  - The README says each provider runs "with its vendor's own prompts and tools … Happy adds a harness, not another bill" ([README#L23-L27](https://github.com/slopus/happy/blob/24d340d54ce8eba59167aa0d988d83cc07f069b3/README.md#L23-L27)).
  - 7.15 excludes it, and 7.6 grades a non-native harness on the user's plan A4 FAIL.

## Open questions
- **Should Happy Desktop / Happy Agent be screened as its own candidate, under 7.3's "screen the successor" rule?**
  - That is worth doing only if it can run the unmodified `claude`/`codex` under their own logins. The vendor's wording says it cannot ("where Happy runs the harness itself"; the CLI "is still the way to keep the exact original CLIs"). I did not verify this from the slopus/happy-desktop or slopus/happy-agent source.
  - This decides whether any Happy product can enter a stack. It would be an A4 question under 7.6, plus N3/N2 checks on those two repos.
- **C1, A1 and A3/A4 for the CLI path were not screened.** For a nearest-miss list, they rest only on the unverified Stage 1 leads in discovery.md §1.1.
  - App Store facts seen during this screen: it lists iPhone and iPad (`iosUniversal`, 5 iPad screenshots) and says "Start, steer and approve Claude and Codex sessions from your phone".
  - None of this can change the outcome, which N3 fixes.
- **`happy-agent` would have to be built from the monorepo.** `npm i -g happy-agent` installs an unrelated third-party package that wraps the Claude Agent SDK. This matters for A8/F11a if Happy is ever revisited, and it is a supply-chain hazard for any stack instructions.
- **One Stage 1 A2 lead is misdated.** Discovery cited "Internal tool calls (thinking, ToolSearch) hidden" as a 1.8.0 note. It belongs to 1.7.0 (2026-03-27), so only the source date of that lead changes.
