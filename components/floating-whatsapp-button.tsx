'use client';

import { FaWhatsapp } from 'react-icons/fa';
import { siteSettings } from '@/lib/cms-data';

export function FloatingWhatsAppButton() {
  const handleClick = () => {
    const message = encodeURIComponent(siteSettings.whatsappMessage);
    window.open(`https://wa.me/${siteSettings.whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-8 right-8 z-40 group">
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />
      <button
        onClick={handleClick}
        aria-label="Chat with us on WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-[0_0_25px_rgba(37,211,102,0.6)]"
      >
        <FaWhatsapp size={28} className="relative z-10" />
      </button>
    </div>
  );
}
