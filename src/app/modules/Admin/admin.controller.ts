import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  //   console.log(userId);
  await AdminServices.blockUserIntoDB(userId);
  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: 200,
    data: '',
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  await AdminServices.deleteBlogFromDB(id);
  sendResponse(res, {
    success: true,
    message: 'Blog deleted succesfully',
    statusCode: 200,
    data: '',
    // data: result,
  });
});

export const AdminController = {
  blockUser,
  deleteBlog,
};
