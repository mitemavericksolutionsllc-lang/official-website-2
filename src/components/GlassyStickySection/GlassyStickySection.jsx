// GlassyStickySection.jsx
import React, { useEffect, useRef, useState } from 'react';
import './GlassyStickySection.css';

const GlassyStickySection = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const particlesRef = useRef(null);
  const contentRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('outside');
  const [particles, setParticles] = useState([]);
  const [shapes, setShapes] = useState([]);

  // Initialize particles and shapes
  useEffect(() => {
    // Create particles
    const particleCount = 50;
    const newParticles = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.5 + 0.3,
        color: `hsl(${Math.random() * 60 + 200}, 100%, ${Math.random() * 30 + 70}%)`
      });
    }
    setParticles(newParticles);

    // Create floating shapes
    const shapeCount = 8;
    const newShapes = [];
    for (let i = 0; i < shapeCount; i++) {
      const type = Math.random() > 0.5 ? 'circle' : 'triangle';
      newShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 80 + 40,
        opacity: Math.random() * 0.2 + 0.1,
        rotation: Math.random() * 360,
        speed: Math.random() * 0.3 + 0.1,
        type,
        color: `hsla(${Math.random() * 60 + 200}, 80%, ${Math.random() * 20 + 80}%, 0.2)`
      });
    }
    setShapes(newShapes);
  }, []);

  useEffect(() => {
    let rafId;
    let animationFrame;

    // Animate particles and shapes
    const animateElements = () => {
      setParticles(prev => prev.map(p => ({
        ...p,
        y: (p.y + p.speed) % 100
      })));

      setShapes(prev => prev.map(s => ({
        ...s,
        y: (s.y + s.speed) % 100,
        rotation: (s.rotation + s.speed * 0.5) % 360,
        opacity: Math.sin(Date.now() / 1000 + s.id) * 0.1 + 0.15
      })));

      animationFrame = requestAnimationFrame(animateElements);
    };

    // Handle scroll animations
    const handleScroll = () => {
      if (!sectionRef.current || !bgRef.current) return;

      const section = sectionRef.current;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      // Calculate progress
      const scrollInSection = Math.max(0, scrollY - sectionTop + windowHeight * 1);
      const maxScroll = sectionHeight + windowHeight * 0.3;
      const currentProgress = Math.max(0, Math.min(1, scrollInSection / maxScroll));
      setProgress(currentProgress);

      // Glass effect intensity based on scroll
    //   const glassIntensity = Math.min(1, currentProgress * 3);

      // Phase determination
      if (currentProgress < 0.2) {
        setPhase('entering');
        const phaseProgress = currentProgress / 0.2;
        
        // Background effects
        bgRef.current.style.opacity = phaseProgress;
        bgRef.current.style.transform = `translateY(${(1 - phaseProgress) * 50}px)`;
        bgRef.current.style.backdropFilter = `blur(${phaseProgress * 20}px) brightness(${0.7 + phaseProgress * 0.3})`;
        
        // Glass morphism effect
        bgRef.current.style.background = `
          linear-gradient(
            135deg,
            hsla(220, 40%, 20%, ${0.2 + phaseProgress * 0.4}) 0%,
            hsla(220, 40%, 10%, ${0.1 + phaseProgress * 0.3}) 100%
          )
        `;
        
        bgRef.current.style.boxShadow = `
          inset 0 0 0 1px rgba(255, 255, 255, ${0.1 * phaseProgress}),
          0 8px 32px rgba(0, 0, 0, ${0.1 + phaseProgress * 0.2})
        `;

        bgRef.current.style.position = 'fixed';
        bgRef.current.style.top = '0';
      }
      else if (currentProgress >= 0.2 && currentProgress < 0.8) {
        setPhase('sticky');
        
        // Full glass effect
        const pulse = Math.sin(Date.now() / 2000) * 0.1;
        const blurAmount = 20 + pulse * 5;
        
        bgRef.current.style.opacity = '1';
        bgRef.current.style.transform = 'translateY(0)';
        bgRef.current.style.backdropFilter = `blur(${blurAmount}px) brightness(1)`;
        bgRef.current.style.background = `
          linear-gradient(
            135deg,
            hsla(220, 40%, 20%, 0.6) 0%,
            hsla(220, 40%, 10%, 0.4) 100%
          )
        `;
        bgRef.current.style.boxShadow = `
          inset 0 0 0 1px rgba(255, 255, 255, 0.1),
          0 8px 32px rgba(0, 0, 0, 0.3),
          0 0 100px rgba(102, 126, 234, 0.1)
        `;

        bgRef.current.style.position = 'fixed';
        bgRef.current.style.top = '0';
      }
      else if (currentProgress >= 0.8 && currentProgress < 1) {
        setPhase('leaving');
        const fadeOutProgress = (currentProgress - 0.8) / 0.2;
        
        // Fade out glass effect
        bgRef.current.style.opacity = 1 - fadeOutProgress;
        bgRef.current.style.transform = `translateY(${-fadeOutProgress * 50}px)`;
        bgRef.current.style.backdropFilter = `blur(${20 * (1 - fadeOutProgress)}px) brightness(${1 - fadeOutProgress * 0.5})`;
        bgRef.current.style.background = `
          linear-gradient(
            135deg,
            hsla(220, 40%, 20%, ${0.6 * (1 - fadeOutProgress)}) 0%,
            hsla(220, 40%, 10%, ${0.4 * (1 - fadeOutProgress)}) 100%
          )
        `;
        
        if (currentProgress > 0.95) {
          bgRef.current.style.position = 'absolute';
          bgRef.current.style.top = '100%';
        } else {
          bgRef.current.style.position = 'fixed';
          bgRef.current.style.top = '0';
        }
      }
      else {
        setPhase('exited');
        bgRef.current.style.opacity = '0';
        bgRef.current.style.position = 'absolute';
        bgRef.current.style.top = '100%';
      }

      // Content parallax
      if (contentRef.current) {
        const parallax = currentProgress * 80;
        contentRef.current.style.transform = `translateY(${parallax}px)`;
        contentRef.current.style.opacity = Math.min(1, currentProgress * 1.5);
      }

      rafId = requestAnimationFrame(handleScroll);
    };

    // Start animations
    animationFrame = requestAnimationFrame(animateElements);
    rafId = requestAnimationFrame(handleScroll);

    return () => {
      cancelAnimationFrame(animationFrame);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const features = [
    {
      title: "Glass Morphism",
      description: "Frosted glass background with dynamic blur and transparency effects",
      icon: "🔮",
      color: "#667eea"
    },
    {
      title: "Animated Particles",
      description: "Floating particles that respond to scroll and create depth",
      icon: "✨",
      color: "#764ba2"
    },
    {
      title: "Floating Shapes",
      description: "Geometric shapes with smooth animations and transparency",
      icon: "🔺",
      color: "#f093fb"
    },
    {
      title: "Smooth Transitions",
      description: "Butter-smooth animations powered by requestAnimationFrame",
      icon: "⚡",
      color: "#4facfe"
    }
  ];

  return (
    <div className="glassy-container">
      {/* Hero section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Glassy Sticky Background</h1>
          <p>Scroll down to experience the animated glass morphism effect</p>
          <div className="scroll-indicator">
            <div className="mouse">
              <div className="wheel"></div>
            </div>
            <span>Scroll to begin</span>
          </div>
        </div>
      </div>

      {/* Main sticky section */}
      <section ref={sectionRef} className="glassy-section" style={{ minHeight: '300vh' }}>
        {/* Glassy background with particles */}
        <div 
          ref={bgRef}
          className="glassy-background"
          style={{
            position: 'fixed',
            top: '0',
            opacity: '0',
            background: `
              linear-gradient(
                135deg,
                hsla(220, 40%, 20%, 0.2) 0%,
                hsla(220, 40%, 10%, 0.1) 100%
              )
            `,
            backdropFilter: 'blur(0px)',
            boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0)'
          }}
        >
          {/* Animated particles */}
          <div ref={particlesRef} className="particles-container">
            {particles.map(particle => (
              <div
                key={particle.id}
                className="particle"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: particle.size,
                  height: particle.size,
                  opacity: particle.opacity,
                  background: particle.color,
                  animationDelay: `${particle.id * 0.1}s`
                }}
              />
            ))}
          </div>

          {/* Floating shapes */}
          <div className="shapes-container">
            {shapes.map(shape => (
              <div
                key={shape.id}
                className={`shape ${shape.type}`}
                style={{
                  left: `${shape.x}%`,
                  top: `${shape.y}%`,
                  width: shape.size,
                  height: shape.size,
                  opacity: shape.opacity,
                  background: shape.color,
                  transform: `rotate(${shape.rotation}deg)`,
                  animationDelay: `${shape.id * 0.5}s`
                }}
              />
            ))}
          </div>

          {/* Light effects */}
          <div className="light-effects">
            <div className="light light-1"></div>
            <div className="light light-2"></div>
            <div className="light light-3"></div>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="glassy-content" style={{ opacity: 0 }}>
          <div className="content-wrapper">
            {/* Header */}
            <div className="header-section">
              <div className="phase-display">
                <div className={`phase-badge ${phase}`}>
                  <span className="phase-text">{phase.toUpperCase()}</span>
                  <div className="phase-dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                </div>
                <div className="progress-display">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${progress * 100}%` }}
                    >
                      <div className="progress-glow"></div>
                    </div>
                  </div>
                  <span className="progress-text">{Math.round(progress * 100)}%</span>
                </div>
              </div>

              <h1 className="main-heading">
                <span className="heading-line">Immersive</span>
                <span className="heading-line">Glass Experience</span>
              </h1>
              <p className="sub-heading">
                A sticky background with animated particles, floating shapes, and glass morphism effects
              </p>
            </div>

            {/* Features Grid */}
            <div className="features-section">
              <h2 className="section-title">Interactive Elements</h2>
              <div className="features-grid">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="feature-card"
                    style={{
                      '--card-color': feature.color,
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <div className="card-header">
                      <div className="card-icon-wrapper">
                        <div className="card-icon">{feature.icon}</div>
                        <div className="icon-glow"></div>
                      </div>
                      <h3>{feature.title}</h3>
                    </div>
                    <p className="card-description">{feature.description}</p>
                    <div className="card-footer">
                      <div className="effect-preview">
                        <div className="preview-dot"></div>
                        <div className="preview-dot"></div>
                        <div className="preview-dot"></div>
                      </div>
                      <span className="card-status">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Animated stats */}
            <div className="stats-section">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">{particles.length}</div>
                  <div className="stat-label">Animated Particles</div>
                  <div className="stat-bar">
                    <div className="stat-fill" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{shapes.length}</div>
                  <div className="stat-label">Floating Shapes</div>
                  <div className="stat-bar">
                    <div className="stat-fill" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">60</div>
                  <div className="stat-label">FPS Animation</div>
                  <div className="stat-bar">
                    <div className="stat-fill" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{Math.round(progress * 100)}%</div>
                  <div className="stat-label">Scroll Progress</div>
                  <div className="stat-bar">
                    <div className="stat-fill" style={{ width: `${progress * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual effects showcase */}
            <div className="effects-showcase">
              <h2 className="section-title">Visual Effects</h2>
              <div className="effects-grid">
                <div className="effect-item">
                  <div className="effect-visual blur-effect">
                    <div className="blur-circle"></div>
                    <div className="blur-circle"></div>
                    <div className="blur-circle"></div>
                  </div>
                  <h3>Glass Blur</h3>
                  <p>Dynamic backdrop filter blur effect</p>
                </div>
                <div className="effect-item">
                  <div className="effect-visual particle-effect">
                    <div className="particle-demo"></div>
                    <div className="particle-demo"></div>
                    <div className="particle-demo"></div>
                  </div>
                  <h3>Floating Particles</h3>
                  <p>Animated particles with parallax</p>
                </div>
                <div className="effect-item">
                  <div className="effect-visual shape-effect">
                    <div className="shape-demo triangle"></div>
                    <div className="shape-demo circle"></div>
                    <div className="shape-demo square"></div>
                  </div>
                  <h3>Geometric Shapes</h3>
                  <p>Rotating and floating shapes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next section */}
      <div className="next-section">
        <div className="next-content">
          <h2>Experience Complete</h2>
          <p>The glassy background has smoothly transitioned away, leaving a clean slate for the next section.</p>
          <div className="completion-animation">
            <div className="completion-check">✓</div>
            <span>Animation sequence completed successfully</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlassyStickySection;