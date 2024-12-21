import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const register = catchAsync(async (req, res) => {
  const result = await AuthServices.register(req.body);

  sendResponse(res, {
    success: true,
    message: 'User registered succesfully',
    statusCode: 201,
    data: {
      _id: result.id,
      name: result.name,
      email: result.email,
    },
  });
});

const login = catchAsync(async (req, res) => {
  const result = await AuthServices.login(req.body);

  sendResponse(res, {
    success: true,
    message: 'Login succesfull',
    statusCode: 200,
    data: {
      token: result.accessToken,
    },
  });
});

export const AuthControllers = {
  register,
  login,
};
