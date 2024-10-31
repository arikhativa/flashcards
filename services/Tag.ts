import { TagSchema } from "@/schemas/schemas";
import { Tag, TagCreate, TagUpdate } from "@/types/Tag";
import { Repository } from "typeorm";
import { BaseCrudService } from "./BaseCrud";

export class TagService extends BaseCrudService<
  Tag,
  TagCreate,
  TagUpdate,
  TagSchema
> {
  constructor(repo: Repository<TagSchema>, onUpdate: () => void) {
    const relations = ["cards"];
    super(repo, onUpdate, relations);
  }

  // TODO make sure to create and link
  // async create(payload: TagCreate): Promise<Tag> {
  //   return super.create(payload);
  // }
}
