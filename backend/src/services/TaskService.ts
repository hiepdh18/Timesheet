import { NextFunction, Request, Response } from "express";
import { IResponse, IService } from "../interfaces";
import { TaskDTO } from "../routes/reqdtos/TaskDto";
import taskRepository from '../repositories/TaskRepository'
import pick from "../utils/pick";
import { GetAllTaskResDTO } from "../routes/resdtos";

/**
 * @description TaskService.
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
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    };

    try {
      let newTask;
      if (!task.id)
        newTask = await this._taskRepository.createTask(task);
      else
        newTask = await this._taskRepository.updateTask(task);
      if (newTask !== undefined)
        response = {
          ...response,
          success: true,
          result: pick(newTask, ['id', 'name', 'type', 'isDeleted'])
        }
      else
        response = {
          ...response,
          error: {
            code: 0,
            message: `Task "${task.name}" is already exist`,
            details: null,
            validationErrors: null
          }
        }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  getAllTask = async (req: Request, res: Response, next: NextFunction) => {
    let response: GetAllTaskResDTO = {
      result: null,
      targetUrl: null,
      success: true,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    }
    try {
      const tasks = await this._taskRepository.findAll();
      response = {
        ...response,
        result: tasks
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  archiveTask = async (req: Request, res: Response, next: NextFunction) => {

  }
  deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    const id: number = Number(req.query.Id);
    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: null,
      error: null,
      unAuthorizedRequest: true,
      __abp: true
    }
    let success = await this._taskRepository.deleteTask(id);

    if (success) {
      response = {
        ...response,
        success: true
      }
      res.status(200).json(response);

    } else {
      response = {
        ...response,
        success: false,
        error: {
          code: 0,
          message: "Task not found!",
          details: null,
          validationErrors: null
        }
      }

      res.status(404).json(response);
    }
  }
  deArchiveTask = async (req: Request, res: Response, next: NextFunction) => {

  }
}

export = new TaskServive();
