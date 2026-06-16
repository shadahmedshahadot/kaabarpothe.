import { Router } from 'express'
import { UserRole } from '@prisma/client'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { parseFormData } from '../../middlewares/parseFormData'
import HotelController from './hotel.controller'
import HotelValidation from './hotel.validation'

const router = Router()

const hotelFormData = parseFormData({
  folder: 'hotels',
  cover: true,
  images: true,
  jsonFields: ['roomTypes', 'facilities'],
  numberFields: ['category', 'totalRooms', 'pricePerNight', 'rating', 'reviewsCount', 'bookingsCount'],
  booleanFields: ['featured'],
})

router.get('/', HotelController.GetAllHotels)
router.get('/:id', HotelController.GetSingleHotel)
router.post(
  '/',
  auth(UserRole.ADMIN),
  ...hotelFormData,
  validateRequest(HotelValidation.CreateHotelSchema),
  HotelController.CreateHotel,
)
router.patch(
  '/:id',
  auth(UserRole.ADMIN),
  ...hotelFormData,
  validateRequest(HotelValidation.UpdateHotelSchema),
  HotelController.UpdateHotel,
)
router.delete('/:id', auth(UserRole.ADMIN), HotelController.DeleteHotel)

export const HotelRoutes = router
