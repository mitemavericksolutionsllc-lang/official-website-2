import React, { useState, useEffect } from 'react';
import './ShrinkNavbar.css';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const ShrinkNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  // Scroll effect with 40% shrink
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 100);
      
      // Calculate scale for smooth transition
      const scale = Math.max(0.6, 1 - (scrollY / 250));
      const navbar = document.querySelector('.shrink-nav');
      if (navbar) {
        navbar.style.transform = `scale(${scale})`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate logo on mount
  useEffect(() => {
    const logo = document.querySelector('.logo-main');
    if (logo) {
      logo.style.animation = 'logoReveal 1s ease forwards';
    }
  }, []);

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

  return (
    <nav className={`shrink-nav ${scrolled ? 'scrolled' : ''} ${darkMode ? 'dark' : ''}`}>
      <div className="nav-content">
        {/* Logo with Animation */}
        <div 
          className="logo-wrapper"
          onClick={() => scrollToSection('home')}
        >
          <div className="logo-container">
            <h1 className="logo-main">Nano Nexus</h1>
            <div className="logo-tagline">
              <span className="tagline-text">Solution</span>
              <div className="tagline-dot"></div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-btn ${activeLink === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
              <span className="nav-line"></span>
            </button>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="nav-actions">
          <button 
            className="theme-btn"
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
          >
            {darkMode ? <FiMoon /> : <FiSun />}
          </button>
          
          <button 
            className="mobile-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`mobile-btn-item ${activeLink === item.id ? 'active' : ''}`}
            onClick={() => scrollToSection(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default ShrinkNavbar;