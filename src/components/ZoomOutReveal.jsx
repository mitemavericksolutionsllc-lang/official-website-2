import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const ZoomOutReveal = ({
  src,
  alt,
  startScale = 1.4,     // starting zoom
  endScale = 1,          // final scale
  fadeIn = true,         // optional fade effect
  shadow = true          // optional shadow animation
}) => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewport = window.innerHeight;

      // how close center of image is to center of screen
      const center = rect.top + rect.height / 2;
      const distance = Math.abs(viewport / 2 - center);

      // 0 → far away   |   1 → fully centered
      const visible = 1 - distance / viewport;
      setProgress(Math.min(Math.max(visible, 0), 1));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // compute zoom-out scale
  const scale = startScale - (startScale - endScale) * progress;

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        overflow: "hidden",
        borderRadius: "14px",
        perspective: "1000px"
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          transform: `scale(${scale})`,
          transition: "transform 0.2s ease-out",
          opacity: fadeIn ? progress : 1,
          filter: shadow
            ? `drop-shadow(0 ${20 - progress * 20}px ${30 - progress * 30}px rgba(0,0,0,0.4))`
            : "none"
        }}
      />
    </div>
  );
};

export default ZoomOutReveal;
