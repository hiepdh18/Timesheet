import { Document } from 'mongoose';
import { Branch, Level, Sex, UserType } from '../constants';
import { Role } from '../constants/Enums';
import { IBase } from './BaseInterface';

export interface IUser extends IBase, Document {
    id: number//
    userName: string//
    name: string//
    surname: string//
    fullName: string
    emailAddress: string//
    phoneNumber: string//
    address: string//
    isActive: boolean//
    isStopWork: boolean//
    roleNames: string[]//
    password: string
    type: UserType//
    jobTitle: string
    level: Level//
    allowedLeaveDay: number//
    startDateAt: string
    salary: number//
    salaryAt: string//
    userCode: string//
    managerId: number
    branch: Branch//
    sex: Sex//
    morningWorking: string//
    morningStartAt: string//
    morningEndAt: string//
    afternoonWorking: string//
    afternoonStartAt: string//
    afternoonEndAt: string//
    isWorkingTimeDefault: boolean//
    registerWorkDay: string
    avatarPath: string
}
