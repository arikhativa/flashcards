import { cardTable, tagTable } from '@/db/schema';
import { db } from '@/lib/db';
import { seed } from 'drizzle-seed';
import { useEffect } from 'react';

export default function useDBSeed() {
  useEffect(() => {
    const f = async () => {
      if (__DEV__) {
        try {
          console.log('useDBSeed: Start');
          await seed(db as any, { cardTable, tagTable });
          console.log('useDBSeed: Done');
        } catch (e) {
          console.log('useDBSeed: Failed: ', e);
          return;
        }
      }
    };
    f();
  }, []);
}
