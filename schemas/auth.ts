import Joi from 'joi';
import { IUser } from '../interfaces';
import { messages } from '../utils/joiMessages';

export const uid = () => Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'No es un ObjectId válido');

const firstName = Joi.string().min(3).max(30).messages(messages);
const lastName = Joi.string().min(3).max(30).messages(messages);
const email = Joi.string()
  .email({ tlds: { allow: false } })
  .messages(messages);
const picture = Joi.string().uri().messages(messages);
const password = Joi.string().min(4).max(30).messages(messages);

export const signupSchema = Joi.object<IUser & { passwordConfirmation: string }>({
  firstName: firstName.required(),
  lastName: lastName.required(),
  email: email.required(),
  photo: picture,
  password: password.required(),
  passwordConfirmation: password.required().valid(Joi.ref('password')),
}).messages(messages);

export const loginSchema = Joi.object<IUser>({
  email: email.required(),
  password: password.required(),
}).messages(messages);

export const changePasswordSchema = Joi.object<{
  passwordConfirmation: string;
  oldPassword: string;
  newPassword: string;
}>({
  oldPassword: password.required(),
  newPassword: password.required(),
  passwordConfirmation: password.required().valid(Joi.ref('newPassword')),
}).messages(messages);

export const updateProfileSchema = Joi.object<IUser>({
  firstName,
  lastName,
  email,
  photo: picture.allow(''),
}).messages(messages);
