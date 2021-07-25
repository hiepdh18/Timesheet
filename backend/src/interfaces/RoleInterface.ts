import { Document } from 'mongoose';
import { IBase } from '../interfaces';

export interface IRole extends IBase, Document {
  name: string;
}