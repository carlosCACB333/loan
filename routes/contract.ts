import express from 'express';
import { Contract } from '../services/';
import { validatorFieds } from '../utils';
import { addOperationSchema, createContractSchema, updateContractNameSchema } from '../schemas';

const router = express.Router();

router.get('/', (_req, res, next) => {
  const userId = (_req as any).user._id;
  Contract.findAll(userId)
    .then((contracts) => res.json(contracts))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Contract.findById(req.params.id)
    .then((contract) => res.json(contract))
    .catch(next);
});

router.post('/', validatorFieds(createContractSchema), (req: any, res, next) => {
  Contract.create({ ...req.body, lender: req.user._id })
    .then((contract) => res.json(contract))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Contract.deleteContract(req.params.id)
    .then((contract) => res.json(contract))
    .catch(next);
});

router.patch('/:id/name', validatorFieds(updateContractNameSchema), (req, res, next) => {
  Contract.updateContractName(req.params.id, req.body.name)
    .then((contract) => res.json(contract))
    .catch(next);
});

router.post('/:id/operations', validatorFieds(addOperationSchema), (req, res, next) => {
  Contract.addOperation(req.params.id, req.body)
    .then((contract) => res.json(contract))
    .catch(next);
});

router.put('/:id/inactivate', (req, res, next) => {
  Contract.inactivateContract(req.params.id)
    .then((contract) => res.json(contract))
    .catch(next);
});

router.delete('/:id/operations/:opId', (req, res, next) => {
  Contract.deleteOperation(req.params.id, req.params.opId)
    .then((contract) => res.json(contract))
    .catch(next);
});

export { router as contractRouter };
