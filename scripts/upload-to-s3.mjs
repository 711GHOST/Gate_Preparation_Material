// Upload the GATE2027_Library documents to your S3 bucket, preserving the
// folder structure as object keys (e.g. "Shared/SH1_Linear_Algebra.docx").
// These keys match the `key` field in lib/resources.generated.json, so the
// download API's presigned URLs resolve correctly.
//
// Usage (from web/):
//   1) copy .env.example -> .env.local and fill in your credentials
//   2) npm run upload
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.resolve(__dirname, '..');
const LIB = path.resolve(WEB, '..', 'GATE2027_Library');

// load .env.local / .env if present (no dependency needed)
for (const f of ['.env.local', '.env']) {
  const p = path.join(WEB, f);
  if (fs.existsSync(p)) {
    for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
    }
  }
}

const {
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  S3_BUCKET,
  S3_PREFIX = '',
} = process.env;

if (!AWS_REGION || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !S3_BUCKET) {
  console.error('Missing S3 env vars. Set AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET in .env.local');
  process.exit(1);
}

const prefix = S3_PREFIX.replace(/^\/+|\/+$/g, '');
const client = new S3Client({
  region: AWS_REGION,
  credentials: { accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY },
});

const DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

function* walk(dir, base = '') {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = base ? `${base}/${name}` : name;
    if (fs.statSync(full).isDirectory()) yield* walk(full, rel);
    else if (name.toLowerCase().endsWith('.docx')) yield { full, rel };
  }
}

const files = [...walk(LIB)];
console.log(`Uploading ${files.length} files to s3://${S3_BUCKET}/${prefix ? prefix + '/' : ''}`);

let done = 0;
for (const { full, rel } of files) {
  const Key = prefix ? `${prefix}/${rel}` : rel;
  await client.send(
    new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key,
      Body: fs.readFileSync(full), // buffer => known ContentLength (streams stall in SDK v3)
      ContentType: DOCX,
      ContentDisposition: `attachment; filename="${path.basename(rel)}"`,
    })
  );
  done++;
  console.log(`  [${done}/${files.length}] ${Key}`);
}
console.log('Done. Set the same env vars on Vercel/Netlify to enable presigned downloads.');
