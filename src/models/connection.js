"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conexion = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const consts_1 = require("../consts");
const conexion = async () => {
    try {
        await mongoose_1.default.connect(consts_1.consts.mongoUrl, {});
        console.log('🚀 Connected to database');
    }
    catch (error) {
        console.log(error);
        throw new Error('🟠 Error connecting to database');
    }
};
exports.conexion = conexion;
