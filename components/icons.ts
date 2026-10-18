import {
  Layers,
  Target,
  ListChecks,
  Gauge,
  Trophy,
  type LucideIcon,
} from 'lucide-react';

const MAP: Record<string, LucideIcon> = {
  Layers,
  Target,
  ListChecks,
  Gauge,
  Trophy,
};

export function iconByName(name: string): LucideIcon {
  return MAP[name] ?? Layers;
}
