'use client';

import { useMemo, useState } from 'react';
import { contactEmail } from '@/lib/site-config';
import { buildFeedbackMailto, type FeedbackCategory } from '@/lib/feedback';
import { Mail, Copy, Check } from 'lucide-react';

const categories: { id: FeedbackCategory; label: string }[] = [
  { id: 'broken-resource', label: 'Broken resource or download' },
  { id: 'wrong-answer', label: 'Incorrect answer or explanation' },
  { id: 'copyright', label: 'Copyright or attribution' },
  { id: 'technical', label: 'Website technical issue' },
  { id: 'suggestion', label: 'Suggestion or general feedback' },
];

export function ContactForm() {
  const [category, setCategory] = useState<FeedbackCategory>('suggestion');
  const [message, setMessage] = useState('');
  const [resourceId, setResourceId] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [sendError, setSendError] = useState(false);

  const mailto = useMemo(
    () =>
      buildFeedbackMailto(
        category,
        [message, resourceId ? `\nResource ID: ${resourceId}` : ''].filter(Boolean).join('\n'),
        resourceId || undefined
      ),
    [category, message, resourceId]
  );

  const copyTemplate = async () => {
    const text = [
      `Category: ${category}`,
      resourceId ? `Resource ID: ${resourceId}` : '',
      '',
      message || '(describe your feedback here)',
    ]
      .filter(Boolean)
      .join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Unable to copy the feedback message:', error);
      setCopyError(true);
    }
  };

  return (
    <form
      className="card w-full space-y-4 p-5 sm:p-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (!mailto) {
          setSendError(true);
          return;
        }
        setSendError(false);
        window.location.href = mailto;
      }}
    >
      <p className="text-sm text-fg/60">
        Send a message to{' '}
        <a className="font-semibold text-brand-600 hover:underline" href={`mailto:${contactEmail}`}>
          {contactEmail}
        </a>
        . This opens your email app with the details filled in; review and send it there.
      </p>
      <label className="block text-sm font-semibold text-fg">
        Category
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as FeedbackCategory)}
          className="mt-1.5 w-full rounded-xl border border-fg/15 bg-white px-3 py-2.5 text-sm transition focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15 dark:bg-ink/50"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-semibold text-fg">
        Resource ID (optional)
        <input
          value={resourceId}
          onChange={(e) => setResourceId(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-fg/15 bg-white px-3 py-2.5 text-sm transition focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15 dark:bg-ink/50"
        />
      </label>
      <label className="block text-sm font-semibold text-fg">
        Message
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="mt-1.5 w-full rounded-xl border border-fg/15 bg-white px-3 py-2.5 text-sm transition focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15 dark:bg-ink/50"
        />
      </label>
      <button type="submit" className="btn-primary">
        <Mail className="h-4 w-4" /> Send email
      </button>
      <button
        type="button"
        onClick={copyTemplate}
        className="btn-ghost ml-2 border border-fg/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? 'Copied' : 'Copy message template'}
      </button>
      {sendError && (
        <p role="alert" className="text-sm text-red-700 dark:text-red-300">
          Could not prepare the email. Please contact {contactEmail} directly or copy the message
          template.
        </p>
      )}
      {copyError && (
        <p role="alert" className="text-sm text-red-700 dark:text-red-300">
          Could not copy the message. Please contact {contactEmail} directly.
        </p>
      )}
    </form>
  );
}
