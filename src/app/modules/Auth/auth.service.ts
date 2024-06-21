import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  const isUserExists = await UserModel.findOne({ email: payload?.email });

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This User is not found');
  }

  //   const isPasswordMatched = isUserExists?.password;
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password,
  );

  if (!isPasswordMatched) {
    throw new Error('User password is not matching');
  }
  const jwtPayload = {
    userId: isUserExists.id,
    role: isUserExists.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });
  return { accessToken, user: isUserExists };
};
export const AuthServices = {
  loginUser,
};
