import type { Metadata, Viewport } from 'next';
import { FloatingWhatsAppButton } from '@/components/floating-whatsapp-button';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/sections/footer';
import { AntiInspect } from '@/components/anti-inspect';
import { BatikGutters } from '@/components/batik-gutters';
import { getLayoutContent } from '@/lib/cms';
import { getSiteUrl } from '@/lib/seo';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const { siteMetadata } = await getLayoutContent();

  const siteUrl = getSiteUrl(siteMetadata.metadataBase);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteMetadata.defaultTitle,
      template: siteMetadata.titleTemplate,
    },
    description: siteMetadata.description,
    keywords: siteMetadata.keywords,
    authors: [{ name: siteMetadata.authorName }],
    creator: siteMetadata.authorName,
    publisher: siteMetadata.authorName,
    applicationName: siteMetadata.openGraphSiteName,
    category: 'Coffee roasting equipment',
    alternates: {
      canonical: '/',
    },
    manifest: '/manifest.webmanifest',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      countryName: 'Indonesia',
      title: siteMetadata.openGraphTitle,
      description: siteMetadata.openGraphDescription,
      url: siteMetadata.openGraphUrl,
      siteName: siteMetadata.openGraphSiteName,
      images: [
        {
          url: siteMetadata.openGraphImage.src,
          width: siteMetadata.openGraphImage.width,
          height: siteMetadata.openGraphImage.height,
          alt: siteMetadata.openGraphImage.alt,
        },
      ],
      locale: siteMetadata.locale,
      type: siteMetadata.type,
    },
    twitter: {
      card: 'summary_large_image',
      title: siteMetadata.openGraphTitle,
      description: siteMetadata.openGraphDescription,
      images: [siteMetadata.openGraphImage.src],
    },
  };
}

export async function generateViewport(): Promise<Viewport> {
  const { siteMetadata } = await getLayoutContent();

  return {
    width: 'device-width',
    initialScale: 1,
    themeColor: siteMetadata.themeColor,
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { footerSection, siteMetadata, siteSettings } = await getLayoutContent();
  const siteUrl = getSiteUrl(siteMetadata.metadataBase);

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: siteSettings.siteName,
    url: siteUrl,
    logo: `${siteUrl}/hero-1.jpg`,
    image: `${siteUrl}/hero-1.jpg`,
    description: siteSettings.description,
    email: siteSettings.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteSettings.address,
      addressCountry: 'ID',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
    telephone: siteSettings.phoneNumber,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: siteSettings.phoneNumber,
      email: siteSettings.email,
      availableLanguage: Array.from(new Set([siteMetadata.language, 'en'])),
    },
    sameAs: Object.values(siteSettings.socials).filter((url): url is string => Boolean(url)),
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteSettings.siteName,
    url: siteUrl,
    description: siteMetadata.description,
    publisher: {
      '@type': 'Organization',
      name: siteSettings.siteName,
    },
    inLanguage: siteMetadata.language,
  };

  return (
    <html lang={siteMetadata.language} className="scroll-smooth">
      <body className="bg-[#FAF6F0] text-neutral-900 antialiased relative min-h-screen">
        <BatikGutters />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Navbar siteSettings={siteSettings} />
        {children}
        <Footer footerSection={footerSection} siteSettings={siteSettings} />
        <FloatingWhatsAppButton siteSettings={siteSettings} />
        <AntiInspect />
      </body>
    </html>
  );
}
