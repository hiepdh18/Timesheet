import { IService, IUser } from "../../interfaces";
import { Request, Response, NextFunction } from "express";
import { SessionResultDTO } from "../../routes/outdtos/SessionResultDto";
import userRepository from "../../repositories/UserRepository";
import jwt from "jsonwebtoken";
import { User } from "../../models";

const fakeData: SessionResultDTO = {
  result: {
    application: {
      version: "4.3.0.0",
      releaseDate: "2021-07-20T15:49:07.1350156+07:00",
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
};

class SessionService implements IService {
  private _repository = userRepository;
  defaultMethod = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(null)
  };

  getCurrentLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let response: SessionResultDTO = {
        result: {
          application: {
            version: "4.3.0.0",
            releaseDate: "2021-07-20T15:49:07.1350156+07:00",
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
      if (!req.headers.authorization) {
        return res.status(200).json(response);
      }
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      const user: IUser = await this._repository.findById(decoded.id);
      console.log(user);

      response = {
        ...response,
        result: {
          application: {
            version: "4.3.0.0",
            releaseDate: "2021-07-20T15:49:07.1350156+07:00",
            features: {},
          },
          user: user,
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

/**
 * fake data success
 */

  // result: {
  //   application: {
  //     version: "4.3.0.0",
  //     releaseDate: "2021-07-23T18:16:26.1343568+07:00",
  //     features: {}
  //   },
  //   user: {
  //     name: "admin",
  //     surname: "admin",
  //     userName: "admin",
  //     emailAddress: "admin@aspnetboilerplate.com",
  //     allowedLeaveDay: 0.0,
  //     type: null,
  //     level: null,
  //     sex: null,
  //     branch: 1,
  //     avatarPath: "/avatars/hiep-avatar.jpg",
  //     morningWorking: "4",
  //     morningStartAt: "08:00",
  //     morningEndAt: "12:00",
  //     afternoonWorking: "4",
  //     afternoonStartAt: "13:00",
  //     afternoonEndAt: "17:00",
  //     isWorkingTimeDefault: false,
  //     id: 1
  //   },
  //   tenant: null
  // },
  // targetUrl: null,
  // success: true,
  // error: null,
  // unAuthorizedRequest: false,
  // __abp: true


   // {
    //   name: "admin",
    //   surname: "admin",
    //   userName: "admin",
    //   emailAddress: "admin@aspnetboilerplate.com",
    //   allowedLeaveDay: 0.0,
    //   type: null,
    //   level: null,
    //   sex: null,
    //   branch: 1,
    //   avatarPath: "/avatars/hiep-avatar.jpg",
    //   morningWorking: "4",
    //   morningStartAt: "08:00",
    //   morningEndAt: "12:00",
    //   afternoonWorking: "4",
    //   afternoonStartAt: "13:00",
    //   afternoonEndAt: "17:00",
    //   isWorkingTimeDefault: false,
    //   id: 1
    // },