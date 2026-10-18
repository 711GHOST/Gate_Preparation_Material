import { InfoPageShell } from '@/components/InfoPageShell';
import { ContactForm } from '@/components/ContactForm';
import { pageMetadata } from '@/lib/page-metadata';
import { contactEmail } from '@/lib/site-config';

export const metadata = pageMetadata({
  title: 'Contact & Feedback',
  description:
    'Report broken downloads, incorrect answers, copyright concerns, or send suggestions for VektaPrep.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <InfoPageShell
      title="Contact & Feedback"
      lede="Help keep the library accurate and accessible."
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Contact', href: '/contact' }]}
    >
      <p>
        Use this form to report broken resources, suspected wrong answers, attribution issues, or
        technical problems. Include a resource ID when relevant (shown in the resource preview panel).
      </p>
      {contactEmail && (
        <p className="text-sm text-fg/55">
          Published contact: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </p>
      )}
      <ContactForm />
    </InfoPageShell>
  );
}
