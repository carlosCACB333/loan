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
    static async findAll(id) {
        //  const contracts=this.model
        //    .find({
        //      $and: [
        //        {
        //          $or: [{ lender: id }, { borrower: id }],
        //        },
        //        {
        //          status: { $ne: 'deleted' },
        //        },
        //      ],
        //    })
        //    .populate('lender')
        //    .populate('borrower')
        //    .sort({ 'operations.[createdAt]': -1 })
        //    .exec();
        const uid = new mongoose_1.default.Types.ObjectId(id);
        const contracts = await this.model.aggregate([
            {
                $match: {
                    $and: [
                        {
                            $or: [{ lender: uid }, { borrower: uid }],
                        },
                        {
                            status: { $ne: 'deleted' },
                        },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'lender',
                    foreignField: '_id',
                    as: 'lender',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'borrower',
                    foreignField: '_id',
                    as: 'borrower',
                },
            },
            {
                $unwind: '$lender',
            },
            {
                $unwind: '$borrower',
            },
            {
                $unwind: '$operations',
            },
            {
                $sort: {
                    'operations.createdAt': -1,
                },
            },
            {
                $group: {
                    _id: '$_id',
                    lender: { $first: '$lender' },
                    borrower: { $first: '$borrower' },
                    name: { $first: '$name' },
                    status: { $first: '$status' },
                    operations: { $push: '$operations' },
                    createdAt: { $first: '$createdAt' },
                    updatedAt: { $first: '$updatedAt' },
                    interest: { $first: '$interest' },
                    term: { $first: '$term' },
                },
            },
            {
                $sort: {
                    createdAt: -1,
                },
            },
        ]);
        return contracts;
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
        const ct = await this.model.create(contract);
        return await this.findById(ct.id);
    }
    static async addOperation(id, operation) {
        const contract = await this.model.findById(id).populate('lender').populate('borrower').exec();
        if (!contract) {
            throw new utils_1.HttpError('El contrato no existe', 404);
        }
        contract.operations.push(operation);
        await contract.save();
        const op = contract.operations[contract.operations.length - 1];
        return op;
    }
    static async deleteContract(id) {
        const contract = await this.model.findById(id);
        if (!contract) {
            throw new utils_1.HttpError('El contrato no existe', 404);
        }
        contract.status = 'deleted';
        await contract.save();
        return contract.id;
    }
    static async updateContractName(id, name) {
        const contract = await this.model.findById(id);
        if (!contract) {
            throw new utils_1.HttpError('El contrato no existe', 404);
        }
        contract.name = name;
        await contract.save();
        return contract;
    }
    static async inactivateContract(id) {
        const contract = await this.model.findById(id).populate('lender').populate('borrower').exec();
        if (!contract) {
            throw new utils_1.HttpError('El contrato no existe', 404);
        }
        contract.status = 'inactive';
        await contract.save();
        return contract;
    }
    static async deleteOperation(id, operationId) {
        const contract = await this.model.findById(id);
        if (!contract) {
            throw new utils_1.HttpError('El contrato no existe', 404);
        }
        contract.operations = contract.operations.filter((op) => op.id !== operationId);
        await contract.save();
        return contract.id;
    }
}
exports.Contract = Contract;
Contract.model = contract_1.Contract;
