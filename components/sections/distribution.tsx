'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ShieldCheck, Truck } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { Button } from '@/components/ui/button';
import type { DistributionSection } from '@/lib/cms-types';

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

// Map city coordinates on 100x100 percentage overlay
const CITY_PIN_COORDS: Record<string, { left: string; top: string }> = {
  Aceh: { left: '10%', top: '20%' },
  Jabodetabek: { left: '26%', top: '65%' },
  Solo: { left: '33%', top: '68%' },
  Surabaya: { left: '39%', top: '68%' },
  Madura: { left: '42%', top: '66%' },
  Malang: { left: '40%', top: '72%' },
  Bondowoso: { left: '44%', top: '72%' },
  Bali: { left: '48%', top: '73%' },
  'Kalimantan Tengah': { left: '37%', top: '44%' },
  'Kalimantan Timur': { left: '46%', top: '40%' },
  NTT: { left: '57%', top: '76%' },
  Jayapura: { left: '88%', top: '54%' },
};

type DistributionProps = {
  distributionSection: DistributionSection;
};

export function Distribution({ distributionSection }: DistributionProps) {
  const { cities, highlightedWord, heading } = distributionSection;
  const [beforeHighlight, afterHighlight] = heading.split(highlightedWord);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCity, setActiveCity] = useState<string | null>(null);

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

  return (
    <section
      ref={sectionRef}
      id="distribution"
      className="relative overflow-hidden bg-transparent pb-16 pt-10 sm:pb-18 sm:pt-12 lg:pb-20 lg:pt-14"
    >
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          <Reveal className="w-full">
            {/* Interactive Map Wrapper */}
            <div className="relative aspect-[16/8.5] w-full overflow-hidden rounded-3xl card-timbul p-3">
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#f8f5ee]">
                <Image
                  src={distributionSection.map.src}
                  alt={distributionSection.map.alt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-contain object-center"
                  priority
                />

                {/* Animated Pulsing City Dots on Map */}
                {cities.map((city) => {
                  const coords = CITY_PIN_COORDS[city.name];
                  if (!coords) return null;
                  const isActive = activeCity === city.name;

                  return (
                    <div
                      key={city.name}
                      style={{ left: coords.left, top: coords.top }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                      onMouseEnter={() => setActiveCity(city.name)}
                      onMouseLeave={() => setActiveCity(null)}
                    >
                      {/* Pulsing Outer Ring */}
                      <span
                        className={`absolute -inset-1.5 rounded-full animate-ping opacity-75 ${city.color}`}
                      />
                      {/* Core Dot */}
                      <span
                        className={`relative block h-3 w-3 rounded-full border-2 border-white shadow-md transition-transform duration-300 ${
                          city.color
                        } ${isActive ? 'scale-150' : 'group-hover:scale-125'}`}
                      />

                      {/* Tooltip Badge on Hover */}
                      <div
                        className={`absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-neutral-900/90 px-2.5 py-1 text-[10px] font-bold text-white shadow-lg backdrop-blur-sm transition-all duration-300 pointer-events-none ${
                          isActive
                            ? 'opacity-100 translate-y-0 scale-100'
                            : 'opacity-0 translate-y-1 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100'
                        }`}
                      >
                        <span className="flex items-center gap-1">
                          <span className={`h-1.5 w-1.5 rounded-full ${city.color}`} />
                          {city.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* City Legend */}
            <div className="mt-4">
              <h3 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-neutral-900 text-timbul-dark">
                {distributionSection.legendTitle}
              </h3>

              <div className="grid grid-cols-3 gap-x-3 gap-y-2 sm:grid-cols-4 lg:grid-cols-4">
                {cities.map((city) => {
                  const isActive = activeCity === city.name;
                  return (
                    <div
                      key={city.name}
                      onMouseEnter={() => setActiveCity(city.name)}
                      onMouseLeave={() => setActiveCity(null)}
                      className={`flex items-center gap-1.5 cursor-pointer rounded-lg p-1 transition-all duration-200 ${
                        isActive ? 'bg-amber-100/60 scale-105' : 'hover:bg-black/5'
                      }`}
                    >
                      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${city.color}`} />
                      <span className="text-[9px] font-extrabold uppercase tracking-wide text-neutral-800 text-timbul-dark sm:text-[10px] lg:text-[11px]">
                        {city.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal className="w-full" delay={150}>
            <div className="max-w-xl lg:ml-auto">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-amber-800 text-timbul-amber">
                {distributionSection.eyebrow}
              </p>

              <h2 className="text-3xl font-black leading-tight tracking-tight text-neutral-900 text-timbul-heading sm:text-4xl lg:text-5xl">
                {beforeHighlight}
                <span className="text-amber-700 text-timbul-amber">{highlightedWord}</span>
                {afterHighlight}
              </h2>

              <p className="mt-5 text-base font-semibold leading-8 text-neutral-800 text-timbul-dark sm:text-lg">
                {distributionSection.description}
              </p>

              {/* Animated Stat Badges for Distribution */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="flex flex-col rounded-2xl card-timbul p-3 text-center">
                  <div className="flex items-center justify-center text-amber-800 mb-1">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="text-xl font-black text-amber-800 text-timbul-amber">
                    <CountUpNumber value={34} suffix="+" isVisible={isVisible} />
                  </span>
                  <span className="text-[10px] font-extrabold text-neutral-900 text-timbul-dark uppercase tracking-wider">
                    Kota Layanan
                  </span>
                </div>

                <div className="flex flex-col rounded-2xl card-timbul p-3 text-center">
                  <div className="flex items-center justify-center text-amber-800 mb-1">
                    <Truck className="h-4 w-4" />
                  </div>
                  <span className="text-xl font-black text-amber-800 text-timbul-amber">
                    <CountUpNumber value={500} suffix="+" isVisible={isVisible} />
                  </span>
                  <span className="text-[10px] font-extrabold text-neutral-900 text-timbul-dark uppercase tracking-wider">
                    Unit Terpasang
                  </span>
                </div>

                <div className="flex flex-col rounded-2xl card-timbul p-3 text-center">
                  <div className="flex items-center justify-center text-amber-800 mb-1">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <span className="text-xl font-black text-amber-800 text-timbul-amber">
                    <CountUpNumber value={100} suffix="%" isVisible={isVisible} />
                  </span>
                  <span className="text-[10px] font-extrabold text-neutral-900 text-timbul-dark uppercase tracking-wider">
                    Garansi Resmi
                  </span>
                </div>
              </div>

              <div className="mt-7">
                <Button
                  asChild
                  className="group h-12 rounded-full bg-amber-700 px-7 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-amber-600 hover:shadow-lg"
                >
                  <Link href={distributionSection.ctaHref}>
                    {distributionSection.ctaLabel}
                    <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
