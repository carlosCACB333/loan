"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const contract_1 = require("../models/contract");
const utils_1 = require("../utils");
class Contract {
    static async findAll() {
        return this.model.find().populate('lender').populate('borrower').exec();
    }
    static async findById(id) {
        const uid = new mongoose_1.default.mongo.ObjectId(id);
        return this.model.findById(uid).populate('lender').populate('borrower').exec();
    }
    static async create(contract) {
        const borrower = await models_1.User.findById(contract.borrower).lean();
        if (!borrower) {
            throw new utils_1.HttpError('El prestatario no existe ', 404);
        }
        contract.status = 'active';
        const operation = contract.operations[0];
        operation.type = 'loan';
        contract.operations = [operation];
        return await this.model.create(contract);
    }
    static async addOperation(id, operation) {
        const contract = await this.model.findById(id).populate('lender').populate('borrower').exec();
        if (!contract) {
            throw new utils_1.HttpError('El contrato no existe', 404);
        }
        contract.operations.push(operation);
        return await contract.save();
    }
}
exports.Contract = Contract;
Contract.model = contract_1.Contract;
