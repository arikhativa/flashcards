import { Config, ConfigInsert, configTable } from '@/db/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';

export default function useConfigEdit() {
  const create = async (conf: ConfigInsert) => {
    return db.insert(configTable).values(conf);
  };

  const update = async (conf: Partial<Config>) => {
    return db.update(configTable).set(conf).where(eq(configTable.id, 1));
  };

  return { create, update };
}
