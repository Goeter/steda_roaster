'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { heroSection } from '@/lib/cms-data';

const SLIDE_DURATION = 8000;
const PROGRESS_INTERVAL = 100;
const MIN_SWIPE_DISTANCE = 50;

export function Hero() {
  const [currentBg, setCurrentBg] = useState(0);
  const [progress, setProgress] = useState(0);

  const startX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const slides = heroSection.slides;

  const resetProgress = () => setProgress(0);

  const goToSlide = (index: number) => {
    setCurrentBg(index);
    resetProgress();
  };

  const goToNextSlide = useCallback(() => {
    setCurrentBg((prev) => (prev + 1) % slides.length);
    resetProgress();
  }, [slides.length]);

  const goToPrevSlide = () => {
    setCurrentBg((prev) => (prev - 1 + slides.length) % slides.length);
    resetProgress();
  };

  useEffect(() => {
    const interval = window.setInterval(goToNextSlide, SLIDE_DURATION);
    return () => window.clearInterval(interval);
  }, [goToNextSlide]);

  useEffect(() => {
    const progressTimer = window.setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 100 / (SLIDE_DURATION / PROGRESS_INTERVAL)));
    }, PROGRESS_INTERVAL);

    return () => window.clearInterval(progressTimer);
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

    if (diff > MIN_SWIPE_DISTANCE) goToNextSlide();
    if (diff < -MIN_SWIPE_DISTANCE) goToPrevSlide();

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
      {slides.map((slide, index) => (
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

      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/25" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="animate-hero-content max-w-2xl text-left">
          <p className="mb-4 inline-flex rounded-full border border-amber-300/40 bg-white/10 px-4 py-2 text-sm font-medium text-amber-100 backdrop-blur">
            {heroSection.eyebrow}
          </p>

          <h1 className="text-balance text-4xl font-bold leading-tight text-amber-100 drop-shadow sm:text-5xl lg:text-6xl">
            {heroSection.heading}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-white/90 sm:text-lg">
            {heroSection.description}
          </p>

          <Button
            onClick={handleSeeProducts}
            className="group mt-8 h-auto rounded-full border border-amber-200/80 bg-amber-100 px-6 py-3 text-sm font-bold text-stone-950 shadow-lg shadow-amber-500/25 transition-all duration-300 hover:scale-[1.03] hover:border-amber-100 hover:bg-white hover:text-stone-950 hover:shadow-xl hover:shadow-amber-300/30 active:scale-95 sm:px-7 sm:py-3.5 sm:text-base"
          >
            <span className="flex items-center gap-2">
              {heroSection.ctaLabel}
              <span className="inline-block animate-[arrowMove_1.2s_ease-in-out_infinite] text-base leading-none sm:text-lg">
                →
              </span>
            </span>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`${heroSection.slideAriaLabelPrefix} ${index + 1}`}
            className={`h-1.5 overflow-hidden rounded-full transition-all duration-300 ${
              index === currentBg ? 'w-8 bg-white/30' : 'w-1.5 bg-white/40 hover:bg-white/70'
            }`}
          >
            {index === currentBg && (
              <span
                className="block h-full rounded-full bg-amber-300 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            )}
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes arrowMove {
          0%,
          100% {
            transform: translateX(0);
          }

          50% {
            transform: translateX(5px);
          }
        }
      `}</style>
    </section>
  );
}
