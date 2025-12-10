import React, { useState, useEffect } from 'react';
import './GlassNavbar.css';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const GlassNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Logo animation on load
  useEffect(() => {
    const timer = setTimeout(() => {
      const logo = document.querySelector('.logo');
      if (logo) {
        logo.classList.add('animate');
        setTimeout(() => logo.classList.remove('animate'), 1000);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'works', label: 'Our Works' },
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
    <nav className={`glass-nav ${scrolled ? 'scrolled' : ''} ${darkMode ? 'dark' : ''}`}>
      <div className="nav-wrapper">
        {/* Logo Section */}
        <div 
          className={`logo ${scrolled ? 'logo-small' : ''}`}
          onClick={() => scrollToSection('home')}
        >
          <div className="logo-content">
            <h1 className="logo-name">Nano Nexus</h1>
            <div className="logo-tagline">
              <span className="tagline">Solution</span>
              <div className="tagline-line"></div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="nav-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeLink === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              <span className="item-text">{item.label}</span>
              <span className="item-indicator"></span>
            </button>
          ))}
        </div>

        {/* Right Section */}
        <div className="nav-actions">
          <button 
            className="theme-switch"
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
          >
            {darkMode ? <FiMoon /> : <FiSun />}
          </button>
          
          <button 
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`mobile-item ${activeLink === item.id ? 'active' : ''}`}
            onClick={() => scrollToSection(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default GlassNavbar;