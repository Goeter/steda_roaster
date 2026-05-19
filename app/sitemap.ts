import type { MetadataRoute } from 'next';
import { news, products } from '@/lib/cms-data';
import { absoluteUrl, getStaticRoutes } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = getStaticRoutes().map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.8,
  })) satisfies MetadataRoute.Sitemap;

  const productRoutes = products.map((product) => ({
    url: absoluteUrl(`/products/${product.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  })) satisfies MetadataRoute.Sitemap;

  const newsRoutes = news.map((item) => ({
    url: absoluteUrl(`/news/${item.slug}`),
    lastModified: new Date(item.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  })) satisfies MetadataRoute.Sitemap;

  return [...staticRoutes, ...productRoutes, ...newsRoutes];
}
