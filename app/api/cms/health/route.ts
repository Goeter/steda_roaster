import { NextResponse } from 'next/server';
import {
  CMS_DEFAULT_ENDPOINTS,
  getCmsEndpoint,
  getCmsEndpointUrl,
  getCmsRuntimeConfig,
  type CmsEndpointKey,
} from '@/lib/cms-config';

export const dynamic = 'force-dynamic';

const REQUIRED_KEYS: Record<CmsEndpointKey, string[]> = {
  layout: ['siteSettings', 'siteMetadata', 'footerSection'],
  home: [
    'heroSection',
    'aboutSection',
    'productSection',
    'productPageSection',
    'benefitsSection',
    'distributionSection',
    'testimoniesSection',
    'testimonies',
    'faqHomeSection',
    'faqs',
    'products',
  ],
  about: [
    'aboutPageSection',
    'aboutSection',
    'benefitsSection',
    'testimoniesSection',
    'testimonies',
  ],
  productsPage: ['productPageSection', 'productSection', 'products'],
  productDetail: ['productDetailSection', 'productPageSection', 'products'],
  faqs: ['faqCategories', 'faqPageSection'],
  newsPage: ['news', 'newsCategories', 'newsPageSection'],
  newsDetail: ['news', 'newsDetailSection'],
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function unwrap(value: unknown) {
  return isRecord(value) && 'data' in value ? value.data : value;
}

export async function GET() {
  const config = getCmsRuntimeConfig();

  if (!config.apiUrl) {
    return NextResponse.json(
      {
        configured: false,
        reachable: false,
        message: 'CMS_API_URL is not configured in the frontend runtime environment.',
        expectedEndpoints: CMS_DEFAULT_ENDPOINTS,
      },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const checks = await Promise.all(
    (Object.keys(CMS_DEFAULT_ENDPOINTS) as CmsEndpointKey[]).map(async (endpointKey) => {
      const url = getCmsEndpointUrl(endpointKey);
      const path = getCmsEndpoint(endpointKey);

      try {
        const response = await fetch(url, {
          headers: {
            Accept: 'application/json',
            ...(config.readToken ? { Authorization: `Bearer ${config.readToken}` } : {}),
          },
          cache: 'no-store',
          redirect: 'manual',
          signal: AbortSignal.timeout(config.fetchTimeoutMs),
        });

        const contentType = response.headers.get('content-type') || '';
        const location = response.headers.get('location');
        let missingKeys: string[] = REQUIRED_KEYS[endpointKey];
        let json = false;
        let parseError = '';

        if (contentType.includes('application/json')) {
          try {
            const payload = unwrap(await response.json());
            json = true;
            if (isRecord(payload)) {
              missingKeys = REQUIRED_KEYS[endpointKey].filter((key) => !(key in payload));
            }
          } catch (error) {
            parseError = error instanceof Error ? error.message : 'Invalid JSON response.';
          }
        }

        const ok = response.ok && json && missingKeys.length === 0;

        return {
          endpoint: endpointKey,
          path,
          status: response.status,
          ok,
          json,
          contentType,
          missingKeys,
          ...(location ? { redirectLocation: location } : {}),
          ...(parseError ? { parseError } : {}),
        };
      } catch (error) {
        return {
          endpoint: endpointKey,
          path,
          status: null,
          ok: false,
          json: false,
          missingKeys: REQUIRED_KEYS[endpointKey],
          error: error instanceof Error ? error.message : 'CMS connection failed.',
        };
      }
    }),
  );

  const reachable = checks.every((check) => check.ok);

  return NextResponse.json(
    {
      configured: true,
      reachable,
      cmsHost: new URL(config.apiUrl).host,
      readTokenConfigured: Boolean(config.readToken),
      strictMode: config.strictMode,
      revalidateSeconds: config.revalidateSeconds,
      fetchTimeoutMs: config.fetchTimeoutMs,
      checks,
    },
    { status: reachable ? 200 : 502, headers: { 'Cache-Control': 'no-store' } },
  );
}
