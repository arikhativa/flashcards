import { Card } from "@/types/Card";
import { Tag } from "@/types/Tag";
import { CardService } from "./Card";
import { TagService } from "./Tag";

export class CardTagService {
  constructor(private cs: CardService, private ts: TagService) {}

  async link(cardId: Card["id"], tagId: Tag["id"]): Promise<void> {
    if (!cardId || !tagId) {
      console.error("Invalid cardId or tagId");
      return;
    }

    try {
      const card = await this.cs.getById(cardId);
      const tag = await this.ts.getById(tagId);

      if (!card) {
        console.error(`card with id ${cardId} not found`);
        return;
      }

      if (!tag) {
        console.error(`tag with id ${tagId} not found`);
        return;
      }

      if (!card.tags) {
        card.tags = [tag];
      } else {
        if (card.tags.some((existingTag) => existingTag.id === tag.id)) {
          console.error(`tag with id ${tagId} already linked to card`);
          return;
        }
        card.tags.push(tag);
      }

      this.cs.update(cardId, card);
    } catch (error) {
      console.error("Error linking tag to card:", error);
      return;
    }
  }
}
