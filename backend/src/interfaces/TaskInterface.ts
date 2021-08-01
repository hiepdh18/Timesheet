import { Document } from "mongoose";
import { TaskType } from "../constants/Enums";
import { IBase } from "./BaseInterface";

export interface ITask  extends IBase, Document{
  name: string,
  type: TaskType,
  id?: number,
  isDeleted?: boolean
}
