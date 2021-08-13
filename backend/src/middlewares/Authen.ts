import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IResponse } from '../interfaces';
import userRepository from "../repositories/UserRepository";

export const authen = async (req: Request, res: Response, next: NextFunction) => {
  let response: IResponse = {
    result: null,
    targetUrl: null,
    success: true,
    error: null,
    unAuthorizedRequest: false,
    __abp: true
  }
  try {
    if (!req.headers.authorization) return res.status(200).json(response);

    const token = req.headers.authorization.split(" ")[1];
    let decoded = await jwt.verify(token, process.env.JWT_KEY);
    // const decoded = await jwt.verify(token, process.env.JWT_KEY);
    req.currentUser = await userRepository.findById(decoded.id);
    next()
  } catch (err) {
    console.log(err)
    res.status(403).json(response)
  }
}
