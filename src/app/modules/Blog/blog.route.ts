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

router.get('/', BlogController.getAllBlogs);
router.patch(
  '/:id',
  validateRequest(BlogValidations.updateBlogValidationSchema),
  BlogController.updateBlog,
);
router.delete('/:id', BlogController.deleteBlog);

export const BlogRoutes = router;
