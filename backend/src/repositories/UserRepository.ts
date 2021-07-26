import { BaseRepository } from "./BaseRepository";
import { User } from '../models'
import { UserDTO } from "../routes/indtos/UserDto";
import { Type } from "../constants";
import { Types } from "mongoose";
import { logger } from "../services/logger";
class UserRepository extends BaseRepository {
  constructor() {
    super()
  }

  public async createUser(user) {
    const id = await this.getLastId() + 1;
    const newUser: UserDTO = new User(
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

  public async findById(id: number) {
    try {
      const user = User.findOne({ id: id });
      if (user) return user;
      return false;
    } catch (error) {
      logger.error(error)
    }
  }
  public async findByUsername(userName: string) {
    try {
      const user = User.findOne({ userName: userName });
      if (user) return user;
      return false;
    } catch (error) {
      logger.error(error)
    }
  }
  public async findByEmail(email: string) {
    try {
      const user = User.findOne({ emailAddress: email });
      if (user) return user;
      return false;
    } catch (error) {
      logger.error(error)
    }
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
}

export = new UserRepository()
