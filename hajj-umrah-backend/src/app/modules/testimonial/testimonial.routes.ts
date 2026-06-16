import { Router } from 'express';
import { UserRole } from '@prisma/client';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import TestimonialController from './testimonial.controller';
import TestimonialValidation from './testimonial.validation';

const router = Router();

router.get('/', TestimonialController.GetAllTestimonials);
router.get('/:id', TestimonialController.GetSingleTestimonial);
router.post('/', auth(UserRole.ADMIN), validateRequest(TestimonialValidation.CreateTestimonialSchema), TestimonialController.CreateTestimonial);
router.patch('/:id', auth(UserRole.ADMIN), validateRequest(TestimonialValidation.UpdateTestimonialSchema), TestimonialController.UpdateTestimonial);
router.delete('/:id', auth(UserRole.ADMIN), TestimonialController.DeleteTestimonial);

export const TestimonialRoutes = router;
