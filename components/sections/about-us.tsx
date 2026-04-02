'use client';

import { Button } from '@/components/ui/button';

export function AboutUs() {
  return (
    <section
      id="about"
      className="py-20 relative overflow-hidden"
    >
      {/* 🎨 Base Soft Elegant Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8f3ed] via-[#fdfaf6] to-[#f5efe6]" />

      {/* 🧵 Batik Jogja Pattern (Parang Style - Super Halus) */}
      <div
        className="absolute inset-0 opacity-[0.07] bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='160' height='160' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%238b6f47' stroke-width='1.2'%3E%3Cpath d='M0 80 Q40 40 80 80 T160 80'/%3E%3Cpath d='M0 120 Q40 80 80 120 T160 120'/%3E%3Cpath d='M0 40 Q40 0 80 40 T160 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* ✨ Gold Soft Accent */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-amber-300/20 blur-[120px] rounded-full" />

      {/* 📦 Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* 🎥 Video */}
          <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-xl border border-amber-200">
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
              <h2 className="text-4xl font-bold text-[#3e2f25] mb-3 leading-tight">
                Kenapa Harus Memilih Steda Roaster?
              </h2>
              <p className="text-[#5c4634]/80 text-lg leading-relaxed">
                Sudah lebih dari 5 tahun, kami terus melakukan inovasi dan bekerja sama dengan para ahli roaster kopi terbaik di industri ini.
              </p>
            </div>

            <p className="text-[#5c4634]/80 leading-relaxed">
              Semua produk kami dibuat dengan standar internasional dan didesain khusus untuk memenuhi kebutuhan dan kualitas dari para profesional seperti Anda.
            </p>

            <Button
              className="bg-[#8b6f47] text-white hover:bg-[#6f5638] px-8 py-3 font-semibold transition-all duration-300 hover:-translate-y-1 shadow-md"
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
