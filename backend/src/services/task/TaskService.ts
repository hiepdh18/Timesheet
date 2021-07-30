import { NextFunction, Request, Response } from "express";
import { IResponse, IService } from "../../interfaces";
import { TaskDTO } from "../../routes/indtos/TaskDto";
import taskRepository from '../../repositories/TaskRepository'

/**
 * @description TaskServive.
 */
class TaskServive implements IService {
  private _taskRepository = taskRepository;

  defaultMethod(req: Request, res: Response, next: NextFunction) {
  };

  saveTask = async (req: Request, res: Response, next: NextFunction) => {
    const task: TaskDTO = req.body;
    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: true,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    };
    try {
      let newTask;
      if (!task.id) {
        newTask = await this._taskRepository.createTask(task);
      }
      else {
        newTask = await this._taskRepository.updateTask(task);
      }
      response = {
        ...response,
        result: {
          ...newTask
        }
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export = new TaskServive();
