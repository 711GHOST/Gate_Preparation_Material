import { NextResponse } from 'next/server';
import { manifest } from '@/lib/resources';
import { s3Configured } from '@/lib/s3';

export const runtime = 'nodejs';

// GET /api/resources -> the resource manifest (+ whether S3 is live).
export async function GET() {
  return NextResponse.json({ ...manifest, s3: s3Configured });
}
