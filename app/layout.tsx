import type { Metadata, Viewport } from 'next';
import { FloatingWhatsAppButton } from '@/components/floating-whatsapp-button';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/sections/footer';
import { siteMetadata, siteSettings } from '@/lib/cms-data';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.metadataBase),
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
  manifest: '/site.webmanifest',
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: siteMetadata.themeColor,
};


const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteSettings.siteName,
  url: siteMetadata.metadataBase,
  logo: `${siteMetadata.metadataBase}/hero-1.jpg`,
  description: siteSettings.description,
  email: siteSettings.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sidoarjo',
    addressCountry: 'ID',
  },
  sameAs: Object.values(siteSettings.socials).filter(Boolean),
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteSettings.siteName,
  url: siteMetadata.metadataBase,
  inLanguage: siteMetadata.language,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={siteMetadata.language} className="scroll-smooth">
      <body className="bg-white text-neutral-900 antialiased">
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
        <Navbar />
        {children}
        <Footer />
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
