import type { Metadata } from 'next';
import { ProductsPageContent } from '@/components/pages/products-page-content';
import { productPageSection, products, siteMetadata } from '@/lib/cms-data';
import { getProductUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Temukan berbagai mesin roasting kopi Steda Roaster untuk home roastery, coffee shop, hingga produksi profesional.',
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


const productListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: products.map((product, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: getProductUrl(product.slug),
    name: product.name,
  })),
};

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListJsonLd) }}
      />
      <ProductsPageContent />
    </>
  );
}

