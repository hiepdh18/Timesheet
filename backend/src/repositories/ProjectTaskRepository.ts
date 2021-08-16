import { BaseRepository } from "./BaseRepository";
import { logger } from "../services/logger";
import { ProjectTask } from "../models";
import { IProjectTask } from "../interfaces";
import { Types } from "mongoose";

class ProjectTaskRepository extends BaseRepository {
  constructor() {
    super()
  }

  public async getLastId(): Promise<number> {
    try {
      const lastProjectTask = await ProjectTask.findOne().sort({ id: -1 });
      if (lastProjectTask) return lastProjectTask.id;
      return 0;
    } catch (error) {
      logger.error(error)
    }
  }

  public async create(task, projectId: number) {
    let id = await this.getLastId() + 1;
    let projectTask = new ProjectTask({
      _id: Types.ObjectId(),
      id,
      projectId,
      ...task
    });
    try {
      await projectTask.save();
      return this.findById(id);
    }
    catch (error) {
      logger.error(error);
    }
  }

  public async findById(id: number): Promise<IProjectTask> {
    try {
      return await ProjectTask.findOne({ id: id });
    } catch (error) {
      console.log(error);
      logger.error(error)
    }
  }

  public async getByProjectId(projectId: number): Promise<IProjectTask[]> {
    try {
      let list = await ProjectTask.find({ projectId });
      return list;
    } catch (error) {
      logger.error(error)
    }
  }
  public async getByTaskId(taskId: number): Promise<IProjectTask[]> {
    try {
      let list = await ProjectTask.find({ taskId });
      return list;
    } catch (error) {
      logger.error(error)
    }
  }

  public async deleteByProjectId(projectId: number): Promise<boolean> {
    try {
      await ProjectTask.deleteMany({ projectId });
      return true;
    } catch (error) {
      logger.error(error);
    }
  }
}

export = new ProjectTaskRepository()
