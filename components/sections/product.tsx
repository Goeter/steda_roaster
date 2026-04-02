'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Product() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    {
      id: 1,
      name: 'Small Batch',
      category: 'SE 200 Series',
      description: 'Solusi Roaster Kapasitas 200 gram untuk Home Roaster',
      image: '/product-1.jpg',
    },
    {
      id: 2,
      name: 'Home Roastery',
      category: 'MRE Series',
      description: 'Mesin Roasting Kopi Kapasitas 1kg untuk Home Roasting',
      image: '/product-2.jpg',
    },
    {
      id: 3,
      name: 'Small Roastery',
      category: 'SR5 Series',
      description: 'Mesin Roasting Kopi Kapasitas 5kg untuk Small Roastery',
      image: '/product-3.jpg',
    },
    {
      id: 4,
      name: 'Medium Roastery',
      category: 'SRG5 Series',
      description: 'Mesin Roasting Kopi Kapasitas 20kg untuk Medium Roasting',
      image: '/product-4.jpg',
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  return (
    <section id="product" className="py-20 relative overflow-hidden">
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#fffaf5] via-[#fdf6ec] to-[#f7efe5]" />

        {/* Mega Mendung Style */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(180,140,60,0.15) 0%, transparent 40%),
              radial-gradient(circle at 80% 70%, rgba(180,140,60,0.12) 0%, transparent 45%),
              radial-gradient(circle at 50% 50%, rgba(180,140,60,0.08) 0%, transparent 60%)
            `,
          }}
        />

        {/* Batik Geometric Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                rgba(120,90,40,0.08) 0px,
                rgba(120,90,40,0.08) 2px,
                transparent 2px,
                transparent 12px
              ),
              repeating-linear-gradient(
                -45deg,
                rgba(120,90,40,0.06) 0px,
                rgba(120,90,40,0.06) 2px,
                transparent 2px,
                transparent 14px
              )
            `,
          }}
        />

        {/* Glow Accent */}
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-amber-200/20 blur-[120px] -translate-x-1/2" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-16 w-full">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Explore Our Coffee Machine
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Kami menawarkan berbagai jenis mesin roasting kopi yang dapat memenuhi kebutuhan rumah kopi sampai profesional.
          </p>
        </div>

        {/* ================= DESKTOP GRID ================= */}
        <div className="hidden md:grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white/80 backdrop-blur-md rounded-xl overflow-hidden border border-amber-100 hover:border-amber-400 transition-all duration-300 shadow-lg hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="h-48 bg-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="text-sm font-semibold text-amber-600 mb-2">
                  {product.category}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {product.description}
                </p>

                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                  See Detail
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* ================= MOBILE CAROUSEL ================= */}
        <div className="md:hidden w-full max-w-xs">
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {products.map((product) => (
                  <div key={product.id} className="w-full flex-shrink-0">
                    <div className="bg-white/80 backdrop-blur-md rounded-xl overflow-hidden border border-amber-100 shadow-lg">
                      
                      <div className="h-48 bg-gray-100 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-6">
                        <div className="text-sm font-semibold text-amber-600 mb-2">
                          {product.category}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {product.description}
                        </p>

                        <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                          See Detail
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nav Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-10 p-2 rounded-full bg-amber-600 text-white"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-10 p-2 rounded-full bg-amber-600 text-white"
            >
              <ChevronRight size={20} />
            </button>

            {/* Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? 'bg-amber-600' : 'bg-amber-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12 w-full">
          <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 font-semibold shadow-lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
