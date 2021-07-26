import { Document } from 'mongoose';
import { Branch, Level, Sex, Type } from '../constants';
import { IBase } from './BaseInterface';

export interface IUser extends IBase, Document {
    id: number
    userName: string
    name: string
    surname: string
    fullName: string
    emailAddress: string
    phoneNumber: string
    address: string
    isActive: boolean
    roleNames: [
        string
    ]
    password: string
    type: Type
    jobTitle: string
    level: Level
    registerWorkDay: string
    allowedLeaveDay: number
    startDateAt: string
    salary: number
    salaryAt: string
    userCode: string
    managerId: number
    branch: Branch
    sex: Sex
    morningWorking: string
    morningStartAt: string
    morningEndAt: string
    afternoonWorking: string
    afternoonStartAt: string
    afternoonEndAt: string
    isWorkingTimeDefault: boolean
    avatarPath: string
}
