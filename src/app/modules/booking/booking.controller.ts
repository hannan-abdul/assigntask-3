import { Response } from 'express';
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { BookingService } from './booking.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const createBooking = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
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
    const bookingData = {
      customer,
      service,
      slot,
      vehicleType,
      vehicleBrand,
      vehicleModel,
      manufacturingYear,
      registrationPlate,
    };
    console.log(customer);

    const result = await BookingService.createBookingIntoDB(bookingData);

    res.status(200).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Booking successfully',
      data: result,
    });
  },
);

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getAllBookingFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Bookings retrieved succesfully',
    data: result,
  });
});

const getUserBookings = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const customerId = req.userId;
    const bookings = await BookingService.getBookingsByUser(customerId);

    // Remove the `customer` field from each booking object
    const formattedBookings = bookings.map((booking) => {
      const { customer, ...bookingWithoutCustomer } = booking.toObject();
      return bookingWithoutCustomer;
    });
    // const customerId = req.userId;
    // const result = await BookingService.getBookingsByUser(customerId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User bookings retrieved successfully',
      data: formattedBookings,
    });
  },
);

// const getAllBookings = async (req: Request, res: Response) => {
//   try {
//     const result = await BookingService.getAllBookingFromDB();
//     res.status(200).json({
//       success: true,
//       message: 'All Booking retrieved successfully',
//       date: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || 'Something went wrong',
//       error: err,
//     });
//   }
// };

export const BookingController = {
  createBooking,
  getAllBookings,
  getUserBookings,
};