import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const cities = [
  {
    name: 'Aceh',
    color: 'bg-red-500',
    text: 'text-red-700',
    border: 'border-red-200',
    bg: 'bg-red-50',
  },
  {
    name: 'Jabodetabek',
    color: 'bg-yellow-400',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
    bg: 'bg-yellow-50',
  },
  {
    name: 'Solo',
    color: 'bg-green-600',
    text: 'text-green-700',
    border: 'border-green-200',
    bg: 'bg-green-50',
  },
  {
    name: 'Surabaya',
    color: 'bg-orange-500',
    text: 'text-orange-700',
    border: 'border-orange-200',
    bg: 'bg-orange-50',
  },
  {
    name: 'Madura',
    color: 'bg-purple-600',
    text: 'text-purple-700',
    border: 'border-purple-200',
    bg: 'bg-purple-50',
  },
  {
    name: 'Malang',
    color: 'bg-blue-950',
    text: 'text-blue-950',
    border: 'border-blue-200',
    bg: 'bg-blue-50',
  },
  {
    name: 'Bondowoso',
    color: 'bg-pink-600',
    text: 'text-pink-700',
    border: 'border-pink-200',
    bg: 'bg-pink-50',
  },
  {
    name: 'Bali',
    color: 'bg-black',
    text: 'text-neutral-900',
    border: 'border-neutral-300',
    bg: 'bg-neutral-50',
  },
  {
    name: 'Kalimantan Tengah',
    color: 'bg-pink-500',
    text: 'text-pink-700',
    border: 'border-pink-200',
    bg: 'bg-pink-50',
  },
  {
    name: 'Kalimantan Timur',
    color: 'bg-amber-800',
    text: 'text-amber-800',
    border: 'border-amber-200',
    bg: 'bg-amber-50',
  },
  {
    name: 'Papua',
    color: 'bg-neutral-700',
    text: 'text-neutral-700',
    border: 'border-neutral-300',
    bg: 'bg-neutral-50',
  },
];

export function Distribution() {
  return (
    <section id="distribution" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
              Distribution
            </p>

            <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
              Mesin <span className="text-amber-700">Steda Roaster</span> sudah tersebar di seluruh Nusantara.
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-neutral-600">
              Percayakan kebutuhan mesin roasting kopi Anda kepada tim yang memahami kebutuhan home roastery hingga produksi profesional.
            </p>
          </div>

          <div className="relative w-full overflow-hidden rounded-3xl border border-amber-100 bg-neutral-50 shadow-lg">
            <div className="relative aspect-[1920/768] w-full">
              <Image
                src="/gambar_peta.png"
                alt="Distribution map Steda Roaster"
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3 lg:grid-cols-4">
            {cities.map((city) => (
              <div
                key={city.name}
                className={`flex items-center gap-3 rounded-full border px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${city.border} ${city.bg}`}
              >
                <span className={`h-3 w-3 shrink-0 rounded-full ${city.color}`} />
                <span className={`font-semibold ${city.text}`}>{city.name}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              className="rounded-full bg-amber-600 px-7 py-6 text-white hover:bg-amber-700"
            >
              <Link href="/products">Explore Products</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
