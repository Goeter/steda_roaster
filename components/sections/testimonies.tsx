'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

type Testimony = {
  id: number;
  name: string;
  rating: number;
  avatar: string;
  text: string;
};

export function Testimonies() {
  const [index, setIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);

  const testimonies: Testimony[] = [
    {
      id: 1,
      name: 'Santi Minato',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?img=32',
      text: 'Pelayanan sangat memuaskan, kualitas produk benar-benar premium.',
    },
    {
      id: 2,
      name: 'Heru Jaya',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?img=12',
      text: 'Pengalaman luar biasa, desain elegan dan pelayanan cepat.',
    },
    {
      id: 3,
      name: 'Jaya Wijaya',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?img=45',
      text: 'Sangat profesional dan detail.',
    },
    {
      id: 4,
      name: 'Dewi Lestari',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?img=25',
      text: 'Produk berkualitas tinggi dengan pelayanan ramah.',
    },
  ];

  const paginate = useCallback((dir: number) => {
    setIndex((prev) => (prev + dir + testimonies.length) % testimonies.length);
  }, [testimonies.length]);

  // AUTO SLIDE (OPTIMIZED)
  useEffect(() => {
    if (isHover) return;

    const interval = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHover, paginate]);

  const getVisible = () => {
    const prev = (index - 1 + testimonies.length) % testimonies.length;
    const next = (index + 1) % testimonies.length;

    return [
      { ...testimonies[prev], pos: -1 },
      { ...testimonies[index], pos: 0 },
      { ...testimonies[next], pos: 1 },
    ];
  };

  const visible = getVisible();

  return (
    <section
      id="testimonies"
      className="py-28 relative overflow-hidden bg-gradient-to-br from-[#020617] via-[#0f172a] to-black"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* BACKGROUND GLOW (ringan, no lag) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-amber-400 blur-[120px] -top-32 -left-32" />
        <div className="absolute w-[400px] h-[400px] bg-yellow-300 blur-[120px] -bottom-32 -right-32" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Real stories from our happy customers.
          </p>
        </div>

        {/* CAROUSEL */}
        <div className="relative flex justify-center items-center h-[420px]">

          {visible.map((item) => {
            const isCenter = item.pos === 0;

            return (
              <motion.div
                key={item.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                  if (info.offset.x > 80) paginate(-1);
                  if (info.offset.x < -80) paginate(1);
                }}
                animate={{
                  x: item.pos * 320,
                  scale: isCenter ? 1 : 0.85,
                  opacity: isCenter ? 1 : 0.5,
                  rotateY: item.pos * -20,
                  zIndex: isCenter ? 10 : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 180,
                  damping: 18,
                }}
                className="absolute cursor-grab active:cursor-grabbing"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* CARD */}
                <div className="w-[320px] p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative">

                  {/* Highlight center */}
                  {isCenter && (
                    <div className="absolute inset-0 rounded-3xl border border-amber-400/40 pointer-events-none" />
                  )}

                  <Quote className="absolute top-4 right-4 text-amber-400 opacity-30" />

                  {/* AVATAR */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        loading="lazy"
                        className="w-20 h-20 rounded-full object-cover border-2 border-amber-400"
                      />
                      <div className="absolute inset-0 rounded-full border border-amber-300 opacity-40 animate-pulse" />
                    </div>

                    <p className="mt-4 text-white font-semibold">
                      {item.name}
                    </p>
                    <p className="text-sm text-neutral-400">
                      {item.rating}/5 Rating
                    </p>
                  </div>

                  {/* STARS */}
                  <div className="flex justify-center gap-1 mb-4">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* TEXT */}
                  <p className="text-neutral-200 text-center text-sm leading-relaxed">
                    "{item.text}"
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* BUTTON */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 p-3 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:scale-110 transition"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={() => paginate(1)}
            className="absolute right-0 p-3 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:scale-110 transition"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
