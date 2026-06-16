import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import BookingService from './booking.service';

const CreateBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.CreateBooking(req.body, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.CREATED, message: 'Booking created successfully', data: result });
});

const GetAllBookings = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await BookingService.GetAllBookings(req.query as any, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Bookings retrieved successfully', meta, data });
});

const GetSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.GetSingleBooking(req.params.id, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Booking retrieved successfully', data: result });
});

const UpdateBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.UpdateBooking(req.params.id, req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Booking updated successfully', data: result });
});

const DeleteBooking = catchAsync(async (req: Request, res: Response) => {
  await BookingService.DeleteBooking(req.params.id);
  sendResponse(res, { success: true, statusCode: httpStatus.NO_CONTENT });
});

const BookingController = { CreateBooking, GetAllBookings, GetSingleBooking, UpdateBooking, DeleteBooking };
export default BookingController;
