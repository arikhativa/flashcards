import { Card, CardInsert, cardTable, cardTagTable, CardUpdate } from '@/db/schema';
import { db } from '@/lib/db';
import { eq, inArray } from 'drizzle-orm';

export default function useCardEdit() {
  const create = async (card: CardInsert) => {
    const [newCard] = await db.insert(cardTable).values(card).returning({ id: cardTable.id });
    return newCard.id;
  };

  const update = async (id: Card['id'], card: Partial<CardUpdate>) => {
    return await db.transaction(async (tx) => {
      const [updatedCard] = await tx
        .update(cardTable)
        .set(card)
        .where(eq(cardTable.id, id))
        .returning();

      if (card.tagList) {
        await tx.delete(cardTagTable).where(eq(cardTagTable.cardId, id));
        if (card.tagList.length > 0) {
          const relations = card.tagList.map((e) => ({
            cardId: id,
            tagId: e,
          }));
          await tx.insert(cardTagTable).values(relations);
        }
      }

      return updatedCard;
    });
  };

  const deleteMany = async (ids: Card['id'][]) => {
    return await db.delete(cardTable).where(inArray(cardTable.id, ids));
  };

  return { deleteMany, create, update };
}
