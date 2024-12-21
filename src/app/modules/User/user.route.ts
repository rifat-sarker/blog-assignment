import { Router } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validations';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = Router();

router.post(
  '/register',
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);

router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUser);
export const UserRoutes = router;
