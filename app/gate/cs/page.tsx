import { PaperPrepSection } from '@/components/PaperPrepSection';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'GATE 2027 CS Preparation',
  description:
    'Computer Science and Information Technology (CS) notes, question bank, PYQ guide, and mock tests on VektaPrep.',
  path: '/gate/cs',
});

export default function GateCSPage() {
  return (
    <PaperPrepSection
      paper="CS"
      title="GATE Computer Science & Information Technology (CS)"
      description="Core CS subjects from discrete mathematics to networks, built on shared programming and algorithms notes."
    />
  );
}
