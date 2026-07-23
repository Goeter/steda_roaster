'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, ChevronDown, Coffee, MessageCircle, Settings } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import type { FAQCategory, FAQItem, FAQPageSection, SiteSettings } from '@/lib/cms-types';
import { getWhatsappHref } from '@/lib/site';

import { cmsFallbackContent } from '@/lib/cms-data';

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

  const safeFaqCategories = (
    Array.isArray(faqCategories) && faqCategories.length > 0
      ? faqCategories
      : cmsFallbackContent.faqs.faqCategories
  ).map((cat, idx) => {
    const fallbackCat =
      cmsFallbackContent.faqs.faqCategories[idx] ??
      cmsFallbackContent.faqs.faqCategories[0];
    return {
      ...cat,
      title: cat.title || fallbackCat.title,
      icon: cat.icon || fallbackCat.icon,
      faqs:
        Array.isArray(cat.faqs) && cat.faqs.length > 0
          ? cat.faqs
          : fallbackCat.faqs,
    };
  });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const activeFaqCategory = safeFaqCategories[activeCategory] ?? safeFaqCategories[0];
  const activeFaqs = Array.isArray(activeFaqCategory?.faqs) && activeFaqCategory.faqs.length > 0
    ? activeFaqCategory.faqs
    : (cmsFallbackContent.faqs.faqCategories[activeCategory] ?? cmsFallbackContent.faqs.faqCategories[0]).faqs;
  const whatsappHref = getWhatsappHref(siteSettings);

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent pt-32 pb-20 animate-page-enter">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal as="header" className="text-center">
          <h1 className="mb-4 text-3xl font-black text-neutral-900 text-timbul-heading md:text-5xl">
            {faqPageSection.heading}
          </h1>
          <p className="mb-12 text-base font-semibold text-neutral-800 text-timbul-dark">
            {faqPageSection.description}
          </p>
        </Reveal>

        <Reveal delay={100} className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {safeFaqCategories.map((category, index) => {
            const Icon = iconMap[category.icon] ?? Coffee;

            return (
              <button
                key={category.title}
                onClick={() => {
                  setActiveCategory(index);
                  setOpenIndex(null);
                }}
                className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-extrabold transition-all duration-300 ${
                  activeCategory === index
                    ? 'bg-[#6f4e37] hover:bg-[#5d4037] text-white shadow-lg border border-amber-500/30'
                    : 'card-timbul text-neutral-800 hover:bg-white'
                }`}
              >
                <Icon size={18} />
                {category.title}
              </button>
            );
          })}
        </Reveal>

        <Reveal delay={150} className="space-y-4">
          {activeFaqs.map((faq: FAQItem, index: number) => (
            <div
              key={faq.id}
              className="overflow-hidden rounded-xl card-timbul"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="flex w-full items-center justify-between px-6 py-4 transition hover:bg-[#faf9f6]"
              >
                <h3 className="text-left font-bold text-neutral-900 text-timbul-dark">
                  {faq.question}
                </h3>
                <ChevronDown
                  size={20}
                  className={`text-amber-800 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="border-t border-amber-800/15 bg-[#faf8f5] px-6 py-4 text-neutral-800 text-timbul-dark font-medium text-sm leading-relaxed">
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
