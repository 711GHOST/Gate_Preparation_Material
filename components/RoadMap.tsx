'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useMotionValue, useTransform } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { milestones, milestoneGroups } from '@/lib/roadmap';
import { iconByName } from './icons';
import { useTheme } from './ThemeProvider';
import { useChecklist } from '@/lib/useChecklist';
import { groupId } from '@/lib/resources';

const VBW = 1000;
const VBH = 2800;
// where each milestone sits along the road (fraction of total path length)
const FRACTIONS = [0.11, 0.31, 0.52, 0.72, 0.92];

// A smooth winding road through the viewBox (snakes left<->right going down).
const ROAD_D = `
  M 340 70
  C 340 300 760 330 760 560
  C 760 820 300 840 300 1120
  C 300 1400 760 1430 760 1700
  C 760 1980 330 2000 330 2300
  C 330 2520 330 2600 330 2740
`;

type Pt = { x: number; y: number };

export function RoadMap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [nodes, setNodes] = useState<Pt[]>([]);
  const [forceReveal, setForceReveal] = useState(false);
  const { theme } = useTheme();
  const { ready, has, toggle, storageError } = useChecklist('vekta.phases');

  const road =
    theme === 'dark'
      ? { edge: '#2a3a63', fill: '#141c33', disc: '#0e1526' }
      : { edge: '#0B1020', fill: '#1A2238', disc: '#ffffff' };

  // ?debug=1 forces milestone cards visible (used for layout verification)
  useEffect(() => {
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('debug')) {
      setForceReveal(true);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.65'],
  });

  const mx = useMotionValue(340);
  const my = useMotionValue(70);
  const markerOpacity = useTransform(scrollYProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0.6]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    setNodes(
      FRACTIONS.map((f) => {
        const p = path.getPointAtLength(f * len);
        return { x: p.x, y: p.y };
      })
    );
    const update = (v: number) => {
      const p = path.getPointAtLength(Math.max(0, Math.min(1, v)) * len);
      mx.set(p.x);
      my.set(p.y);
    };
    update(scrollYProgress.get());
    const unsub = scrollYProgress.on('change', update);
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const phaseCount = ready ? milestones.filter((m) => has(m.key)).length : 0;
  const phasePct = Math.round((phaseCount / milestones.length) * 100);

  return (
    <section id="roadmap" ref={sectionRef} className="relative overflow-x-clip py-20 sm:py-28">
      <div className="container-x">
        <header className="mx-auto mb-8 max-w-2xl text-center">
          <span className="chip mx-auto">The journey</span>
          <h2 className="section-title mt-5">
            Five phases to <span className="gradient-text">exam day</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-fg/60">
            Follow the road from foundations to the finish line. Tick off each phase as you go -
            your progress is saved on this device.
          </p>

          {/* phase progress */}
          <div className="mx-auto mt-6 max-w-sm">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span className="text-fg/60">
                {phaseCount} / {milestones.length} phases
              </span>
              <span className="gradient-text tabular-nums">{phasePct}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-fg/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 via-accent-violet to-accent-cyan transition-all duration-500"
                style={{ width: `${phasePct}%` }}
              />
            </div>
            {storageError && (
              <p role="alert" className="mt-3 text-left text-xs text-red-700 dark:text-red-300">
                {storageError}
              </p>
            )}
          </div>
        </header>
      </div>

      {/* ---------- Desktop: animated SVG road with overlay cards ---------- */}
      <div className="relative mx-auto hidden max-w-5xl px-6 md:block">
        <div className="relative" style={{ aspectRatio: `${VBW} / ${VBH}` }}>
          <svg
            viewBox={`0 0 ${VBW} ${VBH}`}
            className="absolute inset-0 h-full w-full overflow-visible"
            fill="none"
          >
            <defs>
              <linearGradient id="roadProgress" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6457f6" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
              <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="10" />
              </filter>
            </defs>

            {/* base road */}
            <path ref={pathRef} d={ROAD_D} stroke={road.edge} strokeWidth="56" strokeLinecap="round" />
            <path d={ROAD_D} stroke={road.fill} strokeWidth="52" strokeLinecap="round" />
            <path
              d={ROAD_D}
              stroke="#ffffff"
              strokeWidth="3"
              strokeDasharray="2 26"
              strokeLinecap="round"
              opacity="0.4"
            />

            {/* progress overlay that "draws" as you scroll */}
            <motion.path
              d={ROAD_D}
              stroke="url(#roadProgress)"
              strokeWidth="10"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
              opacity="0.95"
            />

            {/* milestone nodes */}
            {nodes.map((p, i) => {
              const m = milestones[i];
              const done = ready && has(m.key);
              return (
                <g key={m.key}>
                  <line
                    x1={p.x}
                    y1={p.y}
                    x2={p.x < VBW / 2 ? p.x + 150 : p.x - 150}
                    y2={p.y}
                    stroke={m.accent}
                    strokeWidth="3"
                    strokeDasharray="2 8"
                    opacity="0.5"
                  />
                  <circle cx={p.x} cy={p.y} r="46" fill={m.accent} opacity="0.18" filter="url(#soft)" />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="34"
                    fill={done ? m.accent : road.disc}
                    stroke={m.accent}
                    strokeWidth="5"
                  />
                  <text
                    x={p.x}
                    y={p.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="30"
                    fontWeight="800"
                    fill={done ? '#ffffff' : m.accent}
                  >
                    {done ? '✓' : m.n}
                  </text>
                </g>
              );
            })}

            {/* traveling marker */}
            <motion.g style={{ x: mx, y: my, opacity: markerOpacity }}>
              <circle r="26" fill="url(#roadProgress)" opacity="0.25" filter="url(#soft)" />
              <circle r="13" fill="#ffffff" />
              <circle r="7" fill="url(#roadProgress)" />
            </motion.g>
          </svg>

          {/* overlay cards */}
          {nodes.map((p, i) => {
            const m = milestones[i];
            const Icon = iconByName(m.icon);
            const cardOnLeft = p.x >= VBW / 2;
            const pos: React.CSSProperties = {
              top: `${(p.y / VBH) * 100}%`,
              transform: 'translateY(-50%)',
            };
            if (cardOnLeft) pos.right = `${((VBW - p.x + 170) / VBW) * 100}%`;
            else pos.left = `${((p.x + 170) / VBW) * 100}%`;
            return (
              <motion.div
                key={m.key}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                {...(forceReveal
                  ? { animate: { opacity: 1, y: 0, scale: 1 } }
                  : {
                      whileInView: { opacity: 1, y: 0, scale: 1 },
                      viewport: { once: true, amount: 0.4 },
                    })}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-[42%]"
                style={pos}
              >
                <MilestoneCard m={m} Icon={Icon} done={ready && has(m.key)} onToggle={() => toggle(m.key)} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ---------- Mobile: clean vertical timeline ---------- */}
      <div className="relative mx-auto mt-4 max-w-md px-5 md:hidden">
        <div className="absolute bottom-0 left-[27px] top-2 w-1 rounded-full bg-gradient-to-b from-brand-500 via-accent-violet to-accent-cyan opacity-30" />
        <div className="space-y-6">
          {milestones.map((m) => {
            const Icon = iconByName(m.icon);
            const done = ready && has(m.key);
            return (
              <motion.div
                key={m.key}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.5 }}
                className="relative pl-16"
              >
                <span
                  className="absolute left-0 top-0 grid h-14 w-14 place-items-center rounded-2xl text-lg font-extrabold text-white shadow-glow"
                  style={{ background: m.accent }}
                >
                  {done ? <Check className="h-6 w-6" /> : m.n}
                </span>
                <MilestoneCard m={m} Icon={Icon} done={done} onToggle={() => toggle(m.key)} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MilestoneCard({
  m,
  Icon,
  done,
  onToggle,
}: {
  m: (typeof milestones)[number];
  Icon: ReturnType<typeof iconByName>;
  done: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`card card-interactive p-5 sm:p-6 ${done ? 'ring-2 ring-emerald-400/60' : ''}`}>
      <div className="flex items-center gap-3">
        <span
          className="grid h-11 w-11 place-items-center rounded-xl text-white"
          style={{ background: m.accent }}
        >
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider" style={{ color: m.accent }}>
            {m.tagline}
          </div>
          <h3 className="text-lg font-extrabold leading-tight text-fg">{m.title}</h3>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-fg/60">{m.blurb}</p>
      <ul className="mt-4 space-y-1.5">
        {m.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-fg/70">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: m.accent }} />
            {b}
          </li>
        ))}
      </ul>
      <Link
        href={`/resources#${groupId((milestoneGroups[m.key] || [])[0] || 'Shared Foundations')}`}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold transition-colors hover:gap-2.5"
        style={{ color: m.accent }}
      >
        Explore materials <ArrowRight className="h-4 w-4" />
      </Link>
      <div className="mt-4 flex items-center justify-between">
        <span className="inline-flex items-center rounded-full bg-fg/5 px-3 py-1 text-xs font-semibold text-fg/60">
          {m.window}
        </span>
        <button
          onClick={onToggle}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${
            done
              ? 'bg-emerald-500 text-white'
              : 'border border-fg/15 text-fg/60 hover:border-emerald-400 hover:text-emerald-500'
          }`}
        >
          <Check className="h-3.5 w-3.5" /> {done ? 'Completed' : 'Mark complete'}
        </button>
      </div>
    </div>
  );
}
