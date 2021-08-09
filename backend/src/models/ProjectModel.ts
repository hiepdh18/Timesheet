import { model, Schema, Types, Model } from 'mongoose'
import { schemaOption } from '../constants'
import { ProjectStatus, ProjectType } from '../constants/Enums';
import { IProject } from '../interfaces'

export interface IProjectModel extends Model<IProject> { };

const ProjectSchema: Schema = new Schema({
  _id: Types.ObjectId,
  id: { type: Number },
  name: { type: String },
  code: { type: String },
  status: { type: ProjectStatus },
  timeStart: { type: String },
  timeEnd: { type: String },
  note: { type: String },
  projectType: { type: ProjectType },
  customerId: { type: Number },
  projectTargetUsers: [],
  isAllUserBelongTo: { type: Boolean },
}, schemaOption);

export const Project: IProjectModel = model<IProject, IProjectModel>('Project', ProjectSchema, 'projects')