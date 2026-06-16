import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import InquiryService from './inquiry.service';

const CreateInquiry = catchAsync(async (req: Request, res: Response) => {
  const result = await InquiryService.CreateInquiry(req.body, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.CREATED, message: 'Inquiry submitted successfully', data: result });
});

const GetAllInquiries = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await InquiryService.GetAllInquiries(req.query as any);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Inquiries retrieved successfully', meta, data });
});

const GetSingleInquiry = catchAsync(async (req: Request, res: Response) => {
  const result = await InquiryService.GetSingleInquiry(req.params.id);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Inquiry retrieved successfully', data: result });
});

const UpdateInquiry = catchAsync(async (req: Request, res: Response) => {
  const result = await InquiryService.UpdateInquiry(req.params.id, req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Inquiry updated successfully', data: result });
});

const DeleteInquiry = catchAsync(async (req: Request, res: Response) => {
  await InquiryService.DeleteInquiry(req.params.id);
  sendResponse(res, { success: true, statusCode: httpStatus.NO_CONTENT });
});

const InquiryController = { CreateInquiry, GetAllInquiries, GetSingleInquiry, UpdateInquiry, DeleteInquiry };
export default InquiryController;
