import { TagSchema } from "@/schemas/schemas";
import { Tag, TagCreate, TagUpdate } from "@/types/Tag";
import { Repository } from "typeorm";

export class TagService {
  readonly RELATIONS = ["cards"];

  constructor(private repo: Repository<TagSchema>) {}

  // TODO make sure to create and link
  async create(payload: TagCreate): Promise<Tag> {
    const entity = this.repo.create();

    Object.assign(entity, { ...payload });

    return (await this.repo.save(entity)) as Tag;
  }

  async getById(id: number): Promise<Tag> {
    return (await this.repo.findOne({
      where: { id },
      relations: this.RELATIONS,
    })) as Tag;
  }

  async getAll(): Promise<Tag[]> {
    return (await this.repo.find({ relations: this.RELATIONS })) as Tag[];
  }

  async update(id: TagSchema["id"], payload: TagUpdate) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
      // TODO think of error handling
      console.error(`Tag with id ${id} not found`);
      return;
    }

    Object.assign(entity, { ...payload });

    return (await this.repo.save(entity)) as Tag;
  }

  async delete(id: TagSchema["id"]) {
    await this.repo.delete({ id });
  }
}
