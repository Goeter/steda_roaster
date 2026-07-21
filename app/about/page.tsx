import type { Metadata } from 'next';
import { AboutPageContent } from '@/components/pages/about-page-content';
import { getAboutContent, getLayoutContent } from '@/lib/cms';
import { getBreadcrumbJsonLd } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const [{ aboutPageSection }, { siteMetadata }] = await Promise.all([
    getAboutContent(),
    getLayoutContent(),
  ]);
  const title = aboutPageSection.seo?.title || aboutPageSection.hero.heading;
  const description = aboutPageSection.seo?.description || aboutPageSection.hero.description;
  const image = aboutPageSection.seo?.image || aboutPageSection.hero.image;

  return {
    title,
    description,
    alternates: { canonical: '/about' },
    openGraph: {
      title: `${title} | ${siteMetadata.openGraphSiteName}`,
      description,
      url: '/about',
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

export default async function AboutPage() {
  const [content, { siteMetadata, siteSettings }] = await Promise.all([getAboutContent(), getLayoutContent()]);
  const breadcrumbJsonLd = getBreadcrumbJsonLd(
    [
      { name: 'Home', href: '/' },
      { name: content.aboutPageSection.hero.heading, href: '/about' },
    ],
    siteMetadata.metadataBase,
  );

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AboutPageContent {...content} siteSettings={siteSettings} />
    </>
  );
}
