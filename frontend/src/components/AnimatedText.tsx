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

  if (type === 'words' || type === 'typing' || type === 'characters') {
    return (
      <span ref={ref} className={`inline ${className}`}>
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
          className="inline"
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
  let charCounter = 0;
  const timePerChar = duration / Math.max(1, characters.length);

  return (
    <span ref={ref} className={`inline ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline">
        {words.flatMap((word, wordIndex) => {
          const wordElement = (
            <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap">
              {Array.from(word).map((char, charIndex) => {
                const currentDelay = delay + charCounter * timePerChar;
                charCounter++;
                return (
                  <motion.span
                    key={`char-${wordIndex}-${charIndex}`}
                    initial={{ opacity: 0, display: 'none' }}
                    animate={isInView ? { opacity: 1, display: 'inline' } : { opacity: 0, display: 'none' }}
                    transition={{ delay: currentDelay }}
                    className="inline"
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          );
          
          charCounter++; // Increment for the space between words
          
          return wordIndex === words.length - 1 
            ? [wordElement]
            : [wordElement, <span key={`space-${wordIndex}`}> </span>];
        })}
      </span>
    </span>
  );
}
