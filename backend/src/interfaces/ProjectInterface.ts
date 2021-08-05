import { Document } from "mongoose";
import { ProjectStatus, ProjectType, ProjectMemberType } from "../constants/Enums"
import { IBase } from "./BaseInterface";

interface IUsers {
  userId: number,
  type: ProjectMemberType,
  id: number
}
interface ITasks {
  taskId: number,
  billable: boolean,
  id: number
}

interface ProjectTargetUser {
  userId: number,
  roleName: string,
  id: number
}

export interface IProject extends IBase, Document {
  name: string,
  code: string,
  status: ProjectStatus,
  timeStart: string
  timeEnd: string,
  note: string,
  projectType: ProjectType,
  customerId: number,
  tasks: ITasks[],
  users: IUsers[],
  projectTargetUsers: ProjectTargetUser[],
  isAllUserBelongTo?: boolean,
  id: number
}