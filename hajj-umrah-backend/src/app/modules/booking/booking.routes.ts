import { Router } from 'express';
import { UserRole } from '@prisma/client';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import BookingController from './booking.controller';
import BookingValidation from './booking.validation';

const router = Router();

router.post(
  '/',
  auth(UserRole.USER, UserRole.ADMIN),
  validateRequest(BookingValidation.CreateBookingSchema),
  BookingController.CreateBooking,
);
router.get('/', auth(UserRole.USER, UserRole.ADMIN), BookingController.GetAllBookings);
router.get('/:id', auth(UserRole.USER, UserRole.ADMIN), BookingController.GetSingleBooking);
router.patch(
  '/:id',
  auth(UserRole.ADMIN),
  validateRequest(BookingValidation.UpdateBookingSchema),
  BookingController.UpdateBooking,
);
router.delete('/:id', auth(UserRole.ADMIN), BookingController.DeleteBooking);

export const BookingRoutes = router;
