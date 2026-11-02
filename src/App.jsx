import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { StarfieldProvider } from './contexts/StarfieldContext';
import { DVDProvider } from './contexts/DVDContext';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import Hero from './components/Hero/Hero';
import TopNav from './components/TopNav/TopNav';
import Ticker from './components/Ticker/Ticker';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState(null);
  useScrollAnimation();

  return (
    <ThemeProvider>
      <StarfieldProvider>
        <DVDProvider>
          <TopNav />
          <Hero activeSection={activeSection} onSelectSection={setActiveSection} />
          <main>
            <Ticker color="cyan" items={['Experience', 'Career log']} />
            <Experience />
            <Ticker color="magenta" items={['Projects', 'Things I built']} />
            <Projects />
            <Ticker color="yellow" items={['About', 'Skill tree']} />
            <About />
          </main>
          <Ticker color="green" items={['Contact', 'Press start']} />
          <Contact />
        </DVDProvider>
      </StarfieldProvider>
    </ThemeProvider>
  );
}

export default App;
