import { InfoPageShell } from '@/components/InfoPageShell';
import { pageMetadata } from '@/lib/page-metadata';
import { catalogStats } from '@/lib/catalog-stats';
import Link from 'next/link';

export const metadata = pageMetadata({
  title: 'About VektaPrep',
  description:
    'Learn what VektaPrep offers GATE 2027 DA and CS aspirants: study notes, question banks, mocks, and an animated preparation roadmap.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <InfoPageShell
      title="About VektaPrep"
      lede="An independent study hub for GATE 2027 Data Science & AI (DA) and Computer Science & IT (CS) aspirants."
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }]}
    >
      <h2>What VektaPrep is</h2>
      <p>
        VektaPrep combines a scroll-animated preparation roadmap with a downloadable study library of{' '}
        {catalogStats.documentCount} Word documents: subject notes, formula references, question banks,
        previous-year guides, and mock-test materials. It is built for students who want structured
        guidance without paywalled access to core materials.
      </p>

      <h2>Who it is for</h2>
      <p>
        Undergraduate and graduate students preparing for GATE 2027 papers DA and/or CS, especially
        those balancing shared engineering mathematics and CS foundations with paper-specific depth.
      </p>

      <h2>How to use the resources</h2>
      <ul>
        <li>Start with the <Link href="/study-roadmap">study roadmap</Link> to understand phase order.</li>
        <li>Browse or search the <Link href="/resources">resource library</Link> and download notes locally.</li>
        <li>Use question banks and mocks as timed practice - they are provided as documents, not live online exams.</li>
        <li>Track document and phase completion in your browser; progress is stored on this device only.</li>
        <li>Cross-check dates, eligibility, and rules on the official GATE website.</li>
      </ul>

      <h2>Reporting mistakes</h2>
      <p>
        If you find a broken download, a likely wrong answer, or missing attribution, please use the{' '}
        <Link href="/contact">contact & feedback</Link> page. We rely on community reports to improve accuracy.
      </p>

      <h2>What we do not claim</h2>
      <p>
        VektaPrep is not affiliated with IIT Madras or the GATE organizing body. We do not guarantee
        exam results, rank predictions, or that practice questions will appear on the actual paper.
      </p>
    </InfoPageShell>
  );
}
