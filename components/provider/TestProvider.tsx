import { Card } from '@/db/schema';
import { CardMeta } from '@/lib/types';
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface TestContextType {
  cardsToTest: Card[];
  setCardsToTest: React.Dispatch<React.SetStateAction<Card[]>>;
  metadataList: CardMeta[];
  setMetadataList: React.Dispatch<React.SetStateAction<CardMeta[]>>;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export function TestProvider({ children }: { children: ReactNode }) {
  const [cardsToTest, setCardsToTest] = useState<Card[]>([]);
  const [metadataList, setMetadataList] = useState<CardMeta[]>([]);

  return (
    <TestContext.Provider
      value={{
        cardsToTest,
        setCardsToTest,
        metadataList,
        setMetadataList,
      }}>
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
