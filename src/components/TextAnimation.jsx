import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TextAnimation = ({ 
  text, 
  type = 'word',
  animationType = 'fade',
  delay = 0,
  threshold = 0.5 
}) => {
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: '-100px' }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const renderAnimatedText = () => {
    const words = text.split(' ');
    const lines = text.split('\n');
    const letters = text.split('');

    const animations = {
      fade: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 }
      },
      scale: {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 }
      },
      color: {
        initial: { color: '#666' },
        animate: { color: '#ff6b6b' }
      },
      slide: {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0 }
      }
    };

    const animation = animations[animationType] || animations.fade;

    if (type === 'word') {
      return words.map((word, index) => (
        <motion.span
          key={index}
          initial={animation.initial}
          animate={isVisible ? animation.animate : animation.initial}
          transition={{
            duration: 0.6,
            delay: delay + index * 0.05,
            ease: "easeOut"
          }}
          style={{
            display: 'inline-block',
            marginRight: '0.25em',
            fontWeight: isVisible ? 600 : 400,
            transition: 'font-weight 0.3s ease'
          }}
        >
          {word}
        </motion.span>
      ));
    } else if (type === 'line') {
      return lines.map((line, lineIndex) => (
        <div key={lineIndex} style={{ overflow: 'hidden' }}>
          <motion.div
            initial={{ y: '100%' }}
            animate={isVisible ? { y: 0 } : { y: '100%' }}
            transition={{
              duration: 0.8,
              delay: delay + lineIndex * 0.1,
              ease: [0.215, 0.61, 0.355, 1]
            }}
          >
            {line}
          </motion.div>
        </div>
      ));
    } else if (type === 'letter') {
      return letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            duration: 0.3,
            delay: delay + index * 0.02,
            ease: "easeOut"
          }}
          style={{
            display: 'inline-block',
            color: isVisible && animationType === 'color' ? '#ff6b6b' : 'inherit'
          }}
        >
          {letter}
        </motion.span>
      ));
    }
  };

  return (
    <div 
      ref={textRef}
      className="text-animation-container"
      style={{
        fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
        lineHeight: 1.6,
      }}
    >
      {renderAnimatedText()}
    </div>
  );
};

export default TextAnimation;