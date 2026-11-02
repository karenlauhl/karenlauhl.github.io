import { useEffect, useState } from 'react';
import './TopNav.css';

const links = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' }
];

// Game-style top bar. Hidden while the arcade cabinet (the start screen) is in
// view, then slides in and marks the section you're reading.
const TopNav = () => {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }

    const hero = document.getElementById('home');
    const heroObserver = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (hero) heroObserver.observe(hero);

    // A section counts as current once it crosses the middle band of the screen.
    const sectionObserver = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && setCurrent(entry.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    return () => {
      heroObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <nav className={`top-nav ${visible ? 'is-visible' : ''}`} aria-label="Sections">
      <a href="#home" className="top-nav-brand">◆ KAREN LAU</a>
      <ul className="top-nav-links">
        {links.map(link => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              className={current === link.id ? 'is-current' : ''}
              aria-current={current === link.id ? 'true' : undefined}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TopNav;
