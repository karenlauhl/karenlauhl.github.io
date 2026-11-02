import { createContext, useCallback, useContext, useState } from 'react';

// Bonus points earned on the page (petting the neon cat). The top bar's 1UP
// score shows the current stage's score plus this bonus.
export const CAT_BONUS = 500;

const BonusContext = createContext();

export const BonusProvider = ({ children }) => {
  const [bonus, setBonus] = useState(0);

  const addBonus = useCallback(points => setBonus(prev => prev + points), []);

  return (
    <BonusContext.Provider value={{ bonus, addBonus }}>
      {children}
    </BonusContext.Provider>
  );
};

export const useBonus = () => {
  const context = useContext(BonusContext);
  if (!context) {
    console.error('useBonus must be used within BonusProvider');
  }
  return context;
};
