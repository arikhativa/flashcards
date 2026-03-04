export const knowledgeLevelEnum = {
  Learning: 'Learning',
  GettingThere: 'GettingThere',
  Confident: 'Confident',
} as const;

export type KnowledgeLevelEnum = (typeof knowledgeLevelEnum)[keyof typeof knowledgeLevelEnum];

export const knowledgeLevelText: Record<KnowledgeLevelEnum, string> = {
  Learning: 'Learning',
  GettingThere: 'Getting There',
  Confident: 'Confident',
} as const;

export const knowledgeLevelEnumArray = ['Learning', 'GettingThere', 'Confident'] as const;

export const knowledgeLevelColorEnum = {
  Learning: { border: 'border-b-learning' },
  GettingThere: { border: 'border-b-getting-there' },
  Confident: { border: 'border-b-confident' },
} as const;

export type KnowledgeLevelColorEnum =
  (typeof knowledgeLevelColorEnum)[keyof typeof knowledgeLevelColorEnum];

export const cardOrderByEnum = {
  CreationTime: 'CreationTime',
  SideA: 'SideA',
  SideB: 'SideB',
  KnowledgeLevel: 'KnowledgeLevel',
} as const;

export type CardOrderByEnum = (typeof cardOrderByEnum)[keyof typeof cardOrderByEnum];

export const directionEnum = {
  Asc: 'Asc',
  Desc: 'Desc',
} as const;

export type DirectionEnum = (typeof directionEnum)[keyof typeof directionEnum];

export const fixedDateEnum = {
  LastDay: 'LastDay',
  LastWeek: 'LastWeek',
  LastMonth: 'LastMonth',
  Anytime: 'Anytime',
} as const;

export type FixedDateEnum = (typeof fixedDateEnum)[keyof typeof fixedDateEnum];
