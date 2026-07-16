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
    <section id="distribution" className="relative overflow-hidden bg-gradient-to-br from-[#f8f3ec] via-[#f3ece2] to-[#ede4d6] pb-16 pt-10 sm:pb-18 sm:pt-12 lg:pb-20 lg:pt-14">
      {/* Maritime Wave Pattern */}
      <div
        className="absolute inset-0 bg-repeat opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='100' viewBox='0 0 200 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%238b6914' stroke-width='0.7'%3E%3Cpath d='M0 50 Q25 30 50 50 Q75 70 100 50 Q125 30 150 50 Q175 70 200 50'/%3E%3Cpath d='M0 65 Q25 45 50 65 Q75 85 100 65 Q125 45 150 65 Q175 85 200 65'/%3E%3Ccircle cx='50' cy='50' r='2' fill='%238b6914'/%3E%3Ccircle cx='150' cy='50' r='2' fill='%238b6914'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Glow */}
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-amber-200/15 blur-[100px]" />
      <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-yellow-200/10 blur-[90px]" />

      {/* Vertical lines */}
      <div className="absolute left-10 top-16 hidden h-20 w-px bg-gradient-to-b from-transparent via-amber-700/10 to-transparent lg:block" />
      <div className="absolute bottom-16 right-10 hidden h-20 w-px bg-gradient-to-b from-transparent via-amber-700/10 to-transparent lg:block" />

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
              <h3 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-gray-800">
                {distributionSection.legendTitle}
              </h3>

              <div className="grid grid-cols-3 gap-x-3 gap-y-2 sm:grid-cols-4 lg:grid-cols-4">
                {cities.map((city) => (
                  <div key={city.name} className="flex items-center gap-1.5">
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${city.color}`} />
                    <span className="text-[9px] font-bold uppercase tracking-wide text-gray-700 sm:text-[10px] lg:text-[11px]">
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

              <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                {beforeHighlight}
                <span className="text-amber-600">{highlightedWord}</span>
                {afterHighlight}
              </h2>

              <p className="mt-5 text-base leading-8 text-gray-600 sm:text-lg">
                {distributionSection.description}
              </p>

              <div className="mt-7">
                <Button
                  asChild
                  className="group h-12 rounded-full bg-amber-700 px-7 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-amber-600 hover:shadow-lg"
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

    </section>
  );
}
