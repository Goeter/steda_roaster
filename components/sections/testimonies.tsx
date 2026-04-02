'use client';

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export function Testimonies() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonies = [
    {
      id: 1,
      name: 'Santi Minato',
      rating: 5,
      text: 'Pelayanan sangat memuaskan, kualitas produk benar-benar premium. Saya pasti akan kembali lagi.',
    },
    {
      id: 2,
      name: 'Heru Jaya',
      rating: 5,
      text: 'Pengalaman luar biasa, desain elegan dan pelayanan cepat. Sangat direkomendasikan.',
    },
    {
      id: 3,
      name: 'Jaya Wijaya',
      rating: 5,
      text: 'Sangat profesional dan detail. Ini adalah pilihan terbaik untuk kualitas dan kenyamanan.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonies.length]);

  const getVisibleTestimonies = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonies.length;
      visible.push({ ...testimonies[index], position: i });
    }
    return visible;
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonies.length) % testimonies.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonies.length);
  };

  const visibleTestimonies = getVisibleTestimonies();

  return (
    <section
      id="testimonies"
      className="py-24 relative bg-gradient-to-br from-neutral-100 via-white to-neutral-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Real experiences from our valued customers who trust our quality and service.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative px-10">
          <div className="flex justify-center items-center gap-8 min-h-[320px]">
            {visibleTestimonies.map((testimony) => {
              const isCenter = testimony.position === 1;

              return (
                <div
                  key={`${testimony.id}-${testimony.position}`}
                  className={`
                    w-80 p-8 rounded-3xl border transition-all duration-700 ease-in-out
                    bg-white/70 backdrop-blur-md
                    ${isCenter 
                      ? 'scale-105 opacity-100 shadow-2xl border-neutral-200 z-10' 
                      : 'scale-90 opacity-60 shadow-md border-neutral-100'}
                  `}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimony.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-neutral-700 text-sm leading-relaxed mb-6">
                    "{testimony.text}"
                  </p>

                  {/* Name */}
                  <div>
                    <p className="font-semibold text-neutral-900">
                      {testimony.name}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {testimony.rating}/5 Rating
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-md hover:scale-110 transition"
          >
            <ChevronLeft className="text-neutral-700" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-md hover:scale-110 transition"
          >
            <ChevronRight className="text-neutral-700" />
          </button>
        </div>
      </div>
    </section>
  );
}
