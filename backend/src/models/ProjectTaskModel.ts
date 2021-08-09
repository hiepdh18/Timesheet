import { model, Schema, Types, Model } from 'mongoose'
import { schemaOption } from '../constants'
import { IProjectTask } from '../interfaces'

export interface IProjectTaskModel extends Model<IProjectTask> { };

const ProjectTaskSchema: Schema = new Schema({
  _id: Types.ObjectId,
  id: { type: Number },
  projectId: Number,
  taskId: Number

}, schemaOption);

export const ProjectTask: IProjectTaskModel = model<IProjectTask, IProjectTaskModel>('ProjectTask', ProjectTaskSchema, 'project_tasks')