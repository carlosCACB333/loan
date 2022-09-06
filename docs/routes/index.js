"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const auth_1 = require("./auth");
const contract_1 = require("./contract");
const user_1 = require("./user");
exports.router = express_1.default.Router();
const apiRouter = express_1.default.Router();
// las apis
apiRouter.use('/auth', auth_1.authRouter);
apiRouter.use('/user', middlewares_1.authenticate, user_1.userRouter);
apiRouter.use('/contract', middlewares_1.authenticate, contract_1.contractRouter);
apiRouter.use('*', (_req, res) => {
    res.status(404).json({ message: 'Not found' });
});
exports.router.use('/api/v1', apiRouter);
// ruta general
exports.router.get('*', (req, res) => {
    res.send('Bienvenido a la api de prestamos ');
});
