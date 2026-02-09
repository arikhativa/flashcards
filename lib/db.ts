import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as SQLite from 'expo-sqlite';
import * as schema from '@/db/schema';

export const expoDBFile = SQLite.openDatabaseSync('db.db');
export const db = drizzle(expoDBFile, { schema });
