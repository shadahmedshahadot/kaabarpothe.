import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import NotificationService from './notification.service';

const List = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await NotificationService.List(req.query as any, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, meta, data });
});

const UnreadCount = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationService.UnreadCount(req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, data: result });
});

const MarkRead = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationService.MarkRead(req.params.id, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, data: result });
});

const MarkAllRead = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationService.MarkAllRead(req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, data: result });
});

const Delete = catchAsync(async (req: Request, res: Response) => {
  await NotificationService.Delete(req.params.id, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.NO_CONTENT });
});

const NotificationController = { List, UnreadCount, MarkRead, MarkAllRead, Delete };
export default NotificationController;
