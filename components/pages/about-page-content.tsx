'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Gem, Goal } from 'lucide-react';
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

          <div className="absolute inset-0 bg-black/25" />



          <Reveal className="relative z-10 max-w-3xl px-6 rounded-3xl bg-black/35 p-6 sm:p-8 backdrop-blur-md border border-white/15 shadow-2xl">
            <h1 className="text-4xl font-black leading-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] md:text-5xl lg:text-6xl">
              {aboutPageSection.hero.heading}
            </h1>
            <p className="mt-4 text-lg font-semibold text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] md:text-xl">
              {aboutPageSection.hero.description}
            </p>
          </Reveal>
        </section>

        {/* About Us Component */}
        <AboutUs aboutSection={aboutSection} showCta={false} />

        {/* Vision & Mission Section */}
        <section className="relative overflow-hidden bg-transparent py-24">


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
                    <Gem size={28} />
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
                    <Goal size={28} />
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
        <Reveal as="section" className="relative overflow-hidden bg-gradient-to-r from-[#2b1b12] via-[#4a2b19] to-[#2b1b12] py-20 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_25%,rgba(245,158,11,0.28),transparent_30%),radial-gradient(circle_at_85%_75%,rgba(120,53,15,0.45),transparent_35%)]" />
          <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(135deg,#ffffff_1px,transparent_1px),linear-gradient(45deg,#ffffff_1px,transparent_1px)] bg-[length:30px_30px]" />

          <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              {aboutPageSection.cta.heading}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-amber-100/90">
              {aboutPageSection.cta.description}
            </p>

            <Button
              asChild
              className="rounded-full bg-white px-8 py-6 text-lg font-semibold text-[#2b1b12] shadow-lg transition duration-300 hover:bg-amber-100"
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
