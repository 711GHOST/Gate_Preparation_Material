import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('resource manifest has 33 documents', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'lib', 'resources.generated.json'), 'utf8'));
  assert.equal(manifest.count, 33);
  assert.equal(manifest.items.length, 33);
});

test('resource manifest contains the expected catalogue categories', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'lib', 'resources.generated.json'), 'utf8'));
  const subjectGroups = new Set([
    'Shared Foundations',
    'DA - Data Science & AI',
    'CS - Computer Science & IT',
    'General Aptitude',
  ]);
  assert.equal(manifest.items.filter((item) => subjectGroups.has(item.group)).length, 18);
  assert.equal(manifest.items.filter((item) => item.id.startsWith('Mock_')).length, 4);
  assert.equal(manifest.items.filter((item) => item.id.startsWith('QBank_')).length, 2);
});

test('policy and trust routes exist as app pages', () => {
  const routes = [
    'about/page.tsx',
    'privacy/page.tsx',
    'disclaimer/page.tsx',
    'terms/page.tsx',
    'contact/page.tsx',
    'syllabus/page.tsx',
    'mock-tests/page.tsx',
    'study-roadmap/page.tsx',
    'gate/da/page.tsx',
    'gate/cs/page.tsx',
  ];
  for (const r of routes) {
    assert.ok(fs.existsSync(path.join(root, 'app', r)), `missing app/${r}`);
  }
});

test('sitemap and robots are configured', () => {
  assert.ok(fs.existsSync(path.join(root, 'app', 'sitemap.ts')));
  assert.ok(fs.existsSync(path.join(root, 'app', 'robots.ts')));
});

test('nav includes working destinations', async () => {
  const { mainNav } = await import('../lib/nav-links.ts');
  assert.ok(mainNav.some((l) => l.href === '/resources'));
  assert.ok(mainNav.some((l) => l.href === '/mock-tests'));
});
