'use client';

import Image from 'next/image';
import { Award, Cpu, Hand, Shield, Star } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import type { BenefitsSection } from '@/lib/cms-types';

/**
 * Maps each benefit item id to a lucide icon.
 * Falls back to Star for any id outside the map.
 */
const BENEFIT_ICONS = [Shield, Award, Hand, Star, Cpu] as const;

type BenefitsProps = {
  benefitsSection: BenefitsSection;
};

export function Benefits({ benefitsSection }: BenefitsProps) {
  return (
    <section
      id="benefits"
      className="relative overflow-hidden bg-gradient-to-br from-[#ddd0b8] via-[#e5d8c2] to-[#d8cab0] py-20"
    >
      {/* Batik Truntum Pattern — Floral Stars */}
      <div
        className="absolute inset-0 bg-repeat opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23785520' stroke-width='1'%3E%3Ccircle cx='50' cy='50' r='8'/%3E%3Ccircle cx='50' cy='50' r='3' fill='%23785520'/%3E%3Cpath d='M50 38 L53 46 L50 42 L47 46 Z' fill='%23785520'/%3E%3Cpath d='M50 62 L53 54 L50 58 L47 54 Z' fill='%23785520'/%3E%3Cpath d='M38 50 L46 47 L42 50 L46 53 Z' fill='%23785520'/%3E%3Cpath d='M62 50 L54 47 L58 50 L54 53 Z' fill='%23785520'/%3E%3Ccircle cx='0' cy='0' r='5'/%3E%3Ccircle cx='100' cy='0' r='5'/%3E%3Ccircle cx='0' cy='100' r='5'/%3E%3Ccircle cx='100' cy='100' r='5'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Warm Amber Glow Accents */}
      <div className="absolute -left-10 top-1/4 h-72 w-72 rounded-full bg-amber-300/20 blur-[100px]" />
      <div className="absolute -right-10 bottom-1/4 h-64 w-64 rounded-full bg-yellow-300/15 blur-[90px]" />
      <div className="absolute left-1/3 top-0 h-48 w-48 rounded-full bg-orange-200/15 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top — Image + Heading Side-by-Side */}
        <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal className="flex justify-center">
            <div className="relative">
              <Image
                src={benefitsSection.image.src}
                alt={benefitsSection.image.alt}
                width={520}
                height={520}
                className="relative z-10 w-full max-w-md rounded-2xl shadow-2xl shadow-amber-900/20"
              />
              {/* Decorative frame */}
              <div className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border-2 border-amber-600/15" />
              <div className="absolute -bottom-6 -right-6 h-full w-full rounded-2xl border border-amber-600/8" />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <h2 className="whitespace-pre-line text-3xl font-black leading-tight text-neutral-900 sm:text-4xl">
              {benefitsSection.heading}
            </h2>
            <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-amber-600 to-amber-400" />
            <p className="mt-5 text-lg leading-relaxed text-neutral-700">
              {benefitsSection.description}
            </p>
          </Reveal>
        </div>

        {/* Bottom — Benefit Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefitsSection.items.map((benefit, idx) => {
            const IconComponent = BENEFIT_ICONS[idx % BENEFIT_ICONS.length];

            return (
              <Reveal
                key={benefit.id}
                delay={idx < 3 ? ([0, 100, 200] as const)[idx] : 0}
                className={idx >= 3 ? 'lg:col-span-1' : ''}
              >
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-amber-700/10 bg-white/70 p-6 shadow-lg shadow-amber-900/5 backdrop-blur-sm transition-all duration-400 hover:-translate-y-1 hover:border-amber-600/20 hover:bg-white/90 hover:shadow-xl hover:shadow-amber-900/10">
                  {/* Card accent top border */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-600/60 via-amber-400/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Icon Circle */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 text-amber-700 shadow-inner transition-all duration-300 group-hover:scale-110 group-hover:from-amber-200 group-hover:to-orange-200 group-hover:shadow-md">
                    <IconComponent size={26} strokeWidth={1.8} />
                  </div>

                  {/* Number Badge */}
                  <div className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-amber-600/8 text-xs font-bold text-amber-700/60 transition-colors duration-300 group-hover:bg-amber-600/15 group-hover:text-amber-700">
                    0{benefit.id}
                  </div>

                  <h3 className="mb-3 text-base font-bold text-neutral-900 transition-colors duration-300 group-hover:text-amber-800">
                    {benefit.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-neutral-600 transition-colors duration-300 group-hover:text-neutral-700">
                    {benefit.description}
                  </p>

                  {/* Bottom decorative line */}
                  <div className="mt-auto pt-5">
                    <div className="h-px w-full bg-gradient-to-r from-amber-400/30 via-amber-300/20 to-transparent" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Bottom transition fade to Testimonies section */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent to-[#e0d0b0]" />
    </section>
  );
}
