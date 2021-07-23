import { Document } from 'mongoose';
import { IBase } from './BaseInterface';

export interface IUser extends IBase, Document {
    _id: string;
    username: string;
    password: string;
    email: string;
    name: string;
    surName: string;
    sex: string;
    code: string;
    isActive: string;
    isStopWorking: string;
    salary: string;
    salary_at: string;
}
