import { ObjectLiteral, Repository } from "typeorm";
import { BaseListenerService } from "./BaseListener";
import { BaseCrud } from "@/types/generic";

export class BaseCrudArrayService<
  T extends BaseCrud,
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
