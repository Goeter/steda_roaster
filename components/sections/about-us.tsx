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
    <section id="about" className="relative overflow-hidden bg-gradient-to-br from-[#f8f3ec] via-[#f3ece2] to-[#ede4d6] py-20 text-gray-800">
      {/* Batik Kawung */}
      <div
        className="absolute inset-0 bg-repeat opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%238b6914' stroke-width='1'%3E%3Cellipse cx='80' cy='40' rx='20' ry='30'/%3E%3Cellipse cx='80' cy='120' rx='20' ry='30'/%3E%3Cellipse cx='40' cy='80' rx='30' ry='20'/%3E%3Cellipse cx='120' cy='80' rx='30' ry='20'/%3E%3Ccircle cx='80' cy='80' r='6' fill='%238b6914'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Glow Accents */}
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-amber-200/25 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-yellow-200/15 blur-[100px]" />

      {/* Corner accents */}
      <div className="absolute left-0 top-0 h-32 w-32 border-l-2 border-t-2 border-amber-700/8 rounded-br-[60px]" />
      <div className="absolute bottom-0 right-0 h-32 w-32 border-b-2 border-r-2 border-amber-700/8 rounded-tl-[60px]" />

      {/* Floating dots */}
      <div className="absolute left-6 top-1/4 hidden space-y-3 lg:block">
        <div className="h-2 w-2 rounded-full bg-amber-600/12" />
        <div className="ml-1 h-1.5 w-1.5 rounded-full bg-amber-600/8" />
        <div className="h-1 w-1 rounded-full bg-amber-600/5" />
      </div>
      <div className="absolute bottom-1/4 right-6 hidden space-y-3 lg:block">
        <div className="h-1 w-1 rounded-full bg-amber-600/5" />
        <div className="ml-1 h-1.5 w-1.5 rounded-full bg-amber-600/8" />
        <div className="h-2 w-2 rounded-full bg-amber-600/12" />
      </div>

      {/* Top ornament */}
      <div className="absolute left-1/2 top-6 -translate-x-1/2">
        <div className="flex items-center gap-2">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-amber-700/20" />
          <div className="h-1.5 w-1.5 rotate-45 bg-amber-700/15" />
          <div className="h-2 w-2 rotate-45 border border-amber-700/20" />
          <div className="h-1.5 w-1.5 rotate-45 bg-amber-700/15" />
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-amber-700/20" />
        </div>
      </div>

      {/* Vertical lines */}
      <div className="absolute left-12 top-16 hidden h-20 w-px bg-gradient-to-b from-transparent via-amber-700/10 to-transparent lg:block" />
      <div className="absolute bottom-16 right-12 hidden h-20 w-px bg-gradient-to-b from-transparent via-amber-700/10 to-transparent lg:block" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="aspect-video overflow-hidden rounded-xl border border-amber-700/10 bg-black shadow-2xl shadow-amber-900/15">
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
            <div className="absolute -bottom-2 -right-2 -z-10 h-full w-full rounded-xl border border-amber-600/8" />
          </Reveal>

          <Reveal className="space-y-6" delay={150}>
            <div>
              <div className="mb-3 flex items-center gap-3">
                <div className="h-px w-8 bg-amber-600/30" />
                <div className="h-1 w-1 rotate-45 bg-amber-600/30" />
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
                className="bg-amber-700 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-amber-600 hover:shadow-xl"
              >
                <Link href={aboutSection.ctaHref}>{aboutSection.ctaLabel}</Link>
              </Button>
            )}
          </Reveal>
        </div>
      </div>

      {/* Bottom transition to dark Product */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-b from-transparent to-[#2b1b12]" />
    </section>
  );
}
