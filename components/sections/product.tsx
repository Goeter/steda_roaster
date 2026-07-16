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
    [productSection.allowedCategories, products],
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
      className="relative overflow-hidden bg-gradient-to-br from-[#2b1b12] via-[#3a261a] to-[#241610] py-20"
    >
      {/* Tenun Ikat Pattern */}
      <div
        className="absolute inset-0 bg-repeat opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23d4a060' stroke-width='0.7'%3E%3Cpath d='M0 30 L15 15 L30 30 L15 45 Z'/%3E%3Cpath d='M30 0 L45 15 L30 30 L45 45 L30 60'/%3E%3Ccircle cx='15' cy='30' r='2' fill='%23d4a060'/%3E%3Ccircle cx='45' cy='30' r='2' fill='%23d4a060'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Glow */}
      <div className="absolute -left-20 top-1/3 h-80 w-80 rounded-full bg-amber-500/6 blur-[120px]" />
      <div className="absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-orange-400/5 blur-[100px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

      {/* Top ornament */}
      <div className="absolute left-1/2 top-6 z-10 -translate-x-1/2">
        <div className="flex items-center gap-2">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/25" />
          <div className="h-1.5 w-1.5 rotate-45 bg-amber-400/20" />
          <div className="h-2 w-2 rotate-45 border border-amber-400/25" />
          <div className="h-1.5 w-1.5 rotate-45 bg-amber-400/20" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/25" />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6">
        <Reveal className="mb-14 w-full text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
            {productSection.eyebrow}
          </p>

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {productSection.heading}
          </h2>

          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/65">
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
                  <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
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

                      <h3 className="mt-3 text-lg font-bold text-neutral-900">
                        {product.name}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-neutral-600">
                        {product.description}
                      </p>

                      <div className="flex-1" />

                      <Button asChild className="mt-5 h-10 w-full rounded-full bg-orange-600 text-sm font-semibold text-white hover:bg-orange-700">
                        <span>
                          {productPageSection.detailButtonLabel} <ArrowRight size={16} />
                        </span>
                      </Button>
                    </div>
                  </article>
                </Link>
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollCarousel('prev')}
            className="absolute left-1 top-1/2 z-10 flex -translate-y-1/2 rounded-full bg-white/95 p-2.5 text-orange-700 shadow-lg ring-1 ring-orange-200 transition hover:bg-orange-50 sm:-left-2 sm:p-3 lg:-left-3"
            aria-label={productSection.previousProductAriaLabel}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => scrollCarousel('next')}
            className="absolute right-1 top-1/2 z-10 flex -translate-y-1/2 rounded-full bg-white/95 p-2.5 text-orange-700 shadow-lg ring-1 ring-orange-200 transition hover:bg-orange-50 sm:-right-2 sm:p-3 lg:-right-3"
            aria-label={productSection.nextProductAriaLabel}
          >
            <ChevronRight size={20} />
          </button>
        </Reveal>

        <Reveal className="mt-10" delay={200}>
          <Button
            asChild
            className="group rounded-full bg-white px-8 py-6 text-base font-semibold text-orange-700 shadow-lg shadow-black/15 transition hover:-translate-y-0.5 hover:bg-orange-50 hover:shadow-xl"
          >
            <Link href={productSection.ctaHref}>
              {productSection.ctaLabel}
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
          </Button>
        </Reveal>
      </div>

      {/* Bottom transition to light Benefits */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-b from-transparent to-[#f8f3ec]" />
    </section>
  );
}
