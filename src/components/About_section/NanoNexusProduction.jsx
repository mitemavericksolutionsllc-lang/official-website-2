// NanoNexusProduction.jsx
import React, { useEffect, useRef, useState } from 'react';
import './NanoNexusProduction.css';

const NanoNexusProduction = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [particles, setParticles] = useState([]);
  const [shapes, setShapes] = useState([]);

  // Initialize minimal particles and shapes
  useEffect(() => {
    // Very few subtle particles
    const particleCount = 15;
    const newParticles = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.2 + 0.05,
        opacity: Math.random() * 0.3 + 0.1,
        color: `hsla(${Math.random() * 20 + 220}, 70%, 75%, 0.4)`
      });
    }
    setParticles(newParticles);

    // Minimal shapes - just 3
    const shapeCount = 3;
    const newShapes = [];
    const shapeTypes = ['circle', 'triangle'];
    for (let i = 0; i < shapeCount; i++) {
      newShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 40 + 20,
        opacity: Math.random() * 0.1 + 0.03,
        rotation: Math.random() * 360,
        speed: Math.random() * 0.1 + 0.02,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        color: `hsla(${Math.random() * 30 + 220}, 50%, 80%, 0.08)`
      });
    }
    setShapes(newShapes);
  }, []);

  useEffect(() => {
    let rafId;

    const handleScroll = () => {
      if (!sectionRef.current || !bgRef.current) return;

      const section = sectionRef.current;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      // Calculate scroll progress through section
      const scrollInSection = scrollY - sectionTop + windowHeight * 0.3;
      const maxScroll = sectionHeight + windowHeight * 0.3;
      const progress = Math.max(0, Math.min(1, scrollInSection / maxScroll));
      setScrollProgress(progress);

      // Check if we're in the section
      const inSection = scrollY > sectionTop - windowHeight * 0.5 && 
                       scrollY < sectionTop + sectionHeight - windowHeight * 0.5;
      setIsActive(inSection);

      if (inSection) {
        // Phase 1: Fade in (0-15% of section)
        if (progress < 0.15) {
          const phaseProgress = progress / 0.15;
          
          // Background fades in from bottom
          bgRef.current.style.opacity = phaseProgress;
          bgRef.current.style.transform = `translateY(${(1 - phaseProgress) * 20}px)`;
          bgRef.current.style.filter = `blur(${(1 - phaseProgress) * 5}px) brightness(${0.8 + phaseProgress * 0.2})`;
          bgRef.current.style.position = 'fixed';
          bgRef.current.style.top = '0';
        }
        // Phase 2: Sticky (15-70% of section)
        else if (progress >= 0.15 && progress < 0.7) {
          // Background is fully visible and clear
          bgRef.current.style.opacity = '1';
          bgRef.current.style.transform = 'translateY(0)';
          bgRef.current.style.filter = 'blur(0px) brightness(1)';
          bgRef.current.style.backgroundSize = 'cover';
          bgRef.current.style.backgroundPosition = 'center';
          bgRef.current.style.position = 'fixed';
          bgRef.current.style.top = '0';
        }
        // Phase 3: Fade out (70-100% of section)
        else {
          const fadeProgress = (progress - 0.7) / 0.3;
          
          // Background fades out with slight upward movement
          bgRef.current.style.opacity = 1 - fadeProgress;
          bgRef.current.style.transform = `translateY(${-fadeProgress * 20}px)`;
          bgRef.current.style.filter = `blur(${fadeProgress * 5}px) brightness(${1 - fadeProgress * 0.2})`;
          
          // Release sticky at the end
          if (progress > 0.95) {
            bgRef.current.style.position = 'absolute';
            bgRef.current.style.top = `${sectionHeight - windowHeight}px`;
          } else {
            bgRef.current.style.position = 'fixed';
            bgRef.current.style.top = '0';
          }
        }

        // Content parallax
        if (contentRef.current) {
          const parallax = Math.min(80, progress * 100);
          contentRef.current.style.transform = `translateY(${parallax}px)`;
        }
      } else {
        // Outside section - reset
        bgRef.current.style.opacity = '0';
        bgRef.current.style.position = 'absolute';
        bgRef.current.style.top = '0';
      }

      rafId = requestAnimationFrame(handleScroll);
    };

    rafId = requestAnimationFrame(handleScroll);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Production showcase data
  const productionHighlights = [
    {
      title: 'High-Performance Websites',
      description: 'Lightning-fast websites with optimized code and modern architecture.',
      metric: 'Load Time',
      value: '< 1s',
      icon: '⚡',
      color: '#667eea'
    },
    {
      title: 'Scalable Applications',
      description: 'Enterprise-grade applications built to handle millions of users.',
      metric: 'Uptime',
      value: '99.9%',
      icon: '📈',
      color: '#764ba2'
    },
    {
      title: 'Secure Solutions',
      description: 'Bank-level security with regular audits and compliance checks.',
      metric: 'Security Score',
      value: 'A+',
      icon: '🛡️',
      color: '#4facfe'
    }
  ];

  const techStack = [
    { name: 'React', percentage: 95 },
    { name: 'Next.js', percentage: 90 },
    { name: 'TypeScript', percentage: 88 },
    { name: 'Node.js', percentage: 85 },
    { name: 'MongoDB', percentage: 80 },
    { name: 'AWS', percentage: 75 }
  ];

  return (
    <div className="production-container">
      {/* Introduction */}
      <div className="production-intro">
        <div className="intro-content">
          <div className="logo-badge">
            <span className="logo-symbol">⚡</span>
            <h1>Nano Nexus</h1>
          </div>
          <p className="intro-tagline">Scroll to explore our production excellence</p>
        </div>
      </div>

      {/* Main Production Section */}
      <section ref={sectionRef} className="production-section" style={{ minHeight: '250vh' }}>
        {/* Background Image with 45% Cover */}
        <div 
          ref={bgRef}
          className="production-background"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.7)), url('https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: '45%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#0f172a',
            position: 'absolute',
            top: '0',
            opacity: '0'
          }}
        >
          {/* Subtle particles */}
          <div className="floating-particles">
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
                  background: particle.color
                }}
              />
            ))}
          </div>

          {/* Minimal shapes */}
          <div className="background-shapes">
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
                  border: `1px solid ${shape.color}`,
                  transform: `rotate(${shape.rotation}deg)`
                }}
              />
            ))}
          </div>
        </div>

        {/* Content Layer */}
        <div ref={contentRef} className="production-content">
          <div className="content-wrapper">
            {/* Section Header */}
            <div className="section-header">
              <div className="progress-indicator">
                <div className="progress-track">
                  <div 
                    className="progress-bar"
                    style={{ width: `${scrollProgress * 100}%` }}
                  >
                    <div className="progress-dot"></div>
                  </div>
                </div>
                <span className="progress-text">
                  {isActive ? 'Exploring Production' : 'Scroll to begin'}
                </span>
              </div>

              <h1 className="main-title">
                Production <span className="highlight">Excellence</span>
              </h1>
              <p className="section-subtitle">
                Where precision meets performance in web development
              </p>
            </div>

            {/* Production Highlights */}
            <div className="highlights-section">
              <h2 className="section-heading">Our Production Standards</h2>
              <div className="highlights-grid">
                {productionHighlights.map((item, index) => (
                  <div 
                    key={index}
                    className="highlight-card"
                    style={{
                      '--card-color': item.color,
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <div className="card-header">
                      <div className="card-icon" style={{ background: item.color }}>
                        {item.icon}
                      </div>
                      <div className="card-metric">
                        <div className="metric-value">{item.value}</div>
                        <div className="metric-label">{item.metric}</div>
                      </div>
                    </div>
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-description">{item.description}</p>
                    <div className="card-footer">
                      <div className="quality-indicator">
                        <div className="indicator-dot"></div>
                        <span>Production Ready</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="tech-section">
              <div className="tech-header">
                <h2>Technology Stack</h2>
                <p>Mastering modern tools for superior results</p>
              </div>
              
              <div className="tech-list">
                {techStack.map((tech, index) => (
                  <div key={index} className="tech-item">
                    <div className="tech-info">
                      <span className="tech-name">{tech.name}</span>
                      <span className="tech-percentage">{tech.percentage}%</span>
                    </div>
                    <div className="tech-bar">
                      <div 
                        className="tech-progress"
                        style={{ 
                          width: `${tech.percentage}%`,
                          opacity: 0.3 + (tech.percentage / 100) * 0.7
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Production Process */}
            <div className="process-section">
              <div className="process-header">
                <h2>Refined Development Process</h2>
                <p>A meticulous approach to every project</p>
              </div>
              
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">01</div>
                  <div className="step-content">
                    <h3>Planning & Strategy</h3>
                    <p>Detailed requirement analysis and project architecture design</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">02</div>
                  <div className="step-content">
                    <h3>Design & Prototyping</h3>
                    <p>Creating intuitive interfaces with pixel-perfect precision</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">03</div>
                  <div className="step-content">
                    <h3>Development & Testing</h3>
                    <p>Agile development with continuous testing and quality checks</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">04</div>
                  <div className="step-content">
                    <h3>Deployment & Support</h3>
                    <p>Seamless deployment with ongoing maintenance and optimization</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Metrics */}
            <div className="metrics-section">
              <div className="metrics-card">
                <h2>Quality Metrics</h2>
                <div className="metrics-grid">
                  <div className="metric-item">
                    <div className="metric-icon">🎯</div>
                    <div className="metric-data">
                      <div className="metric-value">100%</div>
                      <div className="metric-label">Client Satisfaction</div>
                    </div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-icon">⚡</div>
                    <div className="metric-data">
                      <div className="metric-value">95+</div>
                      <div className="metric-label">Performance Score</div>
                    </div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-icon">🔄</div>
                    <div className="metric-data">
                      <div className="metric-value">24/7</div>
                      <div className="metric-label">Support Coverage</div>
                    </div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-icon">📊</div>
                    <div className="metric-data">
                      <div className="metric-value">50+</div>
                      <div className="metric-label">Projects Delivered</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Section */}
      <div className="next-section">
        <div className="next-content">
          <h2>Ready to Build Together?</h2>
          <p>Let's create something exceptional</p>
          <div className="next-arrow">↓</div>
        </div>
      </div>
    </div>
  );
};

export default NanoNexusProduction;