import { InfoPageShell } from '@/components/InfoPageShell';
import { SyllabusMatrix } from '@/components/SyllabusMatrix';
import { pageMetadata } from '@/lib/page-metadata';
import { officialSourceLinksChecked } from '@/lib/exam-info';
import { syllabusLastMapped } from '@/lib/syllabus-coverage';
import { officialGate } from '@/lib/site-config';

export const metadata = pageMetadata({
  title: 'Syllabus Coverage',
  description:
    'High-level GATE 2027 DA and CS topic coverage mapped to VektaPrep notes and practice materials, with links to official syllabi.',
  path: '/syllabus',
});

export default function SyllabusPage() {
  return (
    <InfoPageShell
      title="Syllabus coverage"
      lede="Map official GATE topics to available VektaPrep materials. This is not a substitute for the official syllabus PDF."
      breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Syllabus', href: '/syllabus' }]}
    >
      <p>
        Official syllabi:{' '}
        <a href={officialGate.papersAndSyllabus} target="_blank" rel="noopener noreferrer">
          GATE 2027 test papers &amp; syllabus
        </a>{' '}
        ·{' '}
        <a href={officialGate.syllabusDA} target="_blank" rel="noopener noreferrer">
          DA syllabus (PDF)
        </a>{' '}
        ·{' '}
        <a href={officialGate.syllabusCS} target="_blank" rel="noopener noreferrer">
          CS syllabus (PDF)
        </a>
        . Official source links last checked {officialSourceLinksChecked}; this records link availability,
        not independent confirmation of exam dates or marking rules. Topic mapping last updated{' '}
        {syllabusLastMapped}.
      </p>
      <p>
        For detailed checklists, download{' '}
        <a href="/resources?doc=00_GATE2027_Syllabus_Checklist_and_Coverage_Matrix">
          Syllabus, Checklist &amp; Coverage Matrix
        </a>{' '}
        from the library.
      </p>
      <SyllabusMatrix />
    </InfoPageShell>
  );
}
