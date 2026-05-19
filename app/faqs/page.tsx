import type { Metadata } from 'next';
import { FAQsPageContent } from '@/components/pages/faqs-page-content';
import { faqCategories, faqPageSection, siteMetadata } from '@/lib/cms-data';

export const metadata: Metadata = {
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

export default function FAQsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQsPageContent />
    </>
  );
}

