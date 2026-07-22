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

// 100% Precise pixel coordinates matching pin heads on gambar_peta.webp (1954 x 805 px)
const CITY_PIN_COORDS: Record<string, { left: string; top: string }> = {
  Aceh: { left: '3.94%', top: '8.59%' },
  Jabodetabek: { left: '27.88%', top: '69.50%' },
  Solo: { left: '35.00%', top: '74.04%' },
  Surabaya: { left: '39.04%', top: '74.79%' },
  Madura: { left: '40.40%', top: '75.04%' },
  Malang: { left: '39.17%', top: '80.12%' },
  Bondowoso: { left: '42.15%', top: '78.15%' },
  Bali: { left: '44.79%', top: '79.81%' },
  'Kalimantan Tengah': { left: '41.84%', top: '48.03%' },
  'Kalimantan Timur': { left: '48.96%', top: '34.46%' },
  NTT: { left: '57.94%', top: '80.67%' },
  Jayapura: { left: '97.46%', top: '48.57%' },
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
            {/* Map Frame matching exact 1954:805 image aspect ratio */}
            <div
              className="relative w-full overflow-hidden rounded-2xl border border-amber-800/10 bg-white/40 p-1 shadow-lg backdrop-blur-xs"
              style={{ aspectRatio: '1954 / 805' }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <Image
                  src={distributionSection.map.src}
                  alt={distributionSection.map.alt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-contain object-center"
                  priority
                />

                {/* Animated Pulsing Rings overlaying exact pin heads in the image */}
                {cities.map((city, idx) => {
                  const coords = CITY_PIN_COORDS[city.name] || {
                    left: `${15 + ((idx * 6) % 75)}%`,
                    top: `${40 + ((idx * 8) % 35)}%`,
                  };
                  const isActive = activeCity === city.name;

                  return (
                    <div
                      key={city.name}
                      style={{ left: coords.left, top: coords.top }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                      onMouseEnter={() => setActiveCity(city.name)}
                      onMouseLeave={() => setActiveCity(null)}
                    >
                      {/* Pulsing Outer Ping Ring */}
                      <span
                        className={`absolute -inset-1.5 rounded-full animate-ping opacity-75 ${city.color}`}
                      />
                      {/* Core Glow Dot */}
                      <span
                        className={`relative block h-3.5 w-3.5 rounded-full border-2 border-white shadow-md transition-transform duration-300 ${
                          city.color
                        } ${isActive ? 'scale-150 ring-4 ring-amber-500/60' : 'group-hover:scale-125'}`}
                      />

                      {/* City Name Tag Label */}
                      <div
                        className={`absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[9px] font-extrabold shadow-md backdrop-blur-xs transition-all duration-300 pointer-events-none z-30 ${
                          isActive
                            ? 'scale-110 bg-amber-800 text-white shadow-amber-800/40 ring-2 ring-amber-400 opacity-100'
                            : 'bg-neutral-900/85 text-white opacity-95 group-hover:opacity-100'
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

            {/* City Legend (Rendering ALL 12 cities from CMS neatly) */}
            <div className="mt-5 rounded-2xl border border-amber-800/10 bg-white/60 p-4 shadow-sm backdrop-blur-xs">
              <h3 className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-neutral-900 text-timbul-dark">
                {distributionSection.legendTitle}
              </h3>

              <div className="grid grid-cols-3 gap-x-3 gap-y-2.5 sm:grid-cols-4 lg:grid-cols-4">
                {cities.map((city) => {
                  const isActive = activeCity === city.name;
                  return (
                    <div
                      key={city.name}
                      onMouseEnter={() => setActiveCity(city.name)}
                      onMouseLeave={() => setActiveCity(null)}
                      className={`flex items-center gap-2 cursor-pointer rounded-xl px-2 py-1.5 transition-all duration-200 ${
                        isActive
                          ? 'bg-amber-200/80 scale-105 shadow-sm border border-amber-400/50'
                          : 'hover:bg-amber-100/40'
                      }`}
                    >
                      <span
                        className={`h-3 w-3 shrink-0 rounded-full border border-white/80 shadow-xs ${city.color}`}
                      />
                      <span className="text-[10px] font-extrabold uppercase tracking-wide text-neutral-900 text-timbul-dark sm:text-xs">
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

              {/* Animated Stat Badges */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center justify-center rounded-2xl card-timbul p-3 text-center">
                  <div className="flex items-center justify-center text-amber-800 mb-1">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="text-xl font-black text-amber-800 text-timbul-amber">
                    <CountUpNumber value={12} suffix=" Kota" isVisible={isVisible} />
                  </span>
                  <span className="text-[10px] font-extrabold text-neutral-900 text-timbul-dark uppercase tracking-wider mt-0.5">
                    Kota Layanan
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center rounded-2xl card-timbul p-3 text-center">
                  <div className="flex items-center justify-center text-amber-800 mb-1">
                    <Truck className="h-4 w-4" />
                  </div>
                  <span className="text-xl font-black text-amber-800 text-timbul-amber">
                    <CountUpNumber value={500} suffix="+" isVisible={isVisible} />
                  </span>
                  <span className="text-[10px] font-extrabold text-neutral-900 text-timbul-dark uppercase tracking-wider mt-0.5">
                    Unit Terpasang
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center rounded-2xl card-timbul p-3 text-center">
                  <div className="flex items-center justify-center text-amber-800 mb-1">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <span className="text-xl font-black text-amber-800 text-timbul-amber">
                    <CountUpNumber value={100} suffix="%" isVisible={isVisible} />
                  </span>
                  <span className="text-[10px] font-extrabold text-neutral-900 text-timbul-dark uppercase tracking-wider mt-0.5">
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
