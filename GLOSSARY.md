# Glossary

_One sentence: these terms are this repository's ubiquitous
language, in the domain-driven design sense, so they're used
with exactly these meanings everywhere._

- **Problem space**: _What's needed, independent of how it's
  met._
- **Solution space**: _How what's needed is met._
- **Requirement**: _A statement of something that's needed._
- **Contract**: _The interface through which the solution is
  used, saying nothing about how it's built._
- **Deep module**: _A module whose small, simple interface
  hides a large implementation._
- **Steering**: _Guidance on how the solution is built._
- **Steering keyword**: _The all-caps word that starts each
  steering bullet and says whether the implementation can
  depart from it. There are five:_
  - **`ALWAYS`**: _A rule about what the implementation always
    does. No departure._
  - **`NEVER`**: _A rule about what the implementation never
    does. No departure._
  - **`FAVOR`**: _A preference for something. The
    implementation can depart from it, with a stated reason._
  - **`DISFAVOR`**: _A preference against something. The
    implementation can depart from it, with a stated reason._
  - **`CONSIDER`**: _Inspiration, not a preference. The
    implementation can ignore it without giving a reason._
- **Implementation**: _The solution as built._
- **Human-owned**: _Comes entirely from the human._
- **Shared ownership**: _Created collaboratively by the human
  and agents. The human decides what goes in and understands
  all of it, so that comprehension debt is avoided._
- **Comprehension debt**: _The growing gap between how much
  content exists and how much of it is understood._
- **Agent-owned**: _Created entirely by the agent. The human
  isn't expected to understand all of it, or any of it, and
  never edits it._
