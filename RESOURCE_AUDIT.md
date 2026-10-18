# VektaPrep resource audit

**Audit date:** 18 October 2026  
**Inventory source:** `lib/resources.generated.json` and the files under `public/resources/`.

## Inventory

| Measure | Result | Evidence / limitation |
|---|---:|---|
| Catalogue entries | 33 | Generated manifest states 33 entries. |
| Bundled local documents | 33/33 | `npm run validate:resources` reported all 33 local files found. |
| File format | 33 DOCX | The manifest and local inventory list Word documents; no PDF files are listed. |
| Subject-note entries | 18 | Counted from the configured resource groups, not a count of official syllabus subjects. |
| Full-length mock documents | 4 | Manifest entries whose IDs begin with `Mock_`. This does not validate the question contents. |
| Question-bank documents | 2 | `QBank_DA` and `QBank_CS`. |
| Previous-year guides | 2 | `PYQ_DA_Guide` and `PYQ_CS_Guide`. |
| Planning/master documents | 6 | Manifest group classification. |
| Mixed revision test | 1 | Manifest entry `Mixed_Revision_Test`. |
| Total page count | Not verified | DOCX pagination varies by renderer and was not measured. Do not use the former “530+ pages” claim. |
| Official subject count | Not verified | Resource-group counts are not equivalent to official syllabus subject counts. Do not claim “20 subjects” based on this catalogue. |

## Question-count audit

Earlier catalogue descriptions contained metadata figures of 58 DA bank items, 62 CS bank items, 65 questions per full-length mock, four full-length mocks, and 30 mixed-revision items. Their arithmetic gives 120 question-bank occurrences, 290 mock/revision occurrences, and 410 total occurrences. The unverified item-count claims were removed from the current catalogue descriptions and are retained here only as an audit record.

These figures were **not independently recounted from the DOCX contents**. Therefore:

- 120 is a catalogue-metadata total, not a verified total of original questions.
- 410 is a metadata-derived count of occurrences, not a count of distinct questions.
- Duplicates between banks, mock documents, previous-year guides, and mixed revision material are unknown.
- Previous-year question counts and the number of questions with correct explanations/solutions are unknown.
- The site should not advertise these as verified totals until the files are parsed and reviewed.

## Destination and content validation

Automated check performed:

- `npm run validate:resources` — **passed** for local file presence (33/33). The validator also checks duplicate resource IDs and would fail if it found any; no duplicate-ID error was reported.

Not tested or not covered by that script:

- Live `/api/download`, `/api/file`, or `/api/view-url` requests.
- S3 credentials, permissions, expiry, or actual object availability.
- DOCX opening/readability on desktop and mobile.
- Correct title-to-file correspondence, completeness, formatting, attribution, or copyright status.
- Question counts, worked-solution presence, answer-key correctness, or duplicate questions.
- Actual page counts.

The manifest's generated timestamp is `2026-10-15T03:31:33.085Z`; it is inventory metadata, not an educational-content review date.

## Required manual work

1. Open every DOCX and verify its displayed title, sections, and completeness.
2. Recount questions and verify answer keys, explanations, question types, and attribution.
3. Record page counts only after choosing a consistent renderer and measurement method.
4. Check each file through the deployed preview and download routes, both with S3 disabled and (if used) configured.
5. Replace metadata-derived totals with audited values, or continue omitting them.
