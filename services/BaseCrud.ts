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

  async getAll(): Promise<T[] | null> {
    try {
      return (await this.repo.find({
        relations: this.relations || [],
      })) as unknown as T[];
    } catch (e) {
      console.error("getAll error: ", e);
    }

    return null;
  }

  async getById(id: TSchema["id"]): Promise<T | null> {
    try {
      const ret = await this.repo.findOne({
        where: { id },
        relations: this.relations || [],
      });

      if (ret) return ret as unknown as T;
    } catch (e) {
      console.error("getById error: ", e);
    }
    return null;
  }

  async create(payload: TCreate): Promise<T | null> {
    const entity = this.repo.create();

    Object.assign(entity, { ...payload });

    try {
      const ret = await this.repo.save(entity);
      this.onUpdate();
      return ret as unknown as T;
    } catch (e) {
      console.error("create error: ", e);
    }
    return null;
  }

  async update(id: TSchema["id"], payload: TUpdate): Promise<T | null> {
    const entity = (await this.getById(id)) as unknown as TSchema;
    if (!entity) {
      console.error(`update error: id ${id} not found`);
      return null;
    }

    Object.assign(entity, { ...payload });

    try {
      const ret = await this.repo.save(entity);
      this.onUpdate();
      return ret as unknown as T;
    } catch (e) {
      console.error("update error: ", e);
    }

    return null;
  }

  async delete(id: TSchema["id"]): Promise<boolean> {
    const entity = await this.getById(id);
    if (!entity) {
      console.error(`delete error: id ${id} not found`);
      return false;
    }

    try {
      await this.repo.delete({ id });
      this.onUpdate();
      return true;
    } catch (e) {
      console.error("delete error: ", e);
    }

    return false;
  }
}
