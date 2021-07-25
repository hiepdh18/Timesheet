import { Document } from 'mongoose';
import { IBase } from '../interfaces';

export interface IBranch extends IBase, Document {
  name: string;
}