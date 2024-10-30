import { ObjectLiteral, Repository } from "typeorm";
import { BaseListenerService } from "./BaseListener";

export class BaseCrudArrayService<
  T,
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
}
