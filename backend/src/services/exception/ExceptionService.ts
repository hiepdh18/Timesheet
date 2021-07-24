import { HttpError } from './HttpError'
import { IResError } from '../../interfaces/'
import { Request, Response, NextFunction } from 'express'
import { logger } from '../logger';

export const handleError = (error: HttpError, req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(error);
    const name: string = error.name || 'Internal server error!';
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong!!!'
    const resError: IResError = {
      name,
      status,
      message,
      timestamp: new Date(Date.now()).toLocaleDateString()
    };
    logger.error(resError)
    res.status(status).json({ ...resError })
  } catch (error) {
    next(error)
  }
};

export const handleNotfound = (req: Request, res: Response) => {
  const resError: IResError = {
    name: 'Page not found!!!',
    status: 404,
    message: `${req.method} ${req.url} not found!!!`,
    timestamp: new Date(Date.now()).toLocaleDateString()
  }
  return res.json()
}
