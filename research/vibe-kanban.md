# Vibe Kanban

- Slug: vibe-kanban
- Canonical: https://github.com/BloopAI/vibe-kanban, https://www.vibekanban.com
- Layer(s): orchestrator, client/UI
- Open source: yes (Apache-2.0)
- Latest release checked: v0.1.44 (tag `v0.1.44-20260424091429`), 2026-04-24, https://github.com/BloopAI/vibe-kanban/releases/tag/v0.1.44-20260424091429. GitHub marks it "Latest", and npm `latest` is also 0.1.44. A bare tag `v0.1.45-20260919085201` (2026-09-19) points at main HEAD `d5cbb53` but has no GitHub release. npm 0.1.45 was published 2026-09-19T07:14Z and has since been withdrawn (`registry.npmjs.org/vibe-kanban/0.1.45` returns 404).
- Checked: 2026-10-19 by screen-vibe-kanban

## Summary
- Screen: FAIL at N3
- Bloop AI, the company behind Vibe Kanban, announced its shutdown on 2026-04-10 ("Goodbye bloop": "Vibe Kanban is sunsetting."). The README on main still opens with "Vibe Kanban is sunsetting." (HEAD `d5cbb53`, 2026-09-19). Under 7.3(b), an announced sunset is FAIL even though local workspaces still work.
- What the announcement says: remote services (kanban issues, comments, projects, organisations) stayed up for 30 days, then the app moved to "a fully local architecture"; subscriptions were terminated; "local workspaces will continue to function"; the latest version includes data export. It names no successor product. The project is to continue "open source and community maintained", with a roadmap promised "over the next few weeks".
- No roadmap or maintainer team has been published since then. The maintainer's own discussion #3424 (2026-06-02) still asks who will maintain the project. The vibekanban.com blog has no post after 2026-04-10.
- The project is not dead. The repo is not archived, and main received 10 human commits between 2026-09-15 and 2026-09-19 from 4 authors. So 7.3(a) and 7.3(c) are not triggered, and the FAIL rests on 7.3(b) alone. The last human commit was 2026-09-19. If nothing lands by 2026-12-18, (c) also triggers.
- N1, N2, C1, A1 and A3/A4 were not screened, because 7.11 stops at the first hard fail. Community forks are leads only (see Open questions).

## Screen
| ID | Verdict | Evidence (short quote or exact paraphrase) | Source URL | Source date |
|----|---------|---------------------------------------------|------------|-------------|
| N3 | FAIL | 7.3(b), vendor notice. Signed "Louis, Gabriel and the bloop team": "Today we're shutting down bloop, the company behind Vibe Kanban. The Vibe Kanban project will live on, open source and community maintained." The site banner says: "Vibe Kanban is sunsetting." The post also says: "Remote services will remain available for 30 days, after which Vibe Kanban will transition to a fully local architecture. Remote services that will be removed include: kanban issues, comments, projects and organisations." and "local workspaces will continue to function." | https://www.vibekanban.com/blog/shutdown | 2026-04-10 |
| N3 (b) | FAIL | The README on the default branch still carries the notice: "**Vibe Kanban is sunsetting.** Read the announcement." (README.md L19–L20 at HEAD). It was added 2026-04-24 in #3388 ("Add README sunsetting banner", Louis Knight-Webb). | https://github.com/BloopAI/vibe-kanban/blob/d5cbb5380fa0b32e98ef9b8d987f63decce4be3a/README.md#L19-L20 | 2026-09-19 (HEAD), retrieved 2026-10-19 |
| N3 (b) | FAIL | v0.1.42 release notes, headed "bloop, the company behind Vibe Kanban is shutting down", link the shutdown post. v0.1.44 (Latest) notes include "Sunset project routes to an export-only page" (#3387) and "Replace README hiring banner with sunsetting notice" (#3388), both by @stunningpixels. | https://github.com/BloopAI/vibe-kanban/releases/tag/v0.1.42-20260410131124 ; https://github.com/BloopAI/vibe-kanban/releases/tag/v0.1.44-20260424091429 | 2026-04-10 ; 2026-04-24 |
| N3 (b) | FAIL | Maintainer stunningpixels opened the discussion "What would a community edition of Vibe Kanban look like?": "the startup behind Vibe Kanban will be shutting down". It asks what the roadmap should hold and who will donate time to maintain the project. No community roadmap or maintainer team has been announced since. | https://github.com/BloopAI/vibe-kanban/discussions/3424 | 2026-06-02 |
| N3 (a) | not triggered | No archived banner. The repo page shows 28.4k stars, 3.0k forks, Apache-2.0 and 2,080 commits. | https://github.com/BloopAI/vibe-kanban | retrieved 2026-10-19 |
| N3 (c) | not triggered | main received 10 human commits between 2026-09-15 and 2026-09-19 from 4 authors, all merged as PRs (#3447–#3464). HEAD is `d5cbb53`, "fix: Tanstack router api fix (#3464)". Before that, the last commits were the 2026-04-24 sunset changes. | https://github.com/BloopAI/vibe-kanban/commit/d5cbb5380fa0b32e98ef9b8d987f63decce4be3a | 2026-09-19 |

Not screened: N1, N2, C1, A1 and A3/A4, because screening stopped at the first hard fail (7.11). The 28.4k-star count was seen in passing and is not graded.

## Open questions
- Will BloopAI withdraw the sunset notice, or announce a community edition with named maintainers and a release process (README banner, discussion #3424, vibekanban.com/blog)? Only that would change N3. Until then 7.3(b) is FAIL.
- What is the status of v0.1.45? It is a bare git tag on main (2026-09-19) with no GitHub release. Its npm version was published and then withdrawn (404), so `npx vibe-kanban` still installs 0.1.44. It does not change N3(b). If no human commit or release lands by 2026-12-18, 7.3(c) also fails.
- Community forks (leads only, not this candidate; each would need its own N1–N3 screen). Both were found via comments on issue #3408 "is this project dead?" (https://github.com/BloopAI/vibe-kanban/issues/3408):
  - dexloom/vibe-kanban-indie (https://github.com/dexloom/vibe-kanban-indie): 73★, and its README calls it "an independent, single-developer fork". It would likely fail N1 and N2.
  - flashlan/vibe-kanban-alternative, which now resolves to flashlan/aurapunk-ide, a fork of the dexloom fork: 7★. It would likely fail N1.
  - Star counts retrieved 2026-10-19.
- Does the phone remote-access path ("Remote Access: Control your laptop's agents, from your phone", vibekanban.com/blog/remote-access, 2026-02-28) survive the move to "a fully local architecture"? This matters for A1 only if a successor or fork is ever screened.
