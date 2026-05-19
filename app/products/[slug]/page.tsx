import { notFound } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { ProductActions } from '@/components/product-actions';
import { ProductGallery } from '@/components/product-gallery';
import { Reveal } from '@/components/reveal';
import { productDetailSection, products } from '@/lib/cms-data';
import { getProductBySlug } from '@/lib/cms';

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return { title: productDetailSection.notFoundTitle };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | ${productDetailSection.metadataTitleSuffix}`, 
      description: product.description,
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const galleryImages = product.images.length > 0 ? product.images : [product.image];

  return (
    <>
      <main className="min-h-screen overflow-hidden bg-[#f7f5f0] pt-20 animate-page-enter">
        <ProductActions title={product.name} labels={productDetailSection} />

        <section className="relative mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
          <div className="absolute -left-32 -top-32 -z-10 h-[500px] w-[500px] rounded-full bg-orange-100/40 blur-3xl" />
          <div className="absolute bottom-0 right-0 -z-10 h-[420px] w-[420px] rounded-full bg-amber-100/40 blur-3xl" />

          <Reveal className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="rounded-[28px] bg-white/90 p-3 shadow-sm backdrop-blur sm:p-6">
              <ProductGallery images={galleryImages} productName={product.name} labels={productDetailSection} />
            </div>

            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="rounded-[28px] border border-neutral-200 bg-white/95 p-6 shadow-sm backdrop-blur sm:p-8">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">{product.category}</p>
                <h1 className="text-3xl font-bold leading-tight text-neutral-950 sm:text-4xl">{product.name}</h1>
                <p className="mt-4 text-sm leading-7 text-neutral-600 sm:text-base">{product.description}</p>
              </div>

              <div className="rounded-[28px] border border-neutral-200 bg-white/95 p-6 shadow-sm backdrop-blur sm:p-8">
                <h2 className="mb-5 text-lg font-bold text-neutral-950">{productDetailSection.technicalParametersHeading}</h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {Object.entries(product.technicalParams).map(([key, value]) => (
                    <div key={key} className="rounded-2xl border border-neutral-200 bg-[#fafafa] p-4">
                      <p className="text-xs capitalize text-neutral-500">{key}</p>
                      <p className="mt-1 text-sm font-semibold text-neutral-950">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-neutral-200 bg-white/95 p-6 shadow-sm backdrop-blur sm:p-8">
                <h2 className="mb-4 text-lg font-bold text-neutral-950">{productDetailSection.specificationsHeading}</h2>
                <div className="space-y-3">
                  {product.specifications.map((item) => (
                    <div key={item} className="flex gap-3 text-sm leading-6 text-neutral-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}
