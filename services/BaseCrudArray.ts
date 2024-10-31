import { ObjectLiteral, Repository } from "typeorm";
import { BaseListenerService } from "./BaseListener";
import { BaseCrud } from "@/types/generic";

export class BaseCrudArrayService<
  T extends BaseCrud,
  TCreate extends ObjectLiteral,
  TSchema extends ObjectLiteral
> extends BaseListenerService<T> {
  constructor(
    protected repo: Repository<TSchema>,
    private relations: string[]
  ) {
    super();
  }

  async init() {
    this.array = await this.getAll();
  }

  async create(payload: TCreate): Promise<T> {
    const entity = this.repo.create();

    Object.assign(entity, { ...payload });

    const ret = (await this.repo.save(entity)) as unknown as T;

    this.array.push(ret);

    this.notifyChange();

    return ret;
  }

  async getAll(): Promise<T[]> {
    return (await this.repo.find({
      relations: this.relations,
    })) as unknown as T[];
  }

  async getById(id: TSchema["id"]): Promise<T> {
    return (await this.repo.findOne({
      where: { id },
      relations: this.relations,
    })) as unknown as T;
  }

  async delete(id: TSchema["id"]) {
    const entity = await this.getById(id);
    if (!entity) {
      // TODO think of error handling
      console.error(`Card with id ${id} not found`);
      return;
    }

    const index = this.array.findIndex((item) => item.id === entity.id);
    if (index !== -1) {
      this.array.splice(index, 1);
    }

    this.notifyChange();

    await this.repo.delete({ id });
  }
}
