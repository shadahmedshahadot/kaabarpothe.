import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import FaqService from './faq.service';

const CreateFaq = catchAsync(async (req: Request, res: Response) => {
  const result = await FaqService.CreateFaq(req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.CREATED, message: 'FAQ created successfully', data: result });
});

const GetAllFaqs = catchAsync(async (req: Request, res: Response) => {
  const result = await FaqService.GetAllFaqs(req.query as any);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'FAQs retrieved successfully', data: result });
});

const GetCategories = catchAsync(async (_req: Request, res: Response) => {
  const result = await FaqService.GetCategories();
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'FAQ categories retrieved successfully', data: result });
});

const GetSingleFaq = catchAsync(async (req: Request, res: Response) => {
  const result = await FaqService.GetSingleFaq(req.params.id);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'FAQ retrieved successfully', data: result });
});

const UpdateFaq = catchAsync(async (req: Request, res: Response) => {
  const result = await FaqService.UpdateFaq(req.params.id, req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'FAQ updated successfully', data: result });
});

const DeleteFaq = catchAsync(async (req: Request, res: Response) => {
  await FaqService.DeleteFaq(req.params.id);
  sendResponse(res, { success: true, statusCode: httpStatus.NO_CONTENT });
});

const FaqController = { CreateFaq, GetAllFaqs, GetCategories, GetSingleFaq, UpdateFaq, DeleteFaq };
export default FaqController;
