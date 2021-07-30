import { ProjectStatus, ProjectType, TaskType } from "../constants/Enums"

export interface IProject {
  name: string,
  code: string,
  status: ProjectStatus,
  timeStart: string
  timeEnd: string,
  note: string,
  projectType: ProjectType,
  customerId: number,
  tasks: [],
  users: [],
  projectTargetUsers: [],
  isAllUserBelongTo: boolean,
  id: number
}