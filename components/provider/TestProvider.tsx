import { CARD_SIDE_VALUE } from '@/lib/types';
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import * as z from 'zod';

export const testSettingsSchema = z.object({
  numberOfCards: z.number().min(1),
  testSide: z.enum(CARD_SIDE_VALUE),
  cardIdsToTest: z.array(z.number()).optional(),
  tagIdsToTest: z.array(z.number()).optional(),
});

export type TestSettings = z.infer<typeof testSettingsSchema>;

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
