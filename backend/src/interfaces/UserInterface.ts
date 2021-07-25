import { Document } from 'mongoose';
import { IBase } from './BaseInterface';

export interface IUser extends IBase, Document {
    name: string
    username: string
    password: string
    email: string
    surname: string
    sex: string
    avatar: string
    code: string
    isActive: boolean
    isStopWorking: boolean
    salary: number
    salary_at: Date
    start_at: Date
    phone: string
    address: string
    branch: string
    manager: string
    role: string
    type: string
    level: string
}
