import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import BookingService from './booking.service';

const CreateBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.CreateBooking(req.body, req.user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Booking request submitted successfully. Our team will review your request shortly.',
    data: result,
  });
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
  const result = await BookingService.UpdateBooking(req.params.id, req.body, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Booking updated successfully', data: result });
});

const DeleteBooking = catchAsync(async (req: Request, res: Response) => {
  await BookingService.DeleteBooking(req.params.id, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.NO_CONTENT });
});

const UpdateStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.UpdateStatus(req.params.id, req.body, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Status updated', data: result });
});

const AssignConsultant = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.AssignConsultant(req.params.id, req.body, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Consultant assigned', data: result });
});

const RequestDocuments = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.RequestDocuments(req.params.id, req.body, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.CREATED, message: 'Documents requested', data: result });
});

const UploadDocument = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.UploadDocument(req.params.id, req.body, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.CREATED, message: 'Document uploaded', data: result });
});

const VerifyDocument = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.VerifyDocument(req.params.id, req.params.documentId, req.body, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Document updated', data: result });
});

const SendMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.SendMessage(req.params.id, req.body, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.CREATED, message: 'Message sent', data: result });
});

const ListMessages = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.ListMessages(req.params.id, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, data: result });
});

const ListTimeline = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.ListTimeline(req.params.id, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, data: result });
});

const ListDocuments = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.ListDocuments(req.params.id, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, data: result });
});

const ListActivityLog = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.ListActivityLog(req.params.id);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, data: result });
});

const ListStatusHistory = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.ListStatusHistory(req.params.id, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, data: result });
});

const UpdateAdminNotes = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.UpdateAdminNotes(req.params.id, req.body, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Notes updated', data: result });
});

const AssignFlight = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.AssignFlight(req.params.id, req.body.flightId, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Flight assigned', data: result });
});

const AssignHotel = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.AssignHotel(req.params.id, req.body.hotelId, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Hotel assigned', data: result });
});

const AssignTransport = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.AssignTransport(req.params.id, req.body.transportId, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Transport assigned', data: result });
});

const UpdatePayment = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.UpdatePayment(req.params.id, req.body, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Payment updated', data: result });
});

const UpdateVisa = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.UpdateVisa(req.params.id, req.body, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Visa updated', data: result });
});

const BookingController = {
  CreateBooking,
  GetAllBookings,
  GetSingleBooking,
  UpdateBooking,
  DeleteBooking,
  UpdateStatus,
  AssignConsultant,
  RequestDocuments,
  UploadDocument,
  VerifyDocument,
  SendMessage,
  ListMessages,
  ListTimeline,
  ListDocuments,
  ListActivityLog,
  ListStatusHistory,
  UpdateAdminNotes,
  AssignFlight,
  AssignHotel,
  AssignTransport,
  UpdatePayment,
  UpdateVisa,
};
export default BookingController;
