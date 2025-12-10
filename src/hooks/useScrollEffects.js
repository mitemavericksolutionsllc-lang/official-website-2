import { useEffect, useState } from 'react';

export const useScrollEffects = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check visibility of elements with class 'scroll-trigger'
      document.querySelectorAll('.scroll-trigger').forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementId = element.id;
        if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
          setIsVisible(prev => ({ ...prev, [elementId]: true }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollY, isVisible };
};