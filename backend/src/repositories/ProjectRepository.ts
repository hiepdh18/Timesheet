import { BaseRepository } from "./BaseRepository";
import { Project, Task } from '../models'
import { Types } from "mongoose";
import { logger } from "../services/logger";
import { IProject, ITask } from "../interfaces";
import { IProjectModel } from "../models/ProjectModel";
import { ProjectStatus } from "../constants/Enums";

class ProjectRepository extends BaseRepository {
  constructor() {
    super()
  }

  public async getLastId() {
    try {
      const lastProject = await Project.findOne().sort({ id: -1 });
      if (lastProject) return lastProject.id;
      return 0;
    } catch (error) {
      logger.error(error)
    }
  }

  public async findById(id: number): Promise<IProject> {
    try {
      return await Project.findOne({ id: id });
    } catch (error) {
      logger.error(error)
    }
  }

  public async findByStatus(status: ProjectStatus): Promise<IProject[]> {
    try {
      return await Project.find({ status });
    } catch (error) {
      logger.error(error)
    }
  }
  
  public async findByName(name: string): Promise<IProject> {
    try {
      return await Project.findOne({ name });
    } catch (error) {
      logger.error(error)
    }
  }

  public async findAll(): Promise<IProject[]> {
    try {
      return await Project.find();
    } catch (error) {
      logger.error(error)
    }
  }

  public async createProject(project: IProject): Promise<IProject> {
    let id = await this.getLastId() + 1;
    let newProject: IProject = new Project(
      {
        _id: Types.ObjectId(),
        ...project,
        id
      }
    );
    try {
      await newProject.save();
      return newProject;
    } catch (error) {
      logger.error(error)
    }
  }

  public async updateProject(project: IProject): Promise<IProject> {
    try {
      await Project.updateOne({ id: project.id }, project);
      return await this.findById(project.id);
    } catch (error) {
      logger.error(error)
    }
  }

  public async deleteProject(id: number): Promise<boolean> {
    try {
      await Task.deleteOne({ id: id });
      return true;
    } catch (error) {
      logger.error(error);
    }
  }

}
export = new ProjectRepository();
