import { source } from "@/hooks/db";
import { DataSource } from "typeorm";
import { CardService } from "./Card";
import { CardSchema, ConfSchema, TagSchema } from "@/schemas/schemas";
import { TagService } from "./Tag";
import { CardTagService } from "./CardTag";
import { ConfService } from "./Conf";

class StoreService {
  private _db: DataSource;
  private _cardService: CardService;
  private _tagService: TagService;
  private _cardTagService: CardTagService;
  private _confService: ConfService;

  async init() {
    this._db = await source.initialize();

    this._cardService = new CardService(this._db.getRepository(CardSchema));
    this._tagService = new TagService(this._db.getRepository(TagSchema));

    // TODO this can be done with promise all
    await this._cardService.init();
    await this._tagService.init();
    this._confService = new ConfService(this._db.getRepository(ConfSchema));
    await this._confService.init();

    this._cardTagService = new CardTagService(
      this.cardService,
      this.tagService
    );
  }

  get cardService() {
    return this._cardService;
  }

  get tagService() {
    return this._tagService;
  }

  get cardTagService() {
    return this._cardTagService;
  }

  get confService() {
    return this._confService;
  }
}

export default new StoreService();
