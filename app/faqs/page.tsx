import type { Metadata } from 'next';
import { FAQsPageContent } from '@/components/pages/faqs-page-content';
import { getFAQsContent, getLayoutContent } from '@/lib/cms';
import { getBreadcrumbJsonLd } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const [{ faqPageSection }, { siteMetadata }] = await Promise.all([
    getFAQsContent(),
    getLayoutContent(),
  ]);
  const title = faqPageSection.seo?.title || faqPageSection.heading;
  const description = faqPageSection.seo?.description || faqPageSection.description;
  const image = faqPageSection.seo?.image || siteMetadata.openGraphImage;

  return {
    title,
    description,
    alternates: { canonical: '/faqs' },
    openGraph: {
      title: `${title} | ${siteMetadata.openGraphSiteName}`,
      description,
      url: '/faqs',
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

import { cmsFallbackContent } from '@/lib/cms-data';

export default async function FAQsPage() {
  const [{ faqCategories, faqPageSection }, { siteSettings, siteMetadata }] = await Promise.all([
    getFAQsContent(),
    getLayoutContent(),
  ]);

  const safeFaqCategories = (
    Array.isArray(faqCategories) && faqCategories.length > 0
      ? faqCategories
      : cmsFallbackContent.faqs.faqCategories
  ).map((cat, idx) => {
    const fallbackCat =
      cmsFallbackContent.faqs.faqCategories[idx] ??
      cmsFallbackContent.faqs.faqCategories[0];
    return {
      ...cat,
      title: cat.title || fallbackCat.title,
      icon: cat.icon || fallbackCat.icon,
      faqs:
        Array.isArray(cat.faqs) && cat.faqs.length > 0
          ? cat.faqs
          : fallbackCat.faqs,
    };
  });

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: safeFaqCategories.flatMap((category) =>
      (category.faqs || []).map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    ),
  };
  const breadcrumbJsonLd = getBreadcrumbJsonLd(
    [
      { name: 'Home', href: '/' },
      { name: faqPageSection.heading, href: '/faqs' },
    ],
    siteMetadata.metadataBase,
  );

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <FAQsPageContent faqCategories={safeFaqCategories} faqPageSection={faqPageSection} siteSettings={siteSettings} />
    </>
  );
}
