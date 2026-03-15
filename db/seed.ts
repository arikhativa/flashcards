import { cardTable, tagTable, cardTagTable, configTable } from '@/db/schema';
import { db } from '@/lib/db';

async function seed() {
  console.log('🌱 Seeding database...');

  // 1. Clear existing data (optional, in dependency order)
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
        comment: "literary meens 'good day'",
        knowledgeLevel: 'Learning',
      },
    ])
    .returning();

  await db.insert(cardTagTable).values([{ cardId: card1.id, tagId: tag1.id }]);

  console.log('✅ Seed complete');
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
