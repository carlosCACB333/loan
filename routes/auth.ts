import express from 'express';
import { authenticate } from '../middlewares';
import { signupSchema, loginSchema, changePasswordSchema, updateProfileSchema } from '../schemas';
import { Auth } from '../services';
import { validatorFieds } from '../utils';

const router = express.Router();

router.post('/signup', validatorFieds(signupSchema), (req, res, next) => {
  Auth.signup(req.body)
    .then((credential) => res.json(credential))
    .catch(next);
});

router.post('/login', validatorFieds(loginSchema), (req, res, next) => {
  const { email, password } = req.body;
  Auth.login(email, password)
    .then((credential) => res.json(credential))
    .catch(next);
});

router.get('/check', authenticate, (req: any, res, next) => {
  const user = req.user;
  const token = req.token;
  res.json({ user, token });
});

router.get('/renew', authenticate, (req: any, res, next) => {
  const token = req.token;
  Auth.renewToken(token)
    .then((credential) => res.json(credential))
    .catch(next);
});

router.patch('/change-password', authenticate, validatorFieds(changePasswordSchema), (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const userId = (req as any).user._id;
  Auth.changePassword(userId, oldPassword, newPassword)
    .then((credential) => res.json(credential))
    .catch(next);
});

router.put('/update-profile', authenticate, validatorFieds(updateProfileSchema), (req, res, next) => {
  const userId = (req as any).user._id;
  Auth.updateProfile(userId, req.body)
    .then((credential) => res.json(credential))
    .catch(next);
});

export { router as authRouter };
