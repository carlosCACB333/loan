"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContractNameSchema = exports.addOperationSchema = exports.createContractSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const contract_1 = require("../interfaces/contract");
const joiMessages_1 = require("../utils/joiMessages");
const auth_1 = require("./auth");
const name = joi_1.default.string().min(3).messages(joiMessages_1.messages);
const status = joi_1.default.string().valid('active', 'inactive', 'pending', 'expired').messages(joiMessages_1.messages);
const interest = joi_1.default.number().min(0).max(100).messages(joiMessages_1.messages);
const term = joi_1.default.date().messages(joiMessages_1.messages);
const amount = joi_1.default.number().messages(joiMessages_1.messages);
const opType = joi_1.default.string()
    .valid(...contract_1.OperationTypes)
    .messages(joiMessages_1.messages);
const description = joi_1.default.string().messages(joiMessages_1.messages);
const operations = joi_1.default.array()
    .items(joi_1.default.object({
    amount: amount.required(),
    description,
}))
    .messages(joiMessages_1.messages);
exports.createContractSchema = joi_1.default.object({
    name: name.required(),
    borrower: (0, auth_1.uid)().required().messages(joiMessages_1.messages),
    interest,
    term,
    operations: operations.required(),
}).messages(joiMessages_1.messages);
exports.addOperationSchema = joi_1.default.object({
    amount: amount.required(),
    type: opType.required(),
    description,
}).messages(joiMessages_1.messages);
exports.updateContractNameSchema = joi_1.default.object({
    name: name.required(),
}).messages(joiMessages_1.messages);
