import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { RoadMap } from '@/components/RoadMap';
import {
  ClipboardList,
  Crosshair,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  FolderDown,
} from 'lucide-react';
import { resources } from '@/lib/resources';

const features = [
  {
    icon: ClipboardList,
    title: 'Plan',
    body: 'Capture the whole syllabus, set milestones, and organise every subject into a sequence that respects prerequisites.',
    color: '#6457f6',
  },
  {
    icon: Crosshair,
    title: 'Focus',
    body: 'Prioritise what matters and study the shared core once - it powers both the DA and CS papers at the same time.',
    color: '#a855f7',
  },
  {
    icon: BarChart3,
    title: 'Achieve',
    body: 'Track progress with question banks, full-length mocks and an error log that turns mistakes into marks.',
    color: '#22d3ee',
  },
  {
    icon: ShieldCheck,
    title: 'Verified',
    body: 'Every topic is mapped to the official GATE 2027 (IIT Madras) syllabus - nothing added, dropped, or faked.',
    color: '#34d399',
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <RoadMap />

      {/* Features */}
      <section id="features" className="relative py-20 sm:py-28">
        <div className="container-x">
          <header className="mx-auto max-w-2xl text-center">
            <span className="chip mx-auto">Why VektaPrep</span>
            <h2 className="section-title mt-5">
              One system. <span className="gradient-text">Endless possibilities.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-fg/60">
              A single, coherent library that takes you from your first concept to the exam hall -
              designed for the aspirant preparing both papers.
            </p>
          </header>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="card group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <span
                  className="grid h-12 w-12 place-items-center rounded-2xl text-white"
                  style={{ background: f.color }}
                >
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold text-fg">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg/60">{f.body}</p>
                <span
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30"
                  style={{ background: f.color }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources CTA band */}
      <section className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-7 py-12 text-white sm:px-14 sm:py-16">
          <div className="pointer-events-none absolute inset-0 aurora opacity-60" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="chip border-white/20 bg-white/10 text-white">
                <FolderDown className="h-3.5 w-3.5" /> {resources.length} documents · free
              </span>
              <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
                The entire study library, ready to download.
              </h2>
              <p className="mt-4 max-w-lg text-white/70">
                Textbook-quality notes, formula books, question banks, PYQ guides and full-length
                mocks - grouped by subject and searchable. Served securely from cloud storage.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/resources" className="btn bg-white text-ink hover:bg-white/90">
                  Browse resources <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/#roadmap"
                  className="btn border border-white/25 text-white hover:bg-white/10"
                >
                  See the roadmap
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['Foundations', 'DA & CS', 'Question banks', 'Full mocks'].map((t, i) => (
                <div
                  key={t}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-semibold text-white/80 backdrop-blur"
                  style={{ transform: i % 2 ? 'translateY(10px)' : 'none' }}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-10" />
    </>
  );
}
