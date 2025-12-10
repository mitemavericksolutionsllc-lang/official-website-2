// SmoothStickySection.jsx
import React, { useEffect, useRef, useState } from "react";
import "./SmoothStickySection.css";
import TextAnimation from "../TextAnimation";
import "./About.css";
import {
  useScrollAnimation,
  useStaggerAnimation,
  useShapeReveal,
} from "./UseSA";

const SmoothStickySection = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("outside"); // outside, entering, sticky, leaving, exited
  const [bgTransform, setBgTransform] = useState({
    scale: 1,
    translateY: 100,
    opacity: 0,
    blur: 10,
  });
  const [sectionRef2, isSectionVisible] = useScrollAnimation(0.1);
  const [statsRef, visibleStats] = useStaggerAnimation(4, 0.2);
  const [shapeRevealRef, revealProgress] = useShapeReveal(0.1);

    const stats = [
    { number: "50+", label: "Projects Completed", icon: "🚀" },
    { number: "5+", label: "Years Experience", icon: "⭐" },
    { number: "30+", label: "Happy Clients", icon: "😊" },
    { number: "99%", label: "Success Rate", icon: "📈" },
  ];

    const getRevealClass = () => {
    if (revealProgress < 0.3) return "";
    if (revealProgress < 0.7) return "reveal-50";
    return "reveal-100";
  };

  useEffect(() => {
    let rafId;

    const updateAnimations = () => {
      if (!sectionRef.current || !bgRef.current) return;

      const section = sectionRef.current;
      const sectionRect = section.getBoundingClientRect();
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Section boundaries
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionBottom = sectionTop + sectionHeight;

      // Calculate scroll progress through the section (0 to 1)
      const scrollDistance = scrollY - sectionTop + windowHeight * 0.5;
      const totalScrollable = sectionHeight + windowHeight * 0.5;
      const currentProgress = Math.max(
        0,
        Math.min(1, scrollDistance / totalScrollable)
      );
      setProgress(currentProgress);

      // Phase 1: Fade in from bottom (0-15%)
      if (currentProgress < 0.15) {
        setPhase("entering");
        const phaseProgress = currentProgress / 0.15;

        // Background moves up from bottom while fading in
        const translateY = 100 - phaseProgress * 100; // 100px → 0px
        const opacity = phaseProgress; // 0 → 1
        const scale = 0.9 + phaseProgress * 0.1; // 90% → 100%
        const blur = 10 - phaseProgress * 10; // 10px → 0px

        setBgTransform({ translateY, opacity, scale, blur });

        // Make background sticky
        bgRef.current.style.position = "fixed";
        bgRef.current.style.top = "0";
      }
      // Phase 2: Sticky (15-75%)
      else if (currentProgress >= 0.15 && currentProgress < 0.75) {
        setPhase("sticky");

        // Background is fully visible and stationary
        setBgTransform({
          translateY: 0,
          opacity: 1,
          scale: 1,
          blur: 0,
        });

        bgRef.current.style.position = "fixed";
        bgRef.current.style.top = "0";
      }
      // Phase 3: Fade out (75-100%)
      else if (currentProgress >= 0.75 && currentProgress < 1) {
        setPhase("leaving");
        const fadeOutProgress = (currentProgress - 0.75) / 0.25;

        // Background fades out with slight upward movement
        const translateY = -(fadeOutProgress * 50); // 0px → -50px
        const opacity = 1 - fadeOutProgress; // 1 → 0
        const scale = 1 - fadeOutProgress * 0.1; // 100% → 90%
        const blur = fadeOutProgress * 5; // 0px → 5px

        setBgTransform({ translateY, opacity, scale, blur });

        // Keep sticky until very end
        if (currentProgress < 0.95) {
          bgRef.current.style.position = "fixed";
          bgRef.current.style.top = "0";
        } else {
          bgRef.current.style.position = "absolute";
          bgRef.current.style.top = "100%";
        }
      }
      // Phase 4: After section
      else {
        setPhase("exited");
        setBgTransform({
          translateY: -100,
          opacity: 0,
          scale: 0.9,
          blur: 10,
        });
        bgRef.current.style.position = "absolute";
        bgRef.current.style.top = "100%";
      }

      // Parallax effect for content
      if (contentRef.current) {
        const contentParallax = Math.min(100, currentProgress * 150);
        contentRef.current.style.transform = `translateY(${contentParallax}px)`;
      }

      rafId = requestAnimationFrame(updateAnimations);
    };

    rafId = requestAnimationFrame(updateAnimations);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const cards = [
    {
      title: "Smooth Entrance",
      description:
        "Background fades in from below with a gentle upward animation.",
      icon: "⬆️",
      color: "#667eea",
    },
    {
      title: "Perfect Stickiness",
      description:
        "Background stays perfectly in place while you scroll through content.",
      icon: "📌",
      color: "#764ba2",
    },
    {
      title: "Graceful Exit",
      description: "Background fades out smoothly as you leave the section.",
      icon: "✨",
      color: "#f093fb",
    },
  ];

  

  return (
    <div className="smooth-container">
      {/* Content above section */}
   
    <section id="about" className="about section" ref={sectionRef2}>
      {/* Enhanced Animated Background Elements */}
      <div className="animated-bg-elements">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
        <div className="glow-circle circle-1"></div>
        <div className="glow-circle circle-2"></div>

        {/* Floating Particles */}
        <div className="floating-particle particle-1"></div>
        <div className="floating-particle particle-2"></div>
        <div className="floating-particle particle-3"></div>
        <div className="floating-particle particle-4"></div>
      </div>

      {/* Shape Reveal Container */}
      <div className="shape-reveal-container" ref={shapeRevealRef}>
        <div className={`shape-background ${getRevealClass()}`}></div>
      </div>

      <div className="container">
        {/* Fixed Section Header - No Animation Issues */}
        <div className="section-header-fixed">
          <h2 className="section-title-fixed">
            About <span className="gradient-text">Nano Nexus</span>
          </h2>
          <p className="section-subtitle-About">
            Pioneering the Future of Digital Innovation
          </p>
          <div className="section-divider"></div>
        </div>

        <div className="about-content">
          <div className="about-main">
            <div
              className={`about-text shape-reveal ${
                isSectionVisible ? "visible" : ""
              }`}
            >
              {/* lightning the About section */}
              {/* <div className="light-beam"></div> */}
              <h3>
                Transforming Ideas Into{" "}
                <span className="highlight-text">Digital Excellence</span>
              </h3>
              <p>
                At <strong>Nano Nexus</strong>, we are more than just a software
                development company. We are your strategic partner in digital
                transformation, combining cutting-edge technology with
                innovative thinking to create solutions that drive real business
                value.
              </p>
              <p>
                Founded with a vision to bridge the gap between complex business
                challenges and elegant technological solutions, our team of
                expert developers, designers, and strategists work
                collaboratively to deliver exceptional results.
              </p>
              <div className="hero-content">
                {/* TextAnimation content */}
              </div>

              <div className="mission-vision">
                <div className="mission-card glass-card glass-card-primary">
                  <h4>🎯 Our Mission</h4>
                  <p>
                    To empower businesses with innovative software solutions
                    that drive growth, efficiency, and digital transformation.
                  </p>
                  <div className="corner-glow top-left"></div>
                  <div className="corner-glow bottom-right"></div>
                </div>
                <div className="vision-card glass-card glass-card-secondary">
                  <h4>🔭 Our Vision</h4>
                  <p>
                    To be the leading force in creating a digitally transformed
                    world where technology enhances every aspect of business.
                  </p>
                  <div className="corner-glow top-left"></div>
                  <div className="corner-glow bottom-right"></div>
                </div>
              </div>
            </div>

            {/* Stats Grid with Staggered Animation */}
            <div className="stats-section" ref={statsRef}>
              <h4 className="shape-reveal">Our Impact in Numbers</h4>
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`stat-item glass-card glass-card-glow stagger-item ${
                      visibleStats.includes(index) ? "visible" : ""
                    } stagger-delay-${index + 1}`}
                  >
                    <div className="stat-icon">{stat.icon}</div>
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                    <div className="stat-glow"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
   

      {/* Main section with sticky background */}
      <section
        ref={sectionRef}
        className="smooth-section"
        style={{ minHeight: "300vh" }}
      >
        {/* Sticky Background with smooth animations */}
        <div
          ref={bgRef}
          className="smooth-background"
          style={{
            transform: `translateY(${bgTransform.translateY}px) scale(${bgTransform.scale})`,
            opacity: bgTransform.opacity,
            filter: `blur(${bgTransform.blur}px)`,
            backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            position: "fixed",
            top: "0",
          }}
        >
          {/* Gradient overlay for better text readability */}
          <div className="bg-gradient-overlay"></div>

          {/* Animation status */}
          <div className="animation-status">
            <div className={`status-dot ${phase}`}></div>
            <span className="status-text">
              {phase === "outside" && "Waiting..."}
              {phase === "entering" && "Fading in..."}
              {phase === "sticky" && "Sticky"}
              {phase === "leaving" && "Fading out..."}
              {phase === "exited" && "Complete"}
            </span>
          </div>
        </div>

        {/* Section content with parallax */}
        <div ref={contentRef} className="smooth-content">
          <div className="content-wrapper">
            {/* Header */}
            <div className="smooth-header">
              <div className="phase-indicator">
                <div className="phase-bar">
                  <div
                    className="phase-progress"
                    style={{ width: `${progress * 100}%` }}
                  ></div>
                </div>
                <div className="phase-labels">
                  <span className={progress >= 0 ? "active" : ""}>Start</span>
                  <span className={progress >= 0.15 ? "active" : ""}>
                    Sticky
                  </span>
                  <span className={progress >= 0.75 ? "active" : ""}>
                    Fade Out
                  </span>
                  <span className={progress >= 1 ? "active" : ""}>End</span>
                </div>
              </div>

              <h1 className="main-title">
                <span className="title-word">Smooth</span>
                <span className="title-word">Sticky</span>
                <span className="title-word">Background</span>
              </h1>

              <p className="subtitle">
                Watch the background animate smoothly as you scroll
              </p>
            </div>

            {/* Cards with staggered animation */}
            <div className="smooth-cards">
              <h2 className="section-title">Animation Phases</h2>
              <div className="cards-grid">
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className="smooth-card"
                    style={{
                      "--card-color": card.color,
                      animationDelay: `${index * 0.2}s`,
                      opacity: Math.max(0, Math.min(1, (progress - 0.1) * 3)),
                    }}
                  >
                    <div className="card-icon-wrapper">
                      <div className="card-icon">{card.icon}</div>
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <div className="card-progress">
                      <div
                        className="card-progress-bar"
                        style={{
                          width: `${Math.max(
                            0,
                            Math.min(
                              100,
                              phase === "entering"
                                ? (progress / 0.15) * 100
                                : phase === "sticky"
                                ? 100
                                : phase === "leaving"
                                ? 100 - ((progress - 0.75) / 0.25) * 100
                                : 0
                            )
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <TextAnimation
              text="Immerse in the Journey"
              type="word"
              animationType="scale"
              delay={0.5}
            />
            <TextAnimation
              text="As you journey downward, each element gracefully emerges into view. This technique creates a sense of anticipation and discovery, transforming passive scrolling into an active exploration of content."
              type="word"
              animationType="fade"
              delay={0.3}
            />
            {/* Animated text blocks */}
            <div className="text-blocks">
              {[
                "The background enters with a smooth fade-in from below, creating a subtle yet engaging animation.",
                "Once fully visible, it remains sticky while you explore the content in this section.",
                "As you reach the end, the background gracefully fades out, making way for the next section.",
                "All animations are perfectly timed and smooth, thanks to requestAnimationFrame.",
              ].map((text, index) => (
                <div
                  key={index}
                  className="text-block"
                  style={{
                    opacity: Math.max(
                      0,
                      Math.min(1, (progress - 0.1) * 2 - index * 0.3)
                    ),
                    transform: `translateY(${Math.max(
                      0,
                      20 - progress * 20
                    )}px)`,
                  }}
                >
                  <div className="text-number">0{index + 1}</div>
                  <p>{text}</p>
                </div>
              ))}
            </div>

            {/* Visual progress indicator */}
            <div className="visual-progress">
              <h3>Animation Progress</h3>
              <div className="progress-visualizer">
                <div className="visualizer-track">
                  <div
                    className="visualizer-fill"
                    style={{ width: `${progress * 100}%` }}
                  >
                    <div className="visualizer-dot"></div>
                  </div>
                </div>
                <div className="visualizer-info">
                  <div className="info-item">
                    <span className="info-label">Phase:</span>
                    <span className="info-value">{phase.toUpperCase()}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Progress:</span>
                    <span className="info-value">
                      {Math.round(progress * 100)}%
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Scale:</span>
                    <span className="info-value">
                      {Math.round(bgTransform.scale * 100)}%
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Opacity:</span>
                    <span className="info-value">
                      {Math.round(bgTransform.opacity * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content below section */}
      <div className="below-section">
        <div className="completion-message">
          <h2>Animation Complete</h2>
          <p>The background has smoothly faded out and is no longer visible.</p>
          <div className="completion-stats">
            <div className="stat">
              <div className="stat-value">100%</div>
              <div className="stat-label">Smoothness</div>
            </div>
            <div className="stat">
              <div className="stat-value">60fps</div>
              <div className="stat-label">Animation</div>
            </div>
            <div className="stat">
              <div className="stat-value">3</div>
              <div className="stat-label">Phases</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmoothStickySection;
