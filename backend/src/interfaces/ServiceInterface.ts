import { NextFunction, Request, Response } from "express";

/**
 * @description ServiceInterface.
 */
export interface IService {
  defaultMethod(req: Request, res: Response, next: NextFunction);
};
