import { model, Schema, Types, Model } from 'mongoose'
import { schemaOption } from '../constants'
import { Branch, ProjectStatus, ProjectType, TimeSheetStatus, TimeSheetType, TypeOfWork } from '../constants/Enums';
import { IProject } from '../interfaces'
import { ITimeSheet } from '../interfaces/TimeSheetInterface';

export interface ITimeSheetModel extends Model<ITimeSheet> { };

const TimeSheetSchema: Schema = new Schema({
  _id: Types.ObjectId,
  id: Number,
  status: { type: TimeSheetStatus },
  workingTime: Number,
  dateAt: String,
  projectTaskId: Number,
  userId: Number,
  taskId: Number,
  mytimesheetNote: String,
  typeOfWork: { type: TypeOfWork },
  isCharged: Boolean,
  branch: { type: Branch },
  type: { type: TimeSheetType },
  billable: Boolean
}, schemaOption);

export const TimeSheet: ITimeSheetModel = model<ITimeSheet, ITimeSheetModel>('TimeSheet', TimeSheetSchema, 'time_sheets')