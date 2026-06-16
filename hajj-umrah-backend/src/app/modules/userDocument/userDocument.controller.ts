import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import UserDocumentService from './userDocument.service';

const CreateDocument = catchAsync(async (req: Request, res: Response) => {
  const result = await UserDocumentService.CreateDocument(req.body, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.CREATED, message: 'Document uploaded successfully', data: result });
});

const GetMyDocuments = catchAsync(async (req: Request, res: Response) => {
  const result = await UserDocumentService.GetMyDocuments(req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Documents retrieved successfully', data: result });
});

const GetUserDocuments = catchAsync(async (req: Request, res: Response) => {
  const result = await UserDocumentService.GetUserDocuments(req.params.userId);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Documents retrieved successfully', data: result });
});

const GetSingleDocument = catchAsync(async (req: Request, res: Response) => {
  const result = await UserDocumentService.GetSingleDocument(req.params.id, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Document retrieved successfully', data: result });
});

const UpdateDocument = catchAsync(async (req: Request, res: Response) => {
  const result = await UserDocumentService.UpdateDocument(req.params.id, req.body, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Document updated successfully', data: result });
});

const DeleteDocument = catchAsync(async (req: Request, res: Response) => {
  await UserDocumentService.DeleteDocument(req.params.id, req.user);
  sendResponse(res, { success: true, statusCode: httpStatus.NO_CONTENT });
});

const UserDocumentController = {
  CreateDocument,
  GetMyDocuments,
  GetUserDocuments,
  GetSingleDocument,
  UpdateDocument,
  DeleteDocument,
};
export default UserDocumentController;
