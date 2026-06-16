import { Router } from 'express';
import { UserRole } from '@prisma/client';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import InquiryController from './inquiry.controller';
import InquiryValidation from './inquiry.validation';

const router = Router();

// Public submit
router.post('/', validateRequest(InquiryValidation.CreateInquirySchema), InquiryController.CreateInquiry);

// Admin manage
router.get('/', auth(UserRole.ADMIN), InquiryController.GetAllInquiries);
router.get('/:id', auth(UserRole.ADMIN), InquiryController.GetSingleInquiry);
router.patch(
  '/:id',
  auth(UserRole.ADMIN),
  validateRequest(InquiryValidation.UpdateInquirySchema),
  InquiryController.UpdateInquiry,
);
router.delete('/:id', auth(UserRole.ADMIN), InquiryController.DeleteInquiry);

export const InquiryRoutes = router;
