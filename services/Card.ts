import { source } from "@/hooks/db";
import { CardSchema } from "@/schemas/Card";

export class CardService {
  async getTasks(): Promise<CardSchema[]> {
    if (!source.isInitialized) await source.initialize();

    const tasks = await CardSchema.find();

    return tasks;
  }

  async getTask(taskId: CardSchema["id"]): Promise<CardSchema> {
    if (!source.isInitialized) await source.initialize();

    const task = await CardSchema.findOneByOrFail({ id: taskId });
    return task;
  }

  async createTask(payload: Pick<CardSchema, "title">) {
    if (!source.isInitialized) await source.initialize();

    const task = new CardSchema();
    task.title = payload.title;
    await task.save();
  }

  async updateTask(
    taskId: CardSchema["id"],
    payload: Partial<Pick<CardSchema, "title">>
  ) {
    if (!source.isInitialized) await source.initialize();

    const task = await CardSchema.findOneByOrFail({ id: taskId });
    task.title = payload.title ?? task.title;
    await task.save();
  }

  async deleteTask(taskId: CardSchema["id"]) {
    if (!source.isInitialized) await source.initialize();

    await CardSchema.delete(taskId);
  }
}
