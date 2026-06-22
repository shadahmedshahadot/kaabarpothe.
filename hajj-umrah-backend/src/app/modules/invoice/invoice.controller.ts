import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import InvoiceService from './invoice.service';

const CreateInvoice = catchAsync(async (req: Request, res: Response) => {
  const result = await InvoiceService.CreateInvoice(req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.CREATED, message: 'Invoice created successfully', data: result });
});

const GetAllInvoices = catchAsync(async (req: Request, res: Response) => {
  const { data, meta, summary } = await InvoiceService.GetAllInvoices(req.query as any, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Invoices retrieved successfully', meta, data: { items: data, summary } });
});

const GetSingleInvoice = catchAsync(async (req: Request, res: Response) => {
  const result = await InvoiceService.GetSingleInvoice(req.params.id, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Invoice retrieved successfully', data: result });
});

const UpdateInvoice = catchAsync(async (req: Request, res: Response) => {
  const result = await InvoiceService.UpdateInvoice(req.params.id, req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Invoice updated successfully', data: result });
});

const MarkPaid = catchAsync(async (req: Request, res: Response) => {
  const result = await InvoiceService.MarkPaid(req.params.id);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Invoice marked paid', data: result });
});

const DeleteInvoice = catchAsync(async (req: Request, res: Response) => {
  await InvoiceService.DeleteInvoice(req.params.id);
  sendResponse(res, { success: true, statusCode: httpStatus.NO_CONTENT });
});

const InvoiceController = { CreateInvoice, GetAllInvoices, GetSingleInvoice, UpdateInvoice, MarkPaid, DeleteInvoice };
export default InvoiceController;
