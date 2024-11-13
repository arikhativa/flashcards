export enum KnowledgeLevel {
  Learning = "Learning",
  GettingThere = "GettingThere",
  Confident = "Confident",
}

export enum KnowledgeLevelName {
  Learning = "Learning",
  GettingThere = "Getting There",
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

export const FULL_SELECTED_KL = {
  Learning: true,
  GettingThere: true,
  Confident: true,
};

export const FULL_UNSELECTED_KL = {
  Learning: false,
  GettingThere: false,
  Confident: false,
};
