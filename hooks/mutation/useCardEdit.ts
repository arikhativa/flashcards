import { CardInsert, cardTable } from '@/db/schema';
import { db } from '@/lib/db';

export default function useCardEdit() {
  const create = async (card: CardInsert) => {
    return db.insert(cardTable).values(card);
  };
  return { create };
}
