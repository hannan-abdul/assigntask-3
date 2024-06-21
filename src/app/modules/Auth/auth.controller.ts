import { Request, Response } from 'express';
import { AuthServices } from './auth.service';

const loginUser = async (req: Request, res: Response) => {
  try {
    // const zodParseData = orderValidationSchema.parse(order);
    const { user, accessToken } = await AuthServices.loginUser(req.body);
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      address: user.address,
    };
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User logged in successfully',
      token: accessToken,
      data: userResponse,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};
export const AuthController = {
  loginUser,
};
