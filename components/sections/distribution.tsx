import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Distribution() {
  return (
    <section
      id="distribution"
      className="relative overflow-hidden bg-[#edf7ff] py-14 sm:py-16 lg:py-0"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute right-[-120px] top-[-120px] h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-140px] right-[20%] h-96 w-96 rounded-full bg-sky-300/20 blur-3xl" />

      <div className="mx-auto max-w-[1600px]">
        <div className="grid min-h-[620px] grid-cols-1 lg:grid-cols-[1.12fr_0.88fr]">
          {/* LEFT IMAGE */}
          <div className="relative flex items-center justify-center bg-white/35 p-4 sm:p-6 lg:p-0">
            <div className="relative w-full overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)] lg:h-full lg:rounded-none lg:shadow-none">
              <div className="relative aspect-[16/9] w-full lg:h-full lg:aspect-auto">
                <Image
                  src="/gambar_peta.png"
                  alt="Distribution map Steda Roaster"
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover object-center transition duration-700 hover:scale-[1.02]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="relative flex items-center px-5 py-12 sm:px-8 lg:px-16 xl:px-24">
            <div className="max-w-2xl">
              <p className="mb-5 inline-flex rounded-full bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-700 shadow-sm">
                Distribution
              </p>

              <h2 className="text-4xl font-black leading-[1.18] tracking-tight text-black sm:text-5xl lg:text-6xl xl:text-7xl">
                Mesin{' '}
                <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                  Steda
                </span>{' '}
                Roaster sudah tersebar diseluruh Nusantara.
              </h2>

              <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-600 sm:text-xl">
                Percayakan kepada kami dalam solusi mesin roasting kopi
                profesional.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button
                  asChild
                  className="group h-14 rounded-full bg-neutral-900 px-8 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-neutral-900/20 transition hover:-translate-y-1 hover:bg-amber-600 hover:shadow-amber-600/30"
                >
                  <Link href="/products">
                    Explore Products
                    <span className="ml-2 inline-block transition group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </Button>

                <div className="text-sm font-medium text-neutral-500">
                  Tersedia untuk kebutuhan home roastery hingga produksi.
                </div>
              </div>

              {/* MINI STATS */}
              <div className="mt-12 grid grid-cols-3 gap-3 sm:max-w-md">
                <div className="rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur">
                  <div className="text-2xl font-black text-neutral-900">11+</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Wilayah
                  </div>
                </div>

                <div className="rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur">
                  <div className="text-2xl font-black text-neutral-900">ID</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Nusantara
                  </div>
                </div>

                <div className="rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur">
                  <div className="text-2xl font-black text-neutral-900">Pro</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Roasting
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
