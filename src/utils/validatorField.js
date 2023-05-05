"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorFieds = void 0;
const httpError_1 = require("./httpError");
const parserError_1 = require("./parserError");
const validatorFieds = (schema, errIn = 'body') => {
    return (req, _, next) => {
        const { error } = schema.validate(req[errIn], { abortEarly: false });
        if (error) {
            const e = error.details ? (0, parserError_1.parseErrors)(error.details) : undefined;
            return next(new httpError_1.HttpError(error.message, 400, 'JoiSchemaError', e));
        }
        next();
    };
};
exports.validatorFieds = validatorFieds;
