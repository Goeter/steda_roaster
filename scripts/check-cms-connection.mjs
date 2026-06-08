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
  layout: process.env.CMS_ENDPOINT_LAYOUT || '/api/layout',
  home: process.env.CMS_ENDPOINT_HOME || '/api/home',
  about: process.env.CMS_ENDPOINT_ABOUT || '/api/about',
  productsPage: process.env.CMS_ENDPOINT_PRODUCTS_PAGE || '/api/products-page',
  productDetail: process.env.CMS_ENDPOINT_PRODUCT_DETAIL || '/api/product-detail',
  faqs: process.env.CMS_ENDPOINT_FAQS || '/api/faqs',
  newsPage: process.env.CMS_ENDPOINT_NEWS_PAGE || '/api/news-page',
  newsDetail: process.env.CMS_ENDPOINT_NEWS_DETAIL || '/api/news-detail',
};

if (!baseUrl) {
  console.error('CMS_API_URL is not configured. Copy .env.example to .env.local and fill it first.');
  process.exit(1);
}

let failed = false;
console.log(`Checking CMS connection: ${new URL(baseUrl).host}`);

for (const [name, endpoint] of Object.entries(endpoints)) {
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        ...(readToken ? { Authorization: `Bearer ${readToken}` } : {}),
      },
      signal: AbortSignal.timeout(Number.isFinite(timeoutMs) ? timeoutMs : 15000),
    });

    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const status = response.ok && isJson ? 'OK' : 'FAIL';

    console.log(`- ${name.padEnd(14)} ${String(response.status).padEnd(3)} ${status} ${endpoint}`);

    if (!response.ok || !isJson) failed = true;
  } catch (error) {
    failed = true;
    console.log(`- ${name.padEnd(14)} ERR FAIL ${endpoint}`);
    console.error(`  ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failed) {
  console.error('\nOne or more CMS endpoints failed. Check CMS_FRONTEND_INTEGRATION.md.');
  process.exit(1);
}

console.log('\nAll CMS endpoints are reachable and return JSON.');
