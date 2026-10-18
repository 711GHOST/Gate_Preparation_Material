'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BookOpen, Map, ClipboardCheck, ChevronDown } from 'lucide-react';
import { homeStats } from '@/lib/catalog-stats';

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 aurora" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-grid-light [background-size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
        aria-hidden
      />

      <div className="container-x relative pb-10 pt-16 sm:pt-24">
        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          custom={0}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="chip mx-auto">GATE 2027 · DA &amp; CS</span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            Prepare Smarter for <span className="gradient-text">GATE 2027</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg/60">
            Your preparation hub for GATE Data Science &amp; Artificial Intelligence (DA) and Computer
            Science &amp; Information Technology (CS). Explore free study notes, formula books, practice
            questions, mock tests, and a structured preparation roadmap.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/resources" className="btn-primary">
              <BookOpen className="h-4 w-4" aria-hidden /> Explore free resources
            </Link>
            <Link href="/study-roadmap" className="btn-ghost border border-fg/10">
              <Map className="h-4 w-4" aria-hidden /> Start your study roadmap
            </Link>
            <Link href="/mock-tests" className="btn-ghost border border-fg/10">
              <ClipboardCheck className="h-4 w-4" aria-hidden /> Practise mock tests
            </Link>
          </div>
        </motion.div>

        <div
          className="reveal mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3"
          style={{ animationDelay: '0.25s' }}
        >
          {homeStats.map((s) => (
            <div key={s.label} className="glass rounded-2xl px-4 py-4 text-center">
              <div className="text-2xl font-extrabold text-fg">{s.value}</div>
              <div className="mt-0.5 text-xs font-medium text-fg/50">{s.label}</div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-3 max-w-xl text-center text-xs text-fg/45">
          Catalogue counts reflect listed files; question totals and page counts are not verified.
        </p>

        <div className="mt-14 flex justify-center">
          {reduceMotion ? (
            <div className="flex flex-col items-center text-fg/40">
              <span className="text-xs font-semibold uppercase tracking-widest">Scroll</span>
              <ChevronDown className="h-5 w-5" aria-hidden />
            </div>
          ) : (
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex flex-col items-center text-fg/40"
            >
              <span className="text-xs font-semibold uppercase tracking-widest">Scroll</span>
              <ChevronDown className="h-5 w-5" aria-hidden />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
