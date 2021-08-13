import { IError } from "./ErrorInterface";

export interface IResponse {
  result: object | string
  targetUrl: string
  success: boolean
  error: IError
  unAuthorizedRequest: boolean
  __abp: boolean
};