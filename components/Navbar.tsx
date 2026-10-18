'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Route, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const links = [
  { href: '/#roadmap', label: 'Roadmap' },
  { href: '/#features', label: 'Why VektaPrep' },
  { href: '/resources', label: 'Resources' },
];

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="grid h-10 w-10 place-items-center rounded-xl text-fg/70 transition-colors hover:bg-fg/5 hover:text-fg"
    >
      <Sun className="h-5 w-5 hidden dark:block" />
      <Moon className="h-5 w-5 block dark:hidden" />
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-ink/80 backdrop-blur-xl border-b border-fg/5 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow">
            <Route className="h-5 w-5" />
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            Vekta<span className="gradient-text">Prep</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                (l.href === '/resources' && pathname === '/resources')
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-200'
                  : 'text-fg/70 hover:text-fg hover:bg-fg/5'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link href="/resources" className="btn-primary ml-2">
            Get the library
          </Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            className="grid h-10 w-10 place-items-center rounded-xl text-fg"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-fg/5 bg-white/95 dark:bg-ink/95 backdrop-blur-xl md:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-fg/80 hover:bg-fg/5"
              >
                {l.label}
              </Link>
            ))}
            <Link href="/resources" onClick={() => setOpen(false)} className="btn-primary mt-2">
              Get the library
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
