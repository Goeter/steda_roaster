'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/cms-data';

export function Product() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'prev' | 'next') => {
    if (!carouselRef.current) return;

    const scrollAmount = carouselRef.current.clientWidth * 0.9;
    carouselRef.current.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="product" className="relative overflow-hidden py-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#fffaf5] via-[#fdf6ec] to-[#f7efe5]" />
      <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(180,120,45,0.20),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(92,55,25,0.14),transparent_34%)]" />
      <div className="absolute inset-0 -z-10 opacity-20 bg-[linear-gradient(45deg,rgba(120,90,40,0.08)_25%,transparent_25%,transparent_50%,rgba(120,90,40,0.08)_50%,rgba(120,90,40,0.08)_75%,transparent_75%,transparent)] bg-[length:28px_28px]" />

      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8">
        <div className="mb-14 w-full text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">Our Products</p>
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Explore Our Coffee Machine</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-neutral-600">
            Kami menawarkan berbagai jenis mesin roasting kopi untuk kebutuhan home roastery, coffee shop, sampai produksi profesional.
          </p>
        </div>

        <div className="relative w-full">
          <div
            ref={carouselRef}
            className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {products.map((product) => (
              <div key={product.id} className="min-w-[86%] snap-start sm:min-w-[48%] lg:min-w-[31.8%]">
                <Link
                  href={`/products/${product.slug}`}
                  aria-label={`Lihat detail ${product.name}`}
                  className="group block h-full"
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white/95 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative h-60 w-full overflow-hidden">
                      <Image
                        src={product.image}
                        alt={`Mesin roasting kopi ${product.name}`}
                        fill
                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />

                      {product.tag === 'Best Seller' && (
                        <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                          Best Seller
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <span className="w-fit rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                        {product.category}
                      </span>

                      <h3 className="mt-4 text-xl font-bold text-neutral-900">
                        {product.name}
                      </h3>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">
                        {product.description}
                      </p>

                      <div className="flex-1" />

                      <Button className="mt-6 w-full rounded-full bg-orange-600 text-white hover:bg-orange-700">
                        See Detail <ArrowRight size={18} />
                      </Button>
                    </div>
                  </article>
                </Link>
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollCarousel('prev')}
            className="absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-3 text-orange-700 shadow-lg ring-1 ring-orange-100 transition hover:bg-orange-50 md:flex"
            aria-label="Previous product"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={() => scrollCarousel('next')}
            className="absolute right-0 top-1/2 z-10 hidden translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-3 text-orange-700 shadow-lg ring-1 ring-orange-100 transition hover:bg-orange-50 md:flex"
            aria-label="Next product"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 md:hidden">
          <button
            onClick={() => scrollCarousel('prev')}
            className="rounded-full bg-orange-600 p-3 text-white shadow-md transition hover:bg-orange-700"
            aria-label="Previous product"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => scrollCarousel('next')}
            className="rounded-full bg-orange-600 p-3 text-white shadow-md transition hover:bg-orange-700"
            aria-label="Next product"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="mt-10">
          <Button
            asChild
            className="group rounded-full bg-gradient-to-r from-orange-600 to-amber-500 px-8 py-6 text-base font-semibold text-white shadow-lg shadow-orange-900/15 transition hover:-translate-y-0.5 hover:from-orange-700 hover:to-amber-600 hover:shadow-xl"
          >
            <Link href="/products">
              See More Products
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
