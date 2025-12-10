import React, { useState } from 'react';
import { useScroll } from '../../hooks/useScroll';
import Logo from './Logo';
import './Navbar.css';

const Navbar = ({ toggleTheme, theme }) => {
  const { isScrolled } = useScroll();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Normal layout for unscrolled state */}
          {!isScrolled && (
            <>
              <Logo />
              <div className="nav-menu">
                <a href="#home" className="nav-link">Home</a>
                <a href="#about" className="nav-link">About</a>
                <a href="#services" className="nav-link">Services</a>
                <a href="#projects" className="nav-link">Projects</a>
                <a href="#contact" className="nav-link">Contact</a>
                <button 
                  className="theme-toggle"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  {theme === 'light' ? '🌙' : '☀️'}
                </button>
              </div>
              <button 
                className={`hamburger ${isSidebarOpen ? 'active' : ''}`}
                onClick={toggleSidebar}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </>
          )}
          
          {/* Centered layout for scrolled state */}
          {isScrolled && (
            <div className="centered-content">
              <Logo />
              <div className="centered-nav">
                <a href="#home" className="nav-link">Home</a>
                <a href="#about" className="nav-link">About</a>
                <a href="#services" className="nav-link">Services</a>
                <a href="#projects" className="nav-link">Projects</a>
                <a href="#contact" className="nav-link">Contact</a>
                <button 
                  className="theme-toggle"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  {theme === 'light' ? '🌙' : '☀️'}
                </button>
              </div>
              <button 
                className={`hamburger ${isSidebarOpen ? 'active' : ''}`}
                onClick={toggleSidebar}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
        onClick={closeSidebar}
      ></div>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Logo />
          <button 
            className="sidebar-close"
            onClick={closeSidebar}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <a href="#home" className="sidebar-link" onClick={closeSidebar}>
            <span>🏠</span>
            Home
          </a>
          <a href="#about" className="sidebar-link" onClick={closeSidebar}>
            <span>👥</span>
            About
          </a>
          <a href="#services" className="sidebar-link" onClick={closeSidebar}>
            <span>🛠️</span>
            Services
          </a>
          <a href="#projects" className="sidebar-link" onClick={closeSidebar}>
            <span>💼</span>
            Projects
          </a>
          <a href="#contact" className="sidebar-link" onClick={closeSidebar}>
            <span>📞</span>
            Contact
          </a>
        </nav>

        <div className="sidebar-footer">
          <button 
            className="sidebar-theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <span>{theme === 'light' ? '🌙' : '☀️'}</span>
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Navbar;

