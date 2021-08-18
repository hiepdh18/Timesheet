import { BaseRepository } from "./BaseRepository";
import { logger } from "../services/logger";
import { ProjectTask, ProjectTaskSchema } from "../models";
import { IProjectTask } from "../interfaces";
import { Types } from "mongoose";

class ProjectTaskRepository extends BaseRepository<IProjectTask> {
  constructor() {
    super("ProjectTask", ProjectTaskSchema);
  }
  public async createProjectTask(taskId, projectId: number) {
    let id = await this.lastId() + 1;
    let projectTask = new ProjectTask({
      _id: Types.ObjectId(),
      id,
      projectId,
      taskId
    });
    try {
      await projectTask.save();
      return this.findById(id);
    }
    catch (error) {
      logger.error(error);
    }
  }
  public async findByProjectId(projectId: number): Promise<IProjectTask[]> {
    try {
      let list = await ProjectTask.find({ projectId });
      return list;
    } catch (error) {
      logger.error(error)
    }
  }
  public async findByTaskId(taskId: number): Promise<IProjectTask[]> {
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
