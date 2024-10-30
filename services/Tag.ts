import { TagSchema } from "@/schemas/schemas";
import { Tag, TagCreate, TagUpdate } from "@/types/Tag";
import { Repository } from "typeorm";
import { BaseCrudArrayService } from "./BaseCrudArray";

export class TagService extends BaseCrudArrayService<Tag, TagSchema> {
  readonly RELATIONS = ["cards"];

  constructor(repo: Repository<TagSchema>) {
    const relations = ["cards"];
    super(repo, relations);
  }

  // TODO make sure to create and link
  async create(payload: TagCreate): Promise<Tag> {
    const entity = this.repo.create();

    Object.assign(entity, { ...payload });

    const ret = await this.repo.save(entity);

    this.array.push(ret);

    this.notifyChange();

    return ret;
  }

  async getById(id: number): Promise<Tag> {
    return (await this.repo.findOne({
      where: { id },
      relations: this.RELATIONS,
    })) as Tag;
  }

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

  async delete(id: TagSchema["id"]) {
    const entity = await this.getById(id);
    if (!entity) {
      // TODO think of error handling
      console.error(`Card with id ${id} not found`);
      return;
    }

    const index = this.array.findIndex((card) => card.id === entity.id);
    if (index !== -1) {
      this.array.splice(index, 1);
    }

    this.notifyChange();

    await this.repo.delete({ id });
  }

  get allTags() {
    return this.array;
  }
}
