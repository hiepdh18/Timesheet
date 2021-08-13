import { Request, Response, NextFunction } from "express";
import { IService, IUser } from "../interfaces";
import UserRepository from "../repositories/UserRepository";
import { AuthenticateReqDTO } from "../routes/reqdtos";
import bcrypt from "bcrypt";
import { AuthenticateResDTO } from "../routes/resdtos";
import { logger } from "./logger";
import { generateToken } from "./TokenService";

/**
 * @description TokenService
 */
class AuthService implements IService {
  private _repository = UserRepository;
  defaultMethod = (req: Request, res: Response, next: NextFunction) => {
  };

  authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const user: AuthenticateReqDTO = req.body;
    let response: AuthenticateResDTO = {
      result: null,
      targetUrl: null,
      success: true,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    }

    try {
      let loginUser: IUser = await this._repository.findByUsernameOrEmail(user.userNameOrEmailAddress);
      if (!loginUser) {
        response = {
          ...response,
          error: {
            code: 0,
            message: "Username and email doesn't exist!!!",
            details: null,
            validationErrors: null
          }
        }
        return res.status(400).json(response);
      }
      const check = await bcrypt.compare(user.password, loginUser.password);
      if (check) {
        let userId = loginUser.id;
        let exp = Math.floor(Date.now() / 1000) + (60 * 60);
        const token = generateToken(userId, exp);
        response = {
          ...response,
          result: {
            accessToken: token,
            encryptedAccessToken: 'string',
            expireInSeconds: exp,
            userId
          }
        }
        res.status(200).json(response);
      }
      else {
        response = {
          ...response,
          error: {
            code: 0,
            message: "Wrong password!!",
            details: null,
            validationErrors: null
          }
        }
        return res.status(400).json(response);
      }
    } catch (error) {
      logger.error(error);
      next(error)
    }
  };
}

export = new AuthService();
