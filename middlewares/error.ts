import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { IError } from '../interfaces';
import { HttpError } from '../utils/httpError';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const error: IError = {
    status: 500,
    error: err.name,
    message: err.message,
  };

  if (err instanceof mongoose.Error.ValidationError) {
    // validamos los errores de mongoose
    error.status = 400;
    error.fields = {};
    for (const [key, value] of Object.entries(err.errors)) {
      if (value instanceof mongoose.Error.ValidatorError) {
        error.fields[key] = value.message;
      }
    }
  }

  if (err instanceof HttpError) {
    // Errores de validación de campos
    error.status = err.status;
    error.fields = err.fields;
    error.message = err.message;
    error.error = err.error;
  }

  res.status(error.status).json(error);
};
