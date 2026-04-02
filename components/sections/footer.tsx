'use client';

import { Mail, MapPin, Phone, Instagram } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-footer border-t border-primary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1 - Brand */}
          <div className="space-y-4">
            <div>
              <span className="text-lg font-bold">
                <span className="text-primary">STEDA</span>
                <span className="text-white ml-1">ROASTER</span>
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Precision Coffee Roasting Machine for Modern Businesses.
            </p>
            <p className="text-white/50 text-xs">
              © {currentYear} STEDA Roaster. All rights reserved.
            </p>
          </div>

          {/* Column 2 - Navigation */}
          <div>
            <h4 className="font-bold text-white mb-4">Navigasi</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#product" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Product
                </a>
              </li>
              <li>
                <a href="#benefits" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Benefits
                </a>
              </li>
              <li>
                <a href="#faq" className="text-white/70 hover:text-primary transition-colors text-sm">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h4 className="font-bold text-white mb-4">Hubungi Kami</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+6281225171359"
                  className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors text-sm"
                >
                  <Phone size={16} />
                  +62 812 2517 1359
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@stedaroaster.com"
                  className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors text-sm"
                >
                  <Mail size={16} />
                  info@stedaroaster.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-white/70 text-sm">
                  <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                  <span>Jakarta, Indonesia</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4 - Follow Us */}
          <div>
            <h4 className="font-bold text-white mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/coffeeroaster_steda/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 text-white hover:text-primary transition-all duration-300 hover:-translate-y-0.5"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
