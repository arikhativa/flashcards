import { source } from "@/hooks/db";
import { DataSource } from "typeorm";
import { CardService } from "./Card";
import { CardSchema } from "@/schemas/schemas";

class StoreService {
  db: DataSource;
  cardService: CardService;

  async init() {
    this.db = await source.initialize();
    const cr = await this.db.getRepository(CardSchema);

    this.cardService = new CardService(cr);
  }
}

export default new StoreService();
