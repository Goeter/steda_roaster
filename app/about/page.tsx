'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Eye, Target } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { AboutUs } from '@/components/sections/about-us';
import { Benefits } from '@/components/sections/benefits';
import { Testimonies } from '@/components/sections/testimonies';
import { Button } from '@/components/ui/button';
import { aboutPageSection } from '@/lib/cms-data';

export default function AboutPage() {
  return (
    <>

      <main className="bg-[#fdfaf6] text-gray-800 animate-page-enter">
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

          <Reveal className="relative z-10 max-w-3xl px-4">
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              {aboutPageSection.hero.heading}
            </h1>
            <p className="mt-4 text-lg text-gray-200 md:text-xl">
              {aboutPageSection.hero.description}
            </p>
          </Reveal>
        </section>

        <AboutUs showCta={false} />

        <section className="bg-gradient-to-b from-[#fdfaf6] to-[#f5efe6] py-24">
          <div className="mx-auto max-w-7xl px-6">
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

        <Benefits />
        <Testimonies />

        <Reveal as="section" className="bg-gradient-to-r from-[#3e2723] to-[#6d4c41] py-20 text-white">
          <div className="mx-auto max-w-6xl px-6 text-center">
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
