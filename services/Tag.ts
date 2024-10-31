import { TagSchema } from "@/schemas/schemas";
import { Tag, TagCreate, TagUpdate } from "@/types/Tag";
import { Repository } from "typeorm";
import { BaseCrudArrayService } from "./BaseCrudArray";

export class TagService extends BaseCrudArrayService<
  Tag,
  TagCreate,
  TagSchema
> {
  constructor(repo: Repository<TagSchema>) {
    const relations = ["cards"];
    super(repo, relations);
  }

  // TODO make sure to create and link
  // async create(payload: TagCreate): Promise<Tag> {
  //   return super.create(payload);
  // }

  async update(id: TagSchema["id"], payload: TagUpdate) {
    const entity = await this.getById(id);
    if (!entity) {
      // TODO think of error handling
      console.error(`Card with id ${id} not found`);
      return;
    }

    Object.assign(entity, { ...payload });

    const ret = await this.repo.save(entity);

    const index = this.array.findIndex((card) => card.id === ret.id);
    if (index !== -1) {
      this.array[index] = ret;
    }

    this.notifyChange();

    return ret;
  }

  get allTags() {
    return this.array;
  }
}
