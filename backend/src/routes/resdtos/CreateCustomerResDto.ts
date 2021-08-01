import { ICustomer, IError, IResponse } from '../../interfaces';
export interface CreateCustomerResDTO extends IResponse {
  result: ICustomer,
  error : IError
};
