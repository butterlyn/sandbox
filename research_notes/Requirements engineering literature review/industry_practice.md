# Industry practice in requirements engineering: agile, scaled and product-management approaches, roles, tooling, and state-of-practice evidence

Notes compiled 23 Oct 2026. Every DOI below was checked against the Crossref API, with title and year matching, unless marked otherwise. Full texts were read for:
- NaPiRE (Méndez Fernández et al. 2017, via arXiv:1611.10288)
- Wagner et al. 2019 (TOSEM, via arXiv:1805.07951)
- Kuhrmann et al. 2022 (TSE, via arXiv:2109.11435)
- Wagner et al. 2017 (the agile NaPiRE paper, arXiv:1703.08360)
- Kasauli et al. 2021 (Chalmers repository copy)
- Lucassen et al. 2016 (author PDF)
- PMI 2014 (PMI PDF)
- Jørgensen & Moløkken-Østvold 2006 (Simula preprint)

For the other papers, only abstracts or publisher and repository pages were read. AI coding agents, LLM-driven development and "spec-driven development" are out of scope and are not discussed.

## 1. How do agile methods handle requirements, and what do empirical studies of agile RE find?

### Takeaway
Agile methods replace the up-front specification with a continuously refined, ordered backlog of small items, usually user stories. Each item is deliberately incomplete: a "card" that points to a conversation with a customer or Product Owner, confirmed by acceptance tests, ideally written as executable examples (BDD/Gherkin). Empirical work since Cao & Ramesh (2008) confirms the benefits: closer customer collaboration, responsiveness to change, less overhead. It also keeps finding the same weak spots: dependence on an available, competent customer representative; neglected non-functional requirements (NFRs); requirements knowledge that stays tacit or under-documented; weak user-story quality; and trouble at scale. Survey data suggest agile RE in practice is less different from "traditional" RE than the rhetoric implies.

### Cited Findings
**Foundational practitioner sources**
- The Agile Manifesto's principles include "Welcome changing requirements, even late in development", "Business people and developers must work together daily throughout the project", and that face-to-face conversation is "the most efficient and effective method of conveying information to and within a development team" — [Agile Manifesto principles (2001)](https://agilemanifesto.org/principles.html)
- XP's requirements loop: "the on-site customer, working with the programmers, uses the planning game to select user stories to make up the most valuable small releases". This is Jeffries describing XP as defined in Beck's *Extreme Programming Explained: Embrace Change*. The book was published 5 Oct 1999 by Addison-Wesley and later had a 2nd edition — [Jeffries 2001](https://ronjeffries.com/xprog/articles/expcardconversationconfirmation/); [Beck 1999, InformIT](https://www.informit.com/store/extreme-programming-explained-embrace-change-9780201616415)
- **Card, Conversation, Confirmation** (Jeffries, 30 Aug 2001):
  - The card "does not contain all the information that makes up the requirement… just enough text to identify the requirement"; it is "a token representing the requirement".
  - "The requirement itself is communicated from customer to programmers through conversation… largely verbal, but can be supplemented with documents. The best supplements are examples; the best examples are executable."
  - Confirmation "is the acceptance test".
  - Of spec-like documents he says: "I have almost never found this kind of document to be ideal."
  - [Jeffries 2001](https://ronjeffries.com/xprog/articles/expcardconversationconfirmation/)
- **INVEST** (Wake, 17 Aug 2003): good stories are Independent, Negotiable, Valuable, Estimable, Small, Testable. A story "is not an explicit contract for features" — [Wake 2003](https://xp123.com/invest-in-good-stories-and-smart-tasks/)
- Cohn's *User Stories Applied: For Agile Software Development* (Addison-Wesley, 1 Mar 2004) is the canonical practitioner book on user stories. I verified only the bibliographic data — [InformIT](https://www.informit.com/store/user-stories-applied-for-agile-software-development-9780321205681)
- **Scrum Guide 2020** (Schwaber & Sutherland), still the version served at scrumguides.org in Oct 2026:
  - "The Product Backlog is an emergent, ordered list of what is needed to improve the product."
  - "The Product Owner is accountable for maximizing the value of the product… The Product Owner is one person, not a committee… Those wanting to change the Product Backlog can do so by trying to convince the Product Owner."
  - "Product Backlog refinement is the act of breaking down and further defining Product Backlog items into smaller more precise items. This is an ongoing activity to add details, such as a description, order, and size." "The Developers who will be doing the work are responsible for the sizing."
  - Each artifact has a commitment: "For the Product Backlog it is the Product Goal. For the Sprint Backlog it is the Sprint Goal. For the Increment it is the Definition of Done."
  - The Product Goal "describes a future state of the product" and is "the long-term objective for the Scrum Team"; the team must "fulfill (or abandon) one objective before taking on the next".
  - "The Definition of Done is a formal description of the state of the Increment when it meets the quality measures required for the product."
  - [Scrum Guide 2020](https://scrumguides.org/scrum-guide.html)
- The 2020 revision introduced the Product Goal and the three commitments. It also deliberately removed "any remaining inference to IT work (e.g. testing, system, design, requirement, etc)", so the word "requirement" was dropped from Scrum's official vocabulary — [Scrum Guide revision history](https://scrumguides.org/revisions.html)
- **Current status:** a "Scrum Guide Expansion Pack" exists. It is a "companion to the 2020 Scrum Guide" created by Jeff Sutherland, John Coleman and Ralph Jocham (Ken Schwaber is not among them), covering product thinking, strategy, leadership and similar topics. It is a supplement, not a new Scrum Guide — [scrumexpansion.org](https://scrumexpansion.org/). A secondary source dates it to 11 June 2025 — [SensioLabs blog](https://sensiolabs.com/blog/2025/scrum-guide-expansion-pack-2025-key-insights-you-need-to-know)
- **Definition of Ready (DoR)** is not a Scrum artifact or commitment. The Guide only says that items "that can be Done by the Scrum Team within one Sprint are deemed ready for selection in a Sprint Planning event… after refining activities" — [Scrum Guide 2020](https://scrumguides.org/scrum-guide.html). The DoR comes from practitioner material: Sutherland's course material added "a READY state opposite the DONE state" so that "a team needs to be in a stable, known situation to be able to perform well" — [Beaumont 2009, guest post on Jeff Sutherland's blog](https://jeffsutherland.com/scrum/2009/07/ready-dynamic-model-of-scrum.html)
- **BDD** (North, dated 20 Sep 2006): "Requirements are behaviour, too"; "BDD provides a 'ubiquitous language' for analysis", borrowing from Evans' Domain-Driven Design; "Acceptance criteria should be executable", written as Given/When/Then scenarios — [North 2006](https://dannorth.net/blog/introducing-bdd/). Adzic's *Specification by Example* (Manning, June 2011) is the book-length treatment of example-driven specification — [Manning](https://www.manning.com/books/specification-by-example). Gherkin "uses a set of special keywords to give structure and meaning to executable specifications" (Feature/Scenario/Given/When/Then) — [Cucumber Gherkin reference](https://cucumber.io/docs/gherkin/reference/)

**Empirical studies of agile RE**
- **Cao & Ramesh (2008), IEEE Software:** data from 16 software development organisations "reveals seven agile RE practices, along with their benefits and challenges". The setting is fast-changing business environments where "prespecified requirements [are] inappropriate" — [Cao & Ramesh 2008](https://doi.org/10.1109/MS.2008.1)
- **Ramesh, Cao & Baskerville (2010), ISJ**, the extended version on 16 US organisations, reports six agile RE practices and seven challenges. Note the count differs from the 2008 article. Two risks "intractable by agile RE practices" were (1) "customer inability and a lack of concurrence among customers" and (2) "neglecting non-functional requirements such as security and scalability" — [Ramesh et al. 2010](https://doi.org/10.1111/j.1365-2575.2007.00259.x)
- **Inayat et al. (2015), SLR:** 21 papers (2002–June 2013). It found 17 agile RE practices, 5 challenges of traditional RE that agile RE overcame, and 8 challenges *posed by* agile RE. It calls for more empirical work, e.g. on non-functional requirements and self-organising teams — [Inayat et al. 2015](https://doi.org/10.1016/j.chb.2014.10.046)
- **Heikkilä et al. (2015), mapping study** (a conference paper with only 28 articles, so minor next to Inayat and Schön):
  - "the definition of agile RE is vague".
  - Benefits: lower process overhead, better requirements understanding, less over-allocation, responsiveness, rapid value delivery, better customer relationships.
  - Problem areas: "the use of customer representatives, the user story requirements format, the prioritization of requirements, growing technical debt, tacit requirements knowledge, and imprecise effort estimation".
  - [Heikkilä et al. 2015](https://doi.org/10.1109/SEAA.2015.70)
- **Schön, Thomaschewski & Escalona (2017), SLR:** 27 papers, focused on stakeholder and user involvement. Themes: stakeholder/user involvement, data gathering, user perspective, integrated methodologies (e.g. user-centred design), shared understanding, artefacts, documentation and NFRs. It notes that hybrid development models are applied — [Schön et al. 2017](https://doi.org/10.1016/j.csi.2016.08.011)
- **Lucassen et al. (2016), REFSQ: user stories in practice** (182 survey responses plus 21 follow-up interviews):
  - Methods (multi-select): Scrum 94%, Kanban 40%, waterfall 29%. 99% of Scrum users employ user stories.
  - Only 15% use no template. 59% use the Connextra template "As a ⟨role⟩, I want ⟨goal⟩, [so that ⟨benefit⟩]", and another 10% use it without the "so that" clause.
  - Quality guidelines: 33% use self-defined ones, 23.5% use INVEST, and 39.5% use none.
  - Most respondents agree that user stories improve productivity (61%) and quality (68%), and that templates do too (53% and 54%). They are ambivalent about quality guidelines: 51% and 45% neutral.
  - Respondent roles: product manager 29%, developer 21%, requirements engineer 18%.
  - [Lucassen et al. 2016a](https://doi.org/10.1007/978-3-319-30282-9_14)
- **Quality User Story (QUS) framework:** 13 quality criteria for user stories, plus the AQUSA tool, evaluated on 1,023 user stories from 18 companies. The authors observe that stories "are too often poorly written in practice" — [Lucassen et al. 2016b](https://doi.org/10.1007/s00766-016-0250-x)
- **NaPiRE agile subset** (92 organisations): "agile RE concentrates on free-text documentation of requirements elicited with a variety of techniques". "Often, traces between requirements and code are explicitly managed and also software testing and RE are aligned." Top problems were "unclear requirements and communication flaws". Overall, "agile RE is in several aspects not so different from RE in other development processes" — [Wagner et al. 2017, arXiv](https://arxiv.org/abs/1703.08360)
- **NFRs in practice:** a classification of 530 NFRs from 11 industrial specifications found that "most 'non-functional' requirements are not non-functional as they describe behavior of a system" — [Eckhardt, Vogelsang & Méndez Fernández 2016](https://doi.org/10.1145/2884781.2884788)

### Inferences
- In agile practice the "requirement" is a token plus a conversation plus a test. For someone who wants to specify well, the transferable craft is writing precise, example-based acceptance criteria (Given/When/Then), keeping stories small and valuable (INVEST/QUS), and recording decisions that would otherwise stay tacit. Prose specifications matter less.
- Agile RE's recurring failure modes are structural, not accidental: they appear in 2008, 2010, 2015 and 2021 studies alike. They are a weak or unavailable customer proxy, NFRs falling between stories, tacit knowledge, and story-format limits. A specifier in an agile team adds most value exactly there: cross-cutting quality requirements, system-level context, and documenting behaviour for later maintainers.
- The evidence base is weak to moderate. Most of it is qualitative case studies, reviews of small primary-study sets (21–28 papers), and self-reported surveys. Lucassen's sample was recruited among people who use user stories, so the near-universal Scrum–story coupling is partly a selection effect.

### Gaps
- I could not open Cao & Ramesh (2008) full text, so the names of the seven practices are not verified here.
- I retrieved no empirical adoption or effectiveness data for BDD/Gherkin.
- DoR evidence is practitioner claims only. I found no empirical study of its effect.
- The release date of the Scrum Guide Expansion Pack comes from a secondary source.

## 2. Scaled and hybrid approaches: how are requirements structured at scale, and how common are hybrid processes?

### Takeaway
SAFe formalises a layered requirements model: epics → capabilities → features → stories, plus enablers. NFRs act as constraints across backlogs, and work is sequenced by WSJF (relative cost of delay ÷ relative job duration). This model descends from Leffingwell's *Agile Software Requirements* (2010). LeSS keeps a flatter structure (requirement areas, at most three levels of splitting). Survey evidence (HELENA) shows that "pure" agile or traditional processes are rare (about 15%) and that roughly three-quarters of practitioners run hybrid methods. Case studies of large systems companies show the scaling frameworks leave many RE challenges open, above all system-level requirements knowledge and linking customer value to team backlogs.

### Cited Findings
- **SAFe requirements constructs** (the official knowledge base still presents "SAFe 6.0 Big Picture configurations" as of Oct 2026) — [SAFe framework home](https://framework.scaledagile.com/):
  - **Epic:** "a significant solution development initiative". Epics "require defining a minimum viable product (MVP) and must be approved by Portfolio Leadership", and each needs "an MVP, a Lean business case, and an estimate". They are managed through a Portfolio Kanban and explicitly use the Lean Startup cycle — [SAFe: Epic](https://framework.scaledagile.com/epic/)
  - **Feature:** "solution functionality that delivers business value, fulfills a stakeholder need, and is sized to be delivered by an Agile Release Train within a PI". **Capability:** "large solution functionality whose implementation often spans multiple ARTs" — [SAFe: Features and Capabilities](https://framework.scaledagile.com/features-and-capabilities/)
  - **Story:** "short descriptions of a small piece of desired functionality written from the user's perspective", finishable "in a few days or less". "User stories outline the value to the end user. Enabler stories outline the necessary work of exploration, architecture, infrastructure, and compliance" — [SAFe: Story](https://framework.scaledagile.com/story/)
  - **Enablers** fall into four categories (exploration, architecture, infrastructure, compliance) and "must be visible and treated like other backlog items" — [SAFe: Enablers](https://framework.scaledagile.com/enablers/)
  - **NFRs** "are system qualities that guide the design of the solution and often serve as constraints across the relevant backlogs". They are "typically revisited as part of the definition of done (DoD) for each Iteration, PI, or release" — [SAFe: Nonfunctional Requirements](https://framework.scaledagile.com/nonfunctional-requirements/)
  - **WSJF** "is estimated as the relative cost of delay divided by the relative job duration". Cost of delay is built from "relative user and business value, time criticality, risk reduction and/or opportunity enablement". It cites Reinertsen's flow principles. The full article is now behind a login — [SAFe: WSJF](https://framework.scaledagile.com/wsjf/)
  - **Current status:** in June 2026 Scaled Agile "officially introduced AI-Native SAFe, a reinvented operating model", which it is releasing iteratively (not examined here; out of scope). The epic, feature, story, enabler and NFR pages above were last updated January–March 2025 — [What's new in SAFe](https://framework.scaledagile.com/whats-new-in-safe)
- **Origin:** Leffingwell, *Agile Software Requirements: Lean Requirements Practices for Teams, Programs, and the Enterprise* (Addison-Wesley, published 27 Dec 2010) — [InformIT](https://www.informit.com/store/agile-software-requirements-lean-requirements-practices-9780321635846). Kasauli et al. describe SAFe's hierarchy of "four levels, from epics to capabilities to features to user stories" and its "requirements information model", citing Knaster & Leffingwell (2017) and Leffingwell (2010) — [Kasauli et al. 2021](https://doi.org/10.1016/j.jss.2020.110851)
- **LeSS** (Larman & Vodde) organises work into "requirement areas", each with its own backlog and feature teams, and advises "splitting requirements only to three levels" (as summarised by Kasauli et al.) — [Kasauli et al. 2021](https://doi.org/10.1016/j.jss.2020.110851); [LeSS framework](https://less.works/less/framework/index)
- **Kasauli et al. (2021), JSS**, on RE in large-scale agile systems development:
  - Method: seven large-scale systems companies, 20 interviews, 5 focus groups, 8 cross-company workshops.
  - 24 challenges in six themes: (1) shared understanding of customer value; (2) supporting change and evolution; (3) shared understanding about the system; (4) representation of requirements knowledge; (5) process aspects; (6) organisational aspects.
  - Challenges were mapped to SAFe and LeSS solutions.
  - Conclusions: "in all companies, there is a need for strong requirements engineering approaches, especially with respect to documenting a system's behavior for future feature requests or maintenance"; co-existing plan-driven and agile development "limits the potential development speed"; "many challenges remain open or have solutions without realistic evaluation".
  - [Kasauli et al. 2021](https://doi.org/10.1016/j.jss.2020.110851)
- **Ericsson case** (43 interviews): "informal communication and simple backlogs are not sufficient" in a large organisation.
  - Requirements flowed through three processes: plan-driven release project management, continuous feature development, and agile implementation.
  - Problems included "defining the product owner role", "organizing system-level work" and "growing technical debt".
  - Conclusion: agile can work "where the higher level planning processes are not agile".
  - [Heikkilä et al. 2017](https://doi.org/10.1007/s10664-016-9491-z)
- **Evidence strength for scaling:** an SLR of large-scale agile transformations (52 publications, 42 cases) found "Almost 90% of the included papers were experience reports" — [Dikert, Paasivaara & Lassenius 2016](https://doi.org/10.1016/j.jss.2016.06.013)
- **HELENA hybrid-process surveys:**
  - Stage 1 (69 participants): "most combinations follow a pattern in which a traditional process model serves as framework in which several fine-grained (agile) practices are plugged in". Hybrid approaches were "independent from the company size and external triggers" and are "the results of a natural process evolution… driven by experience, learning, and pragmatism" — [Kuhrmann et al. 2017, ICSSP](https://doi.org/10.1145/3084100.3084104)
  - European data: hybrid approaches were applied to specific projects "even when company-wide policies for process usage existed", "regardless of company size or industry sector" — [Kuhrmann et al. 2019, IEEE Software](https://doi.org/10.1109/MS.2018.110161245)
  - The survey "yielded 1,467 responses". In the 556 data points analysed, "only a small number of participants operate their projects in a purely traditional or agile manner (under 15 percent)". Precisely, 83 of 556 (14.93%) claim to implement all project disciplines consistently: agile, traditional, or balanced. The authors recall from earlier HELENA analyses that "approximately 75% of the participants use hybrid methods". They also found "the selection of practices has a stronger effect on the degree of agility" than the choice of method — [Kuhrmann et al. 2022, TSE](https://doi.org/10.1109/TSE.2021.3099532)
- **Process mix in NaPiRE:** of 196 organisations naming a process model, 92 were agile (Scrum/XP), 46 plan-driven (RUP, waterfall, V-Model XT) and 58 mixed, i.e. about 47% / 23% / 30% (my computation from their Table 7) — [Méndez Fernández et al. 2017](https://doi.org/10.1007/s10664-016-9451-7)

### Inferences
- In practice, requirements in large organisations flow through a hierarchy (portfolio/epic → feature/capability → story), usually inside a plan-driven release or portfolio envelope. A specifier should expect to write at several levels and to keep traceability between them, not just write stories.
- Scaled frameworks are prescriptive syntheses, not validated methods. The RE-specific evidence (Kasauli; Heikkilä 2017) is qualitative and says the hard problems, system-level knowledge and value alignment, remain open.
- Experts disagree on NFRs. SAFe treats them as backlog constraints checked in the Definition of Done. Eckhardt et al. show many so-called NFRs are behavioural and could be handled like functional requirements. Ramesh et al. list NFR neglect as a risk agile practices cannot remove.

### Gaps
- I found no independent, methodologically sound adoption figures for SAFe vs LeSS vs other frameworks. Vendor surveys (State of Agile, State of SAFe) were not used.
- The full SAFe articles are partly login-gated, so only public summaries were read.
- AI-Native SAFe was not examined (out of scope).

## 3. Product management and discovery: how do they carry RE in product companies, and how do they relate to classic RE?

### Takeaway
In software product companies, much of what classic RE calls elicitation, analysis and validation now happens as product "discovery". A cross-functional team frames a desired outcome: Torres calls it a "product trio", and Cagan splits it into product manager, designer and lead engineer. The team frames the outcome, map customer opportunities, and generate candidate solutions. They test the riskiest assumptions (value, usability, feasibility, business viability) with prototypes and experiments before anything enters the delivery backlog. Conceptually this re-labels and extends goal-oriented and market-driven RE (outcome ≈ goal; opportunity ≈ need or problem; assumption test ≈ validation through prototyping). It adds a strong emphasis on outcomes, experimentation and user data. It largely ignores specification quality, traceability and NFRs, and its evidence base is practitioner books rather than empirical studies.

### Cited Findings
- **Cagan, *Inspired*, 2nd ed.** (Wiley, December 2017) — [Wiley](https://www.wiley.com/en-us/INSPIRED%3A+How+to+Create+Tech+Products+Customers+Love%2C+2nd+Edition-p-9781119387503). The 2nd edition "explicitly call[s] out the four types of risk":
  - value risk: "whether customers will buy it or users will choose to use it";
  - usability risk;
  - feasibility risk: "whether our engineers can build what we need with the time, skills and technology we have";
  - business viability risk: "whether this solution also works for the various aspects of our business".
  
  Accountability is split: the product manager owns value and viability ("overall accountable for the product's outcomes"), the designer owns usability, and the lead engineer owns feasibility. Cagan argues "the toughest risk is usually value risk" — [SVPG, "The Four Big Risks"](https://www.svpg.com/four-big-risks/)
- **Torres, *Continuous Discovery Habits*** (Product Talk, announced 19 May 2021) — [Product Talk](https://www.producttalk.org/continuous-discovery-habits/). An opportunity solution tree has:
  - at the root, the "desired outcome—the business need that reflects how your team can create business value";
  - then the "opportunity space… customer needs, pain points, and desires";
  - then the "solution space";
  - then "assumption tests".
  
  It is meant to help "product trios" "resolve the tension between business needs and customer need[s]". Teams "test the riskiest assumptions" of several ideas in parallel — [Torres 2023, "Opportunity Solution Trees"](https://www.producttalk.org/opportunity-solution-trees/)
- **Lean Startup:** the "build-measure-learn feedback loop" starts by identifying the problem and building "a minimum viable product (MVP) to begin the process of learning as quickly as possible". "The unit of progress for Lean Startups is validated learning". A pivot is a "structural course correction to test a new fundamental hypothesis about the product, strategy and engine of growth" — [The Lean Startup principles](https://theleanstartup.com/principles); book: [Ries, *The Lean Startup*](https://theleanstartup.com/book). SAFe imports this cycle for epics (MVP plus Lean business case) — [SAFe: Epic](https://framework.scaledagile.com/epic/)
- **Impact Mapping** (Adzic; Provoking Thoughts, 1 Oct 2012) — [impactmapping.org/book](https://www.impactmapping.org/book.html). It is "a lightweight, collaborative planning technique… based on user interaction design, outcome driven planning and mind mapping" — [impactmapping.org](https://www.impactmapping.org/). The map is a tree:
  - Goal ("Why are we doing this?");
  - Actors ("Who can produce the desired effect? Who can obstruct it?");
  - Impacts ("How should our actors' behaviour change?");
  - Deliverables ("What can we do… ?", the scope).
  
  [Drawing impact maps](https://www.impactmapping.org/drawing.html)
- **Jobs-to-be-Done:** Christensen, Hall, Dillon & Duncan, "Know Your Customers' 'Jobs to Be Done'", *Harvard Business Review*, September 2016. The pitch: innovation need not be "hit-or-miss… if you understand why customers make the choices they do" — [HBR 2016](https://hbr.org/2016/09/know-your-customers-jobs-to-be-done)
- **Outcomes over output:** Joshua Seiden is the author of *Outcomes Over Output* and co-author of *Lean UX* and *Sense & Respond* — [joshuaseiden.com](https://www.joshuaseiden.com/). Content not verified; see Gaps.
- **Design thinking and RE:** Hehn et al. propose "three approaches for tailoring and integrating design thinking and requirements engineering with complementary synergies" and note open challenges — [Hehn et al. 2020](https://doi.org/10.1109/MS.2019.2957715)
- **Data-driven RE:** explicit feedback (app stores, social media) and implicit feedback (usage data, logs) suggest "a shift toward data-driven user-centered identification, prioritization, and management of software requirements" — [Maalej, Nayebi, Johann & Ruhe 2016](https://doi.org/10.1109/MS.2015.153). On continuous experimentation as an engineering practice, see the RIGHT model — [Fagerholm et al. 2017](https://doi.org/10.1016/j.jss.2016.03.034)
- **Classic RE's own product-company tradition**, market-driven RE (MDRE): interviews with 14 employees at 8 companies plus a focus group found these challenges: "bridging communication gaps between marketing and development, selecting the right level of process support, basing the release plan on uncertain estimates, and managing the constant flow of requirements" — [Karlsson et al. 2007](https://doi.org/10.1016/j.infsof.2007.02.008)
- **The problem/solution boundary is contested.** Ralph argues that for many problems "more specific desiderata are contingent on the chosen solution", so "analysts may misrepresent design decisions as requirements, creating an illusion of requirements" — [Ralph 2013](https://doi.org/10.1007/s00766-012-0161-4). In NaPiRE, 25% of organisations ranked "stakeholders with difficulties in separating requirements from known solution designs" among their top-5 RE problems — [Méndez Fernández et al. 2017](https://doi.org/10.1007/s10664-016-9451-7)

### Inferences
- Mapping product practice onto classic RE:
  - outcome / goal / Product Goal ↔ goal models (GORE);
  - opportunity ↔ stakeholder need or problem;
  - assumption test / MVP ↔ requirements validation by prototyping;
  - impact map ↔ a lightweight goal tree (why → who → how → what);
  - discovery ↔ elicitation plus analysis;
  - backlog ↔ requirements repository.
  
  The main difference is epistemic. Discovery treats requirements as hypotheses to be falsified cheaply. Classic RE treats them as commitments to be specified and verified.
- Experts disagree on whether requirements can be separated from design. Classic RE says "what, not how". Discovery practitioners and Ralph deliberately co-explore problem and solution. For a specifier, the practical consequence is to keep the outcome or goal explicit, and to label solution-level statements as decisions rather than requirements.
- Discovery frameworks say little about NFRs, regulatory constraints, traceability or long-lived documentation. Those remain classic RE territory, especially in regulated and system contexts (Section 2).

### Gaps
- Seiden's definition of an outcome is commonly summarised as a change in customer or human behaviour that drives business results. I saw this only in secondary summaries, not in the book or on a publisher page; the publisher site (Sense & Respond Press) was unreachable.
- The Lean Startup's publication year (2011, Crown Business) is not stated on the official page I opened.
- *Inspired*'s content beyond the SVPG article was not checked.
- I found no empirical studies evaluating opportunity solution trees, impact mapping or JTBD as RE techniques. The evidence is practitioner books.
- Dual-track agile (discovery and delivery tracks), often traced to Sy (2007), was not verified.

## 4. Roles: business analyst vs product owner vs product manager vs systems engineer — who does RE where?

### Takeaway
RE is a function spread across roles, not one job title:
- **Business analysts** (IIBA's BABOK) work mainly in enterprise IT and project organisations.
- The **Product Owner** (Scrum: one person accountable for value and for the Product Backlog) and the **product manager** (accountable for value and viability risks) do RE in product companies.
- **Systems or requirements engineers** do it in large systems and regulated or safety-critical development, where standards such as ISO/IEC/IEEE 29148 and traceability dominate.

Surveys show user stories are written by product managers, developers and requirements engineers alike. Large organisations struggle to define the PO role and add specialist roles. Practitioners blame RE problems partly on the limited experience and qualification of the people doing RE.

### Cited Findings
- **Product Owner (Scrum):** "accountable for maximizing the value of the product"; "one person, not a committee"; may represent "the needs of many stakeholders in the Product Backlog" — [Scrum Guide 2020](https://scrumguides.org/scrum-guide.html)
- **Product manager (SVPG model):** responsible for value and viability risk and "overall accountable for the product's outcomes"; the designer owns usability, the lead engineer feasibility — [SVPG](https://www.svpg.com/four-big-risks/)
- **Business analyst (IIBA):** business analysis is "the practice of enabling change in the context of an enterprise by defining needs and recommending solutions that deliver value to stakeholders". The BABOK Guide "is the standard for the practice of business analysis". IIBA also publishes a free "Business Analysis Standard" representing "the fundamental practices of business analysis" — [IIBA BABOK page](https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/)
- **Current status:** BABOK Guide v3 was released in April 2015 (an IIBA post dated 15 Apr 2016 marks "one year" since its release) — [IIBA, "BABOK Guide v3 Celebrates 1 Year Anniversary"](https://www.iiba.org/professional-development/knowledge-centre/ba-connection/babok-guide-v3-celebrates-1-year-anniversary/). The IIBA BABOK page still lists v3 errata in Oct 2026, and I found no BABOK v4 — [IIBA BABOK page](https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/)
- **PMI 2014:**
  - PMI uses "requirements management" broadly, "representing all of the roles that perform business analysis and requirements management tasks".
  - 53% of organisations report increased demand for business analysts.
  - Only 46% report good collaboration between project managers and business analysts, while 68% say that collaboration is essential.
  - [PMI 2014](https://www.pmi.org/-/media/pmi/documents/public/pdf/learning/thought-leadership/pulse/requirements-management.pdf)
- **Who writes user stories:** of 182 respondents, 29% were product managers, 21% developers and 18% requirements engineers. 51% worked in software product companies, 20% in consultancies and 19% in custom software — [Lucassen et al. 2016a](https://doi.org/10.1007/978-3-319-30282-9_14)
- **Large organisations:** problems include "defining the product owner role" and "balancing team specialization"; "large-scale software development seems to require specialist roles and significant coordination effort" — [Heikkilä et al. 2017](https://doi.org/10.1007/s10664-016-9491-z). Bass studied "product owner teams" in large distributed enterprises — [Bass 2015](https://doi.org/10.1007/s10664-014-9322-z) (only the title and bibliographic data were verified)
- **Systems engineering and regulated contexts:**
  - Large systems companies need "strong requirements engineering approaches", especially for documenting system behaviour — [Kasauli et al. 2021](https://doi.org/10.1016/j.jss.2020.110851)
  - The governing RE process standard is ISO/IEC/IEEE 29148:2018, *Systems and software engineering — Life cycle processes — Requirements engineering* — [IEEE/ISO 29148:2018](https://doi.org/10.1109/IEEESTD.2018.8559686)
  - Systems engineers' practice is codified in the INCOSE *Systems Engineering Handbook*, 5th edition (Wiley) — [Wiley](https://www.wiley.com/en-us/INCOSE+Systems+Engineering+Handbook%2C+5th+Edition-p-9781119814290)
- **Startups:** "requirements-related roles" are one of six dimensions along which startup requirements practice evolves — [Gralha et al. 2018](https://doi.org/10.1145/3180155.3180158). RE practice is shaped by "Founders, Software Development Manager, Developers, Market, Business Model and Startup Ecosystem" — [Melegati et al. 2019](https://doi.org/10.1016/j.infsof.2019.02.001)
- **People as a cause of RE problems (NaPiRE):** the most cited causes include "Lack of experience of RE team members" (18%) and "Weak qualification of RE team members" (14%) — [Méndez Fernández et al. 2017](https://doi.org/10.1007/s10664-016-9451-7)

### Inferences
- A rough sector map, which is my synthesis and is not quantified by any source I found:
  - enterprise IT and outsourced projects: business analyst (BABOK) working with a PM or PO;
  - software product companies: product manager or PO plus a designer and tech lead (discovery), with stories written by mixed roles;
  - regulated or safety-critical systems (automotive, telecom, medical, aerospace): systems or requirements engineers using ISO 29148-style specifications and RM tools, with agile teams underneath.
- The role labels overlap heavily. What matters for a specifier is being explicitly accountable for (a) the problem and outcome, (b) the requirement content and its acceptance criteria, and (c) traceability where regulation demands it.

### Gaps
- I found no rigorous quantitative survey comparing who performs RE across sectors.
- The content of Bass (2015), e.g. the specific PO functions, could not be verified (full text blocked).
- The contents of the INCOSE Handbook and ISO 29148 were not examined; other researchers cover standards.

## 5. Tooling: RM suites, issue trackers, docs-as-code and executable specifications

### Takeaway
Three tool families coexist:
1. Requirements-management/ALM suites (IBM DOORS Next, Jama Connect, Siemens Polarion, PTC Codebeamer), positioned for traceability and compliance in complex or regulated systems.
2. General issue trackers (Jira, Azure Boards), which in practice hold most agile backlogs of epics and stories.
3. Text-based "requirements-as-code" tools kept in version control (Doorstop, StrictDoc, Sphinx-Needs, OpenFastTrace), alongside executable specifications in Gherkin/Cucumber.

Despite this tooling, empirical studies show practitioners mostly specify in natural language with general-purpose tools (e.g. MS Office).

### Cited Findings
- **IBM Engineering Requirements Management DOORS Next:** "a scalable, web-based solution designed to optimize communication and collaboration among teams and stakeholders", used to "manage changes to requirements while maintaining compliance with regulations and standards" — [IBM](https://www.ibm.com/products/requirements-management)
- **Jama Connect** is marketed with requirements management, requirements traceability and MBSE solutions — [Jama Software](https://www.jamasoftware.com/platform/jama-connect/)
- **Siemens Polarion REQUIREMENTS:** "Effectively gather, author, approve and manage requirements for complex systems across entire project lifecycles" — [Siemens](https://www.siemens.com/en-us/products/polarion/requirements/)
- **PTC Codebeamer:** "an ALM platform for advanced product and software development at scale" — [PTC](https://www.ptc.com/en/products/codebeamer)
- **Issue trackers:** Atlassian Jira — [Atlassian](https://www.atlassian.com/software/jira); Microsoft Azure Boards: "Plan, track, and discuss work across your teams" — [Microsoft](https://azure.microsoft.com/en-us/products/devops/boards). Existence only; no market claims.
- **Doorstop:** text-based requirements management using version control — [Browning & Adams 2014](https://doi.org/10.4236/jsea.2014.73020)
- **StrictDoc** documents its own requirements in its own format, as L1 system, L2 high-level and L3 low-level requirements in `.sdoc` files — [StrictDoc docs](https://strictdoc.readthedocs.io/en/stable/)
- **Sphinx-Needs** (v9.1.0 docs): "Bringing X-as-Code engineering to the Sphinx framework", with guidance on use "Across the V-model" — [Sphinx-Needs docs](https://sphinx-needs.readthedocs.io/en/latest/)
- **OpenFastTrace:** "a requirement management and tracing suite"; its README refers to version 4.10.0 — [GitHub: itsallcode/openfasttrace](https://github.com/itsallcode/openfasttrace). The brief's "OpenFastTrack" is a misnomer; the project is OpenFastTrace.
- **Gherkin/Cucumber:** keywords give "structure and meaning to executable specifications" — [Cucumber](https://cucumber.io/docs/gherkin/reference/)
- **What practitioners actually use:**
  - 24 practitioners at 12 Swedish IT companies: "Natural language constitutes the main specification artefact but is usually accompanied by some other type of instrument". "Most requirements specifications use templates or guidelines, although they seldom follow any fixed standard". "Different types of tools, including MS Office tools, are used". "Practitioners still mainly rely on plain natural language and general-purpose tool support" — [Franch et al. 2023](https://doi.org/10.1007/s00766-023-00399-7)
  - Across 228 organisations, "requirements are often documented textually" and "traces between requirements and code or design documents are common" — [Wagner et al. 2019](https://doi.org/10.1145/3306607)

### Inferences
- Tool choice follows context:
  - regulated or system contexts that need audited bidirectional traceability → RM/ALM suites, or docs-as-code tools with trace checking (StrictDoc, Sphinx-Needs and OpenFastTrace all target this niche);
  - product/SaaS teams → issue tracker plus wiki;
  - behaviour that should stay verifiable → Gherkin.
- The tool rarely fixes the core problems (Section 6); natural-language quality and shared understanding do.

### Gaps
- I deliberately used no market-share data (vendor claims).
- I found no independent empirical comparison of RM tools or of docs-as-code vs RM suites.
- The Doorstop and Sphinx-Needs GitHub repositories could not be opened (access blocked); documentation sites or papers were used instead.
- OpenFastTrace's supported input formats were not verified.

## 6. State-of-practice evidence: what do large surveys and empirical studies show, with numbers, and what are the main problems and causes?

### Takeaway
The strongest evidence is the NaPiRE family of surveys (2014/15 run: 228 organisations in 10 countries). Practice is dominated by interviews, facilitated meetings and prototyping for elicitation, and by textual documentation.

The most frequent problems are:
- incomplete and/or hidden requirements (48%);
- communication flaws between the team and the customer (41%);
- moving targets (33%);
- underspecified requirements (33%);
- time boxing (32%).

The most cited causes are a lack of time and a lack of experience or qualification among the people doing RE. Older industry figures (PMI 2014; Standish CHAOS) are widely quoted, but they are self-reported or methodologically opaque. CHAOS's famous numbers have been seriously criticised.

### Cited Findings
**NaPiRE (Naming the Pain in Requirements Engineering)**
- **Design:** a "globally distributed, bi-yearly replicated family of surveys". The first run was in Germany and the Netherlands in 2012/13; the second "was performed in 10 countries in 2014/15". 354 organisations started and 228 completed. Respondents ranked their top 5 from 21 literature-derived problems — [Méndez Fernández et al. 2017](https://doi.org/10.1007/s10664-016-9451-7)
- **Top 10 problems**, as number of organisations (% of 228), with how many saw each as a cause of project failure:

  | Problem | Organisations | Cause of failure |
  |---|---|---|
  | Incomplete and/or hidden requirements | 109 (48%) | 43 |
  | Communication flaws between project team and customer | 93 (41%) | 45 |
  | Moving targets (changing goals, business processes and/or requirements) | 76 (33%) | 39 |
  | Underspecified requirements that are too abstract | 76 (33%) | 28 |
  | Time boxing / not enough time in general | 72 (32%) | 24 |
  | Communication flaws within the project team | 62 (27%) | 25 |
  | Stakeholders with difficulties separating requirements from known solution designs | 56 (25%) | 10 |
  | Insufficient support by customer | 45 (20%) | 24 |
  | Inconsistent requirements | 44 (19%) | 15 |
  | Weak access to customer needs and/or business information | 42 (18%) | 16 |

  The only problem "consistently in the top 3" across process-model and size clusters is incomplete/hidden requirements. Moving targets "lead more often to project failures than Underspecified requirements… even if they show the same total frequency" — [Méndez Fernández et al. 2017](https://doi.org/10.1007/s10664-016-9451-7)
- **Top causes** (free text from 177 organisations; 820 answers coded into 92 cause codes and 49 effect codes):

  | Cause | Organisations (% of 228) |
  |---|---|
  | Lack of time | 42 (18%) |
  | Lack of experience of RE team members | 41 (18%) |
  | Weak qualification of RE team members | 31 (14%) |
  | Communication flaws between team and customer | 30 (13%) |
  | Requirements remain too abstract | 29 (13%) |
  | Changing business needs | 21 (9%) |
  | Customer does not know what he wants | 20 (9%) |
  | Missing direct communication to customer | 18 (8%) |
  | Language barriers | 17 (7%) |
  | Strict time schedule by customer | 16 (7%) |

  "None of the causes was cited by more than 20% of the organisations", and some causes are themselves problems (cycles) — [Méndez Fernández et al. 2017](https://doi.org/10.1007/s10664-016-9451-7)
- **Effects** — [Méndez Fernández et al. 2017](https://doi.org/10.1007/s10664-016-9451-7):
  - For incomplete/hidden requirements: time overrun (~10%), post-implementation rework (~9%) and poor product quality (~9%).
  - For communication flaws with the customer: customer dissatisfaction (~16%), time overrun (~13%) and poor product quality (~10%).
- **Status-quo theory** (TOSEM; same 228 organisations, propositions tested with bootstrapped confidence intervals) — [Wagner et al. 2019](https://doi.org/10.1145/3306607):
  - Elicitation: interviews P = 0.73 [0.67, 0.79], facilitated meetings 0.67, prototyping 0.58, scenarios 0.41, observation 0.29.
  - Documentation: requirements are mostly free-form text or text "with some constraints". Domain and process models are mostly documented as free-form text (38%), and goal models as free-form text (26%); semi-formal or formal goal models are "niche".
  - NFRs: 54% use quantified textual documentation and 38% do not quantify NFRs.
  - Change and alignment: "Less then 20 % change the specification itself regularly. Most respondents update their backlog or only work with change requests." Traces between requirements and code or design are common. To align with tests, many define acceptance criteria and involve testers in reviews; "Only 18% derive tests from system models".
  - Standards and improvement: "Almost all respondents have an RE company standard". No strong differences between countries. RE improvement is "mostly internally driven".
- **Kassab, Neill & Laplante (2014):** "An exploratory survey of more than 3,000 software professionals was conducted and nearly 250 responses were obtained" — [Kassab et al. 2014](https://doi.org/10.1007/s11334-014-0232-4); abstract via [Penn State record](https://pure.psu.edu/en/publications/state-of-practice-in-requirements-engineering-contemporary-data/). As summarised by Wagner et al., "Brainstorming, interviews and user stories were techniques most mentioned… while workshops were only mentioned by roughly 20%" — [Wagner et al. 2019](https://doi.org/10.1145/3306607)
- **Current status:** Kassab & Laplante (2022) analyse four survey waves (2003, 2008, 2013, 2020) and compare RE practice in agile and waterfall projects. This supersedes the 2014 snapshot; I read only the abstract — [Kassab & Laplante 2022](https://doi.org/10.1109/MS.2022.3147692)
- **Franch et al. (2023), specification practice** (24 practitioners, 12 Swedish companies): natural language plus other instruments; templates common but no fixed standard; specifications structured by functionality, project areas or system parts; mixed tools including MS Office. The most frequent challenges are those of natural language: "dealing with ambiguity, inconsistency, and incompleteness". There is low adoption of academic notations and tools — [Franch et al. 2023](https://doi.org/10.1007/s00766-023-00399-7)
- **Franch et al. (TSE; online 2020, in print 2022), relevance of RE research:**
  - 153 practitioners gave 2,164 ratings of 435 papers from five top RE-related conferences.
  - Practitioners "rated RE research as essential or worthwhile in a majority of cases", but "the percentage of non-positive ratings is still higher than we would like".
  - Perceived relevance depends on links to industry, research method and the respondent's role.
  - Suggested topics included long-studied ones such as elicitation and requirement quality criteria.
  - [Franch et al. 2022](https://doi.org/10.1109/TSE.2020.3042747)
- **PMI Pulse of the Profession, Requirements Management (Aug 2014)** — [PMI 2014](https://www.pmi.org/-/media/pmi/documents/public/pdf/learning/thought-leadership/pulse/requirements-management.pdf):
  - Sample: 2,066 project/program managers and business analysts, May 2014.
  - When projects miss their goals, "inaccurate requirements management is the primary cause… almost half of the time (47 percent)".
  - "For every dollar spent on projects and programs, 5.1 percent is wasted due to poor requirements management" (US$51M per US$1B).
  - Low performers lose "nearly 10 cents for every dollar"; high performers see 11% of projects failing primarily from poor requirements management and about 1% waste.
  - Only 49% say they have adequate resources (13% completely, 36% mostly); 24% do well at developing RM skills; only 46% use a formal process for unbiased requirements validation.
  - The 2014 annual Pulse found "inaccurate requirements gathering" to be a primary cause of failure for 37% (up from 32% in 2013).
  - It also cites, second-hand, an IAG Consulting 2009 benchmark: 74% of companies had low requirements-management maturity.
- **Standish CHAOS (1994) and its critiques:**
  - The 1994 report "showed a shocking 16 percent project success". Eveleens & Verhoef identify four problems with Standish's definitions: they are based solely on estimation accuracy of cost, time and functionality; the accuracy measure is one-sided; steering on them "perverts good estimation practice"; and averaging numbers with unknown bias makes the figures "meaningless". Applied to 5,457 forecasts of 1,211 real projects, "the Standish figures didn't reflect the reality" — [Eveleens & Verhoef 2010](https://doi.org/10.1109/MS.2009.154)
  - The 1994 report's "189% average cost overrun of so-called challenged projects" contrasts with about 33–34% in three earlier surveys (1984–1992). Later CHAOS surveys reported 142%, 69%, 45% and 43% (1996–2002). The authors suggest the selection of projects may have been failure-story-biased, and note that Standish "provides an incomplete description of how they conducted their studies" — [Jørgensen & Moløkken-Østvold 2006](https://doi.org/10.1016/j.infsof.2005.07.002) (full text via [Simula preprint](https://web-backend.simula.no/sites/default/files/publications/Jorgensen.2006.4.pdf))
  - Glass's CACM column "The Standish report" is described as "reconsidering the relevancy of a frequently cited report on software project failures" — [Glass 2006](https://doi.org/10.1145/1145287.1145301)
- **Older classics on causes:**
  - Twelve companies: "most requirements problems are organisational rather than technical" — [Hall, Beecham & Rainer 2002](https://doi.org/10.1049/ip-sen:20020694)
  - Communication gaps in a large market-driven company are driven by "scale, temporal aspects, common views and decision structures", and lead to missed customer expectations, quality issues and wasted effort — [Bjarnason, Wnuk & Regnell 2011](https://doi.org/10.1109/RE.2011.6051639)
  - A 30-month case study found that an effective early requirements process improved "project negotiation, project planning, and managing feature creep, testing, defects, rework, and product quality" — [Damian & Chisan 2006](https://doi.org/10.1109/TSE.2006.61)

### Inferences
- The problem ranking is stable across sources and decades:
  - missing or hidden requirements and poor communication with the customer (NaPiRE; Bjarnason 2011; Hall 2002);
  - volatility (moving targets; Karlsson's "constant flow");
  - natural-language defects (Franch 2023).
  
  Causes are mostly human and organisational (time, experience, access to customers), not notational. For a specifier, the highest-leverage habits are direct and continuous access to real users and customers, explicit completeness checks (e.g. checklists, examples, scenarios), and making assumptions and open questions visible.
- Evidence quality ladder:
  - NaPiRE/TOSEM: large, multi-country and theory-driven, but self-reported by one representative per organisation and convenience-sampled;
  - Franch 2023 and Kasauli 2021: rich qualitative evidence with small samples;
  - PMI 2014: a large self-report survey by a professional association, where "requirements management" is defined broadly and dollar waste is a respondent estimate;
  - Standish CHAOS: methodologically opaque, and its headline numbers are disputed.
  
  The notes recommend quoting CHAOS only with its critiques.

### Gaps
- The napire.org site rendered only a JavaScript shell, so I could not confirm whether NaPiRE runs after 2014/15 published results.
- Kassab & Laplante (2022) and Kassab et al. (2014) were read only as abstracts, so their detailed percentages are not reported here.
- The 1994 CHAOS report's requirement-related factor percentages (e.g. for "incomplete requirements" and "user involvement") are widely quoted, but I found no accessible primary copy, so they are omitted.
- Newer CHAOS editions are paywalled.

## 7. Requirements in startups and open source

### Takeaway
Startups and open-source projects show RE without a classic specification phase. Startups build custom, evolving practice sets driven by founders and the market, often without an accessible customer, and adopt more structure only reactively as they grow. Even so, most of their engineering challenges trace back to RE. Open-source projects manage requirements through "informalisms" (mailing lists, issue trackers, to-do lists and the like) and "just-in-time" elaboration of feature requests close to implementation.

### Cited Findings
- **RE model for startups** (grounded theory, 17 interviews): startups "do not follow a single set of practices but, instead, build a custom process, changed throughout the development of the company". Influences are "Founders, Software Development Manager, Developers, Market, Business Model and Startup Ecosystem". RE "is similar to those in agile teams, but some steps vary as a consequence of the lack of an accessible customer" — [Melegati et al. 2019](https://doi.org/10.1016/j.infsof.2019.02.001)
- **Evolution of requirements practice in 16 startups** (grounded theory): six dimensions (requirements artefacts, knowledge management, requirements-related roles, planning, technical debt, product quality). Changes are "reactive, rather than planned", showing "pragmatic lightness" — [Gralha et al. 2018](https://doi.org/10.1145/3180155.3180158)
- **88 startup experience reports:** requirements engineering is among the most frequently reported knowledge areas. "Most engineering challenges in start-ups stem from inadequacies in requirements engineering" — [Klotins, Unterkalmsteiner & Gorschek 2019](https://doi.org/10.1007/s10664-018-9620-y). The brief's "Klotins et al. EMSE 2019" is correctly identified; it was published online in 2018, in volume 24(1) in 2019.
- **Open source** (four communities studied): "Eight kinds of software informalisms are found to play a critical role in the elicitation, analysis, specification, validation and management of requirements", which motivates a "reformulation of the requirements engineering process" — [Scacchi 2002](https://doi.org/10.1049/ip-sen:20020202)
- **Just-in-time requirements in 3 open-source projects:** "requirements are captured less formally, and only fully elaborated once the implementation begins". The authors propose a taxonomy "from fully formal to just-in-time" — [Ernst & Murphy 2012](https://doi.org/10.1109/EmpiRE.2012.6347678). The DOI 10.1109/EmpiRE.2012.6347683 belongs to a different paper (LASR) and must not be used.

### Inferences
- Startups and open source are natural experiments showing that a lightweight RE practice works only while the team is small, close to users or self-serving (open-source developers are often their own users). Once scale, distribution or external customers grow, the classic concerns return: documented knowledge, roles and planning (Gralha; Klotins).

### Gaps
- I did not retrieve recent (2020s) quantitative studies of RE practice in open-source issue trackers or in startups.
- Klotins et al.'s 2021 TSE progression model (DOI 10.1109/TSE.2019.2900213, verified) was not read beyond its title.

## 8. Synthesis: the most important works, consensus, disagreements and open issues

### Takeaway
Industry RE today is mostly agile or hybrid, backlog-centred and natural-language based:
- requirements live as epics and stories in issue trackers, refined continuously;
- they are confirmed by acceptance criteria, increasingly written as examples;
- in product companies they are framed by discovery practices;
- in regulated or large systems contexts they are wrapped in plan-driven, traceable specifications.

The best empirical evidence (NaPiRE, HELENA, Kasauli, Franch) agrees that the dominant problems are incomplete or hidden requirements, communication with customers, volatility and natural-language ambiguity. Their causes are human and organisational. No method or framework has yet been shown empirically to solve them.

### Cited Findings
**The 10–15 most important works for this subtopic, with why they matter**
1. **Méndez Fernández et al. (2017), "Naming the pain in requirements engineering: Contemporary problems, causes, and effects in practice"**, EMSE 22(5):2298–2338. The best quantified evidence on RE problems, causes and effects (228 organisations, 10 countries) — [doi](https://doi.org/10.1007/s10664-016-9451-7)
2. **Wagner et al. (2019), "Status quo in requirements engineering: A theory and a global family of surveys"**, ACM TOSEM 28(2):1–48. A testable theory of RE practice: elicitation, documentation, change, traceability, standards — [doi](https://doi.org/10.1145/3306607)
3. **Schwaber & Sutherland (2020), *The Scrum Guide*.** Defines the backlog, Product Goal, PO accountability, refinement and Definition of Done that most teams use as their requirements process; it has deliberately dropped the word "requirement" — [scrumguides.org](https://scrumguides.org/scrum-guide.html)
4. **Jeffries (2001), "Essential XP: Card, Conversation, Confirmation"** (with Beck 1999, XP). The canonical statement of what a user story is: a token plus conversation plus acceptance tests — [ronjeffries.com](https://ronjeffries.com/xprog/articles/expcardconversationconfirmation/)
5. **North (2006), "Introducing BDD"; Adzic (2011), *Specification by Example*.** Turned acceptance criteria into executable, example-based specifications (Gherkin) — [dannorth.net](https://dannorth.net/blog/introducing-bdd/); [Manning](https://www.manning.com/books/specification-by-example)
6. **Lucassen et al. (2016), "The use and effectiveness of user stories in practice"**, REFSQ 2016, LNCS. The main quantitative data on user-story templates and quality guidelines in use (with the QUS framework, REJ 2016) — [doi](https://doi.org/10.1007/978-3-319-30282-9_14)
7. **Cao & Ramesh (2008), "Agile requirements engineering practices: an empirical study"**, IEEE Software 25(1):60–67; extended in Ramesh, Cao & Baskerville (2010), ISJ. The first substantial empirical account of agile RE practices and their intractable risks (customer inability, NFR neglect) — [doi](https://doi.org/10.1109/MS.2008.1)
8. **Inayat et al. (2015), "A systematic literature review on agile requirements engineering practices and challenges"**, Computers in Human Behavior 51(B):915–929. Consolidates 17 practices and 8 agile-RE challenges. Schön et al. (2017) complements it on user involvement; Heikkilä et al. (2015) is a smaller mapping — [doi](https://doi.org/10.1016/j.chb.2014.10.046)
9. **Kasauli et al. (2021), "Requirements engineering challenges and practices in large-scale agile system development"**, JSS 172:110851. Twenty-four challenges in six themes, mapped against SAFe and LeSS; the key evidence for RE at scale and in systems engineering — [doi](https://doi.org/10.1016/j.jss.2020.110851)
10. **Leffingwell (2010), *Agile Software Requirements*** (Addison-Wesley), operationalised in SAFe 6.0. The source of the epic/feature/story/enabler/NFR model and WSJF prioritisation used by many large enterprises — [InformIT](https://www.informit.com/store/agile-software-requirements-lean-requirements-practices-9780321635846)
11. **Kuhrmann et al. (2017–2022), HELENA studies**, especially "What makes agile software development agile?", IEEE TSE 48(9):3523–3539. Evidence that hybrid processes are the norm and pure methods rare (~15%) — [doi](https://doi.org/10.1109/TSE.2021.3099532)
12. **Cagan (2017), *Inspired*, 2nd ed. (Wiley); Torres (2021), *Continuous Discovery Habits*.** Define the discovery practice (four risks, product trios, opportunity solution trees) through which product companies now do most elicitation and validation — [Wiley](https://www.wiley.com/en-us/INSPIRED%3A+How+to+Create+Tech+Products+Customers+Love%2C+2nd+Edition-p-9781119387503); [Product Talk](https://www.producttalk.org/continuous-discovery-habits/)
13. **Karlsson et al. (2007), "Requirements engineering challenges in market-driven software development – An interview study with practitioners"**, IST 49(6):588–604. Classic RE's own account of product-company RE; the bridge to product management — [doi](https://doi.org/10.1016/j.infsof.2007.02.008)
14. **Franch et al. (2023), "The state-of-practice in requirements specification: an extended interview study at 12 companies"**, REJ 28(3):377–409. Up-to-date evidence that specification remains natural language in general-purpose tools — [doi](https://doi.org/10.1007/s00766-023-00399-7)
15. **Eveleens & Verhoef (2010), "The rise and fall of the Chaos report figures"**, IEEE Software 27(1):30–36, with Jørgensen & Moløkken-Østvold (2006). Essential for reading the industry's most-quoted failure statistics critically — [doi](https://doi.org/10.1109/MS.2009.154)

Honourable mentions: Scacchi (2002) and Gralha et al. (2018) for open-source and startup RE; PMI (2014) as the typical practitioner-association data point; Eckhardt et al. (2016) on NFRs; Ralph (2013) as the sharpest critique of the requirements concept.

**Corrections to the brief**
- Heikkilä et al. (2015) is a small (28-article) conference mapping study, not a major review; Inayat (2015) and Schön (2017) are the stronger reviews.
- Cao & Ramesh's practice count differs between the 2008 article (seven practices) and the 2010 ISJ paper (six practices and seven challenges).
- Franch et al.'s TSE paper appeared online in 2020 but in print in 2022 (48(6)).
- Kassab et al. (2014) is a modest survey (~250 responses), now superseded by Kassab & Laplante (2022).
- The tool is OpenFastTrace, not "OpenFastTrack".
- The Definition of Ready is a practitioner add-on, not part of Scrum.

### Inferences
**Consensus positions**
1. Requirements are discovered and refined continuously, not frozen. Fewer than 20% of organisations regularly change the specification document itself; most update backlogs or work with change requests (Wagner 2019).
2. Direct, frequent customer and user involvement is central. Its absence, through communication flaws, weak customer access or customer inability, is among the most frequent and failure-relevant problems (NaPiRE; Ramesh 2010; Melegati 2019).
3. Natural language dominates and will continue to. The craft lies in making it precise with templates, examples and acceptance criteria (Franch 2023; Lucassen 2016; Jeffries 2001).
4. Most organisations are hybrid. Large or regulated systems still need explicit, maintained requirements documentation and traceability on top of agile backlogs (Kuhrmann 2022; Kasauli 2021).

**Where experts disagree**
1. How much documentation is needed. The Manifesto and Jeffries minimise it; Kasauli and Heikkilä 2017 show that large organisations need it.
2. How to handle NFRs. SAFe uses them as constraints in the Definition of Done; Eckhardt finds most so-called NFRs are behaviour that can be handled like functional requirements; Ramesh calls neglect of NFRs an intractable agile risk.
3. Whether requirements can be separated from design. Classic RE says they can; discovery practitioners and Ralph argue the two must be explored together.
4. Whether ceremony helps. A Definition of Ready and heavy scaled frameworks are advocated by practitioners, but have little empirical validation (Dikert: ~90% experience reports).
5. How bad things really are. CHAOS and PMI headline figures versus their methodological critiques.

**Open issues**
- There is no robust evidence that any agile, scaled or discovery practice reduces the NaPiRE top problems.
- System-level requirements knowledge in large-scale agile remains unsolved (Kasauli).
- A research–practice gap persists (Franch 2022; Franch 2023).
- NFRs and quality requirements in agile teams remain unresolved (Inayat; Ramesh).

**Practical guidance for a newcomer specifier, distilled from the above**
- Keep an explicit goal or outcome for every requirement set.
- Write small, valuable stories, but treat each as a pointer to a conversation and a set of concrete examples or acceptance criteria.
- Quantify quality requirements where possible.
- Maintain a lightweight, system-level description of behaviour and constraints that outlives the backlog.
- Seek direct access to real users.
- In regulated contexts, use the standards-based specification and traceability that ISO 29148-style practice requires.

### Gaps
- **Not covered in depth here:** the evidence on requirements quality criteria, standards (ISO 29148, INCOSE), and regulated-domain agile, which other sections are expected to cover; and 2024–2026 large-scale replications of NaPiRE-style surveys, which I could not find.
- **Reference verification status:**
  - Every DOI linked above was confirmed via Crossref (title and year match). Crossref gives no year for ISO/IEC/IEEE 29148:2018 (10.1109/IEEESTD.2018.8559686), but the title matched.
  - Book, framework and tool links are official publisher, author, vendor or project pages and returned HTTP 200 when fetched.
  - Unverified, and not linked as authoritative: the Standish CHAOS 1994 report (no accessible official copy; numbers cited only via its critics); publisher pages for Seiden's *Outcomes Over Output* and for Patton's *User Story Mapping* (O'Reilly returned 403; the author page jpattonassociates.com/user-story-mapping exists); and the ISO catalogue page for 29148 (403).
  - Preprints used to read full texts: NaPiRE arXiv:1611.10288; TOSEM arXiv:1805.07951; TSE arXiv:2109.11435.
