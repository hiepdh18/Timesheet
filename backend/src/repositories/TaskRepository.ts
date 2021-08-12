import { BaseRepository } from "./BaseRepository";
import { Task } from '../models'
import { Types } from "mongoose";
import { logger } from "../services/logger";
import { ITask } from "../interfaces";

class TaskRepository extends BaseRepository {
  constructor() {
    super()
  }

  public async getLastId() {
    try {
      const lastTask = await Task.findOne().sort({ id: -1 });
      if (lastTask) return lastTask.id;
      return 0;
    } catch (error) {
      logger.error(error)
    }
  }

  public async findAll(): Promise<ITask[]> {
    try {
      return await Task.find().select('id name type isDeleted');
    } catch (error) {
      logger.error(error)
    }
  }

  public async findById(id: number): Promise<ITask> {
    try {
      return await Task.findOne({ id: id });
    } catch (error) {
      console.log(error);
      logger.error(error)
    }
  }

  public async findByName(name: string): Promise<ITask> {
    try {
      return await Task.findOne({ name });
    } catch (error) {
      logger.error(error)
    }
  }

  public async createTask(task: ITask) {
    let id = await this.getLastId() + 1;
    let newTask: ITask = new Task(
      {
        _id: Types.ObjectId(),
        ...task,
        id,
        isDeleted: false
      }
    );
    try {
      await newTask.save();
      return await this.findById(id);
    } catch (error) {
      logger.error(error)
    }
  }

  public async updateTask(task: ITask) {
    try {
      await Task.updateOne({ id: task.id }, task);
      return await this.findById(task.id);
    } catch (error) {
      logger.error(error)
    }
  }

  public async deleteTask(id: number): Promise<boolean> {
    try {
      await Task.deleteOne({ id: id });
      return true;
    } catch (error) {
      logger.error(error);
    }
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
