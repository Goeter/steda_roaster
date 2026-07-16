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
      className="relative overflow-hidden bg-gradient-to-br from-[#1a2332] via-[#1e2a3a] to-[#152030] py-20"
    >
      {/* Songket Pattern — Indonesian Brocade Weave */}
      <div
        className="absolute inset-0 bg-repeat opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23d4af37' stroke-width='0.8'%3E%3Crect x='10' y='10' width='20' height='20'/%3E%3Crect x='50' y='50' width='20' height='20'/%3E%3Crect x='15' y='15' width='10' height='10'/%3E%3Crect x='55' y='55' width='10' height='10'/%3E%3Cline x1='0' y1='40' x2='80' y2='40' stroke-dasharray='4 4'/%3E%3Cline x1='40' y1='0' x2='40' y2='80' stroke-dasharray='4 4'/%3E%3Cpath d='M30 0 L40 10 L50 0' /%3E%3Cpath d='M30 80 L40 70 L50 80' /%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Glow Accents */}
      <div className="absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-blue-500/8 blur-[120px]" />
      <div className="absolute -right-16 bottom-1/4 h-72 w-72 rounded-full bg-amber-400/6 blur-[100px]" />
      <div className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-sky-400/5 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top — Image + Heading Side-by-Side */}
        <div className="mb-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal className="flex justify-center">
            <div className="relative">
              <Image
                src={benefitsSection.image.src}
                alt={benefitsSection.image.alt}
                width={640}
                height={640}
                className="relative z-10 w-full max-w-lg rounded-2xl shadow-2xl shadow-black/40"
              />
              {/* Decorative gold corner accents */}
              <div className="absolute -left-2 -top-2 z-20 h-10 w-10 border-l-2 border-t-2 border-amber-400/40 rounded-tl-lg" />
              <div className="absolute -bottom-2 -right-2 z-20 h-10 w-10 border-b-2 border-r-2 border-amber-400/40 rounded-br-lg" />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <h2 className="whitespace-pre-line text-3xl font-black leading-tight text-white sm:text-4xl">
              {benefitsSection.heading}
            </h2>
            <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-amber-400 to-amber-600" />
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              {benefitsSection.description}
            </p>
          </Reveal>
        </div>

        {/* Bottom — Benefit Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefitsSection.items.map((benefit, idx) => (
            <Reveal
              key={benefit.id}
              delay={idx < 3 ? ([0, 100, 200] as const)[idx] : 0}
            >
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm transition-all duration-400 hover:-translate-y-1 hover:border-amber-400/25 hover:bg-white/[0.1] hover:shadow-xl hover:shadow-amber-900/10">
                {/* Card accent — left gold stripe */}
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-amber-400/50 via-amber-500/30 to-transparent transition-all duration-300 group-hover:w-1.5 group-hover:from-amber-400 group-hover:via-amber-500/60" />

                {/* Large decorative number background */}
                <div className="absolute -right-2 -top-4 text-[80px] font-black leading-none text-white/[0.03] transition-all duration-500 group-hover:text-amber-400/[0.06]">
                  {String(benefit.id).padStart(2, '0')}
                </div>

                {/* Top accent dot row */}
                <div className="mb-5 flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-amber-400/70" />
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400/40" />
                  <div className="h-1 w-1 rounded-full bg-amber-400/20" />
                  <div className="ml-2 h-px flex-1 bg-gradient-to-r from-amber-400/20 to-transparent" />
                </div>

                <h3 className="mb-3 text-base font-bold text-white transition-colors duration-300 group-hover:text-amber-300">
                  {benefit.title}
                </h3>

                <p className="text-sm leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-white/75">
                  {benefit.description}
                </p>

                {/* Bottom decorative element */}
                <div className="mt-auto pt-5">
                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                    <div className="h-1 w-1 rotate-45 bg-amber-400/30 transition-colors duration-300 group-hover:bg-amber-400/60" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Bottom transition fade to Testimonies section */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-b from-transparent to-[#3d2a1a]" />
    </section>
  );
}
