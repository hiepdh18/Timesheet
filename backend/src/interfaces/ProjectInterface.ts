import { Document } from "mongoose";
import { ProjectStatus, ProjectType } from "../constants/Enums"
import { IBase } from "./BaseInterface";

export interface IProject extends IBase, Document {
  id: number
  name: string,
  code: string,
  status: ProjectStatus,
  timeStart: string
  timeEnd: string,
  note: string,
  projectType: ProjectType,
  customerId: number
}