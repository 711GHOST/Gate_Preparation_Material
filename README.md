# VektaPrep - Your Roadmap to GATE 2027

A fast, animated **roadmap website** for GATE 2027 (Data Science & AI + Computer Science),
with a built-in **Resources & Papers** library. The signature feature is a winding road that
**draws itself as you scroll**, with a marker that travels along it and milestone cards that
animate into view. The Resources tab serves the full study library (33 documents) as downloads -
from **Amazon S3** when configured, or from bundled static files out of the box.

Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion**. It can be
deployed to Vercel or compatible Next.js hosting; configure the production origin and owner contact
details as needed.

### Features
- **Animated winding roadmap** — the road draws on scroll, a marker travels along it, milestone cards reveal.
- **Dark mode** — sun/moon toggle in the navbar; choice is saved (localStorage) and respects the OS preference on first visit. No flash on load. Deep-link a theme with `?theme=dark` or `?theme=light`.
- **Progress tracker** — tick off the 5 roadmap phases (nodes turn into ✓, with a progress bar) and mark any of the 33 resources as completed (per-group counts + an overall progress bar). All saved locally per device; a reset button clears it.
- **Per-document preview** — click any resource (or its “Preview” button) for a modal with details, a rendered DOCX preview, Download, mark-complete, and an optional Office Online preview. Deep-link a preview with `?doc=<id>`.
- **Actionable roadmap** — every milestone has an “Explore materials →” link that jumps to that phase’s documents on the Resources page.
- **Resources browser** — search + filter (DA / CS / Both), grouped by subject, downloads via S3 presigned URLs or static fallback.

Question counts, page totals, answer keys, and exhaustive syllabus coverage have not been independently verified. Mock tests are downloadable documents, not interactive online exams. Progress is stored in this browser only. See `RESOURCE_AUDIT.md`, `GATE_SYLLABUS_AUDIT.md`, and `PRE_LAUNCH_CHECKLIST.md` before public promotion.

---

## Quick start

```bash
cd web
npm install
npm run dev          # http://localhost:3000
```

Build & run production:

```bash
npm run build
npm start
```

---

## How the resources work

- The study documents live in `../GATE2027_Library/` (one folder per group).
- `npm run manifest` reads that folder, (a) writes `lib/resources.generated.json`
  (titles, groups, sizes, S3 keys) and (b) copies every `.docx` into `public/resources/`
  so downloads work **without any cloud setup**.
- The **Resources page** (`/resources`) renders this manifest: searchable, filterable by paper
  (DA / CS / Both), grouped by subject.
- Download links hit **`/api/download?id=<id>`**, which:
  1. returns a short-lived **presigned S3 URL** if S3 env vars are set, else
  2. redirects to the bundled static file in `public/resources/`.

The bundled files allow downloads without S3. Contact delivery, canonical-domain settings, and any
optional S3 storage still need owner configuration.

---

## Wiring up S3 (optional but recommended for large libraries)

1. Create an S3 bucket (keep it private - presigned URLs handle access).
2. Copy the env template and fill it in:

   ```bash
   cp .env.example .env.local
   ```

   ```ini
   AWS_REGION=ap-south-1
   AWS_ACCESS_KEY_ID=...
   AWS_SECRET_ACCESS_KEY=...
   S3_BUCKET=your-bucket
   S3_PREFIX=            # optional, e.g. "gate2027"
   ```

3. Upload the library (keys mirror the folder structure, e.g. `Shared/SH1_Linear_Algebra.docx`):

   ```bash
   npm run upload
   ```

4. Restart `npm run dev` (or redeploy). `/api/resources` will report `"s3": true` and
   downloads will now stream from your bucket via presigned URLs (valid 10 minutes).

**IAM:** the credentials need `s3:PutObject` (for upload) and `s3:GetObject` (for presigned
downloads) on `arn:aws:s3:::your-bucket/*`. No public bucket policy or CORS is required for the
download flow, because the API issues presigned URLs server-side.

> Tip: once everything is on S3 you can stop committing the `.docx` files in
> `public/resources/` (add them to `.gitignore`) to keep the repo small. The static fallback is
> only needed when S3 is not configured.

---

## Deploying

### Vercel (recommended)
1. Push this `web/` folder to a Git repo (or run `vercel` in it).
2. In the Vercel project settings, add the same env vars as `.env.local`
   (Project → Settings → Environment Variables).
3. Deploy. The API routes run as serverless functions automatically.

### Netlify
1. Install the Next.js runtime (Netlify auto-detects it).
2. Build command `next build`, publish directory handled by the plugin.
3. Add the env vars under Site settings → Environment variables.

---

## Editing the content

| What | Where |
|------|-------|
| Roadmap milestones (the 5 steps) | `lib/roadmap.ts` |
| Road shape / animation | `components/RoadMap.tsx` (`ROAD_D`, `FRACTIONS`) |
| Hero copy & stats | `components/Hero.tsx`, `lib/roadmap.ts` |
| Colours / theme | `tailwind.config.ts`, `app/globals.css` |
| Resource titles & descriptions | `scripts/build-manifest.mjs` (`META`), then `npm run manifest` |

After changing anything in `../GATE2027_Library/`, re-run `npm run manifest`.

---

## Project structure

```
web/
  app/
    layout.tsx            # shell: navbar + footer, fonts, metadata
    page.tsx              # home: hero + animated roadmap + features + CTA
    resources/page.tsx    # searchable resource browser
    api/
      resources/route.ts  # serves the manifest (+ s3 flag)
      download/route.ts    # presigned S3 URL or static fallback (302)
  components/             # Navbar, Hero, RoadMap, Footer, icons
  lib/
    roadmap.ts            # milestone + stats content
    resources.ts          # typed manifest accessor
    resources.generated.json
    s3.ts                 # presign + list helpers
  scripts/
    build-manifest.mjs    # regenerate manifest + copy files
    upload-to-s3.mjs       # push library to your bucket
  public/resources/       # bundled docx (static fallback)
```
