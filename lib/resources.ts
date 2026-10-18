import generated from './resources.generated.json';

export type Resource = {
  id: string;
  file: string;
  key: string;
  title: string;
  description: string;
  group: string;
  groupOrder: number;
  serves: 'DA' | 'CS' | 'Both';
  sizeKB: number;
  ext: string;
};

export type ResourceManifest = {
  generatedAt: string;
  count: number;
  items: Resource[];
};

export const manifest = generated as ResourceManifest;
export const resources: Resource[] = manifest.items as Resource[];

export const groupsInOrder = Array.from(
  resources
    .slice()
    .sort((a, b) => a.groupOrder - b.groupOrder)
    .reduce((m, r) => {
      if (!m.has(r.group)) m.set(r.group, r.groupOrder);
      return m;
    }, new Map<string, number>())
    .keys()
);

export function groupResources(items: Resource[]) {
  const by = new Map<string, Resource[]>();
  for (const r of items) {
    if (!by.has(r.group)) by.set(r.group, []);
    by.get(r.group)!.push(r);
  }
  return Array.from(by.entries()).sort(
    (a, b) => (a[1][0]?.groupOrder ?? 0) - (b[1][0]?.groupOrder ?? 0)
  );
}

/** Stable DOM id / anchor slug for a group name (shared by roadmap links). */
export function groupId(group: string) {
  return 'g-' + group.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
