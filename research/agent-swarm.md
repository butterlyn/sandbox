# Agent Swarm

- Slug: agent-swarm
- Canonical: https://github.com/desplega-ai/agent-swarm; product site https://agent-swarm.dev (https://swar.am, the site the README names, 302-redirects there); npm `@desplega.ai/agent-swarm`
- Layer(s): orchestrator, runtime/sandbox
- Open source: yes (MIT, "Copyright (c) 2025-2026 desplega.sh")
- Latest release checked: v2.4.0 (marked Latest), 2026-10-19, https://github.com/desplega-ai/agent-swarm/releases/tag/v2.4.0. The tag points at e96addec80825ebf867b83b59f07201197e407a8, and npm `@desplega.ai/agent-swarm` `latest` is also 2.4.0.
- Checked: 2026-10-19 by screen-agent-swarm (default branch `main` at e96addec80825ebf867b83b59f07201197e407a8, 2026-10-19)

## Summary
- Screen: FAIL at N1
- **N1 fails: 904 stars today, 96 short of 1,000.** The repo page also shows 127 forks and 12 watching. N1 applies because this MIT repo holds the whole product's source (API server, worker and UI images, the `apps/ui` dashboard, the `charts` Helm chart), so under 7.3 and 7.11 this is a hard fail.
- **No other repo carries the project.** The repo page has no fork, moved or archived notice. The desplega-ai organisation's 54 repos, sorted by stars, put agent-swarm first (904; next is ai-toolbox at 36). agent-swarm.dev (where swar.am redirects), the README and npm `@desplega.ai/agent-swarm@2.4.0` all point to github.com/desplega-ai/agent-swarm.
- **N3 passes easily.** The repo is not archived and has no deprecation wording ("This repo evolves every single day."). v2.4.0 is marked Latest, released 2026-10-19. In the last 90 days `main` has 68 release commits and 210 human commits from 29 author identities, not counting bots or the project's own `tech@agent-swarm.dev` accounts.
- **N2, C1, A1 and A3/A4 were not screened**, because 7.11 stops at the first hard fail. The Stage 1 leads on the MIT licence and ~904 stars are confirmed; the lead about harness credentials in `.env` was not examined.
- **The fail could reverse.** The project ships almost daily and may cross 1,000 stars. If it does, re-screen from N2 (see Open questions).

## Screen
| ID | Verdict | Evidence (short quote or exact paraphrase) | Source URL | Source date |
|----|---------|---------------------------------------------|------------|-------------|
| N3 (a), (b) | PASS | (a) The repo page shows no archived banner and no "forked from" or moved notice. (b) The README contains no deprecation, sunset, maintenance-only, EOL or "no longer maintained" wording. README L6 says: "**This repo evolves every single day.**" | https://github.com/desplega-ai/agent-swarm ; https://github.com/desplega-ai/agent-swarm/blob/e96addec80825ebf867b83b59f07201197e407a8/README.md#L6 | retrieved 2026-10-19 ; 2026-10-19 (HEAD) |
| N3 (c): releases | PASS | v2.4.0 is marked "Latest". The page says "github-actions released this" at 19 Oct 02:54, for commit e96adde ("release: v2.4.0 + docs daily update 2026-10-19 (#2256)"). Releases come almost daily: v2.3.0 (18 Oct), v2.2.0 (18 Oct), v2.1.0 (17 Oct), v2.0.0 (16 Oct), v1.173.0 (15 Oct), and so on. `main` has 68 "release: v…" commits since 2026-07-21. | https://github.com/desplega-ai/agent-swarm/releases/tag/v2.4.0 ; https://github.com/desplega-ai/agent-swarm/releases | 2026-10-19 |
| N3 (c): commits | PASS | Blob-less clone, `git log` since 2026-07-21 (90 days): 1,033 commits on `main`. Excluded: bots (dependabot[bot] 16, capchase-bot 5) and the project's own accounts `desplegillo` and `desplega.ai` (both `tech@agent-swarm.dev`; 730 and 71 commits). That leaves 210 commits from 29 author identities, e.g. 2pac `<tarasyaremabcn@…>` 132, Daniel Füvesi 23, khoapmdx 9. The latest is 45e12eb (2pac, 2026-10-19T00:28Z, "feat(apps): stamp a verified caller into app actions (#2251)"). | https://github.com/desplega-ai/agent-swarm/commit/45e12eb65d8356eabf43fdbce297626a5e3fc72c ; https://github.com/desplega-ai/agent-swarm/commits/main | 2026-10-19 ; retrieved 2026-10-19 |
| N1 | FAIL | The repo page shows "**904** stars", 127 forks, 12 watching and "MIT license". 904 is below 1,000. N1 applies to this repo because it holds the product's source (7.3): `src`, `Dockerfile.worker`, `Dockerfile.ui`, the dashboard in `apps/ui`, and the Helm chart in `charts`. A second, independent page (the org's repository list) also shows 904. | https://github.com/desplega-ai/agent-swarm ; https://github.com/desplega-ai/agent-swarm/tree/e96addec80825ebf867b83b59f07201197e407a8/apps/ui | retrieved 2026-10-19 ; 2026-10-19 (HEAD) |
| N1: moved-repo check | FAIL confirmed | No successor repo or repo with more stars exists. (1) The repo page has no fork, moved or archived notice. (2) The org's repos sorted by stars, 54 in all: agent-swarm 904, ai-toolbox 36, qa-use 27, agent-fs 20, then 3 or fewer each. (3) agent-swarm.dev links only to github.com/desplega-ai/agent-swarm and says "Built by desplega.sh", "MIT License". swar.am returns 302 to agent-swarm.dev. (4) On npm, `@desplega.ai/agent-swarm` `latest` is 2.4.0 (modified 2026-10-19T02:55Z), with repository `git+https://github.com/desplega-ai/agent-swarm.git`. (5) The README's only repo links are to desplega-ai/agent-swarm. | https://github.com/orgs/desplega-ai/repositories?sort=stargazers ; https://agent-swarm.dev ; https://registry.npmjs.org/@desplega.ai/agent-swarm ; https://github.com/desplega-ai/agent-swarm/blob/e96addec80825ebf867b83b59f07201197e407a8/README.md | retrieved 2026-10-19 ; undated, retrieved 2026-10-19 ; 2026-10-19 ; 2026-10-19 (HEAD) |

N2, C1, A1 and A3/A4 were not run: the screen stops at the first hard fail (7.11).

Access note: the proxy refuses raw `curl` of this repo's github.com pages ("GitHub access to this repository is not enabled for this session"). Per 7.0, I took the star counts from WebFetch of the repo page and the org page, and the history from an anonymous blob-less clone (`--shallow-since=2026-04-22`).

## Open questions
- **Will the repo reach 1,000 stars?** It has 904 today and ships almost daily.
  - If it does, N1 becomes PASS.
  - The candidate would then need a fresh screen from N2 onward (N2, C1, A1, A3/A4). Nothing from that screen is graded here.
- **Unverified N2 lead, seen in passing and not graded.** Who are `desplegillo` and `desplega.ai` (`tech@agent-swarm.dev`)? Between them they made 801 of the 1,033 commits on `main` in the last 90 days.
  - 7.3 excludes AI-agent identities. The README's "daily evolution" framing suggests the swarm may commit to its own repo.
  - If so, the human author shares in the 2026-04-22 → 2026-10-19 window would rest on 2pac and the other contributors.
  - npm lists two maintainers, `tarasyarema` and `3z3`. GitHub Releases are published by github-actions.
- **Unverified A3/A4 lead, seen in passing and not graded.** Stage 1 says harness credentials live in `.env`; the repo ships `.env.example` and `.env.docker.example`.
  - Open question: how do worker containers authenticate Claude Code and Codex? The options are an injected `CLAUDE_CODE_OAUTH_TOKEN`, copied credential files, or API keys.
  - The answer picks the 7.6 row. It matters only if N1 later passes.
- **What is app.agent-swarm.dev?** Stage 1 names it as the hosted dashboard. agent-swarm.dev does not mention it. The site does mention a public demo (demo.agent-swarm.dev), a pricing page and "Enterprise support is available by agreement".
  - A hosted dashboard would only be a client of the self-hosted swarm, whose core repo fails N1. So it cannot rescue the candidate.
  - If N1 ever passes, whether that dashboard handles transcripts or plan credentials would matter for A3 (7.6, third-party-hosted row) and 7.13.
