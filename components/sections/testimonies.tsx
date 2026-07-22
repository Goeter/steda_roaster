'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import type { TestimoniesSection, Testimony } from '@/lib/cms-types';

type TestimoniesProps = {
  testimoniesSection: TestimoniesSection;
  testimonies: Testimony[];
};

export function Testimonies({ testimoniesSection, testimonies }: TestimoniesProps) {
  const [index, setIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const total = testimonies.length;

  const paginate = useCallback(
    (dir: number) => {
      if (total <= 1) return;
      setIndex((prev) => (prev + dir + total) % total);
    },
    [total]
  );

  useEffect(() => {
    if (isHover || total <= 1) return;

    const interval = window.setInterval(() => {
      paginate(1);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isHover, paginate, total]);

  const visibleTestimonies = useMemo(() => {
    if (total === 0) return [];

    if (total === 1) {
      return [
        {
          item: testimonies[0],
          itemIndex: 0,
          position: 'center' as const,
        },
      ];
    }

    const previousIndex = (index - 1 + total) % total;
    const nextIndex = (index + 1) % total;

    return [
      {
        item: testimonies[previousIndex],
        itemIndex: previousIndex,
        position: 'left' as const,
      },
      {
        item: testimonies[index],
        itemIndex: index,
        position: 'center' as const,
      },
      {
        item: testimonies[nextIndex],
        itemIndex: nextIndex,
        position: 'right' as const,
      },
    ];
  }, [index, total]);

  if (total === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="testimonies"
      className="relative overflow-hidden bg-transparent py-24 text-neutral-900"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* Editorial Quote Watermarks in Background */}
      <span className="absolute left-[8%] top-[12%] text-[18rem] font-serif font-black text-amber-900/[0.06] select-none pointer-events-none hidden xl:block leading-none">
        “
      </span>
      <span className="absolute right-[8%] bottom-[12%] text-[18rem] font-serif font-black text-amber-900/[0.06] select-none pointer-events-none hidden xl:block leading-none">
        ”
      </span>

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.32em] text-amber-800 text-timbul-amber sm:text-sm">
            {testimoniesSection.eyebrow}
          </p>

          <h2 className="text-3xl font-black tracking-tight text-neutral-900 text-timbul-heading sm:text-4xl">
            {testimoniesSection.heading}
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm font-semibold leading-6 text-neutral-800 text-timbul-dark sm:text-base">
            {testimoniesSection.description}
          </p>
        </div>

        {/* Testimonials Carousel Container */}
        <div className="relative mx-auto mt-6 flex h-[390px] max-w-[920px] items-center justify-center overflow-visible sm:h-[410px]">
          {/* Navigation Chevron - Left (positioned outside the left preview card) */}
          <button
            type="button"
            onClick={() => paginate(-1)}
            className="absolute -left-3 sm:-left-10 z-40 flex h-11 w-11 items-center justify-center rounded-full card-timbul text-neutral-900 shadow-xl transition duration-300 hover:bg-amber-700 hover:text-white hover:scale-110"
            aria-label={testimoniesSection.previousAriaLabel}
          >
            <ChevronLeft size={20} />
          </button>

          {/* 3-Card Sliding Track */}
          <div className="relative h-full w-full overflow-hidden sm:overflow-visible">
            {visibleTestimonies.map(({ item, position, itemIndex }) => {
              const isCenter = position === 'center';

              return (
                <div
                  key={item.id}
                  onClick={() => setIndex(itemIndex)}
                  className={[
                    'absolute left-1/2 top-1/2 text-left cursor-pointer select-none',
                    'rounded-3xl p-6 sm:p-7',
                    'transition-all duration-600 cubic-bezier(0.25, 1, 0.5, 1)',
                    'will-change-transform',
                    isCenter
                      ? 'z-20 w-[min(74vw,420px)] -translate-x-1/2 -translate-y-1/2 scale-100 card-timbul-active opacity-100 shadow-2xl'
                      : 'z-10 w-[min(74vw,420px)] -translate-y-1/2 scale-80 card-timbul opacity-55 hover:opacity-80 shadow-md',
                    position === 'left' && '-translate-x-[112%] sm:-translate-x-[122%]',
                    position === 'right' && 'translate-x-[12%] sm:translate-x-[22%]',
                  ].join(' ')}
                >
                  <div className="relative">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200/80 text-amber-800 border border-amber-300/50 shadow-inner">
                        <Quote className="h-5.5 w-5.5" />
                      </div>

                      <div className="h-px flex-1 bg-gradient-to-r from-amber-600/30 to-transparent" />
                    </div>

                    {/* Constant, stable typography so inner text never resizes or reflows */}
                    <p className="line-clamp-6 text-base font-semibold leading-7 text-neutral-900 text-timbul-dark sm:text-lg sm:leading-8">
                      “{item.text}”
                    </p>

                    <div className="mt-6 border-t border-amber-800/15 pt-5">
                      <h3 className="text-base font-extrabold text-neutral-900 text-timbul-dark sm:text-lg">
                        {item.name}
                      </h3>

                      <p className="mt-1 line-clamp-1 text-xs font-semibold text-neutral-600 sm:text-sm">
                        {item.position}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Chevron - Right (positioned outside the right preview card) */}
          <button
            type="button"
            onClick={() => paginate(1)}
            className="absolute -right-3 sm:-right-10 z-40 flex h-11 w-11 items-center justify-center rounded-full card-timbul text-neutral-900 shadow-lg transition duration-300 hover:bg-amber-700 hover:text-white hover:scale-110"
            aria-label={testimoniesSection.nextAriaLabel}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Slide Indicator Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {testimonies.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setIndex(itemIndex)}
              aria-label={`${testimoniesSection.itemAriaLabelPrefix} ${item.name}`}
              className={[
                'h-2.5 rounded-full transition-all duration-300',
                itemIndex === index
                  ? 'w-8 bg-amber-700'
                  : 'w-2.5 bg-amber-900/20 hover:bg-amber-700/60',
              ].join(' ')}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
