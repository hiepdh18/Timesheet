import { BaseRepository } from "./BaseRepository";
import { Types } from "mongoose";
import { logger } from "../services/logger";
import { IProjectUserModel, ProjectUser } from "../models/ProjectUserModel";
import { IProjectUser } from "../interfaces";


class ProjectUserRepository extends BaseRepository {
  constructor() {
    super()
  }

  public async getLastId() {
    try {
      const lastProjectUser = await ProjectUser.findOne().sort({ id: -1 });
      if (lastProjectUser) return lastProjectUser.id;
      return 0;
    } catch (error) {
      logger.error(error)
    }
  }

  public async create(user, projectId) {

    let id = await this.getLastId() + 1;
    let projectUser = new ProjectUser({
      _id: Types.ObjectId(),
      id,
      projectId,
      ...user
    });
    try {
      await projectUser.save();
      return this.findById(id);
    }
    catch (error) {
      logger.error(error);
    }
  }
  public async findById(id: number): Promise<IProjectUser> {
    try {
      return await ProjectUser.findOne({ id: id });
    } catch (error) {
      logger.error(error)
    }
  }

  public async getByProjectId(projectId: number): Promise<IProjectUser[]> {
    try {
      let list = await ProjectUser.find({ projectId });
      return list;
    } catch (error) {
      logger.error(error)
    }
  }

  public async getByUserId(userId: number): Promise<IProjectUser[]> {
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
}

export = new ProjectUserRepository();