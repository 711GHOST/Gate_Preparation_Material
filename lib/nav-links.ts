export type NavLink = {
  href: string;
  label: string;
  shortLabel?: string;
  match?: (pathname: string) => boolean;
};

export const mainNav: NavLink[] = [
  { href: '/', label: 'Home', match: (p) => p === '/' },
  { href: '/resources', label: 'Resources', match: (p) => p.startsWith('/resources') },
  {
    href: '/gate/da',
    label: 'GATE DA Preparation',
    shortLabel: 'DA Prep',
    match: (p) => p.startsWith('/gate/da'),
  },
  {
    href: '/gate/cs',
    label: 'GATE CS Preparation',
    shortLabel: 'CS Prep',
    match: (p) => p.startsWith('/gate/cs'),
  },
  {
    href: '/study-roadmap',
    label: 'Study Roadmap',
    shortLabel: 'Roadmap',
    match: (p) => p === '/study-roadmap' || p === '/roadmap',
  },
  {
    href: '/mock-tests',
    label: 'Mock Tests',
    shortLabel: 'Mocks',
    match: (p) => p.startsWith('/mock-tests'),
  },
  { href: '/about', label: 'About', match: (p) => p === '/about' },
  {
    href: '/contact',
    label: 'Contact / Feedback',
    shortLabel: 'Contact',
    match: (p) => p === '/contact',
  },
];

export const footerLegal = [
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/disclaimer', label: 'Educational Disclaimer' },
  { href: '/terms', label: 'Terms of Use' },
  { href: '/contact', label: 'Contact & Feedback' },
  { href: '/syllabus', label: 'Syllabus coverage' },
] as const;
