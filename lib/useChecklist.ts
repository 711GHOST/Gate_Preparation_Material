'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * A localStorage-backed set of ids (used for progress tracking).
 * SSR-safe: starts empty, hydrates from storage after mount (`ready`).
 */
export function useChecklist(key: string) {
  const [ids, setIds] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setIds(new Set(JSON.parse(raw) as string[]));
    } catch {}
    setReady(true);
  }, [key]);

  const persist = useCallback(
    (s: Set<string>) => {
      try {
        localStorage.setItem(key, JSON.stringify([...s]));
      } catch {}
    },
    [key]
  );

  const toggle = useCallback(
    (id: string) => {
      setIds((prev) => {
        const n = new Set(prev);
        if (n.has(id)) n.delete(id);
        else n.add(id);
        persist(n);
        return n;
      });
    },
    [persist]
  );

  const has = useCallback((id: string) => ids.has(id), [ids]);
  const clear = useCallback(() => {
    setIds(new Set());
    persist(new Set());
  }, [persist]);

  return { ready, ids, has, toggle, clear, count: ids.size };
}
