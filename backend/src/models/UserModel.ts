import { model, Schema, Types, Model } from 'mongoose'
import { Branch, Level, schemaOption, Sex, UserType } from '../constants'
import { IUser } from '../interfaces'

export interface IUserModel extends Model<IUser> { };

export const UserSchema: Schema = new Schema({
  _id: Types.ObjectId,
  id: { type: Number, require: true, unique: true },
  userName: { type: String, require: true },
  name: { type: String, require: true },
  surname: { type: String, require: true },
  fullName: { type: String, require: true },
  emailAddress: { type: String, require: true, unique: true },
  phoneNumber: { type: String },
  address: { type: String },
  isActive: { type: Boolean },
  roleNames: [
    String
  ],
  password: { type: String, require: true },
  type: { type: UserType },
  jobTitle: { type: String },
  level: { type: Level },
  registerWorkDay: { type: String },
  allowedLeaveDay: { type: String },
  startDateAt: { type: String },
  salary: { type: Number },
  salaryAt: { type: String },
  userCode: { type: String },
  managerId: { type: Number },
  branch: { type: Branch },
  sex: { type: Sex },
  morningWorking: { type: String },
  morningStartAt: { type: String },
  morningEndAt: { type: String },
  afternoonWorking: { type: String },
  afternoonStartAt: { type: String },
  afternoonEndAt: { type: String },
  isWorkingTimeDefault: { type: Boolean },
  avatarPath: { type: String },
}, schemaOption);

export const User: IUserModel = model<IUser, IUserModel>('User', UserSchema, 'users');