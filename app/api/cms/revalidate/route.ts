import { timingSafeEqual } from 'node:crypto';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import {
  CMS_TAGS,
  getCmsRuntimeConfig,
  isAllowedCmsRevalidationPath,
} from '@/lib/cms-config';

const ALLOWED_TAGS = new Set<string>(Object.values(CMS_TAGS));

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
  const rawBody = await request.text();
  if (!rawBody.trim()) return {};

  try {
    return parseBody(JSON.parse(rawBody));
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
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

  tags.forEach((tag) => revalidateTag(tag, { expire: 0 }));
  paths.forEach((path) => revalidatePath(path));

  return NextResponse.json({
    revalidated: true,
    tags,
    paths,
    revalidatedAt: new Date().toISOString(),
  });
}
