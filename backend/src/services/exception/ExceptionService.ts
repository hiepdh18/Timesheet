import { HttpError } from './HttpError'
import { IResponse } from '../../interfaces/'
import { Request, Response, NextFunction } from 'express'
import { logger } from '../logger';

export const handleError = (error: HttpError, req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(error);
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong!!!'
    const resError: IResponse = {
      result: null,
      targetUrl: null,
      success: false,
      error: {
        code: status,
        message,
        details: error.stack,
        validationErrors: null
      },
      unAuthorizedRequest: false,
      __abp: true
    };
    logger.error(resError)
    res.status(status).json({ ...resError })
  } catch (error) {
    next(error)
  }
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
  return res.json()
}
