'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';
import type { Resource } from '@/lib/resources';

export type PreviewMode = 'rendered' | 'office';

/** Inline document preview: client-side render (docx-preview) or embedded Office Online viewer. */
export function DocPreview({ resource, mode }: { resource: Resource; mode: PreviewMode }) {
  return mode === 'rendered' ? (
    <RenderedPreview key={`r-${resource.id}`} resource={resource} />
  ) : (
    <OfficePreview key={`o-${resource.id}`} resource={resource} />
  );
}

function RenderedPreview({ resource }: { resource: Resource }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const docRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [err, setErr] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/file?id=${encodeURIComponent(resource.id)}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const blob = await res.blob();
        const { renderAsync } = await import('docx-preview');
        if (cancelled || !docRef.current) return;
        docRef.current.innerHTML = '';
        await renderAsync(blob, docRef.current, undefined, {
          className: 'docx',
          inWrapper: true,
          breakPages: true,
          ignoreLastRenderedPageBreak: true,
          renderHeaders: true,
          renderFooters: true,
          useBase64URL: true,
        });
        if (cancelled) return;
        fit();
        setState('ready');
        /*TMPSCROLL*/ const ps = new URLSearchParams(location.search).get('pscroll'); if (ps && hostRef.current) setTimeout(() => { hostRef.current!.scrollTop = hostRef.current!.scrollHeight * parseFloat(ps); }, 300);
      } catch (e: unknown) {
        if (!cancelled) {
          setErr(e instanceof Error ? e.message : String(e));
          setState('error');
        }
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource.id]);

  // scale the A4 pages to the pane width
  const fit = () => {
    const host = hostRef.current;
    const doc = docRef.current;
    if (!host || !doc) return;
    const page = doc.querySelector('section.docx') as HTMLElement | null;
    if (!page) return;
    (doc.style as CSSStyleDeclaration & { zoom: string }).zoom = '1';
    const scale = Math.min(1, (host.clientWidth - 24) / page.offsetWidth);
    (doc.style as CSSStyleDeclaration & { zoom: string }).zoom = String(scale > 0 ? scale : 1);
  };

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const ro = new ResizeObserver(() => fit());
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="docx-host relative h-full w-full overflow-auto">
      {state === 'loading' && <Status icon="spin" text="Rendering document…" />}
      {state === 'error' && (
        <Status icon="warn" text={`Couldn’t render this file (${err}). Try the Office Online tab or Download.`} />
      )}
      <div ref={docRef} className={state === 'ready' ? '' : 'invisible absolute'} />
    </div>
  );
}

function OfficePreview({ resource }: { resource: Resource }) {
  const [src, setSrc] = useState<string | null>(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/view-url?id=${encodeURIComponent(resource.id)}`)
      .then((r) => r.json())
      .then((d: { url: string; source: string; publiclyReachable?: boolean }) => {
        if (cancelled) return;
        if (d.source === 'static' && d.publiclyReachable === false) {
          setNote('Office Online needs a public file URL. Configure S3 (or deploy the site) to enable this view.');
          return;
        }
        setSrc(`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(d.url)}`);
      })
      .catch((e) => !cancelled && setNote(String(e)));
    return () => {
      cancelled = true;
    };
  }, [resource.id]);

  if (note) return <Status icon="warn" text={note} />;
  // our spinner only covers the URL lookup; once the iframe exists, Office shows its own loader
  if (!src) return <Status icon="spin" text="Preparing Office Online viewer…" />;
  return (
    <iframe
      title={`${resource.title} — Office Online preview`}
      src={src}
      className="h-full w-full rounded-2xl border-0 bg-white"
      allow="fullscreen"
    />
  );
}

function Status({ icon, text }: { icon: 'spin' | 'warn'; text: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center p-6 text-center">
      <div className="flex max-w-sm flex-col items-center gap-3 text-sm text-fg/60">
        {icon === 'spin' ? (
          <Loader2 className="h-7 w-7 animate-spin text-brand-500" />
        ) : (
          <AlertTriangle className="h-7 w-7 text-amber-500" />
        )}
        {text}
      </div>
    </div>
  );
}
