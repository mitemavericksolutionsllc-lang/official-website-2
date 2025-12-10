import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const ParallaxSection = ({
  background,
  children,
  height = "120vh",
  parallaxStrength = 80,
}) => {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewport = window.innerHeight;

      // Background parallax
      const parallaxShift = (rect.top / viewport) * parallaxStrength;
      setParallax(parallaxShift);

      // Reveal progress for content
      const center = rect.top + rect.height / 2;
      const distance = Math.abs(viewport / 2 - center);
      const reveal = 1 - distance / viewport;
      setProgress(Math.min(Math.max(reveal, 0), 1));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [parallaxStrength]);

  return (
    <div
      ref={sectionRef}
      style={{
        position: "relative",
        height,
        overflow: "hidden",
      }}
    >
      {/* Background Parallax */}
      <motion.div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          top: parallax,
          left: 0,
          width: "100%",
          height: "130%", // extra height for smooth movement
          zIndex: -1,
        }}
      />

      {/* Foreground Content (cards, text, boxes, objects) */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <motion.div
          style={{
            width: "100%",
            maxWidth: "1000px",
            opacity: progress,
            transform: `translateY(${60 - progress * 60}px)`,
            transition: "all 0.3s ease-out",
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default ParallaxSection;


