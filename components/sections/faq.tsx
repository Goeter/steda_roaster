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
    <section id="faq" className="relative bg-transparent py-20">


      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="mb-4 text-4xl font-bold text-[#3e2723]">
            {faqHomeSection.heading}
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-[#5d4037]">
            {faqHomeSection.description}
          </p>
        </Reveal>

        <Reveal delay={150} className="space-y-4">
          {homeFaqs.map((faq, index) => (
            <div
              key={faq.id}
              className="overflow-hidden rounded-xl border border-[#d7ccc8] bg-white shadow-sm"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="flex w-full items-center justify-between px-6 py-4 transition hover:bg-[#f5f5f5]"
              >
                <h3 className="text-left font-semibold text-[#3e2723]">
                  {faq.question}
                </h3>
                <ChevronDown
                  size={20}
                  className={`text-[#6f4e37] transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="border-t border-[#d7ccc8] bg-[#faf7f2] px-6 py-4 text-[#5d4037]">
                  <p className="text-sm leading-relaxed">
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
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#6f4e37] px-6 py-3 font-semibold text-white transition-all duration-300 ease-out hover:scale-105 hover:bg-[#5d4037] hover:shadow-xl"
          >
            <span className="relative z-10">{faqHomeSection.ctaLabel}</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      </div>

      {/* Clean bottom border — natural contrast with footer */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-[#d7ccc8]/40 to-transparent" />
        <div className="h-px bg-gradient-to-r from-transparent via-[#6f4e37]/20 to-transparent" />
      </div>
    </section>
  );
}
