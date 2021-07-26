import { IResponse } from "../../interfaces";

export interface SessionResultDTO extends IResponse {
  result: {
    application: {
      version: string,
      releaseDate: string,
      features: {},
    },
    user: null,
    tenant: null,
  }
}
