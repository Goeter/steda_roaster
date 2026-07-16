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
      className="relative overflow-hidden bg-gradient-to-br from-[#e8d5b5] via-[#eedcc4] to-[#e0c9a5] py-20"
    >
      {/* Batik Parang Pattern — Diagonal Flow */}
      <div
        className="absolute inset-0 bg-repeat opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='140' height='140' viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23856025' stroke-width='1.3'%3E%3Cpath d='M0 70 Q35 35 70 70 Q105 105 140 70' /%3E%3Cpath d='M0 0 Q35 -35 70 0 Q105 35 140 0' transform='translate(0,140)'/%3E%3Ccircle cx='70' cy='70' r='4' fill='%23856025'/%3E%3Ccircle cx='0' cy='0' r='3' fill='%23856025'/%3E%3Ccircle cx='140' cy='140' r='3' fill='%23856025'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Roaster Gear Decoration — Top Right */}
      <div
        className="absolute -right-16 -top-16 h-64 w-64 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='256' height='256' viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%237a5620' stroke-width='2'%3E%3Ccircle cx='128' cy='128' r='60'/%3E%3Ccircle cx='128' cy='128' r='40'/%3E%3Ccircle cx='128' cy='128' r='15' fill='%237a5620'/%3E%3Cline x1='128' y1='20' x2='128' y2='68' stroke-width='8' stroke-linecap='round'/%3E%3Cline x1='128' y1='188' x2='128' y2='236' stroke-width='8' stroke-linecap='round'/%3E%3Cline x1='20' y1='128' x2='68' y2='128' stroke-width='8' stroke-linecap='round'/%3E%3Cline x1='188' y1='128' x2='236' y2='128' stroke-width='8' stroke-linecap='round'/%3E%3Cline x1='52' y1='52' x2='86' y2='86' stroke-width='8' stroke-linecap='round'/%3E%3Cline x1='170' y1='170' x2='204' y2='204' stroke-width='8' stroke-linecap='round'/%3E%3Cline x1='204' y1='52' x2='170' y2='86' stroke-width='8' stroke-linecap='round'/%3E%3Cline x1='52' y1='204' x2='86' y2='170' stroke-width='8' stroke-linecap='round'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
      />

      {/* Roaster Gear — Bottom Left */}
      <div
        className="absolute -bottom-12 -left-12 h-48 w-48 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='192' height='192' viewBox='0 0 192 192' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%237a5620' stroke-width='2'%3E%3Ccircle cx='96' cy='96' r='45'/%3E%3Ccircle cx='96' cy='96' r='30'/%3E%3Ccircle cx='96' cy='96' r='12' fill='%237a5620'/%3E%3Cline x1='96' y1='15' x2='96' y2='51' stroke-width='6' stroke-linecap='round'/%3E%3Cline x1='96' y1='141' x2='96' y2='177' stroke-width='6' stroke-linecap='round'/%3E%3Cline x1='15' y1='96' x2='51' y2='96' stroke-width='6' stroke-linecap='round'/%3E%3Cline x1='141' y1='96' x2='177' y2='96' stroke-width='6' stroke-linecap='round'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
      />

      {/* Warm glow accents */}
      <div className="absolute -left-20 top-1/3 h-80 w-80 rounded-full bg-orange-300/15 blur-[120px]" />
      <div className="absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-amber-300/15 blur-[100px]" />

      {/* Decorative diamond dividers */}
      <div className="absolute left-1/2 top-6 z-10 -translate-x-1/2">
        <div className="flex items-center gap-2">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-700/30" />
          <div className="h-1.5 w-1.5 rotate-45 bg-amber-700/30" />
          <div className="h-2 w-2 rotate-45 border border-amber-700/30" />
          <div className="h-1.5 w-1.5 rotate-45 bg-amber-700/30" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-700/30" />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6">
        <Reveal className="mb-14 w-full text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-800">
            {productSection.eyebrow}
          </p>

          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            {productSection.heading}
          </h2>

          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-amber-700 to-orange-400" />

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-neutral-700">
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
                  <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-amber-200/50 bg-white/90 shadow-lg shadow-amber-900/10 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-900/15">
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
            className="group rounded-full bg-orange-600 px-8 py-6 text-base font-semibold text-white shadow-lg shadow-orange-900/20 transition hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-xl"
          >
            <Link href={productSection.ctaHref}>
              {productSection.ctaLabel}
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
          </Button>
        </Reveal>
      </div>

      {/* Bottom transition fade to Benefits section */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent to-[#ddd0b8]" />
    </section>
  );
}
