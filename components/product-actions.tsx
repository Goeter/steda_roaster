'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Share2 } from 'lucide-react';

export function ProductActions({
  title,
}: {
  title: string;
}) {
  const router = useRouter();

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert('Link copied');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="absolute top-3 left-3 right-3 z-20 flex justify-between lg:hidden">
      
      {/* BACK */}
      <button
        onClick={() => router.back()}
        className="h-10 w-10 flex items-center justify-center rounded-full bg-black/60 backdrop-blur text-white shadow active:scale-95"
      >
        <ArrowLeft size={18} />
      </button>

      {/* SHARE */}
      <button
        onClick={handleShare}
        className="h-10 w-10 flex items-center justify-center rounded-full bg-black/60 backdrop-blur text-white shadow active:scale-95"
      >
        <Share2 size={18} />
      </button>
    </div>
  );
}
