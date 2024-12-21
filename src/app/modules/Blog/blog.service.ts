import QueryBuilder from '../../builder/QueryBuilder';
import { searchableFields } from './blog.constant';

import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find(), query)
    .search(searchableFields)
    .sortBy()
    .sortOrder()
    .fields();
  const result = await blogQuery.modelQuery;
  return result;
};

const updateBlogFromDB = async (id: string, payload: Partial<TBlog>) => {
  const result = await Blog.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id, { isPublished: false });
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  updateBlogFromDB,
  deleteBlogFromDB,
};
