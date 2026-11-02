import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { StarfieldProvider } from './contexts/StarfieldContext';
import { DVDProvider } from './contexts/DVDContext';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import Hero from './components/Hero/Hero';
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
          <Hero activeSection={activeSection} onSelectSection={setActiveSection} />
          <main>
            <Experience />
            <Projects />
            <About />
          </main>
          <Contact />
        </DVDProvider>
      </StarfieldProvider>
    </ThemeProvider>
  );
}

export default App;
