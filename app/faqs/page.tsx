'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Coffee, Settings, BookOpen, MessageCircle } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/sections/footer';
import { FloatingWhatsAppButton } from '@/components/floating-whatsapp-button';
import { faqCategories } from '@/lib/cms-data';

type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const iconMap = {
    coffee: Coffee,
    settings: Settings,
    bookOpen: BookOpen,
  };

  const categories = faqCategories;

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      <main className="relative min-h-screen pt-32 pb-20 bg-gradient-to-br from-[#f5efe6] via-[#ebe3d5] to-[#d6ccc2] overflow-hidden">
        
        {/* Background Batik Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('/batik-pattern.png')] bg-cover bg-center"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <h1 className="text-3xl md:text-5xl font-bold text-center text-[#3e2723] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-center text-[#5d4037] mb-12">
            Temukan jawaban lengkap mengenai produk dan layanan Steda Roaster.
          </p>

          {/* Category Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {categories.map((category, index) => {
              const Icon = iconMap[category.icon];
              return (
                <button
                  key={index}
                  onClick={() => {
                    setActiveCategory(index);
                    setOpenIndex(null);
                  }}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 border ${
                    activeCategory === index
                      ? 'bg-[#6f4e37] text-white shadow-md'
                      : 'bg-white/70 text-[#4e342e] border-[#d7ccc8] hover:bg-[#efebe9]'
                  }`}
                >
                  <Icon size={18} />
                  {category.title}
                </button>
              );
            })}
          </div>

          {/* Accordion */}
          <div className="space-y-4">
            {categories[activeCategory].faqs.map((faq: FAQItem, index: number) => (
              <div
                key={index}
                className="border border-[#d7ccc8] rounded-xl overflow-hidden bg-white shadow-sm"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-[#f5f5f5] transition"
                >
                  <h3 className="font-semibold text-left text-[#3e2723]">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 text-[#6f4e37] ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 py-4 bg-[#faf7f2] border-t border-[#d7ccc8] text-[#5d4037]">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center">
            <p className="text-lg font-medium text-[#4e342e] mb-4">
              Ingin bertanya lebih lanjut?
            </p>
            <a
              href="https://wa.me/6281225171359"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#6f4e37] text-white font-semibold hover:bg-[#5d4037] transition shadow-md"
            >
              <MessageCircle size={18} />
              Hubungi Kami
            </a>
          </div>

          {/* Back to Home Button */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-block px-8 py-3 rounded-full font-semibold text-white bg-[#3e2723] hover:bg-[#2f1b16] transition shadow-md"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>

       {/* Floating WhatsApp Button */}
      <FloatingWhatsAppButton />

      {/* Footer */}
      <Footer />
    </>
  );
}
