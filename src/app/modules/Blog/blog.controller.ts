import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.createBlogIntoDB(req.body);
  sendResponse(res, {
    success: true,
    message: 'Blog created succesfully',
    statusCode: 201,
    data: result,
  });
});

export const BlogController = {
  createBlog,
};
