import httpStatus, { NOT_FOUND } from 'http-status';
import AppError from '../../errors/AppError';
import { SlotModel } from './../slot/slot.model';
import { TBooking } from './booking.interface';
import { BookingModel } from './booking.model';

const createBookingIntoDB = async (payload: TBooking) => {
  const booking = await BookingModel.create(payload);
  await SlotModel.findByIdAndUpdate(booking.slot, { isBooked: 'booked' });

  const result = await BookingModel.findById(booking._id)
    .populate('customer', 'name email phone address')
    .populate('service', 'name description price duration isDeleted')
    .populate('slot');

  return result;
};

const getAllBookingFromDB = async () => {
  const result = await BookingModel.find()
    .populate('customer', 'name email phone address')
    .populate('service', 'name description price duration isDeleted')
    .populate('slot');
  return result;
};

const getBookingsByUser = async (userId: string) => {
  const result = await BookingModel.find({ customer: userId })
    .populate('service', 'name description price duration isDeleted')
    .populate('slot');
  return result;
};

export const BookingService = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getBookingsByUser,
};
