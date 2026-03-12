import { Tag, TagInsert, tagTable, TagUpdate, cardTagTable } from '@/db/schema';
import { db } from '@/lib/db';
import { eq, inArray } from 'drizzle-orm';

export default function useTagEdit() {
  const create = async (tag: TagInsert) => {
    const [newTag] = await db.insert(tagTable).values(tag).returning({ id: tagTable.id });
    return newTag.id;
  };

  const update = async (id: Tag['id'], tag: Partial<TagUpdate>) => {
    return await db.transaction(async (tx) => {
      const [updatedTag] = await tx
        .update(tagTable)
        .set(tag)
        .where(eq(tagTable.id, id))
        .returning();

      if (tag.cardList) {
        await tx.delete(cardTagTable).where(eq(cardTagTable.tagId, id));
        if (tag.cardList.length > 0) {
          const relations = tag.cardList.map((e) => ({
            cardId: e,
            tagId: id,
          }));
          await tx.insert(cardTagTable).values(relations);
        }
      }

      return updatedTag;
    });
  };

  const deleteMany = async (ids: Tag['id'][]) => {
    return await db.delete(tagTable).where(inArray(tagTable.id, ids));
  };

  return { create, update, deleteMany };
}
