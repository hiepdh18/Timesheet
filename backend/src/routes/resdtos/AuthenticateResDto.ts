import { IResponse } from '../../interfaces';

export interface AuthenticateResDTO extends IResponse {
  result: {
    accessToken: string
    encryptedAccessToken: string
    expireInSeconds: number
    userId: number
  },
};
