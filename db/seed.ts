import { cardTable, tagTable, cardTagTable, configTable } from '@/db/schema';
import { CARDS_TO_SEED, TAGS_TO_SEED } from '@/db/seedData';
import { db } from '@/lib/db';

export async function reset() {
  // eslint-disable-next-line drizzle/enforce-delete-with-where
  await db.delete(cardTagTable);
  // eslint-disable-next-line drizzle/enforce-delete-with-where
  await db.delete(cardTable);
  // eslint-disable-next-line drizzle/enforce-delete-with-where
  await db.delete(tagTable);
  // eslint-disable-next-line drizzle/enforce-delete-with-where
  await db.delete(configTable);
}

export async function seed() {
  await reset();

  await db.insert(configTable).values({
    id: 1,
    sideA: 'English',
    sideB: 'French',
  });

  const tags = await db.insert(tagTable).values(TAGS_TO_SEED).returning();

  // Map tag names to their DB rows for easy lookup
  const tagMap = Object.fromEntries(tags.map((t) => [t.name, t]));

  const cards = await db.insert(cardTable).values(CARDS_TO_SEED).returning();

  // Card index → tag name(s)
  const cardTagAssignments: [number, string[]][] = [
    [0, ['Greetings']],
    [1, ['Greetings', 'Common Phrases']],
    [2, ['Greetings']],
    [3, ['Greetings', 'Common Phrases']],
    [4, ['Animals']],
    [5, ['Animals']],
    [6, ['Animals']],
    [7, ['Animals']],
    [8, ['Common Verbs', 'Food & Drink']],
    [9, ['Common Verbs', 'Food & Drink']],
    [10, ['Common Verbs']],
    [11, ['Common Verbs', 'Travel']],
    [12, ['Common Verbs']],
    [13, ['Common Verbs']],
    [14, ['Numbers']],
    [15, ['Numbers']],
    [16, ['Numbers']],
    [17, ['Colors']],
    [18, ['Colors']],
    [19, ['Colors']],
    [20, ['Colors']],
    [21, ['Food & Drink']],
    [22, ['Food & Drink']],
    [23, ['Food & Drink']],
    [24, ['Food & Drink']],
    [25, ['Food & Drink']],
    [26, ['Family']],
    [27, ['Family']],
    [28, ['Family']],
    [29, ['Family']],
    [30, ['Body Parts']],
    [31, ['Body Parts']],
    [32, ['Body Parts']],
    [33, ['Travel']],
    [34, ['Travel']],
    [35, ['Travel']],
    [36, ['Weather']],
    [37, ['Weather']],
    [38, ['Weather', 'Nature']],
    [39, ['Days & Months', 'Time & Dates']],
    [40, ['Days & Months', 'Time & Dates']],
    [41, ['Days & Months', 'Time & Dates']],
    [42, ['Emotions']],
    [43, ['Emotions']],
    [44, ['Emotions']],
    [45, ['Common Phrases']],
    [46, ['Common Phrases']],
    [47, ['Common Phrases']],
    [48, ['Common Phrases', 'Travel']],
    [49, ['Common Phrases', 'Food & Drink']],
  ];

  const cardTagRows = cardTagAssignments.flatMap(([cardIndex, tagNames]) =>
    tagNames.map((tagName) => ({
      cardId: cards[cardIndex].id,
      tagId: tagMap[tagName].id,
    }))
  );

  await db.insert(cardTagTable).values(cardTagRows);
}
