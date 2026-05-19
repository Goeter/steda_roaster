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
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          {/* LEFT SIDE: MAP + LEGEND */}
          <div className="w-full">
            {/* MAP IMAGE */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/gambar_peta.png"
                  alt="Distribution map Steda Roaster"
                  fill
                  sizes="(min-width: 1024px) 54vw, 100vw"
                  className="object-contain object-center"
                  priority
                />
              </div>
            </div>

            {/* CITY LEGEND */}
            <div className="mt-5 rounded-2xl border border-slate-200/80 bg-white/85 p-5 shadow-sm backdrop-blur">
              <h3 className="mb-4 text-base font-black uppercase tracking-[0.18em] text-slate-700">
                Keterangan
              </h3>

              <div className="grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
                {cities.map((city) => (
                  <div key={city.name} className="flex items-center gap-2.5">
                    <span
                      className={`h-3.5 w-3.5 shrink-0 rounded-full ${city.color}`}
                    />
                    <span className="text-xs font-extrabold uppercase tracking-wide text-slate-700 sm:text-sm">
                      {city.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: CONTENT */}
          <div className="w-full">
            <div className="max-w-xl lg:ml-auto">
              <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.28em] text-amber-700">
                Distribution
              </p>

              <h2 className="text-3xl font-black leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl xl:text-6xl">
                Mesin{' '}
                <span className="text-orange-600">Steda</span>{' '}
                Roaster sudah tersebar diseluruh Nusantara.
              </h2>

              <p className="mt-6 text-base leading-8 text-neutral-600 sm:text-lg">
                Percayakan kepada kami dalam solusi mesin roasting kopi
                profesional. Mesin Steda Roaster telah digunakan di berbagai
                wilayah Indonesia untuk mendukung kebutuhan roasting kopi, mulai
                dari home roastery hingga produksi profesional.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
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

                <p className="text-sm font-medium text-neutral-500">
                  Tersedia untuk berbagai kapasitas dan kebutuhan produksi.
                </p>
              </div>

              {/* SMALL INFO CARDS */}
              <div className="mt-10 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/80 bg-white/80 p-4 text-center shadow-sm">
                  <p className="text-xl font-black text-neutral-900">12+</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-neutral-500">
                    Wilayah
                  </p>
                </div>

                <div className="rounded-2xl border border-white/80 bg-white/80 p-4 text-center shadow-sm">
                  <p className="text-xl font-black text-neutral-900">ID</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-neutral-500">
                    Nusantara
                  </p>
                </div>

                <div className="rounded-2xl border border-white/80 bg-white/80 p-4 text-center shadow-sm">
                  <p className="text-xl font-black text-neutral-900">Pro</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-neutral-500">
                    Roasting
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
