import { Blog } from '../Blog/blog.model';
import { User } from '../User/user.model';

const blockUserIntoDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    { _id: id },
    { isBlocked: true },
    {
      new: true,
    },
  );
  return result;
};

const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const AdminServices = {
  blockUserIntoDB,
  deleteBlogFromDB,
};
