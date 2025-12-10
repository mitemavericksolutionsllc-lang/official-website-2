import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const MultiLayerParallax = ({
  background,
  midground,
  foreground,
  children,
  height = "120vh",
  strengthBG = 40,
  strengthMid = 80,
  strengthFG = 120,
}) => {
  const sectionRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [bgShift, setBgShift] = useState(0);
  const [midShift, setMidShift] = useState(0);
  const [fgShift, setFgShift] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewport = window.innerHeight;

      // Smooth parallax
      setBgShift((rect.top / viewport) * strengthBG);
      setMidShift((rect.top / viewport) * strengthMid);
      setFgShift((rect.top / viewport) * strengthFG);

      // Content reveal progress
      const center = rect.top + rect.height / 2;
      const distance = Math.abs(viewport / 2 - center);
      const reveal = 1 - distance / viewport;
      setProgress(Math.min(Math.max(reveal, 0), 1));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [strengthBG, strengthMid, strengthFG]);

  return (
    <div
      ref={sectionRef}
      style={{
        position: "relative",
        height,
        overflow: "hidden",
      }}
    >
      {/* BACKGROUND LAYER */}
      <motion.div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          top: bgShift,
          left: 0,
          width: "100%",
          height: "140%",
          zIndex: 1,
        }}
      />

      {/* MIDGROUND LAYER */}
      <motion.div
        style={{
          backgroundImage: `url(${midground})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "absolute",
          top: midShift,
          left: 0,
          width: "100%",
          height: "130%",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* FOREGROUND LAYER */}
      <motion.div
        style={{
          backgroundImage: `url(${foreground})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "absolute",
          top: fgShift,
          left: 0,
          width: "100%",
          height: "130%",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      {/* CONTENT AREA (cards, boxes, text) */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
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
            opacity: progress,
            transform: `translateY(${60 - 60 * progress}px)`,
            transition: "all 0.35s ease-out",
            width: "100%",
            maxWidth: "1100px",
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default MultiLayerParallax;
