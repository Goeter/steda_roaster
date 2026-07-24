import { timingSafeEqual } from 'node:crypto';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import {
  CMS_TAGS,
  getCmsRuntimeConfig,
  isAllowedCmsRevalidationPath,
} from '@/lib/cms-config';

const ALLOWED_TAGS = new Set<string>(Object.values(CMS_TAGS));
const MAX_REVALIDATE_BODY_BYTES = 16_384;

// ---------------------------------------------------------------------------
// Rate Limiting — sliding-window per IP
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 60_000; // 60 seconds
const RATE_LIMIT_MAX_REQUESTS = 10; // max 10 requests per window

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getRateLimitedResponse() {
  return NextResponse.json(
    { message: 'Too many requests. Try again later.' },
    {
      status: 429,
      headers: {
        'Retry-After': '60',
        'Cache-Control': 'no-store',
      },
    },
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Cleanup stale entries when the map grows beyond a safe threshold
  if (rateLimitStore.size > 1_000) {
    for (const [key, entry] of rateLimitStore) {
      if (entry.resetAt <= now) rateLimitStore.delete(key);
    }
  }

  const entry = rateLimitStore.get(ip);

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type RevalidateBody = {
  secret?: string;
  tags?: string[];
  paths?: string[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function parseBody(value: unknown): RevalidateBody | null {
  if (!isRecord(value)) return null;
  if (value.secret !== undefined && typeof value.secret !== 'string') return null;
  if (value.tags !== undefined && !isStringArray(value.tags)) return null;
  if (value.paths !== undefined && !isStringArray(value.paths)) return null;
  return value as RevalidateBody;
}

function secretsMatch(expected: string, supplied: string) {
  const expectedBuffer = Buffer.from(expected);
  const suppliedBuffer = Buffer.from(supplied);

  if (expectedBuffer.length !== suppliedBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, suppliedBuffer);
}

async function readBody(request: Request): Promise<RevalidateBody | null> {
  const declaredLength = Number(request.headers.get('content-length') || 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_REVALIDATE_BODY_BYTES) return null;

  const rawBody = await request.text();
  if (Buffer.byteLength(rawBody, 'utf8') > MAX_REVALIDATE_BODY_BYTES) return null;
  if (!rawBody.trim()) return {};

  try {
    return parseBody(JSON.parse(rawBody));
  } catch {
    return null;
  }
}

function getClientIp(request: Request): string {
  // Vercel / Cloudflare / standard proxy headers
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();

  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  return 'unknown';
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(request: Request) {
  // 1. Rate limit — checked BEFORE secret validation to save compute
  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    console.warn(`[cms:revalidate] Rate limited IP: ${clientIp}`);
    return getRateLimitedResponse();
  }

  // 2. Secret validation
  const { revalidateSecret } = getCmsRuntimeConfig();

  if (!revalidateSecret) {
    return NextResponse.json(
      { message: 'CMS_REVALIDATE_SECRET is not configured.' },
      { status: 500 },
    );
  }

  const body = await readBody(request);

  if (!body) {
    return NextResponse.json({ message: 'Invalid JSON or revalidation payload.' }, { status: 400 });
  }

  const suppliedSecret =
    request.headers.get('x-cms-revalidate-secret') ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ||
    body.secret ||
    '';

  if (!suppliedSecret || !secretsMatch(revalidateSecret, suppliedSecret)) {
    return NextResponse.json({ message: 'Invalid revalidation secret.' }, { status: 401 });
  }

  // 3. Validate tags & paths
  const tags = body.tags?.length ? Array.from(new Set(body.tags)) : [CMS_TAGS.all];
  const paths = body.paths?.length ? Array.from(new Set(body.paths)) : [];

  for (const tag of tags) {
    if (!ALLOWED_TAGS.has(tag)) {
      return NextResponse.json({ message: `Invalid cache tag: ${tag}` }, { status: 400 });
    }
  }

  for (const path of paths) {
    if (!isAllowedCmsRevalidationPath(path)) {
      return NextResponse.json({ message: `Invalid path: ${path}` }, { status: 400 });
    }
  }

  // 4. Execute revalidation
  tags.forEach((tag) => revalidateTag(tag, { expire: 0 }));
  paths.forEach((path) => revalidatePath(path));

  console.log(
    `[cms:revalidate] Admin-triggered revalidation: tags=[${tags.join(',')}], paths=[${paths.join(',')}], ip=${clientIp}`,
  );

  return NextResponse.json({
    revalidated: true,
    tags,
    paths,
    revalidatedAt: new Date().toISOString(),
  });
}
