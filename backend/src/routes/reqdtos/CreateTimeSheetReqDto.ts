import { TyOfWork } from "../../constants/Enums";

export interface CreateTimeSheetReqDTO {
  typeOfWork: TyOfWork,
  projectTaskId: number,
  note: string,
  projectTargetUserId: null,
  workingTime: number,
  targetUserWorkingTime: number,
  isCharged: boolean,
  dateAt: string
}