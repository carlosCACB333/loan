import express from 'express';
import { Contract } from '../services/';
import { validatorFieds } from '../utils';
import { addOperationSchema, createContractSchema } from '../schemas';

const router = express.Router();

router.get('/', (_req, res, next) => {
  Contract.findAll()
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

router.post('/:id/operations', validatorFieds(addOperationSchema), (req, res, next) => {
  Contract.addOperation(req.params.id, req.body)
    .then((contract) => res.json(contract))
    .catch(next);
});

export { router as contractRouter };
