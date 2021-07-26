import { IService } from "../../interfaces";
import { Request, Response, NextFunction } from "express";
import { SessionResultDTO } from "../../routes/outdtos/SessionResultDto";
import { AuthenticateDTO } from "../../routes/indtos";

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
  defaultMethod = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(null)
  };

  getCurrentLogin = (req: Request, res: Response, next: NextFunction) => {
const authen : AuthenticateDTO = req.body;

    res.status(200).json(fakeData);
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
