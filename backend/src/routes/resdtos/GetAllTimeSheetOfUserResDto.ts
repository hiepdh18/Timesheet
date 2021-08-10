import { TimeSheetStatus, TypeOfWork } from "../../constants";
import { IResponse } from "../../interfaces";

interface TimeSheet {
  id: number,
  projectName: string,
  taskName: string,
  projectTaskId: number,
  customerName: string,
  projectCode: string,
  dateAt: string,
  workingTime: number,
  status: TimeSheetStatus,
  note: string,
  typeOfWork: TypeOfWork,
  isCharged: boolean,
  billable: boolean
}

export interface GetAllTimeSheetOfUserResDTO extends IResponse {
  result: TimeSheet[]
}
