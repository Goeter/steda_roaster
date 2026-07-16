import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/reveal';
import { Button } from '@/components/ui/button';
import type { DistributionSection } from '@/lib/cms-types';

type DistributionProps = {
  distributionSection: DistributionSection;
};

export function Distribution({ distributionSection }: DistributionProps) {
  const { cities, highlightedWord, heading } = distributionSection;
  const [beforeHighlight, afterHighlight] = heading.split(highlightedWord);

  return (
    <section id="distribution" className="relative overflow-hidden bg-gradient-to-br from-[#2a4550] via-[#30505c] to-[#243d48] pb-14 pt-8 sm:pb-16 sm:pt-10 lg:pb-16 lg:pt-12">
      {/* Indonesian Maritime Wave Pattern */}
      <div
        className="absolute inset-0 bg-repeat opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='100' viewBox='0 0 200 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2380c4d4' stroke-width='0.8'%3E%3Cpath d='M0 50 Q25 30 50 50 Q75 70 100 50 Q125 30 150 50 Q175 70 200 50'/%3E%3Cpath d='M0 65 Q25 45 50 65 Q75 85 100 65 Q125 45 150 65 Q175 85 200 65'/%3E%3Cpath d='M0 35 Q25 15 50 35 Q75 55 100 35 Q125 15 150 35 Q175 55 200 35'/%3E%3Ccircle cx='50' cy='50' r='2' fill='%2380c4d4'/%3E%3Ccircle cx='150' cy='50' r='2' fill='%2380c4d4'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Glow accents */}
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-teal-400/8 blur-[100px]" />
      <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-cyan-300/6 blur-[90px]" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          <Reveal className="w-full">
            <div className="relative aspect-[16/7.8] w-full overflow-hidden">
              <Image
                src={distributionSection.map.src}
                alt={distributionSection.map.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-contain object-center"
                priority
              />
            </div>

            <div className="mt-3">
              <h3 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-teal-200">
                {distributionSection.legendTitle}
              </h3>

              <div className="grid grid-cols-3 gap-x-3 gap-y-2 sm:grid-cols-4 lg:grid-cols-4">
                {cities.map((city) => (
                  <div key={city.name} className="flex items-center gap-1.5">
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${city.color}`} />
                    <span className="text-[9px] font-bold uppercase tracking-wide text-teal-100/90 sm:text-[10px] lg:text-[11px]">
                      {city.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="w-full" delay={150}>
            <div className="max-w-xl lg:ml-auto">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-teal-300">
                {distributionSection.eyebrow}
              </p>

              <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                {beforeHighlight}
                <span className="text-amber-400">{highlightedWord}</span>
                {afterHighlight}
              </h2>

              <p className="mt-5 text-base leading-8 text-white/65 sm:text-lg">
                {distributionSection.description}
              </p>

              <div className="mt-7">
                <Button
                  asChild
                  className="group h-12 rounded-full bg-white px-7 text-xs font-bold uppercase tracking-wider text-teal-900 shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-teal-50 hover:shadow-lg"
                >
                  <Link href={distributionSection.ctaHref}>
                    {distributionSection.ctaLabel}
                    <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom transition to FAQ */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-b from-transparent to-[#e5ddd0]" />
    </section>
  );
}
