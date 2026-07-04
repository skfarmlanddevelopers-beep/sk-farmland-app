import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  type?: 'typing' | 'words' | 'characters';
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export default function AnimatedText({
  text,
  type = 'typing',
  className = '',
  delay = 0,
  duration = 0.5,
  once = false,
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.1 });

  // For words animation
  const words = text.split(' ');
  // For characters/typing animation
  const characters = Array.from(text);

  if (type === 'words') {
    return (
      <span ref={ref} className={`inline-block ${className}`}>
        <span className="sr-only">{text}</span>
        <motion.span
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            visible: {
              transition: {
                staggerChildren: duration / Math.max(1, words.length),
                delayChildren: delay,
              },
            },
            hidden: {},
          }}
          aria-hidden="true"
          className="inline-block"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: 'easeOut' },
                },
              }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </motion.span>
      </span>
    );
  }

  // default to typing/characters
  return (
    <span ref={ref} className={`inline-block ${className}`}>
      <span className="sr-only">{text}</span>
      <motion.span
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          visible: {
            transition: {
              staggerChildren: duration / Math.max(1, characters.length),
              delayChildren: delay,
            },
          },
          hidden: {},
        }}
        aria-hidden="true"
        className="inline-block"
      >
        {characters.map((char, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, display: 'none' },
              visible: { opacity: 1, display: 'inline-block' },
            }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    </span>
  );
}
