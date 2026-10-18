'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Download, Check, ExternalLink, FileText, Eye, MonitorSmartphone } from 'lucide-react';
import type { Resource } from '@/lib/resources';
import { DocPreview, type PreviewMode } from './DocPreview';

const servesStyle: Record<string, string> = {
  DA: 'bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-500/15 dark:text-brand-200 dark:border-brand-400/30',
  CS: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-500/15 dark:text-cyan-200 dark:border-cyan-400/30',
  Both: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-200 dark:border-emerald-400/30',
};

export function PreviewModal({
  resource,
  onClose,
  done,
  onToggle,
}: {
  resource: Resource | null;
  onClose: () => void;
  done: boolean;
  onToggle: () => void;
}) {
  const [mode, setMode] = useState<PreviewMode>('rendered');

  // reset the view whenever a new document opens (?view=office deep-links that tab)
  useEffect(() => {
    if (!resource) return;
    const v = new URLSearchParams(window.location.search).get('view');
    setMode(v === 'office' ? 'office' : 'rendered');
  }, [resource]);

  // lock page scroll + Esc to close while open
  useEffect(() => {
    if (!resource) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [resource, onClose]);

  const openInNewTab = async () => {
    if (!resource) return;
    try {
      const d = await fetch(`/api/view-url?id=${encodeURIComponent(resource.id)}`).then((r) => r.json());
      window.open(
        `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(d.url)}`,
        '_blank',
        'noopener'
      );
    } catch {}
  };

  return (
    <AnimatePresence>
      {resource && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/65 backdrop-blur-sm" onClick={onClose} aria-hidden />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${resource.title} preview`}
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="card relative flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-b-none sm:h-[88vh] sm:rounded-3xl"
          >
            {/* top bar */}
            <div className="relative flex items-center justify-between gap-4 border-b border-fg/10 px-5 py-4">
              <div className="pointer-events-none absolute inset-0 aurora opacity-60" />
              <div className="relative flex min-w-0 items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow">
                  <FileText className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <span
                    className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-bold ${servesStyle[resource.serves]}`}
                  >
                    {resource.serves === 'Both' ? 'DA & CS' : resource.serves}
                  </span>
                  <h3 className="truncate text-lg font-extrabold leading-tight text-fg">{resource.title}</h3>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close preview"
                className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl text-fg/50 transition hover:bg-fg/10 hover:text-fg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* body: details | live preview */}
            <div className="grid min-h-0 flex-1 grid-rows-[auto_1fr] lg:grid-cols-[18rem_1fr] lg:grid-rows-1">
              {/* details */}
              <aside className="border-b border-fg/10 p-5 lg:overflow-y-auto lg:border-b-0 lg:border-r">
                <dl className="grid grid-cols-3 gap-2 lg:grid-cols-1">
                  {[
                    ['Group', resource.group],
                    ['Format', resource.ext.toUpperCase()],
                    ['Size', `${resource.sizeKB} KB`],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-fg/5 px-3 py-2.5">
                      <dt className="text-[10px] font-semibold uppercase tracking-wide text-fg/40">{k}</dt>
                      <dd className="mt-0.5 truncate text-xs font-bold text-fg/80">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-3 hidden rounded-xl border border-fg/10 p-3 sm:block">
                  <div className="text-[10px] font-bold uppercase tracking-wide text-fg/40">What&apos;s inside</div>
                  <p className="mt-1 text-sm leading-relaxed text-fg/70">{resource.description}</p>
                </div>

                <div className="mt-4 flex gap-2 lg:flex-col">
                  <a
                    href={`/api/download?id=${encodeURIComponent(resource.id)}`}
                    className="btn-primary flex-1 justify-center"
                  >
                    <Download className="h-4 w-4" /> Download
                  </a>
                  <button
                    onClick={onToggle}
                    className={`btn flex-1 justify-center border ${
                      done
                        ? 'border-emerald-400 bg-emerald-500 text-white'
                        : 'border-fg/15 text-fg/70 hover:border-emerald-400 hover:text-emerald-500'
                    }`}
                  >
                    <Check className="h-4 w-4" /> {done ? 'Completed' : 'Mark done'}
                  </button>
                </div>
              </aside>

              {/* live preview */}
              <section className="flex min-h-0 flex-col bg-fg/[0.04]">
                <div className="flex items-center justify-between gap-2 px-4 py-3">
                  <div className="flex gap-1 rounded-full border border-fg/10 bg-white/70 p-1 dark:bg-ink/50">
                    {(
                      [
                        ['rendered', 'Rendered', Eye],
                        ['office', 'Office Online', MonitorSmartphone],
                      ] as const
                    ).map(([m, label, Icon]) => (
                      <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                          mode === m ? 'bg-brand-600 text-white shadow' : 'text-fg/60 hover:text-fg'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" /> {label}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={openInNewTab}
                    className="btn-ghost px-3 py-1.5 text-xs"
                    title="Open in Microsoft Office viewer (new tab)"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> New tab
                  </button>
                </div>
                <div className="relative min-h-0 flex-1 px-2 pb-2 sm:px-4 sm:pb-4">
                  <div className="relative h-full overflow-hidden rounded-2xl">
                    <DocPreview resource={resource} mode={mode} />
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
