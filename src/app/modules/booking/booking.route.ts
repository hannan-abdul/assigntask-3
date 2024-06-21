import express from 'express';
import { BookingController } from './booking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();
router.post('/booking', auth(USER_ROLE.user), BookingController.createBooking);
router.get('/booking', auth(USER_ROLE.admin), BookingController.getAllBookings);
router.get(
  '/my-bookings',
  auth(USER_ROLE.user),
  BookingController.getUserBookings,
);

export const BookingRoutes = router;
