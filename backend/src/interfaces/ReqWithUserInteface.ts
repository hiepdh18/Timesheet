import {  IUser } from './UserInterface';
import { Request } from 'express';

export interface IRequestWithUser extends Request {
    user: IUser;
}
