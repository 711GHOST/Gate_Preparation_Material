import { InfoPageShell } from '@/components/InfoPageShell';
import { pageMetadata } from '@/lib/page-metadata';
import { officialGate } from '@/lib/site-config';

export const metadata = pageMetadata({
  title: 'Educational Disclaimer',
  description:
    'VektaPrep is an independent GATE preparation resource and is not affiliated with IIT Madras or the official GATE examination.',
  path: '/disclaimer',
});

export default function DisclaimerPage() {
  return (
    <InfoPageShell
      title="Educational Disclaimer"
      lede="Please read this before relying on any material or date shown on VektaPrep."
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Disclaimer', href: '/disclaimer' }]}
    >
      <p>
        VektaPrep is an independent educational platform created to support GATE aspirants. It is not
        affiliated with, endorsed by, or officially associated with the GATE organizing institute or IIT
        Madras. Official examination information should be verified through the{' '}
        <a href={officialGate.home} target="_blank" rel="noopener noreferrer">
          official GATE 2027 website
        </a>
        .
      </p>

      <h2>Practice content</h2>
      <p>
        Question banks, mock tests, and worked examples are for preparation and self-assessment. Original
        practice material does not predict what will appear in GATE 2027. Previous-year guides reference
        publicly available patterns; always confirm current rules in the official Information Brochure.
      </p>

      <h2>Accuracy</h2>
      <p>
        We aim for careful editing, but errors can occur in notes, keys, or metadata. If you identify a
        mistake, please report it so it can be reviewed. We do not claim that every answer has been
        independently verified by subject experts unless explicitly stated for a specific document.
      </p>

      <h2>No warranty</h2>
      <p>
        Materials and tools are provided &quot;as is&quot; for educational purposes without warranties of
        completeness, fitness for a particular purpose, or exam outcome.
      </p>
    </InfoPageShell>
  );
}
