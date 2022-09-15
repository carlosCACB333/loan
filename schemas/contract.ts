import Joi from 'joi';
import { IContract, IOperation, OperationTypes } from '../interfaces/contract';
import { messages } from '../utils/joiMessages';
import { uid } from './auth';

const name = Joi.string().min(3).messages(messages);
const status = Joi.string().valid('active', 'inactive', 'pending', 'expired').messages(messages);
const interest = Joi.number().min(0).max(100).messages(messages);
const term = Joi.date().messages(messages);
const amount = Joi.number().messages(messages);

const opType = Joi.string()
  .valid(...OperationTypes)
  .messages(messages);

const description = Joi.string().messages(messages);

const operations = Joi.array()
  .items(
    Joi.object<IOperation>({
      amount: amount.required(),
      description,
    })
  )
  .messages(messages);

export const createContractSchema = Joi.object<IContract>({
  name: name.required(),
  borrower: uid().required().messages(messages),
  interest,
  term,
  operations: operations.required(),
}).messages(messages);

export const addOperationSchema = Joi.object<IOperation>({
  amount: amount.required(),
  type: opType.required(),
  description,
}).messages(messages);

export const updateContractNameSchema = Joi.object<IContract>({
  name: name.required(),
}).messages(messages);
