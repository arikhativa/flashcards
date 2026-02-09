import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '@/drizzle/migrations';
import { db } from '@/lib/db';

export default function useDBMigrations() {
  const { success, error } = useMigrations(db, migrations);
  if (error) {
    console.error('Migration: ', error);
  } else if (success) {
    console.log('Migration: Done');
  }
}
