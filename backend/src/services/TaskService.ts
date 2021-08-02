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
      if (newTask) {
        response = {
          ...response,
          success: true,
          result: pick(newTask, ['id', 'name', 'type', 'isDeleted'])
        }
        res.status(200).json(response);
      }
      else {
        response = {
          ...response,
          error: {
            code: 0,
            message: `Task "${task.name}" is already exist`,
            details: null,
            validationErrors: null
          }
        }
        res.status(500).json(response);
      }
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
    try {
      if (await this._taskRepository.deleteTask(id)) {
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
        res.status(500).json(response);
      }
    } catch (error) {

    }
  }

  archiveTask = async (req: Request, res: Response, next: NextFunction) => {
    let id = Number(req.query.Id);
    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: null,
      error: null,
      unAuthorizedRequest: true,
      __abp: true
    }
    try {
      if (await this._taskRepository.findById(id)) {
        const test = await this._taskRepository.archiveTask(id);
        console.log(test);
        response = {
          ...response,
          success: true
        }
        res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  }

  deArchiveTask = async (req: Request, res: Response, next: NextFunction) => {
    let id = req.body.id;
    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: null,
      error: null,
      unAuthorizedRequest: true,
      __abp: true
    }
    try {
      if (await this._taskRepository.findById(id)) {
        await this._taskRepository.deArchiveTask(id);
        response = {
          ...response,
          success: true
        }
        res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  }
}

export = new TaskServive();
