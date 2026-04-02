'use client';

import { MessageCircle } from 'lucide-react';

export function FloatingWhatsAppButton() {
  const handleClick = () => {
    const message = encodeURIComponent('Halo, saya ingin bertanya tentang produk Steda Roaster');
    const phoneNumber = '6281225171359';
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center animate-soft-pulse"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={28} />
    </button>
  );
}
