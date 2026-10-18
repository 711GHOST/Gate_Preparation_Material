// The content that drives the animated roadmap. Each milestone = a study phase
// from the Study Roadmap (M1). Easily editable.

export type Milestone = {
  n: number;
  key: string;
  title: string;
  tagline: string;
  window: string;
  blurb: string;
  bullets: string[];
  icon: string; // lucide icon name
  accent: string; // tailwind-ish hex for the node glow
};

export const milestones: Milestone[] = [
  {
    n: 1,
    key: 'foundations',
    title: 'Build the Foundations',
    tagline: 'Shared maths & CS core',
    window: 'Weeks 1-7',
    blurb:
      'Lay the common base that powers both papers - the mathematics behind Machine Learning and the CS core behind every systems question.',
    bullets: [
      'Linear Algebra · Probability & Statistics · Calculus',
      'Programming & Data Structures · Algorithms',
      'Databases & SQL',
    ],
    icon: 'Layers',
    accent: '#6457f6',
  },
  {
    n: 2,
    key: 'depth',
    title: 'Go Paper-Specific',
    tagline: 'DA & CS depth',
    window: 'Weeks 7-11',
    blurb:
      'Add each paper’s unique subjects on top of the shared core - interleave DA and CS so neither goes stale.',
    bullets: [
      'DA: Machine Learning · AI · Data Warehousing',
      'CS: Discrete Math · Digital Logic · COA · TOC',
      'CS: Compiler · Operating Systems · Networks',
    ],
    icon: 'Target',
    accent: '#a855f7',
  },
  {
    n: 3,
    key: 'practice',
    title: 'Practice by Topic',
    tagline: 'PYQs & question banks',
    window: 'Weeks 12-14',
    blurb:
      'Practise topic by topic with the available question banks and previous-year guides; keep your own record of topics to revisit.',
    bullets: [
      'Topic-wise PYQ guides (DA & CS)',
      'Use the DA and CS question-bank documents; verify counts and answer material in each file',
    ],
    icon: 'ListChecks',
    accent: '#22d3ee',
  },
  {
    n: 4,
    key: 'mocks',
    title: 'Simulate the Exam',
    tagline: 'Full-length mocks',
    window: 'Weeks 15-16',
    blurb:
      'Use the available mock documents for timed practice. Check the current official brochure before applying exam timing or marking rules.',
    bullets: [
      'Review DA and CS mock documents; verify the format and answer material in each file',
      'Mixed revision tests on shared topics',
      'Exam-day strategy based on the current official marking rules',
    ],
    icon: 'Gauge',
    accent: '#34d399',
  },
  {
    n: 5,
    key: 'revision',
    title: 'Final Revision',
    tagline: 'Peak and perform',
    window: 'Final weeks',
    blurb:
      'Cycle the formula book and last-minute notes, keep light timed sets, and walk in calm, fast and confident.',
    bullets: [
      'Formula Book · Last-Minute Notes',
      'Spaced revision of weak areas',
      'Check the official site for current exam dates and announcements',
    ],
    icon: 'Trophy',
    accent: '#f59e0b',
  },
];

// Which resource groups each roadmap phase points at (exact group strings
// from the resources manifest). Used to deep-link milestones to materials.
export const milestoneGroups: Record<string, string[]> = {
  foundations: ['Shared Foundations', 'Planning & Master'],
  depth: ['DA - Data Science & AI', 'CS - Computer Science & IT'],
  practice: ['Practice, PYQs & Mocks'],
  mocks: ['Practice, PYQs & Mocks'],
  revision: ['General Aptitude', 'Planning & Master'],
};
