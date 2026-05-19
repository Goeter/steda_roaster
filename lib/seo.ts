import { news, products, siteMetadata } from './cms-data';

const siteUrl = siteMetadata.metadataBase.replace(/\/$/, '');

export function absoluteUrl(path = '/') {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function getProductUrl(slug: string) {
  return absoluteUrl(`/products/${slug}`);
}

export function getNewsUrl(slug: string) {
  return absoluteUrl(`/news/${slug}`);
}

export function getStaticRoutes() {
  return ['/', '/about', '/products', '/news', '/faqs'];
}

export function getAllSitemapRoutes() {
  return [
    ...getStaticRoutes(),
    ...products.map((product) => `/products/${product.slug}`),
    ...news.map((item) => `/news/${item.slug}`),
  ];
}
