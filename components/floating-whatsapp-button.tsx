'use client';

import { MessageCircle } from 'lucide-react';

export function FloatingWhatsAppButton() {
  const handleClick = () => {
    const message = encodeURIComponent(
      'Halo, saya ingin bertanya tentang produk Steda Roaster'
    );
    const phoneNumber = '6281225171359';
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-8 right-8 z-40">

      {/* Ping Effect (background pulse halus) */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping"></span>

      {/* Button */}
      <button
        onClick={handleClick}
        aria-label="Chat with us on WhatsApp"
        className="group relative w-14 h-14 rounded-full flex items-center justify-center
                   bg-[#25D366] text-white
                   shadow-lg
                   transition-all duration-300
                   hover:-translate-y-1 hover:scale-110
                   hover:shadow-[0_0_25px_rgba(37,211,102,0.6)]"
      >
        {/* Gradient Glow saat hover */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 
                        transition-all duration-500
                        bg-gradient-to-tr from-[#25D366] via-[#128C7E] to-[#075E54]" />

        {/* Icon */}
        <MessageCircle
          size={28}
          className="relative z-10 transition-transform duration-300 group-hover:scale-110"
        />
      </button>
    </div>
  );
}
