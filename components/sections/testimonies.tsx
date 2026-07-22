'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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

  // Auto slide every 15 seconds (15000ms)
  useEffect(() => {
    if (isHover || total <= 1) return;

    const interval = window.setInterval(() => {
      paginate(1);
    }, 15000);

    return () => window.clearInterval(interval);
  }, [isHover, paginate, total]);

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

        {/* Testimonials 3-Card Linear Slide Viewport (Showing Previous, Active, Next with fixed width & stable text) */}
        <div className="relative mx-auto mt-6 h-[400px] w-full max-w-[960px] overflow-hidden sm:mt-8 sm:h-[420px]">
          {/* Floating Trust Badge - Left */}
          <div className="hidden xl:flex flex-col items-center justify-center p-5 rounded-2xl card-timbul w-44 absolute left-0 top-1/2 -translate-x-[calc(100%+3rem)] -translate-y-1/2 select-none pointer-events-none z-30 transition-all duration-300">
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

          {/* Navigation Chevron - Left */}
          <button
            type="button"
            onClick={() => paginate(-1)}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 flex h-11 w-11 items-center justify-center rounded-full card-timbul text-neutral-900 shadow-xl transition duration-300 hover:bg-amber-700 hover:text-white hover:scale-110"
            aria-label={testimoniesSection.previousAriaLabel}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Horizontal Track Viewport */}
          <div className="relative h-full w-full overflow-hidden flex items-center [--step:316px] sm:[--step:424px]">
            <div
              className="flex gap-4 sm:gap-6 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                transform: `translateX(calc(50% - ${(index + 0.5)} * var(--step)))`,
              }}
            >
              {testimonies.map((item, i) => {
                const isActive = i === index;

                return (
                  <div
                    key={item.id}
                    onClick={() => setIndex(i)}
                    className={`w-[300px] sm:w-[400px] shrink-0 cursor-pointer select-none rounded-[1.75rem] p-6 sm:p-8 text-left transition-all duration-700 ${
                      isActive
                        ? 'card-timbul-active opacity-100 shadow-2xl ring-1 ring-amber-500/30'
                        : 'card-timbul opacity-40 hover:opacity-75 shadow-md'
                    }`}
                  >
                    <div className="relative">
                      <div className="mb-4 flex items-center gap-3 sm:mb-5">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200/80 text-amber-800 border border-amber-300/50 shadow-inner">
                          <Quote className="h-5.5 w-5.5" />
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-amber-600/30 to-transparent" />
                      </div>

                      {/* 100% Fixed, Stable Typography across all cards */}
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
          </div>

          {/* Navigation Chevron - Right */}
          <button
            type="button"
            onClick={() => paginate(1)}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 flex h-11 w-11 items-center justify-center rounded-full card-timbul text-neutral-900 shadow-xl transition duration-300 hover:bg-amber-700 hover:text-white hover:scale-110"
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
