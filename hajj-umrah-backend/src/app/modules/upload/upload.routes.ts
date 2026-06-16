import { Router } from 'express'
import { UserRole } from '@prisma/client'
import auth from '../../middlewares/auth'
import { upload } from '../../utils/sendImageToCloudinary'
import UploadController from './upload.controller'

const router = Router()

router.post(
  '/single',
  auth(UserRole.USER, UserRole.ADMIN),
  upload.single('file'),
  UploadController.Single,
)

router.post(
  '/multiple',
  auth(UserRole.USER, UserRole.ADMIN),
  upload.array('files', 20),
  UploadController.Multiple,
)

export const UploadRoutes = router
