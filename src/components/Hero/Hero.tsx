import { ComponentType, useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useStarfield } from '../../contexts/StarfieldContext';
import { useDVD } from '../../contexts/DVDContext';
import { BlipVariant, playArcadeBlip } from '../../utils/sound';
import type { ScreenApp } from '../../types';
import DVD from '../Animations/DVD';
import StarField from '../Animations/StarField';
import Doodles from '../Animations/Doodles';
import FlightRadar from '../FlightRadar/FlightRadar';
import SnakeGame from '../Game/SnakeGame';
import './Hero.css';

// Button colours on the cabinet (orange is cabinet-only, not a NeonColor).
type ButtonColor = 'cyan' | 'magenta' | 'yellow' | 'green' | 'orange';

interface SectionButton {
  id: ScreenApp;
  label: string;
  icon: string;
  color: ButtonColor;
  Component: ComponentType;
}

interface LinkButton {
  id: string;
  label: string;
  color: ButtonColor;
  Icon: ComponentType;
  href: string;
}

interface ToggleButton {
  id: string;
  label: string;
  color: ButtonColor;
  Icon: ComponentType;
  title: string;
  on: boolean;
  onClick: () => void;
}

interface HeroProps {
  activeSection: ScreenApp | null;
  onSelectSection: (section: ScreenApp | null) => void;
}

const sectionButtons: SectionButton[] = [
  { id: 'flights', label: 'Flights', icon: '✈', color: 'cyan', Component: FlightRadar },
  { id: 'game', label: 'Play', icon: '🕹', color: 'orange', Component: SnakeGame }
];

// Icons for the link and toggle buttons on the control panel.
const GitHubIcon = () => (
  <svg viewBox="0 0 438.549 438.549">
    <path fill="currentColor" d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"></path>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
  </svg>
);

const DiscIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2"></circle>
    <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 10.26H23.36L17.63 14.97L20.72 23.23L12 18.52L3.28 23.23L6.37 14.97L0.64 10.26H8.91L12 2Z" fill="currentColor"></path>
  </svg>
);

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 0C7.77614 0 8 0.223858 8 0.5V2.5C8 2.77614 7.77614 3 7.5 3C7.22386 3 7 2.77614 7 2.5V0.5C7 0.223858 7.22386 0 7.5 0ZM2.1967 2.1967C2.39196 2.00144 2.70854 2.00144 2.90381 2.1967L4.31802 3.61091C4.51328 3.80617 4.51328 4.12276 4.31802 4.31802C4.12276 4.51328 3.80617 4.51328 3.61091 4.31802L2.1967 2.90381C2.00144 2.70854 2.00144 2.39196 2.1967 2.1967ZM0.5 7C0.223858 7 0 7.22386 0 7.5C0 7.77614 0.223858 8 0.5 8H2.5C2.77614 8 3 7.77614 3 7.5C3 7.22386 2.77614 7 2.5 7H0.5ZM2.1967 12.8033C2.00144 12.608 2.00144 12.2915 2.1967 12.0962L3.61091 10.682C3.80617 10.4867 4.12276 10.4867 4.31802 10.682C4.51328 10.8772 4.51328 11.1938 4.31802 11.3891L2.90381 12.8033C2.70854 12.9986 2.39196 12.9986 2.1967 12.8033ZM12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8H14.5C14.7761 8 15 7.77614 15 7.5C15 7.22386 14.7761 7 14.5 7H12.5ZM10.682 4.31802C10.4867 4.12276 10.4867 3.80617 10.682 3.61091L12.0962 2.1967C12.2915 2.00144 12.608 2.00144 12.8033 2.1967C12.9986 2.39196 12.9986 2.70854 12.8033 2.90381L11.3891 4.31802C11.1938 4.51328 10.8772 4.51328 10.682 4.31802ZM8 12.5C8 12.2239 7.77614 12 7.5 12C7.22386 12 7 12.2239 7 12.5V14.5C7 14.7761 7.22386 15 7.5 15C7.77614 15 8 14.7761 8 14.5V12.5ZM10.682 10.682C10.8772 10.4867 11.1938 10.4867 11.3891 10.682L12.8033 12.0962C12.9986 12.2915 12.9986 12.608 12.8033 12.8033C12.608 12.9986 12.2915 12.9986 12.0962 12.8033L10.682 11.3891C10.4867 11.1938 10.4867 10.8772 10.682 10.682ZM5.5 7.5C5.5 6.39543 6.39543 5.5 7.5 5.5C8.60457 5.5 9.5 6.39543 9.5 7.5C9.5 8.60457 8.60457 9.5 7.5 9.5C6.39543 9.5 5.5 8.60457 5.5 7.5ZM7.5 4.5C5.84315 4.5 4.5 5.84315 4.5 7.5C4.5 9.15685 5.84315 10.5 7.5 10.5C9.15685 10.5 10.5 9.15685 10.5 7.5C10.5 5.84315 9.15685 4.5 7.5 4.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.89998 0.499976C2.89998 0.279062 2.72089 0.0999756 2.49998 0.0999756C2.27906 0.0999756 2.09998 0.279062 2.09998 0.499976V1.09998H1.49998C1.27906 1.09998 1.09998 1.27906 1.09998 1.49998C1.09998 1.72089 1.27906 1.89998 1.49998 1.89998H2.09998V2.49998C2.09998 2.72089 2.27906 2.89998 2.49998 2.89998C2.72089 2.89998 2.89998 2.72089 2.89998 2.49998V1.89998H3.49998C3.72089 1.89998 3.89998 1.72089 3.89998 1.49998C3.89998 1.27906 3.72089 1.09998 3.49998 1.09998H2.89998V0.499976ZM5.89998 3.49998C5.89998 3.27906 5.72089 3.09998 5.49998 3.09998C5.27906 3.09998 5.09998 3.27906 5.09998 3.49998V4.09998H4.49998C4.27906 4.09998 4.09998 4.27906 4.09998 4.49998C4.09998 4.72089 4.27906 4.89998 4.49998 4.89998H5.09998V5.49998C5.09998 5.72089 5.27906 5.89998 5.49998 5.89998C5.72089 5.89998 5.89998 5.72089 5.89998 5.49998V4.89998H6.49998C6.72089 4.89998 6.89998 4.72089 6.89998 4.49998C6.89998 4.27906 6.72089 4.09998 6.49998 4.09998H5.89998V3.49998ZM1.89998 6.49998C1.89998 6.27906 1.72089 6.09998 1.49998 6.09998C1.27906 6.09998 1.09998 6.27906 1.09998 6.49998V7.09998H0.499976C0.279062 7.09998 0.0999756 7.27906 0.0999756 7.49998C0.0999756 7.72089 0.279062 7.89998 0.499976 7.89998H1.09998V8.49998C1.09998 8.72089 1.27906 8.89997 1.49998 8.89997C1.72089 8.89997 1.89998 8.72089 1.89998 8.49998V7.89998H2.49998C2.72089 7.89998 2.89998 7.72089 2.89998 7.49998C2.89998 7.27906 2.72089 7.09998 2.49998 7.09998H1.89998V6.49998Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

const Hero = ({ activeSection, onSelectSection }: HeroProps) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { isStarfieldVisible, toggleStarfield } = useStarfield();
  const { isDVDVisible, toggleDVD } = useDVD();

  // A short-lived class drives the press burst. :active alone gets cut off
  // when a click is faster than the animation.
  const [pressedId, setPressedId] = useState<string | null>(null);
  const pressTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(pressTimerRef.current), []);

  const flashPress = useCallback((id: string) => {
    setPressedId(id);
    window.clearTimeout(pressTimerRef.current);
    pressTimerRef.current = window.setTimeout(() => setPressedId(null), 400);
  }, []);

  const withBlip = (variant: BlipVariant, handler: () => void, id?: string) => () => {
    playArcadeBlip(variant);
    if (id) {
      flashPress(id);
    }
    handler();
  };

  const activeButton = sectionButtons.find(section => section.id === activeSection);
  const ActiveComponent = activeButton?.Component;
  const isGame = activeSection === 'game';

  // Left: the important links, full size next to the sections.
  const linkButtons: LinkButton[] = [
    { id: 'github', label: 'GitHub', color: 'magenta', Icon: GitHubIcon, href: 'https://github.com/karenlauhl' },
    { id: 'linkedin', label: 'LinkedIn', color: 'yellow', Icon: LinkedInIcon, href: 'https://linkedin.com/in/karenlauhl' }
  ];

  // Right: the just-for-fun toggles. On = lit, off = dimmed; they never
  // move, so all three always look the same size.
  const toggleButtons: ToggleButton[] = [
    { id: 'dvd', label: 'DVD', color: 'yellow', Icon: DiscIcon, title: 'Toggle DVD', on: isDVDVisible, onClick: toggleDVD },
    { id: 'stars', label: 'Stars', color: 'green', Icon: StarIcon, title: 'Toggle starfield', on: isStarfieldVisible, onClick: toggleStarfield },
    { id: 'theme', label: 'CRT', color: 'orange', Icon: isDarkMode ? MoonIcon : SunIcon, title: 'Toggle dark mode', on: isDarkMode, onClick: toggleDarkMode }
  ];

  return (
    <section id="home" className="hero">
      <div className="hero-backdrop" aria-hidden="true">
        <Doodles />
        <StarField />
        <DVD />
      </div>

      <div className="arcade-perspective">
        <div className="arcade-machine">
          <span className="machine-sheen" aria-hidden="true" />

          <div className="arcade-marquee">
            <span className="marquee-lights" aria-hidden="true">
              {Array.from({ length: 7 }).map((_, i) => (
                <span key={i} className="marquee-light" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </span>
            <span className="marquee-title" key={activeSection ?? 'home'}>
              {activeButton ? activeButton.label.toUpperCase() : 'KAREN'}
            </span>
          </div>

          <div className="arcade-screen">
            <div className="screen-scanlines" aria-hidden="true" />
            <div className="screen-vignette" aria-hidden="true" />
            <div className={`screen-content ${isGame ? 'screen-content--game' : ''}`}>
              {ActiveComponent ? (
                <div className="screen-app" key={activeSection}>
                  <button
                    type="button"
                    className="screen-back-btn"
                    onClick={withBlip('secondary', () => onSelectSection(null))}
                  >
                    ◀ BACK
                  </button>
                  <div className="screen-app-body">
                    <ActiveComponent />
                  </div>
                </div>
              ) : (
                <div className="hero-content" key="home">
                  <h1>Karen Lau</h1>
                  <p className="subtitle">Software Engineer · Java, Python &amp; full-stack</p>
                  <a href="#experience" className="view-projects-btn" onClick={() => playArcadeBlip('primary')}>
                    ▼ VIEW MY WORK
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="control-panel">
            <span className="panel-screw panel-screw--tl" aria-hidden="true" />
            <span className="panel-screw panel-screw--tr" aria-hidden="true" />
            <span className="panel-screw panel-screw--bl" aria-hidden="true" />
            <span className="panel-screw panel-screw--br" aria-hidden="true" />

            <div className="control-panel-main">
              <div className="arcade-joystick" aria-hidden="true">
                <span className="joystick-base" />
                <span className="joystick-stick">
                  <span className="joystick-ball" />
                </span>
              </div>

              <div className="section-launcher">
                {linkButtons.map(link => (
                  <div className="arcade-button-unit" key={link.id}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`arcade-button arcade-button--${link.color} ${pressedId === link.id ? 'is-pressed' : ''}`}
                      onClick={withBlip('primary', () => {}, link.id)}
                      title={link.label}
                    >
                      <link.Icon />
                    </a>
                    <span className="launch-label">{link.label}</span>
                  </div>
                ))}
                {sectionButtons.map(section => (
                  <div className="arcade-button-unit" key={section.id}>
                    <button
                      type="button"
                      className={`arcade-button arcade-button--${section.color} ${activeSection === section.id ? 'is-active' : ''} ${pressedId === section.id ? 'is-pressed' : ''}`}
                      onClick={withBlip('primary', () =>
                        onSelectSection(activeSection === section.id ? null : section.id), section.id
                      )}
                      title={`Reveal ${section.label}`}
                    >
                      <span className="launch-icon" aria-hidden="true">{section.icon}</span>
                    </button>
                    <span className="launch-label">{section.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="control-panel-aux">
              {toggleButtons.map(toggle => (
                <div className="arcade-button-unit" key={toggle.id}>
                  <button
                    type="button"
                    aria-pressed={toggle.on}
                    className={`arcade-button arcade-button--small arcade-button--toggle arcade-button--${toggle.color} ${toggle.on ? 'is-on' : ''} ${pressedId === toggle.id ? 'is-pressed' : ''}`}
                    onClick={withBlip('secondary', toggle.onClick, toggle.id)}
                    title={toggle.title}
                  >
                    <toggle.Icon />
                  </button>
                  <span className="launch-label">{toggle.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
