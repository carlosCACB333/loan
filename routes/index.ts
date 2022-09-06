import express from 'express';
import { authenticate } from '../middlewares';
import { authRouter } from './auth';
import { contractRouter } from './contract';
import { userRouter } from './user';

export const router = express.Router();
const apiRouter = express.Router();

// las apis
apiRouter.use('/auth', authRouter);
apiRouter.use('/user', authenticate, userRouter);
apiRouter.use('/contract', authenticate, contractRouter);

apiRouter.use('*', (_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

router.use('/api/v1', apiRouter);

// ruta general
router.get('*', (req, res) => {
  res.send('Bienvenido a la api de prestamos ');
});
