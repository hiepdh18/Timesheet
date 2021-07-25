import { Document } from 'mongoose';
import { IBase } from '../interfaces';

export interface IUserType extends IBase, Document {
  name: string;
}