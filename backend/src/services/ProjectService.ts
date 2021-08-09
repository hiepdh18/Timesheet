import { NextFunction, Request, Response } from "express";
import projectRepository from '../repositories/ProjectRepository'
import customerRepository from '../repositories/CustomerRepository'
import projectUserRepository from '../repositories/ProjectUserRepository'
import userRepository from '../repositories/UserRepository'
import { CreateProjectResDTO, ProjectDTO } from "../routes/resdtos";
import { CreateProjectReqDTO } from "../routes/reqdtos/CreateProjectReqDto";
import { GetAllProjectResDTO } from "../routes/resdtos/GetAllProjectResDto";
import { IResponse, IService } from "../interfaces";
import pick from "../utils/pick";

/**
 * @description ProjectService.
 */
class ProjectService implements IService {
  private _projectUserRepo = projectUserRepository;
  private _projectRepo = projectRepository;
  private _customerRepo = customerRepository;
  private _userRepo = userRepository;

  defaultMethod(req: Request, res: Response, next: NextFunction) {
  };

  getAllProject = async (req: Request, res: Response, next: NextFunction) => {
    let status = Number(req.query.status);

    let response: GetAllProjectResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: null,
      __abp: true
    }
    try {
      let projects = await this._projectRepo.findByStatus(status);
      let newProjects =[];

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
      console.log( newProjects);
    
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
    const project: CreateProjectReqDTO = req.body;
    let response: CreateProjectResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    };
    try {
      if (project.id && await this._projectRepo.findById(project.id)) {
        let updatedProject = await this._projectRepo.updateProject(project);
        response = {
          ...response,
          success: true,
          result: updatedProject
        }
        res.status(200).json(response);
      }
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
          response = {
            ...response,
            success: true,
            result: createdProject
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
}

export = new ProjectService();
