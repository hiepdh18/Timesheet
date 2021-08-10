import { IResponse, ITask } from "../../interfaces";

export interface GetAllTaskResDTO extends IResponse {
  result: ITask[]
}
