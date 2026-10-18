import Link from 'next/link';
import { Route } from 'lucide-react';
import { footerLegal } from '@/lib/nav-links';
import { officialSourceLinksChecked } from '@/lib/exam-info';
import { officialGate } from '@/lib/site-config';

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-fg/5 bg-ink text-white">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white">
              <Route className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-white">VektaPrep</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            GATE 2027 preparation resources for Data Science &amp; AI and Computer Science — notes,
            practice documents, and a browser-based roadmap tracker.
          </p>
          <p className="mt-4 text-xs text-white/40">
            Not affiliated with IIT Madras or the GATE organizing institute. Verify current dates and
            rules on the{' '}
            <a
              href={officialGate.home}
              className="underline hover:text-white/70"
              target="_blank"
              rel="noopener noreferrer"
            >
              official GATE 2027 website
            </a>
            . Official source links last checked {officialSourceLinksChecked}.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white/50">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li>
              <Link href="/resources" className="hover:text-white">
                Resource library
              </Link>
            </li>
            <li>
              <Link href="/study-roadmap" className="hover:text-white">
                Study roadmap
              </Link>
            </li>
            <li>
              <Link href="/mock-tests" className="hover:text-white">
                Mock tests
              </Link>
            </li>
            <li>
              <Link href="/gate/da" className="hover:text-white">
                GATE DA preparation
              </Link>
            </li>
            <li>
              <Link href="/gate/cs" className="hover:text-white">
                GATE CS preparation
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white/50">Policies &amp; exam</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {footerLegal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/40 sm:flex-row">
          <span>© {new Date().getFullYear()} VektaPrep. For educational use.</span>
          <Link href="/disclaimer" className="hover:text-white/70">
            Independent educational resource — read disclaimer
          </Link>
        </div>
      </div>
    </footer>
  );
}
