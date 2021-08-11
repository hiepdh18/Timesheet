import { NextFunction, Request, Response } from "express";
import projectRepository from '../repositories/ProjectRepository'
import customerRepository from '../repositories/CustomerRepository'
import projectUserRepository from '../repositories/ProjectUserRepository'
import projectTaskRepository from '../repositories/ProjectTaskRepository'
import taskRepository from '../repositories/TaskRepository'
import userRepository from '../repositories/UserRepository'
import { CreateProjectResDTO } from "../routes/resdtos";
import { ProjectDTO } from "../routes/reqdtos/";
import { GetAllProjectResDTO } from "../routes/resdtos/GetAllProjectResDto";
import { IResponse, IService } from "../interfaces";
import pick from "../utils/pick";
import { GetProjectResDTO } from "../routes/resdtos/GetProjectResDto";
import { logger } from "./logger";

/**
 * @description ProjectService.
 */
class ProjectService implements IService {
  private _projectRepo = projectRepository;
  private _projectUserRepo = projectUserRepository;
  private _projectTaskRepo = projectTaskRepository;
  private _customerRepo = customerRepository;
  private _userRepo = userRepository;
  private _taskRepo = taskRepository;

  defaultMethod(req: Request, res: Response, next: NextFunction) {
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    const { input } = req.query;
    let response: GetProjectResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    }
    try {
      let project = await this._projectRepo.findById(Number(input));
      project = pick(project, ['id', 'name', 'code', 'status', 'timeStart', 'timeEnd', 'note', 'projectType', 'customerId', 'isAllUserBelongTo'])
      let projectTasks = await this._projectTaskRepo.getByProjectId(project.id);
      let projectUsers = await this._projectUserRepo.getByProjectId(project.id);
      let tasks = [];
      let users = [];

      for (let x of projectTasks) {
        tasks.push({
          taskId: x.taskId,
          billable: x.billable,
          id: x.id
        })
      }
      for (let x of projectUsers) {
        users.push({
          userId: x.userId,
          type: x.type,
          id: x.id
        })
      }
      response = {
        ...response,
        result: {
          ...project,
          tasks,
          users,
          projectTargetUsers: []
        }
      }
      console.log(response)
      res.status(200).json(response)
    } catch (error) {
      logger.error(error);
    }
  }

  getAllProject = async (req: Request, res: Response, next: NextFunction) => {
    const { status, search } = req.query;
    let response: GetAllProjectResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: null,
      __abp: true
    }
    try {
      let projects = await this._projectRepo.findByStatus(Number(status), String(search));
      let newProjects = [];
      for (let p of projects) {
        let base = pick(p, ['name', 'code', 'status', 'projectType', 'timeStart', 'timeEnd', 'id']);
        let customer = await this._customerRepo.findById(p.customerId)
        let pms = await this._userRepo.getProjectManagers(p.id);
        let activeMember = await this._projectUserRepo.getActiveMembers(p.id);
        let project = {
          ...base,
          customerName: customer.name,
          pms,
          activeMember
        }
        newProjects.push(project);
      }
      response = {
        ...response,
        result: newProjects,
        success: true
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  saveProject = async (req: Request, res: Response, next: NextFunction) => {
    const project: ProjectDTO = req.body;
    const { tasks, projectTargetUsers, users } = project;
    let response: CreateProjectResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    };
    try {
      // case update project
      if (project.id) {
        if (await this._projectRepo.findById(project.id)) {
          await this._projectTaskRepo.deleteByProjectId(project.id);
          for (let task of tasks) {
            await this._projectTaskRepo.create(task, project.id);
          }
          await this._projectUserRepo.deleteByProjectId(project.id);
          for (let user of users) {
            await this._projectUserRepo.create(user, project.id);
          }
          await this._projectRepo.updateProject(project);
          response = {
            ...response,
            success: true,
            result: project
          }
          res.status(200).json(response);
        }
        else {
          response = {
            ...response,
            error: {
              code: 0,
              message: `Project id ${project.id} is not exist!`,
              details: null,
              validationErrors: null
            }
          }
          res.status(500).json(response);
        }
      }
      // case create new project
      else {
        if (await this._projectRepo.findByName(project.name)) {
          response = {
            ...response,
            error: {
              code: 0,
              details: null,
              message: `Project name ${project.name} already exist!`,
              validationErrors: null
            }
          }
          res.status(500).json(response);
        }
        else {
          let createdProject = await this._projectRepo.createProject(project);
          for (let user of users) {
            await this._projectUserRepo.create(user, createdProject.id);
          }
          for (let task of tasks) {
            await this._projectTaskRepo.create(task, createdProject.id);
          }
          response = {
            ...response,
            success: true,
            result: project
          }
          res.status(200).json(response);
        }
      }
    } catch (error) {
      next(error);
    }
  }

  inactiveProject = async (req: Request, res: Response, next: NextFunction) => {
    let id = req.body.id;
    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: true,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    }
    try {
      await this._projectRepo.inactiveProject(id);
      response = {
        ...response,
        success: true
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  activeProject = async (req: Request, res: Response, next: NextFunction) => {
    let id = req.body.id;
    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: true,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    }
    try {
      await this._projectRepo.activeProject(id);
      response = {
        ...response,
        success: true
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  deleteProject = async (req: Request, res: Response, next: NextFunction) => {
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
      let project = await this._projectRepo.findById(id);
      if (project) {
        await this._projectRepo.deleteProject(id);
        response = {
          ...response,
          success: true
        }
        res.status(200).json(response);
      }
      else {
        response = {
          ...response,
          success: false,
          error: {
            code: 0,
            message: "Project not found!",
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

  getProjectsIncludingTasks = async (req: Request, res: Response, next: NextFunction) => {
    let userId = 1;
    let response = {
      result: null,
      targetUrl: null,
      success: null,
      error: null,
      unAuthorizedRequest: true,
      __abp: true
    }
    try {

      let projectUsers = await this._projectUserRepo.getByUserId(userId);
      let result = [];
      for (let x of projectUsers) {
        let project = await this._projectRepo.findById(x.projectId);
        let customer = await this._customerRepo.findById(project.customerId);
        let pms = await this._userRepo.getProjectManagers(project.id);
        let projectTasks = await this._projectTaskRepo.getByProjectId(project.id);
        let tasks = [];
        for (let x of projectTasks) {
          let task = await this._taskRepo.findById(x.taskId);
          tasks.push({
            projectTaskId: x.id,
            taskName: task.name,
            billable: false
          })
        }
        result.push({
          projectName: project.name,
          customerName: customer.name,
          projectCode: project.code,
          projectUserType: project.projectType,
          listPM: pms,
          tasks,
          targetUsers: [],
          id: x.id
        });
      }
      response = {
        ...response,
        result,
        success: true
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

}

export = new ProjectService();
