import { IError } from "../../interfaces";

export interface SubmitTimeSheetResDTO {
  result: string
  targetUrl: string
  success: boolean
  error: IError
  unAuthorizedRequest: boolean
  __abp: boolean
}
