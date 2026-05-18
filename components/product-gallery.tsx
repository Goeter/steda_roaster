'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type ProductGalleryProps = {
  images: string[];
  productName: string;
};

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const validImages = images?.filter(Boolean) ?? [];
  const [selectedImage, setSelectedImage] = useState(validImages[0] ?? '');

  const currentIndex = validImages.findIndex((image) => image === selectedImage);

  const handlePrevious = () => {
    if (validImages.length <= 1) return;

    const previousIndex =
      currentIndex <= 0 ? validImages.length - 1 : currentIndex - 1;

    setSelectedImage(validImages[previousIndex]);
  };

  const handleNext = () => {
    if (validImages.length <= 1) return;

    const nextIndex =
      currentIndex >= validImages.length - 1 ? 0 : currentIndex + 1;

    setSelectedImage(validImages[nextIndex]);
  };

  if (!selectedImage) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-[24px] bg-neutral-100 text-sm text-neutral-500">
        No product image available
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="group relative overflow-hidden rounded-[24px] bg-[#f7f5f0]">
        <div className="relative aspect-square w-full">
          <Image
            src={selectedImage}
            alt={productName}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105 sm:p-6"
          />
        </div>

        {validImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevious}
              aria-label="Previous product image"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-md transition hover:bg-white hover:text-amber-700"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next product image"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-md transition hover:bg-white hover:text-amber-700"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {validImages.length > 1 && (
        <div className="relative">
          <div className="flex gap-3 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {validImages.map((image, index) => {
              const isActive = selectedImage === image;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  aria-label={`View ${productName} image ${index + 1}`}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border bg-[#f7f5f0] transition sm:h-24 sm:w-24 ${
                    isActive
                      ? 'border-amber-700 ring-2 ring-amber-700/20'
                      : 'border-neutral-200 hover:border-amber-500'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${productName} ${index + 1}`}
                    fill
                    sizes="96px"
                    className="object-contain p-2"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
