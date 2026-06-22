import { Router } from 'express';
import { UserRole } from '@prisma/client';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import InvoiceController from './invoice.controller';
import InvoiceValidation from './invoice.validation';

const router = Router();

router.get('/', auth(UserRole.USER, UserRole.ADMIN), InvoiceController.GetAllInvoices);
router.get('/:id', auth(UserRole.USER, UserRole.ADMIN), InvoiceController.GetSingleInvoice);
router.post(
  '/',
  auth(UserRole.ADMIN),
  validateRequest(InvoiceValidation.CreateInvoiceSchema),
  InvoiceController.CreateInvoice,
);
router.patch(
  '/:id',
  auth(UserRole.ADMIN),
  validateRequest(InvoiceValidation.UpdateInvoiceSchema),
  InvoiceController.UpdateInvoice,
);
router.patch('/:id/mark-paid', auth(UserRole.ADMIN), InvoiceController.MarkPaid);
router.delete('/:id', auth(UserRole.ADMIN), InvoiceController.DeleteInvoice);

export const InvoiceRoutes = router;
