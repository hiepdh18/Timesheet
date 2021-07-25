import { model, Schema, Types, Model } from 'mongoose'
import { schemaOption } from '../constants'
import { IUserType } from '../interfaces'

export interface IUserTypeModel extends Model<IUserType> { };

const UserTypeSchema: Schema = new Schema({
  _id: Types.ObjectId,
  name: {
    type: String,
    require: true,
    unique: true
  }
}, schemaOption);

export const UserType: IUserTypeModel = model<IUserType, IUserTypeModel>('UserType', UserTypeSchema, 'user_types');
