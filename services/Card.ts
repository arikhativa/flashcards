import { CardSchema } from "@/schemas/schemas";
import { Card, CardCreate, CardUpdate } from "@/types/Card";
import { KnowledgeLevel } from "@/types/KnowledgeLevel";
import { Repository } from "typeorm";
import { BaseCrudArrayService } from "./BaseCrudArray";

export class CardService extends BaseCrudArrayService<Card, CardSchema> {
  readonly RELATIONS = ["tags"];

  constructor(repo: Repository<CardSchema>) {
    const relations = ["tags"];
    super(repo, relations);
  }

  // TODO add tag in ctor
  async create(payload: CardCreate): Promise<Card> {
    const entity = this.repo.create();

    // TODO validate input is a valid KnowledgeLevel
    Object.assign(entity, { ...payload });

    const ret = (await this.repo.save(entity)) as Card;

    this.array.push(ret);

    this.notifyChange();

    return ret;
  }

  async getById(id: number): Promise<Card> {
    return (await this.repo.findOne({
      where: { id },
      relations: this.RELATIONS,
    })) as Card;
  }

  async update(id: CardSchema["id"], payload: CardUpdate) {
    const entity = await this.getById(id);
    if (!entity) {
      // TODO think of error handling
      console.error(`Card with id ${id} not found`);
      return;
    }

    // TODO validate input is a valid KnowledgeLevel
    Object.assign(entity, { ...payload });

    const ret = await this.repo.save(entity);

    const index = this.array.findIndex((card) => card.id === ret.id);
    if (index !== -1) {
      this.array[index] = ret;
    }

    this.notifyChange();

    return ret;
  }

  async delete(id: CardSchema["id"]) {
    const entity = await this.getById(id);
    if (!entity) {
      // TODO think of error handling
      console.error(`Card with id ${id} not found`);
      return;
    }

    const index = this.array.findIndex((card) => card.id === entity.id);
    if (index !== -1) {
      this.array.splice(index, 1);
    }

    this.notifyChange();

    await this.repo.delete({ id });
  }

  get allCards() {
    return this.array;
  }
}
