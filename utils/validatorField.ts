import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { HttpError } from './httpError';
import { parseErrors } from './parserError';

type ErrorIn = 'body' | 'params' | 'query';

export const validatorFieds = (schema: Joi.ObjectSchema, errIn: ErrorIn = 'body') => {
  return (req: Request, _: Response, next: NextFunction) => {
    const { error } = schema.validate(req[errIn], { abortEarly: false });

    if (error) {
      const e = error.details ? parseErrors(error.details) : undefined;
      return next(new HttpError(error.message, 400, 'JoiSchemaError', e));
    }
    next();
  };
};
