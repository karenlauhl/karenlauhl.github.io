import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { StarfieldProvider } from './contexts/StarfieldContext';
import { DVDProvider } from './contexts/DVDContext';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import Hero from './components/Hero/Hero';
import TopNav from './components/TopNav/TopNav';
import StageClear from './components/StageClear/StageClear';
import { stageById } from './data/stages';
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
            <StageClear {...stageById('experience')} />
            <Experience />
            <StageClear {...stageById('projects')} />
            <Projects />
            <StageClear {...stageById('about')} />
            <About />
          </main>
          <StageClear {...stageById('contact')} />
          <Contact />
        </DVDProvider>
      </StarfieldProvider>
    </ThemeProvider>
  );
}

export default App;
