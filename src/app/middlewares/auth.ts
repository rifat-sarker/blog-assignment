import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/User/user.interface';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/User/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // checking if token is missing or not found
    if (!authHeader) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Cannot find Bearer in the token',
      );
    }

    const token = authHeader.split(' ')[1];

    // checking if token is  valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { email, role } = decoded;
    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    // checking if the user is blocked
    const userStatus = user?.isBlocked;
    if (userStatus === true) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
