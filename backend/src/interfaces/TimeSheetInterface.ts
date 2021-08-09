import { Document } from "mongoose";
import { Branch, MytimeSheetStatus, MytimeSheetType, TyOfWork } from "../constants/Enums";
import { IBase } from "./BaseInterface";

export interface ITimeSheet extends IBase, Document {
  id: number,
  status: MytimeSheetStatus,
  workingTime: number,
  dateAt: string,
  projectTaskId:number,
  userId: number,
  taskId: number,
  mytimesheetNote: string,
  typeOfWork: TyOfWork,
  isCharged: boolean,
  isUserInProject: boolean,
  branch: Branch,
  type: MytimeSheetType
}
