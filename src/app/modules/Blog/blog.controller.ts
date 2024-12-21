import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const { title, content } = req.body;
  const user = req.user;

  const blogData: TBlog = {
    title,
    content,
    author: user._id,
  };

  // Save the blog in the database
  const blog = await BlogServices.createBlogIntoDB(blogData);
  const responseData = {
    _id: blog._id,
    title: blog.title,
    content: blog.content,
    author: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
  sendResponse(res, {
    success: true,
    message: 'Blog created succesfully',
    statusCode: 201,
    data: responseData,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  // console.log(req.query);
  const result = await BlogServices.getAllBlogsFromDB(req.query);
  sendResponse(res, {
    success: true,
    message: 'Blogs fetched succesfully',
    statusCode: 200,
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  // console.log(req.user);
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
