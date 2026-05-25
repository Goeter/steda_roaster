'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, ChevronDown, Coffee, MessageCircle, Settings } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import type { FAQCategory, FAQItem, FAQPageSection, SiteSettings } from '@/lib/cms-types';

const iconMap = {
  coffee: Coffee,
  settings: Settings,
  bookOpen: BookOpen,
};

type FAQsPageContentProps = {
  faqCategories: FAQCategory[];
  faqPageSection: FAQPageSection;
  siteSettings: SiteSettings;
};

export function FAQsPageContent({ faqCategories, faqPageSection, siteSettings }: FAQsPageContentProps) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const whatsappHref = `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(
    siteSettings.whatsappMessage,
  )}`;

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f5efe6] via-[#ebe3d5] to-[#d6ccc2] pt-32 pb-20 animate-page-enter">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal as="header" className="text-center">
          <h1 className="mb-4 text-3xl font-bold text-[#3e2723] md:text-5xl">
            {faqPageSection.heading}
          </h1>
          <p className="mb-12 text-[#5d4037]">
            {faqPageSection.description}
          </p>
        </Reveal>

        <Reveal delay={100} className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {faqCategories.map((category, index) => {
            const Icon = iconMap[category.icon];

            return (
              <button
                key={category.title}
                onClick={() => {
                  setActiveCategory(index);
                  setOpenIndex(null);
                }}
                className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-semibold transition-all duration-300 ${
                  activeCategory === index
                    ? 'bg-[#6f4e37] text-white shadow-md'
                    : 'border-[#d7ccc8] bg-white/70 text-[#4e342e] hover:bg-[#efebe9]'
                }`}
              >
                <Icon size={18} />
                {category.title}
              </button>
            );
          })}
        </Reveal>

        <Reveal delay={150} className="space-y-4">
          {faqCategories[activeCategory].faqs.map((faq: FAQItem, index: number) => (
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
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={200} className="mt-12 text-center">
          <p className="mb-4 text-lg font-medium text-[#4e342e]">
            {faqPageSection.contactText}
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#6f4e37] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#5d4037]"
          >
            <MessageCircle size={18} />
            {faqPageSection.contactCtaLabel}
          </a>
        </Reveal>

        <Reveal delay={300} className="mt-6 text-center">
          <Link
            href={faqPageSection.backHref}
            className="inline-block rounded-full bg-[#3e2723] px-8 py-3 font-semibold text-white shadow-md transition hover:bg-[#2f1b16]"
          >
            {faqPageSection.backLabel}
          </Link>
        </Reveal>
      </div>
    </main>
  );
}
