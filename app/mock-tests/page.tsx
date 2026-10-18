import Link from 'next/link';
import { Download, FileText, Timer } from 'lucide-react';
import { resources } from '@/lib/resources';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'GATE 2027 Mock Tests',
  description:
    'Download DA and CS mock-test documents for offline practice. Interactive online exam mode is not provided.',
  path: '/mock-tests',
});

const mockIds = resources.filter(
  (r) => r.id.startsWith('Mock_') || r.id === 'Mixed_Revision_Test'
);

export default function MockTestsPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-fg/5">
        <div className="pointer-events-none absolute inset-0 aurora opacity-60" />
        <div className="container-x relative py-14 sm:py-20">
          <span className="chip">
            <Timer className="h-3.5 w-3.5" /> Offline mock documents
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Mock test <span className="gradient-text">documents</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-fg/60">
            VektaPrep mock tests are downloadable Word documents for offline practice. Use the
            instructions in each document and verify its answer material before relying on it. There
            is no built-in online timer or auto-scoring.
          </p>
          <p className="mt-3 text-sm text-fg/50">
            The displayed catalogue descriptions and question totals have not been independently
            checked against document contents.
          </p>
        </div>
      </section>

      <section className="container-x grid gap-4 py-12 sm:grid-cols-2">
        {mockIds.map((r) => (
          <article key={r.id} className="card flex flex-col p-6">
            <div className="flex items-start gap-3">
              <FileText className="h-6 w-6 text-brand-600" aria-hidden />
              <div>
                <h2 className="text-lg font-extrabold text-fg">{r.title}</h2>
                <p className="mt-1 text-sm text-fg/55">{r.description}</p>
                <p className="mt-2 text-xs font-semibold text-fg/45">Serves: {r.serves}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href={`/resources?doc=${encodeURIComponent(r.id)}`}
                className="btn-ghost border border-fg/15 px-4 py-2 text-xs"
              >
                Preview
              </Link>
              <a
                href={`/api/download?id=${encodeURIComponent(r.id)}`}
                className="btn-primary px-4 py-2 text-xs"
              >
                <Download className="h-4 w-4" /> Download
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
