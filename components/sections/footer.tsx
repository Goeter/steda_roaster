'use client';

import Link from 'next/link';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { FaFacebookF, FaTiktok } from 'react-icons/fa';
import type { FooterSection, SiteSettings } from '@/lib/cms-types';
import { NAVIGATION_ITEMS } from '@/lib/navigation';
import { formatPhoneNumber, getWhatsappHref } from '@/lib/site';

const socialClass =
  'group relative rounded-full bg-white/10 p-3 text-white transition-all duration-300 hover:-translate-y-1';

const iconClass =
  'relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110';

type FooterProps = {
  footerSection: FooterSection;
  siteSettings: SiteSettings;
};

export function Footer({ footerSection, siteSettings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const phoneLabel = formatPhoneNumber(siteSettings.phoneNumber);
  const whatsappHref = getWhatsappHref(siteSettings);

  return (
    <footer id="contact" className="border-t border-white/10 bg-[#140E0A]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-extrabold tracking-widest">
                <span className="text-amber-400">STEDA</span>
                <span className="ml-1.5 text-white">ROASTER</span>
              </span>
              <span className="text-[10px] font-medium tracking-[0.2em] text-white/70">
                SPECIALIST ROASTERY MACHINES
              </span>
            </div>
            <p className="text-sm text-white/70">{footerSection.description}</p>
            <p className="text-xs text-white/50">
              © {currentYear} {siteSettings.siteName}. {footerSection.copyright}
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">{footerSection.navigationTitle}</h4>
            <ul className="space-y-2">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors duration-300 hover:text-amber-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">{footerSection.contactTitle}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/70 transition-colors duration-300 hover:text-amber-400"
                >
                  <Phone size={16} />
                  {phoneLabel}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="flex items-center gap-2 text-white/70 transition-colors duration-300 hover:text-amber-400"
                >
                  <Mail size={16} />
                  {siteSettings.email}
                </a>
              </li>
              <li>
                <a
                  href={siteSettings.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-white/70 transition-colors duration-300 hover:text-amber-400"
                >
                  <MapPin size={16} className="mt-0.5" />
                  {siteSettings.address}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">{footerSection.socialTitle}</h4>
            <div className="flex gap-4">
              {siteSettings.socials.instagram && (
                <a
                  href={siteSettings.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className={`${socialClass} hover:shadow-[0_0_20px_rgba(238,42,123,0.5)]`}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] opacity-0 transition group-hover:opacity-100" />
                  <div className={iconClass}>
                    <Instagram size={20} />
                  </div>
                </a>
              )}

              {siteSettings.socials.facebook && (
                <a
                  href={siteSettings.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className={`${socialClass} hover:shadow-[0_0_20px_rgba(24,119,242,0.5)]`}
                >
                  <div className="absolute inset-0 rounded-full bg-[#1877F2] opacity-0 transition group-hover:opacity-100" />
                  <div className={iconClass}>
                    <FaFacebookF size={18} />
                  </div>
                </a>
              )}

              {siteSettings.socials.tiktok && (
                <a
                  href={siteSettings.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className={`${socialClass} hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]`}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00f2ea] via-black to-[#ff0050] opacity-0 transition group-hover:opacity-100" />
                  <div className={iconClass}>
                    <FaTiktok size={18} />
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
