// NavBarAnimation.jsx
import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiCpu, FiMenu, FiX, FiHome, FiBriefcase, FiTool, FiCpu as FiTech, FiInfo, FiMail } from 'react-icons/fi';
import './NavBarAnimation.css';

const NavBarAnimation = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  // Handle scroll event with smooth transformations
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrolled = scrollPosition > 50;
      setIsScrolled(scrolled);
      
      // Calculate scroll progress for smooth transformations
      const scrollPercent = Math.min(scrollPosition / 300, 1);
      
      // Apply smooth CSS variable updates
      document.documentElement.style.setProperty('--scroll-progress', scrollPercent);
      
      // Calculate and apply navbar scaling
      const scale = 1 - (scrollPercent * 0.1); // Scales from 1 to 0.9
      const navbar = document.querySelector('.navbar-animation');
      if (navbar) {
        navbar.style.setProperty('--navbar-scale', scale);
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark-theme');
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  // Initialize theme from localStorage
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
      const navbarHeight = document.querySelector('.navbar-animation')?.offsetHeight || 0;
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  // Navigation items with icons
  const navItems = [
    { id: 'home', label: 'Home', icon: <FiHome /> },
    { id: 'services', label: 'Services', icon: <FiBriefcase /> },
    { id: 'solutions', label: 'Solutions', icon: <FiTool /> },
    { id: 'technology', label: 'Technology', icon: <FiTech /> },
    { id: 'about', label: 'About', icon: <FiInfo /> },
    { id: 'contact', label: 'Contact', icon: <FiMail /> },
  ];

  // Logo animation on hover
  const handleLogoHover = () => {
    setLogoHovered(true);
    setTimeout(() => setLogoHovered(false), 1000);
  };

  return (
    <nav className={`navbar-animation ${isScrolled ? 'scrolled' : ''}`}>
      {/* Scroll Progress Indicator */}
      <div className="scroll-indicator"></div>
      
      <div className="navbar-container">
        {/* Logo with Transform Animation */}
        <div className="logo-wrapper">
          <div 
            className="logo-transform"
            onMouseEnter={handleLogoHover}
            onClick={() => scrollToSection('home')}
          >
            <div className="logo-core">
              <div className={`logo-icon-animated ${logoHovered ? 'hover' : ''} ${isScrolled ? 'scaled' : ''}`}>
                <FiCpu className="logo-svg" />
                <div className="logo-glow"></div>
                <div className="logo-rings">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className={`logo-ring ring-${i + 1}`}></div>
                  ))}
                </div>
              </div>
              
              <div className="logo-text-transform">
                <h1 className="logo-title-animated">Nano Nexus</h1>
                <p className="logo-tagline-animated">Solusion</p>
              </div>
            </div>
            
            {/* Floating Particles */}
            <div className="logo-particles">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className={`logo-particle particle-${i + 1} ${logoHovered ? 'active' : ''}`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Menu with Smooth Transform */}
        <div className={`nav-transform-wrapper ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="nav-content-transform">
            {navItems.map((item) => (
              <button
                key={item.id}
                className="nav-item-transform"
                onClick={() => scrollToSection(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                <span className="nav-highlight"></span>
              </button>
            ))}
          </div>
        </div>

        {/* Controls with Smooth Animation */}
        <div className="controls-transform">
          <button
            className={`theme-toggle-transform ${isDarkMode ? 'dark' : 'light'}`}
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
          >
            <div className="toggle-container">
              <FiSun className="sun-icon" />
              <FiMoon className="moon-icon" />
              <div className="toggle-slider"></div>
            </div>
          </button>
          
          <button
            className="mobile-toggle-transform"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="hamburger">
              <span className={`line ${mobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`line ${mobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`line ${mobileMenuOpen ? 'open' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBarAnimation;