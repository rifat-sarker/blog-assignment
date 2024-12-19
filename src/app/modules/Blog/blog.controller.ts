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

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB();
  sendResponse(res, {
    success: true,
    message: 'Blogs fetched succesfully',
    statusCode: 200,
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.updateBlogFromDB(id, req.body);
  sendResponse(res, {
    success: true,
    message: 'Blog updated succesfully',
    statusCode: 200,
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  await BlogServices.deleteBlogFromDB(id);
  sendResponse(res, {
    success: true,
    message: 'Blog deleted succesfully',
    statusCode: 200,
    data: '',
    // data: result,
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
