import { ObjectLiteral, Repository } from "typeorm";
import { BaseCrud } from "@/types/generic";

export class BaseCrudService<
  T extends BaseCrud,
  TCreate extends ObjectLiteral,
  TUpdate extends ObjectLiteral,
  TSchema extends ObjectLiteral
> {
  constructor(
    protected repo: Repository<TSchema>,
    protected onUpdate: () => void,
    private relations?: string[]
  ) {}

  async getAll(): Promise<T[]> {
    return (await this.repo.find({
      relations: this.relations || [],
    })) as unknown as T[];
  }

  async getById(id: TSchema["id"]): Promise<T> {
    return (await this.repo.findOne({
      where: { id },
      relations: this.relations || [],
    })) as unknown as T;
  }

  async create(payload: TCreate): Promise<T> {
    const entity = this.repo.create();

    Object.assign(entity, { ...payload });

    const ret = await this.repo.save(entity);

    this.onUpdate();

    return ret as unknown as T;
  }

  async update(id: TSchema["id"], payload: TUpdate) {
    const entity = (await this.getById(id)) as unknown as TSchema;
    if (!entity) {
      // TODO think of error handling
      console.error(`Card with id ${id} not found`);
      return;
    }

    Object.assign(entity, { ...payload });

    const ret = await this.repo.save(entity);

    // const index = this.array.findIndex((card) => card.id === ret.id);
    // if (index !== -1) {
    //   this.array[index] = ret;
    // }

    this.onUpdate();

    return ret;
  }

  async delete(id: TSchema["id"]) {
    const entity = await this.getById(id);
    if (!entity) {
      // TODO think of error handling
      console.error(`Card with id ${id} not found`);
      return;
    }

    // const index = this.array.findIndex((item) => item.id === entity.id);
    // if (index !== -1) {
    //   this.array.splice(index, 1);
    // }

    await this.repo.delete({ id });

    this.onUpdate();
  }
}
