import type { Metadata } from 'next';
import { FAQsPageContent } from '@/components/pages/faqs-page-content';
import { getFAQsContent } from '@/lib/cms';

export async function generateMetadata(): Promise<Metadata> {
  const { faqPageSection, siteMetadata } = await getFAQsContent();

  return {
    title: 'FAQs',
    description: faqPageSection.description,
    alternates: {
      canonical: '/faqs',
    },
    openGraph: {
      title: `FAQs | ${siteMetadata.openGraphSiteName}`,
      description: faqPageSection.description,
      url: '/faqs',
    },
  };
}

export default async function FAQsPage() {
  const { faqCategories, faqPageSection, siteSettings, siteMetadata } = await getFAQsContent();

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqCategories.flatMap((category) =>
      category.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQsPageContent faqCategories={faqCategories} faqPageSection={faqPageSection} siteSettings={siteSettings} />
    </>
  );
}
