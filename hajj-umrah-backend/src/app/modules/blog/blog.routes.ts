import { Router } from 'express'
import { UserRole } from '@prisma/client'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { parseFormData } from '../../middlewares/parseFormData'
import BlogController from './blog.controller'
import BlogValidation from './blog.validation'

const router = Router()

const blogFormData = parseFormData({
  folder: 'blogs',
  cover: true,
  jsonFields: ['tags'],
  numberFields: ['readTime', 'views'],
  booleanFields: ['featured'],
})

router.get('/', BlogController.GetAllBlogs)
router.get('/:id', BlogController.GetSingleBlog)
router.post(
  '/',
  auth(UserRole.ADMIN),
  ...blogFormData,
  validateRequest(BlogValidation.CreateBlogSchema),
  BlogController.CreateBlog,
)
router.patch(
  '/:id',
  auth(UserRole.ADMIN),
  ...blogFormData,
  validateRequest(BlogValidation.UpdateBlogSchema),
  BlogController.UpdateBlog,
)
router.delete('/:id', auth(UserRole.ADMIN), BlogController.DeleteBlog)

export const BlogRoutes = router
