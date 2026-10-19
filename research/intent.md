# Intent

- Slug: intent
- Canonical: https://intentapp.dev (https://www.augmentcode.com/product/intent 308-redirects to https://www.intentapp.dev/). Source: https://github.com/intent-hq/intent, a monorepo whose submodules are https://github.com/intent-hq/intentd, https://github.com/intent-hq/cloudlands-fe and the private intent-hq/ios. Releases: https://github.com/intent-hq/cloudlands-releases
- Layer(s): orchestrator, client/UI
- Open source: yes (Apache-2.0) for the desktop app (cloudlands-fe) and the daemon (intentd). The iOS companion app (intent-hq/ios) is private. This contradicts the Stage 1 lead "closed source".
- Latest release checked: stable channel v2.219.8 ("Intent v2.219.8 — stable promotion", tag `stable`, published by panghy), 2026-10-19 (assets uploaded 2026-10-19T03:15:49Z), https://github.com/intent-hq/cloudlands-releases/releases/tag/stable. Newest beta pre-release: v2.220.2, 2026-10-18T18:14:23Z, https://github.com/intent-hq/cloudlands-releases/releases/tag/v2.220.2. iOS: Intent mobile v1.1.6, 2026-10-16, https://intentapp.dev/updates.
- Checked: 2026-10-19 by screen-intent

## Summary
- Screen: FAIL at N1
- Intent is no longer closed source. Its desktop app (intent-hq/cloudlands-fe) and its Rust daemon (intent-hq/intentd) are Apache-2.0 in public GitHub repos with full history. The public monorepo intent-hq/intent ties them together, and intentapp.dev links it as "Source". The LICENSE and NOTICE were added on 2026-07-22. Only the iOS companion app is private.
- So N1 applies (7.3), and it fails. Every repo that holds the source is far below 1,000 stars: the monorepo has 342★, intentd 11★ and cloudlands-fe 7★. No intent-hq repo has more than 342★ (retrieved 2026-10-19). Under 7.11 this is a hard fail, so the screen stopped here.
- N3 passes. Several pre-releases ship each day, and the stable channel promoted v2.219.8 on 2026-10-19. Humans committed to both component repos on 2026-10-19. Nothing is archived. No vendor deprecation notice was found: Augment's launch post (2026-02-10) carries no later notice, and augmentcode.com/product/intent now redirects to intentapp.dev.
- The FAIL rests on reading Intent as open source. CONTRIBUTING says development happens in the intent-hq repositories and that the public repo is "a read-only snapshot mirror" that does not accept external PRs. That is still public Apache-2.0 source with full history, not a release-only repo. Treating Intent as closed would relax N1, so this screen does not (see Open questions).
- Not graded: N2, C1, A1 and A3/A4, because the screen stopped at N1. Seen in passing: the Stage 1 lead "macOS download only" is also outdated. The site's download button changes with the visitor's platform, and stable v2.219.8 ships Windows and Linux builds. The docs label them "Windows (Alpha)" and "Linux (Alpha)". Details are under Open questions.

## Screen
| ID | Verdict | Evidence (short quote or exact paraphrase) | Source URL | Source date |
|----|---------|---------------------------------------------|------------|-------------|
| N3 | PASS | 7.3(c), releases. The stable channel promoted v2.219.8: "Intent v2.219.8 — stable promotion", "Promoted version: v2.219.8", "Previous stable: v2.212.1", published by panghy, with 18 assets uploaded 2026-10-19T03:15:49Z. Ten beta pre-releases (v2.219.14 to v2.220.2) were published between 2026-10-17 10:45 and 2026-10-18 18:14 UTC, the last at 2026-10-18T18:14:23Z by intent-hq-ci. | https://github.com/intent-hq/cloudlands-releases/releases/tag/stable ; https://github.com/intent-hq/cloudlands-releases/releases.atom | 2026-10-19 ; 2026-10-18 |
| N3 (c) | PASS | Human commits to the default branch on 2026-10-19. intentd HEAD `3de861e` is by Clement Pang, "docs(guide): single Open in original workspace item shows only its label (#2494)", 05:42 UTC. cloudlands-fe HEAD `09702e1` is by Clement Pang, "test(scripts): wait for test:loaded's own busy-loop pid report … (#3499)", 03:26 UTC. | https://github.com/intent-hq/intentd/commit/3de861ec6a0ccd087d1e44483f0be229e9cbf188 ; https://github.com/intent-hq/cloudlands-fe/commit/09702e1f2f76744dca0e23e7ba29e3843e2cb2bb | 2026-10-19 |
| N3 (c) | PASS | Vendor changelog (RSS dates): "Intent mobile v1.1.6" on 2026-10-16, v2.212.1 on 2026-10-09, "Intent mobile" on 2026-10-08 ("available on the App Store"), v2.207.0 on 2026-10-05, v2.198.1 on 2026-10-02. | https://intentapp.dev/updates ; https://intentapp.dev/updates/rss.xml | 2026-10-16 |
| N3 (a) | not triggered | No intent-hq repo is archived. The org page lists 10 public repos, all updated between 2026-08-26 and 2026-10-19. | https://github.com/orgs/intent-hq/repositories | retrieved 2026-10-19 |
| N3 (b) | not triggered | No deprecation, sunset, shutdown or maintenance-only notice was found. Augment's launch post "Intent: A workspace for agent orchestration" links to intentapp.dev ("Download for macOS. Windows waitlist coming soon.") and carries no later notice. The product page https://www.augmentcode.com/product/intent 308-redirects to https://www.intentapp.dev/. The NOTICE says: "Intent originated as "Intent by Augment" (https://github.com/intent-hq), and the NOTICE preserves that lineage and branding." The monorepo docs say the port to the `intentd` daemon "completed on 2026-07-13, with self-hosting cutover", after being "built entirely with the reference app (`augmentcode/intent`)". The named surface continues as the intentapp.dev product, which is the 7.1 canonical screened here. | https://www.augmentcode.com/blog/intent-a-workspace-for-agent-orchestration ; https://github.com/intent-hq/intent/blob/a42350732a153e160ca78be6d1fa22706003630d/NOTICE#L1-L6 ; https://github.com/intent-hq/intent/blob/a42350732a153e160ca78be6d1fa22706003630d/docs/README.md#L97-L106 | 2026-02-10 ; 2026-10-19 (HEAD) |
| N1 | FAIL | Open source under 7.3: Apache-2.0, developed in public GitHub repos. The monorepo README says "the code lives in the component repos" and lists intentd ("Rust backend daemon"), cloudlands-fe ("Electron + SvelteKit desktop app") and ios ("SwiftUI iOS companion app (private)"). intentd and cloudlands-fe each carry an Apache-2.0 LICENSE and clone anonymously: 1,742 and 7,954 tracked files at HEAD, with 2,254 and 3,301 commits. On intentapp.dev, the "Source" link in the hero and footer points to github.com/intent-hq/intent. | https://github.com/intent-hq/intent/blob/a42350732a153e160ca78be6d1fa22706003630d/README.md#L206-L213 ; https://github.com/intent-hq/intentd/blob/3de861ec6a0ccd087d1e44483f0be229e9cbf188/LICENSE ; https://github.com/intent-hq/cloudlands-fe/blob/09702e1f2f76744dca0e23e7ba29e3843e2cb2bb/LICENSE ; https://intentapp.dev/ | 2026-10-19 (HEAD) ; undated, retrieved 2026-10-19 |
| N1 | FAIL | Licence history: monorepo commit `cb59553`, "chore: add Apache 2.0 LICENSE and NOTICE, bump intentd and cloudlands-fe submodules (#436)". | https://github.com/intent-hq/intent/commit/cb595532680cd954c5f9e81cf0b89d0387102503 | 2026-07-22 |
| N1 | FAIL | Stars: intent-hq/intent 342★ (34 forks), intent-hq/intentd 11★, intent-hq/cloudlands-fe 7★. The org's repo list confirms the counts, and 342★ is the highest in the org (cloudlands-releases has 8★). Every candidate for "the repo that holds the source" is below 1,000. | https://github.com/intent-hq/intent ; https://github.com/intent-hq/intentd ; https://github.com/intent-hq/cloudlands-fe ; https://github.com/orgs/intent-hq/repositories | retrieved 2026-10-19 |

Not screened: N2, C1, A1 and A3/A4, because 7.11 stops at the first hard fail. Facts seen in passing are listed below, ungraded.

## Open questions
- **Does N1 apply?** The deciding text is in CONTRIBUTING:
  - L33–L35: "Development happens in the `intent-hq` repositories at high velocity, largely driven by AI agents … At launch, the public repository is a **read-only snapshot mirror** of that development."
  - L41: "External pull requests are not being accepted yet."
  - Source: https://github.com/intent-hq/intent/blob/a42350732a153e160ca78be6d1fa22706003630d/CONTRIBUTING.md#L33-L41
  - The intentd README still says "although this repository is private" (L85) and calls the release mirror a "temporary bridge until this repo is open-sourced" (L757), so it lags the repo's current public status.
  - This screen counts Intent as open source, because the full Apache-2.0 source and history are public, unlike a release-only repo. Counting it as closed would make N1 N/A, which relaxes a gate.
  - Only the orchestrator could choose that reading. It would move N1 from FAIL to N/A and resume the screen at N2.
- **Star trajectory.** The repos went public recently: the LICENSE landed 2026-07-22 and CONTRIBUTING still says "At launch". If intent-hq/intent passes 1,000★, N1 flips to PASS and the screen resumes at N2. The count was 342★ on 2026-10-19.
- **Leads for a resumed screen** (seen in passing, ungraded):
  - **N2:**
    - Data: anonymous blob-less clones, `git shortlog -sne --since=2026-04-22`, excluding "Intent HQ CI Bot" and dependabot.
    - cloudlands-fe: Sam Breed authored 519 of about 3,072 non-bot commits (~17%), and Amelia Wattenberger 215.
    - intentd and the monorepo: Clement Pang authored about 96–99% of non-bot commits.
    - A second human at ≥10% on cloudlands-fe points to PASS.
    - Releases are published by panghy (Clement Pang) and intent-hq-ci.
  - **C1, desktop builds:**
    - The stable v2.219.8 assets include `Intent.Setup.2.219.8.exe`, `Intent.2.219.8.exe`, `Intent-2.219.8.AppImage` (plus arm64) and `intent_2.219.8_amd64.deb` (plus arm64), with `latest.yml` and `latest-linux.yml` update feeds. Source: https://github.com/intent-hq/cloudlands-releases/releases/expanded_assets/stable (assets dated 2026-10-19).
    - On Windows, the site's script labels the button "Download for Windows" and links the `Intent.Setup.*.exe` asset of the `stable` release. Source: https://intentapp.dev/_astro/Navigation.astro_astro_type_script_index_0_lang.CXihFcVD.js (undated, retrieved 2026-10-19).
    - The docs say "Download Intent for macOS, Windows (Alpha), or Linux (Alpha)". Source: https://intentapp.dev/docs (undated, retrieved 2026-10-19).
  - **C1, how the alpha label would grade:**
    - Under 7.16a, the Windows build ships in the stable channel, so it counts as available, with "Alpha" recorded as a caveat. The strict alternative would make it PARTIAL.
    - A Linux GUI run under WSLg would be PARTIAL under 7.9, because of the alpha label.
  - **C1, unattended daemon:** the standalone `intentd` daemon has a Windows PowerShell installer and a Linux `.deb` with a systemd user unit that runs `intentd serve --resume-all`. So it can run unattended. Source: https://github.com/intent-hq/intent/blob/a42350732a153e160ca78be6d1fa22706003630d/README.md#L37-L78
  - **A1, iOS app:**
    - The App Store app "Intent mobile" runs on iPhone, iPad and iPhone Duo: https://apps.apple.com/us/app/intent-mobile/id6806514581
    - It pairs with "Intent on any computer" over WSS/TLS, by QR code, an `intent://pair` link, or host, port and token. Away from home it connects through a bundled tailcat tunnel.
    - It can create workspaces (choosing repo, branch, specialist, provider, model and prompt), chat, answer agent questions, render tool calls and run terminals.
    - Sources: https://intentapp.dev/updates (2026-10-08 entry) and https://intentapp.dev/docs.
    - No source explicitly shows pairing with an intentd hosted on Windows or in WSL2.
  - **A3/A4/F1, adapters:**
    - Pins: https://github.com/intent-hq/intentd/blob/3de861ec6a0ccd087d1e44483f0be229e9cbf188/crates/intent-providers/data/adapter-cli-packages.json
    - Claude Code runs through `@agentclientprotocol/claude-agent-acp` 0.81.1, built on `@anthropic-ai/claude-agent-sdk` 0.3.280. This is the 7.6 row "ACP adapter on the Claude Agent SDK".
    - Codex runs through `@agentclientprotocol/codex-acp` 2.1.1, which depends on `@openai/codex` ^0.159.1.
  - **A3/A4/F1, credentials and prompts:**
    - intentd README L457–L460: "Codex model probes use private temporary profiles, copy supported auth/routing configuration". This is a 7.16b side-copy and would need a credential-handling policy-risk note.
    - The daemon builds agents' system prompts from workspace rule files: "Rule injection — assembling the system prompt from workspace files … runs inside the backend as agents start" (monorepo `docs/protocol/05-method-catalog.md` L800). Whether that replaces Claude Code's default prompt is unverified. If it does, A4 would be PARTIAL under 7.6.
- **Augment's role.** Is intent-hq run by Augment or spun out? The evidence is indirect:
  - https://docs.augmentcode.com/intent/overview now 308-redirects to Augment's generic /introduction.
  - The support article "What is Intent by Augment?" (https://support.augmentcode.com/articles/8261719556-what-is-intent-by-augment) returns 404.
  - No explicit hand-off or sunset notice was found.
  - If such a notice exists, 7.3(b) would record "Intent by Augment" as deprecated, with the open-source Intent as its successor. That successor is the product screened here, so the outcome would not change.
