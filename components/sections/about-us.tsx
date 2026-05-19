'use client';

import Link from 'next/link';
import { Reveal } from '@/components/reveal';
import { Button } from '@/components/ui/button';
import { aboutSection } from '@/lib/cms-data';

type AboutUsProps = {
  showCta?: boolean;
};

export function AboutUs({ showCta = true }: AboutUsProps) {
  return (
    <section id="about" className="relative overflow-hidden py-20 text-gray-800">
      {/* 🌿 Soft Elegant Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fdfaf6] via-[#f7f1e8] to-[#f3ece2]" />

      {/* ✨ Soft Gold Glow */}
      <div className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-amber-200/40 blur-[100px]" />
      <div className="absolute bottom-0 right-0 h-[250px] w-[250px] rounded-full bg-yellow-300/30 blur-[90px]" />

      {/* 🧵 Batik Jogja Pattern (Kawung Style - Elegant & Symmetrical) */}
      <div
        className="absolute inset-0 bg-repeat opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23a67c52' stroke-width='1.5'%3E%3Cellipse cx='80' cy='40' rx='20' ry='30'/%3E%3Cellipse cx='80' cy='120' rx='20' ry='30'/%3E%3Cellipse cx='40' cy='80' rx='30' ry='20'/%3E%3Cellipse cx='120' cy='80' rx='30' ry='20'/%3E%3Ccircle cx='80' cy='80' r='6' fill='%23a67c52'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* 📦 Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* 🎥 Video Section */}
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

          {/* 📝 Text Content */}
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
    </section>
  );
}
