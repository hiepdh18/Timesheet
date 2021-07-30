import { IResponse, IUser } from '../../interfaces';
type User = Omit<IUser,'password'>
export interface CreateUserResultDTO extends IResponse {
  result: User
};
