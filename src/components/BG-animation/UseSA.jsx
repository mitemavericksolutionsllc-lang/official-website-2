import { useState, useEffect, useRef } from 'react';

export const useScrollAnimation = (threshold = 0.1, rootMargin = '0px 0px -50px 0px') => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger animation when element enters viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: threshold,
        rootMargin: rootMargin
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin]);

  return [elementRef, isVisible];
};

export const useStaggerAnimation = (count, threshold = 0.1) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the animation of items
          const timer = setTimeout(() => {
            const delays = Array.from({ length: count }, (_, i) => i);
            setVisibleItems(delays);
          }, 300);
          
          return () => clearTimeout(timer);
        }
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [count, threshold]);

  return [elementRef, visibleItems];
};

// New hook for shape reveal animations
export const useShapeReveal = (threshold = 0.1) => {
  const [revealState, setRevealState] = useState(0); // 0: hidden, 0.5: half, 1: full
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const elementTop = entry.boundingClientRect.top;
          const elementHeight = entry.boundingClientRect.height;
          const viewportHeight = window.innerHeight;
          
          // Calculate reveal progress based on scroll position
          const scrollProgress = 1 - (elementTop / (viewportHeight + elementHeight));
          setRevealState(Math.min(Math.max(scrollProgress, 0), 1));
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '0px 0px -100px 0px'
      }
    );

    observer.observe(element);

    // Also listen to scroll for continuous updates
    const handleScroll = () => {
      if (element) {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const scrollProgress = 1 - (rect.top / (viewportHeight + rect.height));
        setRevealState(Math.min(Math.max(scrollProgress, 0), 1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return [elementRef, revealState];
};