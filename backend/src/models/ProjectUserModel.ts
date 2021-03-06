import { model, Schema, Types, Model } from 'mongoose'
import { ProjectMemberType, schemaOption } from '../constants'
import { IProjectUser } from '../interfaces'

export interface IProjectUserModel extends Model<IProjectUser> { };

export const ProjectUserSchema: Schema = new Schema({
  _id: Types.ObjectId,
  id: { type: Number, require: true, unique: true },
  projectId: Number,
  userId: Number,
  type: { type: ProjectMemberType }


}, schemaOption);

export const ProjectUser: IProjectUserModel = model<IProjectUser, IProjectUserModel>('ProjectUser', ProjectUserSchema, 'project_users');