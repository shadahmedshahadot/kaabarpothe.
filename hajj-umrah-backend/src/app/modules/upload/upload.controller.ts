import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import AppError from '../../errors/AppError'
import { sendImageCloudinary } from '../../utils/sendImageToCloudinary'

const resolveFolder = (raw: unknown): string => {
  const allowed = [
    'packages',
    'hotels',
    'flights',
    'transports',
    'blogs',
    'avatars',
    'documents',
    'site',
    'misc',
  ]
  const v = typeof raw === 'string' ? raw : 'misc'
  return allowed.includes(v) ? `hajj-umrah/${v}` : 'hajj-umrah/misc'
}

const Single = catchAsync(async (req: Request, res: Response) => {
  const file = req.file
  if (!file) throw new AppError(httpStatus.BAD_REQUEST, 'No file uploaded')
  const folder = resolveFolder(req.body?.folder)
  const result = await sendImageCloudinary(file.buffer, file.originalname, folder)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'File uploaded successfully',
    data: {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    },
  })
})

const Multiple = catchAsync(async (req: Request, res: Response) => {
  const files = (req.files as Express.Multer.File[]) ?? []
  if (!files.length) throw new AppError(httpStatus.BAD_REQUEST, 'No files uploaded')
  const folder = resolveFolder(req.body?.folder)
  const uploaded = await Promise.all(
    files.map(f => sendImageCloudinary(f.buffer, f.originalname, folder)),
  )
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Files uploaded successfully',
    data: uploaded.map(r => ({
      url: r.secure_url,
      publicId: r.public_id,
      width: r.width,
      height: r.height,
      format: r.format,
      bytes: r.bytes,
    })),
  })
})

const UploadController = { Single, Multiple }
export default UploadController
