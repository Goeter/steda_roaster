'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import type { SiteSettings } from '@/lib/cms-types';
import { NAVIGATION_ITEMS } from '@/lib/navigation';
import { splitBrandName } from '@/lib/site';

type NavbarProps = {
  siteSettings: Pick<SiteSettings, 'siteName'>;
};

export function Navbar({ siteSettings }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuItems = NAVIGATION_ITEMS;
  const brandParts = splitBrandName(siteSettings.siteName);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed left-0 top-0 z-[999] w-full transition-all duration-500 ${
        scrolled
          ? 'bg-black/60 py-2 shadow-[0_4px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      {/* Bottom accent line */}
      <div
        className={`absolute inset-x-0 bottom-0 h-px transition-opacity duration-500 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="h-full w-full animate-nav-accent bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex-shrink-0">
            <span className="cursor-pointer text-lg font-extrabold tracking-wide">
              <span className="animate-brand-glow text-yellow-400 transition-all duration-300 group-hover:text-yellow-300">
                {brandParts.highlight.toUpperCase()}
              </span>
              {brandParts.rest && (
                <span className="ml-1 text-white/90 transition-colors duration-300 group-hover:text-white">
                  {brandParts.rest.toUpperCase()}
                </span>
              )}
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;

              if (isActive) {
                return (
                  <span
                    key={item.href}
                    aria-current="page"
                    className="animate-nav-pill relative cursor-default rounded-full bg-yellow-400/15 px-4 py-1.5 text-sm font-bold tracking-wide text-yellow-400 backdrop-blur-sm"
                  >
                    {item.label}
                  </span>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide text-white/80 transition-all duration-300 hover:bg-white/[0.06] hover:text-yellow-400"
                >
                  {item.label}
                  <span className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 rounded-full bg-gradient-to-r from-yellow-400/80 to-amber-300/40 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              );
            })}
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors duration-300 hover:bg-white/10"
              aria-label="Toggle Menu"
              aria-expanded={isOpen}
            >
              <span
                className={`absolute transition-all duration-300 ${
                  isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                }`}
              >
                <Menu size={24} />
              </span>

              <span
                className={`absolute transition-all duration-300 ${
                  isOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                }`}
              >
                <X size={24} />
              </span>
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
            isOpen ? 'mt-4 max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-1 rounded-2xl border border-amber-400/15 bg-black/70 p-3 shadow-2xl shadow-black/20 backdrop-blur-2xl">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href;

              if (isActive) {
                return (
                  <span
                    key={item.href}
                    aria-current="page"
                    className="flex items-center gap-3 rounded-xl bg-yellow-400/10 px-4 py-3 text-sm font-bold tracking-wide text-yellow-400"
                    style={{
                      transitionDelay: `${index * 60}ms`,
                      animation: isOpen ? `revealUp 400ms cubic-bezier(0.22,1,0.36,1) ${index * 60}ms both` : 'none',
                    }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                    {item.label}
                  </span>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold tracking-wide text-white/80 transition-all duration-300 hover:bg-white/[0.06] hover:text-yellow-400"
                  style={{
                    animation: isOpen ? `revealUp 400ms cubic-bezier(0.22,1,0.36,1) ${index * 60}ms both` : 'none',
                  }}
                >
                  <span className="h-1 w-1 rounded-full bg-white/30" />
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
