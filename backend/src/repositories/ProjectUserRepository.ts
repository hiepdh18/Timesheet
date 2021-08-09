import { BaseRepository } from "./BaseRepository";
import { Types } from "mongoose";
import { logger } from "../services/logger";
import { ProjectUser } from "../models/ProjectUserModel";
import { IProjectUser } from "../interfaces";


class ProjectUserRepository extends BaseRepository {
  constructor() {
    super()
  }
  public async getByProjectId(projectId: number): Promise<IProjectUser[]> {
    try {
      let list = await ProjectUser.find({ projectId });
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