import { NextFunction, Request, Response } from "express";
// import TestService from "../services/test/TestService";
import { BaseRouter } from "./BaseRouter";

/**
 * @description UserRouter.
 */
class UserRouter extends BaseRouter {
  private _service

  constructor() {
    super();
    this.init();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.get("/", (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json(this._service.defaultMethod());
    });
  }
}

export = new UserRouter().router;
