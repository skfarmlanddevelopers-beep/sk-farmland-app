import { Phone, Mail, MapPin, Sparkles } from 'lucide-react';
import { PageId } from '../types';
import Logo from './Logo';

interface FooterProps {
  setActivePage: (page: PageId) => void;
  onBookClick: () => void;
}

export default function Footer({ setActivePage, onBookClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-[#050505] border-t border-zinc-900 pt-16 pb-20 lg:pb-8 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand & Description Column */}
          <div id="footer-brand-column" className="space-y-4">
            <div className="flex items-center">
              <Logo className="w-13 h-13" showText={true} />
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed pt-2">
              Premium, high-yield managed and plain farmland projects near Bengaluru. We simplify farmland investments with clear titles, 24/7 security, and comprehensive legal verification.
            </p>


          </div>

          {/* Quick Links */}
          <div id="footer-links-column" className="space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-[0.3em] text-white font-mono border-l-2 border-orange-500 pl-3">
              Explore Projects
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setActivePage('home')}
                  className="hover:text-orange-500 transition-colors cursor-pointer"
                >
                  Home Screen
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('about')}
                  className="hover:text-orange-500 transition-colors cursor-pointer"
                >
                  About Our Legacy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('managed')}
                  className="hover:text-orange-500 transition-colors cursor-pointer"
                >
                  Managed Farmland Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('projects')}
                  className="hover:text-orange-500 transition-colors cursor-pointer"
                >
                  Active Land Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('journey')}
                  className="hover:text-orange-500 transition-colors cursor-pointer"
                >
                  Your Buying Journey
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('gallery')}
                  className="hover:text-orange-500 transition-colors cursor-pointer"
                >
                  Visual Photo Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Sites */}
          <div id="footer-locations-column" className="space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-[0.3em] text-white font-mono border-l-2 border-orange-500 pl-3">
              Prime Locations
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">🌱</span>
                <span>Anekal Thalli Road towards Hoganekkal Road</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">🌱</span>
                <span>Near Electronic City, Jigani, Chandapur</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">🌱</span>
                <span>Bannerghatta Road, Kanakapura Road & Hosur</span>
              </li>

            </ul>
          </div>

          {/* Get In Touch */}
          <div id="footer-contact-column" className="space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-[0.3em] text-white font-mono border-l-2 border-orange-500 pl-3">
              Direct Contact
            </h4>

            <div className="space-y-3.5 text-xs text-zinc-400">
              <a href="tel:+917411131002" className="flex items-center gap-3 hover:text-orange-500 transition-colors">
                <span className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-orange-500" />
                </span>
                <span>+91 74111 31002</span>
              </a>

              <a href="mailto:info@skfarmlanddevelopers.com" className="flex items-center gap-3 hover:text-orange-500 transition-colors">
                <span className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-orange-500" />
                </span>
                <span>info@skfarmlanddevelopers.com</span>
              </a>

              <div className="flex items-start gap-3">
                <span className="text-orange-500 mt-0.5">
                  <MapPin size={14} />
                </span>
                <span className="leading-relaxed">
                  Office:
                  Gumalpura Anekal thalli road tamilnadu
                </span>
              </div>
            </div>

            {/*  <button
              id="footer-book-visit-btn"
              onClick={onBookClick}
              className="mt-2 w-full flex items-center justify-center gap-2 border border-orange-500/30 text-orange-400 hover:text-white hover:bg-orange-600/10 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-all uppercase cursor-pointer"
            >
              <Sparkles size={11} className="text-orange-500" />
              Book Free Site Visit
            </button> */}
          </div>

        </div>

        {/* Bottom Bar containing legal content requested */}
        <div id="footer-bottom-bar" className="border-t border-zinc-900/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="text-center md:text-left space-y-2">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
              © {currentYear} SK Farmland Developers. All Rights Reserved.
            </p>

            {/* Footer Bottom Links Grouped cleanly on the left to prevent WhatsApp button overlap */}
            <div id="footer-bottom-links" className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1 text-xs text-zinc-500">
              <button
                onClick={() => setActivePage('terms')}
                className="hover:text-orange-500 transition-colors uppercase font-semibold font-mono text-[9px] tracking-wider cursor-pointer"
              >
                Terms & Conditions
              </button>
              <span className="text-zinc-800 text-[9px] font-normal select-none">•</span>
              <button
                onClick={() => setActivePage('privacy')}
                className="hover:text-orange-500 transition-colors uppercase font-semibold font-mono text-[9px] tracking-wider cursor-pointer"
              >
                Privacy Policy
              </button>
              <span className="text-zinc-800 text-[9px] font-normal select-none">•</span>
              <button
                onClick={() => setActivePage('disclaimer')}
                className="hover:text-orange-500 transition-colors uppercase font-semibold font-mono text-[9px] tracking-wider cursor-pointer"
              >
                Disclaimer
              </button>
            </div>

            <p className="text-[9px] text-zinc-600">
              Investment in real estate and agricultural land is subject to market risks. Read all project guidelines before booking.
            </p>
          </div>

          {/* Empty spacer on desktop to balance layout and leave room for floating WhatsApp widget */}
          <div className="hidden md:block w-12" />

        </div>

      </div>
    </footer>
  );
}
