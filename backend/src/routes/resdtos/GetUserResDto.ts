import { Branch, Level, Sex, TimeSheetStatus, TypeOfWork, UserType } from "../../constants";
import { IResponse } from "../../interfaces";

interface User {
  userName: string,
  name: string,
  surname: string,
  emailAddress: string,
  phoneNumber: string,
  address: string,
  isActive: boolean,
  fullName: string,
  roleNames: string[],
  type: UserType,
  salary: number,
  salaryAt: string,
  startDateAt: string,
  allowedLeaveDay: number,
  userCode: string,
  jobTitle: string,
  level: Level,
  registerWorkDay: string,
  managerId: number,
  branch: Branch,
  sex: Sex,
  avatarPath: string,
  morningWorking: string,
  morningStartAt: string,
  morningEndAt: string,
  afternoonWorking: string,
  afternoonStartAt: string,
  afternoonEndAt: string,
  isWorkingTimeDefault: boolean,
  isStopWork: boolean,
  id: number
}
export interface GetUserResDTO extends IResponse {
  result: User
}
