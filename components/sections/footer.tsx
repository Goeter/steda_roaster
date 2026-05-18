'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, Instagram } from 'lucide-react';
import { FaFacebookF, FaTiktok } from 'react-icons/fa';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialClass =
    "group relative p-3 rounded-full bg-white/10 text-white transition-all duration-300 hover:-translate-y-1";

  const iconClass =
    "relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110";

  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'News', href: '/news' },
    { label: 'FAQs', href: '/faqs' },
  ];

  const socialLinks = {
    instagram: 'https://www.instagram.com/coffeeroaster_steda/',
    facebook: 'https://www.facebook.com/share/1AyEXiREzL/?mibextid=wwXIfr',
    tiktok: 'https://www.tiktok.com/@stedaroaster?_r=1&_t=ZS-95Y6Wmj912D',
  };

  return (
    <footer id="contact" className="bg-[#0f172a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold tracking-wide">
              <span className="text-amber-400">STEDA</span>
              <span className="text-white ml-1">ROASTER</span>
            </h3>
            <p className="text-white/70 text-sm">
              Precision Coffee Roasting Machine for Modern Businesses.
            </p>
            <p className="text-white/50 text-xs">
              © {currentYear} STEDA Roaster. All rights reserved.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-amber-400 transition-colors duration-300 text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:+6281225171359"
                  className="flex items-center gap-2 text-white/70 hover:text-amber-400 transition-colors duration-300"
                >
                  <Phone size={16} />
                  +62 812 2517 1359
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@stedaroaster.com"
                  className="flex items-center gap-2 text-white/70 hover:text-amber-400 transition-colors duration-300"
                >
                  <Mail size={16} />
                  info@stedaroaster.com
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/TwcEPir1WrDrryfAA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-white/70 hover:text-amber-400 transition-colors duration-300"
                >
                  <MapPin size={16} className="mt-0.5" />
                  Sidoarjo, Indonesia
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-bold text-white mb-4">Follow Us</h4>
            <div className="flex gap-4">

              {/* Instagram */}
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={`${socialClass} hover:shadow-[0_0_20px_rgba(238,42,123,0.5)]`}
              >
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]" />
                <div className={iconClass}>
                  <Instagram size={20} />
                </div>
              </a>

              {/* Facebook */}
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={`${socialClass} hover:shadow-[0_0_20px_rgba(24,119,242,0.5)]`}
              >
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition bg-[#1877F2]" />
                <div className={iconClass}>
                  <FaFacebookF size={18} />
                </div>
              </a>

              {/* TikTok */}
              <a
                href={socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className={`${socialClass} hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]`}
              >
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition bg-gradient-to-tr from-[#00f2ea] via-black to-[#ff0050]" />
                <div className={iconClass}>
                  <FaTiktok size={18} />
                </div>
              </a>

            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
