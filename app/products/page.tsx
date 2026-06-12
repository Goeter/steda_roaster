import type { Metadata } from 'next';
import { ProductsPageContent } from '@/components/pages/products-page-content';
import { getProductsContent, getLayoutContent } from '@/lib/cms';
import { getBreadcrumbJsonLd, getProductUrl } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const [{ productPageSection }, { siteMetadata }] = await Promise.all([
    getProductsContent(),
    getLayoutContent(),
  ]);
  const title = productPageSection.seo?.title || productPageSection.hero.heading;
  const description = productPageSection.seo?.description || productPageSection.hero.description;
  const image = productPageSection.seo?.image || productPageSection.hero.image;

  return {
    title,
    description,
    alternates: { canonical: '/products' },
    openGraph: {
      title: `${title} | ${siteMetadata.openGraphSiteName}`,
      description,
      url: '/products',
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

export default async function ProductsPage() {
  const [content, { siteMetadata, siteSettings }] = await Promise.all([
    getProductsContent(),
    getLayoutContent(),
  ]);

  const productListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: content.products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: getProductUrl(product.slug, siteMetadata.metadataBase),
      name: product.name,
    })),
  };
  const breadcrumbJsonLd = getBreadcrumbJsonLd(
    [
      { name: 'Home', href: '/' },
      { name: content.productPageSection.hero.heading, href: '/products' },
    ],
    siteMetadata.metadataBase,
  );

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(productListJsonLd) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ProductsPageContent {...content} siteSettings={siteSettings} />
    </>
  );
}
