import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle dark mode and update body class
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  // Smooth scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''} ${darkMode ? 'dark' : ''}`}>
      <div className="navbar-container">
        {/* Logo Section with Animation */}
        <div className="logo-container">
          <div className="logo-animation">
            <h1 className="logo-text">
              <span className="logo-part">Nano</span>
              <span className="logo-part">Nexus</span>
            </h1>
            <div className="tagline-container">
              <span className="tagline-text">Solution</span>
              <div className="tagline-underline"></div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className={`nav-links ${scrolled ? 'nav-links-centered' : ''}`}>
          <button 
            className="nav-link" 
            onClick={() => scrollToSection('home')}
          >
            Home
          </button>
          <button 
            className="nav-link" 
            onClick={() => scrollToSection('about')}
          >
            About
          </button>
          <button 
            className="nav-link" 
            onClick={() => scrollToSection('services')}
          >
            Services
          </button>
          <button 
            className="nav-link" 
            onClick={() => scrollToSection('portfolio')}
          >
            Portfolio
          </button>
          <button 
            className="nav-link" 
            onClick={() => scrollToSection('contact')}
          >
            Contact
          </button>
        </div>

        {/* Dark/Light Mode Toggle */}
        <div className="theme-toggle-container">
          <button 
            className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <div className="toggle-track">
              <div className="toggle-thumb">
                {darkMode ? '🌙' : '☀️'}
              </div>
            </div>
            <span className="toggle-label">
              {darkMode ? 'Dark' : 'Light'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;