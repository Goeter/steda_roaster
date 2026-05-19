'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonies, testimoniesSection } from '@/lib/cms-data';

export function Testimonies() {
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
      className="relative overflow-hidden bg-[#fffaf1] py-12 sm:py-16"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(217,158,83,0.20),transparent_30%),radial-gradient(circle_at_82%_78%,rgba(111,78,55,0.13),transparent_34%)]" />
      <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-200/20 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.32em] text-amber-700 sm:text-sm">
            {testimoniesSection.eyebrow}
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
            {testimoniesSection.heading}
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-neutral-600 sm:text-base">
            {testimoniesSection.description}
          </p>
        </div>

        <div className="relative mx-auto mt-2 flex h-[390px] max-w-[920px] items-center justify-center overflow-hidden sm:mt-4 sm:h-[400px] sm:overflow-visible">
          <button
            type="button"
            onClick={() => paginate(-1)}
            className="absolute left-1 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-amber-200 bg-white/90 text-amber-800 shadow-lg shadow-amber-900/10 backdrop-blur transition duration-300 hover:-translate-x-0.5 hover:bg-amber-50 sm:left-4"
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
                    'before:pointer-events-none before:absolute before:inset-0 before:rounded-[1.75rem]',
                    'before:bg-gradient-to-br before:from-white/75 before:via-white/35 before:to-amber-50/80',
                    'hover:border-amber-300/80 hover:bg-white/90',
                    isCenter
                      ? 'z-20 w-[min(74vw,420px)] -translate-x-1/2 -translate-y-1/2 scale-100 border-amber-200/90 bg-white/90 p-6 opacity-100 shadow-2xl shadow-amber-950/10 sm:w-[420px] sm:p-7'
                      : 'z-10 w-[min(54vw,280px)] -translate-y-1/2 scale-[0.84] border-white/80 bg-white/55 p-5 opacity-70 shadow-xl shadow-amber-950/5 hover:scale-[0.87] hover:opacity-90 sm:w-[280px]',
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
                          'bg-gradient-to-br from-amber-100 to-orange-100 text-amber-700 shadow-inner',
                          isCenter ? 'h-12 w-12' : 'h-10 w-10',
                        ].join(' ')}
                      >
                        <Quote className={isCenter ? 'h-6 w-6' : 'h-5 w-5'} />
                      </div>

                      <div className="h-px flex-1 bg-gradient-to-r from-amber-200/90 to-transparent" />
                    </div>

                    <p
                      className={[
                        'text-neutral-700',
                        isCenter
                          ? 'line-clamp-6 text-base leading-8 sm:text-lg'
                          : 'line-clamp-4 text-xs leading-6 sm:text-sm',
                      ].join(' ')}
                    >
                      “{item.text}”
                    </p>

                    <div
                      className={[
                        'border-t border-amber-100/80',
                        isCenter ? 'mt-6 pt-5' : 'mt-5 pt-4',
                      ].join(' ')}
                    >
                      <h3
                        className={[
                          'font-bold text-neutral-950',
                          isCenter ? 'text-base' : 'text-sm',
                        ].join(' ')}
                      >
                        {item.name}
                      </h3>

                      <p className="mt-1 line-clamp-1 text-xs text-neutral-500 sm:text-sm">
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
            className="absolute right-1 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-amber-200 bg-white/90 text-amber-800 shadow-lg shadow-amber-900/10 backdrop-blur transition duration-300 hover:translate-x-0.5 hover:bg-amber-50 sm:right-4"
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
                  : 'w-2.5 bg-amber-200 hover:bg-amber-300',
              ].join(' ')}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
