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
  Learning = "rgba(130, 94, 92, 1)",
  GettingThere = "rgba(63, 195, 128, 1)",
  Confident = "rgba(102, 51, 153, 1)",
}

export enum KnowledgeLevelLightColor {
  Learning = "rgba(130, 94, 92, .1)",
  GettingThere = "rgba(63, 195, 128, .1)",
  Confident = "rgba(102, 51, 153, .1)",
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
