# Structuring requirements: abstraction levels, document templates, sentence patterns, agile artefacts, use cases, goal models, and model-based/formal notations

Conventions used in these notes. "DOI verified" means the DOI was fetched from `https://api.crossref.org/works/<DOI>` on 2026-10-23 and its title and year matched. Online-first year and issue year sometimes differ; both are given where relevant. "(excerpt)" means the claim was seen only in a search-engine excerpt of the cited page, not in the full text. "UNVERIFIED" means I could not open the link (blocked, paywalled or dead). Springer, ISO, ACM-Queue/CACM, O'Reilly and INCOSE pages blocked automated access, so for several papers I used abstracts (OpenAlex/Semantic Scholar), arXiv or PMC copies, or the authors' repositories instead.

## 1. Levels of abstraction: how standards and practice frameworks layer requirements from business need down to a testable criterion

### Takeaway
Every mature scheme has the same four-step spine: why (business or mission) → what stakeholders or users need → what the system or software must do → how each item is checked. The schemes differ in what they call each layer and where the check sits. Systems-engineering standards (ISO/IEC/IEEE 29148:2018, INCOSE) verify the system against its system- or software-level requirements and validate it against the stakeholder-level needs. They put a "Verification" section inside the SyRS and SRS. Agile practice (XP, BDD, SAFe) attaches acceptance criteria to each backlog item (the story, and in SAFe also the feature) and turns them into executable examples. Scrum's only built-in quality bar is the team-wide Definition of Done.

### Cited Findings

#### ISO/IEC/IEEE 29148:2018 (the current international standard)
- **Status.** IEEE lists "IEEE/ISO/IEC 29148-2018" as an **Active Standard** that supersedes 29148-2011. It was approved by the IEEE SA Board on 2018-10-23 and published on 2018-11-30. Its scope covers "the processes and products related to the engineering of requirements for systems and software products and services throughout the life cycle". It defines "Information items applicable to the engineering of requirements and their content" — [IEEE SA page](https://standards.ieee.org/ieee/29148/6937/). A search excerpt of the ISO page says the 2018 edition was "last reviewed and confirmed in 2024" — [ISO 72089](https://www.iso.org/standard/72089.html) (excerpt; the page returned 403 to me, so UNVERIFIED).
- **Process layers (clause 6, aligned with ISO/IEC/IEEE 15288).**
  - 6.2 Business or mission analysis process
  - 6.3 Stakeholder needs and requirements definition process
  - 6.4 System [System/Software] requirements definition process
  - 6.5 Requirements engineering activities in other technical processes
  - 6.6 Requirements management

  Source: [IEC preview of 29148:2018, table of contents](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiecieee29148%7Bed2.0%7Den.pdf).
- **Information items (clauses 8–9): four specification documents, one per layer** ([IEC preview TOC](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiecieee29148%7Bed2.0%7Den.pdf)):
  - **BRS, Business requirements specification (9.3).** Business purpose, business scope, business overview, major stakeholders, business environment, mission/goals/objectives, business model, information environment, business processes, business operational policies and rules, business operational constraints, operational modes, operational quality, business structure, **high-level operational concept**, **high-level operational scenarios**, other high-level life-cycle concepts, project constraints.
  - **StRS, Stakeholder requirements specification (9.4).** Stakeholder purpose and scope, stakeholders, business environment, mission/goals/objectives, business model, information environment, system processes, system operational policies and rules, operational constraints, system operational modes and states, system operational quality, **user requirements (9.4.15)**, **operational concept (9.4.16)**, **operational scenarios (9.4.17)**, other detailed concepts of the proposed system, project constraints.
  - **SyRS, System requirements specification (9.5).** System purpose, scope and overview; functional requirements; usability; performance; system interfaces; system operations; modes and states; physical characteristics; environmental conditions; security; information management; policy and regulation; life-cycle sustainment; packaging, handling, shipping and transportation; **Verification (9.5.18)**; assumptions and dependencies.
  - **SRS, Software requirements specification (9.6).** Purpose, scope, product perspective, product functions, user characteristics, limitations, assumptions and dependencies, apportioning of requirements, **specified requirements** (external interfaces, functions, usability, performance, logical database, design constraints, standards compliance, software system attributes), **Verification (9.6.19)**, supporting information.
  - **Annex A (normative): System operational concept (OpsCon).**
  - **Annex B (informative): Concept of operations (ConOps).**
  - **Annex C (normative): Tailoring policies.**
- **Lineage of the annexes.** A National Academies report says 29148's Annex A is "similar to and adapted from" IEEE 1362 (the ConOps standard) and that parts of clauses 5 and 8.3 are adapted from IEEE 1233 — [NAP OpenBook](https://www.nap.edu/read/26389/chapter/7) (excerpt).

#### INCOSE: needs versus requirements (Needs and Requirements Manual, 2024)
- **Verification versus validation.** "[F]or acceptance, certification, and qualification, the system or product being developed is verified against design input requirements and validated against its integrated set of needs." The Manual also holds that "adequate definition of lifecycle concepts and a well-formed set of needs is a prerequisite to the definition of a well-formed set of system design input requirements." Source: [INCOSE NRM Chapter 1 excerpt (Wiley)](https://media.wiley.com/product_data/excerpt/44/13941527/1394152744-8.pdf).
- **Organisational levels.** The Manual says "ISO/IEC/IEEE 15288 defines needs and requirements in terms of organizational levels: organizational (enterprise), strategic, operational, system, and system elements". Lifecycle concepts, needs and requirements (CNR) "are defined for each level at a level of abstraction appropriate to that level". The INCOSE SE Handbook maps these to three processes: Business or Mission Analysis (CNR at the strategic level), Stakeholder Needs and Requirements Definition (operational level) and System Requirements Definition (system level) — [NRM Ch. 1 excerpt](https://media.wiley.com/product_data/excerpt/44/13941527/1394152744-8.pdf).
- **Design input requirements.** "Design Input Requirements Definition" means "transforming the baselined integrated set of needs ... into well-formed design input requirements expressed as 'shall' statements". These requirements state "what the system, subsystem, or system element must do ... without stating how they are to be implemented (design outputs)" — [NRM Ch. 1 excerpt](https://media.wiley.com/product_data/excerpt/44/13941527/1394152744-8.pdf).
- **The book.** *INCOSE Needs and Requirements Manual*, by L. S. Wheatcraft, M. J. Ryan and T. E. Katz. Wiley published the e-book in October 2024 and the hardcover in November 2024 (528 pp.) — [Wiley](https://www.wiley.com/en-us/INCOSE+Needs+and+Requirements+Manual-p-9781394152742).
- **Guide to Writing Requirements v4.** Its table of contents has a section "Needs vs Requirements" (1.8). The file is dated April 2023 — [INCOSE GtWR v4 PDF](https://www.incose.org/docs/default-source/working-groups/requirements-wg/gtwr/incose_rwg_gtwr_v4_040423_final_drafts.pdf) (excerpt; UNVERIFIED, 403).

#### Wiegers & Beatty, *Software Requirements* (3rd ed., 2013)
- **Three levels.** Secondary summaries of the 3rd edition describe three levels, each with its own document ([chapter summary](https://www.slideshare.net/slideshow/reading-summary/32287703), excerpt):
  - **business requirements**: objectives and expected benefits, recorded in the vision and scope document;
  - **user requirements**: tasks users must be able to perform, recorded in a user requirements document (use cases, user stories);
  - **functional requirements**: the behaviour the software must have, recorded in the SRS.

  The functional requirements "enable users to accomplish their tasks, thereby satisfying the business requirements". Book: [Microsoft Press/InformIT](https://www.informit.com/store/software-requirements-9780735679665).
- **Vision and Scope template.** Wiegers' free template has these parts ([template via KU course site](https://people.eecs.ku.edu/~saiedian/812/Project/Wiegers-Resources/Chapter%205/Vision%20and%20Scope%20Template.docx), excerpt):
  - Business requirements: background, business opportunity, objectives and success criteria, customer/market needs, business risks.
  - Vision of the solution.
  - Scope and limitations.
  - Business context.

#### Gorschek & Wohlin, Requirements Abstraction Model (RAM; REJ 2006)
- **What it is.** RAM was built for market-driven product development. It has four abstraction levels, and incoming requirements are placed on a level and then abstracted or broken down. This makes them comparable with each other and with product strategy. "Comparison between requirements will allow for prioritization of requirements, which in many cases is impossible if the requirements are described on different abstraction levels" — [MDU publication page for the 2007 industrial evaluation](https://www.es.mdu.se/publications/1140-Industry_evaluation_of_the_Requirements_Abstraction_Model); original paper [REJ 11(1):79–101](https://doi.org/10.1007/s00766-005-0020-7) (DOI verified; online 2005, issue 2006).
- **Industrial evaluation.** Gorschek, Garre, Larsson & Wohlin, "Industry evaluation of the Requirements Abstraction Model", REJ 12(3):163–190, 2007 — [DOI](https://doi.org/10.1007/s00766-007-0047-z) (DOI verified).

#### Méndez Fernández & Penzenstadler, AMDiRE artefact model (REJ 2015)
- **Three artefact types (layers), each owned by a role.**
  1. **Context specification.** Covers "the overall project scope, the stakeholders, rules, goals, and constraints as well as ... the domain model", including business processes. It does not define how the system is used within them. Owner: **Business Analyst**.
  2. **Requirements specification.** A "black-box view", with requirements stated "from a user's perspective without constraining the internal realisation". Owner: **Requirements Engineer**.
  3. **System specification.** A "glass-box view" covering "a logical component architecture and ... behaviour realisation with, e.g., functions and interfaces". Owner: **System Architect**.

  The context and requirements specifications address the problem space; the system specification addresses the solution space and "is the interface to tie in with the design phase" — [arXiv full text](https://arxiv.org/abs/1611.10024); [REJ 20(4):405–434](https://doi.org/10.1007/s00766-014-0206-y) (DOI verified; online 2014, issue 2015).
- **Evidence base.** The authors say AMDiRE "emerges from 6 years of experiences in fundamental and evidence-based research", including industrial evaluations — [abstract](https://arxiv.org/abs/1611.10024).

#### Lauesen's goal–design scale (an alternative layering)
- **Four levels.** Lauesen separates goal-level, domain-level, product-level and design-level requirements. "Domain level requirements specify the activities that go on outside the product, while product level requirements specify what should come in and out of the product." Source: [Lauesen, *Software Requirements: Styles and Techniques*, preview](https://www.itu.dk/~slauesen/Reqs/SoftwReqsPre.pdf) (excerpt; the fetch failed).

#### Agile layering
- **Scrum Guide (2020).** Its only layers are the **Product Goal** ("the long-term objective for the Scrum Team"; "The Product Goal is in the Product Backlog") and **Product Backlog items**. Refinement "is the act of breaking down and further defining Product Backlog items into smaller more precise items". Quality is set by the **Definition of Done**, "a formal description of the state of the Increment when it meets the quality measures required for the product". The 2020 Guide never uses the phrases "user story" or "acceptance" (0 occurrences in the page text) — [Scrum Guide 2020](https://scrumguides.org/scrum-guide.html).
- **SAFe tiers.** "SAFe describes four tiers of work items that detail functional system behavior: **Epic, Capability, Feature, and Story**." A story is "a small, vertical slice of intended system behavior", and "Through acceptance criteria and tests, stories become more specific". Enabler stories cover "exploration, architecture, infrastructure, and compliance". The page was last updated 27 January 2025 — [SAFe Story](https://framework.scaledagile.com/story).
- **SAFe epics.** "Each epic requires an MVP, a Lean business case, and an estimate of costs". Epics are managed in a portfolio Kanban and approved by Portfolio Leadership — [SAFe Epic](https://framework.scaledagile.com/epic).
- **SAFe features and capabilities.** A feature is sized to be delivered by one Agile Release Train (ART) within one PI. A capability is "large solution functionality whose implementation often spans multiple ARTs", also sized for one PI — [SAFe Features and Capabilities](https://framework.scaledagile.com/features-and-capabilities) (page truncated behind a login).
- **SAFe's origin.** SAFe's requirements model descends from Leffingwell's *Agile Software Requirements* (2011) — [InformIT](https://www.informit.com/store/agile-software-requirements-lean-requirements-practices-9780321635846). This lineage is my inference; I did not open the book.
- **XP (Jeffries 2001).** A user story has three parts:
  - the **card**: "a token representing the requirement";
  - the **conversation**: "The requirement itself is communicated from customer to programmers through conversation";
  - the **confirmation**: examples, "preferably automated".

  "The confirmation provided by the acceptance test is what makes possible the simple approach of card and conversation" — [Jeffries, "Essential XP: Card, Conversation, Confirmation", 30 Aug 2001](https://ronjeffries.com/xprog/articles/expcardconversationconfirmation/).
- **BDD (North 2007).** Business outcomes "are too coarse-grained to be used to directly write software ... so we need to define requirements at some intermediate level". "Each feature is captured as a 'story', which defines the scope of the feature along with its acceptance criteria". The story template is "As a [role] I want [feature] So that [benefit]", with "Acceptance Criteria: (presented as Scenarios)", each written as "Given [context] ... When ... Then ..." — [North, "What's in a Story?", 11 Feb 2007](https://dannorth.net/blog/whats-in-a-story/).

#### Layer comparison (for the diagram; each cell is sourced above)

| Scheme | Layer 1: why | Layer 2: stakeholder/user need | Layer 3: system/software requirement | Layer 4: testable criterion |
|---|---|---|---|---|
| ISO/IEC/IEEE 29148:2018 | BRS (mission/goals/objectives, business processes, rules, high-level OpsCon & scenarios); Business or mission analysis process | StRS (user requirements, operational concept & scenarios, modes/states, operational quality); Stakeholder needs & requirements definition | SyRS (system) → SRS (software): functions, usability, performance, interfaces, constraints, attributes | "Verification" section inside SyRS (9.5.18) and SRS (9.6.19); validation against StRS. OpsCon is Annex A (normative), ConOps Annex B (informative) |
| INCOSE NRM 2024 / 15288 | Strategic level: lifecycle concepts, needs, MGOs | Operational level: integrated set of needs (the basis for validation) | System and system-element levels: design input requirements as "shall" statements, flowed down the architecture | System verification against requirements; system validation against needs |
| Wiegers & Beatty 2013 | Business requirements (vision & scope) | User requirements (use cases, user stories) | Functional requirements (SRS), plus business rules, quality attributes, interfaces, constraints | (acceptance tests/criteria; not verified in this session) |
| Gorschek & Wohlin RAM 2006 | 4 abstraction levels, top = product strategy (level names not verified) | … | … | lowest level |
| AMDiRE 2015 | Context specification (scope, goals, rules, domain model) | Requirements specification (black box) | System specification (glass box: logical architecture, functions, interfaces) | — |
| Scrum Guide 2020 | Product Goal | Product Backlog items | (refined, smaller PBIs) | Definition of Done (for the whole Increment) |
| SAFe (site, 2025) | Epic (MVP, Lean business case) | Capability (multi-ART, large solution) | Feature (one ART, one PI) → Story (vertical slice) | Story acceptance criteria and tests |
| XP/BDD (Jeffries 2001; North 2006/07) | Business outcome | Story: "As a [role] I want [feature] So that [benefit]" | — | Acceptance criteria as Given/When/Then scenarios, made executable |

### Inferences
- **A four-layer spine for the diagram.** The diagram can draw one common spine: Business/mission → Stakeholder/user needs → System/software requirements → Verification criterion. Each scheme then hangs off it:
  - 29148: BRS → StRS → SyRS/SRS, with OpsCon/ConOps attached at the BRS/StRS level.
  - Wiegers: business → user → functional.
  - SAFe: epic → capability → feature → story → acceptance criteria.
  - BDD: outcome → story → scenarios.
- **The standards and agile practice disagree about where the test lives.**
  - In 29148 and INCOSE, verification is a property of each system- or software-level requirement (the "Verification" sections and the verification/validation split).
  - In XP, BDD and SAFe, the acceptance criterion *is* the detailed requirement. The story is deliberately incomplete ("a token"), and the criteria or examples carry the precision.
  - Volere's fit criterion and Planguage's Scale/Meter (Section 3) are the document-centric equivalents: a measurable test attached to each atomic requirement.
- **Agile layers mostly divide by size.** Agile layers (epic/feature/story) are mainly a decomposition by size and timebox (portfolio → PI → iteration). The standards' layers divide by viewpoint and problem-versus-solution space (business → stakeholder → system → software). These are different axes. An epic can contain stakeholder needs *and* system-level requirements, so the mapping in the table is approximate.
- **Scrum prescribes no requirement format.** Product Goal, PBIs and the Definition of Done are its only primitives. "User story" and "acceptance criteria" come from XP, BDD and SAFe, not from Scrum.

### Gaps
- **IEEE Std 830-1998 outline.** I could not open 830 itself; IEEE's page confirms only that it is superseded and contains "several sample SRS outlines". The commonly quoted outline is from my background knowledge and is unverified:
  1. Introduction (purpose, scope, definitions, references, overview).
  2. Overall description (product perspective, product functions, user characteristics, constraints, assumptions and dependencies, apportioning).
  3. Specific requirements (external interfaces, functions, performance, logical database, design constraints, software system attributes, and organisation by mode, user class, object, feature, stimulus or functional hierarchy).
  4. Appendixes and index.

  29148:2018's SRS content (9.6) clearly carries much of this structure forward.
- **RAM level names.** The names Product, Feature, Function and Component (as the assignment states) could not be confirmed from an opened source. Only "four abstraction levels" was confirmed, and only in an excerpt.
- **Wiegers & Beatty.** I could not open the exact definitions or Figure 1-1 of the 3rd edition. I also could not check whether an edition newer than 2013 exists.
- **SAFe features.** The SAFe feature format (benefit hypothesis and acceptance criteria) is behind a login. I could not confirm the current SAFe version number; the pages show only 2025 update dates.
- **29148 revision status.** I could not confirm whether a revision of 29148 is under way as of October 2026.

## 2. Document templates: IEEE 830, ISO/IEC/IEEE 29148 information items, Volere, and artefact models (AMDiRE)

### Takeaway
Document templates have moved from one software-only SRS outline (IEEE 830-1998, now superseded) to a family of linked information items (BRS/StRS/SyRS/SRS plus OpsCon/ConOps in 29148:2018). Practitioner templates such as Volere add an atomic-requirement shell with a measurable "fit criterion". Artefact models (AMDiRE) go further and specify content and dependencies rather than chapter headings. In practice, companies use templates or guidelines but "seldom follow any fixed standard".

### Cited Findings
- **IEEE Std 830-1998.**
  - Status: "Superseded Standard ... Superseded by ISO/IEC/IEEE 29148:2011". Board approval 1998-06-25.
  - Content: "The content and qualities of a good software requirements specification (SRS) are described and several sample SRS outlines are presented". It is "aimed at specifying requirements of software to be developed but also can be applied to assist in the selection of in-house and commercial software products."
  - Source: [IEEE SA page](https://standards.ieee.org/ieee/830/1222/); [DOI](https://doi.org/10.1109/IEEESTD.1998.88286) (DOI verified).
- **ISO/IEC/IEEE 29148:2018 information items.** BRS (9.3), StRS (9.4), SyRS (9.5) and SRS (9.6), each with an example outline in clause 8 (8.2.2 BRS, 8.3.2 StRS, 8.4.2 SyRS). Annex A covers the System operational concept (normative), Annex B the Concept of operations (informative), and Annex C tailoring policies (normative). Clause 4.4 covers "Conformance to information item content" — [IEC preview TOC](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiecieee29148%7Bed2.0%7Den.pdf). Full contents are listed in Section 1.
- **Volere Requirements Specification Template (Robertson & Robertson; Atlantic Systems Guild), Edition 20.** It has 27 numbered sections ([Volere template page](https://www.volere.org/templates/volere-requirements-specification-template/)):
  1. Purpose of the Project
  2. Stakeholders
  3. Mandated Constraints
  4. Naming Conventions and Terminology
  5. Relevant Facts and Assumptions
  6. Scope of the Work
  7. Business Data Model and Data Dictionary
  8. Scope of the Product
  9. Functional Requirements
  10. Look and Feel
  11. Usability and Humanity
  12. Performance
  13. Operational and Environmental
  14. Maintainability and Support
  15. Security
  16. Cultural
  17. Compliance
  18. Open Issues
  19. Off-the-Shelf Solutions
  20. New Problems
  21. Tasks
  22. Migration to the New Product
  23. Risks
  24. Costs
  25. User Documentation and Training
  26. Waiting Room
  27. Ideas for Solutions
- **Fit criterion.** "To completely specify what is meant by the requirement, you must add a measurement against which it can be tested—that is, a fit criterion." The atomic "requirements shell" (snow card) is shown on the page only as an image — [Volere template page](https://www.volere.org/templates/volere-requirements-specification-template/). The companion book is Robertson & Robertson, *Mastering the Requirements Process* (3rd ed., 2012) — [InformIT](https://www.informit.com/store/mastering-the-requirements-process-getting-requirements-9780321815743).
- **AMDiRE.** An artefact-based approach in which "project participants concentrate on the RE artefacts rather than on the way of creating them". It contrasts with activity-based approaches and with chapter-heading templates such as Volere and IEEE 830, which the paper cites as typical document templates. Its artefact model has a content/structure view and integrates a role model and a process model through milestones — [arXiv full text](https://arxiv.org/abs/1611.10024); [REJ DOI](https://doi.org/10.1007/s00766-014-0206-y) (DOI verified).
- **Templates in practice.** In an interview study of 24 practitioners at 12 Swedish IT companies, "Most requirements specifications use templates or guidelines, although they seldom follow any fixed standard. Requirements are always structured in the document according to the main functionalities of the system or to project areas or system parts" — [Franch et al. 2023, abstract](https://doi.org/10.1007/s00766-023-00399-7) (DOI verified; abstract read via OpenAlex).

### Inferences
- **Which template to use.**
  - Use 29148's BRS/StRS/SyRS/SRS split when several parties (acquirer, supplier, regulator) need separate, layered documents.
  - Use Volere's checklist-style table of contents to make sure nothing is forgotten, especially non-functional categories, constraints, "relevant facts and assumptions" and the "waiting room" for deferred ideas.
  - Use the fit criterion to make every atomic requirement testable.
- **IEEE 830 is historical.** It was superseded in 2011, but it is still widely cited and taught.
- **The empirical picture.** "Template plus local adaptation, organised by functional area" is the norm (Franch et al.). Full standard conformance is rare.

### Gaps
- **Volere shell fields.** The page renders them as an image, so I could not verify them. From background knowledge they are: requirement #, type, event/use case #, description, rationale, originator, fit criterion, customer satisfaction/dissatisfaction, priority, conflicts, supporting materials, history.
- **Volere and book editions.** I found no date for Volere Edition 20. I did not check whether a newer edition of *Mastering the Requirements Process* exists.
- **Comparative evidence.** I found no study comparing outcomes (defects, cost) of projects that use different document templates.

## 3. Natural-language sentence patterns: "shall" and RFC 2119, EARS, Rupp/SOPHIST (MASTeR), boilerplates, Planguage, INCOSE rules

### Takeaway
Constrained natural language is the main way research has reached practice. Keyword conventions ("shall"; RFC 2119/8174) fix obligation levels. EARS adds a handful of clause patterns with a fixed temporal order. Rupp's template fixes condition–actor–modal–process slots. Planguage quantifies qualities with Scale/Meter/target levels. Evidence for EARS is mostly adoption claims and experience reports; I found no controlled experiment showing it improves requirement quality.

### Cited Findings
- **RFC 2119 (Bradner 1997).** It defines the key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY" and "OPTIONAL". MUST is equivalent to "REQUIRED" or "SHALL", SHOULD to "RECOMMENDED", and MAY to "OPTIONAL" — [RFC 2119 text](https://www.rfc-editor.org/rfc/rfc2119.txt); [DOI](https://doi.org/10.17487/RFC2119) (DOI verified).
- **RFC 8174 (Leiba 2017).** It "updates RFC 2119 by clarifying that only UPPERCASE usage of the key words have the defined special meanings". The words have those meanings "only when they are in all capitals" — [RFC 8174 text](https://www.rfc-editor.org/rfc/rfc8174.txt); [DOI](https://doi.org/10.17487/RFC8174) (DOI verified).
- **EARS (Mavin, Wilkinson, Harwood & Novak, RE'09).** [DOI](https://doi.org/10.1109/RE.2009.9) (DOI verified; RE'09 pp. 317–322). The official patterns, from [Alistair Mavin's EARS page](https://alistairmavin.com/ears/):
  - **Generic:** "While <optional pre-condition>, when <optional trigger>, the <system name> shall <system response>". The clauses "are always in the same order, following temporal logic". A requirement has zero or many preconditions, zero or one trigger, one system name, and one or many responses.
  - **Ubiquitous** (no keyword): "The <system name> shall <system response>".
  - **State-driven** ("While"): "While <precondition(s)>, the <system name> shall <system response>".
  - **Event-driven** ("When"): "When <trigger>, the <system name> shall <system response>".
  - **Optional feature** ("Where"): "Where <feature is included>, the <system name> shall <system response>".
  - **Unwanted behaviour** ("If … then"): "If <trigger>, then the <system name> shall <system response>".
  - **Complex:** combinations such as "While <precondition(s)>, When <trigger>, the <system name> shall <system response>".
- **EARS origin and adoption claims.** EARS was developed at Rolls-Royce plc while analysing airworthiness regulations for a jet-engine control system, and first published in 2009. It is described as "a mechanism to gently constrain textual requirements". The page lists Airbus, Bosch, Dyson, Honeywell, Intel, NASA, Rolls-Royce and Siemens as users, and university teaching in China, France, Germany, Sweden, the UK and the USA. It cites no data for its quality claims — [EARS page](https://alistairmavin.com/ears/).
- **EARS follow-ups and evaluations.**
  - [Big EARS (RE'10)](https://doi.org/10.1109/RE.2010.39) (DOI verified, pp. 277–282).
  - ["Ten Years of EARS", IEEE Software 36(5):10–14, 2019](https://doi.org/10.1109/MS.2019.2921164) (DOI verified). Its abstract reads: "we were initially unsure about publishing because we thought that EARS was too simple ... it is this simplicity that is perhaps the greatest strength of EARS". It includes practitioner case studies on agile cyber-physical development, nuclear-domain regulatory requirements, and Intel (abstract via Semantic Scholar).
  - Other evaluations found are experience reports: "Listens Learned (8 Lessons Learned Applying EARS)" (RE'16, four practitioners over six years), a report on teaching EARS to first-year students (Horkoff, EARS workshop 2018), and a pre/post survey at NITK — [Chalmers record](https://research.chalmers.se/en/publication/512738) (excerpt).
- **Rupp/SOPHIST template ("MASTeR").** As formalised by UPC's OpenReq conformance checker (an ABNF grammar), citing "Rupp, Requirements Templates – The Blueprint of your Requirement, SOPHIST GmbH, 2014" — [UPC GESSI OpenReq-CT](https://gessi.upc.edu/en/tools/tool-pages/openreq-upc/conformance-to-templates):
  - `<main> ::= <conditions> <actor> <modal> <last_part>`
  - `<conditions> ::= IF | AFTER | AS SOON AS | AS LONG AS`
  - `<modal> ::= SHALL | SHOULD | WILL`
  - `<last_part> ::= <vp> | PROVIDE <np> THE ABILITY TO <vp> | BE ABLE TO <vp>`
- **Gilb's Planguage.**
  - "'Scales of measure' form a central part of Planguage, a specification language and set of methods".
  - "A Meter (sometimes known as a 'Test') is a practical method for measuring".
  - "'Ambition' is one of the defined Planguage parameters".
  - Requirements carry benchmarks ("like Past"), constraints ("like Fail") and target levels ("like Goal"). The parameter list includes "Past, Record, Trend, Goal, Budget, Stretch, Wish, Fail and Survival".

  Source: [Gilb, "How to Quantify Quality: Finding Scales of Measure", ACCU Overload 70](https://accu.org/journals/overload/13/70/gilb_299/). Later Gilb material uses other level names such as "Tolerable" (search excerpt only).
- **INCOSE.** The Needs and Requirements Manual frames design input requirements as "'shall' statements" that state what, not how — [NRM Ch. 1 excerpt](https://media.wiley.com/product_data/excerpt/44/13941527/1394152744-8.pdf). The GtWR v4 (April 2023) is INCOSE's rules-based writing guide — [GtWR v4](https://www.incose.org/docs/default-source/working-groups/requirements-wg/gtwr/incose_rwg_gtwr_v4_040423_final_drafts.pdf) (UNVERIFIED, 403). Another researcher covers standards in depth.
- **Why constrain natural language at all.** Natural language "is advantageous in that it can be used in all application domains and understood virtually by all project stakeholders". Its undisciplined use, however, brings "poor testability ... wordiness, duplication, omission, complexity" — [Veizaga et al., arXiv 2005.01355](https://arxiv.org/abs/2005.01355).

### Inferences
- **How the patterns fit together.** EARS, Rupp's template and RFC-style keywords are complementary:
  - keywords fix *obligation* (shall/should/may);
  - EARS fixes *when* a response applies (state, event, feature, unwanted behaviour);
  - Rupp fixes *who does what* (system activity, a user ability via "provide … the ability to", an interface via "be able to");
  - Planguage or a fit criterion fixes *how well*, for qualities.
- **Practical guidance.** One atomic requirement per sentence; the system as subject; "shall" for binding requirements; an EARS pattern for each conditional behaviour; and every quality requirement quantified with a scale, a meter and a target.
- **Strength of evidence.** It is weak for all of these patterns. The main published support is adoption claims and experience reports by the originators, not comparative studies.

### Gaps
- **Hull, Jackson & Dick boilerplates.** I could not open the Springer book ([Requirements Engineering, 3rd ed., 2011](https://doi.org/10.1007/978-1-84996-405-0), DOI verified), so I cannot quote its boilerplate catalogue.
- **Rupp's own definitions.** I could not open the SOPHIST originals (sophist.de returned 404), so Rupp's meanings for shall/should/will are not verified. The usual reading is legally binding / recommended / future intent.
- **29148's keyword conventions.** I could not open 29148's guidance on "shall/should/may/will". The usual reading is "shall" = binding requirement, "should" = goal, "may" = option, "will" = statement of fact.
- **Controlled experiments on EARS.** I found no controlled experiment or replicated study measuring EARS's effect on defects. Search turned up only experience and teaching reports.

## 4. Agile artefacts: user stories, INVEST, the Connextra template, job stories, acceptance criteria, BDD/Gherkin, Specification by Example, story mapping

### Takeaway
The user story is deliberately incomplete: a card plus a conversation, with precision carried by the confirmation, i.e. acceptance tests (Jeffries 2001). BDD (North 2006/07) standardised the story as "As a / I want / So that" with Given/When/Then scenarios as acceptance criteria. Gherkin made those scenarios executable. The best empirical evidence (Lucassen et al. 2016) shows strong *perceived* benefits and frequent quality defects in real stories, but no outcome-level proof of effectiveness.

### Cited Findings
- **Card, Conversation, Confirmation** (Jeffries, 30 Aug 2001). "The card does not contain all the information that makes up the requirement ... The card is a token representing the requirement". The conversation "takes place over time, particularly when the story is estimated". "The best supplements are examples; the best examples are executable, We call these examples confirmation" — [Jeffries](https://ronjeffries.com/xprog/articles/expcardconversationconfirmation/).
- **INVEST** (Wake, posted 17 Aug 2003): "I – Independent N – Negotiable V – Valuable E – Estimable S – Small T – Testable"; the article also covers "SMART tasks" — [xp123](https://xp123.com/invest-in-good-stories-and-smart-tasks/).
- **Cohn's *User Stories Applied* (2004).** The canonical practitioner book — [InformIT](https://www.informit.com/store/user-stories-applied-for-agile-software-development-9780321205681).
- **BDD (North).**
  - "Introducing BDD" "first appeared in Better Software magazine in March 2006". It proposes "Given some initial context (the givens), When an event occurs, Then ensure some outcomes", argues that "Acceptance criteria should be executable", and has sections "Requirements are behaviour, too" and "BDD provides a 'ubiquitous language' for analysis" — [North 2006](https://dannorth.net/blog/introducing-bdd/).
  - "What's in a Story?" (11 Feb 2007) gives the story template "As a [role] I want [feature] So that [benefit]" with "Acceptance Criteria: (presented as Scenarios)". It describes the workflow: an analyst frames the narrative with a stakeholder, then "a tester helps define the scope of the story—in the form of acceptance criteria—by determining which scenarios matter" — [North 2007](https://dannorth.net/blog/whats-in-a-story/).
- **Gherkin (Cucumber reference).**
  - Keywords: Feature, Rule (since Gherkin v6, representing one "business rule that should be implemented"), Example/Scenario, Given/When/Then/And/But, Background, Scenario Outline/Template, Examples.
  - "Given steps are used to describe the initial context of the system". "When steps are used to describe an event, or an action". "Then steps are used to describe an expected outcome, or result".
  - Examples serve as both documentation and tests, forming an "executable specification". Gherkin is translated into "over 70 languages".

  Source: [Gherkin reference](https://cucumber.io/docs/gherkin/reference/).
- **Specification by Example** (Adzic, Manning, June 2011, 296 pp.). Its "50+ case studies" range "from small web startups to large financial institutions, working in many processes including XP, Scrum, and Kanban" — [Manning](https://www.manning.com/books/specification-by-example).
- **Evidence on user stories in practice** (Lucassen et al., REFSQ 2016).
  - Method: "a survey with 182 responses from practitioners and 21 follow-up semi-structured interviews".
  - Finding: "practitioners agree that using user stories, a user story template and quality guidelines such as the INVEST mnemonic improve their productivity and the quality of their work deliverables". The paper presents 12 findings.
  - Its problem statement: "To date there is no scientific evidence on the effectiveness of user stories."

  Source: [UU research portal abstract](https://research-portal.uu.nl/en/publications/the-use-and-effectiveness-of-user-stories-in-practice/); [DOI](https://doi.org/10.1007/978-3-319-30282-9_14) (DOI verified; LNCS 9619, pp. 205–222).
- **Quality User Story (QUS) framework and AQUSA** (Lucassen et al., REJ 21(3):383–403, 2016). "User stories are too often poorly written in practice and exhibit inherent quality defects". QUS is "a set of 13 quality criteria". AQUSA, an NLP tool, "detects quality defects and suggest[s] possible remedies". It was evaluated on "1023 user stories obtained from 18 software companies" and did "not yet reach the ambitious 100% recall" that Berry et al. demand of NLP tools for RE — [DOI](https://doi.org/10.1007/s00766-016-0250-x) (DOI verified; abstract via Semantic Scholar).
- **Prevalence.** In NaPiRE (N = 228 organisations, 10 countries), "textual requirements lists with constraints – e.g., user stories" were used by P = 0.35 [CI 0.29, 0.41] of respondents to document functional requirements — [Wagner et al. 2019, arXiv](https://arxiv.org/abs/1805.07951); [TOSEM DOI](https://doi.org/10.1145/3306607) (DOI verified).
- **SAFe stories.** Stories "act as a 'pidgin language'" between users and developers; acceptance criteria and tests make them more specific — [SAFe Story](https://framework.scaledagile.com/story).

### Inferences
- **Practical recipe.**
  - A story names who, what and why.
  - INVEST checks its shape.
  - Acceptance criteria, written as concrete examples in Given/When/Then, are the actual requirement and become automated acceptance tests.
  - Business rules can be grouped with Gherkin's `Rule`.
- **What the evidence shows.** The evidence is about *perception* (self-report surveys) and *defect prevalence* (QUS/AQUSA). There is no controlled evidence that stories outperform other formats.

### Gaps
- **Connextra template.** I could not verify its origin ("As a <role>, I want <goal>, so that <benefit>", usually credited to Rachel Davies' team at Connextra around 2001) from a primary source.
- **Job stories.** Klement's article (2013), with the format "When <situation>, I want to <motivation>, so I can <expected outcome>", could not be fetched (connection reset, then 503/403) — [jtbd.info](https://jtbd.info/replacing-the-user-story-with-the-job-story-af7cdee10c27) (UNVERIFIED).
- **User story mapping.** For Patton's *User Story Mapping* (O'Reilly, 2014) the publisher page returned 403 — [O'Reilly](https://www.oreilly.com/library/view/user-story-mapping/9781491904893/) (UNVERIFIED). Its content (activity "backbone", walking skeleton, release slices) is not verified here.
- **Systematic review.** Inayat et al.'s SLR on agile RE ([DOI](https://doi.org/10.1016/j.chb.2014.10.046), DOI verified) was not opened.

## 5. Use cases and scenarios: Jacobson, Cockburn, Use-Case 2.0, Lauesen's task descriptions, Alexander & Maiden

### Takeaway
Use cases (Jacobson 1992) describe system behaviour as goal-directed interactions between actors and the system. Cockburn (2000/2001) gave them their standard structure (goal levels; main success scenario plus extensions) and the "fully dressed" template. Use-Case 2.0 (2011; CACM 2016) slices use cases into backlog-sized pieces to coexist with agile. Lauesen's task descriptions push one level up, to user tasks without fixing the human–computer split. Practice surveys show use-case models are among the most-used documentation forms, often written as text rather than formal UML.

### Cited Findings
- **Jacobson et al. (1992).** *Object-Oriented Software Engineering: A Use Case Driven Approach* (Addison-Wesley/ACM Press), the origin of the use case — [InformIT](https://www.informit.com/store/object-oriented-software-engineering-a-use-case-driven-9780201544350).
- **Cockburn (2000/2001), *Writing Effective Use Cases*** — [InformIT](https://www.informit.com/store/writing-effective-use-cases-9780201702255).
  - Cockburn's goal levels are named with "cloud, kite, sea-level, underwater, and clam" metaphors. Sea level is the user-goal level (one elementary business process); fish/underwater is the subfunction level.
  - His basic template has name (= goal), goal in context, scope, level, trigger, pre- and postconditions, main course, extensions and sub-variations. The book renames the failed end condition the "minimal guarantee", and fully dressed formats add stakeholders and interests and a success guarantee.

  Source for both points: search excerpts of Cockburn's template text hosted at [Univ. Otago](https://cs.otago.ac.nz/coursework/cosc461/usecases.htm) (excerpt; the page returned 404 when fetched).
- **Use-Case 2.0.** Jacobson, Spence & Kerr, "Use-Case 2.0", CACM 59(5):61–69 (2016) — [DOI](https://doi.org/10.1145/2890778) (DOI verified). A longer version appeared in ACM Queue 14(1):94–123 (2016) ([DOI](https://doi.org/10.1145/2898442.2912151), DOI verified). The assignment's "Jacobson, Spence & Bittner 2011" is the Ivar Jacobson International e-book; its page was blocked (UNVERIFIED). The CACM article is the citable peer-reviewed version.
- **Lauesen (2003), "Task descriptions as functional requirements"**, IEEE Software 20(2):58–65 — [DOI](https://doi.org/10.1109/MS.2003.1184169) (DOI verified). The method "specifies what the user and computer shall accomplish together without indicating who performs which actions". "Properly used, they avoid a premature division of work between user and computer", which is "particularly important when buying COTS-based products" — [Lauesen's paper page](https://www.itu.dk/~slauesen/Papers/IEEEtasks.pdf) (excerpt; the fetch returned 503).
- **Alexander & Maiden (eds., 2004)**, *Scenarios, Stories, Use Cases: Through the Systems Development Life-Cycle* (Wiley) — [Wiley](https://www.wiley.com/en-us/Scenarios%2C+Stories%2C+Use+Cases%3A+Through+the+Systems+Development+Life+Cycle-p-9780470861943). This is an edited collection: a useful survey, but secondary to Jacobson, Cockburn and Lauesen.
- **Prevalence** (NaPiRE, N = 228). Semi-formal (UML) use case models P = 0.39 [0.33, 0.46]; free-form textual use case models P = 0.31 [0.25, 0.37]; textual use cases with constraints P = 0.30 [0.24, 0.36]; formal use case models are "rarely used" (P = 0.10 [0.06, 0.13]) — [Wagner et al., arXiv](https://arxiv.org/abs/1805.07951).
- **Comprehension experiment.** Hadar et al. compared requirements written as use cases with Tropos goal models: "Results with 79 students show that Tropos was more comprehensible, but also more time consuming" (as summarised in [Horkoff et al. 2019, PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6555435/)).

### Inferences
- **Practical guidance.** Write most use cases at user-goal (sea) level. Keep the main success scenario short (about 3–9 steps is Cockburn's common advice, which I did not verify here) and put alternatives and failures in extensions. Use summary-level use cases as the bridge to business goals (layer 1–2) and subfunctions sparingly.
- **Mapping to the levels diagram.** Use cases sit at the user-requirements layer (Wiegers' "user requirements"; 29148's StRS "operational scenarios"). Their extensions are a natural source of EARS "unwanted behaviour" requirements and of acceptance tests.

### Gaps
- **Cockburn's text.** I could not open Cockburn's original pages. The level names and template fields come from search excerpts only.
- **Use-Case 2.0 details.** I could not open the e-book or the Queue full text, so "use-case slice" details are not verified here.
- **Comparative evidence.** I found no recent industrial study comparing use cases and user stories on outcomes.

## 6. Goal models: KAOS, i*, NFR framework, GRL/URN, and the evidence on adoption

### Takeaway
Goal-oriented RE (GORE) models *why* a system is needed: goals refined into requirements, agents, alternatives and conflicts. It is the most researched way to link the business layer to system requirements. Research activity is high, but evaluation is mostly case studies by the authors. The community is split into notation "camps", which Horkoff et al. themselves call a barrier to adoption. Practitioner surveys show goal models are used only by a minority, and mostly as free-form text.

### Cited Findings
- **KAOS** (Dardenne, van Lamsweerde & Fickas, Science of Computer Programming 20(1–2):3–50, 1993). It introduces a "requirements model" with concepts "not supported by existing formal specification languages, such as goals to be achieved, agents to be assigned, alternatives to be negotiated". The model is acquired as instances of a meta-model graph (goal, action, agent, entity, event), using strategies such as traversing "backwards from such goals". It is illustrated with a university library system — [DOI](https://doi.org/10.1016/0167-6423(93)90021-G) (DOI verified; abstract via Semantic Scholar).
- **i*** (Yu, "Towards modelling and reasoning support for early-phase requirements engineering", ISRE'97, pp. 226–235) — [DOI](https://doi.org/10.1109/ISRE.1997.566873) (DOI verified).
- **NFR framework** (Chung, Nixon, Yu & Mylopoulos, *Non-Functional Requirements in Software Engineering*, Kluwer/Springer, 2000) — [DOI](https://doi.org/10.1007/978-1-4615-5269-7) (DOI verified).
- **GRL/URN.** ITU-T Recommendation Z.151, "User Requirements Notation (URN) – Language definition". Edition **Z.151 (10/18) is "In force"**; the 11/08 and 10/12 editions and the 2008 Corrigendum 1 are superseded — [ITU-T Z.151](https://www.itu.int/rec/T-REC-Z.151). An earlier SLR by Amyot & Mussbacher found "281 publications using the user requirements notation [containing the Goal-oriented Requirement Language (GRL)]" (as cited in [Horkoff et al., PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6555435/)).
- **Horkoff et al. (REJ 24(2):133–160; online 2017, issue 2019)**, a mapping study of "the 246 top-cited GORE-related conference and journal papers" — [DOI](https://doi.org/10.1007/s00766-017-0280-z) (DOI verified); full text at [PMC6555435](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6555435/).
  - Evaluation: "53% of the 246 papers contain a case study ... 27% some evaluation of scalability, 7% a controlled experiment, 7% questionnaires, and 4% contain some type of benchmark". Case studies are "on a slight rise" (44% in 2008 vs 54% in 2012).
  - Frameworks: "KAOS and i* appear in nearly the same number of publications (13%), the most popular choice is to use goal modeling in general, without committing to a particular framework" (21.5%). The NFR Framework, Tropos, GRL and URN follow.
  - Adoption: "In order to apply GORE, one is almost forced to 'pick a side,' an unfortunate barrier to adoption."
  - The abstract reports "a proliferation of papers with new ideas and few citations, with a small number of authors and papers dominating citations".
- **Practitioner use** (NaPiRE, N = 228). "Free form textual goal models (P = 0.26 [0.20, 0.32]) are very close to the threshold"; "textual goal models with constraints have P = 0.14 [0.10, 0.19]" — [Wagner et al., arXiv](https://arxiv.org/abs/1805.07951).
- **Industrial self-evaluation.** Mavin, Wilkinson, Teufl, Femmer, Eckhardt & Mund, "Does Goal-Oriented Requirements Engineering Achieve Its Goal?", RE'17, pp. 174–183 — [DOI](https://doi.org/10.1109/RE.2017.40) (DOI verified). This is an evaluation by industrial authors (the EARS originators plus TU Munich); the abstract was not retrievable.
- **Textbook.** van Lamsweerde's *Requirements Engineering: From System Goals to UML Models to Software Specifications* (Wiley, 2009) is the main KAOS-based textbook — [Wiley](https://www.wiley.com/en-us/Requirements+Engineering%3A+From+System+Goals+to+UML+Models+to+Software+Specifications-p-9780470012703).

### Inferences
- **Consensus.** Goal thinking (asking "why?" upward and "how?" downward, recording alternatives and conflicts, and treating qualities as softgoals) is broadly endorsed and maps directly onto layers 1–2 of the levels diagram. *Formal goal-modelling notations*, however, have limited industrial uptake.
- **For a practitioner.** Use lightweight goal trees or impact maps informally. Reserve KAOS, i* or GRL for safety-, security- or regulation-heavy contexts or for analysing many alternatives.

### Gaps
- **Mavin et al. 2017 findings.** I could not obtain the abstract (it was elided by the publisher in Semantic Scholar).
- **Industrial adoption rates.** I found no recent (2020–2026) industrial adoption survey specifically on GORE notations.

## 7. Model-based and formal notations: structured analysis/SADT, statecharts, UML/SysML (v2), MBSE, SCR, Z/VDM/B/Event-B, Alloy, TLA+, Problem Frames; DDD as a bridge

### Takeaway
Model-based notations moved from 1970s structured analysis (data-flow, SADT) to statecharts (1987) and UML/SysML. SysML v2 was formally adopted by OMG in September 2025, a major change to OMG's modelling languages; UML's latest formal version is still 2.5.1 (2017). Formal requirements methods have a few landmark industrial successes (SCR's tabular requirements for the A-7E from 1980; TLA+ at AWS from 2011). Surveys show formal and semi-formal notations are minority practices. Jackson and Zave's world/machine distinction (Problem Frames) is the conceptual backbone for separating requirements from specifications. DDD's ubiquitous language is the practitioner bridge from requirements vocabulary to design.

### Cited Findings
- **Structured analysis and SADT.** Ross, "Structured Analysis (SA): A Language for Communicating Ideas", IEEE TSE SE-3(1):16–34, 1977 — [DOI](https://doi.org/10.1109/TSE.1977.229900) (DOI verified). Ross & Schoman, "Structured Analysis for Requirements Definition", IEEE TSE SE-3(1):6–15, 1977 — [DOI](https://doi.org/10.1109/TSE.1977.229899) (DOI verified). DeMarco's *Structured Analysis and System Specification* (Yourdon Press, 1978) is the data-flow-diagram classic; I found no publisher link (UNVERIFIED).
- **Statecharts.** Harel, "Statecharts: a visual formalism for complex systems", Science of Computer Programming 8(3):231–274, 1987 — [DOI](https://doi.org/10.1016/0167-6423(87)90035-9) (DOI verified).
- **UML.** The current formal version is UML **2.5.1, publication date December 2017** — [OMG UML](https://www.omg.org/spec/UML/).
- **SysML.** OMG's history table lists **SysML 2.0 adopted September 2025** (formal), 1.7 June 2024, 1.6 December 2019, 1.5 May 2017 and 1.4 August 2015 — [OMG SysML](https://www.omg.org/spec/SysML/).
- **UML use in practice.** Petre interviewed "50 professional software engineers in 50 companies" and identified 5 patterns of UML use: **no UML 35, selective 11, automated code generation 3, retrofit 1, wholehearted 0** — [Never Work in Theory review of Petre 2013](https://neverworkintheory.org/2013/06/13/uml-in-practice-2.html); paper [DOI](https://doi.org/10.1109/ICSE.2013.6606618) (DOI verified; ICSE 2013, pp. 722–731).
- **Formality levels in practice** (NaPiRE, N = 228). Formal notations are rare in requirements documentation: formal structured requirements lists P = 0.12; formal use case models P = 0.10; formal data models P = 0.18; formal business/domain models P = 0.15. Semi-formal (UML) data models are used by P = 0.33 — [Wagner et al., arXiv](https://arxiv.org/abs/1805.07951).
- **SCR.**
  - Heninger, "Specifying Software Requirements for Complex Systems: New Techniques and Their Application", IEEE TSE SE-6(1):2–13, 1980 — [DOI](https://doi.org/10.1109/TSE.1980.230208) (DOI verified).
  - Heitmeyer, Jeffords & Labaw, "Automated consistency checking of requirements specifications", ACM TOSEM 5(3):231–261, 1996 — [DOI](https://doi.org/10.1145/234426.234431) (DOI verified).
  - Background from an NRL/DTIC overview: SCR began in the late 1970s (Parnas and NRL) by rebuilding the A-7 aircraft's Operational Flight Program. 1990s work produced the Four-Variable Model, the SCR requirements model and tools; documents divide system state into modes and specify outputs with condition and mode-transition tables. Industrial use includes nuclear-plant control and avionics — [DTIC ADA465161](https://apps.dtic.mil/sti/html/tr/ADA465161/index.html) (excerpt; the full text was blocked).
- **Alloy.** D. Jackson, "Alloy: a lightweight object modelling notation", ACM TOSEM 11(2):256–290, 2002 — [DOI](https://doi.org/10.1145/505145.505149) (DOI verified).
- **TLA+.** Lamport, "The temporal logic of actions", ACM TOPLAS 16(3):872–923, 1994 — [DOI](https://doi.org/10.1145/177492.177726) (DOI verified). Book: *Specifying Systems* — [Lamport's book page](https://lamport.azurewebsites.net/tla/book.html).
- **Event-B.** Abrial, *Modeling in Event-B: System and Software Engineering* (Cambridge UP, 2010) — [DOI](https://doi.org/10.1017/CBO9781139195881) (DOI verified).
- **TLA+ at AWS.** Newcombe et al., CACM 58(4):66–73, 2015 — [DOI](https://doi.org/10.1145/2699417) (DOI verified). The figures below are from the 29 Sept 2014 preprint "Use of Formal Methods at Amazon Web Services" — [preprint PDF](https://lamport.azurewebsites.net/tla/formal-methods-amazon.pdf):
  - "Since 2011, engineers at Amazon Web Services (AWS) have been using formal specification and model checking".
  - "we have used TLA+ on 10 large complex real-world systems. In every case TLA+ has added significant value". "We now have 7 teams using TLA+".
  - Engineers "from entry level to Principal have been able to learn TLA+ from scratch and get useful results in 2 to 3 weeks".
  - DynamoDB: 939 lines of TLA+, "Found 3 bugs, some requiring traces of 35 steps". S3: 804 lines of PlusCal, 2 bugs. EBS: 102 lines of PlusCal, 3 bugs.
  - On requirements: "First we state what the system should do, by defining correctness properties", as safety ("what the system is allowed to do") and liveness ("what the system must eventually do").
- **Survey of formalism in requirements.** Bruel, Ebersold, Galinier, Mazzara, Naumchev & Meyer, "The Role of Formalism in System Requirements", ACM Computing Surveys 54(5):1–36, 2021 — [DOI](https://doi.org/10.1145/3448975) (DOI verified; full version [arXiv 1911.02564](https://arxiv.org/abs/1911.02564)). On Problem Frames: the approach "brought to light the need to divide requirements into system and environment properties"; a problem frame "defines the shape of a problem by capturing the characteristics" of its domains — [arXiv](https://arxiv.org/abs/1911.02564).
- **Survey of industrial formal methods.** Woodcock, Larsen, Bicarregui & Fitzgerald, "Formal methods: Practice and experience", ACM Computing Surveys 41(4):1–36, 2009 — [DOI](https://doi.org/10.1145/1592434.1592436) (DOI verified; not opened).
- **Problem Frames.** M. Jackson, *Problem Frames: Analysing and Structuring Software Development Problems* (Addison-Wesley, 2001) — [InformIT](https://www.informit.com/store/problem-frames-analysing-and-structuring-software-development-9780201596274). Its conceptual precursor is Zave & Jackson, "Four dark corners of requirements engineering", ACM TOSEM 6(1):1–30, 1997 — [DOI](https://doi.org/10.1145/237432.237434) (DOI verified; not re-read this session).
- **DDD bridge.** Evans, *Domain-Driven Design* (Addison-Wesley, 2003) — [InformIT](https://www.informit.com/store/domain-driven-design-tackling-complexity-in-the-heart-9780321125217). The DDD Reference (2015) prescribes: "Use the model as the backbone of a language. Commit the team to exercising that language relentlessly in all communication within the team and in the code. Within a bounded context, use the same language in diagrams, writing, and especially speech. Recognize that a change in the language is a change to the model" — [DDD Reference 2015](https://www.domainlanguage.com/wp-content/uploads/2016/05/DDD_Reference_2015-03.pdf). North explicitly ties BDD to this idea: "BDD provides a 'ubiquitous language' for analysis" — [North 2006](https://dannorth.net/blog/introducing-bdd/).

### Inferences
- **When formal and model-based specification pays off.** The consensus, and the pattern in the AWS and SCR cases, is that it pays off where behaviour is state-rich, concurrent, safety- or security-critical, or regulated. In such settings formal or tabular specification finds defects that reviews and tests miss. Everywhere else, structured natural language plus selective models (state machines, domain/data models) is the norm.
- **A requirements specialist's minimum toolkit.** A glossary/domain model (DDD's ubiquitous language), state machines or statecharts for modal behaviour, and the habit of separating environment assumptions from machine obligations (Zave & Jackson; Problem Frames).
- **SysML v2.** It is new (2025). Industrial evidence of its effect on requirements practice did not yet exist in the sources I found.

### Gaps
- **SysML requirement-diagram semantics** («requirement» with id/text; satisfy/verify/derive/refine/trace) and their SysML v2 equivalents were not opened.
- **SCR quantitative results.** I could not open them. For example, a 1996 NRL study reportedly found missing cases and ambiguities in the A-7 tables; the counts are in search excerpts only.
- **Z and VDM ISO pages.** ISO blocked access (Z: ISO/IEC 13568; VDM-SL: ISO/IEC 13817-1).
- **Recent industrial surveys of formal-methods use (2020–2026).** None were opened.

## 8. Evidence on which notations practitioners actually use

### Takeaway
Every survey from the early 2000s to 2023 agrees: natural language dominates requirements specification. It is usually accompanied by some structure (templates, lists, use cases, user stories) and general-purpose tools. Semi-formal models (UML use case, data and process models) are used by a sizeable minority. Formal notations are rare. The surveys are self-reported, mostly non-random samples, so treat percentages as indicative.

### Cited Findings
- **Franch et al. 2023** (REJ 28(3):377–409; 24 practitioners, 12 Swedish IT companies). "Natural language constitutes the main specification artefact but is usually accompanied by some other type of instrument". "Different types of tools, including MS Office tools, are used". "Challenges related to the use of natural language (dealing with ambiguity, inconsistency, and incompleteness) are the most frequent challenges". "In spite of the large number of notations, models and tools proposed from academia ... practitioners still mainly rely on plain natural language and general-purpose tool support" — [DOI](https://doi.org/10.1007/s00766-023-00399-7) (DOI verified; abstract via [OpenAlex](https://api.openalex.org/works/doi:10.1007/s00766-023-00399-7)).
- **Wagner et al. 2019** (NaPiRE; 228 organisations in 10 countries).
  - Top ways to document functional requirements (multiple choice): "free-form textual structured requirements lists (P = 0.42 [0.36, 0.49]), semi-formal use case models (P = 0.39 [0.33, 0.46]) and free-form textual domain/business process models (P = 0.38 [0.31, 0.44])"; "None of the documentation techniques seems to be clearly dominating".
  - Non-functional requirements (N = 210): the authors revise their proposition to "Non-functional requirements are documented textually either quantified or non-quantified".

  Source: [arXiv full text](https://arxiv.org/abs/1805.07951); [TOSEM DOI](https://doi.org/10.1145/3306607) (DOI verified).
- **Mich, Franch & Novi Inverardi 2004** (REJ 9(1):40–56; [DOI](https://doi.org/10.1007/s00766-003-0179-8), DOI verified, paywalled; the second author is *Mariangela* Franch, not Xavier Franch of the 2023 study). Secondary sources disagree on its headline number:
  - Zhao et al. report "The online survey of 151 software companies ... concluded that in 95% percent of the cases requirements documents were expressed in some form of NL" — [Zhao et al., arXiv](https://arxiv.org/abs/2004.01099) (ACM CSUR 54(3), 2021, [DOI](https://doi.org/10.1145/3444689) verified).
  - Veizaga et al. report "71.8% of software requirements specifications (SRSs) are written in NL" — [arXiv 2005.01355](https://arxiv.org/abs/2005.01355).

  Crossref's record for Mich et al. has given names stored as surnames ("Luisa, Mariangela, Pierluigi"), which is why some papers cite it as "Luisa et al. 2004".
- **Kassab, Neill & Laplante 2014** (Innovations in Systems and Software Engineering 10(4):235–241; [DOI](https://doi.org/10.1007/s11334-014-0232-4), DOI verified, paywalled). As reported by Zhao et al.: "a recent survey of Kassab et al. [5], which involved 250 practitioners. The majority of the participants (61%) stated that NL was normally used in their companies for describing and specifying software and system requirements" — [Zhao et al., arXiv](https://arxiv.org/abs/2004.01099).
- **Petre 2013:** 35 of 50 professional engineers used no UML; none used it wholeheartedly — [review](https://neverworkintheory.org/2013/06/13/uml-in-practice-2.html).
- **Lucassen et al. 2016:** 182 survey responses and 21 interviews on user stories, showing perceived productivity and quality benefits — [UU portal](https://research-portal.uu.nl/en/publications/the-use-and-effectiveness-of-user-stories-in-practice/).
- **Goal models:** used in free-form text by about 26% of NaPiRE respondents — [Wagner et al.](https://arxiv.org/abs/1805.07951). Research evaluations are mostly case studies (53%) — [Horkoff et al.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6555435/).

### Inferences
- **The pattern across 20 years.** Natural language plus light structure is the industrial default. Research notations reach practice mainly in constrained-NL forms (templates, EARS, user stories, Gherkin) that keep NL readability. Formal methods succeed in narrow, high-stakes niches.
- **Strength of evidence.** It is moderate for "NL dominates": several independent surveys agree. It is weak for any claim that one notation *causes* better outcomes, as there are almost no controlled or longitudinal outcome studies.

### Gaps
- **Primary percentages.** I could not open the Mich et al. and Kassab et al. primaries, so I could not resolve the 95% vs 71.8% discrepancy. The often-quoted "79% common NL / 16% structured NL / 5% formalised" split for Mich et al. is unverified.
- **Dobing & Parsons, "How UML is used"** (CACM 49(5):109–113, 2006; [DOI](https://doi.org/10.1145/1125944.1125949), DOI verified) was not opened.

## 9. Synthesis: the 12–15 works that matter most, the consensus, and open issues

### Takeaway
To specify requirements well, a newcomer needs a layering model (29148/INCOSE or Wiegers), an atomic-requirement discipline (one testable statement with a fit criterion), a sentence pattern set (EARS plus Rupp-style slots; RFC 2119/8174 keywords), the agile story-plus-examples loop (Jeffries → North/Gherkin → Adzic), use cases for interaction-heavy behaviour (Cockburn), goal thinking for the why, and formal or tabular specification for state-rich critical cores (SCR, TLA+). The evidence base is strong on what practitioners *do* (NL dominates) and weak on what *works better*.

### Cited Findings

#### The most important works (ranked by importance for this sub-topic)
1. **ISO/IEC/IEEE 29148:2018.** The current standard layering (BRS → StRS → SyRS → SRS, plus OpsCon/ConOps). It succeeds IEEE 830 — [DOI](https://doi.org/10.1109/IEEESTD.2018.8559686) (DOI verified; status on the [IEEE SA page](https://standards.ieee.org/ieee/29148/6937/)).
2. **Wiegers & Beatty, *Software Requirements* (3rd ed., Microsoft Press, 2013).** The practitioner canon for business/user/functional levels plus business rules, quality attributes and constraints — [InformIT](https://www.informit.com/store/software-requirements-9780735679665).
3. **INCOSE Needs and Requirements Manual (Wheatcraft, Ryan & Katz; Wiley, 2024).** It makes the needs (validated) vs design-input requirements (verified) distinction precise, across 15288's organisational levels — [Wiley](https://www.wiley.com/en-us/INCOSE+Needs+and+Requirements+Manual-p-9781394152742).
4. **Robertson & Robertson, Volere / *Mastering the Requirements Process* (3rd ed., Addison-Wesley, 2012).** A widely used practitioner template and the source of the "fit criterion" — [InformIT](https://www.informit.com/store/mastering-the-requirements-process-getting-requirements-9780321815743).
5. **Mavin, Wilkinson, Harwood & Novak, "Easy Approach to Requirements Syntax (EARS)", RE'09.** A widely adopted constrained-NL pattern set (adoption claims come from its originators) — [DOI](https://doi.org/10.1109/RE.2009.9) (DOI verified).
6. **Jeffries, "Essential XP: Card, Conversation, Confirmation" (2001); Wake, "INVEST" (2003); Cohn, *User Stories Applied* (Addison-Wesley, 2004).** The agile story canon — [Jeffries](https://ronjeffries.com/xprog/articles/expcardconversationconfirmation/); [Wake](https://xp123.com/invest-in-good-stories-and-smart-tasks/); [Cohn](https://www.informit.com/store/user-stories-applied-for-agile-software-development-9780321205681).
7. **North, "Introducing BDD" (Better Software, 2006), with the Gherkin reference and Adzic's *Specification by Example* (Manning, 2011).** Acceptance criteria as executable examples — [North](https://dannorth.net/blog/introducing-bdd/); [Gherkin](https://cucumber.io/docs/gherkin/reference/); [Adzic](https://www.manning.com/books/specification-by-example).
8. **Lucassen, Dalpiaz, van der Werf & Brinkkemper, REFSQ 2016 and REJ 2016 (QUS/AQUSA).** The main empirical evidence on user stories and a 13-criterion quality framework — [REFSQ DOI](https://doi.org/10.1007/978-3-319-30282-9_14); [REJ DOI](https://doi.org/10.1007/s00766-016-0250-x) (both DOIs verified).
9. **Cockburn, *Writing Effective Use Cases* (Addison-Wesley, 2000), building on Jacobson et al. (1992).** Use-case structure and goal levels — [InformIT](https://www.informit.com/store/writing-effective-use-cases-9780201702255).
10. **Dardenne, van Lamsweerde & Fickas (1993, KAOS) and Yu (1997, i*), read with Horkoff et al. (2019).** Goal modelling and its limited, camp-divided uptake — [KAOS DOI](https://doi.org/10.1016/0167-6423(93)90021-G); [i* DOI](https://doi.org/10.1109/ISRE.1997.566873); [Horkoff DOI](https://doi.org/10.1007/s00766-017-0280-z) (all DOIs verified).
11. **Heninger (1980, SCR/A-7E).** The landmark industrial formal (tabular) requirements specification — [DOI](https://doi.org/10.1109/TSE.1980.230208) (DOI verified).
12. **Newcombe et al., "How Amazon Web Services uses formal methods", CACM 2015.** Modern industrial evidence that precise specification of what "should" happen pays off — [DOI](https://doi.org/10.1145/2699417) (DOI verified).
13. **Zave & Jackson (1997) and Jackson's *Problem Frames* (2001).** The theory of what a requirement is (environment vs machine) and how to structure problems — [DOI](https://doi.org/10.1145/237432.237434) (DOI verified); [InformIT](https://www.informit.com/store/problem-frames-analysing-and-structuring-software-development-9780201596274).
14. **Franch et al. 2023 and Wagner et al. 2019.** The best current state-of-practice evidence on specification formats — [Franch DOI](https://doi.org/10.1007/s00766-023-00399-7); [Wagner DOI](https://doi.org/10.1145/3306607) (both DOIs verified).
15. **Gorschek & Wohlin, RAM (REJ 2006) and Méndez Fernández & Penzenstadler, AMDiRE (REJ 2015).** Research models of abstraction levels and artefact structure — [RAM DOI](https://doi.org/10.1007/s00766-005-0020-7); [AMDiRE DOI](https://doi.org/10.1007/s00766-014-0206-y) (both DOIs verified).

#### Corrections to the assignment's descriptions
- **IEEE 830-1998 is superseded** (by 29148:2011, now 29148:2018) — [IEEE SA](https://standards.ieee.org/ieee/830/1222/).
- **SysML v2 is no longer "upcoming".** OMG lists SysML 2.0 adopted in September 2025 — [OMG](https://www.omg.org/spec/SysML/).
- **Use-Case 2.0.** Cite the peer-reviewed CACM 2016 article (Jacobson, Spence & Kerr) rather than the 2011 vendor e-book — [DOI](https://doi.org/10.1145/2890778).
- **Mich et al. 2004.** The second author is Mariangela Franch, not Xavier Franch. Its widely quoted percentages vary between secondary sources (see Section 8).
- **Alexander & Maiden 2004** is an edited collection: useful, but secondary to Jacobson, Cockburn and Lauesen.
- **Online vs issue years.** RAM (online 2005, issue 2006), AMDiRE (online 2014, issue 2015) and Horkoff et al. (online 2017, issue 2019) all have online-first years earlier than the year usually cited (Crossref records).

### Inferences
- **Consensus positions.**
  1. Layer requirements from business intent to verifiable statements, and keep problem (needs) separate from solution (design).
  2. Every requirement must be verifiable: shall-statement plus verification method (standards), fit criterion (Volere), Scale/Meter (Planguage), or acceptance criteria/examples (agile).
  3. Constrained natural language beats free prose for precision without losing stakeholder readability.
  4. Use models and formalism selectively, where behaviour is complex or critical.
  5. Keep a shared vocabulary (glossary / domain model / ubiquitous language).
- **Where experts disagree.**
  1. Document-first (29148, Volere) vs conversation-first (XP: the story is a "token", precision lives in tests).
  2. Whether acceptance criteria are requirements (BDD/SbE) or merely verification artefacts derived from them (standards).
  3. Whether formal goal models are worth their cost outside research (Horkoff's "pick a side" barrier).
  4. How much up-front layering agile teams need. Scrum prescribes none; SAFe prescribes four tiers.
- **Open issues.** Outcome-level evidence comparing notations is missing. Template conformance is rarely measured. Practitioners keep reporting ambiguity, inconsistency and incompleteness as top NL challenges despite decades of patterns (Franch et al. 2023). Industrial uptake of SysML v2 and its requirements constructs is untested.

### Gaps
- **Unverified links** (could not be opened or confirmed):
  - Patton 2014 (O'Reilly, 403)
  - Klement 2013 (jtbd.info)
  - Use-Case 2.0 e-book (Ivar Jacobson International)
  - Rupp/SOPHIST originals
  - INCOSE GtWR v4 (403)
  - DeMarco 1978
  - D. Jackson, *Software Abstractions* (MIT Press, 403)
  - Gilb, *Competitive Engineering* (2005); Planguage here is cited via Gilb's ACCU article instead
  - The ISO 29148 page (403)
- **Content not verified from primary text.**
  - IEEE 830's outline
  - RAM's level names
  - Wiegers' exact level definitions
  - Volere shell fields
  - Hull/Jackson/Dick boilerplates
  - Cockburn's template fields and goal levels (excerpts only)
  - Lauesen's method details (excerpts only)
  - SCR quantitative findings
  - The Mich et al. and Kassab et al. primary percentages
