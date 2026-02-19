export const knowledgeLevelEnum = {
  Learning: 'Learning',
  GettingThere: 'GettingThere',
  Confident: 'Confident',
} as const;

export type KnowledgeLevelEnum = (typeof knowledgeLevelEnum)[keyof typeof knowledgeLevelEnum];

export const knowledgeLevelEnumArray = ['Learning', 'GettingThere', 'Confident'] as const;

export const knowledgeLevelColorEnum = {
  Learning: 'border-orange-900',
  GettingThere: 'border-emerald-500',
  Confident: 'border-purple-700',
} as const;

export type KnowledgeLevelColorEnum =
  (typeof knowledgeLevelColorEnum)[keyof typeof knowledgeLevelColorEnum];
