import { NextFunction, Request, Response } from "express";
import { IResponse, IService } from "../interfaces";
import { TaskDTO } from "../routes/reqdtos";
import taskRepository from '../repositories/TaskRepository'
import projectTaskRepo from '../repositories/ProjectTaskRepository'
import pick from "../utils/pick";
import { GetAllTaskResDTO } from "../routes/resdtos";

/**
 * @description TaskService.
 */
class TaskServive implements IService {
  private _taskRepository = taskRepository;
  private _projectTaskRepo = projectTaskRepo;

  defaultMethod(req: Request, res: Response, next: NextFunction) { };

  save = async (req: Request, res: Response, next: NextFunction) => {
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
      // case update task
      if (task.id) {
        if (await this._taskRepository.findById(task.id)) {
          const updatedTask = await this._taskRepository.update(task)
          response = {
            ...response,
            success: true,
            result: pick(updatedTask, ['id', 'name', 'type', 'isDeleted'])
          }
          res.status(200).json(response);
        }
        else {
          response = {
            ...response,
            error: {
              code: 0,
              message: `Task ${task.id} does not exist!`,
              details: null,
              validationErrors: null
            }
          }
          res.status(500).json(response);
        }
      }
      // case create new task
      else {
        if (! await this._taskRepository.findByName(task.name)) {
          const newTask = await this._taskRepository.create(task);
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
              message: `Task ${task.name} is already exist!`,
              details: null,
              validationErrors: null
            }
          }
          res.status(500).json(response);
        }

      }
    } catch (error) {
      next(error);
    }
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    let response: GetAllTaskResDTO = {
      result: null,
      targetUrl: null,
      success: false,
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

  // there is no constraint with other table
  delete = async (req: Request, res: Response, next: NextFunction) => {
    const id :number= Number(req.query.Id);
    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    }
    try {
      const projectTasks = await  this._projectTaskRepo.findByTaskId(id);
      const task = await this._taskRepository.findById(id);
      if (task && projectTasks.length==0) {
        await this._taskRepository.delete(id);
        response = {
          ...response,
          success: true
        }
        res.status(200).json(response);
      } else {
        response = {
          ...response,
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
      next(error);
    }
  }

  archiveTask = async (req: Request, res: Response, next: NextFunction) => {
    let id = Number(req.query.Id);
    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    }
    try {
      if (await this._taskRepository.findById(id)) {
        await this._taskRepository.archiveTask(id);
        response = {
          ...response,
          success: true
        }
        res.status(200).json(response);
      }
      else {
        response = {
          ...response,
          error: {
            code: 0,
            message: `Task id ${id} does not exist!`,
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

  deArchiveTask = async (req: Request, res: Response, next: NextFunction) => {
    let id = req.body.id;
    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
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
      else {
        response = {
          ...response,
          error: {
            code: 0,
            message: `Task id ${id} does not exist!`,
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
}

export = new TaskServive();
