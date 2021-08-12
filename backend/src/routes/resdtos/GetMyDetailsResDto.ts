import { Branch, UserType } from "../../constants";
import { ICustomer, IResponse } from "../../interfaces";

interface Details {
  timekeepingId: number,
  userId: number,
  userName: string,
  userType: UserType,
  userEmail: string,
  avatarPath: string,
  branch: Branch,
  date: string,
  registrationTimeStart: string,
  registrationTimeEnd: string,
  checkIn: string,
  checkOut: string,
  resultCheckIn: number,
  resultCheckOut: number,
  editByUserId: number,
  editByUserName: string,
  status: any,
  userNote: string,
  noteReply: string
}

export interface GetMyDetailsResDTO extends IResponse {
  result: Details[]
}
