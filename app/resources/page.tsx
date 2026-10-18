import ResourcesLibrary from '@/components/ResourcesLibrary';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'GATE 2027 Study Resources Library',
  description:
    'Search and download GATE 2027 DA and CS study notes, formula books, question banks, PYQ guides, and mock-test documents.',
  path: '/resources',
});

export default function ResourcesPage() {
  return <ResourcesLibrary />;
}
