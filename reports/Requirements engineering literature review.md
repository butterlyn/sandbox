# Requirements Engineering: A Literature Review

*As of 23 October 2026*

## Overview

Requirements engineering (RE) is the discipline of discovering what a system must achieve, stating it precisely, and keeping it agreed as things change. It matters because missing, misunderstood and shifting requirements are among the most reported causes of project trouble, though famous failure statistics are weak. Requirements are elicited, not "captured": analysts combine interviews, workshops, observation and prototypes, and increasingly mine user feedback and usage data. They are layered from business goals through stakeholder needs to verifiable system requirements, mostly in structured natural language, with models where risk justifies them. The work is iterative, and how much is written up front depends on risk, regulation and the distance between the people involved.

**Start here:** [Nuseibeh & Easterbrook (2000)](https://doi.org/10.1145/336512.336523) for the map; [Zave & Jackson (1997)](https://doi.org/10.1145/237432.237434) for the theory; [Wiegers & Beatty (2013)](https://www.microsoftpressstore.com/store/software-requirements-9780735679665) for practice; the [IREB CPRE Foundation Level syllabus (2026)](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf) for the current consensus; [ISO/IEC/IEEE 29148:2018](https://doi.org/10.1109/IEEESTD.2018.8559686) for the standard.

**Eras at a glance**

- 1970s — Defining requirements for large systems — Bell & Thayer (1976); Ross & Schoman (1977)
- 1980s — Precise, implementation-free specification; the human difficulty — Heninger (1980); Brooks (1987); Curtis et al. (1988)
- 1990s — A discipline forms: social context, traceability, world and machine — Goguen & Linde (1993); Gotel & Finkelstein (1994); Zave & Jackson (1997)
- 2000s — Consolidated theory; agile stories and executable examples — Nuseibeh & Easterbrook (2000); Jeffries (2001); North (2006)
- 2010s — Standardisation, practice surveys and data-driven RE — ISO/IEC/IEEE 29148 (2011); Maalej et al. (2016); Méndez Fernández et al. (2017)
- 2020s — Revised standards and handbooks; quality and compliance — ISO/IEC 25010 (2023); INCOSE Needs and Requirements Manual (2024); Robertson, Robertson & Reed (2024)

## Foundations

RE's core theory is the world–machine view: requirements describe effects in the environment, and a specification must guarantee them, given domain knowledge. The field also accepts that requirements are discovered socially and iteratively, not simply collected.

- Bell & Thayer (1976), [Software requirements: are they really a problem?](http://dl.acm.org/citation.cfm?id=807650) — analysed two very different sets of requirements and found them "important", with problems "surprisingly similar across projects".
- Ross & Schoman (1977), [Structured analysis for requirements definition](https://doi.org/10.1109/TSE.1977.229899) — divided requirements definition into context analysis, functional specification and design constraints: why a system is needed, what it must do, and how to build it.
- Brooks (1987), [No silver bullet](https://doi.org/10.1109/MC.1987.1663532) — "The hardest single part of building a software system is deciding precisely what to build." An essay, not data.
- Curtis, Krasner & Iscoe (1988), [A field study of the software design process for large systems](https://doi.org/10.1145/50087.50089) — interviews on 17 large projects: thin domain knowledge, fluctuating and conflicting requirements, and communication breakdowns hurt productivity and quality.
- Zave (1997), [Classification of research efforts in requirements engineering](https://doi.org/10.1145/267580.267581) — the most-quoted definition: RE concerns "the real-world goals for, functions of, and constraints on software systems", their precise specification and their evolution.
- Zave & Jackson (1997), [Four dark corners of requirements engineering](https://doi.org/10.1145/237432.237434) — "all descriptions involved in requirements engineering should be descriptions of the environment"; separates requirements (desired), domain knowledge (assumed true) and specifications.
- Gunter, Gunter, Jackson & Zave (2000), [A reference model for requirements and specifications](https://doi.org/10.1109/52.896248) — adequacy made precise: domain knowledge plus specification must entail the requirement (W ∧ S ⇒ R), using only phenomena shared by world and machine.
- Nuseibeh & Easterbrook (2000), [Requirements engineering: a roadmap](https://doi.org/10.1145/336512.336523) — the best overview: eliciting, modelling and analysing, communicating, agreeing and evolving requirements are "interleaved, iterative"; prefers "elicitation" to "capture".
- Jackson (2001), [Problem Frames](https://www.informit.com/store/problem-frames-analyzing-and-structuring-software-development-9780201596274) — "Our problems and requirements are in the world, not in the computer"; recurring problem shapes keep analysts on the problem instead of "inventing solutions".

Bridging social enquiry and formal world–machine models has been open since the 2000 roadmap. Critics add that the core ontology omits stakeholders' beliefs, desires and attitudes ([Jureta et al. 2008](https://doi.org/10.1109/RE.2008.13)).

## Collecting requirements

Requirements are elicited—discovered and co-constructed with stakeholders—rather than captured, and no single technique is best. Good practice mixes asking, observing and studying documents with prototypes, scenarios and creativity techniques that provoke new ideas ([IREB syllabus v3.3.0](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf)).

- Goguen & Linde (1993), [Techniques for requirements elicitation](https://doi.org/10.1109/ISRE.1993.324822) — evaluated techniques from introspection to discourse analysis; observing real workplace interaction "can elicit tacit knowledge".
- Beyer & Holtzblatt (1995), [Apprenticing with the customer](https://doi.org/10.1145/203356.203365) — contextual inquiry: the analyst learns the work as an apprentice, since traditional interviews and surveys are "not adequate". Expanded in [*Contextual Design*](https://shop.elsevier.com/books/contextual-design/holtzblatt/978-0-12-800894-2) (2nd ed., 2016).
- Glinz & Wieringa (2007), [Stakeholders in requirements engineering](https://doi.org/10.1109/MS.2007.42) — a stakeholder is "a person or organization who influences a system's requirements or who is impacted by that system". Rank roles by the risk of neglecting them; the onion model offers a checklist ([Alexander & Robertson 2004](https://doi.org/10.1109/MS.2004.1259199)).
- Davis et al. (2006), [Effectiveness of requirements elicitation techniques](https://doi.org/10.1109/RE.2006.17) — systematic review: structured interviews are among the most effective; card sorting, ranking and think-aloud less so; analyst experience did not appear to matter. Results are unreplicated; [Dieste & Juristo (2011)](https://doi.org/10.1109/TSE.2010.33) extended the review to 30 studies.
- Hickey & Davis (2004), [A unified model of requirements elicitation](https://doi.org/10.1080/07421222.2004.11045786) — elicitation is iterative, and choosing techniques is itself a situational decision. [Carrizo, Dieste & Juristo (2014)](https://doi.org/10.1016/j.infsof.2014.01.009) offer an evidence-based selection framework against over-use of open interviews.
- Ferrari, Spoletini & Gnesi (2016), [Ambiguity and tacit knowledge in requirements elicitation interviews](https://doi.org/10.1007/s00766-016-0249-3) — in 34 interviews, ambiguity was "often a resource for discovering tacit knowledge". Student interviewers struggle most with question formulation, omission and order ([Bano et al. 2019](https://doi.org/10.1007/s00766-019-00313-0)).
- Maiden, Gizikis & Robertson (2004), [Provoking creativity](https://doi.org/10.1109/MS.2004.1331305) — creativity workshops, drawing on analogical reasoning, to invent rather than merely gather requirements in air traffic management.
- Wagner et al. (2019), [Status quo in requirements engineering](https://doi.org/10.1145/3306607) — NaPiRE survey of 228 organisations in 10 countries: interviews (73%), facilitated meetings (67%) and prototyping (58%) dominate; scenarios (41%) and observation (29%) trail.

The effectiveness evidence is small, old and lab-based, and whether any technique can surface "unknown unknowns" is open ([Sutcliffe & Sawyer 2013](https://doi.org/10.1109/RE.2013.6636709)). Popular agile workshop formats are almost unevaluated; Example Mapping is a rare exception ([Berends & Dalpiaz 2021](https://doi.org/10.1109/RE51729.2021.00038)).

## Structuring requirements

Every mature scheme layers requirements from business purpose through stakeholder needs to system requirements, each with a check. Most specifications are structured natural language, with models where behaviour is complex or critical.

The table maps [ISO/IEC/IEEE 29148](https://doi.org/10.1109/IEEESTD.2018.8559686) and INCOSE's [Needs and Requirements Manual](https://www.wiley.com/en-us/INCOSE+Needs+and+Requirements+Manual-p-9781394152742) against the [Scrum Guide](https://scrumguides.org/scrum-guide.html), XP/BDD and [SAFe](https://framework.scaledagile.com/story). The fit is approximate: agile layers divide work mainly by size, the standards by viewpoint.

| Level | Standards | Agile practice |
|---|---|---|
| Why: business need | Business or mission analysis; business requirements specification (BRS) | Scrum Product Goal; SAFe epic with Lean business case and MVP |
| Stakeholder or user needs | Stakeholder requirements specification (StRS); INCOSE needs, the basis for validation | User story "As a [role] I want [feature] so that [benefit]"; SAFe capability |
| System or software requirements | System and software requirements specifications (SyRS, SRS); INCOSE design input requirements ("shall"), the basis for verification | Refined backlog items; SAFe feature, then story |
| Acceptance criteria and verification | Verification section in each specification; verify against requirements, validate against needs | XP acceptance tests; BDD Given/When/Then scenarios; SAFe story acceptance criteria; Scrum Definition of Done |

- Wiegers & Beatty (2013), [Software Requirements, 3rd ed.](https://www.microsoftpressstore.com/store/software-requirements-9780735679665) — the practitioner standard: business requirements (vision and scope), user requirements (use cases, stories) and functional requirements. [Wiegers & Hokanson (2023)](https://www.informit.com/store/software-requirements-essentials-core-practices-for-9780138190286) distil it into 20 core practices.
- Mavin et al. (2009), [Easy Approach to Requirements Syntax (EARS)](https://doi.org/10.1109/RE.2009.9) — five sentence templates (plain "shall", "While", "When", "Where", "If … then") with clauses in temporal order, developed at Rolls-Royce. Support is mainly its authors' adoption claims ([EARS page](https://alistairmavin.com/ears/)).
- Jeffries (2001), [Essential XP: card, conversation, confirmation](https://ronjeffries.com/xprog/articles/expcardconversationconfirmation/) — a story card is "a token representing the requirement"; the requirement is conveyed in conversation and confirmed by acceptance tests. The tests, not the card, carry the precision.
- North (2006), [Introducing BDD](https://dannorth.net/blog/introducing-bdd/) — "Acceptance criteria should be executable", written as Given/When/Then scenarios. Adzic's [*Specification by Example*](https://www.manning.com/books/specification-by-example) (2011) documents the practice in over 50 case studies.
- Cockburn (2000), [Writing Effective Use Cases](https://www.informit.com/store/writing-effective-use-cases-9780201702255) — goal levels and a template of main success scenario plus extensions, building on [Jacobson et al. (1992)](https://www.informit.com/store/object-oriented-software-engineering-a-use-case-driven-9780201544350).
- van Lamsweerde (2001), [Goal-oriented requirements engineering: a guided tour](https://doi.org/10.1109/ISRE.2001.948567) — refine goals by asking "why?" and "how?"; goals the software must enforce become requirements, goals on the environment become assumptions. A mapping of 246 papers found mostly case studies and a "pick a side" notation barrier ([Horkoff et al. 2019](https://doi.org/10.1007/s00766-017-0280-z)).
- Heninger (1980), [Specifying software requirements for complex systems](https://doi.org/10.1109/TSE.1980.230208) — the A-7E document: precise, tabular black-box requirements and the root of the SCR method. At AWS, TLA+ "added significant value" on 10 large systems, mainly as design specification ([Newcombe et al. 2015](https://doi.org/10.1145/2699417)).
- Franch et al. (2023), [The state-of-practice in requirements specification](https://doi.org/10.1007/s00766-023-00399-7) — 24 practitioners in 12 Swedish companies: natural language is the main artefact, and templates "seldom follow any fixed standard". Ambiguity, inconsistency and incompleteness top the challenges.

Almost no studies compare notations on outcomes, and the value of formal methods beyond critical niches is disputed. Of 62 projects using them, 92% reported quality gains ([Woodcock et al. 2009](https://doi.org/10.1145/1592434.1592436)); professionals still find them hard to use ([Gleirscher & Marmsoler 2020](https://doi.org/10.1007/s10664-020-09836-5), N = 216).

## Quality requirements and requirement quality

Quality requirements, often called non-functional, are judged critical yet routinely left vague, unquantified and late. The consensus remedy: elicit them against a quality model such as ISO/IEC 25010 (see Standards), then make each measurable or testable.

- Glinz (2007), [On non-functional requirements](https://doi.org/10.1109/RE.2007.45) — found no agreed definition and proposed classifying by concern: functional, performance, specific quality and constraint. He concludes that "the kind of a requirement depends on the way we represent it".
- Eckhardt, Vogelsang & Méndez Fernández (2016), [Are "non-functional" requirements really non-functional?](https://doi.org/10.1145/2884781.2884788) — of 530 labelled NFRs in 11 industrial specifications, 75% described system behaviour; many could be handled like functional requirements.
- Robertson, Robertson & Reed (2024), [Mastering the Requirements Process, 4th ed.](https://www.informit.com/store/mastering-the-requirements-process-9780137969555) — the Volere method, largely rewritten. The [Volere template](https://www.volere.org/templates/volere-requirements-specification-template/) gives every requirement a "fit criterion", e.g. "Eighty percent of a test panel of 11-year-old children shall be able…".
- Gilb (2005), [Competitive Engineering](https://shop.elsevier.com/books/competitive-engineering/gilb/978-0-7506-6507-0) — Planguage gives each quality a scale, a meter (test) and levels such as Past, Goal and Fail ([summary](https://accu.org/journals/overload/13/70/gilb_299/)).
- Olsson, Sentilles & Papatheocharous (2022), [A systematic literature review of empirical research on quality requirements](https://doi.org/10.1007/s00766-022-00373-9) — 84 studies, mostly case studies and none replicated; quality models and the NFR method show positive but small-scale results.
- Behutiye et al. (2020), [Management of quality requirements in agile and rapid software development](https://doi.org/10.1016/j.infsof.2019.106225) — 156 studies: quality requirements are "often ill-defined" because agile teams focus on delivering functionality.
- Berry, Kamsties & Krieger (2003), [From contract drafting to software specification](https://cs.uwaterloo.ca/~dberry/handbook/ambiguityHandbook.pdf) — a handbook that catalogues lexical, syntactic, semantic and pragmatic ambiguity, and warns of "unconscious disambiguation": readers take the first meaning as the only one.
- Frattini et al. (2024), [Applying Bayesian data analysis for causal inference about requirements quality](https://doi.org/10.1007/s10664-024-10582-1) — controlled experiment, 25 participants: ambiguous pronouns strongly harmed domain models, passive voice only slightly. A case study traced just one failure to ambiguity ([de Bruijn & Dekkers 2010](https://doi.org/10.1007/978-3-642-14192-8_21)).
- Femmer & Vogelsang (2019), [Requirements quality is quality in use](https://doi.org/10.1109/MS.2018.110161823) — a requirement is good if it serves the activities that use it, such as implementing, testing and estimating. [Frattini et al. (2023)](https://doi.org/10.1007/s00766-023-00405-y) found most research checks normative rules without measuring impact.

Whether "non-functional" should survive as a category, and how much rule violations matter, remain open. Outcome evidence is thin: in one company's 32 projects, overrun projects tended to have weak purpose-and-context sections ([Kamata & Tamai 2007](https://doi.org/10.1109/RE.2007.31)).

## Analysis, prioritisation, validation and management

These activities run throughout development, not as phases; even Royce's 1970 "waterfall" paper advised doing the work twice ([Larman & Basili 2003](https://doi.org/10.1109/MC.2003.1204375)). Conflict and change are normal: record decisions, revisit priorities, validate early and trace requirements to sources and tests.

- Boehm, Grünbacher & Briggs (2001), [Developing groupware for requirements negotiation](https://doi.org/10.1109/52.922725) — "There is no complete and well-defined set of requirements waiting to be discovered". In WinWin, success-critical stakeholders negotiate a mutually satisfactory set; it was evaluated mainly with 15 student teams ([Boehm et al. 1998](https://doi.org/10.1109/2.689675)).
- Nuseibeh, Easterbrook & Russo (2000), [Leveraging inconsistency in software development](https://doi.org/10.1109/2.839317) — "maintaining consistency at all times is counterproductive"; tolerate and record inconsistencies, and use them to direct elicitation.
- Achimugu et al. (2014), [A systematic literature review of software requirements prioritization research](https://doi.org/10.1016/j.infsof.2014.02.001) — 73 studies, 49 techniques. Pairwise AHP, as in [Karlsson & Ryan (1997)](https://doi.org/10.1109/52.605933), is most cited but needs n(n−1)/2 comparisons; real-world applicability was unreported.
- Bjarnason, Wnuk & Regnell (2012), [Are you biting off more than you can chew?](https://doi.org/10.1016/j.infsof.2012.04.006) — in a large market-driven firm (nine interviewees), overscoping came from constant requirements inflow, weak shared goals and late developer involvement. Practitioner rules such as DSDM's [MoSCoW](https://www.agilebusiness.org/dsdm-project-framework/moscow-prioritisation.html) cap "Must Have" effort at about 60%.
- Porter, Votta & Basili (1995), [Comparing detection methods for software requirements inspections](https://doi.org/10.1109/32.391380) — 48 graduate students: inspection meetings added no net detection, and scenario reading beat checklists. A later meta-analysis found no clear benefit of perspective-based reading over checklists ([Ciolkowski 2009](https://doi.org/10.1109/ESEM.2009.5316026)).
- Boehm, Gray & Seewaldt (1984), [Prototyping versus specifying](https://doi.org/10.1109/TSE.1984.5010238) — seven teams: prototyping yielded about 40% less code and 45% less effort, and products rated easier to use; specifying gave more coherent, easier-to-integrate designs.
- Bjarnason et al. (2014), [Challenges and practices in aligning requirements with verification and validation](https://doi.org/10.1007/s10664-013-9263-y) — 30 practitioners in six companies: alignment rests on communication, tracing and change control; poorly communicated changes leave requirements unverified.
- Gotel & Finkelstein (1994), [An analysis of the requirements traceability problem](https://doi.org/10.1109/ICRE.1994.292398) — from over 100 practitioners: most traceability problems lie before the specification, in tracing origins and rationale.
- Mäder & Egyed (2012), [Assessing the effect of requirements traceability for software maintenance](https://doi.org/10.1109/icsm.2012.6405269) — controlled experiment, 52 subjects: with traces, subjects worked 21% faster and produced 60% more correct solutions. A larger journal study reports similar gains ([Mäder & Egyed 2015](https://doi.org/10.1007/s10664-014-9314-z)).

Prioritisation that scales and copes with dependencies remains unvalidated in industry. Most evidence here comes from students or single organisations.

## Standards and bodies of knowledge

Standards converge on layered requirements, agreed characteristics of good requirements, verification and validation, and traceable change. Several changed in 2023–2026, and the central one, ISO/IEC/IEEE 29148, is under revision.

| Standard or framework | Current edition and status (October 2026) | What it gives a requirements engineer |
|---|---|---|
| [ISO/IEC/IEEE 29148](https://doi.org/10.1109/IEEESTD.2018.8559686) | 2018 (Ed. 2), current; Ed. 3 at draft (DIS) stage | Requirements processes, BRS/StRS/SyRS/SRS contents, characteristics of good requirements and sets |
| [IEEE 830](https://doi.org/10.1109/IEEESTD.1998.88286) | 1998; superseded by 29148 in 2011 | The classic SRS outline, still widely cited |
| [ISO/IEC/IEEE 15288](https://www.iso.org/standard/81702.html) and [12207](https://standards.ieee.org/ieee/12207/11416/) | 2023 and 2026 editions; 12207:2017 withdrawn April 2026 | Life-cycle processes that frame requirements definition |
| [ISO/IEC/IEEE 24765](https://doi.org/10.1109/IEEESTD.2017.8016712) | 2017, current; IEEE revision project open since 2024, ISO draft cancelled | Shared vocabulary, also online as SEVOCAB |
| [ISO/IEC 25010](https://www.iso.org/standard/78176.html) | 2023 (Ed. 2); with 25019 and 25002, replaced the 2011 edition | Nine-characteristic product quality model, now including safety |
| [ISO/IEC 25030](https://www.iso.org/standard/72116.html) | 2019 (Ed. 2), current | Turning quality models into measurable quality requirements |
| [ISO 9241-210](https://www.iso.org/standard/77520.html) and [ISO 25065](https://www.iso.org/standard/72189.html) | 2019 editions, current | Human-centred design process; format for user requirements specifications |
| [INCOSE Guide to Writing Requirements](https://www.incose.org/docs/default-source/working-groups/requirements-wg/gtwr/incose_rwg_gtwr_v4_040423_final_drafts.pdf) | v4 (July 2023), current | 15 quality characteristics and 42 rules for writing requirements |
| [INCOSE Needs and Requirements Manual](https://www.wiley.com/en-us/INCOSE+Needs+and+Requirements+Manual-p-9781394152742) | v2 (Wiley, 2024), current | Needs (validated) versus design input requirements (verified) |
| [NASA Systems Engineering Handbook, Appendix C](https://www.nasa.gov/reference/appendix-c-how-to-write-a-good-requirement/) | Rev 2 (SP-2016-6105), current | Checklists: shall/will/should, and unverifiable terms to avoid |
| [IREB CPRE Foundation Level syllabus](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf) | v3.3.0 (1 April 2026); glossary 2.2.0 | Certification-backed practitioner consensus and terminology |
| [SWEBOK Guide](https://www.computer.org/education/bodies-of-knowledge/software-engineering) | v4.0 (2024), updated as v4.0a (September 2025) | Software Requirements knowledge area, including acceptance-criteria-based specification |
| [IIBA BABOK Guide](https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/) | v3 (2015), current; no v4 | Business, stakeholder, solution and transition requirements |
| [RFC 2119](https://doi.org/10.17487/RFC2119) and [RFC 8174](https://doi.org/10.17487/RFC8174) | 1997 and 2017, current (BCP 14) | MUST/SHALL/SHOULD/MAY, with defined meanings only in capitals |
| [OMG SysML](https://www.omg.org/spec/SysML) | v2.0 formal September 2025; v1.7 (2024) | Requirements as model elements linked to verification |

Regulated domains add [ISO 26262](https://committee.iso.org/standard/68390.html) and [Automotive SPICE 4.1](https://vda-qmc.de/en/automotive-spice/automotive-spice-veroeffentlichungen/) (automotive), [DO-178C](https://www.faa.gov/regulations_policies/advisory_circulars/index.cfm/go/document.information/documentID/1032046) (avionics), and [IEC 62304](https://webstore.iec.ch/en/publication/22794) and the FDA's [QMSR](https://www.fda.gov/medical-devices/postmarket-requirements-devices/quality-management-system-regulation-qmsr) (medical), all demanding traceable, change-controlled requirements.

Terminology still differs: IREB splits requirements into functional, quality and constraints, while BABOK uses business, stakeholder, solution and transition. The changes in 29148's third edition are not yet public.

## Industry practice

Industry RE is mostly agile or hybrid: requirements live as backlog items, refined continuously and confirmed by acceptance criteria. Large and regulated systems add traceable specifications, and the dominant problems are human rather than notational.

- Méndez Fernández et al. (2017), [Naming the pain in requirements engineering](https://doi.org/10.1007/s10664-016-9451-7) — 228 companies in 10 countries. Top problems: incomplete or hidden requirements (48%), communication flaws with the customer (41%), moving targets (33%) and underspecification (33%). Leading causes: lack of time and of experience (18% each).
- Schwaber & Sutherland (2020), [The Scrum Guide](https://scrumguides.org/scrum-guide.html) — the backlog is "an emergent, ordered list"; one Product Owner, "not a committee", is accountable; refinement is ongoing. The 2020 revision removed IT terms such as "requirement" ([revision history](https://scrumguides.org/revisions.html)).
- Lucassen et al. (2016), [The use and effectiveness of user stories in practice](https://doi.org/10.1007/978-3-319-30282-9_14) — 182 respondents, 21 interviews: 59% use the "As a…, I want…, so that…" template and most perceive benefits, but effectiveness is unproven. Companion work notes stories are "too often poorly written" and offers 13 quality criteria ([Lucassen et al. 2016b](https://doi.org/10.1007/s00766-016-0250-x)).
- Ramesh, Cao & Baskerville (2010), [Agile requirements engineering practices and challenges](https://doi.org/10.1111/j.1365-2575.2007.00259.x) — in 16 US organisations, agile RE could not resolve two risks: customer inability or disagreement, and neglect of non-functional requirements such as security.
- Kuhrmann et al. (2022), [What makes agile software development agile?](https://doi.org/10.1109/TSE.2021.3099532) — HELENA survey (556 of 1,467 responses analysed): under 15% work in a purely agile or traditional way; earlier analyses found about 75% using hybrid methods.
- Kasauli et al. (2021), [Requirements engineering challenges and practices in large-scale agile system development](https://doi.org/10.1016/j.jss.2020.110851) — seven companies, 24 challenges in six themes. All needed "strong requirements engineering approaches", especially to document system behaviour; many challenges lack realistically evaluated solutions.
- Sedano, Ralph & Péraire (2019), [The product backlog](https://doi.org/10.1109/ICSE.2019.00036) — eight projects observed at Pivotal for over two years: the backlog is both a work model and a boundary object, emerging through sensemaking and co-evolution.
- Cagan (2017), [Inspired, 2nd ed.](https://www.wiley.com/en-us/INSPIRED%3A+How+to+Create+Tech+Products+Customers+Love%2C+2nd+Edition-p-9781119387503) — product discovery tests four risks (value, usability, feasibility, business viability) before delivery ([summary](https://www.svpg.com/four-big-risks/)); [Torres (2021)](https://www.producttalk.org/continuous-discovery-habits/) adds opportunity solution trees. Evidence is practitioner experience.

No agile, scaled or discovery practice has been shown to reduce NaPiRE's top problems. Almost 90% of studies of large-scale agile transformations are experience reports ([Dikert et al. 2016](https://doi.org/10.1016/j.jss.2016.06.013)).

## Open debates

Three debates matter most for a specifier: where requirements end and design begins, how much to write down first, and how strong RE's evidence is. The functional versus non-functional debate appears under Quality requirements.

**What versus how.** The classical rule is that requirements state what, not how, as effects in the environment (see Zave & Jackson under Foundations). Yet 25% of NaPiRE organisations count stakeholders' trouble separating requirements from known solutions among their top five problems ([Méndez Fernández et al. 2017](https://doi.org/10.1007/s10664-016-9451-7)).

- Meyer (1985), [On formalism in specifications](https://doi.org/10.1109/MS.1985.229776) — *for separation*: over-specification is one of seven "sins": "The reader is told too much about the solution while he or she is desperately trying to grasp the problem."
- Rittel & Webber (1973), [Dilemmas in a general theory of planning](https://doi.org/10.1007/BF01405730) — *the root objection*: "wicked" problems "cannot be definitively described", so problem and solution evolve together and success is a judgement.
- Swartout & Balzer (1982), [On the inevitable intertwining of specification and implementation](https://doi.org/10.1145/358557.358572) — *intertwined*: "Contrary to recent claims that specification should be completed before implementation begins", it argues "the two processes must be intertwined". Implementation limits force specification changes: a stack held in an array gains a depth limit. Implementation choices also suggest additions: a reused pattern-matcher adds wildcard search.
- Parnas & Clements (1986), [A rational design process: how and why to fake it](https://doi.org/10.1109/TSE.1986.6312940) — *pragmatic bridge*: clients "do not know exactly what they want", and many details "only become known to us as we progress in the implementation". Still, write the requirements document as if the process were rational.
- Nuseibeh (2001), [Weaving together requirements and architectures](https://doi.org/10.1109/2.910904) — *concurrent development*: the "Twin Peaks" model. Taking requirements or architecture as the sole starting point "produces artificially frozen requirements documents". Instead, developers build both "concurrently, and interleave their development" in a finer-grained spiral, keeping their distinct content.
- de Boer & van Vliet (2009), [On the similarity between requirements and architecture](https://doi.org/10.1016/j.jss.2008.11.185) — *no difference in kind*: viewing architecture as decisions, "there is no fundamental distinction between architectural decisions and architecturally significant requirements". Interviews with 90 practitioners characterise such requirements ([Chen, Ali Babar & Nuseibeh 2013](https://doi.org/10.1109/MS.2012.174)).
- Mohanani, Turhan & Ralph (2021), [Requirements framing affects design creativity](https://doi.org/10.1109/TSE.2019.2909033) — *framing matters*: in two randomised experiments (42 and 34 participants), desiderata labelled "requirements" yielded less original but more practical designs than those labelled "ideas". Ralph argues analysts may present design decisions as requirements, "creating an illusion of requirements" ([Ralph 2013](https://doi.org/10.1007/s00766-012-0161-4)).

Few now defend finishing requirements before design; what survives is a separation of descriptions, keeping design out unless it is a deliberate constraint. The live questions are whether requirements and design decisions differ in kind, and how firmly desiderata should be presented to designers.

**Up-front specification and the evidence base.**

- Boehm & Turner (2003), [Balancing Agility and Discipline](https://www.informit.com/store/balancing-agility-and-discipline-a-guide-for-the-perplexed-9780321186126) — plan-driven and agile methods each have "home grounds"; balance them by risk. [Glinz & Fricker (2015)](https://doi.org/10.1007/s00450-014-0256-x) add that implicit shared understanding suffices only when the risk of misunderstanding is low.
- Meyer (2014), [Agile! The Good, the Hype and the Ugly](https://doi.org/10.1007/978-3-319-05155-0) — "User stories give you examples. They lack abstraction" ([interview](https://www.infoq.com/articles/agile-good-hype-ugly)). Agile authors reply that stories are conversation tokens, not specifications (see Structuring).
- Menzies, Nichols, Shull & Layman (2017), [Are delayed issues harder to resolve?](https://doi.org/10.1007/s10664-016-9469-x) — 171 projects (2006–2014, all using the Team Software Process) showed "no evidence for the delayed issue effect", undercutting the "100× cost to fix" claim. The CHAOS failure rates are similarly disputed ([Eveleens & Verhoef 2010](https://doi.org/10.1109/MS.2009.154)).

No field study compares outcomes of solution-free and solution-laden requirements, or of more and less up-front specification. The defensible claim is narrower than the folklore: requirements and communication problems are frequent and often linked to failure.

## Recent shifts (2015–2026)

Since 2015, RE has become more continuous and data-informed, and its idea of a requirement has widened. Law now supplies many quality requirements: privacy under the [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) (since 25 May 2018) and accessibility under the [European Accessibility Act](https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en) (from 28 June 2025).

- Maalej, Nayebi, Johann & Ruhe (2016), [Toward data-driven requirements engineering](https://doi.org/10.1109/MS.2015.153) — argued for identifying and prioritising requirements from explicit feedback (app reviews, social media) and implicit feedback (usage data, logs).
- Dąbrowski, Letier, Perini & Susi (2022), [Analysing app reviews for software engineering](https://doi.org/10.1007/s10664-021-10065-7) — systematic review of 182 papers (2012–2020). Their replication found review-mining approaches "achieve lower effectiveness than reported originally" ([Dąbrowski et al. 2023](https://doi.org/10.1016/j.is.2023.102181)).
- Fagerholm et al. (2017), [The RIGHT model for continuous experimentation](https://doi.org/10.1016/j.jss.2016.03.034) — experiments with instrumented MVPs or features, linked to the roadmap, become a way to validate requirements after release.
- Becker et al. (2015), [Sustainability design and software: the Karlskrona Manifesto](https://doi.org/10.1109/ICSE.2015.179) — frames sustainability across social, individual, environmental, economic and technical dimensions; the SusAF framework operationalises it ([Duboc et al. 2020](https://doi.org/10.1007/s00766-020-00336-y)).
- Perera et al. (2020), [A study on the prevalence of human values in software engineering publications, 2015–2018](https://doi.org/10.1145/3377811.3380393) — few top-venue papers address human values directly. In practice, organisational culture shapes how values are handled ([Hussain et al. 2022](https://doi.org/10.1109/TSE.2020.3038802), 31 practitioners).
- Ahmad et al. (2023), [Requirements engineering for artificial intelligence systems](https://doi.org/10.1016/j.infsof.2023.107176) — 43 studies: current RE practice is "not adequately adaptable for building AI systems". Data requirements and explainability ([Chazette & Schneider 2020](https://doi.org/10.1007/s00766-020-00333-1), 107 end users) are new concerns.
- Zhao et al. (2021), [Natural language processing for requirements engineering](https://doi.org/10.1145/3444689) — 404 studies, only 7% evaluated in industrial settings. A review of generative-AI support for RE found 1.3% of studies reaching production-level integration ([Cheng et al., preprint](https://arxiv.org/abs/2409.06741)).

How far these shifts reach practice is largely unmeasured. No adoption figures were found for crowd-based RE, sustainability frameworks, values methods or SysML v2 (see Standards).

## Assumptions and scope

- **Scope:** RE for software-intensive systems from the 1970s to 23 October 2026, read as a field-level history. Architecture and implementation appear only where they meet requirements.
- **Selection:** works come from nine themed research notes, ranked by the researchers using citation snapshots and judgement. Each is discussed mainly in one section.
- **Currency:** editions and statuses are as of 23 October 2026. Where iso.org, incose.org and some publishers blocked automated checks, statuses rest on IEEE pages, official previews or search extracts.
- **Exclusions:** AI agents, LLM-driven and "spec-driven" development are out of scope; AI appears only as RE research topics. Domain regulations get one sentence; vendor surveys and market-share data were not used.
- **Links:** DOIs where recorded, otherwise official publisher, standards-body or author pages; some titles drop subtitles. Links to iso.org, incose.org, EUR-Lex and ACM (Bell & Thayer, which has no DOI) are official pages the researchers could not open.
- **Unverified details:** 29148:2018's exact characteristic wording is paywalled. Wiegers' levels and Cockburn's template come from secondary summaries. Wiley dates the INCOSE manual 2024, but the book carries a 2025 copyright.
- **Evidence caveats:** most RE evidence is small, qualitative, student-based or self-reported, and rarely replicated; surveys use convenience samples. CHAOS and "100×" figures appear only as contested claims.
