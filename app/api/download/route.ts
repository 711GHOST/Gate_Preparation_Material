import { NextRequest, NextResponse } from 'next/server';
import { resources } from '@/lib/resources';
import { s3Configured, presignDownload } from '@/lib/s3';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/download?id=<resource id>
// -> 302 redirect to a presigned S3 URL (if configured) or the static file.
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing ?id' }, { status: 400 });
  }
  const r = resources.find((x) => x.id === id);
  if (!r) {
    return NextResponse.json({ error: 'Unknown resource' }, { status: 404 });
  }

  if (s3Configured) {
    try {
      const url = await presignDownload(r.key, r.file);
      return NextResponse.redirect(url, 302);
    } catch (e) {
      // fall through to static if S3 fails at runtime
      console.error('S3 presign failed, serving static fallback:', e);
    }
  }

  // Static fallback (files bundled in /public/resources)
  const origin = req.nextUrl.origin;
  return NextResponse.redirect(`${origin}/resources/${encodeURIComponent(r.file)}`, 302);
}
