import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from '../User/user.validations';
import { AuthValidations } from './auth.validations';

const router = Router();

router.post(
  '/register',
  validateRequest(UserValidations.createUserValidationSchema),
  AuthControllers.register,
);

router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.login,
);

export const AuthRoutes = router;
