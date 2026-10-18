'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, FileText, ChevronDown } from 'lucide-react';
import { stats } from '@/lib/roadmap';

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 aurora" />
      <div className="pointer-events-none absolute inset-0 bg-grid-light [background-size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />

      <div className="container-x relative pb-10 pt-16 sm:pt-24">
        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          custom={0}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="chip mx-auto">
            <Sparkles className="h-3.5 w-3.5" /> #productivityOS · GATE 2027
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
            Your <span className="gradient-text">Roadmap</span>
            <br /> to a Cracked GATE
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-fg/60">
            A simple, animated roadmap to help you <b className="text-fg/80">plan</b>,{' '}
            <b className="text-fg/80">focus</b>, and <b className="text-fg/80">achieve</b> more every
            day - backed by a complete, downloadable study library for{' '}
            <span className="font-semibold text-brand-600">DA &amp; CS</span>.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="#roadmap" className="btn-primary">
              Start the journey <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/resources" className="btn-ghost border border-fg/10">
              <FileText className="h-4 w-4" /> Browse resources
            </Link>
          </div>
        </motion.div>

        {/* stat chips */}
        <div
          className="reveal mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
          style={{ animationDelay: '0.25s' }}
        >
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl px-4 py-4 text-center">
              <div className="text-2xl font-extrabold text-fg">{s.value}</div>
              <div className="mt-0.5 text-xs font-medium text-fg/50">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center text-fg/40"
          >
            <span className="text-xs font-semibold uppercase tracking-widest">Scroll</span>
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
