import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';
type AnimationType = 'fade' | 'slide' | '3d-flip-x' | '3d-flip-y' | 'scale';

interface AnimatedRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  type?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export default function AnimatedReveal({
  children,
  direction = 'up',
  type = 'slide',
  delay = 0,
  duration = 0.7,
  className = '',
  threshold = 0.1,
  once = false,
}: AnimatedRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const getVariants = () => {
    // Base hidden state
    let hidden: any = { opacity: 0 };
    // Base visible state
    let visible: any = { opacity: 1 };

    if (type === 'slide') {
      if (direction === 'up') hidden.y = 50;
      if (direction === 'down') hidden.y = -50;
      if (direction === 'left') hidden.x = -50;
      if (direction === 'right') hidden.x = 50;
      
      visible.x = 0;
      visible.y = 0;
    }

    if (type === 'scale') {
      hidden.scale = 0.8;
      visible.scale = 1;
    }

    if (type === '3d-flip-x') {
      hidden.rotateX = 60;
      hidden.y = 30;
      visible.rotateX = 0;
      visible.y = 0;
    }

    if (type === '3d-flip-y') {
      hidden.rotateY = 60;
      hidden.x = direction === 'left' ? -30 : direction === 'right' ? 30 : 0;
      visible.rotateY = 0;
      visible.x = 0;
    }

    return { hidden, visible };
  };

  const variants = getVariants();

  return (
    <div ref={ref} className={className} style={{ perspective: type.includes('3d') ? '1000px' : 'none' }}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{
          duration: duration,
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1], // Custom premium ease-out cubic bezier
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
