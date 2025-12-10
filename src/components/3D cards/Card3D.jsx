import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import './Card3D.css';

const Card3D = ({ 
  title = "3D Interactive Card", 
  description = "Hover and scroll to see 3D effects",
  imageUrl = "https://images.unsplash.com/photo-1579546929662-711aa81148cf",
  backgroundColor = "#1a1a1a"
}) => {
  // Refs
  const cardRef = useRef(null);
  const containerRef = useRef(null);
  
  // Mouse position for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Smooth the transforms
  const smoothRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });
  
  // Handle mouse move for 3D tilt
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate mouse position relative to card center
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(x * 20); // Max 20 degrees rotation
    mouseY.set(y * 20);
  };
  
  // Handle mouse leave
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
  // Combined rotations (scroll + mouse)
  const combinedRotateX = useTransform(
    [mouseY, smoothRotateX],
    ([latestMouseY, latestScrollX]) => latestMouseY + latestScrollX
  );
  
  const combinedRotateY = useTransform(
    [mouseX, smoothRotateY],
    ([latestMouseX, latestScrollY]) => latestMouseX + latestScrollY
  );

  return (
    <div ref={containerRef} className="card-3d-container">
      <motion.div
        ref={cardRef}
        className="card-3d"
        style={{
          rotateX: combinedRotateX,
          rotateY: combinedRotateY,
          scale: smoothScale,
          opacity: smoothOpacity,
          backgroundColor,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Card Background Layer */}
        <div className="card-bg-layer" />
        
        {/* Card Content */}
        <div className="card-content">
          {/* Image Container */}
          <div className="card-image-container">
            <motion.img
              src={imageUrl}
              alt={title}
              className="card-image"
              style={{
                scale: useTransform(scrollYProgress, [0, 1], [1.2, 0.8]),
              }}
            />
            {/* Glow effect */}
            <div className="card-glow" />
          </div>
          
          {/* Text Content */}
          <div className="card-text">
            <motion.h3 
              className="card-title"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {title}
            </motion.h3>
            
            <motion.p 
              className="card-description"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {description}
            </motion.p>
            
            {/* Interactive Elements */}
            <motion.div 
              className="card-buttons"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <button className="card-button primary">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore
                </motion.span>
              </button>
              <button className="card-button secondary">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.span>
              </button>
            </motion.div>
          </div>
        </div>
        
        {/* Edge Glow Effects */}
        <div className="card-edge-glow top" />
        <div className="card-edge-glow bottom" />
        <div className="card-edge-glow left" />
        <div className="card-edge-glow right" />
      </motion.div>
    </div>
  );
};

export default Card3D;