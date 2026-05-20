import type { Metadata } from 'next';
import { AboutPageContent } from '@/components/pages/about-page-content';
import { getAboutContent, getLayoutContent } from '@/lib/cms';

export async function generateMetadata(): Promise<Metadata> {
  const [{ aboutPageSection }, { siteMetadata }] = await Promise.all([
    getAboutContent(),
    getLayoutContent(),
  ]);

  return {
    title: 'About Us',
    description:
      'Kenali Steda Roaster, produsen mesin roasting kopi berkualitas untuk home roastery, coffee shop, dan kebutuhan industri.',
    alternates: {
      canonical: '/about',
    },
    openGraph: {
      title: `About Us | ${siteMetadata.openGraphSiteName}`,
      description: aboutPageSection.hero.description,
      url: '/about',
      images: [
        {
          url: aboutPageSection.hero.image.src,
          alt: aboutPageSection.hero.image.alt,
        },
      ],
    },
  };
}

export default async function AboutPage() {
  const content = await getAboutContent();

  return <AboutPageContent {...content} />;
}
