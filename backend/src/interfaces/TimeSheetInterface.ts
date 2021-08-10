import { Document } from "mongoose";
import { Branch, TimeSheetStatus, TimeSheetType, TypeOfWork } from "../constants/Enums";
import { IBase } from "./BaseInterface";

export interface ITimeSheet extends IBase, Document {
  id: number,
  status: TimeSheetStatus,
  workingTime: number,
  dateAt: string,
  projectTaskId: number,
  userId: number,
  taskId: number,
  mytimesheetNote: string,
  typeOfWork: TypeOfWork,
  isCharged: boolean,
  branch: Branch,
  type: TimeSheetType,
  billable: boolean
}
