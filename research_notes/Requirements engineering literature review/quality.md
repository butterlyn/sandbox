# Quality requirements and requirement quality

Notes for the "Quality requirements and requirement quality" section. Researched 23 Oct 2026.

**How links were checked.** Every `doi.org` link was checked against the Crossref API: title and year match. For the IEEE standards and Davis 1993, Crossref has no year field, so the year comes from the DOI string or the proceedings title. The following sites blocked automated fetches in this session: iso.org, incose.org, ansi.org, DTIC, ACM full texts and Springer chapter pages (HTTP 403 or a login redirect). Standards content was therefore checked against the official preview PDFs on the VDE Verlag IEC-standards site, which reproduce the standards' forewords and contents pages. **UNVERIFIED** marks any link or list I could not open or confirm. "★" marks the works I rank among the 10–15 most important (see Q7). AI/LLM tooling is out of scope and is not covered.

---

## Q1. How is the functional / non-functional (quality) / constraint distinction defined, and why is it contested?

### Takeaway
Everyone agrees "non-functional requirements" (NFRs) are critical, but there has never been an agreed definition. Glinz (2007), the standard analysis, shows that definitions disagree on three things: what an NFR is, how to sub-classify NFRs, and whether a requirement's kind depends on how it is written. He proposes a concern-based taxonomy: functional, performance, specific quality, and constraint. Empirical work (Eckhardt et al. 2016) finds that 75% of industrial "NFRs" actually describe system behaviour. The label is therefore often misleading, yet practice and standards keep some functional/quality split.

### Cited Findings
**Canonical works**
- ★ **Mylopoulos, J., Chung, L. & Nixon, B. (1992).** "Representing and using nonfunctional requirements: a process-oriented approach." *IEEE Transactions on Software Engineering* 18(6): 483–497. Proposes a framework of five components that represents NFRs "in terms of interrelated goals". These goals "can be refined through refinement methods and can be evaluated in order to determine the degree to which a set of nonfunctional requirements is supported by a particular design". It is demonstrated on accuracy and performance requirements for information systems. — [doi:10.1109/32.142871](https://doi.org/10.1109/32.142871)
- ★ **Chung, L., Nixon, B. A., Yu, E. & Mylopoulos, J. (2000).** *Non-Functional Requirements in Software Engineering.* Springer US. The book-length "NFR Framework" that grew out of the 1992 paper. OpenAlex counts 1,691 citations, the highest of any work in these notes. — [doi:10.1007/978-1-4615-5269-7](https://doi.org/10.1007/978-1-4615-5269-7); citation count from [OpenAlex](https://api.openalex.org/works/doi:10.1007/978-1-4615-5269-7)
- ★ **Glinz, M. (2007).** "On Non-Functional Requirements." *15th IEEE International Requirements Engineering Conference (RE 2007)*, pp. 21–26. Surveys the existing definitions, names the definition, classification and representation problems, and proposes a concern-based taxonomy. Content below was verified against the author's copy on the University of Zurich (UZH) site. — [doi:10.1109/RE.2007.45](https://doi.org/10.1109/RE.2007.45)
- ★ **Eckhardt, J., Vogelsang, A. & Méndez Fernández, D. (2016).** "Are 'non-functional' requirements really non-functional? An investigation of non-functional requirements in practice." *Proc. 38th ICSE*, pp. 832–842. Classifies 530 NFRs taken from 11 industrial specifications. — [doi:10.1145/2884781.2884788](https://doi.org/10.1145/2884781.2884788). Figures below come from the authors' preprint of the same paper, arXiv:1611.08868.
- **Broy, M. (2015).** "Rethinking Nonfunctional Software Requirements." *IEEE Computer* 48(5): 96–99. A short column. — [doi:10.1109/MC.2015.139](https://doi.org/10.1109/MC.2015.139)

**Specific findings**
- Glinz's framing: "Although the term 'non-functional requirement' has been in use for more than 20 years, there is still no consensus in the requirements engineering community what non-functional requirements are and how we should elicit, document, and validate them". At the same time there is "a unanimous consensus that non-functional requirements are important and can be critical for the success of a project." — [Glinz 2007](https://doi.org/10.1109/RE.2007.45)
- *Definition problem:* all the surveyed definitions build on "property or characteristic, attribute, quality, constraint, and performance". However, "there is no consensus about the concepts that these terms denote". Some authors count constraints as NFRs and some do not. IEEE 830-1998 treats "attributes" as specific qualities that exclude performance. — [Glinz 2007](https://doi.org/10.1109/RE.2007.45)
- *Classification problem:* sub-classifications diverge. Davis uses Boehm's quality tree. IEEE 830-1998 splits NFRs into external interface requirements, performance requirements, attributes and design constraints. — [Glinz 2007](https://doi.org/10.1109/RE.2007.45)
- *Representation problem*, Glinz's worked example:
  - "The system shall prevent any unauthorized access to the customer data" is an NFR under every definition.
  - "The probability for successful access to the customer data by an unauthorized person shall be smaller than 10^-5" is still an NFR.
  - "The database shall grant access to the customer data only to those users that have been authorized by their user name and password" is a functional requirement, "albeit it is still a security requirement".
  - Glinz's conclusion: "In a nutshell, the kind of a requirement depends on the way we represent it."
  - — [Glinz 2007](https://doi.org/10.1109/RE.2007.45)
- Documents usually separate functional from non-functional requirements. In IEEE 830-1998, "seven of the eight proposed SRS templates also separate the functional requirements completely from the non-functional ones". RUP-style use-case documentation instead attaches NFRs to use cases where it can. — [Glinz 2007](https://doi.org/10.1109/RE.2007.45)
- Glinz's earlier faceted classification (2005, reproduced in the 2007 paper) separates four facets:
  - kind;
  - representation;
  - satisfaction, hard vs soft ("functional requirements are not always hard and non-functional requirements not always soft");
  - role: prescriptive system requirements vs normative or assumptive domain requirements.

  He then concluded that "getting rid of the terms 'functional requirement' and 'non-functional requirement' is too radical". — [Glinz 2007](https://doi.org/10.1109/RE.2007.45)
- Representation determines verification (Glinz's Table 2):

  | Representation | Verification |
  |---|---|
  | Operational | review, test or formal verification |
  | Quantitative | measurement, at least on an ordinal scale |
  | Qualitative | "No direct verification"; at best subjective stakeholder judgement of the deployed system, prototypes, or indirect goal refinement or derived metrics |
  | Declarative | review |

  — [Glinz 2007](https://doi.org/10.1109/RE.2007.45)
- Glinz's concern-based definitions:
  - "A concern is a performance concern if its matter of interest is timing, speed, volume or throughput. A concern is a quality concern if its matter of interest is a quality of the kind enumerated in ISO/IEC 9126."
  - All system requirements fall into four groups: functional requirements, performance requirements, specific quality requirements and constraints.
  - "A constraint is a requirement that constrains the solution space beyond what is necessary for meeting the given functional, performance, and specific quality requirements."
  - "An attribute is a performance requirement or a specific quality requirement."
  - For those who want to keep the old term: "A non-functional requirement is an attribute of or a constraint on a system."
  - Project and process requirements are split off at the root.
  - — [Glinz 2007](https://doi.org/10.1109/RE.2007.45)
- Why performance gets its own category: "there is a broad consensus to measure performance in terms of time, volume, and volume per unit of time. For any other attribute, there are no such generally agreed measures". Eliciting the other qualities therefore "always implies finding an agreement among the stakeholders how to measure these qualities". Interface requirements are classified by the concern they address. The rule of thumb "what the system does → functional, how it behaves → non-functional" is "too coarse and leads to mis-classifications". — [Glinz 2007](https://doi.org/10.1109/RE.2007.45)
- Eckhardt et al. on practice: NFRs "are usually documented separately from functional requirements, without quantitative measures, and with relatively vague descriptions. As a result, they remain difficult to analyze and test." — [Eckhardt et al. 2016](https://doi.org/10.1145/2884781.2884788)
- Eckhardt et al.'s data: 11 specifications with 1,841 requirements in total, of which 346 (18.8%) were labelled NFRs. The domains were finance, automotive, travel management, railway, traffic management and facility management. After non-singular NFRs were split, 530 NFRs were classified. — [Eckhardt et al. 2016](https://doi.org/10.1145/2884781.2884788) (preprint, Table 1 and §3.3)
- Eckhardt et al.'s results:
  - "75% of the requirements labeled as 'non-functional' in the considered industrial specifications describe system behavior and only 25% describe the representation of the system."
  - This holds "for almost all NFR classes we analyzed; even for NFR classes which are sometimes called internal quality attributes (e.g., portability or maintainability)".
  - Two ISO 9126 classes, Functionality–Suitability and Functionality–Security, account for 221 NFRs (≈41.7%).
  - Conclusion: "most 'non-functional' requirements are misleadingly declared as such … many so-called NFRs can be handled similarly to functional requirements". The authors add that their aim is not to criticise the term itself.
  - — [Eckhardt et al. 2016](https://doi.org/10.1145/2884781.2884788) (preprint text)
- Broy argues that "Categorizing software requirements based on functional and architectural views in terms of logical and probabilistic behavior models could help mitigate weaknesses in the elicitation and structuring of requirements." — [Broy 2015](https://doi.org/10.1109/MC.2015.139)

### Inferences
- The most defensible working position for a specifier is Glinz's:
  - classify each requirement by the concern it addresses (behaviour, performance, specific quality or constraint);
  - keep project and process requirements separate;
  - read "NFR" only as shorthand for "attribute or constraint";
  - drop the "what vs how" rule.
- Eckhardt's data and Glinz's security example suggest that many quality requirements can be refined into behavioural, testable statements. Security, for example, becomes concrete access-control behaviour. Doing so also makes them verifiable. What remains, the true attributes such as maintainability, needs agreed measurement scales (see Q2).
- Most of the debate is about terminology and document structure, not about whether quality concerns matter. The practical risk of a separate "NFR" bucket is that it ends up vague, unquantified and detached from features and tests.
- Two schools coexist and complement each other. The NFR Framework treats quality requirements as goals that are refined and traded off during design. The "measure it" school (Gilb, Volere, ISO 25030; see Q2) demands a scale and a target for each one.

### Gaps
- The NFR Framework's well-known "softgoal" and "satisficing" vocabulary is not quoted here because I did not open Chung et al. (2000) in this session.
- Glinz's 2005 paper "Rethinking the notion of non-functional requirements" was seen only through its reproduction in Glinz 2007.
- I found no replication of Eckhardt et al. with a different or larger sample.

---

## Q2. Which quality models are used to structure quality requirements, and what changed recently?

### Takeaway
Quality requirements are usually structured with a quality model used as a checklist, and the de facto reference is the ISO/IEC SQuaRE family. In 2023–2024 ISO split the old ISO/IEC 25010:2011 into three documents:
- **25010:2023**, the product quality model. Safety is added, Usability becomes *Interaction capability* and Portability becomes *Flexibility*.
- **25019:2023**, the quality-in-use model.
- **25002:2024**, guidance on how to use the quality models.

Alongside these, **ISO/IEC 25030:2019** describes how to turn a quality model into quality requirements with measures and evaluation criteria. McCall (1977), Boehm (1976/78) and FURPS (Grady 1992) are historical ancestors. There is long-standing practitioner consensus on measurability: Volere "fit criteria" and Gilb's Planguage "scales of measure".

### Cited Findings
**Current ISO/IEC SQuaRE quality models**
- ★ **ISO/IEC 25010:2023**, *Systems and software engineering — SQuaRE — Product quality model*, 2nd edition, ISO/IEC JTC 1/SC 7. — [iso.org/standard/78176](https://www.iso.org/standard/78176.html). The URL and title were confirmed through the search index; a direct fetch returned 403.
  - "This second edition of ISO/IEC 25010, together with the first edition of ISO/IEC 25002 and the first edition of ISO/IEC 25019, cancels and replaces ISO/IEC 25010:2011". — [ISO/IEC 25010:2023 official preview (Foreword), VDE Verlag](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiec25010%7Bed2.0%7Den.pdf)
  - Main changes, quoted from the Foreword:
    - "This document revises the product quality model part of ISO/IEC 25010:2011. The other parts are moved to ISO/IEC 25002 on quality models overview and usage and ISO/IEC 25019 on quality-in-use model".
    - Characteristics are revised "for the purpose of better understanding and fitting the state of the art of ICT".
    - The target "has been extended to include various types of ICT product and information system".
    - "Safety has been added as a quality characteristic with subcharacteristics, i.e. operational constraint, risk identification, fail safe, hazard warning and safe integration".
    - "Usability and portability have been replaced with interaction capability and flexibility respectively".
    - "Inclusivity and self-descriptiveness, resistance, and scalability have been added as subcharacteristics of interaction capability, security, and flexibility respectively".
    - "User interface aesthetics and maturity have been replaced with user engagement and faultlessness respectively".
    - "Accessibility has been split into inclusivity and user assistance".

    — [VDE preview 25010:2023](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiec25010%7Bed2.0%7Den.pdf)
  - The 2023 edition includes annexes comparing it with the 2011 model (A), mapping it to dependability (B) and using it for measurement (C). — [VDE preview 25010:2023](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiec25010%7Bed2.0%7Den.pdf)
  - ISO's catalogue lists 25010:2023 with **nine** characteristics, published November 2023, and shows the 2011 edition as withdrawn. These details come from search-engine extracts of the iso.org pages, which I could not open directly. — [iso.org 25010:2023](https://www.iso.org/standard/78176.html); [iso.org 25010:2011](https://www.iso.org/standard/35733.html)
- ★ **ISO/IEC 25019:2023**, *SQuaRE — Quality-in-use model*, 1st edition. — [iso.org/standard/78177](https://www.iso.org/standard/78177.html) (URL and title confirmed through the search index; 403 on direct fetch)
  - Main changes from the quality-in-use part of 25010:2011: "stakeholders influenced by use of system or product are classified and explicated; aspects of interest for each stakeholder are integrated and shown as quality characteristics; context coverage which was shown as quality characteristics in the quality-in-use model of the previous version is removed." — [ISO/IEC 25019:2023 official preview, VDE Verlag](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiec25019%7Bed1.0%7Den.pdf)
  - The catalogue entry, as seen in search results, gives three quality-in-use characteristics, against five in 2011. — [iso.org 25019](https://www.iso.org/standard/78177.html)
- **ISO/IEC 25002:2024**, *SQuaRE — Quality model overview and usage*, 1st edition. — Link: [official preview, VDE Verlag](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiec25002%7Bed1.0%7Den.pdf) (iso.org page **UNVERIFIED**)
  - Its scope: "describes how SQuaRE quality models in the quality model division (ISO/IEC 2501n) can be used in conjunction with other SQuaRE standards to guide quality-related activities across the information system lifecycle".
  - It provides "the concept of a quality model; the structure and semantics of quality models; the relationship between quality models and the other concepts, including measurement, requirement definition, and evaluation; guidelines, requirements and examples for using quality models."
  - — [VDE preview 25002](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiec25002%7Bed1.0%7Den.pdf)
- ★ **ISO/IEC 25030:2019**, *SQuaRE — Quality requirements framework*, 2nd edition. — Link: [official preview, VDE Verlag](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiec25030%7Bed2.0%7Den.pdf) (iso.org page **UNVERIFIED**)
  - It replaces ISO/IEC 25030:2007. The main changes are:
    - "extension of the view from software to system";
    - "enhancement and deployment of quality requirements";
    - "clarification of quality requirements definition steps: stating them exhaustively by using the quality models; specifying them with the quality measures with criteria for evaluation";
    - "clarification of how to use quality requirements."

    — [VDE preview 25030](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiec25030%7Bed2.0%7Den.pdf)

**Classic models (historical lineage)**
- Miguel et al. group McCall (1977), Boehm (1978), FURPS (1992), Dromey (1995) and ISO 9126-1 (2001) as the "basic" models, as opposed to later component-tailored models. "The ISO 9126 model was based on the McCall and Boehm models" and was later updated as ISO 25010 (SQuaRE). — [Miguel, Mauricio & Rodríguez (2014), "A Review of Software Quality Models for the Evaluation of Software Products", *IJSEA* 5(6)](https://arxiv.org/abs/1412.2977)
- **McCall, J. A., Richards, P. K. & Walters, G. F. (1977).** *Factors in Software Quality*, Vols I–III, US Rome Air Development Center. — Link **UNVERIFIED**: DTIC blocked access and I opened no official copy.
  - Groups quality factors into three perspectives: product revision (maintainability, flexibility, testability), product operation (correctness, reliability, efficiency, integrity, usability) and product transition (portability, reusability, interoperability). The review I used labels the first perspective "Product Review".
  - Its main contribution was "to considerer relationships between quality characteristics and metrics" [sic].
  - — [Miguel et al. 2014](https://arxiv.org/abs/1412.2977)
- **Boehm, B. W., Brown, J. R. & Lipow, M.** "Quantitative evaluation of software quality". Miguel et al. cite it as a 1978 TRW Systems and Energy Group report. A 1976 ICSE paper of the same title is often cited, but I could not find it in Crossref, and ACM DL was blocked. — Link **UNVERIFIED**.
  - Its high-level factors are utility, maintainability and portability. — [Miguel et al. 2014](https://arxiv.org/abs/1412.2977)
  - Davis used "Boehm's quality tree" to sub-classify NFRs. — [Glinz 2007](https://doi.org/10.1109/RE.2007.45)
- **Grady, R. B. (1992).** *Practical Software Metrics for Project Management and Process Improvement.* Prentice Hall. — Link **UNVERIFIED**: no publisher page found.
  - FURPS comes from Hewlett-Packard. It separates Functionality from Usability, Reliability, Performance and Supportability, and is criticised for omitting characteristics such as portability. — [Miguel et al. 2014](https://arxiv.org/abs/1412.2977)

**Making quality requirements measurable**
- ★ **Volere / Robertson & Robertson:**
  - The principle: "To completely specify what is meant by the requirement, you must add a measurement against which it can be tested—that is, a fit criterion."
  - Worked example: "…shall be easy for 11-year-old children to use" becomes "Eighty percent of a test panel of 11-year-old children shall be able …".
  - Templated fit criteria: "An engineer shall produce a [specified result] within [specified time] of beginning to use the product, without needing to use the manual" and "[Agreed percentage] of a test panel shall successfully complete [specified task] …".
  - — [Volere Requirements Specification Template (official site)](https://www.volere.org/templates/volere-requirements-specification-template/)
  - The accompanying book: **Robertson, S. & Robertson, J. (2012).** *Mastering the Requirements Process: Getting Requirements Right*, 3rd ed., Addison-Wesley Professional, published 6 Aug 2012. — [InformIT](https://www.informit.com/store/mastering-the-requirements-process-getting-requirements-9780321815743)
- ★ **Gilb, T. (2005).** *Competitive Engineering: A Handbook for Systems Engineering, Requirements Engineering, and Software Engineering Using Planguage.* Elsevier, 1st ed., 15 July 2005.
  - Chapters include "Planguage Basics and Process Control", "Introduction to Requirements", "Functions", "Performance", "Scales of Measure", "Specification Quality Control" and "Impact Estimation".
  - Crossref credits the chapters to Gilb & L. Brodie.
  - — [Elsevier](https://shop.elsevier.com/books/competitive-engineering/gilb/978-0-7506-6507-0)

### Inferences
- **The nine 2023 characteristics.** The 2011 list is from my background knowledge and was not re-checked against the standard: functional suitability, performance efficiency, compatibility, usability, reliability, security, maintainability, portability. Applying the documented 2023 renames and the addition of Safety gives: **functional suitability, performance efficiency, compatibility, interaction capability, reliability, security, maintainability, flexibility, safety**. That makes nine, which matches ISO's catalogue description.
- **Practical consequences for a specifier:**
  - Cite 25010:2023, not 2011.
  - Product-level "usability" now sits under *interaction capability*, while effects in use belong to 25019.
  - Safety is now a first-class product characteristic.
  - Scalability is now named explicitly, under flexibility.
- **Convergence on what a quality requirement is.** ISO 25030:2019's steps (cover everything via the quality model, then specify with measures and evaluation criteria) are the standards-world counterpart of Volere fit criteria and Gilb's scales of measure. The shared position is: quality requirement = characteristic + measure or scale + target or acceptance criterion.
- **A quality model is a checklist for elicitation and coverage, not a template for wording.** Eckhardt et al. found many "functional suitability" and "security" items that are behaviour in disguise.

### Gaps
- I could not open iso.org pages to confirm status as of Oct 2026. In particular, I could not check whether 25030:2019 has been amended or is under revision.
- The full 25010:2023 subcharacteristic list and the names of the three 25019:2023 characteristics were not visible in the previews, so they are not stated here.
- Planguage keywords such as Scale, Meter, Must, Goal/Plan, Wish, Past, Record and Trend are widely described, but I opened no primary source for them. Gilb's open-access paper "What's Wrong with Requirements Specification?…" (*Journal of Software Engineering and Applications* 3(9): 827–838, 2010, [doi:10.4236/jsea.2010.39096](https://doi.org/10.4236/jsea.2010.39096), verified in Crossref) returned 403.
- The "+" categories of FURPS+ and the exact Boehm 1976/1978 publication details were not verified from primary sources.

---

## Q3. How are quality requirements handled in practice, and what goes wrong?

### Takeaway
Interview studies, case studies and systematic reviews converge on the same picture. Quality requirements (QRs) are seen as critical but handled unsystematically:
- they are often vague or unquantified;
- they are documented separately or not at all;
- they are decided late and traded off implicitly, often by architects;
- in agile settings they are squeezed by short iterations and functionality-first backlogs.

The evidence is mostly small, qualitative and from single countries. Olsson et al. (2022) found no replications and no studies of long-term cost.

### Cited Findings
**Central works**
- ★ **Berntsson Svensson, R., Gorschek, T., Regnell, B., Torkar, R., Shahrokni, A. & Feldt, R. (2012).** "Quality Requirements in Industrial Practice—An Extended Interview Study at Eleven Companies." *IEEE TSE* 38(4): 923–935. — [doi:10.1109/TSE.2011.47](https://doi.org/10.1109/TSE.2011.47)
  - Semistructured interviews with 11 product managers and 11 project leaders from 11 software companies about the "selection, tradeoff, and management of QR".
  - It compares business-to-business with business-to-consumer companies and product-management with project-management perceptions. It also examines interdependencies among the most important QRs and how QRs are handled downstream.
  - It extends the pilot study: **Berntsson Svensson, Gorschek & Regnell (2009)**, "Quality Requirements in Practice: An Interview Study in Requirements Engineering for Embedded Systems", *REFSQ 2009*, LNCS pp. 218–232 — [doi:10.1007/978-3-642-02050-6_19](https://doi.org/10.1007/978-3-642-02050-6_19)
- **Ameller, D., Ayala, C., Cabot, J. & Franch, X. (2012).** "How do software architects consider non-functional requirements: An exploratory study." *RE 2012*, pp. 41–50. Based on 13 interviews with software architects, it asks "who decides the NFRs, what types of NFRs matter to architects, how are NFRs documented, and how are NFRs validated". It is the first study of these questions from the architects' perspective. — [doi:10.1109/RE.2012.6345838](https://doi.org/10.1109/RE.2012.6345838)
- ★ **Olsson, T., Sentilles, S. & Papatheocharous, E. (2022).** "A systematic literature review of empirical research on quality requirements." *Requirements Engineering* 27(2): 249–271. — [doi:10.1007/s00766-022-00373-9](https://doi.org/10.1007/s00766-022-00373-9)
  - 530 papers screened, 84 included. The most common method is the case study (43), followed by surveys (15) and tests (13). "We found no replication studies."
  - The most-studied themes are "(1) differentiating characteristics of quality requirements compared to other types of requirements, (2) the importance and prevalence of quality requirements."
  - "Quality models, QUPER, and the NFR method are evaluated in several studies, with positive indications. Goal modeling is the only modeling approach evaluated. However, all studies are small scale and long-term costs and impact are not studied."
  - Empirical QR research "is not increasing at the same rate as software engineering research in general", and industry surveys "indicate unsystematic handling of quality requirements."
- **Olsson, T., Wnuk, K. & Gorschek, T. (2019).** "An empirical study on decision making for quality requirements." *JSS* 149: 217–233. "Quality requirements are important for product success yet often handled poorly. The problems with scope decision lead to delayed handling and an unbalanced scope." Only the opening of the abstract was retrieved. — [doi:10.1016/j.jss.2018.12.002](https://doi.org/10.1016/j.jss.2018.12.002)

**Quality requirements in agile development**
- ★ **Alsaqaf, W., Daneva, M. & Wieringa, R. (2019).** "Quality requirements challenges in the context of large-scale distributed agile: An empirical study." *Information and Software Technology* 110: 39–55. — [doi:10.1016/j.infsof.2019.01.009](https://doi.org/10.1016/j.infsof.2019.01.009); abstract via the [University of Twente portal](https://research.utwente.nl/en/publications/a8145293-ad5d-40fe-981b-bd592d771fd9)
  - "Engineering quality requirements in agile projects does not fit organically with agile methods."
  - 17 practitioners from large distributed agile teams in six organisations in the Netherlands.
  - **15 challenges in five categories:** team coordination and communication; quality assurance; QR elicitation; conceptual challenges; software architecture.
  - Also 13 mechanisms behind the challenges and 9 practices that could mitigate them.
- ★ **Behutiye, W., Karhapää, P., López, L., Burgués, X., Martínez-Fernández, S., Vollmer, A. M., Rodríguez, P., Franch, X. & Oivo, M. (2020).** "Management of quality requirements in agile and rapid software development: A systematic mapping study." *Information and Software Technology* 123: 106225. — [doi:10.1016/j.infsof.2019.106225](https://doi.org/10.1016/j.infsof.2019.106225)
  - "In ASD [agile software development], QRs are often ill-defined and not well addressed due to the focus on quickly delivering functionality". Rapid approaches such as continuous delivery and deployment "are more prone to neglect QRs".
  - 156 primary studies: 106 empirical, 16 experience reports, 34 theoretical. Security and performance are the most reported QR types.
  - Strategies found: 74 practices, 43 methods, 13 models, 12 frameworks, 11 advices, 10 tools and 7 guidelines.
  - 18 challenge categories plus 4 non-recurring challenges. The top ones: "limited ability of ASD to handle QRs, time constraints due to short iteration cycles, limitations regarding the testing of QRs and neglect of QRs".
- **Karhapää, P., Behutiye, W., Rodríguez, P., Oivo, M., Costal, D., Franch, X., Aaramaa, S., Choraś, M., Partanen, J. & Abherve, A. (2021).** "Strategies to manage quality requirements in agile software development: a multiple case study." *Empirical Software Engineering* 26(2). 36 interviews at four companies found proactive, reactive and interactive QR strategies, 40 challenges in six categories, and nine contextual elements that explain practice choices and challenges. — [doi:10.1007/s10664-020-09903-x](https://doi.org/10.1007/s10664-020-09903-x)
- **Behutiye, W., Rodríguez, P., Oivo, M., Aaramaa, S., Partanen, J. & Abhervé, A. (2022).** "Towards optimal quality requirement documentation in agile software development: A multiple case study." *JSS* 183: 111112. — [doi:10.1016/j.jss.2021.111112](https://doi.org/10.1016/j.jss.2021.111112)
  - 12 participants from three cases.
  - Practitioners see QR documentation as important for ensuring quality, clarifying QRs and decision-making.
  - Time constraints, QR awareness and communication gaps affect documentation. "Missing and outdated QR documentation may lead to technical debt and a lack of common understanding regarding QRs."
  - Precursor paper: Behutiye et al. (2020), "How agile software development practitioners perceive the need for documenting quality requirements: a multiple case study", *SEAA 2020*, pp. 93–100 — [doi:10.1109/SEAA51224.2020.00025](https://doi.org/10.1109/SEAA51224.2020.00025)

### Inferences
- **Recurring failure modes across the studies:**
  - QRs stay vague or unquantified (Eckhardt, Olsson);
  - they are separated from the features and tests they constrain;
  - decisions are late or implicit and tend to land with architects (Ameller's research questions, Olsson 2019's "delayed handling");
  - agile backlogs are biased towards functionality, QRs are hard to test within an iteration, and QR documentation decays into technical debt (Alsaqaf, Behutiye, Karhapää).
- **Mitigations that follow from these findings**, as inference rather than tested remedies:
  - make QRs explicit, visible artefacts with owners;
  - give each a measure or fit criterion;
  - attach it to the features, acceptance criteria or definition of done it constrains;
  - involve architects early;
  - revisit QR scope decisions every release.
- **Strength of evidence.** These are mostly small, qualitative studies from northern and western Europe (Sweden, Netherlands, Finland, Spain). They are good at identifying problems and weak at evaluating remedies (Olsson et al. 2022).

### Gaps
- I verified only the abstracts of Ameller et al. 2012 and Berntsson Svensson et al. 2012. Their full texts (on HAL, UPC and DiVA) blocked automated download, so detailed findings are not reported, such as who decides NFRs or how often QRs are quantified.
- QUPER (quality-requirements roadmapping by Regnell et al.) appears in Olsson et al. but was not opened.
- I opened no industry-wide prevalence figure for QR problems. The NaPiRE survey family covers RE problems in general (228 companies in 10 countries, 21 problems analysed), but I did not open its QR-specific results. — [Méndez Fernández et al. 2017, *EMSE* 22(5): 2298–2338](https://doi.org/10.1007/s10664-016-9451-7)

---

## Q4. What are the accepted characteristics of a good requirement and a good requirement set?

### Takeaway
The criteria descend through a stable line of documents:
1. IEEE 830-1998, "qualities of a good SRS";
2. ISO/IEC/IEEE 29148:2011;
3. **ISO/IEC/IEEE 29148:2018**, which separates *characteristics of individual requirements* (clause 5.2.5) from *characteristics of a set of requirements* (5.2.6), and adds *requirement language criteria* (5.2.7).

**INCOSE's Guide to Writing Requirements**, version 4 (June 2023), turns these into practice with 15 characteristics and 42 writing rules. Davis et al. (1993) is the classic attempt to define and measure SRS quality attributes. The consensus core is:
- each requirement is necessary, unambiguous, complete, singular, feasible, verifiable and correct, and conforms to an agreed form;
- the set is complete, consistent and feasible, and understandable and validatable as a whole;
- IEEE 830 adds ranking, modifiability and traceability.

### Cited Findings
- ★ **IEEE Std 830-1998**, *IEEE Recommended Practice for Software Requirements Specifications*, IEEE. "The content and qualities of a good software requirements specification (SRS) are described and several sample SRS outlines are presented". Its status record reads "Replaced by ISO/IEC/IEEE 29148:2011". — [doi:10.1109/IEEESTD.1998.88286](https://doi.org/10.1109/IEEESTD.1998.88286); abstract and status via [OpenAlex](https://api.openalex.org/works/doi:10.1109/IEEESTD.1998.88286)
  - The research brief lists its characteristics of a good SRS as: correct, unambiguous, complete, consistent, ranked for importance and/or stability, verifiable, modifiable, traceable. **UNVERIFIED in this session:** I could not open a copy of the standard to re-check the list or its wording.
  - The standard splits NFRs into external interface requirements, performance requirements, attributes and design constraints, and seven of its eight SRS templates separate functional from non-functional requirements. — [Glinz 2007](https://doi.org/10.1109/RE.2007.45)
- ★ **ISO/IEC/IEEE 29148:2018**, *Systems and software engineering — Life cycle processes — Requirements engineering*, 2nd edition. It "defines the construct of a good requirement, provides attributes and characteristics of requirements, and discusses the iterative and recursive application of requirements processes throughout the life cycle". It can be used with ISO/IEC/IEEE 12207 or 15288, or on its own. — [doi:10.1109/IEEESTD.2018.8559686](https://doi.org/10.1109/IEEESTD.2018.8559686)
  - It "cancels and replaces the first edition (ISO/IEC/IEEE 29148:2011), which has been technically revised". The revision responded to the revisions of 15288 and 12207 "to accomplish the harmonization of the structures and contents". — [29148:2018 official preview (Foreword), VDE Verlag](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiecieee29148%7Bed2.0%7Den.pdf)
  - Its table of contents includes 5.2.4 "Requirements construct", 5.2.5 "Characteristics of individual requirements", 5.2.6 "Characteristics of a set of requirements" and 5.2.7 "Requirement language criteria". — [VDE preview 29148](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiecieee29148%7Bed2.0%7Den.pdf)
  - **UNVERIFIED** against the standard text (clause 5.2.5–5.2.6 is not in the preview): the lists commonly reported for 2018 are
    - individual requirements: necessary, appropriate, unambiguous, complete, singular, feasible, verifiable, correct, conforming;
    - sets: complete, consistent, feasible, comprehensible, able to be validated.

    Secondary summaries found by search give nine individual and five set characteristics, which is consistent with these lists.
- ★ **INCOSE Requirements Working Group, *Guide to Writing Requirements* (GtWR), Version 4 (INCOSE-TP-2010-006-04), June 2023.** — Link: [INCOSE GtWR v4 summary sheet](https://www.incose.org/docs/default-source/working-groups/requirements-wg/guidetowritingrequirements/incose_rwg_gtwr_v4_summary_sheet.pdf) (**UNVERIFIED**: found in the search index, returned 403 on fetch)
  - Version 4 "defines 42 rules and 15 quality characteristics".
    - C1–C9 apply to individual needs and requirements: C1 Necessary, C2 Appropriate, C3 Unambiguous, C4 Complete, C5 Singular, C6 Feasible, C7 Verifiable.
    - C10–C15 apply to sets: C10 Complete, C11 (described as covering no conflicts or overlaps and consistent units), C12 Feasible, and C15 Correct, which version 4 added.
    - Rules are grouped under focus areas "such as accuracy, non-ambiguity, singularity, and uniformity of language", and a matrix maps each rule to the characteristics it supports.
    - — [Jama Software guide (vendor, secondary)](https://www.jamasoftware.com/requirements-management-guide/writing-requirements/incose-requirements-writing-guide/)
  - Current INCOSE companion documents: Needs and Requirements Manual (NRM) v1.1 (2022), Guide to Needs and Requirements (GtNR) v1 (2022), and GtWR v4 (2023). — [SEBoK, "System Requirements Definition"](https://sebokwiki.org/wiki/System_Requirements_Definition)
- **Davis, A., Overmyer, S., Jordan, K., Caruso, J., Dandashi, F., Dinh, A., Kincaid, G., Ledeboer, G., Reynolds, P., Sitaram, P., Ta, A. & Theofanos, M. (1993).** "Identifying and measuring quality in a software requirements specification." *Proc. First International Software Metrics Symposium*, pp. 141–152.
  - The paper observes that existing SRS quality definitions are "vaguely defined". It "explores thoroughly the concept of quality in an SRS and defines attributes that contribute to that quality. Techniques for measuring these attributes are suggested."
  - OpenAlex counts 229 citations; it remains a classic but is now overshadowed by 29148 and the INCOSE guide.
  - — [doi:10.1109/METRIC.1993.263792](https://doi.org/10.1109/METRIC.1993.263792)
- The research view of these attributes: across 105 empirical studies there are 12 requirements-quality attributes, and "the most prominent in the field are ambiguity, completeness, consistency, and correctness." — [Montgomery et al. 2022](https://doi.org/10.1007/s00766-021-00367-z)
- Structured writing rules also exist. **Mavin, A., Wilkinson, P., Harwood, A. & Novak, M. (2009)**, "Easy Approach to Requirements Syntax (EARS)", *RE 2009*, pp. 317–322:
  - "A small set of structural rules was developed to address eight common requirement problems including ambiguity, complexity and vagueness. The ruleset allows all natural language requirements to be expressed in one of five simple templates."
  - Applying it to aero-engine control requirements produced "qualitative and quantitative improvements".
  - — [doi:10.1109/RE.2009.9](https://doi.org/10.1109/RE.2009.9)

### Inferences
- **Two levels of checking.** The individual-vs-set distinction is the most useful practical point. Singularity, verifiability, feasibility and unambiguity are checked statement by statement. Completeness and consistency are mostly properties of the whole set and need set-level review (coverage against a quality model, conflict analysis, traceability).
- **Convergence of the lists.** The INCOSE v4 names C1–C7, as opened, match the commonly reported 29148:2018 individual list. Both documents were developed in the same community. Exact wording of 29148 remains unverified here.
- **Lists are consensus, not evidence.** All these lists are normative expert consensus, not derived from measured impact. This is exactly the criticism in Q6.
- **Probable shift of three IEEE 830 items** (not verified): ranking for importance/stability, modifiability and traceability seem to have moved in later standards from characteristics of the SRS to requirement attributes or information items.

### Gaps
- I could not open IEEE 830-1998 section 4.3 or ISO/IEC/IEEE 29148:2018 clauses 5.2.5–5.2.7. Both are paywalled, and the unofficial copies I tried failed TLS or were unreachable.
- I could not confirm whether a newer 29148 edition has been published or is in progress as of Oct 2026, because iso.org was blocked.
- The number of quality attributes in Davis et al. (often quoted as 24) was not verified.
- The names of INCOSE C8, C9, C11, C13 and C14 were not visible in any source I opened.

---

## Q5. What does research say about ambiguity and defects in natural-language requirements?

### Takeaway
Natural-language (NL) requirements are the norm, and ambiguity is the classic worry.
- **The linguistic view.** Berry, Kamsties & Krieger's handbook (2003) catalogues lexical, syntactic, semantic and pragmatic ambiguity, vagueness and language errors. It warns about "unconscious disambiguation": readers take the first meaning that comes to mind.
- **Tools.** A line of tools flags indicator words and patterns cheaply but imprecisely: NASA's ARM (1997), then QuARS (2001), then Requirements Smells and the Smella tool (2014–2017). Smella averages 59% precision at 82% recall.
- **Doubts about impact.** De Bruijn & Dekkers (2010) traced only one of the failures they examined to ambiguity. Philippo et al. (2013) titled their results "not as important as expected". Frattini et al.'s controlled experiment shows effects vary sharply by defect type: ambiguous pronouns are harmful, passive voice is minor.

### Cited Findings
- ★ **Berry, D. M., Kamsties, E. & Krieger, M. M. (2003).** *From Contract Drafting to Software Specification: Linguistic Sources of Ambiguity — A Handbook*, Version 1.0, November 2003, University of Waterloo. — [PDF (author site)](https://cs.uwaterloo.ca/~dberry/handbook/ambiguityHandbook.pdf)
  - "Unintended ambiguity is the Achille's [sic] heel of SRSs and contracts, leading to diverging expectations in both cases and inadequate or undesirably diverging implementations in the former."
  - It defines "unrecognized or unconscious disambiguation" as the process by which a reader, oblivious to other meanings, "understands the first meaning that comes to mind and takes it as the only meaning of the text."
  - Its taxonomy:
    - lexical ambiguity ("when a word has several meanings");
    - syntactic or structural ambiguity ("when a sentence has more than one parse");
    - semantic ambiguity;
    - pragmatic ambiguity ("several meanings in the context in which it is uttered");
    - vagueness and generality;
    - language-error ambiguity.
  - It records the dissenting view of Goguen, Mullery and Gause, who "argue that ambiguity is acceptable for a while, as are inconsistencies".
- ★ **Wilson, W. M., Rosenberg, L. H. & Hyatt, L. E. (1997).** "Automated analysis of requirement specifications." *Proc. 19th ICSE*, pp. 161–171. Describes NASA Goddard's Software Assurance Technology Center's Automated Requirement Measurement (ARM) tool. — [doi:10.1145/253228.253258](https://doi.org/10.1145/253228.253258)
  - The details below come from Wilson's companion SATC paper, "Writing Effective Requirements Specifications" (Software Technology Conference, April 1997). — [KTH-hosted copy](https://www.csc.kth.se/utbildning/kth/kurser/DD1363/NASARequirements.html)
  - Statement-level indicators: imperatives ("shall", "must"), continuances ("as follows", "listed"), directives (figures, tables, notes), options ("can", "may", "optionally"), and weak phrases.
  - Example weak phrases: "adequate", "as a minimum", "as applicable", "easy", "as appropriate", "be able to", "be capable", "but not limited to", "effective", "if practical", "normal", "provide for", "timely", "tbd".
  - Document-level indicators: size, text structure, specification depth, and readability (Flesch and similar statistics).
  - ARM was applied to more than 50 NASA requirements specifications. Poor ones showed ad hoc or misapplied standards, project description mixed with requirements, uneven detail, inconsistent identification schemes, wordiness, and "lengthy, compound, and imprecisely worded individual statements".
  - ARM was later reverse-engineered: **Carlson, N. & Laplante, P. (2014)**, "The NASA automated requirements measurement tool: a reconstruction", *Innovations in Systems and Software Engineering* 10(2): 77–91 — [doi:10.1007/s11334-013-0225-8](https://doi.org/10.1007/s11334-013-0225-8). I did not open its content.
  - The cost-escalation folklore of the time, from a NASA abstract: "Problems that are not found until testing are approximately 14 times more costly to fix than if the problem was found in the requirement phase". The abstract gives no data for this. — [Rosenberg & Hammer (1999), NASA NTRS](https://ntrs.nasa.gov/citations/19990079772)
- **Fabbrini, F., Fusani, M., Gnesi, S. & Lami, G. (2001).** "The linguistic approach to the natural language requirements quality: benefit of the use of an automatic tool." *Proc. 26th Annual NASA Goddard Software Engineering Workshop*, pp. 97–105. A method based on "a quality model addressing a relevant part of the interpretation problems that can be approached at linguistic level". It is supported by the tool QuARS (Quality Analyzer of Requirement Specification) and validated on "several industrial software NL requirement documents". — [doi:10.1109/SEW.2001.992662](https://doi.org/10.1109/SEW.2001.992662)
- ★ **Femmer, H., Méndez Fernández, D., Wagner, S. & Eder, S. (2017).** "Rapid quality assurance with Requirements Smells." *JSS* 123: 190–213. — [doi:10.1016/j.jss.2016.02.047](https://doi.org/10.1016/j.jss.2016.02.047); abstract via Semantic Scholar
  - It transfers code smells to requirements as "Requirements Smells", detected by the prototype tool Smella, and evaluates them in three industrial contexts and one university context.
  - Results: "average precision of 59% at an average recall of 82% with high variation". Benefits include "an increase of the awareness of quality defects". However, "some smells were not clearly distinguishable".
  - The authors position smell detection "as a supplement to reviews".
  - First version: Femmer et al. (2014), "Rapid requirements checks with requirements smells: two case studies", *RCoSE '14*, pp. 10–19 — [doi:10.1145/2593812.2593817](https://doi.org/10.1145/2593812.2593817)
- ISO/IEC/IEEE 29148:2018 contains a dedicated clause 5.2.7, "Requirement language criteria". — [VDE preview 29148](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiecieee29148%7Bed2.0%7Den.pdf)
- Ambiguity dominates research attention: of 111 quality-attribute sub-types found in the literature, "Ambiguity has the largest share". — [Montgomery et al. 2022](https://doi.org/10.1007/s00766-021-00367-z)

**Evidence that tempers the alarm**
- ★ **de Bruijn, F. & Dekkers, H. L. (2010).** "Ambiguity in Natural Language Software Requirements: A Case Study." *REFSQ 2010*, LNCS pp. 233–247. — [doi:10.1007/978-3-642-14192-8_21](https://doi.org/10.1007/978-3-642-14192-8_21); abstract via [UvA DARE](https://dare.uva.nl/id/6fbc2cc4-1ce5-4661-a0e2-21c10df8b1fa)
  - The case was a highly ambiguous requirements document for a complex data-processing system of about 21 man-years.
  - Ambiguity was measured with three independent tests, followed by a root-cause analysis.
  - "Only one of the examined failures was caused by ambiguous requirements." The teams coped, although the development team invested substantially in clarifying requirements.
- **Philippo, E. J., Heijstek, W., Kruiswijk, B., Chaudron, M. R. V. & Berry, D. M. (2013).** "Requirement Ambiguity Not as Important as Expected — Results of an Empirical Evaluation." *REFSQ 2013*, LNCS pp. 65–79. Only the title-level claim is available; the abstract was not retrievable. — [doi:10.1007/978-3-642-37422-7_5](https://doi.org/10.1007/978-3-642-37422-7_5)
- ★ **Frattini, J., Fucci, D., Torkar, R., Montgomery, L., Unterkalmsteiner, M., Fischbach, J. & Mendez, D. (2024, online).** "Applying Bayesian data analysis for causal inference about requirements quality: a controlled experiment." *Empirical Software Engineering* 30(1). — [doi:10.1007/s10664-024-10582-1](https://doi.org/10.1007/s10664-024-10582-1); abstract from arXiv:2401.01154
  - 25 participants from industry and academia built domain models from four NL requirements containing different defects.
  - "The use of passive voice only has a minor impact." In contrast, "ambiguous pronouns … shows a strong effect", leading "to incorrect associations in domain models".
  - "Despite being equally advised against by literature …, the two investigated quality defects have vastly different impacts on software engineering activities."

### Inferences
- **Use automated checks as triage.** Indicator-word and smell detectors are cheap first-pass checks: weak phrases, vague adjectives and adverbs, unresolved "tbd", options, ambiguous pronouns, compound statements. Expect many false positives, and keep human review as the primary defence.
- **Prioritise defects by impact.** Current evidence suggests prioritising by downstream effect rather than treating every style rule as equal. Referential ambiguity (pronouns) and missing information matter more than stylistic rules such as passive voice.
- **The two views are measuring different things.** The linguistic view (Berry) says unrecognised ambiguity is dangerous precisely because nobody notices it. The case studies count visible failures, which may undercount silent misinterpretations and the cost of clarification work that de Bruijn & Dekkers did observe. Both positions can be true. The live question is how much ambiguity costs and in which contexts.

### Gaps
- Philippo et al. (2013): design, sample and numbers were not retrievable (Springer was blocked and the Leiden repository page had no abstract).
- The original ARM ICSE paper text could not be opened (ACM returned 403), so ARM details rely on Wilson's companion conference paper.
- QuARS precision and recall figures were not found in an opened source.

---

## Q6. What is the recent rethinking of requirements quality, and what evidence links requirements quality to project outcomes?

### Takeaway
Since about 2015, a group of researchers (Femmer, Vogelsang, Méndez, Frattini, Montgomery, Fucci, Unterkalmsteiner) has argued that requirements quality is not a property of the text judged against normative rules. They call it **"quality in use"**: a requirement is good to the extent that it supports the activities that use it, such as implementation, testing, estimation and domain modelling.
- **Mapping studies** show the field is dominated by improvement techniques and normative rules, with little evidence of impact (Montgomery et al. 2022).
- **Frattini et al. (2023)** propose a harmonised theory that links quality factors to properties of the affected activities, together with a research roadmap. Controlled experiments now test those effects causally.
- **Direct evidence** that requirements quality drives project outcomes remains thin. A rare example: Kamata & Tamai (2007) studied 32 projects in one company.

### Cited Findings
- ★ **Femmer, H. & Vogelsang, A. (2019).** "Requirements Quality Is Quality in Use." *IEEE Software* 36(3): 83–91. — [doi:10.1109/MS.2018.110161823](https://doi.org/10.1109/MS.2018.110161823)
  - "Creating a requirements engineering artifact is rarely an end in itself; it is a means to understand and reach the project's goals. So such an artifact's purpose is to support the stakeholders in whatever activities they're performing in the project."
  - Frattini et al. describe it as the authors' "call for action" for the activity-based view. They cite it as 2018, its online-first date. — [Frattini et al. 2023](https://doi.org/10.1007/s00766-023-00405-y)
- **Femmer, H., Mund, J. & Méndez Fernández, D. (2015).** "It's the Activities, Stupid! A New Perspective on RE Quality." *2nd International Workshop on Requirements Engineering and Testing (RET 2015)*, pp. 13–19. — [doi:10.1109/RET.2015.11](https://doi.org/10.1109/RET.2015.11)
  - Introduces the activity-based RE quality model (ABRE-QM). Frattini et al. summarise it as showing "that the quality of requirements depends on the impact they have on the activities in which they are used".
  - A systematic look at activities revealed that the same factor can have both positive and negative impacts. For example, being "free of UI design details" helps maintainability because UI details are volatile.
  - ABRE-QM "saw little adoption in research". — [Frattini et al. 2023](https://doi.org/10.1007/s00766-023-00405-y)
- ★ **Montgomery, L., Fucci, D., Bouraffa, A., Scholz, L. & Maalej, W. (2022).** "Empirical research on requirements quality: a systematic mapping study." *Requirements Engineering* 27(2): 183–209. — [doi:10.1007/s00766-021-00367-z](https://doi.org/10.1007/s00766-021-00367-z)
  - 6,905 articles from six databases were filtered to 105 primary studies.
  - Research focuses on improvement techniques, "with very few primary studies addressing evidence-based definitions and evaluations of quality attributes".
  - It identifies 12 quality attributes, led by ambiguity, completeness, consistency and correctness, and 111 sub-types (e.g., "template conformance" for consistency, "passive voice" for ambiguity).
  - Most studies treat "requirements" generically, with little research on use cases or user stories.
- ★ **Frattini, J., Montgomery, L., Fischbach, J., Mendez, D., Fucci, D. & Unterkalmsteiner, M. (2023).** "Requirements quality research: a harmonized theory, evaluation, and roadmap." *Requirements Engineering* 28(4): 507–520. — [doi:10.1007/s00766-023-00405-y](https://doi.org/10.1007/s00766-023-00405-y); full text via arXiv:2309.10355
  - It contributes "(1) a harmonized requirements quality theory organizing its core concepts, (2) an evaluation of the current state of requirements quality research, and (3) a research roadmap".
  - Its diagnosis: research "focuses on normative rules and mostly fails to connect requirements quality to its impact on subsequent software development activities, impeding the relevance of the research."
  - The theory's concepts, which evolve ABRE-QM:

    | Concept | Meaning |
    |---|---|
    | entity | a requirements artifact or part thereof |
    | quality factor | "[a] normative metric which maps a textual requirement of a specific granularity" to a number |
    | agent | "any person, group of people, or automatism involved in an activity" |
    | activity | the activity in which the entity is used ("requirements-affected activities") |
    | attribute | "a measurable property of an activity" |
    | impact | the effect of an entity-fact on an activity-fact |
    | context factor, cost, resource | supporting concepts |

  - Evaluation of a sample of 57 requirements-quality publications:
    - 17 of 57 (29.8%) report no impact on activities at all;
    - agents are reported in 14 (24.6%);
    - when activities are reported, they are mostly chosen ad hoc (37 of 40, 92%);
    - attributes are rarely reported (8 of 57, 14%);
    - evidence for impact, where given, is "dominantly hypothesized (19/40 = 47.5%) and rarely either inductive (11/40 = 27.5%) or referenced (10/40 = 25%)";
    - cost and resources are rarely reported (15.8% and 8.8%) and never determined empirically.
  - It quotes Yang et al.: "[a]mbiguity is therefore not a property just of a text, but a conjoint property of the text and of the interpretations held by a group of readers of that text".
- **Frattini, J. et al. (2024).** "Measuring the Fitness-for-Purpose of Requirements: An initial Model of Activities and Attributes." Preprint; venue not verified.
  - "The quality of requirements artifacts and processes is determined by how fit for this purpose they are, i.e., how they impact activities affected by them."
  - It presents an initial model of 24 activities and 16 attributes.
  - — [arXiv:2405.09895](https://arxiv.org/abs/2405.09895)
- ★ **Kamata, M. I. & Tamai, T. (2007).** "How Does Requirements Quality Relate to Project Success or Failure?" *RE 2007*, pp. 69–78. — [doi:10.1109/RE.2007.31](https://doi.org/10.1109/RE.2007.31)
  - The data: 32 projects started and completed in 2003–2005 in a large business-application division of a Tokyo company. Quality-assurance teams scored each SRS against the IEEE 830-1998 SRS structure, and the scores were related to cost and time overruns.
  - Findings:
    - "a relatively small set of SRS items have strong impact on project success or failure";
    - SRSs in normal projects are balanced;
    - Section 1 (purpose, overview, general context) is "rich in normal projects and poor in overrun projects";
    - a poor Section 1 combined with rich function and product-perspective sections tends towards cost overrun.
- **Where the evidence stands:**
  - The standard claim: "Research has repeatedly shown that high-quality requirements are essential for the success of development projects" — [Montgomery et al. 2022](https://doi.org/10.1007/s00766-021-00367-z).
  - The counterpoint: "we still lack empirical evidence to support organizations in deciding whether their requirements are good enough or impede subsequent activities" — [Frattini et al. 2024/25](https://doi.org/10.1007/s10664-024-10582-1).

### Inferences
- **A practical test for a specifier.** Judge a requirement by asking who will use it and for what (implementing, testing, estimating, modelling, certifying), and whether it lets them do that well. Use normative rules (Q4, Q5) as heuristics, prioritised for the activities that matter in your context. For example, testers need verifiability, and modellers need clear references.
- **The reframing borrows ISO's own split.** The "quality in use" title mirrors the ISO product-quality vs quality-in-use split (25010 vs 25019). Requirements are treated as a product whose quality shows in use.
- **The causal link is mostly assumed.** The often-cited link from good requirements to project success rests largely on single-company correlational data (Kamata & Tamai), cost-escalation folklore (Q5) and practitioner surveys. Causal evidence is only beginning, with small controlled experiments.

### Gaps
- I could not open the full text of Femmer & Vogelsang (2019). The TU Berlin repository copy did not expose a PDF to automated download, so the description relies on the abstract and on Frattini et al.
- I found no large multi-company or longitudinal study linking requirements quality to project outcomes in this session.

---

## Q7. Synthesis: which 10–15 works matter most, what is the consensus, and where do experts disagree?

### Takeaway
A newcomer can cover this subtopic with about 15 items in four clusters:
1. **Definitions:** Mylopoulos et al., Chung et al., Glinz, Eckhardt et al.
2. **Quality models and measurability:** ISO/IEC 25010/25019/25002 and 25030, Volere, Gilb.
3. **Practice:** Berntsson Svensson et al., Olsson et al., Behutiye et al., Alsaqaf et al.
4. **Requirement quality:** IEEE 830 → 29148, INCOSE GtWR, Berry et al., Femmer's smells, and the quality-in-use rethinking (Femmer & Vogelsang, Montgomery et al., Frattini et al.).

The consensus is practical: make quality requirements explicit, measurable or behavioural, and checkable against agreed characteristics. The live debates are about terminology, how much ambiguity and rule violations really matter, and the thin evidence base.

### Cited Findings
**The 15 most important works or items, in reading order.** Citation counts are from OpenAlex, retrieved 23 Oct 2026; links are in Q1–Q6.
1. **Mylopoulos, Chung & Nixon (1992), *IEEE TSE*.** Origin of treating NFRs as goals that are refined and evaluated against designs. 1,019 citations — [OpenAlex](https://api.openalex.org/works/doi:10.1109/32.142871)
2. **Chung, Nixon, Yu & Mylopoulos (2000), Springer.** The NFR Framework book and the most-cited work here, with 1,691 citations — [OpenAlex](https://api.openalex.org/works/doi:10.1007/978-1-4615-5269-7)
3. **Glinz (2007), *RE'07*.** The reference analysis of what "NFR" means; proposes a concern-based taxonomy and the definition "attribute or constraint". 726 citations — [OpenAlex](https://api.openalex.org/works/doi:10.1109/RE.2007.45)
4. **Eckhardt, Vogelsang & Méndez Fernández (2016), *ICSE*.** Empirical evidence that 75% of labelled NFRs describe behaviour. — [doi](https://doi.org/10.1145/2884781.2884788)
5. **ISO/IEC 25010:2023, with 25019:2023 and 25002:2024.** The current quality-model family; Safety added, Interaction capability and Flexibility introduced, quality in use split off. — [iso.org](https://www.iso.org/standard/78176.html)
6. **ISO/IEC 25030:2019.** How to derive quality requirements from quality models, using measures and evaluation criteria. — [VDE preview](https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiec25030%7Bed2.0%7Den.pdf)
7. **Volere fit criteria (Robertson & Robertson, 3rd ed. 2012) and Gilb's Planguage (2005).** The practitioner canon for making quality requirements testable and quantified. — [Volere](https://www.volere.org/templates/volere-requirements-specification-template/)
8. **Berntsson Svensson et al. (2012), *IEEE TSE*.** Quality requirements in industrial practice across 11 companies. — [doi](https://doi.org/10.1109/TSE.2011.47)
9. **Olsson, Sentilles & Papatheocharous (2022), *REJ*.** The best entry point to the empirical evidence on quality requirements (84 studies; no replications). — [doi](https://doi.org/10.1007/s00766-022-00373-9)
10. **Behutiye et al. (2020), *IST*,** with **Alsaqaf et al. (2019), *IST*.** Quality requirements in agile and rapid development: 156 studies, and 15 challenges in large-scale distributed agile. — [doi](https://doi.org/10.1016/j.infsof.2019.106225)
11. **IEEE 830-1998 → ISO/IEC/IEEE 29148:2018.** The normative characteristics of good requirements and sets; IEEE 830 has been replaced. — [doi](https://doi.org/10.1109/IEEESTD.2018.8559686)
12. **INCOSE Guide to Writing Requirements v4 (June 2023).** The practical rulebook: 15 characteristics, 42 rules. — [Jama summary (secondary)](https://www.jamasoftware.com/requirements-management-guide/writing-requirements/incose-requirements-writing-guide/)
13. **Berry, Kamsties & Krieger (2003).** The ambiguity handbook. — [PDF](https://cs.uwaterloo.ca/~dberry/handbook/ambiguityHandbook.pdf)
14. **Femmer et al. (2017), *JSS*.** Requirements smells, extending the ARM (1997) and QuARS (2001) line; 59% precision, 82% recall. 177 citations — [OpenAlex](https://api.openalex.org/works/doi:10.1016/j.jss.2016.02.047)
15. **Femmer & Vogelsang (2019), *IEEE Software*, with Montgomery et al. (2022) and Frattini et al. (2023), *REJ*.** The quality-in-use rethinking and the evidence gap. — [doi](https://doi.org/10.1007/s00766-023-00405-y)

Supporting empirical anchors: Kamata & Tamai (2007), de Bruijn & Dekkers (2010), and Frattini et al. (2024/25, *EMSE*); see Q5 and Q6.

**Assessment of the works suggested in the brief**
- **Davis et al. 1993:** historically important, but now overshadowed by 29148 and INCOSE. Kept as supporting.
- **Ameller et al. 2012:** a useful but small study (13 interviews). Olsson et al. 2022 is the better entry point to evidence on quality requirements.
- **McCall, Boehm and FURPS:** historical only; current practice uses ISO/IEC 25010:2023.
- **"Olsson et al. interview studies":** Olsson's most useful works are the 2022 systematic review in *REJ* and the 2019 *JSS* decision-making study.
- **"Behutiye et al. on documenting QRs in agile":** these are the 2020 SEAA and 2022 JSS papers. The 2020 IST mapping study by the same group is the stronger anchor.
- **Femmer & Vogelsang:** Crossref gives 2019, vol. 36(3); some sources cite 2018, the online-first date.
- **Added:** de Bruijn & Dekkers (2010) and Frattini et al. (2024/25), the strongest evidence on whether ambiguity matters; ISO/IEC 25019 and 25002, needed to describe the 2023 restructuring; and Femmer, Mund & Méndez (2015), the origin of the activity-based view.

### Inferences
**Consensus (strong agreement across academia, standards and practice studies)**
1. **Quality requirements are critical and routinely mishandled.** They are vague, unquantified, documented separately or not at all, decided late, and neglected under agile time pressure (Glinz, Eckhardt et al., Olsson et al., Behutiye et al., Alsaqaf et al.).
2. **Elicit them against a quality model, then make each one verifiable.** Use the model as a coverage checklist, then either attach a scale, measure and target (25030, Volere fit criteria, Planguage) or refine the requirement into testable behaviour (Glinz's representation facet, Eckhardt et al.).
3. **The characteristics of good requirements are broadly agreed.** IEEE 830 → 29148 → INCOSE give: necessary, unambiguous, complete, singular, feasible, verifiable, correct and conforming for each requirement; complete, consistent, feasible, comprehensible and validatable for the set. Completeness and consistency are mostly set-level properties.
4. **Automated linguistic checks supplement reviews; they do not replace them** (ARM, QuARS, smells).

**Open issues and disagreements**
1. **Terminology and structure.** Should "non-functional" survive as a category? Glinz and Broy would replace it with concern-based or behavioural views, and Eckhardt et al. show most NFRs are behaviour. Standards and practice keep a functional/quality split, and ISO 25010 even lists *functional suitability* as a quality characteristic. A related question is whether quality requirements should live in a separate section or be attached to features and acceptance criteria.
2. **How much ambiguity and rule violations matter.** The linguistic tradition (Berry) treats unrecognised ambiguity as the Achilles' heel of specifications. Case studies and experiments find that the effects are smaller and depend on the type of defect (de Bruijn & Dekkers, Philippo et al., Frattini et al.).
3. **Quantify everything, or accept qualitative requirements?** The quantification school (Gilb, Volere, 25030) faces a practice in which many quality requirements remain qualitative. Glinz notes that only performance has agreed measures, and agile teams minimise documentation.
4. **Normative rules or quality in use?** Should requirements quality be defined by rules in standards and guides, or by impact on downstream activities (Femmer & Vogelsang; Frattini et al.)? The evidence base is still small: mostly qualitative, few replications, and single-company outcome data (Olsson et al.; Montgomery et al.; Kamata & Tamai).

### Gaps
- **Status as of October 2026.** Because iso.org and incose.org blocked automated access, I could not confirm whether 29148, 25030 or the INCOSE GtWR have newer editions or amendments in progress beyond 25010:2023, 25019:2023, 25002:2024, 25030:2019, 29148:2018 and GtWR v4 (2023).
- **No quantitative cost-of-poor-quality-requirements figure from a rigorous study** was verified. The commonly repeated "14 times more costly" figure appears in a 1999 NASA abstract without supporting data.
