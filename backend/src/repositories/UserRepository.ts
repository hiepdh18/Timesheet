import { BaseRepository } from "./BaseRepository";
import { User, UserSchema } from '../models';
import { Types } from "mongoose";
import { logger } from "../services/logger";
import { IUser } from "../interfaces";
import projectUserRepo from "./ProjectUserRepository"

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super("User", UserSchema);
  }
  public async createUser(user: IUser) {
    const id = await this.lastId() + 1;
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
  public async setPass(userId: number, pass: string) {
    try {
      await User.updateOne({ id: userId }, { password: pass });
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
  public async changeAvatar(id: number, path: string): Promise<IUser> {
    try {
      await User.updateOne({ id }, { avatarPath: path });
      return this.findById(id)
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
      let members = await projectUserRepo.findByProjectId(projectId);
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
