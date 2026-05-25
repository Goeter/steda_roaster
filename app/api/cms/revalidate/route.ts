import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { CMS_TAGS } from '@/lib/cms';

const ALLOWED_TAGS = new Set<string>(Object.values(CMS_TAGS));
const ALLOWED_EXACT_PATHS = new Set(['/', '/about', '/products', '/faqs', '/news']);
const ALLOWED_DYNAMIC_PATH_PREFIXES = ['/products/', '/news/'];

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

function isValidPath(path: string) {
  return (
    ALLOWED_EXACT_PATHS.has(path) ||
    ALLOWED_DYNAMIC_PATH_PREFIXES.some((prefix) => path.startsWith(prefix))
  );
}

function parseBody(value: unknown): RevalidateBody | null {
  if (!isRecord(value)) return null;

  if (value.secret !== undefined && typeof value.secret !== 'string') return null;
  if (value.tags !== undefined && !isStringArray(value.tags)) return null;
  if (value.paths !== undefined && !isStringArray(value.paths)) return null;

  return value as RevalidateBody;
}

export async function POST(request: Request) {
  const secret = process.env.CMS_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { message: 'CMS_REVALIDATE_SECRET is not configured.' },
      { status: 500 },
    );
  }

  let body: RevalidateBody | null;

  try {
    body = parseBody(await request.json());
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body.' }, { status: 400 });
  }

  if (!body) {
    return NextResponse.json({ message: 'Invalid revalidation payload.' }, { status: 400 });
  }

  if (body.secret !== secret) {
    return NextResponse.json({ message: 'Invalid revalidation secret.' }, { status: 401 });
  }

  const tags = body.tags?.length ? body.tags : [CMS_TAGS.all];
  const paths = body.paths ?? [];

  for (const tag of tags) {
    if (!ALLOWED_TAGS.has(tag)) {
      return NextResponse.json({ message: `Invalid cache tag: ${tag}` }, { status: 400 });
    }
  }

  for (const path of paths) {
    if (!isValidPath(path)) {
      return NextResponse.json({ message: `Invalid path: ${path}` }, { status: 400 });
    }
  }

  tags.forEach((tag) => revalidateTag(tag, 'max'));
  paths.forEach((path) => revalidatePath(path));

  return NextResponse.json({
    revalidated: true,
    tags,
    paths,
    revalidatedAt: new Date().toISOString(),
  });
}
