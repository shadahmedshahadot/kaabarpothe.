import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import PackageService from './package.service';

const CreatePackage = catchAsync(async (req: Request, res: Response) => {
  const result = await PackageService.CreatePackage(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Package created successfully',
    data: result,
  });
});

const GetAllPackages = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await PackageService.GetAllPackages(req.query as any);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Packages retrieved successfully',
    meta,
    data,
  });
});

const GetSinglePackage = catchAsync(async (req: Request, res: Response) => {
  const result = await PackageService.GetSinglePackage(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Package retrieved successfully',
    data: result,
  });
});

const UpdatePackage = catchAsync(async (req: Request, res: Response) => {
  const result = await PackageService.UpdatePackage(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Package updated successfully',
    data: result,
  });
});

const DeletePackage = catchAsync(async (req: Request, res: Response) => {
  await PackageService.DeletePackage(req.params.id);
  sendResponse(res, { success: true, statusCode: httpStatus.NO_CONTENT });
});

const PackageController = {
  CreatePackage,
  GetAllPackages,
  GetSinglePackage,
  UpdatePackage,
  DeletePackage,
};
export default PackageController;
