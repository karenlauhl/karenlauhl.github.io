import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

// Bonus points earned on the page (petting the neon cat). The top bar's 1UP
// score shows the current stage's score plus this bonus.
export const CAT_BONUS = 500;

interface BonusValue {
  bonus: number;
  addBonus: (points: number) => void;
}

const BonusContext = createContext<BonusValue | undefined>(undefined);

export const BonusProvider = ({ children }: { children: ReactNode }) => {
  const [bonus, setBonus] = useState(0);

  const addBonus = useCallback((points: number) => setBonus(prev => prev + points), []);

  return (
    <BonusContext.Provider value={{ bonus, addBonus }}>
      {children}
    </BonusContext.Provider>
  );
};

export const useBonus = (): BonusValue => {
  const context = useContext(BonusContext);
  if (!context) {
    throw new Error('useBonus must be used within BonusProvider');
  }
  return context;
};
