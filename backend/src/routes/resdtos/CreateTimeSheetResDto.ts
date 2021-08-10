import { IResponse } from "../../interfaces";
import { ITimeSheet } from "../../interfaces/TimeSheetInterface";

export interface CreateTimeSheetResDTO extends IResponse {
  result: ITimeSheet
}
