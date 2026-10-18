import Link from 'next/link';
import { ArrowRight, FileText, Download } from 'lucide-react';
import { resources, type Resource } from '@/lib/resources';
import { catalogStats } from '@/lib/catalog-stats';
import { officialGate } from '@/lib/site-config';

export function PaperPrepSection({
  paper,
  title,
  description,
}: {
  paper: 'DA' | 'CS';
  title: string;
  description: string;
}) {
  const subjectNotes = resources.filter(
    (r) => r.group === (paper === 'DA' ? 'DA - Data Science & AI' : 'CS - Computer Science & IT')
  );
  const shared = resources.filter((r) => r.group === 'Shared Foundations' || r.group === 'General Aptitude');
  const practice = resources.filter(
    (r) =>
      r.group === 'Practice, PYQs & Mocks' &&
      (r.serves === paper || r.serves === 'Both' || r.id.includes(paper))
  );

  const qBank = resources.find((r) => r.id === `QBank_${paper}`);
  const mocks = resources.filter((r) => r.id.includes(`Mock_${paper}`));

  return (
    <div>
      <section className="relative overflow-hidden border-b border-fg/5">
        <div className="pointer-events-none absolute inset-0 aurora opacity-60" />
        <div className="container-x relative py-14 sm:py-20">
          <span className="chip">GATE 2027 · {paper}</span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-fg/60">{description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/resources" className="btn-primary">
              Browse all resources <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/mock-tests" className="btn-ghost border border-fg/15">
              Mock tests
            </Link>
            <a
              href={paper === 'DA' ? officialGate.syllabusDA : officialGate.syllabusCS}
              className="btn-ghost border border-fg/15"
              target="_blank"
              rel="noopener noreferrer"
            >
              Official syllabus
            </a>
          </div>
          <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ['Subject notes', String(subjectNotes.length)],
              ['Shared core notes', String(shared.length)],
              ['Practice packs', String(practice.length)],
              ['Full mocks', String(mocks.length)],
            ].map(([k, v]) => (
              <div key={k} className="card px-4 py-3">
                <dt className="text-xs font-semibold text-fg/45">{k}</dt>
                <dd className="text-xl font-extrabold text-fg">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-fg/45">
            Library total: {catalogStats.documentCount} documents · manifest updated{' '}
            {new Date(catalogStats.manifestGeneratedAt).toLocaleDateString('en-IN')}
          </p>
        </div>
      </section>

      <section className="container-x space-y-12 py-12">
        <ResourceBlock heading={`${paper}-specific notes`} items={subjectNotes} />
        <ResourceBlock heading="Shared foundations & aptitude" items={shared} />
        <ResourceBlock heading="Practice & mocks" items={[...(qBank ? [qBank] : []), ...mocks, ...practice.filter((p) => !mocks.includes(p) && p !== qBank)]} />
      </section>
    </div>
  );
}

function ResourceBlock({ heading, items }: { heading: string; items: Resource[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h2 className="text-2xl font-extrabold text-fg">{heading}</h2>
      <ul className="mt-4 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((r) => (
          <li key={r.id} className="card card-interactive group flex h-full flex-col gap-2 p-5">
            <div className="flex items-start gap-3">
              <FileText className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden />
              <div className="min-w-0">
                <Link href={`/resources?doc=${encodeURIComponent(r.id)}`} className="font-bold text-fg transition-colors group-hover:text-brand-600 hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
                  {r.title}
                </Link>
                <p className="mt-1 text-sm text-fg/55">{r.description}</p>
              </div>
            </div>
            <a href={`/api/download?id=${encodeURIComponent(r.id)}`} className="btn-primary mt-auto w-fit px-4 py-2 text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500">
              <Download className="h-3.5 w-3.5" /> Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
