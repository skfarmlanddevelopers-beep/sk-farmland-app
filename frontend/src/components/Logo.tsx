import { motion } from 'motion/react';
import logoImg from '../assets/logo.jpg';
import logoTextImg from '../assets/logo-text.png';

interface LogoProps {
  className?: string;
  showText?: boolean;
  animate?: boolean;
  centerText?: boolean;
  size?: 'nav' | 'loader';
}

export default function Logo({ className = '', showText = true, animate = false, centerText = false, size = 'nav' }: LogoProps) {
  
  // Define dimensions to maintain original logo aspect ratio (approx 3:2)
  const sizeClasses = size === 'loader'
    ? 'w-[150px] h-[100px] sm:w-[180px] sm:h-[120px] rounded-xl border-2' 
    : 'w-[66px] h-[44px] md:w-[87px] md:h-[58px] rounded-md border';

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <motion.div 
      id="sk-logo-wrapper" 
      className="flex items-center gap-5 select-none cursor-pointer"
      initial="initial"
      whileHover="hover"
      animate="animate"
      variants={containerVariants}
    >
      {/* Rectangular outer container matching original logo aspect ratio */}
      <motion.div
        id="sk-logo-image-container"
        className={`relative overflow-hidden border-amber-500/35 shadow-[0_0_15px_rgba(245,158,11,0.12)] bg-black shrink-0 ${sizeClasses}`}
        variants={{
          initial: { rotate: 0, scale: 1 },
          hover: { rotate: 2, scale: 1.05 }
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 14 }}
      >
        <img
          src={logoImg}
          alt="SK Farmland Developers"
          className="w-full h-full object-cover"
        />
        {/* Shimmering glass light reflection overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0"
          variants={{
            initial: { x: '-100%', y: '-100%' },
            hover: { x: '100%', y: '100%' }
          }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
        />
      </motion.div>

      {showText && (
        <motion.div
          id="sk-logo-text"
          className={`flex items-center justify-center select-none pt-1 ${centerText ? 'absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0' : ''}`}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
        >
          <img
            src={logoTextImg}
            alt="SK Farmland Developers"
            className="h-[40px] md:h-[54px] w-auto object-contain"
          />
        </motion.div>
      )}
    </motion.div>
  );
}
