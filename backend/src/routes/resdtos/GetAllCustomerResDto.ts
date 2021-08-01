import { ICustomer, IResponse } from "../../interfaces";

export interface GetAllCustomerResDTO extends IResponse {
  result: {
    totalCount: number,
    items: ICustomer[]
  }
}
