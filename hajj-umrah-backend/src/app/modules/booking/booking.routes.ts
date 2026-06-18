import { Router } from 'express';
import { UserRole } from '@prisma/client';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import BookingController from './booking.controller';
import BookingValidation from './booking.validation';

const router = Router();

// Customer booking submission + listing
router.post(
  '/',
  auth(UserRole.USER, UserRole.ADMIN),
  validateRequest(BookingValidation.CreateBookingSchema),
  BookingController.CreateBooking,
);
router.get('/', auth(UserRole.USER, UserRole.ADMIN), BookingController.GetAllBookings);
router.get('/:id', auth(UserRole.USER, UserRole.ADMIN), BookingController.GetSingleBooking);

// User/admin updates (admin can fully edit; user PATCH guarded inside service)
router.patch(
  '/:id',
  auth(UserRole.ADMIN),
  validateRequest(BookingValidation.UpdateBookingSchema),
  BookingController.UpdateBooking,
);
router.delete('/:id', auth(UserRole.ADMIN), BookingController.DeleteBooking);

// Admin workflow actions
router.patch(
  '/:id/status',
  auth(UserRole.ADMIN),
  validateRequest(BookingValidation.UpdateStatusSchema),
  BookingController.UpdateStatus,
);
router.patch(
  '/:id/assign-consultant',
  auth(UserRole.ADMIN),
  validateRequest(BookingValidation.AssignConsultantSchema),
  BookingController.AssignConsultant,
);
router.post(
  '/:id/documents/request',
  auth(UserRole.ADMIN),
  validateRequest(BookingValidation.RequestDocumentsSchema),
  BookingController.RequestDocuments,
);
router.post(
  '/:id/documents/upload',
  auth(UserRole.USER, UserRole.ADMIN),
  validateRequest(BookingValidation.UploadDocumentSchema),
  BookingController.UploadDocument,
);
router.patch(
  '/:id/documents/:documentId/verify',
  auth(UserRole.ADMIN),
  validateRequest(BookingValidation.VerifyDocumentSchema),
  BookingController.VerifyDocument,
);
router.patch(
  '/:id/notes',
  auth(UserRole.ADMIN),
  validateRequest(BookingValidation.UpdateNotesSchema),
  BookingController.UpdateAdminNotes,
);
router.patch('/:id/assign-flight', auth(UserRole.ADMIN), BookingController.AssignFlight);
router.patch('/:id/assign-hotel', auth(UserRole.ADMIN), BookingController.AssignHotel);
router.patch('/:id/assign-transport', auth(UserRole.ADMIN), BookingController.AssignTransport);
router.patch(
  '/:id/payment',
  auth(UserRole.ADMIN),
  validateRequest(BookingValidation.UpdatePaymentSchema),
  BookingController.UpdatePayment,
);
router.patch(
  '/:id/visa',
  auth(UserRole.ADMIN),
  validateRequest(BookingValidation.UpdateVisaSchema),
  BookingController.UpdateVisa,
);

// Messaging + read endpoints
router.get('/:id/messages', auth(UserRole.USER, UserRole.ADMIN), BookingController.ListMessages);
router.post(
  '/:id/messages',
  auth(UserRole.USER, UserRole.ADMIN),
  validateRequest(BookingValidation.SendMessageSchema),
  BookingController.SendMessage,
);
router.get('/:id/timeline', auth(UserRole.USER, UserRole.ADMIN), BookingController.ListTimeline);
router.get('/:id/documents', auth(UserRole.USER, UserRole.ADMIN), BookingController.ListDocuments);
router.get('/:id/activity-log', auth(UserRole.ADMIN), BookingController.ListActivityLog);
router.get('/:id/status-history', auth(UserRole.USER, UserRole.ADMIN), BookingController.ListStatusHistory);

export const BookingRoutes = router;
