import { TimeSheetStatus, TypeOfWork } from "../../constants";
import { IResponse } from "../../interfaces";

interface Role {
  name: string,
  displayName: string,
  normalizedName: string,
  description: string,
  id: number
}

export interface GetRolesResDTO extends IResponse {
  result: {
    items: Role[]
  }
}
