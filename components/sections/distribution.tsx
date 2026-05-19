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
    <section id="distribution" className="bg-[#eef8ff] py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:gap-12">
          {/* LEFT: MAP IMAGE */}
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/70">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/gambar_peta.png"
                alt="Distribution map Steda Roaster"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-contain object-center"
                priority
              />
            </div>
          </div>

          {/* RIGHT: CONTENT */}
          <div className="rounded-3xl bg-white/55 p-6 shadow-sm backdrop-blur-sm sm:p-8 lg:bg-transparent lg:p-0 lg:shadow-none">
            <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.28em] text-amber-700">
              Distribution
            </p>

            <h2 className="max-w-xl text-3xl font-black leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl">
              Mesin{' '}
              <span className="text-orange-600">Steda</span>{' '}
              Roaster sudah tersebar diseluruh Nusantara.
            </h2>

            <p className="mt-5 max-w-lg text-base leading-8 text-neutral-600 sm:text-lg">
              Percayakan kepada kami dalam solusi mesin roasting kopi
              profesional.
            </p>

            <div className="mt-7">
              <Button
                asChild
                className="group h-12 rounded-full bg-neutral-900 px-6 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-600/25"
              >
                <Link href="/products">
                  Explore Products
                  <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Button>
            </div>

            {/* CITY LIST / LEGEND */}
            <div className="mt-8">
              <h3 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-slate-700">
                Keterangan
              </h3>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {cities.map((city) => (
                  <div
                    key={city.name}
                    className="group flex items-center gap-3 rounded-full border border-white/80 bg-white/80 px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                  >
                    <span
                      className={`h-3.5 w-3.5 shrink-0 rounded-full shadow-sm ${city.color}`}
                    />
                    <span className="text-sm font-extrabold uppercase tracking-wide text-slate-700">
                      {city.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
