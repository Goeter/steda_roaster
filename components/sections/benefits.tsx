'use client';

import Image from 'next/image';
import { Reveal } from '@/components/reveal';
import type { BenefitsSection } from '@/lib/cms-types';

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

      {/* Decorative vertical line accent */}
      <div className="absolute left-8 top-20 hidden h-32 w-px bg-gradient-to-b from-transparent via-amber-700/20 to-transparent lg:block" />
      <div className="absolute bottom-20 right-8 hidden h-32 w-px bg-gradient-to-b from-transparent via-amber-700/20 to-transparent lg:block" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal className="flex justify-center">
            <div className="relative">
              <Image
                src={benefitsSection.image.src}
                alt={benefitsSection.image.alt}
                width={520}
                height={520}
                className="relative z-10 w-full max-w-md rounded-lg shadow-2xl shadow-amber-900/20"
              />
              {/* Decorative frame behind image */}
              <div className="absolute -bottom-3 -right-3 h-full w-full rounded-lg border-2 border-amber-600/15" />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <h2 className="mb-4 whitespace-pre-line text-3xl font-black leading-tight text-neutral-900">
              {benefitsSection.heading}
            </h2>

            <div className="mb-2 h-1 w-16 rounded-full bg-gradient-to-r from-amber-600 to-transparent" />

            <p className="mb-10 text-lg text-neutral-700">
              {benefitsSection.description}
            </p>

            <div className="space-y-8">
              {benefitsSection.items.map((benefit) => (
                <div
                  key={benefit.id}
                  className="group cursor-pointer rounded-xl border border-transparent p-4 transition-all duration-300 hover:translate-x-2 hover:border-amber-600/10 hover:bg-white/40 hover:shadow-md"
                >
                  <h3 className="mb-3 text-base font-bold text-neutral-900 transition-colors duration-300 group-hover:text-amber-700">
                    {benefit.title}
                  </h3>
                  <p className="leading-relaxed text-neutral-600 transition-colors duration-300 group-hover:text-neutral-800">
                    {benefit.description}
                  </p>
                  <div className="mt-3 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-amber-600 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom transition fade to Testimonies section */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent to-[#e0d0b0]" />
    </section>
  );
}
