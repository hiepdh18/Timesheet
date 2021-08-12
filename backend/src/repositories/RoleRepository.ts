import { BaseRepository } from "./BaseRepository";
import { Task } from '../models'
import { Role } from '../models'
import { Types } from "mongoose";
import { logger } from "../services/logger";
import { IRole, ITask } from "../interfaces";

class RoleRepository extends BaseRepository {
  constructor() {
    super()
  }

  public async getLastId() {
    try {
      const lastRole = await Role.findOne().sort({ id: -1 });
      if (lastRole) return lastRole.id;
      return 0;
    } catch (error) {
      logger.error(error)
    }
  }

  public async findAll(): Promise<IRole[]> {
    try {
      return await Role.find().select('id name displayName normalizedName description');
    } catch (error) {
      logger.error(error)
    }
  }

  public async findById(id: number): Promise<IRole> {
    try {
      return await Role.findOne({ id: id });
    } catch (error) {
      console.log(error);
      logger.error(error)
    }
  }

  public async findByName(name: string): Promise<IRole> {
    try {
      return await Role.findOne({ name });
    } catch (error) {
      logger.error(error)
    }
  }

  public async createRole(role: IRole) {
    let id = await this.getLastId() + 1;
    let newTask: IRole = new Role(
      {
        _id: Types.ObjectId(),
        ...role,
        id,
      }
    );
    try {
      await newTask.save();
      return await this.findById(id);
    } catch (error) {
      logger.error(error)
    }
  }

  public async deleteRole(id: number): Promise<boolean> {
    try {
      await Role.deleteOne({ id: id });
      return true;
    } catch (error) {
      logger.error(error);
    }
  }
}
export = new RoleRepository();
