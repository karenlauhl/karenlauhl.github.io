import { useEffect, useState } from 'react';
import stages, { stageById } from '../../data/stages';
import { useBonus } from '../../contexts/BonusContext';
import './TopNav.css';

const pad = n => String(n).padStart(6, '0');

// Arcade score HUD. Hidden while the cabinet (the start screen) is in view,
// then slides in. The 1UP score is the score of the section you're reading,
// matching the stage-clear strip you just passed, plus any cat bonus.
const TopNav = () => {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(null);
  const { bonus } = useBonus();

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }

    const hero = document.getElementById('home');
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
        if (entry.isIntersecting) setCurrent(null);
      },
      { threshold: 0.15 }
    );
    if (hero) heroObserver.observe(hero);

    // A section counts as current once it crosses the middle band of the screen.
    const sectionObserver = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && setCurrent(entry.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    stages.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    return () => {
      heroObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  // Stage score plus anything earned from the cat.
  const score = (stageById(current)?.score ?? 0) + bonus;

  return (
    <nav className={`top-nav ${visible ? 'is-visible' : ''}`} aria-label="Sections">
      <a href="#home" className="hud-score" title="Back to the start">
        <span className="hud-1up">1UP</span>
        {/* key restarts the flash animation whenever the score changes */}
        <span className="hud-digits" key={score}>{pad(score)}</span>
      </a>

      <ul className="top-nav-links">
        <li className="top-nav-start">
          <a href="#home">Start</a>
        </li>
        {stages.map(stage => (
          <li key={stage.id}>
            <a
              href={`#${stage.id}`}
              className={current === stage.id ? 'is-current' : ''}
              aria-current={current === stage.id ? 'true' : undefined}
            >
              {stage.nav}
            </a>
          </li>
        ))}
      </ul>

      <span className="hud-credit" aria-hidden="true">CREDIT 01</span>
    </nav>
  );
};

export default TopNav;
