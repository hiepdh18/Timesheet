import { TimeSheetStatus, TypeOfWork } from "../../constants";
import { IResponse } from "../../interfaces";

interface Timesheet {
  id: number,
  typeOfWork: TypeOfWork,
  note: string,
  projectTaskId: number,
  status: TimeSheetStatus,
  projectTargetUserId: number,
  workingTime: number,
  dateAt: string,
  targetUserWorkingTime: number,
  isCharged: boolean
}
export interface GetTimeSheetResDTO extends IResponse {
  result: Timesheet
}
