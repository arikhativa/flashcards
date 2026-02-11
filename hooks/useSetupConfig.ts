import useConfigEdit from '@/hooks/mutation/useConfigEdit';
import { useEffect } from 'react';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { configTable } from '@/db/schema';

export default function useSetupConfig(migrationsSuccess: boolean) {
  const { create } = useConfigEdit();

  useEffect(() => {
    const setup = async () => {
      try {
        const result = await db.query.configTable.findFirst({ where: eq(configTable.id, 1) });
        if (!result) {
          console.log('Failed to find config, creating one');
          await create({});
          console.log('useSetupConfig: Created new config');
        }
      } catch (e) {
        console.log('useSetupConfig', e);
      }
    };
    if (migrationsSuccess) {
      setup();
    }
  }, [migrationsSuccess, create]);
}
