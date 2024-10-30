import { TagSchema } from "@/schemas/schemas";

export type Tag = TagSchema;

export type TagCreate = Pick<Tag, "name">;

export type TagUpdate = Partial<Omit<Tag, "id" | "createdAt" | "updatedAt">>;