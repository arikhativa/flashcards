import { source } from "@/hooks/db";
import { DataSource } from "typeorm";
import { CardService } from "./Card";
import { CardSchema } from "@/schemas/schemas";

class StoreService {
  private _db: DataSource;
  private _cardService: CardService;

  async init() {
    this._db = await source.initialize();
    const cr = await this._db.getRepository(CardSchema);

    this._cardService = new CardService(cr);
  }

  get cardService() {
    return this._cardService;
  }
}

export default new StoreService();
