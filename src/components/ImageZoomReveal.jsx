import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
 
const ImageZoomReveal = ({ 
  src, 
  alt, 
  maskDirection = 'left',
  zoomIntensity = 0.1 
}) => {
  const imageRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [maskProgress, setMaskProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const elementCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(viewportHeight / 2 - elementCenter);
        const progress = 1 - (distanceFromCenter / viewportHeight);
        
        // Zoom effect
        const newZoom = 1 + (progress * zoomIntensity);
        setZoom(Math.max(1, Math.min(newZoom, 1.2)));
        
        // Mask reveal effect
        setMaskProgress(Math.max(0, Math.min(progress * 1.2, 1)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [zoomIntensity]);

  const maskStyles = {
    left: {
      clipPath: `inset(0 ${100 - maskProgress * 100}% 0 0)`,
    },
    right: {
      clipPath: `inset(0 0 0 ${100 - maskProgress * 100}%)`,
    },
    top: {
      clipPath: `inset(${100 - maskProgress * 100}% 0 0 0)`,
    },
    bottom: {
      clipPath: `inset(0 0 ${100 - maskProgress * 100}% 0)`,
    },
    circle: {
      clipPath: `circle(${maskProgress * 100}% at center)`,
    }
  };

  return (
    <div 
      ref={imageRef}
      className="image-zoom-container"
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '8px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: 'auto',
          transform: `scale(${zoom})`,
          transition: 'transform 0.1s ease-out',
          display: 'block',
        }}
      />
      
      {/* Mask layer for reveal effect */}
      <div 
        className="image-mask"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#1a1a1a',
          transition: 'clip-path 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)',
          ...maskStyles[maskDirection],
        }}
      />
    </div>
  );
};

export default ImageZoomReveal;