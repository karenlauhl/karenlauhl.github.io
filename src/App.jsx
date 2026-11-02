import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { StarfieldProvider } from './contexts/StarfieldContext';
import { DVDProvider } from './contexts/DVDContext';
import Hero from './components/Hero/Hero';
// import About from './components/About/About';
// import Contact from './components/Contact/Contact';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <ThemeProvider>
      <StarfieldProvider>
        <DVDProvider>
          <Hero activeSection={activeSection} onSelectSection={setActiveSection} />
          {/* <About /> */}
          {/* <Contact /> */}
        </DVDProvider>
      </StarfieldProvider>
    </ThemeProvider>
  );
}

export default App;
