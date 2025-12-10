// NanoNexusProductionThemed.jsx
import React, { useEffect, useRef, useState } from 'react';
import './NanoNexusProductionThemed.css';

const NanoNexusProductionThemed = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [theme, setTheme] = useState('dark'); // Default to dark theme
  const [particles, setParticles] = useState([]);
  const [shapes, setShapes] = useState([]);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Initialize particles and shapes based on theme
  useEffect(() => {
    const particleColor = theme === 'dark' 
      ? 'hsla(220, 70%, 85%, 0.3)' 
      : 'hsla(220, 60%, 30%, 0.2)';
    
    const shapeColor = theme === 'dark'
      ? 'hsla(220, 50%, 80%, 0.08)'
      : 'hsla(220, 50%, 30%, 0.08)';

    // Minimal particles
    const particleCount = 12;
    const newParticles = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.15 + 0.05,
        opacity: Math.random() * 0.2 + 0.1,
        color: particleColor
      });
    }
    setParticles(newParticles);

    // Minimal shapes
    const shapeCount = 2;
    const newShapes = [];
    const shapeTypes = ['circle', 'triangle'];
    for (let i = 0; i < shapeCount; i++) {
      newShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 15,
        opacity: Math.random() * 0.08 + 0.02,
        rotation: Math.random() * 360,
        speed: Math.random() * 0.08 + 0.02,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        color: shapeColor
      });
    }
    setShapes(newShapes);
  }, [theme]);

  useEffect(() => {
    let rafId;
    let lastTime = 0;
    const fps = 60;
    const interval = 1000 / fps;

    const handleScroll = (currentTime) => {
      if (!sectionRef.current || !bgRef.current) {
        rafId = requestAnimationFrame(handleScroll);
        return;
      }

      if (currentTime - lastTime < interval) {
        rafId = requestAnimationFrame(handleScroll);
        return;
      }

      lastTime = currentTime;

      const section = sectionRef.current;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      // Calculate scroll progress
      const scrollInSection = scrollY - sectionTop + windowHeight * 0.3;
      const maxScroll = sectionHeight + windowHeight * 0.3;
      const progress = Math.max(0, Math.min(1, scrollInSection / maxScroll));
      setScrollProgress(progress);

      // Check if we're in the section
      const inSection = scrollY > sectionTop - windowHeight * 0.5 && 
                       scrollY < sectionTop + sectionHeight - windowHeight * 0.5;
      setIsActive(inSection);

      if (inSection) {
        // Phase 1: Smooth fade in (0-20%)
        if (progress < 0.2) {
          const phaseProgress = progress / 0.2;
          const easeOut = 1 - Math.pow(1 - phaseProgress, 3); // Cubic ease-out
          
          bgRef.current.style.opacity = easeOut;
          bgRef.current.style.transform = `translateY(${(1 - easeOut) * 15}px) scale(${0.95 + easeOut * 0.05})`;
          bgRef.current.style.position = 'fixed';
          bgRef.current.style.top = '0';
          bgRef.current.style.transition = 'none';
        }
        // Phase 2: Perfectly sticky (20-75%)
        else if (progress >= 0.2 && progress < 0.75) {
          bgRef.current.style.opacity = '1';
          bgRef.current.style.transform = 'translateY(0) scale(1)';
          bgRef.current.style.position = 'fixed';
          bgRef.current.style.top = '0';
        }
        // Phase 3: Smooth fade out (75-100%)
        else {
          const fadeProgress = (progress - 0.75) / 0.25;
          const easeIn = Math.pow(fadeProgress, 3); // Cubic ease-in
          
          bgRef.current.style.opacity = 1 - easeIn;
          bgRef.current.style.transform = `translateY(${-easeIn * 15}px) scale(${1 - easeIn * 0.05})`;
          
          if (progress > 0.97) {
            bgRef.current.style.position = 'absolute';
            bgRef.current.style.top = `${sectionHeight - windowHeight}px`;
            bgRef.current.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
          } else {
            bgRef.current.style.position = 'fixed';
            bgRef.current.style.top = '0';
            bgRef.current.style.transition = 'none';
          }
        }

        // Content parallax with easing
        if (contentRef.current) {
          const parallax = Math.min(50, progress * 80);
          contentRef.current.style.transform = `translateY(${parallax}px)`;
        }
      } else {
        // Outside section - smooth reset
        bgRef.current.style.opacity = '0';
        bgRef.current.style.position = 'absolute';
        bgRef.current.style.top = '0';
        bgRef.current.style.transform = 'translateY(15px) scale(0.95)';
        bgRef.current.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      }

      rafId = requestAnimationFrame(handleScroll);
    };

    // Set initial theme
    document.documentElement.setAttribute('data-theme', theme);
    
    rafId = requestAnimationFrame(handleScroll);
    return () => cancelAnimationFrame(rafId);
  }, [theme]);

  // Production showcase data
  const productionHighlights = [
    {
      title: 'High-Performance Websites',
      description: 'Lightning-fast websites with optimized code and modern architecture.',
      metric: 'Load Time',
      value: '< 1s',
      icon: '⚡',
      color: 'var(--accent-1)'
    },
    {
      title: 'Scalable Applications',
      description: 'Enterprise-grade applications built to handle millions of users.',
      metric: 'Uptime',
      value: '99.9%',
      icon: '📈',
      color: 'var(--accent-2)'
    },
    {
      title: 'Secure Solutions',
      description: 'Bank-level security with regular audits and compliance checks.',
      metric: 'Security Score',
      value: 'A+',
      icon: '🛡️',
      color: 'var(--accent-1)'
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
    <div className="nanonexus-themed-container">
      {/* Theme Toggle */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      {/* Introduction */}
      <div className="themed-intro-section">
        <div className="intro-content">
          <div className="logo-container">
            <span className="logo-symbol">⚡</span>
            <h1 className="logo-text">Nano Nexus</h1>
          </div>
          <p className="intro-tagline">Precision Web Development at Scale</p>
          <div className="scroll-indicator">
            <div className="indicator-line"></div>
            <span>Scroll to explore</span>
          </div>
        </div>
      </div>

      {/* Main Production Section */}
      <section ref={sectionRef} className="themed-production-section">
        {/* Glass Background */}
        <div 
          ref={bgRef}
          className="glass-background"
          style={{
            backgroundImage: theme === 'dark'
              ? `linear-gradient(rgba(26, 26, 26, 0.7), rgba(26, 26, 26, 0.8)), 
                 url('https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
              : `linear-gradient(rgba(248, 250, 252, 0.7), rgba(248, 250, 252, 0.8)),
                 url('https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80&brightness=1.2)`,
            backgroundSize: '45%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'absolute',
            top: '0',
            opacity: '0'
          }}
        >
          {/* Subtle particles */}
          <div className="particle-layer">
            {particles.map(particle => (
              <div
                key={particle.id}
                className="floating-particle"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: particle.size,
                  height: particle.size,
                  opacity: particle.opacity,
                  backgroundColor: particle.color
                }}
              />
            ))}
          </div>

          {/* Minimal shapes */}
          <div className="shape-layer">
            {shapes.map(shape => (
              <div
                key={shape.id}
                className={`geometric-shape ${shape.type}`}
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
        <div ref={contentRef} className="glass-content-layer">
          <div className="content-wrapper">
            {/* Progress Indicator */}
            <div className="scroll-progress-indicator">
              <div className="progress-track">
                <div 
                  className="progress-fill"
                  style={{ width: `${scrollProgress * 100}%` }}
                >
                  <div className="progress-glow"></div>
                </div>
              </div>
              <div className="progress-text">
                {isActive ? 'Viewing Production Showcase' : 'Scroll to begin'}
              </div>
            </div>

            {/* Main Header */}
            <div className="main-header">
              <div className="section-badge">
                <span className="badge-text">Production Excellence</span>
              </div>
              <h1 className="main-title">
                Crafting Digital
                <span className="title-accent"> Masterpieces</span>
              </h1>
              <p className="section-description">
                At Nano Nexus, we transform ideas into exceptional digital experiences 
                through precision engineering and innovative design.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="highlights-grid-section">
              <h2 className="section-heading">Our Production Standards</h2>
              <div className="glass-highlights-grid">
                {productionHighlights.map((item, index) => (
                  <div 
                    key={index}
                    className="glass-highlight-card"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="card-icon-wrapper">
                      <div className="card-icon" style={{ color: item.color }}>
                        {item.icon}
                      </div>
                      <div className="icon-glow" style={{ backgroundColor: item.color }}></div>
                    </div>
                    <div className="card-metric-display">
                      <div className="metric-value" style={{ color: item.color }}>
                        {item.value}
                      </div>
                      <div className="metric-label">{item.metric}</div>
                    </div>
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-description">{item.description}</p>
                    <div className="quality-badge">
                      <div className="badge-dot" style={{ backgroundColor: item.color }}></div>
                      <span>Production Certified</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="tech-stack-section">
              <div className="section-header">
                <h2>Technology Excellence</h2>
                <p>Mastering modern tools for superior results</p>
              </div>
              
              <div className="glass-tech-container">
                {techStack.map((tech, index) => (
                  <div key={index} className="tech-item-glass">
                    <div className="tech-info">
                      <span className="tech-name">{tech.name}</span>
                      <span className="tech-percentage">{tech.percentage}%</span>
                    </div>
                    <div className="tech-progress-bar">
                      <div 
                        className="tech-progress-fill"
                        style={{ 
                          width: `${tech.percentage}%`,
                          background: `linear-gradient(90deg, var(--accent-1), var(--accent-2))`
                        }}
                      >
                        <div className="progress-shine"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Showcase */}
            <div className="process-showcase-section">
              <div className="glass-process-card">
                <h2>Our Refined Process</h2>
                <div className="process-steps-grid">
                  {[
                    { number: '01', title: 'Discovery & Planning', desc: 'Understanding your vision and requirements' },
                    { number: '02', title: 'Design & Prototyping', desc: 'Creating intuitive and beautiful interfaces' },
                    { number: '03', title: 'Development', desc: 'Building with clean, maintainable code' },
                    { number: '04', title: 'Testing & Launch', desc: 'Ensuring quality and seamless deployment' }
                  ].map((step, index) => (
                    <div key={index} className="process-step-glass">
                      <div className="step-number" style={{ color: 'var(--accent-1)' }}>
                        {step.number}
                      </div>
                      <div className="step-content">
                        <h3>{step.title}</h3>
                        <p>{step.desc}</p>
                      </div>
                      {index < 3 && <div className="step-connector"></div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="stats-showcase">
              <div className="glass-stats-card">
                <h2>Quality Metrics</h2>
                <div className="stats-grid-glass">
                  {[
                    { value: '100%', label: 'Client Satisfaction', icon: '🎯' },
                    { value: '95+', label: 'Performance Score', icon: '⚡' },
                    { value: '24/7', label: 'Support Coverage', icon: '🔄' },
                    { value: '50+', label: 'Projects Delivered', icon: '📊' }
                  ].map((stat, index) => (
                    <div key={index} className="stat-item-glass">
                      <div className="stat-icon">{stat.icon}</div>
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="glass-cta-section">
              <div className="cta-content">
                <h2>Ready to Build Something Amazing?</h2>
                <p>Let's discuss how we can bring your vision to life</p>
                <div className="cta-buttons">
                  <button className="glass-button primary">
                    Start a Project
                  </button>
                  <button className="glass-button secondary">
                    View Portfolio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Section Teaser */}
      <div className="next-section-teaser">
        <div className="teaser-content">
          <h3>Explore Our Work</h3>
          <p>See the digital solutions we've crafted for clients</p>
          <div className="scroll-down">
            <div className="down-arrow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NanoNexusProductionThemed;