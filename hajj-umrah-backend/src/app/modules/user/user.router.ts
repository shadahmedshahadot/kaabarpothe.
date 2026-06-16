import { Router } from 'express'
import { UserController } from './user.controller'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'
import validateRequest from '../../middlewares/validateRequest'
import { parseFormData } from '../../middlewares/parseFormData'
import UserValidation from './user.validation'

const router = Router()

const userFormData = parseFormData({
  folder: 'avatars',
  avatar: true,
})

// Current-user profile
router.get('/me', auth(UserRole.USER, UserRole.ADMIN), UserController.GetMe)
router.patch(
  '/me',
  auth(UserRole.USER, UserRole.ADMIN),
  ...userFormData,
  validateRequest(UserValidation.UpdateUserSchema),
  UserController.UpdateMe,
)

// Admin CRUD
router.get('/', auth(UserRole.ADMIN), UserController.GetAllUsers)
router.post(
  '/',
  auth(UserRole.ADMIN),
  ...userFormData,
  validateRequest(UserValidation.CreateUserSchema),
  UserController.CreateUser,
)
router
  .route('/:id')
  .get(auth(UserRole.ADMIN), UserController.GetSingleUser)
  .patch(
    auth(UserRole.USER, UserRole.ADMIN),
    ...userFormData,
    validateRequest(UserValidation.UpdateUserSchema),
    UserController.UpdateUser,
  )
  .delete(auth(UserRole.ADMIN), UserController.DeleteUser)

export const userRouter = router
