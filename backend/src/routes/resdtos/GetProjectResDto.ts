import { ProjectStatus, ProjectType, UserType } from "../../constants";
import { IResponse } from "../../interfaces";

export interface GetProjectResDTO extends IResponse {
  result: {
    name: string,
    code: string,
    status: ProjectStatus,
    timeStart: string,
    timeEnd: string,
    note: string,
    projectType: ProjectType,
    customerId: number,
    tasks: {
      taskId: 0,
      billable: true,
    }[]
    ,
    users: {
      userId: number,
      type: UserType,
    }[]
    ,
    projectTargetUsers: {
      userId: number,
      roleName: string
    }[]
    ,
    isAllUserBelongTo: boolean,
    id: number
  }

}