'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      id: 1,
      question: 'Apa itu mesin roasting kopi?',
      answer:
        'Mesin roasting kopi adalah peralatan yang digunakan untuk memanggang biji kopi mentah (green beans) hingga mencapai tingkat kematangan yang diinginkan, mengubah warna dan cita rasa kopi.',
    },
    {
      id: 2,
      question: 'Berapa kapasitas mesin roasting Steda?',
      answer:
        'Steda menawarkan berbagai kapasitas mulai dari 200 gram untuk home roaster hingga 20 kg untuk medium roastery, sesuai dengan kebutuhan bisnis Anda.',
    },
    {
      id: 3,
      question: 'Apa garansi yang diberikan?',
      answer:
        'Semua produk Steda Roaster dilengkapi dengan garansi 1 tahun dan dukungan teknis penuh untuk memastikan mesin Anda berfungsi optimal.',
    },
    {
      id: 4,
      question: 'Bagaimana cara menghubungi customer service?',
      answer:
        'Anda dapat menghubungi kami melalui WhatsApp di +62 812 2517 1359 atau email ke info@stedaroaster.com untuk pertanyaan dan dukungan teknis.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-faq relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center">
          
          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>

            <p className="text-foreground/70 mb-8">
              Temukan jawaban untuk pertanyaan umum tentang produk dan layanan Steda Roaster.
            </p>

            {/* ACCORDION */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="border border-primary rounded-lg overflow-hidden bg-white shadow-sm"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-6 py-4 flex justify-between items-center hover:bg-primary/5 transition-colors"
                  >
                    <h3 className="font-semibold text-foreground text-left">
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
                    <div className="px-6 py-4 bg-primary/5 border-t border-primary">
                      <p className="text-foreground/80 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* BUTTON SEE DETAILS FAQs */}
            <div className="mt-8 flex justify-center lg:justify-start">
              <Link
                href="/faqs"
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full 
                bg-gradient-to-r from-primary to-orange-500 text-white font-semibold overflow-hidden
                transition-all duration-300 ease-out
                hover:scale-105 hover:shadow-xl"
              >
                {/* Shimmer Effect */}
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 
                  bg-gradient-to-r from-transparent via-white/30 to-transparent 
                  animate-shimmer"
                ></span>

                <span className="relative z-10">See Details FAQs</span>

                <span className="relative z-10 transform transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center lg:justify-end items-center mt-8 lg:mt-0">
            <div
              className="relative w-full max-w-sm lg:max-w-md aspect-square 
              bg-gradient-to-br from-primary/20 to-primary/5 
              rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl"
            >
              <img
                src="/product-faq.jpg"
                alt="Coffee Machine"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
