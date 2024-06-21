import { TUser } from './user.interface';
import { UserModel } from './user.model';
import bcrypt from 'bcrypt';

const createUserIntoDB = async (payload: TUser) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  payload.password = hashedPassword;
  const result = await UserModel.create(payload);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
