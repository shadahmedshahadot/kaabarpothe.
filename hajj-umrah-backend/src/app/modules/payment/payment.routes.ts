import { Router } from 'express';
import { UserRole } from '@prisma/client';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import PaymentController from './payment.controller';
import PaymentValidation from './payment.validation';

const router = Router();

router.get('/', auth(UserRole.USER, UserRole.ADMIN), PaymentController.GetAllPayments);
router.get('/:id', auth(UserRole.USER, UserRole.ADMIN), PaymentController.GetSinglePayment);
router.post(
  '/',
  auth(UserRole.ADMIN),
  validateRequest(PaymentValidation.CreatePaymentSchema),
  PaymentController.CreatePayment,
);
router.patch(
  '/:id',
  auth(UserRole.ADMIN),
  validateRequest(PaymentValidation.UpdatePaymentSchema),
  PaymentController.UpdatePayment,
);
router.delete('/:id', auth(UserRole.ADMIN), PaymentController.DeletePayment);

export const PaymentRoutes = router;
