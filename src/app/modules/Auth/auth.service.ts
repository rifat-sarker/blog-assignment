import httpStatus from 'http-status';
import { IUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { ILoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import AppError from '../../errors/AppError';
import { createToken } from './auth.utils';
import config from '../../config';

const register = async (payload: IUser) => {
//   payload.role = 'admin';
  const result = await User.create(payload);
  return result;
};

const login = async (payload: ILoginUser) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  //   console.log({ user });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is blocked
  const userStatus = user?.isBlocked;

  if (userStatus == true) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  //checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  //create token and sent to the  client
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );
  return { accessToken, refreshToken, jwtPayload };
};

export const AuthServices = {
  register,
  login,
};
