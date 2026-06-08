import type { Metadata } from 'next';
import { NewsPageContent } from '@/components/pages/news-page-content';
import { getLayoutContent, getNewsContent } from '@/lib/cms';
import { getBreadcrumbJsonLd, getNewsUrl } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const { newsPageSection, siteMetadata } = await getNewsContent();
  const title = newsPageSection.seo?.title || newsPageSection.heading;
  const description = newsPageSection.seo?.description || newsPageSection.description;
  const image = newsPageSection.seo?.image || siteMetadata.openGraphImage;

  return {
    title,
    description,
    alternates: { canonical: '/news' },
    openGraph: {
      title: `${title} | ${siteMetadata.openGraphSiteName}`,
      description,
      url: '/news',
      images: [{ url: image.src, alt: image.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.src],
    },
  };
}

export default async function NewsPage() {
  const [content, { siteMetadata }] = await Promise.all([getNewsContent(), getLayoutContent()]);

  const newsListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: content.news.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: getNewsUrl(item.slug, siteMetadata.metadataBase),
      name: item.title,
    })),
  };
  const breadcrumbJsonLd = getBreadcrumbJsonLd(
    [
      { name: 'Home', href: '/' },
      { name: content.newsPageSection.heading, href: '/news' },
    ],
    siteMetadata.metadataBase,
  );

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(newsListJsonLd) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <NewsPageContent news={content.news} newsCategories={content.newsCategories} newsPageSection={content.newsPageSection} />
    </>
  );
}
