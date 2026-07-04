import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import logoTextImg from '../assets/logo-text.png';
import Logo from './Logo';


interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Stage 1: Showing logo symbol (0s - 1.2s)
    const t1 = setTimeout(() => setStep(1), 1000);
    // Stage 2: Spacing expansion and branding (1.2s - 2.6s)
    const t2 = setTimeout(() => setStep(2), 2200);
    // Finish loading (3.0s)
    const t3 = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <motion.div
      id="loading-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black select-none"
    >
      <div className="relative flex flex-col items-center">
        {/* Soft Ambient Gold Pulsing Glow behind Logo */}
        <motion.div
          id="loader-pulse-glow"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="absolute w-64 h-64 rounded-full bg-orange-500/5 blur-3xl -translate-y-6"
        />

        {/* Elegant Logo with spring entry */}
        <motion.div
          id="loader-logo-container"
          initial={{ scale: 0.75, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <Logo size="loader" showText={false} />
        </motion.div>

        {/* Luxury Text Logo Image below logo */}
        <motion.div
          id="loader-text-logo-container"
          initial={{ y: 20, opacity: 0 }}
          animate={step >= 1 ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 flex justify-center"
        >
          <img
            src={logoTextImg}
            alt="SK Farmland Developers"
            className="w-[280px] h-auto max-w-[80vw] object-contain"
          />
        </motion.div>



        {/* Minimalist Progress Bar */}
        <div className="absolute bottom-[-60px] w-48 h-[1px] bg-zinc-900 overflow-hidden rounded-full">
          <motion.div
            id="loader-progress-bar"
            initial={{ left: '-100%' }}
            animate={{ left: '100%' }}
            transition={{ duration: 2.6, ease: 'easeInOut' }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-orange-500/70 to-transparent"
          />
        </div>
      </div>
    </motion.div>
  );
}
