import bcrypt from "bcrypt";
import { IService } from "../../interfaces";
import { Request, Response, NextFunction } from "express";
import { CreateUserDTO } from "../../routes/indtos/CreateUserDto";
import UserRepository from "../../repositories/UserRepository";
import { CreateUserResultDTO } from "../../routes/outdtos/CreateUserResultDto";
import { UserDTO } from "../../routes/indtos/UserDto";
import { HttpError } from "../exception/HttpError";
/**
 * @description Userservice
 */
class UserService implements IService {
  private _repository = UserRepository;
  defaultMethod = (req: Request, res: Response, next: NextFunction) => {
  };

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    let user: CreateUserDTO = req.body;

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
      user = { ...user, password: hash };
      const newUser = await this._repository.createUser(user);
      const response: CreateUserResultDTO = {
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
  updateUser = (req: Request, res: Response, next: NextFunction) => {

  };
  deleteUser = (req: Request, res: Response, next: NextFunction) => {

  };
}
export = new UserService();
