import { NextFunction, Request, Response } from "express";
import { IService } from "../interfaces";
import { TimeSheetDTO } from "../routes/reqdtos/TimeSheetDto";
import { CreateTimeSheetResDTO, GetAllTimeSheetOfUserResDTO } from "../routes/resdtos";
import timeSheetRepository from "../repositories/TimeSheetRepository";
import taskRepository from "../repositories/TaskRepository";
import customerRepository from "../repositories/CustomerRepository";
import projectRepository from "../repositories/ProjectRepository";
import projectTaskRepository from "../repositories/ProjectTaskRepository";
import pick from "../utils/pick";

/**
 * @description MyTimeSheetService.
 */
class MyTimeSheetService implements IService {
  private _timeSheetRepo = timeSheetRepository;
  private _projectRepo = projectRepository;
  private _projectTaskRepo = projectTaskRepository;
  private _taskRepo = taskRepository;
  private _customerRepo = customerRepository;

  defaultMethod(req: Request, res: Response, next: NextFunction) {
  };

  createTimeSheet = async (req: Request, res: Response, next: NextFunction) => {
    let timeSheet: TimeSheetDTO = req.body;
    console.log(timeSheet);
    timeSheet.userId = 1;
    let response: CreateTimeSheetResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    };
    try {
      let newTimeSheet = await this._timeSheetRepo.create(timeSheet);
      response = {
        ...response,
        result: newTimeSheet,
        success: true
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  getAllTimeSheetOfUser = async (req: Request, res: Response, next: NextFunction) => {
    let userId = 1;
    let { startDate, endDate } = req.query;

    let response: GetAllTimeSheetOfUserResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    }
    try {
      let timeSheets = await this._timeSheetRepo.gettimesheetsOfUser(userId, startDate.toString(), endDate.toString());
      let result = [];
      for (var t of timeSheets) {
        let base = pick(t, ['id', 'projectTaskId', 'dateAt', 'workingTime', 'status', 'note', 'typeOfWork', 'isCharged', 'billable']);
        let projectTask = await this._projectTaskRepo.findById(t.projectTaskId);
        let project = await this._projectRepo.findById(projectTask.projectId);
        let task = await this._taskRepo.findById(projectTask.taskId);
        let customer = await this._customerRepo.findById(project.customerId);
        result.push({
          ...base,
          projectName: project.name,
          taskName: task.name,
          customerName: customer.name,
          projectCode: project.code
        });
      }
      response = {
        ...response,
        success: true,
        result
      }
      res.status(200).json(response);
    }

    catch (error) {
      next(error);
    }
  }
}

export = new MyTimeSheetService();