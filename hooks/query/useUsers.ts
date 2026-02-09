import { usersTable } from '@/db/schema';
import { db } from '@/lib/db';
import { useQuery } from '@tanstack/react-query';

export default function useUsers() {
  const getUsers = async () => await db.select().from(usersTable);

  return useQuery({ queryKey: ['users'], queryFn: getUsers });
}
