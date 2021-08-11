import { IService, IUser } from "../interfaces";
import { Request, Response, NextFunction } from "express";
import { SessionResDTO } from "../routes/resdtos";
import userRepository from "../repositories/UserRepository";
import jwt from "jsonwebtoken";
import pick from "../utils/pick";

class SessionService implements IService {
  private _repository = userRepository;
  defaultMethod = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(null)
  };

  getCurrentLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let response: SessionResDTO = {
        result: {
          application: {
            version: "4.3.0.0",
            releaseDate: new Date().toString(),
            features: {},
          },
          user: null,
          tenant: null,
        },
        targetUrl: null,
        success: true,
        error: null,
        unAuthorizedRequest: false,
        __abp: true
      }
      if (!req.headers.authorization) return res.status(200).json(response);

      const token = req.headers.authorization.split(" ")[1];
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_KEY);
      } catch (error) { return res.status(200).json(response); }

      const user: IUser = await this._repository.findById(decoded.id);

      const userSelect = pick(user, ['name', 'surname', 'userName', 'emailAddress', 'allowedLeaveDay', 'type', 'level', 'sex', 'branch', 'avatarPath', 'morningWorking', 'morningStartAt', 'morningEndAt', 'afternoonWorking', 'afternoonStartAt', 'afternoonEndAt', 'isWorkingTimeDefault', 'id']);
      response = {
        ...response,
        result: {
          application: {
            version: "4.3.0.0",
            releaseDate: new Date().toString(),
            features: {},
          },
          user: userSelect,
          tenant: null,
        }
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export = new SessionService()
