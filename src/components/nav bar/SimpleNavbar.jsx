import React, { useState, useEffect } from 'react';
import './SimpleNavbar.css';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const SimpleNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  // Smooth scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveLink(id);
      setMenuOpen(false);
    }
  };

  return (
    <nav className={`simple-nav ${scrolled ? 'scrolled' : ''} ${darkMode ? 'dark' : ''}`}>
      <div className="nav-container">
        {/* Logo Section */}
        <div 
          className="logo" 
          onClick={() => scrollToSection('home')}
          onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
          onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
        >
          <div className="logo-wrapper">
            <span className="logo-main">Nano Nexus</span>
            <div className="logo-tagline">
              <span className="tagline-text">Solution</span>
              <div className="tagline-underline"></div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${activeLink === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
              onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
              onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
            >
              <span className="link-text">{item.label}</span>
              <span className="link-dot"></span>
            </button>
          ))}
        </div>

        {/* Theme Toggle */}
        <button 
          className="theme-toggle"
          onClick={toggleDarkMode}
          aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
        >
          <div className="toggle-circle">
            {darkMode ? <FiMoon /> : <FiSun />}
          </div>
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`mobile-link ${activeLink === item.id ? 'active' : ''}`}
            onClick={() => scrollToSection(item.id)}
          >
            <span className="mobile-link-text">{item.label}</span>
            <span className="mobile-link-arrow">→</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default SimpleNavbar;