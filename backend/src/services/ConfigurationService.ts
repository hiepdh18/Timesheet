import { NextFunction, Request, response, Response } from "express";
import { IService } from "../interfaces";

/**
 * @description CustomerService.
 */
class ConfigurationService implements IService {
  // private _customerRepository = customerRepository;

  defaultMethod(req: Request, res: Response, next: NextFunction) { };

  // there is no effect of filterItemts
  getWorkingTime = async (req: Request, res: Response, next: NextFunction) => {
    let response = {
      result: {
        0: {
          morningStartAt: '8:30',
          morningEndAt: '12:00',
          afternoonStartAt: '13:00',
          afternoonEndAt: '17:30',
          morningWorking: '3.5',
          afternoonWorking: '4.5',
          id: 0
        },
        1: {
          morningStartAt: '8:00',
          morningEndAt: '12:00',
          afternoonStartAt: '13:00',
          afternoonEndAt: '17:00',
          morningWorking: '4',
          afternoonWorking: '4',
          id: 0
        },
        2: {
          morningStartAt: '8:30',
          morningEndAt: '12:00',
          afternoonStartAt: '13:00',
          afternoonEndAt: '17:30',
          morningWorking: '3.5',
          afternoonWorking: '4.5',
          id: 0
        }
      },
      targetUrl: null,
      success: true,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    }
    res.status(200).json(response)
  }
}

export = new ConfigurationService();
