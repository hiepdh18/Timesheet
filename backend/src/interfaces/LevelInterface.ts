import { Document } from 'mongoose';
import { IBase } from '../interfaces';

export interface ILevel extends IBase, Document {
  name: string;
}