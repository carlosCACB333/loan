"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const httpError_1 = require("../utils/httpError");
const errorHandler = (err, _req, res, _next) => {
    const error = {
        status: 500,
        error: err.name,
        message: err.message,
    };
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        // validamos los errores de mongoose
        error.status = 400;
        error.fields = {};
        for (const [key, value] of Object.entries(err.errors)) {
            if (value instanceof mongoose_1.default.Error.ValidatorError) {
                error.fields[key] = value.message;
            }
        }
    }
    if (err instanceof httpError_1.HttpError) {
        // Errores de validación de campos
        error.status = err.status;
        error.fields = err.fields;
        error.message = err.message;
        error.error = err.error;
    }
    res.status(error.status).json(error);
};
exports.errorHandler = errorHandler;
