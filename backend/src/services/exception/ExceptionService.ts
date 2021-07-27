import { HttpError } from './HttpError';
import { IResponse } from '../../interfaces/';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger';

export const handleError = (error: HttpError, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  const status: number = error.status || 500;
  const message: string = error.message || 'Something went wrong!!!';
  const response: IResponse = {
    result: null,
    targetUrl: null,
    success: false,
    error: {
      code: status,
      message :error.message,
      details: error.stack,
      validationErrors: null
    },
    unAuthorizedRequest: false,
    __abp: true
  };
  logger.error(response);
  return res.status(status).json(response);
};

export const handleNotfound = (req: Request, res: Response) => {
  const response: IResponse = {
    result: null,
    targetUrl: null,
    success: false,
    error: {
      code: 404,
      message: `${req.method} ${req.url} not found!!!`,
      details: null,
      validationErrors: null
    },
    unAuthorizedRequest: false,
    __abp: true
  }
  logger.error(response);
  return res.json(response);
}
