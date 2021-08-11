import { Document } from "mongoose";
import { IBase } from "./BaseInterface";

export interface IUserDetails extends IBase, Document {
  userId: number
  date: string,
  registrationTimeStart: string,
  registrationTimeEnd: string,
  checkIn: string,
  checkOut: string,
  resultCheckIn: number,
  resultCheckOut: number,
  editByUserId: number,
  status: any,
  userNote: string,
  noteReply: string
}