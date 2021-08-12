import { Branch, Level, TimeSheetStatus, TypeOfWork, UserType } from "../../constants";
import { IResponse } from "../../interfaces";

interface User {
  name: string,
  isActive: boolean,
  type: UserType,
  jobTitle: string,
  level: Level,
  userCode: string,
  avatarPath: string,
  branch: Branch,
  id: number
}
export interface GetUsersResDTO extends IResponse {
  result: User[]
}
