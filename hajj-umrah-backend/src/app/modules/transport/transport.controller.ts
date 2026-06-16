import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import TransportService from './transport.service';

const CreateTransport = catchAsync(async (req: Request, res: Response) => {
  const result = await TransportService.CreateTransport(req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.CREATED, message: 'Transport created successfully', data: result });
});

const GetAllTransports = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await TransportService.GetAllTransports(req.query as any);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Transports retrieved successfully', meta, data });
});

const GetSingleTransport = catchAsync(async (req: Request, res: Response) => {
  const result = await TransportService.GetSingleTransport(req.params.id);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Transport retrieved successfully', data: result });
});

const UpdateTransport = catchAsync(async (req: Request, res: Response) => {
  const result = await TransportService.UpdateTransport(req.params.id, req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Transport updated successfully', data: result });
});

const DeleteTransport = catchAsync(async (req: Request, res: Response) => {
  await TransportService.DeleteTransport(req.params.id);
  sendResponse(res, { success: true, statusCode: httpStatus.NO_CONTENT });
});

const TransportController = { CreateTransport, GetAllTransports, GetSingleTransport, UpdateTransport, DeleteTransport };
export default TransportController;
