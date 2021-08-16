import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IResponse } from '../interfaces';
import userRepository from "../repositories/UserRepository";

export const authen = async (req: Request, res: Response, next: NextFunction) => {
  let response: IResponse = {
    result: null,
    targetUrl: null,
    success: false,
    error: {
      code: 0,
      message: 'Current user did not login to the application!',
      details: null,
      validationErrors: null
    },
    unAuthorizedRequest: true,
    __abp: true
  };
  console.log("HELLO")

  try {
    console.log("HELLO")

    if (!req.headers.authorization) throw new Error();
    const token = req.headers.authorization.split(" ")[1];
    let decoded = await jwt.verify(token, process.env.JWT_KEY);
    req.currentUser = await userRepository.findById(decoded.id);
    console.log(req.currentUser)
    next();
  } catch (err) {
    res.status(401).json(response);
  }
}
