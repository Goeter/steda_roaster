'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'News', href: '/news' },
    { label: 'FAQs', href: '/faqs' },
  ];

  // Efek perubahan navbar saat scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menutup menu mobile saat berpindah halaman
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md bg-black/70 shadow-lg py-2'
          : 'bg-gradient-to-r from-black via-neutral-900 to-black py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-lg font-bold tracking-wide cursor-pointer">
              <span className="text-yellow-400">STEDA</span>
              <span className="ml-1 text-white">ROASTER</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;

              // Menu aktif tidak dapat diklik
              if (isActive) {
                return (
                  <span
                    key={item.href}
                    aria-current="page"
                    className="text-sm font-semibold text-yellow-400 cursor-not-allowed relative"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400"></span>
                  </span>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-white hover:text-yellow-400 transition-all duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white relative w-8 h-8 flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              <span
                className={`absolute transition-all duration-300 ${
                  isOpen ? 'rotate-45 opacity-0' : 'rotate-0 opacity-100'
                }`}
              >
                <Menu size={26} />
              </span>
              <span
                className={`absolute transition-all duration-300 ${
                  isOpen ? 'rotate-0 opacity-100' : '-rotate-45 opacity-0'
                }`}
              >
                <X size={26} />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-gradient-to-b from-neutral-900 to-black rounded-xl border border-yellow-400/20 shadow-xl p-4 space-y-2">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href;

              // Menu aktif tidak dapat diklik
              if (isActive) {
                return (
                  <span
                    key={item.href}
                    aria-current="page"
                    className="block px-3 py-2 rounded-md text-base font-semibold text-yellow-400 bg-yellow-400/10 cursor-not-allowed"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    ✓ {item.label}
                  </span>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-yellow-400/10 hover:text-yellow-400 transition-all duration-300 transform hover:translate-x-1"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
