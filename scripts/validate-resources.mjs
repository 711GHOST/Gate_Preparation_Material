/**
 * Validates manifest entries against bundled files in public/resources.
 * Run: node scripts/validate-resources.mjs
 * Exit code 1 if any local file is missing (S3-only deployments may differ).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.resolve(__dirname, '..');
const manifest = JSON.parse(
  fs.readFileSync(path.join(WEB, 'lib', 'resources.generated.json'), 'utf8')
);
const publicDir = path.join(WEB, 'public', 'resources');

const missing = [];
const present = [];

for (const item of manifest.items) {
  const local = path.join(publicDir, item.file);
  if (fs.existsSync(local)) {
    present.push(item.id);
  } else {
    missing.push({ id: item.id, file: item.file, key: item.key });
  }
}

console.log(`Manifest: ${manifest.count} resources (generated ${manifest.generatedAt})`);
console.log(`Local files found: ${present.length}/${manifest.items.length}`);

if (missing.length) {
  console.warn('\nMissing local files (downloads fall back to S3 when configured):');
  for (const m of missing) {
    console.warn(`  - ${m.id} (${m.file})`);
  }
}

const dupIds = manifest.items.map((i) => i.id).filter((id, idx, arr) => arr.indexOf(id) !== idx);
if (dupIds.length) {
  console.error('Duplicate resource IDs:', dupIds);
  process.exit(1);
}

if (missing.length === manifest.items.length) {
  console.error('\nNo bundled resources found. Run npm run manifest from a machine with GATE2027_Library.');
  process.exit(1);
}

process.exit(missing.length ? 1 : 0);
