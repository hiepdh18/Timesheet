import { IUser } from "../../interfaces";

export type Tmp = Pick<IUser,
  "password" |
  "roleNames" |
  "isActive" |
  "allowedLeaveDay" |
  "branch" |
  "morningStartAt" |
  "morningEndAt" |
  "afternoonStartAt" |
  "afternoonEndAt" |
  "morningWorking" |
  "afternoonWorking" |
  "userName" |
  "emailAddress" |
  "type" |
  "name" |
  "surname" |
  "salary" |
  "isWorkingTimeDefault">

export interface CreateUserDTO extends Tmp { };
