import { ConfSchema } from "@/schemas/schemas";
import { Conf, ConfUpdate } from "@/types/Conf";
import { Repository } from "typeorm";

export class ConfService {
  static readonly EMPTY: Conf = {
    sideA: "error",
    sideB: "error",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  constructor(
    private repo: Repository<ConfSchema>,
    private onUpdate: () => void
  ) {}

  // NOTE - make sure there is only one entity of Conf
  async init(): Promise<boolean> {
    let all: ConfSchema[] = [];

    try {
      all = await this.repo.find();
    } catch (e) {
      console.error("init: db find error: ", e);
      return false;
    }

    if (all.length) {
      this.onUpdate();
      return true;
    }

    try {
      await this.repo.save(this.repo.create());
      this.onUpdate();
      return true;
    } catch (e) {
      console.error("init: db save error: ", e);
    }

    return false;
  }

  async get(): Promise<Conf | null> {
    let all: ConfSchema[] = [];

    try {
      all = await this.repo.find();
    } catch (e) {
      console.error("get error: ", e);
    }

    if (all.length === 0) {
      return null;
    }

    const ret = all[0];

    return ret as Conf;
  }

  async update(payload: ConfUpdate): Promise<Conf | null> {
    const entity = await this.get();

    if (!entity) {
      console.error("update: entity not found");
      return null;
    }

    entity.sideA = payload.sideA || entity.sideA;
    entity.sideB = payload.sideB || entity.sideB;

    try {
      const ret = await this.repo.save(entity);
      this.onUpdate();
      return ret as Conf;
    } catch (e) {
      console.error("update error: ", e);
    }

    return null;
  }
}
