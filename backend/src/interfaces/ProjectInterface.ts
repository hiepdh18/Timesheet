import { Document } from "mongoose";
import { ProjectStatus, ProjectType } from "../constants/Enums"
import { IBase } from "./BaseInterface";

export interface IProject extends IBase, Document{
  name: string,
  code: string,
  status: ProjectStatus,
  timeStart: string
  timeEnd: string,
  note: string,
  projectType: ProjectType,
  customerId: number,
  tasks: [],
  users: [],
  projectTargetUsers: [],
  isAllUserBelongTo: boolean,
  id: number
}