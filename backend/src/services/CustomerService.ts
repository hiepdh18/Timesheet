import { NextFunction, Request, Response } from "express";
import { IResponse, IService } from "../interfaces";
import { TaskDTO } from "../routes/indtos/TaskDto";
import taskRepository from '../repositories/TaskRepository'

/**
 * @description CustomerService.
 */
class CustomerService implements IService {
  // private _taskRepository = taskRepository;

  defaultMethod(req: Request, res: Response, next: NextFunction) {
  };

  getAllPagging(req: Request, res: Response, next: NextFunction) {
  };

  getAll(req: Request, res: Response, next: NextFunction) {
  };

  save(req: Request, res: Response, next: NextFunction) {
  };

  delete(req: Request, res: Response, next: NextFunction) {
  };


}

export = new CustomerService();
