import { IError, IFieldError } from '../interfaces';

export class HttpError extends Error implements IError {
  public message: string;
  public status: number;
  public error: string;
  public fields?: IFieldError;

  constructor(message: string, status = 400, error = 'HttpError', fields?: IFieldError) {
    super(message);
    this.message = message;
    this.status = status;
    this.error = error;
    this.fields = fields;
  }
}
