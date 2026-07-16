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
    <section id="distribution" className="relative overflow-hidden bg-gradient-to-br from-[#d5dfe8] via-[#dce6ee] to-[#cdd9e5] py-8 sm:py-10 lg:py-12">
      {/* Topographic / Trade Route Pattern */}
      <div
        className="absolute inset-0 bg-repeat opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%234a7c9b' stroke-width='0.8'%3E%3Cpath d='M0 80 Q50 60 100 80 Q150 100 200 80'/%3E%3Cpath d='M0 120 Q50 100 100 120 Q150 140 200 120'/%3E%3Cpath d='M0 40 Q50 20 100 40 Q150 60 200 40'/%3E%3Cpath d='M0 160 Q50 140 100 160 Q150 180 200 160'/%3E%3Ccircle cx='50' cy='70' r='2' fill='%234a7c9b'/%3E%3Ccircle cx='150' cy='130' r='2' fill='%234a7c9b'/%3E%3Ccircle cx='100' cy='100' r='3' fill='%234a7c9b'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Soft blue glow accents */}
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-blue-300/15 blur-[100px]" />
      <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-sky-300/12 blur-[90px]" />

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
              <h3 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-slate-700">
                {distributionSection.legendTitle}
              </h3>

              <div className="grid grid-cols-3 gap-x-3 gap-y-2 sm:grid-cols-4 lg:grid-cols-4">
                {cities.map((city) => (
                  <div key={city.name} className="flex items-center gap-1.5">
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${city.color}`} />
                    <span className="text-[9px] font-bold uppercase tracking-wide text-slate-700 sm:text-[10px] lg:text-[11px]">
                      {city.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="w-full" delay={150}>
            <div className="max-w-xl lg:ml-auto">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-amber-700">
                {distributionSection.eyebrow}
              </p>

              <h2 className="text-3xl font-black leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl">
                {beforeHighlight}
                <span className="text-yellow-500">{highlightedWord}</span>
                {afterHighlight}
              </h2>

              <p className="mt-5 text-base leading-8 text-neutral-600 sm:text-lg">
                {distributionSection.description}
              </p>

              <div className="mt-7">
                <Button
                  asChild
                  className="group h-12 rounded-full bg-neutral-900 px-7 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-600/25"
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

      {/* Bottom transition fade to FAQ section */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent to-[#eae5dc]" />
    </section>
  );
}
