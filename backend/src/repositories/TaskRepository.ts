import { BaseRepository } from "./BaseRepository";
import { Task, TaskSchema } from '../models'
import { Types } from "mongoose";
import { logger } from "../services/logger";
import { ITask } from "../interfaces";

class TaskRepository extends BaseRepository<ITask> {
  constructor() {
    super("Task", TaskSchema);
  }
  public async archiveTask(id: number): Promise<boolean> {
    try {
      await Task.updateOne({ id: id }, { isDeleted: true });
      return true;
    } catch (error) {
      logger.error(error);
    }
  }
  public async deArchiveTask(id: number): Promise<boolean> {
    try {
      await Task.updateOne({ id: id }, { isDeleted: false });
      return true;
    } catch (error) {
      logger.error(error);
    }
  }
}
export = new TaskRepository();
