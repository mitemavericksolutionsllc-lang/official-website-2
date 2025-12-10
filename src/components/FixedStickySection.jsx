// FixedStickySection.jsx
import React, { useEffect, useRef, useState } from 'react';
import './FixedStickySection.css';

const FixedStickySection = () => {
  const sectionRef = useRef(null);
  const backgroundContainerRef = useRef(null);
  const backgroundImageRef = useRef(null);
  const contentRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInSection, setIsInSection] = useState(false);
  const [isScaling, setIsScaling] = useState(false);
  const [sectionPosition, setSectionPosition] = useState({ top: 0, bottom: 0, height: 0 });

  useEffect(() => {
    // Calculate section position
    const updateSectionPosition = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setSectionPosition({
        top: rect.top + scrollTop,
        bottom: rect.bottom + scrollTop,
        height: rect.height
      });
    };

    updateSectionPosition();
    window.addEventListener('resize', updateSectionPosition);

    let animationFrameId = null;

    const handleScroll = () => {
      if (!sectionRef.current || !backgroundContainerRef.current || !backgroundImageRef.current) return;

      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const sectionTop = sectionPosition.top;
      const sectionHeight = sectionPosition.height;
      const sectionBottom = sectionPosition.bottom; // FIXED: Defined here

      // Check if we're in the section
      const isEnteringSection = scrollY >= sectionTop - windowHeight;
      const isLeavingSection = scrollY >= sectionBottom - 100; // Now sectionBottom is defined

      if (isEnteringSection && !isLeavingSection) {
        setIsInSection(true);
        
        // Calculate scroll progress within section (0 to 1)
        const scrollInSection = scrollY - sectionTop;
        const maxScrollInSection = sectionHeight - windowHeight;
        const progress = Math.max(0, Math.min(1, scrollInSection / maxScrollInSection));
        setScrollProgress(progress);

        // PHASE 1: Scale up image (first 30% of section)
        if (progress <= 0.3) {
          setIsScaling(true);
          const scaleProgress = progress / 0.3;
          const scale = 0.6 + (scaleProgress * 0.4); // Scale from 60% to 100%
          backgroundImageRef.current.style.transform = `scale(${scale})`;
          backgroundImageRef.current.style.opacity = '1';
          backgroundContainerRef.current.style.position = 'fixed';
          backgroundContainerRef.current.style.top = '0';
          backgroundContainerRef.current.style.zIndex = '1';
        }
        // PHASE 2: Hold sticky (30% to 70%)
        else if (progress > 0.3 && progress <= 0.7) {
          setIsScaling(false);
          backgroundImageRef.current.style.transform = 'scale(1)';
          backgroundImageRef.current.style.opacity = '1';
          backgroundContainerRef.current.style.position = 'fixed';
          backgroundContainerRef.current.style.top = '0';
          backgroundContainerRef.current.style.zIndex = '1';
        }
        // PHASE 3: Fade out (70% to 100%)
        else {
          setIsScaling(false);
          const fadeProgress = (progress - 0.7) / 0.3;
          const opacity = 1 - fadeProgress;
          const scale = 1 + (fadeProgress * 0.1);
          
          backgroundImageRef.current.style.transform = `scale(${scale})`;
          backgroundImageRef.current.style.opacity = `${opacity}`;
          
          // Switch to absolute at the very end
          if (progress >= 0.95) {
            backgroundContainerRef.current.style.position = 'absolute';
            backgroundContainerRef.current.style.top = `${sectionHeight - windowHeight}px`;
          } else {
            backgroundContainerRef.current.style.position = 'fixed';
            backgroundContainerRef.current.style.top = '0';
          }
        }

        // Parallax effect for content
        if (contentRef.current) {
          const parallaxAmount = progress * 100;
          contentRef.current.style.transform = `translateY(${parallaxAmount}px)`;
          contentRef.current.style.opacity = Math.min(1, progress * 2);
        }
      } else {
        setIsInSection(false);
        // Reset when not in section
        backgroundContainerRef.current.style.position = 'absolute';
        backgroundContainerRef.current.style.top = '0';
        backgroundImageRef.current.style.transform = 'scale(0.6)';
        backgroundImageRef.current.style.opacity = '0';
        if (contentRef.current) {
          contentRef.current.style.transform = 'translateY(0)';
          contentRef.current.style.opacity = '0';
        }
      }
    };

    // Use requestAnimationFrame for smooth updates
    const updateScroll = () => {
      handleScroll();
      animationFrameId = requestAnimationFrame(updateScroll);
    };

    animationFrameId = requestAnimationFrame(updateScroll);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateSectionPosition);
    };
  }, [sectionPosition]);

  const cards = [
    {
      id: 1,
      title: "Perfect Scaling",
      description: "The background image scales from 60% to 100% as you enter this section.",
      icon: "📈",
      color: "#667eea"
    },
    {
      id: 2,
      title: "Section-Locked",
      description: "This background only sticks within this section and won't affect others.",
      icon: "🔒",
      color: "#764ba2"
    },
    {
      id: 3,
      title: "Smooth Fade Out",
      description: "At the end of the section, the background fades away gracefully.",
      icon: "✨",
      color: "#f093fb"
    }
  ];

  return (
    <div className="fixed-sticky-container">
      {/* Content before the section */}
      <div className="before-section">
        <div className="before-content">
          <h1>Scroll Down to Enter the Section</h1>
          <p>This content is above the sticky background section. Scroll down to see the effect.</p>
          <div className="status-indicator">
            <div className="status-dot"></div>
            <span>Not in sticky section</span>
          </div>
        </div>
      </div>

      {/* THE FIXED SECTION */}
      <section 
        ref={sectionRef}
        className="fixed-section"
        style={{ minHeight: '200vh' }}
      >
        {/* Background Container - Fixed positioning */}
        <div 
          ref={backgroundContainerRef}
          className="fixed-background-container"
          style={{
            position: 'absolute',
            top: '0',
            zIndex: '1'
          }}
        >
          <div 
            ref={backgroundImageRef}
            className="fixed-background-image"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
              transform: 'scale(0.6)',
              opacity: '0'
            }}
          >
            {/* Overlay */}
            <div className="fixed-overlay"></div>
            
            {/* Section Status */}
            <div className="section-status">
              <div className={`status ${isInSection ? 'active' : ''}`}>
                {isInSection ? 'Section Active' : 'Outside Section'}
              </div>
              <div className="scale-status">
                {isScaling ? 'Scaling...' : 'Scaled to 100%'}
              </div>
            </div>
          </div>
        </div>

        {/* Section Content */}
        <div 
          ref={contentRef}
          className="fixed-section-content"
          style={{ opacity: 0 }}
        >
          <div className="content-wrapper">
            {/* Header */}
            <div className="fixed-header">
              <div className="fixed-badge">
                <span className="badge-text">Exclusive Section</span>
                <div className="badge-progress">
                  <div 
                    className="progress-bar"
                    style={{ width: `${scrollProgress * 100}%` }}
                  ></div>
                </div>
              </div>
              <h1 className="fixed-title">
                Fixed Sticky Background
              </h1>
              <p className="fixed-subtitle">
                This background is now properly confined to this section only
              </p>
            </div>

            {/* Cards Grid */}
            <div className="fixed-cards">
              <h2 className="cards-title">Section Features</h2>
              <div className="cards-grid">
                {cards.map((card, index) => (
                  <div 
                    key={card.id}
                    className="fixed-card"
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      borderColor: card.color
                    }}
                  >
                    <div className="card-header">
                      <div className="card-icon" style={{ background: card.color }}>
                        {card.icon}
                      </div>
                      <h3>{card.title}</h3>
                    </div>
                    <p className="card-description">{card.description}</p>
                    <div className="card-footer">
                      <span className="card-tag">Active in section</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Blocks */}
            <div className="content-blocks">
              <div className="block">
                <h3>Section-Locked Sticky Background</h3>
                <p>The background image in this section now properly scales from 60% to 100% as you scroll into it, and stays sticky only within this section's boundaries.</p>
              </div>
              <div className="block">
                <h3>No More Overlap Issues</h3>
                <p>The background won't appear in previous or next sections. It's completely contained within this component's section element.</p>
              </div>
              <div className="block">
                <h3>Perfect Timing</h3>
                <p>Scaling completes exactly when you've scrolled 30% into the section. The background stays at 100% scale until you reach 70% of the section.</p>
              </div>
            </div>

            {/* Progress Visualization */}
            <div className="progress-visualization">
              <div className="viz-header">
                <h3>Section Progress: {Math.round(scrollProgress * 100)}%</h3>
                <div className="viz-status">
                  <span className={`phase ${scrollProgress < 0.3 ? 'active' : ''}`}>Scaling (0-30%)</span>
                  <span className={`phase ${scrollProgress >= 0.3 && scrollProgress < 0.7 ? 'active' : ''}`}>Sticky (30-70%)</span>
                  <span className={`phase ${scrollProgress >= 0.7 ? 'active' : ''}`}>Fading (70-100%)</span>
                </div>
              </div>
              <div className="viz-timeline">
                <div className="timeline">
                  <div 
                    className="timeline-progress"
                    style={{ width: `${scrollProgress * 100}%` }}
                  ></div>
                  <div className="timeline-markers">
                    <div className="marker" style={{ left: '30%' }}></div>
                    <div className="marker" style={{ left: '70%' }}></div>
                  </div>
                </div>
                <div className="timeline-labels">
                  <span>Start (60% scale)</span>
                  <span>Full Scale</span>
                  <span>Fade Start</span>
                  <span>Section End</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section End Marker */}
        <div className="section-end-marker">
          <div className="end-line"></div>
          <div className="end-text">End of Section</div>
          <div className="end-line"></div>
        </div>
      </section>

      {/* After Section Content */}
      <div className="after-section">
        <div className="after-content">
          <h2>Background Successfully Released</h2>
          <p>The sticky background from the previous section has completely faded out and is no longer visible.</p>
          <p>This is normal content without any sticky background interference.</p>
          
          <div className="after-grid">
            <div className="after-item">
              <div className="item-icon">✅</div>
              <h3>No Background Overlap</h3>
              <p>The sticky background is properly contained and doesn't leak into other sections.</p>
            </div>
            <div className="after-item">
              <div className="item-icon">🎯</div>
              <h3>Perfect Scaling</h3>
              <p>Background scales correctly from 60% to 100% within the first 30% of the section.</p>
            </div>
            <div className="after-item">
              <div className="item-icon">✨</div>
              <h3>Smooth Fade Out</h3>
              <p>Background fades out gracefully at the end of the section, not before.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedStickySection;