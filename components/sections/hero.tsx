'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const [currentBg, setCurrentBg] = useState(0);
  const backgroundImages = [
    '/hero-1.jpg',
    '/hero-2.jpg',
    '/hero-3.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSeeProducts = () => {
    const element = document.getElementById('product');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden flex items-center bg-cover bg-center transition-all duration-1000"
      style={{
        backgroundImage: `url(${backgroundImages[currentBg]})`,
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0 bg-hero" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-start">
        <div className="max-w-2xl text-left">
          <h1 className="text-5xl sm:text-6xl font-bold text-orange-500 mb-6 leading-tight text-balance">
            MESIN ROASTING KOPI BERKUALITAS UNTUK BISNIS ANDA
          </h1>
          <p className="text-lg text-white mb-8 leading-relaxed">
            Produsen mesin roasting kopi untuk kebutuhan skala kecil hingga industri, dirancang presisi untuk mendukung pertumbuhan bisnis kopi Anda.
          </p>
          <Button
            onClick={handleSeeProducts}
            className="bg-primary text-primary-foreground hover:bg-primary/80 px-8 py-6 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5"
          >
            See Products
          </Button>
        </div>
      </div>
    </section>
  );
}
