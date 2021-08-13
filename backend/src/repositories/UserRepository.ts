import { BaseRepository } from "./BaseRepository";
import { User } from '../models';
import { Types } from "mongoose";
import { logger } from "../services/logger";
import { IUser } from "../interfaces";
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
      const users = await User.find().select('name isActive type jobTitle level userCode avatarPath branch id');
      return users;
    } catch (error) {
      logger.error(error)
    }
  }
  public async findAllPagging(filterItems, max: number, skip: number, search: string): Promise<IUser[]> {
    try {
      let name = new RegExp(search, 'i');
      const users = await User
        .find({ name })
        .skip(skip)
        .limit(max);
      return users;
    } catch (error) {
      logger.error(error)
    }
  }

  public async findById(id: number): Promise<IUser> {
    try {
      const user = await User.findOne({ id: id });
      return user;
    } catch (error) {
      console.log(error);
      logger.error(error)
    }
  }

  public async findByUsername(userName: string): Promise<IUser> {
    try {
      const user = await User.findOne({ userName: userName });
      return user;
    } catch (error) {
      logger.error(error)
    }
  }

  public async findUserHavingManager(): Promise<IUser[]> {
    try {
      const users = await User.find().where('managerId').ne(null);
      return users;
    } catch (error) {
      logger.error(error)
    }
  }

  public async findByEmail(email: string): Promise<IUser> {
    try {
      const user = await User.findOne({ emailAddress: email });
      return user;
    } catch (error) {
      logger.error(error)
    }
  }

  public async deleteUser(id: number): Promise<boolean> {
    try {
      await User.deleteOne({ id });
      return true;
    } catch (error) {
      console.log(error)
      logger.error(error)
    }
  }

  public async updateUser(user: IUser): Promise<IUser> {
    try {
      await User.updateOne({ id: user.id }, user);
      let updatedUser = this.findById(user.id);
      return updatedUser;
    } catch (error) {
      console.log(error)
      logger.error(error)
    }
  }
  public async activeUser(id: number): Promise<boolean> {
    try {
      await User.updateOne({ id }, { isActive: true });
      return true;
    } catch (error) {
      console.log(error)
      logger.error(error)
    }
  }

  public async deActiveUser(id: number): Promise<boolean> {
    try {
      await User.updateOne({ id }, { isActive: false });
      return true;
    } catch (error) {
      console.log(error)
      logger.error(error)
    }
  }

  public async findByUsernameOrEmail(userNameOrEmail: string): Promise<IUser> {
    try {
      const user = await this.findByUsername(userNameOrEmail);
      if (user) return user;
      return this.findByEmail(userNameOrEmail);
    } catch (error) {
      logger.error(error);
    }
  }

  public async getProjectManagers(projectId: number): Promise<string[]> {
    try {
      let members = await projectUserRepo.getByProjectId(projectId);
      members = members.filter((member) => {
        return member.type == 1;
      });
      let pms = [];
      for (let x of members) {
        let user = await this.findById(x.userId);
        pms.push(user.name);
      }
      return pms;
    } catch (error) {
      console.log(error);
      logger.error(error);
    }
  }

}

export = new UserRepository()
