import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    message: 'User registered  succesfully',
    statusCode: 201,
    data: result,
  });
});

export const UserControllers = {
  createUser,
};
