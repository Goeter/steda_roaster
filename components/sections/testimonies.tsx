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
      className="relative overflow-hidden bg-[#2B1B12] py-20"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(212,175,55,0.1),transparent_30%),radial-gradient(circle_at_82%_78%,rgba(139,90,43,0.08),transparent_34%)]" />
      <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-500/8 blur-3xl" />
      <div className="absolute -right-10 bottom-1/4 h-56 w-56 rounded-full bg-amber-700/5 blur-[90px]" />

      {/* Mega Mendung Cloud Pattern — Warm Gold Line Accent */}
      <div
        className="absolute inset-0 bg-repeat opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='160' height='80' viewBox='0 0 160 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%238b6914' stroke-width='0.8'%3E%3Cpath d='M0 60 Q20 40 40 50 Q60 60 80 40 Q100 20 120 35 Q140 50 160 30'/%3E%3Cpath d='M0 70 Q20 50 40 60 Q60 70 80 50 Q100 30 120 45 Q140 60 160 40'/%3E%3Cpath d='M0 80 Q20 60 40 70 Q60 80 80 60 Q100 40 120 55 Q140 70 160 50'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.32em] text-amber-400 sm:text-sm">
            {testimoniesSection.eyebrow}
          </p>

          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            {testimoniesSection.heading}
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
            {testimoniesSection.description}
          </p>
        </div>

        <div className="relative mx-auto mt-2 flex h-[390px] max-w-[920px] items-center justify-center overflow-hidden sm:mt-4 sm:h-[400px] sm:overflow-visible">
          <button
            type="button"
            onClick={() => paginate(-1)}
            className="absolute left-1 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-amber-600/30 bg-[#3a2a1d] text-amber-400 shadow-lg backdrop-blur transition duration-300 hover:-translate-x-0.5 hover:bg-[#4a3a2d] sm:left-4"
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
                    'hover:border-amber-500/40 hover:bg-[#3a2a1d]',
                    isCenter
                      ? 'z-20 w-[min(74vw,420px)] -translate-x-1/2 -translate-y-1/2 scale-100 border-amber-600/30 bg-[#3a2a1d] p-6 opacity-100 shadow-xl shadow-black/30 sm:w-[420px] sm:p-7'
                      : 'z-10 w-[min(54vw,280px)] -translate-y-1/2 scale-[0.84] border-amber-700/20 bg-[#2f1f14]/90 p-5 opacity-70 shadow-md shadow-black/20 hover:scale-[0.87] hover:opacity-90 sm:w-[280px]',
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
                          'bg-gradient-to-br from-amber-700/30 to-amber-900/20 text-amber-400 shadow-inner',
                          isCenter ? 'h-12 w-12' : 'h-10 w-10',
                        ].join(' ')}
                      >
                        <Quote className={isCenter ? 'h-6 w-6' : 'h-5 w-5'} />
                      </div>

                      <div className="h-px flex-1 bg-gradient-to-r from-amber-500/30 to-transparent" />
                    </div>

                    <p
                      className={[
                        'text-white/80',
                        isCenter
                          ? 'line-clamp-6 text-base leading-8 sm:text-lg'
                          : 'line-clamp-4 text-xs leading-6 sm:text-sm',
                      ].join(' ')}
                    >
                      “{item.text}”
                    </p>

                    <div
                      className={[
                        'border-t border-amber-600/20',
                        isCenter ? 'mt-6 pt-5' : 'mt-5 pt-4',
                      ].join(' ')}
                    >
                      <h3
                        className={[
                          'font-bold text-white',
                          isCenter ? 'text-base' : 'text-sm',
                        ].join(' ')}
                      >
                        {item.name}
                      </h3>

                      <p className="mt-1 line-clamp-1 text-xs text-white/50 sm:text-sm">
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
            className="absolute right-1 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-amber-600/30 bg-[#3a2a1d] text-amber-400 shadow-lg backdrop-blur transition duration-300 hover:translate-x-0.5 hover:bg-[#4a3a2d] sm:right-4"
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
                  ? 'w-8 bg-amber-500'
                  : 'w-2.5 bg-amber-800 hover:bg-amber-600',
              ].join(' ')}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
