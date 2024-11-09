export enum KnowledgeLevel {
  Learning = "Learning",
  GettingThere = "GettingThere",
  Confident = "Confident",
}

export enum KnowledgeLevelColor {
  Learning = "yellow",
  GettingThere = "green",
  Confident = "purple",
}

export interface SelectedKL {
  Learning: boolean;
  GettingThere: boolean;
  Confident: boolean;
}
