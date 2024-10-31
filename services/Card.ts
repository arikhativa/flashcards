import { CardSchema, TagSchema } from "@/schemas/schemas";
import { Card, CardCreate, CardUpdate } from "@/types/Card";
import { Repository } from "typeorm";
import { BaseCrudArrayService } from "./BaseCrudArray";
import { isKnowledgeLevel } from "@/utils/knowledgeLevel";
import { KnowledgeLevel } from "@/types/KnowledgeLevel";

export class CardService extends BaseCrudArrayService<
  Card,
  CardCreate,
  CardSchema
> {
  constructor(repo: Repository<CardSchema>) {
    const relations = ["tags"];
    super(repo, relations);
  }

  // TODO test link to tag
  async create(payload: CardCreate): Promise<Card> {
    if (!isKnowledgeLevel(payload.knowledgeLevel)) {
      payload.knowledgeLevel = KnowledgeLevel.Learning;
    }

    if (payload.tags) {
      const tags: TagSchema[] = [];

      for (const tag of payload.tags) {
        if (typeof tag === "number") {
          const tagEntity = await this.repo.manager.findOne(TagSchema, {
            where: { id: tag },
          });

          if (tagEntity) {
            tags.push(tagEntity);
          }
        } else {
          tags.push(tag);
        }
      }

      payload.tags = tags;
    }

    return super.create(payload);
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

  get allCards() {
    return this.array;
  }
}
