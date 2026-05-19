import type { Metadata } from 'next';
import { NewsPageContent } from '@/components/pages/news-page-content';
import { news, newsPageSection, siteMetadata } from '@/lib/cms-data';
import { getNewsUrl } from '@/lib/seo';

export const metadata: Metadata = {
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


const newsListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: news.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: getNewsUrl(item.slug),
    name: item.title,
  })),
};

export default function NewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsListJsonLd) }}
      />
      <NewsPageContent />
    </>
  );
}

