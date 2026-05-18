'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/cms-data';

export function Product() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % products.length);

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

        <div className="hidden w-full grid-cols-1 gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-3xl border border-amber-100 bg-white/90 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl"
            >
              <div className="relative h-52 overflow-hidden bg-neutral-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width:1024px) 25vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="mb-2 text-sm font-semibold text-amber-700">{product.category}</p>
                <h3 className="mb-2 text-xl font-bold text-neutral-900">{product.name}</h3>
                <p className="mb-5 line-clamp-3 text-sm leading-6 text-neutral-600">{product.description}</p>
                <Button asChild className="w-full rounded-full bg-amber-600 text-white hover:bg-amber-700">
                  <Link href={`/products/${product.slug}`}>See Detail</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="w-full max-w-xs md:hidden">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {products.map((product) => (
                <article key={product.id} className="w-full flex-shrink-0 overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-sm">
                  <div className="relative h-52 bg-neutral-100">
                    <Image src={product.image} alt={product.name} fill sizes="320px" className="object-cover" />
                  </div>
                  <div className="p-6">
                    <p className="mb-2 text-sm font-semibold text-amber-700">{product.category}</p>
                    <h3 className="mb-2 text-xl font-bold text-neutral-900">{product.name}</h3>
                    <p className="mb-5 text-sm leading-6 text-neutral-600">{product.description}</p>
                    <Button asChild className="w-full rounded-full bg-amber-600 text-white hover:bg-amber-700">
                      <Link href={`/products/${product.slug}`}>See Detail</Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button onClick={handlePrev} className="rounded-full bg-amber-600 p-3 text-white" aria-label="Previous product">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to ${product.name}`}
                  className={`h-2.5 rounded-full transition-all ${currentIndex === index ? 'w-7 bg-amber-600' : 'w-2.5 bg-amber-200'}`}
                />
              ))}
            </div>
            <button onClick={handleNext} className="rounded-full bg-amber-600 p-3 text-white" aria-label="Next product">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
