/**
 * Central CMS integration configuration.
 *
 * The UI must not read CMS environment variables or endpoint paths directly.
 * Change CMS connection details here or through the documented environment variables.
 */

export const CMS_TAGS = {
  all: 'cms:all',
  layout: 'cms:layout',
  home: 'cms:home',
  about: 'cms:about',
  products: 'cms:products',
  productDetail: 'cms:product-detail',
  faqs: 'cms:faqs',
  news: 'cms:news',
  newsDetail: 'cms:news-detail',
  seo: 'cms:seo',
} as const;

export const CMS_DEFAULT_ENDPOINTS = {
  layout: '/api/layout',
  home: '/api/home',
  about: '/api/about',
  productsPage: '/api/products-page',
  productDetail: '/api/product-detail',
  faqs: '/api/faqs',
  newsPage: '/api/news-page',
  newsDetail: '/api/news-detail',
} as const;

export type CmsEndpointKey = keyof typeof CMS_DEFAULT_ENDPOINTS;

const CMS_ENDPOINT_ENV_KEYS: Record<CmsEndpointKey, string> = {
  layout: 'CMS_ENDPOINT_LAYOUT',
  home: 'CMS_ENDPOINT_HOME',
  about: 'CMS_ENDPOINT_ABOUT',
  productsPage: 'CMS_ENDPOINT_PRODUCTS_PAGE',
  productDetail: 'CMS_ENDPOINT_PRODUCT_DETAIL',
  faqs: 'CMS_ENDPOINT_FAQS',
  newsPage: 'CMS_ENDPOINT_NEWS_PAGE',
  newsDetail: 'CMS_ENDPOINT_NEWS_DETAIL',
};

export const CMS_ALLOWED_EXACT_PATHS = [
  '/',
  '/about',
  '/products',
  '/faqs',
  '/news',
  '/sitemap.xml',
  '/robots.txt',
  '/manifest.webmanifest',
] as const;
export const CMS_ALLOWED_DYNAMIC_PATH_PREFIXES = ['/products/', '/news/'] as const;

const DEFAULT_REVALIDATE_SECONDS = 60 * 60 * 24 * 30;
const DEFAULT_FETCH_TIMEOUT_MS = 15_000;

function readPositiveNumber(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function readBoolean(value: string | undefined, fallback = false) {
  if (value === undefined) return fallback;
  return ['1', 'true', 'yes', 'on'].includes(value.trim().toLowerCase());
}

function normalizeBaseUrl(value: string | undefined) {
  const candidate = value?.trim();
  if (!candidate) return '';

  try {
    return new URL(candidate).toString().replace(/\/$/, '');
  } catch {
    console.warn('[cms] CMS_API_URL is invalid.');
    return '';
  }
}

function normalizeEndpoint(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return '/';
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

export function getCmsEndpoint(endpointKey: CmsEndpointKey) {
  const environmentKey = CMS_ENDPOINT_ENV_KEYS[endpointKey];
  const override = process.env[environmentKey];
  return normalizeEndpoint(override || CMS_DEFAULT_ENDPOINTS[endpointKey]);
}

export function getCmsRuntimeConfig() {
  return {
    apiUrl: normalizeBaseUrl(process.env.CMS_API_URL || process.env.NEXT_PUBLIC_CMS_API_URL),
    readToken: process.env.CMS_READ_TOKEN?.trim() || '',
    revalidateSecret: process.env.CMS_REVALIDATE_SECRET || '',
    revalidateSeconds: readPositiveNumber(
      process.env.CMS_REVALIDATE_SECONDS,
      DEFAULT_REVALIDATE_SECONDS,
    ),
    fetchTimeoutMs: readPositiveNumber(process.env.CMS_FETCH_TIMEOUT_MS, DEFAULT_FETCH_TIMEOUT_MS),
    strictMode: readBoolean(process.env.CMS_STRICT_MODE, false),
  };
}

export function getCmsEndpointUrl(endpointKey: CmsEndpointKey) {
  const { apiUrl } = getCmsRuntimeConfig();
  if (!apiUrl) return '';
  return `${apiUrl}${getCmsEndpoint(endpointKey)}`;
}

export function isAllowedCmsRevalidationPath(path: string) {
  return (
    CMS_ALLOWED_EXACT_PATHS.includes(path as (typeof CMS_ALLOWED_EXACT_PATHS)[number]) ||
    CMS_ALLOWED_DYNAMIC_PATH_PREFIXES.some((prefix) => path.startsWith(prefix))
  );
}
