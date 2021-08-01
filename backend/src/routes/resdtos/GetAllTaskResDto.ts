import { TaskType } from "../../constants/Enums";
import { IResponse, ITask } from "../../interfaces";

export interface GetAllTaskResDTO extends IResponse {
  result:  ITask[]
}
