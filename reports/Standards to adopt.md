# Standards to adopt

*As of 24 October 2026. Companion to [Requirements engineering literature review](Requirements%20engineering%20literature%20review.md).*

Adopt five: ISO/IEC/IEEE 29148 as the frame, INCOSE's Guide to Writing Requirements for wording, ISO/IEC 25010 for quality requirements, BCP 14 for obligation keywords, and IREB's CPRE as your body of knowledge. Keep six more for reference, and add the rest only when your domain or process demands them.

## Adopt

| Standard or body of knowledge | Latest version | Use it for | Access |
|---|---|---|---|
| [ISO/IEC/IEEE 29148](https://www.iso.org/standard/72089.html) Requirements engineering | 2018 (Ed. 2). Ed. 3 is at draft (DIS) stage, no publication date yet | The frame: requirement levels, BRS/StRS/SRS contents, characteristics of good requirements | Paid |
| [INCOSE Guide to Writing Requirements](https://www.incose.org/docs/default-source/working-groups/requirements-wg/gtwr/incose_rwg_gtwr_v4_040423_final_drafts.pdf) | v4 (1 July 2023) | Wording each requirement: 15 characteristics, 42 rules | INCOSE Store |
| [ISO/IEC 25010](https://www.iso.org/standard/78176.html) Product quality model | 2023 (Ed. 2) | A checklist of nine quality characteristics for quality requirements | Paid |
| BCP 14: [RFC 2119](https://www.rfc-editor.org/info/rfc2119) and [RFC 8174](https://www.rfc-editor.org/info/rfc8174) | 1997 and 2017 | Fixed meanings for MUST/SHALL, SHOULD and MAY, in capitals only | Free |
| [IREB CPRE Foundation Level](https://cpre.ireb.org/en/knowledge-and-resources/downloads): syllabus, handbook, glossary | Syllabus 3.3.0 (dated 1 April 2026); handbook 1.3.2; glossary 2.2.0 | The practitioner body of knowledge: techniques and shared vocabulary | Free (handbook needs a free account) |

How they fit: 29148 says which levels and documents exist, the INCOSE guide says how to word each requirement, 25010 says which quality concerns to cover, BCP 14 fixes what each obligation word means, and IREB supplies the techniques and vocabulary. BCP 14 defines SHALL as equal to MUST, so it agrees with the "shall" used by 29148 and INCOSE.

## Keep for reference

| Standard or body of knowledge | Latest version | Reach for it when | Access |
|---|---|---|---|
| [INCOSE Needs and Requirements Manual](https://www.wiley.com/en-us/INCOSE+Needs+and+Requirements+Manual-p-9781394152742) | v2 (Wiley, 2024; © 2025) | You need needs vs requirements, and validation vs verification, in depth | Paid book |
| [ISO/IEC 25030](https://www.iso.org/standard/72116.html) Quality requirements framework | 2019 (Ed. 2), reconfirmed 2025 | Turning 25010 characteristics into measurable requirements | Paid |
| [SWEBOK Guide](https://www.computer.org/education/bodies-of-knowledge/software-engineering) | v4.0a (25 September 2025) | Seeing requirements within the whole software life cycle | Free for personal use |
| [IIBA BABOK Guide](https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/) | v3 (2015); no v4 announced | Business-side analysis: strategy, stakeholders, business requirements | Paid or IIBA membership; IIBA's shorter Business Analysis Standard is free |
| [NASA SE Handbook, Appendix C](https://www.nasa.gov/reference/appendix-c-how-to-write-a-good-requirement/) | Rev 2 (SP-2016-6105) | A free, quick writing checklist | Free |
| [OMG SysML](https://www.omg.org/spec/SysML) | 2.0 (formal, September 2025) | You move to model-based requirements (MBSE) | Free |

## Only if your domain or process demands it

| Standard | Latest version | Needed for |
|---|---|---|
| [ISO/IEC/IEEE 12207](https://standards.ieee.org/ieee/12207/11416/) and [15288](https://www.iso.org/standard/81702.html) | 2026 and 2023 | Formal software or system life-cycle processes |
| [ISO/IEC/IEEE 24765](https://doi.org/10.1109/IEEESTD.2017.8016712) vocabulary | 2017; free to search as [SEVOCAB](https://pascal.computer.org/sev_display/index.action) | Settling terminology |
| [ISO 9241-210](https://www.iso.org/standard/77520.html) and [ISO 25065](https://www.iso.org/standard/72189.html) | 2019 and 2019 | UX-heavy products: human-centred design, user requirements specifications |
| [ISO 26262](https://committee.iso.org/standard/68390.html) and [Automotive SPICE](https://vda-qmc.de/en/automotive-spice/automotive-spice-veroeffentlichungen/) | 2018 (Ed. 2) and 4.1 (August 2026) | Automotive |
| DO-178C, recognised by [FAA AC 20-115D](https://www.faa.gov/regulations_policies/advisory_circulars/index.cfm/go/document.information/documentID/1032046) | 2011 | Avionics |
| [IEC 62304](https://webstore.iec.ch/en/publication/22794) and the FDA's [QMSR](https://www.fda.gov/medical-devices/postmarket-requirements-devices/quality-management-system-regulation-qmsr) | 2006 + Amd 1:2015; QMSR in force since 2 February 2026 | Medical devices |
| [OMG ReqIF](https://www.omg.org/spec/ReqIF) | 1.2 (2016) | Exchanging requirements between tools |
| [IEEE 830](https://doi.org/10.1109/IEEESTD.1998.88286) | 1998, superseded by 29148 | History only |

Not standards, but they pair well with the core set: [EARS](https://alistairmavin.com/ears/) sentence patterns and BDD's Given/When/Then acceptance scenarios (see Structuring requirements in the review).

Versions were checked on 24 October 2026 against official pages. ISO's site blocks automated checks, so ISO statuses also rest on national standards bodies' listings.
