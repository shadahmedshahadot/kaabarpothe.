import { Router } from 'express';
import { UserRole } from '@prisma/client';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import FaqController from './faq.controller';
import FaqValidation from './faq.validation';

const router = Router();

router.get('/', FaqController.GetAllFaqs);
router.get('/categories', FaqController.GetCategories);
router.get('/:id', FaqController.GetSingleFaq);
router.post('/', auth(UserRole.ADMIN), validateRequest(FaqValidation.CreateFaqSchema), FaqController.CreateFaq);
router.patch('/:id', auth(UserRole.ADMIN), validateRequest(FaqValidation.UpdateFaqSchema), FaqController.UpdateFaq);
router.delete('/:id', auth(UserRole.ADMIN), FaqController.DeleteFaq);

export const FaqRoutes = router;
