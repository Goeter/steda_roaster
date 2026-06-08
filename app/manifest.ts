import type { MetadataRoute } from 'next';
import { getLayoutContent } from '@/lib/cms';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { siteMetadata, siteSettings } = await getLayoutContent();

  return {
    name: siteSettings.siteName,
    short_name: siteSettings.siteName,
    description: siteSettings.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: siteMetadata.themeColor,
  };
}
