# VektaPrep pre-launch checklist

**Status as of 18 October 2026**

## Completed in the current working tree

- [x] Public information and trust routes exist: About, Privacy, Disclaimer, Terms, and Contact/Feedback.
- [x] DA and CS preparation routes and a high-level syllabus matrix are present.
- [x] Main navigation and footer include the policy and preparation destinations.
- [x] Page metadata, canonical URL configuration, sitemap, robots rules, and not-found route are present.
- [x] Resource catalogue avoids presenting unverified page/question totals as confirmed figures.
- [x] Exam-date claims were removed from public UI; users are pointed to official sources.
- [x] Progress uses browser-local storage and communicates storage failures; resource reset requires confirmation.
- [x] Feedback-copy failures are reported in the interface.
- [x] Responsive browser smoke checks at 320, 375, and 414 CSS pixels showed no horizontal overflow; mobile menu opened.
- [x] The main route set returned HTTP 200 in a local production-browser smoke test; an unknown download ID returned HTTP 404.

## Automated checks actually completed

- [x] `npm run validate:resources` - passed; manifest listed 33 resources and all 33 bundled files were found.
- [x] `npm run check` - passed resource validation, production build, and all five tests.
- [x] `npx tsc --noEmit` - passed.
- [ ] Lint - not configured for non-interactive execution; `npm run lint` prompts to create an ESLint configuration, and the production build skips linting.
- [ ] Verify the `/resources` browser-tab title after client-side navigation; integrated browser testing observed a duplicate brand suffix, while direct page load is correct.
- [ ] Verify the actual S3-backed download and preview paths in a browser with access to the configured bucket. The integrated browser could not complete the external S3 request.
- [ ] Full accessibility automation, deployed browser checks, and physical-device viewport tests - not run.
- [ ] Lighthouse/Core Web Vitals measurement - not run; no performance score is claimed.

## Must be manually verified before public promotion

- [ ] Configure lint for non-interactive use and run it; build, resource validation, tests, and TypeScript check have passed locally.
- [ ] Open every document; verify title, readability, question counts, solution presence/correctness, attribution, and legal permission.
- [ ] Reconcile DA and CS topic-by-topic against the current official syllabus PDFs; do not claim complete coverage until evidenced.
- [ ] Test resource preview/download flows for representative files and then all files on the deployed domain.
- [ ] Check desktop and mobile navigation, resource search, progress persistence after refresh/restart, syllabus checks, keyboard focus, and screen-reader labels.
- [ ] Confirm the configured feedback address receives a real message and privacy queries reach the owner.
- [ ] Check policy pages and all footer links on the deployed site.
- [ ] Verify current GATE dates, information brochure, pattern, and marking rules directly from official sources before publishing them.

## Owner configuration before deployment/promotion

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the chosen canonical HTTPS origin (the default currently points to the Vercel subdomain).
- [ ] Set `NEXT_PUBLIC_CONTACT_EMAIL` to an owner-controlled address and test it. Do not rely on an unconfigured form.
- [ ] If using S3, set real server-side AWS credentials, region, bucket, and optional prefix in the deployment provider. Never use the example values in `.env.example`.
- [ ] Add and verify the production domain in Google Search Console and submit `/sitemap.xml`; do not imply this is already done.
- [ ] Review hosting logs, retention, and the final privacy disclosures.

## AdSense tasks (only if/when pursued)

- [ ] Complete content, rights, contact, privacy, and accessibility reviews.
- [ ] Apply through the actual Google publisher account.
- [ ] Add authorized script, consent controls where required, and exact publisher `ads.txt` data only after approval/configuration.
- [ ] Test ad behavior and page performance without disrupting learning.

## Deferred / optional

- [ ] Add an analytics service only after deciding the privacy/consent basis and updating disclosures.
- [ ] Add cloud accounts or cross-device progress only if a future, justified backend is designed.
- [ ] Add an interactive, auto-scored mock mode only after its question data and marking logic are independently verified against the official rules.
