import { Router } from 'express'
import { UserRole } from '@prisma/client'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { parseFormData } from '../../middlewares/parseFormData'
import TransportController from './transport.controller'
import TransportValidation from './transport.validation'

const router = Router()

const transportFormData = parseFormData({
  folder: 'transports',
  cover: true,
  images: true,
  jsonFields: ['serviceCoverage'],
  numberFields: ['capacity', 'price', 'rating', 'reviewsCount', 'bookingsCount'],
  booleanFields: ['featured'],
})

router.get('/', TransportController.GetAllTransports)
router.get('/:id', TransportController.GetSingleTransport)
router.post(
  '/',
  auth(UserRole.ADMIN),
  ...transportFormData,
  validateRequest(TransportValidation.CreateTransportSchema),
  TransportController.CreateTransport,
)
router.patch(
  '/:id',
  auth(UserRole.ADMIN),
  ...transportFormData,
  validateRequest(TransportValidation.UpdateTransportSchema),
  TransportController.UpdateTransport,
)
router.delete('/:id', auth(UserRole.ADMIN), TransportController.DeleteTransport)

export const TransportRoutes = router
