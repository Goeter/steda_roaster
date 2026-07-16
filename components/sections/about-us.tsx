'use client';

import Link from 'next/link';
import { Reveal } from '@/components/reveal';
import { Button } from '@/components/ui/button';
import type { AboutSection } from '@/lib/cms-types';

type AboutUsProps = {
  aboutSection: AboutSection;
  showCta?: boolean;
};

export function AboutUs({ aboutSection, showCta = true }: AboutUsProps) {
  return (
    <section id="about" className="relative overflow-hidden py-20 text-gray-800">
      {/* Warm Earth Tone Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5ede0] via-[#efe4d3] to-[#e8dac6]" />

      {/* Glow Accents — Multiple layers for depth */}
      <div className="absolute left-0 top-0 h-[350px] w-[350px] rounded-full bg-amber-200/30 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[280px] w-[280px] rounded-full bg-yellow-200/20 blur-[100px]" />
      <div className="absolute right-1/4 top-1/3 h-[200px] w-[200px] rounded-full bg-orange-100/20 blur-[80px]" />
      <div className="absolute bottom-1/3 left-1/3 h-[150px] w-[150px] rounded-full bg-rose-100/15 blur-[70px]" />

      {/* Batik Kawung Pattern */}
      <div
        className="absolute inset-0 bg-repeat opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%238b6914' stroke-width='1.2'%3E%3Cellipse cx='80' cy='40' rx='20' ry='30'/%3E%3Cellipse cx='80' cy='120' rx='20' ry='30'/%3E%3Cellipse cx='40' cy='80' rx='30' ry='20'/%3E%3Cellipse cx='120' cy='80' rx='30' ry='20'/%3E%3Ccircle cx='80' cy='80' r='6' fill='%238b6914'/%3E%3Ccircle cx='80' cy='80' r='12' stroke-dasharray='3 3'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative Corner Accents */}
      <div className="absolute left-0 top-0 h-40 w-40 border-l-2 border-t-2 border-amber-600/10 rounded-br-[80px]" />
      <div className="absolute bottom-0 right-0 h-40 w-40 border-b-2 border-r-2 border-amber-600/10 rounded-tl-[80px]" />

      {/* Decorative floating dots — left side */}
      <div className="absolute left-6 top-1/4 hidden space-y-3 lg:block">
        <div className="h-2 w-2 rounded-full bg-amber-500/15" />
        <div className="ml-1 h-1.5 w-1.5 rounded-full bg-amber-500/10" />
        <div className="h-1 w-1 rounded-full bg-amber-500/8" />
      </div>

      {/* Decorative floating dots — right side */}
      <div className="absolute bottom-1/4 right-6 hidden space-y-3 lg:block">
        <div className="h-1 w-1 rounded-full bg-amber-500/8" />
        <div className="ml-1 h-1.5 w-1.5 rounded-full bg-amber-500/10" />
        <div className="h-2 w-2 rounded-full bg-amber-500/15" />
      </div>

      {/* Vertical decorative line — left */}
      <div className="absolute left-12 top-16 hidden h-24 w-px bg-gradient-to-b from-transparent via-amber-600/15 to-transparent lg:block" />
      {/* Vertical decorative line — right */}
      <div className="absolute bottom-16 right-12 hidden h-24 w-px bg-gradient-to-b from-transparent via-amber-600/15 to-transparent lg:block" />

      {/* Top center ornament */}
      <div className="absolute left-1/2 top-6 z-10 -translate-x-1/2">
        <div className="flex items-center gap-2">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-amber-600/25" />
          <div className="h-1.5 w-1.5 rotate-45 bg-amber-600/20" />
          <div className="h-2 w-2 rotate-45 border border-amber-600/25" />
          <div className="h-1.5 w-1.5 rotate-45 bg-amber-600/20" />
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-amber-600/25" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Video Section */}
          <Reveal className="relative">
            <div className="aspect-video overflow-hidden rounded-xl border border-amber-700/15 bg-black shadow-2xl shadow-amber-900/20">
              <iframe
                className="h-full w-full"
                src={aboutSection.videoUrl}
                title={aboutSection.videoTitle}
                loading="lazy"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            {/* Video frame decoration */}
            <div className="absolute -bottom-2 -right-2 -z-10 h-full w-full rounded-xl border border-amber-600/10" />
          </Reveal>

          {/* Text Content */}
          <Reveal className="space-y-6" delay={150}>
            <div>
              {/* Decorative element above heading */}
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-amber-600/40" />
                <div className="h-1 w-1 rotate-45 bg-amber-600/40" />
              </div>

              <h2 className="text-4xl font-bold leading-tight text-gray-900">
                {aboutSection.heading}
              </h2>
              <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-amber-600 to-amber-400" />
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-gray-700">
                {aboutSection.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            {showCta && (
              <Button
                asChild
                className="bg-amber-700 px-8 py-3 font-semibold text-white shadow-lg shadow-amber-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-amber-600 hover:shadow-xl"
              >
                <Link href={aboutSection.ctaHref}>{aboutSection.ctaLabel}</Link>
              </Button>
            )}
          </Reveal>
        </div>
      </div>

      {/* Bottom transition */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-b from-transparent to-[#2d4a2e]" />
    </section>
  );
}
