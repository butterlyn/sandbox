# Requirements elicitation: techniques, classifications, stakeholders, tacit knowledge, selection and evidence

_Verification conventions: on 2026-10-23 every DOI below was resolved against the Crossref API (`api.crossref.org/works/<DOI>`), and its title and year were checked. Book, standard and framework links were opened unless marked **UNVERIFIED**. Where a claim rests only on Semantic Scholar's auto-generated summary of a paywalled abstract, it is marked "(S2 summary)". DOIs that contain parentheses are percent-encoded so the Markdown links work._

## Q1. What is the standard classification of elicitation techniques?

### Takeaway
There is no single standard taxonomy. The canonical academic scheme is Nuseibeh & Easterbrook's (2000) six classes: traditional, group, prototyping, model-driven, cognitive and contextual. The dominant practitioner scheme today is IREB CPRE's split (current syllabus v3.3.0, April 2026) into **gathering techniques** (questioning, collaboration, observation, artefact-based) and **design and idea-generating techniques** (creativity, prototyping, scenarios, storyboards), mapped onto Kano categories. Every major source agrees on two points: requirements are *elicited* (discovered and co-constructed), not "captured", and good practice combines several techniques.

### Cited Findings
**Early and academic classifications**
- Goguen & Linde surveyed and evaluated introspection, interviews, questionnaires, and protocol, conversation, interaction and discourse analysis, "paying particular attention to dealing with social issues". The last three come from ethnomethodology and sociolinguistics and "can elicit tacit knowledge by observing actual interactions in the workplace" (RE'93, pp. 152–164) — [Goguen & Linde 1993](https://doi.org/10.1109/ISRE.1993.324822)
- Byrd, Cossick & Zmud compared requirements-analysis techniques from information systems with knowledge-acquisition techniques from expert-systems research. They grouped them "according to elicitation mode, on three dimensions: communication obstacles, a technique's locus of control, and the nature of the understanding gained", and argued that the two research communities were unaware of each other's techniques (MIS Quarterly 16(1):117–138) — [Byrd et al. 1992](https://doi.org/10.2307/249704)
- Bickerton & Siddiqi classified RE methods by the *social assumptions* they make about organisations, using Lyotard's "metanarratives", and gave practitioners a decision table — [Bickerton & Siddiqi 1993](https://doi.org/10.1109/ISRE.1993.324819)
- Nuseibeh & Easterbrook's six classes (ICSE 2000 Future of Software Engineering, pp. 35–46) — [Nuseibeh & Easterbrook 2000](https://doi.org/10.1145/336512.336523):
  - *Traditional*: questionnaires and surveys, interviews, and analysis of existing documentation such as organisational charts, process models, standards and manuals.
  - *Group*: brainstorming, focus groups, and RAD/JAD workshops "with an unbiased facilitator", aiming "to foster stakeholder agreement and buy-in".
  - *Prototyping*: used "where there is a great deal of uncertainty about the requirements, or where early feedback from stakeholders is needed", and easily combined with other techniques.
  - *Model-driven*: goal-based methods (KAOS, i*) and scenario-based methods (CREWS).
  - *Cognitive*: techniques from knowledge acquisition for knowledge-based systems, namely protocol analysis (think-aloud), laddering, card sorting and repertory grids.
  - *Contextual*: ethnography and participant observation, ethnomethodology and conversation analysis, which emerged in the 1990s.
- The same paper says "elicitation" is preferred to "capture" "to avoid the suggestion that requirements are out there to be collected simply by asking the right questions". Choice of technique "depends on the time and resources available ... and ... the kind of information that needs to be elicited", and "technique-selection guidance is more appropriate than a rigid method". It notes that contextual and traditional/cognitive approaches are "incompatible" in their extreme forms but complementary in practice — [Nuseibeh & Easterbrook 2000](https://doi.org/10.1145/336512.336523)
- Zowghi & Coulin define elicitation as "the process of seeking, uncovering, acquiring, and elaborating requirements". They note that "requirements are elicited rather than just captured or collected", which implies "discovery, emergence, and development elements", and that the "relative strengths and weaknesses [of techniques] determine when each is appropriate depending on the context and situation" (chapter in Aurum & Wohlin (eds.), *Engineering and Managing Software Requirements*, Springer, pp. 19–46) — [Zowghi & Coulin 2005](https://doi.org/10.1007/3-540-28244-0_2)

**Practitioner and certification classifications (current status)**
- IREB's CPRE Foundation Level syllabus is at **version 3.3.0, dated April 1, 2026**. Version 3.0.0 (October 1, 2020) was the "second major update ... covering both plan-driven and agile approaches", and v3.1.0 followed on September 1, 2022. The v3 preamble describes "removing outdated content and adding new elements" — [IREB CPRE FL syllabus v3.3.0](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf)
- IREB FL v3.3.0 §4.2 says "A major point in elicitation is turning implicit demands, wishes, and expectations into explicit requirements". It uses the Kano model: delighters ("unconscious requirements"), satisfiers ("conscious") and dissatisfiers ("subconscious"). — [IREB CPRE FL syllabus v3.3.0](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf)
  - *Gathering techniques* "help to elicit satisfiers and dissatisfiers". They fall into four categories: questioning, collaboration, observation and artefact-based.
  - *Design and idea-generating techniques*, such as brainstorming, analogies, prototyping (e.g. mock-ups), scenarios and storyboards, plus design thinking (d.school, Designing for Growth), "may lead to new or innovative requirements that are often delighters".
  - It warns that "in practice, quality requirements and constraints often get less attention" and recommends ISO 25010 as a checklist.
- IREB's Requirements Elicitation syllabus v3.2.0 (June 18, 2024) gives exemplars for each category — [IREB CPRE Elicitation syllabus v3.2.0](https://hub.ireb.org/media/pages/resources/cpre-requirements-elicitation-syllabus/23fcc35767-1787040011/cpre_elicitation_syllabus_en_3.2.pdf):
  - questioning: interview, questionnaire
  - observation: field observation, apprenticing, contextual inquiry
  - collaboration: requirements workshops, crowd-based RE, living labs
  - artefact-based: system archaeology, perspective-based reading, reuse
  - idea-generating: brainstorming, analogy
  - design techniques: prototyping, scenarios, storyboards
  - "supporting techniques/thinking tools": abstraction levels, problems and goals, models, transformation effects, mind-mapping
- A text search of IREB FL v3.3.0 and the Elicitation syllabus v3.2.0 finds no mention of laddering, card sorting, repertory grids, protocol analysis, ethnography, focus groups or JAD. The "cognitive" family that Nuseibeh & Easterbrook list is absent from today's main certification syllabi — [IREB CPRE FL syllabus v3.3.0](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf); [IREB CPRE Elicitation syllabus v3.2.0](https://hub.ireb.org/media/pages/resources/cpre-requirements-elicitation-syllabus/23fcc35767-1787040011/cpre_elicitation_syllabus_en_3.2.pdf)
- IREB's glossary defines requirements elicitation as "The process of seeking, capturing and consolidating requirements from available sources, potentially including the re-construction or creation of requirements" — [IREB CPRE Glossary v2.2](https://hub.ireb.org/media/pages/resources/cpre-glossary/bb302c52fe-1787039949/ireb_cpre_glossary_en_2.2.pdf)
- IIBA's official BABOK page (fetched 2026-10-23) still presents the **BABOK® Guide v3** (with v3 errata) and "six core knowledge areas"; it shows no newer version — [IIBA BABOK page](https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/)
- IIBA's "Conduct Elicitation" task card describes the task as guiding and collaborating with stakeholders, doing research, or running experiments. These correspond to BABOK v3's collaborative, research and experiment types of elicitation. I saw this only in a search-engine summary because the PDF needs a member login — [IIBA task card — UNVERIFIED](https://www.iiba.org/contentassets/2eb176b7d4574a3693ba126742da3dd1/task-card-conduct-elicitation.pdf)
- Wiegers & Beatty's *Software Requirements*, 3rd ed. (Microsoft Press), was published 8/15/2013 (672 pp.). It is the standard practitioner textbook; its publisher page lists the 3rd edition as the current one I could find — [Wiegers & Beatty 2013](https://www.microsoftpressstore.com/store/software-requirements-9780735679665)

### Inferences
- Across sources the families converge:
  1. asking (interviews, questionnaires)
  2. group and collaborative work (workshops, focus groups, JAD)
  3. observing (ethnography, contextual inquiry, apprenticing)
  4. studying artefacts (documents, legacy systems, interfaces)
  5. provoking with representations (prototypes, scenarios, storyboards, models)
  6. creativity and idea generation
  7. cognitive or knowledge-acquisition techniques (laddering, card sort, repertory grid)
  8. a newer crowd- or data-driven family
- The main shift since 2000 is in the organising principle: from *how* a technique works (N&E) to *what kind of requirement it finds*. IREB pairs gathering techniques with Kano satisfiers and dissatisfiers, and design and idea-generating techniques with delighters. Cognitive techniques have largely dropped out of practitioner curricula.
- For a newcomer, a practical mental model is "gather what exists, provoke what doesn't". Use questioning, observation and artefacts for the known and the tacit, and prototypes, scenarios and creativity for the not-yet-imagined.

### Gaps
- I could not open the full Zowghi & Coulin chapter, so its detailed technique list is unverified (only the abstract was read).
- Wiegers & Beatty's internal classification of elicitation activities (e.g. facilitated versus independent techniques) is unverified because I had no access to the book text.
- The BABOK v3 technique count (often quoted as 50) and the official wording of its three elicitation types are unverified, since official IIBA material is behind a login.
- The older IREB v2.2 classification (pre-2020) was not checked, so the exact change from v2.2 to v3 is not documented here.
- SWEBOK's elicitation-technique list was not checked. Wagner et al. 2019 used it for their survey categories.

## Q2. What does the empirical evidence say about technique effectiveness and selection, about analyst experience and domain knowledge, and about what practitioners actually use?

### Takeaway
The effectiveness evidence is thin, old, largely unreplicated and drawn mostly from small experiments. The two systematic reviews (Davis et al. 2006; Dieste & Juristo 2011) conclude that interviews are among the most effective techniques and that cognitive and introspective techniques (card sorting, laddering, ranking, think-aloud) are generally no better. They find no clear effect of analyst experience. Domain knowledge cuts both ways, and mixed teams of domain-aware and domain-ignorant analysts look best. Technique selection should be situational, mixing several techniques. In practice, interviews, workshops or facilitated meetings, and prototyping dominate.

### Cited Findings
**Systematic reviews**
- Davis, Dieste, Hickey, Juristo & Moreno (RE'06, pp. 179–188) aggregated empirical studies and report four results — [Davis et al. 2006](https://doi.org/10.1109/RE.2006.17):
  1. "interviews, preferentially structured, appear to be one of the most effective elicitation techniques"
  2. "many techniques often cited in the literature, like card sorting, ranking or thinking aloud, tend to be less effective than interviews"
  3. "analyst experience does not appear to be a relevant factor"
  4. studies "have not found the use of intermediate representations during elicitation to have significant positive effects"
  The authors caution that the underlying studies "have not been replicated" and the findings are "preliminary".
- Dieste & Juristo (IEEE TSE 37(2):283–304) — [Dieste & Juristo 2011](https://doi.org/10.1109/TSE.2010.33):
  - identified 564 publications and selected 26, which contained 30 empirical studies testing 43 techniques against 50 response variables and giving 100 separate results;
  - meta-analysis "could not be applied", so they used adapted comparative analysis;
  - aggregation produced 17 "pieces of knowledge" about interviewing, laddering, sorting and protocol analysis, plus practitioner guidelines.
- Wagner et al. summarise Dieste & Juristo's guidelines as saying "especially unstructured interviews are more effective and output more complete information than introspective techniques or sorting techniques" — [Wagner et al. 2019](https://doi.org/10.1145/3306607)
- Dieste, Juristo & Shull's IEEE Software column brought this evidence to practitioners. It frames elicitation as follows: incremental and agile methods "mitigate the risks of getting the requirements wrong", but "the best way to develop a high-quality system with minimal effort is still to get the requirements right the first time" — [Dieste, Juristo & Shull 2008](https://doi.org/10.1109/MS.2008.53)
- Pacheco, García & Reyes (IET Software 12(4):365–378) reviewed literature from 1993 to 2015 and found 140 studies on which "mature" techniques are used and which improve effectiveness. They report which techniques are effective "taking into account the product..., the stakeholders' characteristics, the type of information obtained" — [Pacheco, García & Reyes 2018](https://doi.org/10.1049/iet-sen.2017.0144)

**Individual experiments often cited**
- Agarwal & Tanniru ran an experiment with senior managers comparing unstructured and structured knowledge-acquisition interviews, with structure taken from a domain model of decision-making. "Results indicate improved performance with the structured interviewing method" on efficiency and effectiveness (JMIS 7(1):123–140) — [Agarwal & Tanniru 1990](https://doi.org/10.1080/07421222.1990.11517884)
- Browne & Rogich found that a theory-based prompting technique drew "a greater quantity of requirements from users" than the "interrogatories" technique (who, what, when, where, how, why) and a semantic-questioning scheme (JMIS 17(4):223–249) — [Browne & Rogich 2001](https://doi.org/10.1080/07421222.2001.11045665)
- Boehm, Gray & Seewaldt had seven teams build the same 2,000–4,000-instruction product, four by specifying and three by prototyping. Prototyping gave "roughly equivalent performance, but with about 40 percent less code and 45 percent less effort", rated lower on functionality and robustness but higher on ease of use and learning. Specifying gave "more coherent designs and software that was easier to integrate" — [Boehm, Gray & Seewaldt 1984](https://doi.org/10.1109/TSE.1984.5010238)

**Technique selection**
- Maiden & Rugg's ACRE framework selects acquisition methods with questions drawn from "facets which define the strengths and weaknesses of each method". It was motivated by practitioners being "often unaware of the range of methods" and not foreseeing "the need to use several methods" (Software Engineering Journal 11(3):183ff.) — [Maiden & Rugg 1996](https://doi.org/10.1049/sej.1996.0024)
- Hickey & Davis interviewed "some of the world's most experienced analysts". Experienced analysts "seem to be more successful", and they select techniques "based on a variety of situational assessments". Less experienced analysts choose a technique because "it is the only one they know" or because it "worked well last time" (RE'03, pp. 169–178; Crossref mislabels the container but the DOI and title match) — [Hickey & Davis 2003](https://doi.org/10.1109/ICRE.2003.1232748)
- Hickey & Davis's unified model presents elicitation as iterative, "transform[ing] the current state of the requirements and the situation". It captures selecting a technique as a meta-process and stresses "the critical role played by situational knowledge" (*Journal of Management Information Systems* 20(4):65–84; **not** REJ, as the brief stated) — [Hickey & Davis 2004](https://doi.org/10.1080/07421222.2004.11045786)
- Carrizo, Dieste & Juristo target "the overselection of open interviews". Their selection framework is built from theory and empirical results, and from the authors' own expertise where evidence was missing. It "selects techniques other than open interview, offers a wider range of possible techniques and captures more requirements information", and is easy to extend (IST 56(6):644–669) — [Carrizo, Dieste & Juristo 2014](https://doi.org/10.1016/j.infsof.2014.01.009)
- IREB FL v3.3.0 says picking techniques "is a critical key competence" that depends on the type of system, the life-cycle model, the people involved and the organisational setup. It states that "the best results are usually achieved with a combination of different elicitation techniques" and cites Carrizo et al. 2014 as the systematic selection approach — [IREB CPRE FL syllabus v3.3.0](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf)

**Analyst experience and domain knowledge (contested)**
- Hadar, Soffer & Kenzi studied the perceived and actual effects of prior domain knowledge on interview-based elicitation (REJ 19(2):143–159, 2014; online 2012) — [Hadar, Soffer & Kenzi 2014](https://doi.org/10.1007/s00766-012-0163-2):
  - domain knowledge affects "communication with the customers and understanding their needs", with both positive and negative effects;
  - it had an actual effect on the course of the interviews;
  - they recommend "heterogeneous teams of analysts".
- Berry argued from his own successful RE engagements that his *ignorance* of the client's domain was a critical element of their success (JSS 28(2):179–184; S2 summary) — [Berry 1995](https://doi.org/10.1016/0164-1212%2894%2900054-Q)
- Niknafs & Berry ran a controlled experiment adding domain-ignorant analysts to an elicitation team. The results were "not conclusive" but showed "some support" for the claim that this improves effectiveness. Their rationale is that domain experts "can fall for tacit assumptions of the domain and might overlook issues" (RE'12, pp. 181–190) — [Niknafs & Berry 2012](https://doi.org/10.1109/RE.2012.6345802)
- The archival study's main conclusion is that a team mixing domain-ignorant and domain-aware analysts is more effective than one of domain-aware analysts only (EMSE 22(1):80–133; S2 summary) — [Niknafs & Berry 2017](https://doi.org/10.1007/s10664-015-9416-2)

**What practitioners use**
- The NaPiRE survey family covered 228 organisations in 10 countries (ACM TOSEM 28(2)). Answers to "How do you elicit requirements?" (N = 228) — [Wagner et al. 2019](https://doi.org/10.1145/3306607):
  - interviews: P = 0.73 [0.67, 0.79]
  - facilitated meetings, including workshops: 0.67 [0.61, 0.73]
  - prototyping: 0.58 [0.52, 0.64]
  - scenarios: 0.41 [0.34, 0.47]
  - observation: 0.29 [0.23, 0.35]

  The top three cannot be told apart statistically but are significantly more used than scenarios and observation. "Other" answers included personas, questionnaires and surveys, and "analysis of existing system". The authors note no strong differences between countries or regions.
- The same paper reports two earlier US surveys — [Wagner et al. 2019](https://doi.org/10.1145/3306607):
  - Neill & Laplante (2003): most respondents used scenarios and use cases, then focus groups and informal modelling, and 60% prototyped.
  - Kassab, Neill & Laplante (2014): brainstorming, interviews and user stories were the most mentioned, with workshops "only ... roughly 20%".
- Palomares et al. interviewed 24 practitioners at 12 Swedish IT companies (REJ 26(2):273–299) — [Palomares et al. 2021](https://doi.org/10.1007/s00766-020-00345-x):
  - "Group interaction techniques, including meetings and workshops, are the most popular", except in small projects.
  - Practitioners "use a variety of elicitation techniques in each project".
  - Customers are frequently involved "except in the case of market-driven organizations".
  - Technical staff are more involved than business or strategic staff.
  - Key challenges are understanding and prioritising stakeholder needs, with requirements instability "a predominant challenge".
- The first NaPiRE run (Germany, 58 companies) corroborated "communication flaws" and "moving targets" as statistically significant RE problems in practice — [Méndez Fernández & Wagner 2015](https://doi.org/10.1016/j.infsof.2014.05.008)
- Interview-focused studies routinely state that the interview is "the most commonly used technique" — [Hadar, Soffer & Kenzi 2014](https://doi.org/10.1007/s00766-012-0163-2); [Bano et al. 2019](https://doi.org/10.1007/s00766-019-00313-0)

### Inferences
- **Strength of evidence: low.** The reviews rely on few, small, unreplicated experiments, mostly measuring the *quantity* of information elicited in lab sessions rather than downstream requirements quality or project outcomes. Treat "interviews work best" as "interviews are a robust default", not as a proven ranking.
- **Where experts disagree:**
  - *Structured versus unstructured interviews.* Davis et al. 2006 say "preferentially structured" (supported by Agarwal & Tanniru 1990). Wagner et al.'s reading of Dieste & Juristo 2011 credits "especially unstructured interviews" over introspective and sorting techniques, and Carrizo et al. warn of *over*-use of open interviews. These partly compare different things: interviews against other families, versus variants within interviews.
  - *Experience.* Experiments show little effect, while experts (Hickey & Davis 2003) believe it matters. The likely explanation is that lab tasks and student subjects do not exercise the situational judgement that experience buys.
  - *Domain knowledge.* Conventional wisdom says more is better. The Berry line, partly backed by Hadar et al., says naive questioners surface tacit assumptions. The practical synthesis is to mix domain-aware and domain-ignorant analysts.
- **Practice and research agree** that the backbone is interviews, workshops and prototypes; observation is used less (about 29%) despite its value for tacit knowledge, probably because of cost.

### Gaps
- I could not read Dieste & Juristo's full list of 17 "pieces of knowledge", so details such as the conditions under which structured beats unstructured rest on the 2006 abstract and Wagner et al.'s summary.
- Pacheco et al. 2018's detailed rankings and "maturity" results were not verified beyond the abstract.
- I found no recent (post-2015) controlled comparison of elicitation techniques in an industrial setting.
- The attributes used in Carrizo et al.'s selection framework were not verified beyond the abstract.

## Q3. How are stakeholders identified and analysed?

### Takeaway
Consensus practice is as follows:
- identify stakeholder *roles* first, then individuals;
- start early and keep the list current;
- use checklists or role templates (Alexander's onion model) plus snowballing from initial stakeholders;
- prioritise roles by influence and by the risk of neglecting them (Glinz & Wieringa's critical, major and minor);
- choose representatives, or use personas for large or unknown user groups;
- include indirect, negative and regulatory stakeholders, and users who give feedback.

Scalable, data-driven identification (StakeRare) exists, but evaluations of identification methods are sparse.

### Cited Findings
- Nuseibeh & Easterbrook define stakeholders as "individuals or organisations who stand to gain or lose from the success or failure of a system" (customers or clients, developers, users). They note users are not homogeneous, so user classes (novice, expert, occasional, disabled) must be identified — [Nuseibeh & Easterbrook 2000](https://doi.org/10.1145/336512.336523)
- Sharp, Finkelstein & Galal observed that the literature "suggests examples of stakeholders, and categories of stakeholder, but does not provide help in identifying stakeholders for a specific system", and proposed such an approach (DEXA'99 workshops, pp. 387–391) — [Sharp, Finkelstein & Galal 1999](https://doi.org/10.1109/DEXA.1999.795198)
- Alexander & Robertson's onion model (IEEE Software 21(1):23–27) is centred on "the kit (our product)". Around it are "our system (sociotechnical)", which adds "generic slots for the people who operate and maintain the equipment", then "the containing system", then "the wider environment (mainly social)". Its role slots include normal operator, maintenance operator, help desk, functional beneficiary, political beneficiary, interfacing system, purchaser, regulator, developer and negative stakeholder (from the article text and figure) — [Alexander & Robertson 2004](https://doi.org/10.1109/MS.2004.1259199)
- Alexander's taxonomy is "product centric, with concentric 'circles'" containing generic "slots" subdivided into domain-specific "roles". It helps "ensure that key viewpoints are not missed", and he used it to reanalyse a popular template (IJTHI 1(1):23–59) — [Alexander 2005](https://doi.org/10.4018/jthi.2005010102)
- IREB's Elicitation syllabus lists "stakeholder categorization schemata (e.g. Alexander's onion model ... or the Robertsons' generic stakeholder map)" as identification aids, alongside stakeholder relationship management — [IREB CPRE Elicitation syllabus v3.2.0](https://hub.ireb.org/media/pages/resources/cpre-requirements-elicitation-syllabus/23fcc35767-1787040011/cpre_elicitation_syllabus_en_3.2.pdf)
- Glinz & Wieringa's guest editors' introduction (IEEE Software 24(2):18–20) — [Glinz & Wieringa 2007](https://doi.org/10.1109/MS.2007.42):
  - Definition: "A stakeholder is a person or organization who influences a system's requirements or who is impacted by that system".
  - "Stakeholder identification precedes any other RE activity", and roles are frequently used instead of individuals.
  - Negative stakeholders are included.
  - Roles are prioritised "into critical, major, and minor" according to "the risk we incur by ignoring or neglecting a stakeholder". If neglect "might kill the project or render the system useless" the role is critical; "significant negative impact" makes it major; "marginal impact" makes it minor.
  - Finally, one selects "representative individuals or groups" with whom to elicit and validate.
- IREB's glossary adopts the same stakeholder definition word for word — [IREB CPRE Glossary v2.2](https://hub.ireb.org/media/pages/resources/cpre-glossary/bb302c52fe-1787039949/ireb_cpre_glossary_en_2.2.pdf)
- IREB FL v3.3.0 — [IREB CPRE FL syllabus v3.3.0](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf):
  - Typical roles include users, sponsors, managers, developers, authorities and customers. People impacted by a system are "(indirect) stakeholders", and "users who provide feedback about a system in use" are stakeholders.
  - Identification should happen "at the beginning" and be managed "as a continuous activity", covering both roles and persons.
  - End users are grouped; representatives are chosen, or personas are defined "for representing the relevant end user groups".
  - Sources for finding stakeholders: checklists of typical roles, organisational structures, business-process documentation, market reports, and "initial stakeholders for identifying additional stakeholders".
  - A stakeholder list should record name, role, contact data, availability, relevance, area and extent of expertise, and goals and interests.
- From management theory, Mitchell, Agle & Wood's salience model (power, legitimacy, urgency) is the classic basis for prioritising stakeholders (Academy of Management Review 22(4):853–886) — [Mitchell, Agle & Wood 1997](https://doi.org/10.5465/amr.1997.9711022105)
- Pacheco & Garcia's systematic review of stakeholder-identification methods (1984–2011) concluded that existing approaches "still have serious limitations in terms of covering all aspects of stakeholder identification" (JSS 85(9):2171–2181; S2 summary) — [Pacheco & Garcia 2012](https://doi.org/10.1016/j.jss.2012.04.075)
- StakeRare (IEEE TSE 38(3):707–735) — [Lim & Finkelstein 2012](https://doi.org/10.1109/TSE.2011.36):
  - Method: it asks known stakeholders to recommend others, builds a social network, ranks stakeholders by network measures of "project influence", then uses collaborative filtering to recommend and prioritise requirements weighted by influence.
  - Evaluation: applied to a project for a 30,000-user system, with data from 87 stakeholders. It "predicts stakeholder needs accurately" and gives "a more complete and accurately prioritized list of requirements" than the project's existing method, "taking only a fraction of the time".
- Practice data: technical staff are involved in elicitation more often than business or strategic staff, and customers are frequently involved except in market-driven organisations — [Palomares et al. 2021](https://doi.org/10.1007/s00766-020-00345-x)

### Inferences
- The field's working consensus is the Glinz/IREB definition (influence *or* impact), the onion model as a checklist, risk-based prioritisation, and personas as stand-ins. Industry business-analysis practice adds power/interest-style salience grids derived from management theory (Mitchell et al.).
- For market-driven products, where the "customer" is anonymous, the literature points to personas, crowd feedback and usage data rather than named representatives (see Q8).
- Evidence quality is low. Identification methods are mostly argued from experience; StakeRare is the rare quantitative evaluation, and it covers one project.

### Gaps
- Sharp et al.'s specific procedure (the categories of "baseline" stakeholders and how to expand from them) could not be verified because UCL's open-access copy returned HTTP 403. Only the abstract was read.
- I did not verify which "popular template" Alexander 2005 reanalysed, or exactly how each onion role maps to each layer.
- I found no comparative empirical evaluation of stakeholder-identification templates (onion model versus others).

## Q4. How does the literature treat tacit knowledge and "unknown unknowns"?

### Takeaway
Tacit knowledge, meaning what stakeholders know but do not or cannot say, is treated as the central hard problem of elicitation. The literature's answers are:
- observe work in context (ethnomethodology, contextual inquiry, apprenticing);
- provoke with prototypes and scenarios;
- treat ambiguity in interviews as a *cue* to unspoken knowledge;
- include naive questioners;
- train interviewers, because novices make systematic mistakes.

"Unknown unknowns" are acknowledged as unsolved. Most of this work is conceptual or qualitative, with little controlled evidence.

### Cited Findings
- Christel & Kang's SEI report grouped elicitation problems into problems of **scope** (system boundaries), **understanding** among the communities affected, and **volatility** of requirements. It argued that most techniques and tools focused on specification rather than elicitation — [Christel & Kang 1992](https://doi.org/10.21236/ADA258932)
- Goguen & Linde: conversation, interaction and discourse analysis "can elicit tacit knowledge by observing actual interactions in the workplace" — [Goguen & Linde 1993](https://doi.org/10.1109/ISRE.1993.324822)
- Gervasi et al. note that tacit knowledge "allows people to communicate effectively without ... mak[ing] everything ... explicit" provided understanding is shared; otherwise "confusion and misunderstanding will ensue", and "tacit requirements knowledge may lead to software that fails to satisfy the customer's requirements". They review views from many disciplines and propose "a conceptual framework for requirements engineering that characterises the different facets of tacit knowledge" (in Maalej & Thurimella (eds.), *Managing Requirements Knowledge*, Springer, pp. 23–47) — [Gervasi et al. 2013](https://doi.org/10.1007/978-3-642-34419-0_2)
- Sutcliffe & Sawyer review elicitation through a framework of the "relative 'knowness'" of requirements combined with Common Ground discourse theory (RE'13, pp. 92–104). They conclude that "elicitation techniques appear to be relatively mature" while creative requirements are an emerging area. They propose a roadmap contrasting green-field domains (few existing solutions) with brown-field domains, and end by discussing whether elicitation can tackle "'unknown unknown' requirements". The brief's DOI was wrong; the correct one is 10.1109/RE.2013.6636709 — [Sutcliffe & Sawyer 2013](https://doi.org/10.1109/RE.2013.6636709)
- A follow-up case elicited a causal model of early dementia signs from clinical experts using a Delphi-style process of workshops plus questionnaire. Terminology problems and "limited consensus among the experts" forced adaptations, and the implications are discussed as "unknown unknowns" (REJ 25(1):1–20; online 2018) — [Sutcliffe et al. 2020](https://doi.org/10.1007/s00766-018-0301-6)
- Ferrari, Spoletini & Gnesi analysed 34 customer–analyst interviews (REJ 21(3):333–355) — [Ferrari, Spoletini & Gnesi 2016](https://doi.org/10.1007/s00766-016-0249-3):
  - They categorise ambiguity into "four main sub-phenomena, namely unclarity, multiple understanding, incorrect disambiguation and correct disambiguation".
  - They define tacit knowledge as "knowledge that a customer has but does not pass to the analyst for any reason".
  - They found that "rather than an obstacle, the occurrence of an ambiguity is often a *resource* for discovering tacit knowledge".
- A companion paper derived a handbook of linguistic **cues** in customers' speech that signal likely ambiguity, again from 34 interviews (RE'16, pp. 56–65) — [Ferrari, Spoletini & Gnesi RE'16](https://doi.org/10.1109/RE.2016.25)
- Bano et al.'s RE'18 study (110 students in 28 groups, role-playing interviews with a customer) found "34 unique mistakes classified into 7 high level themes" — [Bano et al. 2018](https://doi.org/10.1109/RE.2018.00027)
- The REJ extension added a second cohort of 138 students in 34 groups (REJ 24(3):259–289) — [Bano et al. 2019](https://doi.org/10.1007/s00766-019-00313-0):
  - The seven themes are question formulation, question omission, interview order, communication skills, analyst behaviour, customer interaction, and teamwork and planning.
  - Students "struggled mostly in the areas of question formulation, question omission and interview order and did not manage to improve their skills throughout the three interviews".
- Niknafs & Berry: domain-aware analysts "can fall for tacit assumptions of the domain and might overlook issues that are obvious to domain experts" — the rationale for adding domain-ignorant analysts — [Niknafs & Berry 2012](https://doi.org/10.1109/RE.2012.6345802)
- IREB FL v3.3.0 builds this into its basic teaching:
  - "Most stakeholders do not talk about the obvious: their 'subconscious' requirements", so other sources such as legacy systems, process documents and regulations must be used.
  - Gathering techniques target satisfiers and dissatisfiers, while design and idea-generating techniques target unconscious "delighters".
  — [IREB CPRE FL syllabus v3.3.0](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf)
- IREB's contextual-inquiry "Partnership" principle says to "ask them about their work and engage them in uncovering unarticulated aspects of work" — [IREB CPRE Elicitation syllabus v3.2.0](https://hub.ireb.org/media/pages/resources/cpre-requirements-elicitation-syllabus/23fcc35767-1787040011/cpre_elicitation_syllabus_en_3.2.pdf)

### Inferences
- The field's practical answer is triangulation. Pair asking (interviews) with observing (contextual inquiry or apprenticing) and provoking (prototypes, scenarios). Listen for ambiguity, and use a mix of domain-aware and naive analysts.
- "Unknown unknowns" are effectively deferred to iteration and feedback: incremental delivery, prototypes and usage data. No elicitation technique is shown to reliably surface them.
- Interviewing is a learnable skill with predictable failure modes. Bano et al.'s taxonomy of mistakes is a usable checklist for a newcomer: prepare questions, do not omit key topics, order the interview sensibly, and manage rapport.

### Gaps
- I found no controlled evidence that any specific technique reliably surfaces tacit knowledge better than others. The evidence is conceptual (Gervasi; Sutcliffe & Sawyer) or qualitative (Ferrari; Bano).
- The exact categories in Sutcliffe & Sawyer's "knowness" framework and in Gervasi et al.'s facets were not verified beyond their abstracts.
- Maiden & Rugg's ACRE knowledge-type facets, often cited for tacit versus non-tacit knowledge, were not verified beyond the abstract.

## Q5. What do the social, ethnographic and user-centred traditions contribute?

### Takeaway
From the early 1990s, sociologists and HCI researchers reframed elicitation as understanding *work practice in context* rather than asking users for features. This produced:
- ethnography in RE (Sommerville and colleagues);
- conversation and discourse analysis (Goguen & Linde);
- contextual inquiry and apprenticing (Beyer & Holtzblatt);
- scenario-based design (Carroll);
- personas (Cooper; Pruitt & Grudin);
- participatory design;
- the ISO 9241-210 human-centred design process.

These now form the "observation" and "design" families in practitioner syllabi, but observation remains comparatively little used because it is costly.

### Cited Findings
- Goguen classified social issues in RE by the groups involved: within the client organisation, within the requirements team, between client and requirements team, and within the development team. This is a two-page RE'93 contribution; the substantive paper is Goguen & Linde — [Goguen 1993](https://doi.org/10.1109/ISRE.1993.324858)
- Sommerville et al. reported a project in which sociologists conducted "an ethnographic analysis of the activity of air-traffic control", used to develop a prototype flight-database interface. They discuss sociologists' contribution to RE and tool support for integrating ethnographic observations (RE'93, pp. 165–173) — [Sommerville et al. 1993](https://doi.org/10.1109/ISRE.1993.324821)
- Hughes et al. argue that industrial development "has to recognise the social dimension of work". They propose presenting ethnographic material through viewpoints in a hypertext tool so it can be systematically incorporated into requirements (RE'95, pp. 27–34) — [Hughes et al. 1995](https://doi.org/10.1109/ISRE.1995.512543)
- Viller & Sommerville's "Coherence" method fuses ethnographically informed design with viewpoint-oriented RE to integrate social analysis into the design process (IJHCS 53(1):169–196; S2 summary) — [Viller & Sommerville 2000](https://doi.org/10.1006/ijhc.2000.0370)
- Beyer & Holtzblatt argued that "traditional interviewing and surveying techniques are not adequate for designing today's applications". It is "the relationship between designers and customers that determines how well the design team understands the customer problem", hence the master–apprentice stance of contextual inquiry (CACM 38(5):45–52) — [Beyer & Holtzblatt 1995](https://doi.org/10.1145/203356.203365)
- *Contextual Design*: the 1st edition is H. Beyer & K. Holtzblatt, *Contextual Design: Defining Customer-Centered Systems*, Morgan Kaufmann, 1998, as given in IREB's reference list ([IREB CPRE Elicitation syllabus v3.2.0](https://hub.ireb.org/media/pages/resources/cpre-requirements-elicitation-syllabus/23fcc35767-1787040011/cpre_elicitation_syllabus_en_3.2.pdf)). The 2nd edition, *Contextual Design: Design for Life* (Holtzblatt & Beyer, Morgan Kaufmann/Elsevier), is dated November 16, 2016 and is the "Latest edition" — [Holtzblatt & Beyer 2016](https://shop.elsevier.com/books/contextual-design/holtzblatt/978-0-12-800894-2)
- IREB teaches contextual inquiry with Beyer & Holtzblatt (1998) as its source. CI is "an iterative, field data-gathering technique" that examines "a few carefully selected users in depth" — [IREB CPRE Elicitation syllabus v3.2.0](https://hub.ireb.org/media/pages/resources/cpre-requirements-elicitation-syllabus/23fcc35767-1787040011/cpre_elicitation_syllabus_en_3.2.pdf):
  - It rests on four principles: context, partnership, interpretation and focus.
  - Apprenticing is "a short hands-on training" in which subject-matter experts teach the requirements engineer.
- Carroll's scenario-based design defines a scenario as "a concrete story about use". It manages design complexity by "concretization" rather than abstraction: "Instead of designing software by listing requirements, functions, and code modules, the designer focuses first on the activities that need to be supported" (*Making Use*, MIT Press) — [Carroll 2000](https://doi.org/10.7551/mitpress/4398.001.0001)
- Potts, Takahashi & Antón's Inquiry Cycle is a conversation-metaphor model for discussing requirements, pinpointing "where and when information needs occur", from elicitation through refinement (IEEE Software 11(2):21–32) — [Potts, Takahashi & Antón 1994](https://doi.org/10.1109/52.268952)
- Personas originate in Cooper's *The Inmates Are Running the Asylum*. The publisher page shows the 2nd edition (Sams, 2004), whose contents include a "Personas" section — [Cooper 2004](https://www.informit.com/store/inmates-are-running-the-asylum-why-high-tech-products-9780672326141)
- Pruitt & Grudin extended Cooper's technique over three years of use. They argue personas "engage team members very effectively", carry "a broad range of qualitative and quantitative data", and are "more engaging than design based primarily on scenarios" (DUX 2003, pp. 1–15) — [Pruitt & Grudin 2003](https://doi.org/10.1145/997078.997089)
- IREB FL v3.3.0 endorses personas as substitutes when a role has too many individuals or the individuals are unknown — [IREB CPRE FL syllabus v3.3.0](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf)
- Kensing & Blomberg characterise participatory design as a maturing research area and evolving practice. They identify three main issues: "the politics of design; the nature of participation; and method, tools and techniques for participation", plus the sustainability of participatory design within organisations (CSCW journal 7(3–4):167–185) — [Kensing & Blomberg 1998](https://doi.org/10.1023/A:1008689307411)
- ISO 9241-210:2019 (*Ergonomics of human-system interaction — Part 210: Human-centred design for interactive systems*), edition 2 (2019), is the current international standard for human-centred design across the life cycle of interactive systems. Search-index summaries of the ISO page also say it was "last reviewed and confirmed in 2025", which I could not confirm directly. **UNVERIFIED** as a fetch: iso.org blocks automated access, so title and edition were confirmed only via the search index — [ISO 9241-210:2019](https://www.iso.org/standard/77520.html)
- Coughlan & Macredie argue that "socially oriented methodologies provide more support for user involvement in design than the rigidity of more traditional methods". They appraise four methodologies with a four-dimensional communication framework (REJ 7(2):47–60) — [Coughlan & Macredie 2002](https://doi.org/10.1007/s007660200004)
- Nuseibeh & Easterbrook describe the arrival of contextual techniques as part of "a blistering attack on the attempt to build disembodied models of cognition" — [Nuseibeh & Easterbrook 2000](https://doi.org/10.1145/336512.336523)
- In NaPiRE, observation is used by only 29% of respondents; the authors suggest it is "probably often the most difficult and time-consuming way" to understand viewpoints — [Wagner et al. 2019](https://doi.org/10.1145/3306607)

### Inferences
- The lasting contribution is the stance that requirements are embedded in social and work practice. Users cannot simply report their needs, so the analyst must go where the work happens: contextual inquiry and apprenticing, scenarios and personas as shared representations, and participation as a political and ethical matter, not just a source of information.
- The tension with formal RE (N&E's "incompatible in their extreme forms") is now mostly resolved pragmatically. Ethnographic insight feeds scenarios and personas, which in turn feed specifications.

### Gaps
- I found no live publisher page for the 1998 first edition of *Contextual Design* (bibliographic details come from IREB's reference list) or for the 1999 first edition of Cooper's book. IREB itself cites Cooper's 2004 edition. Links point to the later editions.
- I found no quantitative data on how often contextual inquiry specifically (as opposed to "observation") is used in industry.
- Schuler & Namioka's *Participatory Design* (1993) was not checked. Kensing & Blomberg is used as the participatory-design reference.

## Q6. What about creativity- and innovation-oriented elicitation (creativity workshops, design thinking, Jobs-to-be-Done)?

### Takeaway
Creativity-oriented RE (Maiden and colleagues' creativity workshops; Mich and Berry's EPMcreate) recasts elicitation as *inventing* requirements, mainly through facilitated workshops built on brainstorming, constraint removal and analogical reasoning. Design thinking and Jobs-to-be-Done have entered RE from product management. All three are endorsed in practice (IREB's design and idea-generating techniques produce "delighters"), but the evidence is mainly case studies and experience reports from a few research groups.

### Cited Findings
- Maiden, Gizikis & Robertson argued that "Requirements engineering isn't recognized as a creative process". They applied creativity techniques, underpinned by theories such as "analogical reasoning from cognitive science", to air traffic management, "a naturally conservative domain", and report results and lessons learned (IEEE Software 21(5):68–75) — [Maiden, Gizikis & Robertson 2004](https://doi.org/10.1109/MS.2004.1331305)
- Maiden & Robertson describe RESCUE, a scenario-driven RE process whose workshops "integrate creativity techniques with different types of use case and system context modeling". The workshops were used for MSP, a future European airspace-planning system, and "provided new and important outputs" (RE'05, pp. 105–114) — [Maiden & Robertson 2005](https://doi.org/10.1109/RE.2005.34)
- Lemos et al.'s mapping study of 46 papers found "four main research groups" working on creativity in RE. Elicitation is "the phase concentrating the majority of studies", and the study "confirms that creativity techniques enhance creative thinking". Creative thinking still needs to be "fully integrated" into RE processes, methods and tools (ACM SAC 2012, pp. 1083–1088) — [Lemos et al. 2012](https://doi.org/10.1145/2245276.2231945)
- EPMcreate is a 16-step creativity technique built on combinations of two stakeholders' viewpoints. An experiment comparing two four-step variants found preliminary evidence that the lighter variant is "at least as feasible and effective", and proposed Kano categories to rate the innovativeness of ideas (EmpiRE'18) — [Herrmann, Mich & Berry 2018](https://doi.org/10.1109/EmpiRE.2018.00008)
- IREB says design and idea-generating techniques "aim at creating ideas for solving a problem and at exploring design ideas" and yield "often delighters". It names design thinking (d.school; Designing for Growth) as the broader concept — [IREB CPRE FL syllabus v3.3.0](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf)
- IREB's Elicitation syllabus notes that outside RE "the broader term design techniques has emerged", subsuming creativity techniques. It lists "preconditions for creativity", noting creativity "arises not by command, but by chance" — [IREB CPRE Elicitation syllabus v3.2.0](https://hub.ireb.org/media/pages/resources/cpre-requirements-elicitation-syllabus/23fcc35767-1787040011/cpre_elicitation_syllabus_en_3.2.pdf)
- Hehn, Mendez, Uebernickel, Brenner & Broy "suggest three approaches for tailoring and integrating design thinking and requirements engineering with complementary synergies" and point to open challenges. The paper draws on the authors' research and project experience (IEEE Software 37(2):25–31) — [Hehn et al. 2020](https://doi.org/10.1109/MS.2019.2957715)
- A systematic mapping study of how design thinking has been used and integrated into software-development activities appeared in JSS 187 (only title and venue verified) — [Parizi et al. 2022](https://doi.org/10.1016/j.jss.2022.111217)
- **Jobs-to-be-Done.** Christensen, Hall, Dillon & Duncan's HBR article "Know Your Customers' 'Jobs to Be Done'" (September 2016; title and authors verified on the HBR page) is the canonical popular statement — [Christensen et al. 2016](https://hbr.org/2016/09/know-your-customers-jobs-to-be-done)
- Ulwick's *What Customers Want: Using Outcome-Driven Innovation to Create Breakthrough Products and Services* (McGraw-Hill, published August 16, 2005) is the methodological source of JTBD's "outcome-driven innovation" strand — [Ulwick 2005](https://www.mheducation.com/highered/mhp/product/what-customers-want-using-outcome-driven-innovation-create-breakthrough-products-services.html)
- JTBD in RE research (REFSQ 2018, pp. 227–243) — [Lucassen et al. 2018](https://doi.org/10.1007/978-3-319-77243-1_14):
  - "Goal orientation is an unrealized promise in the practice of" RE, whereas user stories are widely adopted.
  - Job stories (situation, motivation, expected outcome) "have not been studied in research yet".
  - The authors propose a method for "Jobs-to-be-Done Oriented RE" and apply it to one industry case.
- An experience report from a student Scrum project says "JTBD has not been widely adopted in software engineering yet". It found that a Job Map alongside a Story Map helped "identify the actual user ... and understand what the user really wants to achieve" (D4RE 2020) — [Settelen, Seyff & Hess 2020](https://doi.org/10.1109/D4RE51199.2020.00006)

### Inferences
- Creativity techniques are the accepted way to elicit innovative requirements ("delighters"). Gathering techniques alone tend to reproduce the status quo, which is why IREB separates the two families.
- Design thinking and JTBD are best understood as *problem-framing* front ends to RE: they discover needs and desired outcomes before specification. RE research has absorbed them conceptually, but rigorous evaluation is scarce (experience reports, single cases).
- Strength of evidence: low to moderate. There is consistent qualitative support from a handful of groups (Maiden et al.; Mich and Berry; Lemos et al. counted four main groups), but few independent replications.

### Gaps
- I could not read the three design-thinking/RE integration approaches named in Hehn et al. 2020 (abstract only).
- I found no controlled comparison of creativity workshops with conventional elicitation in industry, beyond case reports.
- Results of the Parizi et al. 2022 mapping study were not verified (title and venue only).

## Q7. Which collaborative workshop techniques are now common in industry, and are they empirically evaluated?

### Takeaway
Facilitated workshops are the second most-used elicitation technique (67% in NaPiRE) and the most popular family in Palomares et al.'s Swedish sample. The lineage runs from JAD/RAD workshops through Gottesdiener's requirements workshops (2002) to today's agile formats: User Story Mapping (Patton 2014), Impact Mapping (Adzic 2012), EventStorming (Brandolini) and Example Mapping (Wynne 2015). These modern formats come from practitioners and are almost unevaluated. The notable exception is an RE'21 longitudinal study of Example Mapping.

### Cited Findings
- Nuseibeh & Easterbrook list RAD/JAD workshops ("consensus-building workshops with an unbiased facilitator") as a core group technique — [Nuseibeh & Easterbrook 2000](https://doi.org/10.1145/336512.336523)
- Davidson's field study of JAD in practice found that the organisations "realized modest improvements in systems development outcomes", and that the way JAD was used at the research sites reduced its potential effectiveness (JSS 45(3):215–223; S2 summary) — [Davidson 1999](https://doi.org/10.1016/S0164-1212%2898%2910080-8)
- Gottesdiener's *Requirements by Collaboration: Workshops for Defining Needs* was published April 10, 2002 by Addison-Wesley Professional; it is out of print, with an eBook still sold — [Gottesdiener 2002](https://www.informit.com/store/requirements-by-collaboration-workshops-for-defining-9780201786064)
- IREB cites Gottesdiener for "workshop is an umbrella term for group-oriented techniques", with formats ranging "from small informal meetings to organized events with several hundred stakeholders" — [IREB CPRE Elicitation syllabus v3.2.0](https://hub.ireb.org/media/pages/resources/cpre-requirements-elicitation-syllabus/23fcc35767-1787040011/cpre_elicitation_syllabus_en_3.2.pdf)
- In NaPiRE, facilitated meetings including workshops were used by 67% (P = 0.67 [0.61, 0.73]) — [Wagner et al. 2019](https://doi.org/10.1145/3306607)
- In Palomares et al., meetings and workshops were the most popular technique family, except in small projects — [Palomares et al. 2021](https://doi.org/10.1007/s00766-020-00345-x)
- **User Story Mapping**: Jeff Patton (with Peter Economy), *User Story Mapping: Discover the Whole Story, Build the Right Product*, O'Reilly, 2014. Publisher, year and co-author were confirmed via a library catalogue record; the O'Reilly page blocks automated fetch — [Patton 2014 — UNVERIFIED link](https://www.oreilly.com/library/view/user-story-mapping/9781491904893/)
- **Impact Mapping**: Gojko Adzic, *Impact Mapping: Making a Big Impact with Software Products and Projects*, Provoking Thoughts, 1 October 2012 — [Adzic 2012](https://www.impactmapping.org/book.html)
- **EventStorming**: Alberto Brandolini, *Introducing EventStorming: An Act of Deliberate Collective Learning*, Leanpub. As of 2026-10-23 the page says "This book is 70% complete", last updated 2021-08-26. The canonical source is therefore an unfinished, self-published book — [Brandolini, Introducing EventStorming](https://leanpub.com/introducing_eventstorming)
- **Example Mapping**: Matt Wynne, "Introducing Example Mapping", Cucumber blog, December 8, 2015. It is a conversation held "before you pull a user story into development" to "clarify and confirm the acceptance criteria" — [Wynne 2015](https://cucumber.io/blog/bdd/example-mapping-introduction/)
- Berends & Dalpiaz evaluated Example Mapping (RE'21, pp. 345–355) — [Berends & Dalpiaz 2021](https://doi.org/10.1109/RE51729.2021.00038):
  - They observe that techniques "frequently presented by consultants and agile trainers" are "not evaluated in a rigorous manner".
  - Example Mapping is a "time-boxed workshop in which people from different disciplines work collaboratively in order to refine ... a user story with the use of examples".
  - They studied it in two longitudinal case studies using a new survey instrument (the Refinement Evaluation Tool).
  - Example Mapping "contributes to the shared understanding within a team", provided user stories are not too small, and "two sessions are generally necessary" to use it effectively.
- A systematic mapping study plus practitioner survey found that User Story Mapping and scenarios "are key tools in requirements specification" and that "using them complementarily enhances accuracy and clarity". This is survey-based (self-reported) evidence (CCIS, pp. 228–241) — [Alegretti, Panizzi & Antonelli 2025](https://doi.org/10.1007/978-3-032-00718-6_15)
- I found no peer-reviewed empirical evaluation of EventStorming or Impact Mapping as elicitation techniques. Searches returned only teaching experience reports and a master's thesis. Several EventStorming studies combine it with LLMs, which is out of scope here and was not pursued.

### Inferences
- Modern agile workshop formats are best seen as **facilitated, visual, collaborative modelling**:
  - story maps structure user activities and releases;
  - impact maps link goals → actors → impacts → deliverables;
  - EventStorming builds a timeline of domain events;
  - Example Mapping covers rules, examples and questions per story.
  They inherit JAD's logic (cross-functional group, facilitator, shared artefact) and add shared understanding as an explicit goal.
- Their popularity rests on practitioner advocacy, not evidence. Berends & Dalpiaz 2021 is a rare rigorous evaluation, and even it is two case studies.

### Gaps
- I found no source documenting the origin of JAD (IBM, late 1970s is the usual claim) that I could open.
- I found no adoption statistics for story mapping, impact mapping, EventStorming or Example Mapping specifically. NaPiRE does not ask about them.
- I found no controlled study comparing these formats with traditional requirements workshops.

## Q8. Where do newer sources of requirements (app reviews, user feedback, usage data, the crowd) fit in the elicitation landscape?

### Takeaway
Since about 2013, RE has added *indirect* elicitation from large volumes of user-generated and machine-generated data. These sources are app-store reviews, social media and feedback (explicit), and usage logs, error data and sensor data (implicit), collectively called "crowd-based RE" or "data-driven RE". IREB now classes crowd-based RE as a collaboration technique. Research shows it complements stakeholder-based elicitation but rarely yields ready-to-use requirements. These trends are covered in depth by another researcher.

### Cited Findings
- Pagano & Maalej's exploratory study analysed "over one million reviews from the Apple AppStore" (RE'13, pp. 125–134) — [Pagano & Maalej 2013](https://doi.org/10.1109/RE.2013.6636712):
  - Most feedback comes "shortly after new releases".
  - Reviews mix topics such as "user experience, bug reports, and feature requests".
  - Quality ranges "from helpful advices and innovative ideas to insulting offenses".
  - Negative feedback "typically ... misses context details".
- Maalej, Nayebi, Johann & Ruhe describe a shift "toward data-driven user-centered identification, prioritization, and management of software requirements" that uses both explicit feedback (app stores, social media) and implicit feedback ("usage data, error logs, and sensor data") (IEEE Software 33(1):48–54) — [Maalej et al. 2016](https://doi.org/10.1109/MS.2015.153)
- Groen et al. present crowd-based RE as turning elicitation into "a participatory effort" that emphasises users and manages requirements via "a continuous flow of user feedback and monitoring data". It requires automated analysis (IEEE Software 34(2):44–52) — [Groen et al. 2017](https://doi.org/10.1109/MS.2017.33)
- Dąbrowski et al.'s systematic review covers 182 papers (2012–2020) on analysing app reviews for software engineering, including requirements (EMSE 2022) — [Dąbrowski et al. 2022](https://doi.org/10.1007/s10664-021-10065-7)
- Lim, Henriksson & Zdravkovic reviewed data-driven elicitation from 1,848 hits narrowed to 68 papers (SN Computer Science 2(1)) — [Lim, Henriksson & Zdravkovic 2021](https://doi.org/10.1007/s42979-020-00416-4):
  - Existing work "primarily focuses on utilizing human-sourced data, especially online reviews", processed with supervised machine learning.
  - Outcomes "often result in mere identification and classification of requirements-related information ... without eliciting requirements in a ready-to-use form".
  - Process-mediated and machine-generated data remain under-used.
- IREB's Elicitation syllabus lists crowd-based RE as a collaboration technique drawing on "explicit data (e.g. feedback, reviews) as well as implicit data (e.g. usage data, defect logs)" — [IREB CPRE Elicitation syllabus v3.2.0](https://hub.ireb.org/media/pages/resources/cpre-requirements-elicitation-syllabus/23fcc35767-1787040011/cpre_elicitation_syllabus_en_3.2.pdf)
- IREB FL says users who give feedback on a system in use count as stakeholders — [IREB CPRE FL syllabus v3.3.0](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf)
- Sutcliffe & Sawyer already observed (2013) growth in NL tools such as "text mining and IR" and in "social collaboration support" for elicitation — [Sutcliffe & Sawyer 2013](https://doi.org/10.1109/RE.2013.6636709)

### Inferences
- In the classification, these are a new *source* of requirements (the crowd and the running system) rather than a new conversation technique. They suit market-driven products with large user bases and existing releases (brown-field), and they complement rather than replace interviews, workshops and observation, especially for new (green-field) systems.

### Gaps
- Out of scope here: adoption rates, tool support and current automation trends, which belong to the trends researcher. I did not research LLM-based elicitation, which is excluded by the review's scope.

## Q9. Which 10–15 works matter most, what is the consensus, and what remains open?

### Takeaway
The canon for "collecting requirements" has four parts. Three foundational surveys (Goguen & Linde; Nuseibeh & Easterbrook; Zowghi & Coulin) define the field. One research programme on evidence and selection follows (Davis/Dieste/Juristo/Hickey/Carrizo). Stakeholder theory comes from Glinz & Wieringa and Alexander. The tacit-knowledge strand runs from Goguen through Sutcliffe & Sawyer to Ferrari et al. These are complemented by the contextual, creativity and practitioner traditions and by IREB's current syllabus. Consensus is strong on principles and weak on evidence.

### Cited Findings
**The 15 most important works (ranked roughly by importance to a newcomer)**
1. **Nuseibeh, B. & Easterbrook, S. (2000).** "Requirements engineering: a roadmap." *Proc. Conf. on the Future of Software Engineering (ICSE 2000)*, ACM, pp. 35–46. The most-cited taxonomy (six technique classes), the "elicitation not capture" principle, and selection guidance over rigid methods — [Nuseibeh & Easterbrook 2000](https://doi.org/10.1145/336512.336523)
2. **Zowghi, D. & Coulin, C. (2005).** "Requirements elicitation: a survey of techniques, approaches, and tools." In Aurum & Wohlin (eds.), *Engineering and Managing Software Requirements*, Springer, pp. 19–46. The standard survey chapter and definition; technique fit is situational — [Zowghi & Coulin 2005](https://doi.org/10.1007/3-540-28244-0_2)
3. **Goguen, J.A. & Linde, C. (1993).** "Techniques for requirements elicitation." *Proc. IEEE Int. Symposium on Requirements Engineering (RE'93)*, pp. 152–164. The first social-science-informed evaluation of techniques; it introduced conversation, interaction and discourse analysis as routes to tacit knowledge — [Goguen & Linde 1993](https://doi.org/10.1109/ISRE.1993.324822)
4. **IREB (2026).** *CPRE Foundation Level Syllabus v3.3.0* (with the *Requirements Elicitation syllabus v3.2.0*, 2024). The current practitioner consensus: gathering versus design and idea-generating techniques, Kano mapping, stakeholder lists and personas, and selection factors — [IREB CPRE FL syllabus v3.3.0](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf)
5. **Davis, A., Dieste, O., Hickey, A., Juristo, N. & Moreno, A.M. (2006).** "Effectiveness of requirements elicitation techniques: empirical results derived from a systematic review." *RE'06*, IEEE, pp. 179–188. With its extension, **Dieste, O. & Juristo, N. (2011)**, "Systematic review and aggregation of empirical studies on elicitation techniques", *IEEE TSE* 37(2):283–304 ([link](https://doi.org/10.1109/TSE.2010.33)). This is the evidence base: interviews among the most effective, cognitive techniques no better, experience not shown to matter, and the evidence unreplicated — [Davis et al. 2006](https://doi.org/10.1109/RE.2006.17)
6. **Hickey, A.M. & Davis, A.M. (2004).** "A unified model of requirements elicitation." *Journal of Management Information Systems* 20(4):65–84 (with the RE'03 study of how experts select techniques). Elicitation as an iterative, situational process with technique selection as a meta-process. The brief's "REJ 2004" is incorrect — [Hickey & Davis 2004](https://doi.org/10.1080/07421222.2004.11045786)
7. **Carrizo, D., Dieste, O. & Juristo, N. (2014).** "Systematizing requirements elicitation technique selection." *Information and Software Technology* 56(6):644–669. An evidence-based selection framework countering over-reliance on open interviews; IREB cites it as *the* selection approach — [Carrizo, Dieste & Juristo 2014](https://doi.org/10.1016/j.infsof.2014.01.009)
8. **Wagner, S., Méndez Fernández, D., Felderer, M., et al. (2019).** "Status quo in requirements engineering: a theory and a global family of surveys." *ACM TOSEM* 28(2). The best large-sample data (228 organisations, 10 countries) on what practitioners do: interviews 73%, facilitated meetings 67%, prototyping 58% — [Wagner et al. 2019](https://doi.org/10.1145/3306607)
9. **Glinz, M. & Wieringa, R. (2007).** "Guest editors' introduction: stakeholders in requirements engineering." *IEEE Software* 24(2):18–20. A three-page editorial whose stakeholder definition became IREB's standard, with risk-based critical/major/minor prioritisation — [Glinz & Wieringa 2007](https://doi.org/10.1109/MS.2007.42)
10. **Alexander, I. (2005).** "A taxonomy of stakeholders: human roles in system development." *Int. J. of Technology and Human Interaction* 1(1):23–59 (with Alexander & Robertson 2004, *IEEE Software* 21(1):23–27, [link](https://doi.org/10.1109/MS.2004.1259199)). The onion model of stakeholder roles used as an identification checklist — [Alexander 2005](https://doi.org/10.4018/jthi.2005010102)
11. **Lim, S.L. & Finkelstein, A. (2012).** "StakeRare: using social networks and collaborative filtering for large-scale requirements elicitation." *IEEE TSE* 38(3):707–735. Scalable stakeholder identification and prioritisation with a substantial empirical evaluation (87 stakeholders) — [Lim & Finkelstein 2012](https://doi.org/10.1109/TSE.2011.36)
12. **Sutcliffe, A. & Sawyer, P. (2013).** "Requirements elicitation: towards the unknown unknowns." *RE'13*, IEEE, pp. 92–104. The review and roadmap that frames elicitation by the "knowness" of requirements and tacit knowledge — [Sutcliffe & Sawyer 2013](https://doi.org/10.1109/RE.2013.6636709)
13. **Ferrari, A., Spoletini, P. & Gnesi, S. (2016).** "Ambiguity and tacit knowledge in requirements elicitation interviews." *Requirements Engineering* 21(3):333–355. Shows ambiguity as a resource for surfacing tacit knowledge. Pair it with **Bano, M., Zowghi, D., Ferrari, A., Spoletini, P. & Donati, B. (2019)**, "Teaching requirements elicitation interviews: an empirical study of learning from mistakes", *REJ* 24(3):259–289 ([link](https://doi.org/10.1007/s00766-019-00313-0)) — [Ferrari, Spoletini & Gnesi 2016](https://doi.org/10.1007/s00766-016-0249-3)
14. **Beyer, H. & Holtzblatt, K. (1995/1998).** "Apprenticing with the customer" (*CACM* 38(5):45–52) and *Contextual Design* (Morgan Kaufmann, 1998; 2nd ed. Holtzblatt & Beyer, Elsevier, 2016, [link](https://shop.elsevier.com/books/contextual-design/holtzblatt/978-0-12-800894-2)). Contextual inquiry and the master–apprentice relationship, the main field technique for tacit work knowledge — [Beyer & Holtzblatt 1995](https://doi.org/10.1145/203356.203365)
15. **Maiden, N., Gizikis, A. & Robertson, S. (2004).** "Provoking creativity: imagine what your requirements could be like." *IEEE Software* 21(5):68–75. Recast elicitation as creative invention via facilitated creativity workshops (RESCUE) — [Maiden, Gizikis & Robertson 2004](https://doi.org/10.1109/MS.2004.1331305)

**Next tier, with notes on how the brief described them**
- [Sommerville et al. 1993](https://doi.org/10.1109/ISRE.1993.324821): the ethnography-in-RE founding paper.
- [Hadar, Soffer & Kenzi 2014](https://doi.org/10.1007/s00766-012-0163-2) and [Niknafs & Berry 2017](https://doi.org/10.1007/s10664-015-9416-2): domain knowledge as double-edged.
- [Palomares et al. 2021](https://doi.org/10.1007/s00766-020-00345-x): practice in 12 companies.
- [Pagano & Maalej 2013](https://doi.org/10.1109/RE.2013.6636712) and [Groen et al. 2017](https://doi.org/10.1109/MS.2017.33): data and crowd sources.
- [Christel & Kang 1992](https://doi.org/10.21236/ADA258932): scope, understanding and volatility problems.
- [Maiden & Rugg 1996](https://doi.org/10.1049/sej.1996.0024): the earliest systematic selection framework.
- [Sharp, Finkelstein & Galal 1999](https://doi.org/10.1109/DEXA.1999.795198): an early but short (5-page) workshop paper on stakeholder identification. Historically notable, but Glinz & Wieringa and Alexander are the references practice uses.
- [Pacheco, García & Reyes 2018](https://doi.org/10.1049/iet-sen.2017.0144): a useful but secondary systematic review (140 studies) in a lower-profile venue; Dieste & Juristo 2011 remains the reference review.
- [Goguen 1993](https://doi.org/10.1109/ISRE.1993.324858) ("social issues"): only a two-page contribution; Goguen & Linde 1993 is the substantive one.

**Consensus positions (supported above)**
- Elicitation is discovery and co-construction, not capture ([Nuseibeh & Easterbrook 2000](https://doi.org/10.1145/336512.336523); [Zowghi & Coulin 2005](https://doi.org/10.1007/3-540-28244-0_2)).
- No single best technique exists: combine techniques and choose by situation ([IREB CPRE FL syllabus v3.3.0](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf); [Hickey & Davis 2004](https://doi.org/10.1080/07421222.2004.11045786); [Palomares et al. 2021](https://doi.org/10.1007/s00766-020-00345-x)).
- Interviews are the backbone, being the most used and among the most effective in experiments, but they demand skill. Novices make predictable mistakes ([Wagner et al. 2019](https://doi.org/10.1145/3306607); [Davis et al. 2006](https://doi.org/10.1109/RE.2006.17); [Bano et al. 2019](https://doi.org/10.1007/s00766-019-00313-0)).
- Identify and prioritise stakeholder roles early and continuously, including indirect, negative and regulatory ones ([Glinz & Wieringa 2007](https://doi.org/10.1109/MS.2007.42)).
- Tacit and "subconscious" requirements need observation, provocation and attention to ambiguity, not just questions ([Ferrari, Spoletini & Gnesi 2016](https://doi.org/10.1007/s00766-016-0249-3); [IREB CPRE FL syllabus v3.3.0](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf)).
- Innovative requirements need creativity and design techniques ([Maiden, Gizikis & Robertson 2004](https://doi.org/10.1109/MS.2004.1331305)).
- Quality requirements and constraints are systematically under-elicited, so use a quality-model checklist ([IREB CPRE FL syllabus v3.3.0](https://hub.ireb.org/media/pages/resources/cpre-foundation-level-syllabus/9c084b1cfd-1787039954/cpre_foundationlevel_syllabus_en_v.3.3.0.pdf)).

**Corrections to the brief**
- Hickey & Davis's unified model appeared in *JMIS* 20(4), 2004, not REJ ([Hickey & Davis 2004](https://doi.org/10.1080/07421222.2004.11045786)).
- The Sutcliffe & Sawyer RE'13 DOI is 10.1109/RE.2013.6636709 ([Sutcliffe & Sawyer 2013](https://doi.org/10.1109/RE.2013.6636709)).
- Current standards status as of 2026-10-23:
  - The IREB FL syllabus is v3.3.0 (April 2026).
  - IIBA's page still presents BABOK v3, with no v4 visible ([IIBA BABOK page](https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/)).
  - *Contextual Design*'s latest edition is the 2nd (Holtzblatt & Beyer, Elsevier date 2016-11-16) ([Holtzblatt & Beyer 2016](https://shop.elsevier.com/books/contextual-design/holtzblatt/978-0-12-800894-2)).

### Inferences
- **Where experts disagree:**
  1. Structured versus unstructured interviews (Davis et al. 2006 and Agarwal & Tanniru 1990 against Wagner et al.'s reading of Dieste & Juristo 2011 and Carrizo et al.'s warning about open interviews).
  2. Whether analyst experience and domain knowledge help (lab evidence of no effect versus expert belief; Berry's "ignorance" thesis).
  3. Contextualist versus model-based elicitation (N&E: "incompatible" in extreme forms).
  4. How much up-front elicitation to do versus discovering requirements incrementally. Dieste, Juristo & Shull 2008 argue for getting requirements right first; agile practice and Boehm et al. 1984's prototyping results support learning by building.
- **Open problems:**
  1. The evidence base is small, unreplicated and lab-based, and it measures information quantity rather than outcome quality.
  2. Technique-selection frameworks (ACRE, Hickey & Davis, Carrizo et al.) lack independent industrial validation.
  3. Tacit knowledge and unknown unknowns have no demonstrated reliable technique.
  4. Stakeholder involvement does not scale to products with large or anonymous user bases; StakeRare and crowd-based RE are partial answers.
  5. The practitioner workshop formats now used most in agile teams (story mapping, impact mapping, EventStorming) are almost unevaluated; Berends & Dalpiaz 2021 is an exception for Example Mapping.
  6. Data-driven sources rarely yield ready-to-use requirements.
  7. Interview training does not produce quick improvement in novices (Bano et al. 2019).
- **Practical guidance for the newcomer, synthesised:**
  1. Map stakeholders with an onion or checklist and rank by risk.
  2. Run prepared, semi-structured interviews, watching for ambiguity cues.
  3. Observe or apprentice where work is tacit.
  4. Use workshops for shared understanding and conflict surfacing.
  5. Use prototypes and scenarios to provoke reactions.
  6. Use creativity or design formats when innovation is the goal.
  7. Check quality requirements against ISO 25010.
  8. Mine feedback and usage data for existing products.

### Gaps
- I found no recent (2020–2026) systematic review that supersedes Dieste & Juristo 2011 on technique *effectiveness*. Newer reviews found address data-driven elicitation or app reviews (Lim et al. 2021; Dąbrowski et al. 2022), not comparative effectiveness. This should be confirmed by a targeted search.
- The rankings in the top-15 list are my editorial judgement from the sources above, not a bibliometric measure.
