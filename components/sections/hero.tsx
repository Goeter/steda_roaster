'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { heroSlides } from '@/lib/cms-data';

export function Hero() {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroSlides.length);
    }, 8000);

    return () => window.clearInterval(interval);
  }, []);

  const handleSeeProducts = () => {
    document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative flex min-h-screen w-full items-center overflow-hidden">
      {heroSlides.map((slide, index) => (
        <Image
          key={slide.id}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={index === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ${index === currentBg ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-left">
          <p className="mb-4 inline-flex rounded-full border border-amber-300/40 bg-white/10 px-4 py-2 text-sm font-medium text-amber-100 backdrop-blur">
            Premium Coffee Roasting Machine
          </p>
          <h1 className="text-balance text-4xl font-bold leading-tight text-amber-100 drop-shadow sm:text-5xl lg:text-6xl">
            Mesin Roasting Kopi Berkualitas untuk Bisnis Anda
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/90 sm:text-lg">
            Produsen mesin roasting kopi untuk kebutuhan skala kecil hingga industri, dirancang presisi untuk mendukung pertumbuhan bisnis kopi Anda.
          </p>
          <Button
            onClick={handleSeeProducts}
            className="mt-8 rounded-full bg-amber-500 px-8 py-6 text-base font-semibold text-white hover:bg-amber-600"
          >
            See Products
          </Button>
        </div>
      </div>
    </section>
  );
}
