import { contactEmail } from './site-config';

export type FeedbackCategory =
  | 'broken-resource'
  | 'wrong-answer'
  | 'copyright'
  | 'technical'
  | 'suggestion';

const labels: Record<FeedbackCategory, string> = {
  'broken-resource': 'Broken download or preview',
  'wrong-answer': 'Incorrect answer or explanation',
  copyright: 'Copyright or attribution',
  technical: 'Technical issue on the website',
  suggestion: 'General suggestion',
};

/** Builds a mailto URL when NEXT_PUBLIC_CONTACT_EMAIL is configured. */
export function buildFeedbackMailto(category: FeedbackCategory, body: string, resourceId?: string) {
  if (!contactEmail) return null;
  const subject = `[VektaPrep] ${labels[category]}${resourceId ? ` — ${resourceId}` : ''}`;
  const params = new URLSearchParams();
  params.set('subject', subject);
  params.set('body', body.trim());
  return `mailto:${encodeURIComponent(contactEmail)}?${params.toString()}`;
}

export function reportBrokenResourceLink(resourceId: string, title: string) {
  const body = [
    'Please describe what happened (download failed, preview blank, wrong file, etc.):',
    '',
    `Resource ID: ${resourceId}`,
    `Title: ${title}`,
    `Page: ${typeof window !== 'undefined' ? window.location.href : ''}`,
  ].join('\n');
  return buildFeedbackMailto('broken-resource', body, resourceId);
}
