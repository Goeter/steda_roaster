'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import type { TestimoniesSection, Testimony } from '@/lib/cms-types';

function CountUpNumber({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  isVisible,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  isVisible: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentValue = easeOutExpo * value;

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value]);

  return (
    <span>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}

type TestimoniesProps = {
  testimoniesSection: TestimoniesSection;
  testimonies: Testimony[];
};

export function Testimonies({ testimoniesSection, testimonies }: TestimoniesProps) {
  const [index, setIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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

        {/* Testimonials 3-Card Carousel Container (Showing Previous, Active, Next) */}
        <div className="relative mx-auto mt-6 flex h-[390px] max-w-[840px] items-center justify-center overflow-visible sm:h-[410px]">
          {/* Floating Trust Badge - Left */}
          <div className="hidden xl:flex flex-col items-center justify-center p-5 rounded-2xl card-timbul w-44 absolute left-0 top-1/2 -translate-x-[calc(100%+2.5rem)] -translate-y-1/2 select-none pointer-events-none transition-all duration-300">
            <span className="text-3xl font-black text-amber-800 text-timbul-amber">
              <CountUpNumber value={4.9} decimals={1} suffix="★" isVisible={isVisible} />
            </span>
            <span className="text-[10px] font-extrabold text-neutral-900 text-timbul-dark mt-1 uppercase tracking-wider">
              Rating Roaster
            </span>
            <div className="h-px w-8 bg-amber-800/20 my-2" />
            <p className="text-[11px] font-medium leading-relaxed text-center text-neutral-700 text-timbul-dark">
              Ditinjau oleh <CountUpNumber value={500} suffix="+" isVisible={isVisible} /> Roaster Kopi Nusantara
            </p>
          </div>

          {/* Navigation Chevron - Left (close to active card) */}
          <button
            type="button"
            onClick={() => paginate(-1)}
            className="absolute left-1 sm:left-4 z-30 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full card-timbul text-neutral-900 shadow-md transition duration-300 hover:bg-amber-700 hover:text-white hover:scale-105"
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
                    'rounded-3xl',
                    'transition-all duration-600 cubic-bezier(0.25, 1, 0.5, 1)',
                    isCenter
                      ? 'z-20 w-[min(76vw,420px)] -translate-x-1/2 -translate-y-1/2 scale-100 card-timbul-active p-6 sm:w-[420px] sm:p-7 opacity-100 shadow-2xl'
                      : 'z-10 w-[min(52vw,280px)] -translate-y-1/2 scale-85 card-timbul p-5 sm:w-[280px] opacity-60 hover:opacity-85 hover:scale-90',
                    position === 'left' && '-translate-x-[92%] sm:-translate-x-[118%]',
                    position === 'right' && '-translate-x-[8%] sm:translate-x-[18%]',
                  ].join(' ')}
                >
                  <div className="relative">
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className={[
                          'flex shrink-0 items-center justify-center rounded-2xl',
                          'bg-gradient-to-br from-amber-100 to-amber-200/80 text-amber-800 border border-amber-300/50 shadow-inner',
                          isCenter ? 'h-11 w-11' : 'h-9 w-9',
                        ].join(' ')}
                      >
                        <Quote className={isCenter ? 'h-5 w-5' : 'h-4 w-4'} />
                      </div>

                      <div className="h-px flex-1 bg-gradient-to-r from-amber-600/30 to-transparent" />
                    </div>

                    <p
                      className={[
                        'font-semibold leading-relaxed text-neutral-900 text-timbul-dark',
                        isCenter
                          ? 'line-clamp-6 text-base leading-7 sm:text-lg sm:leading-8'
                          : 'line-clamp-4 text-xs leading-5 text-neutral-700',
                      ].join(' ')}
                    >
                      “{item.text}”
                    </p>

                    <div
                      className={[
                        'border-t border-amber-800/15',
                        isCenter ? 'mt-6 pt-5' : 'mt-4 pt-3',
                      ].join(' ')}
                    >
                      <h3
                        className={[
                          'font-extrabold text-neutral-900 text-timbul-dark',
                          isCenter ? 'text-base sm:text-lg' : 'text-xs sm:text-sm',
                        ].join(' ')}
                      >
                        {item.name}
                      </h3>

                      <p className="mt-0.5 line-clamp-1 text-xs font-semibold text-neutral-600">
                        {item.position}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Chevron - Right (close to active card) */}
          <button
            type="button"
            onClick={() => paginate(1)}
            className="absolute right-1 sm:right-4 z-30 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full card-timbul text-neutral-900 shadow-md transition duration-300 hover:bg-amber-700 hover:text-white hover:scale-105"
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
