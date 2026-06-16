import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import PaymentService from './payment.service';

const CreatePayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.CreatePayment(req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.CREATED, message: 'Payment recorded successfully', data: result });
});

const GetAllPayments = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await PaymentService.GetAllPayments(req.query as any, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Payments retrieved successfully', meta, data });
});

const GetSinglePayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.GetSinglePayment(req.params.id, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Payment retrieved successfully', data: result });
});

const UpdatePayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.UpdatePayment(req.params.id, req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Payment updated successfully', data: result });
});

const DeletePayment = catchAsync(async (req: Request, res: Response) => {
  await PaymentService.DeletePayment(req.params.id);
  sendResponse(res, { success: true, statusCode: httpStatus.NO_CONTENT });
});

const PaymentController = { CreatePayment, GetAllPayments, GetSinglePayment, UpdatePayment, DeletePayment };
export default PaymentController;
