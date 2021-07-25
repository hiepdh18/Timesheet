import { model, Schema, Types, Model } from 'mongoose'
import { schemaOption } from '../constants'
import { IRole } from '../interfaces'

export interface IRoleModel extends Model<IRole> { };

const RoleSchema: Schema = new Schema({
  _id: Types.ObjectId,
  name: {
    type: String,
    require: true,
    unique: true
  }
}, schemaOption);

export const Role: IRoleModel = model<IRole, IRoleModel>('Role', RoleSchema, 'roles');