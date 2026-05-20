import type { Metadata } from 'next';
import { ProductsPageContent } from '@/components/pages/products-page-content';
import { getProductsContent, getLayoutContent } from '@/lib/cms';
import { getProductUrl } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const [{ productPageSection }, { siteMetadata }] = await Promise.all([
    getProductsContent(),
    getLayoutContent(),
  ]);

  return {
    title: 'Products',
    description: productPageSection.hero.description,
    alternates: {
      canonical: '/products',
    },
    openGraph: {
      title: `Products | ${siteMetadata.openGraphSiteName}`,
      description: productPageSection.hero.description,
      url: '/products',
      images: [
        {
          url: productPageSection.hero.image.src,
          alt: productPageSection.hero.image.alt,
        },
      ],
    },
  };
}

export default async function ProductsPage() {
  const [content, { siteMetadata }] = await Promise.all([getProductsContent(), getLayoutContent()]);

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

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListJsonLd) }}
      />
      <ProductsPageContent {...content} />
    </>
  );
}
