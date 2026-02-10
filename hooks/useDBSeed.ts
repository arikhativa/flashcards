import { cardTable, tagTable } from '@/db/schema';
import useConfigEdit from '@/hooks/mutation/useConfigEdit';
import useConfig from '@/hooks/query/useConfig';
import { db } from '@/lib/db';
import { seed } from 'drizzle-seed';
import { useEffect } from 'react';

export default function useDBSeed() {
  const { create, update } = useConfigEdit();
  const { data } = useConfig();

  useEffect(() => {
    const f = async () => {
      if (__DEV__) {
        console.log('useDBSeed: Start');
        await seed(db as any, { cardTable, tagTable });
        console.log('useDBSeed: Done');
      }
    };
    f();
  }, []);
}
