'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Share2 } from 'lucide-react';
import type { ProductDetailSection } from '@/lib/cms-types';

type ProductActionsProps = {
  title: string;
  labels: ProductDetailSection;
};

export function ProductActions({ title, labels }: ProductActionsProps) {
  const router = useRouter();

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert(labels.shareCopiedMessage);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="absolute left-3 right-3 top-3 z-20 flex justify-between lg:hidden">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label={labels.backAriaLabel}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white shadow backdrop-blur active:scale-95"
      >
        <ArrowLeft size={18} />
      </button>

      <button
        type="button"
        onClick={handleShare}
        aria-label={labels.shareAriaLabel}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white shadow backdrop-blur active:scale-95"
      >
        <Share2 size={18} />
      </button>
    </div>
  );
}
