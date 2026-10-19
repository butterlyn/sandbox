# wmux (amirlehmam)

- Slug: wmux-b
- Canonical: https://github.com/amirlehmam/wmux · site https://wmux.org · wiki https://github.com/amirlehmam/wmux/wiki
- Layer(s): client/UI (PC-side Windows terminal/multiplexer; phone web console), orchestrator (light: cmux-compatible socket API, `wmux agent spawn`)
- Open source: yes (MIT)
- Latest release checked: v2.28.1, 2026-10-18, https://github.com/amirlehmam/wmux/releases/tag/v2.28.1 (tag at `3d59aef`, which is HEAD of `master`; published by the github-actions release workflow; marked "Latest", not a pre-release)
- Checked: 2026-10-19 by screen-wmux-b

## Summary
- Screen: FAIL at N1
- **N1 fails.** The repo that holds the source shows **421 stars** (87 forks, 10 watching), retrieved 2026-10-19. That is below the 1,000 floor. The owner's profile shows the same 421.
- **The project has not moved.** At v2.28.1, the README and the website source (`site/`, served at wmux.org) point to amirlehmam/wmux for downloads, releases, issues and discussions. GitHub shows no "moved" notice. The owner's only other wmux repo is the deprecated wmux-orchestrator plugin, with 11 stars. kevmtt/wmux is a fork.
- **N3 passes.** The repo is not archived. v2.28.1 shipped on 2026-10-18, the tenth release since 2026-10-14. There were 529 commits to `master` since 2026-07-21, all by human authors (29 identities). The only deprecation notice covers the bundled wmux-orchestrator Claude Code plugin, removed in 2.12.0; wmux itself is not deprecated.
- **Not screened:** N2, C1, A1, A3 and A4. The screen stops at the first hard fail (brief 7.11).
- **Stack consequence (7.12):** wmux-b cannot be used in any stack, even as glue. That rules it out as the PC-side terminal layer and rules out its phone web console for A1. The user's "cmux for Windows/WSL2" layer must come from another screened component.
- **resolve.md version lead settled:** "0.7.10" is stale link text in the README's install section. The link itself goes to `releases/latest`, and `package.json` says 2.28.1.

## Screen
| ID | Verdict | Evidence (short quote or exact paraphrase) | Source URL | Source date |
|----|---------|---------------------------------------------|------------|-------------|
| N3 | PASS | **(a)** No archived banner on the repo page. **(b)** No deprecation, sunset or maintenance-only notice for wmux. The README's only deprecation is "## wmux-orchestrator (deprecated in 2.12.0)": "**wmux no longer installs a Claude Code plugin.**" It also says `wmux agent spawn` / `spawn-batch` and the sidebar orchestration panel are "unaffected". **(c)** Not triggered. v2.28.1 was released 2026-10-18 ("Latest"); the releases page lists ten releases from 14 Oct to 18 Oct (v2.23.1 → v2.28.1). The last human commits on `master` are `860545b` (Amir, 2026-10-18, "fix: resolve App Execution Alias shells (#299)…") and `01a87ac` (li666yilin, 2026-10-17, #298). There were 529 commits since 2026-07-21, none by a bot (the only service-account commit in the window, MseeP.ai, is dated 2026-06-11), from 29 distinct author emails. Counts come from a `--shallow-since=2026-04-22` blob-less clone. | https://github.com/amirlehmam/wmux · https://github.com/amirlehmam/wmux/releases/tag/v2.28.1 · https://github.com/amirlehmam/wmux/releases · https://github.com/amirlehmam/wmux/commit/860545b6c63dd7705a0bd28932c28dec9ccba994 · https://github.com/amirlehmam/wmux/blob/3d59aef0264e6febf3dd2af766ac64e95e1b3dd2/README.md#L310-L336 | retrieved 2026-10-19 (repo page) · 2026-10-18 (release) · retrieved 2026-10-19 (release list, 2026-10-14 → 10-18) · 2026-10-18 (commit) · 2026-10-17 (README last changed at `01a87ac`; file at the v2.28.1 tag) |
| N1 | FAIL | The repo page shows "**421** stars", 87 forks and 10 watching. That is below the 1,000 floor. MIT, and this repo holds the source, so N1 applies (7.3). **Moved-repo check:** none found. The README at v2.28.1 links its download badge to `github.com/amirlehmam/wmux/releases/latest`, and its release and licence badges also point to this repo. The website source in `site/` links `github.com/amirlehmam/wmux` 60 times. The only other wmux-named repo it links is the deprecated plugin `amirlehmam/wmux-orchestrator` (4 links). The owner's repositories tab lists `wmux` (421, not a fork) and `wmux-orchestrator` (11, the deprecated plugin). A web search turned up only openwong2kim/wmux (a different product, screened as wmux-a) and kevmtt/wmux (a fork). | https://github.com/amirlehmam/wmux · https://github.com/amirlehmam?tab=repositories · https://github.com/amirlehmam/wmux/blob/3d59aef0264e6febf3dd2af766ac64e95e1b3dd2/README.md#L12-L19 · https://github.com/amirlehmam/wmux/tree/3d59aef0264e6febf3dd2af766ac64e95e1b3dd2/site | retrieved 2026-10-19 · retrieved 2026-10-19 · 2026-10-17 (file at the v2.28.1 tag) · 2026-10-18 (tree at the v2.28.1 tag) |

N2, C1, A1, A3 and A4 were not screened: the screen stops at the first hard fail (brief 7.11).

## Open questions
- **None that could change the outcome.**
  - N1 is a numeric NEVER gate, and brief section 3 forbids relaxing it.
  - It would flip only if this repo reached 1,000 stars (it shows 421) or the project moved to a repo with ≥1,000 stars. Neither was found on 2026-10-19.
- **For the record only (not verdicts).** These matter only if N1 were overturned.
  - **N2 raw data**, from the same window clone (2026-04-22 → 2026-10-19, `master`):
    - 724 commits; 723 after excluding MseeP.ai.
    - Amir `<aeonthings@gmail.com>` authored 474 (65.6%). The next is The_Holek with 44 across two identities (6.1%), then jeFF0Falltrades with 29 (4.0%).
    - Most Co-authored-by trailers are Claude (`noreply@anthropic.com`), which do not count as authors.
    - No second human reaches 10%. Releases are published by the github-actions workflow.
    - Whether a second human merged others' PRs or triggered releases was not checked, so N2 would have been an open check.
  - **C1, A1 and A3/A4 leads** from the README at v2.28.1, not verified:
    - Windows-native zip, "No installer, no code signing, no admin required" (L261).
    - The phone web console is "off by default", listens on `127.0.0.1:9790`, pairs by QR code, and is reached through `tailscale serve` or an SSH tunnel (L26–L45). That is webapp only, so F3 would FAIL.
    - Opt-in Claude restore through `claude --resume <id>` (L625).
    - Codex and other agents are classified by reading "their on-screen UI" (L304).
