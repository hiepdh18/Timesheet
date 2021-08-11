import { Document } from "mongoose";
import { TimeSheetStatus, TypeOfWork } from "../constants/Enums";
import { IBase } from "./BaseInterface";

export interface ITimeSheet extends IBase, Document {
  id: number,
  projectTaskId: number,
  note: string,
  workingTime: number,
  targetUserWorkingTime: number,
  typeOfWork: TypeOfWork,
  isCharged: boolean,
  dateAt: string,
  status: TimeSheetStatus,
  projectTargetUserId: number,
  userId: number
}
