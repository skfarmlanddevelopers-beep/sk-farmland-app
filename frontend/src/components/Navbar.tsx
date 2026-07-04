import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Calendar, Sparkles, Phone } from 'lucide-react';
import { createPortal } from 'react-dom';
import { PageId } from '../types';
import Logo from './Logo';
import logoTextImg from '../assets/logo-text.png';

interface NavbarProps {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  onBookClick: () => void;
}

export default function Navbar({ activePage, setActivePage, onBookClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Lock background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'projects', label: 'Projects' },
    { id: 'managed', label: 'Managed Farmland' },
    { id: 'plain', label: 'Plain Land' },
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
      className="relative z-40 w-full bg-black/95 backdrop-blur-xl border-b border-white/5 shadow-2xl transition-all duration-500"
    >
      <div className="mx-auto max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          
          {/* Mobile / Tablet Logo Component (Hidden on Desktop) */}
          <div
            id="header-mobile-logo-container"
            onClick={() => handleNavClick('home')}
            className="cursor-pointer group flex lg:hidden items-center"
          >
            <Logo className="w-13 h-13" showText={true} centerText={true} />
          </div>

          {/* Desktop Navigation - Center Logo Layout */}
          <div className="hidden lg:flex w-full items-center justify-between">
            
            {/* FAR LEFT LOGO (Square only) */}
            <div
              onClick={() => handleNavClick('home')}
              className="cursor-pointer group flex items-center pr-2 xl:pr-4"
            >
              <Logo className="w-11 h-11 xl:w-13 xl:h-13" showText={false} />
            </div>

            {/* Left Menu */}
            <nav 
              id="desktop-nav-left" 
              className="flex-1 flex justify-end items-center gap-1 xl:gap-2 pr-4 xl:pr-8"
              onMouseLeave={() => setHoveredItem(null)}
            >
              {menuItems.filter(i => ['home', 'projects', 'about'].includes(i.id)).map((item) => {
                const isActive = activePage === item.id;
                const isHovered = hoveredItem === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    className={`relative px-3 py-2 rounded-lg text-[11px] xl:text-[13px] 2xl:text-[14px] font-bold tracking-wider uppercase transition-all duration-500 cursor-pointer whitespace-nowrap ${
                      isActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-zinc-400 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    
                    {/* Subtle Hover Pill */}
                    {isHovered && (
                      <motion.div
                        layoutId="navHoverPillLeft"
                        className="absolute inset-0 rounded-lg bg-white/5 z-0"
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    )}

                    {/* Sleek Active Glow Underline */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabUnderlineLeft"
                        className="absolute bottom-0 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_10px_rgba(255,255,255,0.8)] z-0"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Center Logo (TEXT ONLY) */}
            <div
              id="header-center-logo"
              onClick={() => handleNavClick('home')}
              className="cursor-pointer group flex flex-col items-center justify-center shrink-0 z-50 transform hover:scale-105 transition-transform duration-300 mx-2"
            >
               {/* Elegant Golden Lines connecting the logo */}
               <div className="absolute top-1/2 left-[-40px] w-[30px] h-[1px] bg-gradient-to-r from-transparent to-orange-500/50 hidden xl:block" />
               <div className="absolute top-1/2 right-[-40px] w-[30px] h-[1px] bg-gradient-to-l from-transparent to-orange-500/50 hidden xl:block" />
               
               <img src={logoTextImg} alt="SK Farmland Developers" className="h-[32px] xl:h-[40px] object-contain drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]" />
            </div>

            {/* Right Menu */}
            <nav 
              id="desktop-nav-right" 
              className="flex-1 flex justify-start items-center gap-1 xl:gap-2 pl-4 xl:pl-8"
              onMouseLeave={() => setHoveredItem(null)}
            >
              {menuItems.filter(i => ['gallery', 'contact'].includes(i.id)).map((item) => {
                const isActive = activePage === item.id;
                const isHovered = hoveredItem === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    className={`relative px-3 py-2 rounded-lg text-[11px] xl:text-[13px] 2xl:text-[14px] font-bold tracking-wider uppercase transition-all duration-500 cursor-pointer whitespace-nowrap ${
                      isActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-zinc-400 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    
                    {/* Subtle Hover Pill */}
                    {isHovered && (
                      <motion.div
                        layoutId="navHoverPillRight"
                        className="absolute inset-0 rounded-lg bg-white/5 z-0"
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    )}

                    {/* Sleek Active Glow Underline */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabUnderlineRight"
                        className="absolute bottom-0 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_10px_rgba(255,255,255,0.8)] z-0"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Menu Button (Universal) */}
          <div id="main-menu-trigger" className="flex items-center ml-2 lg:ml-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-400 hover:text-orange-500 hover:bg-zinc-900 rounded-lg transition-all cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Universal Right-Side Navigation Drawer */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                key="drawer-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
              />
              
              {/* Drawer */}
              <motion.div
                key="drawer-panel"
                id="navigation-drawer"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-[280px] sm:w-[350px] bg-[#070707] border-l border-zinc-900 shadow-2xl z-[9999] flex flex-col"
              >
                {/* Close Header */}
                <div className="flex justify-between items-center p-5 sm:p-6 border-b border-zinc-900/50">
                  <span className="text-white font-bold tracking-widest text-sm uppercase">Menu</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 -mr-2 text-zinc-400 hover:text-orange-500 hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Menu Items */}
                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
                  {menuItems.filter(item => item.id !== 'contact').map((item) => {
                    const isActive = activePage === item.id;
                    return (
                      <button
                        key={item.id}
                        id={`drawer-nav-link-${item.id}`}
                        onClick={() => {
                          handleNavClick(item.id);
                          setIsOpen(false);
                        }}
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
                </div>

                {/* CTA */}
                <div className="p-4 sm:p-6 border-t border-zinc-900/60 mt-auto">
                  <button
                    id="drawer-cta-contact"
                    onClick={() => {
                      setIsOpen(false);
                      handleNavClick('contact');
                    }}
                    className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl shadow-[0_4px_15px_rgba(249,115,22,0.2)] cursor-pointer"
                  >
                    <Phone size={14} />
                    Contact
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
}
