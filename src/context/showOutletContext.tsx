import React, { createContext, useState, useContext } from "react";

interface ShowOutletContextType {
  showOutlet: boolean;
  setShowOutlet: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowOutletContext = createContext<ShowOutletContextType>({
  showOutlet: false,
  setShowOutlet: () => {},
});

export const useShowOutlet = () => useContext(ShowOutletContext);

import { ReactNode } from "react";

interface ShowOutletProviderProps {
  children: ReactNode;
}

export const ShowOutletProvider = ({ children }: ShowOutletProviderProps) => {
  const [showOutlet, setShowOutlet] = useState(false);

  return (
    <ShowOutletContext.Provider value={{ showOutlet, setShowOutlet }}>
      {children}
    </ShowOutletContext.Provider>
  );
};
