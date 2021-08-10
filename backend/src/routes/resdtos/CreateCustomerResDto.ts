import { ICustomer, IResponse } from '../../interfaces';
export interface CreateCustomerResDTO extends IResponse {
  result: ICustomer
};
