import { NextFunction, Response } from 'express';
import { Auth } from '../services';

export const authenticate = async (req: any, _res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '') || '';
    const user = await Auth.findUserByToken(token);
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    return next(error);
  }
};
