import { NextResponse } from 'next/server';
import {
  CMS_DEFAULT_ENDPOINTS,
  getCmsEndpointUrl,
  getCmsRuntimeConfig,
} from '@/lib/cms-config';

export const dynamic = 'force-dynamic';

export async function GET() {
  const config = getCmsRuntimeConfig();
  const layoutUrl = getCmsEndpointUrl('layout');

  if (!config.apiUrl || !layoutUrl) {
    return NextResponse.json(
      {
        configured: false,
        reachable: false,
        message: 'CMS_API_URL is not configured.',
        expectedEndpoints: CMS_DEFAULT_ENDPOINTS,
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(layoutUrl, {
      headers: {
        Accept: 'application/json',
        ...(config.readToken ? { Authorization: `Bearer ${config.readToken}` } : {}),
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(config.fetchTimeoutMs),
    });

    return NextResponse.json(
      {
        configured: true,
        reachable: response.ok,
        cmsHost: new URL(config.apiUrl).host,
        readTokenConfigured: Boolean(config.readToken),
        strictMode: config.strictMode,
        revalidateSeconds: config.revalidateSeconds,
        fetchTimeoutMs: config.fetchTimeoutMs,
        checkedEndpoint: CMS_DEFAULT_ENDPOINTS.layout,
        upstreamStatus: response.status,
        expectedEndpoints: CMS_DEFAULT_ENDPOINTS,
      },
      { status: response.ok ? 200 : 502 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        configured: true,
        reachable: false,
        cmsHost: new URL(config.apiUrl).host,
        message: error instanceof Error ? error.message : 'CMS connection failed.',
        expectedEndpoints: CMS_DEFAULT_ENDPOINTS,
      },
      { status: 502 },
    );
  }
}
