import { BaseRepository } from "./BaseRepository";
import { Task } from '../models'
import { UserDTO } from "../routes/indtos/UserDto";
import { Type } from "../constants";
import { Types } from "mongoose";
import { logger } from "../services/logger";
import { ITask, IUser } from "../interfaces";

class TaskRepository extends BaseRepository {
  constructor() {
    super()
  }

  public async getLastId() {
    try {
      const lastTask = await Task.findOne().sort({ id: -1 });
      if (lastTask) return await lastTask.id;
      return 0;
    } catch (error) {
      logger.error(error)
    }
  }

  public async createTask(task: ITask) {
    const id = await this.getLastId() + 1;
    const newTask: ITask = new Task(
      {
        _id: Types.ObjectId(),
        ...task,
        id,
        isDeleted: false
      }
    );
    try {
      if (!this.findByName(newTask.name)) {
        await newTask.save();
        return newTask;

      }
      return undefined;
    } catch (error) {
      logger.error(error)
    }
  }
  public async updateTask(task: ITask) {
    try {
      let taskFound = await Task.findOneAndUpdate({ id: task.id }, { task });
      return taskFound;
    } catch (error) {
      logger.error(error)
    }
  }

  public async findAll(): Promise<ITask[]> {
    try {
      const tasks = Task.find();
      return tasks;
    } catch (error) {
      logger.error(error)
    }
  }

  public async findByName(name: string): Promise<ITask> {
    try {
      const task = await Task.findOne({ name: name });
      return task;
    } catch (error) {
      logger.error(error)
    }
  }
}
export = new TaskRepository()