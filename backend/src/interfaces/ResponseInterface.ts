export interface IResponse {
  result:  object | null
  targetUrl: string
  success: boolean
  error: object | null
  unAuthorizedRequest: boolean
  __abp: boolean
};