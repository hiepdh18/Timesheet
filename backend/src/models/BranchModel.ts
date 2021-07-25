import { model, Schema, Types, Model } from 'mongoose'
import { schemaOption } from '../constants'
import { IBranch } from '../interfaces'

export interface IBranchModel extends Model<IBranch> { };

const BranchSchema: Schema = new Schema({
  _id: Types.ObjectId,
  name: {
    type: String,
    require: true,
    unique: true
  }
}, schemaOption);

export const Branch: IBranchModel = model<IBranch, IBranchModel>('Branch', BranchSchema, 'branchs');