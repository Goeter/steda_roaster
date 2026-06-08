import type { MetadataRoute } from 'next';
import { getLayoutContent, getNewsContent, getProductDetailContent } from '@/lib/cms';
import { absoluteUrl, getSafeDate, getStaticRoutes } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ products }, { news }, { siteMetadata }] = await Promise.all([
    getProductDetailContent(),
    getNewsContent(),
    getLayoutContent(),
  ]);

  const staticRoutes = getStaticRoutes().map((route) => ({
    url: absoluteUrl(route, siteMetadata.metadataBase),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.8,
  })) satisfies MetadataRoute.Sitemap;

  const productRoutes = products.map((product) => ({
    url: absoluteUrl(`/products/${product.slug}`, siteMetadata.metadataBase),
    ...(product.updatedAt ? { lastModified: getSafeDate(product.updatedAt) } : {}),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  })) satisfies MetadataRoute.Sitemap;

  const newsRoutes = news.map((item) => ({
    url: absoluteUrl(`/news/${item.slug}`, siteMetadata.metadataBase),
    lastModified: getSafeDate(item.updatedAt || item.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  })) satisfies MetadataRoute.Sitemap;

  return [...staticRoutes, ...productRoutes, ...newsRoutes];
}
