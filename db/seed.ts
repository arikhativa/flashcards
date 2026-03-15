import { cardTable, tagTable, cardTagTable, configTable } from '@/db/schema';
import { db } from '@/lib/db';

export async function seed() {
  // eslint-disable-next-line drizzle/enforce-delete-with-where
  await db.delete(cardTagTable);
  // eslint-disable-next-line drizzle/enforce-delete-with-where
  await db.delete(cardTable);
  // eslint-disable-next-line drizzle/enforce-delete-with-where
  await db.delete(tagTable);
  // eslint-disable-next-line drizzle/enforce-delete-with-where
  await db.delete(configTable);

  await db.insert(configTable).values({
    id: 1,
    sideA: 'English',
    sideB: 'French',
  });

  const [tag1, tag2, tag3] = await db
    .insert(tagTable)
    .values([{ name: 'Greetings' }, { name: 'Animals' }, { name: 'Common Verbs' }])
    .returning();

  const [card1] = await db
    .insert(cardTable)
    .values([
      {
        sideA: 'Hey',
        sideB: 'Bone Jour',
        comment: "literary means 'good day'",
        knowledgeLevel: 'Learning',
      },
    ])
    .returning();

  await db.insert(cardTagTable).values([{ cardId: card1.id, tagId: tag1.id }]);
}
