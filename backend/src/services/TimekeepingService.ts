import { IService } from "../interfaces";
import { NextFunction, Request, Response } from "express";
import { GetMyDetailsResDTO } from "../routes/resdtos";


/**
 * @description TimekeepingService.
 */
class TimekeepingService implements IService {
  // private _timeSheetRepo = timeSheetRepository;


  defaultMethod(req: Request, res: Response, next: NextFunction) {
  };
  public getMyDetails = async (req: Request, res: Response, next: NextFunction) => {
    const { year, month } = req.query;
    let response: GetMyDetailsResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    }
    try {
      res.status(204).json(response);
    } catch (error) {

    }
  }
}
export = new TimekeepingService();