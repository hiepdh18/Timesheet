import { Document } from "mongoose";
import { ProjectMemberType } from "../constants";
import { IBase } from "./BaseInterface";

export interface IProjectUser extends IBase, Document {
  id: number,
  userId: number,
  projectId: number,
  type : ProjectMemberType
}
