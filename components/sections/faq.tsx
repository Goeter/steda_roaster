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

  const fallbackFaqs: FAQItem[] = [
    {
      id: 1,
      question: 'Apa itu mesin roasting kopi Steda?',
      answer:
        'Mesin roasting kopi Steda adalah peralatan premium yang dirancang untuk memanggang biji kopi mentah dengan presisi tinggi guna menghasilkan aroma dan cita rasa terbaik.',
    },
    {
      id: 2,
      question: 'Siapa yang cocok menggunakan mesin Steda?',
      answer:
        'Mesin ini cocok untuk home roaster, kafe, roastery profesional, hingga industri kopi skala menengah dan besar.',
    },
    {
      id: 3,
      question: 'Apa keunggulan utama mesin roasting Steda?',
      answer:
        'Keunggulan utamanya meliputi kontrol suhu presisi, desain modern, efisiensi energi, serta daya tahan tinggi.',
    },
    {
      id: 4,
      question: 'Berapa kapasitas mesin roasting Steda?',
      answer:
        'Kapasitas mesin tersedia mulai dari 200 gram hingga 20 kilogram untuk memenuhi kebutuhan skala kecil hingga industri.',
    },
  ];

  const safeFaqs = Array.isArray(faqs) && faqs.length > 0 ? faqs : fallbackFaqs;
  const homeFaqs = safeFaqs.slice(0, faqHomeSection?.previewLimit || 4);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative bg-transparent py-20">


      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          
          {/* Left Column: Heading and Support Callout */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal>
              <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.2em] text-amber-800 text-timbul-amber sm:text-sm">
                Pertanyaan Umum
              </span>
              <h2 className="text-3xl font-black tracking-tight text-neutral-900 text-timbul-heading sm:text-4xl leading-tight">
                {faqHomeSection.heading}
              </h2>
              <p className="mt-4 text-base font-semibold leading-relaxed text-neutral-800 text-timbul-dark">
                {faqHomeSection.description}
              </p>
            </Reveal>

            {/* Custom WhatsApp Help Card */}
            <Reveal delay={100}>
              <div className="relative overflow-hidden rounded-2xl card-timbul p-6">
                <div className="absolute -right-3 -top-3 h-16 w-16 opacity-[0.05] pointer-events-none">
                  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="30" cy="30" r="18" stroke="#8b6914" strokeWidth="1" />
                    <circle cx="30" cy="30" r="8" stroke="#8b6914" strokeWidth="1" />
                  </svg>
                </div>
                <h4 className="text-base font-extrabold text-neutral-900 text-timbul-dark mb-2">
                  Belum Menemukan Jawaban?
                </h4>
                <p className="text-sm font-medium leading-relaxed text-neutral-700 text-timbul-dark mb-5">
                  Hubungi tim layanan pelanggan kami untuk konsultasi gratis mengenai spesifikasi mesin roaster kopi Steda.
                </p>
                <a
                  href="https://wa.me/628123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#835c43] hover:bg-[#6f4e37] px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:scale-105"
                >
                  <span>Chat CS via WhatsApp</span>
                  <span>→</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Accordion Items and CTA */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal delay={150} className="space-y-4">
              {homeFaqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="overflow-hidden rounded-xl card-timbul transition-all duration-300 hover:border-amber-600/30"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex w-full items-center justify-between px-6 py-4 transition hover:bg-[#faf9f6]"
                  >
                    <h3 className="text-left font-bold text-neutral-900 text-timbul-dark text-sm sm:text-base">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      size={18}
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
                    <div className="border-t border-amber-800/15 bg-[#faf8f5] px-6 py-4 text-neutral-800">
                      <p className="text-sm font-medium leading-relaxed text-timbul-dark">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Reveal>

            {/* View All Questions CTA */}
            <Reveal delay={200} className="pt-2">
              <Link
                href={faqHomeSection.ctaHref}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#835c43] px-6 py-3 font-semibold text-white transition-all duration-300 ease-out hover:scale-105 hover:bg-[#6f4e37] hover:shadow-lg"
              >
                <span className="relative z-10">{faqHomeSection.ctaLabel}</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>
          </div>

        </div>
      </div>

    </section>
  );
}
