import { source } from "@/hooks/db";
import { CardSchema } from "@/schemas/schemas";
import { Card, CardCreate } from "@/types/Card";
import { KnowledgeLevel } from "@/types/KnowledgeLevel";
import { Repository } from "typeorm";

export class CardService {
  constructor(private repo: Repository<CardSchema>) {}

  // TODO add tag in ctor
  async create(payload: CardCreate): Promise<Card> {
    const card = this.repo.create();
    card.sideA = payload.sideA;
    card.sideB = payload.sideB;
    card.comment = payload.comment;
    card.knowledgeLevel = payload.knowledgeLevel || KnowledgeLevel.Learning;

    return (await this.repo.save(card)) as Card;
  }

  async getCardById(id: number): Promise<Card> {
    return (await this.repo.findOne({ where: { id } })) as Card;
  }

  // async getTasks(): Promise<CardSchema[]> {
  //   if (!source.isInitialized) await source.initialize();

  //   const tasks = await CardSchema.find();

  //   return tasks;
  // }

  // async getTask(taskId: CardSchema["id"]): Promise<CardSchema> {
  //   if (!source.isInitialized) await source.initialize();

  //   const task = await CardSchema.findOneByOrFail({ id: taskId });
  //   return task;
  // }

  // async updateTask(
  //   taskId: CardSchema["id"],
  //   payload: Partial<Pick<CardSchema, "title">>
  // ) {
  //   if (!source.isInitialized) await source.initialize();

  //   const task = await CardSchema.findOneByOrFail({ id: taskId });
  //   task.title = payload.title ?? task.title;
  //   await task.save();
  // }

  // async deleteTask(taskId: CardSchema["id"]) {
  //   if (!source.isInitialized) await source.initialize();

  //   await CardSchema.delete(taskId);
  // }
}
