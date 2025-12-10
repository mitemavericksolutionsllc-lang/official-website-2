// FadingBackgroundHero.jsx
import React, { useEffect, useRef, useState } from 'react';
import './FadingBackgroundHero.css';

const FadingBackgroundHero = () => {
  const heroRef = useRef(null);
  const backgroundRef = useRef(null);
  // const contentRef = useRef(null);
  const sectionsRef = useRef([]);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Add sections to ref array
  const addToSectionsRef = (el, index) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current[index] = el;
    }
  };

  useEffect(() => {
    let animationFrameId;
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only update if scrolled enough (performance optimization)
      if (Math.abs(currentScrollY - lastScrollY) > 1) {
        setScrollY(currentScrollY);
        lastScrollY = currentScrollY;
        
        // Update active section
        const heroRect = heroRef.current?.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (heroRect) {
          // Calculate which section is in view
          const heroTop = heroRect.top + window.scrollY;
          const heroHeight = heroRect.height;
          const scrollProgress = Math.max(0, Math.min(1, (currentScrollY - heroTop) / heroHeight));
          
          // Update background based on scroll
          if (backgroundRef.current) {
            // Phase 1: Scale up (first 30% of scroll)
            if (scrollProgress < 0.3) {
              const scale = 0.3 + (scrollProgress / 0.3) * 0.7; // 0.3 → 1.0
              backgroundRef.current.style.transform = `scale(${scale})`;
              backgroundRef.current.style.opacity = '1';
            }
            // Phase 2: Hold (30% to 70%)
            else if (scrollProgress >= 0.3 && scrollProgress < 0.7) {
              backgroundRef.current.style.transform = 'scale(1)';
              backgroundRef.current.style.opacity = '1';
            }
            // Phase 3: Fade out (70% to 100%)
            else {
              const fadeProgress = (scrollProgress - 0.7) / 0.3;
              backgroundRef.current.style.transform = `scale(${1 + fadeProgress * 0.2})`; // Slight zoom out
              backgroundRef.current.style.opacity = `${1 - fadeProgress}`;
            }
          }
        }
        
        // Check which section is active
        sectionsRef.current.forEach((section, index) => {
          if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= windowHeight * 0.6 && rect.bottom >= windowHeight * 0.4) {
              setActiveSection(index);
            }
          }
        });
      }
      
      animationFrameId = requestAnimationFrame(handleScroll);
    };
    
    // Use requestAnimationFrame for smooth scroll handling
    animationFrameId = requestAnimationFrame(handleScroll);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);







  
  // Section content
  const sections = [
    {
      title: "The Beginning",
      content: "As you scroll down, watch the background image transform. It starts small and distant, then grows to fill your view.",
      color: "#667eea",
      icon: "🌄"
    },
    {
      title: "The Journey",
      content: "The background reaches its full scale, creating an immersive experience. Content appears over it as you continue scrolling.",
      color: "#764ba2",
      icon: "🚀"
    },
    {
      title: "The Transformation",
      content: "As you reach the end of this section, the background gracefully fades away, preparing you for the next chapter.",
      color: "#f093fb",
      icon: "✨"
    },
    {
      title: "New Horizons",
      content: "With the background faded, we enter a new space with fresh content. Notice the generous spacing between sections.",
      color: "#4facfe",
      icon: "🌟"
    },
    {
      title: "Beyond the Horizon",
      content: "Each section feels like a distinct chapter with ample breathing room between them, creating a cinematic scroll journey.",
      color: "#00f2fe",
      icon: "🌌"
    }
  ];

  return (
    <div className="fading-hero-container">
      {/* Hero Section with Expanding/Fading Background */}
      <section 
        ref={heroRef}
        className="hero-expanding-section"
        style={{ height: '200vh' }} // Extra tall for extended scroll
      >
        {/* Background Image */}
        <div className="hero-background-wrapper">
          <div 
            ref={backgroundRef}
            className="hero-background-image"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
              transform: 'scale(0.3)',
              opacity: '1'
            }}
          />
          <div className="background-overlay"></div>
        </div>

        {/* Hero Content */}
        <div className="hero-main-content">
          <div className="hero-text-container">
            <h1 className="hero-main-title">
              <span className="title-word">Scroll</span>
              <span className="title-word">to</span>
              <span className="title-word">Reveal</span>
            </h1>
            <p className="hero-description">
              Experience a journey where the background transforms with your scroll.
              Watch it scale up, then fade away as you progress.
            </p>
            <div className="scroll-hint">
              <div className="hint-line"></div>
              <span>Keep scrolling</span>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="scroll-progress-indicator">
          <div className="progress-dots">
            {[0, 1, 2, 3, 4].map((index) => (
              <div 
                key={index}
                className={`progress-dot ${activeSection >= index ? 'active' : ''}`}
                onClick={() => {
                  const section = sectionsRef.current[index];
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <div className="dot-tooltip">{sections[index]?.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Distant Sections with Large Gaps */}
      <div className="distant-sections-container">
        {sections.map((section, index) => (
          <section
            key={index}
            ref={(el) => addToSectionsRef(el, index)}
            className="distant-section"
            style={{
              marginTop: `${index === 0 ? '100vh' : '80vh'}`,
              marginBottom: `${index === sections.length - 1 ? '100vh' : '80vh'}`,
              '--section-color': section.color
            }}
          >
            {/* Section Background (different from hero) */}
            <div className="section-background"></div>
            
            {/* Section Content */}
            <div className="section-content">
              <div className="section-icon">{section.icon}</div>
              <h2 className="section-title">{section.title}</h2>
              <p className="section-text">{section.content}</p>
              
              {/* Scroll Progress for this section */}
              <div className="section-scroll-progress">
                <div className="section-progress-bar">
                  <div 
                    className="section-progress-fill"
                    style={{
                      width: `${Math.max(0, Math.min(100, 
                        ((scrollY - sectionsRef.current[index]?.offsetTop + window.innerHeight * 0.7) / 
                        (sectionsRef.current[index]?.offsetHeight || 1)) * 100
                      ))}%`
                    }}
                  ></div>
                </div>
                <span>Scroll through this section</span>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="section-ornament top"></div>
            <div className="section-ornament bottom"></div>
          </section>
        ))}
      </div>

      {/* Final Section with completely different background */}
      <section className="final-section">
        <div className="final-background">
          <div className="final-gradient"></div>
          <div className="final-pattern"></div>
        </div>
        
        <div className="final-content">
          <h2>The Journey Continues</h2>
          <p>
            You've experienced the cinematic scroll with expanding and fading backgrounds.
            Each section was deliberately spaced apart to create breathing room and emphasis.
          </p>
          <p>
            This final section uses a completely different visual style to mark
            the transition to new content.
          </p>
          
          <div className="final-stats">
            <div className="stat">
              <div className="stat-number">5</div>
              <div className="stat-label">Sections</div>
            </div>
            <div className="stat">
              <div className="stat-number">200vh</div>
              <div className="stat-label">Spacing</div>
            </div>
            <div className="stat">
              <div className="stat-number">3</div>
              <div className="stat-label">Animations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Large spacing at the end */}
      <div style={{ height: '50vh' }}></div>
    </div>
  );
};

export default FadingBackgroundHero;