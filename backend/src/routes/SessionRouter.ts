import { NextFunction, Request, Response, Router } from "express";
import fs = require("fs");
import { BaseRouter } from "./BaseRouter";

const fakeData = {
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
  __abp: true,
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
};
const fakeData2 = {
  result: null,
  targetUrl: null,
  success: true,
  error: null,
  unAuthorizedRequest: false,
  __abp: true
}

/**
 * @description AuthLoginRouter
 */
class SessionRouter extends BaseRouter {
  constructor() {
    super();
    this.init();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.get(
      "/Session/GetCurrentLoginInformations",
      (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json(fakeData);
      }
    );
  }
}

export = new SessionRouter().router;
