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
/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *   description: use to login
 *  responses:
 *  '200':
 *  description: A successful login
 */
router.post('/login', (0, utils_1.validatorFieds)(schemas_1.loginSchema), (req, res, next) => {
    const { email, password } = req.body;
    services_1.Auth.login(email, password)
        .then((credential) => res.json(credential))
        .catch(next);
});
router.post('/signup', (0, utils_1.validatorFieds)(schemas_1.signupSchema), (req, res, next) => {
    services_1.Auth.signup(req.body)
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
router.patch('/change-password', middlewares_1.authenticate, (0, utils_1.validatorFieds)(schemas_1.changePasswordSchema), (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user._id;
    services_1.Auth.changePassword(userId, oldPassword, newPassword)
        .then((credential) => res.json(credential))
        .catch(next);
});
router.put('/update-profile', middlewares_1.authenticate, (0, utils_1.validatorFieds)(schemas_1.updateProfileSchema), (req, res, next) => {
    const userId = req.user._id;
    const token = req.token;
    services_1.Auth.updateProfile(userId, req.body)
        .then((credential) => res.json({ user: credential, token }))
        .catch(next);
});
