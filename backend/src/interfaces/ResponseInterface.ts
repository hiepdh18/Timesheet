export interface IResponse {
  result: null | object 
  targetUrl: string
  success: boolean
  error: null | object
  unAuthorizedRequest: boolean
  __abp: boolean
};