import { source } from "@/hooks/db";
import { DataSource } from "typeorm";
import { CardService } from "./Card";
import { CardSchema, ConfSchema, TagSchema } from "@/schemas/schemas";
import { TagService } from "./Tag";
import { CardTagService } from "./CardTag";
import { ConfService } from "./Conf";
import { Conf } from "@/types/Conf";

class StoreService {
  private _db: DataSource;
  private _cardService: CardService;
  private _tagService: TagService;
  private _cardTagService: CardTagService;
  private _confService: ConfService;
  private _conf: Conf;

  async init() {
    this._db = await source.initialize();

    this._cardService = new CardService(this._db.getRepository(CardSchema));
    this._tagService = new TagService(this._db.getRepository(TagSchema));
    this._cardTagService = new CardTagService(
      this.cardService,
      this.tagService
    );
    this._confService = new ConfService(this._db.getRepository(ConfSchema));

    this._conf = await this._confService.createIfNeeded();
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

  set conf(obj: Conf) {
    this._conf = obj;
  }

  get conf() {
    return this._conf;
  }
}

export default new StoreService();
