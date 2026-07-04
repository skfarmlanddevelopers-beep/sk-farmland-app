import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';

interface AutoSlidingBannerProps {
  onClose: () => void;
}

export default function AutoSlidingBanner({ onClose }: AutoSlidingBannerProps) {
  const [index, setIndex] = useState(0);

  const lines = [
    { text: "350 Acres Premium Farmland — Anekal Thalli Road", isLink: false },
    { text: "New Launch: SK Banyan Echoes — Sikkanapalli", isLink: false },
    { text: "Enquire Now on WhatsApp for More Details", isLink: true }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % lines.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent("Hi SK Farmland Developers, I am interested in knowing more about the massive 350-acre new launch project at Anekal Thalli Road. Please share pricing and details.");
    window.open(`https://wa.me/917411131002?text=${message}`, '_blank');
  };

  return (
    <motion.div
      id="auto-sliding-banner-wrapper"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-[#080808] border-b border-orange-500/20 text-zinc-300 select-none overflow-hidden shrink-0"
    >
      <div className="mx-auto max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8 py-2 relative flex items-center justify-between gap-4">
        {/* Left balance spacer on desktop */}
        <div className="hidden md:block w-6" />

        {/* Sliding Content */}
        <div className="flex-grow flex items-center justify-center min-h-[20px] overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex items-center gap-2 text-center"
            >
              <Sparkles size={11} className="text-orange-500 shrink-0 animate-pulse" />
              
              {lines[index].isLink ? (
                <button
                  onClick={handleWhatsAppRedirect}
                  className="text-[9px] sm:text-xs font-semibold uppercase tracking-wider text-orange-400 hover:text-orange-350 hover:underline cursor-pointer flex items-center gap-1.5"
                >
                  {lines[index].text}
                </button>
              ) : (
                <span className="text-[9px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-350">
                  {lines[index].text}
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Close trigger button */}
        <button
          onClick={onClose}
          className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer active:scale-95 shrink-0"
          aria-label="Dismiss sliding banner"
        >
          <X size={13} className="stroke-[2]" />
        </button>
      </div>
    </motion.div>
  );
}
