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
    <section id="about" className="relative overflow-hidden bg-transparent py-24 text-gray-800">


      {/* Warm Ambient Glow Accents */}
      <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-amber-200/20 blur-[130px]" />
      <div className="absolute right-0 bottom-1/4 h-80 w-80 rounded-full bg-yellow-200/10 blur-[110px]" />

      {/* Decorative Traditional Border Accents */}
      <div className="absolute left-4 top-4 h-24 w-24 border-l border-t border-amber-800/10" />
      <div className="absolute right-4 top-4 h-24 w-24 border-r border-t border-amber-800/10" />
      <div className="absolute left-4 bottom-4 h-24 w-24 border-l border-b border-amber-800/10" />
      <div className="absolute right-4 bottom-4 h-24 w-24 border-r border-b border-amber-800/10" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          
          {/* Video / Visual Element (5 cols) */}
          <div className="relative lg:col-span-5">
            <Reveal className="relative z-10 block overflow-hidden rounded-2xl border border-amber-800/10 bg-white p-3 shadow-xl">
              <div className="relative aspect-video overflow-hidden rounded-xl bg-neutral-900">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={aboutSection.videoUrl}
                  title={aboutSection.videoTitle}
                  loading="lazy"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </Reveal>

            {/* Subtle underframe shadow layer */}
            <div className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border border-amber-600/10 bg-amber-600/5 -z-10" />
          </div>

          {/* Text Content (7 cols) */}
          <div className="lg:col-span-7">
            <Reveal className="space-y-6" delay={150}>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                  <span className="text-xs font-extrabold uppercase tracking-[0.3em] text-amber-800 text-timbul-amber">Who We Are</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-amber-600/30 to-transparent" />
                </div>
                <h2 className="text-3xl font-black leading-tight text-neutral-900 text-timbul-heading sm:text-4xl">
                  {aboutSection.heading}
                </h2>
                <div className="h-1 w-20 rounded-full bg-gradient-to-r from-amber-600 to-amber-400" />
              </div>

              <div className="space-y-4 text-base font-semibold leading-relaxed text-neutral-800 text-timbul-dark">
                {aboutSection.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {showCta && (
                <div className="pt-2">
                  <Button
                    asChild
                    className="rounded-full bg-amber-700 px-8 py-6 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-600 hover:shadow-xl"
                  >
                    {aboutSection.ctaHref.startsWith('http') ? (
                      <a
                        href={aboutSection.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {aboutSection.ctaLabel}
                      </a>
                    ) : (
                      <Link href={aboutSection.ctaHref}>{aboutSection.ctaLabel}</Link>
                    )}
                  </Button>
                </div>
              )}
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
