import { BaseRepository } from "./BaseRepository";
import { Types } from "mongoose";
import { logger } from "../services/logger";
import { ProjectUser, ProjectUserSchema } from "../models/ProjectUserModel";
import { IProjectUser } from "../interfaces";


class ProjectUserRepository extends BaseRepository<IProjectUser> {
  constructor() {
    super("ProjectUser", ProjectUserSchema);
  }
  public async createProjectUser(userId: number, projectId: number) {
    let id = await this.lastId() + 1;
    let projectUser = new ProjectUser({
      _id: Types.ObjectId(),
      id,
      projectId,
      userId
    });
    try {
      await projectUser.save();
      return this.findById(id);
    }
    catch (error) {
      logger.error(error);
    }
  }
  public async findByProjectId(projectId: number): Promise<IProjectUser[]> {
    try {
      let list = await ProjectUser.find({ projectId });
      return list;
    } catch (error) {
      logger.error(error)
    }
  }
  public async findByUserId(userId: number): Promise<IProjectUser[]> {
    try {
      let list = await ProjectUser.find({ userId });
      return list;
    } catch (error) {
      logger.error(error)
    }
  }
  public async getActiveMembers(projectId: number): Promise<number> {
    try {
      let members = await ProjectUser.find({ projectId });
      members = members.filter((member) => {
        return member.type != 3;
      });
      return members.length;
    } catch (error) {
      logger.error(error)
    }
  }
  public async deleteByProjectId(projectId: number): Promise<boolean> {
    try {
      await ProjectUser.deleteMany({ projectId });
      return true;
    } catch (error) {
      logger.error(error);
    }
  }
}

export = new ProjectUserRepository();