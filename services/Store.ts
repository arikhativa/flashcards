import { source } from "@/hooks/db";
import { DataSource } from "typeorm";
import { CardService } from "./Card";
import { CardSchema, TagSchema } from "@/schemas/schemas";
import { TagService } from "./Tag";

class StoreService {
  private _db: DataSource;
  private _cardService: CardService;
  private _tagService: TagService;

  async init() {
    this._db = await source.initialize();

    this._cardService = new CardService(this._db.getRepository(CardSchema));
    this._tagService = new TagService(this._db.getRepository(TagSchema));
  }

  get cardService() {
    return this._cardService;
  }

  get tagService() {
    return this._tagService;
  }
}

export default new StoreService();
