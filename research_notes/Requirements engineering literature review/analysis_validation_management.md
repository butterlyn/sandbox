# Analysis & negotiation, prioritisation & release planning, validation, and requirements management (traceability & change)

Conventions used below (research date 2026-10-23):
- ★ = one of the 15 most important works for this subtopic (full shortlist and synthesis at the end of Q6).
- "✓Crossref" = DOI fetched from `https://api.crossref.org/works/<DOI>` and title + year matched. Every work gets one canonical link at its first full citation; later mentions repeat that same link.
- "[S2 summary]" = the publisher page was paywalled or bot-blocked, so the statement comes from the Semantic Scholar API record for that DOI (a machine-generated TL;DR of the abstract). Treat it as lower confidence. Numbers are given only where I opened an abstract or full text that states them.
- DOI pitfalls found while verifying. These DOIs are often cited but wrong:
  - 10.1109/52.922726 does not exist; Boehm–Grünbacher–Briggs is 10.1109/52.922725.
  - 10.1109/TSE.1984.5010241 is Gligor's denial-of-service paper; Boehm–Gray–Seewaldt is 10.1109/tse.1984.5010238.
  - 10.1109/TSE.2006.70 is Chari & Hevner; Damian & Chisan is 10.1109/tse.2006.61.
  - 10.1023/A:1018946223270 does not exist; Sommerville & Sawyer is 10.1023/a:1018946223345.
  - 10.1109/HICSS.2001.926238 is the "ThinkLets" paper; EasyWinWin is 10.1109/hicss.2001.926243.
  - 10.1109/52.754053 is "Self-tuning systems"; Sawyer et al. is 10.1109/52.754057.
  - Also: OpenAlex dates Boehm's spiral DOI 10.1109/2.59 to 1986, but Crossref says May 1988 (IEEE Computer).

## Q1. What process models describe the RE activities and how do they iterate?

### Takeaway
There is no single accepted RE process. There is, however, a stable consensus on a small set of activity types: elicit, analyse and negotiate, document, validate, and manage, with management running throughout. These activities are interleaved and repeated, not run once in sequence. Royce (1970) is the origin of single-pass "waterfall" but in fact recommended iteration ("do it twice"). Boehm's risk-driven spiral (1988) and Nuseibeh's "Twin Peaks" (2001) made iteration explicit. The current IREB CPRE syllabus (v3.3.0, April 2026) names four major tasks: elicitation, documentation, validation and management. It treats analysis and conflict resolution as part of elicitation, puts prioritisation, traceability and change under management, and says the process must be tailored to context.

### Cited Findings
**Historical process models**
- ★ Royce, W. W. (1970). "Managing the development of large software systems." Proc. IEEE WESCON, Aug. 1970. Reprinted in *Ideas That Created the Future* (MIT Press, 2021), pp. 321–332 — [doi:10.7551/mitpress/12274.003.0035](https://doi.org/10.7551/mitpress/12274.003.0035) (✓Crossref for the 2021 reprint; the 1970 original has no DOI).
- Larman & Basili on Royce: "Many—incorrectly—view Royce's paper as the paragon of single-pass waterfall. In reality, he recommended an approach somewhat different than what has devolved into today's waterfall concept, with its strict sequence of requirements analysis, design, and development phases. Indeed, Royce's recommendation was to do it twice." They add that Royce suggested a 30-month project might have a 10-month pilot model. They also note that this iterative step "has been lost in most descriptions of this model, although it is clearly not classic IID" (iterative and incremental development) — [Larman & Basili 2003](https://doi.org/10.1109/MC.2003.1204375).
- Larman, C. & Basili, V. R. (2003). "Iterative and incremental development: a brief history." *IEEE Computer* 36(6):47–56 — [doi:10.1109/MC.2003.1204375](https://doi.org/10.1109/MC.2003.1204375) (✓Crossref; Crossref spells the title "Iterative and incremental developments. a brief history"). Its main points:
  - IID dates back to the mid-1950s, and its common theme was "to avoid a single-pass sequential, document-driven, gated-step approach".
  - TRW, where Royce worked, was an early adopter of IID, and Barry Boehm, "the originator of the IID spiral model in the mid-1980s, was chief scientist at TRW". (Full text opened.)
- ★ Boehm, B. W. (1988). "A spiral model of software development and enhancement." *IEEE Computer* 21(5):61–72 — [doi:10.1109/2.59](https://doi.org/10.1109/2.59) (✓Crossref). The abstract describes "an evolving risk-driven approach that provides a framework for guiding the software process". It also acknowledges "the primary difficulties in using it at its current incomplete level of elaboration".
- Nuseibeh, B. (2001). "Weaving together requirements and architectures." *IEEE Computer* 34(3):115–119 — [doi:10.1109/2.910904](https://doi.org/10.1109/2.910904) (✓Crossref). This is the "Twin Peaks" model:
  - Choosing requirements or architecture as the single starting point "invariably results in a waterfall development process that produces artificially frozen requirements documents".
  - The spiral model "addresses many drawbacks of a waterfall model", and the paper proposes "an even finer-grain spiral life cycle".
  - "developers craft a system's requirements and its architecture concurrently, and interleave their development."

**RE activity frameworks**
- Kotonya, G. & Sommerville, I. (1998). *Requirements Engineering: Processes and Techniques*. John Wiley & Sons, Worldwide Series in Computer Science, April 1998, xii + 282 pp. — [publisher page (Wiley-VCH)](https://www.wiley-vch.de/de/fachgebiete/computer-und-informatik/requirements-engineering-978-0-471-97208-2).
  - The publisher's contents list gives Part I chapters "Requirements Engineering Processes", "Requirements Elicitation and Analysis", "Requirements Validation" and "Requirements Management", followed by a "Requirements Engineering Techniques" part.
  - The blurb promises coverage "from initial requirements elicitation through to requirements validation".
- ★ Nuseibeh, B. & Easterbrook, S. (2000). "Requirements engineering: a roadmap." In *Proc. Conference on the Future of Software Engineering (ICSE 2000)*, ACM, pp. 35–46 — [doi:10.1145/336512.336523](https://doi.org/10.1145/336512.336523) (✓Crossref; Crossref shortens the title to "Requirements engineering"). From the full text:
  - It organises RE into "eliciting requirements, modelling and analysing requirements, communicating requirements, agreeing requirements, and evolving requirements". Its Section 9 discusses "how these different activities may be integrated into a single development process".
  - It defines validation as "the process of establishing that the requirements and models elicited provide an accurate account of stakeholder requirements".
  - It says validation is difficult for two reasons: one "philosophical in nature" (truth and what is knowable) and one "social" (reaching agreement among stakeholders with conflicting goals).
  - One of its research pointers is a "better understanding of the impact of software architectural choices on the prioritisation and evolution of requirements".
- ★ IREB (2026). *CPRE Foundation Level Syllabus*, version 3.3.0, 1 April 2026. Version 3 was created by S. Bühne, M. Glinz, H. van Loenhoud and S. Staal — [official PDF (hub.ireb.org)](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf). From the syllabus text:
  - Core activities: "The major tasks in RE are elicitation (4.2), documentation (3), validation (4.4), and management (6) of requirements. Tool support (7) may help perform these tasks. Requirements analysis and requirements conflict resolution (4.3) are considered to be part of elicitation. In order to perform RE activities properly, a suitable RE process must be tailored from a broad range of possibilities (5)."
  - Chapter 6, "Management Practices for Requirements", covers life-cycle management, version control, configurations and baselines, attributes and views, traceability (6.6), handling change (6.7) and prioritisation (6.8).
  - Principle 6 is "Validation: Non-validated requirements are useless". Principle 7 is "Evolution: Changing requirements are no accident, but the normal case".
  - Version history: v3.0.0 (1 Oct 2020) was a "Second major update to reflect the state of contemporary RE, covering both plan-driven and agile approaches". v3.3.0 (1 Apr 2026) made only minor content changes: the interaction model was removed from the learning objectives, and the quality criteria were clarified as recommended rather than exhaustive.
- ISO/IEC/IEEE 29148:2018, "Systems and software engineering — Life cycle processes — Requirements engineering" — [IEEE SA page](https://standards.ieee.org/ieee/29148/6937/). IEEE lists it as "Active Standard": board approval 2018-10-23, published 2018-11-30, superseding 29148-2011.
- **Status as of Oct 2026:** DIN Media lists "ISO/IEC/IEEE DIS 29148:2026-09 – Draft" (101 pp.). A third edition is therefore at Draft International Standard stage and the 2018 edition is still current — [DIN Media listing](https://www.dinmedia.de/en/draft-standard/iso-iec-ieee-dis-29148/406650675). (iso.org returned HTTP 403 to my fetches.)
- IREB says that where regulatory constraints apply, they "may impose the use of a process that conforms to given standards such as ISO/IEC/IEEE 29148" — [IREB v3.3.0](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf).

### Inferences
- The textbook "phases" (Kotonya & Sommerville; IREB) are best read as types of activity, not steps in a sequence. Every framework I opened (Boehm 1988; Nuseibeh & Easterbrook 2000; Nuseibeh 2001; IREB v3) treats them as interleaved and repeated, with management and evolution running continuously.
- The frameworks disagree on where analysis, negotiation and prioritisation sit:
  - Nuseibeh & Easterbrook make "agreeing" a peer activity.
  - IREB v3 folds analysis and conflict resolution into elicitation and puts prioritisation under management.
  - The coordinator's description of the IREB view as a five-activity model therefore needs correcting: current IREB has four major tasks.
  - For a newcomer, this means "analysis & negotiation" is no longer treated as a separate phase with its own deliverable. It happens during elicitation and is repeated whenever change arrives.
- "Waterfall" is largely a strawman. The real, ongoing debate is how much requirements work to do up front, and that depends on context (see Q6).

### Gaps
- Kotonya & Sommerville's model:
  - I could not open the book's text. The widely quoted model (elicitation, analysis and negotiation, documentation, validation, plus requirements management) fits the publisher's chapter list.
  - Its exact wording and figure are unverified.
- Royce (1970) original: I could not open it (mirror fetches failed). What it says rests on Larman & Basili's quotation.
- ISO/IEC/IEEE 29148 third edition: I found no source on what the draft changes relative to 2018.
- Earlier IREB versions (v2.x, 2010–2015): I did not verify how they framed "validation and negotiation".

## Q2. How are conflicts analysed and negotiated?

### Takeaway
Research has two complementary lines:
1. **Stakeholder negotiation.** Boehm's Theory W led to WinWin, which was built into groupware (EasyWinWin) to reach agreement among "success-critical stakeholders".
2. **Multi-perspective analysis.** Viewpoints and inconsistency management hold that inconsistencies should be detected, recorded and temporarily tolerated, not removed at once. Formal goal-based conflict analysis (KAOS "divergences") and the broader field of "requirements interaction management" sit alongside.

Current practitioner guidance (IREB) is lightweight: identify, analyse, resolve and document conflicts, using agreement, compromise, voting, overruling or variants. The empirical evidence is mostly case studies and experience reports.

### Cited Findings
- Boehm, B. W. & Ross, R. (1989). "Theory-W software project management principles and examples." *IEEE TSE* 15(7):902–916 — [doi:10.1109/32.29489](https://doi.org/10.1109/32.29489) (✓Crossref). Proposes "Theory W" as a candidate software management theory; it is the conceptual root of WinWin.
- ★ Boehm, B., Egyed, A., Kwan, J., Port, D., Shah, A. & Madachy, R. (1998). "Using the WinWin spiral model: a case study." *IEEE Computer* 31(7):33–44 — [doi:10.1109/2.689675](https://doi.org/10.1109/2.689675) (✓Crossref).
  - "Fifteen teams used the WinWin spiral model to prototype, plan, specify, and build multimedia applications for USC's Integrated Library System."
  - The paper reports lessons learned and how the model was extended in a second round of projects. [Evidence: student project case study]
- Boehm, B., Grünbacher, P. & Briggs, R. O. (2001). "Developing groupware for requirements negotiation: lessons learned." *IEEE Software* 18(3):46–55 — [doi:10.1109/52.922725](https://doi.org/10.1109/52.922725) (✓Crossref). From the abstract:
  - "There is no complete and well-defined set of requirements waiting to be discovered"; requirements "emerge in a highly collaborative, interactive, and interdisciplinary negotiation process".
  - In WinWin, success-critical stakeholders negotiate "so they can converge on a mutually satisfactory or win-win set of requirements".
  - The WinWin groupware "has evolved over four generations".
- Grünbacher, P. & Briggs, R. O. (2001). "Surfacing tacit knowledge in requirements negotiation: experiences using EasyWinWin." *Proc. 34th Hawaii Int. Conf. on System Sciences (HICSS-34)* — [doi:10.1109/hicss.2001.926243](https://doi.org/10.1109/hicss.2001.926243) (✓Crossref title match; the Crossref record has no year field, and HICSS-34 took place in 2001).
  - Targets "Implicit stakeholder goals, hidden assumptions, unshared expectations" with collaborative techniques inside EasyWinWin.
  - Illustrated "with examples from real-world negotiations".
- Grünbacher, P. & Boehm, B. (2001). "EasyWinWin: a groupware-supported methodology for requirements negotiation." *ACM SIGSOFT Software Engineering Notes* 26(5):320–321 (ESEC/FSE 2001) — [doi:10.1145/503271.503265](https://doi.org/10.1145/503271.503265) (✓Crossref; Crossref title "EasyWinWin"). Stakeholders "collect, elaborate, and prioritize their requirements, and then surface and resolve issues".
- Finkelstein, A., Kramer, J., Nuseibeh, B., Finkelstein, L. & Goedicke, M. (1992). "Viewpoints: a framework for integrating multiple perspectives in system development." *Int. J. Software Engineering and Knowledge Engineering* 2(1):31–57 — [doi:10.1142/S0218194092000038](https://doi.org/10.1142/S0218194092000038) (✓Crossref). The VOSE framework uses "viewpoints" to partition the system specification, the development method and the formal representations.
- Easterbrook, S. & Nuseibeh, B. (1996). "Using ViewPoints for inconsistency management." *Software Engineering Journal* 11(1):31ff. — [doi:10.1049/sej.1996.0004](https://doi.org/10.1049/sej.1996.0004) (✓Crossref). From the abstract:
  - "a resolved inconsistency might not stay resolved as a specification evolves".
  - Tolerating inconsistency allows resolution to be delayed. A "complete work record" is kept of inconsistencies detected and actions taken.
  - "Inconsistency is used as a stimulus for eliciting missing information".
- Sommerville, I. & Sawyer, P. (1997). "Viewpoints: principles, problems and a practical approach to requirements engineering." *Annals of Software Engineering* 3(1):101–130 — [doi:10.1023/a:1018946223345](https://doi.org/10.1023/a:1018946223345) (✓Crossref). [S2 summary:] introduces the "Preview" viewpoint model and discusses how well it addresses the practical industrial problems of introducing new RE methods.
- ★ Nuseibeh, B., Easterbrook, S. & Russo, A. (2000). "Leveraging inconsistency in software development." *IEEE Computer* 33(4):24–29 — [doi:10.1109/2.839317](https://doi.org/10.1109/2.839317) (✓Crossref). From the abstract:
  - "maintaining consistency at all times is counterproductive"; inconsistency may be tolerated or even encouraged "to facilitate distributed team-work and prevent premature commitment to design decisions".
  - Inconsistency can be used "to highlight problem areas", to improve the team's "shared understanding", to "direct the process of requirements elicitation, and assist with verification and validation".
- van Lamsweerde, A., Darimont, R. & Letier, E. (1998). "Managing conflicts in goal-driven requirements engineering." *IEEE TSE* 24(11):908–926 — [doi:10.1109/32.730542](https://doi.org/10.1109/32.730542) (✓Crossref).
  - Defines the main types of inconsistency in one integrated framework.
  - Introduces "divergence", a frequent and weaker form of conflict.
  - Proposes formal techniques and heuristics to detect conflicts, and resolves them "by the introduction of new goals or by transforming the specifications" (KAOS method).
- Robinson, W. N., Pawlowski, S. D. & Volkov, V. (2003). "Requirements interaction management." *ACM Computing Surveys* 35(2):132–190 — [doi:10.1145/857076.857079](https://doi.org/10.1145/857076.857079) (✓Crossref).
  - Defines RIM as "the set of activities directed toward the discovery, management, and disposition of critical relationships among sets of requirements".
  - Provides an issues-based framework for reviewing the field and surveys seven exemplar research projects.
- Nuseibeh & Easterbrook (2000), section "Agreeing Requirements" (full text): describing the requirements explicitly is "a necessary precondition not only for validating requirements, but also for resolving conflicts between stakeholders". Negotiation models share one underlying theory: "identify the most important goals of each participant, and ensure these goals are met" — [Nuseibeh & Easterbrook 2000](https://doi.org/10.1145/336512.336523).
- IREB v3.3.0 §4.3 "Resolving Conflicts regarding Requirements" — [IREB v3.3.0](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf):
  - Tasks: "Conflict identification; Conflict analysis; Conflict resolution; Documentation of conflict resolution (decisions made)".
  - Conflict types (following Moore 2014): subject matter, data, interest, value, relationship, structural.
  - Resolution techniques: agreement, compromise, voting, overruling, definition of variants. Auxiliary techniques: consider-all-facts, plus-minus-interesting, decision matrix.
  - "all stakeholders must understand and agree on all requirements that are relevant to them".
- Ramesh, Cao & Baskerville (2010) found that "problems with customer inability and a lack of concurrence among customers" is one of two risks that agile RE practices cannot handle — [doi:10.1111/j.1365-2575.2007.00259.x](https://doi.org/10.1111/j.1365-2575.2007.00259.x) (full citation in Q6).
- NaPiRE found "Inconsistent requirements" cited as a critical problem by 44 of 228 respondents (19%) — [Méndez Fernández et al., arXiv preprint of the EMSE 2017 paper](https://arxiv.org/abs/1611.10288).

### Inferences
- Consensus: conflicts are normal and informative. The practical goal is to record conflicts and the decisions that resolve them (with rationale), not to force consistency at every moment. Expect previously resolved conflicts to reopen as requirements evolve (Easterbrook & Nuseibeh 1996).
- The evidence for WinWin rests mainly on USC student projects (15 teams) and experience reports (four generations of groupware). I found no controlled comparison showing it beats unstructured negotiation. Treat it as a mature method with modest empirical support.
- Formal conflict analysis (KAOS divergences, requirements interaction management) pays off mainly where requirements are already modelled formally, for example in critical systems. Mainstream practice looks like IREB's lightweight checklist.
- Practical guidance for a requirements specialist:
  - Record each stakeholder's goals and win conditions.
  - Log each conflict as an explicit issue with options, and record the decision.
  - Keep that record so impact analysis can find it when a requirement changes (links to traceability in Q5).

### Gaps
- No systematic review or meta-analysis of the effectiveness of negotiation or conflict-resolution techniques was found or opened.
- Current industrial use of WinWin/EasyWinWin tooling is unverified; it appears to be mostly historical or academic.

## Q3. How are requirements prioritised and scoped into releases?

### Takeaway
Prioritisation is the RE activity with the most techniques: one review identified 49. Yet the evidence is thin and comes mostly from small experiments.
- AHP-based pairwise comparison (Karlsson & Ryan 1997) is the most cited and is often rated most accurate, but it scales badly.
- Practitioner frameworks lean on simpler schemes: MoSCoW categories, Cost of Delay/WSJF economic sequencing, and continuous backlog ordering. These have little peer-reviewed evaluation in the sources I opened.
- Release planning is formalised as optimisation; the "next release problem" is NP-hard. There are many models but few validated at full scale in industry.
- In market-driven products, the typical failure is overscoping. Agile practices make it more manageable but do not eliminate it.

### Cited Findings
**Analytic / pairwise prioritisation**
- ★ Karlsson, J. & Ryan, K. (1997). "A cost-value approach for prioritizing requirements." *IEEE Software* 14(5):67–74 — [doi:10.1109/52.605933](https://doi.org/10.1109/52.605933) (✓Crossref).
  - The problem: "there are usually more requirements than you can implement given stakeholders' time and resource constraints".
  - The authors "developed a cost-value approach for prioritizing requirements and applied it to two commercial projects".
  - Achimugu et al. (2014), citing Wiegers, note that the cost-value framework "is also rooted in AHP" — [Achimugu et al. 2014](https://doi.org/10.1016/j.infsof.2014.02.001).
- Karlsson, J., Wohlin, C. & Regnell, B. (1998). "An evaluation of methods for prioritizing software requirements." *Information and Software Technology* 39(14–15):939–947 — [doi:10.1016/S0950-5849(97)00053-0](https://doi.org/10.1016/S0950-5849(97)00053-0) (✓Crossref). [S2 summary:] evaluated six methods on a telephony system and found AHP "the most promising method, although it may be problematic to scale-up".
- Berander, P. & Andrews, A. (2005). "Requirements prioritization." In A. Aurum & C. Wohlin (eds.), *Engineering and Managing Software Requirements*, Springer, pp. 69–94 — [doi:10.1007/3-540-28244-0_4](https://doi.org/10.1007/3-540-28244-0_4) (✓Crossref). This is the standard tutorial chapter; I could not open its content (see Gaps).
- ★ Achimugu, P., Selamat, A., Ibrahim, R. & Mahrin, M. N. (2014). "A systematic literature review of software requirements prioritization research." *Information and Software Technology* 56(6):568–585 — [doi:10.1016/j.infsof.2014.02.001](https://doi.org/10.1016/j.infsof.2014.02.001) (✓Crossref; read from a copy of the published article's abstract and results). Findings:
  - 73 primary studies: 13 journal articles, 35 conference papers, 8 workshop papers, 2 symposium papers, 13 book chapters and 2 IEEE bulletins.
  - "49 prioritization techniques were identified". AHP is "the most cited and cherished technique".
  - The "most used and eminent techniques" are AHP, binary search tree, planning game, cumulative voting, cost-value approach and QFD.
  - Limitations of existing techniques: "lack of scalability, methods of dealing with rank updates during requirements evolution, coordination among stakeholders and requirements dependency issues".
  - "the applicability of existing techniques in complex and real setting has not been reported yet".
  - Scalability: AHP, pairwise comparison and bubble sort need n(n−1)/2 comparisons, so doubling the number of requirements quadruples the effort.
- Bukhsh, F. A., Bukhsh, Z. A. & Daneva, M. (2020). "A systematic literature review on requirement prioritization techniques and their empirical evaluation." *Computer Standards & Interfaces* 69:103389 — [doi:10.1016/j.csi.2019.103389](https://doi.org/10.1016/j.csi.2019.103389) (✓Crossref). From the abstract:
  - Reviewed 102 papers published 2007–2019. Newer methods tend to build on fuzzy logic and machine learning.
  - Concludes that "the Analytical Hierarchy Process is the most accurate and extensively used requirement prioritization method in industry. However, scalability is still its major limitation".
  - Experiments were the most used research method.

**Categorical, satisfaction-based and economic schemes**
- Kano, N., Seraku, N., Takahashi, F. & Tsuji, S. (1984). "魅力的品質と当り前品質" ("Attractive quality and must-be quality"). *Hinshitsu* (Journal of the Japanese Society for Quality Control) 14(2), published 1984-04-15 — [doi:10.20684/quality.14.2_147](https://doi.org/10.20684/quality.14.2_147).
  - This DOI is registered with JaLC, not Crossref. I verified it through its doi.org handle record, which points to the J-STAGE page; the page's metadata match title, authors, volume, issue and date.
  - The paper is in Japanese.
  - IREB lists the "Kano model" among the key terms of its elicitation chapter — [IREB v3.3.0](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf).
- Agile Business Consortium, "MoSCoW Prioritisation", DSDM Project Framework (official page) — [agilebusiness.org](https://www.agilebusiness.org/dsdm-project-framework/moscow-prioritisation.html). The page says:
  - Must Haves "provide the Minimum Usable SubseT (MUST) of requirements which the project guarantees to deliver".
  - The test: if the answer to "what happens if this requirement is not met?" is "cancel the project", it is a Must Have.
  - Classing a requirement as Should or Could "does not mean it won't be delivered; simply that delivery is not guaranteed".
  - Recommended split: "typically no more than 60% Must Have effort", plus a Could Have pool of "typically around 20%" of effort as contingency.
  - "Levels of Must Have effort above 60% introduce a risk of failure", unless conditions such as accurate estimates hold.
- Reinertsen, D. G. (2009). *The Principles of Product Development Flow: Second Generation Lean Product Development*. Celeritas Publishing — [publisher site — UNVERIFIED (TLS certificate error on fetch)](https://www.celeritaspublishing.com/).
- Scaled Agile, Inc., "Weighted Shortest Job First", SAFe Knowledge Base — [framework.scaledagile.com/wsjf](https://framework.scaledagile.com/wsjf). The page:
  - Opens with Reinertsen's "If you only quantify one thing, quantify the Cost of Delay."
  - "WSJF is estimated as the relative cost of delay divided by the relative job duration."
  - "Backlogs are continuously prioritized based on a WSJF algorithm that uses relative user and business value, time criticality, risk reduction and/or opportunity enablement, and job size."
- IREB v3.3.0 §6.8 — [IREB v3.3.0](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf):
  - "Not all requirements are equally important" (citing Davis 2005). Assessment uses criteria "such as business value, urgency, effort, dependencies".
  - Steps: define goals and constraints, define criteria, define the stakeholders involved, define the requirements to prioritise, select the technique, then perform the prioritisation.
  - Techniques are classed as "ad-hoc" or "analytical".

**Release planning**
- ★ Ruhe, G. & Saliu, M. O. (2005). "The art and science of software release planning." *IEEE Software* 22(6):47–53 — [doi:10.1109/MS.2005.164](https://doi.org/10.1109/MS.2005.164) (✓Crossref). Release planning "addresses decisions related to selecting and assigning features to create a sequence of consecutive product releases that satisfies important technical, resource, budget, and risk constraints". The "art and science" framing of the title (human judgement plus formal decision support) is not verified beyond the abstract.
- Greer, D. & Ruhe, G. (2004). "Software release planning: an evolutionary and iterative approach." *Information and Software Technology* 46(4):243–253 — [doi:10.1016/j.infsof.2003.07.002](https://doi.org/10.1016/j.infsof.2003.07.002) (✓Crossref). [S2 summary:] the EVOLVE method allocates requirements to increments, handles conflicts with stakeholder priorities under precedence constraints, and supports continuous replanning.
- Bagnall, A. J., Rayward-Smith, V. J. & Whittley, I. M. (2001). "The next release problem." *Information and Software Technology* 43(14):883–890 — [doi:10.1016/S0950-5849(01)00194-X](https://doi.org/10.1016/S0950-5849(01)00194-X) (✓Crossref). The abstract states that selecting an optimal next release "is shown to be NP-hard" and compares modern heuristics. This is the origin of search-based release planning.
- Zhang, Y., Harman, M. & Mansouri, S. A. (2007). "The multi-objective next release problem." *GECCO 2007*, pp. 1129–1137 — [doi:10.1145/1276958.1277179](https://doi.org/10.1145/1276958.1277179) (✓Crossref). Argues the multi-objective form "is more realistic" because RE involves "many complex and conflicting demands", and gives evidence that NSGA-II suits the problem.
- Svahnberg, M., Gorschek, T., Feldt, R., Torkar, R., Saleem, S. B. & Shafique, M. U. (2010). "A systematic review on strategic release planning models." *Information and Software Technology* 52(3):237–248 — [doi:10.1016/j.infsof.2009.11.006](https://doi.org/10.1016/j.infsof.2009.11.006) (✓Crossref).
  - Found "Twenty four strategic release planning models".
  - "many methods fail to address factors such as stakeholder value or internal value".
  - There is a "need for further empirical validation of the models in full scale industry trials".

**Market-driven RE, triage and overscoping**
- Regnell, B. & Brinkkemper, S. (2005). "Market-driven requirements engineering for software products." In Aurum & Wohlin (eds.), *Engineering and Managing Software Requirements*, Springer, pp. 287–308 — [doi:10.1007/3-540-28244-0_13](https://doi.org/10.1007/3-540-28244-0_13) (✓Crossref). [S2 summary:] presents the key elements of market-driven RE processes, a definition of process quality, and typical solutions for progress tracking and data management.
- Karlsson, L., Dahlstedt, Å. G., Regnell, B., Natt och Dag, J. & Persson, A. (2007). "Requirements engineering challenges in market-driven software development – an interview study with practitioners." *Information and Software Technology* 49(6):588–604 — [doi:10.1016/j.infsof.2007.02.008](https://doi.org/10.1016/j.infsof.2007.02.008) (✓Crossref). [S2 summary:] challenges include "bridging communication gaps between marketing and development, selecting the right level of process support, basing the release plan on uncertain estimates, and managing the constant flow of requirements".
- Davis, A. M. (2003). "The art of requirements triage." *IEEE Computer* 36(3):42–49 — [doi:10.1109/mc.2003.1185216](https://doi.org/10.1109/mc.2003.1185216) (✓Crossref).
  - "Triage is the process of determining which requirements a product should satisfy given the time and resources available."
  - Driven by competitive markets, companies "add features and compress schedules", creating "a complete mismatch of requirements and resources".
  - Three case studies and 14 recommendations.
- ★ Bjarnason, E., Wnuk, K. & Regnell, B. (2012). "Are you biting off more than you can chew? A case study on causes and effects of overscoping in large-scale software engineering." *Information and Software Technology* 54(10):1107–1124 — [doi:10.1016/j.infsof.2012.04.006](https://doi.org/10.1016/j.infsof.2012.04.006) (✓Crossref; abstract read from Lund University's LUP repository record). From the abstract:
  - Method: semi-structured interviews with nine practitioners at a large market-driven company, validated by six other practitioners via a questionnaire.
  - Main cause: overscoping is "mainly caused by operating in a fast moving market-driven domain and how this ever-changing inflow of requirements is managed".
  - Contributing factors: "Weak awareness of overall goals, in combination with low development involvement in early phases".
  - Effects: "quality issues, delays and failure to meet customer expectations".
  - Agile: overscoping "occurs also when applying agile requirements engineering practices, though the overload is more manageable and perceived to result in less wasted effort when applying a continuous scope prioritization, in combination with gradual requirements detailing and a close cooperation within cross-functional teams".
- Wnuk, K., Regnell, B. & Karlsson, L. (2009). "What happened to our features? Visualization and understanding of scope change dynamics in a large-scale industrial setting." *RE'09*, pp. 89–98 — [doi:10.1109/RE.2009.32](https://doi.org/10.1109/RE.2009.32) (✓Crossref). "Effective scoping thus requires continuous assessment"; "feature survival charts" were implemented and evaluated in three projects.
- Racheva, Z., Daneva, M., Sikkel, K., Herrmann, A. & Wieringa, R. (2010). "Do we know enough about requirements prioritization in agile projects: insights from a case study." *RE'10*, pp. 147–156 — [doi:10.1109/RE.2010.27](https://doi.org/10.1109/RE.2010.27) (✓Crossref). In eight organisations, three assumptions of agile prioritisation did not hold everywhere: "(i) the driving role of the client in the value creation process, (ii) the prevailing position of business value as a main prioritization criterion, (iii) the role of the prioritization process for project goal achievement".

### Inferences
- Practical consensus:
  1. Make the criteria explicit (value, cost/effort, risk, urgency or time-criticality, dependencies) and name the stakeholders involved.
  2. Use ratio-scale pairwise methods such as AHP only for small sets or high-stakes decisions. Use grouping (MoSCoW) or economic sequencing (WSJF) for large backlogs.
  3. Revisit priorities as requirements evolve; rank updates are a known weakness of formal techniques.
  4. Protect contingency (DSDM caps Must Have effort at about 60%) to avoid overscoping.
- There is a research–practice gap. Research favours AHP and optimisation (NRP, EVOLVE, multi-objective search). Practitioner frameworks use MoSCoW and WSJF, which have little peer-reviewed evaluation in the sources I opened.
- The two reviews are in tension. Bukhsh et al. (2020) say AHP is "extensively used in industry", while Achimugu et al. (2014) report that applicability in complex real settings "has not been reported". Treat claims about industrial use cautiously.
- Kano (1984) adds a different dimension: satisfaction is asymmetric between must-be and attractive qualities. Kano classifies requirements rather than ranking them, so it complements cost-value ranking in product work.
- Scoping is continuous. Overscoping and triage failures come from the inflow of requirements, weak shared goals and late developer involvement, not from the choice of technique.

### Gaps
- I could not open Berander & Andrews (2005), so its taxonomy of prioritisation aspects and techniques is not cited here.
- I opened no peer-reviewed empirical evaluation of MoSCoW or WSJF, and found no reliable industry usage statistics for MoSCoW, WSJF or AHP.
- Karlsson & Ryan (1997): the full text was not opened, so its case-study results are not quantified here.
- Ruhe & Saliu (2005): its specific recommendations beyond the abstract are unverified.

## Q4. How are requirements validated?

### Takeaway
Validation checks that documented requirements reflect real stakeholder needs and agreement, not only that they are well formed internally. There are three families of technique:
1. Reviews and inspections (Fagan-style process plus reading techniques).
2. Exploratory techniques: prototyping, and in product settings alpha/beta tests, A/B tests and minimum viable products.
3. Executable requirements: acceptance tests.

What the evidence shows:
- **Robust:** in requirements inspections, inspection meetings add no net defect detection (meeting gains are offset by losses). This held in the original experiment and in replications.
- **Contested:** claims that scenario- or perspective-based reading beats checklists. Replications are mixed and a meta-analysis found no clear advantage, with signs of researcher bias.
- **Prototyping vs specifying:** in one classic experiment, prototyping gave smaller products with less effort, while specifying gave more coherent designs.
- **Acceptance tests:** in small student experiments, acceptance tests (Fit tables) helped people understand requirements.
- **Industry:** studies say alignment between requirements and testing depends mostly on communication, traceability and change control.

### Cited Findings
- IREB v3.3.0 §4.4 and Principle 6 — [IREB v3.3.0](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf):
  - "Validating requirements means checking the work products at hand as well as the individual requirements in it for quality".
  - Principle 6 says validation checks whether "Agreement about the requirements has been achieved among the stakeholders", whether needs "are adequately covered", and whether the "context assumptions… are reasonable"; and that "validation of requirements must start already during RE".
  - Important aspects: "Involvement of the right stakeholders; Separating the identification and the correction of defects; Validation from different views; Repeated validation".
  - Techniques: review techniques (walkthroughs, inspections); exploratory techniques (prototyping, alpha and beta testing, A/B testing, building an MVP); and sample development.
  - The choice "depends on factors such as the software development life cycle model, the maturity of the development process, the complexity and risk level of the system, any legal or regulatory requirements, and/or the need for an audit trail."
- Nuseibeh & Easterbrook (2000), full text — [Nuseibeh & Easterbrook 2000](https://doi.org/10.1145/336512.336523):
  - Inspection and formal analysis "concentrate on the coherence of the requirements descriptions" (consistency, structural completeness); the SCR tool, for example, automatically checks syntactic consistency and completeness.
  - In contrast, prototyping, specification animation and scenarios are "geared towards testing a correspondence with the real world problem".
- Fagan, M. E. (1976). "Design and code inspections to reduce errors in program development." *IBM Systems Journal* 15(3):182–211 — [doi:10.1147/sj.153.0182](https://doi.org/10.1147/sj.153.0182) (✓Crossref).
  - Defines inspection operations (overview, preparation, inspection, rework, follow-up) with exit criteria.
  - Errors are classified by type, and inspection results are used for process improvement and control.
  - Note: the 1976 paper is about design and code; requirements inspections later adapted the process.
- ★ Porter, A. A., Votta, L. G. & Basili, V. R. (1995). "Comparing detection methods for software requirements inspections: a replicated experiment." *IEEE TSE* 21(6):563–575 — [doi:10.1109/32.391380](https://doi.org/10.1109/32.391380) (✓Crossref). [Evidence: controlled experiment; 48 graduate students in sixteen three-person teams]
  - "the Scenario method had a higher fault detection rate than either Ad Hoc or Checklist methods".
  - "Checklist reviewers were no more effective than Ad Hoc reviewers".
  - "Collection meetings produced no net improvement in the fault detection rate — meeting gains were offset by meeting losses."
- Fusaro, P., Lanubile, F. & Visaggio, G. (1997). "A replicated experiment to assess requirements inspection techniques." *Empirical Software Engineering* 2(1):39–57 — [doi:10.1023/A:1009742216007](https://doi.org/10.1023/A:1009742216007) (✓Crossref). [S2 summary:] this independent replication "confirmed one result of the original experiment: the defect detection rate is not improved by collection meetings". My inference: the advantage of scenarios was not reproduced.
- Miller, J., Wood, M. & Roper, M. (1998). "Further experiences with scenarios and checklists." *Empirical Software Engineering* 3(1):37–64 — [doi:10.1023/A:1009735805377](https://doi.org/10.1023/A:1009735805377) (✓Crossref). [S2 summary:] "broadly supportive" of the original: the Scenario approach beat the Checklist approach, and the meeting was not an effective detection mechanism.
- Basili, V. R., Green, S., Laitenberger, O., Lanubile, F., Shull, F., Sørumgård, S. & Zelkowitz, M. V. (1996). "The empirical investigation of perspective-based reading." *Empirical Software Engineering* 1(2):133–164 — [doi:10.1007/BF00368702](https://doi.org/10.1007/BF00368702) (✓Crossref). [S2 summary:] teams applying perspective-based reading (PBR) achieved significantly better coverage of documents.
- Shull, F., Rus, I. & Basili, V. (2000). "How perspective-based reading can improve requirements inspections." *IEEE Computer* 33(7):73–79 — [doi:10.1109/2.869376](https://doi.org/10.1109/2.869376) (✓Crossref). "PBR reviewers stand in for specific stakeholders"; the technique "leads to improved defect detection rates for both individual reviewers and review teams working with unfamiliar application domains".
- Regnell, B., Runeson, P. & Thelin, T. (2000). "Are the perspectives really different? Further experimentation on scenario-based reading of requirements." *Empirical Software Engineering* 5(4):331–356 — [doi:10.1023/A:1009848320066](https://doi.org/10.1023/A:1009848320066) (✓Crossref). [S2 summary:] combining multiple perspectives "may not give higher coverage of the defects compared to single-perspective reading".
- Ciolkowski, M. (2009). "What do we know about perspective-based reading? An approach for quantitative aggregation in software engineering." *ESEM 2009*, pp. 133–144 — [doi:10.1109/ESEM.2009.5316026](https://doi.org/10.1109/ESEM.2009.5316026) (✓Crossref). From the abstract:
  - "there is no clear positive effect of PBR: Inspection teams using PBR on requirements documents are more effective when compared to ad-hoc approaches, but are less effective when compared to checklists."
  - "we found strong indicators of researcher bias."
- ★ Boehm, B. W., Gray, T. E. & Seewaldt, T. (1984). "Prototyping versus specifying: a multiproject experiment." *IEEE TSE* SE-10(3):290–303 — [doi:10.1109/tse.1984.5010238](https://doi.org/10.1109/tse.1984.5010238) (✓Crossref). [Evidence: seven teams built the same small product of 2,000–4,000 source instructions; four specified, three prototyped]
  - Prototyping "yielded products with roughly equivalent performance, but with about 40 percent less code and 45 percent less effort".
  - Prototyped products "rated somewhat lower on functionality and robustness, but higher on ease of use and ease of learning".
  - "Specifying produced more coherent designs and software that was easier to integrate."
- Melnik, G., Read, K. & Maurer, F. (2004). "Suitability of FIT user acceptance tests for specifying functional requirements: developer perspective." *XP/Agile Universe 2004*, LNCS, pp. 60–72 — [doi:10.1007/978-3-540-27777-4_7](https://doi.org/10.1007/978-3-540-27777-4_7) (✓Crossref). [S2 summary:] an experiment in two academic settings in which FIT tests served as the functional requirements specification.
- Melnik, G., Maurer, F. & Chiasson, M. (2006). "Executable acceptance tests for communicating business requirements: customer perspective." *AGILE 2006*, pp. 35–46 — [doi:10.1109/AGILE.2006.26](https://doi.org/10.1109/AGILE.2006.26) (✓Crossref). From the abstract:
  - "customers, partnered with an IT professional, are able to use executable acceptance test (storytest)-based specifications to communicate and validate functional business requirements".
  - However, "an average customer may experience difficulties learning the technique".
- Ricca, F., Torchiano, M., Di Penta, M., Ceccato, M. & Tonella, P. (2009). "Using acceptance tests as a support for clarifying requirements: a series of experiments." *Information and Software Technology* 51(2):270–283 — [doi:10.1016/j.infsof.2008.01.007](https://doi.org/10.1016/j.infsof.2008.01.007) (✓Crossref). [S2 summary:] "Fit helps in the understanding of requirements without requiring a significant additional effort." The subjects were students; sample sizes are unverified.
- ★ Bjarnason, E., Runeson, P., Borg, M., Unterkalmsteiner, M., Engström, E., Regnell, B., Sabaliauskaite, G., Loconsole, A., Gorschek, T. & Feldt, R. (2014). "Challenges and practices in aligning requirements with verification and validation: a case study of six companies." *Empirical Software Engineering* 19(6):1809–1855 — [doi:10.1007/s10664-013-9263-y](https://doi.org/10.1007/s10664-013-9263-y) (✓Crossref; arXiv preprint 2307.12489 also exists). From the abstract:
  - Method: interviews with 30 practitioners from 6 companies.
  - Weak alignment, for example "weak communication of requirements changes to testers", may result in "lack of verification of new requirements and incorrect verification of old invalid requirements".
  - Challenges range from the quality of RE and V&V activities, "through tracing and tools, to change control and sharing a common understanding at strategy, goal and design level".
  - "human aspects are central, i.e. cooperation and communication, and… requirements engineering practices are a critical basis for alignment".
  - Organisation size and motivation (e.g., "external enforcement of traceability") are key variation factors.

### Inferences
- **Robust guidance:** review and inspect requirements, but rely on individual preparation for finding defects. Use meetings for agreement and decisions rather than detection; meeting losses offset gains in Porter 1995 and in both replications.
- **Contested guidance:**
  - The positive results for scenario/PBR reading came largely from the originating research groups.
  - Independent replications are mixed (Fusaro 1997 did not reproduce the advantage; Miller 1998 broadly did).
  - A meta-analysis found no clear advantage over checklists and flagged researcher bias (Ciolkowski 2009).
  - Pragmatic reading: assigning reviewers stakeholder perspectives (user, tester, designer) helps ensure coverage and stakeholder involvement, but it is not a proven defect-detection booster.
- **Validation has two sides.** Internal quality (inspection, formal checking) and correspondence with the real-world problem (prototypes, acceptance tests, user and market feedback) are complementary. Boehm et al. (1984) show the trade-off: prototype where usability or uncertainty dominates; specify where integration and design coherence matter.
- **Acceptance tests as requirements** (Fit storytests; today's Gherkin/BDD scenarios are the same idea) double as validation artefacts and traceable test oracles. The evidence is small, mostly academic experiments, with a known learnability cost for customers.

### Gaps
- Most inspection data come from students. I opened no large industrial controlled study of requirements-inspection effectiveness.
- Ricca et al. (2009): exact sample sizes and effect sizes are unverified (abstract paywalled; S2 summary only).
- I opened no peer-reviewed industrial evidence on BDD/Gherkin used as requirements, or on A/B testing or MVPs as requirements validation, even though IREB lists them.

## Q5. How are requirements managed over time (traceability, change, volatility)?

### Takeaway
Requirements management means storing, versioning, baselining, tracing and changing requirements.
- **Traceability.**
  - Gotel & Finkelstein (1994) framed the core problem by distinguishing traceability before the requirements specification (pre-RS: origins and rationale) from traceability after it (post-RS: design, code, tests).
  - Ramesh & Jarke (2001) produced empirical reference models.
  - Regulators and certification bodies mandate traceability in safety-critical domains, yet it is often done ad hoc and after the fact.
  - Two controlled experiments by the same group show it makes maintenance faster and more correct (Mäder & Egyed).
- **Change and volatility.**
  - Change is normal (IREB Principle 7).
  - It is driven by markets, organisations and developers' growing understanding, and it hurts schedule and cost.
  - It is handled by change control boards in linear processes, or by reprioritising the backlog in iterative ones.
  - Communication gaps across the life cycle are a major reason requirements "slip".

### Cited Findings
**Traceability**
- IREB v3.3.0 §6.1–6.7 — [IREB v3.3.0](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf):
  - Requirements management "includes storing, changing, and tracing requirements".
  - A baseline is "a stable, change-controlled configuration of work products, used for release planning or other delivery milestones".
  - Traceability is "the ability to trace a requirement back to its origin (i.e., stakeholders, documents, justifications, etc.) and forward to subsequent work products (e.g., test cases), as well as to other requirements that this requirement depends on". It "is often explicitly demanded by standards, laws and regulations".
  - Traceability can be implicit (through structured work products) or explicit (links via IDs, shown as "hyperlinks, references, matrices, tables, or graphs").
- ★ Gotel, O. C. Z. & Finkelstein, A. C. W. (1994). "An analysis of the requirements traceability problem." *Proc. 1st IEEE Int. Conf. on Requirements Engineering (ICRE'94)*, Colorado Springs, pp. 94–101 — [doi:10.1109/ICRE.1994.292398](https://doi.org/10.1109/ICRE.1994.292398) (✓Crossref title match; the Crossref record has no year field; the year 1994 is confirmed by IREB's reference list).
  - Based on "empirical studies, involving over 100 practitioners".
  - Introduces the distinction between pre-RS and post-RS traceability, to show "why an all-encompassing solution to the problem is unlikely".
  - Finds that "the majority of the problems attributed to poor requirements traceability are due to inadequate pre-RS traceability".
- Ramesh, B. & Jarke, M. (2001). "Toward reference models for requirements traceability." *IEEE TSE* 27(1):58–93 — [doi:10.1109/32.895989](https://doi.org/10.1109/32.895989) (✓Crossref).
  - Focus groups and interviews in 26 major software development organisations "demonstrate a wide range of traceability practices with distinct low-end and high-end users of traceability".
  - Synthesises reference models, validated in case studies and built into traceability tools.
  - Identifies "Four kinds of traceability link types".
- Cleland-Huang, J., Gotel, O. C. Z., Huffman Hayes, J., Mäder, P. & Zisman, A. (2014). "Software traceability: trends and future directions." *FOSE 2014 (ICSE)*, pp. 55–69 — [doi:10.1145/2593882.2593891](https://doi.org/10.1145/2593882.2593891) (✓Crossref). From the abstract:
  - Traceability is "Required in safety-critical systems by many certifying bodies, such as the USA Federal Aviation Authority".
  - "In practice, traceability is often conducted in an ad-hoc, after-the-fact manner and, therefore, its benefits are not always fully realized."
  - Research directions: tooling, strategic planning, information-retrieval techniques that semi-automate trace creation and maintenance, trace query languages, visualisation, and domains such as model-driven development, product lines and agile projects.
- ★ Mäder, P. & Egyed, A. (2015). "Do developers benefit from requirements traceability when evolving and maintaining a software system?" *Empirical Software Engineering* 20(2):413–441 — [doi:10.1007/s10664-014-9314-z](https://doi.org/10.1007/s10664-014-9314-z) (✓Crossref).
  - [S2 summary of the abstract, from the [Semantic Scholar record](https://api.semanticscholar.org/graph/v1/paper/DOI:10.1007/s10664-014-9314-z?fields=title,year,tldr):] a controlled experiment with 71 subjects re-performing real maintenance tasks on two third-party projects. With traceability, subjects were "on average 24% faster" and "created on average 50% more correct solutions".
- Mäder, P. & Egyed, A. (2012). "Assessing the effect of requirements traceability for software maintenance." *ICSM 2012* — [doi:10.1109/icsm.2012.6405269](https://doi.org/10.1109/icsm.2012.6405269) (✓Crossref). This is the earlier conference version (abstract opened via OpenAlex):
  - 52 subjects, half the tasks with and half without traceability.
  - With traceability, subjects "performed on average 21% faster on a task and created on average 60% more correct solutions".
  - It also notes "there exists no published evaluation about the usefulness of requirements traceability" before this study.
- Mäder, P., Jones, P. L., Zhang, Y. & Cleland-Huang, J. (2013). "Strategic traceability for safety-critical projects." *IEEE Software* 30(3):58–66 — [doi:10.1109/MS.2013.60](https://doi.org/10.1109/MS.2013.60) (✓Crossref).
  - Evaluated the traceability information in 10 submissions to the US FDA and found "nine widespread traceability problems that affected regulators' ability to evaluate the product's safety in a timely manner".
  - Offers guidelines for "strategic traceability".
- Maro, S., Steghöfer, J.-P. & Staron, M. (2018). "Software traceability in the automotive domain: challenges and solutions." *Journal of Systems and Software* 141:85–110 — [doi:10.1016/j.jss.2018.03.060](https://doi.org/10.1016/j.jss.2018.03.060) (✓Crossref).
  - ISO 26262 and similar standards "require established traceability".
  - The reviews found "22 challenges and 16 unique solutions"; "17 challenges were identified in the case study; six remain unsolved".
- Borg, M., Runeson, P. & Ardö, A. (2014). "Recovering from a decade: a systematic mapping of information retrieval approaches to software traceability." *Empirical Software Engineering* 19(6):1565–1616 — [doi:10.1007/s10664-013-9255-y](https://doi.org/10.1007/s10664-013-9255-y) (✓Crossref). [S2 summary:] a mapping of IR-based trace recovery focused on evaluations and strength of evidence. It concludes that the quality of reporting (context, tool details, measures, IR terminology) should improve.
- In Wagner et al.'s (2019) family of surveys of 228 organisations in 10 countries, "traces between requirements and code or design documents are common" and "requirements specifications themselves are rarely changed" — [doi:10.1145/3306607](https://doi.org/10.1145/3306607) (full citation in Q6).

**Change, volatility and creep**
- Jones, C. (1996). "Strategies for managing requirements creep." *IEEE Computer* 29(6):92–94 — [doi:10.1109/2.507640](https://doi.org/10.1109/2.507640) (✓Crossref). From the abstract of this three-page column:
  - "The root cause of requirements volatility is that many applications are attempting to automate domains that are only partly understood."
  - "although creeping requirements are troublesome, they are often a technical necessity."
- Zowghi, D. & Nurmuliani, N. (2002). "A study of the impact of requirements volatility on software project performance." *APSEC 2002*, pp. 3–11 — [doi:10.1109/APSEC.2002.1182970](https://doi.org/10.1109/APSEC.2002.1182970) (✓Crossref). [Evidence: survey]
  - Requirements volatility "has a significant impact on schedule overrun and cost overrun".
  - "frequent communications between users and developers and usage of a definable methodology in requirements analysis and modeling have impact on the stability of requirements".
- Nurmuliani, N., Zowghi, D. & Powell, S. [author spelling as listed in Crossref] (2004). "Analysis of requirements volatility during software development life cycle." *ASWEC 2004*, pp. 28–37 — [doi:10.1109/ASWEC.2004.1290455](https://doi.org/10.1109/ASWEC.2004.1290455) (✓Crossref). [Evidence: industrial case study, causal analysis of change requests]
  - Main causes were "changes in customer needs (or market demands), developers' increased understanding of the products, and changes in the organization policy".
  - Volatility was "high at the time of requirements specification completion and while functional specification reviews were conducted".
- McGee, S. & Greer, D. (2012). "Towards an understanding of the causes and effects of software requirements change: two case studies." *Requirements Engineering* 17(2):133–155 — [doi:10.1007/s00766-012-0149-0](https://doi.org/10.1007/s00766-012-0149-0) (✓Crossref).
  - Proposes a change-source taxonomy: market, organisation, vision, specification, solution.
  - Changes with higher cost and value "arose more often from 'organisation' and 'vision' sources" and were "less controllable".
  - "only 'requirements dependency' is consistently correlated with volatility"; "a single requirement attribute is insufficient for change prediction".
- Jayatilleke, S. & Lai, R. (2018). "A systematic review of requirements change management." *Information and Software Technology* 93:163–185 — [doi:10.1016/j.infsof.2017.09.004](https://doi.org/10.1016/j.infsof.2017.09.004) (✓Crossref). Reviews the causes of change, the processes and techniques used to manage it, and how organisations make change decisions. Notes that prior work shows "failing to manage software requirements changes well is a main contributor to project failure".
- Bjarnason, E., Wnuk, K. & Regnell, B. (2011). "Requirements are slipping through the gaps — a case study on causes & effects of communication gaps in large-scale software development." *RE'11*, pp. 37–46 — [doi:10.1109/RE.2011.6051639](https://doi.org/10.1109/RE.2011.6051639) (✓Crossref).
  - Interviews with nine practitioners at a large market-driven company found "four main factors that affect the requirements communication, namely scale, temporal aspects, common views and decision structures".
  - Communication gaps lead to "failure to meet the customers' expectations, quality issues and wasted effort".
- IREB v3.3.0 §6.7 and Principle 7 — [IREB v3.3.0](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf):
  - Changes are handled "by creating a formal change request, or by adding a new item to the product backlog".
  - "In a linear approach, the decision on a change is often taken by a Change Control Board (in projects) or a Change Advisory Board (in operation). In a more iterative approach, the product owner includes the change in the product backlog and prioritizes the new item accordingly."
  - Principle 7 lists causes of change: changed business processes, competitors, clients' changing priorities, technology, laws or regulations, and user feedback.
- In NaPiRE, "Moving targets (changing goals, business processes and / or requirements)" was cited as critical by 76 of 228 respondents (33%). It "is faced by all plan-driven but also large agile organisations" — [Méndez Fernández et al., arXiv preprint](https://arxiv.org/abs/1611.10288).
- Damian & Chisan (2006): an effective RE process at the start of the project led to improvements that included "managing feature creep" — [doi:10.1109/tse.2006.61](https://doi.org/10.1109/tse.2006.61) (full citation in Q6).

### Inferences
- **Traceability now has experimental support.** Two controlled experiments (52 and 71 subjects, same research group) show large gains in maintenance speed and correctness; independent replication would strengthen this. Combined with the evidence on cost and ad-hoc practice (Cleland-Huang 2014; Mäder 2013), the consensus favours *strategic*, purpose-driven traceability: decide which questions the traces must answer (impact analysis, test coverage, compliance), then trace only that.
- **Pre-RS traceability is still the weak spot.** Recording origins, rationale and decisions is the part a requirements specialist owns, and Gotel & Finkelstein locate most traceability problems there.
- **Volatility should be expected, not frozen out.** The levers are:
  - baselines;
  - trace-based impact analysis;
  - explicit decision rights for change (a change control board or the product owner);
  - frequent communication between users and developers.
- **Jones (1996)** is often cited, but it is a three-page opinion column with no data in its abstract. It is canonical as a framing, minor as evidence. The substantive empirical work is Zowghi & Nurmuliani (2002), Nurmuliani et al. (2004), McGee & Greer (2012) and NaPiRE.

### Gaps
- Mäder & Egyed (2015): I could not open the abstract directly (Springer bot-wall). The 71/24%/50% figures rely on Semantic Scholar's summary; they match the direction of the verified ICSM 2012 abstract (52 subjects, 21%, 60%).
- I opened no source giving reliable quantitative volatility rates (e.g., percentage of requirements changed per month), so none are stated.
- No source opened on the current tool market for requirements management or tracing, or on how widely automated tracing is adopted in industry.

## Q6. How much of this process is needed in different contexts, and what does practice look like today?

### Takeaway
The consensus is to tailor the effort and formality of RE to the context. The main factors are criticality and risk, regulation and contracts, stakeholder availability, and volatility.
- **Regulated and safety-critical work** uses more linear, prescriptive specification, with intensive validation, baselines and traceability from end to end. Standards bodies and regulators demand this, yet audits still find weak traceability.
- **Market-oriented web and product work** uses iterative, explorative RE. Analysis, prioritisation and validation happen continuously through backlog refinement, WSJF-style ordering and user feedback.

Global surveys show the same top problems in both worlds:
- incomplete or hidden requirements;
- communication flaws with the customer;
- moving targets;
- underspecified requirements.

Agile RE brings its own risks: customers who are unavailable or disagree, neglected quality requirements, and difficulty at scale.

### Cited Findings
**Tailoring guidance**
- IREB v3.3.0 §5 — [IREB v3.3.0](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf):
  - **Influencing factors:** overall process fit, development context, stakeholder capability and availability, shared understanding, "Complexity and criticality of the system", constraints, time and budget, "Volatility of requirements", and the experience of requirements engineers.
  - **Three facets** for configuring the process: time (linear vs. iterative), purpose (prescriptive vs. explorative), target (customer-specific vs. market-oriented). These draw on Glinz's 2019 course notes.
  - **Linear criteria** include: "Regulatory authorities require a comprehensive, formally released requirements specification at an early stage", and the specification is needed "as a contractual basis for outsourcing".
  - **Iterative criteria** include: "Many requirements are not known up front, but will emerge and evolve during the development of the system".
  - **Caveats:**
    - "Linear RE processes work only if a sophisticated process for changing requirements is in place"
    - "Linear RE processes imply long feedback loops: To mitigate the risk of developing the wrong system, requirements must be validated intensively"
    - "In a market-oriented process, feedback from users is the only means of validating whether the product will actually satisfy the needs of the targeted user segment"
    - "The market-oriented facet does not combine well with the linear and prescriptive facets"
  - **Three typical configurations:**
    - *Participatory* (iterative, explorative, customer-specific): product backlog with user stories, prototypes.
    - *Contractual* (typically linear, prescriptive, customer-specific): a "Classic system requirements specification".
    - *Product-oriented* (iterative, explorative, market-oriented): product backlog, prototypes.
  - Regulation may require a process that conforms to ISO/IEC/IEEE 29148. IREB recommends a five-step configuration procedure.
  - The criteria "are heuristics rather than fixed rules".
- Boehm, B. (2002). "Get ready for agile methods, with care." *IEEE Computer* 35(1):64–69 — [doi:10.1109/2.976920](https://doi.org/10.1109/2.976920) (✓Crossref). From the abstract:
  - Agile and plan-driven methods each have "a home ground within which it performs very well, and much better than the other".
  - "overresponding to change has been cited as the source of many software disasters, such as the $3 billion overrun of the US Federal Aviation Administration's Advanced Automation System".
  - "a combined approach is feasible and preferable in some circumstances".
- Glinz, M. (2008). "A risk-based, value-oriented approach to quality requirements." *IEEE Software* 25(2):34–41 — [doi:10.1109/MS.2008.31](https://doi.org/10.1109/MS.2008.31) (✓Crossref). Chooses how to represent quality requirements "on the basis of assessing risk instead of quantifying everything". This is the risk-proportionality principle applied to specification depth.

**Agile and large-scale RE**
- Cao, L. & Ramesh, B. (2008). "Agile requirements engineering practices: an empirical study." *IEEE Software* 25(1):60–67 — [doi:10.1109/MS.2008.1](https://doi.org/10.1109/MS.2008.1) (✓Crossref). "An analysis of data from 16 software development organizations reveals seven agile RE practices, along with their benefits and challenges."
- Ramesh, B., Cao, L. & Baskerville, R. (2010). "Agile requirements engineering practices and challenges: an empirical study." *Information Systems Journal* 20(5):449–480 — [doi:10.1111/j.1365-2575.2007.00259.x](https://doi.org/10.1111/j.1365-2575.2007.00259.x) (✓Crossref).
  - 16 US organisations; six agile practices and seven challenges.
  - Two risks that agile RE practices cannot resolve: "customer inability and a lack of concurrence among customers", and "neglecting non-functional requirements such as security and scalability".
  - "Developers should carefully evaluate the risk factors in their project environment".
- Inayat, I., Salim, S. S., Marczak, S., Daneva, M. & Shamshirband, S. (2015). "A systematic literature review on agile requirements engineering practices and challenges." *Computers in Human Behavior* 51:915–929 — [doi:10.1016/j.chb.2014.10.046](https://doi.org/10.1016/j.chb.2014.10.046) (✓Crossref). [S2 summary:] more empirical results are needed, for example on non-functional requirements and self-organising teams.
- Kasauli, R., Knauss, E., Horkoff, J., Liebel, G. & de Oliveira Neto, F. G. (2021). "Requirements engineering challenges and practices in large-scale agile system development." *Journal of Systems and Software* 172:110851 — [doi:10.1016/j.jss.2020.110851](https://doi.org/10.1016/j.jss.2020.110851) (✓Crossref). From the abstract:
  - In large systems companies, RE "involves upfront and detailed analysis which can be at odds with agile development methods".
  - Method: seven companies; 20 interviews, five focus groups and eight cross-company workshops.
  - Found "24 challenges which we grouped in six themes", mapped to solutions from SAFe, LeSS and the companies.

**Safety-critical RE**
- Martins, L. E. G. & Gorschek, T. (2016). "Requirements engineering for safety-critical systems: a systematic literature review." *Information and Software Technology* 75:71–89 — [doi:10.1016/j.infsof.2016.04.002](https://doi.org/10.1016/j.infsof.2016.04.002) (✓Crossref). [S2 summary:] calls for more industry-oriented studies with practitioners involved in validating new approaches, and notes a lack of studies on improving communication across the life cycle.
- See also, in Q5: Cleland-Huang et al. (2014) on FAA-mandated traceability, Mäder et al. (2013) on traceability problems in FDA submissions, and Maro et al. (2018) on ISO 26262 traceability.

**Practice surveys and payoff studies**
- ★ Méndez Fernández, D., Wagner, S., Kalinowski, M., Felderer, M., Mafra, P., Vetrò, A., Conte, T., et al. (23 authors) (2017). "Naming the pain in requirements engineering: contemporary problems, causes, and effects in practice." *Empirical Software Engineering* 22(5):2298–2338 — [doi:10.1007/s10664-016-9451-7](https://doi.org/10.1007/s10664-016-9451-7) (✓Crossref).
  - From the abstract: data from "228 companies working in 10 countries"; 21 problems analysed.
  - Top critical problems (Table 9 of the [arXiv preprint](https://arxiv.org/abs/1611.10288)):

    | Problem | Respondents citing it |
    |---|---|
    | Incomplete and/or hidden requirements | 109 (48%) |
    | Communication flaws between project team and customer | 93 (41%) |
    | Moving targets | 76 (33%) |
    | Underspecified requirements that are too abstract | 76 (33%) |
    | Time boxing / not enough time | 72 (32%) |
    | Communication flaws within the project team | 62 (27%) |
    | Inconsistent requirements | 44 (19%) |

  - Communication flaws with the customer occur less often than incomplete requirements but are "meant to lead more often to project failure"; likewise, moving targets lead more often to failure than underspecified requirements.
- Wagner, S., Méndez Fernández, D., Felderer, M., et al. (2019). "Status quo in requirements engineering: a theory and a global family of surveys." *ACM TOSEM* 28(2):1–48 — [doi:10.1145/3306607](https://doi.org/10.1145/3306607) (✓Crossref). From the abstract (228 organisations, 10 countries):
  - "there are no strong differences between organisations in different countries and regions";
  - "requirements are often documented textually";
  - "traces between requirements and code or design documents are common";
  - "requirements specifications themselves are rarely changed";
  - RE improvement efforts are "mostly internally driven".
- Damian, D. & Chisan, J. (2006). "An empirical study of the complex relationships between requirements engineering processes and other processes that lead to payoffs in productivity, quality, and risk management." *IEEE TSE* 32(7):433–453 — [doi:10.1109/tse.2006.61](https://doi.org/10.1109/tse.2006.61) (✓Crossref). [Evidence: 30-month case study of a large project undergoing RE process improvement]
  - "an effective requirements process at the beginning of the project had positive outcomes throughout the project lifecycle".
  - The outcomes included "improvements in project negotiation, project planning, and managing feature creep, testing, defects, rework, and product quality".
- Sawyer, P., Sommerville, I. & Viller, S. (1999). "Capturing the benefits of requirements engineering." *IEEE Software* 16(2):78–85 — [doi:10.1109/52.754057](https://doi.org/10.1109/52.754057) (✓Crossref). A method for "incremental, systematic improvement of requirements engineering" that builds on existing software process improvement models and standards.

**Today's practice: the backlog as continuous analysis and prioritisation**
- Schwaber, K. & Sutherland, J. *The Scrum Guide* (November 2020 version; the official HTML page still states it is "a direct port of the November 2020 version") — [scrumguides.org](https://scrumguides.org/scrum-guide.html).
  - "Product Backlog refinement is the act of breaking down and further defining Product Backlog items into smaller more precise items. This is an ongoing activity to add details, such as a description, order, and size."
  - Items that can be Done within one Sprint "are deemed ready for selection… They usually acquire this degree of transparency after refining activities."
- Sedano, T., Ralph, P. & Péraire, C. (2019). "The product backlog." *ICSE 2019*, pp. 200–211 — [doi:10.1109/ICSE.2019.00036](https://doi.org/10.1109/ICSE.2019.00036) (✓Crossref).
  - Method: two years and five months of participant observation of eight projects at Pivotal; 56 interviews; a survey of 27 product designers.
  - Found "13 practices and 6 obstacles" related to generating the backlog.
  - The product backlog "is simultaneously a model of work to be done and a boundary object". It emerges from "sensemaking" and "coevolution" of problem understanding and solution concepts.
- SAFe applies WSJF so that "Backlogs are continuously prioritized" — [SAFe WSJF](https://framework.scaledagile.com/wsjf). IREB §6.7 says that in iterative approaches the product owner adds changes to the backlog and prioritises them — [IREB v3.3.0](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf).

#### Shortlist: the 15 most important works for this subtopic
1. **Royce (1970) → Boehm (1988)** ([Larman & Basili 2003](https://doi.org/10.1109/MC.2003.1204375); [Boehm 1988](https://doi.org/10.1109/2.59)). Royce is the origin of "waterfall" yet recommended doing it twice. Boehm's spiral made iteration risk-driven, the basis for scaling RE depth to risk.
2. **Nuseibeh & Easterbrook (2000)** ([doi](https://doi.org/10.1145/336512.336523)). The canonical map of RE (eliciting, modelling/analysing, communicating, agreeing, evolving). It explains why validation is philosophically and socially hard.
3. **IREB CPRE FL syllabus v3.3.0 (2026)** ([PDF](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf)). The current, maintained practitioner model: four major tasks; analysis and conflict resolution inside elicitation; prioritisation, traceability and change under management; explicit facets for tailoring the process. I recommend it over textbook models such as Kotonya & Sommerville (1998) as the reference activity model.
4. **Boehm et al. (1998), WinWin spiral** ([doi](https://doi.org/10.1109/2.689675)). Builds stakeholder win-win negotiation into each spiral cycle. Boehm, Grünbacher & Briggs (2001) and EasyWinWin turned it into groupware.
5. **Nuseibeh, Easterbrook & Russo (2000)** ([doi](https://doi.org/10.1109/2.839317)). Tolerate and exploit inconsistency rather than enforce constant consistency. It is the practical result of the viewpoints research (Finkelstein et al. 1992).
6. **Karlsson & Ryan (1997)** ([doi](https://doi.org/10.1109/52.605933)). Cost-value prioritisation using AHP; the prototype of analytic prioritisation.
7. **Achimugu et al. (2014)** ([doi](https://doi.org/10.1016/j.infsof.2014.02.001)), updated by **Bukhsh et al. (2020)** ([doi](https://doi.org/10.1016/j.csi.2019.103389)). The evidence map: 49 techniques, AHP dominant, scalability limits, and a lack of real-world validation.
8. **Ruhe & Saliu (2005)** ([doi](https://doi.org/10.1109/MS.2005.164)), with **Bagnall et al. (2001)** ([doi](https://doi.org/10.1016/S0950-5849(01)00194-X)). Release planning as constrained optimisation plus judgement; the next release problem is NP-hard.
9. **Bjarnason, Wnuk & Regnell (2012)** ([doi](https://doi.org/10.1016/j.infsof.2012.04.006)). Overscoping in market-driven RE: causes and effects, and why continuous scope prioritisation helps.
10. **Porter, Votta & Basili (1995)** ([doi](https://doi.org/10.1109/32.391380)), read with **Ciolkowski (2009)** ([doi](https://doi.org/10.1109/ESEM.2009.5316026)). The defining requirements-inspection experiment (meetings add no net detection) and the meta-analysis showing the benefits of reading techniques are contested.
11. **Boehm, Gray & Seewaldt (1984)** ([doi](https://doi.org/10.1109/tse.1984.5010238)). The classic experimental trade-off between prototyping and specifying.
12. **Bjarnason et al. (2014)** ([doi](https://doi.org/10.1007/s10664-013-9263-y)). Alignment of requirements with verification and validation in six companies: communication, tracing and change control decide whether requirements get properly tested.
13. **Gotel & Finkelstein (1994)** ([doi](https://doi.org/10.1109/ICRE.1994.292398)), with **Ramesh & Jarke (2001)** ([doi](https://doi.org/10.1109/32.895989)). The framing of traceability before and after the specification (pre-/post-RS), and empirically derived reference models.
14. **Mäder & Egyed (2015)** ([doi](https://doi.org/10.1007/s10664-014-9314-z)). The first controlled evidence that requirements traceability makes maintenance faster and more correct.
15. **Méndez Fernández et al. (2017), NaPiRE** ([doi](https://doi.org/10.1007/s10664-016-9451-7)). Practice evidence from 228 companies: incomplete or hidden requirements, communication flaws and moving targets dominate.

Minor or mis-described suggestions, and the replacement or caveat for each:
- **Jones (1996):** a three-page opinion column. Keep it as framing only; use Zowghi & Nurmuliani (2002) and McGee & Greer (2012) for evidence.
- **Fagan (1976):** about design and code inspections, not requirements. Use Porter et al. (1995) and its replications for evidence on requirements inspection.
- **The "IREB view":** current IREB names four major tasks, not five.
- **EasyWinWin:** the HICSS 2001 paper is "Surfacing tacit knowledge in requirements negotiation…" (DOI above).

#### Synthesis: consensus, disagreements, open issues
**Consensus (strong)**
- The activities downstream of elicitation (analysis and negotiation, prioritisation, validation, management) are continuous and repeated throughout development, not one-off phases. The process must be configured to context: IREB facets, Boehm's home grounds, Glinz's risk-based depth.
- Conflict and inconsistency are normal. Make them explicit, record decisions and rationale, and expect them to reopen.
- Prioritise against explicit, multiple criteria with the right stakeholders, and revisit priorities continuously. Overscoping is the characteristic failure in market-driven settings, and agile practices reduce but do not remove it.
- Validate early and repeatedly with the right stakeholders. Combine internal-quality reviews with external-correspondence techniques: prototypes, acceptance tests and user feedback.
- Treat change as normal. Use baselines, explicit change decision rights, and traceability for impact analysis. In regulated domains traceability is mandatory, and audits find it is often done poorly.

**Disagreements and contested points**
- **How much to specify up front.** Contractual or regulated contexts need prescriptive, linear specification. Market-oriented products cannot validate except through user feedback. Experts agree this is decided by context, not universally.
- **Reading techniques.** Do scenario or perspective-based reading beat checklists? Replications are mixed, the meta-analysis says no clear benefit, and there are signs of researcher bias.
- **AHP.** Called the "most accurate" and most studied method, but it does not scale. Bukhsh et al. claim it is used extensively in industry, while Achimugu et al. found no reported real-world applicability.
- **Agile and volatility.** Does agile RE solve volatility? NaPiRE still finds moving targets in large agile organisations; overscoping persists under agile; and agile RE tends to neglect quality requirements.
- **Consistency.** Enforce it continuously, or tolerate it? Nuseibeh, Easterbrook & Russo argue that constant enforcement is counterproductive.

**Open issues**
- Prioritisation that scales, copes with dependencies and evolution, and is validated in industry.
- Release-planning models tested in full-scale industry trials.
- Cost-effective traceability before the specification (pre-RS) and trace maintenance; independent replication of the traceability-benefit experiments.
- Handling quality requirements in agile RE.
- Alignment between requirements and verification/validation at scale, and RE in large-scale agile systems development (24 challenges in Kasauli et al.).
- Publication of ISO/IEC/IEEE 29148 3rd edition, which is at DIS stage as of Sept 2026.

### Inferences
- **For safety-critical or regulated work:** expect contractual or linear and prescriptive RE.
  - Baseline the requirements and gate changes through a change control board.
  - Plan traceability strategically from the start, both backward (to sources and rationale) and forward (to design, tests and safety analyses), because regulators and assessors will audit it (Mäder 2013, Maro 2018).
  - Validate intensively and early, with inspections and, where useful, formal analysis.
- **For web and product work:** the same activities happen inside backlog refinement.
  - Analysis and negotiation happen as items are split and clarified.
  - Prioritisation happens through ordering by value, cost of delay and size.
  - Validation happens through acceptance criteria, prototypes, A/B tests and MVPs.
  - Management happens through backlog history and links to code and tests.
  - The risks to watch are underspecification, neglected quality requirements and overscoping.
- **Strength of evidence across this subtopic** is moderate at best:
  - Controlled experiments are mostly with students: inspections, prototyping, acceptance tests, traceability.
  - Industrial studies are mostly qualitative interview or case studies, typically with 9–30 interviewees (Gotel & Finkelstein's "over 100 practitioners" is an outlier).
  - Large surveys (NaPiRE, Status Quo) describe problems rather than test interventions.
  - The only quantitative aggregation found (Ciolkowski 2009) undercut an earlier positive claim.
  - The report should present the practices as well-reasoned consensus with selective experimental support, not as proven effects.

### Gaps
- I found no comparative empirical study that quantifies "how much RE is enough" by context. The guidance is expert heuristics (IREB facets, Boehm's home grounds, Glinz's risk-based approach) plus case evidence.
- The NaPiRE and Status Quo data were published in 2017–2019. I opened no 2023–2026 large-scale practice survey, so current prevalence figures (e.g., how often backlog refinement, WSJF or MoSCoW are used) are unknown.
- I could not confirm the current SAFe version number from the WSJF page (behind a login); only the publicly visible definition text is cited.
- Martins & Gorschek (2016) and Inayat et al. (2015): only S2 summaries were available, so their specific counts and findings are not stated.