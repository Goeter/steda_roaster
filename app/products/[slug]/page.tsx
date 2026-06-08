import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Boxes, Clock3, Factory, Gauge } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ProductActions } from '@/components/product-actions';
import { ProductGallery } from '@/components/product-gallery';
import { Reveal } from '@/components/reveal';
import { getProductDetailContent } from '@/lib/cms';
import type { ProductTechnicalParameterKey } from '@/lib/cms-types';
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

  const coverImage = product.image || product.images.find(Boolean) || '/hero-1.jpg';

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | ${productDetailSection.metadataTitleSuffix}`,
      description: product.description,
      url: `/products/${product.slug}`,
      type: 'website',
      images: [{ url: coverImage, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [coverImage],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const { productDetailSection, products, siteMetadata, siteSettings } = await getProductDetailContent();
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
  const specificationCards = productDetailSection.specificationFields.slice(0, 10).map((field, index) => ({
    key: field.key,
    label: field.label,
    value: specificationValues[field.key] || legacySpecifications[index] || '-',
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
      const firstIsBestSeller = first.tag?.trim().toLowerCase() === 'best seller';
      const secondIsBestSeller = second.tag?.trim().toLowerCase() === 'best seller';
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
      <main className="min-h-screen overflow-hidden bg-[#f7f5f0] pt-20 animate-page-enter">
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
                        product.tag.toLowerCase() === 'best seller'
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
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {similarProducts.map((item) => {
                    const itemImage = item.images?.find(Boolean) || item.image;

                    return (
                    <Link
                      key={item.slug}
                      href={`/products/${item.slug}`}
                      className="group grid overflow-hidden rounded-3xl border border-neutral-200 bg-[#fafafa] transition hover:-translate-y-1 hover:border-amber-200 hover:shadow-md sm:grid-cols-[150px_1fr]"
                    >
                      <div className="relative min-h-40 overflow-hidden bg-white">
                        <Image
                          src={itemImage}
                          alt={item.name}
                          fill
                          sizes="(max-width: 767px) 100vw, 150px"
                          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-col justify-center space-y-2 p-4">
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex rounded-full border border-neutral-300 bg-neutral-200/80 px-2.5 py-1 text-[11px] font-medium text-neutral-700">
                            {item.category}
                          </span>
                          {item.tag ? (
                            <span
                              className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                                item.tag.toLowerCase() === 'best seller'
                                  ? 'border-orange-500 bg-orange-500 text-white shadow-sm'
                                  : 'border-neutral-200 bg-neutral-100 text-neutral-700'
                              }`}
                            >
                              {item.tag}
                            </span>
                          ) : null}
                        </div>
                        <h3 className="text-base font-semibold text-neutral-950 transition group-hover:text-amber-800">
                          {item.name}
                        </h3>
                        <p className="line-clamp-2 text-sm leading-6 text-neutral-600">{item.description}</p>
                      </div>
                      </Link>
                    );
                  })}
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
