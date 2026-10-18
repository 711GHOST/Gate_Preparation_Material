/** Public site configuration (safe for client bundles). */

export const siteName = 'VektaPrep';

/** Production origin; override when moving to a custom domain. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://gate-prep-five.vercel.app';

/** Optional owner contact email (mailto links). Not invented when unset. */
export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || '';

export const officialGate = {
  home: 'https://gate2027.iitm.ac.in/',
  papersAndSyllabus: 'https://gate2027.iitm.ac.in/exam_papers_and_syllabus',
  syllabusDA: 'https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/DA_GATE2027_Syllabus.pdf',
  syllabusCS: 'https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/CS_GATE2027_Syllabus.pdf',
  helpdesk: 'helpdesk@gate.iitm.ac.in',
} as const;
