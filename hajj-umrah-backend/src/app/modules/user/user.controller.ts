import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const CreateUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.CreateUser(req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.CREATED, message: 'User created successfully', data: result });
});

const GetAllUsers = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await UserService.GetAllUsers(req.query as any);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Users retrieved successfully', meta, data });
});

const GetSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.GetSingleUser(req.params.id);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'User retrieved successfully', data: result });
});

const GetMe = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.GetMe(req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Profile retrieved successfully', data: result });
});

const UpdateUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.UpdateUser(req.params.id, req.body, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'User updated successfully', data: result });
});

const UpdateMe = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.UpdateUser(req.user.id, req.body, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Profile updated successfully', data: result });
});

const DeleteUser = catchAsync(async (req: Request, res: Response) => {
  await UserService.DeleteUser(req.params.id);
  sendResponse(res, { success: true, statusCode: httpStatus.NO_CONTENT });
});

export const UserController = {
  CreateUser,
  GetAllUsers,
  GetSingleUser,
  GetMe,
  UpdateUser,
  UpdateMe,
  DeleteUser,
};
