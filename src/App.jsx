import React, { useEffect } from 'react';

 
import ScrollProgress from "./components/ScrollProgress";
import ProgressiveRevealSection from "./components/ProgressiveRevealSection";
import ParallaxSection from "./components/ParallaxSection";
import ImageZoomReveal from "./components/ImageZoomReveal";
import TextAnimation from "./components/TextAnimation";
import ZoomOutReveal from "./components/ZoomOutReveal";
import ZoomOutSlideUpReveal from "./components/ZoomOutSlideUpReveal";
import ParallaxReveal from "./components/ParallaxReveal";
import { motion } from "framer-motion";
import ParallaxSection2 from "./components/ParallaxSections";
// import MultiLayerParallax from "./components/MultiLayerParallax";
// import FadeScaleRevealSection from "./components/FadeScaleRevealSection";
// import ScrollAnimationTest  from "./components/ScrollAnimationTest";
// import SectionStickyBackground from "./components/SectionStickyBackground";
// import FadingBackgroundHero from "./components/FadingBackgroundHero";
// import FixedStickySection from "./components/FixedStickySection";

import SmoothStickySection from "./components/BG-animation/SmoothStickySection";
import "./App.css";

// import NavBarAnimation from './components/BG-animation/NavBarAnimation';
// import NanoNexusSection from './components/About_section/NanoNexusSection'
// import GlassyStickySection from './components/GlassyStickySection/GlassyStickySection'
// import NavBarAnimation from './components/nav bar/NavBarAnimation';
// import NanoNexusProduction from './components/About_section/NanoNexusProduction'
// import NanoNexusProductionThemed from './components/About_section/NanoNexusProductionThemed'
// import Navbar from './components/nav bar/Navbar'
// import FuturisticNavbar from './components/nav bar/FuturisticNavbar';
import SimpleNavbar from './components/nav bar/SimpleNavbar';
import GlassNavbar from './components/nav bar/GlassNavbar';
import ShrinkNavbar from './components/nav bar/ShrinkNavbar';
import FixedShrinkNavbar from './components/nav bar/FixedShrinkNavbar';



// CARDS
import Card3D from './components/3D cards/Card3D';

function App() {
    // Add CSS for logo animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes charJump {
        0% {
          opacity: 1;
          transform: translateY(-30px);
        }
        50% {
          opacity: 1;
          transform: translateY(10px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes shrinkJump {
        0% {
          opacity: 1;
          transform: translateY(-15px) scale(1.5);
        }
        60% {
          opacity: 1;
          transform: translateY(5px) scale(0.9);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      
      .logo-box.animated .logo-char:nth-child(1) { animation-delay: 0.1s; }
      .logo-box.animated .logo-char:nth-child(2) { animation-delay: 0.2s; }
      .logo-box.animated .logo-char:nth-child(3) { animation-delay: 0.3s; }
      .logo-box.animated .logo-char:nth-child(4) { animation-delay: 0.4s; }
      .logo-box.animated .logo-char:nth-child(5) { animation-delay: 0.5s; }
      .logo-box.animated .logo-char:nth-child(6) { animation-delay: 0.6s; }
      .logo-box.animated .logo-char:nth-child(7) { animation-delay: 0.7s; }
      .logo-box.animated .logo-char:nth-child(8) { animation-delay: 0.8s; }
      .logo-box.animated .logo-char:nth-child(9) { animation-delay: 0.9s; }
      .logo-box.animated .logo-char:nth-child(10) { animation-delay: 1.0s; }
      .logo-box.animated .logo-char:nth-child(11) { animation-delay: 1.1s; }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);



// 3d cards matrix
  const cards = [
    {
      title: "Cosmic Explorer",
      description: "Journey through the stars with this interactive 3D experience. Watch as the card responds to your scroll and mouse movements.",
      imageUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06",
      backgroundColor: "#0c0c1d"
    },
    {
      title: "Neon Dreams",
      description: "A vibrant cyberpunk-inspired card with glowing edges and smooth animations. Perfect for modern UI designs.",
      imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      backgroundColor: "#1a0b2e"
    },
    {
      title: "Mountain Peak",
      description: "Experience the majesty of mountains with parallax scrolling effects and immersive 3D depth.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      backgroundColor: "#0d2b45"
    }
  ];



  return (
    <div className="App">
      {/* nav bar */}





<FixedShrinkNavbar/>

{/* good */}
{/* <ShrinkNavbar/> */}


{/* good */}
{/* <GlassNavbar /> */}

{/* good */}
  {/* <SimpleNavbar /> */}


      {/* bad */}
      {/* <NavBarAnimation /> */}


      {/* bad */}
      {/* <Navbar/> */}

      {/* cyberpunk theme , so fucking cool */}
      {/* <FuturisticNavbar /> */}

      <ScrollProgress />

      {/* Hero Section with Parallax */}
      {/* <ScrollAnimationTest /> */}
      {/* <ExpandingBackgroundHero /> */}

      <ParallaxSection
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
        speed={0.3}
        overlay={true}
      >
        <div className="hero-content">
          <TextAnimation
            text="Immerse in the Journey"
            type="word"
            animationType="scale"
            delay={0.5}
          />
          <TextAnimation
            text="Where every scroll reveals a new dimension of visual storytelling"
            type="line"
            animationType="slide"
            delay={1}
          />
        </div>
      </ParallaxSection>

      {/* <FadeScaleRevealSection imageSrc="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80" /> */}
      {/* 
<MultiLayerParallax
  background="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
  midground="/https://images.unsplash.com/photo-1506744038136-46273834b3fb"
  foreground="/https://images.unsplash.com/photo-1506744038136-46273834b3fb"
>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl"
    >
      <h2 className="text-white text-xl font-bold">Layered Parallax</h2>
      <p className="text-white/80 mt-2">Foreground + Mid + Background</p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl"
    >
      <h2 className="text-white text-xl font-bold">Depth Effect</h2>
      <p className="text-white/80 mt-2">Each layer moves separately</p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl"
    >
      <h2 className="text-white text-xl font-bold">Cinematic</h2>
      <p className="text-white/80 mt-2">Apple-style parallax reveal</p>
    </motion.div>

  </div>
</MultiLayerParallax> */}

{/* bad */}
{/* <NanoNexusSection/> */}

{/* not bad */}
{/* <GlassyStickySection/> */}

{/* good */}
{/* <NanoNexusProduction/> */}

{/* bad */}
{/* <NanoNexusProductionThemed/> */}


{/* good */}
      <SmoothStickySection />

      {/* <FixedStickySection /> */}

      {/* <FadingBackgroundHero /> */}

      {/* Progressive Reveal Sections */}
      <div className="content-container">
        <ProgressiveRevealSection id="section1" delay={0.1}>
          <div className="section-content">
            <h2>
              <TextAnimation
                text="The Art of Progressive Reveal"
                type="word"
                animationType="color"
              />
            </h2>
            <TextAnimation
              text="As you journey downward, each element gracefully emerges into view. This technique creates a sense of anticipation and discovery, transforming passive scrolling into an active exploration of content."
              type="word"
              animationType="fade"
              delay={0.3}
            />

            <div className="image-grid">
              {/* <ImageZoomReveal
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                alt="Mountain landscape"
                maskDirection="left"
                zoomIntensity={0.15}
              /> */}
              <ZoomOutSlideUpReveal
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                alt="Beautiful Image"
                startScale={1.5}
                startY={80}
                fadeIn={true}
                shadow={true}
              />

              <ZoomOutReveal
                src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
                alt="Nice image"
                startScale={1.5}
                endScale={1}
                fadeIn={true}
                shadow={true}
              />
            </div>
          </div>
        </ProgressiveRevealSection>

        <ProgressiveRevealSection id="section2" delay={0.2}>
          <div className="section-content">
            <h2>
              <TextAnimation
                text="Depth Through Parallax"
                type="letter"
                animationType="scale"
              />
            </h2>
            <TextAnimation
              text="Experience layers of depth as background elements move at different speeds. This creates an immersive three-dimensional effect that makes two-dimensional screens feel expansive and alive with motion."
              type="word"
              animationType="fade"
              delay={0.4}
            />
          </div>
        </ProgressiveRevealSection>
        <ParallaxReveal
          src="https://images.unsplash.com/photo-1518837695005-2083093ee35b"
          alt="Mountain"
          intensity={60}
          startScale={1.3}
          liftAmount={40}
        >
          <div className="parallax-inner">
            <TextAnimation
              text="Visual Harmony in Motion"
              type="word"
              animationType="color"
            />
            <TextAnimation
              text="Where images breathe and text dances to the rhythm of your scroll"
              type="line"
              animationType="slide"
              delay={0.5}
            />
          </div>
        </ParallaxReveal>

        {/* Another Parallax Section */}
        {/* <ParallaxSection
          backgroundImage="https://images.unsplash.com/photo-1518837695005-2083093ee35b"
          speed={0.5}
        >
          <div className="parallax-inner">
            <TextAnimation
              text="Visual Harmony in Motion"
              type="word"
              animationType="color"
            />
            <TextAnimation
              text="Where images breathe and text dances to the rhythm of your scroll"
              type="line"
              animationType="slide"
              delay={0.5}
            />
          </div>
        </ParallaxSection> */}
        <ParallaxSection2 background="https://images.unsplash.com/photo-1518837695005-2083093ee35b">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"
            >
              <h3 className="text-xl font-bold text-white">Card One</h3>
              <p className="text-white/80 mt-2">Beautiful parallax reveal.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"
            >
              <h3 className="text-xl font-bold text-white">Card Two</h3>
              <p className="text-white/80 mt-2">Smooth and cinematic.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"
            >
              <h3 className="text-xl font-bold text-white">Card Three</h3>
              <p className="text-white/80 mt-2">Apple-style design.</p>
            </motion.div>
          </div>
        </ParallaxSection2>


              {cards.map((card, index) => (
        <Card3D key={index} {...card} />
      ))}

        <ProgressiveRevealSection id="section3" delay={0.3}>
          <div className="section-content">
            <h2>
              <TextAnimation
                text="Images That Breathe With You"
                type="word"
                animationType="fade"
              />
            </h2>
            <TextAnimation
              text="Witness images transform as they enter your view. Starting slightly obscured, they gradually reveal themselves in perfect clarity, creating moments of visual delight throughout your journey."
              type="word"
              animationType="fade"
              delay={0.3}
            />

            <ImageZoomReveal
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
              alt="Starry night"
              maskDirection="right"
              zoomIntensity={0.2}
            />
          </div>
        </ProgressiveRevealSection>

        <ProgressiveRevealSection id="section4" delay={0.4}>
          <div className="section-content">
            <h2>
              <TextAnimation
                text="Text That Comes Alive"
                type="letter"
                animationType="scale"
              />
            </h2>
            <TextAnimation
              text={`
              Each word has its moment
              Each line its entrance
              Each paragraph its stage
              Watch as text transforms from mere information to living art
              `}
              type="line"
              animationType="slide"
              delay={0.2}
            />
          </div>
        </ProgressiveRevealSection>
      </div>

      {/* Final Parallax Section */}
      <ParallaxSection
        backgroundImage="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"
        speed={0.4}
        overlay={true}
      >
        <div className="final-section">
          <TextAnimation
            text="The End is Just Another Beginning"
            type="word"
            animationType="color"
            delay={0.5}
          />
          <TextAnimation
            text="Scroll back up to experience the magic once more"
            type="line"
            animationType="fade"
            delay={1.5}
          />
        </div>
      </ParallaxSection>
    </div>
  );
}

export default App;
