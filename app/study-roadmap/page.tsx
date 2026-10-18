import { RoadMap } from '@/components/RoadMap';
import { pageMetadata } from '@/lib/page-metadata';
import Link from 'next/link';

export const metadata = pageMetadata({
  title: 'GATE 2027 Study Roadmap',
  description:
    'Follow a five-phase animated roadmap from shared foundations to mocks and final revision, with progress saved in your browser.',
  path: '/study-roadmap',
});

export default function StudyRoadmapPage() {
  return (
    <>
      <section className="container-x pt-12 sm:pt-16">
        <span className="chip">Structured preparation</span>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          Your GATE 2027 study roadmap
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-fg/60">
          Five phases from shared foundations through paper-specific depth, practice, mocks, and revision.
          Tick phases as you complete them - progress is stored locally on this device. For a printable
          week-by-week plan, download the{' '}
          <Link href="/resources?doc=M1_Study_Roadmap" className="font-semibold text-brand-600">
            Study Roadmap
          </Link>{' '}
          document.
        </p>
      </section>
      <RoadMap />
    </>
  );
}
