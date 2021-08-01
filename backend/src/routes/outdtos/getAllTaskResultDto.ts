import { TaskType } from "../../constants/Enums";
import { IResponse, ITask } from "../../interfaces";

export interface GetAllTaskResultDTO extends IResponse {
  result:  ITask[]
}
