'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Eye, Target } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { AboutUs } from '@/components/sections/about-us';
import { Benefits } from '@/components/sections/benefits';
import { Testimonies } from '@/components/sections/testimonies';
import { Button } from '@/components/ui/button';
import type { AboutPageSection, AboutSection, BenefitsSection, TestimoniesSection, Testimony } from '@/lib/cms-types';

type AboutPageContentProps = {
  aboutPageSection: AboutPageSection;
  aboutSection: AboutSection;
  benefitsSection: BenefitsSection;
  testimoniesSection: TestimoniesSection;
  testimonies: Testimony[];
};

export function AboutPageContent({ aboutPageSection, aboutSection, benefitsSection, testimoniesSection, testimonies }: AboutPageContentProps) {
  return (
    <>

      <main className="animate-page-enter text-gray-800">
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

          <div className="absolute inset-0 bg-black/55" />

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

          {/* Bottom transition from hero to content */}
          <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent to-[#fdfaf6]" />
        </section>

        <AboutUs aboutSection={aboutSection} showCta={false} />

        {/* Vision & Mission Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#fdfaf6] to-[#f5efe6] py-24">
          {/* Batik Truntum Pattern */}
          <div
            className="absolute inset-0 bg-repeat opacity-[0.035]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23a67c52' stroke-width='1'%3E%3Ccircle cx='50' cy='50' r='8'/%3E%3Ccircle cx='50' cy='50' r='3' fill='%23a67c52'/%3E%3Cpath d='M50 38 L53 46 L50 42 L47 46 Z' fill='%23a67c52'/%3E%3Cpath d='M50 62 L53 54 L50 58 L47 54 Z' fill='%23a67c52'/%3E%3Cpath d='M38 50 L46 47 L42 50 L46 53 Z' fill='%23a67c52'/%3E%3Cpath d='M62 50 L54 47 L58 50 L54 53 Z' fill='%23a67c52'/%3E%3Ccircle cx='0' cy='0' r='5'/%3E%3Ccircle cx='100' cy='0' r='5'/%3E%3Ccircle cx='0' cy='100' r='5'/%3E%3Ccircle cx='100' cy='100' r='5'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Warm glow accents */}
          <div className="absolute -left-16 top-1/4 h-64 w-64 rounded-full bg-amber-200/20 blur-[90px]" />
          <div className="absolute -right-16 bottom-1/4 h-56 w-56 rounded-full bg-yellow-200/15 blur-[80px]" />

          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <Reveal className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-[#3e2723] md:text-5xl">
                {aboutPageSection.visionMission.heading}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                {aboutPageSection.visionMission.description}
              </p>
              <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-[#6d4c41]" />
            </Reveal>

            <div className="grid gap-10 md:grid-cols-2">
              <Reveal className="relative rounded-3xl border border-white/40 bg-white/80 p-10 shadow-lg backdrop-blur-lg transition duration-500 hover:shadow-2xl" delay={100}>
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-full bg-[#3e2723] p-4 text-white shadow-md">
                    <Eye size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#3e2723]">
                    {aboutPageSection.visionMission.visionTitle}
                  </h3>
                </div>
                <p className="leading-relaxed text-gray-600">
                  {aboutPageSection.visionMission.visionDescription}
                </p>
                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-[#f5efe6] opacity-50" />
              </Reveal>

              <Reveal className="relative rounded-3xl bg-gradient-to-br from-[#3e2723] to-[#6d4c41] p-10 text-white shadow-lg transition duration-500 hover:shadow-2xl" delay={150}>
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-full bg-white p-4 text-[#3e2723] shadow-md">
                    <Target size={28} strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-bold">
                    {aboutPageSection.visionMission.missionTitle}
                  </h3>
                </div>

                <ul className="space-y-4">
                  {aboutPageSection.visionMission.missionItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle size={20} className="mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        <Benefits benefitsSection={benefitsSection} />
        <Testimonies testimoniesSection={testimoniesSection} testimonies={testimonies} />

        {/* CTA Section */}
        <Reveal as="section" className="relative overflow-hidden bg-gradient-to-r from-[#3e2723] to-[#6d4c41] py-20 text-white">
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
              className="rounded-full bg-white px-8 py-6 text-lg font-semibold text-[#3e2723] shadow-lg transition duration-300 hover:bg-gray-200"
            >
              <Link href={aboutPageSection.cta.ctaHref}>{aboutPageSection.cta.ctaLabel}</Link>
            </Button>
          </div>
        </Reveal>
      </main>

    </>
  );
}
