'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Eye, Target } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { AboutUs } from '@/components/sections/about-us';
import { Benefits } from '@/components/sections/benefits';
import { Testimonies } from '@/components/sections/testimonies';
import { Button } from '@/components/ui/button';
import type { AboutPageSection, AboutSection, BenefitsSection, SiteSettings, TestimoniesSection, Testimony } from '@/lib/cms-types';
import { getWhatsappHref } from '@/lib/site';

type AboutPageContentProps = {
  aboutPageSection: AboutPageSection;
  aboutSection: AboutSection;
  benefitsSection: BenefitsSection;
  testimoniesSection: TestimoniesSection;
  testimonies: Testimony[];
  siteSettings: SiteSettings;
};

export function AboutPageContent({ aboutPageSection, aboutSection, benefitsSection, testimoniesSection, testimonies, siteSettings }: AboutPageContentProps) {
  return (
    <>
      <main className="animate-page-enter bg-transparent text-gray-800">
        
        {/* Hero Section */}
        <section className="relative flex h-[60vh] w-full items-center justify-center overflow-hidden text-center md:h-[70vh] lg:h-[75vh]">
          <Image
            src={aboutPageSection.hero.image.src}
            alt={aboutPageSection.hero.image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-black/60" />

          {/* Batik Parang Pattern on Hero Overlay */}
          <div
            className="absolute inset-0 bg-repeat opacity-[0.06]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='140' height='140' viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23d4af37' stroke-width='1'%3E%3Cpath d='M0 70 Q35 35 70 70 Q105 105 140 70' /%3E%3Cpath d='M0 0 Q35 -35 70 0 Q105 35 140 0' transform='translate(0,140)'/%3E%3Ccircle cx='70' cy='70' r='4' fill='%23d4af37'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <Reveal className="relative z-10 max-w-3xl px-4">
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              {aboutPageSection.hero.heading}
            </h1>
            <p className="mt-4 text-lg text-gray-200 md:text-xl">
              {aboutPageSection.hero.description}
            </p>
          </Reveal>
        </section>

        {/* About Us Component */}
        <AboutUs aboutSection={aboutSection} showCta={false} />

        {/* Vision & Mission Section */}
        <section className="relative overflow-hidden bg-transparent py-24 border-t border-amber-800/5">
          {/* Batik Truntum Pattern */}
          <div
            className="absolute inset-0 bg-repeat opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23a67c52' stroke-width='1'%3E%3Ccircle cx='50' cy='50' r='8'/%3E%3Ccircle cx='50' cy='50' r='3' fill='%23a67c52'/%3E%3Cpath d='M50 38 L53 46 L50 42 L47 46 Z' fill='%23a67c52'/%3E%3Cpath d='M50 62 L53 54 L50 58 L47 54 Z' fill='%23a67c52'/%3E%3Cpath d='M38 50 L46 47 L42 50 L46 53 Z' fill='%23a67c52'/%3E%3Cpath d='M62 50 L54 47 L58 50 L54 53 Z' fill='%23a67c52'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <Reveal className="mb-16 text-center">
              <h2 className="text-3xl font-black text-neutral-900 md:text-5xl">
                {aboutPageSection.visionMission.heading}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
                {aboutPageSection.visionMission.description}
              </p>
              <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-amber-600" />
            </Reveal>

            <div className="grid gap-10 md:grid-cols-2">
              
              {/* Vision Card */}
              <Reveal className="relative rounded-3xl border border-amber-800/10 bg-white/70 p-10 shadow-lg backdrop-blur-sm transition duration-400 hover:-translate-y-1 hover:border-amber-600/20 hover:shadow-xl" delay={100}>
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-2xl bg-amber-700 p-4 text-white shadow-md">
                    <Eye size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900">
                    {aboutPageSection.visionMission.visionTitle}
                  </h3>
                </div>
                <p className="leading-relaxed text-neutral-600">
                  {aboutPageSection.visionMission.visionDescription}
                </p>
                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-[#fcf9f5] opacity-50" />
              </Reveal>

              {/* Mission Card */}
              <Reveal className="relative rounded-3xl border border-amber-800/10 bg-white/70 p-10 shadow-lg backdrop-blur-sm transition duration-400 hover:-translate-y-1 hover:border-amber-600/20 hover:shadow-xl" delay={150}>
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-2xl bg-amber-700 p-4 text-white shadow-md">
                    <Target size={28} strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900">
                    {aboutPageSection.visionMission.missionTitle}
                  </h3>
                </div>

                <ul className="space-y-4 text-neutral-600">
                  {aboutPageSection.visionMission.missionItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle size={20} className="mt-1 shrink-0 text-amber-700" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <Benefits benefitsSection={benefitsSection} />
        
        {/* Testimonies Section */}
        <Testimonies testimoniesSection={testimoniesSection} testimonies={testimonies} />

        {/* CTA Section */}
        <Reveal as="section" className="relative overflow-hidden bg-gradient-to-r from-amber-900 to-amber-800 py-20 text-white">
          {/* Batik Kawung Pattern on CTA */}
          <div
            className="absolute inset-0 bg-repeat opacity-[0.06]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23d4af37' stroke-width='1'%3E%3Cellipse cx='60' cy='30' rx='15' ry='22'/%3E%3Cellipse cx='60' cy='90' rx='15' ry='22'/%3E%3Cellipse cx='30' cy='60' rx='22' ry='15'/%3E%3Cellipse cx='90' cy='60' rx='22' ry='15'/%3E%3Ccircle cx='60' cy='60' r='5' fill='%23d4af37'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              {aboutPageSection.cta.heading}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-200">
              {aboutPageSection.cta.description}
            </p>

            <Button
              asChild
              className="rounded-full bg-white px-8 py-6 text-lg font-semibold text-amber-900 shadow-lg transition duration-300 hover:bg-neutral-100"
            >
              <a
                href={getWhatsappHref(siteSettings)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {aboutPageSection.cta.ctaLabel}
              </a>
            </Button>
          </div>
        </Reveal>

      </main>
    </>
  );
}
