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

      <div className="mt-20 bg-gradient-to-r from-[#3a2115] via-[#5a351f] to-[#2b1b12] py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 lg:flex-row lg:text-left lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-200">Need Consultation?</p>
            <h3 className="mt-3 text-3xl font-bold">Want to buy Steda Roaster products?</h3>
            <p className="mt-3 max-w-2xl text-white/75">Konsultasikan kapasitas, kebutuhan produksi, dan tipe mesin terbaik untuk bisnis kopi Anda.</p>
          </div>
          <Button asChild className="rounded-full bg-amber-500 px-8 py-6 font-semibold text-white hover:bg-amber-400">
            <a href="https://wa.me/6281225171359?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20produk%20Steda%20Roaster" target="_blank" rel="noopener noreferrer">
              Contact via WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
