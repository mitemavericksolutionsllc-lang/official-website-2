// ScrollAnimation.jsx
import React, { useEffect, useRef } from 'react';
import './ScrollAnimationTest.css';

const ScrollAnimation = () => {
  const sectionsRef = useRef([]);
  const imagesRef = useRef([]);
  const textElementsRef = useRef([]);
  const parallaxRef = useRef(null);

  // Initialize refs
  const addToSectionsRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const addToImagesRef = (el) => {
    if (el && !imagesRef.current.includes(el)) {
      imagesRef.current.push(el);
    }
  };

  const addToTextElementsRef = (el) => {
    if (el && !textElementsRef.current.includes(el)) {
      textElementsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Progressive Reveal Animation
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    sectionsRef.current.forEach((section) => {
      revealObserver.observe(section);
    });

    // Image Zoom Animation
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const image = entry.target;
          const progress = Math.min(1, Math.max(0, entry.intersectionRatio));
          
          if (entry.isIntersecting) {
            const scale = 0.8 + (progress * 0.2); // Scale from 80% to 100%
            image.style.transform = `scale(${scale})`;
            image.style.opacity = progress * 1; // Fade in with scroll
          }
        });
      },
      {
        threshold: Array.from({ length: 100 }, (_, i) => i * 0.01)
      }
    );

    imagesRef.current.forEach((image) => {
      imageObserver.observe(image);
    });

    // Text Animation
    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('text-highlighted');
            
            // Stagger animation for individual letters/words
            const text = entry.target;
            const words = text.textContent.split(' ');
            text.innerHTML = words.map(word => 
              `<span class="word">${word}</span>`
            ).join(' ');
            
            // Animate each word with delay
            const wordSpans = text.querySelectorAll('.word');
            wordSpans.forEach((span, index) => {
              span.style.animationDelay = `${index * 0.1}s`;
            });
          }
        });
      },
      {
        threshold: 0.5
      }
    );

    textElementsRef.current.forEach((text) => {
      textObserver.observe(text);
    });

    // Parallax Effect
    const handleParallax = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        parallaxRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleParallax);

    // Cleanup
    return () => {
      revealObserver.disconnect();
      imageObserver.disconnect();
      textObserver.disconnect();
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);

  return (
    <div className="scroll-container">
      {/* Parallax Section */}
      <section className="parallax-section">
        <div className="parallax-background" ref={parallaxRef}>
          <div className="background-content">
            {/* Background content that moves slower */}
            <h2>Background Layer</h2>
            <p>This layer scrolls at 50% speed</p>
          </div>
        </div>
        <div className="parallax-foreground">
          <h1>Foreground Content</h1>
          <p>This content scrolls at normal speed</p>
        </div>
      </section>

      {/* Progressive Reveal Sections */}
      <section 
        ref={addToSectionsRef}
        className="reveal-section hidden"
      >
        <h2 ref={addToTextElementsRef}>Section 1: Progressive Reveal</h2>
        <p ref={addToTextElementsRef}>
          This section will fade and slide up as you scroll it into view
        </p>
      </section>

      <section 
        ref={addToSectionsRef}
        className="reveal-section hidden slide-up"
      >
        <h2 ref={addToTextElementsRef}>Section 2: Slide Up Effect</h2>
        <p ref={addToTextElementsRef}>
          This content slides up from below as it enters the viewport
        </p>
      </section>

      <section 
        ref={addToSectionsRef}
        className="reveal-section hidden zoom-in"
      >
        <h2 ref={addToTextElementsRef}>Section 3: Zoom Effect</h2>
        <p ref={addToTextElementsRef}>
          This section zooms in gently as it becomes visible
        </p>
      </section>

      {/* Image Zoom/Reveal Section */}
      <section className="image-section">
        <h2 ref={addToTextElementsRef}>Image Reveal Effects</h2>
        <div className="image-grid">
          <div className="image-container">
            <img 
              ref={addToImagesRef}
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
              alt="Zoom effect"
              className="zoom-image"
            />
            <p>Zoom on scroll</p>
          </div>
          <div className="image-container">
            <img 
              ref={addToImagesRef}
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
              alt="Mask reveal"
              className="mask-reveal"
            />
            <p>Mask reveal effect</p>
          </div>
        </div>
      </section>

      {/* Text Animation Section */}
      <section className="text-animation-section">
        <h2 ref={addToTextElementsRef}>Animated Text Effects</h2>
        <div className="text-content">
          <p ref={addToTextElementsRef} className="animated-paragraph">
            This text will change color and scale as you scroll through it.
            Each word animates individually with a staggered effect.
            Watch as they highlight one by one.
          </p>
          <p ref={addToTextElementsRef} className="animated-paragraph">
            Another paragraph with scroll-driven text animation.
            The words become bolder and change color based on scroll position.
            Creating a dynamic reading experience.
          </p>
        </div>
      </section>

      {/* Additional content for scrolling */}
      <div style={{ height: '100vh' }}></div>
    </div>
  );
};

export default ScrollAnimation;