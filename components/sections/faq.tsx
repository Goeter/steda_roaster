'use client';

import { useState } from 'react';
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
      {/* Coffee Ring Watermark */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='300' viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%238d6e4a' stroke-width='1.5'%3E%3Ccircle cx='150' cy='150' r='60'/%3E%3Ccircle cx='150' cy='150' r='55' stroke-dasharray='8 4'/%3E%3Ccircle cx='150' cy='150' r='65' opacity='0.5'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '300px 300px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground">
            {faqHomeSection.heading}
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-foreground/70">
            {faqHomeSection.description}
          </p>
        </Reveal>

        <Reveal delay={150} className="space-y-4">
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
        </Reveal>

        <Reveal delay={200} className="mt-8 flex justify-center">
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
        </Reveal>
      </div>

      {/* Bottom transition fade to Footer */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-b from-transparent via-[#f0ede8] to-[#0f172a]" />
    </section>
  );
}
