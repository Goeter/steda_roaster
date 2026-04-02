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
    <section 
      id="product" 
      className="py-20 bg-product relative overflow-hidden" 
      style={{
        backgroundImage: "url('/path/to/light-batik-texture.jpg')", // path/to/light-batik-texture.jpg should point to the light-batik-texture.jpg texture
        backgroundSize: '400px', // or cover, contain, as you see fit
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16 w-full">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">
            Explore Our Coffee Machine
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Kami menawarkan berbagai jenis mesin roasting kopi yang dapat memenuhi kebutuhan rumah kopi sampai profesional.
          </p>
        </div>

        {/* Products Container with Carousel */}
        <div className="w-full flex flex-col items-center">
          {/* Desktop Grid View */}
          <div className="hidden md:grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden border border-border hover:border-primary transition-all duration-300 group shadow-lg hover:-translate-y-1"
              >
                {/* Product Image */}
                <div className="h-48 bg-secondary overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="text-sm font-semibold text-primary mb-2">
                    {product.category}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-foreground/70 text-sm mb-4">
                    {product.description}
                  </p>
                          <Button
                            variant="outline"
                            className="w-full border-primary/30 text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary"
                          >
                            See Detail
                          </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel View */}
          <div className="md:hidden w-full max-w-xs">
            <div className="relative">
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                  {products.map((product) => (
                    <div key={product.id} className="w-full flex-shrink-0">
                      <div className="bg-white rounded-lg overflow-hidden border border-border hover:border-primary transition-all duration-300 shadow-lg">
                        {/* Product Image */}
                        <div className="h-48 bg-secondary overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-opacity duration-300"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="p-6">
                          <div className="text-sm font-semibold text-primary mb-2">
                            {product.category}
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-2">
                            {product.name}
                          </h3>
                          <p className="text-foreground/70 text-sm mb-4">
                            {product.description}
                          </p>
                          <Button
                            variant="outline"
                            className="w-full border-primary/30 text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary"
                          >
                            See Detail
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 p-2 rounded-full bg-primary text-white hover:bg-primary/80 transition-colors"
                aria-label="Previous product"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 p-2 rounded-full bg-primary text-white hover:bg-primary/80 transition-colors"
                aria-label="Next product"
              >
                <ChevronRight size={24} />
              </button>

              {/* Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-primary' : 'bg-primary/30'
                    }`}
                    aria-label={`Go to product ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12 w-full">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 font-semibold">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
