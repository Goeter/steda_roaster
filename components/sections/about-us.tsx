'use client';

import { Button } from '@/components/ui/button';

export function AboutUs() {
  return (
    <section
      id="about"
      className="py-20 relative overflow-hidden text-white"
    >
      {/* 🌑 Base Gradient (Coffee Dark Elegant) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a120b] via-[#2c1c14] to-[#0f0a07]" />

      {/* ✨ Gold Glow Accent */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-yellow-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-amber-400/10 blur-[100px] rounded-full" />

      {/* 🧵 Batik Pattern (halus banget) */}
      <div
        className="absolute inset-0 opacity-[0.05] bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1'%3E%3Cpath d='M60 10 Q90 60 60 110 Q30 60 60 10Z'/%3E%3Ccircle cx='30' cy='30' r='6'/%3E%3Ccircle cx='90' cy='90' r='6'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* ☕ Coffee Roaster + Beans Decoration */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M50 150 C20 120, 20 80, 50 60 C80 80, 80 120, 50 150Z'/%3E%3Cpath d='M140 150 C110 120, 110 80, 140 60 C170 80, 170 120, 140 150Z'/%3E%3Crect x='80' y='70' width='40' height='40' rx='8'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* 📦 Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* 🎥 Video */}
          <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-2xl border border-white/10">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/IWxF0VOYymI"
              title="Steda Roaster Introduction"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* 📝 Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold mb-3 leading-tight">
                Kenapa Harus Memilih Steda Roaster?
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                Sudah lebih dari 5 tahun, kami terus melakukan inovasi dan bekerja sama dengan para ahli roaster kopi terbaik di industri ini.
              </p>
            </div>

            <p className="text-white/70 leading-relaxed">
              Semua produk kami dibuat dengan standar internasional dan didesain khusus untuk memenuhi kebutuhan dan kualitas dari para profesional seperti Anda.
            </p>

            <Button
              className="bg-amber-500 text-black hover:bg-amber-400 px-8 py-3 font-semibold transition-all duration-300 hover:-translate-y-1 shadow-lg"
              onClick={() =>
                document
                  .getElementById('product')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              See Detail
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
