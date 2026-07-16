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
      {/* Soft Elegant Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fdfaf6] via-[#f7f1e8] to-[#f3ece2]" />

      {/* Soft Gold Glow Accents */}
      <div className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-amber-200/40 blur-[100px]" />
      <div className="absolute bottom-0 right-0 h-[250px] w-[250px] rounded-full bg-yellow-300/30 blur-[90px]" />

      {/* Batik Kawung Pattern — Elegant & Symmetrical */}
      <div
        className="absolute inset-0 bg-repeat opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23a67c52' stroke-width='1.2'%3E%3Cellipse cx='80' cy='40' rx='20' ry='30'/%3E%3Cellipse cx='80' cy='120' rx='20' ry='30'/%3E%3Cellipse cx='40' cy='80' rx='30' ry='20'/%3E%3Cellipse cx='120' cy='80' rx='30' ry='20'/%3E%3Ccircle cx='80' cy='80' r='6' fill='%23a67c52'/%3E%3Ccircle cx='80' cy='80' r='12' stroke-dasharray='3 3'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Coffee Bean Scatter Pattern */}
      <div
        className="absolute inset-0 bg-repeat opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236d4c41'%3E%3Cellipse cx='30' cy='30' rx='8' ry='12' transform='rotate(-30 30 30)'/%3E%3Cline x1='24' y1='26' x2='36' y2='34' stroke='%23f5f0eb' stroke-width='1.2'/%3E%3Cellipse cx='90' cy='85' rx='7' ry='11' transform='rotate(20 90 85)'/%3E%3Cline x1='85' y1='80' x2='95' y2='90' stroke='%23f5f0eb' stroke-width='1.2'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Video Section */}
          <Reveal className="aspect-video overflow-hidden rounded-xl border border-black/10 bg-black shadow-xl">
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
              <div className="mt-3 space-y-4 text-lg leading-relaxed text-gray-600">
                {aboutSection.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            {showCta && (
              <Button
                asChild
                className="bg-amber-600 px-8 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-amber-500"
              >
                <Link href={aboutSection.ctaHref}>{aboutSection.ctaLabel}</Link>
              </Button>
            )}
          </Reveal>
        </div>
      </div>

      {/* Bottom transition fade to Product section */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent to-[#fff7ed]" />
    </section>
  );
}
