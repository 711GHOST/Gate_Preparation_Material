import { InfoPageShell } from '@/components/InfoPageShell';
import { pageMetadata } from '@/lib/page-metadata';
import Link from 'next/link';

export const metadata = pageMetadata({
  title: 'Terms of Use',
  description: 'Terms for using VektaPrep study resources, downloads, and feedback channels.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <InfoPageShell
      title="Terms of Use"
      lede="By using VektaPrep you agree to the following reasonable terms."
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Terms', href: '/terms' }]}
    >
      <h2>Access</h2>
      <p>
        VektaPrep is offered for personal, non-commercial study use unless otherwise noted. We may
        update, add, or remove resources to keep content accurate and maintainable.
      </p>

      <h2>Downloads</h2>
      <p>
        You may download resources for your own preparation. Do not redistribute large portions of the
        library as if they were your original work, and respect any third-party attribution inside
        documents.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Do not attempt to disrupt the site, scrape at abusive rates, or probe server routes.</li>
        <li>Do not upload malware or misuse feedback channels for spam.</li>
        <li>Do not misrepresent affiliation with IIT Madras, GATE, or VektaPrep.</li>
      </ul>

      <h2>External links</h2>
      <p>
        Links to official GATE pages and third-party viewers are provided for convenience. We are not
        responsible for their content or privacy practices.
      </p>

      <h2>Feedback</h2>
      <p>
        Suggestions you send may be used to improve materials without obligation to implement them. See{' '}
        <Link href="/contact">Contact</Link> for reporting channels.
      </p>

      <h2>Limitation</h2>
      <p>
        To the extent permitted by law, VektaPrep and its contributors are not liable for indirect or
        consequential damages arising from use of the site or materials. See also the{' '}
        <Link href="/disclaimer">Educational Disclaimer</Link>.
      </p>
    </InfoPageShell>
  );
}
