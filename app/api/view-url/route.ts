import { NextRequest, NextResponse } from 'next/server';
import { resources } from '@/lib/resources';
import { s3Configured, presignView } from '@/lib/s3';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/view-url?id=<id>
// -> { url, source } where url is publicly fetchable by the Office Online viewer.
//    source "s3": short-lived presigned URL (works from any host, incl. localhost).
//    source "static": the site's own /resources URL (works once deployed publicly).
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const r = id ? resources.find((x) => x.id === id) : undefined;
  if (!r) return NextResponse.json({ error: 'Unknown resource' }, { status: 404 });

  if (s3Configured) {
    try {
      const url = await presignView(r.key);
      return NextResponse.json({ url, source: 's3' });
    } catch (e) {
      console.error('presignView failed:', e);
    }
  }
  const origin = req.nextUrl.origin;
  const isLocal = /localhost|127\.0\.0\.1/.test(origin);
  return NextResponse.json({
    url: `${origin}/resources/${encodeURIComponent(r.file)}`,
    source: 'static',
    publiclyReachable: !isLocal,
  });
}
