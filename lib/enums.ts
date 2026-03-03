export const knowledgeLevelEnum = {
  Learning: 'Learning',
  GettingThere: 'GettingThere',
  Confident: 'Confident',
} as const;

export type KnowledgeLevelEnum = (typeof knowledgeLevelEnum)[keyof typeof knowledgeLevelEnum];

export const knowledgeLevelEnumArray = ['Learning', 'GettingThere', 'Confident'] as const;

export const knowledgeLevelColorEnum = {
  Learning: { border: 'border-b-learning' },
  GettingThere: { border: 'border-b-getting-there' },
  Confident: { border: 'border-b-confident' },
} as const;

export type KnowledgeLevelColorEnum =
  (typeof knowledgeLevelColorEnum)[keyof typeof knowledgeLevelColorEnum];
