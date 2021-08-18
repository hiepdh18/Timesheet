import { BaseRepository } from "./BaseRepository";
import { Project, ProjectSchema } from '../models'
import { Types } from "mongoose";
import { logger } from "../services/logger";
import { IProject, IRepositorySpecs } from "../interfaces";
import { ProjectStatus } from "../constants/Enums";
import { schemaOption } from "../constants";

class ProjectRepository extends BaseRepository<IProject> {
  constructor() {
    super("Project", ProjectSchema);
  }
  public async findByStatus(status, search: string): Promise<IProject[]> {
    try {
      const name = new RegExp(search, 'i');
      if (status == 0) return await Project.find({ status: 0, name });
      else if (status == 1) return await Project.find({ status: 1, name });
      else return await Project.find({ name });
    } catch (error) {
      logger.error(error)
    }
  }
  public async findByCustomerId(customerId : number): Promise<IProject[]> {
    try {
      return await Project.find({ customerId});
    } catch (error) {
      logger.error(error)
    }
  }
  public async createProject(project: IProject): Promise<IProject> {
    let id = await this.lastId() + 1;
    let newProject: IProject = new Project(
      {
        _id: Types.ObjectId(),
        ...project,
        id,
        status: 0
      }
    );
    try {
      await newProject.save();
      return await this.findById(id);
    } catch (error) {
      logger.error(error)
    }
  }
  public async deactiveProject(projectId: number): Promise<boolean> {
    try {
      await Project.updateOne({ id: projectId }, { status: 1 });
      return true;
    } catch (error) {
      logger.error(error);
    }
  }
  public async activeProject(projectId: number): Promise<boolean> {
    try {
      await Project.updateOne({ id: projectId }, { status: 0 });
      return true;
    } catch (error) {
      logger.error(error);
    }
  }
  public async deleteProject(id: number): Promise<boolean> {
    try {
      await Project.deleteOne({ id: id });
      return true;
    } catch (error) {
      logger.error(error);
    }
  }
}
export = new ProjectRepository();
