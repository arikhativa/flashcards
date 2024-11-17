import { CardSchema, TagSchema } from "@/schemas/schemas";

export type Tag = TagSchema;

export type TagCreate = Pick<Tag, "name"> & {
  cards?: CardSchema[];
};

export type TagUpdate = Partial<Omit<Tag, "id" | "createdAt" | "updatedAt">>;
