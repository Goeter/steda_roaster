'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight, MessageCircle, Search } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { Button } from '@/components/ui/button';
import type { Product, ProductPageSection, ProductSection, SiteSettings } from '@/lib/cms-types';
import { getWhatsappHref } from '@/lib/site';


type ProductsPageContentProps = {
  productPageSection: ProductPageSection;
  productSection: ProductSection;
  products: Product[];
  siteSettings: SiteSettings;
};

export function ProductsPageContent({ productPageSection, productSection, products, siteSettings }: ProductsPageContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const defaultFilter = productSection.filters[0] ?? '';
  const [selectedFilter, setSelectedFilter] = useState(defaultFilter);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase().trim();

    return products.filter((product) => {
      const matchesSearch =
        !normalizedQuery ||
        `${product.name} ${product.category} ${product.description} ${product.tag || ''}`
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesFilter =
        selectedFilter === defaultFilter ||
        product.category === selectedFilter ||
        product.tag === selectedFilter;

      const isAllowedCategory = productSection.allowedCategories.includes(product.category);

      return matchesSearch && matchesFilter && isAllowedCategory;
    });
  }, [defaultFilter, productSection.allowedCategories, productSection.filters, products, searchQuery, selectedFilter]);

  return (
    <>

      <main className="min-h-screen bg-gradient-to-br from-[#fff7ed] via-[#fffbf5] to-[#fef3c7] animate-page-enter">
        <section className="relative flex h-[60vh] w-full items-center justify-center text-center">
          <Image
            src={productPageSection.hero.image.src}
            alt={productPageSection.hero.image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />

          <Reveal className="relative z-10 max-w-3xl px-6 text-white">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-200">
              {productPageSection.hero.eyebrow}
            </p>

            <h1 className="text-4xl font-bold md:text-5xl">
              {productPageSection.hero.heading}
            </h1>

            <p className="mt-4 text-lg text-white/85">
              {productPageSection.hero.description}
            </p>
          </Reveal>
        </section>

        <Reveal as="section" className="mx-auto max-w-7xl px-6 py-12">
          <div className="rounded-3xl border border-orange-100 bg-white/85 p-6 shadow-sm backdrop-blur">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:w-1/2">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  size={20}
                />

                <input
                  type="text"
                  placeholder={productPageSection.searchPlaceholder}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  aria-label={productPageSection.searchAriaLabel}
                  className="w-full rounded-2xl border border-orange-100 bg-white py-3 pl-12 pr-4 outline-none transition focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {productSection.filters.map((filter) => (
                  <Button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`rounded-full px-5 py-2 font-medium ${
                      selectedFilter === filter
                        ? 'bg-orange-600 text-white hover:bg-orange-700'
                        : 'border border-orange-200 bg-white text-orange-700 hover:bg-orange-50'
                    }`}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <section className="relative mx-auto max-w-7xl px-6 pb-20">
          {filteredProducts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  aria-label={`${productPageSection.detailAriaLabelPrefix} ${product.name}`}
                  className="group block h-full"
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white/95 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative h-60 w-full overflow-hidden">
                      <Image
                        src={product.image}
                        alt={`${productPageSection.productImageAltPrefix} ${product.name}`}
                        fill
                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />

                      {product.tag === productPageSection.bestSellerLabel && (
                        <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                          {productPageSection.bestSellerLabel}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <span className="w-fit rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                        {product.category}
                      </span>

                      <h2 className="mt-4 text-xl font-bold text-neutral-900">
                        {product.name}
                      </h2>

                      <p className="mt-3 text-sm leading-6 text-neutral-600">
                        {product.description}
                      </p>

                      <div className="flex-1" />

                      <Button asChild className="mt-6 w-full rounded-full bg-orange-600 text-white hover:bg-orange-700">
                        <span>
                          {productPageSection.detailButtonLabel} <ArrowRight size={18} />
                        </span>
                      </Button>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white p-10 text-center text-neutral-500 shadow-sm">
              {productSection.emptyMessage}
            </div>
          )}
        </section>

        <Reveal as="section" delay={150} className="relative overflow-hidden bg-gradient-to-r from-[#2b1b12] via-[#4a2b19] to-[#2b1b12] py-8 text-white sm:py-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_25%,rgba(245,158,11,0.28),transparent_30%),radial-gradient(circle_at_85%_75%,rgba(120,53,15,0.45),transparent_35%)]" />
          <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(135deg,#ffffff_1px,transparent_1px),linear-gradient(45deg,#ffffff_1px,transparent_1px)] bg-[length:30px_30px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />

          <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
            <div className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
              <div className="max-w-3xl">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-amber-200 ring-1 ring-white/15 backdrop-blur lg:mx-0">
                  <MessageCircle size={24} />
                </div>

                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200 sm:text-sm">
                  {productSection.consultation.eyebrow}
                </p>

                <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                  {productSection.consultation.heading}
                </h3>

                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base lg:mx-0">
                  {productSection.consultation.description}
                </p>
              </div>

              <div className="flex w-full flex-col items-center gap-3 lg:w-auto lg:items-end">
                <Button
                  asChild
                  className="w-full rounded-full bg-[#25D366] px-8 py-6 font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#1ebe5d] sm:w-auto"
                >
                  <a
                    href={getWhatsappHref(siteSettings)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {productSection.consultation.ctaLabel}
                    <ArrowRight size={18} />
                  </a>
                </Button>

                <p className="text-xs font-medium text-white/60">
                  {productSection.consultation.note}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </main>

    </>
  );
}
