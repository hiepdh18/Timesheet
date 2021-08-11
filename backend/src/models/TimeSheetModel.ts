import { model, Schema, Types, Model } from 'mongoose'
import { schemaOption } from '../constants'
import { TimeSheetStatus, TypeOfWork } from '../constants/Enums';
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
  note: String,
  targetUserWorkingTime: Number,
  typeOfWork: { type: TypeOfWork },
  isCharged: Boolean,
  projectTargetUserId: Number,
}, schemaOption);

export const TimeSheet: ITimeSheetModel = model<ITimeSheet, ITimeSheetModel>('TimeSheet', TimeSheetSchema, 'time_sheets')