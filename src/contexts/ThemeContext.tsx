import { createContext, ReactNode, useContext } from 'react';
import { DarkModeValue, useDarkMode } from '../hooks/useDarkMode';

const ThemeContext = createContext<DarkModeValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const darkModeValue = useDarkMode();

  return (
    <ThemeContext.Provider value={darkModeValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): DarkModeValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
