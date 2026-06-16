import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import FlightService from './flight.service';

const CreateFlight = catchAsync(async (req: Request, res: Response) => {
  const result = await FlightService.CreateFlight(req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.CREATED, message: 'Flight created successfully', data: result });
});

const GetAllFlights = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await FlightService.GetAllFlights(req.query as any);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Flights retrieved successfully', meta, data });
});

const GetSingleFlight = catchAsync(async (req: Request, res: Response) => {
  const result = await FlightService.GetSingleFlight(req.params.id);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Flight retrieved successfully', data: result });
});

const UpdateFlight = catchAsync(async (req: Request, res: Response) => {
  const result = await FlightService.UpdateFlight(req.params.id, req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Flight updated successfully', data: result });
});

const DeleteFlight = catchAsync(async (req: Request, res: Response) => {
  await FlightService.DeleteFlight(req.params.id);
  sendResponse(res, { success: true, statusCode: httpStatus.NO_CONTENT });
});

const FlightController = { CreateFlight, GetAllFlights, GetSingleFlight, UpdateFlight, DeleteFlight };
export default FlightController;
