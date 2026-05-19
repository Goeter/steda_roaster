'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { heroSlides } from '@/lib/cms-data';

export function Hero() {
  const [currentBg, setCurrentBg] = useState(0);
  const [progress, setProgress] = useState(0);

  const startX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const slideDuration = 8000;

  const goToSlide = (index: number) => {
    setCurrentBg(index);
    setProgress(0);
  };

  const goToNextSlide = () => {
    setCurrentBg((prev) => (prev + 1) % heroSlides.length);
    setProgress(0);
  };

  const goToPrevSlide = () => {
    setCurrentBg((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setProgress(0);
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      goToNextSlide();
    }, slideDuration);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const progressInterval = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 100 / (slideDuration / 100);
      });
    }, 100);

    return () => window.clearInterval(progressInterval);
  }, []);

  const handleSeeProducts = () => {
    document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDragStart = (clientX: number) => {
    startX.current = clientX;
    isDragging.current = true;
  };

  const handleDragEnd = (clientX: number) => {
    if (!isDragging.current || startX.current === null) return;

    const diff = startX.current - clientX;
    const minSwipeDistance = 50;

    if (diff > minSwipeDistance) {
      goToNextSlide();
    }

    if (diff < -minSwipeDistance) {
      goToPrevSlide();
    }

    startX.current = null;
    isDragging.current = false;
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full cursor-grab items-center overflow-hidden active:cursor-grabbing"
      onMouseDown={(event) => handleDragStart(event.clientX)}
      onMouseUp={(event) => handleDragEnd(event.clientX)}
      onMouseLeave={(event) => {
        if (isDragging.current) handleDragEnd(event.clientX);
      }}
      onTouchStart={(event) => handleDragStart(event.touches[0].clientX)}
      onTouchEnd={(event) => handleDragEnd(event.changedTouches[0].clientX)}
    >
      {heroSlides.map((slide, index) => (
        <Image
          key={slide.id}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={index === 0}
          sizes="100vw"
          draggable={false}
          className={`pointer-events-none select-none object-cover transition-opacity duration-1000 ${
            index === currentBg ? 'opacity-100' : 'opacity-0'
          }`}
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
            Produsen mesin roasting kopi untuk kebutuhan skala kecil hingga industri,
            dirancang presisi untuk mendukung pertumbuhan bisnis kopi Anda.
          </p>

          <Button
            onClick={handleSeeProducts}
            className="group mt-8 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 px-8 py-6 text-base font-semibold text-white shadow-lg shadow-amber-500/30 transition-all duration-300 hover:scale-105 hover:from-amber-500 hover:via-orange-500 hover:to-amber-600 hover:shadow-xl hover:shadow-amber-500/40 active:scale-95"
          >
            <span className="flex items-center gap-2">
              See Products
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 overflow-hidden rounded-full transition-all duration-300 ${
              index === currentBg
                ? 'w-8 bg-white/30'
                : 'w-1.5 bg-white/40 hover:bg-white/70'
            }`}
          >
            {index === currentBg && (
              <span
                className="block h-full rounded-full bg-amber-400 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
