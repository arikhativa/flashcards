import { KnowledgeLevel } from "@/types/KnowledgeLevel";
import { CardCreate } from "../types/Card";
import { TagCreate } from "@/types/Tag";

export const CARDS: CardCreate[] = [
  {
    sideA: "Manger",
    sideB: "To eat",
    comment: "a simple verb",
    knowledgeLevel: KnowledgeLevel.Learning,
  },
  {
    sideA: "Placard",
    sideB: "closet",
    comment: "",
    knowledgeLevel: KnowledgeLevel.Learning,
  },
  {
    sideA: "ver",
    sideB: "glass",
    comment: "",
    knowledgeLevel: KnowledgeLevel.Learning,
  },
  {
    sideA: "Pomme",
    sideB: "Apple",
    comment: "it is like Adams",
    knowledgeLevel: KnowledgeLevel.GettingThere,
  },
  {
    sideA: "Port",
    sideB: "Door",
    comment: "",
    knowledgeLevel: KnowledgeLevel.GettingThere,
  },
  {
    sideA: "jour",
    sideB: "day",
    comment: "",
    knowledgeLevel: KnowledgeLevel.Confident,
  },
  {
    sideA: "il y a",
    sideB: "there is",
    comment: "",
    knowledgeLevel: KnowledgeLevel.Confident,
  },
  {
    sideA: "il fait chaud",
    sideB: "it's hot",
    comment: "",
    knowledgeLevel: KnowledgeLevel.Confident,
  },
  {
    sideA: "quelque chose",
    sideB: "something",
    comment: "",
    knowledgeLevel: KnowledgeLevel.Confident,
  },
  {
    sideA: "ou est la rue?",
    sideB: "where is the street?",
    comment: "",
    knowledgeLevel: KnowledgeLevel.Confident,
  },
];

export const TAGS: TagCreate[] = [
  {
    name: "verbs",
  },
  {
    name: "Phrases",
  },
  {
    name: "Nouns",
  },
  {
    name: "Food",
  },
];
