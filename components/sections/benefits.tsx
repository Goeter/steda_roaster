'use client';

import Image from 'next/image';
import { Reveal } from '@/components/reveal';
import { benefitsSection } from '@/lib/cms-data';

export function Benefits() {
  return (
    <section
      id="benefits"
      className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-amber-50 py-20"
    >
      <div
        className="absolute inset-0 bg-repeat opacity-5"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M50 10 Q60 30 50 50 Q40 30 50 10\' fill=\'%23000\' opacity=\'0.1\'/%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'5\' fill=\'%23000\'/%3E%3Ccircle cx=\'70\' cy=\'70\' r=\'5\' fill=\'%23000\'/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal className="flex justify-center">
            <Image
              src={benefitsSection.image.src}
              alt={benefitsSection.image.alt}
              width={520}
              height={520}
              className="w-full max-w-md rounded-lg shadow-xl"
            />
          </Reveal>

          <Reveal delay={150}>
            <h2 className="mb-4 whitespace-pre-line text-3xl font-black leading-tight text-foreground">
              {benefitsSection.heading}
            </h2>

            <p className="mb-10 text-lg text-foreground/70">
              {benefitsSection.description}
            </p>

            <div className="space-y-8">
              {benefitsSection.items.map((benefit) => (
                <div
                  key={benefit.id}
                  className="group cursor-pointer transition-all duration-300 hover:translate-x-2"
                >
                  <h3 className="mb-3 text-base font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                    {benefit.title}
                  </h3>
                  <p className="leading-relaxed text-foreground/70 transition-colors duration-300 group-hover:text-foreground">
                    {benefit.description}
                  </p>
                  <div className="mt-3 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary to-transparent transition-transform duration-300 group-hover:scale-x-100" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
