import { ProjectMemberType, TimeSheetStatus, TypeOfWork } from "../../constants";
import { IResponse } from "../../interfaces";

interface Project {
  projectName: string,
  customerName: string,
  projectCode: string,
  projectUserType: ProjectMemberType,
  listPM: string[],
  tasks:
  {
    projectTaskId: number,
    taskName: string,
    billable: false
  }[],
  targetUsers: [],
  id: number
}

export interface GetProjectIncludingTaskResDTO extends IResponse {
  result: Project[]
}
