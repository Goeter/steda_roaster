'use client';

import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonies } from '@/lib/cms-data';

export function Testimonies() {
  const [index, setIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);

  const paginate = useCallback((dir: number) => {
    setIndex((prev) => (prev + dir + testimonies.length) % testimonies.length);
  }, []);

  useEffect(() => {
    if (isHover) return;
    const interval = window.setInterval(() => paginate(1), 5000);
    return () => window.clearInterval(interval);
  }, [isHover, paginate]);

  const current = testimonies[index];

  return (
    <section
      id="testimonies"
      className="relative overflow-hidden bg-[#fffdf8] py-24"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_15%_20%,rgba(217,158,83,0.16),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(104,64,34,0.10),transparent_34%)]" />
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(135deg,#6d4c41_1px,transparent_1px),linear-gradient(45deg,#6d4c41_1px,transparent_1px)] bg-[length:28px_28px]" />

      <div className="relative mx-auto max-w-5xl px-4 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">Testimonies</p>
        <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">What Our Customers Say</h2>
        <p className="mx-auto mt-4 max-w-xl text-neutral-600">Cerita pelanggan yang menggunakan Steda Roaster untuk mendukung operasional bisnis kopi mereka.</p>

        <div className="mx-auto mt-12 max-w-3xl rounded-[2rem] border border-amber-100 bg-white/90 p-8 text-left shadow-xl shadow-amber-900/5 backdrop-blur sm:p-10">
          <Quote className="mb-6 h-10 w-10 text-amber-600" />
          <p className="text-lg leading-8 text-neutral-700 sm:text-xl">“{current.text}”</p>
          <div className="mt-8 border-t border-amber-100 pt-6">
            <h3 className="font-bold text-neutral-900">{current.name}</h3>
            <p className="text-sm text-neutral-500">{current.position}</p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button onClick={() => paginate(-1)} className="rounded-full border border-amber-200 bg-white p-3 text-amber-700 shadow-sm hover:bg-amber-50" aria-label="Previous testimony">
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {testimonies.map((item, itemIndex) => (
              <button
                key={item.id}
                onClick={() => setIndex(itemIndex)}
                aria-label={`View testimony from ${item.name}`}
                className={`h-2.5 rounded-full transition-all ${itemIndex === index ? 'w-8 bg-amber-600' : 'w-2.5 bg-amber-200'}`}
              />
            ))}
          </div>
          <button onClick={() => paginate(1)} className="rounded-full border border-amber-200 bg-white p-3 text-amber-700 shadow-sm hover:bg-amber-50" aria-label="Next testimony">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
