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
  static readonly EMPTY: TagCreate = {
    name: "",
  };

  constructor(repo: Repository<TagSchema>, onUpdate: () => void) {
    const relations = ["cards"];
    super(repo, onUpdate, relations);
  }

  // TODO test link to tag
  async create(payload: TagCreate): Promise<Tag | null> {
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

  async delete(id: Tag["id"]): Promise<boolean> {
    try {
      await super.update(id, { cards: [] });
    } catch (e) {
      console.error("delete error: ", e);
      return false;
    }

    return super.delete(id);
  }

  async deleteMany(list: Tag["id"][]): Promise<boolean> {
    try {
      await super.updateMany(list.map((id) => ({ id, cards: [] })));
    } catch (e) {
      console.error("deleteMany error: ", e);
      return false;
    }

    return super.deleteMany(list);
  }
}
