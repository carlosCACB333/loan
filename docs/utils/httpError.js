"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
class HttpError extends Error {
    constructor(message, status = 400, error = 'HttpError', fields) {
        super(message);
        this.message = message;
        this.status = status;
        this.error = error;
        this.fields = fields;
    }
}
exports.HttpError = HttpError;
