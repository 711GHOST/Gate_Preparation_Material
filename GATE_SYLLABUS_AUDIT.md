# GATE 2027 DA and CS syllabus audit

**Audit date:** 18 October 2026  
**Verification level:** Official source link availability checked; detailed syllabus-content verification remains incomplete.

## Official sources

- [GATE 2027 official website](https://gate2027.iitm.ac.in/)
- [Official test papers and syllabus page](https://gate2027.iitm.ac.in/exam_papers_and_syllabus)
- [Official DA syllabus PDF](https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/DA_GATE2027_Syllabus.pdf)
- [Official CS syllabus PDF](https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/CS_GATE2027_Syllabus.pdf)

The official site and syllabus endpoints were contacted on the audit date. The syllabus page returned an official-site heading, and both DA and CS PDF endpoints returned PDF responses. The PDF contents were not extracted or compared line-by-line with the resource documents in this environment. Consequently, this report does not certify the current syllabus wording, exam dates, paper pattern, or marking rules.

## Current VektaPrep mapping

`lib/syllabus-coverage.ts` contains 18 high-level rows:

- 7 mapped as “Both”: linear algebra; probability and statistics; calculus and optimization; programming and data structures; algorithms; databases and SQL; General Aptitude.
- 4 mapped as DA-specific: supervised machine learning; neural networks and unsupervised learning; artificial intelligence; database management and warehousing.
- 7 mapped as CS-specific: discrete mathematics; digital logic; computer organization and architecture; theory of computation; compiler design; operating systems; computer networks.

These classifications reflect the current application map and resource names. They are not proof that each resource covers every official subtopic. The UI now describes mapped resources rather than complete verified coverage and links to the official sources.

## Gaps and uncertainty

- The 18-row matrix is too coarse to establish complete DA or CS coverage; many official syllabus subtopics are not individually represented.
- Resource-to-topic links are based on catalogue IDs/titles, not a content review of every DOCX.
- Some broad foundations are marked as shared. The exact DA- and CS-specific syllabus wording and depth must be checked before treating those resources as interchangeable.
- Question-bank and mock-test links do not prove that questions exist for every linked topic.
- There is no verified coverage percentage.
- No exam dates or marking rules are reproduced here as verified facts. Check the current official information brochure before publishing such details.
- The separate checklist document in the resource library also requires manual comparison with the official PDFs.

## Recommended verification procedure

1. Download both current official syllabus PDFs and the applicable information brochure from the official GATE 2027 site.
2. Maintain separate DA and CS topic/subtopic checklists; add a shared tag only where wording and scope genuinely overlap.
3. Review the contents of each mapped DOCX and question bank, and mark material/practice/revision availability only after that review.
4. Record official-source version/date and the reviewer/date for each paper.
5. Recheck after official updates and remove stale information immediately.
