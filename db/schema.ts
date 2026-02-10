import { sqliteTable, text, integer, check } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';

export const KNOWLEDGE_LEVELS = ['Learning', 'GettingThere', 'Confident'] as const;

export type KnowledgeLevel = (typeof KNOWLEDGE_LEVELS)[number];

export const cardTable = sqliteTable('card', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  sideA: text('side_a').default('').notNull(),
  sideB: text('side_b').default('').notNull(),
  comment: text('comment').default('').notNull(),

  knowledgeLevel: text('knowledge_level', { enum: KNOWLEDGE_LEVELS }).notNull().default('Learning'),

  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .$default(() => new Date())
    .notNull(),

  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .notNull()
    .$default(() => new Date())
    .$onUpdate(() => new Date()),
});

// Tag table
export const tagTable = sqliteTable('tag', {
  id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
  name: text('name').default(''),

  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .$default(() => new Date())
    .notNull(),

  // TODO check if update works
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .notNull()
    .$default(() => new Date())
    .$onUpdate(() => new Date()),
});

export const cardTagTable = sqliteTable('card_tag', {
  cardId: integer('card_id')
    .notNull()
    .references(() => cardTable.id, { onDelete: 'cascade' }),
  tagId: integer('tag_id')
    .notNull()
    .references(() => tagTable.id, { onDelete: 'cascade' }),
});

// Config table (singleton - one row only)
export const config = sqliteTable(
  'config',
  {
    id: integer('id').default(1),
    sideA: text('side_a').default('A'),
    sideB: text('side_b').default('B'),
    createdAt: integer('created_at', { mode: 'timestamp_ms' })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => [check('id_check', sql`${table.id} = 1`)]
);

// Relations
export const cardRelations = relations(cardTable, ({ many }) => ({
  tagList: many(cardTagTable),
}));

export const tagRelations = relations(tagTable, ({ many }) => ({
  cardList: many(cardTagTable),
}));

export const cardTagRelations = relations(cardTagTable, ({ one }) => ({
  card: one(cardTable, {
    fields: [cardTagTable.cardId],
    references: [cardTable.id],
  }),
  tag: one(tagTable, {
    fields: [cardTagTable.tagId],
    references: [tagTable.id],
  }),
}));

// Type exports for TypeScript
export type Card = typeof cardTable.$inferSelect;
export type CardInsert = typeof cardTable.$inferInsert;

export type Tag = typeof tagTable.$inferSelect;
export type TagInsert = typeof tagTable.$inferInsert;

export type CardTag = typeof cardTagTable.$inferSelect;
export type CardTagInsert = typeof cardTagTable.$inferInsert;

export type Config = typeof config.$inferSelect;
export type ConfigInsert = typeof config.$inferInsert;
