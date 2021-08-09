import { BaseRepository } from "./BaseRepository";
import { User } from '../models';
import { Types } from "mongoose";
import { logger } from "../services/logger";
import { IProject, IUser } from "../interfaces";
import projectUserRepo from "./ProjectUserRepository"

class UserRepository extends BaseRepository {
  constructor() {
    super();
  }

  public async getLastId() {
    try {
      const lastUser = await User.findOne().sort({ id: -1 });
      if (lastUser) return await lastUser.id;
      return 0;
    } catch (error) {
      logger.error(error)
    }
  }

  public async createUser(user: IUser) {
    const id = await this.getLastId() + 1;
    const newUser: IUser = new User(
      {
        _id: Types.ObjectId(),
        ...user,
        avatarPath: "",
        id,
        fullName: `${user.name} ${user.surname}`
      }
    );
    try {
      return await newUser.save();
    } catch (error) {
      logger.error(error)
    }
  }

  public async findAll(): Promise<IUser[]> {
    try {
      const users = User.find();
      return users;
    } catch (error) {
      logger.error(error)
    }
  }
  
  public async findById(id: number): Promise<IUser> {
    try {
      const user = User.findOne({ id: id });
      return user;
    } catch (error) {
      logger.error(error)
    }
  }

  public async findByUsername(userName: string): Promise<IUser> {
    try {
      const user = User.findOne({ userName: userName });
      return user;
    } catch (error) {
      logger.error(error)
    }
  }

  public async findUserHavingManager(): Promise<IUser[]> {
    try {
      const users = User.find().where('managerId').ne(null);
      return users;
    } catch (error) {
      logger.error(error)
    }
  }

  public async findByEmail(email: string): Promise<IUser> {
    try {
      const user = User.findOne({ emailAddress: email });
      return user;
    } catch (error) {
      logger.error(error)
    }
  }

  public async findByUsernameOrEmail(userNameOrEmail: string): Promise<IUser> {
    try {
      const user = this.findByUsername(userNameOrEmail);
      if (user) return user;
      return this.findByEmail(userNameOrEmail);
    } catch (error) {
      logger.error(error);
    }
  }

  public async getProjectManagers(projectId: number) {
    try {
      let members = await projectUserRepo.getByProjectId(projectId);
      let pmIds = members.reduce((arr, member) => {
        if (member.type == 1)
          return arr.concat(member.userId);
      }, []);
      return pmIds;
    } catch (error) {
      logger.error(error);
    }
  }

}

export = new UserRepository()
