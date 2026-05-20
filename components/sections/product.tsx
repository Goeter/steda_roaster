'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { Button } from '@/components/ui/button';
import type { Product as ProductItem, ProductPageSection, ProductSection } from '@/lib/cms-types';

type ProductProps = {
  productPageSection: ProductPageSection;
  productSection: ProductSection;
  products: ProductItem[];
};

export function Product({ productPageSection, productSection, products }: ProductProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const homeProducts = useMemo(
    () => products.filter((product) => productSection.allowedCategories.includes(product.category)),
    [],
  );

  const scrollCarousel = (direction: 'prev' | 'next') => {
    if (!carouselRef.current) return;

    const scrollAmount = carouselRef.current.clientWidth * 0.85;

    carouselRef.current.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="product"
      className="relative overflow-hidden bg-gradient-to-br from-[#fff7ed] via-[#fffbf5] to-[#fef3c7] py-20"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6">
        <Reveal className="mb-14 w-full text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
            {productSection.eyebrow}
          </p>

          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            {productSection.heading}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-neutral-600">
            {productSection.description}
          </p>
        </Reveal>

        <Reveal className="relative w-full px-0 sm:px-14 lg:px-16" delay={150}>
          <div
            ref={carouselRef}
            className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-0 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-1"
          >
            {homeProducts.map((product) => (
              <div
                key={product.id}
                className="mx-auto w-[88vw] max-w-[340px] shrink-0 snap-center sm:mx-0 sm:w-[320px] sm:snap-start lg:w-[360px]"
              >
                <Link
                  href={`/products/${product.slug}`}
                  aria-label={`${productPageSection.detailAriaLabelPrefix} ${product.name}`}
                  className="group block h-full"
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white/95 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative h-52 w-full overflow-hidden sm:h-56">
                      <Image
                        src={product.image}
                        alt={`${productPageSection.productImageAltPrefix} ${product.name}`}
                        fill
                        sizes="(min-width:1024px) 360px, (min-width:640px) 320px, 88vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />

                      {product.tag === productPageSection.bestSellerLabel && (
                        <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                          {productPageSection.bestSellerLabel}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <span className="w-fit rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                        {product.category}
                      </span>

                      <h2 className="mt-3 text-lg font-bold text-neutral-900">
                        {product.name}
                      </h2>

                      <p className="mt-2 text-sm leading-6 text-neutral-600">
                        {product.description}
                      </p>

                      <div className="flex-1" />

                      <Button className="mt-5 h-10 w-full rounded-full bg-orange-600 text-sm font-semibold text-white hover:bg-orange-700">
                        {productPageSection.detailButtonLabel} <ArrowRight size={16} />
                      </Button>
                    </div>
                  </article>
                </Link>
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollCarousel('prev')}
            className="absolute left-1 top-1/2 z-10 flex -translate-y-1/2 rounded-full bg-white/95 p-2.5 text-orange-700 shadow-lg ring-1 ring-orange-100 transition hover:bg-orange-50 sm:-left-2 sm:p-3 lg:-left-3"
            aria-label={productSection.previousProductAriaLabel}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => scrollCarousel('next')}
            className="absolute right-1 top-1/2 z-10 flex -translate-y-1/2 rounded-full bg-white/95 p-2.5 text-orange-700 shadow-lg ring-1 ring-orange-100 transition hover:bg-orange-50 sm:-right-2 sm:p-3 lg:-right-3"
            aria-label={productSection.nextProductAriaLabel}
          >
            <ChevronRight size={20} />
          </button>
        </Reveal>

        <Reveal className="mt-10" delay={200}>
          <Button
            asChild
            className="group rounded-full bg-orange-600 px-8 py-6 text-base font-semibold text-white shadow-lg shadow-orange-900/15 transition hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-xl"
          >
            <Link href={productSection.ctaHref}>
              {productSection.ctaLabel}
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
