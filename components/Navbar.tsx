'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Route, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { mainNav } from '@/lib/nav-links';

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="grid h-10 w-10 place-items-center rounded-xl text-fg/70 transition-colors hover:bg-fg/5 hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
    >
      <Sun className="h-5 w-5 hidden dark:block" aria-hidden />
      <Moon className="h-5 w-5 block dark:hidden" aria-hidden />
    </button>
  );
}

function isActive(pathname: string, href: string, match?: (p: string) => boolean) {
  if (match) return match(pathname);
  if (href === '/') return pathname === '/';
  if (href.startsWith('/#')) return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const closeMenu = useCallback(() => {
    setOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', onKey);
    firstLinkRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open, closeMenu]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-fg/5 bg-white/80 shadow-sm backdrop-blur-xl dark:bg-ink/80'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between gap-3" aria-label="Main">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow">
            <Route className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            Vekta<span className="gradient-text">Prep</span>
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 lg:flex">
          {mainNav.map((l) => {
            const active = isActive(pathname, l.href, l.match);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
                  active
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-200'
                    : 'text-fg/70 hover:bg-fg/5 hover:text-fg'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <ThemeToggle />
          <Link href="/resources" className="btn-primary ml-1 whitespace-nowrap">
            Explore resources
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
          </button>
        </div>
      </nav>

      {open && (
        <nav
          id={menuId}
          className="border-t border-fg/5 bg-white/95 backdrop-blur-xl dark:bg-ink/95 lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="container-x flex max-h-[70vh] flex-col gap-1 overflow-y-auto py-4">
            {mainNav.map((l, i) => {
              const active = isActive(pathname, l.href, l.match);
              return (
                <Link
                  key={l.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 ${
                    active ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-200' : 'text-fg/80 hover:bg-fg/5'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link href="/resources" onClick={() => setOpen(false)} className="btn-primary mt-2">
              Explore resources
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
