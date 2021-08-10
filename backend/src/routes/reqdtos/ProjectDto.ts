import { IProject, ITask } from "../../interfaces";

export interface ProjectDTO extends IProject {
  tasks: ITask[],
  users: {
    userId: number,
    billable: boolean,
  }[],
  projectTargetUsers: {
    userId: number,
    roleName: string,
  }[]
}