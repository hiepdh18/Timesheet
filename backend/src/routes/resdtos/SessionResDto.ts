import { IResponse, IUser } from "../../interfaces";

export interface SessionResDTO extends IResponse {
  result: {
    application: {
      version: string,
      releaseDate: string,
      features: {},
    },
    user: object | null,
    tenant: null,
  }
}
