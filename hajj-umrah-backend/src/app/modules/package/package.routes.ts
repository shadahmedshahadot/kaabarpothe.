import { Router } from 'express'
import { UserRole } from '@prisma/client'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { parseFormData } from '../../middlewares/parseFormData'
import PackageController from './package.controller'
import PackageValidation from './package.validation'

const router = Router()

const packageFormData = parseFormData({
  folder: 'packages',
  cover: true,
  gallery: true,
  jsonFields: ['itinerary', 'faqs', 'ziyarah', 'included', 'excluded', 'highlights'],
  numberFields: [
    'duration',
    'price',
    'discount',
    'seatsLeft',
    'rating',
    'reviewsCount',
    'bookingsCount',
    'hotelMakkahStars',
    'hotelMadinahStars',
  ],
  booleanFields: ['featured'],
})

router.get('/', PackageController.GetAllPackages)
router.get('/:id', PackageController.GetSinglePackage)
router.post(
  '/',
  auth(UserRole.ADMIN),
  ...packageFormData,
  validateRequest(PackageValidation.CreatePackageSchema),
  PackageController.CreatePackage,
)
router.patch(
  '/:id',
  auth(UserRole.ADMIN),
  ...packageFormData,
  validateRequest(PackageValidation.UpdatePackageSchema),
  PackageController.UpdatePackage,
)
router.delete('/:id', auth(UserRole.ADMIN), PackageController.DeletePackage)

export const PackageRoutes = router
