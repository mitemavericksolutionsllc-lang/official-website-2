import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const FadeScaleRevealSection = ({ imageSrc }) => {
  const { scrollYProgress } = useScroll();

  // Image scale: small → full size
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);

  // Image opacity: invisible → fully visible
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Text opacity & slide-up effect
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.2, 0.5], [40, 0]);

  return (
    <div className="relative w-full h-[300vh] bg-black">
      {/* Sticky image container */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.img
          src={imageSrc}
          alt="Background Reveal"
          style={{ scale, opacity }}
          className="w-full h-full object-cover"
        />

        {/* Text overlay */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute text-white text-5xl font-bold text-center px-10"
        >
          <h1>Slow Fade-In + Scale-Up Reveal</h1>
          <p className="text-xl mt-4 opacity-80">
            The content appears as long as you scroll
          </p>
        </motion.div>
      </div>

      {/* End section */}
      <div className="h-[100vh] flex items-center justify-center text-white text-3xl">
        End of the Section
      </div>
    </div>
  );
};

export default FadeScaleRevealSection;
