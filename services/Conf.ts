import {
  MAX_NUMBER_OF_CARDS,
  MAX_SIDE_LENGTH,
  MIN_NUMBER_OF_CARDS,
  MIN_SIDE_LENGTH,
} from "@/constants/general";
import { ConfSchema } from "@/schemas/schemas";
import { Conf, ConfUpdate } from "@/types/Conf";
import { SortNames } from "@/types/Sort";
import { isInRange, isTestSide } from "@/utils/generic";
import { isSortName } from "@/utils/sort";
import { Repository } from "typeorm";

export class ConfService {
  static readonly EMPTY: Conf = {
    sideA: "error",
    sideB: "error",
    createdAt: new Date(),
    updatedAt: new Date(),
    numberOfCards: 0,
    testSide: "A",
    sortBy: SortNames.TIME,
  };

  constructor(
    private repo: Repository<ConfSchema>,
    private onUpdate: () => void
  ) {}

  // NOTE - make sure there is only one entity of Conf
  async init(): Promise<boolean> {
    let all: ConfSchema[] = [];

    try {
      all = await this.repo.find();
    } catch (e) {
      console.error("init: db find error: ", e);
      return false;
    }

    if (all.length) {
      this.onUpdate();
      return true;
    }

    try {
      await this.repo.save(this.repo.create());
      this.onUpdate();
      return true;
    } catch (e) {
      console.error("init: db save error: ", e);
    }

    return false;
  }

  async get(): Promise<Conf | null> {
    let all: ConfSchema[] = [];

    try {
      all = await this.repo.find();
    } catch (e) {
      console.error("get error: ", e);
    }

    if (all.length === 0) {
      return null;
    }

    const ret = all[0];

    return ret as Conf;
  }

  async update(payload: ConfUpdate): Promise<Conf | null> {
    const entity = await this.get();

    if (!entity) {
      console.error("update: entity not found");
      return null;
    }

    if (
      payload.sideA &&
      isInRange(payload.sideA.length, MIN_SIDE_LENGTH, MAX_SIDE_LENGTH)
    ) {
      entity.sideA = payload.sideA || entity.sideA;
    }
    if (
      payload.sideB &&
      isInRange(payload.sideB.length, MIN_SIDE_LENGTH, MAX_SIDE_LENGTH)
    ) {
      entity.sideB = payload.sideB || entity.sideB;
    }

    if (payload.testSide && isTestSide(payload.testSide)) {
      entity.testSide = payload.testSide;
    }

    if (payload.sortBy && isSortName(payload.sortBy)) {
      entity.sortBy = payload.sortBy;
    }

    if (
      payload.numberOfCards &&
      isInRange(payload.numberOfCards, MIN_NUMBER_OF_CARDS, MAX_NUMBER_OF_CARDS)
    ) {
      entity.numberOfCards = payload.numberOfCards;
    }

    try {
      const ret = await this.repo.save(entity);
      this.onUpdate();
      return ret as Conf;
    } catch (e) {
      console.error("update error: ", e);
    }

    return null;
  }
}
