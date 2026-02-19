export const knowledgeLevelEnum = {
  Learning: 'Learning',
  GettingThere: 'GettingThere',
  Confident: 'Confident',
} as const;

export type KnowledgeLevelEnum = (typeof knowledgeLevelEnum)[keyof typeof knowledgeLevelEnum];

export const knowledgeLevelEnumArray = ['Learning', 'GettingThere', 'Confident'] as const;

export const knowledgeLevelColorEnum = {
  Learning: 'rgba(130, 94, 92, 1)',
  GettingThere: 'rgba(63, 195, 128, 1)',
  Confident: 'rgba(102, 51, 153, 1)',
} as const;

export type KnowledgeLevelColorEnum =
  (typeof knowledgeLevelColorEnum)[keyof typeof knowledgeLevelColorEnum];
