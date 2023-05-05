"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const services_1 = require("../services");
const authenticate = async (req, _res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '') || '';
        const user = await services_1.Auth.findUserByToken(token);
        req.user = user;
        req.token = token;
        next();
    }
    catch (error) {
        return next(error);
    }
};
exports.authenticate = authenticate;
