import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface GlobalHeaderState {
  title: string;
  titleType: 'text' | 'image';
  node?: ReactNode;
}

interface GlobalHeaderContextType {
  state: GlobalHeaderState | null;
  setState: React.Dispatch<React.SetStateAction<GlobalHeaderState | null>>;
}

const GlobalHeaderContext = createContext<GlobalHeaderContextType | undefined>(undefined);

export function GlobalHeaderProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GlobalHeaderState | null>(null);

  return (
    <GlobalHeaderContext.Provider value={{ state, setState }}>
      {children}
    </GlobalHeaderContext.Provider>
  );
}

export function useGlobalHeader() {
  const context = useContext(GlobalHeaderContext);
  if (!context) {
    throw new Error('useGlobalHeader must be used within a GlobalHeaderProvider');
  }
  return context;
}
