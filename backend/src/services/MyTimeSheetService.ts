import { NextFunction, Request, Response } from "express";
import { IService } from "../interfaces";
import { CreateTimeSheetReqDTO } from "../routes/reqdtos/CreateTimeSheetReqDto";

/**
 * @description MyTimeSheetService.
 */
class MyTimeSheetService implements IService {
  // private _projectRepository = projectRepository;
  // private _customerRepository = customerRepository;
  // private _userRepository = userRepository;

  defaultMethod(req: Request, res: Response, next: NextFunction) {
  };
  createMyTimeSheet = (req: Request, res: Response, next: NextFunction) => {
    let timeSheet: CreateTimeSheetReqDTO = req.body;

  }
}

export = new MyTimeSheetService();