import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IResponse } from '../interfaces';
import userRepository from "../repositories/UserRepository";

export const author = (role: string) => async (req: Request, res: Response, next: NextFunction) => {
  let response: IResponse = {
    result: null,
    targetUrl: null,
    success: false,
    error: {
      code: 0,
      message: 'Required permissions are not granted. At least one of these permissions must be granted: [ABC]',
      details: null,
      validationErrors: null
    },
    unAuthorizedRequest: true,
    __abp: true
  };
  try {
    let user = req.currentUser;
    console.log(user);
    let check = false;
    for (let r of user.roleNames) {
      if (r === role)
        check = true
    }
    if (!check)
      throw new Error();
    next();
  } catch (err) {
    res.status(403).json(response);
  }
}
