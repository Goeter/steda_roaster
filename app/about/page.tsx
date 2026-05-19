import type { Metadata } from 'next';
import { AboutPageContent } from '@/components/pages/about-page-content';
import { aboutPageSection, siteMetadata } from '@/lib/cms-data';

export const metadata: Metadata = {
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

export default function AboutPage() {
  return <AboutPageContent />;
}
