import { Router } from 'express';
import { AdminController } from './admin.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from '../User/user.validations';

const router = Router();
router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  validateRequest(UserValidations.updateUserValidationSchema),
  AdminController.blockUser,
);
router.delete('/blogs/:id', auth(USER_ROLE.admin), AdminController.deleteBlog);
export const AdminRoutes = router;
