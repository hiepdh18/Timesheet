import { NextFunction, Request, Response } from "express";
import projectRepository from '../repositories/ProjectRepository'
import customerRepository from '../repositories/CustomerRepository'
import { CreateProjectResDTO } from "../routes/resdtos";
import { CreateProjectReqDTO } from "../routes/reqdtos/CreateProjectReqDto";
import { GetAllProjectResDTO } from "../routes/resdtos/GetAllProjectResDto";
import { IService } from "../interfaces";
import pick from "../utils/pick";

/**
 * @description ProjectService.
 */
class ProjectService implements IService {
  private _projectRepository = projectRepository;
  private _customerRepository = customerRepository;

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
      let projects = await this._projectRepository.findByStatus(status);
      let list = projects.map(p => {
        let project = pick(p, ['name', 'code', 'status', 'projectType', 'timeStart','timeEnd', 'id']);
        // let customer = this._customerRepository.findById(p.customerId);
        return {
          ...project, 
          customerName : null,
          pms:null,

        }
      })
      response = {
        ...response,
        result : list,
        success : true
      }
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
      if (project.id) {
        if (await this._projectRepository.findByName(project.name)) {
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
          let createdProject = await this._projectRepository.createProject(project);
          response = {
            ...response,
            success: true,
            result: createdProject
          }
          res.status(200).json(response);
        }
      }
      else {
        let updatedProject = await this._projectRepository.updateProject(project);
        response = {
          ...response,
          success: true,
          result: updatedProject
        }
        res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  }

  // getAllTask = async (req: Request, res: Response, next: NextFunction) => {
  //   let response: GetAllTaskResDTO = {
  //     result: null,
  //     targetUrl: null,
  //     success: true,
  //     error: null,
  //     unAuthorizedRequest: false,
  //     __abp: true
  //   }
  //   try {
  //     const tasks = await this._taskRepository.findAll();
  //     response = {
  //       ...response,
  //       result: tasks
  //     }
  //     res.status(200).json(response);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  //   const id: number = Number(req.query.Id);
  //   let response: IResponse = {
  //     result: null,
  //     targetUrl: null,
  //     success: null,
  //     error: null,
  //     unAuthorizedRequest: true,
  //     __abp: true
  //   }
  //   try {
  //     if (await this._taskRepository.deleteTask(id)) {
  //       response = {
  //         ...response,
  //         success: true
  //       }
  //       res.status(200).json(response);
  //     } else {
  //       response = {
  //         ...response,
  //         success: false,
  //         error: {
  //           code: 0,
  //           message: "Task not found!",
  //           details: null,
  //           validationErrors: null
  //         }
  //       }
  //       res.status(500).json(response);
  //     }
  //   } catch (error) {

  //   }
  // }

  // archiveTask = async (req: Request, res: Response, next: NextFunction) => {
  //   let id = Number(req.query.Id);
  //   let response: IResponse = {
  //     result: null,
  //     targetUrl: null,
  //     success: null,
  //     error: null,
  //     unAuthorizedRequest: true,
  //     __abp: true
  //   }
  //   try {
  //     if (await this._taskRepository.findById(id)) {
  //       const test = await this._taskRepository.archiveTask(id);
  //       console.log(test);
  //       response = {
  //         ...response,
  //         success: true
  //       }
  //       res.status(200).json(response);
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // deArchiveTask = async (req: Request, res: Response, next: NextFunction) => {
  //   let id = req.body.id;
  //   let response: IResponse = {
  //     result: null,
  //     targetUrl: null,
  //     success: null,
  //     error: null,
  //     unAuthorizedRequest: true,
  //     __abp: true
  //   }
  //   try {
  //     if (await this._taskRepository.findById(id)) {
  //       await this._taskRepository.deArchiveTask(id);
  //       response = {
  //         ...response,
  //         success: true
  //       }
  //       res.status(200).json(response);
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

export = new ProjectService();
