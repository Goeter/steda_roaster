'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function AboutUs() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-20 text-gray-800"
    >
      {/* 🌿 Soft Elegant Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fdfaf6] via-[#f7f1e8] to-[#f3ece2]" />

      {/* ✨ Soft Gold Glow */}
      <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-amber-200/40 blur-[100px]" />
      <div className="absolute bottom-0 right-0 h-[250px] w-[250px] rounded-full bg-yellow-300/30 blur-[90px]" />

      {/* 🧵 Batik Jogja Pattern (Kawung Style - Elegant & Symmetrical) */}
      <div
        className="absolute inset-0 bg-repeat opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23a67c52' stroke-width='1.5'%3E%3Cellipse cx='80' cy='40' rx='20' ry='30'/%3E%3Cellipse cx='80' cy='120' rx='20' ry='30'/%3E%3Cellipse cx='40' cy='80' rx='30' ry='20'/%3E%3Cellipse cx='120' cy='80' rx='30' ry='20'/%3E%3Ccircle cx='80' cy='80' r='6' fill='%23a67c52'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* 📦 Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          
          {/* 🎥 Video Section */}
          <div className="aspect-video overflow-hidden rounded-xl border border-black/10 bg-black shadow-xl">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/IWxF0VOYymI"
              title="Steda Roaster Introduction"
              loading="lazy"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          {/* 📝 Text Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold leading-tight text-gray-900">
                Why Choose Steda Roaster?
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-gray-600">
                Sudah lebih dari 6 tahun, kami terus melakukan inovasi dan bekerja sama dengan para ahli roaster kopi terbaik di industri ini. 
                Baik usaha besar maupun kecil, kami tahu persis apa yang Anda butuhkan dan mengutamakan keinginan Anda.
              </p>
            </div>

            {/* 🔘 Call-to-Action Button */}
            <Button
              asChild
              className="bg-amber-600 px-8 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-amber-500"
            >
              <Link href="/about">View Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
