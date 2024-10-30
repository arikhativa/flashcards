import { source } from "@/hooks/db";
import { CardSchema } from "@/schemas/schemas";
import { Card, CardCreate, CardUpdate } from "@/types/Card";
import { KnowledgeLevel } from "@/types/KnowledgeLevel";
import { Tag } from "@/types/Tag";
import { Repository } from "typeorm";

export class CardService {
  readonly RELATIONS = ["tags"];

  constructor(private repo: Repository<CardSchema>) {}

  // TODO add tag in ctor
  async create(payload: CardCreate): Promise<Card> {
    const card = this.repo.create();
    card.sideA = payload.sideA;
    card.sideB = payload.sideB;
    card.comment = payload.comment;
    card.knowledgeLevel = payload.knowledgeLevel || KnowledgeLevel.Learning;

    return (await this.repo.save(card)) as Card;
  }

  async getById(id: number): Promise<Card> {
    return (await this.repo.findOne({
      where: { id },
      relations: this.RELATIONS,
    })) as Card;
  }

  async getAll(): Promise<Card[]> {
    return (await this.repo.find({ relations: this.RELATIONS })) as Card[];
  }

  async update(id: CardSchema["id"], payload: CardUpdate) {
    const card = await this.repo.findOne({ where: { id } });
    if (!card) {
      // TODO think of error handling
      console.error(`Card with id ${id} not found`);
      return;
    }

    Object.assign(card, { ...payload });

    return (await this.repo.save(card)) as Card;
  }

  async delete(id: CardSchema["id"]) {
    await this.repo.delete({ id });
  }
}
