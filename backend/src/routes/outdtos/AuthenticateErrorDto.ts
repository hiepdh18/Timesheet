import { IResponse } from '../../interfaces';

export interface AuthenticateErrorDTO extends IResponse {
  error: {
    code: number,
    message: string,
    details: string,
    validationErrors: null
  }
};
