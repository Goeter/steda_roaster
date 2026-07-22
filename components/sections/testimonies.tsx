'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import type { TestimoniesSection, Testimony } from '@/lib/cms-types';

type TestimoniesProps = {
  testimoniesSection: TestimoniesSection;
  testimonies: Testimony[];
};

export function Testimonies({ testimoniesSection, testimonies }: TestimoniesProps) {
  const [index, setIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);

  const total = testimonies.length;

  const paginate = useCallback(
    (dir: number) => {
      if (total <= 1) return;
      setIndex((prev) => (prev + dir + total) % total);
    },
    [total],
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
      id="testimonies"
      className="relative overflow-hidden bg-transparent py-24 text-neutral-900 border-y border-amber-900/10"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(212,175,55,0.15),transparent_35%),radial-gradient(circle_at_82%_78%,rgba(180,120,60,0.1),transparent_35%)]" />
      <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-200/25 blur-3xl" />
      <div className="absolute -right-10 bottom-1/4 h-56 w-56 rounded-full bg-yellow-200/15 blur-[90px]" />

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

        <div className="relative mx-auto mt-2 flex h-[390px] max-w-[920px] items-center justify-center overflow-hidden sm:mt-4 sm:h-[400px] sm:overflow-visible">
          {/* Floating Trust Badge - Left */}
          <div className="hidden xl:flex flex-col items-center justify-center p-5 rounded-2xl border border-amber-800/20 bg-white/95 shadow-xl shadow-amber-950/10 backdrop-blur-md w-44 absolute left-0 top-1/2 -translate-x-[calc(100%+3.5rem)] -translate-y-1/2 select-none pointer-events-none transition-all duration-300 hover:border-amber-700/40 hover:bg-white">
            <span className="text-3xl font-black text-amber-800 text-timbul-amber">4.9★</span>
            <span className="text-[10px] font-extrabold text-neutral-900 text-timbul-dark mt-1 uppercase tracking-wider">Rating Roaster</span>
            <div className="h-px w-8 bg-amber-800/20 my-2" />
            <p className="text-[11px] font-medium leading-relaxed text-center text-neutral-700 text-timbul-dark">
              Ditinjau oleh 500+ Roaster Kopi Nusantara
            </p>
          </div>

          {/* Floating Trust Badge - Right */}
          <div className="hidden xl:flex flex-col items-center justify-center p-5 rounded-2xl border border-amber-800/20 bg-white/95 shadow-xl shadow-amber-950/10 backdrop-blur-md w-44 absolute right-0 top-1/2 translate-x-[calc(100%+3.5rem)] -translate-y-1/2 select-none pointer-events-none transition-all duration-300 hover:border-amber-700/40 hover:bg-white">
            <span className="text-3xl font-black text-amber-800 text-timbul-amber">100%</span>
            <span className="text-[10px] font-extrabold text-neutral-900 text-timbul-dark mt-1 uppercase tracking-wider">Garansi Mesin</span>
            <div className="h-px w-8 bg-amber-800/20 my-2" />
            <p className="text-[11px] font-medium leading-relaxed text-center text-neutral-700 text-timbul-dark">
              Dukungan Teknis & Suku Cadang Terjamin
            </p>
          </div>

          <button
            type="button"
            onClick={() => paginate(-1)}
            className="absolute left-1 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-amber-800/20 bg-white text-neutral-900 shadow-md backdrop-blur transition duration-300 hover:-translate-x-0.5 hover:bg-amber-700 hover:text-white hover:border-amber-700 sm:left-4"
            aria-label={testimoniesSection.previousAriaLabel}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="relative h-full w-full">
            {visibleTestimonies.map(({ item, position, itemIndex }) => {
              const isCenter = position === 'center';

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(itemIndex)}
                  aria-label={`${testimoniesSection.itemAriaLabelPrefix} ${item.name}`}
                  className={[
                    'absolute left-1/2 top-1/2 text-left',
                    'rounded-[1.75rem] border backdrop-blur-xl',
                    'transition-[transform,opacity,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    'will-change-transform',
                    'hover:border-amber-600/30 hover:bg-white',
                    isCenter
                      ? 'z-20 w-[min(74vw,420px)] -translate-x-1/2 -translate-y-1/2 scale-100 border-amber-700/25 bg-white/95 p-6 opacity-100 shadow-2xl shadow-amber-950/15 sm:w-[420px] sm:p-7'
                      : 'z-10 w-[min(54vw,280px)] -translate-y-1/2 scale-[0.84] border-amber-800/20 bg-white/90 p-5 opacity-70 shadow-md shadow-amber-950/5 hover:scale-[0.87] hover:opacity-90 sm:w-[280px]',
                    position === 'left' && '-translate-x-[96%] sm:-translate-x-[122%]',
                    position === 'right' && '-translate-x-[4%] sm:translate-x-[22%]',
                    position === 'center' && 'translate-x-[-50%]',
                  ].join(' ')}
                >
                  <div className="relative">
                    <div className="mb-5 flex items-center gap-4">
                      <div
                        className={[
                          'flex shrink-0 items-center justify-center rounded-2xl',
                          'bg-gradient-to-br from-amber-100 to-amber-200/80 text-amber-800 border border-amber-300/50 shadow-inner',
                          isCenter ? 'h-12 w-12' : 'h-10 w-10',
                        ].join(' ')}
                      >
                        <Quote className={isCenter ? 'h-6 w-6' : 'h-5 w-5'} />
                      </div>

                      <div className="h-px flex-1 bg-gradient-to-r from-amber-600/30 to-transparent" />
                    </div>

                    <p
                      className={[
                        'font-semibold leading-relaxed text-neutral-900 text-timbul-dark',
                        isCenter
                          ? 'line-clamp-6 text-base leading-8 sm:text-lg'
                          : 'line-clamp-4 text-xs leading-6 sm:text-sm text-neutral-800',
                      ].join(' ')}
                    >
                      “{item.text}”
                    </p>

                    <div
                      className={[
                        'border-t border-amber-800/15',
                        isCenter ? 'mt-6 pt-5' : 'mt-5 pt-4',
                      ].join(' ')}
                    >
                      <h3
                        className={[
                          'font-extrabold text-neutral-900 text-timbul-dark',
                          isCenter ? 'text-base sm:text-lg' : 'text-sm',
                        ].join(' ')}
                      >
                        {item.name}
                      </h3>

                      <p className="mt-1 line-clamp-1 text-xs font-semibold text-neutral-600 sm:text-sm">
                        {item.position}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => paginate(1)}
            className="absolute right-1 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-amber-800/20 bg-white text-neutral-800 shadow-md backdrop-blur transition duration-300 hover:translate-x-0.5 hover:bg-amber-700 hover:text-white hover:border-amber-700 sm:right-4"
            aria-label={testimoniesSection.nextAriaLabel}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="-mt-2 flex items-center justify-center gap-2 sm:mt-0">
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
