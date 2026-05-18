'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonies } from '@/lib/cms-data';

export function Testimonies() {
  const [index, setIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);

  const paginate = useCallback((dir: number) => {
    setIndex((prev) => (prev + dir + testimonies.length) % testimonies.length);
  }, []);

  useEffect(() => {
    if (isHover || testimonies.length <= 1) return;

    const interval = window.setInterval(() => {
      paginate(1);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isHover, paginate]);

  const visibleTestimonies = useMemo(() => {
    const total = testimonies.length;

    if (total === 0) return [];
    if (total === 1) {
      return [{ item: testimonies[0], position: 'center' as const, itemIndex: 0 }];
    }

    const previousIndex = (index - 1 + total) % total;
    const nextIndex = (index + 1) % total;

    return [
      { item: testimonies[previousIndex], position: 'left' as const, itemIndex: previousIndex },
      { item: testimonies[index], position: 'center' as const, itemIndex: index },
      { item: testimonies[nextIndex], position: 'right' as const, itemIndex: nextIndex },
    ];
  }, [index]);

  return (
    <section
      id="testimonies"
      className="relative overflow-hidden bg-[#fffdf8] py-24"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_15%_20%,rgba(217,158,83,0.16),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(104,64,34,0.10),transparent_34%)]" />
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(135deg,#6d4c41_1px,transparent_1px),linear-gradient(45deg,#6d4c41_1px,transparent_1px)] bg-[length:28px_28px]" />

      <div className="relative mx-auto max-w-7xl px-4 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
          Testimonies
        </p>

        <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          What Our Customers Say
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-neutral-600">
          Cerita pelanggan yang menggunakan Steda Roaster untuk mendukung operasional bisnis kopi mereka.
        </p>

        <div className="relative mx-auto mt-14 flex min-h-[430px] max-w-6xl items-center justify-center">
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 z-20 hidden rounded-full border border-amber-200 bg-white/90 p-3 text-amber-700 shadow-lg shadow-amber-900/10 backdrop-blur transition hover:-translate-x-1 hover:bg-amber-50 md:flex"
            aria-label="Previous testimony"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="relative flex w-full items-center justify-center">
            {visibleTestimonies.map(({ item, position, itemIndex }) => {
              const isCenter = position === 'center';

              return (
                <button
                  key={`${item.id}-${position}`}
                  type="button"
                  onClick={() => setIndex(itemIndex)}
                  className={[
                    'group absolute text-left transition-all duration-700 ease-out',
                    'rounded-[2rem] border bg-white/90 backdrop-blur',
                    'hover:border-amber-300 hover:bg-white',
                    isCenter
                      ? 'z-10 w-full max-w-3xl scale-100 border-amber-200 p-8 opacity-100 shadow-2xl shadow-amber-900/10 sm:p-10'
                      : 'hidden w-[320px] scale-90 border-amber-100 p-6 opacity-65 shadow-xl shadow-amber-900/5 blur-[0.2px] hover:opacity-90 lg:block',
                    position === 'left' && '-translate-x-[105%]',
                    position === 'right' && 'translate-x-[105%]',
                    position === 'center' && 'translate-x-0',
                  ].join(' ')}
                  aria-label={`View testimony from ${item.name}`}
                >
                  <div
                    className={[
                      'pointer-events-none absolute inset-0 rounded-[2rem]',
                      isCenter
                        ? 'bg-gradient-to-br from-amber-50/80 via-white/40 to-orange-50/70'
                        : 'bg-gradient-to-br from-white/80 to-amber-50/40',
                    ].join(' ')}
                  />

                  <div className="relative">
                    <div
                      className={[
                        'mb-6 flex items-center justify-between',
                        isCenter ? '' : 'mb-4',
                      ].join(' ')}
                    >
                      <div
                        className={[
                          'flex items-center justify-center rounded-full bg-amber-100 text-amber-700',
                          isCenter ? 'h-14 w-14' : 'h-11 w-11',
                        ].join(' ')}
                      >
                        <Quote className={isCenter ? 'h-7 w-7' : 'h-5 w-5'} />
                      </div>

                      <div className="h-px flex-1 bg-gradient-to-r from-amber-200 to-transparent ml-4" />
                    </div>

                    <p
                      className={[
                        'text-neutral-700',
                        isCenter
                          ? 'text-lg leading-8 sm:text-xl sm:leading-9'
                          : 'line-clamp-5 text-sm leading-7',
                      ].join(' ')}
                    >
                      “{item.text}”
                    </p>

                    <div
                      className={[
                        'border-t border-amber-100',
                        isCenter ? 'mt-8 pt-6' : 'mt-6 pt-5',
                      ].join(' ')}
                    >
                      <h3
                        className={[
                          'font-bold text-neutral-900',
                          isCenter ? 'text-base' : 'text-sm',
                        ].join(' ')}
                      >
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-neutral-500">
                        {item.position}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => paginate(1)}
            className="absolute right-0 z-20 hidden rounded-full border border-amber-200 bg-white/90 p-3 text-amber-700 shadow-lg shadow-amber-900/10 backdrop-blur transition hover:translate-x-1 hover:bg-amber-50 md:flex"
            aria-label="Next testimony"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => paginate(-1)}
            className="rounded-full border border-amber-200 bg-white p-3 text-amber-700 shadow-sm transition hover:bg-amber-50 md:hidden"
            aria-label="Previous testimony"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {testimonies.map((item, itemIndex) => (
              <button
                key={item.id}
                onClick={() => setIndex(itemIndex)}
                aria-label={`View testimony from ${item.name}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  itemIndex === index ? 'w-8 bg-amber-600' : 'w-2.5 bg-amber-200 hover:bg-amber-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            className="rounded-full border border-amber-200 bg-white p-3 text-amber-700 shadow-sm transition hover:bg-amber-50 md:hidden"
            aria-label="Next testimony"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
