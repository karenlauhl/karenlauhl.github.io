import { CSSProperties, useMemo } from 'react';
import { useStarfield } from '../../contexts/StarfieldContext';
import { prefersReducedMotion } from '../../utils/motion';
import './StarField.css';

const STAR_COUNT = 100;

const StarField = () => {
  const { isStarfieldVisible } = useStarfield();

  // Randomize once per mount; React handles cleanup on unmount/toggle-off,
  // so there's no imperative document.body appending or querySelectorAll.
  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (): CSSProperties => ({
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${5 + Math.random() * 10}s`,
        opacity: Math.random() * 0.6 + 0.4,
        // CSS custom property read by the falling animation
        ['--tx' as string]: `${(Math.random() - 0.5) * 300}px`
      })),
    []
  );

  if (!isStarfieldVisible || prefersReducedMotion()) {
    return null;
  }

  return (
    <>
      {stars.map((style, i) => (
        <span key={i} className="star-fall" style={style} />
      ))}
    </>
  );
};

export default StarField;
