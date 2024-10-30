import { ConfSchema } from "@/schemas/schemas";
import { Conf, ConfUpdate } from "@/types/Conf";
import { Repository } from "typeorm";

export class ConfService {
  readonly empty: Conf = {
    sideA: "error",
    sideB: "error",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  constructor(private repo: Repository<ConfSchema>) {}

  // NOTE - make sure there is only one entity of Conf
  async createIfNeeded(): Promise<Conf> {
    const all = await this.repo.find();

    if (all.length) return all[0] as Conf;

    return (await this.repo.save(this.repo.create())) as Conf;
  }

  async get(): Promise<Conf> {
    const all = await this.repo.find();
    if (all.length === 0) {
      return this.empty;
    }
    const ret = all[0];

    return ret as Conf;
  }

  async update(payload: ConfUpdate): Promise<Conf> {
    const entity = await this.get();

    // TODO maybe this is ok
    // Object.assign(entity, { ...payload });
    entity.sideA = payload.sideA || entity.sideA;
    entity.sideB = payload.sideB || entity.sideB;

    const ret = await this.repo.save(entity);

    return ret as Conf;
  }
}
