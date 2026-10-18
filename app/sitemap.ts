import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site-config';

const routes = [
  '',
  '/resources',
  '/gate/da',
  '/gate/cs',
  '/study-roadmap',
  '/mock-tests',
  '/syllabus',
  '/about',
  '/privacy',
  '/disclaimer',
  '/terms',
  '/contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}
