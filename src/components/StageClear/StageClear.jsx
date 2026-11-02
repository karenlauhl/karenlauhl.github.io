import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../utils/motion';
import './StageClear.css';

const COUNT_MS = 900;
const pad = n => String(n).padStart(6, '0');

// Arcade "stage clear" strip between sections. The score counts up from 0 the
// first time the strip scrolls into view.
const StageClear = ({ label, score, color = 'cyan' }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      setShown(score);
      return undefined;
    }

    let frame;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = now => {
        const t = Math.min(1, (now - start) / COUNT_MS);
        setShown(Math.round(score * t));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [score]);

  return (
    <div ref={ref} className={`stage-clear stage-clear--${color}`} role="presentation">
      <div className="stage-clear-inner">
        <span className="stage-clear-label">★ {label} ★</span>
        <span className="stage-clear-score">
          SCORE <span className="stage-clear-digits">{pad(shown)}</span>
        </span>
        <span className="stage-1up" aria-hidden="true">1UP</span>
      </div>
    </div>
  );
};

export default StageClear;
