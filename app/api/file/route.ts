import { NextRequest, NextResponse } from 'next/server';
import { resources } from '@/lib/resources';
import { s3Configured, getObjectBytes } from '@/lib/s3';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

// GET /api/file?id=<id>
// Same-origin bytes for the in-browser (docx-preview) renderer. Streams from
// S3 server-side when configured (so the private bucket needs no CORS),
// otherwise redirects to the bundled static copy (also same-origin).
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const r = id ? resources.find((x) => x.id === id) : undefined;
  if (!r) return NextResponse.json({ error: 'Unknown resource' }, { status: 404 });

  if (s3Configured) {
    try {
      const bytes = await getObjectBytes(r.key);
      return new NextResponse(Buffer.from(bytes), {
        headers: {
          'Content-Type': DOCX,
          'Content-Length': String(bytes.byteLength),
          'Cache-Control': 'private, max-age=300',
        },
      });
    } catch (e) {
      console.error('S3 fetch failed, using static fallback:', e);
    }
  }
  return NextResponse.redirect(
    `${req.nextUrl.origin}/resources/${encodeURIComponent(r.file)}`,
    302
  );
}
