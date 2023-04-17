import express from 'express';
import { authenticate } from '../middlewares';
import { authRouter } from './auth';
import { contractRouter } from './contract';
import { userRouter } from './user';

export const router = express.Router();
const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', authenticate, userRouter);
apiRouter.use('/contracts', authenticate, contractRouter);

apiRouter.use('*', (_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

router.use('/api/v1', apiRouter);

// ruta general
router.get('*', (req, res) => {
  res.send(`<h1>Bienvenido a loan api</h1>`);
});
