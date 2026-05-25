'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ImageItem, NewsDetailSection } from '@/lib/cms-types';

export function NewsGallery({
  images,
  title,
  labels,
}: {
  images: ImageItem[];
  title: string;
  labels: NewsDetailSection;
}) {
  const galleryImages = images.filter((image) => image.src);
  const safeImages = galleryImages.length > 0 ? galleryImages : [{ src: '/hero-1.jpg', alt: title }];
  const [index, setIndex] = useState(0);
  const current = safeImages[index] ?? safeImages[0];

  const prev = () => setIndex((value) => (value - 1 + safeImages.length) % safeImages.length);
  const next = () => setIndex((value) => (value + 1) % safeImages.length);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-amber-50 shadow-xl">
        <Image src={current.src} alt={current.alt || title} fill priority sizes="(min-width:1024px) 960px, 100vw" className="object-cover" />
        {safeImages.length > 1 && (
          <>
            <button onClick={prev} aria-label={labels.previousImageAriaLabel} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-3 text-white backdrop-blur hover:bg-black/70">
              <ChevronLeft size={20} />
            </button>
            <button onClick={next} aria-label={labels.nextImageAriaLabel} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-3 text-white backdrop-blur hover:bg-black/70">
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-sm text-white">{index + 1}/{safeImages.length}</div>
          </>
        )}
      </div>

      {safeImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {safeImages.map((image, itemIndex) => (
            <button
              key={`${image.src}-${itemIndex}`}
              onClick={() => setIndex(itemIndex)}
              aria-label={`${labels.openImageAriaLabelPrefix} ${itemIndex + 1}`}
              className={`relative h-20 min-w-28 overflow-hidden rounded-2xl border transition ${itemIndex === index ? 'border-amber-600 opacity-100' : 'border-transparent opacity-60 hover:opacity-90'}`}
            >
              <Image src={image.src} alt={image.alt} fill sizes="112px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
