import bcrypt from "bcrypt";
import { IResponse, IService } from "../interfaces";
import { Request, Response, NextFunction } from "express";
import { UserDTO } from "../routes/reqdtos";
import userRepository from "../repositories/UserRepository";
import projectUserRepository from "../repositories/ProjectUserRepository";
import projectRepository from "../repositories/ProjectRepository";
import roleRepository from "../repositories/RoleRepository";
import { CreateUserResDTO, GetRolesResDTO, GetUserResDTO } from "../routes/resdtos";
import { UserGetAllPaggingReqDTO } from "../routes/reqdtos";
import pick from "../utils/pick";
import { GetUsersResDTO } from "../routes/resdtos/GetUsersResDto";
import { logger } from "./logger";
/**
 * @description Userservice
 */
class UserService implements IService {
  private _userRepos = userRepository;
  private _projectRepo = projectRepository;
  private _projectUserRepo = projectUserRepository;
  private _roleRepo = roleRepository;

  defaultMethod = (req: Request, res: Response, next: NextFunction) => {
  };

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    let user: UserDTO = req.body;
    console.log(user);
    let response: CreateUserResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    }
 

    try {
      if (!user.userName
        || !user.emailAddress
        || !user.password
        || await this._userRepos.findByEmail(user.emailAddress)
        || await this._userRepos.findByUsername(user.userName)
      ) {
        return res.status(500).json(response);
      }
      const listRole = await this._roleRepo.findAll();
      user['roleNames'] = user.roleNames.map(roleName => {
        for (let x of listRole) {
          if (roleName === x.normalizedName)
            return x.name
        }
      })
      const hash = await bcrypt.hash(user.password, 10);
      // user = { ...user, password: hash };
      user['password'] = hash;
      let newUser = await this._userRepos.createUser(user);
      newUser = pick(newUser, ['userName', 'name', 'surname', 'emailAddress', 'phoneNumber', 'address', 'isActive', 'fullName', 'roleNames', 'type', 'salary', 'salaryAt', 'startDateAt', 'allowedLeaveDay', 'userCode', 'jobTitle', 'level', 'registerWorkDay', 'managerId', 'branch', 'sex', 'avatarPath', 'morningWorking', 'morningStartAt', 'morningEndAt', 'afternoonWorking', 'afternoonStartAt', 'afternoonEndAt', 'isWorkingTimeDefault', 'isStopWork', 'id']);
      response = {
        ...response,
        result: newUser,
        success: true,
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  // Get all manager
  getAllManager = async (req: Request, res: Response, next: NextFunction) => {
    let allManager = [];
    let response: GetUsersResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    }
    try {
      let users = await this._userRepos.findUserHavingManager();
      for (let user of users) {
        let mng = await this._userRepos.findById(user.managerId)
        mng = pick(mng, ['name', 'isActive', 'type', 'jobTitle', 'level', 'userCode', 'avatarPath', 'branch', 'id']);
        allManager.push(mng);
      }
      response = {
        ...response,
        success: true,
        result: allManager
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getUserNotPagging = async (req: Request, res: Response, next: NextFunction) => {
    let response: GetUsersResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    }
    try {
      let users = await this._userRepos.findAll();

      response = {
        ...response,
        success: true,
        result: users
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getAllPagging = async (req: Request, res: Response, next: NextFunction) => {
    let filter: UserGetAllPaggingReqDTO = req.body;
    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: true,
      __abp: true
    }
    try {
      let users = await this._userRepos.findAllPagging(filter.filterItems, filter.maxResultCount, filter.skipCount, filter.searchText);
      let list = [];
      for (let user of users) {
        let base = pick(user, ['userName', 'name', 'surname', 'emailAddress', 'phoneNumber', 'address', 'isActive', 'fullName', 'roleNames', 'type', 'salary', 'salaryAt', 'startDateAt', 'allowedLeaveDay', 'userCode', 'jobTitle', 'level', 'registerWorkDay', 'avatarPath', 'managerId', 'branch', 'sex', 'creationTime', 'morningWorking', 'morningStartAt', 'morningEndAt', 'afternoonWorking', 'afternoonEndAt', 'id'])
        let pus = await this._projectUserRepo.getByUserId(user.id);
        let manager = await this._userRepos.findById(user.managerId)
        let projectUsers = [];
        for (let pu of pus) {
          let project = await this._projectRepo.findById(pu.projectId)
          let pms = await this._userRepos.getProjectManagers(project.id);
          projectUsers.push({
            projectId: project.id,
            projectCode: project.code,
            projectName: project.name,
            projectUserType: pu.type,
            pms: pms
          })
        }
        list.push({
          ...base,
          managerName: manager.name,
          managerAvatarPath: manager.avatarPath,
          projectUsers
        });
      }

      response = {
        ...response,
        result: {
          totalCount: users.length,
          items: list

        }
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    let user: UserDTO = req.body
    let response: GetUserResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    }
    try {
      if (await this._userRepos.findById(user.id)) {
        let updatedUser = await this._userRepos.updateUser(user);
        updatedUser = pick(updatedUser, ['userName', 'name', 'surname', 'emailAddress', 'phoneNumber', 'address', 'isActive', 'fullName', 'roleNames', 'type', 'salary', 'salaryAt', 'startDateAt', 'allowedLeaveDay', 'userCode', 'jobTitle', 'level', 'registerWorkDay', 'managerId', 'branch', 'sex', 'avatarPath', 'morningWorking', 'morningStartAt', 'morningEndAt', 'afternoonWorking', 'afternoonStartAt', 'afternoonEndAt', 'isWorkingTimeDefault', 'isStopWork', 'id']);
        response = {
          ...response,
          success: true,
          result: updatedUser
        }
        res.status(200).json(response);

      }
      else {

      }
    } catch (error) {
      console.log(error);
      logger.error(error);
    }

  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.query.Id;

    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    }
    try {
      const user = await this._userRepos.findById(Number(id));
      const projectUsers = await this._projectUserRepo.getByUserId(Number(id));
      if (user && projectUsers.length == 0) {
        await this._userRepos.deleteUser(Number(id));
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
            details: null,
            message: `User id ${id} does not exist or user in project`,
            validationErrors: null
          }
        }
        res.status(500).json(response);
      }
    } catch (error) {
      next(error)
    }
  };

  getRoles = async (req: Request, res: Response, next: NextFunction) => {
    let response: GetRolesResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    }
    try {
      let roles = await this._roleRepo.findAll();
      response = {
        ...response,
        result: {
          items: roles
        }
      }
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      logger.error(error);
    }
  };

  getUser = async (req: Request, res: Response, next: NextFunction) => {
    let id = req.query.Id;
    let response: GetUserResDTO = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    }
    try {
      let user = await this._userRepos.findById(Number(id));

      response = {
        ...response,
        success: true,
        result: user

      }
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      logger.error(error);
    }
  };

  active = async (req: Request, res: Response, next: NextFunction) => {
    let userId = req.body.id;
    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    }
    try {
      if (await this._userRepos.findById(userId)) {
        await this._userRepos.activeUser(userId)
        response = {
          ...response,
          success: true,
        }
        res.status(200).json(response);
      } else {
        response = {
          ...response,
          error: {
            code: 0,
            details: null,
            message: `User id ${userId} does not exist!`,
            validationErrors: null
          }
        }
        res.status(500).json(response);
      }
    } catch (error) {
      console.log(error);
      logger.error(error);
    }
  };
  deActive = async (req: Request, res: Response, next: NextFunction) => {
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
      if (await this._userRepos.findById(id)) {
        await this._userRepos.deActiveUser(id)
        response = {
          ...response,
          success: true,
        }
        res.status(200).json(response);
      } else {
        response = {
          ...response,
          error: {
            code: 0,
            details: null,
            message: `User id ${id} does not exist!`,
            validationErrors: null
          }
        }
        res.status(500).json(response);
      }
    } catch (error) {
      console.log(error);
      logger.error(error);
    }
  };

  updateAvatar = async (req: Request, res: Response, next: NextFunction) => {
    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    }
    try {
      if (await this._userRepos.findById(Number(1))) {

        response = {
          ...response,
          result: 'avatars/hiep-avatar.jpg',
          success: true,
        }
        res.status(200).json(response);
      } else {
        response = {
          ...response,
          error: {
            code: 0,
            details: null,
            message: `User id  does not exist!`,
            validationErrors: null
          }
        }
        res.status(500).json(response);
      }
    } catch (error) {
      console.log(error);
      logger.error(error);
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    let { adminPassword, userId, newPassword } = req.body;

    let response: IResponse = {
      result: null,
      targetUrl: null,
      success: false,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    }
    try {
      if (await this._userRepos.findById(Number(1))) {

        response = {
          ...response,
          result: 'avatars/hiep-avatar.jpg',
          success: true,
        }
        res.status(200).json(response);
      } else {
        response = {
          ...response,
          error: {
            code: 0,
            details: null,
            message: `User id  does not exist!`,
            validationErrors: null
          }
        }
        res.status(500).json(response);
      }
    } catch (error) {
      console.log(error);
      logger.error(error);
    }
  };
}
export = new UserService();
