'use client';

import { Button } from '@/components/ui/button';

export function AboutUs() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-amber-50 via-white to-amber-50 relative overflow-hidden">
      {/* Light batik background accent */}
      <div className="absolute inset-0 opacity-5 bg-repeat" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M50 10 Q60 30 50 50 Q40 30 50 10\' fill=\'%23000\' opacity=\'0.1\'/%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'5\' fill=\'%23000\'/%3E%3Ccircle cx=\'70\' cy=\'70\' r=\'5\' fill=\'%23000\'/%3E%3C/svg%3E")' }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Video */}
          <div className="aspect-video rounded-lg overflow-hidden bg-black">
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

          {/* Right - Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-3 text-balance">
                Kenapa Harus Memilih Steda Roaster?
              </h2>
              <p className="text-foreground/70 text-lg leading-relaxed">
                Sudah lebih dari 5 tahun, kami terus melakukan inovasi dan bekerja sama dengan para ahli roaster kopi terbaik di industri ini.
              </p>
            </div>

            <p className="text-foreground/70 leading-relaxed">
              Semua produk kami dibuat dengan standar internasional dan didesain khusus untuk memenuhi kebutuhan dan kualitas dari para profesional seperti Anda.
            </p>

            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/80 px-8 py-3 font-semibold transition-all duration-300 hover:-translate-y-0.5"
              onClick={() => document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See Detail
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
