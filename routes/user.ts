import express from 'express';
import { User } from '../services';

const router = express.Router();

router.get('/', (_req, res, next) => {
  User.findAll()
    .then((users) => res.json(users))
    .catch(next);
});

router.post('/search', (req, res, next) => {
  const { search = '' } = req.body as { search?: string };
  User.search(search)
    .then((users) => res.json(users))
    .catch(next);
});

export { router as userRouter };
