import React, { useState, useEffect } from 'react';
import './FixedLogoNavbar.css';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const FixedLogoNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [logoAnimated, setLogoAnimated] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate logo on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Trigger animation when scrolled
  useEffect(() => {
    if (scrolled) {
      setLogoAnimated(false);
      const timer = setTimeout(() => {
        setLogoAnimated(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [scrolled]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveLink(id);
      setMenuOpen(false);
    }
  };

  // Simple logo text
  const logoText = "Nano Nexus";
  const letters = logoText.split('');

  return (
    <nav className={`logo-nav ${scrolled ? 'scrolled' : ''} ${darkMode ? 'dark' : ''}`}>
      <div className="nav-inner">
        {/* Logo Section */}
        <div 
          className="logo-section"
          onClick={() => scrollToSection('home')}
        >
          <div className={`logo-box ${logoAnimated ? 'animated' : ''}`}>
            <h1 className="logo-title">
              {letters.map((letter, index) => (
                <span 
                  key={index} 
                  className="logo-char"
                  data-index={index}
                  data-scrolled={scrolled}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </h1>
            <div className="logo-subtitle">
              <span className={`subtitle-text ${scrolled ? 'small' : ''}`}>
                Solution
              </span>
              <div className="subtitle-line"></div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="nav-links-wrapper">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-button ${activeLink === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
              <span className="button-line"></span>
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="nav-actions-wrapper">
          <button 
            className="theme-button"
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
          >
            {darkMode ? <FiMoon /> : <FiSun />}
          </button>
          
          <button 
            className="mobile-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu-wrapper ${menuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`mobile-menu-button ${activeLink === item.id ? 'active' : ''}`}
            onClick={() => scrollToSection(item.id)}
          >
            {item.label}
            <span className="menu-arrow">→</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default FixedLogoNavbar;