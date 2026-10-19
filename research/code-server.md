# code-server

- Slug: code-server
- Canonical: https://github.com/coder/code-server · https://coder.com/docs/code-server
- Layer(s): client/UI, sync, networking
- Open source: yes (MIT)
- Latest release checked: v4.141.0 (Code 1.141.0), 2026-10-08, https://github.com/coder/code-server/releases/tag/v4.141.0 (default branch `main` at `f07405c`, 2026-10-14)
- Checked: 2026-10-19 by screen-code-server

## Summary
- Screen: FAIL at N3
- N3 fails on clause (b) alone. The maintainers' own MAINTAINING.md, also published on coder.com/docs, says code-server is kept "up to date with VS Code releases … but we are not generally actively developing code-server aside from fixing regressions". code-asher put that text in place of the doc's "Team" section (two named maintainers) in July 2024. The repo is not archived and is not inactive: v4.141.0 shipped on 2026-10-08, and there were 36 non-bot commits in the last 90 days.
- N2 fails independently, so the outcome does not depend on how (b) is read. Across the whole 2026-04-22 → 2026-10-19 window, one human (Asher, GitHub `code-asher`, Coder) authored 62% of the non-bot commits, merged every PR and published every release. No second human reaches 10% (the next is 7.6%), merged a PR or published a release.
- N1 passes: 79.6k stars.
- C1, A1 and A3/A4 were not screened: the screen stops at the first hard fail (7.11). Under 7.12, code-server cannot be used in any stack, even as glue. Discovery counted on it for A5 and F6–F8, so that coverage must come from another screened component.
- This reverses discovery's N2 PASS. That verdict rested on the CODEOWNERS team and on update PRs authored by others, all of which Asher merged. Discovery did not report the MAINTAINING.md statement.

## Screen
| ID | Verdict | Evidence (short quote or exact paraphrase) | Source URL | Source date |
|----|---------|---------------------------------------------|------------|-------------|
| N3 | FAIL | **(b) Maintainer notice of maintenance-only development:** "We keep code-server up to date with VS Code releases (there are usually two or three a month) but we are not generally actively developing code-server aside from fixing regressions. Most of the work is keeping on top of issues and discussions." It is still on `main` and on the docs site. code-asher added it in `6514ba4` ("Update contributing docs"). That commit deleted the "Team" section ("Current maintainers: @code-asher, @jsjoeio", onboarding and offboarding) and the milestone workflow. **(a) not triggered:** no archived banner. **(c) not triggered:** v4.141.0 released 2026-10-08; 24 releases in the window; 36 non-bot commits to `main` since 2026-07-21, the last on 2026-10-14 (`f07405c`). | https://github.com/coder/code-server/blob/f07405cba33179e6d2058af07ca2be290f19b262/docs/MAINTAINING.md#L19-L23 · https://github.com/coder/code-server/commit/6514ba4bf3e094f92d0fc0898693c80b3759a3a6 · https://coder.com/docs/code-server/MAINTAINING · https://github.com/coder/code-server/releases/tag/v4.141.0 | 2026-10-14 (file at HEAD) · 2024-07-03 (commit) · undated, retrieved 2026-10-19 · 2026-10-08 |
| N1 | PASS | 79.6k stars and 6.9k forks on the repo that holds the source (MIT) | https://github.com/coder/code-server | retrieved 2026-10-19 |
| N2 | FAIL | **Window:** 2026-04-22 → 2026-10-19 on `main`, from a `--shallow-since=2026-04-22` clone and `git shortlog`. **Authorship:** 210 commits. Excluding dependabot[bot] (73) and `cdrci` (45; the git identity that the CI workflows set) leaves 92 non-bot commits. Asher `<ash@coder.com>` (code-asher) wrote 57 (62.0%). Next are denusklo with 7 (7.6%) and Olivier Benz with 6 (6.5%); everyone else has ≤2. There are no AI-agent identities and no human co-author trailers. **Merges:** the "Draft release" workflow runs on every PR close into `main`. Its runs from 2026-05-08 to 2026-10-15 read "Pull request #N closed by code-asher" for every merged PR. The only other actors closed their own PRs, none of which is in `main` (e.g. #7943, #8048). The six PRs merged 2026-04-22 → 05-07 (#7760, #7763, #7764, #7768, #7783, #7787) were each checked: all were merged by code-asher. The 30 most recent merged PRs (merged 2026-09-11 → 2026-10-14, #7914 to #8055) were also checked one by one: all code-asher. **Releases:** all 25 Publish-workflow runs in the window (24 versions, v4.117.0 on 2026-04-23 → v4.141.0 on 2026-10-08) show "released by code-asher". CODEOWNERS assigns `* @coder/code-server`, a team, but no other member merged or released in the window. No second human meets any 7.3 PASS condition. | https://github.com/coder/code-server/actions/workflows/release.yaml (pages 1–9) · https://github.com/coder/code-server/actions/workflows/publish.yaml (pages 1–2) · https://github.com/coder/code-server/pull/8055 · https://github.com/coder/code-server/blob/f07405cba33179e6d2058af07ca2be290f19b262/.github/workflows/update.yaml#L62 · https://github.com/coder/code-server/blob/f07405cba33179e6d2058af07ca2be290f19b262/.github/CODEOWNERS#L1 | retrieved 2026-10-19 (run lists; runs dated 2026-04-23 → 2026-10-15) · 2026-10-14 (#8055 merged) · 2026-10-14 (files at HEAD) |

C1, A1, A3 and A4 were not screened: the screen stops at the first hard fail (brief 7.11). N1 and N2 were checked anyway (N2 evidence was being gathered when the N3(b) statement turned up), so the FAIL does not rest on one reading.

## Open questions
- **N3(b) reading.** Does "not generally actively developing code-server aside from fixing regressions" count as a "maintenance-only" notice?
  - Read as one here. It states maintenance-only work, and it replaced the Team and workflow sections, which makes it a deliberate change of status.
  - Against: community features still land. v4.141.0 adds `--enable-remote-storage` (#7914), and Windows packaging arrived in #7984–#7989 (2026-09). The VS Code core is also updated weekly.
  - If (b) is read narrowly (explicit "maintenance mode" or deprecation banners only), N3 becomes PASS and the screen fails at N2 instead. The outcome is unchanged.
- **N2 team membership.** The `@coder/code-server` team in CODEOWNERS may have members besides Asher, but GitHub team membership is not public. N2 would become PASS only with evidence that a second human merged someone else's PR or published a release in the window. The run logs show none from 2026-04-23 to 2026-10-15. Even then, N3(b) would stand.
- **Unscreened, for the record only.** These are not verdicts and matter only if both N3 and N2 were overturned.
  - C1: v4.141.0 ships official Linux `.deb`, `.rpm` and `.tar.gz` builds (amd64 and arm64), plus a `windows-amd64.tar.gz` added by #7987 (2026-09-09).
  - A1 and F4: `docs/ios.md` and `docs/ipad.md` exist.
  - A3, A4 and F1: discovery's Open VSX leads for `Anthropic.claude-code` and `openai.chatgpt` were not verified here, and neither was whether their webviews work over Tailscale HTTPS.
