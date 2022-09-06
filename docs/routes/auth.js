"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
const services_1 = require("../services");
const utils_1 = require("../utils");
const router = express_1.default.Router();
exports.authRouter = router;
router.post('/signup', (0, utils_1.validatorFieds)(schemas_1.signupSchema), (req, res, next) => {
    services_1.Auth.signup(req.body)
        .then((credential) => res.json(credential))
        .catch(next);
});
router.post('/login', (0, utils_1.validatorFieds)(schemas_1.loginSchema), (req, res, next) => {
    const { email, password } = req.body;
    services_1.Auth.login(email, password)
        .then((credential) => res.json(credential))
        .catch(next);
});
router.get('/check', middlewares_1.authenticate, (req, res, next) => {
    const user = req.user;
    const token = req.token;
    res.json({ user, token });
});
router.get('/renew', middlewares_1.authenticate, (req, res, next) => {
    const token = req.token;
    services_1.Auth.renewToken(token)
        .then((credential) => res.json(credential))
        .catch(next);
});
