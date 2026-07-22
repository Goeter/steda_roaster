'use client';

import { useEffect, useRef, useState } from 'react';
import { Award, Flame, MapPin, ShieldCheck } from 'lucide-react';
import { Reveal } from '@/components/reveal';

type StatItem = {
  id: string;
  value: number;
  prefix?: string;
  suffix: string;
  decimals?: number;
  label: string;
  description: string;
  icon: React.ElementType;
};

const STATS_DATA: StatItem[] = [
  {
    id: 'machines',
    value: 500,
    suffix: '+',
    label: 'Mesin Terpasang',
    description: 'Dipercaya oleh 500+ roaster & coffee shop di Nusantara',
    icon: Flame,
  },
  {
    id: 'cities',
    value: 34,
    suffix: '+',
    label: 'Kota Jangkauan',
    description: 'Jangkauan pengiriman & teknisi resmi di seluruh Indonesia',
    icon: MapPin,
  },
  {
    id: 'accuracy',
    value: 99.8,
    suffix: '%',
    decimals: 1,
    label: 'Presisi & Stabil',
    description: 'Akurasi kontrol suhu PID & konsistensi profil sangrai',
    icon: Award,
  },
  {
    id: 'warranty',
    value: 100,
    suffix: '%',
    label: 'Garansi & Sparepart',
    description: 'Jaminan garansi resmi dan ketersediaan suku cadang',
    icon: ShieldCheck,
  },
];

function CountUpNumber({ value, decimals = 0, prefix = '', suffix = '', isVisible }: { value: number; decimals?: number; prefix?: string; suffix?: string; isVisible: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds animation

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Ease out expo formula for premium smooth feel
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
    <span className="font-black tracking-tight text-amber-800 text-timbul-amber">
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function StatCounter() {
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
    <section ref={sectionRef} className="relative overflow-hidden bg-transparent py-16">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-800/15 bg-white/60 px-4 py-1.5 shadow-sm backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-amber-600 animate-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-amber-800 text-timbul-amber">
              Pencapaian & Kepercayaan
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS_DATA.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <Reveal key={stat.id} delay={([0, 100, 200, 300] as const)[idx]}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl card-timbul p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-600/30 hover:shadow-xl">
                  {/* Top-right subtle Batik ornament */}
                  <div className="absolute -right-2 -top-2 h-16 w-16 opacity-[0.05] transition-opacity duration-300 group-hover:opacity-[0.12]">
                    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="30" cy="30" r="18" stroke="#8b6914" strokeWidth="1" />
                      <circle cx="30" cy="30" r="8" stroke="#8b6914" strokeWidth="1" />
                    </svg>
                  </div>

                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200/80 text-amber-800 border border-amber-300/50 shadow-inner transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="h-px flex-1 ml-4 bg-gradient-to-r from-amber-600/20 to-transparent" />
                  </div>

                  <div className="text-3xl font-black sm:text-4xl">
                    <CountUpNumber
                      value={stat.value}
                      decimals={stat.decimals}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      isVisible={isVisible}
                    />
                  </div>

                  <h3 className="mt-2 text-base font-extrabold text-neutral-900 text-timbul-dark">
                    {stat.label}
                  </h3>

                  <p className="mt-1 text-xs font-medium leading-relaxed text-neutral-700 text-timbul-dark">
                    {stat.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
