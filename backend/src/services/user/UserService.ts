import { IService } from "../../interfaces";
import { Request, Response, NextFunction } from "express";

class UserService implements IService {
  defaultMethod = (req :Request,res: Response,next: NextFunction) => {

  };
  createUser = (req: Request, res: Response, next: NextFunction) => {

  };
  updateUser = (req: Request, res: Response, next: NextFunction) => {

  };
  deleteUser = (req: Request, res: Response, next: NextFunction) => {

  };
}
export = new UserService();