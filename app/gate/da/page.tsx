import { PaperPrepSection } from '@/components/PaperPrepSection';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'GATE 2027 DA Preparation',
  description:
    'Data Science and Artificial Intelligence (DA) study notes, question bank, PYQ guide, and full-length mocks on VektaPrep.',
  path: '/gate/da',
});

export default function GateDAPage() {
  return (
    <PaperPrepSection
      paper="DA"
      title="GATE Data Science & Artificial Intelligence (DA)"
      description="Paper-specific notes plus shared mathematics and CS foundations. Practice with the DA question bank and timed mock documents."
    />
  );
}
