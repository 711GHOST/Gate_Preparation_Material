import Link from 'next/link';
import { Route } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-fg/5 bg-ink text-white">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white">
              <Route className="h-5 w-5" />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-white">
              VektaPrep
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            A guided, animated roadmap and a complete study library for GATE 2027 -
            Data Science &amp; AI and Computer Science. One system, endless possibilities.
          </p>
          <p className="mt-4 text-xs text-white/40">
            Built for the aspirant. Syllabus verified against the official GATE 2027 (IIT Madras) sources.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white/50">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li><Link href="/#roadmap" className="hover:text-white">The roadmap</Link></li>
            <li><Link href="/#features" className="hover:text-white">Why VektaPrep</Link></li>
            <li><Link href="/resources" className="hover:text-white">Resources &amp; papers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white/50">Exam</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li>GATE 2027 · DA &amp; CS</li>
            <li>Exam: 6-21 Feb 2027</li>
            <li>Results: 19 Mar 2027</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/40 sm:flex-row">
          <span>© {new Date().getFullYear()} VektaPrep. For educational use.</span>
          <span>#worksmarter · #productivityOS</span>
        </div>
      </div>
    </footer>
  );
}
