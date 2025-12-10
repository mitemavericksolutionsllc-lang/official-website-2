// NavBarAnimation.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FiSun, FiMoon, FiCpu, FiMenu, FiX, FiHome, FiBriefcase, FiTool, FiCpu as FiTech, FiInfo, FiMail } from 'react-icons/fi';
import './NavBarAnimation.css';

const NavBarAnimation = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoLetters, setLogoLetters] = useState([]);
  const [taglineLetters, setTaglineLetters] = useState([]);
  const navbarRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  // Split logo and tagline into letters for animation
  useEffect(() => {
    const logo = "Nano Nexus";
    const tagline = "Solusion";
    
    setLogoLetters(logo.split('').map((letter, index) => ({
      char: letter,
      id: `logo-${index}`,
      delay: index * 0.1,
      opacity: 0,
      transform: 'translateY(20px)',
    })));
    
    setTaglineLetters(tagline.split('').map((letter, index) => ({
      char: letter,
      id: `tagline-${index}`,
      delay: index * 0.05 + 1.2, // Staggered after logo
      opacity: 0,
      transform: 'translateY(10px)',
    })));
  }, []);

  // Animate letters on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoLetters(prev => prev.map(letter => ({
        ...letter,
        opacity: 1,
        transform: 'translateY(0)',
      })));
      
      setTimeout(() => {
        setTaglineLetters(prev => prev.map(letter => ({
          ...letter,
          opacity: 1,
          transform: 'translateY(0)',
        })));
      }, 300);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll handling with debouncing
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        const scrollPosition = window.scrollY;
        const scrolled = scrollPosition > 30;
        setIsScrolled(scrolled);

        // Calculate smooth scroll progress (0 to 1)
        const scrollPercent = Math.min(scrollPosition / 200, 1);
        
        // Update CSS custom properties for smooth transformations
        document.documentElement.style.setProperty('--scroll-percent', scrollPercent);
        
        // Calculate scale factor with easing
        const easeOutCubic = 1 - Math.pow(1 - Math.min(scrollPercent, 1), 3);
        const scale = 1 - (easeOutCubic * 0.15); // Scale from 1 to 0.85
        
        document.documentElement.style.setProperty('--navbar-scale', scale);
        
        // Calculate position offset with easing
        const positionOffset = easeOutCubic * 100; // 0 to 100px
        document.documentElement.style.setProperty('--position-offset', `${positionOffset}px`);
        
        // Calculate opacity for tagline with easing
        const taglineOpacity = 1 - (easeOutCubic * 1.2); // Faster fade out
        document.documentElement.style.setProperty('--tagline-opacity', Math.max(taglineOpacity, 0));
        
        // Update letter animations based on scroll
        const scrollFactor = Math.min(scrollPosition / 100, 1);
        
        setLogoLetters(prev => prev.map((letter, index) => ({
          ...letter,
          opacity: 1 - (scrollFactor * 0.3),
          transform: `translateY(${scrollFactor * 5}px)`,
          scale: 1 - (scrollFactor * 0.15),
        })));
        
        setTaglineLetters(prev => prev.map((letter, index) => ({
          ...letter,
          opacity: Math.max(0.7 - scrollFactor, 0),
          transform: `translateY(${scrollFactor * 10}px)`,
        })));
        
      }, 16); // ~60fps
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark-theme');
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark-theme');
    }
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = navbarRef.current?.offsetHeight || 0;
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home', icon: <FiHome /> },
    { id: 'services', label: 'Services', icon: <FiBriefcase /> },
    { id: 'solutions', label: 'Solutions', icon: <FiTool /> },
    { id: 'technology', label: 'Technology', icon: <FiTech /> },
    { id: 'about', label: 'About', icon: <FiInfo /> },
    { id: 'contact', label: 'Contact', icon: <FiMail /> },
  ];

  // Handle logo hover for letter animation
  const handleLogoHover = () => {
    setLogoLetters(prev => prev.map((letter, index) => ({
      ...letter,
      transform: `translateY(${Math.sin(index) * -3}px)`,
      scale: 1.1,
    })));
    
    setTimeout(() => {
      setLogoLetters(prev => prev.map(letter => ({
        ...letter,
        transform: 'translateY(0)',
        scale: 1,
      })));
    }, 300);
  };

  return (
    <nav 
      className={`navbar-animation ${isScrolled ? 'scrolled' : ''}`}
      ref={navbarRef}
    >
      {/* Animated Background Gradient */}
      <div className="navbar-gradient"></div>
      
      <div className="navbar-container">
        {/* Logo with Letter-by-Letter Animation */}
        <div className="logo-wrapper">
          <div 
            className="logo-transform"
            onMouseEnter={handleLogoHover}
            onClick={() => scrollToSection('home')}
          >
            {/* Logo Icon */}
            <div className="logo-icon-container">
              <FiCpu className="logo-svg" />
              <div className="icon-glow"></div>
              <div className="icon-orbits">
                <div className="orbit orbit-1"></div>
                <div className="orbit orbit-2"></div>
                <div className="orbit orbit-3"></div>
              </div>
            </div>
            
            {/* Animated Logo Text */}
            <div className="logo-text-container">
              <div className="logo-letters">
                {logoLetters.map((letter) => (
                  <span
                    key={letter.id}
                    className="logo-letter"
                    style={{
                      opacity: letter.opacity,
                      transform: letter.transform,
                      animationDelay: `${letter.delay}s`,
                      transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${letter.delay}s`,
                      display: 'inline-block',
                      transformOrigin: 'center bottom',
                    }}
                  >
                    {letter.char === ' ' ? '\u00A0' : letter.char}
                  </span>
                ))}
              </div>
              
              {/* Animated Tagline */}
              <div className="tagline-letters">
                {taglineLetters.map((letter) => (
                  <span
                    key={letter.id}
                    className="tagline-letter"
                    style={{
                      opacity: letter.opacity,
                      transform: letter.transform,
                      animationDelay: `${letter.delay}s`,
                      transition: `all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${letter.delay}s`,
                      display: 'inline-block',
                    }}
                  >
                    {letter.char}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Connection Lines between Logo and Nav */}
            <div className="connection-lines">
              <div className="connection-line"></div>
              <div className="connection-line"></div>
              <div className="connection-line"></div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className={`nav-menu-wrapper ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="nav-content">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                className="nav-item"
                onClick={() => scrollToSection(item.id)}
                style={{
                  animationDelay: `${0.5 + index * 0.1}s`,
                }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                <span className="nav-underline"></span>
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="controls-wrapper">
          {/* Theme Toggle */}
          <button
            className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
          >
            <div className="toggle-track">
              <div className="toggle-thumb">
                {isDarkMode ? <FiSun /> : <FiMoon />}
              </div>
            </div>
          </button>
          
          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Scroll Progress Bar */}
      <div className="scroll-progress"></div>
    </nav>
  );
};

export default NavBarAnimation;