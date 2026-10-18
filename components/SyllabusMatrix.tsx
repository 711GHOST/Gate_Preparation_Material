'use client';

import Link from 'next/link';
import { syllabusTopics, type CoverageStatus } from '@/lib/syllabus-coverage';
import { useChecklist } from '@/lib/useChecklist';
import { useMemo, useState } from 'react';

const statusLabel: Record<CoverageStatus, string> = {
  'not-started': 'Not started (no mapped material)',
  material: 'Study material mapped',
  practice: 'Practice resource mapped',
  revision: 'Revision completed (you)',
};

const statusClass: Record<CoverageStatus, string> = {
  'not-started': 'bg-fg/5 text-fg/50',
  material: 'bg-brand-50 text-brand-800 dark:bg-brand-500/15 dark:text-brand-100',
  practice: 'bg-cyan-50 text-cyan-800 dark:bg-cyan-500/15 dark:text-cyan-100',
  revision: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-100',
};

type PaperFilter = 'All' | 'DA' | 'CS' | 'Both';

export function SyllabusMatrix() {
  const [paper, setPaper] = useState<PaperFilter>('All');
  const { ready, has, toggle, storageError } = useChecklist('vekta.syllabus.revision');

  const rows = useMemo(() => {
    return syllabusTopics.filter((t) => {
      if (paper === 'All') return true;
      if (paper === 'Both') return t.paper === 'Both';
      return t.paper === paper;
    });
  }, [paper]);

  return (
    <div className="mt-10 w-full min-w-0">
      <p className="text-sm text-fg/55">
        Platform coverage is inferred from available notes and practice documents. Mark{' '}
        <strong>Revision completed</strong> for your own tracking - saved in this browser only.
      </p>
      {storageError && (
        <p role="alert" className="mt-3 text-sm text-red-700 dark:text-red-300">
          {storageError}
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {(['All', 'Both', 'DA', 'CS'] as PaperFilter[]).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPaper(p)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
              paper === p ? 'bg-brand-600 text-white' : 'bg-fg/5 text-fg/70 hover:bg-fg/10'
            }`}
          >
            {p === 'Both' ? 'Shared topics' : p}
          </button>
        ))}
      </div>
      <div
        className="mt-6 w-full overflow-x-auto rounded-2xl border border-fg/10"
        role="region"
        aria-label="Syllabus coverage table; scroll horizontally to view all columns"
        tabIndex={0}
      >
        <table className="w-full min-w-[960px] table-fixed text-left text-sm">
          <caption className="sr-only">
            Mapped GATE syllabus topics, VektaPrep coverage, revision progress, and related materials
          </caption>
          <colgroup>
            <col className="w-[24%]" />
            <col className="w-[8%]" />
            <col className="w-[24%]" />
            <col className="w-[17%]" />
            <col className="w-[27%]" />
          </colgroup>
          <thead className="bg-fg/[0.04] text-xs uppercase tracking-wide text-fg/45">
            <tr>
              <th scope="col" className="px-4 py-3 font-bold">Topic</th>
              <th scope="col" className="px-4 py-3 font-bold">Paper</th>
              <th scope="col" className="px-4 py-3 font-bold">VektaPrep coverage</th>
              <th scope="col" className="px-4 py-3 font-bold">Your revision</th>
              <th scope="col" className="px-4 py-3 font-bold">Materials</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => {
              const userDone = ready && has(t.id);
              return (
                <tr key={t.id} className="border-t border-fg/8 transition-colors hover:bg-fg/[0.03]">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-fg">{t.title}</div>
                    <div className="text-xs text-fg/45">{t.section}</div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-fg/70">{t.paper}</td>
                  <td className="px-4 py-3 align-middle">
                    <span className={`inline-flex max-w-full rounded-full px-2.5 py-1 text-xs font-semibold leading-snug ${statusClass[t.status]}`}>
                      {statusLabel[t.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <button
                      type="button"
                      onClick={() => toggle(t.id)}
                      className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
                        userDone
                          ? 'border-emerald-400 bg-emerald-500 text-white'
                          : 'border-fg/20 text-fg/60 hover:border-emerald-400'
                      }`}
                    >
                      {userDone ? 'Completed' : 'Mark done'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <ul className="space-y-2">
                      {t.resourceIds.slice(0, 3).map((id) => (
                        <li key={id} className="break-words">
                          <Link
                            href={`/resources?doc=${encodeURIComponent(id)}`}
                            className="text-xs font-semibold text-brand-600 hover:underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                          >
                            {id.replace(/_/g, ' ')}
                          </Link>
                        </li>
                      ))}
                      {t.resourceIds.length > 3 && (
                        <li className="text-xs text-fg/45">+{t.resourceIds.length - 3} more</li>
                      )}
                    </ul>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-fg/45">
        Showing {rows.length} mapped topics. Full official syllabi may list additional sub-topics -
        use the syllabus checklist document in the library for detail.
      </p>
    </div>
  );
}
