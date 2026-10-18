# VektaPrep pre-launch audit

**Audit date:** 18 October 2026  
**Scope:** Current repository state and source files, plus local production-build browser checks. No production deployment, owner account, or real-device session was used.

## Executive summary

The repository now contains public DA/CS preparation routes, a searchable resource catalogue, local progress tracking, trust and policy pages, page metadata, sitemap/robots routes, and resource-validation tooling. Local production build, tests, type-check, route smoke checks, and selected responsive browser checks passed. This is still not enough to call the site production-ready: educational content, page counts, answer keys, deployed S3 flows, real-device layouts, and owner/deployment configuration remain unverified.

The UI no longer presents unverified question counts or a hardcoded exam schedule as confirmed facts. Local-storage failures and clipboard-copy failures are now visible to users. Resource completion reset requires explicit confirmation.

## Findings and dispositions

| Severity | Finding | Status / evidence |
|---|---|---|
| High | The 33 listed study documents and question-count claims had not been reviewed for document contents, readability, correct solutions, or actual page totals. | The resource validator confirms 33/33 local files exist. The UI avoids claiming verified question totals or page counts. Human content review is still required. See [RESOURCE_AUDIT.md](./RESOURCE_AUDIT.md). |
| High | Contact is not a server-submitted feedback service. Without an owner-configured address, feedback is only a locally composed/copied draft and does not reach the site owner. | The contact page explains this limitation. Configure and test `NEXT_PUBLIC_CONTACT_EMAIL` before promotion. No contact details were invented. |
| High | The current syllabus matrix is a high-level resource mapping, not an exhaustive audit of official syllabus subtopics. | Official links are provided; endpoint availability was checked, but the official PDFs were not text-extracted and checked topic-by-topic against document contents. Do not claim complete syllabus coverage. See [GATE_SYLLABUS_AUDIT.md](./GATE_SYLLABUS_AUDIT.md). |
| Medium | Exam dates and question totals were hardcoded from unverified metadata and were presented in prominent UI. | The date-specific footer claims and question-count display were removed. Users are directed to current official sources; document totals are explicitly marked unverified in the audit. |
| Medium | Study progress is browser-local and does not synchronize across devices. Browser storage can be unavailable or contain malformed data. | The site discloses device-local storage. Storage read/write errors are now logged and shown in the relevant interfaces. Resetting resource progress requires confirmation. |
| Low | Lint is not configured for non-interactive use. | `npm run lint` prompts to create an ESLint configuration; the production build is configured to skip linting. Build, resource validation, tests, and `npx tsc --noEmit` passed. See [PRE_LAUNCH_CHECKLIST.md](./PRE_LAUNCH_CHECKLIST.md). |
| Low | Selected browser journeys were checked locally, but not against the deployed domain or on physical devices. | The checked local production routes returned HTTP 200, the unknown download ID returned 404, and viewports at 320/375/414 CSS px had no horizontal overflow. This does not replace deployed or real-device testing. |
| Low | Direct server-rendered `/resources` metadata has a unique title, but the title duplicates the brand after client-side navigation from another route. | Reproduced in the integrated browser after a fresh load. Other checked routes (including `/about`) did not show this duplication. Direct page loads still render the intended title. |
| Medium | The integrated browser could not complete a resource download while the configured flow redirected to external S3. | Local files are present, but the S3 redirect path and preview were not verified end-to-end in the browser environment. Do not treat local file presence as proof that deployed S3 downloads work. |
| Low | Analytics, Search Console, a custom domain, and advertising are not verified/configured as part of this audit. | No verification or approval is claimed. See [ADSENSE_READINESS.md](./ADSENSE_READINESS.md). |

## Implemented in the current working tree

- Added About, Contact/Feedback, Privacy, Disclaimer, Terms, DA/CS preparation, syllabus, roadmap, mock-test, and not-found routes.
- Added page-specific metadata, canonical URL configuration, sitemap, and robots rules.
- Added DA/CS route entries and a topic-to-resource syllabus matrix with browser-local revision tracking.
- Added a contact experience that hands off through the visitor's email application when an owner email is configured; otherwise it clearly indicates that no message is sent.
- Added resource-manifest/local-file validation.
- Qualified unverified catalogue claims and removed unverified schedule claims from public UI.
- Surfaced browser-storage and clipboard errors; added confirmation before clearing resource progress.
- Fixed mobile horizontal overflow during roadmap card reveal animations.
- Added modal keyboard focus containment and focus restoration.

## Remaining launch blockers

1. The owner must provide and test a real feedback/privacy contact address.
2. A human must review the actual educational files, including all answer keys and attribution.
3. The official DA and CS syllabi must be compared topic-by-topic against actual document contents.
4. Configure lint so it can run non-interactively, then resolve any reported issues.
5. Resolve or explicitly accept the `/resources` browser-tab title duplication after client navigation.
6. Verify S3 download and preview flows from a browser that can reach the configured bucket.
7. Exercise resource, policy, roadmap, mock-test, keyboard, and mobile journeys against the deployed site and real devices.
