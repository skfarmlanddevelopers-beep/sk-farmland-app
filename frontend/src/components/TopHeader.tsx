import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';

interface TopHeaderProps {
  onClose: () => void;
  onActionClick?: () => void;
}

export default function TopHeader({ onClose }: TopHeaderProps) {
  const [index, setIndex] = useState(0);

  const lines = [
    { text: "350 Acres Premium Farmland Project   Towards — Anekal Thalli Road", isLink: false }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % lines.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent("Hi SK Farmland Developers, I'm interested in your premium farmland projects. Please share more details.");
    window.open(`https://wa.me/917411131002?text=${message}`, '_blank');
  };

  return (
    <motion.div
      id="top-announcement-header-wrapper"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="w-full overflow-hidden shrink-0"
    >
      <div
        className="relative z-50 w-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-black py-2 px-4 sm:px-6 lg:px-8 shadow-md select-none border-y-[2px] border-red-600"
      >

        <div className="mx-auto max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] flex items-center justify-between gap-4">

          {/* Empty left spacer on desktop to balance the layout perfectly centering the message */}
          <div className="hidden md:block w-8" />

          {/* Center content with AnimatePresence */}
          <div className="flex-1 flex items-center justify-center min-h-[22px] overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="flex items-center justify-center gap-1.5 text-center w-full"
              >
                <Sparkles size={11} className="fill-current text-black shrink-0 animate-pulse" />

                {lines[index].isLink ? (
                  <motion.button
                    onClick={handleWhatsAppRedirect}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-[10px] sm:text-xs md:text-lg lg:text-xl font-black uppercase tracking-wider text-white transition-transform cursor-pointer flex items-center gap-2 leading-tight"
                    style={{
                      textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 2px 2px 0 #000',
                      fontFamily: 'Impact, "Arial Black", sans-serif'
                    }}
                  >
                    {lines[index].text}
                  </motion.button>
                ) : (
                  <span
                    className="text-[10px] sm:text-xs md:text-lg lg:text-xl font-black uppercase tracking-wider text-white leading-tight"
                    style={{
                      textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 2px 2px 0 #000',
                      fontFamily: 'Impact, "Arial Black", sans-serif'
                    }}
                  >
                    {lines[index].text}
                  </span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Close Button right aligned */}
          <button
            id="close-top-header"
            onClick={onClose}
            aria-label="Dismiss announcement"
            className="p-1 rounded-full text-zinc-950 hover:bg-black/10 transition-colors focus:outline-none focus:ring-2 focus:ring-black/20 cursor-pointer active:scale-90"
          >
            <X size={14} className="stroke-[2.5]" />
          </button>

        </div>
      </div>
    </motion.div>
  );
}
