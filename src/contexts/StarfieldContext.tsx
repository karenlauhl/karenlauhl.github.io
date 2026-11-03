import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

interface StarfieldValue {
  isStarfieldVisible: boolean;
  setIsStarfieldVisible: Dispatch<SetStateAction<boolean>>;
  toggleStarfield: () => void;
}

const StarfieldContext = createContext<StarfieldValue | undefined>(undefined);

export const StarfieldProvider = ({ children }: { children: ReactNode }) => {
  const [isStarfieldVisible, setIsStarfieldVisible] = useState(true);

  const toggleStarfield = () => {
    setIsStarfieldVisible(prev => !prev);
  };

  return (
    <StarfieldContext.Provider value={{ isStarfieldVisible, setIsStarfieldVisible, toggleStarfield }}>
      {children}
    </StarfieldContext.Provider>
  );
};

export const useStarfield = (): StarfieldValue => {
  const context = useContext(StarfieldContext);
  if (!context) {
    throw new Error('useStarfield must be used within StarfieldProvider');
  }
  return context;
};
