import { model, Schema, Types, Model } from 'mongoose'
import { schemaOption } from '../constants'
import { ProjectStatus, ProjectType } from '../constants/Enums';
import { IProject } from '../interfaces'

export interface IProjectModel extends Model<IProject> { };

export const ProjectSchema: Schema = new Schema({
  _id: Types.ObjectId,
  id: { type: Number, require: true, unique: true },
  name: { type: String, require: true },
  code: { type: String },
  status: { type: ProjectStatus },
  timeStart: { type: String },
  timeEnd: { type: String },
  note: { type: String },
  projectType: { type: ProjectType },
  customerId: { type: Number },
  isAllUserBelongTo: { type: Boolean },
}, schemaOption);

export const Project: IProjectModel = model<IProject, IProjectModel>('Project', ProjectSchema, 'projects')