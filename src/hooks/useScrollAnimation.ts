import { useEffect } from 'react';
import { prefersReducedMotion } from '../utils/motion';

// Fades .animate-on-scroll elements in as they scroll into view.
export const useScrollAnimation = (): void => {
  useEffect(() => {
    // Leave everything visible for people who ask for less motion.
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      return undefined;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          // Clearing the inline styles (rather than setting 1 / translateY(0))
          // hands control back to the stylesheet, so hover effects still work.
          el.style.opacity = '';
          el.style.transform = '';
          el.addEventListener('transitionend', () => { el.style.transition = ''; }, { once: true });
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const animatedElements = document.querySelectorAll<HTMLElement>('.animate-on-scroll');
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
};
