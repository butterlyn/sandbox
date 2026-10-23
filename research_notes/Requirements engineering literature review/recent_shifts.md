# Recent shifts in requirements engineering, ~2015 to October 2026 (research and industry practice)

Conventions used below. **Crossref ✓**: I fetched `https://api.crossref.org/works/<DOI>` on 2026-10-23 and the title and year matched. **arXiv ✓**: I read the arXiv abstract through the arXiv API. **abstract via S2**: abstract read through the Semantic Scholar API. **opened**: I read the page itself. **snippet**: the fact comes from a search-engine summary of that page, which I did not read in full. **UNVERIFIED**: link not opened or not checkable (EUR-Lex and incose.org blocked automated access). Paper counts and percentages are quoted only from abstracts or pages I retrieved. Out of scope, so not covered: AI coding agents, agentic workflows and "spec-driven development".

## 1. Continuous and data-driven RE: user feedback, app reviews, CrowdRE, usage analytics, continuous experimentation

### Takeaway
Since about 2015 RE research has reframed elicitation and validation as continuous activities. They now draw on explicit user feedback (app-store reviews, forums, social media) and implicit feedback (usage data, logs), and they treat online experiments as a way to validate requirements after release. It is a large and mature research area: one review covers 182 app-review-analysis papers from 2012–2020. The evidence is weaker than the volume suggests, though. Replications find that automated review-mining tools perform worse than originally reported, and industry use of feedback is mostly manual and ad hoc.

### Cited Findings
- **Pagano, D. & Maalej, W. (2013). "User feedback in the AppStore: An empirical study." RE'13, pp. 125–134.** An early empirical study of App Store reviews as a source of requirements (it predates this period). — [doi:10.1109/RE.2013.6636712](https://doi.org/10.1109/RE.2013.6636712) (Crossref ✓)
- **Maalej, W. & Nabil, H. (2015). "Bug report, feature request, or simply praise? On automatically classifying app reviews." RE'15, pp. 116–125.** Set up the task of automatically classifying reviews by type: bug report, feature request, or simply praise. — [doi:10.1109/RE.2015.7320414](https://doi.org/10.1109/RE.2015.7320414) (Crossref ✓)
- **Maalej, W., Nayebi, M., Johann, T. & Ruhe, G. (2016). "Toward Data-Driven Requirements Engineering." IEEE Software 33(1):48–54.** The programmatic paper that named the shift. The authors' 2019 update describes the argument as follows: vendors now collect large volumes of implicit feedback (usage data, error logs, sensor data), and requirements identification and prioritisation should therefore become data-driven and user-centred, using aggregated explicit and implicit user data. — [doi:10.1109/MS.2015.153](https://doi.org/10.1109/MS.2015.153) (Crossref ✓); description from the [ICSE-SEIP 2019 "update" paper PDF](https://old.ruhe.cpsc.ucalgary.ca/downloads/publications/conference/ICSESEIP_IEEESOFTWARE%20(2).pdf) (snippet; I could not open the 2016 full text)
- **Martin, W., Sarro, F., Jia, Y., Zhang, Y. & Harman, M. (2017). "A Survey of App Store Analysis for Software Engineering." IEEE TSE 43(9):817–847.** A broad survey of app-store analysis for software engineering. — [doi:10.1109/TSE.2016.2630689](https://doi.org/10.1109/TSE.2016.2630689) (Crossref ✓)
- **Groen, E.C., Seyff, N., Ali, R., Dalpiaz, F., Doerr, J., Guzman, E., Hosseini, M., Marco, J., Oriol, M., Perini, A. & Stade, M. (2017). "The Crowd in Requirements Engineering: The Landscape and Challenges." IEEE Software 34(2):44–52.** Defines the agenda for crowd-based RE (CrowdRE). The abstract presents CrowdRE as user-centred, continuously collecting user feedback and monitoring data about the usage context to manage requirements, and says automated approaches are key to analysing such volumes of data. — [doi:10.1109/MS.2017.33](https://doi.org/10.1109/MS.2017.33) (Crossref ✓; abstract content via snippet)
- **Dąbrowski, J., Letier, E., Perini, A. & Susi, A. (2022). "Analysing app reviews for software engineering: a systematic literature review." Empirical Software Engineering 27(2).** Covers **182 papers published 2012–2020**. It classifies them by the information mined, the techniques used and the software engineering activity supported, and it assesses the quality of their empirical evaluations. This is the reference review for the area. — [doi:10.1007/s10664-021-10065-7](https://doi.org/10.1007/s10664-021-10065-7) (Crossref ✓; abstract via S2)
- **Dąbrowski, J., Letier, E., Perini, A. & Susi, A. (2023). "Mining and searching app reviews for requirements engineering: Evaluation and replication studies." Information Systems 114:102181.** Re-evaluated feature-level opinion mining and feature-related review search. Both kinds of approach "achieve lower effectiveness than reported originally, and raise an important question about their practical use." This is the key evidence-quality caveat for the area. — [doi:10.1016/j.is.2023.102181](https://doi.org/10.1016/j.is.2023.102181) (Crossref ✓; abstract via S2)
- **Johanssen, J.O., Kleebaum, A., Bruegge, B. & Paech, B. (2019). "How do Practitioners Capture and Utilize User Feedback During Continuous Software Engineering?" RE'19, pp. 153–164.** Based on **20 interviews with practitioners from 17 companies** practising continuous software engineering. It recommends adapting and extending tool support to automate feedback processing, establishing "reference points" that relate feedback to requirements, and making more use of feedback for requirements validation. In other words, practice lags the research tooling. — [doi:10.1109/RE.2019.00026](https://doi.org/10.1109/RE.2019.00026) (Crossref ✓; abstract via S2)
- **Bosch, J. (2012). "Building Products as Innovation Experiment Systems." ICSOB 2012, LNBIP, pp. 27–39.** The origin of the idea that products should be built as continuous experiment systems rather than fixed feature sets. — [doi:10.1007/978-3-642-30746-1_3](https://doi.org/10.1007/978-3-642-30746-1_3) (Crossref ✓)
- **Olsson, H.H. & Bosch, J. (2014). "From Opinions to Data-Driven Software R&D: A Multi-case Study on How to Close the 'Open Loop' Problem." SEAA 2014, pp. 9–16.** Names the problem that feature decisions rest on opinion, with no feedback on whether the features deliver value. — [doi:10.1109/SEAA.2014.75](https://doi.org/10.1109/SEAA.2014.75) (Crossref ✓)
- **Fagerholm, F., Sanchez Guinea, A., Mäenpää, H. & Münch, J. (2017). "The RIGHT model for Continuous Experimentation." JSS 123:292–305.** A reference model for continuous experimentation, derived analytically and then matched against case studies of two startups. It finds that an experimentation system needs, at minimum: the ability to release minimum viable products or features with instrumentation, experiment design and management, a link from results to the product roadmap, and a flexible business strategy. — [doi:10.1016/j.jss.2016.03.034](https://doi.org/10.1016/j.jss.2016.03.034) (Crossref ✓; abstract content via snippet from the [Aalto research portal record](https://research.aalto.fi/en/publications/building-blocks-for-continuous-experimentation/) and others)
- **Kohavi, R., Tang, D. & Xu, Y. (2020). *Trustworthy Online Controlled Experiments*. Cambridge University Press.** The practitioner reference on A/B testing. In RE terms, it covers how to validate whether a shipped requirement actually changes user behaviour. — [doi:10.1017/9781108653985](https://doi.org/10.1017/9781108653985) (Crossref ✓, monograph, 2020)
- **Kasauli, R., Knauss, E., Horkoff, J., Liebel, G. & de Oliveira Neto, F.G. (2021). "Requirements engineering challenges and practices in large-scale agile system development." JSS 172:110851.** A multiple-case study of **7 large-scale systems companies** (20 interviews, 5 focus groups, 8 cross-company workshops) that found **24 challenges in 6 themes**. It notes that the upfront, detailed analysis RE needs "can be at odds with agile development methods", and maps the challenges to SAFe and LeSS. — [doi:10.1016/j.jss.2020.110851](https://doi.org/10.1016/j.jss.2020.110851) (Crossref ✓; abstract via S2)
- Feedback mining is still active at RE, but its sources have diversified beyond app stores. Examples: RE'23 "A Data-Driven Approach for Finding Requirements Relevant Feedback from TikTok and YouTube" — [RE'23 research track](https://conf.researchr.org/track/RE-2023/RE-2023-Research-Papers) (opened); RE'25 "What About Emotions? Guiding Fine-Grained Emotion Extraction from Mobile App Reviews" — [RE'25 research track](https://conf.researchr.org/track/RE-2025/RE-2025-Research-Papers) (opened); RE'26 "From Community Forums to Issue Trackers: A Moodle Case Study" — [RE'26 research track](https://conf.researchr.org/track/RE-2026/RE-2026-Research-Papers) (opened)

### Inferences
- What actually changed is that validation moved past deployment, and requirements are treated as hypotheses checked against usage data and user reactions. Feedback mining serves mainly evolution and prioritisation of existing products. It cannot reach non-users or products that don't exist yet, so it complements interviews, workshops and observation rather than replacing them. (This is my inference; I found no source that measures the trade-off.)
- Evidence strength is moderate at best. The area has many solution papers evaluated on researcher-built datasets. The 2023 replication is the strongest direct evidence, and it is negative on tool effectiveness. Practitioner evidence (Johanssen et al.) is qualitative.
- Continuous experimentation fits web and SaaS products that ship often. Its fit for embedded or safety-critical systems is not established in the sources I read (an inference from the startup and web contexts of Fagerholm and Kohavi).
- CrowdRE (2017) remains mainly a research agenda. I found no evidence of systematic industrial adoption (see Gaps).

### Gaps
- I found no reliable survey figure for how many companies use automated feedback or app-review analysis in RE.
- I found no evidence of industrial CrowdRE adoption since 2017. Absence of evidence here is not evidence of absence.
- I could not open the full 2016 Maalej et al. article. Its description above rests on the authors' own 2019 update abstract.
- Several experts raise the concern that app reviews are biased toward vocal users, but I did not find and verify a specific empirical source for it.

## 2. From output to outcome thinking in product practice (discovery vs delivery). Brief: another researcher covers product practice

### Takeaway
Industry product practice moved from "deliver the specified features" (output) to "show that the features change user or business outcomes". In the RE literature this appears as continuous experimentation, data-driven RE and value-based RE. The main consequence for a requirements specialist is that requirements increasingly carry measurable success criteria and are validated after release.

### Cited Findings
- Olsson & Bosch (2014) frame feature decisions without outcome feedback as an "open loop" problem — [doi:10.1109/SEAA.2014.75](https://doi.org/10.1109/SEAA.2014.75) (Crossref ✓; title-level)
- The RIGHT model requires that experiment results be linked to the product roadmap and to a flexible business strategy — [doi:10.1016/j.jss.2016.03.034](https://doi.org/10.1016/j.jss.2016.03.034) (abstract via snippet)
- In the RE'25 keynote, Roel Wieringa's "Value-driven requirements engineering for the 21st century" argued that product requirements must align with a company's business model and its wider value network, so RE should be value-based and network-oriented — [RE'25 keynotes](https://conf.researchr.org/track/RE-2025/RE-2025-keynotes) (opened)
- Practitioners use user feedback for requirements validation in continuous SE and are advised to do so more — [Johanssen et al. 2019](https://doi.org/10.1109/RE.2019.00026) (abstract via S2)

### Inferences
- In this shift the "requirement" becomes a hypothesis plus a metric, and "done" means "moved the metric", not "built as specified". It complements specification rather than replacing it. Specifications are still needed for compliance, safety and interfaces (inference).

### Gaps
- I did not cover the product-management canon (e.g., Cagan, Torres, Seiden) because it belongs to the other researcher's scope.

## 3. RE for AI/ML-based systems, including data requirements, explainability and regulatory drivers

### Takeaway
"RE for AI" (RE4AI/RE4ML) became a distinct subfield from about 2019. Its premises are that ML components are specified through data and performance measures rather than logic, that qualities such as fairness, transparency and explainability become first-class requirements, and that data requirements need their own treatment. Mapping studies find a young, mostly conceptual literature: 35 primary studies by 2021 and 43 by 2023. The EU AI Act (Regulation (EU) 2024/1689) turns several of these concerns into legal obligations. In July 2026, however, the "Digital Omnibus on AI" (Regulation (EU) 2026/1744) moved the high-risk obligations to **2 December 2027** (Annex III systems) and **2 August 2028** (Annex I, AI embedded in regulated products).

### Cited Findings
**Agenda-setting and empirical work**
- **Vogelsang, A. & Borg, M. (2019). "Requirements Engineering for Machine Learning: Perspectives from Data Scientists." RE'19 Workshops (REW), pp. 245–251.** A workshop paper based on interviews with **four data scientists**. It concludes that requirements engineers must (1) understand ML performance measures to state good functional requirements, (2) be aware of new quality requirements such as explainability, freedom from discrimination and specific legal requirements, and (3) integrate ML specifics into the RE process. — [doi:10.1109/REW.2019.00050](https://doi.org/10.1109/REW.2019.00050) (Crossref ✓; arXiv ✓)
- **Horkoff, J. (2019). "Non-Functional Requirements for Machine Learning: Challenges and New Directions." RE'19, pp. 386–391.** Argues that the set of relevant NFRs shifts for ML: fairness and transparency become prominent, while some qualities such as modularity may matter less. The meaning, decomposition and trade-offs of NFRs need rethinking, and the paper asks whether existing NFR approaches can be applied as-is. — [doi:10.1109/RE.2019.00050](https://doi.org/10.1109/RE.2019.00050) (Crossref ✓; abstract via S2)
- **Villamizar, H., Escovedo, T. & Kalinowski, M. (2021). "Requirements Engineering for Machine Learning: A Systematic Mapping Study." SEAA 2021, pp. 29–36.** Covers **35 studies**. The quality characteristics it flags as especially relevant are data quality, explainability, fairness, safety and transparency. Its main challenges are the lack of validated RE techniques, a fragmented and incomplete understanding of NFRs for ML, and managing customer expectations. — [doi:10.1109/SEAA53835.2021.00013](https://doi.org/10.1109/SEAA53835.2021.00013) (Crossref ✓; abstract via S2)
- **Ahmad, K., Abdelrazek, M., Arora, C., Bano, M. & Grundy, J. (2023). "Requirements engineering for artificial intelligence systems: A systematic mapping study." *Information and Software Technology* 158:107176.** The brief lists this as JSS; Crossref shows it is IST. It covers **43 primary studies** and concludes that current RE applications were "not adequately adaptable for building AI systems". Most empirical RE4AI studies focused on autonomous vehicles and on managing data requirements, and ethics, trust and explainability need more research. — [doi:10.1016/j.infsof.2023.107176](https://doi.org/10.1016/j.infsof.2023.107176) (Crossref ✓; arXiv ✓)
- **Habibullah, K.M., Gay, G. & Horkoff, J. (2023). "Non-functional requirements for machine learning: understanding current use and challenges among practitioners." Requirements Engineering 28(2):283–316.** Uses interviews plus a survey of practitioners in industry, academia and mixed settings. It shows that NFRs for ML may be defined and measured over the model, the data or the whole system, and it maps where practitioners agree or disagree on which NFRs matter. It builds on a 2021 interview study of **ten practitioners**. — [doi:10.1007/s00766-022-00395-3](https://doi.org/10.1007/s00766-022-00395-3) (Crossref ✓; abstract via S2; the ten-practitioner figure is from the [2021 arXiv preprint](https://arxiv.org/abs/2109.00872), arXiv ✓)
- **Heyn, H.-M., Knauss, E., Malleswaran, I. & Dinakaran, S. (2024). "An empirical investigation of challenges of specifying training data and runtime monitors for critical software with machine learning and their relation to architectural decisions." Requirements Engineering 29(1):97–117** (extends a REFSQ 2023 paper). A representative "data requirements" paper: it treats the specification of training data and runtime monitors as an RE problem. — [doi:10.1007/s00766-024-00415-4](https://doi.org/10.1007/s00766-024-00415-4) (Crossref ✓; title-level, full text not read)
- **Berry, D.M. (2022). "Requirements Engineering for Artificial Intelligence: What Is a Requirements Specification for an Artificial Intelligence?" REFSQ 2022, LNCS, pp. 19–25.** A short paper whose question is the point: the classical notion of a specification is contested for ML components. — [doi:10.1007/978-3-030-98464-9_2](https://doi.org/10.1007/978-3-030-98464-9_2) (Crossref ✓; title-level only, I could not read the argument)
- **Maalej, W., Pham, Y.D. & Chazette, L. (2023). "Tailoring Requirements Engineering for Responsible AI." IEEE Computer 56(4):18–27.** Argues that RE must be tailored for Responsible AI, citing post-deployment acceptance problems of AI in medical, automotive and scientific domains. — [doi:10.1109/MC.2023.3243182](https://doi.org/10.1109/MC.2023.3243182) (Crossref ✓; arXiv ✓)
- Data requirements show up as a recurring theme at RE: RE'25 "Specifying Operational Design Domain in Autonomous Driving for Comprehensive Data Evaluation" — [RE'25 research track](https://conf.researchr.org/track/RE-2025/RE-2025-Research-Papers) (opened); RE'26 "Annotation Requirements to Annotation Errors: A Causal Modeling Analysis for AI-enabled Perception Systems Development" and "From Failure to Alignment: A Requirements Engineering Framework for Machine Learning Systems" — [RE'26 research track](https://conf.researchr.org/track/RE-2026/RE-2026-Research-Papers) (opened)

**Explainability as a quality requirement**
- **Köhl, M.A. (Crossref: "Kohl"), Baum, K., Langer, M., Oster, D., Speith, T. & Bohlender, D. (2019). "Explainability as a Non-Functional Requirement." RE'19, pp. 363–368.** A short conceptual paper that unifies notions of explainability and treats its elicitation, specification and verification as an NFR, using a hypothetical hiring scenario. It states a long-term goal of standardised explainability certification. — [doi:10.1109/RE.2019.00046](https://doi.org/10.1109/RE.2019.00046) (Crossref ✓; abstract via S2)
- **Chazette, L. & Schneider, K. (2020). "Explainability as a non-functional requirement: challenges and recommendations." Requirements Engineering 25(4):493–514.** A **survey of 107 end users** on software transparency and embedded explanations. It explicitly notes "differences of opinion on the need for built-in explanations". — [doi:10.1007/s00766-020-00333-1](https://doi.org/10.1007/s00766-020-00333-1) (Crossref ✓; abstract via S2)
- **Chazette, L., Brunotte, W. & Speith, T. (2021). "Exploring Explainability: A Definition, a Model, and a Knowledge Catalogue." RE'21, pp. 197–208.** Gives a definition, a quality model and a catalogue of how explainability interacts with other qualities, built from an interdisciplinary SLR and validated in expert workshops. — [doi:10.1109/RE51729.2021.00025](https://doi.org/10.1109/RE51729.2021.00025) (Crossref ✓; abstract via S2)
- The line continues at RE from 2024 to 2026: RE'24 "Explanations in Everyday Software Systems: Towards a Taxonomy for Explainability Needs" — [RE'24 research track](https://conf.researchr.org/track/RE-2024/RE-2024-Research-Papers) (opened); RE'25 "How to Elicit Explainability Requirements? A Comparison of Interviews, Focus Groups, and Surveys" — [RE'25 research track](https://conf.researchr.org/track/RE-2025/RE-2025-Research-Papers) (opened); RE'26 "From Quality Properties to Practice: A Guideline and Workflow for Explainability Requirements" and "Writing Better Software Explanations: A Guideline-Based Approach" — [RE'26 research track](https://conf.researchr.org/track/RE-2026/RE-2026-Research-Papers) (opened)

**Regulatory driver: EU AI Act (dates checked)**
- **Regulation (EU) 2024/1689 (AI Act).** Timeline from the official Commission AI Act Service Desk page:
  - Entered into force **1 Aug 2024**.
  - Definitions, AI literacy and prohibitions apply from **2 Feb 2025**.
  - General-purpose AI rules apply from **2 Aug 2025**.
  - Most rules, including **Article 50 transparency**, apply from **2 Aug 2026**, when national and EU enforcement also begins.
  - New prohibitions on AI generating non-consensual sexual deepfakes or child sexual abuse material apply from **2 Dec 2026**.
  - High-risk rules for **Annex III** systems apply from **2 Dec 2027**.
  - High-risk rules for AI embedded in **Annex I** regulated products apply from **2 Aug 2028**.

  The page states that the timeline "takes into account the AI Act amendments introduced by Digital Omnibus on AI." — [AI Act Service Desk timeline](https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act) (opened). Regulation text: [EUR-Lex ELI 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng) (UNVERIFIED: EUR-Lex returned empty content to automated fetch)
- **Amending act: Regulation (EU) 2026/1744 ("Digital Omnibus on AI").** EUR-Lex search results show an entry with this title amending Regulations (EU) 2024/1689, 2018/1139 and 2023/1230, and a consolidated AI Act text dated 2026-07-27. — [EUR-Lex ELI 2026/1744](https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng) (UNVERIFIED, snippet). The adoption steps below are reported by secondary sources, which I did not check against a primary source:
  - provisional agreement on 7 May 2026 ([Council press release PDF](https://www.consilium.europa.eu/en/press/press-releases/2026/05/07/artificial-intelligence-council-and-parliament-agree-to-simplify-and-streamline-rules/pdf/), snippet);
  - European Parliament vote on 16 June 2026 and Council final approval on 29 June 2026 ([Cuatrecasas](https://www.cuatrecasas.com/en/latam/intellectual-property/art/council-eu-approves-digital-omnibus-ai), snippet);
  - Official Journal publication on 24 July 2026 and entry into force on 27 July 2026 (one secondary source, snippet only).
### Inferences
- For a requirements specialist the practical shift is that ML-based features need data requirements (provenance, quality, representativeness, operating-domain coverage), performance targets stated as metrics with thresholds, explicit quality requirements (fairness, explainability, transparency, human oversight) and runtime-monitoring requirements. This synthesis draws on Vogelsang & Borg, Villamizar et al., Ahmad et al., Heyn et al. and the RE'25 operational design domain paper.
- Evidence strength is low to moderate. The foundational empirical studies are small (four data scientists; ten interviewees, later plus a survey), and the mapping studies characterise a literature dominated by conceptual and early-stage contributions.
- Experts disagree on whether classical RE techniques can be adapted (Horkoff asks the question) or are inadequate (Ahmad et al.'s conclusion), and on whether a "specification" in the classical sense even exists for an ML component (Berry). For explainability, Chazette & Schneider report disagreement on whether built-in explanations are needed at all.
- The AI Act matters as a driver, but its high-risk requirements bind later than the original 2 August 2026 date. Writers should not cite "August 2026" for high-risk obligations, since that date is out of date after Regulation (EU) 2026/1744. Article 50 transparency obligations did start on 2 August 2026.

### Gaps
- I could not open EUR-Lex, so I have not verified article-level details: which articles hold the high-risk requirements (risk management, data governance, documentation, logging, transparency, human oversight, accuracy and robustness), or the exact Official Journal date of 2026/1744.
- I did not verify the AI-related standards (e.g., ISO/IEC 42001 and ISO/IEC 5259 on data quality for ML), so they are not cited.
- I found no industrial adoption figures for RE4AI practices.

## 4. AI, NLP and LLM support for RE tasks

### Takeaway
NLP4RE was already a large field by 2019, with 404 primary studies, but only 7% of them were evaluated in industrial settings. From 2023, LLMs became the main focus of new RE-automation research, and its centre of gravity moved from classification and defect detection toward elicitation, validation and generation. In controlled studies the results look promising: zero-shot classification reaches F1 of roughly 0.66–0.80 with no training data, and in one study GPT-4 drafted SRS documents comparable to an entry-level engineer's. Between them, however, the two most comprehensive 2024–2025 reviews report reliance on GPT models with zero-shot or few-shot prompting, mostly controlled evaluations, reproducibility and hallucination problems, and almost no production use: 1.3% of studies reached production-level integration in one review.

### Cited Findings
- **Dalpiaz, F., Ferrari, A., Franch, X. & Palomares, C. (2018). "Natural Language Processing for Requirements Engineering: The Best Is Yet to Come." IEEE Software 35(5):115–119.** A short column summarising the first NLP4RE workshop (2018) and its discussion of where the field should go. It set the agenda but is not empirical evidence. — [doi:10.1109/MS.2018.3571242](https://doi.org/10.1109/MS.2018.3571242) (Crossref ✓; abstract via S2)
- **Zhao, L., Alhoshan, W., Ferrari, A., Letsholo, K.J., Ajagbe, M.A., Chioasca, E.-V. & Batista-Navarro, R.T. (2021). "Natural Language Processing for Requirements Engineering: A Systematic Mapping Study." ACM Computing Surveys 54(3)** (online 17 Apr 2021; issue dated 2022). Key figures:
  - **404 primary studies** from **170 venues** over 36 years;
  - **67.08%** are solution proposals assessed by a lab experiment or an example application;
  - only **7%** were assessed in industrial settings;
  - **42.70%** focus on the analysis phase, with quality-defect detection as the central task.

  — [doi:10.1145/3444689](https://doi.org/10.1145/3444689) (Crossref ✓; abstract via S2)
- **Alhoshan, W., Ferrari, A. & Zhao, L. (2023). "Zero-shot learning for requirements classification: An exploratory study." IST 159:107202.** Zero-shot classification using transformer language models, with no labelled data. It reached F1 **0.66** on functional vs non-functional requirements, about **0.72–0.80** on NFR classes (the most frequent ones) and about **0.66** on security vs non-security. — [doi:10.1016/j.infsof.2023.107202](https://doi.org/10.1016/j.infsof.2023.107202) (Crossref ✓; arXiv ✓)
- **Ronanki, K., Berger, C. & Horkoff, J. (2023). "Investigating ChatGPT's Potential to Assist in Requirements Elicitation Processes." SEAA 2023.** Compared ChatGPT with **5 RE experts** on 6 elicitation questions. Another **5 experts** rated the **36 responses** on 7 quality attributes, and found ChatGPT's requirements highly abstract, atomic, consistent, correct and understandable. The sample is small. — [doi:10.1109/SEAA60479.2023.00061](https://doi.org/10.1109/SEAA60479.2023.00061) (Crossref ✓; abstract via S2)
- **Arora, C., Grundy, J. & Abdelrazek, M. (2024). "Advancing Requirements Engineering Through Generative AI: Assessing the Role of LLMs." In *Generative AI for Effective Software Development*, Springer, pp. 129–148.** A book chapter offering research directions and a SWOT analysis across elicitation, analysis, specification and validation, plus a preliminary evaluation. It is a position piece; better evidence comes from the reviews below. — [doi:10.1007/978-3-031-55642-5_6](https://doi.org/10.1007/978-3-031-55642-5_6) (Crossref ✓; arXiv ✓)
- **Krishna, M., Gaur, B., Verma, A. & Jalote, P. (2024). "Using LLMs in Software Requirements Specifications: An Empirical Evaluation." RE'24.** GPT-4 and CodeLlama drafted an SRS for a university club management system, compared against human benchmarks on eight criteria. The LLMs "can match the output quality of an entry-level software engineer". GPT-4 found issues in a requirements document and gave useful feedback, while CodeLlama's validation results were weaker. The study covers a single main system plus four use cases for time-saving. — [doi:10.1109/RE59067.2024.00056](https://doi.org/10.1109/RE59067.2024.00056) (Crossref ✓; arXiv ✓)
- **Norheim, J.J., Rebentisch, E., Xiao, D., Draeger, L., Kerbrat, A. & de Weck, O.L. (2024). "Challenges in applying large language models to requirements engineering tasks." Design Science 10.** A review taking a sceptical baseline: NLP has long been seen as promising for RE productivity "but has yet to demonstrate substantive benefits". It catalogues challenges that recur across RE tasks. — [doi:10.1017/dsj.2024.8](https://doi.org/10.1017/dsj.2024.8) (Crossref ✓; abstract via S2)
- **Vogelsang, A. & Fischbach, J. (2024). "Using Large Language Models for Natural Language Processing Tasks in Requirements Engineering: A Systematic Guideline."** A chapter (arXiv preprint) giving a guideline for choosing and adapting LLMs for NLP4RE tasks. — [arXiv:2402.13823](https://arxiv.org/abs/2402.13823) (arXiv ✓). It appears in **Ferrari, A. & Ginde, G. (eds.) (2025). *Handbook on Natural Language Processing for Requirements Engineering*. Springer.** — [doi:10.1007/978-3-031-73143-3](https://doi.org/10.1007/978-3-031-73143-3) (Crossref ✓)
- **Hemmat, A., Sharbaf, M., Kolahdouz-Rahimi, S., Lano, K. & Tehrani, S.Y. (2025). "Research directions for using LLM in software requirement engineering: a systematic review." Frontiers in Computer Science 7.** Reports an "upward trajectory" of LLM use in RE. The review is descriptive and optimistic in tone. — [doi:10.3389/fcomp.2025.1519437](https://doi.org/10.3389/fcomp.2025.1519437) (Crossref ✓; abstract via S2)
- **Zadenoori, M.A., Dąbrowski, J., Alhoshan, W., Zhao, L. & Ferrari, A. (2025). "Large Language Models (LLMs) for Requirements Engineering (RE): A Systematic Literature Review." arXiv:2509.11446** (v1, 14 Sep 2025; no journal reference at time of check). Findings:
  - covers **74 primary studies from 2023–2024**;
  - most use LLMs for elicitation and validation, whereas earlier NLP4RE was dominated by defect detection and classification;
  - requirements specifications remain the main artefact;
  - studies mostly use GPT-based models with zero-shot or few-shot prompting;
  - evaluation is usually in controlled settings, and studies rarely reach industry.

  — [arXiv:2509.11446](https://arxiv.org/abs/2509.11446) (arXiv ✓)
- **Cheng, H., Husen, J.H., Lu, Y., Racharak, T., Yoshioka, N., Ubayashi, N. et al. "Generative AI for Requirements Engineering: A Systematic Literature Review." arXiv:2409.06741** (v1 Sep 2024; the v3 abstract covers papers to 2025). Findings:
  - covers **238 articles, 2019–2025**;
  - GPT-family models dominate (**67.3%**);
  - analysis (**30.0%**) and elicitation (**22.1%**) get most attention, management only **6.8%**;
  - core challenges are reproducibility (**66.8%**), hallucinations (**63.4%**) and interpretability (**57.1%**);
  - **over 90%** of studies are early-stage, and only **1.3%** reach production-level integration.

  — [arXiv:2409.06741](https://arxiv.org/abs/2409.06741) (arXiv ✓)
- Signals from the conference itself:
  - RE'24 keynote by Jan Mendling, "Automation for Requirements Engineering: Opportunities and Pitfalls" — [RE'24 keynotes](https://conf.researchr.org/track/RE-2024/RE-2024-keynotes) (opened).
  - RE'25 paper "Augmenting, Not Replacing: The Role of LLMs in Human-Centric Formal RE" — [RE'25 research track](https://conf.researchr.org/track/RE-2025/RE-2025-Research-Papers) (opened).
  - RE'26 paper "Under Pressure: Navigating Human Factors in AI-Supported Requirements Validation" — [RE'26 research track](https://conf.researchr.org/track/RE-2026/RE-2026-Research-Papers) (opened).
  - RE'26 keynote by Q. Vera Liao on how increasingly capable AI, especially LLMs, risks overreliance and threatens the integrity of human knowledge acquisition — [RE'26 keynotes](https://conf.researchr.org/track/RE-2026/RE-2026-keynotes) (opened).

### Inferences
- The two reviews conflict on which RE activities dominate: Zadenoori et al. say elicitation and validation, Cheng et al. say analysis then elicitation. The difference probably comes from scope (LLMs only vs all generative AI), time window (2023–24 vs 2019–25) and taxonomy. Writers should cite both and not claim a single ranking.
- Evidence strength for LLM support is low to moderate. Results come from small expert panels, single example systems, fast-changing proprietary models and controlled settings, and production evidence is close to nil (1.3%). The most defensible summary: LLMs are plausible assistants for drafting, classifying and quality-checking requirements, provided a human reviews the output; the effect on real projects is unmeasured.
- Experts disagree. Optimistic accounts (Krishna et al.; Hemmat et al.) sit against sceptical ones (Norheim et al.: NLP has yet to show substantive benefits; Cheng et al.'s reproducibility and hallucination triad; Liao's overreliance warning at RE'26).

### Gaps
- I found no industrial field experiment that measures the effect of LLM assistance on requirements quality or downstream defects.
- I did not find, or could not verify, a peer-reviewed 2026 LLM4RE review. The two most comprehensive reviews were still arXiv preprints when I checked.

## 5. Human values, ethics, sustainability, accessibility and legal compliance as requirements concerns

### Takeaway
RE's notions of "stakeholder" and "quality requirement" broadened after 2015. Human values, ethics and sustainability became RE research topics with manifestos and frameworks: the Karlskrona Manifesto (2015), a research roadmap for operationalising values (2018) and the SusAF framework (2020). Law meanwhile made privacy (GDPR, applying since 25 May 2018), accessibility (European Accessibility Act, applying from 28 June 2025) and AI transparency (AI Act, from 2 August 2026) into mandatory requirements. Research on values and sustainability is still mostly research-led with thin industrial evidence; law is what makes these concerns non-optional.

### Cited Findings
**Human values and ethics**
- **Perera, H., Hussain, W., Whittle, J., Nurwidyantoro, A., Mougouei, D., Shams, R.A. et al. (2020). "A study on the prevalence of human values in software engineering publications, 2015–2018." ICSE 2020.** Found that only a small proportion of top-venue SE publications directly consider human values, that most values had few or no relevant publications, and that conferences covered values more than journals did. — [doi:10.1145/3377811.3380393](https://doi.org/10.1145/3377811.3380393) (Crossref ✓; arXiv ✓)
- **Mougouei, D., Perera, H., Hussain, W., Shams, R. & Whittle, J. (2018). "Operationalizing human values in software: a research roadmap." ESEC/FSE 2018, pp. 780–784.** This is the actual "operationalising human values" paper the brief alludes to under "Whittle et al.". — [doi:10.1145/3236024.3264843](https://doi.org/10.1145/3236024.3264843) (Crossref ✓)
- **Whittle, J., Ferrario, M.A., Simm, W. & Hussain, W. (2021). "A Case for Human Values in Software Engineering." IEEE Software 38(1):106–113.** Argues that values such as responsibility, transparency, creativity and equality are "heavily underrepresented" in SE methods, and explores integrating them into participatory agile practices with not-for-profit organisations. — [doi:10.1109/MS.2019.2956701](https://doi.org/10.1109/MS.2019.2956701) (Crossref ✓; abstract via S2)
- **Hussain, W., Perera, H., Whittle, J., Nurwidyantoro, A., Hoda, R., Shams, R.A. & Oliver, G. (2022). "Human Values in Software Engineering: Contrasting Case Studies of Practice." IEEE TSE 48(5):1818–1833.** Based on **31 practitioners in two organisations**, it finds that organisational culture strongly shapes how values are addressed in software. — [doi:10.1109/TSE.2020.3038802](https://doi.org/10.1109/TSE.2020.3038802) (Crossref ✓; abstract via S2)
- Ethics at RE'25 and RE'26:
  - RE'25 keynotes by Daniela Damian (empathy, perspective-taking and cultural sensitivity when co-designing with users) and Nuria Oliver (human and algorithmic biases) — [RE'25 keynotes](https://conf.researchr.org/track/RE-2025/RE-2025-keynotes) (opened).
  - RE'25 papers "Where Do Users Draw the Line? Ethical Concerns about Software" and "Model Cards Revisited: Bridging the Gap Between Theory and Practice for Ethical AI Requirements" — [RE'25 research track](https://conf.researchr.org/track/RE-2025/RE-2025-Research-Papers) (opened).
  - RE'26 papers "CRAYON: Supporting the Elicitation of Pluralistic Normative Requirements for Autonomous Systems" and "HM-Req: A Framework for Embedding Values within CPS Human Monitoring Requirements" — [RE'26 research track](https://conf.researchr.org/track/RE-2026/RE-2026-Research-Papers) (opened).

**Sustainability**
- **Becker, C., Chitchyan, R., Duboc, L., Easterbrook, S., Penzenstadler, B., Seyff, N. & Venters, C.C. (2015). "Sustainability Design and Software: The Karlskrona Manifesto." ICSE 2015, pp. 467–476.** Frames sustainability as systemic, spanning five dimensions: social, individual, environmental, economic and technical. — [doi:10.1109/ICSE.2015.179](https://doi.org/10.1109/ICSE.2015.179) (Crossref ✓); the dimensions are confirmed via [sustainabilitydesign.org](https://sustainabilitydesign.org/karlskrona-manifesto/) (snippet)
- **Becker, C., Betz, S., Chitchyan, R., Duboc, L., Easterbrook, S.M., Penzenstadler, B., Seyff, N. & Venters, C.C. (2016). "Requirements: The Key to Sustainability." IEEE Software 33(1):56–65.** The RE-specific version of the argument: requirements are where sustainability is won or lost. — [doi:10.1109/MS.2015.158](https://doi.org/10.1109/MS.2015.158) (Crossref ✓; title-level)
- **Duboc, L., Penzenstadler, B., Porras, J., Akinli Kocak, S., Betz, S., Chitchyan, R., Leifler, O., Seyff, N. et al. (2020). "Requirements engineering for sustainability: an awareness framework for designing software systems for a better tomorrow." Requirements Engineering 25(4):469–492.** Presents the Sustainability Awareness Framework (SusAF), which identifies a system's potential effects across the five dimensions. — [doi:10.1007/s00766-020-00336-y](https://doi.org/10.1007/s00766-020-00336-y) (Crossref ✓; content via snippet)
- Sustainability at the conference: the RE'23 keynote by Federica Sarro argued that search-based SE can address ethical, social and environmental requirements such as fairness, safety and sustainability — [RE'23 keynotes](https://conf.researchr.org/track/RE-2023/RE-2023-keynotes) (opened). RE'26 made sustainability part of its theme — [RE'26 home](https://conf.researchr.org/home/RE-2026) (opened).

**Legal compliance and privacy**
- **Breaux, T.D. & Antón, A.I. (2008). "Analyzing Regulatory Rules for Privacy and Security Requirements." IEEE TSE 34(1):5–20.** Predates this period but anchors the methods: it gives a method for extracting access rights and obligations directly from regulatory text, applied to the full HIPAA Privacy Rule. — [doi:10.1109/TSE.2007.70746](https://doi.org/10.1109/TSE.2007.70746) (Crossref ✓; abstract via snippet of the [authors' PDF](https://www.cc.gatech.edu/~aianton/assets/2008_ieeetse_hipaa.pdf))
- **GDPR, Regulation (EU) 2016/679.** Has applied since **25 May 2018**. — [EUR-Lex ELI 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj) (UNVERIFIED: not openable by my tools); the date is from the [EUR-Lex GDPR summary](https://eur-lex.europa.eu/EN/legal-content/summary/general-data-protection-regulation-gdpr.html) (snippet)
- Legal RE at RE'23–RE'26 is increasingly automated with ML and LLMs:
  - RE'23 "ML-based Compliance Verification of Data Processing Agreements against GDPR" — [RE'23 research track](https://conf.researchr.org/track/RE-2023/RE-2023-Research-Papers) (opened);
  - RE'24 "AI-enabled Regulatory Change Analysis of Legal Requirements" and "Defining a Model for Content Requirements from the Law: an Experience Report" — [RE'24 research track](https://conf.researchr.org/track/RE-2024/RE-2024-Research-Papers) (opened);
  - RE'25 "LLM-assisted Extraction of Regulatory Requirements: A Case Study on the GDPR" and "Legal Requirements Translation from Law" — [RE'25 research track](https://conf.researchr.org/track/RE-2025/RE-2025-Research-Papers) (opened);
  - RE'26 "AI Transparency: Governance Compliance or Stakeholder Requirements?" — [RE'26 research track](https://conf.researchr.org/track/RE-2026/RE-2026-Research-Papers) (opened).

**Accessibility**
- **European Accessibility Act, Directive (EU) 2019/882.** Member States had to transpose it by June 2022. It covers products such as computers and operating systems, ATMs and ticketing and check-in machines, smartphones and TV equipment, and services such as telephony, banking, e-books, e-commerce, audiovisual media access and passenger transport services. — [European Commission EAA page](https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en) (opened). It applies to products placed on the market and services provided after **28 June 2025** — [EUR-Lex 32019L0882](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX%3A32019L0882) (snippet; UNVERIFIED direct) and [AccessibleEU, "The EAA comes into effect in June 2025"](https://accessible-eu-centre.ec.europa.eu/content-corner/news/eaa-comes-effect-june-2025-are-you-ready-2025-01-31_en) (snippet)
- **EN 301 549 (ETSI/CEN/CENELEC), the ICT accessibility requirements standard.**
  - **V3.2.1 (2021)**, based on WCAG 2.1, remains the version in force.
  - **V4.1.1** was published online on **2 September 2026**. It moves the baseline for web content, non-web documents and software to **WCAG 2.2 Level AA**, and it is "the first version of the standard developed specifically with the EAA in mind", with an annex mapping its clauses to the EAA's essential requirements.
  - V4.1.1 gives a presumption of conformity only once the Commission cites it in the Official Journal, expected **16 December 2026**.

  — [National Disability Authority (Ireland)](https://nda.ie/news/en301549-published) (opened). Conflicting date: another source expects citation around **30 November 2026** — [Davis Wright Tremaine](https://www.dwt.com/insights/2026/09/european-accessibility-act-ict-standards-update) (snippet)

### Inferences
- The shift is from "nice-to-have quality" to "compliance requirement". For accessibility (EAA plus EN 301 549), privacy (GDPR) and AI transparency (AI Act), the requirements catalogue increasingly comes from law and harmonised standards. That makes traceability from requirements to legal provisions and standard clauses a core skill for a requirements specialist. RE research is responding with ML and LLM tools for extracting regulatory requirements (RE'23–'25 titles).
- Values and sustainability are established as research topics with recognised manifestos and frameworks. Industrial evidence is thin and case-based, and Hussain et al. show that practice depends on organisational culture rather than on methods alone.
- Experts disagree on whether values can be "engineered" with generic methods (the roadmap and the "case for" papers) or depend on organisational culture (Hussain et al.).

### Gaps
- I found no quantitative evidence of industrial adoption of SusAF, the Karlskrona principles or values-based RE methods.
- I did not systematically cover the post-GDPR privacy-requirements literature (privacy by design, privacy requirements elicitation); only RE conference titles are cited.
- I could not open EUR-Lex for the GDPR or EAA texts. Dates rest on EUR-Lex and Commission snippets and on Commission pages.

## 6. Systems engineering shifts: INCOSE Needs and Requirements Manual, MBSE and SysML v2

### Takeaway
Systems engineering codified two shifts. First, INCOSE's Requirements Working Group made a terminology-level split between an **integrated set of needs**, against which the system is **validated**, and **design input requirements**, against which it is **verified**. The *Needs and Requirements Manual* (NRM) does this, together with a data-centric approach and its companion guides. Second, model-based SE got a new-generation standard: OMG gave **final adoption to SysML v2 on 21 July 2025**, with requirements as first-class model elements, textual plus graphical notation and a standard API.

### Cited Findings
- **Wheatcraft, L.S., Ryan, M.J. & Katz, T.E. (2025; INCOSE-TP-2021-002-01). *INCOSE Needs and Requirements Manual: Needs, Requirements, Verification, Validation Across the Lifecycle*. Wiley (copyright 2025).** The manual makes these points:
  - for acceptance, certification and qualification, the system "is verified against design input requirements and validated against its integrated set of needs";
  - "adequate definition of lifecycle concepts and a well-formed set of needs is a prerequisite to the definition of a well-formed set of system design input requirements";
  - it "addresses ambiguity and inconsistencies in NRVV terminology and ontology";
  - it supplements the INCOSE SE Handbook and SEBoK;
  - it leaves the writing of individual need and requirement statements to the INCOSE *Guide to Writing Requirements* (GtWR);
  - it advocates a data-centric approach to project management and SE.

  — [Wiley product page](https://www.wiley.com/en-us/INCOSE+Needs+and+Requirements+Manual:+Needs,+Requirements,+Verification,+Validation+Across+the+Lifecycle-p-9781394152766) (located via search, not opened); quotes from the [publisher's reading-sample PDF](https://content.e-bookshelf.de/media/reading/L-25303459-f48ab33d4b.pdf) (opened, text extracted)
- NRM version history: v1 was released January 2022, and v2 was published by Wiley in late 2024 (INCOSE sources variously say November or December 2024; the book carries a 2025 copyright). — [INCOSE webinar 189 page](https://www.incose.org/event/incose-webinar-189-incose-rwg-needs-and-requirements-manual-nrm-v2-overview/) (snippet; HTTP 403 to my fetch, UNVERIFIED)
- **OMG (2025). "Object Management Group Approves Final Adoption of the SysML V2 Specification," press release, Boston, 21 July 2025.**
  - Adopted SysML 2.0, the Kernel Modeling Language (KerML) 1.0 and the Systems Modeling API and Services 1.0.
  - Pairs textual and graphical views of the same model.
  - Provides a standard API for navigating, querying and updating models across tools.
  - Supports deeply nested hierarchies of structure, behaviour and requirements, plus analysis and verification cases.
  - Claims improved precision, expressiveness, consistency, usability, interoperability and extensibility over SysML v1.

  — [OMG press release](https://www.omg.org/news/releases/pr2025/07-21-25.htm) (opened). OMG's own pages give June vs July 2025 for adoption (snippet); the press release date is 21 July 2025.
- Industrial context at RE: the RE'23 keynote by Rainer Dammers (ETAS) on software-defined vehicles argued that over-the-air updates bring new requirements for maintainability, E/E architectures, cross-domain collaboration and processes — [RE'23 keynotes](https://conf.researchr.org/track/RE-2023/RE-2023-keynotes) (opened)

### Inferences
- The NRM's needs-versus-requirements split formalises an old RE distinction (stakeholder or user requirements vs system requirements), together with the validation-versus-verification distinction, in an explicit shared vocabulary. Its novelty lies in codification and lifecycle data management rather than in new concepts (inference).
- SysML v2 lets requirements live as typed, machine-queryable model elements linked to verification cases. That supports the "requirements as data" direction also visible in the NRM, but SysML v1 remains in wide use during the transition (inference; adoption data not found).

### Gaps
- I could not verify the INCOSE GtWR version or date (incose.org returned 403). I also have no industry adoption data for SysML v2 or for the NRM.

## 7. Dominant themes at the IEEE RE conference and in the Requirements Engineering journal, 2023–2026

### Takeaway
The conference themes moved from introspection ("Redefining RE", 2023; "Exploring New Horizons", 2024) to AI-centred framing: "Future-proofing RE… embracing AI, DevOps, sustainability, security, personalization, and agile" (2025) and "Sustainability and workforce transformation in the era of generative AI" (2026). In the accepted research-paper lists on the track pages, titles that explicitly mention AI, ML or LLMs rose from about a quarter (2023, 2024) to about half (2025, 2026). The secondary themes that persist are explainability, legal and regulatory compliance, human values and ethics, and user feedback.

### Cited Findings
- **RE'23** (Hannover, 4–8 Sep 2023). Theme: "Redefining RE: Challenging RE Perceptions, Boundaries, and Topics", asking what counts as RE and how its boundaries affect industry adoption. Keynotes: Claes Wohlin ("Do We Publish Credible Evidence?"), Rainer Dammers (ETAS, software-defined vehicles), Federica Sarro (SBSE for ethical, social and environmental requirements). — [RE'23 research track](https://conf.researchr.org/track/RE-2023/RE-2023-Research-Papers), [RE'23 keynotes](https://conf.researchr.org/track/RE-2023/RE-2023-keynotes) (opened)
- **RE'24** (Reykjavik, 24–28 Jun 2024). Theme: "Exploring New Horizons: Expanding the Frontiers of Requirements Engineering". Keynotes: Jan Mendling ("Automation for RE: Opportunities and Pitfalls"), Marija Mikic of Google Labs ("Paradigm Shift with GenAI"), David Lo ("RE for Trustworthy Human-AI Synergy in Software Engineering 2.0"). — [RE'24 home](https://conf.researchr.org/home/RE-2024), [RE'24 keynotes](https://conf.researchr.org/track/RE-2024/RE-2024-keynotes) (opened)
- **RE'25** (Valencia, 1–5 Sep 2025). Theme: "Future-proofing Requirements Engineering", focused on "embracing AI, DevOps, sustainability, security, personalization, and agile practices". Keynotes: Daniela Damian, Roel Wieringa (value-driven RE), Nuria Oliver (bias and fairness). — [RE'25 research track](https://conf.researchr.org/track/RE-2025/RE-2025-Research-Papers), [RE'25 keynotes](https://conf.researchr.org/track/RE-2025/RE-2025-keynotes) (opened)
- **RE'26** (Montréal, ÉTS, 17–21 Aug 2026). Theme: "Sustainability and workforce transformation in the era of generative AI" / "How to prepare for a future in collaboration with AI tools and assistants"; the call repeats the AI/DevOps/sustainability/security/personalisation/agile list and adds serving a global, heterogeneous user base. Submissions need not address the theme. Keynotes: Graham Neubig (CMU, on building agents for software development; that topic is out of scope here), Christof Ebert (AI and the future of the workplace), Q. Vera Liao (AI and human intelligence: overreliance risks). The call requires disclosure of AI-generated content under IEEE policy. — [RE'26 home](https://conf.researchr.org/home/RE-2026), [RE'26 research track](https://conf.researchr.org/track/RE-2026/RE-2026-Research-Papers), [RE'26 keynotes](https://conf.researchr.org/track/RE-2026/RE-2026-keynotes) (opened)
- **Title scan (my count of the "Accepted Papers" lists shown on each research-track page)**:
  - RE'23: about **4 of 15** listed titles explicitly AI/ML (transformer, ML, deep learning, zero-shot); about 3 privacy or legal (GDPR, contracts, privacy risk); 2 user feedback.
  - RE'24: about **4 of 17** AI/ML/LLM; 2 legal; 1 explainability.
  - RE'25: about **12 of 23** AI/ML/LLM; 2 explainability; 2 legal; 2 ethics; 1 app reviews.
  - RE'26: **13 of 24** titles shown explicitly AI/ML/LLM; 3 explainability; 2 values or normative requirements.

  — sources: the four research-track pages above (opened)
- New formats signal emphases. The track lists show an "RE Open Data Initiative" track at RE'25 and RE'26, "Most Influential Paper", "New Faculty Symposium" and "Panels" tracks from RE'24, and an "Industry Day" at RE'26. — homepages [RE'24](https://conf.researchr.org/home/RE-2024), [RE'25](https://conf.researchr.org/home/RE-2025), [RE'26](https://conf.researchr.org/home/RE-2026) (opened; track URLs extracted)
- Post-COVID ways of working appear too: RE'24 "'Do you have time for a quick call?': Exploring Remote and Hybrid Requirements Engineering Practices and Challenges in Industry" — [RE'24 research track](https://conf.researchr.org/track/RE-2024/RE-2024-Research-Papers) (opened)
- **Requirements Engineering journal (Springer).**
  - REFSQ 2026 (Poznań, 23–26 Mar 2026) planned a special issue in the journal for extended distinguished papers — [REFSQ 2026](https://conf.researchr.org/home/refsq-2026) (snippet).
  - A third-party aggregator lists a special issue "Rethinking Requirements Engineering in the Age of Large Language Models" with a 31 Mar 2026 deadline — [myhuiban listing](https://www.myhuiban.com/journal/88.md) (UNVERIFIED; not confirmed on Springer).
  - Journal papers verified in these notes span the shifts above: explainability (REJ 25(4), 2020), sustainability (REJ 25(4), 2020), NFRs for ML (REJ 28(2), 2023), training-data and runtime-monitor specification (REJ 29(1), 2024).

### Inferences
- From 2025 onward AI is the dominant theme at RE in two forms, AI for RE and RE for AI, roughly half of listed research titles. The counts are approximate. They come from titles only, the accepted lists on the track pages are partial (the programs list more papers), and classification is a judgement call.
- The keynote programme mirrors this: GenAI or AI in 2024–2026 keynotes alongside values, bias and evidence-credibility talks. That suggests the community is debating AI's risks as well as using AI.
- The RE'23 Wohlin keynote ("Do We Publish Credible Evidence?") and the open-data track (2025–26) show a parallel concern with evidence quality, which matters when weighing the empirical claims in Sections 1, 3 and 4.

### Gaps
- I did not analyse the journal's 2023–2026 tables of contents systematically, so I cannot quantify its dominant themes. Only the special-issue signals above are available, one of them unverified.
- The accepted-paper lists for each year are incomplete on the pages I read, so full-programme counts are not available.

## 8. Synthesis: the 15 most important works or items, how established each shift is, and corrections to the brief

### Takeaway
The best-established shifts are continuous, feedback-driven RE in research and compliance-driven requirements (privacy, accessibility, AI) in practice. RE for AI/ML and explainability are now mainstream research topics but have thin empirical grounding. LLM support for RE is the fastest-growing area with the weakest real-world evidence. Values and sustainability are recognised research concerns with little industrial evidence. In systems engineering, the needs-vs-requirements vocabulary and SysML v2 are freshly codified standards whose adoption is still unfolding.

### Cited Findings
**The 15 most important works or items for this subtopic** (one link each; details above)
1. **Maalej, Nayebi, Johann & Ruhe (2016), "Toward Data-Driven Requirements Engineering", IEEE Software.** Named the shift to continuous, user-data-driven requirements decisions. — [doi:10.1109/MS.2015.153](https://doi.org/10.1109/MS.2015.153)
2. **Dąbrowski, Letier, Perini & Susi (2022), "Analysing app reviews for software engineering: a SLR", EMSE.** 182 papers; the state of the art in feedback mining. Read it with their **2023 replication (Information Systems)** showing lower-than-reported effectiveness. — [doi:10.1007/s10664-021-10065-7](https://doi.org/10.1007/s10664-021-10065-7)
3. **Groen et al. (2017), "The Crowd in Requirements Engineering", IEEE Software.** The CrowdRE agenda: continuous feedback plus monitoring data, with automated analysis. — [doi:10.1109/MS.2017.33](https://doi.org/10.1109/MS.2017.33)
4. **Fagerholm, Sanchez Guinea, Mäenpää & Münch (2017), "The RIGHT model for Continuous Experimentation", JSS.** Experimentation as an engineered system linked to the roadmap; the RE view of validation after release. — [doi:10.1016/j.jss.2016.03.034](https://doi.org/10.1016/j.jss.2016.03.034)
5. **Kohavi, Tang & Xu (2020), *Trustworthy Online Controlled Experiments*, Cambridge UP.** The practitioner reference for validating requirements through A/B tests. — [doi:10.1017/9781108653985](https://doi.org/10.1017/9781108653985)
6. **Vogelsang & Borg (2019), "RE for ML: Perspectives from Data Scientists", REW.** Short but agenda-setting: performance measures and new quality requirements for ML. — [doi:10.1109/REW.2019.00050](https://doi.org/10.1109/REW.2019.00050)
7. **Habibullah, Gay & Horkoff (2023), "NFRs for ML…", Requirements Engineering.** The most substantial empirical study of how practitioners define and measure ML quality requirements. — [doi:10.1007/s00766-022-00395-3](https://doi.org/10.1007/s00766-022-00395-3)
8. **Ahmad, Abdelrazek, Arora, Bano & Grundy (2023), "RE for AI systems: a systematic mapping study", Information and Software Technology.** 43 studies; RE practice not yet adapted to AI. — [doi:10.1016/j.infsof.2023.107176](https://doi.org/10.1016/j.infsof.2023.107176)
9. **Chazette & Schneider (2020), "Explainability as a non-functional requirement: challenges and recommendations", Requirements Engineering.** Read with Köhl et al. (RE'19) and Chazette et al. (RE'21); established explainability as an RE quality requirement. — [doi:10.1007/s00766-020-00333-1](https://doi.org/10.1007/s00766-020-00333-1)
10. **EU AI Act, Regulation (EU) 2024/1689, as amended by Regulation (EU) 2026/1744.** The regulatory driver for RE4AI. High-risk obligations apply from 2 Dec 2027 (Annex III) and 2 Aug 2028 (Annex I); Article 50 transparency from 2 Aug 2026. — [AI Act Service Desk timeline](https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act)
11. **Zhao et al. (2021), "NLP for RE: A Systematic Mapping Study", ACM Computing Surveys.** 404 studies; only 7% evaluated in industry; the baseline for judging AI support for RE. — [doi:10.1145/3444689](https://doi.org/10.1145/3444689)
12. **Zadenoori, Dąbrowski, Alhoshan, Zhao & Ferrari (2025), "LLMs for RE: A Systematic Literature Review", arXiv.** 74 studies from 2023–24; read it with Cheng et al.'s GenAI4RE review (238 articles; 1.3% production-level). — [arXiv:2509.11446](https://arxiv.org/abs/2509.11446)
13. **Perera et al. (2020), "A study on the prevalence of human values in SE publications, 2015–2018", ICSE.** Showed how little SE research addressed values; read with Whittle et al. (2021) and Hussain et al. (2022). — [doi:10.1145/3377811.3380393](https://doi.org/10.1145/3377811.3380393)
14. **Becker et al. (2015), "Sustainability Design and Software: The Karlskrona Manifesto", ICSE.** The reference point for sustainability as a requirements concern; operationalised in SusAF (Duboc et al., REJ 2020). — [doi:10.1109/ICSE.2015.179](https://doi.org/10.1109/ICSE.2015.179)
15. **Wheatcraft, Ryan & Katz, *INCOSE Needs and Requirements Manual* (Wiley, 2025).** Codifies needs (validated) vs design input requirements (verified); read with **OMG SysML v2 (final adoption 21 Jul 2025)**. — [Wiley page](https://www.wiley.com/en-us/INCOSE+Needs+and+Requirements+Manual:+Needs,+Requirements,+Verification,+Validation+Across+the+Lifecycle-p-9781394152766) (not opened; contents verified from the publisher's reading sample)

Compliance anchors for privacy and accessibility, not ranked above because they are regulations rather than RE works: the GDPR (applies since 25 May 2018), the European Accessibility Act (applies from 28 June 2025) with EN 301 549 (V3.2.1 in force; V4.1.1 published 2 Sep 2026, Official Journal citation pending), and Breaux & Antón (2008) as the methodological anchor for legal requirements — see Section 5 for links.

**Corrections to the brief (mis-described or minor items)**
- Ahmad et al. (2023) appeared in ***Information and Software Technology*** 158:107176, **not JSS** — [Crossref ✓](https://doi.org/10.1016/j.infsof.2023.107176)
- Zhao et al. (CSUR) was published online in **April 2021** but formally sits in **vol. 54(3), the 2022 issue**. Cite it as 2021 (online) or 2022 consistently. — [Crossref ✓](https://doi.org/10.1145/3444689)
- Vogelsang & Borg (2019) is a **workshop paper** (RE'19 Workshops) based on **four interviews**. It is influential as an agenda but is weak evidence. — [arXiv ✓](https://arxiv.org/abs/1908.04674)
- Köhl et al. (RE'19) is a **6-page conceptual paper** (pp. 363–368). The empirical explainability work is Chazette & Schneider (2020) and Chazette et al. (2021). — [Crossref ✓](https://doi.org/10.1109/RE.2019.00046)
- Dalpiaz et al. (2018) is a **short column summarising the NLP4RE'18 workshop**. Use Zhao et al. (2021) for substance. — [Crossref ✓](https://doi.org/10.1109/MS.2018.3571242)
- Arora, Grundy & Abdelrazek (2024) is a **book chapter offering a SWOT analysis and research directions**, so it is a position piece. For evidence, use the systematic reviews: Zadenoori et al. 2025, Cheng et al., Norheim et al. 2024. — [Crossref ✓](https://doi.org/10.1007/978-3-031-55642-5_6)
- "Whittle et al. (operationalising human values in software)": the operationalising paper is **Mougouei, Perera, Hussain, Shams & Whittle (2018), ESEC/FSE research roadmap**. Whittle et al.'s own IEEE Software piece (2021) is "A Case for Human Values in Software Engineering". — [Crossref ✓](https://doi.org/10.1145/3236024.3264843)
- EU AI Act "phased application": the brief's implied dates need updating. High-risk obligations were **postponed by Regulation (EU) 2026/1744** to 2 Dec 2027 (Annex III) and 2 Aug 2028 (Annex I). — [AI Act Service Desk](https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act) (opened)

### Inferences
**How established is each shift?** These are my judgements, based on the evidence cited in Sections 1–7.

| Shift | Research status | Industry status | Evidence strength | Main disagreement |
|---|---|---|---|---|
| Continuous, feedback-driven RE (app reviews, usage data) | Mature (182 papers by 2020) | Feedback widely gathered; automated mining ad hoc (20-interview study) | Mostly lab evaluations; replication shows lower-than-reported effectiveness | Practical value and representativeness of mined feedback |
| CrowdRE | Agenda (2017), niche | No evidence found | Weak | — |
| Continuous experimentation as requirements validation | Reference models and practitioner book exist | Common in web/SaaS (inference; no adoption figure found) | Case studies, practitioner experience | Applicability beyond high-frequency-release products |
| Output → outcome / value-based RE | Discussed (e.g., RE'25 Wieringa keynote) | Mainstream product-management rhetoric (covered by other researcher) | — | — |
| RE for AI/ML (incl. data requirements) | Young, fast-growing (35 studies in 2021 → 43 in 2023; ~half of RE'25–'26 titles AI-related) | Emerging; regulatory pressure postponed to 2027–28 for high-risk | Small interview studies, mapping studies | Adapt old RE vs new methods; what a spec for ML is |
| Explainability as NFR | Established RE topic since 2019 (conference + journal + catalogue) | Unclear; related to, but not identical with, AI Act transparency | Surveys (n=107), SLR-based catalogue | Whether built-in explanations are needed |
| NLP4RE | Mature (404 studies) | Weak (7% industrially evaluated) | Lab-heavy | — |
| LLM support for RE | Explosive since 2023 (74 LLM studies in 2023–24; 238 GenAI studies 2019–25) | Near zero in production (1.3%) | Controlled, GPT-based, reproducibility issues | Optimism vs scepticism (Krishna/Hemmat vs Norheim/Cheng/Liao) |
| Human values and ethics | Recognised research topic; small share of SE research | Depends on organisational culture | Case studies (31 practitioners) | Generic methods vs culture |
| Sustainability | Manifesto (2015) + framework (SusAF 2020) | Little evidence found | Weak | — |
| Legal compliance (privacy, AI) | Long-standing (2008 →); now ML/LLM-assisted | Mandatory (GDPR since 2018; AI Act phased) | Method and tool papers, case studies | — |
| Accessibility | Standards-led | Mandatory in EU since 28 Jun 2025 (EAA); EN 301 549 v4.1.1 pending citation | — | — |
| SE: needs vs requirements; SysML v2 | Codified (NRM 2022/2025; SysML v2 2025) | Transition under way; no adoption data | Practitioner consensus documents | — |

- A requirements specialist should emphasise three "real" changes: (1) requirements are validated continuously against data after release; (2) for ML components, data and metric thresholds are requirements; (3) law and harmonised standards now supply much of the quality-requirements catalogue for privacy, accessibility and AI. LLM assistance is a research frontier, not yet established practice.

### Gaps
- No source quantifies industrial adoption for most shifts (CrowdRE, SusAF, values methods, SysML v2, LLM-assisted RE). The "Industry status" column therefore leans on qualitative studies and on absence of evidence.
- Primary EU legal texts on EUR-Lex were not openable with my tools. The AI Act dates come from the official Commission AI Act Service Desk page; the GDPR and EAA dates come from EUR-Lex and Commission snippets.
- I did not verify a full-text reading of several canonical works (Maalej et al. 2016; Groen et al. 2017; Berry 2022; Becker et al. 2016). Their descriptions are limited to title-level or abstract-level claims.
