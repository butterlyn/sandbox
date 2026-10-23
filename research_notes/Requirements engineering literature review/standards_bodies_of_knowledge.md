# Standards and bodies of knowledge for requirements engineering: editions and status as of 23 October 2026

*How to read these notes.* Each item has a **reference entry**: official name, current edition/year, publisher, **one official link** (the link to use in the reference list), status, and 1–2 lines on what it contributes to RE. Evidence links follow each claim. **iso.org returned HTTP 403 to both WebFetch and curl.** So "(ISO page via search extract)" means the fact comes from a search engine's extract of ISO's own catalogue page and was not opened directly. Where possible those facts were cross-checked against an opened IEEE SA page, a publisher preview PDF of the standard, or a national-body page. Confidence labels: **High** = confirmed in an opened primary source. **Med** = primary page seen only through a search extract, or only a reputable secondary source. **Low** = conflicting or indirect evidence. "Relevance" tags mark **Software-core** (any software requirements engineer), **Systems** (systems engineering context) or **Regulated** (only in that domain).

---

## 1. ISO/IEC/IEEE 29148: editions, revision status, what it specifies, and which IEEE standards it replaced

### Takeaway
ISO/IEC/IEEE 29148:2018 (2nd edition) is still the published, current requirements engineering standard in October 2026; ISO confirmed it in 2024. A 3rd edition is well advanced: ISO lists **ISO/IEC/IEEE DIS 29148 (Edition 3)** at the DIS-ballot stage, and IEEE has an **active PAR, P29148, approved 2025-09-10**, to supersede 29148-2018. For someone specifying software requirements it is the central standard. It defines:
- the requirements processes: business/mission analysis, then stakeholder needs and requirements definition, then system/software requirements definition, plus requirements management;
- the information items: BRS, StRS, SyRS and SRS, with OpsCon/ConOps annexes;
- the characteristics, language criteria and attributes of well-formed requirements.

Its 2011 first edition replaced IEEE 830-1998, IEEE 1233-1998 and IEEE 1362-1998.

### Cited Findings

**Reference entry: ISO/IEC/IEEE 29148:2018** (Relevance: Software-core)
- Official name: *Systems and software engineering — Life cycle processes — Requirements engineering*, **Second edition 2018-11** ([ISO/IEC/IEEE 29148:2018 official preview PDF, VDE Verlag](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiecieee29148%7Bed2.0%7Den.pdf)).
- Publisher: prepared by ISO/IEC JTC 1/SC 7 "in cooperation with the Systems and Software Engineering Standards Committee of the IEEE Computer Society, under the Partner Standards Development Organization cooperation agreement between ISO and IEEE" ([preview, Foreword](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiecieee29148%7Bed2.0%7Den.pdf)).
- **Official link:** https://www.iso.org/standard/72089.html
- Status: **current**.
  - IEEE lists it as "Active Standard": PAR 2016-12-07, board approval 2018-10-23, published 2018-11-30 ([IEEE SA 29148-2018](https://standards.ieee.org/standard/29148-2018.html)). Confidence: High.
  - ISO's page says it was "last reviewed and confirmed in 2024. Therefore this version remains current", and that it will be replaced by ISO/IEC/IEEE DIS 29148 (ISO page via search extract) ([ISO 29148:2018](https://www.iso.org/standard/72089.html)). Confidence: Med.
- History: "This second edition cancels and replaces the first edition (ISO/IEC/IEEE 29148:2011), which has been technically revised." The changes "were developed in response to the revision of ISO/IEC/IEEE 15288 and ISO/IEC/IEEE 12207… to accomplish the harmonization of the structures and contents of the two documents" ([preview, Foreword](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiecieee29148%7Bed2.0%7Den.pdf)).
- The 2018 edition's normative references are **ISO/IEC/IEEE 15288:2015 and ISO/IEC/IEEE 12207:2017** ([preview, clause 2](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiecieee29148%7Bed2.0%7Den.pdf)).

**Reference entry: ISO/IEC/IEEE 29148:2011** (first edition, historical)
- **Official link:** https://www.iso.org/standard/45171.html (seen in ISO search results). Status: withdrawn, replaced by the 2018 edition ([preview, Foreword](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiecieee29148%7Bed2.0%7Den.pdf)). Confidence: High.

**Reference entry: ISO/IEC/IEEE DIS 29148 (Edition 3, under development)**
- ISO lists "ISO/IEC/IEEE DIS 29148 — Systems and software engineering — Life cycle processes — Requirements engineering", **Edition 3**, under development at the DIS stage with a **12-week ballot initiated**, about 101 pages, committee ISO/IEC JTC 1/SC 7 (ISO page via search extract) ([ISO project 94091](https://www.iso.org/standard/94091.html)). Confidence: Med.
  - Conflict: an older search extract of the same page called it a committee draft ("ISO/IEC/IEEE CD 29148"), and the 2018 page's "next version" box called the DIS "Edition 1". The DIS page itself, which is more specific, says Edition 3.
- **Official link (draft):** https://standards.ieee.org/ieee/29148/12262/
- IEEE side: "IEEE/ISO/IEC P29148", status "**Active PAR**", PAR approval **2025-09-10**, "Superseding: 29148-2018". Sponsor: C/S2ESC (Software & Systems Engineering Standards Committee). Working group: WG_LCP (Life Cycle Processes), chair Teresa Doran. No target dates are listed ([IEEE SA P29148](https://standards.ieee.org/ieee/29148/12262/)). Confidence: High.

**What 29148:2018 specifies** (headings and text verified from the official preview's scope, introduction and contents)
- Scope. The document "specifies the required processes implemented in the engineering activities that result in requirements for systems and software products (including services) throughout the life cycle". It also:
  - "provides guidelines for applying the requirements and requirements-related processes described in ISO/IEC/IEEE 15288 and ISO/IEC/IEEE 12207";
  - "specifies the required information items produced through the implementation of the requirements processes";
  - "specifies the required contents of the required information items";
  - "provides guidelines for the format of the required and related information items".

  ([preview §1](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiecieee29148%7Bed2.0%7Den.pdf))
- Introduction: the document "provides details for the construct of well-formed textual requirements, to include characteristics and attributes" ([preview, Introduction](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiecieee29148%7Bed2.0%7Den.pdf)).
- Clause 5, Concepts:
  - 5.2.2 Stakeholders; 5.2.3 Transformation of needs into requirements; 5.2.4 Requirements construct;
  - **5.2.5 Characteristics of individual requirements; 5.2.6 Characteristics of a set of requirements; 5.2.7 Requirement language criteria; 5.2.8 Requirements attributes**;
  - 5.3 Application of iteration and recursion; 5.4 Requirement information items.

  ([preview, Contents](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiecieee29148%7Bed2.0%7Den.pdf))
- Clause 6, Processes (each with purpose, outcomes, activities and tasks):
  - 6.2 Business or mission analysis;
  - 6.3 Stakeholder needs and requirements definition;
  - 6.4 System [System/Software] requirements definition;
  - 6.5 Requirements engineering activities in architecture definition, verification and validation;
  - 6.6 Requirements management, including change management and measurement for requirements.

  ([preview, Contents](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiecieee29148%7Bed2.0%7Den.pdf))
- Clauses 7–9 and annexes, Information items:
  - example outlines (clause 8) and required content (clause 9) for the **Business requirements specification (BRS, 9.3)**, **Stakeholder requirements specification (StRS, 9.4)**, **System requirements specification (SyRS, 9.5)** and **Software requirements specification (SRS, 9.6)**;
  - **Annex A (normative): System operational concept (OpsCon)**; **Annex B (informative): Concept of operations (ConOps)**; Annex C (normative): Tailoring policies.

  ([preview, Contents](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiecieee29148%7Bed2.0%7Den.pdf))
- SRS content headings (9.6): purpose; scope; product perspective; product functions; user characteristics; limitations; assumptions and dependencies; apportioning of requirements; specified requirements; external interfaces; functions; usability requirements; performance requirements; logical database requirements; design constraints; standards compliance; software system attributes; verification; supporting information ([preview, Contents](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiecieee29148%7Bed2.0%7Den.pdf)).
- Characteristics: nine for individual requirements and five for requirement sets. A vendor explainer (16 July 2026) names these individual characteristics: necessary, complete, singular, unambiguous, correct, verifiable, appropriate, feasible. It names these set characteristics: complete, consistent, feasible, comprehensible, able to be validated ([Modern Requirements blog](https://www.modernrequirements.com/?p=32595)). Confidence: Med (secondary). The ninth individual characteristic, "conforming", matches INCOSE GtWR C9 (see §4) but was not confirmed in an opened 29148 source.

**IEEE standards that 29148 replaced** (all historical; Relevance: Software-core background)
- IEEE SA: the 29148-2011 entry states "This standard replaces IEEE 830-1998, IEEE 1233-1998, IEEE 1362-1998" ([IEEE SA 29148-2018 page](https://standards.ieee.org/standard/29148-2018.html)). Confidence: High.
- **IEEE 830-1998**, *IEEE Recommended Practice for Software Requirements Specifications*: "Superseded Standard", board approval 1998-06-25, "Superseded by ISO/IEC/IEEE 29148:2011". Its abstract begins "The content and qualities of a good software requirements specification (SRS) are described" ([IEEE SA 830-1998](https://standards.ieee.org/ieee/830/1222/)). Confidence: High.
- **IEEE 1233-1998**, *IEEE Guide for Developing System Requirements Specifications*: superseded. It gave guidance for a System Requirements Specification (SyRS): identifying, organizing, presenting and changing requirements, plus the qualities of individual requirements and of the set ([IEEE SA 1233](https://standards.ieee.org/ieee/1233/1879/)). Confidence: Med (via search extract).
- **IEEE 1362-1998**, *IEEE Guide for Information Technology — System Definition — Concept of Operations (ConOps) Document*: superseded. It set out the format and contents of a ConOps describing the proposed system from the user's perspective ([IEEE SA 1362](https://standards.ieee.org/ieee/1362/2047/)). Confidence: Med (via search extract).

### Inferences
- 29148's clauses 6.2–6.4 have the same names as the first technical processes of ISO/IEC/IEEE 15288 (see §2). So 29148 is best read as the detailed "how" for the requirements-related processes that 15288 and 12207 only outline.
- The 2018 edition's normative references (15288:2015, 12207:2017) have both since been superseded (15288:2023; 12207:2026, see §2). The 2018 revision was explicitly a harmonisation with the previous 15288/12207 revisions. Edition 3 is therefore very likely a re-alignment with 15288:2023 and 12207:2026. This is an inference; the draft text was not seen.
- A DIS ballot in progress means Edition 3 is probably not yet published, and publication is unlikely before 2027 (inference; no dates found). Readers should cite 29148:2018 and note "revision in progress".
- Lineage for the reader:
  - IEEE 830's SRS template is the ancestor of the 9.6 SRS outline.
  - IEEE 1233's SyRS guidance became the 9.5 SyRS.
  - IEEE 1362's ConOps became Annex B. The normative OpsCon (Annex A) and the business- and stakeholder-level documents (BRS, StRS) were added on top.

### Gaps
- The full definitions of the nine individual and five set characteristics, the language criteria (5.2.7, the "vague terms to avoid") and the attribute list (5.2.8) are copyrighted and could not be opened. From memory and **UNVERIFIED**, the attributes include identification, owner, priority, risk, rationale, difficulty and type. The reader should check the standard.
- The 2011 edition's characteristic list differed from 2018 (e.g., it reportedly included "implementation free" and "traceable"). This is **UNVERIFIED**; no opened source.
- No DIS ballot dates or target publication date for Edition 3 were found on ISO or IEEE pages.

---

## 2. Life-cycle and vocabulary standards: ISO/IEC/IEEE 15288:2023, ISO/IEC/IEEE 12207 (current edition), ISO/IEC/IEEE 24765, and ISO/IEC/IEEE 15289

### Takeaway
- **15288:2023** (2nd edition) is the current system life-cycle standard. Its first three technical processes are the RE backbone: business or mission analysis, stakeholder needs and requirements definition, and system requirements definition.
- **12207 changed in 2026.** ISO/IEC/IEEE 12207:2026 was published in April 2026 (IEEE publication 2026-04-15) and replaced 12207:2017, which ISO withdrew on 2026-04-29. Its process purposes and outcomes are "fully aligned" with 15288:2023.
- **24765:2017** remains the current vocabulary, also maintained online as SEVOCAB; a planned Edition 3 was cancelled.
- **15289:2019** (Edition 4) specifies the content of life-cycle documentation, including the requirements specifications 29148 builds on; Edition 5 is at committee-draft stage.

### Cited Findings

**Reference entry: ISO/IEC/IEEE 15288:2023** (Relevance: Systems; also frames software)
- Official name: *Systems and software engineering — System life cycle processes*, **Edition 2 (2023)**, ISO/IEC JTC 1/SC 7 with IEEE.
- **Official link:** https://www.iso.org/standard/81702.html
- Status: **current**. The 2015 edition is withdrawn (ISO page via search extract) ([ISO 15288:2015](https://www.iso.org/standard/63711.html)). Confidence: Med.
- Changes from 2015 (ISO Online Browsing Platform via search extract): revised technical processes, including architecture definition, integration and operation; updated key concepts (iteration, recursion, systems of systems); and a new annex on model-based systems engineering ([ISO 15288:2023](https://www.iso.org/standard/81702.html)). Confidence: Med.
- RE contribution:
  - The SEBoK notes that business or mission analysis is often performed iteratively with stakeholder needs definition, and that stakeholder needs are the basis of system validation and an input to system requirements definition ([SEBoK, Stakeholder Needs Definition](https://sebokwiki.org/wiki/Stakeholder_Needs_Definition), via search extract).
  - The SEBoK glossary attributes its definitions of stakeholder needs and stakeholder requirements to ISO/IEC/IEEE 15288:2023 §6.4.2. This came from a search extract; the glossary page URL was not verified.
  - System requirements definition "transform[s] the stakeholder view of desired capabilities into a technical, developer view", per the SEBoK's summary of 15288-2023 ([SEBoK, System Requirements Definition](https://sebokwiki.org/wiki/System_Requirements_Definition)). Confidence: Med (secondary, via search extract).
- Companion: ISO/IEC/IEEE 24748-2:2024 gives guidelines for applying 15288 ([ISO 24748-2:2024](https://www.iso.org/standard/84661.html), via search extract).

**Reference entry: ISO/IEC/IEEE 12207:2026** (Relevance: Software-core)
- Official name: *Systems and software engineering — Software life cycle processes*.
- **Official link:** https://www.iso.org/standard/90219.html
- Status: **current; new edition in 2026.**
  - IEEE: "Active Standard", board approval **2026-02-12**, publication **2026-04-15**, "Superseding: 12207-2017" ([IEEE SA 12207-2026](https://standards.ieee.org/ieee/12207/11416/)). Confidence: High.
  - ISO: published 2026-04; 12207:2017 withdrawn 2026-04-29 and "Revised by" 12207:2026 (ISO page via search extract) ([ISO 12207:2017](https://www.iso.org/standard/63712.html)). Confidence: Med.
- Scope: the standard "establishes a common process framework for describing the full life cycle of software systems from conception through retirement". "The process purposes and outcomes in ISO/IEC/IEEE 15288:2023 (systems life cycle processes) and this document are fully aligned" ([IEEE SA 12207-2026](https://standards.ieee.org/ieee/12207/11416/)).

**Reference entry: ISO/IEC/IEEE 24765:2017** (Relevance: Software-core; terminology)
- Official name: *Systems and software engineering — Vocabulary*.
- **Official link:** https://www.iso.org/standard/71952.html
- Status: **current**; it replaced the 2010 edition. A draft Edition 3 (ISO/IEC/IEEE CD 24765) is listed as deleted/cancelled (ISO pages via search extract) ([ISO CD 24765](https://www.iso.org/standard/92875.html)). Confidence: Med.
- Contribution: shared definitions for systems and software engineering terms, with references to the source standards. The printed standard is a snapshot of the **SEVOCAB** database hosted by the IEEE Computer Society at www.computer.org/sevocab (ISO abstract via search extract) ([ISO 24765:2017](https://www.iso.org/standard/71952.html)).

**Reference entry: ISO/IEC/IEEE 15289:2019** (Relevance: Software-core / Systems; documentation)
- Official name: *Systems and software engineering — Content of life-cycle information items (documentation)*, **Edition 4 (2019)**.
- **Official link:** https://www.iso.org/standard/74909.html
- Status: current; it remained current after a 2025 review. An Edition 5 committee draft is under development (ISO pages via search extract) ([ISO CD 15289](https://www.iso.org/standard/94699.html)). Confidence: Med.
- Contribution: generic content requirements for documentation types such as specifications, descriptions and plans. 29148's scope explicitly addresses people who use 15289 for requirements information items ([29148 preview §1](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiecieee29148%7Bed2.0%7Den.pdf)).

### Inferences
- For a software engineer the practical stack is:
  - 12207:2026 or 15288:2023 say *which* requirements processes exist and their outcomes;
  - 29148 says *how* to perform them and what each specification must contain;
  - 15289 gives generic documentation rules;
  - 24765 / SEVOCAB fixes the vocabulary.
- Any text written in 2026 that still cites "ISO/IEC/IEEE 12207:2017" as current is out of date.

### Gaps
- The process list and clause numbers of 12207:2026 (e.g., whether "System/Software requirements definition" keeps its 2017 name) could not be verified, because the standard and the ISO pages were not accessible.
- The exact publication month of 15288:2023 was not confirmed from an opened page.
- Why the 24765 Edition 3 project was cancelled was not found.

---

## 3. Quality and usability requirements: ISO/IEC 25010:2023, ISO/IEC 25030:2019, ISO 25065:2019, ISO 9241-210:2019

### Takeaway
These four give a software requirements engineer the vocabulary and structure for **non-functional and user requirements**:
- **ISO/IEC 25010:2023** (2nd edition, 2023-11) is the taxonomy for eliciting and classifying quality requirements. It now has nine product-quality characteristics: safety was added, usability became "interaction capability" and portability became "flexibility". Quality-in-use moved to the new ISO/IEC 25019.
- **ISO/IEC 25030:2019** is the process framework for specifying quality requirements.
- **ISO 25065:2019** standardises the content of a user requirements specification. Note its designation is "ISO 25065", not "ISO/IEC".
- **ISO 9241-210:2019** defines the human-centred design process in which user requirements are specified.

All appear current.

### Cited Findings

**Reference entry: ISO/IEC 25010:2023** (Relevance: Software-core)
- Official name: *Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — Product quality model*, **Second edition 2023-11** ([ISO/IEC 25010:2023 official preview PDF, VDE Verlag](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiec25010%7Bed2.0%7Den.pdf)). Publisher: ISO/IEC.
- **Official link:** https://www.iso.org/standard/78176.html
- Status: current. The second edition, "together with the first edition of ISO/IEC 25002 and the first edition of ISO/IEC 25019, cancels and replaces ISO/IEC 25010:2011" ([preview, Foreword](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiec25010%7Bed2.0%7Den.pdf)). Confidence: High.
- Main changes, quoted from the Foreword ([preview](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiec25010%7Bed2.0%7Den.pdf)):
  - "Safety has been added as a quality characteristic with subcharacteristics, i.e. operational constraint, risk identification, fail safe, hazard warning and safe integration".
  - "Usability and portability have been replaced with interaction capability and flexibility respectively".
  - "Inclusivity and self-descriptiveness, resistance, and scalability have been added as subcharacteristics of interaction capability, security, and flexibility respectively".
  - "User interface aesthetics and maturity have been replaced with user engagement and faultlessness".
  - "Accessibility has been split into inclusivity and user assistance".
  - The quality-in-use model and the overview parts "are moved to ISO/IEC 25002 on quality models overview and usage and ISO/IEC 25019 on quality-in-use model".
- Contribution: the model "is composed of nine characteristics (which are further subdivided into subcharacteristics)… [that] provide a reference model for the quality of the products to be specified, measured and evaluated" ([preview, Introduction](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiec25010%7Bed2.0%7Den.pdf)).

**Reference entry: ISO/IEC 25030:2019** (Relevance: Software-core)
- Official name: *Systems and software engineering — Systems and software quality requirements and evaluation (SQuaRE) — Quality requirements framework*.
- **Official link:** https://www.iso.org/standard/72116.html
- Status: current; it replaced ISO/IEC 25030:2007, which is withdrawn (ISO pages via search extract). Confidence: Med.
- Contribution:
  - A framework for quality requirements for systems, software products and data, covering the concept of quality requirements and "requirements and recommendations for the processes and methods" to elicit, define, use and govern them.
  - It follows the 15288 technical processes, and uses the 25010/25012 quality models and the 2502n quality measures to categorise and quantify quality requirements.
  - It does **not** cover functional or process requirements, and does not prescribe specific measures.

  (ISO abstract via search extract) ([ISO 25030:2019](https://www.iso.org/standard/72116.html))

**Reference entry: ISO 25065:2019** (Relevance: Software-core, for interactive systems)
- Official name: *Systems and software engineering — Software product Quality Requirements and Evaluation (SQuaRE) — Common Industry Format (CIF) for Usability: User requirements specification*. **Edition 1, May 2019**, 20 pages. Publisher: **ISO/TC 159/SC 4** (ergonomics), not JTC 1. The ISO designation is "ISO 25065:2019", sometimes cited as ISO/IEC 25065 (ISO page via search extract).
- **Official link:** https://www.iso.org/standard/72189.html
- Status: current; no newer edition was seen. Confidence: Med.
- Contribution:
  - Defines the content elements and format of a user requirements specification, including user-system interaction requirements (including system outputs) and use-related quality requirements that serve as acceptance criteria.
  - Method- and lifecycle-neutral, and usable in agile.
  - Intended readers include requirements engineers, business analysts, product managers and product owners.
  - Its input is the ISO/IEC 25064:2013 user needs report.

  (ISO abstract via search extract) ([ISO 25065:2019](https://www.iso.org/standard/72189.html))

**Reference entry: ISO 9241-210:2019** (Relevance: Software-core, for interactive systems)
- Official name: *Ergonomics of human-system interaction — Part 210: Human-centred design for interactive systems* (2019, second edition). It replaced the 2010 edition, which had replaced ISO 13407:1999 (ISO pages via search extract).
- **Official link:** https://www.iso.org/standard/77520.html
- Status: current. Confidence: Med.
- Contribution:
  - Principles: explicit understanding of users, tasks and environments; user involvement throughout; user-centred evaluation; iteration; the whole user experience; multidisciplinary teams.
  - Activities: understand the context of use, **specify user requirements**, produce design solutions, and evaluate them.

  (ISO page via search extract; the activity list is from a secondary summary in the same results) ([ISO 9241-210:2019](https://www.iso.org/standard/77520.html))

### Inferences
- The nine 25010:2023 characteristics follow from the Foreword's change list applied to the eight 2011 characteristics: functional suitability, performance efficiency, compatibility, **interaction capability**, reliability, security, maintainability, **flexibility** and **safety**. This is high confidence, but it is derived, not quoted in full.
- Practical division of labour:
  - 25010 for *which* quality attributes to ask about;
  - 25030 for *how* to turn them into measurable quality requirements, with 2502n measures;
  - 9241-210 for the user-centred process;
  - 25065 for the *document format* of user requirements.
- Older literature citing "ISO/IEC 25010:2011 usability/portability" uses superseded names.

### Gaps
- The full subcharacteristic list and definitions of 25010:2023 were not seen (paid text).
- Whether ISO/IEC 25030:2019 has any amendment was not checked.
- The publication years of ISO/IEC 25002 and 25019 were not verified from opened pages. 25019 is believed to be 2023 and 25002 to be 2024, per titles in search results.

---

## 4. INCOSE (Guide to Writing Requirements, Needs and Requirements Manual, SE Handbook 5th ed.) and the NASA Systems Engineering Handbook

### Takeaway
- **INCOSE Guide to Writing Requirements (GtWR) v4** (INCOSE-TP-2010-006-04, dated 1 July 2023, released June 2023) is the most detailed practical rulebook for writing individual requirement statements. It has **15 characteristics**: C1–C9 for individual needs and requirements, C10–C15 for sets, with C15 "Correct" new in v4. It has **42 rules** grouped by quality focus, plus a patterns appendix. No v5 was found.
- **The Needs and Requirements Manual (NRM)** has moved on from the 2022 V1/V1.1 versions. **NRM Version 2 was published by Wiley in Oct/Nov 2024** as *INCOSE Needs and Requirements Manual: Needs, Requirements, Verification, Validation Across the Lifecycle*. It formalises the distinction between **needs** (stakeholders' agreed expectations, the basis for validation) and **design-input requirements** (agreed obligations, the basis for verification).
- **INCOSE SE Handbook 5th ed.** (Wiley, 2023) elaborates 15288:2023.
- **NASA SE Handbook Rev 2** (NASA/SP-2016-6105 Rev 2) Appendix C is a widely used checklist for writing requirements: shall/will/should, and avoiding unverifiable terms.

### Cited Findings

**Reference entry: INCOSE Guide to Writing Requirements, Version 4** (Relevance: Software-core and Systems)
- Official name and number: *INCOSE Guide to Writing Requirements*, Document No. **INCOSE-TP-2010-006-04**, Rev 4, dated **1 July 2023**, prepared by the INCOSE Requirements Working Group (RWG). Seen via search extract; direct fetch of the INCOSE PDF returned 403 ([INCOSE GtWR v4 PDF](https://www.incose.org/docs/default-source/working-groups/requirements-wg/gtwr/incose_rwg_gtwr_v4_040423_final_drafts.pdf)). Publisher: INCOSE.
- An INCOSE webinar deck says "V4 was released in June 2023". The RWG released V3.1 in May 2022 to align with the NRM, GtNR and GtVV ([INCOSE Webinar 168 slides](https://www.incose.org/wp-content/uploads/2026/01/webinar_168_wheatcraft_guide_to_writing_requirements_version_4.pdf)). The slides also say "RWG Products are in the INCOSE Store! Free to INCOSE members" ([same](https://www.incose.org/wp-content/uploads/2026/01/webinar_168_wheatcraft_guide_to_writing_requirements_version_4.pdf)).
- **Official link:** https://www.incose.org/communities/working-groups-initiatives/requirements (the INCOSE RWG page; seen in search results, not opened; the INCOSE Store product page was not found, so treat this link as **UNVERIFIED**).
- Status: current. No v5 or 2025–2026 revision was found ([search; INCOSE webinar listing](https://www.incose.org/events/webinars/!previous/2023/10/25/default-calendar/webinar-168-guide-to-writing-requirements-version-4)). Confidence: Med.
- What v4 changed: "Added new characteristic for sets of needs and requirements – C15: Correct"; "Updated rules (now includes 42 rules)"; "Updated Appendix C: Patterns"; "Added Appendix D for application of rules" ([Webinar 168 slides](https://www.incose.org/wp-content/uploads/2026/01/webinar_168_wheatcraft_guide_to_writing_requirements_version_4.pdf)). Confidence: High.
- Characteristics ([Webinar 168 slides](https://www.incose.org/wp-content/uploads/2026/01/webinar_168_wheatcraft_guide_to_writing_requirements_version_4.pdf)):
  - Individual needs and requirements: **C1 Necessary, C2 Appropriate, C3 Unambiguous, C4 Complete, C5 Singular, C6 Feasible, C7 Verifiable, C8 Correct, C9 Conforming**.
  - Sets: **C10 Complete, C11 Consistent, C12 Feasible, C13 Comprehensible, C14 Able to be validated, C15 Correct**.
- Rules are grouped by "quality focus":
  - Accuracy (e.g., R1 Structured Statements)
  - Concision (R10 Superfluous infinitives)
  - Non-ambiguity (R12 Correct Grammar)
  - Singularity
  - Completeness (R24 Pronouns)
  - Realism
  - Conditions (R27 Explicit Conditions, R28 Multiple Conditions)
  - Uniqueness
  - Abstraction (R31 Solution Free)
  - Quantifiers (R32 Universal Qualification)
  - Tolerance (R33 Range of Values)
  - Quantification (R34 Measurable Performance)
  - Uniformity of Language (R36 Consistent Terms and Units)
  - Modularity (R41 Related Needs and Requirements)

  ([Webinar 168 slides, rules-to-characteristics matrix](https://www.incose.org/wp-content/uploads/2026/01/webinar_168_wheatcraft_guide_to_writing_requirements_version_4.pdf))
- The slides note that conditional-clause structuring "has been commercialized in approaches such as 'EARS' (Easy Approach to Requirements Syntax)", which the GtWR addresses through R1, R27 and R28 and Appendix C patterns ([same](https://www.incose.org/wp-content/uploads/2026/01/webinar_168_wheatcraft_guide_to_writing_requirements_version_4.pdf)).
- Definitions (GtWR v4 summary sheet via search extract) ([INCOSE GtWR v4 summary sheet](https://www.incose.org/docs/default-source/working-groups/requirements-wg/guidetowritingrequirements/incose_rwg_gtwr_v4_summary_sheet.pdf)). Confidence: Med.
  - "A need statement is the result of a formal transformation of one or more sources or lifecycle concepts into an agreed-to expectation for an entity".
  - "A requirement statement is the result of a formal transformation of one or more sources, needs, or higher-level requirements into an agreed-to obligation".

**Reference entry: INCOSE Needs and Requirements Manual (NRM), Version 2** (Relevance: Systems; concepts transferable to software)
- History: "The NRM (was NRVVLM) is the RWG flagship product, V1 released in January 2022"; "V1.1 minor updates in May 2022 to shorten title, add subtitle"; and the 2023 deck says it was "being updated to Version 2, which is planned to be published by Wiley in 2024" ([Webinar 168 slides](https://www.incose.org/wp-content/uploads/2026/01/webinar_168_wheatcraft_guide_to_writing_requirements_version_4.pdf)). Confidence: High.
- Current edition: *INCOSE Needs and Requirements Manual: Needs, Requirements, Verification, Validation Across the Lifecycle*. Authors: Louis S. Wheatcraft, Michael J. Ryan and Tami Edner Katz. Publisher: Wiley. E-book **October 2024**, hardcover **November 2024**, 528 pages, 16 chapters, ISBN 978-1-394-15276-6 (Wiley page via search extract) ([Wiley](https://www.wiley.com/en-us/INCOSE+Needs+and+Requirements+Manual:+Needs,+Requirements,+Verification,+Validation+Across+the+Lifecycle-p-9781394152766)).
  - The INCOSE store lists "Needs and Requirements Manual (NRM) version 2 (soft copy)" ([INCOSE store](https://portal.incose.org/ItemDetail?iProductCode=NRM2&Category=EBOOKS&WebsiteKey=d4c31fa4-467a-4959-b48b-cae3ea93e516)).
  - Front matter reads "INCOSE-TP-2021-002-01, 2024" ([e-bookshelf front-matter excerpt](https://content.e-bookshelf.de/media/reading/L-25303459-f48ab33d4b.pdf)), while a library record dates it [2025] ([TUM catalogue](https://search.ub.tum.de/vufind/Record/ZDB-30-ORH-111746310)). This is a minor conflict; Wiley's own dates (2024) are preferred. Confidence: Med.
- **Official link:** https://www.wiley.com/en-us/INCOSE+Needs+and+Requirements+Manual:+Needs,+Requirements,+Verification,+Validation+Across+the+Lifecycle-p-9781394152766
- Needs vs requirements (INCOSE NRM overview slides via search extract) ([NRM Section 6 overview](https://www.incose.org/docs/default-source/working-groups/requirements-wg/needsandrequirementsmanual/nrm_section_6_overview_042023s.pdf?sfvrsn=b4cb57c7_2)):
  - Needs "represent the stakeholder, customer/acquirer, user view of the system". The "agreed-to and baselined Integrated Set of Needs represents the scope of the project" and is the basis for system validation.
  - Requirements analysis asks "What must the SOI do to fulfill each of the needs?", producing "Design Input Requirements that are necessary and sufficient to meet the parent need". The system is verified against those requirements.
- The INCOSE slides add: "Needs are well-formed having the characteristics defined in the GtWR", and "If the Integrated Set of Needs does not have the characteristics defined in the GtWR, neither will the resulting set of design input requirements" ([Webinar 168 slides](https://www.incose.org/wp-content/uploads/2026/01/webinar_168_wheatcraft_guide_to_writing_requirements_version_4.pdf)).

**Reference entry: INCOSE Systems Engineering Handbook, 5th edition** (Relevance: Systems)
- Official name: *INCOSE Systems Engineering Handbook: A Guide for System Life Cycle Processes and Activities*, 5th ed. Editors: D. D. Walden, T. M. Shortell, G. J. Roedler, B. A. Delicado, O. Mornas, Yip Yew-Seng and D. Endler. Publisher: Wiley. E-book **June 2023**, paperback **July 2023**, 368 pages, ISBN 978-1-119-81429-0. It "elaborates on the life cycle processes in ISO/IEC/IEEE 15288:2023" (Wiley page via search extract) ([Wiley](https://www.wiley.com/en-us/INCOSE+Systems+Engineering+Handbook,+5th+Edition-p-9781119814290)). INCOSE Technical Product INCOSE-TP-2003-002-05 ([TUM catalogue](https://search.ub.tum.de/vufind/Record/ZDB-30-ORH-093386877)).
- **Official link:** https://www.wiley.com/en-us/INCOSE+Systems+Engineering+Handbook,+5th+Edition-p-9781119814290
- Status: current; no 6th edition was found. Confidence: Med.
- The RWG products "provide an elaboration of the INCOSE SE HB v5 – More of a 'how' vs. 'what'" ([Webinar 168 slides](https://www.incose.org/wp-content/uploads/2026/01/webinar_168_wheatcraft_guide_to_writing_requirements_version_4.pdf)).

**Reference entry: NASA Systems Engineering Handbook, NASA/SP-2016-6105 Rev 2** (Relevance: Systems; widely borrowed in software)
- NTRS record 20170001761, report number "NASA/SP-2016-6105 Rev 2", publication date 23 February 2017. It supersedes SP-2007-6105 Rev 1 (December 2007) (NTRS via search extract) ([NTRS record](https://ntrs.nasa.gov/search.jsp?R=20170001761)). Publisher: NASA. Date conflict: other citations use 2016 (the SP number) or December 2017.
- **Official link:** https://ntrs.nasa.gov/search.jsp?R=20170001761
- Status: current NASA handbook (no Rev 3 seen). Confidence: Med.
- Appendix C, "How to Write a Good Requirement" ([NASA Appendix C page](https://www.nasa.gov/reference/appendix-c-how-to-write-a-good-requirement/)). Confidence: High.
  - C.1 Use of correct terms: "Shall" = requirement; "Will" = facts or declaration of purpose; "Should" = goal.
  - C.2 Editorial checklist: "The requirement is in the form 'responsible party shall perform such and such.'"
  - C.3 General goodness checklist: e.g., "stated positively (as opposed to negatively, i.e., 'shall not')".
  - C.4 Requirements validation checklist: Clarity, Completeness, Compliance, Consistency, Traceability, Correctness, Functionality, Performance, Interfaces, Maintainability, Reliability, Verifiability/Testability, Data Usage. It asks "Are the requirements free of unverifiable terms…?"
- The handbook PDF lists unverifiable terms to avoid, such as flexible, easy, sufficient, safe, adequate, user-friendly, fast, robust, quickly, and "other 'ly' words". It also advises minimising TBDs and using TBRs with a rationale and owner (handbook PDF via search extract) ([NTRS PDF](https://ntrs.nasa.gov/api/citations/20170001761/downloads/20170001761.pdf?attachment=true)). Confidence: Med.

### Inferences
- GtWR v4's nine individual characteristics have the same names as those attributed to 29148:2018 in §1. Its set characteristics add "Correct" (C15) to 29148's five. So GtWR acts as an operational rulebook layered on 29148. This is an inference from names; INCOSE's alignment claim was not verified.
- The 2022 NRM the brief asked about is superseded by NRM V2 (Wiley, 2024). The reader should cite V2.
- Keyword conventions differ: NASA's shall/will/should vs RFC 2119's MUST/SHALL/SHOULD/MAY (§9). A specification should state which convention it uses.

### Gaps
- The full text of the 42 GtWR rules was not opened (INCOSE PDFs return 403 to automated fetch). Only the rules shown in the webinar matrix are named above.
- The INCOSE store page for GtWR v4 (price and access terms) was not verified.
- The NRM V2 table of contents was not verified.

---

## 5. Business analysis: IIBA BABOK Guide v3, the status of "BABOK v4", the PMI Guide to Business Analysis and PMI-PBA

### Takeaway
- **BABOK Guide v3 (IIBA, 2015) is still the current BABOK in October 2026.** No v4 has been published or announced. Instead, IIBA says it "has shifted from creating a single, expanded book to developing a modular, adaptable ecosystem of resources", led by *The Business Analysis Standard* (2025), which "is designed to complement the BABOK Guide, not replace it".
- BABOK v3's **requirements classification schema** (business / stakeholder / solution, split into functional and non-functional / transition) and its six knowledge areas are the business-analysis counterpart to 29148's information-item levels.
- **PMI:** *The PMI Guide to Business Analysis* (2017, includes ANSI/PMI 17-005-2017) has a companion *Business Analysis for Practitioners: A Practice Guide – Second Edition* (January 2024). **PMI-PBA appears still active**, with no retirement announcement found.

### Cited Findings

**Reference entry: A Guide to the Business Analysis Body of Knowledge (BABOK Guide), Version 3** (Relevance: Software-core for the business side of RE)
- Publisher: International Institute of Business Analysis (IIBA).
- Version history, per IIBA's Core Standard: "Version 1.4 was published in 2005. Version 1.6 was published in 2006. Version 2.0 was published in 2009. Version 3.0 was published in 2015" ([IIBA Global Business Analysis Core Standard, 2017](https://www.iiba.org/globalassets/standards-and-resources/core-standard/iiba-core-standard.pdf)). Confidence: High.
- IIBA's 2015 launch webinar: "On track for release mid-April" and "Coming April 15!" ([IIBA BABOK v3 webinar deck](https://www.iiba.org/contentassets/7e02e9a91b9646ebb39313d701dcce32/business-analysis-body-of-knowledge-babok-guide-v3.pdf)).
- **Official link:** https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/
- Status: current. The IIBA BABOK page refers to "The latest version of the guide", links a "BABOK® Guide v3 Errata" page, and says "The BABOK Guide defines six knowledge areas" ([IIBA BABOK page](https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/)). Confidence: High that v3 is the latest.
- Six knowledge areas with CBAP exam weights ([IIBA CBAP Handbook](https://www.iiba.org/globalassets/certification/cbap/files/cbap-handbook.pdf)). Confidence: High.

  | Knowledge area | CBAP weight |
  |---|---|
  | Business analysis planning and monitoring | 14% |
  | Elicitation and collaboration | 12% |
  | Requirements life cycle management | 15% |
  | Strategy analysis | 15% |
  | Requirements analysis and design definition | 30% |
  | Solution evaluation | 14% |
- **Requirements classification schema** (verbatim, from IIBA's Core Standard §1.5, which "represents the core and most fundamental practices… as described in… BABOK® Guide version 3") ([IIBA Core Standard](https://www.iiba.org/globalassets/standards-and-resources/core-standard/iiba-core-standard.pdf)). Confidence: High.
  - "Business requirements: statements of goals, objectives, and outcomes that describe why a change has been initiated."
  - "Stakeholder requirements: describe the needs of stakeholders that must be met in order to achieve the business requirements. They may serve as a bridge between business and solution requirements."
  - "Solution requirements: describe the capabilities and qualities of a solution that meets the stakeholder requirements." These are divided into:
    - "functional requirements: describe the capabilities that a solution must have in terms of the behaviour and information that the solution will manage";
    - "non-functional requirements or quality of service requirements: … describe conditions under which a solution must remain effective or qualities that a solution must have".
  - "Transition requirements: … to facilitate transition from the current state to the future state, but which are not needed once the change is complete… [e.g.] data conversion, training, and business continuity."
- IIBA describes Requirements Analysis and Design Definition as incremental and iterative activities that transform needs into a recommended solution. Requirements Life Cycle Management covers managing and maintaining requirements and design information from inception to retirement (IIBA Business Analysis Standard pages via search extract; the KnowledgeHub requires login) ([IIBA Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)). Confidence: Med. The individual BABOK v3 task names within each knowledge area (e.g., trace, maintain, prioritise, assess changes, approve) were **not verified** from an opened source.

**Reference entry: IIBA "The Business Analysis Standard"** (the post-v3 IIBA direction)
- Blog dated 25 February 2025: "The Standard is designed to complement the BABOK Guide, not replace it"; "IIBA has shifted from creating a single, expanded book to developing a modular, adaptable ecosystem of resources"; it is a "continuously updated resource" ([IIBA blog](https://www.iiba.org/business-analysis-blogs/the-updated-business-analysis-standard-your-foundation-for-success/)). Confidence: High.
- **Official link:** https://www.iiba.org/knowledgehub/the-business-analysis-standard/ (seen in search; the KnowledgeHub requires an IIBA login).
- Predecessor: *IIBA Global Business Analysis Core Standard* (2017, ISBN 978-1-927584-09-5), an abridged, freely reproducible companion to BABOK v3 ([IIBA Core Standard](https://www.iiba.org/globalassets/standards-and-resources/core-standard/iiba-core-standard.pdf)).

**Reference entry: The PMI Guide to Business Analysis (2017)** (Relevance: Software-core for business analysis in project settings)
- It includes *The Standard for Business Analysis*, **ANSI/PMI 17-005-2017**. It pairs an ANSI-accredited standard with a body of knowledge, is process-based and aligned with the *PMBOK Guide* 6th ed., and describes 35 business-analysis processes with inputs, outputs and techniques. Publisher: PMI. (Retailer and ANSI listings via search extract) ([ANSI webstore, PMI BA-2017](https://webstore.ansi.org/standards/pmi/pmiba2017)). Confidence: Med.
- **Official link:** https://www.pmi.org/shop/p-/book/the-pmi-guide-to-business-analysis/00101605701
- Status: no newer edition was found. Companion: *Business Analysis for Practitioners: A Practice Guide – Second Edition*, PMI, **January 2024** (PMI page via search extract) ([PMI](https://www.pmi.org/standards/business-analysis-second-edition)). Confidence: Med.

**Reference entry: PMI Professional in Business Analysis (PMI-PBA)** (certification)
- **Official link:** https://www.pmi.org/certifications/business-analysis-pba
- Status: **appears active**. Direct fetch of pmi.org returned 403, but the PMI certification page, as extracted by search, still describes:
  - a 200-question, 240-minute exam;
  - domain weights: Needs Assessment 18%, Planning 22%, Analysis 35%, Traceability and Monitoring 15%, Evaluation 10%;
  - renewal with 60 PDUs per 3-year cycle.

  ([PMI-PBA page](https://www.pmi.org/certifications/business-analysis-pba); [PMI-PBA Handbook](https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/professional-business-analysis-handbook.pdf)). A search for retirement news found nothing about the PMI-PBA; "retired" results concerned the PMP retired-status designation. Confidence: Med.

### Inferences
- BABOK's four-level schema maps loosely onto 29148's information items:
  - business requirements ≈ BRS;
  - stakeholder requirements ≈ StRS;
  - solution requirements ≈ SyRS/SRS;
  - BABOK uniquely adds *transition* requirements, which have no direct 29148 counterpart.
- The RE-relevant BABOK knowledge areas are Elicitation and Collaboration, Requirements Analysis and Design Definition, and Requirements Life Cycle Management, plus Strategy Analysis for the business need. Together they account for about 72% of the CBAP exam (12 + 30 + 15 + 15).
- Given IIBA's stated "ecosystem" strategy, a monolithic BABOK v4 looks unlikely in the near term (inference).

### Gaps
- No primary statement from PMI on the future of PMI-PBA or of *The PMI Guide to Business Analysis* was found. The PMI page could not be opened directly.
- The names of the BACCM's six core concepts were not verified (the IIBA webinar deck only says "6 core concepts kept recurring").

---

## 6. IREB CPRE: current syllabus, handbook, glossary, certification levels, and number of certified professionals

### Takeaway
- The **CPRE Foundation Level syllabus is now version 3.3.0, dated 1 April 2026**. It succeeds 3.2.0 of 26 February 2024. Its content changes: the interaction model was removed from learning objectives, and the listed quality criteria were clarified as recommended, not exhaustive.
- Current companions: Foundation Level **Handbook 1.3.2** and **CPRE Glossary 2.2.0** (M. Glinz).
- IREB no longer uses the "Advanced Level" label on its site. The modules (Elicitation, Modeling, Management, RE@Agile) are offered at **Practitioner (Level 2)** and **Specialist (Level 3)**, with **Expert (Level 4)** above.
- IREB's homepage currently reports **95,000 certified persons in 105 countries** (undated).

### Cited Findings

**Reference entry: IREB Certified Professional for Requirements Engineering (CPRE) — Foundation Level Syllabus, v3.3.0** (Relevance: Software-core)
- Publisher: International Requirements Engineering Board (IREB e.V.). Authors: Stan Bühne, Martin Glinz, Hans van Loenhoud, Stefan Staal. Version "3.3.0 | 1 April 2026" ([IREB-hosted CPRE FL syllabus 3.3, Dutch edition](https://cockpit-v1.ireb.org/media/pages/downloads/cpre-foundation-level-syllabus/16d077de6f-1781253359/cpre_foundationlevel_syllabus_nl_v.3.3.pdf)). Confidence: High for the date in this edition. The English PDF itself was not opened.
- Version history in the same file:
  - 3.1.0, December 2022;
  - 3.1.1, January 2024 (new corporate design);
  - 3.2.0, 26 February 2024 (layout corrections);
  - 3.3.0, 1 April 2026 ("Inhoudelijke veranderingen" = content changes). These are: "EO 3.4.3 en EU 3.4.6: Het interactiemodel is uit de leerdoelen verwijderd" (interaction model removed from the learning objectives), and EU 3.8 clarified that the quality criteria listed are recommended criteria, not an exhaustive list.

  ([same](https://cockpit-v1.ireb.org/media/pages/downloads/cpre-foundation-level-syllabus/16d077de6f-1781253359/cpre_foundationlevel_syllabus_nl_v.3.3.pdf))
- The English 3.2.0 PDF is dated 26 February 2024 ([GASQ-hosted EN 3.2](https://gasq.org/files/content/gasq/downloads/certification/IREB/cpre_foundationlevel_syllabus_en_v.3.2.pdf), via search extract). Version 3.0 was released 1 October 2020 ([GASQ sunset dates](https://gasq.org/en/certification/sunset-dates-syllabi.html), via search extract).
- **Official link:** https://cpre.ireb.org/en/knowledge-and-resources/downloads
- IREB downloads page ([IREB downloads](https://cpre.ireb.org/en/knowledge-and-resources/downloads)). Confidence: High.
  - CPRE Foundation Level Syllabus **3.3.0**
  - Foundation Level Handbook **1.3.2** (free IREB account required)
  - CPRE Glossary **2.2.0**
  - Requirements Elicitation syllabus 3.2.0; Requirements Management syllabus 2.1.0; Requirements Modeling syllabus 3.1.1; RE@Agile syllabus 2.3.0
  - Agile Primer 1.5.0
  - Foundation Level and Agile Primer examination regulations 5.6.2
- The syllabus cites "[Glin2025] M. Glinz: A Glossary of Requirements Engineering Terminology. Version 2.2" ([syllabus 3.3](https://cockpit-v1.ireb.org/media/pages/downloads/cpre-foundation-level-syllabus/16d077de6f-1781253359/cpre_foundationlevel_syllabus_nl_v.3.3.pdf)).
- RE contribution: the syllabus distinguishes three kinds of requirements [Glin2025]: **functional requirements**, **quality requirements** and **constraints** (constraints limit the solution space beyond what the functional and quality requirements need) ([syllabus 3.3, §1.1](https://cockpit-v1.ireb.org/media/pages/downloads/cpre-foundation-level-syllabus/16d077de6f-1781253359/cpre_foundationlevel_syllabus_nl_v.3.3.pdf)).
- Certification levels, as IREB now presents them ([IREB CPRE home](https://cpre.ireb.org/en)). Confidence: High.
  - "Level 1 | Foundation"
  - "Level 2 | Practitioner" in Elicitation, Management, Modeling or RE@Agile
  - "Level 3 | Specialist" in the same four areas
  - "Level 4 | Expert"
- Numbers: the IREB homepage statistics block shows **105 countries, 95,000 certified persons, 130 training providers**, with no date ([IREB CPRE home](https://cpre.ireb.org/en), fetched 23 Oct 2026). Earlier or other IREB figures, via search extract: "more than 85,000 professionals in more than 100 countries", and the opt-in CPRE Registry reporting "more than 85700" ([CPRE Registry](https://cpre.ireb.org/en/community/registry)). Confidence: Med (undated and inconsistent).

### Inferences
- What the brief calls "CPRE Advanced Level" modules (Elicitation, Requirements Modeling, Requirements Management, RE@Agile) are now examined as Practitioner and Specialist certificates. The report should use the current level names.
- IREB's three-way classification (functional / quality / constraints) differs from BABOK's (business / stakeholder / solution / transition) and from ISO/IEC 25010's quality taxonomy. A practitioner should expect these classifications to coexist.

### Gaps
- The release date of the *English* 3.3.0 syllabus was not confirmed. Translations carry 1 April 2026 (Dutch, Italian) or later dates.
- The exact date of IREB's 95,000 figure is unknown, and no audited time series was found.
- Whether the Foundation exam has already switched to 3.3.0 in all languages was not checked.

---

## 7. SWEBOK Guide v4.0: what its Software Requirements knowledge area covers

### Takeaway
SWEBOK Guide **Version 4.0** (IEEE Computer Society, 2024; re-identified as **v4.0a** after a 25 September 2025 update) has 18 knowledge areas. **Software Requirements is KA 1**, edited by Steve Tockey. It covers fundamentals (functional and non-functional requirements, technology constraints, quality-of-service constraints, derived requirements), elicitation, analysis (including formal analysis and conflict resolution), specification styles (unstructured and structured natural language, acceptance-criteria-based, model-based), validation, management (scrubbing, change control, scope matching), practical considerations (prioritisation, tracing, volatility, measurement) and tools.

### Cited Findings

**Reference entry: Guide to the Software Engineering Body of Knowledge (SWEBOK Guide), Version 4.0** (Relevance: Software-core)
- Citation given by IEEE CS: "H. Washizaki, eds., *Guide to the Software Engineering Body of Knowledge (SWEBOK Guide), Version 4.0*, IEEE Computer Society, 2024". After a **25 September 2025** update the document "is now identified as SWEBOK v4.0a" ([IEEE CS SWEBOK page](https://www.computer.org/education/bodies-of-knowledge/software-engineering)). Publisher: IEEE Computer Society. Confidence: High.
- **Official link:** https://www.computer.org/education/bodies-of-knowledge/software-engineering
- Status: current (v4.0a).
- The 18 knowledge areas start with "Software Requirements", followed by Software Architecture, Software Design, Construction, Testing, Software Engineering Operations, and others. Steve Tockey is the Software Requirements KA editor ([IEEE CS SWEBOK page](https://www.computer.org/education/bodies-of-knowledge/software-engineering)).
- Software Requirements KA topics, quoted from IEEE CS ([SWEBOK V4.0 Topics](https://www.computer.org/education/bodies-of-knowledge/software-engineering/topics)). Confidence: High.
  1. Software Requirements Fundamentals: definition; categories; product vs project requirements; functional requirements; nonfunctional requirements; technology constraints; quality of service constraints; why categorize; system vs software requirements; derived requirements; software requirements activities.
  2. Requirements Elicitation: sources; common elicitation techniques.
  3. Requirements Analysis: basic analysis; economics of quality-of-service constraints; formal analysis; addressing conflict.
  4. Requirements Specification: unstructured natural language; structured natural language; acceptance criteria-based; model-based; additional attributes of requirements; incremental vs comprehensive specification.
  5. Requirements Validation: reviews; simulation and execution; prototyping.
  6. Requirements Management Activities: requirements scrubbing; change control; scope matching.
  7. Practical Considerations: iterative nature; prioritization; tracing; stability and volatility; measuring requirements; process quality and improvement.
  8. Software Requirements Tools: requirements management, modeling, and functional test case generation tools.

### Inferences
- SWEBOK v4 explicitly legitimises **acceptance-criteria-based specification** alongside classical natural-language and model-based SRSs (the same §4 list). That bridges agile practice and the 29148 tradition.
- SWEBOK's split of non-functional requirements into technology constraints and quality-of-service constraints differs in wording from IREB's "quality requirements" and "constraints" (§6) and from 25010's characteristics (§3).

### Gaps
- What the 25 September 2025 v4.0a update changed in the Software Requirements KA was not determined.

---

## 8. Process and domain standards that impose requirements practices: CMMI, Automotive SPICE, ISO 26262, DO-178C, IEC 62304, FDA design controls / QMSR

### Takeaway
- **CMMI V3.0** (ISACA, April 2023): Requirements Development and Management (RDM) is a core practice area.
- **Automotive SPICE 4.1** is now the current VDA QMC release (August 2026). 4.0 (29 Nov 2023) is listed as "legacy". SYS.1 Requirements Elicitation, SYS.2 System Requirements Analysis and SWE.1 Software Requirements Analysis demand structured, prioritised, analysed and **bidirectionally traceable** requirements.
- **ISO 26262:2018** is current. Its 3rd edition is in DIS/WD drafting. Part 8 clause 6 covers the specification and management of safety requirements.
- **DO-178C** (RTCA, 13 Dec 2011; recognised by FAA AC 20-115D) requires high-level and low-level software requirements with trace data.
- **IEC 62304:2006+A1:2015** is current. Edition 2 was still a committee draft in mid-2026. It renames the scope to "health software" and replaces safety classes A/B/C with process rigour levels.
- **US FDA:** the **QMSR took effect on 2 February 2026**. It incorporates ISO 13485:2016 by reference. Former 21 CFR 820.30 design controls are now "[Reserved]", and design inputs are governed by ISO 13485 clause 7.3.3: complete, unambiguous, verifiable or validatable, and not in conflict.

### Cited Findings

**Reference entry: CMMI V3.0** (Relevance: Software-core, process improvement)
- Publisher: ISACA / CMMI Institute. ISACA press release dated **6 April 2023**: the "major model update" adds three domains (Data Management, People Management, Virtual Work) to the existing five (Development, Services, Supplier Management, Security, Safety) ([ISACA press release](https://www.isaca.org/about-us/newsroom/press-releases/2023/isaca-updates-cmmi-model-with-three-new-domains-that-help-organizations-improve-quality)). Confidence: High.
- **Official link:** https://www.isaca.org/about-us/newsroom/press-releases/2023/isaca-updates-cmmi-model-with-three-new-domains-that-help-organizations-improve-quality
- Status: current major version. No V3.x successor was found.
- RDM practice area (secondary sources):
  - V3.0 has 31 practice areas, 17 core and 14 domain-specific, and RDM is core. It covers requirements acquisition, analysis, description, communication, confirmation and change management ([The Core Solution summary](https://www.thecoresolution.com/?p=29830), via search extract).
  - In V3.0, RDM practices 2.1 and 2.3 were merged into a new 2.1: "Elicit stakeholder needs, expectations, constraints, and interfaces or connections, and confirm understanding of requirements" ([Process Group, Changes in CMMI V3](https://processgroup.com/changes-in-cmmi-v3)).

  Confidence: Med (official model text is paywalled).

**Reference entry: Automotive SPICE® Process Reference / Assessment Model 4.1** (Relevance: Regulated, automotive)
- Publisher: VDA QMC (Working Group 13).
- **Official link:** https://vda-qmc.de/en/automotive-spice/automotive-spice-veroeffentlichungen/
- Status: the VDA QMC publications page lists ([VDA QMC publications](https://vda-qmc.de/en/automotive-spice/automotive-spice-veroeffentlichungen/)):
  - "Automotive SPICE 4.1", **August 2026**, English PDF, "Currently the translations are in work";
  - Automotive SPICE **4.0 (legacy), 29.11.2023**;
  - 3.1 (legacy), 01.11.2017;
  - Guidelines for PAM 4.1, 3rd edition, July 2026;
  - Automotive SPICE for Cybersecurity 2.0, March 2025.

  Confidence: Med-High. A "Version 4.1 (Preview)" dated 2026-04-16 with status "Preview" preceded this ([VDA QMC PAM 4.1 Preview PDF](https://vda-qmc.de/wp-content/uploads/2026/04/Automotive-SPICE-PAM-4.1_Preview.pdf)). VDA QMC's main page inconsistently calls both 4.1 and 4.0 "current" ([VDA QMC Automotive SPICE](https://vda-qmc.de/en/automotive-spice/)), and a May 2026 intacs talk was titled "ASPICE 4.1 – New version of ASPICE coming" ([intacs slides](https://www.intacs.info/images/uploads/2026-05-Intacs_Regional_Event/2026-05-19_AK13_ASPICE4.1_Regional-SPICE-Event-Online.pdf), via search extract).
- RE contribution, quoted from the 4.1 Preview ([PAM 4.1 Preview](https://vda-qmc.de/wp-content/uploads/2026/04/Automotive-SPICE-PAM-4.1_Preview.pdf)). Confidence: High for the Preview text.
  - **SYS.1 Requirements Elicitation**: "The purpose is to gather, analyze, and track evolving stakeholder needs and requirements throughout the lifecycle of the product and/or service to establish a set of agreed requirements."
  - **SYS.2 System Requirements Analysis**: "…establish a structured and analyzed set of system requirements consistent with the stakeholder requirements". Its outcomes include specification, structuring and prioritisation, analysis for correctness and technical feasibility, and "Consistency and bidirectional traceability… between the system requirements and the stakeholder requirements".
  - **SWE.1 Software Requirements Analysis** does the same for software requirements against system requirements and system architecture. Its BP1 note says: "Characteristics of requirements are defined in standards such as ISO IEEE 29148, ISO 26262-8:2018, or the INCOSE Guide for Writing Requirements".
  - The model also has HWE.1 (hardware) and MLE.1 (machine learning) requirements-analysis processes, and SUP.10 Change Request Management.

**Reference entry: ISO 26262:2018 (Road vehicles — Functional safety), especially Part 8** (Relevance: Regulated, automotive)
- Official name: *Road vehicles — Functional safety — Part 8: Supporting processes*, second edition, December 2018. Publisher: ISO/TC 22/SC 32.
- **Official link:** https://committee.iso.org/standard/68390.html
- Status:
  - 2018 edition is current. ISO marks Part 8 "International Standard to be revised" (ISO committee page via search extract) ([ISO 26262-8:2018](https://committee.iso.org/standard/68390.html)).
  - The 3rd edition is in drafting. ISO lists DIS-stage drafts for Parts 2, 3, 5, 6, 7 and 9 (e.g., [ISO/DIS 26262-3](https://www.iso.org/standard/90022.html)) and working drafts for Parts 1, 4, 8 and 11 (e.g., [ISO/WD 26262-8.2](https://www.iso.org/standard/90027.html)). The search extract showed a Part 3 DIS registration dated 2026-08-04 (ISO pages via search extract).

  Confidence: Med; stage data may be stale.
- RE contribution: Part 8 clause 6, "Specification and management of safety requirements", covers requirement notation, attributes of safety requirements and their management, and recommends suitable requirements-management tools ([Verification Academy article](https://verificationacademy.com/topics/functional-safety/intelligent-requirements-traceability-for-iso-26262/), via search extract). Confidence: Med (secondary).

**Reference entry: RTCA DO-178C, *Software Considerations in Airborne Systems and Equipment Certification*** (Relevance: Regulated, airborne)
- Publisher: RTCA (EUROCAE equivalent ED-12C). Dated **13 December 2011**.
  - FAA **AC 20-115D** recognises DO-178C/ED-12C as an acceptable means of compliance for airborne software ([FAA AC 20-115D](https://www.faa.gov/regulations_policies/advisory_circulars/index.cfm/go/document.information/documentID/1032046), via search extract).
  - The supplements DO-330 (tool qualification), DO-331 (model-based), DO-332 (object-oriented) and DO-333 (formal methods) share the 13 Dec 2011 date ([FAA Order 8110.49A](https://www.faa.gov/documentLibrary/media/Order/FAA_Order_8110.49A.pdf), via search extract).

  Confidence: Med-High.
- **Official link:** https://www.faa.gov/regulations_policies/advisory_circulars/index.cfm/go/document.information/documentID/1032046 (the FAA recognition page; RTCA's own product page was not found, so the RTCA link is **UNVERIFIED**).
- Status: current (no DO-178D found).
- RE contribution (secondary summary): software high-level requirements (HLR) derive from system requirements. They are refined into low-level requirements (LLR). Bidirectional trace data links HLR↔LLR↔source code↔tests, so that every requirement is implemented and verified and every piece of code has a purpose. Objective counts scale with Design Assurance Level ([Wikipedia: DO-178C](https://en.wikipedia.org/wiki/DO-178C), via search extract). Confidence: Med (secondary).

**Reference entry: IEC 62304:2006+AMD1:2015, *Medical device software — Software life cycle processes*** (Relevance: Regulated, medical)
- Publisher: IEC (with ISO). The consolidated version "consists of the first edition (2006) and its amendment 1 (2015)", Edition 1.1, published 2015-06-26, with stability date 2028 (IEC webstore via search extract) ([IEC webstore 62304 CSV](https://webstore.iec.ch/en/publication/22794)).
- **Official link:** https://webstore.iec.ch/en/publication/22794
- Status: current.
  - IEC TC 62's document 62/502B/INF of 2026-07-03 still assesses "IEC 62304:2006+AMD1:2015" ([IEC TC 62 62/502B/INF](https://assets.iec.ch/public/tc62/62-502B-INF.pdf?2026070427=)). Confidence: High.
  - **Edition 2 is not yet published.** A VDE article of 22.07.2026 calls the draft "ein Arbeitsentwurf und noch keine veröffentlichte Norm" (a working draft, not yet a published standard). It expects "CD2 (2. Committee Draft)" in August 2026. The title changes to "Health Software – Software Life Cycle Processes". The A/B/C safety classes disappear in favour of Process Rigour Levels PRL I/PRL II. The scope change caused the first revision attempt to fail ([VDE](https://www.vde.com/iec-62304-edition-2-aenderungen)). Confidence: High (for July 2026). Vendor pages giving an "August 2026" publication date are contradicted by this.
- RE contribution (secondary mapping): clause 5.2 "Software requirements analysis":
  - 5.2.1 define software requirements from system requirements;
  - 5.2.2 required content;
  - 5.2.3 include risk control measures;
  - 5.2.4 re-evaluate the risk analysis;
  - 5.2.5 update system requirements;
  - 5.2.6 verify software requirements.

  ([OpenRegulatory mapping](https://openregulatory.com/document_templates/iec-623042006-mapping-of-requirements-to-documents), via search extract). Confidence: Med.

**Reference entry: US FDA Quality Management System Regulation (QMSR), 21 CFR Part 820 (formerly the Quality System Regulation, incl. design controls §820.30)** (Relevance: Regulated, medical)
- Publisher: US FDA.
- **Official link:** https://www.fda.gov/medical-devices/postmarket-requirements-devices/quality-management-system-regulation-qmsr
- Dates and status. Confidence: High.
  - The "Medical Devices; Quality System Regulation Amendments" final rule was published **2 February 2024** (89 FR 7496, FR Doc. 2024-01709) ([Federal Register](https://www.federalregister.gov/documents/2024/02/02/2024-01709/medical-devices-quality-system-regulation-amendments), via search extract). A conforming technical-amendments rule followed on 4 December 2025 ([Federal Register](https://www.federalregister.gov/documents/2025/12/04/2025-21955/medical-devices-quality-management-system-regulation-technical-amendments), via search extract).
  - FDA: "The rule is effective **February 2, 2026**, and is now titled Quality Management System Regulation (QMSR)". It "incorporates by reference… ISO 13485:2016… and clause 3 of ISO 9000:2015". On that date FDA stopped using QSIT and began inspecting under Compliance Program 7382.850 ([FDA QMSR page](https://www.fda.gov/medical-devices/postmarket-requirements-devices/quality-management-system-regulation-qmsr)).
  - For history, FDA notes the 1996 Quality System regulation (effective 1 June 1997) first added design controls ([same](https://www.fda.gov/medical-devices/postmarket-requirements-devices/quality-management-system-regulation-qmsr)).
- Current regulatory text ([eCFR, 21 CFR 820, current](https://www.ecfr.gov/api/renderer/v1/content/enhanced/current/title-21?part=820)). Confidence: High.
  - §820.7 incorporates "ISO 13485:2016(E)… Third edition, March 1, 2016".
  - §820.10(c) "Design and development. Manufacturers of class II, class III, and those class I devices listed… must comply with the requirements in Design and Development, Clause 7.3 and its Subclauses in ISO 13485".
  - §§820.20–820.30 are now "[Reserved]".
- Former §820.30(c) Design input, in force until the QMSR ([eCFR point-in-time 2025-12-31](https://www.ecfr.gov/api/renderer/v1/content/enhanced/2025-12-31/title-21?part=820&section=820.30)). Confidence: High.
  - Procedures "to ensure that the design requirements relating to a device are appropriate and address the intended use of the device, including the needs of the user and patient".
  - They "shall include a mechanism for addressing incomplete, ambiguous, or conflicting requirements".
  - Design inputs had to be documented, reviewed and approved with date and signature.
- ISO 13485 clause 7.3.3 design inputs, per FDA's own QMSR training deck: inputs "must be complete, unambiguous, able to be verified or validated, and not in conflict with each other". The deck's worked example: a weight input of "3 lb ± 1 kg" (mixed units) corrected to "3 lb ± 1 lb" ([FDA, "QMSR – Design and Development" deck](https://www.fda.gov/media/189041/download)). Confidence: High.

### Inferences
- These domain regimes converge on the same practice core:
  - explicit requirement levels (stakeholder → system → software, or HLR → LLR);
  - stated quality characteristics for each requirement (A-SPICE explicitly points to 29148 and INCOSE GtWR);
  - **bidirectional traceability**;
  - controlled change.

  A software engineer who masters 29148 plus GtWR covers most of the "how"; the domain standards add rigour levels, safety or risk linkage, and audit evidence.
- For US medical-device software after 2 Feb 2026, "design controls" should be described in ISO 13485 clause 7.3 terms rather than "21 CFR 820.30". The 820.30(c) wording ("incomplete, ambiguous, or conflicting") carries over almost directly into 7.3.3's "complete, unambiguous… not in conflict".
- Relevance ranking for a general software engineer: CMMI and A-SPICE (process frameworks) > ISO 26262 / DO-178C / IEC 62304 / QMSR (only when working in those regulated domains).

### Gaps
- The official CMMI V3.0 RDM practice wording (paywalled) and the official CMMI Institute model page were not opened.
- The RTCA DO-178C product page was not found. The HLR/LLR description relies on secondary sources.
- The ISO 26262 third-edition timeline is uncertain because the stage dates are from search extracts.
- Whether A-SPICE 4.1 (August 2026) is formally "final" is not stated explicitly by VDA QMC.
- The text of IEC 62304 clause 5.2 and ISO 13485 clause 7.3.3 was not opened (paid standards). Both are described via secondary sources and the FDA deck.

---

## 9. Interchange and notation standards: OMG ReqIF, SysML v1 and v2, RFC 2119/RFC 8174, ITU-T Z.151 (URN/GRL), and EARS

### Takeaway
- **ReqIF 1.2** (OMG, July 2016) is the current tool-to-tool requirements exchange format.
- **SysML v2.0** was approved for final adoption by OMG in mid-2025 (press release 21 July 2025; formal version dated September 2025), alongside KerML 1.0 and the Systems Modeling API and Services 1.0. **SysML v1.7** (June 2024) is the last 1.x release.
- **RFC 2119** (1997) plus **RFC 8174** (2017) together form BCP 14, the de-facto keyword convention (MUST/SHALL/SHOULD/MAY; only UPPERCASE carries the defined meaning).
- **ITU-T Z.151 (10/2018)** is the in-force User Requirements Notation, combining GRL goal models and Use Case Maps.
- **EARS** (2009) is the widely used template syntax for natural-language requirements.

### Cited Findings

**Reference entry: OMG Requirements Interchange Format (ReqIF) 1.2** (Relevance: Software-core / Systems, tooling)
- Versions: 1.2 formal, publication July 2016; 1.1 adopted October 2013; 1.0.1 adopted April 2011. It is intended for "exchanging requirements data between organizations" and for tool vendors building requirements-tool import/export ([OMG ReqIF](https://www.omg.org/spec/ReqIF)). Publisher: OMG. Confidence: High.
- **Official link:** https://www.omg.org/spec/ReqIF
- Status: current (no later version listed).

**Reference entry: OMG Systems Modeling Language (SysML) v2.0** (Relevance: Systems; model-based RE)
- OMG versions table: 2.0 formal, September 2025; 1.7 formal, June 2024; 1.6, December 2019; 1.5, May 2017; 1.4, August 2015; 1.3, June 2012; 1.2, June 2010; 1.1, November 2008; 1.0, September 2007 ([OMG SysML spec page](https://www.omg.org/spec/SysML)). Publisher: OMG. Confidence: High.
- **Official link:** https://www.omg.org/spec/SysML
- OMG press release of **21 July 2025**: "Object Management Group Approves Final Adoption of the SysML V2 Specification", together with KerML 1.0 and the Systems Modeling API and Services 1.0. SysML v2 models "deeply nested hierarchies of structure, behavior, requirements, and cross-cutting relationships" and supports analysis and verification cases ([OMG press release](https://www.omg.org/news/releases/pr2025/07-21-25.htm)). Confidence: High.
- The pilot-implementation repository states formal adoption "as of 30 June 2025" and an editorial update in March 2026 "for submission to" ISO ([GitHub sysml-v2-release](https://github.com/systems-modeling/sysml-v2-release), via search extract). Confidence: Med.
- SysML v1 requirement diagrams: requirements with containment and the relationships «deriveReqt», «copy», «refine», «satisfy», «trace» and «verify». Satisfy links a requirement to the design element that meets it, and verify links it to a test case ([PTC Modeler SysML requirements help](https://support.ptc.com/help/modeler/r10.2/en/Modeler/sysml/Overview_of_working_with_requirements.html); [Software Ideas SysML requirement diagram](https://softwareideas.net/sysml-requirement-diagram), via search extract). Confidence: Med (vendor documentation rather than the OMG text).

**Reference entry: IETF RFC 2119 and RFC 8174 (BCP 14)** (Relevance: Software-core; keyword convention)
- RFC 2119 "Key words for use in RFCs to Indicate Requirement Levels". Author S. Bradner, **March 1997**, Best Current Practice, BCP 14, updated by RFC 8174. It defines MUST, MUST NOT, REQUIRED, SHALL, SHALL NOT, SHOULD, SHOULD NOT, RECOMMENDED, MAY and OPTIONAL ([RFC Editor, RFC 2119](https://www.rfc-editor.org/info/rfc2119)). Confidence: High.
- RFC 8174 "Ambiguity of Uppercase vs Lowercase in RFC 2119 Key Words". Author B. Leiba, **May 2017**, BCP 14, "Updates: 2119". It clarifies that only UPPERCASE usage carries the defined meanings ([RFC Editor, RFC 8174](https://www.rfc-editor.org/info/rfc8174)). Confidence: High.
- **Official link:** https://www.rfc-editor.org/info/rfc2119 (cite with RFC 8174: https://www.rfc-editor.org/info/rfc8174)
- Status: both current as BCP 14. Publisher: IETF / RFC Editor.

**Reference entry: ITU-T Recommendation Z.151, *User Requirements Notation (URN) – Language definition*** (Relevance: research / goal-oriented RE)
- Editions: **Z.151 (10/18), "In force"**, approved 2018-10-14; Z.151 (11/08) and (10/12) superseded; Corrigendum 1 (04/12) superseded ([ITU-T Z.151](https://www.itu.int/rec/T-REC-Z.151); [Z.151 (10/18)](https://www.itu.int/rec/T-REC-Z.151-201810-I/en)). Publisher: ITU-T (Study Group 17). Confidence: High.
- **Official link:** https://www.itu.int/rec/T-REC-Z.151-201810-I/en
- Contribution: URN combines the **Goal-oriented Requirement Language (GRL)**, for goals and non-functional requirements and quality attributes, with **Use Case Maps (UCM)**, for scenarios, functional and operational requirements and architectural reasoning (ITU pages via search extract) ([ITU-T recommendation summary](https://www.itu.int/ITU-T/recommendations/rec.aspx?rec=13711)). Confidence: Med.

**Reference entry: EARS — Easy Approach to Requirements Syntax** (Relevance: Software-core; widely used template, not a formal standard)
- A. Mavin, P. Wilkinson, A. Harwood, M. Novak, "Easy Approach to Requirements Syntax (EARS)", *2009 17th IEEE International Requirements Engineering Conference*, pp. 317–322, August 2009. DOI verified via Crossref ([doi.org/10.1109/RE.2009.9](https://doi.org/10.1109/RE.2009.9)). Confidence: High.
- **Official link:** https://doi.org/10.1109/RE.2009.9
- INCOSE GtWR v4 explicitly cites EARS as a commercialised approach to conditional-clause patterns ([INCOSE Webinar 168 slides](https://www.incose.org/wp-content/uploads/2026/01/webinar_168_wheatcraft_guide_to_writing_requirements_version_4.pdf)).

### Inferences
- For a software requirements specifier:
  - RFC 2119/8174 (or NASA's shall/will/should) settles **modal verbs**;
  - EARS and the GtWR patterns settle **sentence structure**;
  - ReqIF matters only when exchanging requirements between tools or organisations;
  - SysML v2 and URN matter when requirements are captured as models rather than text.
- SysML v2's completed adoption (2025) and planned ISO submission make it the forward-looking choice for model-based requirements. SysML v1.7 remains what most tools implement in 2026. That is an inference; tool support was not surveyed.

### Gaps
- The normative SysML v2 requirement constructs (e.g., requirement definitions and usages with assume/require constraints) were not verified from the OMG text.
- The ISO submission status of SysML v2/KerML was not confirmed from an ISO source.
- Whether ITU-T has started a Z.151 revision was not checked.

---

## 10. Other RE standards and frameworks worth knowing (coverage beyond the brief)

### Takeaway
Several less-cited standards fill specific niches:
- **ISO/IEC TR 24766:2009**: capabilities expected of RE tools.
- **ISO/IEC 26551:2016**: product-line RE methods and tools.
- **SAE ARP4754B (2023)**: aircraft- and system-level requirements capture and validation, the systems-level companion above DO-178C.
- **ISO/IEC 25019 / 25002**: the new SQuaRE quality-in-use and quality-model-usage parts split out of 25010.

All are secondary to the core set for a software engineer, except ARP4754B in avionics.

### Cited Findings
- **ISO/IEC TR 24766:2009**, *Information technology — Systems and software engineering — Guide for requirements engineering tool capabilities* (ISO/IEC JTC 1/SC 7; Technical Report, first edition, December 2009).
  - **Official link:** https://www.iso.org/standard/51041.html
  - Gives guidance on the capabilities RE tools should have, supplementing ISO/IEC 14102. It is cited in 29148:2018's bibliography (ISO page via search extract) ([ISO TR 24766](https://www.iso.org/standard/51041.html)).
  - Status: not confirmed. Confidence: Med (existence), Low (status). Relevance: tooling.
- **ISO/IEC 26551:2016**, *Software and systems engineering — Tools and methods for product line requirements engineering* (ISO/IEC JTC 1/SC 7).
  - **Official link:** https://www.iso.org/standard/69530.html
  - Defines method and tool capabilities for product-line RE; it replaced the 2012 edition (ISO page via search extract) ([ISO 26551:2016](https://www.iso.org/standard/69530.html)). Confidence: Med. Relevance: software product lines.
- **SAE ARP4754B**, *Guidelines for Development of Civil Aircraft and Systems*, dated **2023-12-20**.
  - **Official link:** https://saemobilus.sae.org/content/ARP4754B
  - A recommended practice centred on validation of requirements and verification of design implementation at aircraft and system level. It explicitly leaves software to DO-178C/ED-12C and safety assessment to ARP4761A (SAE and national-body listings via search extract) ([SAE ARP4754B](https://saemobilus.sae.org/content/ARP4754B)). Confidence: Med. Relevance: Regulated (avionics).
- **ISO/IEC 25019 (quality-in-use model)** and **ISO/IEC 25002 (quality models overview and usage)**: first editions created when 25010 was revised. "This second edition of ISO/IEC 25010, together with the first edition of ISO/IEC 25002 and the first edition of ISO/IEC 25019, cancels and replaces ISO/IEC 25010:2011" ([ISO/IEC 25010:2023 preview, Foreword](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiec25010%7Bed2.0%7Den.pdf)). Confidence: High (relationship). Official links not verified (**UNVERIFIED**).
- **ISO/IEC/IEEE 24748-2:2024**: guidelines for applying ISO/IEC/IEEE 15288 ([ISO 24748-2:2024](https://www.iso.org/standard/84661.html), via search extract). Confidence: Med. Relevance: Systems.

### Inferences
- For the "Standards and bodies of knowledge" section, the coverage hierarchy for a software requirements specifier is:
  1. Core: 29148 (+ GtWR, EARS, RFC 2119/8174), 25010/25030, SWEBOK KA 1, IREB CPRE FL syllabus and glossary, BABOK v3 schema.
  2. Life-cycle framing: 12207:2026 / 15288:2023, 15289, 24765.
  3. UX: 9241-210, 25065.
  4. Process models: CMMI, A-SPICE.
  5. Regulated domains: ISO 26262, DO-178C/ARP4754B, IEC 62304, FDA QMSR/ISO 13485.
  6. Notation and interchange: SysML, ReqIF, URN.

### Gaps
- These widely used frameworks were **not researched or verified** and should not be cited from these notes:
  - the Volere Requirements Specification Template (Robertson & Robertson);
  - railway (EN 50716) and space (ECSS-E-ST-10-06C) requirements standards;
  - IEC 61508 safety requirements specification;
  - ISO/SAE 21434 cybersecurity requirements;
  - IEC 62366-1 usability engineering for medical devices. Its edition "IEC 62366-1:2015+AMD1:2020" appears in [IEC TC 62 62/502B/INF](https://assets.iec.ch/public/tc62/62-502B-INF.pdf?2026070427=), but its RE content was not checked.
- The withdrawal status of ISO/IEC TR 24766:2009 was not confirmed.

---

## 11. Consolidated reference list: status at a glance (as of 23 October 2026)

### Takeaway
Of the items in the brief:
- **Changed since common references were written:** ISO/IEC/IEEE 12207 (now 2026), Automotive SPICE (now 4.1, August 2026), the INCOSE NRM (now V2, Wiley 2024), the IREB CPRE FL syllabus (now 3.3.0, April 2026), SWEBOK (now v4.0a) and the FDA QMSR (in force since 2 Feb 2026).
- **Under revision:** ISO/IEC/IEEE 29148 (Edition 3 at DIS), ISO 26262 (3rd edition DIS/WD) and IEC 62304 (Edition 2 at CD).
- **Not found:** BABOK v4.

### Cited Findings
One official link per item. Evidence and confidence for each row are in the section shown.

| Item | Current edition / year | Publisher | Status (Oct 2026) | Official link | § |
|---|---|---|---|---|---|
| ISO/IEC/IEEE 29148 *Requirements engineering* | 2018 (Ed. 2) | ISO/IEC JTC 1/SC 7 + IEEE CS | Current; Ed. 3 at DIS; IEEE P29148 PAR 2025-09-10 | https://www.iso.org/standard/72089.html | 1 |
| IEEE 830-1998 *Recommended Practice for SRS* | 1998 | IEEE | Superseded by 29148:2011 | https://standards.ieee.org/ieee/830/1222/ | 1 |
| IEEE 1233-1998 *Guide for Developing System Requirements Specifications* | 1998 | IEEE | Superseded by 29148:2011 | https://standards.ieee.org/ieee/1233/1879/ | 1 |
| IEEE 1362-1998 *Guide for … Concept of Operations (ConOps) Document* | 1998 | IEEE | Superseded by 29148:2011 | https://standards.ieee.org/ieee/1362/2047/ | 1 |
| ISO/IEC/IEEE 15288 *System life cycle processes* | 2023 (Ed. 2) | ISO/IEC + IEEE | Current | https://www.iso.org/standard/81702.html | 2 |
| ISO/IEC/IEEE 12207 *Software life cycle processes* | **2026** (IEEE pub. 2026-04-15) | ISO/IEC + IEEE | Current; 2017 withdrawn 2026-04-29 | https://www.iso.org/standard/90219.html | 2 |
| ISO/IEC/IEEE 24765 *Vocabulary* (+ SEVOCAB) | 2017 | ISO/IEC + IEEE | Current; Ed. 3 CD cancelled | https://www.iso.org/standard/71952.html | 2 |
| ISO/IEC/IEEE 15289 *Content of life-cycle information items* | 2019 (Ed. 4) | ISO/IEC + IEEE | Current; Ed. 5 at CD | https://www.iso.org/standard/74909.html | 2 |
| ISO/IEC 25010 *Product quality model* | 2023 (Ed. 2) | ISO/IEC | Current | https://www.iso.org/standard/78176.html | 3 |
| ISO/IEC 25030 *Quality requirements framework* | 2019 | ISO/IEC | Current | https://www.iso.org/standard/72116.html | 3 |
| ISO 25065 *CIF for usability: User requirements specification* | 2019 (Ed. 1) | ISO (TC 159/SC 4) | Current | https://www.iso.org/standard/72189.html | 3 |
| ISO 9241-210 *Human-centred design for interactive systems* | 2019 | ISO | Current | https://www.iso.org/standard/77520.html | 3 |
| INCOSE Guide to Writing Requirements | v4, 1 Jul 2023 (INCOSE-TP-2010-006-04) | INCOSE | Current (no v5 found) | https://www.incose.org/communities/working-groups-initiatives/requirements (UNVERIFIED as product page) | 4 |
| INCOSE Needs and Requirements Manual | **V2**, Wiley Oct/Nov 2024 (V1 Jan 2022, V1.1 May 2022) | INCOSE / Wiley | Current | https://www.wiley.com/en-us/INCOSE+Needs+and+Requirements+Manual:+Needs,+Requirements,+Verification,+Validation+Across+the+Lifecycle-p-9781394152766 | 4 |
| INCOSE Systems Engineering Handbook | 5th ed., 2023 | INCOSE / Wiley | Current | https://www.wiley.com/en-us/INCOSE+Systems+Engineering+Handbook,+5th+Edition-p-9781119814290 | 4 |
| NASA Systems Engineering Handbook | SP-2016-6105 Rev 2 (NTRS date 23 Feb 2017) | NASA | Current | https://ntrs.nasa.gov/search.jsp?R=20170001761 | 4 |
| IIBA BABOK Guide | v3, 2015 | IIBA | Current; no v4 (IIBA moved to a modular "Business Analysis Standard", 2025) | https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/ | 5 |
| The PMI Guide to Business Analysis (incl. ANSI/PMI 17-005-2017) | 2017 | PMI | No newer edition found; companion practice guide 2nd ed. Jan 2024 | https://www.pmi.org/shop/p-/book/the-pmi-guide-to-business-analysis/00101605701 | 5 |
| PMI-PBA certification | — | PMI | Appears active (Med confidence) | https://www.pmi.org/certifications/business-analysis-pba | 5 |
| IREB CPRE Foundation Level syllabus | **3.3.0, 1 Apr 2026** (handbook 1.3.2; glossary 2.2.0) | IREB e.V. | Current | https://cpre.ireb.org/en/knowledge-and-resources/downloads | 6 |
| SWEBOK Guide | **v4.0 (2024) → v4.0a (25 Sep 2025 update)** | IEEE Computer Society | Current | https://www.computer.org/education/bodies-of-knowledge/software-engineering | 7 |
| CMMI | V3.0, Apr 2023 | ISACA / CMMI Institute | Current | https://www.isaca.org/about-us/newsroom/press-releases/2023/isaca-updates-cmmi-model-with-three-new-domains-that-help-organizations-improve-quality | 8 |
| Automotive SPICE PRM/PAM | **4.1, Aug 2026** (4.0 of 29 Nov 2023 now "legacy") | VDA QMC | Current (Med-High) | https://vda-qmc.de/en/automotive-spice/automotive-spice-veroeffentlichungen/ | 8 |
| ISO 26262 *Road vehicles — Functional safety* (Part 8 cl. 6) | 2018 (Ed. 2) | ISO | Current; 3rd ed. at DIS/WD | https://committee.iso.org/standard/68390.html | 8 |
| RTCA DO-178C | 13 Dec 2011 | RTCA (EUROCAE ED-12C) | Current; recognised by FAA AC 20-115D | https://www.faa.gov/regulations_policies/advisory_circulars/index.cfm/go/document.information/documentID/1032046 | 8 |
| IEC 62304 *Medical device software — Software life cycle processes* | 2006+AMD1:2015 (Ed. 1.1) | IEC | Current; Ed. 2 at CD2 (Aug 2026) | https://webstore.iec.ch/en/publication/22794 | 8 |
| FDA QMSR, 21 CFR 820 (incorporates ISO 13485:2016; ex-§820.30) | Final rule 2 Feb 2024; **effective 2 Feb 2026** | US FDA | In force | https://www.fda.gov/medical-devices/postmarket-requirements-devices/quality-management-system-regulation-qmsr | 8 |
| OMG ReqIF | 1.2, Jul 2016 | OMG | Current | https://www.omg.org/spec/ReqIF | 9 |
| OMG SysML | 2.0 (formal Sep 2025; final adoption announced 21 Jul 2025); 1.7 (Jun 2024) | OMG | Current | https://www.omg.org/spec/SysML | 9 |
| RFC 2119 *Key words for use in RFCs to Indicate Requirement Levels* (BCP 14) | Mar 1997 | IETF | Current (updated by RFC 8174) | https://www.rfc-editor.org/info/rfc2119 | 9 |
| RFC 8174 *Ambiguity of Uppercase vs Lowercase in RFC 2119 Key Words* (BCP 14) | May 2017 | IETF | Current | https://www.rfc-editor.org/info/rfc8174 | 9 |
| ITU-T Z.151 URN (GRL + UCM) | 10/2018 | ITU-T | In force | https://www.itu.int/rec/T-REC-Z.151-201810-I/en | 9 |
| EARS | 2009 (RE'09) | IEEE (conference paper) | Widely used notation | https://doi.org/10.1109/RE.2009.9 | 9 |
| ISO/IEC TR 24766 *Guide for RE tool capabilities* | 2009 | ISO/IEC | Status unconfirmed | https://www.iso.org/standard/51041.html | 10 |
| ISO/IEC 26551 *Product line RE tools and methods* | 2016 | ISO/IEC | Listed; status unconfirmed | https://www.iso.org/standard/69530.html | 10 |
| SAE ARP4754B | 2023-12-20 | SAE | Current | https://saemobilus.sae.org/content/ARP4754B | 10 |

### Inferences
- **Most relevant for a software engineer learning to specify requirements**, in rough priority order:
  1. ISO/IEC/IEEE 29148
  2. INCOSE GtWR v4 (+ EARS and RFC 2119/8174)
  3. ISO/IEC 25010:2023 + 25030
  4. SWEBOK v4 KA 1
  5. IREB CPRE FL syllabus 3.3.0 and glossary
  6. BABOK v3's classification schema
  7. ISO 25065 and ISO 9241-210 for interactive systems
- Systems standards (15288, INCOSE NRM and SE Handbook, NASA) give the needs-to-requirements discipline.
- Domain standards apply only when working in those sectors.

### Gaps
- ISO catalogue statuses rest on search-engine extracts of iso.org (direct access blocked). Where an opened IEEE SA or publisher preview page corroborated them (29148, 12207, 25010) confidence is high; otherwise it is medium.
- See per-section Gaps for unverified links: the INCOSE GtWR product page, RTCA DO-178C, and official pages for ISO/IEC 25019/25002.
