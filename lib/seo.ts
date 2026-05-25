import { siteMetadata as fallbackSiteMetadata } from './cms-data';

export type BreadcrumbItem = {
  name: string;
  href: string;
};

export function getSiteUrl(siteUrl = fallbackSiteMetadata.metadataBase) {
  const fallbackUrl = fallbackSiteMetadata.metadataBase.replace(/\/$/, '');
  const value = typeof siteUrl === 'string' ? siteUrl.trim() : '';

  try {
    return new URL(value || fallbackUrl).origin;
  } catch {
    return fallbackUrl;
  }
}

export function absoluteUrl(path = '/', siteUrl = fallbackSiteMetadata.metadataBase) {
  const value = typeof path === 'string' ? path.trim() : '';

  if (value.startsWith('http://') || value.startsWith('https://')) return value;

  const safePath = value || '/';
  return `${getSiteUrl(siteUrl)}${safePath.startsWith('/') ? safePath : `/${safePath}`}`;
}

export function getSafeDate(value: string | Date | undefined, fallback = new Date()) {
  const date = value instanceof Date ? value : new Date(value ?? '');
  return Number.isNaN(date.getTime()) ? fallback : date;
}

export function getSafeTimestamp(value: string | Date | undefined) {
  return getSafeDate(value, new Date(0)).getTime();
}

export function getProductUrl(slug: string, siteUrl?: string) {
  return absoluteUrl(`/products/${slug}`, siteUrl);
}

export function getNewsUrl(slug: string, siteUrl?: string) {
  return absoluteUrl(`/news/${slug}`, siteUrl);
}

export function getStaticRoutes() {
  return ['/', '/about', '/products', '/news', '/faqs'];
}

export function getBreadcrumbJsonLd(items: BreadcrumbItem[], siteUrl?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href, siteUrl),
    })),
  };
}
