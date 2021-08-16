import { model, Schema, Types, Model } from 'mongoose'
import { schemaOption } from '../constants'
import { IRole } from '../interfaces'

export interface IRoleModel extends Model<IRole> { };

const RoleSchema: Schema = new Schema({
  _id: Types.ObjectId,
  id: { type: Number, require: true, unique: true },
  name: {
    type: String,
    require: true,
    unique: true
  },
  displayName: { type: String },
  normalizedName: { type: String },
  description: { type: String },
}, schemaOption);

export const Role: IRoleModel = model<IRole, IRoleModel>('Role', RoleSchema, 'roles');