import { model, Schema, Types, Model } from 'mongoose'
import { schemaOption } from '../constants'
import { ILevel } from '../interfaces'

export interface ILevelModel extends Model<ILevel> { };

const LevelSchema: Schema = new Schema({
  _id: Types.ObjectId,
  name: {
    type: String,
    require: true,
    unique: true
  }
}, schemaOption);

export const Level: ILevelModel = model<ILevel, ILevelModel>('Level', LevelSchema, 'levels');
