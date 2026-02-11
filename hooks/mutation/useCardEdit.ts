import { Card, CardInsert, cardTable, CardUpdate } from '@/db/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';

export default function useCardEdit() {
  const create = async (card: CardInsert) => {
    return db.insert(cardTable).values(card);
  };

  const update = async (id: Card['id'], card: Partial<CardUpdate>) => {
    return db.update(cardTable).set(card).where(eq(cardTable.id, id));
  };

  return { create, update };
}
