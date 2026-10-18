'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, FileText, Download, Layers, Check, RotateCcw, Eye } from 'lucide-react';
import { resources, groupResources, groupId, type Resource } from '@/lib/resources';
import { useChecklist } from '@/lib/useChecklist';
import { PreviewModal } from '@/components/PreviewModal';

type Filter = 'All' | 'DA' | 'CS' | 'Both';
const FILTERS: Filter[] = ['All', 'DA', 'CS', 'Both'];

const servesStyle: Record<string, string> = {
  DA: 'bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-500/15 dark:text-brand-200 dark:border-brand-400/30',
  CS: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-500/15 dark:text-cyan-200 dark:border-cyan-400/30',
  Both: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-200 dark:border-emerald-400/30',
};

export default function ResourcesLibrary() {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState<Filter>('All');
  const [preview, setPreview] = useState<Resource | null>(null);
  const { ready, has, toggle, clear, count, storageError } = useChecklist('vekta.resources');

  // deep-link: /resources?doc=<id> opens that document's preview on load
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('doc');
    if (id) {
      const r = resources.find((x) => x.id === id);
      if (r) setPreview(r);
    }
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return resources.filter((r) => {
      const matchFilter =
        filter === 'All' ? true : filter === 'Both' ? r.serves === 'Both' : r.serves === filter;
      const matchQ =
        !needle ||
        r.title.toLowerCase().includes(needle) ||
        r.description.toLowerCase().includes(needle) ||
        r.group.toLowerCase().includes(needle);
      return matchFilter && matchQ;
    });
  }, [q, filter]);

  const grouped = useMemo(() => groupResources(filtered), [filtered]);
  const pct = ready ? Math.round((count / resources.length) * 100) : 0;

  return (
    <div className="relative">
      {/* header */}
      <section className="relative overflow-hidden border-b border-fg/5">
        <div className="pointer-events-none absolute inset-0 aurora opacity-70" />
        <div className="container-x relative py-14 sm:py-20">
          <span className="chip">
            <Layers className="h-3.5 w-3.5" /> Resources &amp; papers
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            GATE 2027 <span className="gradient-text">study library</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-fg/60">
            {resources.length} downloadable documents including notes, formula references, question
            banks, previous-year guides and mock tests. Downloads use cloud storage when configured,
            with bundled files as a fallback.
          </p>

          {/* progress tracker */}
          <div className="mt-8 card max-w-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-fg">Your progress</div>
                <div className="text-xs text-fg/50">
                  {ready ? count : 0} of {resources.length} documents completed
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-extrabold gradient-text tabular-nums">{pct}%</span>
                {ready && count > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm('Reset all resource completion progress saved in this browser?')) {
                        clear();
                      }
                    }}
                    className="grid h-9 w-9 place-items-center rounded-xl text-fg/50 transition hover:bg-fg/5 hover:text-fg"
                    aria-label="Reset progress"
                    title="Reset progress"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-fg/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 via-accent-violet to-accent-cyan transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            {storageError && (
              <p role="alert" className="mt-3 text-sm text-red-700 dark:text-red-300">
                {storageError}
              </p>
            )}
          </div>

          {/* toolbar */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-fg/40" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search subjects, formula books, mocks…"
                className="w-full rounded-full border border-fg/10 bg-white/80 py-3.5 pl-12 pr-4 text-sm font-medium text-fg shadow-sm outline-none ring-brand-400/40 backdrop-blur transition placeholder:text-fg/40 focus:ring-4 dark:bg-ink/50"
              />
            </div>
            <div className="flex gap-1.5 rounded-full border border-fg/10 bg-white/80 p-1 backdrop-blur dark:bg-ink/50">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    filter === f ? 'bg-brand-600 text-white shadow' : 'text-fg/60 hover:text-fg'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-3 text-sm text-fg/50">
            Showing <b className="text-fg/70">{filtered.length}</b> of {resources.length} documents.
            Progress is saved in this browser only (localStorage).
          </p>
        </div>
      </section>

      {/* groups */}
      <section className="container-x py-12 sm:py-16">
        {grouped.length === 0 && (
          <div className="card grid place-items-center gap-2 py-20 text-center">
            <FileText className="h-10 w-10 text-fg/30" />
            <p className="text-fg/60">No documents match your search.</p>
          </div>
        )}

        <div className="space-y-14">
          {grouped.map(([group, items]) => {
            const groupDone = ready ? items.filter((r) => has(r.id)).length : 0;
            return (
              <div key={group} id={groupId(group)} className="scroll-mt-28">
                <div className="mb-5 flex items-center gap-3">
                  <h2 className="text-xl font-extrabold text-fg sm:text-2xl">{group}</h2>
                  <span className="rounded-full bg-fg/5 px-2.5 py-0.5 text-xs font-semibold text-fg/50">
                    {groupDone}/{items.length}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-fg/10 to-transparent" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((r, i) => (
                    <ResourceCard
                      key={r.id}
                      r={r}
                      index={i}
                      done={ready && has(r.id)}
                      onToggle={() => toggle(r.id)}
                      onPreview={() => setPreview(r)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <PreviewModal
        resource={preview}
        onClose={() => setPreview(null)}
        done={!!preview && ready && has(preview.id)}
        onToggle={() => preview && toggle(preview.id)}
      />
    </div>
  );
}

function ResourceCard({
  r,
  index,
  done,
  onToggle,
  onPreview,
}: {
  r: Resource;
  index: number;
  done: boolean;
  onToggle: () => void;
  onPreview: () => void;
}) {
  return (
    <div
      style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}
      className={`reveal card group flex flex-col p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow ${
        done ? 'ring-2 ring-emerald-400/60' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
          <FileText className="h-5 w-5" />
        </span>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${servesStyle[r.serves]}`}
          >
            {r.serves}
          </span>
          <button
            onClick={onToggle}
            aria-label={done ? 'Mark as not done' : 'Mark as done'}
            title={done ? 'Completed - click to undo' : 'Mark as completed'}
            className={`grid h-7 w-7 place-items-center rounded-full border transition ${
              done
                ? 'border-emerald-400 bg-emerald-500 text-white'
                : 'border-fg/20 text-fg/30 hover:border-emerald-400 hover:text-emerald-500'
            }`}
          >
            <Check className="h-4 w-4" />
          </button>
        </div>
      </div>

      <button onClick={onPreview} className="mt-4 text-left">
        <h3 className="font-extrabold leading-snug text-fg transition-colors group-hover:text-brand-600">
          {r.title}
        </h3>
      </button>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-fg/55">{r.description}</p>

      <div className="mt-4 flex items-center justify-between gap-2">
        <button
          onClick={onPreview}
          className="btn-ghost border border-fg/15 px-3 py-2 text-xs"
        >
          <Eye className="h-4 w-4" /> Preview
        </button>
        <a
          href={`/api/download?id=${encodeURIComponent(r.id)}`}
          className="btn-primary px-4 py-2 text-xs"
        >
          <Download className="h-4 w-4" /> Download
        </a>
      </div>
    </div>
  );
}
