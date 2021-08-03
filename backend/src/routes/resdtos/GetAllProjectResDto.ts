import { ProjectDTO } from "./ProjectDto";
import { IError, IResponse } from "../../interfaces";

export interface GetAllProjectResDTO extends IResponse {
  result: ProjectDTO[],
  error: IError
}