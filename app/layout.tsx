import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://stedaroaster.com'),
  title: {
    default: 'Steda Roaster | Mesin Roasting Kopi Berkualitas',
    template: '%s | Steda Roaster',
  },
  description:
    'Produsen mesin roasting kopi berkualitas untuk home roastery, coffee shop, dan kebutuhan industri.',
  keywords: ['mesin roasting kopi', 'coffee roaster', 'home roastery', 'roaster machine', 'Steda Roaster'],
  authors: [{ name: 'Steda Roaster' }],
  openGraph: {
    title: 'Steda Roaster',
    description: 'Mesin roasting kopi berkualitas untuk bisnis kopi Anda.',
    url: 'https://stedaroaster.com',
    siteName: 'Steda Roaster',
    images: [{ url: '/hero-1.jpg', width: 1200, height: 630, alt: 'Steda Roaster' }],
    locale: 'id_ID',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2b1b12',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-white text-neutral-900 antialiased">{children}</body>
    </html>
  );
}
