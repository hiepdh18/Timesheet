import { Request, Response, NextFunction } from "express";
import { IResponse, IService, IUser } from "../../interfaces";
import UserRepository from "../../repositories/UserRepository";
import { AuthenticateDTO } from "../../routes/indtos";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HttpError } from "../exception/HttpError";
import { AuthenticateErrorDTO, AuthenticateResultDTO } from "../../routes/outdtos";
import { logger } from "../logger";

/**
 * @description TokenService
 */
class TokenService implements IService {
  private _repository = UserRepository;
  defaultMethod = (req: Request, res: Response, next: NextFunction) => {
  };

  authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const user: AuthenticateDTO = req.body;
    let response: AuthenticateResultDTO | AuthenticateErrorDTO = {
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
        const token = await jwt.sign(
          {
            name: loginUser.name,
            id: loginUser.id,
            role: loginUser.roleNames
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h"
          }
        );

        response = {
          ...response,
          result: {
            accessToken: token,
            encryptedAccessToken: 'string',
            expireInSeconds: 1,
            userId: 1
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

export = new TokenService();
