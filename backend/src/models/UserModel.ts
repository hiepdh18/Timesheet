import { model, Schema, Types, Model } from 'mongoose'
import { schemaOption } from '../constants'
import { IUser } from '../interfaces'

export interface IUserModel extends Model<IUser> { };

const UserSchema: Schema = new Schema({
  _id: Types.ObjectId,
  name: { type: String, require: true },
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  surname: { type: String, require: true },
  sex: { type: String, require: true },
  avatar: { type: String },
  code: { type: String, require: true, unique: true },
  isActive: { type: String, require: true, default: false },
  isStopWorking: { type: String, require: true, default: false },
  salary: { type: String, require: true },
  salary_at: { type: String, require: true },
  start_at: { type: String, require: true, unique: true },
  phone: { type: String, require: true, default: '' },
  address: { type: String, require: true, default: '' },
  branch: { type: Types.ObjectId, require: true },
  manager: { type: Types.ObjectId, require: true },
  role: { type: Types.ObjectId, require: true },
  type: { type: Types.ObjectId, require: true },
  level: { type: Types.ObjectId, require: true },
}, schemaOption);

export const User: IUserModel = model<IUser, IUserModel>('User', UserSchema, 'users');