import type { Metadata, Viewport } from 'next';
import { FloatingWhatsAppButton } from '@/components/floating-whatsapp-button';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/sections/footer';
import { siteMetadata } from '@/lib/cms-data';
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
  openGraph: {
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
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: siteMetadata.themeColor,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={siteMetadata.language} className="scroll-smooth">
      <body className="bg-white text-neutral-900 antialiased">
        <Navbar />
        {children}
        <Footer />
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
