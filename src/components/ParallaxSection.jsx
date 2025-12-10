import React, { useRef, useEffect, useState } from 'react';

const ParallaxSection = ({ 
  children, 
  speed = 0.5,
  backgroundImage,
  overlay = false 
}) => {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollPercentage = (rect.top + rect.height) / (window.innerHeight + rect.height);
        const newOffset = (1 - scrollPercentage) * 100 * speed;
        setOffset(newOffset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div 
      ref={sectionRef}
      className="parallax-section"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {backgroundImage && (
        <div 
          className="parallax-background"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '120%',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            transform: `translateY(${offset}px)`,
            willChange: 'transform',
            zIndex: -1,
          }}
        />
      )}
      
      {overlay && (
        <div 
          className="parallax-overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 0,
          }}
        />
      )}
      
      <div 
        className="parallax-content"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;