import { IResponse, IUser } from '../../interfaces';
type User = Omit<IUser, 'password'>
export interface CreateUserResDTO extends IResponse {
  result: User
};
