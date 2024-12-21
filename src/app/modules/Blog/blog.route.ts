import { Router } from 'express';
import { BlogController } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BlogValidations.createBlogValidationSchema),
  BlogController.createBlog,
);

router.get('/', BlogController.getAllBlogs);
router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(BlogValidations.updateBlogValidationSchema),
  BlogController.updateBlog,
);
router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  BlogController.deleteBlog,
);

export const BlogRoutes = router;
