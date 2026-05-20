import type { Metadata } from 'next';
import { NewsPageContent } from '@/components/pages/news-page-content';
import { getLayoutContent, getNewsContent } from '@/lib/cms';
import { getNewsUrl } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const { newsPageSection, siteMetadata } = await getNewsContent();

  return {
    title: 'News',
    description: newsPageSection.description,
    alternates: {
      canonical: '/news',
    },
    openGraph: {
      title: `News | ${siteMetadata.openGraphSiteName}`,
      description: newsPageSection.description,
      url: '/news',
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

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsListJsonLd) }}
      />
      <NewsPageContent news={content.news} newsCategories={content.newsCategories} newsPageSection={content.newsPageSection} />
    </>
  );
}
