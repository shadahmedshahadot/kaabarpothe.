import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import BlogService from './blog.service';

const CreateBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.CreateBlog(req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.CREATED, message: 'Blog created successfully', data: result });
});

const GetAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await BlogService.GetAllBlogs(req.query as any);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Blogs retrieved successfully', meta, data });
});

const GetSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.GetSingleBlog(req.params.id);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Blog retrieved successfully', data: result });
});

const UpdateBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.UpdateBlog(req.params.id, req.body);
  sendResponse(res, { success: true, statusCode: httpStatus.OK, message: 'Blog updated successfully', data: result });
});

const DeleteBlog = catchAsync(async (req: Request, res: Response) => {
  await BlogService.DeleteBlog(req.params.id);
  sendResponse(res, { success: true, statusCode: httpStatus.NO_CONTENT });
});

const BlogController = { CreateBlog, GetAllBlogs, GetSingleBlog, UpdateBlog, DeleteBlog };
export default BlogController;
