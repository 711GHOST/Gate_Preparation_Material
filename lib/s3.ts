// S3 helper - used by the download API route. When S3 env vars are present,
// downloads are served via short-lived presigned URLs. Otherwise the API
// falls back to the static files in /public/resources.
import { S3Client, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const {
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  S3_BUCKET,
  S3_PREFIX = '', // e.g. "gate2027/"
} = process.env;

export const s3Configured = Boolean(
  AWS_REGION && AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY && S3_BUCKET
);

let _client: S3Client | null = null;
function client(): S3Client {
  if (!_client) {
    _client = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID as string,
        secretAccessKey: AWS_SECRET_ACCESS_KEY as string,
      },
    });
  }
  return _client;
}

function fullKey(key: string) {
  const p = S3_PREFIX.replace(/^\/+|\/+$/g, '');
  return p ? `${p}/${key}` : key;
}

/** Short-lived presigned GET URL for a resource key (library-relative). */
export async function presignDownload(key: string, filename?: string): Promise<string> {
  const cmd = new GetObjectCommand({
    Bucket: S3_BUCKET,
    Key: fullKey(key),
    ResponseContentDisposition: filename
      ? `attachment; filename="${filename}"`
      : undefined,
  });
  return getSignedUrl(client(), cmd, { expiresIn: 60 * 10 }); // 10 minutes
}

/** Presigned GET URL for viewing inline (no attachment disposition) — fed to the Office Online viewer. */
export async function presignView(key: string): Promise<string> {
  const cmd = new GetObjectCommand({
    Bucket: S3_BUCKET,
    Key: fullKey(key),
    ResponseContentType:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ResponseContentDisposition: 'inline', // override the stored "attachment" for viewing
  });
  return getSignedUrl(client(), cmd, { expiresIn: 60 * 30 }); // 30 minutes (viewer session)
}

/** Fetch an object's bytes server-side (same-origin proxy for in-browser rendering; no CORS needed). */
export async function getObjectBytes(key: string): Promise<Uint8Array> {
  const res = await client().send(new GetObjectCommand({ Bucket: S3_BUCKET, Key: fullKey(key) }));
  if (!res.Body) throw new Error('Empty S3 body');
  return res.Body.transformToByteArray();
}

/** Optional: list keys in the bucket (used if you want live listing). */
export async function listKeys(): Promise<string[]> {
  const out: string[] = [];
  let token: string | undefined;
  do {
    const res = await client().send(
      new ListObjectsV2Command({
        Bucket: S3_BUCKET,
        Prefix: S3_PREFIX || undefined,
        ContinuationToken: token,
      })
    );
    for (const o of res.Contents ?? []) if (o.Key) out.push(o.Key);
    token = res.IsTruncated ? res.NextContinuationToken : undefined;
  } while (token);
  return out;
}
