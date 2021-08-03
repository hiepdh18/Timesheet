import { ProjectStatus, ProjectType } from "../../constants/Enums"

export interface ProjectDTO {
  customerName: string,
  name: string,
  code: string,
  status: ProjectStatus,
  pms: [],
  activeMember: number,
  projectType: ProjectType,
  timeStart: string,
  timeEnd: string,
  id: number
}