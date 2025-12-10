// SectionStickyBackground.jsx
import React, { useRef } from 'react';
import './SectionStickyBackground.css';

const SectionStickyBackground = () => {
  const sectionsRef = useRef([]);

  const addToRefs = (el, index) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current[index] = el;
    }
  };

  const sections = [
    {
      id: 'section1',
      title: 'First Section',
      content: 'This background is sticky only within this section.',
      bgColor: '#667eea',
      bgImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
    },
    {
      id: 'section2',
      title: 'Second Section',
      content: 'This section has its own sticky background that only works within its bounds.',
      bgColor: '#764ba2',
      bgImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba'
    },
    {
      id: 'section3',
      title: 'Third Section',
      content: 'Each section contains its own sticky background that releases at section end.',
      bgColor: '#f093fb',
      bgImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b'
    }
  ];

  return (
    <div className="section-sticky-container">
      {/* Introduction */}
      <div className="intro-section">
        <h1>Section-Specific Sticky Backgrounds</h1>
        <p>Each section below has its own background that sticks only within that section.</p>
      </div>

      {/* Sections with individual sticky backgrounds */}
      {sections.map((section, index) => (
        <section
          key={section.id}
          ref={(el) => addToRefs(el, index)}
          className="sticky-section-wrapper"
          style={{ '--section-color': section.bgColor }}
        >
          {/* Background Container - Sticky only within this section */}
          <div className="section-sticky-bg">
            <div 
              className="sticky-bg-image"
              style={{ backgroundImage: `url(${section.bgImage})` }}
            />
            <div className="sticky-bg-overlay"></div>
          </div>

          {/* Section Content */}
          <div className="section-content-container">
            <div className="section-header">
              <span className="section-number">0{index + 1}</span>
              <h2 className="section-title">{section.title}</h2>
            </div>
            
            <div className="section-body">
              <p className="section-text">{section.content}</p>
              
              <div className="scroll-indicator">
                <div className="indicator-text">
                  Background sticks within this section only
                </div>
                <div className="indicator-bar">
                  <div className="indicator-progress"></div>
                </div>
              </div>

              {/* Dummy content to make section scrollable */}
              <div className="dummy-content">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="content-block">
                    <h3>Content Block {i + 1}</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Final Section */}
      <div className="final-section">
        <h2>Beyond Sticky Backgrounds</h2>
        <p>After the last section's background releases, this content appears normally.</p>
      </div>
    </div>
  );
};

export default SectionStickyBackground;