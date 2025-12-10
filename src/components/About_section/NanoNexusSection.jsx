// NanoNexusSection.jsx
import React, { useEffect, useRef, useState } from 'react';
import './NanoNexusSection.css';

const NanoNexusSection = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [particles, setParticles] = useState([]);
  const [shapes, setShapes] = useState([]);

  // Initialize minimal particles and shapes
  useEffect(() => {
    // Fewer, more refined particles
    const particleCount = 20;
    const newParticles = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.4 + 0.2,
        color: `hsla(${Math.random() * 40 + 220}, 80%, 70%, 0.6)`
      });
    }
    setParticles(newParticles);

    // Minimal geometric shapes
    const shapeCount = 5;
    const newShapes = [];
    const shapeTypes = ['circle', 'triangle', 'square'];
    for (let i = 0; i < shapeCount; i++) {
      newShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 60 + 30,
        opacity: Math.random() * 0.15 + 0.05,
        rotation: Math.random() * 360,
        speed: Math.random() * 0.2 + 0.05,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        color: `hsla(${Math.random() * 30 + 220}, 60%, 80%, 0.1)`
      });
    }
    setShapes(newShapes);
  }, []);

  useEffect(() => {
    let rafId;
    let animationFrame;

    // Animate particles and shapes subtly
    const animateElements = () => {
      setParticles(prev => prev.map(p => ({
        ...p,
        y: (p.y + p.speed) % 100,
        opacity: Math.sin(Date.now() / 2000 + p.id) * 0.1 + 0.3
      })));

      setShapes(prev => prev.map(s => ({
        ...s,
        y: (s.y + s.speed) % 100,
        rotation: (s.rotation + s.speed * 0.3) % 360
      })));

      animationFrame = requestAnimationFrame(animateElements);
    };

    const handleScroll = () => {
      if (!sectionRef.current || !bgRef.current) return;

      const section = sectionRef.current;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      const scrollInSection = Math.max(0, scrollY - sectionTop + windowHeight * 0.3);
      const maxScroll = sectionHeight + windowHeight * 0.3;
      const currentProgress = Math.max(0, Math.min(1, scrollInSection / maxScroll));
      setProgress(currentProgress);

      // Check if we're in the section
      const inSection = scrollY > sectionTop - windowHeight && 
                       scrollY < sectionTop + sectionHeight - 100;
      setIsActive(inSection);

      if (inSection) {
        if (currentProgress < 0.2) {
          const phaseProgress = currentProgress / 0.2;
          
          // Clear glass effect - less blur, more transparency
          bgRef.current.style.opacity = phaseProgress;
          bgRef.current.style.transform = `translateY(${(1 - phaseProgress) * 30}px)`;
          bgRef.current.style.backdropFilter = `
            blur(${phaseProgress * 10}px)
            contrast(${100 + phaseProgress * 20}%)
          `;
          bgRef.current.style.background = `
            linear-gradient(
              135deg,
              hsla(220, 40%, 15%, ${0.1 + phaseProgress * 0.3}) 0%,
              hsla(220, 40%, 8%, ${0.05 + phaseProgress * 0.2}) 100%
            )
          `;
          bgRef.current.style.position = 'fixed';
          bgRef.current.style.top = '0';
        }
        else if (currentProgress >= 0.2 && currentProgress < 0.8) {
          // Clear glass effect during sticky phase
          const pulse = Math.sin(Date.now() / 3000) * 0.05;
          
          bgRef.current.style.opacity = '1';
          bgRef.current.style.transform = 'translateY(0)';
          bgRef.current.style.backdropFilter = `
            blur(10px)
            contrast(120%)
          `;
          bgRef.current.style.background = `
            linear-gradient(
              135deg,
              hsla(220, 40%, 15%, 0.4) 0%,
              hsla(220, 40%, 8%, 0.3) 100%
            )
          `;
          bgRef.current.style.boxShadow = `
            inset 0 0 0 1px rgba(255, 255, 255, 0.08),
            0 4px 20px rgba(0, 0, 0, 0.1)
          `;
          bgRef.current.style.position = 'fixed';
          bgRef.current.style.top = '0';
        }
        else if (currentProgress >= 0.8) {
          const fadeOutProgress = (currentProgress - 0.8) / 0.2;
          
          bgRef.current.style.opacity = 1 - fadeOutProgress;
          bgRef.current.style.transform = `translateY(${-fadeOutProgress * 30}px)`;
          bgRef.current.style.backdropFilter = `
            blur(${10 * (1 - fadeOutProgress)}px)
            contrast(${120 * (1 - fadeOutProgress)}%)
          `;
          
          if (currentProgress > 0.95) {
            bgRef.current.style.position = 'absolute';
            bgRef.current.style.top = '100%';
          } else {
            bgRef.current.style.position = 'fixed';
            bgRef.current.style.top = '0';
          }
        }
      } else {
        bgRef.current.style.opacity = '0';
        bgRef.current.style.position = 'absolute';
        bgRef.current.style.top = '0';
      }

      // Content parallax
      if (contentRef.current) {
        const parallax = currentProgress * 50;
        contentRef.current.style.transform = `translateY(${parallax}px)`;
      }

      rafId = requestAnimationFrame(handleScroll);
    };

    animationFrame = requestAnimationFrame(animateElements);
    rafId = requestAnimationFrame(handleScroll);

    return () => {
      cancelAnimationFrame(animationFrame);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Company stats
  const companyStats = [
    { value: '50+', label: 'Projects Completed', icon: '🚀' },
    { value: '98%', label: 'Client Satisfaction', icon: '⭐' },
    { value: '24/7', label: 'Support Available', icon: '🛡️' },
    { value: '5+', label: 'Years Experience', icon: '🎯' }
  ];

  // Services
  const services = [
    {
      title: 'Web Development',
      description: 'Custom websites and web applications built with cutting-edge technologies.',
      tech: ['React', 'Next.js', 'Node.js'],
      icon: '🌐'
    },
    {
      title: 'UI/UX Design',
      description: 'Beautiful, user-centered designs that drive engagement and conversions.',
      tech: ['Figma', 'Adobe XD', 'Framer'],
      icon: '🎨'
    },
    {
      title: 'E-commerce Solutions',
      description: 'Scalable online stores with seamless payment integration and management.',
      tech: ['Shopify', 'WooCommerce', 'Custom'],
      icon: '🛒'
    },
    {
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      tech: ['React Native', 'Flutter', 'Swift'],
      icon: '📱'
    }
  ];

  // Team members
  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'Lead Developer',
      expertise: 'Full Stack & DevOps',
      avatar: '👨‍💻'
    },
    {
      name: 'Sarah Johnson',
      role: 'UI/UX Designer',
      expertise: 'Product Design & Research',
      avatar: '👩‍🎨'
    },
    {
      name: 'Marcus Lee',
      role: 'Project Manager',
      expertise: 'Agile & Scrum Master',
      avatar: '👨‍💼'
    },
    {
      name: 'Elena Rodriguez',
      role: 'Marketing Strategist',
      expertise: 'Digital Marketing & SEO',
      avatar: '👩‍💼'
    }
  ];

  return (
    <div className="nanonexus-container">
      {/* Hero Introduction */}
      <div className="intro-section">
        <div className="intro-content">
          <div className="company-logo">
            <span className="logo-icon">⚡</span>
            <h1 className="logo-text">Nano Nexus</h1>
          </div>
          <p className="company-tagline">Precision Web Development at Scale</p>
          <div className="scroll-cta">
            <span>Discover Our Story</span>
            <div className="arrow-down"></div>
          </div>
        </div>
      </div>

      {/* Main About Section */}
      <section ref={sectionRef} className="nanonexus-section" style={{ minHeight: '250vh' }}>
        {/* Clear Glass Background */}
        <div 
          ref={bgRef}
          className="clear-glass-background"
          style={{
            position: 'fixed',
            top: '0',
            opacity: '0'
          }}
        >
          {/* Subtle particles */}
          <div className="subtle-particles">
            {particles.map(particle => (
              <div
                key={particle.id}
                className="particle-dot"
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
          <div className="minimal-shapes">
            {shapes.map(shape => (
              <div
                key={shape.id}
                className={`floating-shape ${shape.type}`}
                style={{
                  left: `${shape.x}%`,
                  top: `${shape.y}%`,
                  width: shape.size,
                  height: shape.size,
                  opacity: shape.opacity,
                  transform: `rotate(${shape.rotation}deg)`,
                  border: `1px solid ${shape.color}`
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="company-content">
          <div className="content-container">
            {/* Section Header */}
            <div className="section-header">
              <div className="section-badge">
                <span className="badge-text">About Nano Nexus</span>
                <div className="badge-glow"></div>
              </div>
              <h1 className="section-title">
                <span className="title-highlight">Building Digital</span>
                <span className="title-highlight">Excellence</span>
              </h1>
              <p className="section-description">
                At Nano Nexus, we specialize in creating bespoke web solutions that 
                blend cutting-edge technology with exceptional design. Our team of 
                experts delivers scalable, high-performance applications that drive 
                business growth.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
              {companyStats.map((stat, index) => (
                <div 
                  key={index}
                  className="stat-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-bar">
                    <div className="bar-fill" style={{ width: '100%' }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Company Mission */}
            <div className="mission-section">
              <div className="mission-card">
                <div className="mission-icon">🎯</div>
                <h2>Our Mission</h2>
                <p>
                  To empower businesses with innovative web solutions that are 
                  not just functional, but transformative. We believe in creating 
                  digital experiences that make a difference.
                </p>
                <div className="mission-highlights">
                  <span className="highlight">Innovation</span>
                  <span className="highlight">Precision</span>
                  <span className="highlight">Excellence</span>
                </div>
              </div>

              <div className="values-card">
                <div className="values-icon">✨</div>
                <h2>Core Values</h2>
                <ul className="values-list">
                  <li>
                    <div className="value-dot"></div>
                    <span>Quality Above All</span>
                  </li>
                  <li>
                    <div className="value-dot"></div>
                    <span>Client-Centric Approach</span>
                  </li>
                  <li>
                    <div className="value-dot"></div>
                    <span>Innovation & Learning</span>
                  </li>
                  <li>
                    <div className="value-dot"></div>
                    <span>Transparent Communication</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Services */}
            <div className="services-section">
              <div className="section-intro">
                <h2>Our Services</h2>
                <p>Comprehensive web solutions tailored to your business needs</p>
              </div>
              
              <div className="services-grid">
                {services.map((service, index) => (
                  <div 
                    key={index}
                    className="service-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="service-header">
                      <div className="service-icon">{service.icon}</div>
                      <h3>{service.title}</h3>
                    </div>
                    <p className="service-description">{service.description}</p>
                    <div className="tech-stack">
                      {service.tech.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    <div className="service-cta">
                      <span>Learn More</span>
                      <div className="arrow-right"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Section */}
            <div className="team-section">
              <div className="team-header">
                <h2>Meet Our Team</h2>
                <p>The brilliant minds behind Nano Nexus</p>
              </div>
              
              <div className="team-grid">
                {teamMembers.map((member, index) => (
                  <div 
                    key={index}
                    className="team-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="member-avatar">{member.avatar}</div>
                    <div className="member-info">
                      <h3>{member.name}</h3>
                      <p className="member-role">{member.role}</p>
                      <p className="member-expertise">{member.expertise}</p>
                    </div>
                    <div className="member-social">
                      <div className="social-dot"></div>
                      <div className="social-dot"></div>
                      <div className="social-dot"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="cta-section">
              <div className="cta-card">
                <h2>Ready to Transform Your Digital Presence?</h2>
                <p>
                  Let's build something amazing together. Contact us today for a 
                  free consultation and project estimate.
                </p>
                <div className="cta-buttons">
                  <button className="btn-primary">
                    <span>Start a Project</span>
                    <div className="btn-glow"></div>
                  </button>
                  <button className="btn-secondary">
                    <span>Schedule a Call</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Footer */}
        <div className="section-footer">
          <div className="footer-line"></div>
          <span className="footer-text">Nano Nexus © {new Date().getFullYear()}</span>
        </div>
      </section>

      {/* Next Section Preview */}
      <div className="next-preview">
        <div className="preview-content">
          <h2>Explore Our Portfolio</h2>
          <p>See the amazing projects we've built for our clients</p>
          <div className="preview-arrow">↓</div>
        </div>
      </div>
    </div>
  );
};

export default NanoNexusSection;