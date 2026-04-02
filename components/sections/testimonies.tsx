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
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 2,
      name: 'Heru Jaya',
      rating: 5,
      text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    },
    {
      id: 3,
      name: 'Jaya Wijaya',
      rating: 5,
      text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.',
    },
  ];

  // Auto-advance carousel every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonies.length);
    }, 15000);
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
    <section id="testimonies" className="py-20 bg-testimonies relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-white mb-6 text-balance">
            TESTIMONIALS
          </h2>
          <p className="text-black text-lg max-w-2xl mx-auto">
            Listen directly from our customers about their experiences with our outstanding service. These are real stories from people who have chosen us.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative px-16">
          <div className="flex justify-center items-center gap-6 min-h-80">
            {visibleTestimonies.map((testimony) => {
              const isCenter = testimony.position === 1;
              const opacity = isCenter ? 'opacity-100 shadow-xl' : 'opacity-60 shadow-lg';

              return (
                <div
                  key={`${testimony.id}-${testimony.position}`}
                  className={`flex-shrink-0 w-80 bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 transition-all duration-500 ${opacity}`}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimony.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-primary text-primary"
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-white/90 text-sm mb-6 leading-relaxed">
                    {testimony.text}
                  </p>

                  {/* Name */}
                  <div>
                    <p className="font-semibold text-white text-sm">
                      {testimony.name}
                    </p>
                    <p className="text-primary text-xs font-medium">
                      {testimony.rating}/5
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors z-10"
            aria-label="Previous testimony"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors z-10"
            aria-label="Next testimony"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
