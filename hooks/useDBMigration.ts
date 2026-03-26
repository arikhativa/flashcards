import { migrate } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '@/drizzle/migrations';
import { db } from '@/lib/db';
import { useEffect, useState } from 'react';

let migrationPromise: Promise<boolean> | null = null;

export default function useDBMigrations(): boolean | null {
  if (!migrationPromise) {
    migrationPromise = migrate(db, migrations)
      .then(() => {
        console.info('Migration: Done');
        return true;
      })
      .catch((e) => {
        console.error('Migration:', e);
        return false;
      });
  }

  // still need a hook to track the async result reactively
  const [success, setSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    migrationPromise!.then(setSuccess);
  }, []);

  return success;
}
