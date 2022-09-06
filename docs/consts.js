"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consts = void 0;
exports.consts = {
    port: process.env.PORT || 3000,
    mongoUrl: process.env.MONGO_URL || '',
    jwt: {
        secret: process.env.JWT_SECRET || '',
    },
};
