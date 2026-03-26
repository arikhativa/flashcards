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
  Learning: { bg: 'bg-learning', border: 'border-learning', borderB: 'border-b-learning' },
  GettingThere: {
    bg: 'bg-getting-there',
    border: 'border-getting-there',
    borderB: 'border-b-getting-there',
  },
  Confident: { bg: 'bg-confident', border: 'border-confident', borderB: 'border-b-confident' },
} as const;

export type KnowledgeLevelColorEnum =
  (typeof knowledgeLevelColorEnum)[keyof typeof knowledgeLevelColorEnum];

export const cardOrderByEnum = {
  CreationTime: 'CreationTime',
  SideA: 'SideA',
  SideB: 'SideB',
  KnowledgeLevel: 'KnowledgeLevel',
  TestedTime: 'TestedTime',
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

export const testCardSideEnum = {
  A: 'A',
  B: 'B',
  Both: 'Both',
} as const;

export type TestCardSideEnum = (typeof testCardSideEnum)[keyof typeof testCardSideEnum];

export const themeEnum = {
  system: 'system',
  dark: 'dark',
  light: 'light',
} as const;

export type ThemeEnum = (typeof themeEnum)[keyof typeof themeEnum];

export const themeEnumText: Record<ThemeEnum, string> = {
  system: 'System',
  dark: 'Dark',
  light: 'Light',
} as const;

export const themeEnumArray = ['system', 'dark', 'light'] as const;
