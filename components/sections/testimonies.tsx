'use client';

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

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
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonies.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonies.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section
      id="testimonies"
      className="py-28 relative overflow-hidden
      bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617]"
    >
      {/* Glow background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute w-[500px] h-[500px] bg-amber-400 blur-[120px] top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-yellow-300 blur-[120px] bottom-[-100px] right-[-100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
            Real experiences from our valued customers who trust our quality and service.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {testimonies.map((testimony, index) => (
                <div
                  key={testimony.id}
                  className="min-w-full flex justify-center px-4"
                >
                  <div
                    className={`
                      w-[380px] p-10 rounded-3xl relative
                      backdrop-blur-xl border
                      transition-all duration-700
                      bg-white/10 border-white/20
                      shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                      ${index === currentIndex
                        ? 'scale-100 opacity-100'
                        : 'scale-90 opacity-50'}
                    `}
                  >
                    {/* Quote icon */}
                    <Quote className="absolute top-6 right-6 text-amber-400 opacity-30" size={40} />

                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimony.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className="fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-neutral-200 leading-relaxed mb-6">
                      "{testimony.text}"
                    </p>

                    {/* Name */}
                    <div>
                      <p className="font-semibold text-white text-lg">
                        {testimony.name}
                      </p>
                      <p className="text-sm text-neutral-400">
                        {testimony.rating}/5 Rating
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2
            p-3 rounded-full
            bg-white/10 backdrop-blur-md
            border border-white/20
            text-white
            hover:scale-110 hover:bg-white/20
            transition"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2
            p-3 rounded-full
            bg-white/10 backdrop-blur-md
            border border-white/20
            text-white
            hover:scale-110 hover:bg-white/20
            transition"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
