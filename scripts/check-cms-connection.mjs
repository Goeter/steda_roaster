import { existsSync, readFileSync } from 'node:fs';

function loadEnvFile(filename) {
  if (!existsSync(filename)) return;

  for (const rawLine of readFileSync(filename, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const separatorIndex = line.indexOf('=');
    if (separatorIndex < 1) continue;

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile('.env.local');
loadEnvFile('.env');

const baseUrl = (process.env.CMS_API_URL || process.env.NEXT_PUBLIC_CMS_API_URL || '').replace(/\/$/, '');
const readToken = process.env.CMS_READ_TOKEN || '';
const timeoutMs = Number(process.env.CMS_FETCH_TIMEOUT_MS || 15000);

const endpoints = {
  layout: {
    path: process.env.CMS_ENDPOINT_LAYOUT || '/api/layout',
    keys: ['siteSettings', 'siteMetadata', 'footerSection'],
  },
  home: {
    path: process.env.CMS_ENDPOINT_HOME || '/api/home',
    keys: ['heroSection', 'aboutSection', 'productSection', 'products'],
  },
  about: {
    path: process.env.CMS_ENDPOINT_ABOUT || '/api/about',
    keys: ['aboutPageSection', 'aboutSection', 'benefitsSection', 'testimonies'],
  },
  productsPage: {
    path: process.env.CMS_ENDPOINT_PRODUCTS_PAGE || '/api/products-page',
    keys: ['productPageSection', 'productSection', 'products'],
  },
  productDetail: {
    path: process.env.CMS_ENDPOINT_PRODUCT_DETAIL || '/api/product-detail',
    keys: ['productDetailSection', 'productPageSection', 'products'],
  },
  faqs: {
    path: process.env.CMS_ENDPOINT_FAQS || '/api/faqs',
    keys: ['faqCategories', 'faqPageSection'],
  },
  newsPage: {
    path: process.env.CMS_ENDPOINT_NEWS_PAGE || '/api/news-page',
    keys: ['news', 'newsCategories', 'newsPageSection'],
  },
  newsDetail: {
    path: process.env.CMS_ENDPOINT_NEWS_DETAIL || '/api/news-detail',
    keys: ['news', 'newsDetailSection'],
  },
};

function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

if (!baseUrl) {
  console.error('CMS_API_URL is not configured in .env or the hosting environment.');
  process.exit(1);
}

let failed = false;
console.log(`Checking CMS connection: ${new URL(baseUrl).host}`);

for (const [name, config] of Object.entries(endpoints)) {
  const endpoint = config.path;
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        ...(readToken ? { Authorization: `Bearer ${readToken}` } : {}),
      },
      redirect: 'manual',
      signal: AbortSignal.timeout(Number.isFinite(timeoutMs) ? timeoutMs : 15000),
    });

    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const redirectLocation = response.headers.get('location');
    let missingKeys = [...config.keys];
    let parseError = '';

    if (isJson) {
      try {
        const raw = await response.json();
        const payload = isRecord(raw) && 'data' in raw ? raw.data : raw;
        if (isRecord(payload)) {
          missingKeys = config.keys.filter((key) => !(key in payload));
        }
      } catch (error) {
        parseError = error instanceof Error ? error.message : String(error);
      }
    }

    const ok = response.ok && isJson && missingKeys.length === 0 && !parseError;
    const status = ok ? 'OK' : 'FAIL';
    console.log(`- ${name.padEnd(14)} ${String(response.status).padEnd(3)} ${status} ${endpoint}`);

    if (!response.ok) console.error(`  HTTP ${response.status} ${response.statusText}`);
    if (redirectLocation) console.error(`  Redirected to: ${redirectLocation}`);
    if (!isJson) console.error(`  Expected application/json, received: ${contentType || '(none)'}`);
    if (missingKeys.length) console.error(`  Missing top-level keys: ${missingKeys.join(', ')}`);
    if (parseError) console.error(`  JSON parse error: ${parseError}`);

    if (!ok) failed = true;
  } catch (error) {
    failed = true;
    console.log(`- ${name.padEnd(14)} ERR FAIL ${endpoint}`);
    console.error(`  ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failed) {
  console.error('\nCMS check failed. Verify DNS, APP_URL, API routes, SSL, and hosting environment variables.');
  process.exit(1);
}

console.log('\nAll CMS endpoints are reachable, return JSON, and satisfy the required top-level contract.');
