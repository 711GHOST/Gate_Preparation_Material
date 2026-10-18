'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * A localStorage-backed set of ids (used for progress tracking).
 * SSR-safe: starts empty, hydrates from storage after mount (`ready`).
 */
export function useChecklist(key: string) {
  const [ids, setIds] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);
  const idsRef = useRef(ids);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (!Array.isArray(parsed) || parsed.some((id) => typeof id !== 'string')) {
          throw new TypeError('Saved checklist data is not a list of strings.');
        }
        const loaded = new Set(parsed as string[]);
        idsRef.current = loaded;
        setIds(loaded);
      }
    } catch (error) {
      console.error(`Unable to read saved checklist "${key}":`, error);
      setStorageError(
        'Saved progress could not be read. Any new progress may not persist until browser storage is available.'
      );
    }
    setReady(true);
  }, [key]);

  const persist = useCallback(
    (s: Set<string>) => {
      try {
        localStorage.setItem(key, JSON.stringify([...s]));
        setStorageError(null);
      } catch (error) {
        console.error(`Unable to save checklist "${key}":`, error);
        setStorageError(
          'Progress could not be saved in this browser. The displayed changes may be lost when you leave or refresh.'
        );
      }
    },
    [key]
  );

  const toggle = useCallback(
    (id: string) => {
      const next = new Set(idsRef.current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      idsRef.current = next;
      setIds(next);
      persist(next);
    },
    [persist]
  );

  const has = useCallback((id: string) => ids.has(id), [ids]);
  const clear = useCallback(() => {
    const cleared = new Set<string>();
    idsRef.current = cleared;
    setIds(cleared);
    persist(cleared);
  }, [persist]);

  return { ready, ids, has, toggle, clear, count: ids.size, storageError };
}
