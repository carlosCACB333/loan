"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractRouter = void 0;
const express_1 = __importDefault(require("express"));
const services_1 = require("../services/");
const utils_1 = require("../utils");
const schemas_1 = require("../schemas");
const router = express_1.default.Router();
exports.contractRouter = router;
router.get('/', (_req, res, next) => {
    services_1.Contract.findAll()
        .then((contracts) => res.json(contracts))
        .catch(next);
});
router.get('/:id', (req, res, next) => {
    services_1.Contract.findById(req.params.id)
        .then((contract) => res.json(contract))
        .catch(next);
});
router.post('/', (0, utils_1.validatorFieds)(schemas_1.createContractSchema), (req, res, next) => {
    services_1.Contract.create({ ...req.body, lender: req.user._id })
        .then((contract) => res.json(contract))
        .catch(next);
});
router.post('/:id/operations', (0, utils_1.validatorFieds)(schemas_1.addOperationSchema), (req, res, next) => {
    services_1.Contract.addOperation(req.params.id, req.body)
        .then((contract) => res.json(contract))
        .catch(next);
});
