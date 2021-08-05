import { Document } from "mongoose";
import { ProjectStatus, ProjectType,ProjectMemberType } from "../constants/Enums"
import { IBase } from "./BaseInterface";

interface IUsers {
  userId : number,
  type : ProjectMemberType
}
interface ITasks {
  taskId: number,
  billable : boolean

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
  projectTargetUsers: [],
  isAllUserBelongTo?: boolean,
  id: number
}