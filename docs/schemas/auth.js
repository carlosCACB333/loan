"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signupSchema = exports.uid = void 0;
const joi_1 = __importDefault(require("joi"));
const joiMessages_1 = require("../utils/joiMessages");
const uid = () => joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/, 'No es un ObjectId válido');
exports.uid = uid;
const firstName = joi_1.default.string().min(3).max(30).messages(joiMessages_1.messages);
const lastName = joi_1.default.string().min(3).max(30).messages(joiMessages_1.messages);
const email = joi_1.default.string()
    .email({ tlds: { allow: false } })
    .messages(joiMessages_1.messages);
const picture = joi_1.default.string().uri().messages(joiMessages_1.messages);
const password = joi_1.default.string().min(4).max(30).messages(joiMessages_1.messages);
exports.signupSchema = joi_1.default.object({
    firstName: firstName.required(),
    lastName: lastName.required(),
    email: email.required(),
    photo: picture,
    password: password.required(),
    passwordConfirmation: password.required().valid(joi_1.default.ref('password')),
}).messages(joiMessages_1.messages);
exports.loginSchema = joi_1.default.object({
    email: email.required(),
    password: password.required(),
}).messages(joiMessages_1.messages);
