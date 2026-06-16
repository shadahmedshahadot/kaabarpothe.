import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import HotelService from './hotel.service';

const CreateHotel = catchAsync(async (req: Request, res: Response) => {
  const result = await HotelService.CreateHotel(req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.CREATED, message: 'Hotel created successfully', data: result });
});

const GetAllHotels = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await HotelService.GetAllHotels(req.query as any);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Hotels retrieved successfully', meta, data });
});

const GetSingleHotel = catchAsync(async (req: Request, res: Response) => {
  const result = await HotelService.GetSingleHotel(req.params.id);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Hotel retrieved successfully', data: result });
});

const UpdateHotel = catchAsync(async (req: Request, res: Response) => {
  const result = await HotelService.UpdateHotel(req.params.id, req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Hotel updated successfully', data: result });
});

const DeleteHotel = catchAsync(async (req: Request, res: Response) => {
  await HotelService.DeleteHotel(req.params.id);
  sendResponse(res, { success: true, statusCode: httpStatus.NO_CONTENT });
});

const HotelController = { CreateHotel, GetAllHotels, GetSingleHotel, UpdateHotel, DeleteHotel };
export default HotelController;
