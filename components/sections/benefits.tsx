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
      className="relative overflow-hidden bg-[#F5EDE0] py-20"
    >
      {/* Songket Pattern */}
      <div
        className="absolute inset-0 bg-repeat opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%238b6914' stroke-width='0.7'%3E%3Crect x='10' y='10' width='20' height='20'/%3E%3Crect x='50' y='50' width='20' height='20'/%3E%3Crect x='15' y='15' width='10' height='10'/%3E%3Crect x='55' y='55' width='10' height='10'/%3E%3Cline x1='0' y1='40' x2='80' y2='40' stroke-dasharray='4 4'/%3E%3Cline x1='40' y1='0' x2='40' y2='80' stroke-dasharray='4 4'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Glow */}
      <div className="absolute -left-10 top-1/4 h-72 w-72 rounded-full bg-amber-200/20 blur-[100px]" />
      <div className="absolute -right-10 bottom-1/4 h-64 w-64 rounded-full bg-yellow-200/15 blur-[90px]" />

      {/* Vertical lines */}
      <div className="absolute left-10 top-16 hidden h-20 w-px bg-gradient-to-b from-transparent via-amber-700/10 to-transparent lg:block" />
      <div className="absolute bottom-16 right-10 hidden h-20 w-px bg-gradient-to-b from-transparent via-amber-700/10 to-transparent lg:block" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Image + Heading */}
        <div className="mb-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal className="flex justify-center">
            <div className="relative">
              <Image
                src={benefitsSection.image.src}
                alt={benefitsSection.image.alt}
                width={500}
                height={500}
                className="relative z-10 max-w-md w-full rounded-2xl shadow-2xl shadow-amber-900/15"
              />
              <div className="absolute -left-2 -top-2 z-20 h-10 w-10 border-l-2 border-t-2 border-amber-600/25 rounded-tl-lg" />
              <div className="absolute -bottom-2 -right-2 z-20 h-10 w-10 border-b-2 border-r-2 border-amber-600/25 rounded-br-lg" />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-8 bg-amber-600/30" />
              <div className="h-1 w-1 rotate-45 bg-amber-600/30" />
            </div>
            <h2 className="whitespace-pre-line text-3xl font-black leading-tight text-gray-900 sm:text-4xl">
              {benefitsSection.heading}
            </h2>
            <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-amber-600 to-amber-400" />
            <p className="mt-5 text-lg leading-relaxed text-gray-700">
              {benefitsSection.description}
            </p>
          </Reveal>
        </div>

        {/* Benefit Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefitsSection.items.map((benefit, idx) => (
            <Reveal
              key={benefit.id}
              delay={idx < 3 ? ([0, 100, 200] as const)[idx] : 0}
            >
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-amber-700/10 bg-white/80 p-6 shadow-md shadow-amber-900/5 backdrop-blur-sm transition-all duration-400 hover:-translate-y-1 hover:border-amber-600/15 hover:bg-white hover:shadow-xl hover:shadow-amber-900/10">
                {/* Left gold stripe */}
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-amber-500/40 via-amber-600/25 to-transparent transition-all duration-300 group-hover:w-1.5 group-hover:from-amber-500 group-hover:via-amber-600/50" />

                {/* Top-right Batik corner ornament */}
                <div className="absolute -right-1 -top-1 h-16 w-16 opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.12]">
                  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="30" cy="30" r="18" stroke="#8b6914" strokeWidth="1" />
                    <circle cx="30" cy="30" r="8" stroke="#8b6914" strokeWidth="1" />
                    <circle cx="30" cy="30" r="3" fill="#8b6914" />
                    <ellipse cx="30" cy="14" rx="5" ry="10" stroke="#8b6914" strokeWidth="0.8" />
                    <ellipse cx="30" cy="46" rx="5" ry="10" stroke="#8b6914" strokeWidth="0.8" />
                    <ellipse cx="14" cy="30" rx="10" ry="5" stroke="#8b6914" strokeWidth="0.8" />
                    <ellipse cx="46" cy="30" rx="10" ry="5" stroke="#8b6914" strokeWidth="0.8" />
                  </svg>
                </div>

                {/* Dot accent row */}
                <div className="mb-5 flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-sm shadow-amber-500/30" />
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-500/30" />
                  <div className="h-1 w-1 rounded-full bg-amber-500/15" />
                  <div className="ml-2 h-px flex-1 bg-gradient-to-r from-amber-500/20 to-transparent" />
                </div>

                <h3 className="mb-3 text-base font-bold text-gray-900 transition-colors duration-300 group-hover:text-amber-700">
                  {benefit.title}
                </h3>

                <p className="text-sm leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                  {benefit.description}
                </p>

                <div className="mt-auto pt-5">
                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-amber-400/20 to-transparent" />
                    <div className="h-1.5 w-1.5 rotate-45 bg-amber-500/25 transition-colors duration-300 group-hover:bg-amber-500/50" />
                    <div className="h-px w-4 bg-amber-500/15" />
                    <div className="h-1 w-1 rotate-45 bg-amber-500/15" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

    </section>
  );
}
