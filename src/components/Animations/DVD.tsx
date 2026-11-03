import { useEffect, useRef } from 'react';
import { useDVD } from '../../contexts/DVDContext';
import { prefersReducedMotion } from '../../utils/motion';
import './DVD.css';

const HUE_ROTATIONS = [0, 45, 90, 135, 180, 225, 270, 315];

const DVD = () => {
  const { isDVDVisible } = useDVD();
  const dvdRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDVDVisible || prefersReducedMotion()) {
      return undefined;
    }

    const node = dvdRef.current;
    // Bounce inside the backdrop container rather than the whole viewport,
    // so the logo stays behind the cabinet instead of covering it.
    const bounds = node?.parentElement;
    if (!node || !bounds) {
      return undefined;
    }

    let width = node.offsetWidth;
    let height = node.offsetHeight;
    let maxX = Math.max(0, bounds.clientWidth - width);
    let maxY = Math.max(0, bounds.clientHeight - height);

    let x = Math.random() * maxX;
    let y = Math.random() * maxY;
    let vx = (Math.random() - 0.5) * 6 || 2;
    let vy = (Math.random() - 0.5) * 6 || 2;
    let frameId: number | null = null;

    const changeColor = () => {
      const hue = HUE_ROTATIONS[Math.floor(Math.random() * HUE_ROTATIONS.length)];
      node.style.filter = `hue-rotate(${hue}deg) saturate(1.2)`;
    };

    const measure = () => {
      width = node.offsetWidth;
      height = node.offsetHeight;
      maxX = Math.max(0, bounds.clientWidth - width);
      maxY = Math.max(0, bounds.clientHeight - height);
      x = Math.min(x, maxX);
      y = Math.min(y, maxY);
    };

    const animate = () => {
      x += vx;
      y += vy;

      if (x <= 0 || x >= maxX) {
        vx *= -1;
        x = Math.max(0, Math.min(x, maxX));
        changeColor();
      }
      if (y <= 0 || y >= maxY) {
        vy *= -1;
        y = Math.max(0, Math.min(y, maxY));
        changeColor();
      }

      // Drive transform directly so the loop doesn't re-render React 60x/sec.
      node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', measure);
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', measure);
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [isDVDVisible]);

  if (!isDVDVisible) {
    return null;
  }

  return (
    <div ref={dvdRef} className="dvd-logo">
      <img src="/dvd.svg" alt="" className="dvd-image" />
    </div>
  );
};

export default DVD;
