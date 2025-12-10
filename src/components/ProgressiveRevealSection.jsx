import React from 'react';
import { motion } from 'framer-motion';

const ProgressiveRevealSection = ({ children, id, delay = 0 }) => {
  return (
    <motion.div
      id={id}
      className="scroll-trigger"
      initial={{ 
        opacity: 0, 
        y: 50,
        scale: 0.95 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        scale: 1 
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.215, 0.61, 0.355, 1]
      }}
      style={{
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </motion.div>
  );
};

export default ProgressiveRevealSection;