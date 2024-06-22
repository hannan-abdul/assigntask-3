import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { BookingService } from './booking.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { TBooking } from './booking.interface';
import { Types } from 'mongoose';

// interface AuthenticatedRequest extends Request {
//   userId?: string;
// }

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const {
    service,
    slot,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  } = req.body;
  const customer = req.userId;

  if (!customer) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: 'User ID is required to create a booking',
    });
  }
  const bookingData = {
    customer: new Types.ObjectId(customer),
    service: new Types.ObjectId(service),
    slot: new Types.ObjectId(slot),
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  };

  const result = await BookingService.createBookingIntoDB(bookingData);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getAllBookingFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Bookings retrieved succesfully',
    data: result,
  });
});

const getUserBookings = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.userId;

  if (!customerId) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: 'User ID is required to retrieve bookings',
    });
  }
  const bookings = await BookingService.getBookingsByUser(customerId);

  // Remove the `customer` field from each booking object
  const formattedBookings = bookings.map((booking) => {
    const { customer, ...bookingWithoutCustomer } = booking.toObject();
    return bookingWithoutCustomer;
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User bookings retrieved successfully',
    data: formattedBookings,
  });
});

export const BookingController = {
  createBooking,
  getAllBookings,
  getUserBookings,
};
