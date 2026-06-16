import { Router } from 'express';
import { UserRole } from '@prisma/client';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import UserDocumentController from './userDocument.controller';
import UserDocumentValidation from './userDocument.validation';

const router = Router();

router.post(
  '/',
  auth(UserRole.USER, UserRole.ADMIN),
  validateRequest(UserDocumentValidation.CreateDocumentSchema),
  UserDocumentController.CreateDocument,
);
router.get('/me', auth(UserRole.USER, UserRole.ADMIN), UserDocumentController.GetMyDocuments);
router.get('/user/:userId', auth(UserRole.ADMIN), UserDocumentController.GetUserDocuments);
router.get('/:id', auth(UserRole.USER, UserRole.ADMIN), UserDocumentController.GetSingleDocument);
router.patch(
  '/:id',
  auth(UserRole.USER, UserRole.ADMIN),
  validateRequest(UserDocumentValidation.UpdateDocumentSchema),
  UserDocumentController.UpdateDocument,
);
router.delete('/:id', auth(UserRole.USER, UserRole.ADMIN), UserDocumentController.DeleteDocument);

export const UserDocumentRoutes = router;
