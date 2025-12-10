import React from 'react';
import { useScroll } from './useScroll';
import './Logo.css';

const Logo = () => {
  const { isScrolled } = useScroll();

  // If scrolled, show single line logo
  if (isScrolled) {
    return (
      <div className="logo-container scrolled">
        <div className="logo-text single-line">
          {['N', 'a', 'n', 'o', ' ', 'N', 'e', 'x', 'u', 's'].map((letter, index) => (
            <span 
              key={`single-${index}`} 
              className="logo-letter"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // Normal two-line logo for unscrolled state
  return (
    <div className="logo-container">
      <div className="logo-text">
        {/* Nano - Top Line */}
        <div className="logo-line">
          {['N', 'a', 'n', 'o'].map((letter, index) => (
            <span 
              key={`nano-${index}`} 
              className="logo-letter"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {letter}
            </span>
          ))}
        </div>
        {/* Nexus - Bottom Line */}
        <div className="logo-line">
          {['N', 'e', 'x', 'u', 's'].map((letter, index) => (
            <span 
              key={`nexus-${index}`} 
              className="logo-letter"
              style={{ animationDelay: `${(index + 4) * 0.1}s` }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Logo;