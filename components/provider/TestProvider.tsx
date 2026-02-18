import { CardSide } from '@/lib/types';
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface TestSettings {
  numberOfCards: number;
  // timeRange: TimeRange;
  // selectedTags: Tag[];
  // knowledgeLevels: SelectedKL;
  testSide: CardSide;
}

interface TestContextType {
  testSettings: TestSettings | null;
  setTestSettings: React.Dispatch<React.SetStateAction<TestSettings | null>>;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export function TestProvider({ children }: { children: ReactNode }) {
  const [testSettings, setTestSettings] = useState<TestSettings | null>(null);

  return (
    <TestContext.Provider value={{ testSettings, setTestSettings }}>
      {children}
    </TestContext.Provider>
  );
}

export function useTest() {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
}
