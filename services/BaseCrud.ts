import {ObjectLiteral, Repository} from 'typeorm';
import {BaseCrud} from '../types/generic';

export class BaseCrudService<
  T extends BaseCrud,
  TCreate extends ObjectLiteral,
  TUpdate extends ObjectLiteral,
  TSchema extends ObjectLiteral,
> {
  constructor(
    protected repo: Repository<TSchema>,
    protected onUpdate: (ids: T['id'][]) => void,
    private relations?: string[],
  ) {}

  async getAll(): Promise<T[] | null> {
    try {
      return (await this.repo.find({
        relations: this.relations || [],
      })) as unknown as T[];
    } catch (e) {
      console.error('getAll error: ', e);
    }

    return null;
  }

  async getAllArchive(): Promise<T[] | null> {
    try {
      return (await this.repo.find({
        relations: this.relations || [],
        withDeleted: true,
      })) as unknown as T[];
    } catch (e) {
      console.error('getAllArchive error: ', e);
    }

    return null;
  }

  async getById(
    id: TSchema['id'],
    withArchive: boolean = true,
  ): Promise<T | null> {
    try {
      const ret = await this.repo.findOne({
        where: {id},
        relations: this.relations || [],
        withDeleted: withArchive,
      });

      if (ret) {
        return ret as unknown as T;
      }
    } catch (e) {
      console.error('getById error: ', e);
    }
    return null;
  }

  async getByIds(
    ids: TSchema['id'][],
    withArchive: boolean = true,
  ): Promise<T[] | null> {
    try {
      const promises = ids.map(id => this.getById(id, withArchive));
      const results = (await Promise.all(promises)).filter(e => e);

      if (results.length) {
        return results as unknown as T[];
      }
      return null;
    } catch (e) {
      console.error('getByIds error: ', e);
      return null;
    }
  }

  async create(payload: TCreate): Promise<T | null> {
    const entity = this.repo.create();

    Object.assign(entity, {...payload});

    try {
      const ret = await this.repo.save(entity);
      this.onUpdate([ret.id]);
      return ret as unknown as T;
    } catch (e) {
      console.error('create error: ', e);
    }
    return null;
  }

  async update(id: TSchema['id'], payload: TUpdate): Promise<T | null> {
    const entity = (await this.getById(id)) as unknown as TSchema;
    if (!entity) {
      console.error(`update error: id ${id} not found`);
      return null;
    }

    Object.assign(entity, {...payload});

    try {
      const ret = await this.repo.save(entity);
      this.onUpdate([ret.id]);
      return ret as unknown as T;
    } catch (e) {
      console.error('update error: ', e);
    }

    return null;
  }

  async updateMany(list: TUpdate[]): Promise<boolean> {
    try {
      const ret = await this.repo.save(list as unknown as TSchema[]);
      this.onUpdate([...ret.map(e => e.id)]);
      return true;
    } catch (e) {
      console.error('updateMany error: ', e);
    }

    return false;
  }

  async delete(id: TSchema['id']): Promise<boolean> {
    const entity = await this.getById(id);
    if (!entity) {
      console.error(`delete error: id ${id} not found`);
      return false;
    }

    try {
      await this.repo.delete({id});
      this.onUpdate([id]);
      return true;
    } catch (e) {
      console.error('delete error: ', e);
    }

    return false;
  }

  // TODO currently there is not check for this
  async deleteMany(list: TSchema['id'][]): Promise<boolean> {
    try {
      await this.repo.delete(list);
      this.onUpdate(list);
      return true;
    } catch (e) {
      console.error('deleteMany error: ', e);
    }

    return false;
  }

  // async archive(id: TSchema["id"]): Promise<boolean> {
  //   const entity = await this.getById(id);
  //   if (!entity) {
  //     console.error(`archive error: id ${id} not found`);
  //     return false;
  //   }

  //   try {
  //     await this.repo.softDelete({ id });
  //     this.onUpdate();
  //     return true;
  //   } catch (e) {
  //     console.error("archive error: ", e);
  //   }

  //   return false;
  // }

  // async restore(id: TSchema["id"]): Promise<boolean> {
  //   const entity = await this.getById(id);
  //   if (!entity) {
  //     console.error(`restore error: id ${id} not found`);
  //     return false;
  //   }

  //   try {
  //     await this.repo.restore({ id });
  //     this.onUpdate();
  //     return true;
  //   } catch (e) {
  //     console.error("restore error: ", e);
  //   }

  //   return false;
  // }

  // TODO currently there is not check for this
  // async archiveMany(list: TSchema["id"][]): Promise<boolean> {
  //   try {
  //     await this.repo.softDelete(list);
  //     this.onUpdate();
  //     return true;
  //   } catch (e) {
  //     console.error("archiveMany error: ", e);
  //   }

  //   return false;
  // }
}
