import { model, Schema, Types, Model } from 'mongoose'
import { schemaOption } from '../constants'
import { TaskType } from '../constants/Enums';
import { ITask } from '../interfaces'

export interface ITaskModel extends Model<ITask> { };

const TaskSchema: Schema = new Schema({
  _id: Types.ObjectId,

  name: {
    type: String,
    require: true,
    unique: true
  },
  type: { type: TaskType },
  id: { type: Number },
  isDeleted: { type: Number }
}, schemaOption);

export const Task: ITaskModel = model<ITask, ITaskModel>('Task', TaskSchema, 'tasks');