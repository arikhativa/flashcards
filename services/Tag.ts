import { CardSchema, TagSchema } from "@/schemas/schemas";
import { Tag, TagCreate, TagUpdate } from "@/types/Tag";
import { Repository } from "typeorm";
import { BaseCrudService } from "./BaseCrud";

export class TagService extends BaseCrudService<
  Tag,
  TagCreate,
  TagUpdate,
  TagSchema
> {
  constructor(repo: Repository<TagSchema>, onUpdate: () => void) {
    const relations = ["cards"];
    super(repo, onUpdate, relations);
  }

  // TODO test link to tag
  async create(payload: TagCreate): Promise<Tag> {
    if (payload.cards) {
      const cards: CardSchema[] = [];

      for (const card of payload.cards) {
        if (typeof card === "number") {
          const entity = await this.repo.manager.findOne(CardSchema, {
            where: { id: card },
          });

          if (entity) {
            cards.push(entity);
          }
        } else {
          cards.push(card);
        }
      }

      payload.cards = cards;
    }

    return super.create(payload);
  }
}
