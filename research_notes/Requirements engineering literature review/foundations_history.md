# Foundations and history of requirements engineering (1970s–2000s, with current status as of October 2026)

Conventions used throughout. Every DOI below was found through Crossref search and then checked against `https://api.crossref.org/works/<DOI>` on 2026-10-23 (title and year matched unless a note says otherwise). Two quirks recur:
- IEEE conference papers from the 1990s (RE'93, ICRE'94, RE'97, RE'01) carry a Crossref "issued" date of 2002, the IEEE Xplore digitisation date. The container title gives the real year.
- Some Crossref titles drop the subtitle, e.g. "Requirements engineering" for Nuseibeh & Easterbrook's "Requirements engineering: a roadmap".

Citation counts come from Semantic Scholar ("S2") and OpenAlex ("OA") snapshots taken on 2026-10-23 via [the S2 batch API](https://api.semanticscholar.org/graph/v1/paper/batch) and [the OpenAlex API](https://api.openalex.org/works). Both undercount relative to Google Scholar, so use them only to compare influence. "UNVERIFIED" marks a link I could not open or confirm. Where a paper is paywalled, I read its abstract through the OpenAlex or Semantic Scholar metadata, or read an author-hosted copy; each such case is noted.

## Q1. How did RE emerge as a named discipline, and what was the dominant concern in each decade?

### Takeaway
RE began in the 1970s as "requirements definition/analysis" for large, often real-time and defence or information systems. Structured and computer-aided requirements methods appeared, the phrase "requirements engineering" entered paper titles (IEEE TSE, 1977), and Bell & Thayer's 1976 study gave early data showing that requirements problems were real and important. RE became a self-standing research field only in the early 1990s. Its markers were two alternating IEEE series, the RE'93 symposium (San Diego) and the ICRE'94 conference (Colorado Springs), and Springer's *Requirements Engineering* journal (vol. 1, 1996). The two series merged into the annual IEEE International Requirements Engineering Conference in 2002. The most recent edition, RE'26, was held in Montréal on 17–21 August 2026.

### Cited Findings

#### 1970s: "requirements definition" becomes a recognised problem
- **Bell & Thayer (1976), an early empirical study** (whether it was strictly the first was not verified). T. E. Bell & T. Thayer, "Software requirements: Are they really a problem?", *Proc. 2nd Int. Conf. on Software Engineering (ICSE '76)*. Link: [ACM DL](http://dl.acm.org/citation.cfm?id=807650) — **UNVERIFIED**. The paper has no Crossref-registered DOI, and ACM DL and DBLP both blocked automated access. Title, year and venue were confirmed through [OpenAlex](https://api.openalex.org/works/W2006210705) and Semantic Scholar (DBLP key `conf/icse/BellT76`).
  - Abstract, read via [OpenAlex](https://api.openalex.org/works/W2006210705): "Do requirements arise naturally from an obvious need, or do they come about only through diligent effort—and even then contain problems? Data on two very different types of software requirements were analyzed to determine what kinds of problems occur and whether these problems are important. The results are dramatic: software requirements are important, and their problems are surprisingly similar across projects. New software engineering techniques are clearly needed to improve both the development and statement of requirements."
- **IEEE TSE vol. SE‑3, no. 1 (1977), the requirements issue.** It opens with an unsigned "Guest Editorial: Reflections on Requirements" (pp. 2–5; Crossref lists no author) — [doi:10.1109/TSE.1977.229898](https://doi.org/10.1109/TSE.1977.229898). The issue includes:
  - Ross & Schoman, "Structured Analysis for Requirements Definition" (pp. 6–15) — [doi:10.1109/TSE.1977.229899](https://doi.org/10.1109/TSE.1977.229899)
  - Teichroew & Hershey, "PSL/PSA: A Computer-Aided Technique for Structured Documentation and Analysis of Information Processing Systems" (pp. 41–48) — [doi:10.1109/TSE.1977.229902](https://doi.org/10.1109/TSE.1977.229902)
  - Bell, Bixler & Dyer, "An Extendable Approach to Computer-Aided Software Requirements Engineering" (pp. 49–60) — [doi:10.1109/TSE.1977.229903](https://doi.org/10.1109/TSE.1977.229903)
  - Alford, "A Requirements Engineering Methodology for Real-Time Processing Requirements" (pp. 60–69) — [doi:10.1109/TSE.1977.233838](https://doi.org/10.1109/TSE.1977.233838)
  - All five records come from Crossref. The last two show the phrase "requirements engineering" already in titles in 1977.
- **Ross & Schoman's abstract** (via [OpenAlex](https://doi.org/10.1109/TSE.1977.229899)): "Requirements definition encompasses all aspects of system development prior to actual system design. We see the lack of an adequate approach to requirements definition as the source of major difficulties in current systems work… [we propose] three interrelated subjects: context analysis, functional specification, and design constraints. Requirements definition replaces the widely used, but never well-defined, term 'requirements analysis.'"
  - Van Lamsweerde (2001) calls it "their seminal paper" and quotes its why/what/how framing: "requirements definition must say why a system is needed, based on current or foreseen conditions… It must say what system features will serve and satisfy this context. And it must say how the system is to be constructed" — [van Lamsweerde 2001, author copy](https://www.info.ucl.ac.be/~avl/files/RE01.pdf).
- **Boehm (1976) and the cost-to-fix curve.** Boehm, "Software Engineering", *IEEE Trans. Computers* C‑25(12):1226–1241 — [doi:10.1109/TC.1976.1674590](https://doi.org/10.1109/TC.1976.1674590). Menzies et al. identify it as the first report of the "delayed issue effect" (the later a defect is fixed, the costlier it is): "first reported in 1976 in a era of punch card programming and non-interactive environments [12]", where [12] is this paper — [Menzies et al., arXiv version](https://arxiv.org/abs/1609.04886).
- **DeMarco's structured analysis.** Pohl's RE overview cites "DeMarco. Structured Analysis and System Specification. Prentice Hall, Englewood Cliffs, NJ, 1979" — [Pohl, "Requirements Engineering: An Overview"](https://people.eecs.ku.edu/~saiedian/Teaching/812/Lectures/Misc/pohl-intro-re.pdf). DeMarco's retrospective appears in *Software Pioneers* (2002) — [doi:10.1007/978-3-642-59412-0_33](https://doi.org/10.1007/978-3-642-59412-0_33).
#### 1980s: "what, not how", standards, and the human difficulty
- **Heninger (1980), the A‑7E requirements document.** "Specifying Software Requirements for Complex Systems: New Techniques and Their Application", *IEEE TSE* SE‑6(1):2–13 — [doi:10.1109/TSE.1980.230208](https://doi.org/10.1109/TSE.1980.230208). From the abstract: techniques "for making requirements specifications precise, concise, unambiguous, and easy to check for completeness and consistency… developed to document the requirements of existing flight software for the Navy's A-7 aircraft… to introduce the A-7 document as a model of a disciplined approach to requirements specification" (abstract via OpenAlex).
- **"What, not how".** "It is widely agreed that the primary product of the RE process is the requirements specification which should state what a system should do and not how it should do it." Pohl credits McMenamin & Palmer (1984) with popularising the focus on the system's "essence" rather than its implementation — [Pohl overview](https://people.eecs.ku.edu/~saiedian/Teaching/812/Lectures/Misc/pohl-intro-re.pdf).
- **IEEE Std 830‑1984.** Crossref title "IEEE Guide for Software Requirements Specifications" — [doi:10.1109/IEEESTD.1984.119205](https://doi.org/10.1109/IEEESTD.1984.119205). Pohl summarises its quality list: a requirements specification "should be complete, consistent, modifiable, traceable, unambiguous, verifiable, and usable during development, operation, and maintenance of the system" — [Pohl overview](https://people.eecs.ku.edu/~saiedian/Teaching/812/Lectures/Misc/pohl-intro-re.pdf).
- **Brooks (1986/1987).** "No Silver Bullet: Essence and Accidents of Software Engineering", *Computer* 20(4):10–19 (1987) — [doi:10.1109/MC.1987.1663532](https://doi.org/10.1109/MC.1987.1663532). Verbatim from the September 1986 UNC technical report TR86‑020, p. 14 — [UNC TR86-020](https://www.cs.unc.edu/techreports/86-020.pdf):
  > "The hardest single part of building a software system is deciding precisely what to build. No other part of the conceptual work is so difficult as establishing the detailed technical requirements, including all the interfaces to people, to machines, and to other software systems. No other part of the work so cripples the resulting system if done wrong. No other part is more difficult to rectify later."
  - The TR reads "so difficult as". I could not open the 1987 *Computer* text to check whether it reads "as difficult as", which is how the passage is often quoted.
- **Curtis, Krasner & Iscoe (1988).** "A field study of the software design process for large systems", *CACM* 31(11):1268–1287 — [doi:10.1145/50087.50089](https://doi.org/10.1145/50087.50089). Personnel from 17 large projects were interviewed. Three of the problems found were "the thin spread of application domain knowledge, fluctuating and conflicting requirements, and communication bottlenecks and breakdowns" (abstract via OpenAlex).
- **Gause & Weinberg (1989).** They see RE as "… the part of development in which people attempt to discover what is desired". Developing requirements is "a process of developing a team of people who (1) understand the requirements; (2) (mostly) stay together to work on the project; (3) know how to work effectively in a team" — quoted in [Pohl overview](https://people.eecs.ku.edu/~saiedian/Teaching/812/Lectures/Misc/pohl-intro-re.pdf).
- **IEEE Std 610.12‑1990 (glossary).** Board approval 1990‑09‑28; published 1990‑12‑31. It superseded IEEE 729‑1983 and was itself later superseded (see Q2) — [IEEE SA page](https://standards.ieee.org/ieee/610.12/855/).

#### 1990s: RE becomes an institutionalised discipline
- **Venues.** The RE'01 site lists the biennial IEEE symposium series: RE'93 San Diego, RE'95 York, RE'97 Annapolis, RE'99 Limerick, and RE'01 Toronto ("the fifth in a biennial series, sponsored by the IEEE, that started in 1993"). The sister International Conference on RE ran in even years: ICRE'94, '96 and '98 in Colorado Springs, ICRE'00 in Schaumburg, Illinois. "Next year, the symposium and conference will formally merge to become the IEEE International Requirements Engineering Conference (RE'02), which will then be held annually" — [RE'01 past symposia page](https://www.cs.toronto.edu/~sme/RE01/past_symp.html).
  - The RE'04 site confirms the merger and numbers "10th IEEE International Requirements Engineering Conference (RE'02), Essen, Germany (August 2002)" and "11th… (RE'03), Monterey" — [RE'04 past conferences](https://sel.ist.osaka-u.ac.jp/RE04/main/pastconferences.html). That page calls RE'01 the "Sixth" symposium, which contradicts RE'01's own "fifth". The RE'01 page is consistent with its list (93, 95, 97, 99, 01).
- **RE'93 dates.** Jacobs, Jarke & Pohl, "Report on the first international IEEE symposium on requirements engineering (RE93) San Diego, Jan. 4–6, 1993", *Automated Software Engineering* 1(1):129–132 (1994) — [doi:10.1007/BF00871694](https://doi.org/10.1007/BF00871694).
- **The journal.** Springer's *Requirements Engineering* began with vol. 1, issue 1 in March 1996. The issue includes an Editorial — [doi:10.1007/BF01235762](https://doi.org/10.1007/BF01235762) — and A. Finkelstein, "Requirements engineering research: Coordination and infrastructure" — [doi:10.1007/BF01235766](https://doi.org/10.1007/BF01235766) (Crossref listing for ISSN 0947‑3602).
- **A contemporary view of the emergence.** "By the early 1990's, RE had emerged as a field of study in its own right, as witnessed by the emergence of two series of international meetings – the IEEE sponsored conference and symposium, held in alternating years – and the establishment of an international journal published by Springer. By the late 1990's, the field had grown enough to support a large number of additional smaller meetings and workshops in various countries" — [Nuseibeh & Easterbrook 2000, author copy](http://www.cs.toronto.edu/~sme/papers/2000/ICSE2000.pdf).
- **Three "radical new ideas" of the 1990s**, per Nuseibeh & Easterbrook, that "challenged and overturned the orthodox views of RE":
  1. Modelling and analysis cannot be done "in isolation from the organisational and social context", which favoured ethnomethodology and participant observation.
  2. RE should "not focus on specifying the functionality of a new system, but instead should concentrate on modelling indicative and optative properties of the environment". This came with a shift "towards modelling stakeholders' goals… and scenarios".
  3. "The attempt to build consistent and complete requirements models is futile". RE must instead analyse and resolve conflicts and "reason with models that contain inconsistencies".

  Source: [Nuseibeh & Easterbrook 2000](http://www.cs.toronto.edu/~sme/papers/2000/ICSE2000.pdf).
- **Origin of Zave's classification paper.** Zave writes that it came "Out of my role as program chair of the 2nd IEEE International Symposium on Requirements Engineering" (RE'95) — [Zave, "Foundations of Requirements Engineering"](https://www.pamelazave.com/fre.html).
- **Most-influential-paper awards on the foundations line** — [Zave's page](https://www.pamelazave.com/fre.html):
  - Jackson & Zave, "Domain descriptions" (RE symposium; Zave's page dates it 1992) won the 2003 RE Ten-Year Most Influential Paper Award.
  - Jackson & Zave, "Deriving specifications from requirements: an example" (ICSE 1995) won the ICSE 2005 Ten-Year Most Influential Paper Award.
  - The ICRE 2000 version of Gunter et al.'s reference model won the 2010 Ten-Year Most Influential Paper Award.

#### 2000s–2020s (brief, for the timeline; details in Q2, Q4, Q5 and Q6)
- **2000:** two millennium roadmaps (Nuseibeh & Easterbrook; van Lamsweerde) and the WRSPM reference model.
- **2002:** the merged annual RE conference starts ([RE'01 page](https://www.cs.toronto.edu/~sme/RE01/past_symp.html)).
- **2007:** Cheng & Atlee's research directions ([doi:10.1109/FOSE.2007.17](https://doi.org/10.1109/FOSE.2007.17)).
- **2011:** ISO/IEC/IEEE 29148:2011 supersedes IEEE 830‑1998 ([IEEE SA](https://standards.ieee.org/ieee/830/1222/)).
- **May 2011:** first edition of the IREB glossary ([IREB glossary 2.2.0, preface](https://cockpit-v1.ireb.org/media/pages/downloads/cpre-glossary/510f672cfd-1760005471/ireb_cpre_glossary_en_2.2.pdf)).
- **RE'26** took place at École de technologie supérieure (ÉTS), Montréal, Mon 17 – Fri 21 August 2026 — [RE 2026 official site](https://conf.researchr.org/home/RE-2026).

#### Decade-by-decade eras (for the timeline)

| Era | Dominant approach / concern | Sourced markers |
|---|---|---|
| 1970s | **Requirements "definition"/analysis for large systems.** Structured and computer-aided requirements methods; early evidence that requirements problems are real and costly. | Bell & Thayer 1976 ([OpenAlex](https://api.openalex.org/works/W2006210705)); TSE SE‑3(1) 1977 with SA/SADT, PSL/PSA, and the Alford and Bell et al. "requirements engineering" methodologies ([Crossref DOIs above](https://doi.org/10.1109/TSE.1977.229899)); Boehm 1976 cost-to-fix ([doi](https://doi.org/10.1109/TC.1976.1674590)); DeMarco 1979 ([Pohl overview](https://people.eecs.ku.edu/~saiedian/Teaching/812/Lectures/Misc/pohl-intro-re.pdf)) |
| 1980s | **Precise, implementation-free specification ("what not how", the system's "essence")**, codified in SRS standards. Growing recognition that the hard part is human and organisational. | Heninger 1980 A‑7E ([doi](https://doi.org/10.1109/TSE.1980.230208)); McMenamin & Palmer 1984 and IEEE 830‑1984 ([Pohl overview](https://people.eecs.ku.edu/~saiedian/Teaching/812/Lectures/Misc/pohl-intro-re.pdf)); Brooks 1986/87 ([UNC TR](https://www.cs.unc.edu/techreports/86-020.pdf)); Curtis et al. 1988 ([doi](https://doi.org/10.1145/50087.50089)); Gause & Weinberg 1989; IEEE 610.12 approved 1990 ([IEEE SA](https://standards.ieee.org/ieee/610.12/855/)) |
| 1990s | **RE as a discipline.** Dedicated venues and journal. Shifts to (a) social/organisational context, (b) the environment, goals and scenarios rather than system functions, (c) living with inconsistency. Goal frameworks (NFR, KAOS, i*), viewpoints, traceability, world/machine foundations, four-variable model. | RE'93/ICRE'94 ([RE'01 page](https://www.cs.toronto.edu/~sme/RE01/past_symp.html)); journal 1996 ([doi](https://doi.org/10.1007/BF01235762)); "three radical new ideas" ([N&E 2000](http://www.cs.toronto.edu/~sme/papers/2000/ICSE2000.pdf)); see Q3 for the frameworks |
| 2000s | **Consolidation and synthesis.** Roadmaps; formal reference model; goal-oriented RE becomes mainstream research; annual merged conference; first wave of success-factor field studies; research directions for "emerging systems". | N&E 2000, van Lamsweerde 2000, Gunter et al. 2000, van Lamsweerde 2001 (Q3/Q4); RE'02 ([RE'04 page](https://sel.ist.osaka-u.ac.jp/RE04/main/pastconferences.html)); Hofmann & Lehner 2001, Hall et al. 2002, Damian & Chisan 2006, Kamata & Tamai 2007 (Q6); Cheng & Atlee 2007 ([doi](https://doi.org/10.1109/FOSE.2007.17)) |
| 2010s | **Standardisation and professionalisation; re-examining the evidence.** ISO/IEC/IEEE 29148 replaces IEEE 830; IREB terminology; calls to refocus RE on "design requirements" (intertwining with implementation, evolution, architecture, complexity); critical re-analyses of CHAOS and the cost-to-fix curve; large practitioner surveys (NaPiRE). | 29148:2011 / 2018 ([IEEE SA](https://standards.ieee.org/ieee/29148/6937/)); IREB glossary 2011 / v2.0 Oct 2020 ([IREB](https://cockpit-v1.ireb.org/media/pages/downloads/cpre-glossary/510f672cfd-1760005471/ireb_cpre_glossary_en_2.2.pdf)); Jarke et al. 2011 ([doi](https://doi.org/10.1016/j.is.2011.04.003)); Eveleens & Verhoef 2010, Menzies et al. 2017, NaPiRE 2016/17 (Q6) |
| 2020s (to Oct 2026) | **Practitioner synthesis and maintenance of the canon.** Revised handbooks; terminology and standards revisions under way. | Meyer 2022; Wiegers & Hokanson 2023; Robertson, Robertson & Reed 4th ed. 2024 (Q5); IREB glossary 2.2.0 (Oct 2025) and 2.2.1 translations (Apr 2026); IEEE P24765 PAR (Dec 2024) and P29148 PAR (Sep 2025) (Q2); RE'26 Montréal ([site](https://conf.researchr.org/home/RE-2026)) |

### Inferences
- **The name came before the field.** "Requirements engineering" appears in 1977 TSE titles from methodology/tool builders (Alford; Bell, Bixler & Dyer). The *field*, with its own symposium, conference and journal, dates from 1993–1996. A fair one-line history: recognised as a problem in the 1970s, systematised in the 1980s, institutionalised in the 1990s, consolidated in the 2000s.
- **Bell & Thayer's paper is short on accessible detail.** Its abstract is the citable core. Specific counts often attributed to it (e.g. numbers of requirements problems found) could not be verified here and should not be quoted without the full text.
- **Brooks is a rhetorical anchor, not evidence.** His passage is the most quotable statement of why RE matters, but it is an essay claim, not data. Pair it with Bell & Thayer and Curtis et al. for empirical backing.

### Gaps
- I could not confirm that TSE SE‑3(1) was officially labelled a "special issue on requirements analysis", who wrote the guest editorial (Crossref lists no author), or the exact month. Ross's companion paper "Structured Analysis (SA): A Language for Communicating Ideas" (same issue) was not checked.
- The *Requirements Engineering* journal's founding and current editors-in-chief: Springer's journal page (link.springer.com/journal/766) blocked automated access.
- The start dates of REFSQ and IFIP WG 2.9 were not researched or verified.
- The agile-era shift (user stories etc.) is not covered here; another researcher covers it.

## Q2. What are the canonical definitions of RE and of "requirement"?

### Takeaway
The most-quoted academic definition is **Zave (1997)**: RE is the branch of software engineering concerned with real-world goals, functions and constraints and their relation to precise specifications and their evolution. The standard three-part definition of **"requirement"** comes from **IEEE Std 610.12‑1990**: a user's need, a system's required condition or capability, and the documented representation of either. That structure survives in the **IREB** glossary (v2.2.0, October 2025). In the standards world, 610.12 was superseded by **ISO/IEC/IEEE 24765** (active edition 2017), and IEEE 830 by **ISO/IEC/IEEE 29148** (active edition 2018). Revisions of both are in progress (IEEE PARs approved Dec 2024 and Sep 2025).

### Cited Findings
- **Zave (1997)**, "Classification of research efforts in requirements engineering", *ACM Computing Surveys* 29(4):315–321 — [doi:10.1145/267580.267581](https://doi.org/10.1145/267580.267581). The definition, as quoted by Nuseibeh & Easterbrook, who call it "one of the clearest definitions of RE":
  > "Requirements engineering is the branch of software engineering concerned with the real-world goals for, functions of, and constraints on software systems. It is also concerned with the relationship of these factors to precise specifications of software behavior, and to their evolution over time and across software families."

  Nuseibeh & Easterbrook value it because it covers (1) "real-world goals", the "why" as well as the "what"; (2) "precise specifications" as the basis for analysis, validation and verification; and (3) evolution and reuse — [N&E 2000](http://www.cs.toronto.edu/~sme/papers/2000/ICSE2000.pdf).
- **Nuseibeh & Easterbrook's own working definition (2000).** "software systems requirements engineering (RE) is the process of discovering that purpose, by identifying stakeholders and their needs, and documenting these in a form that is amenable to analysis, communication, and subsequent implementation". They "prefer to characterise RE as a branch of systems engineering". They note "It has been argued that requirements engineering is a misnomer" and defend "engineering" as anchoring development "to a real-world problem" — [N&E 2000](http://www.cs.toronto.edu/~sme/papers/2000/ICSE2000.pdf).
- **Van Lamsweerde's goal/agent definition (2000).** "Requirements engineering (RE) is concerned with the identification of the goals to be achieved by the envisioned system, the operationalization of such goals into services and constraints, and the assignment of responsibilities for the resulting requirements to agents such as humans, devices, and software. The processes involved in RE include domain analysis, elicitation, specification, assessment, negotiation, documentation, and evolution" — [van Lamsweerde 2000 abstract, doi:10.1145/337180.337184](https://doi.org/10.1145/337180.337184) (abstract via OpenAlex).
- **IEEE Std 610.12‑1990 definitions** (quoted verbatim in [Pohl's overview](https://people.eecs.ku.edu/~saiedian/Teaching/812/Lectures/Misc/pohl-intro-re.pdf), which cites it as "[IEEE-610.12, 1991]"):
  - RE defined as **requirements analysis**: "(1) The process of studying user needs to arrive at a definition of system, hardware, or software requirements. (2) The process of studying and refining system, hardware or software requirements."
  - **Requirement**: "(1) A condition or capability needed by a user to solve a problem or achieve an objective. (2) A condition or capability that must be met or possessed by a system or system component to satisfy a contract, standard, specification or other formally imposed document. (3) A documented representation of a condition or capability as in (1) or (2)."
  - **Status:** "Superseded Standard"; superseded by 24765‑2010; it had superseded 729‑1983; reaffirmed 2002‑09‑12 — [IEEE SA 610.12](https://standards.ieee.org/ieee/610.12/855/).
- **ISO/IEC/IEEE 24765 (Systems and software engineering — Vocabulary).**
  - The 2010 edition was superseded by 2017 — [IEEE SA 24765‑2010](https://standards.ieee.org/ieee/24765/4750/).
  - The **2017 edition is the "Active Standard"**: board approval 2017‑06‑15, published 2017‑08‑28 — [IEEE SA 24765‑2017](https://standards.ieee.org/ieee/24765/6800/). Its Crossref DOI is [10.1109/IEEESTD.2017.8016712](https://doi.org/10.1109/IEEESTD.2017.8016712).
  - A revision project **P24765** has an "Active PAR" approved 2024‑12‑11 — [IEEE SA P24765](https://standards.ieee.org/ieee/24765/11892/).
- **ISO/IEC/IEEE 29148 (Life cycle processes — Requirements engineering).**
  - The 2011 edition (published 2011‑12‑01) was superseded by 2018 — [IEEE SA 29148‑2011](https://standards.ieee.org/ieee/29148/5289/).
  - The **2018 edition is the "Active Standard"**: board approval 2018‑10‑23, published 2018‑11‑30 — [IEEE SA 29148‑2018](https://standards.ieee.org/ieee/29148/6937/). Its Crossref DOI is [10.1109/IEEESTD.2018.8559686](https://doi.org/10.1109/IEEESTD.2018.8559686).
  - Scope, per the IEEE page: the document "contains provisions for the processes and products related to the engineering of requirements for systems and software products and services throughout the life cycle. It defines the construct of a good requirement, provides attributes and characteristics of requirements, and discusses the iterative and recursive application of requirements processes throughout the life cycle."
  - A revision project **P29148** has an "Active PAR" approved 2025‑09‑10 — [IEEE SA P29148](https://standards.ieee.org/ieee/29148/12262/).
- **IEEE Std 830‑1998 (Recommended Practice for SRS).** Board approval 1998‑06‑25, published 1998‑10‑20. "Superseded by ISO/IEC/IEEE 29148:2011." Abstract: "The content and qualities of a good software requirements specification (SRS) are described and several sample SRS outlines are presented" — [IEEE SA 830‑1998](https://standards.ieee.org/ieee/830/1222/).
- **IREB, *Glossary of Requirements Engineering Terminology* (Martin Glinz), Version 2.2.0, 1 October 2025** — [IREB English PDF](https://cockpit-v1.ireb.org/media/pages/downloads/cpre-glossary/510f672cfd-1760005471/ireb_cpre_glossary_en_2.2.pdf). Verbatim:
  - **Requirement**: "1. A need perceived by a stakeholder. 2. A capability or property that a system shall have. 3. A documented representation of a need, capability or property."
  - **Requirements Engineering**: "The systematic and disciplined approach to the specification and management of requirements with the goal of understanding the stakeholders' desires and needs and minimizing the risk of delivering a system that does not meet these desires and needs. Abbreviation: RE."
  - **History**, from the preface: the first edition was published in May 2011. Version 2.0.0 (October 2020) harmonised terminology with ISTQB and "simplified the definitions of requirement and Requirements Engineering". Of the first edition's 128 terms, 42 were unchanged; 17 were rewritten, two deleted, and 85 new definitions added.
  - IREB translations dated **16 April 2026 are labelled 2.2.1** and cite the English 2.2.0 as the original — [IREB Spanish 2.2.1](https://cockpit-v1.ireb.org/media/pages/downloads/cpre-glossary/d2270dab1f-1776327141/ireb_cpre_glossary_es_2.2.1.pdf).
- **Gause & Weinberg (1989)** frame RE socially as "the part of development in which people attempt to discover what is desired" — [Pohl overview](https://people.eecs.ku.edu/~saiedian/Teaching/812/Lectures/Misc/pohl-intro-re.pdf).
- **Goal vocabulary (van Lamsweerde 2001).** "A goal is an objective the system under consideration should achieve… optative statements as opposed to indicative ones". "A goal under responsibility of a single agent in the software-to-be becomes a requirement whereas a goal under responsibility of a single agent in the environment of the software-to-be becomes an assumption"; "Unlike requirements, assumptions cannot be enforced by the software-to-be" — [van Lamsweerde 2001](https://www.info.ucl.ac.be/~avl/files/RE01.pdf).
- **Indicative vs optative (Jackson; Zave & Jackson).** "Indicative descriptions express things that are currently true (and will be true irrespective of the introduction of a new system), while optative descriptions express the things that we wish the new system to make true" — [N&E 2000, footnote citing Zave & Jackson 1997](http://www.cs.toronto.edu/~sme/papers/2000/ICSE2000.pdf).

### Inferences
- **Three families of definitions coexist:**
  1. *Discipline* definitions (Zave: what RE is "concerned with").
  2. *Process* definitions (IEEE 610.12's "requirements analysis", N&E's "process of discovering that purpose", IREB's "systematic and disciplined approach… to specification and management").
  3. *Goal/agent* definitions (van Lamsweerde: goals → operationalised requirements → responsibilities assigned to agents).

  A writer can present Zave's as the canonical academic definition, IREB/ISO as the practitioner/standards definition, and van Lamsweerde's as the modern conceptual one.
- **The three-part "requirement" definition is the stable core.** IEEE 610.12's "user need / system condition or capability / documented representation" carries over almost one-to-one into IREB's "stakeholder need / system capability or property / documented representation". This continuity is the clearest evidence of consensus on what a "requirement" is. Because 24765 superseded 610.12, it is likely that 24765 carries a similar entry, but I could not open its text.
- **For a specifier, the practically important distinctions are:**
  - requirement (optative, about the world) vs domain property (indicative) vs assumption (expected of the environment, not enforceable);
  - requirement (the problem) vs specification (what the machine must do at its interface).

  These come from the Jackson/Zave and van Lamsweerde line (Q3), not from the standards glossaries.

### Gaps
- I could not open the ISO pages or ISO OBP (iso.org returned 403), so the exact 29148 and 24765 definitions of "requirement" and "requirements engineering" are **not verified** here. Quote them only after checking the standard.
- SWEBOK (current v4.0) definitions were not researched.
- The IREB glossary's definition of "requirement" changed in v2.0 (2020). The pre‑2020 wording was not retrieved for comparison.

## Q3. What foundational conceptual frameworks does every RE expert know? (with plain-language explanations)

### Takeaway
The intellectual core of RE is the **Jackson–Zave "world and machine" view**:
- requirements are statements about the environment, not the software;
- a specification describes only the phenomena shared at the machine–world interface;
- the specification is adequate when, together with domain knowledge, it guarantees the requirements: **W ∧ S ⇒ R**, often written *domain knowledge, specification ⊢ requirements*.

Around this core sit Parnas & Madey's four-variable model (the control-systems version of the same idea), Jackson's problem frames, Pohl's three dimensions of RE progress, and goal-oriented RE: NFR (1992), KAOS (1993), i* (1997), summarised by van Lamsweerde (2001). The social counterweight comes from Rittel & Webber's "wicked problems" and Goguen's sociolinguistic/ethnographic view of elicitation.

### Cited Findings

#### Wicked problems: Rittel & Webber (1973)
- H. W. J. Rittel & M. M. Webber, "Dilemmas in a general theory of planning", *Policy Sciences* 4(2):155–169 — [doi:10.1007/BF01405730](https://doi.org/10.1007/BF01405730). It is the most-cited item in this set by far (S2 15,532; OA 16,312), largely from outside software.
- Abstract, read via the [LETR bibliographic record](https://letr.org.uk/references/item/306.html), which reproduces the publisher abstract: "The search for scientific bases for confronting problems of social policy is bound to fail, because of the nature of these problems. They are 'wicked' problems, whereas science has developed to deal with 'tame' problems. Policy problems cannot be definitively described… policies that respond to social problems cannot be meaningfully correct or false; and it makes no sense to talk about 'optimal solutions'… there are no 'solutions' in the sense of definitive and objective answers."
- *Plain terms:* some problems cannot be fully specified before you start solving them. The problem statement and the solution co-evolve, and "success" is a judgement rather than a test result. RE borrowed this to explain why requirements cannot simply be "captured".

#### Requirements definition and "why/what/how": Ross & Schoman (1977)
- They split requirements definition into **context analysis, functional specification and design constraints** ([abstract](https://doi.org/10.1109/TSE.1977.229899)). It must say *why* a system is needed, *what* features will serve that context, and *how* it is to be constructed ([quoted by van Lamsweerde 2001](https://www.info.ucl.ac.be/~avl/files/RE01.pdf)).
- *Plain terms:* the earliest statement that a requirements document must explain purpose and context, not just list functions. This is the ancestor of goal-oriented RE.

#### Precise black-box requirements: Heninger (1980) → Parnas & Madey's four-variable model (1995)
- Heninger's A‑7E work introduced techniques to make requirements "precise, concise, unambiguous, and easy to check for completeness and consistency" ([doi:10.1109/TSE.1980.230208](https://doi.org/10.1109/TSE.1980.230208)).
- D. L. Parnas & J. Madey, "Functional documents for computer systems", *Science of Computer Programming* 25(1):41–61 (1995) — [doi:10.1016/0167-6423(95)96871-J](https://doi.org/10.1016/0167-6423%2895%2996871-J). Gunter et al. (2000) summarise this "functional-documentation model" ([Gunter et al., author copy](http://seclab.illinois.edu/wp-content/uploads/2011/04/GunterGJZ00.pdf)):
  - **Variables:** "four distinct collections of variables: m for monitored values, c for system-controlled values, i for values input to the program's registers, and o for values written to the program's output registers".
  - **Predicates:** "NAT(m, c) describing nature without making any assumptions about the system, REQ(m, c) describing the desired system behavior, IN(m, i) relating the monitored real-world values to their corresponding internal representation, OUT(o, c) relating the software-generated outputs to external system-controlled values, and SOF(i, o) relating program inputs to program outputs."
  - **Proof obligations:** *feasibility*, ∀m. (∃c. NAT(m,c)) ⇒ (∃c. NAT(m,c) ∧ REQ(m,c)); IN must handle all cases NAT allows; and *acceptability*, ∀m i o c. NAT ∧ IN ∧ SOF ∧ OUT ⇒ REQ.
  - **Critique:** Gunter et al. argue that "Although widely accepted, these proof obligations are not sufficient", and that their reference model "supplies what is missing".
- *Plain terms:* write requirements as a relation between quantities in the physical world that the system monitors (e.g. altitude) and quantities it controls (e.g. a display or an actuator). Physics and the environment's laws (NAT) are documented separately. Sensors and actuators (IN/OUT) are a separate design layer from the software (SOF). It is the control-systems instance of the world/machine split, widely used in safety-critical RE.

#### The world and the machine: Jackson (1995); Zave & Jackson, "Four dark corners" (1997)
- M. Jackson, "The world and the machine", *ICSE '95*, pp. 283–292 — [doi:10.1145/225014.225041](https://doi.org/10.1145/225014.225041). From the abstract: "As software developers we are engineers because we make useful machines. We are concerned both with the world, in which the machine serves a useful purpose, and with the machine itself. The competing demands and attractions of these two concerns must be appropriately balanced. Failure to balance them harms our work" (via OpenAlex).
- P. Zave & M. Jackson, "Four dark corners of requirements engineering", *ACM TOSEM* 6(1):1–30 (1997) — [doi:10.1145/237432.237434](https://doi.org/10.1145/237432.237434). From the abstract (via OpenAlex):
  - "We show that all descriptions involved in requirements engineering should be descriptions of the environment. We show that certain control information is necessary for sound requirements engineering, and we explain the close association between domain knowledge and refinement of requirements."
  - These conclusions "explain the precise nature of requirements, specifications, and domain knowledge… establish minimum standards for what information should be represented in a requirements language… [and] make it possible to determine exactly what it means for requirements engineering to be successfully completed."
- Zave's own gloss: "when it comes to requirements, the environment is not the most important thing--it is the only thing" — [Zave's foundations page](https://www.pamelazave.com/fre.html).
- A worked example: Jackson & Zave, "Deriving specifications from requirements: an example", *ICSE '95*, pp. 15–24 — [doi:10.1145/225014.225016](https://doi.org/10.1145/225014.225016) (Crossref search record); ICSE 2005 Most Influential Paper ([Zave's page](https://www.pamelazave.com/fre.html)).
- *Plain terms:*
  1. Every term must be grounded in observable things in the environment.
  2. Describe the environment, not the software. Say what the world is like (indicative) and what you want it to become (optative).
  3. Be explicit about who controls each event or state: environment, machine, or shared at the interface.
  4. Domain knowledge (facts about the world you rely on) is what turns a requirement into an implementable specification.

  RE is "done" when the specification plus domain knowledge provably gives you the requirement.

#### The WRSPM reference model: Gunter, Gunter, Jackson & Zave (2000)
- "A reference model for requirements and specifications", *IEEE Software* 17(3):37–43 — [doi:10.1109/52.896248](https://doi.org/10.1109/52.896248). Read from the [author copy](http://seclab.illinois.edu/wp-content/uploads/2011/04/GunterGJZ00.pdf).
- **Five artifacts:**
  - **W**, "domain knowledge that provides presumed environment facts";
  - **R**, "requirements that indicate what the customer needs from the system, described in terms of its effect on the environment";
  - **S**, "specifications that provide enough information for a programmer to build a system that satisfies the requirements";
  - **P**, the program;
  - **M**, the programming platform ("We chose W and M for 'world' and 'machine'").
- **Designated terminology (the sixth artifact).** Phenomena are split into environment-controlled *e* (hidden from the system *eh*, visible to it *ev*) and system-controlled *s* (*sv* visible, *sh* hidden). "only ev and sv are visible to both the environment and the system. We restrict S to using only these terms."
- **Adequacy of the specification:** **∀e s. W ∧ S ⇒ R** (Formula 4), plus a "strengthened version of relative consistency" so that W and S cannot be satisfied vacuously. The program/platform must likewise satisfy ∀e s. W ∧ M ∧ P ⇒ R.
- *Plain terms:* this is the precise form of "domain knowledge + specification ⊢ requirements". A specification is a contract written only in shared interface vocabulary. If the world behaves as W says and the machine behaves as S says, the requirement R holds.

#### Problem frames: Jackson (1995 lexicon; 2001 book)
- M. Jackson, *Software Requirements & Specifications: A Lexicon of Practice, Principles and Prejudices*, Addison-Wesley (published 28 June 1995, 248 pp.) — [InformIT](https://www.informit.com/store/software-requirements-specifications-a-lexicon-of-practice-9780201877120).
- M. Jackson, *Problem Frames: Analysing & Structuring Software Development Problems*, Addison-Wesley (published 17 Nov 2000, © 2001, 416 pp.) — [InformIT](https://www.informit.com/store/problem-frames-analyzing-and-structuring-software-development-9780201596274). From the book's preface on that page:
  - "A problem frame defines the shape of a problem by capturing the characteristics and interconnections of the parts of the world it is concerned with, and the concerns and difficulties that are likely to arise. So problem frames help you to focus on the problem, instead of drifting into inventing solutions."
  - "Design patterns look inwards towards the computer and its software, while problem frames look outwards to the world where the problem is found."
  - "Our problems and requirements are in the world, not in the computer."
  - The idea "was first published in book form in my book Software Requirements & Specifications".
  - The book deliberately sets aside elicitation and negotiation: "We are not going to discuss how to elicit requirements, how to make the business case… We will ignore these things, not because they are unimportant but simply because they are not the subject matter of this book."
  - On volatile requirements: "The proper response to uncertainty and fluidity of requirements is not to throw up your hands and abandon the task. It is to work at a higher level of generality."
- Nuseibeh & Easterbrook note the frame choice is itself a validation issue: "If stakeholders do not agree with the choice of problem frame, it is unlikely that they will ever agree with any statement of the requirements" — [N&E 2000](http://www.cs.toronto.edu/~sme/papers/2000/ICSE2000.pdf).
- *Plain terms:* problem frames are "design patterns for problems". You classify (sub)problems into recurring shapes, each with known parts of the world and known concerns, before thinking about solutions.

#### Pohl's three dimensions of RE (1994)
- K. Pohl, "The three dimensions of requirements engineering: a framework and its applications", *Information Systems* 19(3):243–258 — [doi:10.1016/0306-4379(94)90044-2](https://doi.org/10.1016/0306-4379%2894%2990044-2). The earlier CAiSE'93 version is reprinted in *Seminal Contributions to Information Systems Engineering* (2013) — [doi:10.1007/978-3-642-36926-1_5](https://doi.org/10.1007/978-3-642-36926-1_5).
- In Pohl's own overview (a version appears in *Encyclopedia of Computer Science and Technology* vol. 36, Marcel Dekker), the RE process has three goals ([Pohl overview](https://people.eecs.ku.edu/~saiedian/Teaching/812/Lectures/Misc/pohl-intro-re.pdf)):
  - "developing a as complete as possible system specification out of an opaque system understanding";
  - "providing integrated representation formalisms and supporting the transformations between them";
  - "accomplishing a sufficient common agreement on the final specification allowing personal views".

  From these come the **specification** (opaque → complete), **representation** (informal → semi-formal → formal) and **agreement** (personal views → common view) dimensions. "The three dimensions were originally derived as a result of a comprehensive literature survey". Pohl adds that not everyone must agree on everything, only on the parts that affect them.
- *Plain terms:* RE progress can be measured on three independent axes. How much do we know? How formally is it written down? How far do the stakeholders agree? A project can be far along on one axis and nowhere on another.

#### Goal-oriented RE: NFR (1992), KAOS (1993), i* (1997), and van Lamsweerde's guided tour (2001)
- **NFR framework.** Mylopoulos, Chung & Nixon, "Representing and using nonfunctional requirements: a process-oriented approach", *IEEE TSE* 18(6):483–497 (1992) — [doi:10.1109/32.142871](https://doi.org/10.1109/32.142871). It represents NFRs "in terms of interrelated goals" that "can be refined through refinement methods and can be evaluated in order to determine the degree to which a set of nonfunctional requirements is supported by a particular design" (abstract via OpenAlex).
- **KAOS.** Dardenne, van Lamsweerde & Fickas, "Goal-directed requirements acquisition", *Science of Computer Programming* 20(1–2):3–50 (1993) — [doi:10.1016/0167-6423(93)90021-G](https://doi.org/10.1016/0167-6423%2893%2990021-G). It argues that requirements models need "goals to be achieved, agents to be assigned, alternatives to be negotiated", acquired as instances of a conceptual meta-model (abstract via Semantic Scholar).
- **i\*.** E. Yu, "Towards modelling and reasoning support for early-phase requirements engineering", *RE'97*, pp. 226–235 — [doi:10.1109/ISRE.1997.566873](https://doi.org/10.1109/ISRE.1997.566873). "understanding the organizational context and rationales (the 'Whys') that lead up to systems requirements can be just as important". The early phase "aims to model and analyze stakeholder interests and how they might be addressed, or compromised, by various system-and-environment alternatives" (abstract via OpenAlex).
- **The guided tour.** A. van Lamsweerde, "Goal-oriented requirements engineering: a guided tour", *RE'01*, pp. 249–262 (Crossref; the author copy says 249–263) — [doi:10.1109/ISRE.2001.948567](https://doi.org/10.1109/ISRE.2001.948567). Read from the [author copy](https://www.info.ucl.ac.be/~avl/files/RE01.pdf):
  - "Goals capture, at different levels of abstraction, the various objectives the system under consideration should achieve. Goal-oriented requirements engineering is concerned with the use of goals for eliciting, elaborating, structuring, specifying, analyzing, negotiating, documenting, and modifying requirements."
  - **Why goals:** a completeness criterion (the specification is complete w.r.t. goals "if all the goals can be proved to be achieved from the specification and the properties known about the domain"); a pertinence criterion; rationale and traceability from strategic objectives to technical requirements; structuring; exploring alternatives; conflict management; and stability ("The higher level a goal is, the more stable it will be").
  - **Satisfaction relation:** for each goal g, **R, As, D ⊨ g** with **R, As, D ⊭ false** (requirements, environmental assumptions and domain properties must entail the goal and be consistent).
  - Observation: "goals have been largely ignored both from the literature on software modeling and specification and from the literature on object-oriented analysis".
- *Plain terms:* ask "why?" until you reach stakeholder objectives, and "how?" until you reach things a single agent can be held responsible for. Goals the software must enforce become requirements; goals that depend on people or devices become assumptions. Alternatives, conflicts and obstacles are analysed at the goal level, where stakeholders can still take part.

#### The social side: Goguen, ethnography, and contextual enquiry
- J. A. Goguen & C. Linde, "Techniques for requirements elicitation", *RE'93*, pp. 152–164 — [doi:10.1109/ISRE.1993.324822](https://doi.org/10.1109/ISRE.1993.324822). They survey "introspection, interviews, questionnaires, and protocol, conversation, interaction, and discourse analyses. The last three techniques grew out of ethnomethodology and sociolinguistics. They can elicit tacit knowledge by observing actual interactions in the workplace" (abstract via OpenAlex).
- Goguen also gave "Social issues in requirements engineering" at RE'93 (pp. 194–195; [doi:10.1109/ISRE.1993.324858](https://doi.org/10.1109/ISRE.1993.324858); content not retrieved).
- Sommerville, Rodden, Sawyer, Bentley & Twidale, "Integrating ethnography into the requirements engineering process", RE'93, pp. 165–173 — [doi:10.1109/ISRE.1993.324821](https://doi.org/10.1109/ISRE.1993.324821) (content not retrieved).
- Nuseibeh & Easterbrook: "The term 'elicitation' is preferred to 'capture', to avoid the suggestion that requirements are out there to be collected". RE is "a multi-disciplinary, human-centred process" drawing on cognitive psychology, anthropology, sociology and linguistics, and "problem domain experts often have large amounts of tacit knowledge that is not amenable to introspection" — [N&E 2000](http://www.cs.toronto.edu/~sme/papers/2000/ICSE2000.pdf).
- *Plain terms:* stakeholders cannot simply tell you their requirements. Much of what matters is tacit, situated in everyday work, and political. Observation and discourse analysis complement interviews.

#### Multiple viewpoints, inconsistency, and traceability
- **Viewpoints.** Finkelstein, Kramer, Nuseibeh, Finkelstein & Goedicke, "Viewpoints: a framework for integrating multiple perspectives in system development", *IJSEKE* 2(1):31–57 (1992) — [doi:10.1142/S0218194092000038](https://doi.org/10.1142/S0218194092000038) (S2 669; content not retrieved). N&E list "reason with models that contain inconsistencies" among the decade's radical ideas ([N&E 2000](http://www.cs.toronto.edu/~sme/papers/2000/ICSE2000.pdf)).
- **Traceability.** Gotel & Finkelstein, "An analysis of the requirements traceability problem", *ICRE'94*, pp. 94–101 — [doi:10.1109/ICRE.1994.292398](https://doi.org/10.1109/ICRE.1994.292398). "Our work is based on empirical studies, involving over 100 practitioners". It introduces "pre-requirements specification (pre-RS) traceability and post-requirements specification (post-RS) traceability" and reports "the majority of the problems attributed to poor requirements traceability are due to inadequate pre-RS traceability" (abstract via Semantic Scholar).

#### A critique of the foundations
- Jureta, Mylopoulos & Faulkner, "Revisiting the core ontology and problem in requirements engineering", *RE'08*, pp. 71–80 — [doi:10.1109/RE.2008.13](https://doi.org/10.1109/RE.2008.13). They argue that Zave & Jackson's ontology "is incomplete. It does not cover all types of basic concerns that the stakeholders communicate. These include beliefs, desires, intentions, and attitudes". They propose an extended formulation of the requirements problem. Best paper award at RE'08 ([arXiv abstract](https://arxiv.org/abs/0811.4364)).

### Inferences
- **One integrating picture a writer can use.**
  - Rittel & Webber explain *why* RE is hard: the problem is not fixed in advance.
  - Ross & Schoman and the goal-oriented line say *what to capture first*: purpose and context.
  - Jackson and Zave say *where requirements live and when you are done*: in the world; W ∧ S ⇒ R.
  - Parnas & Madey give the *control-systems instance*.
  - Pohl gives a *progress model*: completeness, formality, agreement.
  - Goguen, ethnography and viewpoints explain *how knowledge actually surfaces*: socially, with conflicts.
- **The world/machine view is the closest thing RE has to a theory.** It also has the most direct practical payoff for someone learning to specify:
  - write requirements in environment terms;
  - list domain assumptions explicitly;
  - specify only shared interface phenomena;
  - check that assumptions plus specification actually deliver the requirement.

  van Lamsweerde's R, As, D ⊨ G is the same idea expressed with goals.
- **The main tension is formal vs social.** Jackson explicitly sets social and political concerns aside. The ethnographic school (Goguen; Sommerville et al.) foregrounds them. Jureta et al. argue the formal core omits stakeholder attitudes. N&E's second challenge (below) is exactly to bridge contextual enquiry and formal specification.

### Gaps
- Parnas & Madey (1995) and Pohl (1994) were not read in full (paywalled). Their content here comes from Gunter et al.'s summary and Pohl's own overview respectively.
- Goguen's 1994 chapter "Requirements engineering as the reconciliation of social and technical issues" (in Jirotka & Goguen (eds.), Academic Press) and his ICRE'96 "Formality and informality in requirements engineering" could not be located with DOIs or opened. Goguen & Linde (1993) is the best verified citable anchor for "Goguen on the social side".
- Jackson's basic problem-frame catalogue (the names of the elementary frames) was not verified from an opened source.
- The full text of Rittel & Webber was not opened; the publisher abstract was read via a bibliographic record. The often-cited list of distinguishing properties of wicked problems (and its count) is therefore **not verified** here.

## Q4. Which roadmap/survey papers capture the field's state at key moments?

### Takeaway
Five snapshots bracket the field: Hsia, Davis & Kung (1993), Zave (1997), the two millennium roadmaps (Nuseibeh & Easterbrook; van Lamsweerde, both ICSE 2000), Cheng & Atlee (FOSE 2007), and Jarke et al.'s "design requirements" agenda (2011). Neill & Laplante (2003) is a practice-side snapshot. Of these, Nuseibeh & Easterbrook is the most cited (S2 ≈ 2,400) and the best single entry point.

### Cited Findings
- **Hsia, Davis & Kung (1993)**, "Status report: requirements engineering", *IEEE Software* 10(6):75–79 — [doi:10.1109/52.241974](https://doi.org/10.1109/52.241974).
  - It argues that "in general, requirements engineering produces one large document, written in a natural language, that few people bother to read. Projects that do read and follow the document often build systems that do not satisfy needs."
  - It outlines payoff areas including improving natural-language specifications, rapid prototyping and requirements animation, requirements clustering, requirements-based testing, computer-aided RE, requirements reuse, research into methods, knowledge engineering, formal methods, and a unified framework (abstract via OpenAlex).
- **Zave (1997)**, *ACM Computing Surveys* — [doi:10.1145/267580.267581](https://doi.org/10.1145/267580.267581). A classification scheme for RE research that grew out of chairing RE'95 ([Zave's page](https://www.pamelazave.com/fre.html)). Its lasting legacy is the definition (Q2).
- **Nuseibeh & Easterbrook (2000)**, "Requirements engineering: a roadmap", *The Future of Software Engineering* (ICSE 2000), pp. 35–46 — [doi:10.1145/336512.336523](https://doi.org/10.1145/336512.336523). Read from the [author copy](http://www.cs.toronto.edu/~sme/papers/2000/ICSE2000.pdf).
  - **Core activities:** "eliciting requirements, modelling and analysing requirements, communicating requirements, agreeing requirements, and evolving requirements". In practice they "are actually interleaved, iterative, and may span the entire software systems development life cycle".
  - **The 1990s:** the "three radical new ideas" (Q1).
  - **Six challenges for the 2000s:**
    1. formal modelling and analysis of *environment* properties, tolerating inconsistent, incomplete and evolving models;
    2. "Bridging the gap between requirements elicitation approaches based on contextual enquiry and more formal specification and analysis techniques";
    3. "Richer models for capturing and analysing non-functional requirements… [which] have defied a clear characterisation for decades";
    4. the impact of architectural choices on requirements;
    5. reuse of requirements models and reference models (moving "from being creative design to being normal design");
    6. "Multidisciplinary training for requirements practitioners".
  - **Closing diagnosis:** "Many delivered systems do not meet their customers' requirements due, at least partly, to ineffective RE. RE is often treated as a time-consuming, bureaucratic and contractual process."
  - Citations: S2 2,409.
- **van Lamsweerde (2000)**, "Requirements engineering in the year 00: a research perspective", *ICSE 2000*, pp. 5–19 — [doi:10.1145/337180.337184](https://doi.org/10.1145/337180.337184). It frames RE around goals, operationalisation and responsibility assignment, and lists processes "domain analysis, elicitation, specification, assessment, negotiation, documentation, and evolution". "Getting high-quality requirements is difficult and critical" (abstract via OpenAlex). Citations: S2 868.
- **Neill & Laplante (2003)**, "Requirements engineering: the state of the practice", *IEEE Software* 20(6):40–45 — [doi:10.1109/MS.2003.1241365](https://doi.org/10.1109/MS.2003.1241365). An exploratory practitioner survey motivated by the fact that "Little contemporary data exists" on actual practices for elicitation, specification, document development and validation (abstract via OpenAlex).
- **Cheng & Atlee (2007)**, "Research directions in requirements engineering", *Future of Software Engineering (FOSE '07)*, pp. 285–303 — [doi:10.1109/FOSE.2007.17](https://doi.org/10.1109/FOSE.2007.17).
  - It reviews the state of the art by requirements task (elicitation, modelling, analysis…) to "identify mature areas of research, as well as areas that warrant further investigation".
  - It then reviews "strategies for performing and extending RE research results" and highlights "'hot' current and future research topics, which aim to address RE needs for emerging systems of the future" (abstract via OpenAlex). Citations: S2 745.
  - An expanded version is "Current and future research directions in requirements engineering", LNBIP 14, pp. 11–43 (2009) — [doi:10.1007/978-3-540-92966-6_2](https://doi.org/10.1007/978-3-540-92966-6_2).
- **Jarke, Loucopoulos, Lyytinen, Mylopoulos & Robinson (2011)**, "The brave new world of design requirements", *Information Systems* 36(7):992–1008 — [doi:10.1016/j.is.2011.04.003](https://doi.org/10.1016/j.is.2011.04.003). Citations: S2 141; abstract not retrievable.
  - Its precursor by the same five authors is the Dagstuhl "08412 Manifesto – High-Impact Requirements for Software-Intensive Systems" (2009) — [doi:10.4230/DagSemProc.08412.3](https://doi.org/10.4230/DagSemProc.08412.3) (a DataCite DOI, verified via the DataCite API, not Crossref).
  - The manifesto says RE "needs a better alignment between its research focus and its grounding in practical needs". It proposes "four key principles":
    1. "intertwining of requirements with implementation and organizational contexts";
    2. "dynamic evolution of requirements";
    3. "architectures as a critical stabilizing force";
    4. "high levels of design complexity and necessity to employ new ways to mitigate it".

    Source: [Dagstuhl DROPS page](https://drops.dagstuhl.de/entities/document/10.4230/DagSemProc.08412.3).

### Inferences
- **The concerns shift visibly across the roadmaps:**
  - 1993: the practice gap, with an unread natural-language document;
  - 2000: environment modelling, goals, conflict and inconsistency, NFRs, social context;
  - 2007: scale and emerging kinds of systems;
  - 2011: requirements intertwined with architecture, implementation and continuous evolution.

  This sequence is a ready-made spine for the "eras" timeline.
- **What the writer should use.** For a reader who wants to become good at specifying, N&E 2000 is the single best overview. Its five activities remain a sound table of contents for practice. Jarke et al.'s four principles are the best short statement of why "complete up-front specification" is no longer the dominant model.

### Gaps
- The abstract of the 2011 *Information Systems* paper was not retrievable (Elsevier blocked). The four principles are taken from the authors' 2009 Dagstuhl manifesto. The CAiSE 2010 version is reportedly titled "…: Four Key Principles", but I did not verify that.
- Cheng & Atlee's specific list of research strategies and "hot topics" was not extracted (full text not opened).
- Post-2011 roadmaps were not surveyed; another researcher may cover them.

## Q5. Which textbooks are canonical, and what is each one's distinctive contribution? (current editions checked)

### Takeaway
Practitioners' standard references are Wiegers & Beatty (still the 3rd edition, 2013), its distilled companion Wiegers & Hokanson (2023), and Robertson & Robertson's Volere-based book, which has a new 4th edition (Aug 2024, with Adrian Reed). The academic standard references are van Lamsweerde (2009, goal-oriented/KAOS), Pohl (2010), and Dick, Hull & Jackson (4th ed. 2017, systems-engineering flavour). Classics from the 1989–2002 formative period are Gause & Weinberg, Davis, Sommerville & Sawyer, Kotonya & Sommerville, Lauesen, and Jackson's two books. Meyer (2022) is the newest broad synthesis.

### Cited Findings

| Book (current edition) | Publisher, date, size | Distinctive contribution (sourced) | Link |
|---|---|---|---|
| **Wiegers & Beatty, *Software Requirements*, 3rd ed.** | Microsoft Press, published 15 Aug 2013, 672 pp. | "Now in its third edition, this classic guide… a contemporary set of practices covering the full range of requirements development and management activities on software projects" (publisher). A web search on 2026‑10‑23 found no 4th edition. | [Microsoft Press Store](https://www.microsoftpressstore.com/store/software-requirements-9780735679665) |
| **Wiegers & Hokanson, *Software Requirements Essentials: Core Practices for Successful Business Analysis*** | Addison-Wesley, 9 Mar 2023, 208 pp., 1st ed. | "presents 20 core practices for successful requirements planning, elicitation, analysis, specification, validation, and management… for both traditional and agile projects" (publisher) | [InformIT](https://www.informit.com/store/software-requirements-essentials-core-practices-for-9780138190286) |
| **Robertson, Robertson & Reed, *Mastering the Requirements Process*, 4th ed.** | Addison-Wesley Professional, 30 Aug 2024 (© 2025), 656 pp. | "an almost complete rewrite that brings requirements discovery into today's world--it is the book for today's business analyst". It offers "an industry-proven process for getting to the essence of the business problem and then writing unambiguous and testable requirements" (publisher). The 3rd ed. (6 Aug 2012, 576 pp.) is organised around "The Volere Requirements Process", the "Volere Requirements Specification Template", "Fit Criteria", a "Quality Gateway", "Trawling for Requirements" and "Project Blastoff" (3rd-ed. ToC, [InformIT](https://www.informit.com/store/mastering-the-requirements-process-getting-requirements-9780321815743)). | [InformIT (4th ed.)](https://www.informit.com/store/mastering-the-requirements-process-9780137969555) |
| **van Lamsweerde, *Requirements Engineering: From System Goals to UML Models to Software Specifications*** | Wiley, Feb 2009, 720 pp., 1st ed. | A part on "goal-based reasoning techniques to support the various steps of the KAOS method". A further part "goes beyond requirements engineering to discuss the mapping from goal-oriented requirements to software specifications and to software architecture" (publisher). | [Wiley](https://www.wiley.com/en-us/Requirements+Engineering%3A+From+System+Goals+to+UML+Models+to+Software+Specifications-p-9780470012703) |
| **Pohl, *Requirements Engineering: Fundamentals, Principles, and Techniques*** | Springer, 2010 | By the author of the three-dimensions framework (Q3). Springer's description could not be opened, so its specific contribution is not verified here. | [doi:10.1007/978-3-642-12578-2](https://doi.org/10.1007/978-3-642-12578-2) |
| **Dick, Hull & Jackson, *Requirements Engineering*, 4th ed.** | Springer, 2017. Earlier: Hull, Jackson & Dick, 3rd ed., 2011 ([doi](https://doi.org/10.1007/978-1-84996-405-0)) | No later edition found in Crossref. Springer's marketing copy reportedly stresses a systems-engineering perspective and "rich traceability" — **UNVERIFIED** (Springer pages blocked; this came from a search summary). | [doi:10.1007/978-3-319-61073-3](https://doi.org/10.1007/978-3-319-61073-3) |
| **Sommerville & Sawyer, *Requirements Engineering: A Good Practice Guide*** | Wiley, May 1997, 416 pp. | "presents a set of guidelines which reflect the best practice in requirements engineering… [plus] process improvement schemes… so that you can pick and choose". It describes complete, consistent requirements as an ideal that "is probably unattainable" (publisher). | [Wiley](https://www.wiley.com/en-us/Requirements+Engineering%3A+A+Good+Practice+Guide-p-9780471974444) |
| **Kotonya & Sommerville, *Requirements Engineering: Processes and Techniques*** | Wiley, Sep 1998, 296 pp. | The publisher page gives no substantive description. Contribution not verified here. | [Wiley](https://www.wiley.com/en-us/Requirements+Engineering%3A+Processes+and+Techniques-p-9780471972082) |
| **Gause & Weinberg, *Exploring Requirements: Quality Before Design*** | Dorset House, 1989 (year per [Pohl's citation](https://people.eecs.ku.edu/~saiedian/Teaching/812/Lectures/Misc/pohl-intro-re.pdf)). Now sold as Leanpub e-books *Exploring Requirements One: Quality Before Design* and *Two*. | "tells how you can assure the requirements are right—before the product is designed" (Leanpub). It is the classic human/team-centred view; see the Gause & Weinberg definition in Q2. | [Leanpub](https://leanpub.com/exploringrequirementsone) |
| **Davis, *Software Requirements: Objects, Functions and States* (Revised Edition)** | Pearson/Prentice Hall, 4 Mar 1993, 552 pp., 2nd ed. | Title signals its organisation around object-, function- and state-oriented views. No further description verified. | [InformIT](https://www.informit.com/store/software-requirements-objects-functions-and-states-9780138057633) |
| **Lauesen, *Software Requirements: Styles and Techniques*** | Addison-Wesley, 11 Dec 2001 (© 2002), 608 pp. | "This textbook is based on real-life examples, and it discusses the many ways of specifying software requirements in practice… what analysts write in real-life specifications; what works and what doesn't work" (publisher). | [InformIT](https://www.informit.com/store/software-requirements-styles-and-techniques-9780201745702) |
| **Meyer, *Handbook of Requirements and Business Analysis*** | Springer, 2022 | Per the author: "The Handbook introduces a comprehensive view of requirements including four elements or PEGS: Project, Environment, Goals and System. One of its principal contributions is the definition of a standard plan for requirements documents, consisting of the four corresponding books and replacing the obsolete IEEE 1998 structure." Chapters also cover use cases and user stories, object-oriented requirements and formal methods ([Meyer's blog](https://bertrandmeyer.com/?p=5941)). | [doi:10.1007/978-3-031-06739-6](https://doi.org/10.1007/978-3-031-06739-6) |
| **Jackson, *Software Requirements & Specifications* (1995) and *Problem Frames* (2001)** | Addison-Wesley | The intellectual foundation books; see Q3. | [InformIT (1995)](https://www.informit.com/store/software-requirements-specifications-a-lexicon-of-practice-9780201877120) · [InformIT (2001)](https://www.informit.com/store/problem-frames-analyzing-and-structuring-software-development-9780201596274) |

### Inferences
- **Suggested reading order for a software engineer who wants to specify well:**
  1. *Practice:* Wiegers & Beatty (or the shorter Wiegers & Hokanson), then Robertson et al. for an end-to-end process and measurable "fit criteria".
  2. *Thinking tools:* Jackson's 1995 lexicon and *Problem Frames*.
  3. *Rigorous modelling:* van Lamsweerde (goals, obstacles, agents, the KAOS method).
  4. *Breadth/standards:* Pohl (2010) or Dick, Hull & Jackson (systems engineering).
- **The canon is ageing but being maintained.** Two major practitioner books were refreshed in 2023–2024. The academic textbooks (2009–2017) predate the current standards revisions (P29148, P24765). Meyer explicitly positions his plan as replacing the IEEE 830‑1998 SRS structure.

### Gaps
- Distinctive contributions of Pohl (2010), Kotonya & Sommerville (1998) and Dick/Hull/Jackson (2017) could not be verified from publisher descriptions: Springer blocked access and the Wiley page has none. The first-edition years of Robertson & Robertson (1999?) and Hull, Jackson & Dick (2002?) were not verified.
- The IREB CPRE Foundation Level textbook/handbook and Pohl & Rupp's *Requirements Engineering Fundamentals* were not checked.
- Leffingwell & Widrig, Alexander & Beus-Dukic, Laplante, Cockburn and Cohn were not assessed here; agile-oriented books are another researcher's scope.

## Q6. What early empirical evidence established that requirements problems drive project failure, and how has it been critiqued?

### Takeaway
The early evidence is consistent in direction. Each of these studies found requirements-related problems to be important, common, or causally linked to failures, rework and safety errors:
- Bell & Thayer 1976 (data on "two very different types of software requirements");
- Curtis et al. 1988 (17 large projects);
- Lutz 1993 (safety-related errors in embedded systems);
- Gotel & Finkelstein 1994 (100+ practitioners on traceability);
- Hofmann & Lehner 2001;
- Hall et al. 2002 (12 companies);
- Damian & Chisan 2006 (30-month case study);
- Kamata & Tamai 2007 (32 projects).

However, the two most-quoted *numbers* are weak. The Standish CHAOS 1994 failure rates have been criticised for opaque method, failure-story sampling and misleading definitions. The "100× cost-to-fix" curve rests on old data and was not reproduced in 171 modern projects (Menzies et al. 2017).

### Cited Findings

#### Early and classic evidence
- **Bell & Thayer (1976).** Analysed "Data on two very different types of software requirements". "The results are dramatic: software requirements are important, and their problems are surprisingly similar across projects" ([OpenAlex abstract](https://api.openalex.org/works/W2006210705); paper link UNVERIFIED, see Q1).
- **Boehm (1976)** first reported the delayed-issue / cost-to-fix effect ([Menzies et al.](https://arxiv.org/abs/1609.04886) citing [doi:10.1109/TC.1976.1674590](https://doi.org/10.1109/TC.1976.1674590)).
  - Boehm & Basili's "Software Defect Reduction Top 10 List", *Computer* 34(1):135–137 (2001) — [doi:10.1109/2.962984](https://doi.org/10.1109/2.962984) (Crossref titles it "Top 10 list [software development]"). Menzies et al. state the delayed-issue effect "was listed at #1 by Boehm and Basili in their 'Top 10 list'" ([arXiv](https://arxiv.org/abs/1609.04886)).
  - I could not open the *Computer* text to quote its exact "100 times" wording.
- **Curtis, Krasner & Iscoe (1988).** Interviewed personnel from 17 large projects. A layered behavioural model shows how "the thin spread of application domain knowledge, fluctuating and conflicting requirements, and communication bottlenecks and breakdowns" affected productivity and quality "through their impact on cognitive, social, and organizational processes" — [doi:10.1145/50087.50089](https://doi.org/10.1145/50087.50089) (abstract via OpenAlex; S2 2,399 citations).
- **Lutz (1993).** "Analyzing software requirements errors in safety-critical, embedded systems", *RE'93*, pp. 126–133 — [doi:10.1109/ISRE.1993.324825](https://doi.org/10.1109/ISRE.1993.324825). "Safety-related software errors are shown to arise most commonly from: discrepancies between the documented requirements specifications and the requirements needed for correct functioning of the system; and misunderstandings of the interface of the software with the rest of the system" (abstract via OpenAlex).
- **Gotel & Finkelstein (1994).** Traceability problems are studied empirically with "over 100 practitioners". Most stem from inadequate pre-RS traceability — [doi:10.1109/ICRE.1994.292398](https://doi.org/10.1109/ICRE.1994.292398).
- **Standish Group CHAOS report (1994)** — original URL [standishgroup.com/…/chaos_report_1994.pdf](https://www.standishgroup.com/sample_research_files/chaos_report_1994.pdf), **UNVERIFIED: it returns HTTP 404 as of 2026‑10‑23**. Its figures as reported by its critics:
  - "In 1994, Standish reported a shocking 16 percent project success rate, another 53 percent of the projects were challenged, and 31 percent failed outright"; "Their total sample size was 365 respondents representing 8,380 applications" — [Eveleens & Verhoef 2010, author copy](https://www.cs.vu.nl/~x/chaos/chaos.pdf).
  - The "189% average cost overrun", described in the report as "… 52.7% of projects will overrun their initial cost estimates by 189%" — [Jørgensen & Moløkken-Østvold 2006, author copy](https://web-backend.simula.no/sites/default/files/publications/Jorgensen.2006.4.pdf).
- **Hofmann & Lehner (2001).** "Requirements engineering as a success factor in software projects", *IEEE Software* 18(4):58–66 — [doi:10.1109/MS.2001.936219](https://doi.org/10.1109/MS.2001.936219). The article opens by asserting that deficient requirements are "the single biggest cause of software project failure" and cites Capers Jones's finding, from "several hundred organizations", that "RE is deficient in more than 75 percent of all enterprises" (opening text via OpenAlex; this is a secondary claim from Jones).
- **Hall, Beecham & Rainer (2002).** "Requirements problems in twelve software companies: an empirical analysis", *IEE Proc.–Software* 149(5):153–160 — [doi:10.1049/ip-sen:20020694](https://doi.org/10.1049/ip-sen:20020694). "The findings suggest that most requirements problems are organisational rather than technical, and that there is a relationship between companies' maturity and patterns of requirements problems" (abstract via OpenAlex).
- **Damian & Chisan (2006).** *IEEE TSE* 32(7):433–453 — [doi:10.1109/TSE.2006.61](https://doi.org/10.1109/TSE.2006.61).
  - It notes that while "the existing literature suggests that effective requirements engineering can lead to improved productivity, quality, and risk management, there is little evidence to support this".
  - In a "30-month case study of a large software development project undergoing requirements process improvement", "an effective requirements process at the beginning of the project had positive outcomes throughout the project lifecycle", improving negotiation, planning, feature creep, testing, defects, rework and product quality (abstract via OpenAlex).
- **Kamata & Tamai (2007).** *RE'07*, pp. 69–78 — [doi:10.1109/RE.2007.31](https://doi.org/10.1109/RE.2007.31). They studied 32 projects (2003–2005) in a Tokyo business-application division, scoring SRS quality against the IEEE 830‑1998 structure.
  - "a relatively small set of SRS items have strong impact on project success or failure".
  - Section 1 (purpose, overview, general context) is "rich in normal projects and poor in overrun projects".
  - Poor Section 1 combined with rich function descriptions tends towards cost overrun (abstract via OpenAlex).
- **Later pointer: NaPiRE.** Méndez Fernández et al. (23 authors), "Naming the pain in requirements engineering: Contemporary problems, causes, and effects in practice", *Empirical Software Engineering* 22(5):2298–2338 (online Oct 2016) — [doi:10.1007/s10664-016-9451-7](https://doi.org/10.1007/s10664-016-9451-7). Its abstract was not retrievable.
  - The companion *IEEE Software* paper comparing Brazil and Germany concludes "in RE, human interaction is necessary for eliciting and specifying high-quality requirements, regardless of country, project type, or company size" — [doi:10.1109/MS.2015.122](https://doi.org/10.1109/MS.2015.122) (abstract via Semantic Scholar).

#### Critiques (brief; debates are covered in depth elsewhere)
- **Glass (2006)**, "The Standish report: does it really describe a software crisis?", *CACM* 49(8):15–16 — [doi:10.1145/1145287.1145301](https://doi.org/10.1145/1145287.1145301). It reconsiders "the relevancy of a frequently cited report on software project failures" (abstract via OpenAlex). Eveleens & Verhoef summarise Glass and Jørgensen as holding that "the only way to assess the Chaos results' credibility is to use Standish's data and reiterate their analyses" ([E&V](https://www.cs.vu.nl/~x/chaos/chaos.pdf)). The CACM full text could not be opened (HTTP 403).
- **Jørgensen & Moløkken-Østvold (2006)**, "How large are software cost overruns? A review of the 1994 CHAOS report", *Information and Software Technology* 48(4):297–301 — [doi:10.1016/j.infsof.2005.07.002](https://doi.org/10.1016/j.infsof.2005.07.002).
  - The 189% figure is ambiguous and far from other surveys.
  - The 1994 sample was solicited by asking executives "to share failure stories", quoted from the CHAOS report.
  - "there are reasons to doubt the validity of the Standish Group's 1994 cost overrun results and… a continued use of these results may hinder progress" ([author copy](https://web-backend.simula.no/sites/default/files/publications/Jorgensen.2006.4.pdf)).
- **Eveleens & Verhoef (2010)**, "The rise and fall of the Chaos report figures", *IEEE Software* 27(1):30–36 — [doi:10.1109/MS.2009.154](https://doi.org/10.1109/MS.2009.154). They applied Standish's definitions to "5,457 forecasts of 1,211 real-world projects". Conclusion: the definitions of successful and challenged projects "have four major problems: they're misleading, one-sided, pervert the estimation practice, and result in meaningless figures" ([author copy](https://www.cs.vu.nl/~x/chaos/chaos.pdf)).
- **Menzies, Nichols, Shull & Layman (2017)**, "Are delayed issues harder to resolve? Revisiting cost-to-fix of defects throughout the lifecycle", *Empirical Software Engineering* 22(4):1903–1935 — [doi:10.1007/s10664-016-9469-x](https://doi.org/10.1007/s10664-016-9469-x).
  - They tested the delayed-issue effect "in 171 software projects conducted around the world in the period from 2006–2014" (TSP projects) and "found no evidence for the delayed issue effect".
  - "DIE might be an historical relic that occurs intermittently only in certain kinds of projects".
  - On the literature: "the evidence for delayed issue effect is both very sparse and very old" (abstract and [arXiv text](https://arxiv.org/abs/1609.04886)).

### Inferences
- **Evidence strength.** The qualitative claim that requirements problems are frequent, consequential and largely human/organisational is well supported by convergent field studies across decades (1976, 1988, 1993, 1994, 2002, 2006, 2007, 2016/17). The quantitative headline claims are weak and should be presented with caveats or not at all:
  - "only 16% of projects succeed" (CHAOS 1994);
  - "requirements errors cost 100× more to fix later";
  - "RE deficient in >75% of enterprises" (Jones via Hofmann & Lehner).
- **Evidence that *improving* RE pays off is thinner than evidence that RE problems hurt.** Damian & Chisan explicitly say this. Their study and Kamata & Tamai's are the best early positive-payoff studies, but each is a single organisation.
- Lutz's result (errors at the documented-vs-needed requirements gap and at system interfaces) independently supports the Jackson/Zave emphasis on environment and interface phenomena (Q3).

### Gaps
- The CHAOS 1994 factor tables (e.g. "user involvement", "incomplete requirements & specifications", "changing requirements & specifications" percentages) could not be verified. The original report is offline (404) and archive.org was blocked.
- Hofmann & Lehner's study design (number of teams and companies) and quantitative findings (e.g. share of effort on RE) were not accessible.
- Bell & Thayer's detailed counts were not accessible.
- The NaPiRE EMSE abstract and quantitative results were not retrieved.

## Q7. Synthesis: which 10–15 works form the core canon, what is the consensus, and what remains open?

### Takeaway
Fifteen items make up the foundational canon, ranked by foundational importance for someone learning to specify (citation counts in brackets):

| # | Item | Why it matters | S2 citations |
|---|---|---|---|
| 1 | Zave & Jackson 1997 | the formal foundation: environment, control, domain knowledge | 874 |
| 2 | Gunter et al. 2000 | WRSPM; W ∧ S ⇒ R | 308 |
| 3 | Jackson 1995 W&M, with the 1995 lexicon and *Problem Frames* 2001 | problem-oriented thinking | 223 for W&M |
| 4 | Nuseibeh & Easterbrook 2000 | best overview | 2,409 |
| 5 | Goal-oriented RE: van Lamsweerde 2001 tour, KAOS 1993, i* 1997, NFR 1992 | why/how, agents, alternatives | 2,107 / 2,254 / 1,873 / 1,183 |
| 6 | Ross & Schoman 1977 | requirements definition; why/what/how | 932 |
| 7 | Heninger 1980, with Parnas & Madey 1995 | precise black-box requirements; four-variable model | 595 / 454 |
| 8 | Zave 1997 | canonical definition | 591 |
| 9 | Brooks 1987 | the "hardest single part" argument | 527, Computer record only |
| 10 | Bell & Thayer 1976 | early empirical evidence | 271 |
| 11 | Curtis et al. 1988 | field evidence on domain knowledge and volatile requirements | 2,399 |
| 12 | Pohl 1994 | three dimensions | 303 |
| 13 | Gotel & Finkelstein 1994 | traceability | 1,533 |
| 14 | Rittel & Webber 1973, with Goguen & Linde 1993 | wicked problems; social elicitation | 15,532 / 598 |
| 15 | Cheng & Atlee 2007, with Jarke et al. 2011 | where the field went next | 745 / 141 |

The consensus: requirements are about the world; they must state purpose, not only function; RE is iterative, social and multidisciplinary; perfect completeness and consistency are ideals to manage toward. The main open issues: how to bridge informal/social and formal approaches; how to treat evolving, intertwined requirements; and how to build an evidence base stronger than CHAOS and the cost-to-fix folklore.

### Cited Findings
- Citation snapshot (S2 via [batch API](https://api.semanticscholar.org/graph/v1/paper/batch); OA via [OpenAlex](https://api.openalex.org/works); 2026‑10‑23):

  | Work | S2 | OA |
  |---|---|---|
  | Rittel & Webber 1973 | 15,532 | 16,312 |
  | N&E 2000 | 2,409 | – |
  | Curtis et al. 1988 | 2,399 | 2,076 |
  | KAOS 1993 | 2,254 | – |
  | van Lamsweerde 2001 | 2,107 | – |
  | Yu 1997 | 1,873 | 1,579 |
  | Gotel & Finkelstein 1994 | 1,533 | – |
  | NFR 1992 | 1,183 | 1,019 |
  | Ross & Schoman 1977 | 932 | 845 |
  | Zave & Jackson 1997 | 874 | 735 |
  | van Lamsweerde 2000 | 868 | 671 |
  | Cheng & Atlee 2007 | 745 | 662 |
  | Heninger 1980 | 595 | 504 |
  | Zave 1997 | 591 | 428 |
  | Hofmann & Lehner 2001 | 587 | 516 |
  | Parnas & Madey 1995 | 454 | 415 |
  | Lutz 1993 | 370 | 285 |
  | Gunter et al. 2000 | 308 | 155 |
  | Pohl 1994 | 303 | 273 |
  | Bell & Thayer 1976 | 271 | 219 |
  | Jackson 1995 W&M | 223 | 178 |
  | Jarke et al. 2011 | 141 | 126 |
  | Hsia et al. 1993 | 66 | 122 |

  Brooks's *Computer* record shows only 527 (S2) because citations are split across reprints.
- **Consensus statements in the sources:**
  - "what a system should do and not how" is "widely agreed" ([Pohl overview](https://people.eecs.ku.edu/~saiedian/Teaching/812/Lectures/Misc/pohl-intro-re.pdf));
  - RE activities "are actually interleaved, iterative, and may span the entire software systems development life cycle" and RE is "multi-disciplinary, human-centred" ([N&E 2000](http://www.cs.toronto.edu/~sme/papers/2000/ICSE2000.pdf));
  - "all descriptions involved in requirements engineering should be descriptions of the environment" ([Zave & Jackson 1997](https://doi.org/10.1145/237432.237434));
  - the complete, consistent requirements set is an ideal that "is probably unattainable" ([Sommerville & Sawyer, publisher](https://www.wiley.com/en-us/Requirements+Engineering%3A+A+Good+Practice+Guide-p-9780471974444)), and the attempt "to build consistent and complete requirements models is futile" ([N&E 2000](http://www.cs.toronto.edu/~sme/papers/2000/ICSE2000.pdf)).
- **Disagreements and open issues in the sources:**
  - Zave & Jackson's ontology is "incomplete" without stakeholder beliefs, desires, intentions and attitudes ([Jureta et al. 2008](https://arxiv.org/abs/0811.4364)).
  - Jackson deliberately excludes social and political concerns from problem analysis ([Problem Frames preface](https://www.informit.com/store/problem-frames-analyzing-and-structuring-software-development-9780201596274)), whereas the ethnographic school foregrounds them ([Goguen & Linde 1993](https://doi.org/10.1109/ISRE.1993.324822)).
  - Bridging contextual enquiry and formal specification was an open challenge in 2000 ([N&E 2000](http://www.cs.toronto.edu/~sme/papers/2000/ICSE2000.pdf)).
  - Jarke et al. call for refocusing RE around intertwining, evolution, architecture and complexity ([Dagstuhl manifesto](https://drops.dagstuhl.de/entities/document/10.4230/DagSemProc.08412.3)).
  - The empirical base for RE's payoff is "scarce" ([Damian & Chisan 2006](https://doi.org/10.1109/TSE.2006.61)), and headline statistics are contested ([Eveleens & Verhoef 2010](https://www.cs.vu.nl/~x/chaos/chaos.pdf); [Menzies et al. 2017](https://doi.org/10.1007/s10664-016-9469-x)).

### Inferences
- **Corrections to the suggested list** (some items were mis-described or more minor than assumed):
  - **Goguen:** use Goguen & Linde (RE'93, DOI'd and well cited) as the citable anchor rather than the hard-to-find 1994 chapter.
  - **Parnas & Madey (1995):** best presented together with its root, Heninger's 1980 A‑7E paper, which is more cited.
  - **Jarke et al. (2011):** much less cited than the other roadmaps. Treat it as the marker of a 2010s reorientation rather than as canon.
  - **CHAOS 1994:** historically influential but should be cited as the *claim that was critiqued*, not as evidence.
  - **Editions:** Hull, Jackson & Dick's current edition is the 4th (2017, author order Dick, Hull, Jackson). Robertson & Robertson now has a 2024 4th edition with Adrian Reed. Wiegers & Beatty remains at the 3rd edition (2013).
  - **Additions:** Heninger 1980, Lutz 1993, Gotel & Finkelstein 1994, Hsia et al. 1993, Kamata & Tamai 2007, Damian & Chisan 2006 and the Jureta et al. 2008 critique are worth adding.
- **The practical core for the target reader** (someone who will specify but not design):
  1. State goals and the "why" (Ross & Schoman; GORE).
  2. Write requirements in terms of the environment, and separate them from domain properties and assumptions (Jackson/Zave; van Lamsweerde).
  3. Specify only shared interface behaviour, and check W ∧ S ⇒ R informally or formally (Gunter et al.).
  4. Expect incompleteness, conflict and change, and manage them with traceability, negotiation and iteration (N&E; Gotel & Finkelstein; Jarke et al.).
  5. Treat elicitation as social discovery, not capture (Goguen & Linde; Curtis et al.).

### Gaps
- Citation counts are snapshots from two open indexes and undercount relative to Google Scholar (which was not queried). Rankings above combine counts with judgement.
- This file does not cover post-2011 developments beyond the status checks: crowd/data-driven RE, RE for ML, agile RE, and AI topics, which are out of scope.
