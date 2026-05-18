'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { AboutUs } from '@/components/sections/about-us';
import { Benefits } from '@/components/sections/benefits';
import { Testimonies } from '@/components/sections/testimonies';
import { Button } from '@/components/ui/button';
import { Eye, CheckCircle, Target } from 'lucide-react';
import { Footer } from '@/components/sections/footer';
import { FloatingWhatsAppButton } from '@/components/floating-whatsapp-button';

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#fdfaf6] text-gray-800">
        {/* ================= HERO SECTION ================= */}
        <section className="relative h-[60vh] md:h-[70vh] lg:h-[75vh] w-full flex items-center justify-center text-center overflow-hidden">
          <Image
            src="/company-roaster.png"
            alt="Steda Roaster Company"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/55" />

          {/* Hero Content */}
          <div className="relative z-10 px-4 max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              About Steda Roaster
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200">
              Crafting Precision Coffee Roasting Machines for Professionals Around
              the World.
            </p>
          </div>
        </section>

        {/* ================= ABOUT US ================= */}
        <AboutUs showCta={false} />

        {/* ================= VISION & MISSION ================= */}
        <section className="py-24 bg-gradient-to-b from-[#fdfaf6] to-[#f5efe6]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-[#3e2723]">
                Vision & Mission
              </h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Our guiding principles that drive innovation, quality, and
                excellence in every coffee roasting machine we produce.
              </p>
              <div className="w-24 h-1 bg-[#6d4c41] mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Vision */}
              <div className="relative bg-white/80 backdrop-blur-lg border border-white/40 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-full bg-[#3e2723] text-white shadow-md">
                    <Eye size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#3e2723]">
                    Our Vision
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Menjadi pemimpin global dalam industri mesin roasting kopi
                  melalui inovasi, kualitas, dan teknologi berstandar
                  internasional.
                </p>
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#f5efe6] rounded-bl-full opacity-50"></div>
              </div>

              {/* Mission */}
              <div className="relative bg-gradient-to-br from-[#3e2723] to-[#6d4c41] text-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-full bg-white text-[#3e2723] shadow-md">
                    <Target size={28} strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="mt-1" />
                    <span>Menghadirkan mesin roasting berkualitas tinggi.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="mt-1" />
                    <span>Mendukung pertumbuhan industri kopi global.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="mt-1" />
                    <span>Menyediakan layanan profesional dan terpercaya.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="mt-1" />
                    <span>Mengembangkan inovasi berbasis teknologi modern.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= BENEFITS ================= */}
        <Benefits />

        {/* ================= TESTIMONIES ================= */}
        <Testimonies />

        {/* ================= CALL TO ACTION ================= */}
        <section className="py-20 bg-gradient-to-r from-[#3e2723] to-[#6d4c41] text-white">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Discover Our Premium Coffee Roasters
            </h2>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Explore our range of precision-engineered roasting machines
              designed to elevate your coffee business to the next level.
            </p>

            <Link href="/products">
              <Button className="bg-white text-[#3e2723] hover:bg-gray-200 px-8 py-6 text-lg font-semibold rounded-full shadow-lg transition duration-300">
                View Our Products
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Floating WhatsApp Button */}
      <FloatingWhatsAppButton />

      {/* Footer */}
      <Footer />
    </>
  );
}
