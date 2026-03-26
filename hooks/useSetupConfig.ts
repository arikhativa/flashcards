import useConfigEdit from '@/hooks/mutation/useConfigEdit';
import { useEffect } from 'react';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { configTable } from '@/db/schema';
import { useColorScheme } from 'nativewind';

let hasRun = false;

export default function useSetupConfig(migrationsSuccess: boolean | null) {
  const { create } = useConfigEdit();
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    if (!migrationsSuccess || hasRun) return;
    hasRun = true;

    const setup = async () => {
      try {
        const result = await db.query.configTable.findFirst({ where: eq(configTable.id, 1) });
        if (!result) {
          console.log('Failed to find config, creating one');
          await create({});
          console.log('useSetupConfig: Created new config');
        } else {
          setColorScheme(result.theme);
        }
      } catch (e) {
        console.log('useSetupConfig', e);
      }
    };

    setup();
  }, [migrationsSuccess]);
}
