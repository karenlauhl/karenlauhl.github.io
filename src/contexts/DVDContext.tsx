import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

interface DVDValue {
  isDVDVisible: boolean;
  setIsDVDVisible: Dispatch<SetStateAction<boolean>>;
  toggleDVD: () => void;
}

const DVDContext = createContext<DVDValue | undefined>(undefined);

export const DVDProvider = ({ children }: { children: ReactNode }) => {
  const [isDVDVisible, setIsDVDVisible] = useState(true);

  const toggleDVD = () => {
    setIsDVDVisible(prev => !prev);
  };

  return (
    <DVDContext.Provider value={{ isDVDVisible, setIsDVDVisible, toggleDVD }}>
      {children}
    </DVDContext.Provider>
  );
};

export const useDVD = (): DVDValue => {
  const context = useContext(DVDContext);
  if (!context) {
    throw new Error('useDVD must be used within DVDProvider');
  }
  return context;
};
