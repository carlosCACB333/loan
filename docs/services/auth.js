"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const consts_1 = require("../consts");
const utils_1 = require("../utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Auth {
}
exports.Auth = Auth;
_a = Auth;
Auth.generateToken = (id) => {
    if (!consts_1.consts.jwt.secret) {
        throw new utils_1.HttpError('No se encontro el secreto del jwt', 500);
    }
    return jsonwebtoken_1.default.sign({ id }, consts_1.consts.jwt.secret, {
        expiresIn: '3h',
    });
};
Auth.verifyToken = (token) => {
    if (!token) {
        throw new utils_1.HttpError('No se envió el token', 400);
    }
    const secrect = consts_1.consts.jwt.secret;
    if (!secrect) {
        throw new utils_1.HttpError('No se encontro el secreto del jwt', 500);
    }
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secrect, (err, decoded) => {
            if (err) {
                reject(new utils_1.HttpError('Token inválido', 401));
            }
            else {
                const { id } = decoded;
                resolve(id);
            }
        });
    });
};
Auth.findById = async (id) => {
    const user = await models_1.User.findById(id);
    if (!user) {
        throw new utils_1.HttpError('Usuario no encontrado', 404);
    }
    return user;
};
Auth.signup = async (user) => {
    user.password = await bcrypt_1.default.hash(user.password, 10);
    const newUser = new models_1.User(user);
    await newUser.save();
    const token = _a.generateToken(newUser.id);
    return { user: newUser, token };
};
Auth.findByEmail = async (email) => {
    const user = await models_1.User.findOne({ email });
    if (!user) {
        throw new utils_1.HttpError('Usuario no encontrado', 404, '', {
            email: 'Usuario no encontrado',
        });
    }
    return user;
};
Auth.login = async (email, password) => {
    const user = await _a.findByEmail(email);
    const isValid = await bcrypt_1.default.compare(password, user.password);
    if (!isValid) {
        throw new utils_1.HttpError('Contraseña incorrecta', 401, '', {
            password: 'Contraseña incorrecta',
        });
    }
    // generar jwt
    const token = _a.generateToken(user.id);
    return { user, token };
};
Auth.renewToken = async (token) => {
    const user = await _a.findUserByToken(token);
    const newToken = _a.generateToken(user.id);
    return { user, token: newToken };
};
Auth.findUserByToken = async (token) => {
    const id = await _a.verifyToken(token);
    const user = await _a.findById(id);
    return user;
};
