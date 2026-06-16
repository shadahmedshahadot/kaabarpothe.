import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import TestimonialService from './testimonial.service';

const CreateTestimonial = catchAsync(async (req: Request, res: Response) => {
  const result = await TestimonialService.CreateTestimonial(req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.CREATED, message: 'Testimonial created successfully', data: result });
});

const GetAllTestimonials = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await TestimonialService.GetAllTestimonials(req.query as any);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Testimonials retrieved successfully', meta, data });
});

const GetSingleTestimonial = catchAsync(async (req: Request, res: Response) => {
  const result = await TestimonialService.GetSingleTestimonial(req.params.id);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Testimonial retrieved successfully', data: result });
});

const UpdateTestimonial = catchAsync(async (req: Request, res: Response) => {
  const result = await TestimonialService.UpdateTestimonial(req.params.id, req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Testimonial updated successfully', data: result });
});

const DeleteTestimonial = catchAsync(async (req: Request, res: Response) => {
  await TestimonialService.DeleteTestimonial(req.params.id);
  sendResponse(res, { success: true, statusCode: httpStatus.NO_CONTENT });
});

const TestimonialController = {
  CreateTestimonial,
  GetAllTestimonials,
  GetSingleTestimonial,
  UpdateTestimonial,
  DeleteTestimonial,
};
export default TestimonialController;
