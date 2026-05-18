'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type ProductGalleryProps = {
  images: string[];
  productName: string;
};

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [index, setIndex] = useState(0);
  const safeImages = images.length > 0 ? images : ['/product-1.jpg'];

  const next = () => setIndex((value) => (value + 1) % safeImages.length);
  const prev = () => setIndex((value) => (value - 1 + safeImages.length) % safeImages.length);

  return (
    <div className="w-full">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] bg-white">
        <Image
          src={safeImages[index]}
          alt={`${productName} image ${index + 1}`}
          fill
          priority={index === 0}
          sizes="(min-width:1024px) 50vw, 100vw"
          className="object-contain transition duration-300"
        />

        {safeImages.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white sm:flex" aria-label="Previous image">
              <ChevronLeft size={18} />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white sm:flex" aria-label="Next image">
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
              {index + 1}/{safeImages.length}
            </div>
          </>
        )}
      </div>

      {safeImages.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {safeImages.map((img, itemIndex) => (
            <button
              key={`${img}-${itemIndex}`}
              onClick={() => setIndex(itemIndex)}
              className={`relative h-[70px] min-w-[70px] overflow-hidden rounded-xl border ${itemIndex === index ? 'border-black opacity-100' : 'border-transparent opacity-70'}`}
              aria-label={`Open ${productName} image ${itemIndex + 1}`}
            >
              <Image src={img} alt={`${productName} thumbnail ${itemIndex + 1}`} fill sizes="70px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
