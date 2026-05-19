import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const cities = [
  { name: 'Aceh', color: 'bg-red-500' },
  { name: 'Jabodetabek', color: 'bg-yellow-400' },
  { name: 'Solo', color: 'bg-green-600' },
  { name: 'Surabaya', color: 'bg-blue-900' },
  { name: 'Madura', color: 'bg-rose-600' },
  { name: 'Malang', color: 'bg-lime-500' },
  { name: 'Bondowoso', color: 'bg-purple-600' },
  { name: 'Bali', color: 'bg-orange-500' },
  { name: 'Kalimantan Tengah', color: 'bg-pink-600' },
  { name: 'Kalimantan Timur', color: 'bg-amber-800' },
  { name: 'NTT', color: 'bg-black' },
  { name: 'Jayapura', color: 'bg-neutral-700' },
];

export function Distribution() {
  return (
    <section id="distribution" className="bg-[#eef8ff] py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          {/* LEFT: MAP + LEGEND */}
          <div className="w-full">
            {/* MAP IMAGE - NO BORDER */}
            <div className="relative aspect-[16/7.8] w-full overflow-hidden">
              <Image
                src="/gambar_peta.png"
                alt="Distribution map Steda Roaster"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-contain object-center"
                priority
              />
            </div>

            {/* CITY LEGEND */}
            <div className="mt-3">
              <h3 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-slate-700">
                Keterangan
              </h3>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
                {cities.map((city) => (
                  <div key={city.name} className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 shrink-0 rounded-full ${city.color}`}
                    />
                    <span className="text-[10px] font-bold uppercase tracking-wide text-slate-700 sm:text-[11px]">
                      {city.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: CONTENT */}
          <div className="w-full">
            <div className="max-w-xl lg:ml-auto">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-amber-700">
                Distribution
              </p>

              <h2 className="text-3xl font-black leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl">
                Mesin <span className="text-yellow-500">Steda</span> Roaster
                sudah tersebar diseluruh Nusantara.
              </h2>

              <p className="mt-5 text-base leading-8 text-neutral-600 sm:text-lg">
                Percayakan kepada kami dalam solusi mesin roasting kopi
                profesional. Mesin Steda Roaster telah digunakan di berbagai
                wilayah Indonesia untuk mendukung kebutuhan roasting kopi.
              </p>

              <div className="mt-7">
                <Button
                  asChild
                  className="group h-12 rounded-full bg-neutral-900 px-7 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-600/25"
                >
                  <Link href="/products">
                    Explore Products
                    <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
