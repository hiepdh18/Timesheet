import { NextFunction, Request, Response } from "express";
import { IResponse, IService } from "../interfaces";
import { TimeSheetDTO } from "../routes/reqdtos";
import { CreateTimeSheetResDTO, GetAllTimeSheetOfUserResDTO, GetTimeSheetResDTO } from "../routes/resdtos";
import timeSheetRepository from "../repositories/TimeSheetRepository";
import taskRepository from "../repositories/TaskRepository";
import customerRepository from "../repositories/CustomerRepository";
import projectRepository from "../repositories/ProjectRepository";
import projectTaskRepository from "../repositories/ProjectTaskRepository";
import userRepository from "../repositories/UserRepository";
import pick from "../utils/pick";
import { SubmitTimeSheetResDTO } from "../routes/resdtos/SubmitTimeSheetResDto";
import { Branch } from "../constants";

/**
 * @description MyTimeSheetService.
 */
class MyTimeSheetService implements IService {
  private _timeSheetRepo = timeSheetRepository;
  private _projectRepo = projectRepository;
  private _projectTaskRepo = projectTaskRepository;
  private _taskRepo = taskRepository;
  private _customerRepo = customerRepository;
  private _userRepo = userRepository;

  defaultMethod(req: Request, res: Response, next: NextFunction) {
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    let id = req.query.id;
    let response: GetTimeSheetResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    };
    try {
      let timeSheet = await this._timeSheetRepo.findById(Number(id));
      timeSheet = pick(timeSheet, ['id', 'typeOfWork', 'note', 'projectTaskId', 'status', 'projectTargetUserId', 'workingTime', 'dateAt', 'targetUserWorkingTime', 'isCharged'])
      response = {
        ...response,
        result: timeSheet,
        success: true
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    let timeSheet: TimeSheetDTO = req.body;
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
      let newTimeSheet = await this._timeSheetRepo.createTimeSheet(timeSheet);
      newTimeSheet = pick(newTimeSheet, ['id', 'typeOfWork', 'note', 'projectTaskId', 'status', 'projectTargetUserId', 'workingTime', 'dateAt', 'targetUserWorkingTime', 'isCharged'])
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

  update = async (req: Request, res: Response, next: NextFunction) => {
    let timeSheet: TimeSheetDTO = req.body;
    let response: CreateTimeSheetResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    };
    try {
      if (await this._timeSheetRepo.findById(timeSheet.id)) {
        let updatedTimeSheet = await this._timeSheetRepo.updateTimeSheet(timeSheet);
        updatedTimeSheet = pick(updatedTimeSheet, ['id', 'typeOfWork', 'note', 'projectTaskId', 'status', 'projectTargetUserId', 'workingTime', 'dateAt', 'targetUserWorkingTime', 'isCharged'])
        response = {
          ...response,
          result: updatedTimeSheet,
          success: true
        }
        res.status(200).json(response);
      }
      else {
        response = {
          ...response,
          result: null,
          error: {
            code: 0,
            validationErrors: null,
            details: null,
            message: `TimeSheet id ${timeSheet.id} does not exist!`
          }
        }
        res.status(200).json(response);
      }

    } catch (error) {
      next(error);
    }
  }

  saveAndReset = async (req: Request, res: Response, next: NextFunction) => {
    let timeSheet: TimeSheetDTO = req.body;
    timeSheet.status = 1;
    let response: CreateTimeSheetResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    };
    try {
      if (await this._timeSheetRepo.findById(timeSheet.id)) {
        let updatedTimeSheet = await this._timeSheetRepo.updateTimeSheet(timeSheet);
        updatedTimeSheet = pick(updatedTimeSheet, ['id', 'typeOfWork', 'note', 'projectTaskId', 'status', 'projectTargetUserId', 'workingTime', 'dateAt', 'targetUserWorkingTime', 'isCharged'])
        response = {
          ...response,
          result: { ...updatedTimeSheet, status: 3 },
          success: true
        }
        res.status(200).json(response);
      }
      else {
        response = {
          ...response,
          result: null,
          error: {
            code: 0,
            validationErrors: null,
            details: null,
            message: `TimeSheet id ${timeSheet.id} does not exist!`
          }
        }
        res.status(200).json(response);
      }

    } catch (error) {
      next(error);
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    let id = req.query.Id;
    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    };
    try {
      if (await this._timeSheetRepo.findById(Number(id))) {
        await this._timeSheetRepo.deleteTimeSheet(Number(id));
        response = {
          ...response,
          success: true
        }
        res.status(200).json(response);
      }
      else {
        response = {
          ...response,
          result: null,
          error: {
            code: 0,
            validationErrors: null,
            details: null,
            message: `TimeSheet id ${Number(id)} does not exist!`
          }
        }
        res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  }

  approve = async (req: Request, res: Response, next: NextFunction) => {
    const listId = req.body;
    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    };
    try {
      let successCount = 0;
      let failCount = 0;
      for (let id of listId) {
        if (await this._timeSheetRepo.findById(id)) {
          await this._timeSheetRepo.approveTimesheet(id);
          successCount++;
        } else failCount++;
      }
      response = {
        ...response,
        result: {
          success: ` - Success ${successCount} timesheets.`,
          successCount: successCount,
          failedCount: ` - Fail ${failCount} timesheets.`,
          fail: ` - Fail ${failCount} timesheets.`,
          lockDate: `- Locked date: 08-08-2021.(hard code)`
        },
        success: true
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  reject = async (req: Request, res: Response, next: NextFunction) => {
    const listId = req.body;
    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    };
    try {
      let successCount = 0;
      let failCount = 0;
      for (let id of listId) {
        if (await this._timeSheetRepo.findById(id)) {
          await this._timeSheetRepo.rejectTimesheet(id);
          successCount++;
        } else failCount++;
      }
      response = {
        ...response,
        result: {
          success: ` - Success ${successCount} timesheets.`,
          fail: ` - Fail ${failCount} timesheets.`,
          lockDate: `- Locked date: 08-08-2021.(hard code)`
        },
        success: true
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  submit = async (req: Request, res: Response, next: NextFunction) => {
    const { startDate, endDate } = req.body;
    const userId = 1;
    let response: SubmitTimeSheetResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    };
    try {
      let timeSheets = await this._timeSheetRepo.getTimesheetsOfUser(userId, startDate, endDate);
      let count = 0;
      for (let x of timeSheets) {
        if (x.status == 0) {
          count++;
          x.status = 1;
          await this._timeSheetRepo.updateTimeSheet(x);
        }
      }
      response = {
        ...response,
        result: `Submit success ${count} timesheets`,
        success: true
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    let { startDate, endDate, status } = req.query;
    let response = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    }
    try {
      let timeSheets = await this._timeSheetRepo.getAllTimesheets(startDate.toString(), endDate.toString(), Number(status));
      let result = [];
      for (var t of timeSheets) {
        let base = pick(t, ['id', 'dateAt', 'workingTime', 'status', 'typeOfWork', 'isCharged', 'userId']);
        let user = await this._userRepo.findById(t.userId);
        let projectTask = await this._projectTaskRepo.findById(t.projectTaskId);
        let project = await this._projectRepo.findById(projectTask.projectId);
        let task = await this._taskRepo.findById(projectTask.taskId);
        let customer = await this._customerRepo.findById(project.customerId);
        let pms = await this._userRepo.getProjectManagers(project.id);
        result.push({
          ...base,
          isUserInProject: true,
          branch: user.branch,
          listPM: pms,
          type: 0,
          avatarPath: user.avatarPath,
          level: user.level,
          branchName: Branch[user.branch],
          mytimesheetNote: t.note,
          taskId: task.id,
          user: user.name,
          projectId: project.id,
          projectName: project.name,
          taskName: task.name,
          customerName: customer.name,
          projectCode: project.code
        });
      }
      response = {
        ...response,
        result,
        success: true
      }
      console.log(response)
      res.status(200).json(response);
    }
    catch (error) {
      console.log(error)
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
      let timeSheets = await this._timeSheetRepo.getTimesheetsOfUser(userId, startDate.toString(), endDate.toString());
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