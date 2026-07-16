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
      className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-amber-50 py-20"
    >
      {/* Batik Truntum Pattern — Floral Stars */}
      <div
        className="absolute inset-0 bg-repeat opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23a67c52' stroke-width='1'%3E%3Ccircle cx='50' cy='50' r='8'/%3E%3Ccircle cx='50' cy='50' r='3' fill='%23a67c52'/%3E%3Cpath d='M50 38 L53 46 L50 42 L47 46 Z' fill='%23a67c52'/%3E%3Cpath d='M50 62 L53 54 L50 58 L47 54 Z' fill='%23a67c52'/%3E%3Cpath d='M38 50 L46 47 L42 50 L46 53 Z' fill='%23a67c52'/%3E%3Cpath d='M62 50 L54 47 L58 50 L54 53 Z' fill='%23a67c52'/%3E%3Ccircle cx='0' cy='0' r='5'/%3E%3Ccircle cx='100' cy='0' r='5'/%3E%3Ccircle cx='0' cy='100' r='5'/%3E%3Ccircle cx='100' cy='100' r='5'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Warm Amber Glow Accents */}
      <div className="absolute -left-10 top-1/4 h-64 w-64 rounded-full bg-amber-200/25 blur-[90px]" />
      <div className="absolute -right-10 bottom-1/4 h-56 w-56 rounded-full bg-yellow-200/20 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal className="flex justify-center">
            <Image
              src={benefitsSection.image.src}
              alt={benefitsSection.image.alt}
              width={520}
              height={520}
              className="w-full max-w-md rounded-lg shadow-xl"
            />
          </Reveal>

          <Reveal delay={150}>
            <h2 className="mb-4 whitespace-pre-line text-3xl font-black leading-tight text-foreground">
              {benefitsSection.heading}
            </h2>

            <p className="mb-10 text-lg text-foreground/70">
              {benefitsSection.description}
            </p>

            <div className="space-y-8">
              {benefitsSection.items.map((benefit) => (
                <div
                  key={benefit.id}
                  className="group cursor-pointer transition-all duration-300 hover:translate-x-2"
                >
                  <h3 className="mb-3 text-base font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                    {benefit.title}
                  </h3>
                  <p className="leading-relaxed text-foreground/70 transition-colors duration-300 group-hover:text-foreground">
                    {benefit.description}
                  </p>
                  <div className="mt-3 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary to-transparent transition-transform duration-300 group-hover:scale-x-100" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom transition fade to Testimonies section */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent to-[#fffaf1]" />
    </section>
  );
}
