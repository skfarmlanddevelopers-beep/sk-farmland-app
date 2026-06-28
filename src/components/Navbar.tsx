import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Calendar, Sparkles } from 'lucide-react';
import { PageId } from '../types';
import Logo from './Logo';

interface NavbarProps {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  onBookClick: () => void;
}

export default function Navbar({ activePage, setActivePage, onBookClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'projects', label: 'Projects' },
    { id: 'managed', label: 'Managed Farmland' },
    { id: 'journey', label: 'Your Journey' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'terms', label: 'Terms & Conditions' },
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'disclaimer', label: 'Disclaimer' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: PageId) => {
    setActivePage(id);
    setIsOpen(false);
  };

  return (
    <header
      id="main-header"
      className="relative z-40 w-full bg-black/85 backdrop-blur-md border-b border-zinc-900/80 transition-all duration-300"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          
          {/* Custom Elegant Golden Logo Component */}
          <div
            id="header-logo-container"
            onClick={() => handleNavClick('home')}
            className="cursor-pointer group flex items-center"
          >
            <Logo className="w-13 h-13" showText={true} centerText={true} />
          </div>

          {/* Desktop Navigation */}
          <nav 
            id="desktop-navigation" 
            className="hidden lg:flex items-center gap-0.5 flex-nowrap overflow-x-auto scrollbar-none max-w-[85%]"
            onMouseLeave={() => setHoveredItem(null)}
          >
            {menuItems.map((item) => {
              const isActive = activePage === item.id;
              const isHovered = hoveredItem === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  className={`relative px-1.5 py-1.5 rounded-lg text-[10px] xl:text-[11px] font-bold tracking-wide transition-colors duration-300 cursor-pointer whitespace-nowrap ${
                    isActive ? 'text-orange-500 font-extrabold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Hover Pill Background Slider */}
                  {isHovered && (
                    <motion.div
                      layoutId="navHoverPill"
                      className="absolute inset-0 rounded-lg bg-zinc-900/60 border border-zinc-800/40 z-0"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}

                  {/* Active Tab Glow Capsule Slider */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabCapsule"
                      className="absolute inset-0 rounded-lg bg-orange-500/5 border border-orange-500/20 z-0 shadow-[0_0_15px_rgba(249,115,22,0.05)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA & Booking - Removed to make room for extra links */}

          {/* Mobile Menu Button */}
          <div id="mobile-menu-trigger" className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-400 hover:text-orange-500 hover:bg-zinc-900 rounded-lg transition-all"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation-dropdown"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-zinc-900 bg-[#070707] overflow-hidden"
          >
            <div className="px-4 py-5 space-y-2.5">
              {menuItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-orange-600/10 text-orange-500 border-l-2 border-orange-500 pl-3.5'
                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-zinc-900/60">
                <button
                  id="mobile-cta-book-visit"
                  onClick={() => {
                    setIsOpen(false);
                    onBookClick();
                  }}
                  className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl shadow-[0_4px_15px_rgba(249,115,22,0.2)] cursor-pointer"
                >
                  <Calendar size={14} />
                  Book Site Visit
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
