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

// Exact 12 cities arranged in 4 columns matching the user's graphic layout
const EXACT_12_CITIES = [
  { name: 'Aceh', color: 'bg-[#ff0000]' },
  { name: 'Surabaya', color: 'bg-[#1e1b4b]' },
  { name: 'Bondowoso', color: 'bg-[#7e22ce]' },
  { name: 'Kalimantan Timur', color: 'bg-[#78350f]' },
  { name: 'Jabodetabek', color: 'bg-[#facc15]' },
  { name: 'Madura', color: 'bg-[#be123c]' },
  { name: 'Bali', color: 'bg-[#d97706]' },
  { name: 'NTT', color: 'bg-[#000000]' },
  { name: 'Solo', color: 'bg-[#15803d]' },
  { name: 'Malang', color: 'bg-[#22c55e]' },
  { name: 'Kalimantan Tengah', color: 'bg-[#c026d3]' },
  { name: 'Jayapura', color: 'bg-[#334155]' },
];

type DistributionProps = {
  distributionSection: DistributionSection;
};

export function Distribution({ distributionSection }: DistributionProps) {
  const { highlightedWord, heading } = distributionSection;
  const [beforeHighlight, afterHighlight] = heading.split(highlightedWord);
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

  return (
    <section
      ref={sectionRef}
      id="distribution"
      className="relative overflow-hidden bg-transparent pb-16 pt-10 sm:pb-18 sm:pt-12 lg:pb-20 lg:pt-14"
    >
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          <Reveal className="w-full">
            {/* Map Frame fitting image aspect ratio cleanly */}
            <div className="relative aspect-[16/7.8] w-full overflow-hidden">
              <Image
                src={distributionSection.map.src}
                alt={distributionSection.map.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-contain object-center"
                priority
              />
            </div>

            {/* City Legend (Rendering EXACT 12 cities matching user graphic) */}
            <div className="mt-4">
              <h3 className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-neutral-900 text-timbul-dark sm:text-sm">
                {distributionSection.legendTitle}
              </h3>

              <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4 lg:grid-cols-4">
                {EXACT_12_CITIES.map((city) => (
                  <div key={city.name} className="flex items-center gap-2">
                    <span
                      className={`h-3.5 w-3.5 shrink-0 rounded-full border border-white/80 shadow-xs ${city.color}`}
                    />
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#1e3a8a] text-timbul-dark sm:text-xs">
                      {city.name}
                    </span>
                  </div>
                ))}
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
