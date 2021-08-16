import { model, Schema, Types, Model } from 'mongoose'
import { schemaOption } from '../constants'
import { ICustomer } from '../interfaces';

export interface ICustomerModel extends Model<ICustomer> { };

const CustomerSchema: Schema = new Schema({
  _id: Types.ObjectId,
  id: { type: Number, require: true, unique: true },
  name: { type: String, require: true },
  address: String
}, schemaOption);

export const Customer: ICustomerModel = model<ICustomer, ICustomerModel>('Customer', CustomerSchema, 'customers');