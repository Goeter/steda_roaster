'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import type { FAQHomeSection, FAQItem } from '@/lib/cms-types';

type FAQProps = {
  faqHomeSection: FAQHomeSection;
  faqs: FAQItem[];
};

export function FAQ({ faqHomeSection, faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const homeFaqs = faqs.slice(0, faqHomeSection.previewLimit);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative bg-faq py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <h2 className="mb-4 text-4xl font-bold text-foreground">
              {faqHomeSection.heading}
            </h2>

            <p className="mb-8 text-foreground/70">
              {faqHomeSection.description}
            </p>

            <div className="space-y-4">
              {homeFaqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="overflow-hidden rounded-lg border border-primary bg-white shadow-sm"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex w-full items-center justify-between px-6 py-4 transition-colors hover:bg-primary/5"
                  >
                    <h3 className="text-left font-semibold text-foreground">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      size={20}
                      className={`text-primary transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="border-t border-primary bg-primary/5 px-6 py-4">
                      <p className="text-sm leading-relaxed text-foreground/80">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center lg:justify-start">
              <Link
                href={faqHomeSection.ctaHref}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-orange-500 px-6 py-3 font-semibold text-white transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer" />
                <span className="relative z-10">{faqHomeSection.ctaLabel}</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={150} className="mt-8 flex items-center justify-center lg:mt-0 lg:justify-end">
            <div className="relative flex aspect-square w-full max-w-sm items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 shadow-2xl lg:max-w-md">
              <Image
                src={faqHomeSection.image.src}
                alt={faqHomeSection.image.alt}
                fill
                sizes="(min-width:1024px) 384px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
