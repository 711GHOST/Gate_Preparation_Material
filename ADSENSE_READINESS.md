# AdSense readiness

**Assessment date:** 18 October 2026

## Current status

**AdSense is not configured or active in the reviewed code. No approval, eligibility, or revenue is claimed.**

No publisher ID, advertising script, ad placement, consent-management integration, or publisher-specific `ads.txt` record has been added. An `ads.txt` file must not be published until the owner has the exact authorized publisher record.

## Readiness already present

- The site has About, Privacy, Educational Disclaimer, Terms, and Contact/Feedback routes linked from the footer.
- The Privacy page says advertising is planned rather than active and points to Google's policy information.
- No fake publisher ID or placeholder advertising record has been introduced.
- Resource and mock-test layouts remain usable without ads.

These are preliminary site-quality steps, not a determination of Google's policy compliance or approval.

## Owner configuration and verification required

1. Confirm ownership of all educational documents and permission/attribution for third-party material.
2. Configure a real site-owner contact address using `NEXT_PUBLIC_CONTACT_EMAIL`; test it on the deployed domain. The current contact flow uses the visitor's mail application and is not a server-side inbox.
3. Decide and configure the production domain with `NEXT_PUBLIC_SITE_URL`; verify canonical URLs, HTTPS, sitemap, and Search Console ownership after deployment.
4. Apply through the actual publisher account and use only the publisher details Google authorizes.
5. Before enabling ads, update the Privacy Policy to describe the actual ad technology, cookies, processing, and choices. Review applicable consent requirements for expected visitor regions and integrate an appropriate solution if needed.
6. Add the exact publisher-specific `ads.txt` line only after authorization and verify it at the site's public `/ads.txt`.
7. Test ad loading, layout shifts, mobile usability, and policy compliance without placing ads where they interfere with study or test interactions.

## Content and privacy risks to resolve first

- Educational resources, question counts, page counts, answer keys, and syllabus coverage have not had a complete human review; see [RESOURCE_AUDIT.md](./RESOURCE_AUDIT.md) and [GATE_SYLLABUS_AUDIT.md](./GATE_SYLLABUS_AUDIT.md).
- Contact delivery depends on a user-configured address and visitor mail client.
- Progress tracking is stored in local browser storage. The site does not provide accounts or cross-device synchronization.
- The hosting provider may process server request logs. Review the chosen host's current privacy terms.
- Ad and consent rules can vary by region and change over time; verify the then-current official requirements before enabling advertising.

## Decision

Treat the site as **not yet ready to apply** until content ownership/quality, a functioning contact channel, policy text, deployment configuration, and the remaining launch checks are completed. Google's review and any applicable legal/privacy review remain external dependencies.

