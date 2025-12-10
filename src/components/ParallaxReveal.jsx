import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const ParallaxReveal = ({
  src,
  alt,
  intensity = 50,       // how strong the parallax effect is
  startScale = 1.2,      // starts zoomed in slightly
  endScale = 1,          // ends at normal scale
  fadeIn = true,
  lift = true,           // image floats up slightly when centered
  liftAmount = 25
}) => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewport = window.innerHeight;

      // Reveal progress (0 → 1)
      const center = rect.top + rect.height / 2;
      const distance = Math.abs(viewport / 2 - center);
      const visible = 1 - distance / viewport;
      const clampedProgress = Math.min(Math.max(visible, 0), 1);
      setProgress(clampedProgress);

      // Parallax effect based on scroll position
      const parallaxShift = (rect.top / viewport) * intensity;
      setParallax(parallaxShift);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [intensity]);

  // Zoom-out animation
  const scale = startScale - (startScale - endScale) * progress;

  // Lift upward slight effect
  const translateY = lift ? liftAmount - liftAmount * progress : 0;

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        overflow: "hidden",
        position: "relative",
        borderRadius: "16px",
        perspective: "1200px",
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          transform: `
            translateY(${translateY - parallax}px)
            scale(${scale})
          `,
          transition: "transform 0.25s ease-out",
          opacity: fadeIn ? progress : 1,
          filter: `drop-shadow(0 10px 30px rgba(0,0,0,0.25))`,
        }}
      />
    </div>
  );
};

export default ParallaxReveal;
