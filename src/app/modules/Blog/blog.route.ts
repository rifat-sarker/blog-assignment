import { Router } from 'express';
import { BlogController } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';

const router = Router();

router.post(
  '/',
  validateRequest(BlogValidations.createBlogValidationSchema),
  BlogController.createBlog,
);

export const BlogRoutes = router;
