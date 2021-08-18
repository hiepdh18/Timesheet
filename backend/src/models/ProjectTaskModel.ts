import { model, Schema, Types, Model } from 'mongoose'
import { schemaOption } from '../constants'
import { IProjectTask } from '../interfaces'

export interface IProjectTaskModel extends Model<IProjectTask> { };

export const ProjectTaskSchema: Schema = new Schema({
  _id: Types.ObjectId,
  id: { type: Number, require: true, unique: true },
  projectId: Number,
  taskId: Number,
  billable: Boolean

}, schemaOption);

export const ProjectTask: IProjectTaskModel = model<IProjectTask, IProjectTaskModel>('ProjectTask', ProjectTaskSchema, 'project_tasks')