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
      {/* Ukiran Pattern — Indonesian Carved Wood */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%236f4e37' stroke-width='0.8'%3E%3Cpath d='M60 10 Q80 30 60 50 Q40 30 60 10' /%3E%3Cpath d='M60 70 Q80 90 60 110 Q40 90 60 70' /%3E%3Cpath d='M10 60 Q30 40 50 60 Q30 80 10 60' /%3E%3Cpath d='M70 60 Q90 40 110 60 Q90 80 70 60' /%3E%3Ccircle cx='60' cy='60' r='4' /%3E%3Ccircle cx='60' cy='60' r='8' stroke-dasharray='2 3'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '120px 120px',
        }}
      />

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
