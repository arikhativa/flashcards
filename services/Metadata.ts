import { MetadataSchema } from "@/schemas/schemas";
import { Metadata, MetadataUpdate } from "@/types/Metadata";
import { Repository } from "typeorm";

// TODO this should share a bse with conf

export class MetadataService {
  constructor(
    private repo: Repository<MetadataSchema>,
    private onUpdate: () => void
  ) {}

  // NOTE - make sure there is only one entity of Metadata
  async init(): Promise<boolean> {
    let all: MetadataSchema[] = [];

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

  async get(): Promise<Metadata | null> {
    let all: MetadataSchema[] = [];

    try {
      all = await this.repo.find();
    } catch (e) {
      console.error("get error: ", e);
    }

    if (all.length === 0) {
      return null;
    }

    const ret = all[0];

    return ret as Metadata;
  }

  async update(payload: MetadataUpdate): Promise<Metadata | null> {
    const entity = await this.get();

    if (!entity) {
      console.error("update: entity not found");
      return null;
    }

    if (payload.cardsCreated) {
      entity.cardsCreated = payload.cardsCreated;
    }

    try {
      const ret = await this.repo.save(entity);
      this.onUpdate();
      return ret as Metadata;
    } catch (e) {
      console.error("update error: ", e);
    }

    return null;
  }
}
