import { siteMetadata as fallbackSiteMetadata } from './cms-data';

export type BreadcrumbItem = {
  name: string;
  href: string;
};

export function getSiteUrl(siteUrl = fallbackSiteMetadata.metadataBase) {
  return siteUrl.replace(/\/$/, '');
}

export function absoluteUrl(path = '/', siteUrl = fallbackSiteMetadata.metadataBase) {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${getSiteUrl(siteUrl)}${path.startsWith('/') ? path : `/${path}`}`;
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
