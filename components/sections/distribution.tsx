import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Distribution() {
  return (
    <section id="distribution" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-amber-100 bg-amber-50 shadow-lg">
            <Image src="/map.jpg" alt="Distribution map Steda Roaster" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">Distribution</p>
            <h2 className="text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
              Mesin <span className="text-amber-700">Steda Roaster</span> sudah tersebar di seluruh Nusantara.
            </h2>
            <p className="mt-5 text-lg leading-8 text-neutral-600">
              Percayakan kebutuhan mesin roasting kopi Anda kepada tim yang memahami kebutuhan home roastery hingga produksi profesional.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-neutral-600">
              {['Aceh', 'Jabodetabek', 'Solo', 'Surabaya', 'Madura', 'Malang', 'Bondowoso', 'Bali'].map((city) => (
                <div key={city} className="flex items-center gap-3 rounded-full border border-amber-100 bg-amber-50/70 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-600" />
                  <span>{city}</span>
                </div>
              ))}
            </div>

            <Button asChild className="mt-8 rounded-full bg-amber-600 px-7 py-6 text-white hover:bg-amber-700">
              <Link href="/products">Explore Products</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
