'use client';

import { Button } from '@/components/ui/button';

export function Distribution() {
  return (
    <section id="distribution" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Map */}
          <div className="flex justify-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/foto%20map-2D4vFavPx2de5FKlD6pnBDKGbHGWgs.png"
              alt="Distribution Map"
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Right - Content */}
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Mesin <span className="text-primary">Steda</span> Roaster sudah tersebar diseluruh Nusantara.
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              Percayakan kepada kami dalam solusi mesin roasting kopi profesional.
            </p>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="text-sm text-foreground/70">
                <p className="font-semibold text-foreground mb-3">KETERANGAN:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>ACEH</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <span>JABODETABEK</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>SOLO</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-900"></div>
                    <span>SURABAYA</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-foreground/70">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-800"></div>
                    <span>MADURA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span>MALANG</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                    <span>BONDOWOSO</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-600"></div>
                    <span>BALI</span>
                  </div>
                </div>
              </div>
            </div>

            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3">
              EXPLORE PRODUCTS
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
