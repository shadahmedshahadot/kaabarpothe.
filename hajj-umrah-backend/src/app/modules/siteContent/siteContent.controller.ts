import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import SiteContentService from './siteContent.service';

const GetHero = catchAsync(async (_req: Request, res: Response) => {
  const result = await SiteContentService.GetHero();
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Hero content retrieved successfully', data: result });
});

const UpsertHero = catchAsync(async (req: Request, res: Response) => {
  const result = await SiteContentService.UpsertHero(req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Hero content updated successfully', data: result });
});

const SiteContentController = { GetHero, UpsertHero };
export default SiteContentController;
