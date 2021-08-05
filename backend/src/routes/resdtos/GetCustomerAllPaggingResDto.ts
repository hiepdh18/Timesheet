import { ICustomer, IResponse } from "../../interfaces";

export interface GetCustomerAllPaggingResDTO extends IResponse {
  result: {
    totalCount: number,
    items: ICustomer[]
  }
}
