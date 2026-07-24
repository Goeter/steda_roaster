import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Boxes, Clock3, Factory, Gauge } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ProductActions } from '@/components/product-actions';
import { ProductCard } from '@/components/product-card';
import { ProductGallery } from '@/components/product-gallery';
import { Reveal } from '@/components/reveal';
import { getLayoutContent, getProductDetailContent } from '@/lib/cms';
import type { ProductTechnicalParameterKey } from '@/lib/cms-types';
import { getProductCoverImage, isBestSeller } from '@/lib/products';
import { absoluteUrl, getBreadcrumbJsonLd, getProductUrl } from '@/lib/seo';

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const technicalParameterIcons = {
  capacity: Boxes,
  efficiency: Gauge,
  roastingTime: Clock3,
  production: Factory,
} satisfies Record<ProductTechnicalParameterKey, LucideIcon>;

export async function generateStaticParams() {
  const { products } = await getProductDetailContent();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { productDetailSection, products } = await getProductDetailContent();
  const product = products.find((item) => item.slug === slug);

  if (!product) return { title: productDetailSection.notFoundTitle };

  const coverImage = product.seo?.image?.src || getProductCoverImage(product);

  return {
    title: product.seo?.title || product.name,
    description: product.seo?.description || product.description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: product.seo?.title || `${product.name} | ${productDetailSection.metadataTitleSuffix}`,
      description: product.seo?.description || product.description,
      url: `/products/${product.slug}`,
      type: 'website',
      images: [{ url: coverImage, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.seo?.title || product.name,
      description: product.seo?.description || product.description,
      images: [coverImage],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const [
    { productDetailSection, productPageSection, products },
    { siteMetadata, siteSettings },
  ] = await Promise.all([getProductDetailContent(), getLayoutContent()]);
  const product = products.find((item) => item.slug === slug);

  if (!product) notFound();

  const productImages = Array.isArray(product.images) ? product.images : [];
  const galleryImages = (productImages.length > 0 ? productImages : [product.image]).filter(Boolean);
  const detailDescriptionParagraphs = Array.isArray(product.detailDescription)
    ? product.detailDescription.filter(Boolean)
    : typeof product.detailDescription === 'string'
      ? product.detailDescription.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean)
      : [product.description];
  const technicalParams: Record<string, string> = product.technicalParams ?? {};
  const technicalParameterFallbacks: Record<ProductTechnicalParameterKey, string> = {
    capacity: technicalParams.capacity || '-',
    efficiency: technicalParams.efficiency || technicalParams.control || '-',
    roastingTime: technicalParams.roastingTime || '-',
    production: technicalParams.production || product.category || '-',
  };
  const technicalParameterCards = productDetailSection.technicalParameterFields.slice(0, 4).map((field) => ({
    key: field.key,
    label: field.label,
    value: technicalParameterFallbacks[field.key],
    Icon: technicalParameterIcons[field.key],
  }));
  const legacySpecifications = Array.isArray(product.specifications) ? product.specifications : [];
  const specificationValues = Array.isArray(product.specifications) ? {} : product.specifications ?? {};
  /** Guarantees we never render an object as a React child. */
  const safeString = (v: unknown): string => {
    if (typeof v === 'string') return v;
    if (typeof v === 'number' || typeof v === 'boolean') return String(v);
    if (v && typeof v === 'object' && 'value' in v) return safeString((v as Record<string, unknown>).value);
    return '-';
  };
  const specificationCards = productDetailSection.specificationFields.slice(0, 10).map((field, index) => ({
    key: field.key,
    label: field.label,
    value: safeString(specificationValues[field.key]) !== '-'
      ? safeString(specificationValues[field.key])
      : safeString(legacySpecifications[index]) !== '-'
        ? safeString(legacySpecifications[index])
        : '-',
  }));
  const specificationColumns = [specificationCards.slice(0, 5), specificationCards.slice(5, 10)].filter(
    (column) => column.length > 0,
  );

  const normalizedCategory = product.category.trim().toLowerCase();
  const similarProducts = products
    .filter(
      (item) =>
        item.slug !== product.slug && item.category.trim().toLowerCase() === normalizedCategory,
    )
    .sort((first, second) => {
      const firstIsBestSeller = isBestSeller(first, productPageSection.bestSellerLabel);
      const secondIsBestSeller = isBestSeller(second, productPageSection.bestSellerLabel);
      return Number(secondIsBestSeller) - Number(firstIsBestSeller);
    })
    .slice(0, 3);

  const breadcrumbJsonLd = getBreadcrumbJsonLd(
    [
      { name: 'Home', href: '/' },
      { name: 'Products', href: '/products' },
      { name: product.name, href: `/products/${product.slug}` },
    ],
    siteMetadata.metadataBase,
  );

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: String(product.id),
    model: product.name,
    description: detailDescriptionParagraphs.join(' '),
    image: galleryImages.map((image) => absoluteUrl(image, siteMetadata.metadataBase)),
    brand: {
      '@type': 'Brand',
      name: siteSettings.siteName,
    },
    manufacturer: {
      '@type': 'Organization',
      name: siteSettings.siteName,
      url: siteMetadata.metadataBase,
    },
    category: product.category,
    url: getProductUrl(product.slug, siteMetadata.metadataBase),
    additionalProperty: [
      ...technicalParameterCards.map((item) => ({
        '@type': 'PropertyValue',
        name: item.label,
        value: item.value,
      })),
      ...specificationCards.map((item) => ({
        '@type': 'PropertyValue',
        name: item.label,
        value: item.value,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="min-h-screen overflow-hidden bg-[#faebd7] pt-20 animate-page-enter">
        <ProductActions title={product.name} labels={productDetailSection} />

        <section className="relative mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
          <div className="absolute -left-32 -top-32 -z-10 h-[500px] w-[500px] rounded-full bg-orange-100/40 blur-3xl" />
          <div className="absolute bottom-0 right-0 -z-10 h-[420px] w-[420px] rounded-full bg-amber-100/40 blur-3xl" />

          <Reveal className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <div className="rounded-[28px] bg-white/90 p-3 shadow-sm backdrop-blur sm:p-6">
                <ProductGallery images={galleryImages} productName={product.name} labels={productDetailSection} />
              </div>

              <div className="rounded-[28px] border border-neutral-200 bg-white/95 p-6 shadow-sm backdrop-blur sm:p-8">
                <h2 className="mb-5 text-lg font-bold text-neutral-950">{productDetailSection.technicalParametersHeading}</h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {technicalParameterCards.map(({ key, label, value, Icon }) => (
                    <div
                      key={key}
                      className="flex items-start gap-4 rounded-2xl border border-neutral-200 bg-[#fafafa] p-4 transition hover:border-amber-200 hover:bg-amber-50/30"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-neutral-500">{label}</p>
                        <p className="mt-1 text-sm font-semibold leading-6 text-neutral-950">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="rounded-[28px] border border-neutral-200 bg-white/95 p-6 shadow-sm backdrop-blur sm:p-8">
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="inline-flex rounded-full border border-neutral-300 bg-neutral-200/80 px-3 py-1 text-xs font-medium text-neutral-700">
                    {product.category}
                  </span>
                  {product.tag ? (
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                        isBestSeller(product, productPageSection.bestSellerLabel)
                          ? 'border-orange-500 bg-orange-500 text-white shadow-sm'
                          : 'border-neutral-200 bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {product.tag}
                    </span>
                  ) : null}
                </div>
                <h1 className="text-3xl font-bold leading-tight text-neutral-950 sm:text-4xl">{product.name}</h1>
                <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
                  {detailDescriptionParagraphs.map((paragraph, index) => (
                    <p key={`${product.slug}-description-${index}`}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-neutral-200 bg-white/95 p-6 shadow-sm backdrop-blur sm:p-8">
                <h2 className="mb-5 text-lg font-bold text-neutral-950">{productDetailSection.specificationsHeading}</h2>
                <div className="grid gap-4 md:grid-cols-2 md:gap-5">
                  {specificationColumns.map((column, columnIndex) => (
                    <div key={`spec-column-${columnIndex}`} className="space-y-3">
                      {column.map((item) => (
                        <div key={item.key} className="rounded-2xl border border-neutral-200 bg-[#fafafa] p-4">
                          <p className="text-xs font-medium text-neutral-500">{item.label}</p>
                          <p className="mt-1 text-sm font-semibold leading-6 text-neutral-950">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[1400px] px-4 pb-16 sm:px-6 lg:px-10 lg:pb-20">
          <Reveal>
            <div className="rounded-[28px] border border-neutral-200 bg-white/95 p-6 shadow-sm backdrop-blur sm:p-8">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-neutral-950">{productDetailSection.similarProductsHeading}</h2>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 transition hover:text-amber-800"
                >
                  {productDetailSection.viewAllProductsLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {similarProducts.length > 0 ? (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {similarProducts.map((item) => (
                    <ProductCard key={item.id} product={item} labels={productPageSection} />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-neutral-300 bg-[#fafafa] px-6 py-10 text-center text-sm text-neutral-500">
                  {productDetailSection.noSimilarProductsMessage}
                </div>
              )}
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}
