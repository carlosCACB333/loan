"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseErrors = void 0;
const parseErrors = (errors) => {
    const result = {};
    errors.forEach((error) => {
        switch (error.path.length) {
            case 2:
                (result[error.path[0]] = result[error.path[0]] || {})[error.path[1]] = error.message;
                break;
            case 3:
                ((result[error.path[0]] = result[error.path[0]] || {})[error.path[1]] =
                    result[error.path[0]][error.path[1]] || {})[error.path[2]] = error.message;
                break;
            default:
                result[error.path[0]] = error.message;
                break;
        }
    });
    return result;
};
exports.parseErrors = parseErrors;
