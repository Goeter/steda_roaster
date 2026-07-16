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
      {/* Darker Warm Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#efe6d5] via-[#e8dbc8] to-[#e2d4c0]" />

      {/* Gold Glow Accents */}
      <div className="absolute left-0 top-0 h-[350px] w-[350px] rounded-full bg-amber-300/25 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[280px] w-[280px] rounded-full bg-yellow-400/20 blur-[100px]" />
      <div className="absolute right-1/4 top-1/3 h-[200px] w-[200px] rounded-full bg-orange-200/15 blur-[80px]" />

      {/* Batik Kawung Pattern — Elegant & Symmetrical */}
      <div
        className="absolute inset-0 bg-repeat opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%238b6914' stroke-width='1.2'%3E%3Cellipse cx='80' cy='40' rx='20' ry='30'/%3E%3Cellipse cx='80' cy='120' rx='20' ry='30'/%3E%3Cellipse cx='40' cy='80' rx='30' ry='20'/%3E%3Cellipse cx='120' cy='80' rx='30' ry='20'/%3E%3Ccircle cx='80' cy='80' r='6' fill='%238b6914'/%3E%3Ccircle cx='80' cy='80' r='12' stroke-dasharray='3 3'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Coffee Bean Scatter Pattern */}
      <div
        className="absolute inset-0 bg-repeat opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%235d3a1a'%3E%3Cellipse cx='30' cy='30' rx='8' ry='12' transform='rotate(-30 30 30)'/%3E%3Cline x1='24' y1='26' x2='36' y2='34' stroke='%23e8dbc8' stroke-width='1.2'/%3E%3Cellipse cx='90' cy='85' rx='7' ry='11' transform='rotate(20 90 85)'/%3E%3Cline x1='85' y1='80' x2='95' y2='90' stroke='%23e8dbc8' stroke-width='1.2'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative Corner Accents */}
      <div className="absolute left-0 top-0 h-40 w-40 border-l-2 border-t-2 border-amber-600/10 rounded-br-[80px]" />
      <div className="absolute bottom-0 right-0 h-40 w-40 border-b-2 border-r-2 border-amber-600/10 rounded-tl-[80px]" />

      {/* Horizontal Decorative Line */}
      <div className="absolute left-1/2 top-8 -translate-x-1/2">
        <div className="flex items-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-600/30" />
          <div className="h-2 w-2 rotate-45 border border-amber-600/30" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-600/30" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Video Section */}
          <Reveal className="aspect-video overflow-hidden rounded-xl border border-amber-700/15 bg-black shadow-2xl shadow-amber-900/20">
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
          </Reveal>

          {/* Text Content */}
          <Reveal className="space-y-6" delay={150}>
            <div>
              <h2 className="text-4xl font-bold leading-tight text-gray-900">
                {aboutSection.heading}
              </h2>
              <div className="mt-1 h-1 w-16 rounded-full bg-gradient-to-r from-amber-600 to-amber-400" />
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

      {/* Bottom transition fade to Product section */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent to-[#e5d5b8]" />
    </section>
  );
}
