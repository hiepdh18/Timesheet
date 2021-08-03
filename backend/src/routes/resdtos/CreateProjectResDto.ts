import { IError, IProject, IResponse } from "../../interfaces";

export interface CreateProjectResDTO extends IResponse {
  result:IProject,
  error: IError
}