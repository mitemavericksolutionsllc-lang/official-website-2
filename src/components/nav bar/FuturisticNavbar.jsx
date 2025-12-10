import React, { useState, useEffect, useRef } from 'react';
import './FuturisticNavbar.css';
import { 
  FiSun, 
  FiMoon, 
  FiMenu,
  FiX,
  FiCpu,
  FiChevronDown 
} from 'react-icons/fi';
import { 
  IoIosRocket, 
  IoMdAnalytics,
  IoMdSettings 
} from 'react-icons/io';
import { GiCircuitry } from 'react-icons/gi';

const FuturisticNavbar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const navRef = useRef(null);
  const logoRef = useRef(null);

  // Particles effect
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);

      // Determine active section
      const sections = ['home', 'about', 'services', 'solutions', 'tech', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Holographic logo animation
  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    const handleMouseMove = (e) => {
      const rect = logo.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      logo.style.setProperty('--mouse-x', `${x}px`);
      logo.style.setProperty('--mouse-y', `${y}px`);
    };

    logo.addEventListener('mousemove', handleMouseMove);
    return () => logo.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: <FiCpu /> },
    { id: 'about', label: 'About', icon: <IoIosRocket /> },
    { id: 'services', label: 'Services', icon: <IoMdSettings /> },
    { id: 'solutions', label: 'Solutions', icon: <GiCircuitry /> },
    { id: 'tech', label: 'Technology', icon: <IoMdAnalytics /> },
    { id: 'contact', label: 'Contact', icon: <FiChevronDown /> },
  ];

  return (
    <>
      {/* Background Particles */}
      <div className="particles-background"></div>
      
      {/* Cyber Grid Overlay */}
      <div className="cyber-grid"></div>

      <nav 
        ref={navRef}
        className={`cyber-nav ${scrolled ? 'cyber-nav-scrolled' : ''} ${darkMode ? 'cyber-dark' : 'cyber-light'}`}
        data-scrolled={scrolled}
      >
        {/* Neon Top Border */}
        <div className="neon-border"></div>
        
        <div className="cyber-nav-container">
          {/* Holographic Logo */}
          <div 
            ref={logoRef}
            className="holographic-logo"
            onClick={() => scrollToSection('home')}
          >
            <div className="logo-matrix">
              <div className="matrix-grid"></div>
              <div className="logo-core">
                <span className="logo-text nano">NANO</span>
                <span className="logo-text nexus">NEXUS</span>
                <div className="logo-tagline">
                  <span className="tagline-text">SOLUTION</span>
                  <div className="tagline-cyber-line">
                    <div className="cyber-dot"></div>
                    <div className="cyber-dot"></div>
                    <div className="cyber-dot"></div>
                  </div>
                </div>
              </div>
              <div className="logo-particles">
                <div className="particle p1"></div>
                <div className="particle p2"></div>
                <div className="particle p3"></div>
                <div className="particle p4"></div>
              </div>
            </div>
          </div>

          {/* Navigation Links with Hover Effects */}
          <div className="cyber-nav-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`cyber-nav-link ${activeSection === item.id ? 'active' : ''}`}
                onMouseEnter={() => setHoveredLink(item.id)}
                onMouseLeave={() => setHoveredLink(null)}
                onClick={() => scrollToSection(item.id)}
                data-hover={hoveredLink === item.id}
              >
                <span className="cyber-link-icon">{item.icon}</span>
                <span className="cyber-link-text">{item.label}</span>
                <span className="cyber-link-hover"></span>
                <span className="cyber-link-active"></span>
              </button>
            ))}
          </div>

          {/* Interactive Theme Toggle */}
          <div className="cyber-theme-toggle">
            <div className="toggle-interface">
              <button
                className={`cyber-toggle-btn ${darkMode ? 'active' : ''}`}
                onClick={toggleDarkMode}
                aria-label="Toggle theme"
              >
                <div className="toggle-core">
                  <div className="toggle-orb">
                    {darkMode ? <FiMoon /> : <FiSun />}
                  </div>
                  <div className="toggle-rail">
                    <div className="rail-glow"></div>
                  </div>
                </div>
                <div className="toggle-label">
                  <span className="mode-indicator">
                    {darkMode ? 'DARK MATRIX' : 'NEON MODE'}
                  </span>
                  <span className="mode-status">
                    {darkMode ? 'ACTIVE' : 'ACTIVE'}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="cyber-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="cyber-menu-icon">
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`cyber-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-grid">
            {navItems.map((item) => (
              <button
                key={item.id}
                className="mobile-cyber-link"
                onClick={() => scrollToSection(item.id)}
              >
                <span className="mobile-link-icon">{item.icon}</span>
                <span className="mobile-link-text">{item.label}</span>
                <span className="mobile-link-arrow">→</span>
              </button>
            ))}
          </div>
        </div>

        {/* Scanning Line Effect */}
        <div className="scan-line"></div>
      </nav>
    </>
  );
};

export default FuturisticNavbar;