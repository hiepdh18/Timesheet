import { IResponse } from '../../interfaces';

export interface AuthenticateResultDTO extends IResponse {
  result : {
    accessToken: string
    encryptedAccessToken: string
    expireInSeconds: number
    userId: number
  }
};
