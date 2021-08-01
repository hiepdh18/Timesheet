import bcrypt from "bcrypt";
import { IResponse, IService, IUser } from "../interfaces";
import { Request, Response, NextFunction } from "express";
import { CreateUserReqDTO } from "../routes/reqdtos/CreateUserReqDto";
import userRepository from "../repositories/UserRepository";
import { CreateUserResDTO } from "../routes/resdtos/CreateUserResDto";
import { UserGetAllPaggingReqDTO } from "../routes/reqdtos/UserGetAllPaggingReqDto";
import { HttpError } from "./exception/HttpError";
import pick from "../utils/pick";
/**
 * @description Userservice
 */
class UserService implements IService {
  private _repository = userRepository;

  defaultMethod = (req: Request, res: Response, next: NextFunction) => {
  };

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    let user: CreateUserReqDTO = req.body;

    if (!user.userName || !user.emailAddress || !user.password) {
      const error = new HttpError(400, 'Missing username, email and/or password');
      return next(error);
    }

    try {
      if (await this._repository.findByEmail(user.emailAddress)) {
        const error = new HttpError(401, `email ${user.emailAddress} is already taken!`);
        return next(error);
      }
      if (await this._repository.findByUsername(user.userName)) {
        const error = new HttpError(400, `username ${user.userName} is already taken!`);
        return next(error);
      }
      const hash = await bcrypt.hash(user.password, 10);
      // user = { ...user, password: hash };
      user['password'] = hash;
      const newUser = await this._repository.createUser(user);
      delete newUser.password;
      const response: CreateUserResDTO = {
        result: newUser,
        targetUrl: null,
        success: true,
        error: null,
        unAuthorizedRequest: false,
        __abp: true
      }
      res.status(200).json(response);

    } catch (error) {
      next(error);
    }

  };

  // Get all manager
  getAllManager = async (req: Request, res: Response, next: NextFunction) => {
    let allManager = [];
    try {
      let users = await this._repository.findUserHavingManager();
      return users;

    } catch (error) {
      next(error);
    }


  };

  getUserNotPagging = async (req: Request, res: Response, next: NextFunction) => {
    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: true,
      __abp: true
    }

    try {
      let users = await this._repository.findAll();
      users = users.map((user) => pick(user, ['name', 'string', 'isActive', 'type', 'jobTitle', 'level', 'userCode', 'avatarPath', 'branch', 'id']))
      response = {
        ...response,
        result: users
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getAllPagging = async (req: Request, res: Response, next: NextFunction) => {
    let filter: UserGetAllPaggingReqDTO = req.body;


    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: true,
      __abp: true
    }

    try {
      let users = await this._repository.findAll();
      response = {
        ...response,
        result: {
          totalCount: users.length,
          items: users

        }
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
  updateUser = (req: Request, res: Response, next: NextFunction) => {

  };
  deleteUser = (req: Request, res: Response, next: NextFunction) => {

  };
}
export = new UserService();
