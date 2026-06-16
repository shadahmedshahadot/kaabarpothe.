import { Router } from 'express'
import { UserRole } from '@prisma/client'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { parseFormData } from '../../middlewares/parseFormData'
import FlightController from './flight.controller'
import FlightValidation from './flight.validation'

const router = Router()

const flightFormData = parseFormData({
  folder: 'flights',
  jsonFields: ['transits'],
  numberFields: [
    'seatsTotal',
    'seatsAvailable',
    'price',
    'taxes',
    'discount',
    'rating',
    'reviewsCount',
    'bookingsCount',
  ],
  booleanFields: ['featured'],
})

router.get('/', FlightController.GetAllFlights)
router.get('/:id', FlightController.GetSingleFlight)
router.post(
  '/',
  auth(UserRole.ADMIN),
  ...flightFormData,
  validateRequest(FlightValidation.CreateFlightSchema),
  FlightController.CreateFlight,
)
router.patch(
  '/:id',
  auth(UserRole.ADMIN),
  ...flightFormData,
  validateRequest(FlightValidation.UpdateFlightSchema),
  FlightController.UpdateFlight,
)
router.delete('/:id', auth(UserRole.ADMIN), FlightController.DeleteFlight)

export const FlightRoutes = router
