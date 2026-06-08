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
      className={`fixed left-0 top-0 z-[999] w-full transition-all duration-300 ${
        scrolled
          ? 'bg-black/75 py-2 shadow-lg backdrop-blur-md'
          : 'bg-gradient-to-r from-black via-neutral-900 to-black py-4'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <span className="cursor-pointer text-lg font-extrabold tracking-wide drop-shadow-sm">
              <span className="text-yellow-400">{brandParts.highlight.toUpperCase()}</span>
              {brandParts.rest && (
                <span className="ml-1 text-white">{brandParts.rest.toUpperCase()}</span>
              )}
            </span>
          </Link>

          <div className="hidden items-center space-x-9 md:flex">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;

              if (isActive) {
                return (
                  <span
                    key={item.href}
                    aria-current="page"
                    className="relative cursor-not-allowed text-base font-extrabold tracking-wide text-yellow-400 drop-shadow-sm"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-yellow-400" />
                  </span>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative text-base font-bold tracking-wide text-white drop-shadow-sm transition-all duration-300 hover:text-yellow-400"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-yellow-400 transition-all duration-300 group-hover:w-full" />
                </Link>
              );
            })}
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="relative flex h-8 w-8 items-center justify-center text-white"
              aria-label="Toggle Menu"
              aria-expanded={isOpen}
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

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            isOpen ? 'mt-4 max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-2 rounded-xl border border-yellow-400/20 bg-gradient-to-b from-neutral-900 to-black p-4 shadow-xl">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href;

              if (isActive) {
                return (
                  <span
                    key={item.href}
                    aria-current="page"
                    className="block rounded-md bg-yellow-400/10 px-3 py-2.5 text-base font-extrabold tracking-wide text-yellow-400"
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
                  className="block rounded-md px-3 py-2.5 text-base font-bold tracking-wide text-white transition-all duration-300 hover:translate-x-1 hover:bg-yellow-400/10 hover:text-yellow-400"
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
